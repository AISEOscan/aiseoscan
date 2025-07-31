// API endpoint for downloading report as PDF
import { getReport } from '../../../../utils/report';
import { generatePdf } from '../../../../utils/pdf';
import { generateGrowthPdf } from '../../../../utils/pdf-growth';

export default async function handler(req, res) {
  // Only accept GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { id } = req.query;
    const { type = 'security' } = req.query; // Default to security report for backward compatibility
    
    console.log(`PDF download request for report ${id}, type: ${type}`);
    
    // Get the report data using the updated getReport function that handles public IDs
    const report = await getReport(id);
    
    // Check if report exists
    if (!report) {
      console.log(`Report ${id} not found for PDF download`);
      return res.status(404).json({ error: 'Report not found' });
    }
    
    console.log(`Report ${id} found with status: ${report.status}`);
    console.log('Initial report structure:', {
      url: report.url,
      status: report.status,
      hasIssues: !!report.issues,
      issuesCount: report.issues?.length || 0,
      hasScanners: !!report.scanners,
      scannersCount: report.scanners ? Object.keys(report.scanners).length : 0,
      hasSummary: !!report.summary,
      hasPreliminaryScan: !!report.preliminaryScan
    });
    
    // Create a copy of the report that we can modify for PDF generation
    const reportForPdf = { ...report };
    
    // If report is not completed but we have preliminary scan data, use that
    if ((reportForPdf.status !== 'completed' || !reportForPdf.issues || reportForPdf.issues.length === 0) && 
        reportForPdf.preliminaryScan) {
      
      console.log('Using preliminary data for PDF generation');
      
      // Copy preliminary issues to main issues array if it's empty
      if (!reportForPdf.issues || reportForPdf.issues.length === 0) {
        reportForPdf.issues = (reportForPdf.preliminaryScan.previewIssues || []).map(issue => ({
          ...issue,
          fix: issue.fix || {
            title: `Fix for ${issue.description}`,
            description: 'Address this security issue to improve your website security.'
          }
        }));
        
        console.log(`Added ${reportForPdf.issues.length} issues from preliminary scan`);
      }
      
      // Use preliminary summary if needed
      if (!reportForPdf.summary || reportForPdf.summary.total === 0) {
        reportForPdf.summary = { ...reportForPdf.preliminaryScan.summary };
        
        // Recalculate security score
        const critical = reportForPdf.summary.critical || 0;
        const medium = reportForPdf.summary.medium || 0;
        const low = reportForPdf.summary.low || 0;
        reportForPdf.summary.securityScore = Math.max(0, 100 - (critical * 15 + medium * 5 + low * 1));
        
        console.log('Updated summary from preliminary scan:', reportForPdf.summary);
      }
      
      // Mark as completed for PDF generation
      reportForPdf.status = 'completed';
      
      // Create basic scanners structure
      reportForPdf.scanners = {
        ssl: { status: 'completed', issues: [] },
        headers: { status: 'completed', issues: [] },
        exposedFiles: { status: 'completed', issues: [] },
        owasp: { status: 'completed', issues: [] },
        stripe: { status: 'completed', issues: [] }
      };
      
      // Sort issues into the appropriate scanners
      if (reportForPdf.issues && reportForPdf.issues.length > 0) {
        console.log('Sorting issues into scanners...');
        for (const issue of reportForPdf.issues) {
          if (issue.type.includes('ssl') || issue.type.includes('cert') || issue.type.includes('https')) {
            reportForPdf.scanners.ssl.issues.push(issue);
          } else if (issue.type.includes('header') || issue.type.includes('policy')) {
            reportForPdf.scanners.headers.issues.push(issue);
          } else if (issue.type.includes('file')) {
            reportForPdf.scanners.exposedFiles.issues.push(issue);
          } else if (issue.type.includes('stripe')) {
            reportForPdf.scanners.stripe.issues.push(issue);
          } else if (issue.type.includes('xss') || issue.type.includes('csrf')) {
            reportForPdf.scanners.owasp.issues.push(issue);
          } else {
            // Default to headers for anything else
            reportForPdf.scanners.headers.issues.push(issue);
          }
        }
        
        console.log('Issues sorted into scanners:', {
          ssl: reportForPdf.scanners.ssl.issues.length,
          headers: reportForPdf.scanners.headers.issues.length,
          exposedFiles: reportForPdf.scanners.exposedFiles.issues.length,
          owasp: reportForPdf.scanners.owasp.issues.length,
          stripe: reportForPdf.scanners.stripe.issues.length
        });
      }
    }
    // For completed reports, check if issues were found by scanners but not in main issues array
    else if (reportForPdf.status === 'completed' && (!reportForPdf.issues || reportForPdf.issues.length === 0)) {
      console.log('Completed report with no main issues, checking scanners...');
      
      // Check if any scanner found issues
      const allIssues = [];
      
      if (reportForPdf.scanners) {
        Object.keys(reportForPdf.scanners).forEach(scannerKey => {
          const scanner = reportForPdf.scanners[scannerKey];
          if (scanner && scanner.issues && scanner.issues.length > 0) {
            console.log(`Found ${scanner.issues.length} issues in ${scannerKey} scanner`);
            allIssues.push(...scanner.issues);
          }
        });
      }
      
      // If we found issues in scanners but main issues array is empty, use those
      if (allIssues.length > 0) {
        console.log(`Using ${allIssues.length} issues from scanners`);
        reportForPdf.issues = allIssues;
        
        // Update summary if needed
        if (reportForPdf.summary) {
          const criticalCount = allIssues.filter(issue => issue.severity === 'critical').length;
          const mediumCount = allIssues.filter(issue => issue.severity === 'medium').length;
          const lowCount = allIssues.filter(issue => issue.severity === 'low').length;
          
          reportForPdf.summary.critical = criticalCount;
          reportForPdf.summary.medium = mediumCount;
          reportForPdf.summary.low = lowCount;
          reportForPdf.summary.total = allIssues.length;
          reportForPdf.summary.securityScore = Math.max(0, 100 - (criticalCount * 15 + mediumCount * 5 + lowCount * 1));
          
          console.log('Updated summary from scanner issues:', reportForPdf.summary);
        }
      }
    }
    
    console.log(`Final report data before PDF generation:`, {
      url: reportForPdf.url,
      status: reportForPdf.status,
      hasIssues: !!reportForPdf.issues,
      issuesCount: reportForPdf.issues?.length || 0,
      hasScanners: !!reportForPdf.scanners,
      scannersCount: reportForPdf.scanners ? Object.keys(reportForPdf.scanners).length : 0,
      hasSummary: !!reportForPdf.summary,
      summaryTotal: reportForPdf.summary?.total || 0,
      securityScore: reportForPdf.summary?.securityScore || 'undefined'
    });
    
    console.log(`Generating ${type} PDF for report ${id} with ${reportForPdf.issues?.length || 0} issues`);
    
    // Add detailed debugging
    console.log('Report data structure before PDF generation:', {
      url: reportForPdf.url,
      status: reportForPdf.status,
      hasIssues: !!reportForPdf.issues,
      issuesCount: reportForPdf.issues?.length || 0,
      hasScanners: !!reportForPdf.scanners,
      scannersCount: reportForPdf.scanners ? Object.keys(reportForPdf.scanners).length : 0,
      hasSummary: !!reportForPdf.summary,
      hasSecurity: !!reportForPdf.security,
      issueTypes: reportForPdf.issues?.map(i => i.type) || []
    });
    
    // Generate the appropriate PDF based on type
    let pdfBuffer;
    let filename;
    
    try {
      if (type === 'growth') {
        // Generate Growth Report (SEO + Performance + Compliance)
        console.log('Generating growth PDF...');
        pdfBuffer = await generateGrowthPdf(reportForPdf);
        filename = `founderscan-growth-report-${id}.pdf`;
      } else {
        // Generate Security Report (default, backward compatible)
        console.log('Generating security PDF...');
        pdfBuffer = await generatePdf(reportForPdf);
        filename = `founderscan-security-report-${id}.pdf`;
      }
      console.log('PDF generation completed successfully');
    } catch (pdfError) {
      console.error('PDF generation failed:', pdfError);
      console.error('PDF error stack:', pdfError.stack);
      
      // Log the specific data that caused the error
      console.error('Report data that caused PDF error:', {
        url: reportForPdf.url,
        status: reportForPdf.status,
        issuesCount: reportForPdf.issues?.length || 0,
        firstIssue: reportForPdf.issues?.[0] || null,
        summaryExists: !!reportForPdf.summary,
        securityExists: !!reportForPdf.security
      });
      
      throw pdfError;
    }
    
    // Set the content type and disposition headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    
    // Send the PDF
    res.send(Buffer.from(pdfBuffer));
    
    console.log(`Successfully generated and sent ${type} PDF for report ${id}`);
  } catch (error) {
    console.error('PDF download error:', error);
    console.error('Error stack:', error.stack);
    return res.status(500).json({ error: 'Failed to generate PDF report', details: error.message });
  }
}