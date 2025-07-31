import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { AlertTriangle } from 'lucide-react';

// Add this right at the top of your PaymentButton component
console.log('🔍 STRIPE KEY DEBUG:', {
  key: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  isLive: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.startsWith('pk_live_'),
  isTest: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.startsWith('pk_test_')
});

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function PaymentButton({ url, scanResults }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [discountCode, setDiscountCode] = useState('');
  const [showDiscountInput, setShowDiscountInput] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const stripe = await stripePromise;
      
      // Call your backend to create the Checkout Session
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

      // When the customer clicks on the button, redirect them to Checkout.
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

  return (
    <div className="mt-4">
      {/* Discount Code Section */}
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

      <button
        type="button"
        className="w-full bg-gray-950 text-cyan-400 hover:bg-gray-900 px-6 py-3 rounded-md font-bold transition shadow-lg shadow-cyan-900/40 border border-cyan-800"
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Get Full Report ($19)'}
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
    </div>
  );
}