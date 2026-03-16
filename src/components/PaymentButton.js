import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { AlertTriangle, Lock } from 'lucide-react';
import { useRouter } from 'next/router';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#e2e8f0',
      fontFamily: 'ui-monospace, monospace',
      fontSize: '15px',
      '::placeholder': { color: '#64748b' },
      backgroundColor: 'transparent',
    },
    invalid: { color: '#f87171' },
  },
};

// Inner form — has access to stripe/elements hooks
// NO CHANGES NEEDED HERE - cookie is read server-side in /api/payment
function CheckoutForm({ url, scanResults, discountCode, onCancel }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!stripe || !elements) return;
    setIsLoading(true);
    setError(null);

    try {
      // Step 1: Create a PaymentIntent on your server
      // Server will automatically read affiliate cookie and add to metadata
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          preliminaryScan: scanResults,
          discountCode: discountCode.trim(),
          usePaymentIntent: true, // flag so API returns client_secret
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to create payment');
      }

      const { clientSecret, publicId } = await response.json();

      // Step 2: Confirm card payment — stays on your domain
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      // Step 3: Payment succeeded — redirect to report
      window.location.href = `/report/${publicId}?session_id=${result.paymentIntent.id}`;

    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4 bg-gray-900/80 border border-purple-500/50 rounded-xl p-5">
      <div className="flex items-center mb-4">
        <Lock className="h-4 w-4 text-emerald-400 mr-2" />
        <span className="text-emerald-400 text-sm font-medium">Secure payment — powered by Stripe</span>
      </div>

      <div className="bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 mb-4">
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-900/30 border border-red-700 text-red-300 rounded-md text-sm flex items-center">
          <AlertTriangle className="h-4 w-4 text-red-400 mr-2 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={isLoading || !stripe}
        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-bold transition shadow-lg shadow-pink-500/30 disabled:opacity-60"
      >
        {isLoading ? 'Processing...' : 'Pay $29 — Get Full Report'}
      </button>

      <button
        type="button"
        onClick={onCancel}
        className="w-full mt-2 text-gray-400 hover:text-gray-300 text-sm py-2 transition"
      >
        Cancel
      </button>

      <p className="mt-3 text-center text-xs text-gray-400">
        One-time payment · No subscription · Report ready instantly
      </p>
    </div>
  );
}

// ─── Main exported component (NO CHANGES - all affiliate tracking is server-side) ───
export default function PaymentButton({ url, scanResults }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [discountCode, setDiscountCode] = useState('');
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [showInlinePayment, setShowInlinePayment] = useState(false);

  // Token handling — UNCHANGED
  const [tokenInfo, setTokenInfo] = useState(null);
  const [checkingToken, setCheckingToken] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const token = router.query.token;
      if (!token) { setCheckingToken(false); return; }
      try {
        const res = await fetch(`/api/check-token?token=${token}`);
        const data = await res.json();
        if (data.valid && data.credits > 0) {
          setTokenInfo({ token, credits: data.credits });
        }
      } catch (err) {
        console.error('Token check failed:', err);
      } finally {
        setCheckingToken(false);
      }
    };
    if (router.isReady) checkToken();
  }, [router.isReady, router.query.token]);

  // Token usage — UNCHANGED
  const handleUseCredit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/use-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: tokenInfo.token, publicId: scanResults.reportId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to use credit');
      window.location.href = `/report/${scanResults.reportId}`;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  if (checkingToken) {
    return <div className="mt-4 text-center text-gray-400 text-sm">Checking credits...</div>;
  }

  return (
    <div className="mt-4">

      {/* Token section — UNCHANGED */}
      {tokenInfo && tokenInfo.credits > 0 && (
        <div className="mb-4 bg-gradient-to-r from-emerald-900/40 to-green-900/40 border border-emerald-500/50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-bold text-emerald-300 text-lg">You have {tokenInfo.credits} credits!</p>
              <p className="text-sm text-gray-200">Use 1 credit to unlock this report</p>
            </div>
          </div>
          <button
            type="button"
            className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-6 py-3 rounded-md font-bold transition shadow-lg"
            onClick={handleUseCredit}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Use 1 Credit to Unlock'}
          </button>
          <p className="mt-3 text-center text-xs text-gray-300">
            or pay individually below ({tokenInfo.credits - 1} credits will remain)
          </p>
        </div>
      )}

      {/* Discount code — UNCHANGED */}
      <div className="mb-4">
        <button
          type="button"
          onClick={() => setShowDiscountInput(!showDiscountInput)}
          className="text-cyan-400 hover:text-cyan-300 text-sm underline mb-2"
        >
          Have a discount code?
        </button>
        {showDiscountInput && (
          <div className="mb-3">
            <input
              type="text"
              placeholder="Enter discount code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
            />
          </div>
        )}
      </div>

      {/* Inline payment form or trigger button */}
      {showInlinePayment ? (
        <Elements stripe={stripePromise}>
          <CheckoutForm
            url={url}
            scanResults={scanResults}
            discountCode={discountCode}
            onCancel={() => setShowInlinePayment(false)}
          />
        </Elements>
      ) : (
        <>
          <button
            type="button"
            className="w-full bg-gray-950 text-cyan-400 hover:bg-gray-900 px-6 py-3 rounded-md font-bold transition shadow-lg shadow-cyan-900/40 border border-cyan-800"
            onClick={() => setShowInlinePayment(true)}
            disabled={isLoading}
          >
            Get Full Report ($29)
          </button>

          {error && (
            <div className="mt-2 p-2 bg-red-900/30 border border-red-700 text-red-300 rounded-md text-sm">
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 text-red-400 mr-2" />
                <p>{error}</p>
              </div>
            </div>
          )}

          <p className="mt-2 text-center text-xs text-gray-400">
            <span className="text-cyan-400">&gt;</span> One-time payment. No subscription.
          </p>

          {!tokenInfo && (
            <p className="mt-4 text-center text-sm text-gray-300">
              Need multiple scans?{' '}
              <a href="/buy-credits" className="text-pink-400 hover:text-pink-300 underline">
                Get bulk credits →
              </a>
            </p>
          )}
        </>
      )}
    </div>
  );
}