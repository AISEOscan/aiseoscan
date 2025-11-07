import Layout from '../components/Layout'
import Link from 'next/link'
import { Bot, ArrowRight, Package, Code, ShoppingBag, Layers, Zap } from 'lucide-react'
import platformsData from '../data/pseo/platforms-ai-seo.json'
import industriesData from '../data/pseo/industries-ai-seo.json'

export default function AISeoPlatforms() {
  const platforms = platformsData.platforms
  const industries = industriesData.industries

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Easy': 'green',
      'Medium': 'yellow',
      'Hard': 'red'
    }
    return colors[difficulty] || 'gray'
  }

  return (
    <Layout
      title="AI SEO by Platform | Implementation Guides for Every CMS"
      description="Platform-specific AI SEO guides for WordPress, Shopify, Wix, Webflow, and more. Get technical implementation strategies for ChatGPT, Perplexity, and SearchGPT optimization."
    >
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center mb-6">
          <Package className="h-16 w-16 text-pink-400 mr-4" />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent leading-tight pb-2">
            AI SEO Implementation by Platform
          </h1>
        </div>
        <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
          Platform-specific technical guides for optimizing your website for ChatGPT, Perplexity, SearchGPT, and other AI search engines. Choose your platform for tailored implementation strategies.
        </p>

        <div className="bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-blue-900/30 border border-pink-500/50 p-8 rounded-xl backdrop-blur-sm inline-block mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-pink-400">{platforms.length}</p>
              <p className="text-gray-300">Platforms Covered</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-purple-400">{platforms.length * industries.length}</p>
              <p className="text-gray-300">Technical Guides</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-400">{industries.length}</p>
              <p className="text-gray-300">Industries</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-pink-900/40 via-purple-900/40 to-blue-900/40 border border-pink-500/50 p-8 rounded-xl backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-white mb-4">
            Get Platform-Specific Recommendations
          </h3>
          <p className="text-gray-300 mb-6 text-lg">
            Scan your website for AI SEO issues • Platform-specific fixes • Instant results
          </p>
          <Link href="/">
            <button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl">
              <span className="flex items-center justify-center">
                <Bot className="mr-2 h-5 w-5" />
                Scan Your Website Free
              </span>
            </button>
          </Link>
        </div>
      </div>

      {/* Platforms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {platforms.map((platform) => {
          const difficultyColor = getDifficultyColor(platform.difficulty)
          
          return (
            <div 
              key={platform.id}
              className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 hover:border-purple-400/70 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <Package className="h-10 w-10 text-purple-400 mr-4" />
                  <div>
                    <h2 className="text-2xl font-bold text-white">{platform.name}</h2>
                    <p className="text-gray-400 text-sm">{platform.description}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                <div className="bg-purple-900/20 p-3 rounded border border-purple-500/30">
                  <p className="text-2xl font-bold text-purple-400">{platform.market_share}</p>
                  <p className="text-gray-400 text-xs">Market Share</p>
                </div>
                <div className={`bg-${difficultyColor}-900/20 p-3 rounded border border-${difficultyColor}-500/30`}>
                  <p className={`text-2xl font-bold text-${difficultyColor}-400`}>{platform.difficulty}</p>
                  <p className="text-gray-400 text-xs">Difficulty</p>
                </div>
                <div className="bg-blue-900/20 p-3 rounded border border-blue-500/30">
                  <p className="text-2xl font-bold text-blue-400">{platform.setup_time}</p>
                  <p className="text-gray-400 text-xs">Setup Time</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-purple-300 mb-3">Best For:</h4>
                <div className="flex flex-wrap gap-2">
                  {platform.best_for.map((use, index) => (
                    <span key={index} className="bg-purple-900/30 text-purple-200 px-3 py-1 rounded-full text-xs border border-purple-500/30">
                      {use}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-green-300 mb-3">AI SEO Advantages:</h4>
                <ul className="space-y-2">
                  {platform.ai_seo_advantages.slice(0, 3).map((advantage, index) => (
                    <li key={index} className="flex items-start text-gray-300 text-sm">
                      <Zap className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{advantage}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-purple-500/30 pt-4">
                <p className="text-gray-400 text-sm mb-4">
                  View AI SEO guides for {industries.length} industries on {platform.name}:
                </p>
                <Link href={`/ai-seo-law-firms-${platform.slug}`}>
                  <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center">
                    Browse {platform.name} Guides
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      {/* Popular Combinations */}
      <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-16">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Code className="h-8 w-8 text-purple-400 mr-3" />
          Popular Platform × Industry Guides
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { industry: 'law-firms', industryName: 'Law Firms', platform: 'wordpress', platformName: 'WordPress' },
            { industry: 'restaurants', industryName: 'Restaurants', platform: 'wordpress', platformName: 'WordPress' },
            { industry: 'hotels', industryName: 'Hotels', platform: 'wordpress', platformName: 'WordPress' },
            { industry: 'fashion-retail', industryName: 'Fashion Retail', platform: 'shopify', platformName: 'Shopify' },
            { industry: 'saas', industryName: 'SaaS', platform: 'nextjs', platformName: 'Next.js' },
            { industry: 'real-estate', industryName: 'Real Estate', platform: 'wix', platformName: 'Wix' }
          ].map((combo, index) => (
            <Link key={index} href={`/ai-seo-${combo.industry}-${combo.platform}`}>
              <div className="bg-gray-800/30 p-5 rounded-lg border border-purple-500/30 hover:border-purple-400/60 transition-colors cursor-pointer">
                <h4 className="font-semibold text-purple-300 mb-2">{combo.industryName} on {combo.platformName}</h4>
                <p className="text-gray-400 text-sm flex items-center">
                  View guide <ArrowRight className="ml-2 h-4 w-4" />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-pink-900/40 via-purple-900/40 to-blue-900/40 border-2 border-pink-500/60 p-10 rounded-xl backdrop-blur-sm text-center">
        <h3 className="text-3xl font-bold text-white mb-4">
          Get Platform-Specific AI SEO Recommendations
        </h3>
        <p className="text-gray-200 mb-6 text-lg max-w-2xl mx-auto">
          Scan your website to get implementation strategies tailored to your platform. No credit card required.
        </p>
        <Link href="/">
          <button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-5 px-10 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl">
            <span className="flex items-center justify-center">
              <Bot className="mr-3 h-6 w-6" />
              Scan Your Website Now - It's Free
            </span>
          </button>
        </Link>
      </div>
    </Layout>
  )
}