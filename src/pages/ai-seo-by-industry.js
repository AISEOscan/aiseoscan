import Layout from '../components/Layout'
import Link from 'next/link'
import { Bot, ArrowRight, Building2, Heart, ShoppingCart, UtensilsCrossed, GraduationCap, Code, Home, Palette, Factory, TrendingUp } from 'lucide-react'
import industriesData from '../data/pseo/industries-ai-seo.json'

export default function AISeoBByIndustry() {
  const industries = industriesData.industries

  // Group industries by category
  const categorized = industries.reduce((acc, industry) => {
    if (!acc[industry.category]) {
      acc[industry.category] = []
    }
    acc[industry.category].push(industry)
    return acc
  }, {})

  // Icon mapping for categories
  const categoryIcons = {
    'Business Services': Building2,
    'Healthcare & Wellness': Heart,
    'Retail & E-commerce': ShoppingCart,
    'Food & Hospitality': UtensilsCrossed,
    'Education & Training': GraduationCap,
    'Technology & SaaS': Code,
    'Home Services': Home,
    'Creative & Media': Palette,
    'Specialized Industries': Factory
  }

  const getCategoryIcon = (category) => {
    const Icon = categoryIcons[category] || Building2
    return Icon
  }

  // Content types with their URL patterns
  const contentTypes = [
    { label: 'Guide', url: 'ai-seo-', color: 'purple' },
    { label: 'Mistakes', url: 'ai-seo-mistakes-', color: 'red' },
    { label: 'Checklist', url: 'ai-seo-checklist-', color: 'blue' },
    { label: 'Best Practices', url: 'ai-seo-best-practices-', color: 'green' }
  ]

  return (
    <Layout
      title="AI SEO Guides by Industry | Complete 2025 Resource"
      description="Comprehensive AI SEO optimization guides for 110+ industries. Get industry-specific strategies to rank in ChatGPT, Perplexity, and SearchGPT. Free website analysis."
    >
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center mb-6">
          <Bot className="h-16 w-16 text-pink-400 mr-4" />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            AI SEO Guides by Industry
          </h1>
        </div>
        <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
          Industry-specific AI SEO optimization strategies for ChatGPT, Perplexity, SearchGPT, and other AI search engines. Choose your industry for tailored guidance.
        </p>

        <div className="bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-blue-900/30 border border-pink-500/50 p-8 rounded-xl backdrop-blur-sm inline-block mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-pink-400 mb-2">110+</p>
              <p className="text-gray-300">Industries Covered</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-purple-400 mb-2">440+</p>
              <p className="text-gray-300">Detailed Guides</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-400 mb-2">4</p>
              <p className="text-gray-300">Content Types</p>
            </div>
          </div>
        </div>

        {/* Free Scan CTA */}
        <div className="bg-gradient-to-r from-pink-900/40 via-purple-900/40 to-blue-900/40 border border-pink-500/50 p-8 rounded-xl backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-white mb-4">
            Get Your Free AI SEO Score
          </h3>
          <p className="text-gray-300 mb-6 text-lg">
            Scan your website in 60 seconds • No credit card required • Instant results
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

      {/* Content Type Legend */}
      <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-6 rounded-xl border border-purple-500/50 mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <TrendingUp className="mr-3 h-6 w-6 text-purple-400" />
          4 Guide Types Per Industry
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
            <h4 className="font-semibold text-purple-300 mb-2">Complete Guide</h4>
            <p className="text-sm text-gray-300">Comprehensive optimization strategies and implementation</p>
          </div>
          <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
            <h4 className="font-semibold text-red-300 mb-2">Common Mistakes</h4>
            <p className="text-sm text-gray-300">Critical errors to avoid and how to fix them</p>
          </div>
          <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
            <h4 className="font-semibold text-blue-300 mb-2">Checklist</h4>
            <p className="text-sm text-gray-300">Step-by-step tasks for complete optimization</p>
          </div>
          <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
            <h4 className="font-semibold text-green-300 mb-2">Best Practices</h4>
            <p className="text-sm text-gray-300">Expert tactics and advanced strategies</p>
          </div>
        </div>
      </div>

      {/* Industries by Category */}
      {Object.entries(categorized).sort().map(([category, categoryIndustries]) => {
        const Icon = getCategoryIcon(category)
        
        return (
          <div key={category} className="mb-12">
            <div className="flex items-center mb-6">
              <Icon className="h-8 w-8 text-purple-400 mr-3" />
              <h2 className="text-3xl font-bold text-white">{category}</h2>
              <span className="ml-4 bg-purple-900/40 text-purple-300 px-3 py-1 rounded-full text-sm font-semibold">
                {categoryIndustries.length} {categoryIndustries.length === 1 ? 'Industry' : 'Industries'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categoryIndustries.map((industry) => (
                <div 
                  key={industry.id} 
                  className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-6 rounded-xl border border-purple-500/50 hover:border-purple-400/70 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-white mb-2">{industry.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{industry.description}</p>
                  
                  {/* Stats */}
                  <div className="flex gap-4 mb-4 text-xs">
                    <div className="bg-pink-900/20 px-3 py-1 rounded border border-pink-500/30">
                      <span className="text-pink-300 font-semibold">{industry.stats.ai_growth}</span>
                      <span className="text-gray-400 ml-1">AI Growth</span>
                    </div>
                    <div className="bg-purple-900/20 px-3 py-1 rounded border border-purple-500/30">
                      <span className="text-purple-300 font-semibold">{industry.stats.industry_adoption}</span>
                      <span className="text-gray-400 ml-1">Adoption</span>
                    </div>
                  </div>

                  {/* Content Type Links */}
                  <div className="grid grid-cols-2 gap-2">
                    {contentTypes.map((type) => (
                      <Link 
                        key={type.label} 
                        href={`/${type.url}${industry.slug}`}
                      >
                        <div className={`bg-${type.color}-900/20 hover:bg-${type.color}-900/40 border border-${type.color}-500/30 hover:border-${type.color}-400/60 p-3 rounded transition-all duration-200 cursor-pointer group`}>
                          <p className={`text-${type.color}-300 text-sm font-semibold flex items-center justify-between`}>
                            {type.label}
                            <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}

      {/* Bottom CTA */}
      <div className="mt-16 bg-gradient-to-r from-pink-900/40 via-purple-900/40 to-blue-900/40 border-2 border-pink-500/60 p-10 rounded-xl backdrop-blur-sm text-center">
        <h3 className="text-3xl font-bold text-white mb-4">
          Ready to Optimize Your Website for AI Search?
        </h3>
        <p className="text-gray-200 mb-6 text-lg max-w-2xl mx-auto">
          Get instant access to your AI SEO score and comprehensive optimization report. 
          No credit card required. Results in 60 seconds.
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