//scan.js


import { runPreliminaryScan } from '../../scanners';
import { rateLimit } from '../../../lib/rateLimit.js';
import { generateReportId, storeReport } from '../../utils/report';
import { processMultiDimensionalData } from '../../utils/categorization';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress || 'unknown';
  const { allowed } = await rateLimit(ip);

  if (!allowed) {
    return res.status(429).json({
      error: 'Too many requests. Please try again later.',
      retryAfter: '1 hour',
    });
  }

  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    let formattedUrl = url;
    if (!formattedUrl.startsWith('http')) {
      formattedUrl = 'https://' + formattedUrl;
    }

    try {
      new URL(formattedUrl);
    } catch (error) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    console.log(`🔍 FREE SCAN API: Starting scan for ${formattedUrl}`);
    
    // Step 1: Get raw scan data from scanners
    const rawScanData = await runPreliminaryScan(formattedUrl);
    
    console.log(`🔍 FREE SCAN API - Raw data from scanners:`, {
      totalIssues: rawScanData.issues?.length || 0,
      summary: rawScanData.summary,
      hasIssues: !!rawScanData.issues,
      sampleIssues: rawScanData.issues?.slice(0, 3).map(i => i.type) || []
    });

    // Step 2: Generate report IDs and prepare storage
    const reportIds = generateReportId();
    const createdAt = new Date().toISOString();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    // Step 3: Store ONLY raw data with clear structure
    const reportToStore = {
      id: reportIds.id,
      publicId: reportIds.publicId,
      url: formattedUrl,
      createdAt,
      expiresAt,
      status: 'preliminary',
      
      // CRITICAL: Store complete raw data structure
      scanId: rawScanData.scanId,
      timestamp: rawScanData.timestamp,
      isWordPress: rawScanData.isWordPress,
      issues: rawScanData.issues,                    // Raw issues array
      summary: rawScanData.summary,                  // Basic severity summary
      scanners: rawScanData.scanners,                // Scanner metadata
      previewIssues: rawScanData.previewIssues,      // For frontend preview
      
      // Store backup of raw data
      _rawScanData: JSON.parse(JSON.stringify(rawScanData))
    };

    await storeReport(reportToStore);

    // Step 4: Process for immediate frontend display (NOT stored)
    const processedForDisplay = processMultiDimensionalData(rawScanData);
    
    console.log(`✅ FREE SCAN API - Complete! Stored raw data, returning processed:`, {
      reportId: reportIds.publicId,
      storedRawIssues: rawScanData.issues?.length || 0,
      returnedDimensions: {
        security: processedForDisplay.security?.total,
        seo: processedForDisplay.seo?.total,
        performance: processedForDisplay.performance?.total,
        compliance: processedForDisplay.compliance?.total
      }
    });

    // Step 5: Return processed data for immediate display
    return res.status(200).json({
      reportId: reportIds.publicId,
      ...processedForDisplay
    });

  } catch (error) {
    console.error('❌ Free scan API error:', error);
    return res.status(500).json({ 
      error: 'Failed to run security scan', 
      details: error.message 
    });
  }
}