import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/router';


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function PaymentButton({ url, scanResults }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [discountCode, setDiscountCode] = useState('');
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  
  // NEW: Token handling
  const [tokenInfo, setTokenInfo] = useState(null);
  const [checkingToken, setCheckingToken] = useState(true);

  // NEW: Check for token on mount
  useEffect(() => {
    const checkToken = async () => {
      const token = router.query.token;
      
      if (!token) {
        setCheckingToken(false);
        return;
      }

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

    if (router.isReady) {
      checkToken();
    }
  }, [router.isReady, router.query.token]);

  // NEW: Handle token usage
  const handleUseCredit = async () => {
  setIsLoading(true);
  setError(null);

  try {
    const res = await fetch('/api/use-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: tokenInfo.token,
        publicId: scanResults.reportId
      })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Failed to use credit');
    }

    // Redirect to the report page (same as after payment)
    window.location.href = `/report/${scanResults.reportId}`;
  } catch (err) {
    setError(err.message);
    setIsLoading(false);
  }
};

  // EXISTING: Regular payment handler (unchanged)
  const handleClick = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const stripe = await stripePromise;
      
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          url,
          preliminaryScan: scanResults,
          discountCode: discountCode.trim()
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (checkingToken) {
    return (
      <div className="mt-4">
        <div className="text-center text-gray-400 text-sm">Checking credits...</div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      {/* NEW: Show token option if available */}
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

      {/* EXISTING: Discount Code Section (unchanged) */}
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

      {/* EXISTING: Regular Payment Button (unchanged) */}
      <button
        type="button"
        className="w-full bg-gray-950 text-cyan-400 hover:bg-gray-900 px-6 py-3 rounded-md font-bold transition shadow-lg shadow-cyan-900/40 border border-cyan-800"
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Get Full Report ($29)'}
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

      {/* NEW: Link to buy credits if no token */}
      {!tokenInfo && (
        <p className="mt-4 text-center text-sm text-gray-300">
          Need multiple scans? <a href="/buy-credits" className="text-pink-400 hover:text-pink-300 underline">Get bulk credits →</a>
        </p>
      )}
    </div>
  );
}