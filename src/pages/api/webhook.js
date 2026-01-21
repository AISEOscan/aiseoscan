// /src/pages/api/webhook.js


import Stripe from 'stripe';
import { buffer } from 'micro';
import { getReport, storeReport, storeToken } from '../../utils/report';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    
    console.log('🔔 WEBHOOK: Webhook called');
    
    const rawBody = await buffer(req);
    const signature = req.headers['stripe-signature'];
    
    let event;
    try {
      event = stripe.webhooks.constructEvent(rawBody.toString(), signature, process.env.STRIPE_WEBHOOK_SECRET);
      console.log('✅ WEBHOOK: Signature verified');
    } catch (err) {
      console.error('❌ WEBHOOK: Signature verification failed:', err.message);
      return res.status(400).json({ error: 'Webhook signature verification failed' });
    }
    
    if (event.type !== 'checkout.session.completed') {
      console.log(`ℹ️ WEBHOOK: Ignoring event type: ${event.type}`);
      return res.status(200).json({ received: true });
    }
    
    console.log('🔄 WEBHOOK: Processing checkout.session.completed');
    
    const session = event.data.object;

    // Check if this is a package purchase
    if (session.metadata?.type === 'package') {
      console.log('📦 WEBHOOK: Package purchase detected');
      
      const { token, credits, packageId, amount } = session.metadata;
      const email = session.customer_email || session.customer_details?.email;
      
      console.log(`📦 WEBHOOK: Attempting to store token ${token} with ${credits} credits for ${email}`);
      
      const success = await storeToken({
        token,
        credits: parseInt(credits),
        purchased_amount: parseFloat(amount),
        package_type: packageId,
        email: email
      });

      if (success) {
        console.log(`✅ WEBHOOK: Token ${token} stored successfully with ${credits} credits for ${email}`);
        return res.status(200).json({ received: true, token });
      } else {
        console.error(`❌ WEBHOOK: Failed to store token ${token}`);
        return res.status(500).json({ error: 'Failed to store token' });
      }
    }

    // Single report payment processing
    const reportId = session.metadata?.reportId;
    const publicId = session.metadata?.publicId;
    const url = session.metadata?.url;

    console.log('📋 WEBHOOK: Session metadata:', {
      reportId,
      publicId,
      url,
      paymentStatus: session.payment_status
    });

    if (!reportId || !publicId || !url) {
      console.error('❌ WEBHOOK: Missing metadata');
      return res.status(400).json({ error: 'Missing required metadata' });
    }

    console.log(`💳 WEBHOOK: Processing payment confirmation for report: ${publicId}`);

    // Get the existing report
    let existingReport;
    try {
      existingReport = await getReport(publicId);
      
      if (!existingReport) {
        console.log(`🔍 WEBHOOK: Trying with internal reportId: ${reportId}`);
        existingReport = await getReport(reportId);
      }
      
      if (!existingReport) {
        console.error(`❌ WEBHOOK: Report ${publicId} not found`);
        return res.status(404).json({ error: 'Report not found' });
      }
    } catch (getError) {
      console.error(`❌ WEBHOOK: Error getting report:`, getError);
      return res.status(500).json({ error: 'Error retrieving report' });
    }

    console.log('📊 WEBHOOK: Found report:', {
      id: existingReport.id,
      publicId: existingReport.publicId,
      status: existingReport.status,
      hasIssues: existingReport.issues?.length > 0,
      issuesCount: existingReport.issues?.length || 0
    });

    // Mark as completed
    const completedReport = {
      ...existingReport,
      status: 'completed',
      completedAt: new Date().toISOString(),
      paymentSessionId: session.id,
      paymentConfirmed: true
    };

    console.log(`💾 WEBHOOK: Marking report as completed (frontend will handle processing)`);

    try {
      await storeReport(completedReport);
      console.log(`✅ WEBHOOK: Report ${publicId} marked as completed`);
      
      // Verify the update
      const verifyReport = await getReport(publicId);
      console.log(`🔍 WEBHOOK: Verification - Status: ${verifyReport?.status}, Payment confirmed: ${verifyReport?.paymentConfirmed}`);
      
      return res.status(200).json({ received: true, publicId });
      
    } catch (storeError) {
      console.error(`❌ WEBHOOK: Error storing completed report:`, storeError);
      return res.status(500).json({ error: 'Error storing report' });
    }

  } catch (error) {
    console.error('❌ WEBHOOK: Unhandled error:', error);
    console.error('❌ WEBHOOK: Error stack:', error.stack);
    return res.status(500).json({ error: 'Internal server error' });
  }
}