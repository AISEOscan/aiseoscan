import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { CheckCircle, Copy, ExternalLink } from 'lucide-react';

export default function PackageSuccess() {
  const router = useRouter();
  const { token, credits } = router.query;
  const [copied, setCopied] = useState(false);

  const scanUrl = token ? `${process.env.NEXT_PUBLIC_BASE_URL}/?token=${token}` : '';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(scanUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!token || !credits) {
    return (
      <Layout title="Purchase Successful - AISEOScan">
        <div className="text-center py-20">
          <p className="text-gray-200">Loading your package details...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Purchase Successful - AISEOScan">
      <div className="max-w-3xl mx-auto py-12">
        <div className="bg-gradient-to-r from-gray-900/90 via-purple-900/90 to-pink-900/90 backdrop-blur-xl rounded-2xl border border-purple-500/50 p-10 text-center">
          <div className="mb-6">
            <CheckCircle className="h-20 w-20 text-emerald-400 mx-auto animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Purchase Successful!</h1>
          <p className="text-xl text-gray-200 mb-8">You now have <span className="text-pink-400 font-bold">{credits} AI SEO scan credits</span></p>
          <div className="bg-purple-900/40 border border-purple-500/50 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-bold text-white mb-4">Your Unique Scan Link:</h2>
            <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-4 mb-4">
              <code className="text-pink-300 text-sm break-all">{scanUrl}</code>
            </div>
            <div className="flex gap-4 justify-center">
              <button onClick={copyToClipboard} className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition">
                <Copy className="h-5 w-5" />
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
              <a href={scanUrl} className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition">
                <ExternalLink className="h-5 w-5" />
                Start Scanning
              </a>
            </div>
          </div>
          <div className="bg-pink-900/20 border border-pink-500/50 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-3">Important: Save This Link!</h3>
            <ul className="text-sm text-gray-200 space-y-2 text-left max-w-md mx-auto">
              <li className="flex items-start"><span className="text-pink-400 mr-2">•</span><span>Bookmark this link or save it somewhere safe</span></li>
              <li className="flex items-start"><span className="text-pink-400 mr-2">•</span><span>Use this link every time you want to scan a website</span></li>
              <li className="flex items-start"><span className="text-pink-400 mr-2">•</span><span>Each scan automatically deducts 1 credit</span></li>
              <li className="flex items-start"><span className="text-pink-400 mr-2">•</span><span>Credits never expire</span></li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}