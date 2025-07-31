import { useState } from 'react';
import { AlertTriangle, Code, TrendingUp, Zap, Shield, CheckCircle } from 'lucide-react';

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
    <div className="bg-gradient-to-r from-gray-900/90 via-blue-900/90 to-purple-900/90 backdrop-blur-xl text-white rounded-xl shadow-2xl p-8 border border-cyan-900/50 relative overflow-hidden flex flex-col items-center justify-center" style={{minHeight: '520px', maxHeight: '520px'}}>
      {/* Enhanced gradient border effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-xl opacity-30"></div>
      
      <div className="relative z-10 text-center w-full">
        <div className="flex items-center justify-center mb-6">
          <Code className="h-6 w-6 text-cyan-400 mr-3" />
          <h2 className="text-2xl font-bold tracking-tight">Comprehensive Website Analysis</h2>
        </div>
        
        {/* What we analyze */}
        <div className="mb-6 grid grid-cols-2 gap-4 max-w-sm mx-auto">
          <div className="flex items-center text-sm text-white bg-red-900/20 p-3 rounded-lg backdrop-blur-sm">
            <Shield className="h-4 w-4 text-red-400 mr-2" />
            <span>Security</span>
          </div>
          <div className="flex items-center text-sm text-white bg-green-900/20 p-3 rounded-lg backdrop-blur-sm">
            <TrendingUp className="h-4 w-4 text-green-400 mr-2" />
            <span>SEO</span>
          </div>
          <div className="flex items-center text-sm text-white bg-purple-900/20 p-3 rounded-lg backdrop-blur-sm">
            <Zap className="h-4 w-4 text-purple-400 mr-2" />
            <span>Performance</span>
          </div>
          <div className="flex items-center text-sm text-white bg-blue-900/20 p-3 rounded-lg backdrop-blur-sm">
            <CheckCircle className="h-4 w-4 text-blue-400 mr-2" />
            <span>Compliance</span>
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
                className="w-full bg-gray-800/50 border border-gray-700/50 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 font-mono backdrop-blur-sm"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            {error && (
              <div className="p-3 bg-red-900/30 border border-red-700/50 text-red-300 rounded-lg text-sm backdrop-blur-sm">
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 text-red-400 mr-2" />
                  <p>{error}</p>
                </div>
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 px-6 py-3 rounded-lg text-white font-bold transition-all duration-200 shadow-lg shadow-cyan-900/20 border border-cyan-600/50 backdrop-blur-sm"
              disabled={isLoading}
            >
              {isLoading ? 'Analyzing Website...' : 'Start Scan'}
            </button>
            
            <p className="text-xs text-white text-center">
              Get insights across security, SEO, performance, and compliance
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}