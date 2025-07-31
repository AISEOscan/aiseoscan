import Head from 'next/head';
import Link from 'next/link';
import { BarChart3 } from 'lucide-react';

export default function Layout({ children, title = 'FounderScan - Complete Website Growth Analysis' }) {
  return (
    <div className="min-h-screen bg-gray-950 font-mono text-white">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Complete website analysis covering security, SEO, performance, and compliance for founders and entrepreneurs" />
      </Head>

      <header className="bg-gray-950 border-b border-gray-800/50 shadow-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/">
                <div className="flex items-center space-x-2 cursor-pointer group">
                  <BarChart3 className="h-6 w-6 text-gray-300 group-hover:text-white transition-colors" />
                  <span className="text-xl font-bold tracking-tight text-gray-200 group-hover:text-white transition-colors">
                    Founder<span className="text-gray-400">Scan</span>
                  </span>
                </div>
              </Link>
            </div>
                        
            {/* Optional: Add navigation links */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-1 text-xs text-gray-400">
                <span className="px-2 py-1 bg-red-900/30 rounded text-red-300">Security</span>
                <span className="px-2 py-1 bg-green-900/30 rounded text-green-300">SEO</span>
                <span className="px-2 py-1 bg-purple-900/30 rounded text-purple-300">Performance</span>
                <span className="px-2 py-1 bg-blue-900/30 rounded text-blue-300">Compliance</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        {children}
      </main>

      <footer className="bg-gray-950 border-t border-gray-800/50 mt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-center text-gray-500 text-sm font-light">
              &copy; {new Date().getFullYear()} FounderScan. All rights reserved.
            </p>
            <div className="mt-2 md:mt-0 flex items-center space-x-4 text-xs text-gray-400">
              <span>Complete website growth analysis</span>
              <span>•</span>
              <span>Security • SEO • Performance • Compliance</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}