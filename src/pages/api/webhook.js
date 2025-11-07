// SIMPLIFIED: /src/pages/api/webhook.js
// Let frontend handle processing, webhook just confirms payment

import Stripe from 'stripe';
import { buffer } from 'micro';
import { getReport, storeReport, storeToken } from '../../utils/report';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  // Always respond to Stripe immediately
  res.status(200).json({ received: true });
  
  try {
    if (req.method !== 'POST') return;
    
    console.log('🔔 WEBHOOK: Webhook called');
    
    const rawBody = await buffer(req);
    const signature = req.headers['stripe-signature'];
    
    let event;
    try {
      event = stripe.webhooks.constructEvent(rawBody.toString(), signature, process.env.STRIPE_WEBHOOK_SECRET);
      console.log('✅ WEBHOOK: Signature verified');
    } catch (err) {
      console.error('❌ WEBHOOK: Signature verification failed:', err.message);
      return;
    }
    
    if (event.type !== 'checkout.session.completed') {
      console.log(`ℹ️ WEBHOOK: Ignoring event type: ${event.type}`);
      return;
    }
    
    console.log('🔄 WEBHOOK: Processing checkout.session.completed');
    
    const session = event.data.object;

    // NEW: Check if this is a package purchase
    if (session.metadata?.type === 'package') {
      console.log('📦 WEBHOOK: Package purchase detected');
      
      const { token, credits, packageId, amount } = session.metadata;
      const email = session.customer_email || session.customer_details?.email;
      
      const success = await storeToken({
        token,
        credits: parseInt(credits),
        purchased_amount: parseFloat(amount),
        package_type: packageId,
        email: email  // ADD EMAIL HERE
      });

      if (success) {
        console.log(`✅ WEBHOOK: Token ${token} stored with ${credits} credits for ${email}`);
      } else {
        console.error(`❌ WEBHOOK: Failed to store token ${token}`);
      }
      
      return; // Exit early for package purchases
    }

    // EXISTING: Single report payment processing
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
      return;
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
        return;
      }
    } catch (getError) {
      console.error(`❌ WEBHOOK: Error getting report:`, getError);
      return;
    }

    console.log('📊 WEBHOOK: Found report:', {
      id: existingReport.id,
      publicId: existingReport.publicId,
      status: existingReport.status,
      hasIssues: existingReport.issues?.length > 0,
      issuesCount: existingReport.issues?.length || 0
    });

    // SIMPLIFIED: Just mark as completed and let frontend handle processing
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
      
    } catch (storeError) {
      console.error(`❌ WEBHOOK: Error storing completed report:`, storeError);
    }

  } catch (error) {
    console.error('❌ WEBHOOK: Unhandled error:', error);
    console.error('❌ WEBHOOK: Error stack:', error.stack);
  }
}