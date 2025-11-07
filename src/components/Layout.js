import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Bot } from 'lucide-react';

export default function Layout({ children, title = 'AISEO Scanner - Is your website ready for AI search ?', description }) {
  const router = useRouter();
  const canonicalUrl = `https://aiseoscan.dev${router.asPath}`;
  const metaDescription = description || "AI SEO report - Optimize your website for ChatGPT, Perplexity, SearchGPT and other AI search engines. Get comprehensive schema markup, content quality, and authority signal analysis.";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-pink-950 font-sans text-white">
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Favicon declarations */}
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>

      <header className="bg-gray-950/80 backdrop-blur-xl border-b border-purple-500/30 shadow-2xl">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/">
                <div className="flex items-center space-x-2 cursor-pointer group">
                  <div className="relative">
                    <Bot className="h-7 w-7 text-pink-400 group-hover:text-pink-300 transition-colors" />
                    <div className="absolute -inset-1 bg-pink-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"></div>
                  </div>
                  <span className="text-xl font-bold tracking-tight text-white group-hover:text-pink-100 transition-colors">
                    AI<span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">SEO</span><span className="text-gray-300">Scan</span>
                  </span>
                </div>
              </Link>
            </div>
                           
            {/* AI-focused navigation badges */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-1 text-xs">
                <span className="px-3 py-1 bg-gradient-to-r from-purple-900/40 to-purple-800/40 border border-purple-500/50 rounded-full text-purple-200 backdrop-blur-sm">
                  Schema Markup
                </span>
                <span className="px-3 py-1 bg-gradient-to-r from-pink-900/40 to-pink-800/40 border border-pink-500/50 rounded-full text-pink-200 backdrop-blur-sm">
                  Content Quality
                </span>
                <span className="px-3 py-1 bg-gradient-to-r from-blue-900/40 to-blue-800/40 border border-blue-500/50 rounded-full text-blue-200 backdrop-blur-sm">
                  Technical SEO
                </span>
                <span className="px-3 py-1 bg-gradient-to-r from-emerald-900/40 to-emerald-800/40 border border-emerald-500/50 rounded-full text-emerald-200 backdrop-blur-sm">
                  Trust Signals
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        {children}
      </main>

      <footer className="bg-gray-950/80 backdrop-blur-xl border-t border-purple-500/30 mt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-center text-gray-300 text-sm font-light">
              &copy; {new Date().getFullYear()} AISEOScan. All rights reserved.
            </p>
            
            <div className="flex flex-col md:flex-row items-center gap-4 text-xs text-gray-400">
              <div className="flex items-center space-x-4">
                <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent font-medium">
                  AI SEO optimization platform
                </span>
                <span>•</span>
                <span>ChatGPT • Perplexity • SearchGPT Ready</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="hidden md:inline">•</span>
                <Link 
                  href="/ai-seo-guides"
                  className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
                >
                  AI SEO Guides
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}