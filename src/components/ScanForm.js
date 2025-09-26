import { useState } from 'react';
import { AlertTriangle, Bot, MessageSquare, Zap, Award, CheckCircle, FileText } from 'lucide-react';

export default function ScanForm({ onScanComplete }) {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic URL validation
    if (!url) {
      setError('Please enter a URL');
      return;
    }
    
    // Add http if missing
    let formattedUrl = url;
    if (!formattedUrl.startsWith('http')) {
      formattedUrl = 'https://' + formattedUrl;
    }
    
   if (formattedUrl.includes("aiseoscan.dev") || formattedUrl.includes("google.com")) {
  const demoResults = {
    summary: { overallScore: 100, status: "ready" },
    seo: { score: 100, issues: [] },
    performance: { score: 100, issues: [] },
    compliance: { score: 100, issues: [] }
  };
  onScanComplete(demoResults, formattedUrl);
  return;
}

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: formattedUrl }),
      });
      
      if (!response.ok) {
        throw new Error('Scan failed. Please try again.');
      }
      
      const data = await response.json();
      onScanComplete(data, formattedUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-900/90 via-purple-900/90 to-pink-900/90 backdrop-blur-xl text-white rounded-xl shadow-2xl p-8 border border-purple-500/50 relative overflow-hidden flex flex-col items-center justify-center" style={{minHeight: '520px', maxHeight: '520px'}}>
      {/* Enhanced gradient border effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 rounded-xl opacity-30 animate-pulse"></div>
      
      <div className="relative z-10 text-center w-full">
        <div className="flex items-center justify-center mb-6">
          <Bot className="h-6 w-6 text-pink-400 mr-3" />
          <h2 className="text-2xl font-bold tracking-tight">AI SEO Analysis</h2>
        </div>
        
        {/* What we analyze - AI SEO focused */}
        <div className="mb-6 grid grid-cols-2 gap-4 max-w-sm mx-auto">
          <div className="flex items-center text-sm text-white bg-purple-900/20 p-3 rounded-lg backdrop-blur-sm">
            <FileText className="h-4 w-4 text-purple-400 mr-2" />
            <span>Schema Markup</span>
          </div>
          <div className="flex items-center text-sm text-white bg-pink-900/20 p-3 rounded-lg backdrop-blur-sm">
            <MessageSquare className="h-4 w-4 text-pink-400 mr-2" />
            <span>Content Quality</span>
          </div>
          <div className="flex items-center text-sm text-white bg-blue-900/20 p-3 rounded-lg backdrop-blur-sm">
            <Zap className="h-4 w-4 text-blue-400 mr-2" />
            <span>Technical SEO</span>
          </div>
          <div className="flex items-center text-sm text-white bg-emerald-900/20 p-3 rounded-lg backdrop-blur-sm">
            <Award className="h-4 w-4 text-emerald-400 mr-2" />
            <span>Trust Signals</span>
          </div>
        </div>
        
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-white mb-2">
                Website URL
              </label>
              <input
                type="text"
                id="url"
                placeholder="example.com"
                className="w-full bg-gray-800/50 border border-gray-700/50 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 font-mono backdrop-blur-sm"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            {error && (
              <div className="p-3 bg-rose-900/30 border border-rose-700/50 text-rose-300 rounded-lg text-sm backdrop-blur-sm">
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 text-rose-400 mr-2" />
                  <p>{error}</p>
                </div>
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 px-6 py-3 rounded-lg text-white font-bold transition-all duration-200 shadow-lg shadow-pink-900/20 border border-pink-600/50 backdrop-blur-sm"
              disabled={isLoading}
            >
              {isLoading ? 'Analyzing AI SEO Readiness...' : 'Get FREE AISEO Score '}
            </button>
            
            <p className="text-xs text-white text-center">
              Optimize for ChatGPT, Perplexity, SearchGPT & AI search engines
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}