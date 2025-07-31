// src/pages/api/report/[id].js

import { getReport } from '../../../utils/report';
import { processMultiDimensionalData } from '../../../utils/categorization';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Report ID is required' });
  }

  try {
    console.log('🔍 REPORT API - Fetching report:', id);

    const report = await getReport(id);

    if (!report) {
      return res.status(404).json({ error: 'Report not found or expired' });
    }

    console.log('🔍 REPORT API - Raw report retrieved:', {
      status: report.status,
      hasIssues: !!report.issues,
      issuesCount: report.issues?.length || 0,
      hasRawData: !!report._rawScanData
    });

    // CRITICAL: Always process the most complete raw data available
    let dataToProcess;
    
    if (report._rawScanData && report._rawScanData.issues) {
      dataToProcess = report._rawScanData;
      console.log('🔄 REPORT API - Using _rawScanData for processing');
    } else if (report.issues && Array.isArray(report.issues)) {
      dataToProcess = report;
      console.log('🔄 REPORT API - Using main report data for processing');
    } else {
      console.log('⚠️ REPORT API - No issues found, returning safe structure');
      return res.status(200).json({
        ...report,
        security: { score: 100, total: 0, critical: 0, medium: 0, low: 0, issues: [] },
        seo: { score: 100, total: 0, critical: 0, medium: 0, low: 0, issues: [] },
        performance: { score: 100, total: 0, critical: 0, medium: 0, low: 0, issues: [] },
        compliance: { score: 100, total: 0, critical: 0, medium: 0, low: 0, issues: [] },
        summary: {
          ...report.summary,
          overallScore: 100,
          total: 0,
          critical: 0,
          medium: 0,
          low: 0
        }
      });
    }

    console.log('🔄 REPORT API - Processing data with', dataToProcess.issues?.length || 0, 'issues');
    
    // Process the raw data into dimensional structure
    const processedReport = processMultiDimensionalData(dataToProcess);
    
    // Merge with original report properties
    const finalReport = {
      ...report,  // Preserve all original properties
      ...processedReport,  // Add dimensional data
      
      // Ensure these core properties are maintained
      id: report.id,
      publicId: report.publicId,
      url: report.url,
      status: report.status,
      createdAt: report.createdAt,
      expiresAt: report.expiresAt
    };

    console.log('✅ REPORT API - Processing complete:', {
      security: finalReport.security?.total || 0,
      seo: finalReport.seo?.total || 0,
      performance: finalReport.performance?.total || 0,
      compliance: finalReport.compliance?.total || 0,
      overallScore: finalReport.summary?.overallScore || 0
    });

    return res.status(200).json(finalReport);

  } catch (error) {
    console.error('❌ Report API error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch report',
      details: error.message
    });
  }
}
