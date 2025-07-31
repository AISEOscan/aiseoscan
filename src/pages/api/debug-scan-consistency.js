// Enhanced: src/pages/api/debug-scan-consistency.js

import { getReport } from '../../utils/report';
import { processMultiDimensionalData, categorizeIssueType, createIssueId } from '../../utils/categorization';
import { runPreliminaryScan } from '../../scanners';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { reportId, url } = req.query;

    console.log(`🔍 ENHANCED DEBUG: Deep analysis for ${reportId || url}`);

    const analysis = {
      reportId,
      url,
      timestamp: new Date().toISOString(),
      issues: {}
    };

    // PART 1: ANALYZE STORED REPORT DATA
    if (reportId) {
      console.log(`📊 Analyzing stored report: ${reportId}`);
      const reportData = await getReport(reportId);
      
      if (!reportData) {
        return res.status(404).json({ error: 'Report not found' });
      }

      analysis.storedReport = {
        basicInfo: {
          id: reportData.id,
          publicId: reportData.publicId,
          status: reportData.status,
          url: reportData.url,
          timestamp: reportData.timestamp
        },
        dataStructure: {
          topLevelKeys: Object.keys(reportData).sort(),
          hasIssuesArray: !!(reportData.issues && Array.isArray(reportData.issues)),
          issuesCount: reportData.issues?.length || 0,
          hasDimensionalData: {
            security: !!reportData.security,
            seo: !!reportData.seo,
            performance: !!reportData.performance,
            compliance: !!reportData.compliance
          }
        },
        dimensionalTotals: {
          security: {
            total: reportData.security?.total,
            issuesLength: reportData.security?.issues?.length,
            score: reportData.security?.score,
            hasTotal: reportData.security?.total !== undefined,
            properties: reportData.security ? Object.keys(reportData.security) : []
          },
          seo: {
            total: reportData.seo?.total,
            issuesLength: reportData.seo?.issues?.length,
            score: reportData.seo?.score,
            hasTotal: reportData.seo?.total !== undefined,
            properties: reportData.seo ? Object.keys(reportData.seo) : []
          },
          performance: {
            total: reportData.performance?.total,
            issuesLength: reportData.performance?.issues?.length,
            score: reportData.performance?.score,
            hasTotal: reportData.performance?.total !== undefined,
            properties: reportData.performance ? Object.keys(reportData.performance) : []
          },
          compliance: {
            total: reportData.compliance?.total,
            issuesLength: reportData.compliance?.issues?.length,
            score: reportData.compliance?.score,
            hasTotal: reportData.compliance?.total !== undefined,
            properties: reportData.compliance ? Object.keys(reportData.compliance) : []
          }
        },
        issueAnalysis: analyzeIssuesInDepth(reportData.issues || []),
        rawDataSample: {
          firstIssue: reportData.issues?.[0],
          securitySample: reportData.security,
          seoSample: reportData.seo
        }
      };

      // TEST: Reprocess the stored data to see what happens
      try {
        const reprocessed = processMultiDimensionalData(reportData);
        analysis.storedReport.reprocessingTest = {
          security: {
            originalTotal: reportData.security?.total,
            reprocessedTotal: reprocessed.security?.total,
            originalIssuesLength: reportData.security?.issues?.length,
            reprocessedIssuesLength: reprocessed.security?.issues?.length
          },
          seo: {
            originalTotal: reportData.seo?.total,
            reprocessedTotal: reprocessed.seo?.total,
            originalIssuesLength: reportData.seo?.issues?.length,
            reprocessedIssuesLength: reprocessed.seo?.issues?.length
          },
          performance: {
            originalTotal: reportData.performance?.total,
            reprocessedTotal: reprocessed.performance?.total,
            originalIssuesLength: reportData.performance?.issues?.length,
            reprocessedIssuesLength: reprocessed.performance?.issues?.length
          },
          compliance: {
            originalTotal: reportData.compliance?.total,
            reprocessedTotal: reprocessed.compliance?.total,
            originalIssuesLength: reportData.compliance?.issues?.length,
            reprocessedIssuesLength: reprocessed.compliance?.issues?.length
          }
        };
      } catch (reprocessError) {
        analysis.storedReport.reprocessingError = reprocessError.message;
      }
    }

    // PART 2: RUN FRESH SCAN
    if (url) {
      console.log(`🆓 Running fresh scan for: ${url}`);
      
      let formattedUrl = url;
      if (!formattedUrl.startsWith('http')) {
        formattedUrl = 'https://' + formattedUrl;
      }

      try {
        const freshScan = await runPreliminaryScan(formattedUrl);
        
        analysis.freshScan = {
          basicInfo: {
            scanId: freshScan.scanId,
            timestamp: freshScan.timestamp,
            url: freshScan.url || formattedUrl
          },
          dataStructure: {
            topLevelKeys: Object.keys(freshScan).sort(),
            hasIssuesArray: !!(freshScan.issues && Array.isArray(freshScan.issues)),
            issuesCount: freshScan.issues?.length || 0,
            hasPreviewIssues: !!(freshScan.previewIssues && Array.isArray(freshScan.previewIssues)),
            previewIssuesCount: freshScan.previewIssues?.length || 0
          },
          dimensionalTotals: {
            security: {
              total: freshScan.security?.total,
              issuesLength: freshScan.security?.issues?.length,
              previewIssuesLength: freshScan.security?.previewIssues?.length,
              score: freshScan.security?.score,
              hasTotal: freshScan.security?.total !== undefined,
              properties: freshScan.security ? Object.keys(freshScan.security) : []
            },
            seo: {
              total: freshScan.seo?.total,
              issuesLength: freshScan.seo?.issues?.length,
              previewIssuesLength: freshScan.seo?.previewIssues?.length,
              score: freshScan.seo?.score,
              hasTotal: freshScan.seo?.total !== undefined,
              properties: freshScan.seo ? Object.keys(freshScan.seo) : []
            },
            performance: {
              total: freshScan.performance?.total,
              issuesLength: freshScan.performance?.issues?.length,
              previewIssuesLength: freshScan.performance?.previewIssues?.length,
              score: freshScan.performance?.score,
              hasTotal: freshScan.performance?.total !== undefined,
              properties: freshScan.performance ? Object.keys(freshScan.performance) : []
            },
            compliance: {
              total: freshScan.compliance?.total,
              issuesLength: freshScan.compliance?.issues?.length,
              previewIssuesLength: freshScan.compliance?.previewIssues?.length,
              score: freshScan.compliance?.score,
              hasTotal: freshScan.compliance?.total !== undefined,
              properties: freshScan.compliance ? Object.keys(freshScan.compliance) : []
            }
          },
          issueAnalysis: analyzeIssuesInDepth(freshScan.issues || []),
          rawDataSample: {
            firstIssue: freshScan.issues?.[0],
            securitySample: freshScan.security,
            seoSample: freshScan.seo,
            previewIssuesSample: freshScan.previewIssues?.slice(0, 3)
          }
        };

        // FRONTEND SIMULATION: What would the frontend display?
        analysis.frontendSimulation = {
          currentLogic: {
            security: freshScan.security?.total || freshScan.security?.issues?.length || 0,
            seo: freshScan.seo?.total || freshScan.seo?.issues?.length || 0,
            performance: freshScan.performance?.total || freshScan.performance?.issues?.length || 0,
            compliance: freshScan.compliance?.total || freshScan.compliance?.issues?.length || 0
          },
          problematicLogic: {
            security: freshScan.security?.total || (freshScan.security?.previewIssues?.length || 0),
            seo: freshScan.seo?.total || (freshScan.seo?.previewIssues?.length || 0),
            performance: freshScan.performance?.total || (freshScan.performance?.previewIssues?.length || 0),
            compliance: freshScan.compliance?.total || (freshScan.compliance?.previewIssues?.length || 0)
          },
          explanation: {
            security: {
              total: freshScan.security?.total,
              issuesLength: freshScan.security?.issues?.length,
              previewLength: freshScan.security?.previewIssues?.length,
              wouldUseFallback: freshScan.security?.total === undefined
            },
            seo: {
              total: freshScan.seo?.total,
              issuesLength: freshScan.seo?.issues?.length,
              previewLength: freshScan.seo?.previewIssues?.length,
              wouldUseFallback: freshScan.seo?.total === undefined
            },
            performance: {
              total: freshScan.performance?.total,
              issuesLength: freshScan.performance?.issues?.length,
              previewLength: freshScan.performance?.previewIssues?.length,
              wouldUseFallback: freshScan.performance?.total === undefined
            },
            compliance: {
              total: freshScan.compliance?.total,
              issuesLength: freshScan.compliance?.issues?.length,
              previewLength: freshScan.compliance?.previewIssues?.length,
              wouldUseFallback: freshScan.compliance?.total === undefined
            }
          }
        };

      } catch (scanError) {
        console.error('Fresh scan failed:', scanError);
        analysis.freshScanError = {
          message: scanError.message,
          stack: scanError.stack
        };
      }
    }

    // PART 3: COMPARISON AND DIAGNOSIS
    if (analysis.storedReport && analysis.freshScan) {
      analysis.comparison = {
        totalsMatch: compareArrays(
          [
            analysis.storedReport.dimensionalTotals.security.total,
            analysis.storedReport.dimensionalTotals.seo.total,
            analysis.storedReport.dimensionalTotals.performance.total,
            analysis.storedReport.dimensionalTotals.compliance.total
          ],
          [
            analysis.freshScan.dimensionalTotals.security.total,
            analysis.freshScan.dimensionalTotals.seo.total,
            analysis.freshScan.dimensionalTotals.performance.total,
            analysis.freshScan.dimensionalTotals.compliance.total
          ]
        ),
        issueCountsMatch: compareArrays(
          [
            analysis.storedReport.dimensionalTotals.security.issuesLength,
            analysis.storedReport.dimensionalTotals.seo.issuesLength,
            analysis.storedReport.dimensionalTotals.performance.issuesLength,
            analysis.storedReport.dimensionalTotals.compliance.issuesLength
          ],
          [
            analysis.freshScan.dimensionalTotals.security.issuesLength,
            analysis.freshScan.dimensionalTotals.seo.issuesLength,
            analysis.freshScan.dimensionalTotals.performance.issuesLength,
            analysis.freshScan.dimensionalTotals.compliance.issuesLength
          ]
        )
      };
    }

    // PART 4: ROOT CAUSE DIAGNOSIS
    analysis.diagnosis = generateDiagnosis(analysis);

    console.log(`🔍 ENHANCED DEBUG: Analysis complete`);
    return res.status(200).json(analysis);

  } catch (error) {
    console.error('Enhanced debug error:', error);
    return res.status(500).json({ 
      error: 'Enhanced debug failed', 
      details: error.message,
      stack: error.stack
    });
  }
}

function analyzeIssuesInDepth(issues) {
  if (!Array.isArray(issues) || issues.length === 0) {
    return { error: 'No issues to analyze' };
  }

  const analysis = {
    totalIssues: issues.length,
    typeBreakdown: {},
    severityBreakdown: { critical: 0, medium: 0, low: 0 },
    categorization: { security: 0, seo: 0, performance: 0, compliance: 0 },
    deduplication: { original: issues.length, deduplicated: 0, duplicateIds: [] },
    sampleIssues: []
  };

  const seenIds = new Set();
  const duplicateIds = [];

  issues.forEach((issue, index) => {
    if (!issue) return;

    // Type breakdown
    if (issue.type) {
      analysis.typeBreakdown[issue.type] = (analysis.typeBreakdown[issue.type] || 0) + 1;
    }

    // Severity breakdown
    if (issue.severity && analysis.severityBreakdown[issue.severity] !== undefined) {
      analysis.severityBreakdown[issue.severity]++;
    }

    // Categorization test
    if (issue.type) {
      const category = categorizeIssueType(issue.type);
      analysis.categorization[category]++;
    }

    // Deduplication test
    if (issue.type) {
      const issueId = createIssueId(issue);
      if (seenIds.has(issueId)) {
        duplicateIds.push({ index, issueId, type: issue.type });
      } else {
        seenIds.add(issueId);
        analysis.deduplication.deduplicated++;
      }
    }

    // Sample issues
    if (index < 10) {
      analysis.sampleIssues.push({
        index,
        type: issue.type,
        severity: issue.severity,
        description: issue.description?.substring(0, 100),
        category: issue.type ? categorizeIssueType(issue.type) : 'unknown',
        issueId: issue.type ? createIssueId(issue) : 'no-type'
      });
    }
  });

  analysis.deduplication.duplicateIds = duplicateIds;

  return analysis;
}

function compareArrays(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  
  return true;
}

function generateDiagnosis(analysis) {
  const diagnosis = {
    summary: "Analyzing data inconsistencies between free scan and stored report",
    findings: [],
    rootCauses: [],
    fixes: []
  };

  // Check fresh scan totals
  if (analysis.freshScan?.dimensionalTotals) {
    const dims = analysis.freshScan.dimensionalTotals;
    const missingTotals = [];
    
    Object.keys(dims).forEach(dim => {
      if (dims[dim].total === undefined) {
        missingTotals.push(dim);
      }
    });
    
    if (missingTotals.length > 0) {
      diagnosis.findings.push(`❌ Fresh scan missing 'total' values for: ${missingTotals.join(', ')}`);
      diagnosis.rootCauses.push("runPreliminaryScan() not setting 'total' property in dimensional data");
      diagnosis.fixes.push("Fix processMultiDimensionalData() to properly set 'total' values");
    } else {
      diagnosis.findings.push("✅ Fresh scan has all 'total' values");
    }
  }

  // Check frontend simulation
  if (analysis.frontendSimulation) {
    const current = analysis.frontendSimulation.currentLogic;
    const problematic = analysis.frontendSimulation.problematicLogic;
    
    if (JSON.stringify(current) !== JSON.stringify(problematic)) {
      diagnosis.findings.push("❌ Frontend logic would give different results depending on fallback");
      diagnosis.findings.push(`Current logic: [${Object.values(current).join(',')}]`);
      diagnosis.findings.push(`Problematic logic: [${Object.values(problematic).join(',')}]`);
    }
  }

  // Check stored report issues
  if (analysis.storedReport?.dimensionalTotals) {
    const dims = analysis.storedReport.dimensionalTotals;
    const zeroTotals = [];
    
    Object.keys(dims).forEach(dim => {
      if (dims[dim].total === 0 || dims[dim].total === undefined) {
        zeroTotals.push(dim);
      }
    });
    
    if (zeroTotals.length > 0) {
      diagnosis.findings.push(`❌ Stored report has zero/undefined totals for: ${zeroTotals.join(', ')}`);
      diagnosis.rootCauses.push("Data corruption during manual-scan.js processing");
      diagnosis.fixes.push("Fix manual-scan.js to preserve dimensional data structure");
    }
  }

  // Check reprocessing results
  if (analysis.storedReport?.reprocessingTest) {
    const reprocess = analysis.storedReport.reprocessingTest;
    let dataCorruption = false;
    
    Object.keys(reprocess).forEach(dim => {
      const original = reprocess[dim].originalTotal;
      const reprocessed = reprocess[dim].reprocessedTotal;
      
      if (original !== reprocessed) {
        dataCorruption = true;
      }
    });
    
    if (dataCorruption) {
      diagnosis.findings.push("❌ Reprocessing stored data gives different results than original");
      diagnosis.rootCauses.push("Stored data structure is corrupted or incomplete");
    } else {
      diagnosis.findings.push("✅ Reprocessing stored data gives consistent results");
    }
  }

  return diagnosis;
}