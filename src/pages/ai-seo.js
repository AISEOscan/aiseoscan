import Layout from '../components/Layout'
import Link from 'next/link'
import { Bot, CheckCircle, Zap, ArrowRight, Globe, Target, TrendingUp, Lightbulb, AlertTriangle, Search } from 'lucide-react'

export default function AISeoPillarPage() {
  const aiPlatforms = [
    { 
      name: "ChatGPT", 
      users: "347M", 
      color: "emerald", 
      link: "/ai-seo-chatgpt",
      description: "Conversational AI with natural language optimization",
      strength: "Long-form explanations"
    },
    { 
      name: "Perplexity", 
      users: "230M", 
      color: "blue", 
      link: "/ai-seo-perplexity",
      description: "Research-focused with academic citations",
      strength: "High-authority sources"
    },
    { 
      name: "Gemini", 
      users: "200M", 
      color: "pink", 
      link: "/ai-seo-gemini",
      description: "Google's multimodal AI with visual understanding",
      strength: "Visual content integration"
    },
    { 
      name: "Copilot", 
      users: "180M", 
      color: "purple", 
      link: "/ai-seo-copilot",
      description: "Microsoft's enterprise AI integrated with Bing",
      strength: "Professional audience"
    },
    { 
      name: "Claude", 
      users: "150M", 
      color: "orange", 
      link: "/ai-seo-claude",
      description: "Anthropic's thoughtful AI with Constitutional training",
      strength: "Comprehensive depth"
    },
    { 
      name: "SearchGPT", 
      users: "120M", 
      color: "cyan", 
      link: "/ai-seo-searchgpt",
      description: "OpenAI's search engine with visual-first results",
      strength: "Direct answers"
    }
  ]

  const coreStrategies = [
    {
      strategy: "Implement Schema Markup",
      why: "AI systems rely on structured data to understand your content. Without proper schema markup (Article, Organization, Person, FAQ), AI engines can't properly parse and cite your content.",
      impact: "7-8x higher citation rate"
    },
    {
      strategy: "Create Citation-Ready Content",
      why: "AI platforms cite content with clear, specific facts. Vague claims like 'this works well' don't get cited. Specific data like 'increased traffic by 43% in 30 days across 127 sites' does.",
      impact: "6x more citations"
    },
    {
      strategy: "Build Author Authority",
      why: "AI systems check author credentials and expertise. Content from authors with published work, degrees, certifications, and professional experience gets prioritized.",
      impact: "5x trust signal boost"
    },
    {
      strategy: "Optimize for Conversational Queries",
      why: "People ask AI systems questions in natural language. Content optimized for 'How do I...' and 'What's the best way to...' queries performs better than keyword-stuffed traditional SEO content.",
      impact: "4x more query matches"
    }
  ]

  const quickWins = [
    "Add Article schema with author and dateModified to all blog posts",
    "Create FAQ sections with FAQ schema markup for common questions",
    "Add author bios with credentials, LinkedIn, and expertise to articles",
    "Write clear, direct answers in the first 1-2 paragraphs",
    "Implement proper heading hierarchy (H1 → H2 → H3) with descriptive titles",
    "Add high-quality images with descriptive alt text (not just keywords)",
    "Ensure mobile site loads in under 2.5 seconds (Core Web Vitals)",
    "Update old content with fresh data and 'Last Updated' dates"
  ]

  const commonMistakes = [
    {
      mistake: "Treating AI SEO Like Traditional SEO",
      fix: "Keyword stuffing and link schemes don't work. AI systems evaluate content quality, structure, and authority. Focus on clear, comprehensive content with proper schema markup."
    },
    {
      mistake: "Missing or Incorrect Schema Markup",
      fix: "This is the #1 reason sites don't get cited. Implement Article, Person, Organization, and FAQ schema. Validate with Google's Rich Results Test to ensure it's correct."
    },
    {
      mistake: "Thin Content Without Depth",
      fix: "500-word summaries rarely get cited by AI. Aim for 1,500-3,000+ words on complex topics. Provide examples, data, and comprehensive explanations that add value."
    },
    {
      mistake: "No Author Attribution or Credentials",
      fix: "AI systems check who wrote the content. Add author bios with credentials, expertise, publications, and social profiles. Anonymous content gets deprioritized."
    }
  ]

  return (
    <Layout 
      title="AI SEO: Complete Guide to Optimizing for ChatGPT, Perplexity, Gemini & AI Search (2026)"
      description="Master AI SEO in 2026. Learn how to optimize your website for ChatGPT, Perplexity, Claude, Gemini, Copilot, and SearchGPT. Platform-specific strategies and implementation guides."
    >
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center mb-6">
          <Bot className="h-16 w-16 text-pink-400 mr-4 animate-pulse" />
          <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent leading-tight py-2">
            AI SEO
          </h1>
        </div>
        <p className="text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed">
          The complete guide to optimizing your website for ChatGPT, Perplexity, Claude, Gemini, Copilot, and SearchGPT. Get cited by 1.2 billion monthly AI search users.
        </p>
        
        <Link href="https://www.aiseoscan.dev">
          <a className="inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-4 rounded-lg font-bold text-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
            <Zap className="h-6 w-6 mr-2" />
            Scan Your Site for AI SEO
          </a>
        </Link>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-12">
          <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/50">
            <div className="text-3xl font-bold text-white">1.2B+</div>
            <div className="text-sm text-gray-300">Monthly AI searches</div>
          </div>
          <div className="bg-pink-900/30 p-4 rounded-lg border border-pink-500/50">
            <div className="text-3xl font-bold text-white">6</div>
            <div className="text-sm text-gray-300">Major AI platforms</div>
          </div>
          <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/50">
            <div className="text-3xl font-bold text-white">7-8x</div>
            <div className="text-sm text-gray-300">Citation increase</div>
          </div>
          <div className="bg-emerald-900/30 p-4 rounded-lg border border-emerald-500/50">
            <div className="text-3xl font-bold text-white">2026</div>
            <div className="text-sm text-gray-300">The AI search era</div>
          </div>
        </div>
      </div>

      {/* What is AI SEO */}
      <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-12">
        <h2 className="text-4xl font-bold text-white mb-6 flex items-center">
          <Lightbulb className="h-10 w-10 text-yellow-400 mr-4" />
          What is AI SEO?
        </h2>
        
        <div className="space-y-6">
          <p className="text-gray-200 text-lg leading-relaxed">
            <strong className="text-white">AI SEO (Artificial Intelligence Search Engine Optimization)</strong> is the practice of optimizing websites to rank well in AI-powered search engines like ChatGPT, Perplexity, Claude, Gemini, Copilot, and SearchGPT. Unlike traditional SEO that focuses on Google's algorithm, AI SEO optimizes for how AI systems discover, understand, and cite content.
          </p>

          <div className="bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-400">
            <h3 className="font-semibold text-blue-300 mb-3">The Fundamental Shift</h3>
            <p className="text-gray-300">
              Traditional search engines return a list of links. AI search engines provide direct answers with citations. This means your content must be structured not just to be discovered, but to be <strong className="text-white">comprehended, trusted, and cited</strong> by AI systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-rose-900/20 p-6 rounded-lg border border-rose-500/50">
              <h3 className="font-semibold text-rose-300 mb-3 flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Traditional SEO
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Optimizes for Google rankings</li>
                <li>• Focuses on backlinks & keywords</li>
                <li>• Goal: Drive clicks to your site</li>
                <li>• Users see list of 10 blue links</li>
                <li>• PageRank-based authority</li>
              </ul>
            </div>

            <div className="bg-emerald-900/20 p-6 rounded-lg border border-emerald-500/50">
              <h3 className="font-semibold text-emerald-300 mb-3 flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                AI SEO
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Optimizes for AI comprehension</li>
                <li>• Focuses on structure & clarity</li>
                <li>• Goal: Get cited by AI systems</li>
                <li>• Users see direct answers + sources</li>
                <li>• Content-based authority</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* AI Platforms Overview */}
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-white mb-8 flex items-center">
          <Globe className="h-10 w-10 text-blue-400 mr-4" />
          Optimize for These 6 Major AI Platforms
        </h2>
        
        <p className="text-gray-300 text-lg mb-8">
          Each AI platform has unique characteristics and optimization requirements. Click through for platform-specific strategies:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiPlatforms.map((platform, index) => (
            <Link key={index} href={platform.link}>
              <a className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-6 rounded-xl border border-purple-500/50 hover:border-pink-500 transition-all duration-300 transform hover:scale-105 group">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-pink-400 transition-colors">
                      {platform.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{platform.users} monthly users</p>
                  </div>
                  <ArrowRight className="h-6 w-6 text-gray-600 group-hover:text-pink-400 transition-colors" />
                </div>
                <p className="text-gray-300 text-sm mb-3">{platform.description}</p>
                <div className="bg-purple-900/30 px-3 py-1 rounded-full inline-block">
                  <span className="text-purple-200 text-xs font-semibold">Strength: {platform.strength}</span>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>

      {/* Core Strategies */}
      <div className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 mb-12">
        <h2 className="text-4xl font-bold text-white mb-8 flex items-center">
          <Target className="h-10 w-10 text-blue-400 mr-4" />
          4 Core AI SEO Strategies (Universal Across All Platforms)
        </h2>
        
        <div className="space-y-6">
          {coreStrategies.map((item, index) => (
            <div key={index} className="bg-blue-900/20 p-6 rounded-xl border border-blue-500/50">
              <div className="flex items-start mb-3">
                <div className="bg-blue-500 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{item.strategy}</h3>
                  <p className="text-gray-300 mb-3">{item.why}</p>
                  <div className="bg-blue-900/30 px-4 py-2 rounded border border-blue-500/50 inline-block">
                    <span className="text-blue-200 text-sm font-semibold">Impact: {item.impact}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Wins */}
      <div className="bg-gradient-to-r from-gray-900/60 to-emerald-900/20 backdrop-blur-sm p-8 rounded-xl border border-emerald-500/50 mb-12">
        <h2 className="text-4xl font-bold text-white mb-6 flex items-center">
          <Zap className="h-10 w-10 text-emerald-400 mr-4" />
          8 Quick AI SEO Wins (Implement This Week)
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickWins.map((win, index) => (
            <div key={index} className="flex items-start bg-emerald-900/20 p-4 rounded-lg">
              <CheckCircle className="h-6 w-6 text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-200">{win}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="https://www.aiseoscan.dev">
            <a className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-4 rounded-lg font-bold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105">
              <Search className="h-5 w-5 mr-2" />
              Scan Your Site to Find Issues
            </a>
          </Link>
        </div>
      </div>

      {/* Common Mistakes */}
      <div className="bg-gradient-to-r from-gray-900/60 to-rose-900/20 backdrop-blur-sm p-8 rounded-xl border border-rose-500/50 mb-12">
        <h2 className="text-4xl font-bold text-white mb-6 flex items-center">
          <AlertTriangle className="h-10 w-10 text-rose-400 mr-4" />
          4 Critical AI SEO Mistakes to Avoid
        </h2>
        
        <div className="space-y-6">
          {commonMistakes.map((item, index) => (
            <div key={index} className="border-l-4 border-rose-400 pl-6">
              <h3 className="text-xl font-bold text-rose-300 mb-2">❌ {item.mistake}</h3>
              <p className="text-gray-300"><strong className="text-white">Fix:</strong> {item.fix}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why AI SEO Matters */}
      <div className="bg-gradient-to-r from-gray-900/60 to-pink-900/20 backdrop-blur-sm p-8 rounded-xl border border-pink-500/50 mb-12">
        <h2 className="text-4xl font-bold text-white mb-6 flex items-center">
          <TrendingUp className="h-10 w-10 text-pink-400 mr-4" />
          Why AI SEO Matters in 2026
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-pink-900/30 p-6 rounded-lg">
            <div className="text-4xl font-bold text-pink-400 mb-3">1.2B+</div>
            <h3 className="text-xl font-bold text-white mb-3">Massive User Base</h3>
            <p className="text-gray-300">
              Over 1.2 billion monthly queries across AI platforms. ChatGPT alone has 347 million monthly users—more reach than many traditional search engines.
            </p>
          </div>

          <div className="bg-purple-900/30 p-6 rounded-lg">
            <div className="text-4xl font-bold text-purple-400 mb-3">6.2x</div>
            <h3 className="text-xl font-bold text-white mb-3">Higher Conversion</h3>
            <p className="text-gray-300">
              AI search users have clear intent and trust AI recommendations. Traffic from AI citations converts 6.2x better than traditional search clicks.
            </p>
          </div>

          <div className="bg-blue-900/30 p-6 rounded-lg">
            <div className="text-4xl font-bold text-blue-400 mb-3">First</div>
            <h3 className="text-xl font-bold text-white mb-3">Mover Advantage</h3>
            <p className="text-gray-300">
              AI SEO is less competitive than traditional SEO. Sites optimizing today establish authority before the space becomes crowded.
            </p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-blue-900/40 backdrop-blur-sm p-12 rounded-xl border border-pink-500/50 text-center">
        <h2 className="text-5xl font-bold text-white mb-4">Ready to Dominate AI Search?</h2>
        <p className="text-gray-200 text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
          Get a free, comprehensive AI SEO audit of your website. See exactly how you perform across ChatGPT, Perplexity, Claude, Gemini, Copilot, and SearchGPT—then get actionable recommendations.
        </p>
        
        <Link href="https://www.aiseoscan.dev">
          <a className="inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
            <Zap className="h-6 w-6 mr-2" />
            Start Free AI SEO Scan
          </a>
        </Link>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300 mt-6">
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
            No credit card required
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
            30+ AI SEO checks
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
            Instant results
          </div>
        </div>
      </div>
    </Layout>
  )
}