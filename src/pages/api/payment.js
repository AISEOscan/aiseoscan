// API endpoint for creating Stripe payment sessions
import Stripe from 'stripe';
import { generateReportId, storeReport } from '../../utils/report';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Discount codes configuration
const DISCOUNT_CODES = {
  'FREESCAN': { type: 'free', discount: 100, description: 'Free scan' },
  'SAVE20': { type: 'percentage', discount: 20, description: '20% off' }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url, preliminaryScan, discountCode, usePaymentIntent } = req.body;

    // Validate inputs
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Process discount code — UNCHANGED
    let finalAmount = 100; // $29.00
    let discountInfo = null;

    if (discountCode && discountCode.trim()) {
      const code = discountCode.trim().toUpperCase();
      const discount = DISCOUNT_CODES[code];

      if (discount) {
        if (discount.type === 'free') {
          finalAmount = 0;
        } else if (discount.type === 'percentage') {
          finalAmount = Math.round(2900 * (1 - discount.discount / 100));
        }

        discountInfo = {
          code,
          type: discount.type,
          discount: discount.discount,
          description: discount.description,
          originalAmount: 2900,
          finalAmount
        };

        console.log(`Discount applied: ${code} - ${discount.description}, Final amount: $${finalAmount / 100}`);
      } else {
        return res.status(400).json({ error: 'Invalid discount code' });
      }
    }

    // Generate report IDs — UNCHANGED
    const reportIds = generateReportId();

    console.log(`AI SEO Payment API - Preliminary scan summary for ${url}:`,
      JSON.stringify({
        reportId: reportIds.id,
        publicId: reportIds.publicId,
        total: preliminaryScan?.summary?.total || 0,
        critical: preliminaryScan?.summary?.critical || 0,
        medium: preliminaryScan?.summary?.medium || 0,
        low: preliminaryScan?.summary?.low || 0,
        previewIssuesCount: preliminaryScan?.previewIssues?.length || 0,
        discountApplied: discountInfo,
        usePaymentIntent: !!usePaymentIntent
      }));

    // Store preliminary report — UNCHANGED
    const reportData = {
      id: reportIds.id,
      publicId: reportIds.publicId,
      url,
      preliminaryScan,
      status: 'awaiting_payment',
      timestamp: new Date().toISOString(),
      discountInfo
    };

    if (preliminaryScan?.previewIssues?.length > 0) {
      console.log(`AI SEO Payment API - Found ${preliminaryScan.previewIssues.length} preview issues to store`);
      preliminaryScan.previewIssues.forEach(issue => {
        if (!issue.severity) issue.severity = 'medium';
        if (!issue.type) issue.type = `generic-issue-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      });
    }

    await storeReport(reportData);

    // ─── NEW: Inline PaymentIntent flow ───────────────────────────────────────
    // Only used when PaymentButton sends usePaymentIntent: true
    // Free scans (finalAmount === 0) fall through to checkout session as before
    if (usePaymentIntent && finalAmount > 0) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: finalAmount,
        currency: 'usd',
        metadata: {
          reportId: reportIds.id,
          publicId: reportIds.publicId,
          url,
          ...(discountInfo && { discountCode: discountInfo.code, discountType: discountInfo.type })
        },
        description: `AISEOScan AI SEO Readiness Analysis for ${url}`
      });

      console.log(`✅ Payment API: Created PaymentIntent ${paymentIntent.id} for report ${reportIds.publicId}`);
      return res.status(200).json({
        clientSecret: paymentIntent.client_secret,
        publicId: reportIds.publicId
      });
    }
    // ─────────────────────────────────────────────────────────────────────────

    // EXISTING: Checkout session flow — completely unchanged from here down
    const sessionData = {
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/report/${reportIds.publicId}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/?canceled=true`,
      metadata: {
        reportId: reportIds.id,
        publicId: reportIds.publicId,
        url,
        ...(discountInfo && { discountCode: discountInfo.code, discountType: discountInfo.type })
      }
    };

    if (finalAmount === 0) {
      sessionData.line_items = [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'AISEOScan AI SEO Readiness Analysis (FREE)',
            description: `Free AI SEO readiness analysis for ${url} - ChatGPT, Perplexity & SearchGPT optimization`,
          },
          unit_amount: 0,
        },
        quantity: 1,
      }];
    } else {
      const productName = discountInfo
        ? `AISEOScan AI SEO Readiness Analysis (${discountInfo.description})`
        : 'AISEOScan AI SEO Readiness Analysis';

      sessionData.line_items = [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: productName,
            description: `Complete AI SEO readiness analysis for ${url} - Optimize for ChatGPT, Perplexity, SearchGPT and other AI search engines`,
          },
          unit_amount: finalAmount,
        },
        quantity: 1,
      }];
    }

    const session = await stripe.checkout.sessions.create(sessionData);
    return res.status(200).json({ id: session.id });

  } catch (error) {
    console.error('AI SEO Payment API error:', error);
    return res.status(500).json({ error: 'Failed to create payment session', details: error.message });
  }
}