import Layout from '../components/Layout'
import Link from 'next/link'
import { Bot, CheckCircle, Zap, ArrowRight, Search, Target, BarChart3, Shield, TrendingUp, Award } from 'lucide-react'

export default function AISEOTools() {
  const toolCategories = [
    {
      platform: "Microsoft Copilot",
      description: "Enterprise AI SEO tools for Bing and Microsoft ecosystem optimization",
      tools: [
        {
          name: "Copilot SEO Tool",
          slug: "copilot-seo-tool",
          searches: "1,041/mo",
          description: "Complete SEO optimization toolkit for Microsoft Copilot citations",
          features: ["Bing index analysis", "Schema validation", "Enterprise optimization"]
        },
        {
          name: "Copilot SEO Analysis Tool",
          slug: "copilot-seo-analysis-tool",
          searches: "467/mo",
          description: "Deep analysis of your Copilot SEO performance and opportunities",
          features: ["Authority scoring", "Citation tracking", "Competitor analysis"]
        },
        {
          name: "Copilot SEO Checker",
          slug: "copilot-seo-checker",
          searches: "454/mo",
          description: "Quick Copilot SEO health check and issue identification",
          features: ["Instant scanning", "Issue detection", "Fix recommendations"]
        },
        {
          name: "Copilot SEO Checking Tool",
          slug: "copilot-seo-checking-tool",
          searches: "457/mo",
          description: "Comprehensive Copilot SEO checking and monitoring solution",
          features: ["Real-time checks", "Bing compliance", "Professional reports"]
        },
        {
          name: "Copilot SEO Analysis Software",
          slug: "copilot-seo-analysis-software",
          searches: "456/mo",
          description: "Enterprise-grade Copilot SEO analysis software for agencies",
          features: ["Multi-site tracking", "White-label reports", "API access"]
        }
      ]
    },
    {
      platform: "Perplexity AI",
      description: "Research-grade SEO tools for academic and professional AI search",
      tools: [
        {
          name: "Perplexity SEO Checking Tools",
          slug: "perplexity-seo-checking-tools",
          searches: "933/mo",
          description: "Essential tools for checking Perplexity SEO readiness",
          features: ["Authority analysis", "Citation readiness", "Source validation"]
        },
        {
          name: "Perplexity SEO Tracking Tools",
          slug: "perplexity-seo-tracking-tools",
          searches: "852/mo",
          description: "Track your Perplexity citations and search performance",
          features: ["Citation monitoring", "Ranking tracking", "Performance metrics"]
        },
        {
          name: "Perplexity SEO Checking Software",
          slug: "perplexity-seo-checking-software",
          searches: "835/mo",
          description: "Professional software for comprehensive Perplexity SEO audits",
          features: ["Automated audits", "Freshness tracking", "Domain authority"]
        },
        {
          name: "Best Perplexity SEO Tracking Tools",
          slug: "best-perplexity-seo-tracking-tools",
          searches: "460/mo",
          description: "Curated list of the best Perplexity SEO tracking solutions",
          features: ["Tool comparisons", "Feature matrix", "Pricing analysis"]
        }
      ]
    }
  ]

  const platformsSupported = [
    { name: "ChatGPT", users: "347M", color: "emerald" },
    { name: "Perplexity", users: "230M", color: "blue" },
    { name: "Gemini", users: "200M", color: "pink" },
    { name: "Copilot", users: "180M", color: "purple" },
    { name: "Claude", users: "150M", color: "orange" },
    { name: "SearchGPT", users: "120M", color: "cyan" }
  ]

  const keyFeatures = [
    {
      icon: Search,
      title: "30+ AI SEO Checks",
      description: "Comprehensive analysis across schema markup, content structure, authority signals, and technical optimization"
    },
    {
      icon: BarChart3,
      title: "Multi-Platform Analysis",
      description: "Test your site's optimization for ChatGPT, Perplexity, Copilot, Gemini, Claude, and SearchGPT in one scan"
    },
    {
      icon: Shield,
      title: "Citation Readiness Score",
      description: "See exactly how likely AI systems are to cite your content with detailed scoring and recommendations"
    },
    {
      icon: Target,
      title: "Actionable Fixes",
      description: "Get specific, prioritized recommendations with code examples and implementation guides"
    }
  ]

  const whyAISEOScan = [
    "Only tool built specifically for AI search optimization (not repurposed traditional SEO)",
    "Tests across 6 major AI platforms (ChatGPT, Perplexity, Copilot, Gemini, Claude, SearchGPT)",
    "Free basic scan with instant results - no signup required",
    "Premium reports at $29 (vs $99-299 for competitors)",
    "Used by 1,000+ websites to improve AI search visibility",
    "Regular updates as AI platforms evolve their algorithms"
  ]

  return (
    <Layout 
      title="AI SEO Tools: Optimize for ChatGPT, Perplexity, Copilot & More (2026)"
      description="Complete toolkit for AI SEO optimization. Check, track, and analyze your site's performance in ChatGPT, Perplexity, Copilot, Gemini, Claude, and SearchGPT."
    >
      <div className="max-w-6xl mx-auto py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Bot className="h-14 w-14 text-purple-400 mr-4" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent leading-tight py-2">
              AI SEO Tools
            </h1>
          </div>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Comprehensive AI SEO tools for optimizing your website across ChatGPT, Perplexity, Copilot, Gemini, Claude, and SearchGPT. Check, track, and improve your AI search visibility.
          </p>
          
          <Link href="https://www.aiseoscan.dev">
            <a className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
              <Zap className="h-5 w-5 mr-2" />
              Try AISEOScan Free
            </a>
          </Link>
        </div>

        {/* Platforms Supported */}
        <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Optimize for All Major AI Search Platforms
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {platformsSupported.map((platform, index) => (
              <div key={index} className="bg-gray-900/60 p-4 rounded-lg border border-purple-500/30 text-center">
                <div className="text-2xl font-bold text-white">{platform.users}</div>
                <div className="text-sm text-gray-400">{platform.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Why AISEOScan is the Best AI SEO Tool
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {keyFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-6 rounded-xl border border-blue-500/50">
                  <Icon className="h-10 w-10 text-blue-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Tool Categories */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">
            AI SEO Tools by Platform
          </h2>
          
          {toolCategories.map((category, catIndex) => (
            <div key={catIndex} className="mb-12">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{category.platform}</h3>
                <p className="text-gray-400">{category.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.tools.map((tool, toolIndex) => (
                  <Link key={toolIndex} href={`/${tool.slug}`}>
                    <a className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-6 rounded-xl border border-purple-500/50 hover:border-pink-500 transition-all duration-300 transform hover:scale-105 group">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-lg font-bold text-white group-hover:text-pink-400 transition-colors">
                          {tool.name}
                        </h4>
                        <ArrowRight className="h-5 w-5 text-gray-600 group-hover:text-pink-400 transition-colors flex-shrink-0 ml-2" />
                      </div>
                      
                      <div className="bg-purple-900/30 px-3 py-1 rounded-full inline-block mb-3">
                        <span className="text-purple-200 text-xs font-semibold">{tool.searches} searches</span>
                      </div>
                      
                      <p className="text-gray-300 text-sm mb-4">{tool.description}</p>
                      
                      <div className="space-y-1">
                        {tool.features.map((feature, fIndex) => (
                          <div key={fIndex} className="flex items-center text-gray-400 text-xs">
                            <CheckCircle className="h-3 w-3 text-emerald-400 mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Why AISEOScan */}
        <div className="bg-gradient-to-r from-gray-900/60 to-emerald-900/20 backdrop-blur-sm p-8 rounded-xl border border-emerald-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Award className="h-8 w-8 text-emerald-400 mr-3" />
            Why Choose AISEOScan?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whyAISEOScan.map((reason, index) => (
              <div key={index} className="flex items-start bg-emerald-900/20 p-4 rounded-lg">
                <CheckCircle className="h-5 w-5 text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-200">{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 p-6 rounded-xl border border-purple-500/50 text-center">
            <div className="text-3xl font-bold text-white mb-1">$29</div>
            <div className="text-gray-300 text-sm">Premium Reports</div>
          </div>
          <div className="bg-gradient-to-br from-pink-900/40 to-pink-800/20 p-6 rounded-xl border border-pink-500/50 text-center">
            <div className="text-3xl font-bold text-white mb-1">30+</div>
            <div className="text-gray-300 text-sm">AI SEO Checks</div>
          </div>
          <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 p-6 rounded-xl border border-blue-500/50 text-center">
            <div className="text-3xl font-bold text-white mb-1">6</div>
            <div className="text-gray-300 text-sm">AI Platforms</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/20 p-6 rounded-xl border border-emerald-500/50 text-center">
            <div className="text-3xl font-bold text-white mb-1">1,000+</div>
            <div className="text-gray-300 text-sm">Sites Optimized</div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-blue-900/40 backdrop-blur-sm p-12 rounded-xl border border-purple-500/50 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Optimize for AI Search?</h2>
          <p className="text-gray-200 text-xl mb-8 max-w-2xl mx-auto">
            Get instant AI SEO analysis across ChatGPT, Perplexity, Copilot, Gemini, Claude, and SearchGPT. Free scan with detailed recommendations.
          </p>
          
          <Link href="https://www.aiseoscan.dev">
            <a className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
              <Zap className="h-6 w-6 mr-2" />
              Start Free AI SEO Scan
            </a>
          </Link>

          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-300">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              Instant results
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              Free for basic scan
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}