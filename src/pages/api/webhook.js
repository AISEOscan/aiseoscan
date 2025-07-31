import Stripe from 'stripe';
import { buffer } from 'micro';
import { getReport, storeReport } from '../../utils/report';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: { bodyParser: false },
};

// Helper function to get report with retry
async function getReportWithRetry(publicId, reportId, maxRetries = 2) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    console.log(`🔍 WEBHOOK DEBUG: Attempt ${attempt} to get report: ${publicId}`);
    
    let existingReport = await getReport(publicId);
    
    if (!existingReport) {
      console.log(`🔍 WEBHOOK DEBUG: Trying with reportId: ${reportId}`);
      existingReport = await getReport(reportId);
    }
    
    if (existingReport) {
      // Check if we have issues
      const hasIssues = (
        (existingReport._rawDataForStorage?.issues?.length > 0) ||
        (existingReport.issues?.length > 0) ||
        (existingReport.preliminaryScan?.issues?.length > 0) ||
        (existingReport.scanners && Object.values(existingReport.scanners).some(scanner => 
          scanner.issues && Array.isArray(scanner.issues) && scanner.issues.length > 0
        ))
      );
      
      if (hasIssues || attempt === maxRetries) {
        console.log(`✅ WEBHOOK DEBUG: Found report with ${hasIssues ? 'issues' : 'no issues'} on attempt ${attempt}`);
        return existingReport;
      } else {
        console.log(`⚠️ WEBHOOK DEBUG: Found report but no issues on attempt ${attempt}, retrying...`);
        // Wait 3 seconds before retry
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    } else if (attempt < maxRetries) {
      console.log(`⚠️ WEBHOOK DEBUG: Report not found on attempt ${attempt}, retrying...`);
      // Wait 3 seconds before retry
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  
  return null;
}

export default async function handler(req, res) {
  // Always respond to Stripe immediately
  res.status(200).json({ received: true });
  
  try {
    if (req.method !== 'POST') return;
    
    console.log('🔔 WEBHOOK DEBUG: Webhook called');
    
    const rawBody = await buffer(req);
    const signature = req.headers['stripe-signature'];
    
    let event;
    try {
      event = stripe.webhooks.constructEvent(rawBody.toString(), signature, process.env.STRIPE_WEBHOOK_SECRET);
      console.log('✅ WEBHOOK DEBUG: Signature verified');
    } catch (err) {
      console.error('❌ WEBHOOK DEBUG: Signature verification failed:', err.message);
      return;
    }
    
    if (event.type !== 'checkout.session.completed') {
      console.log(`ℹ️ WEBHOOK DEBUG: Ignoring event type: ${event.type}`);
      return;
    }
    
    console.log('🔄 WEBHOOK DEBUG: Processing checkout.session.completed');
    
    const session = event.data.object;
    console.log('📋 WEBHOOK DEBUG: Session metadata:', {
      reportId: session.metadata?.reportId,
      publicId: session.metadata?.publicId,
      url: session.metadata?.url,
      fullMetadata: session.metadata
    });
    
    const reportId = session.metadata?.reportId;
    const publicId = session.metadata?.publicId;
    const url = session.metadata?.url;

    if (!reportId || !publicId || !url) {
      console.error('❌ WEBHOOK DEBUG: Missing metadata');
      return;
    }

    console.log(`💳 WEBHOOK DEBUG: Processing payment for report: ${publicId}`);

    // Try to get the report with retry logic
    let existingReport;
    try {
      existingReport = await getReportWithRetry(publicId, reportId);
      
      if (!existingReport) {
        console.error(`❌ WEBHOOK DEBUG: Report ${publicId} not found after retries`);
        return;
      }
    } catch (getError) {
      console.error(`❌ WEBHOOK DEBUG: Error getting report:`, getError);
      return;
    }

    // Debug the report structure
    console.log('📊 WEBHOOK DEBUG: Report structure analysis:', {
      id: existingReport.id,
      publicId: existingReport.publicId,
      status: existingReport.status,
      url: existingReport.url,
      hasIssues: !!existingReport.issues,
      issuesCount: existingReport.issues?.length || 0,
      issuesArray: existingReport.issues ? 'PRESENT' : 'MISSING',
      hasRawData: !!existingReport._rawDataForStorage,
      rawDataIssues: existingReport._rawDataForStorage?.issues?.length || 0,
      hasSummary: !!existingReport.summary,
      summaryTotal: existingReport.summary?.total || 0,
      hasScanners: !!existingReport.scanners,
      scannersKeys: existingReport.scanners ? Object.keys(existingReport.scanners) : [],
      allKeys: Object.keys(existingReport)
    });

    // Try different sources for issues
    let sourceIssues = [];
    let sourceDescription = '';
    
    if (existingReport._rawDataForStorage?.issues?.length > 0) {
      sourceIssues = existingReport._rawDataForStorage.issues;
      sourceDescription = '_rawDataForStorage';
    } else if (existingReport.issues?.length > 0) {
      sourceIssues = existingReport.issues;
      sourceDescription = 'main issues array';
    } else if (existingReport.preliminaryScan?.issues?.length > 0) {
      sourceIssues = existingReport.preliminaryScan.issues;
      sourceDescription = 'preliminaryScan.issues';
    } else {
      // Try to extract from scanners
      if (existingReport.scanners) {
        const allScannerIssues = [];
        Object.values(existingReport.scanners).forEach(scanner => {
          if (scanner.issues && Array.isArray(scanner.issues)) {
            allScannerIssues.push(...scanner.issues);
          }
        });
        if (allScannerIssues.length > 0) {
          sourceIssues = allScannerIssues;
          sourceDescription = 'extracted from scanners';
        }
      }
    }

    console.log(`📦 WEBHOOK DEBUG: Issue source analysis:`, {
      sourceDescription,
      sourceCount: sourceIssues.length,
      sampleIssues: sourceIssues.slice(0, 3).map(i => ({
        type: i?.type,
        severity: i?.severity,
        description: i?.description
      }))
    });

    if (sourceIssues.length === 0) {
      console.error('❌ WEBHOOK DEBUG: No issues found in any location!');
      console.error('❌ WEBHOOK DEBUG: Full report dump:', JSON.stringify(existingReport, null, 2));
      return;
    }

    console.log(`🔧 WEBHOOK DEBUG: Enhancing ${sourceIssues.length} issues...`);

    // Enhance issues
    const enhancedIssues = sourceIssues.map((issue, index) => {
      if (!issue || !issue.type) {
        console.warn(`⚠️ WEBHOOK DEBUG: Invalid issue at index ${index}:`, issue);
        return issue;
      }
      
      if (!issue.fix) {
        return {
          ...issue,
          fix: {
            title: `Fix for ${issue.description || issue.type}`,
            description: 'Address this issue to improve your website.',
            code: '/* Implementation code would go here */'
          }
        };
      }
      
      return issue;
    });

    console.log(`✨ WEBHOOK DEBUG: Enhancement complete: ${enhancedIssues.length} issues`);

    // Create completed report
    const completedReport = {
      ...existingReport,
      status: 'completed',
      completedAt: new Date().toISOString(),
      paymentSessionId: session.id,
      issues: enhancedIssues,
      summary: {
        ...existingReport.summary,
        total: enhancedIssues.length,
        critical: enhancedIssues.filter(i => i.severity === 'critical').length,
        medium: enhancedIssues.filter(i => i.severity === 'medium').length,
        low: enhancedIssues.filter(i => i.severity === 'low').length
      }
    };

    console.log(`💾 WEBHOOK DEBUG: Storing completed report with ${enhancedIssues.length} issues...`);

    try {
      await storeReport(completedReport);
      console.log(`✅ WEBHOOK DEBUG: Report stored successfully`);
      
      // Verify storage by reading it back
      const verifyReport = await getReport(publicId);
      console.log(`🔍 WEBHOOK DEBUG: Verification read:`, {
        status: verifyReport?.status,
        issuesCount: verifyReport?.issues?.length || 0,
        summaryTotal: verifyReport?.summary?.total || 0
      });
      
    } catch (storeError) {
      console.error(`❌ WEBHOOK DEBUG: Error storing report:`, storeError);
    }

  } catch (error) {
    console.error('❌ WEBHOOK DEBUG: Unhandled error:', error);
    console.error('❌ WEBHOOK DEBUG: Error stack:', error.stack);
  }
}