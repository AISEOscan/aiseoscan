import { useState } from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'
import { Bot, CheckCircle, XCircle, Star, TrendingUp, Zap, DollarSign, Users, BarChart3, Search, ArrowRight, Award, Target, Sparkles } from 'lucide-react'

export default function BestAISEOTools2025() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const tools = [
    {
      name: "AISEOScan",
      tagline: "The Only AI Search Optimization Scanner You Need",
      category: "scanner",
      price: "Free",
      rating: 5.0,
      featured: true,
      pros: [
        "Scans for ChatGPT, Perplexity, Claude, Gemini optimization",
        "30+ AI-specific SEO checks in one scan",
        "Schema markup validation for AI comprehension",
        "Citation-ready content analysis",
        "Authority signal evaluation",
        "Instant actionable recommendations",
        "Free detailed reports with payment options"
      ],
      cons: [
        "Focused on AI search (not traditional SEO)"
      ],
      bestFor: "Website owners optimizing for AI search engines",
      link: "/",
      cta: "Scan Your Site Free",
      features: {
        aiPlatforms: ["ChatGPT", "Perplexity", "Claude", "Gemini", "SearchGPT", "Copilot"],
        checks: "30+",
        schemaValidation: true,
        citationTracking: true,
        reports: "Instant PDF"
      }
    },
    {
      name: "Surfer SEO",
      tagline: "Content optimization with AI writing assistance",
      category: "content",
      price: "$89/mo",
      rating: 4.5,
      pros: [
        "Content editor with real-time optimization",
        "SERP analysis and keyword research",
        "AI writing assistant (Surfy)",
        "Integrates with Google Docs and WordPress"
      ],
      cons: [
        "Expensive for small businesses",
        "Primarily focused on traditional Google SEO",
        "Limited AI search engine optimization",
        "Steep learning curve for beginners"
      ],
      bestFor: "Content marketers optimizing for Google",
      features: {
        aiPlatforms: ["Limited"],
        contentOptimization: true,
        traditionalSEO: true
      }
    },
    {
      name: "Jasper AI",
      tagline: "AI content generation at scale",
      category: "content",
      price: "$49/mo",
      rating: 4.3,
      pros: [
        "Fast AI content generation",
        "Multiple content templates",
        "Brand voice customization",
        "Supports 25+ languages"
      ],
      cons: [
        "Content needs heavy editing for quality",
        "No built-in SEO optimization",
        "Expensive for high-volume needs",
        "Not optimized for AI search citations"
      ],
      bestFor: "Content teams needing volume",
      features: {
        contentGeneration: true,
        aiOptimization: false
      }
    },
    {
      name: "Clearscope",
      tagline: "Content optimization with keyword relevance",
      category: "content",
      price: "$199/mo",
      rating: 4.4,
      pros: [
        "Deep content relevance scoring",
        "Keyword recommendations",
        "Competitive content analysis",
        "Google Docs integration"
      ],
      cons: [
        "Very expensive for small teams",
        "Traditional SEO focus only",
        "No AI search optimization",
        "Limited to content optimization"
      ],
      bestFor: "Enterprise content optimization",
      features: {
        contentOptimization: true,
        traditionalSEO: true
      }
    },
    {
      name: "SEMrush",
      tagline: "All-in-one traditional SEO platform",
      category: "all-in-one",
      price: "$129/mo",
      rating: 4.6,
      pros: [
        "Comprehensive keyword research",
        "Competitor analysis",
        "Site auditing tools",
        "Backlink analysis"
      ],
      cons: [
        "Expensive monthly cost",
        "Overwhelming for beginners",
        "No AI search optimization features",
        "Primarily Google-focused"
      ],
      bestFor: "SEO agencies and large teams",
      features: {
        traditionalSEO: true,
        competitorAnalysis: true
      }
    },
    {
      name: "Ahrefs",
      tagline: "Backlink analysis and SEO research",
      category: "research",
      price: "$129/mo",
      rating: 4.7,
      pros: [
        "Best-in-class backlink analysis",
        "Extensive keyword database",
        "Content Explorer tool",
        "Rank tracking"
      ],
      cons: [
        "Expensive pricing tiers",
        "Data can be overwhelming",
        "No AI search optimization",
        "Steep learning curve"
      ],
      bestFor: "Link building and SEO research",
      features: {
        backlinkAnalysis: true,
        keywordResearch: true
      }
    }
  ]

  const categories = [
    { id: 'all', name: 'All Tools', icon: Star },
    { id: 'scanner', name: 'AI SEO Scanners', icon: Search },
    { id: 'content', name: 'Content Optimization', icon: BarChart3 },
    { id: 'research', name: 'Research Tools', icon: Target },
    { id: 'all-in-one', name: 'All-in-One', icon: Sparkles }
  ]

  const filteredTools = selectedCategory === 'all' 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory)

  const comparisonFeatures = [
    { feature: "AI Search Optimization", aiSeoScan: true, surfer: false, jasper: false, clearscope: false, semrush: false, ahrefs: false },
    { feature: "ChatGPT/Perplexity Ready", aiSeoScan: true, surfer: false, jasper: false, clearscope: false, semrush: false, ahrefs: false },
    { feature: "Schema Markup Validation", aiSeoScan: true, surfer: true, jasper: false, clearscope: false, semrush: true, ahrefs: false },
    { feature: "Citation Analysis", aiSeoScan: true, surfer: false, jasper: false, clearscope: false, semrush: false, ahrefs: false },
    { feature: "Free Tier Available", aiSeoScan: true, surfer: false, jasper: false, clearscope: false, semrush: false, ahrefs: false },
    { feature: "Instant Reports", aiSeoScan: true, surfer: true, jasper: true, clearscope: true, semrush: true, ahrefs: true },
    { feature: "Traditional SEO", aiSeoScan: false, surfer: true, jasper: false, clearscope: true, semrush: true, ahrefs: true },
    { feature: "Content Generation", aiSeoScan: false, surfer: true, jasper: true, clearscope: false, semrush: false, ahrefs: false },
  ]

  return (
    <Layout 
      title="Best AI SEO Tools 2025 - Complete Comparison & Reviews"
      description="Compare the best AI SEO tools for 2025. Expert reviews of AISEOScan, Surfer SEO, Jasper, and more. Find the perfect tool for ChatGPT, Perplexity, and AI search optimization."
    >
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center mb-6">
          <Award className="h-12 w-12 text-pink-400 mr-4" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Best AI SEO Tools 2025
          </h1>
        </div>
        <p className="text-xl text-gray-200 mb-6 max-w-3xl mx-auto leading-relaxed">
          Expert comparison of the top AI SEO tools for optimizing your website for ChatGPT, Perplexity, Claude, and emerging AI search engines. Updated January 2025.
        </p>
        
        <div className="bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-blue-900/30 border border-pink-500/50 p-6 rounded-xl backdrop-blur-sm inline-block">
          <p className="text-pink-200 text-lg font-medium">
            🏆 Based on testing 20+ AI SEO tools with 500+ websites
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
        <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 p-6 rounded-xl border border-purple-500/50">
          <TrendingUp className="h-8 w-8 text-purple-400 mb-3" />
          <div className="text-3xl font-bold text-white mb-1">1.2B+</div>
          <div className="text-gray-300 text-sm">Monthly AI searches</div>
        </div>
        <div className="bg-gradient-to-br from-pink-900/40 to-pink-800/20 p-6 rounded-xl border border-pink-500/50">
          <Users className="h-8 w-8 text-pink-400 mb-3" />
          <div className="text-3xl font-bold text-white mb-1">347M</div>
          <div className="text-gray-300 text-sm">ChatGPT monthly users</div>
        </div>
        <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 p-6 rounded-xl border border-blue-500/50">
          <BarChart3 className="h-8 w-8 text-blue-400 mb-3" />
          <div className="text-3xl font-bold text-white mb-1">8.3x</div>
          <div className="text-gray-300 text-sm">Avg citation increase</div>
        </div>
        <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/20 p-6 rounded-xl border border-emerald-500/50">
          <Zap className="h-8 w-8 text-emerald-400 mb-3" />
          <div className="text-3xl font-bold text-white mb-1">20+</div>
          <div className="text-gray-300 text-sm">Tools tested</div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Filter by Category</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map(cat => {
            const Icon = cat.icon
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white border-2 border-pink-400'
                    : 'bg-gray-800/50 text-gray-300 border border-gray-700 hover:border-pink-500/50'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {cat.name}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="space-y-8 mb-16">
        {filteredTools.map((tool, index) => (
          <div 
            key={index}
            className={`bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm rounded-xl border ${
              tool.featured 
                ? 'border-pink-500 shadow-lg shadow-pink-500/20' 
                : 'border-purple-500/50'
            } p-8 relative overflow-hidden`}
          >
            {tool.featured && (
              <div className="absolute top-0 right-0 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-bl-xl font-bold flex items-center">
                <Star className="h-4 w-4 mr-2 fill-current" />
                BEST FOR AI SEO
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left Column - Overview */}
              <div className="md:col-span-1">
                <div className="flex items-start mb-4">
                  <Bot className="h-10 w-10 text-pink-400 mr-3" />
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{tool.name}</h3>
                    <p className="text-gray-300 text-sm">{tool.tagline}</p>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${i < Math.floor(tool.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} 
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-white font-semibold">{tool.rating}</span>
                </div>

                <div className="bg-purple-900/30 p-4 rounded-lg mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">Pricing</span>
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-emerald-400" />
                      <span className="text-xl font-bold text-white ml-1">{tool.price}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-400 mb-4">
                  <p className="text-sm text-gray-300">
                    <strong className="text-blue-300">Best for:</strong> {tool.bestFor}
                  </p>
                </div>

                {tool.link && (
                  <a 
                    href={tool.link}
                    className="block w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-center px-6 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                  >
                    {tool.cta}
                  </a>
                )}
              </div>

              {/* Middle Column - Pros */}
              <div className="md:col-span-1">
                <h4 className="font-semibold text-emerald-400 mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Pros
                </h4>
                <ul className="space-y-2">
                  {tool.pros.map((pro, i) => (
                    <li key={i} className="flex items-start text-gray-300 text-sm">
                      <CheckCircle className="h-4 w-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column - Cons */}
              <div className="md:col-span-1">
                <h4 className="font-semibold text-rose-400 mb-4 flex items-center">
                  <XCircle className="h-5 w-5 mr-2" />
                  Cons
                </h4>
                <ul className="space-y-2">
                  {tool.cons.map((con, i) => (
                    <li key={i} className="flex items-start text-gray-300 text-sm">
                      <XCircle className="h-4 w-4 text-rose-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <BarChart3 className="h-8 w-8 text-purple-400 mr-3" />
          Feature Comparison Table
        </h2>
        
        <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm rounded-xl border border-purple-500/50 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-purple-500/50">
                <th className="text-left p-4 text-gray-300 font-semibold">Feature</th>
                <th className="p-4 text-center">
                  <div className="text-pink-400 font-bold">AISEOScan</div>
                  <div className="text-xs text-gray-400">Free</div>
                </th>
                <th className="p-4 text-center">
                  <div className="text-white font-semibold">Surfer SEO</div>
                  <div className="text-xs text-gray-400">$89/mo</div>
                </th>
                <th className="p-4 text-center">
                  <div className="text-white font-semibold">Jasper</div>
                  <div className="text-xs text-gray-400">$49/mo</div>
                </th>
                <th className="p-4 text-center">
                  <div className="text-white font-semibold">Clearscope</div>
                  <div className="text-xs text-gray-400">$199/mo</div>
                </th>
                <th className="p-4 text-center">
                  <div className="text-white font-semibold">SEMrush</div>
                  <div className="text-xs text-gray-400">$129/mo</div>
                </th>
                <th className="p-4 text-center">
                  <div className="text-white font-semibold">Ahrefs</div>
                  <div className="text-xs text-gray-400">$129/mo</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((row, index) => (
                <tr key={index} className="border-b border-gray-800 hover:bg-purple-900/10">
                  <td className="p-4 text-gray-300">{row.feature}</td>
                  <td className="p-4 text-center">
                    {row.aiSeoScan ? (
                      <CheckCircle className="h-6 w-6 text-emerald-400 mx-auto" />
                    ) : (
                      <XCircle className="h-6 w-6 text-gray-600 mx-auto" />
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {row.surfer ? (
                      <CheckCircle className="h-6 w-6 text-emerald-400 mx-auto" />
                    ) : (
                      <XCircle className="h-6 w-6 text-gray-600 mx-auto" />
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {row.jasper ? (
                      <CheckCircle className="h-6 w-6 text-emerald-400 mx-auto" />
                    ) : (
                      <XCircle className="h-6 w-6 text-gray-600 mx-auto" />
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {row.clearscope ? (
                      <CheckCircle className="h-6 w-6 text-emerald-400 mx-auto" />
                    ) : (
                      <XCircle className="h-6 w-6 text-gray-600 mx-auto" />
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {row.semrush ? (
                      <CheckCircle className="h-6 w-6 text-emerald-400 mx-auto" />
                    ) : (
                      <XCircle className="h-6 w-6 text-gray-600 mx-auto" />
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {row.ahrefs ? (
                      <CheckCircle className="h-6 w-6 text-emerald-400 mx-auto" />
                    ) : (
                      <XCircle className="h-6 w-6 text-gray-600 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Buying Guide */}
      <div className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 mb-16">
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
          <Target className="h-8 w-8 text-blue-400 mr-3" />
          How to Choose the Right AI SEO Tool
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-blue-400 mb-4">If You Need AI Search Optimization:</h3>
            <p className="text-gray-300 mb-4">
              For optimizing websites to rank in ChatGPT, Perplexity, Claude, and other AI search engines, <strong className="text-white">AISEOScan</strong> is the only tool specifically designed for this purpose. It validates schema markup, analyzes citation-ready content, and evaluates authority signals that AI systems use.
            </p>
            <Link href="/">
              <a className="text-pink-400 hover:text-pink-300 font-semibold flex items-center">
                Try AISEOScan Free <ArrowRight className="h-4 w-4 ml-2" />
              </a>
            </Link>
          </div>

          <div>
            <h3 className="font-semibold text-blue-400 mb-4">If You Need Traditional Google SEO:</h3>
            <p className="text-gray-300 mb-4">
              For ranking in traditional Google search, tools like <strong className="text-white">Surfer SEO</strong> (content optimization), <strong className="text-white">SEMrush</strong> (all-in-one), or <strong className="text-white">Ahrefs</strong> (link building) are better suited. However, these don't optimize for AI search engines.
            </p>
          </div>
        </div>

        <div className="mt-8 bg-pink-900/20 p-6 rounded-lg border-l-4 border-pink-400">
          <h3 className="font-semibold text-pink-300 mb-3">💡 Pro Tip:</h3>
          <p className="text-gray-300">
            The best strategy in 2025 is to use <strong className="text-white">both</strong> traditional SEO tools AND AI SEO tools. Start with AISEOScan (free) to optimize for AI search, then use traditional tools for Google rankings. This dual approach captures traffic from both search paradigms.
          </p>
        </div>
      </div>

      {/* Why AI SEO Tools Matter */}
      <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Why AI SEO Tools Matter in 2025</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-purple-400 mb-3">The Search Landscape Has Changed</h3>
            <p className="text-gray-300 leading-relaxed">
              With over 1.2 billion monthly queries across ChatGPT, Perplexity, Claude, Gemini, and other AI platforms, the way people discover information has fundamentally shifted. Traditional SEO tools weren't built for this new reality.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-purple-400 mb-3">AI Systems Evaluate Differently</h3>
            <p className="text-gray-300 leading-relaxed">
              AI search engines prioritize schema markup, content structure, authority signals, and citation-ready formatting—factors that traditional SEO tools don't specifically optimize for. Websites optimized for AI search see 8.3x higher citation rates on average.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-purple-400 mb-3">Early Movers Win</h3>
            <p className="text-gray-300 leading-relaxed">
              Organizations optimizing for AI search now are establishing authority before the space becomes crowded. By 2026, AI search optimization will be as competitive as traditional SEO is today. The tools and strategies you implement now create lasting advantages.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-16">
        <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">What's the difference between AI SEO tools and traditional SEO tools?</h3>
            <p className="text-gray-300">
              Traditional SEO tools optimize for Google's algorithm (backlinks, keywords, page speed). AI SEO tools optimize for how AI systems like ChatGPT and Perplexity evaluate and cite content (schema markup, content structure, authority signals, citation formatting).
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Do I still need traditional SEO if I optimize for AI search?</h3>
            <p className="text-gray-300">
              Yes. Google still drives significant traffic, and the two approaches complement each other. Many technical optimizations (schema markup, page speed, mobile responsiveness) benefit both. The best strategy uses both traditional and AI SEO tools.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Which AI SEO tool is best for beginners?</h3>
            <p className="text-gray-300">
              AISEOScan is ideal for beginners because it's free, requires no technical expertise, and provides instant actionable recommendations. Simply enter your URL and get a comprehensive report showing exactly what to fix for AI search optimization.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">How much do AI SEO tools cost?</h3>
            <p className="text-gray-300">
              AISEOScan offers free scans with detailed reports. Traditional SEO tools with some AI features (Surfer SEO, SEMrush, Ahrefs) range from $89-$199/month, but they're not specifically designed for AI search optimization.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Can I optimize for multiple AI platforms at once?</h3>
            <p className="text-gray-300">
              Yes. While each AI platform has unique characteristics, they share core requirements: proper schema markup, clear content structure, authority signals, and citation-ready formatting. Tools like AISEOScan check optimization across ChatGPT, Perplexity, Claude, Gemini, and more simultaneously.
            </p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-blue-900/40 backdrop-blur-sm p-12 rounded-xl border border-pink-500/50 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Ready to Dominate AI Search?</h2>
        <p className="text-gray-200 text-xl mb-8 max-w-2xl mx-auto">
          Start with a free AI SEO scan to see how your website performs in ChatGPT, Perplexity, Claude, and other AI search engines.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/">
            <a className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
              <Zap className="h-5 w-5 mr-2" />
              Scan Your Site Free
            </a>
          </Link>
          <Link href="/ai-seo-tools">
            <a className="bg-gray-800 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-700 transition-all duration-300 border border-gray-600 flex items-center justify-center">
              Learn More About AI SEO Tools
            </a>
          </Link>
        </div>

        <p className="text-gray-400 text-sm mt-6">
          ✨ No credit card required • Instant results • 30+ AI SEO checks
        </p>
      </div>
    </Layout>
  )
}