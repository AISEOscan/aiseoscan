import Link from 'next/link'
import { Bot, MapPin, TrendingUp, Users, Target, CheckCircle, ArrowRight, Award, BarChart3, Lightbulb, AlertTriangle, Zap, Globe, Eye, Building2 } from 'lucide-react'

export default function IndustryLocationTemplate({ pageData }) {
  const {
    h1,
    industryName,
    cityName,
    state,
    stateCode,
    content,
    stats,
    internalLinks
  } = pageData

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section with Location Context */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <MapPin className="h-12 w-12 text-pink-400 mr-4" />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            {h1}
          </h1>
        </div>
        
        <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
          Dominate AI search engines like ChatGPT, Perplexity, and SearchGPT in {cityName}'s competitive {industryName.toLowerCase()} market
        </p>
        
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-r from-purple-900/30 to-purple-800/30 border border-purple-500/50 p-4 rounded-xl backdrop-blur-sm">
            <TrendingUp className="h-6 w-6 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats.industry_ai_growth}</div>
            <div className="text-xs text-gray-300">AI Growth</div>
          </div>
          <div className="bg-gradient-to-r from-pink-900/30 to-pink-800/30 border border-pink-500/50 p-4 rounded-xl backdrop-blur-sm">
            <Users className="h-6 w-6 text-pink-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats.city_businesses}</div>
            <div className="text-xs text-gray-300">{cityName} Businesses</div>
          </div>
          <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 border border-blue-500/50 p-4 rounded-xl backdrop-blur-sm">
            <Globe className="h-6 w-6 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats.city_ai_adoption}</div>
            <div className="text-xs text-gray-300">AI Adoption</div>
          </div>
          <div className="bg-gradient-to-r from-emerald-900/30 to-emerald-800/30 border border-emerald-500/50 p-4 rounded-xl backdrop-blur-sm">
            <BarChart3 className="h-6 w-6 text-emerald-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats.local_search_volume}</div>
            <div className="text-xs text-gray-300">Monthly Searches</div>
          </div>
        </div>

        {/* Primary CTA #1 */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="/" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Get Your Free AI SEO Score Now
          </a>
          <a href="/" className="bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-700 transition-all duration-300 border border-gray-600">
            View Sample Report ($9)
          </a>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-12">
        <div className="prose prose-invert max-w-none">
          <div className="text-gray-200 text-lg leading-relaxed whitespace-pre-line">
            {content.intro}
          </div>
        </div>
      </div>

      {/* Why AI SEO Matters Section */}
      <div className="bg-gradient-to-r from-gray-900/60 to-pink-900/20 backdrop-blur-sm p-8 rounded-xl border border-pink-500/50 mb-12">
        <div className="flex items-start mb-6">
          <Target className="h-8 w-8 text-pink-400 mr-4 mt-1 flex-shrink-0" />
          <div className="prose prose-invert max-w-none w-full">
            <div className="text-gray-200 text-lg leading-relaxed whitespace-pre-line">
              {content.whyAISEOMatters}
            </div>
          </div>
        </div>

        {/* CTA #2 - Mid-Content */}
        <div className="mt-8 bg-gradient-to-r from-pink-900/30 to-purple-900/30 border border-pink-500/50 p-6 rounded-lg text-center">
          <p className="text-pink-200 mb-4 font-medium">
            Ready to see how your {cityName} {industryName.toLowerCase()} business ranks for AI search?
          </p>
          <a href="/" className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
            Run Free AI SEO Scan
          </a>
        </div>
      </div>

      {/* Local Challenges Section */}
      <div className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 mb-12">
        <div className="flex items-start mb-6">
          <AlertTriangle className="h-8 w-8 text-blue-400 mr-4 mt-1 flex-shrink-0" />
          <div className="prose prose-invert max-w-none w-full">
            <div className="text-gray-200 text-lg leading-relaxed whitespace-pre-line">
              {content.localChallenges}
            </div>
          </div>
        </div>
      </div>

      {/* AI SEO Strategy Section */}
      <div className="bg-gradient-to-r from-gray-900/60 to-emerald-900/20 backdrop-blur-sm p-8 rounded-xl border border-emerald-500/50 mb-12">
        <div className="flex items-start mb-6">
          <Zap className="h-8 w-8 text-emerald-400 mr-4 mt-1 flex-shrink-0" />
          <div className="prose prose-invert max-w-none w-full">
            <div className="text-gray-200 text-lg leading-relaxed whitespace-pre-line">
              {content.aiSEOStrategy}
            </div>
          </div>
        </div>

        {/* CTA #3 - Strategy Section */}
        <div className="mt-8 bg-gradient-to-r from-emerald-900/30 to-blue-900/30 border border-emerald-500/50 p-6 rounded-lg text-center">
          <p className="text-emerald-200 mb-4 font-medium">
            Get a detailed AI SEO roadmap customized for your {cityName} business
          </p>
          <a href="/" className="inline-block bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
            Get $9 Detailed Report
          </a>
        </div>
      </div>

      {/* Measurement & ROI Section */}
      <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-12">
        <div className="flex items-start mb-6">
          <BarChart3 className="h-8 w-8 text-purple-400 mr-4 mt-1 flex-shrink-0" />
          <div className="prose prose-invert max-w-none w-full">
            <div className="text-gray-200 text-lg leading-relaxed whitespace-pre-line">
              {content.measurementROI}
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Roadmap Section */}
      <div className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 mb-12">
        <div className="flex items-start mb-6">
          <CheckCircle className="h-8 w-8 text-blue-400 mr-4 mt-1 flex-shrink-0" />
          <div className="prose prose-invert max-w-none w-full">
            <div className="text-gray-200 text-lg leading-relaxed whitespace-pre-line">
              {content.implementation}
            </div>
          </div>
        </div>

        {/* CTA #4 - Implementation Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/50 p-6 rounded-lg text-center">
          <p className="text-blue-200 mb-4 font-medium">
            Start implementing AI SEO for your {cityName} {industryName.toLowerCase()} business today
          </p>
          <a href="/" className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
            Begin Free Scan
          </a>
        </div>
      </div>

      {/* Local Case Study Section */}
      <div className="bg-gradient-to-r from-gray-900/60 to-pink-900/20 backdrop-blur-sm p-8 rounded-xl border border-pink-500/50 mb-12">
        <div className="flex items-start mb-6">
          <Award className="h-8 w-8 text-pink-400 mr-4 mt-1 flex-shrink-0" />
          <div className="prose prose-invert max-w-none w-full">
            <div className="text-gray-200 text-lg leading-relaxed whitespace-pre-line">
              {content.localCaseStudy}
            </div>
          </div>
        </div>
      </div>

      {/* Competitive Advantage Section */}
      <div className="bg-gradient-to-r from-gray-900/60 to-emerald-900/20 backdrop-blur-sm p-8 rounded-xl border border-emerald-500/50 mb-12">
        <div className="flex items-start mb-6">
          <TrendingUp className="h-8 w-8 text-emerald-400 mr-4 mt-1 flex-shrink-0" />
          <div className="prose prose-invert max-w-none w-full">
            <div className="text-gray-200 text-lg leading-relaxed whitespace-pre-line">
              {content.competitiveAdvantage}
            </div>
          </div>
        </div>

        {/* CTA #5 - Competitive Section */}
        <div className="mt-8 bg-gradient-to-r from-emerald-900/30 to-pink-900/30 border border-emerald-500/50 p-6 rounded-lg text-center">
          <p className="text-emerald-200 mb-4 font-medium">
            Don't let competitors dominate AI search in {cityName}
          </p>
          <a href="/" className="inline-block bg-gradient-to-r from-emerald-500 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
            Claim Your Advantage Now
          </a>
        </div>
      </div>

      {/* Primary CTA Section */}
      <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-12">
        <div className="prose prose-invert max-w-none">
          <div className="text-gray-200 text-lg leading-relaxed whitespace-pre-line">
            {content.ctaSection}
          </div>
        </div>

        {/* CTA #6 - Main CTA Section */}
        <div className="mt-8 text-center">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl">
              🚀 Start Free AI SEO Scan
            </a>
            <a href="/" className="bg-gradient-to-r from-blue-500 to-emerald-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:from-blue-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-xl">
              💎 Get $9 Detailed Report
            </a>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 mb-12">
        <div className="flex items-start mb-6">
          <Lightbulb className="h-8 w-8 text-blue-400 mr-4 mt-1 flex-shrink-0" />
          <div className="prose prose-invert max-w-none w-full">
            <div className="text-gray-200 text-lg leading-relaxed whitespace-pre-line">
              {content.faq}
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-blue-900/40 backdrop-blur-sm p-10 rounded-xl border border-pink-500/50 text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Dominate AI Search in {cityName}?
        </h2>
        <div className="prose prose-invert max-w-none mb-8">
          <div className="text-gray-200 text-lg leading-relaxed whitespace-pre-line">
            {content.finalCTA}
          </div>
        </div>

        {/* CTA #7 & #8 - Final Section */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <a href="/" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-5 rounded-lg font-bold text-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl">
            🎯 Get Free AI SEO Score
          </a>
          <a href="/" className="bg-gradient-to-r from-blue-500 to-emerald-600 text-white px-10 py-5 rounded-lg font-bold text-xl hover:from-blue-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-2xl">
            📊 Buy $9 Report
          </a>
        </div>

        <p className="text-gray-300 text-sm">
          Join {industryName.toLowerCase()} businesses in {cityName} already winning with AI SEO
        </p>
      </div>

      {/* Internal Links Section */}
      <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Building2 className="h-6 w-6 text-purple-400 mr-3" />
          Related AI SEO Resources
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {internalLinks && internalLinks.map((link, index) => (
            <Link 
              key={index}
              href={link.url}
              className="flex items-center p-4 bg-gray-800/50 rounded-lg border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 group"
            >
              <ArrowRight className="h-5 w-5 text-purple-400 mr-3 group-hover:translate-x-1 transition-transform" />
              <span className="text-gray-200 group-hover:text-white">{link.text}</span>
            </Link>
          ))}
        </div>

        {/* Final CTA in Links Section */}
        <div className="mt-8 text-center">
          <a href="/" className="inline-block bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-300">
            Explore All AI SEO Guides
          </a>
        </div>
      </div>
    </div>
  )
}