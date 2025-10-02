import Stripe from 'stripe';
import crypto from 'crypto';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { packageId, credits, amount } = req.body;

    if (!packageId || !credits || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Generate unique token
    const token = `SCAN-${crypto.randomBytes(8).toString('hex').toUpperCase()}`;

    console.log(`Creating package purchase: ${credits} credits for $${amount / 100}`);

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `AISEOScan ${credits} Scan Package`,
              description: `${credits} AI SEO scan credits - Use across any websites`
            },
            unit_amount: amount
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/package-success?token=${token}&credits=${credits}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/buy-credits?canceled=true`,
      metadata: {
        type: 'package',
        token,
        credits: credits.toString(),
        packageId,
        amount: (amount / 100).toString()
      }
    });

    return res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error('Package payment error:', error);
    return res.status(500).json({ error: 'Failed to create checkout session' });
  }
}