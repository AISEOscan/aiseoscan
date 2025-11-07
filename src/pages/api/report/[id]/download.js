import { getReport } from '../../../../utils/report';
import { generatePdf } from '../../../../utils/pdf';
import { generateGrowthPdf } from '../../../../utils/pdf-growth';
import { processMultiDimensionalData } from '../../../../utils/categorization'; 

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { id } = req.query;
    const { type = 'security' } = req.query;
    
    console.log(`PDF download request for report ${id}, type: ${type}`);
    
    const report = await getReport(id);
    
    if (!report) {
      console.log(`Report ${id} not found for PDF download`);
      return res.status(404).json({ error: 'Report not found' });
    }
    
    console.log(`Report ${id} found with status: ${report.status}`);
    
    //  ENSURE PDF GETS SAME RICH DATA AS WEB REPORT 
    let reportForPdf;
    
    // If we have raw scan data with full scanner results, use that
    if (report._rawScanData && report._rawScanData.issues) {
      console.log('🔧 PDF - Processing _rawScanData for rich fix objects');
      reportForPdf = processMultiDimensionalData(report._rawScanData);
    }
    // If we have main issues array, process that
    else if (report.issues && Array.isArray(report.issues) && report.issues.length > 0) {
      console.log('🔧 PDF - Processing main issues array for rich fix objects');  
      reportForPdf = processMultiDimensionalData(report);
    }
    // If we have preliminary scan data, extract the FULL issues (not just preview)
    else if (report.preliminaryScan && report.preliminaryScan.issues) {
      console.log('🔧 PDF - Processing preliminary scan FULL issues');
      const prelimDataWithFullIssues = {
        ...report,
        issues: report.preliminaryScan.issues // Use FULL issues, not previewIssues
      };
      reportForPdf = processMultiDimensionalData(prelimDataWithFullIssues);
    }
    // Fallback: create safe empty structure  
    else {
      console.log('⚠️ PDF - No issues found, creating safe structure');
      reportForPdf = {
        ...report,
        seo: { score: 100, total: 0, critical: 0, medium: 0, low: 0, issues: [] },
        compliance: { score: 100, total: 0, critical: 0, medium: 0, low: 0, issues: [] },
        summary: { overallScore: 100, total: 0, critical: 0, medium: 0, low: 0 }
      };
    }
    
    
    
    console.log(`Final report data for PDF:`, {
      url: reportForPdf.url,
      totalIssues: (reportForPdf.seo?.issues?.length || 0) + (reportForPdf.compliance?.issues?.length || 0),
      seoIssues: reportForPdf.seo?.issues?.length || 0,
      complianceIssues: reportForPdf.compliance?.issues?.length || 0,
      hasRichFixObjects: reportForPdf.seo?.issues?.[0]?.fix?.code ? 'YES' : 'NO'
    });
    
    // Generate the appropriate PDF based on type
  // Generate the appropriate PDF based on type
let pdfBuffer;
let filename;

try {
  if (type === 'growth') {
    console.log('Generating growth PDF with rich fix objects...');
    pdfBuffer = await generateGrowthPdf(reportForPdf);
    // CHANGED: From "founderscan-growth-report" to "aiseoscan-ai-seo-report"
    filename = `aiseoscan-ai-seo-report-${id}.pdf`;
  } else {
    console.log('Generating security PDF...');
    pdfBuffer = await generatePdf(reportForPdf);
    // CHANGED: From "founderscan-security-report" to "aiseoscan-security-report"  
    filename = `aiseoscan-security-report-${id}.pdf`;
  }
  console.log('PDF generation completed successfully');
} catch (pdfError) {
  console.error('PDF generation failed:', pdfError);
  console.error('PDF error stack:', pdfError.stack);
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