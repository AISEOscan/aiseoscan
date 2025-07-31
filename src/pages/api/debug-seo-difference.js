import { getReport } from '../../utils/report';
import { createIssueId } from '../../utils/categorization';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { reportId } = req.query;

  if (!reportId) {
    return res.status(400).json({ error: 'reportId is required' });
  }

  try {
    const report = await getReport(reportId);
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }

    // Get preliminary SEO issues
    const preliminarySeoIssues = report.preliminaryScan?.seo?.issues || [];
    
    // Get paid scan SEO issues
    const paidSeoIssues = report.seo?.issues || [];

    console.log(`🔍 SEO DEBUG - Preliminary: ${preliminarySeoIssues.length}, Paid: ${paidSeoIssues.length}`);

    // Create deduplication sets for both
    const preliminaryIds = new Set();
    const paidIds = new Set();

    const preliminaryWithIds = preliminarySeoIssues.map(issue => {
      const id = createIssueId(issue);
      preliminaryIds.add(id);
      return {
        ...issue,
        dedupeId: id
      };
    });

    const paidWithIds = paidSeoIssues.map(issue => {
      const id = createIssueId(issue);
      paidIds.add(id);
      return {
        ...issue,
        dedupeId: id
      };
    });

    // Find differences
    const missingInPaid = preliminaryWithIds.filter(issue => !paidIds.has(issue.dedupeId));
    const extraInPaid = paidWithIds.filter(issue => !preliminaryIds.has(issue.dedupeId));

    const debugInfo = {
      reportId,
      counts: {
        preliminary: preliminarySeoIssues.length,
        paid: paidSeoIssues.length,
        difference: preliminarySeoIssues.length - paidSeoIssues.length
      },
      
      preliminaryIssues: preliminaryWithIds.map(issue => ({
        type: issue.type,
        description: issue.description?.substring(0, 100),
        dedupeId: issue.dedupeId,
        severity: issue.severity
      })),
      
      paidIssues: paidWithIds.map(issue => ({
        type: issue.type,
        description: issue.description?.substring(0, 100),
        dedupeId: issue.dedupeId,
        severity: issue.severity
      })),
      
      missingInPaid: missingInPaid.map(issue => ({
        type: issue.type,
        description: issue.description?.substring(0, 100),
        dedupeId: issue.dedupeId,
        severity: issue.severity,
        fullDescription: issue.description
      })),
      
      extraInPaid: extraInPaid.map(issue => ({
        type: issue.type,
        description: issue.description?.substring(0, 100),
        dedupeId: issue.dedupeId,
        severity: issue.severity,
        fullDescription: issue.description
      })),
      
      // Check if issues exist in other dimensions in paid scan
      issuesInOtherDimensions: {}
    };

    // Check if the missing SEO issues ended up in other dimensions
    if (missingInPaid.length > 0) {
      const allPaidIssues = [
        ...(report.security?.issues || []),
        ...(report.performance?.issues || []),
        ...(report.compliance?.issues || [])
      ];

      missingInPaid.forEach(missingIssue => {
        const foundElsewhere = allPaidIssues.find(issue => 
          createIssueId(issue) === missingIssue.dedupeId
        );
        
        if (foundElsewhere) {
          debugInfo.issuesInOtherDimensions[missingIssue.type] = {
            originalDimension: 'seo',
            foundInDimension: 'unknown', // We'd need to check which dimension
            issue: {
              type: foundElsewhere.type,
              description: foundElsewhere.description?.substring(0, 100)
            }
          };
        }
      });
    }

    return res.status(200).json(debugInfo);

  } catch (error) {
    return res.status(500).json({ 
      error: 'Debug failed', 
      details: error.message 
    });
  }
}