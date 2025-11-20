import { useState } from 'react';
import Layout from '../components/Layout';
import { Bot, Zap, TrendingUp, CheckCircle, Sparkles } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const PACKAGES = [
  {
    id: 'starter',
    name: 'Starter Pack',
    scans: 5,
    price: 1,
    perScan: 23.80,
    discount: '18% off',
    description: 'Perfect for testing AI SEO optimization',
    icon: <Sparkles className="h-8 w-8 text-purple-400" />,
    popular: false
  },
  {
    id: 'agency',
    name: 'Agency Pack',
    scans: 10,
    price: 199,
    perScan: 19.90,
    discount: '31% off',
    description: 'Most popular for agencies and consultants',
    icon: <Bot className="h-8 w-8 text-pink-400" />,
    popular: true
  },
  {
    id: 'pro',
    name: 'Pro Pack',
    scans: 25,
    price: 399,
    perScan: 15.96,
    discount: '45% off',
    description: 'Best value for heavy users',
    icon: <TrendingUp className="h-8 w-8 text-blue-400" />,
    popular: false
  }
];

export default function BuyCredits() {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  const handlePurchase = async (packageId) => {
    setIsLoading(packageId);
    setError(null);

    try {
      const selectedPackage = PACKAGES.find(p => p.id === packageId);
      
      const response = await fetch('/api/payment-package', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId: selectedPackage.id,
          credits: selectedPackage.scans,
          amount: selectedPackage.price * 100
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      
      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });
      
      if (stripeError) {
        throw new Error(stripeError.message);
      }
    } catch (err) {
      setError(err.message);
      setIsLoading(null);
    }
  };

  return (
    <Layout title="Buy AI SEO Scan Credits - AISEOScan">
      <div className="max-w-7xl mx-auto py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Agency Packages
            </span>
          </h1>
          <p className="text-xl text-gray-200 mb-4 max-w-3xl mx-auto">
            Save big with bulk AI SEO scan credits. Perfect for agencies, consultants, and businesses 
            managing multiple client websites.
          </p>
          <p className="text-gray-300 text-sm">
            Credits never expire • Use across any websites • Same detailed reports
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-gradient-to-br ${
                pkg.popular 
                  ? 'from-pink-900/60 to-purple-900/60 border-pink-500/70' 
                  : 'from-gray-900/60 to-purple-900/40 border-purple-500/50'
              } backdrop-blur-xl rounded-2xl border-2 p-8 transition-all hover:scale-105 hover:border-pink-400/70`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="flex justify-center mb-4">
                {pkg.icon}
              </div>

              <h3 className="text-2xl font-bold text-white mb-2 text-center">
                {pkg.name}
              </h3>

              <div className="text-center mb-4">
                <div className="text-5xl font-bold text-white mb-2">
                  ${pkg.price}
                </div>
                <div className="text-gray-300 text-sm mb-1">
                  {pkg.scans} AI SEO Scans
                </div>
                <div className="text-pink-400 font-medium text-sm">
                  ${pkg.perScan.toFixed(2)} per scan • {pkg.discount}
                </div>
              </div>

              <p className="text-gray-200 text-sm text-center mb-6">
                {pkg.description}
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-sm text-gray-200">
                  <CheckCircle className="h-5 w-5 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Complete AI SEO analysis</span>
                </li>
                <li className="flex items-start text-sm text-gray-200">
                  <CheckCircle className="h-5 w-5 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Detailed implementation guides</span>
                </li>
                <li className="flex items-start text-sm text-gray-200">
                  <CheckCircle className="h-5 w-5 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Schema markup templates</span>
                </li>
                <li className="flex items-start text-sm text-gray-200">
                  <CheckCircle className="h-5 w-5 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Downloadable PDF reports</span>
                </li>
                <li className="flex items-start text-sm text-gray-200">
                  <CheckCircle className="h-5 w-5 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Credits never expire</span>
                </li>
              </ul>

              <button
                onClick={() => handlePurchase(pkg.id)}
                disabled={isLoading === pkg.id}
                className={`w-full ${
                  pkg.popular
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700'
                    : 'bg-gray-800 hover:bg-gray-700'
                } text-white font-bold py-4 rounded-lg transition-all shadow-lg ${
                  pkg.popular ? 'shadow-pink-500/50' : 'shadow-purple-500/30'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading === pkg.id ? 'Loading...' : `Buy ${pkg.name}`}
              </button>
            </div>
          ))}
        </div>

        {error && (
          <div className="mb-8 p-4 bg-rose-900/30 border border-rose-500 text-rose-200 rounded-lg text-center">
            {error}
          </div>
        )}

        <div className="bg-gradient-to-r from-gray-900/90 via-purple-900/90 to-pink-900/90 backdrop-blur-xl rounded-2xl border border-purple-500/50 p-10">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            How Agency Credits Work
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-900/40 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-purple-400">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Purchase Package</h3>
              <p className="text-gray-200 text-sm">
                Choose your package and complete checkout. You'll receive a unique link instantly.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-pink-900/40 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-pink-400">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Use Your Link</h3>
              <p className="text-gray-200 text-sm">
                Visit AISEOScan with your unique link to scan any website without payment.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-900/40 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-blue-400">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Get Full Reports</h3>
              <p className="text-gray-200 text-sm">
                Each scan uses 1 credit and gives you the complete AI SEO analysis instantly.
              </p>
            </div>
          </div>

          <div className="mt-10 bg-purple-900/30 border border-purple-500/50 rounded-lg p-6">
            <h4 className="text-lg font-bold text-white mb-3 flex items-center">
              <Zap className="h-5 w-5 text-yellow-400 mr-2" />
              Pro Tips
            </h4>
            <ul className="space-y-2 text-gray-200 text-sm">
              <li className="flex items-start">
                <span className="text-pink-400 mr-2">•</span>
                <span>Bookmark your unique link for easy access</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-400 mr-2">•</span>
                <span>Credits never expire - use them whenever you need</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-400 mr-2">•</span>
                <span>Use across any websites - no restrictions</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-400 mr-2">•</span>
                <span>Each scan includes full report + PDF download</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-300 text-sm">
            Questions? <a href="/#faq" className="text-pink-400 hover:text-pink-300 underline">Check our FAQ</a> or contact support
          </p>
        </div>
      </div>
    </Layout>
  );
}