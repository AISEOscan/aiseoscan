// Create this file: src/pages/api/debug-categorization.js

import { getReport } from '../../utils/report';
import { isSecurityIssue, isSeoIssue, isPerformanceIssue, isComplianceIssue, categorizeIssueType, processMultiDimensionalData } from '../../utils/categorization';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { reportId } = req.query;

  if (!reportId) {
    return res.status(400).json({ error: 'reportId is required' });
  }

  try {
    // Get the report
    const report = await getReport(reportId);
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }

    // Get preliminary issues
    let allPreliminaryIssues = [];
    
    if (report.preliminaryScan?.issues && Array.isArray(report.preliminaryScan.issues)) {
      allPreliminaryIssues = report.preliminaryScan.issues;
    } else {
      allPreliminaryIssues = [
        ...(report.preliminaryScan?.security?.issues || []),
        ...(report.preliminaryScan?.seo?.issues || []),
        ...(report.preliminaryScan?.performance?.issues || []),
        ...(report.preliminaryScan?.compliance?.issues || [])
      ];
    }

    // Debug categorization
    const debugInfo = {
      reportId,
      dataSource: report.preliminaryScan?.issues ? 'preliminaryScan.issues' : 'dimensional reconstruction',
      totalIssues: allPreliminaryIssues.length,
      
      // Test each categorization function
      categorization: {
        byFunction: {},
        byNewFunction: {},
        conflicts: []
      },
      
      // Show raw issues
      rawIssues: allPreliminaryIssues.map((issue, index) => ({
        index: index + 1,
        type: issue.type,
        severity: issue.severity,
        description: issue.description?.substring(0, 100) + '...',
        isSecurityOld: isSecurityIssue(issue.type),
        isSeoOld: isSeoIssue(issue.type),
        isPerformanceOld: isPerformanceIssue(issue.type),
        isComplianceOld: isComplianceIssue(issue.type),
        categoryNew: categorizeIssueType ? categorizeIssueType(issue.type) : 'unknown'
      })),
      
      // Current preliminary scan dimensions
      preliminaryDimensions: {
        security: {
          total: report.preliminaryScan?.security?.total || 0,
          issues: report.preliminaryScan?.security?.issues?.length || 0
        },
        seo: {
          total: report.preliminaryScan?.seo?.total || 0,
          issues: report.preliminaryScan?.seo?.issues?.length || 0
        },
        performance: {
          total: report.preliminaryScan?.performance?.total || 0,
          issues: report.preliminaryScan?.performance?.issues?.length || 0
        },
        compliance: {
          total: report.preliminaryScan?.compliance?.total || 0,
          issues: report.preliminaryScan?.compliance?.issues?.length || 0
        }
      }
    };

    // Count by old functions
    const oldCounts = { security: 0, seo: 0, performance: 0, compliance: 0, uncategorized: 0 };
    const newCounts = { security: 0, seo: 0, performance: 0, compliance: 0, uncategorized: 0 };

    allPreliminaryIssues.forEach(issue => {
      // Old categorization logic (first match wins)
      if (isSecurityIssue(issue.type)) {
        oldCounts.security++;
      } else if (isSeoIssue(issue.type)) {
        oldCounts.seo++;
      } else if (isPerformanceIssue(issue.type)) {
        oldCounts.performance++;
      } else if (isComplianceIssue(issue.type)) {
        oldCounts.compliance++;
      } else {
        oldCounts.uncategorized++;
      }

      // New categorization logic
      const newCategory = categorizeIssueType ? categorizeIssueType(issue.type) : 'uncategorized';
      if (newCounts[newCategory] !== undefined) {
        newCounts[newCategory]++;
      } else {
        newCounts.uncategorized++;
      }
    });

    debugInfo.categorization.byFunction = oldCounts;
    debugInfo.categorization.byNewFunction = newCounts;

    // Find conflicts
    allPreliminaryIssues.forEach(issue => {
      const isSec = isSecurityIssue(issue.type);
      const isSeo = isSeoIssue(issue.type);
      const isPerf = isPerformanceIssue(issue.type);
      const isComp = isComplianceIssue(issue.type);
      
      const matchCount = [isSec, isSeo, isPerf, isComp].filter(Boolean).length;
      
      if (matchCount > 1) {
        debugInfo.categorization.conflicts.push({
          type: issue.type,
          description: issue.description?.substring(0, 50),
          matches: {
            security: isSec,
            seo: isSeo,
            performance: isPerf,
            compliance: isComp
          },
          finalCategory: categorizeIssueType ? categorizeIssueType(issue.type) : 'unknown'
        });
      }
    });

    // Test processMultiDimensionalData
    const testData = {
      issues: allPreliminaryIssues,
      summary: report.preliminaryScan?.summary || {}
    };

    const processedData = processMultiDimensionalData(testData);
    
    debugInfo.processedResults = {
      security: {
        total: processedData.security?.total || 0,
        issues: processedData.security?.issues?.length || 0
      },
      seo: {
        total: processedData.seo?.total || 0,
        issues: processedData.seo?.issues?.length || 0
      },
      performance: {
        total: processedData.performance?.total || 0,
        issues: processedData.performance?.issues?.length || 0
      },
      compliance: {
        total: processedData.compliance?.total || 0,
        issues: processedData.compliance?.issues?.length || 0
      }
    };

    // Compare with what's stored
    debugInfo.comparison = {
      preliminary_vs_processed: {
        security: {
          stored: debugInfo.preliminaryDimensions.security.total,
          processed: debugInfo.processedResults.security.total,
          match: debugInfo.preliminaryDimensions.security.total === debugInfo.processedResults.security.total
        },
        seo: {
          stored: debugInfo.preliminaryDimensions.seo.total,
          processed: debugInfo.processedResults.seo.total,
          match: debugInfo.preliminaryDimensions.seo.total === debugInfo.processedResults.seo.total
        },
        performance: {
          stored: debugInfo.preliminaryDimensions.performance.total,
          processed: debugInfo.processedResults.performance.total,
          match: debugInfo.preliminaryDimensions.performance.total === debugInfo.processedResults.performance.total
        },
        compliance: {
          stored: debugInfo.preliminaryDimensions.compliance.total,
          processed: debugInfo.processedResults.compliance.total,
          match: debugInfo.preliminaryDimensions.compliance.total === debugInfo.processedResults.compliance.total
        }
      }
    };

    return res.status(200).json(debugInfo);

  } catch (error) {
    return res.status(500).json({ 
      error: 'Debug failed', 
      details: error.message,
      stack: error.stack 
    });
  }
}