import Layout from '../components/Layout'
import Link from 'next/link'
import { Bot, CheckCircle, TrendingUp, Zap, Globe, MessageSquare, BarChart3, Award, Target, Search, Code, Users, ArrowRight, Lightbulb, AlertTriangle, Eye, Server, FileText } from 'lucide-react'

export default function AISeoPillarPage() {
  const aiPlatforms = [
    { name: "ChatGPT", users: "347M", color: "emerald", link: "/ai-seo-chatgpt" },
    { name: "Perplexity", users: "230M", color: "blue", link: "/ai-seo-perplexity" },
    { name: "Gemini", users: "200M", color: "pink", link: "/ai-seo-gemini" },
    { name: "Copilot", users: "180M", color: "purple", link: "/ai-seo-copilot" },
    { name: "Claude", users: "150M", color: "orange", link: "/ai-seo-claude" },
    { name: "SearchGPT", users: "120M", color: "cyan", link: "/ai-seo-searchgpt" }
  ]

  const keyStrategies = [
    {
      icon: Code,
      title: "Schema Markup Mastery",
      description: "Implement JSON-LD structured data that AI systems can easily parse and understand",
      link: "/ai-seo-tools"
    },
    {
      icon: FileText,
      title: "Citation-Ready Content",
      description: "Structure content with clear facts, sources, and attribution that AI can confidently cite",
      link: "/ai-seo-content-generator"
    },
    {
      icon: Award,
      title: "Authority Signal Building",
      description: "Establish credibility through author expertise, credentials, and trust indicators",
      link: "/ai-seo-services"
    },
    {
      icon: Search,
      title: "Conversational Optimization",
      description: "Optimize for natural language queries and question-based search patterns",
      link: "/ai-seo-keyword-research"
    }
  ]

  const useCases = [
    { name: "E-commerce Sites", icon: "🛍️", link: "/ai-seo-tools-ecommerce" },
    { name: "SaaS Platforms", icon: "💻", link: "/ai-seo-tools-saas" },
    { name: "Healthcare", icon: "🏥", link: "/ai-seo-tools-healthcare" },
    { name: "Finance", icon: "💰", link: "/ai-seo-tools-finance" },
    { name: "Education", icon: "📚", link: "/ai-seo-tools-education" },
    { name: "Small Business", icon: "🏪", link: "/ai-seo-small-business" }
  ]

  const quickWins = [
    "Add JSON-LD schema markup to all pages (Article, Organization, Person)",
    "Implement proper heading hierarchy (H1 → H2 → H3)",
    "Add author bios with credentials and expertise",
    "Create FAQ sections with Schema markup",
    "Optimize for Core Web Vitals (LCP < 2.5s)",
    "Add descriptive alt text to all images",
    "Implement breadcrumb navigation with schema",
    "Create comprehensive, well-researched content (1,500+ words)"
  ]

  return (
    <Layout 
      title="AI SEO: Complete Guide to Optimizing for ChatGPT, Perplexity & AI Search (2025)"
      description="Master AI SEO in 2025. Learn how to optimize your website for ChatGPT, Perplexity, Claude, and all AI search engines. Comprehensive guide with tools, strategies, and examples."
    >
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center mb-6">
          <Bot className="h-16 w-16 text-pink-400 mr-4 animate-pulse" />
          <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            AI SEO
          </h1>
        </div>
        <p className="text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed">
          The complete guide to optimizing your website for ChatGPT, Perplexity, Claude, Gemini, and the next generation of AI-powered search engines.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <Link href="/">
            <a className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
              <Zap className="h-5 w-5 mr-2" />
              Scan Your Site Free
            </a>
          </Link>
          <Link href="/best-ai-seo-tools-2025">
            <a className="bg-gray-800 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-700 transition-all duration-300 border border-gray-600 flex items-center justify-center">
              View Top AI SEO Tools
            </a>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/50">
            <div className="text-3xl font-bold text-white">1.2B+</div>
            <div className="text-sm text-gray-300">Monthly AI searches</div>
          </div>
          <div className="bg-pink-900/30 p-4 rounded-lg border border-pink-500/50">
            <div className="text-3xl font-bold text-white">8.3x</div>
            <div className="text-sm text-gray-300">Citation increase</div>
          </div>
          <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/50">
            <div className="text-3xl font-bold text-white">6</div>
            <div className="text-sm text-gray-300">Major AI platforms</div>
          </div>
          <div className="bg-emerald-900/30 p-4 rounded-lg border border-emerald-500/50">
            <div className="text-3xl font-bold text-white">2025</div>
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
            <strong className="text-white">AI SEO (Artificial Intelligence Search Engine Optimization)</strong> is the practice of optimizing websites to rank well in AI-powered search engines like ChatGPT, Perplexity, Claude, Gemini, and SearchGPT. Unlike traditional SEO that focuses on Google's algorithm, AI SEO optimizes for how AI systems discover, analyze, understand, and cite content.
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

      {/* Why AI SEO Matters */}
      <div className="bg-gradient-to-r from-gray-900/60 to-pink-900/20 backdrop-blur-sm p-8 rounded-xl border border-pink-500/50 mb-12">
        <h2 className="text-4xl font-bold text-white mb-6 flex items-center">
          <TrendingUp className="h-10 w-10 text-pink-400 mr-4" />
          Why AI SEO Matters in 2025
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-purple-900/30 p-6 rounded-lg">
            <Users className="h-12 w-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Massive User Base</h3>
            <p className="text-gray-300">
              Over 1.2 billion monthly queries across AI platforms. ChatGPT alone has 347 million monthly users—more than many traditional search engines.
            </p>
          </div>

          <div className="bg-pink-900/30 p-6 rounded-lg">
            <Target className="h-12 w-12 text-pink-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Higher Intent</h3>
            <p className="text-gray-300">
              AI search users have clear intent and trust AI recommendations. Being cited by ChatGPT or Perplexity drives highly qualified traffic.
            </p>
          </div>

          <div className="bg-blue-900/30 p-6 rounded-lg">
            <Award className="h-12 w-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">First-Mover Advantage</h3>
            <p className="text-gray-300">
              AI SEO is less competitive now than traditional SEO. Websites optimizing today establish authority before the space becomes crowded.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-pink-900/30 to-purple-900/30 border border-pink-500/50 p-6 rounded-lg">
          <h3 className="font-semibold text-pink-300 mb-3 text-xl">📊 The Numbers Don't Lie</h3>
          <ul className="space-y-3 text-gray-200">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-emerald-400 mr-3 mt-1 flex-shrink-0" />
              <span><strong className="text-white">8.3x average citation increase</strong> for websites implementing AI SEO best practices</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-emerald-400 mr-3 mt-1 flex-shrink-0" />
              <span><strong className="text-white">6.2x higher conversion rates</strong> from AI search referral traffic vs. traditional search</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-emerald-400 mr-3 mt-1 flex-shrink-0" />
              <span><strong className="text-white">73% of users</strong> trust AI-recommended sources over traditional search results</span>
            </li>
          </ul>
        </div>
      </div>

      {/* AI Platforms Overview */}
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-white mb-8 flex items-center">
          <Globe className="h-10 w-10 text-blue-400 mr-4" />
          Major AI Search Platforms
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiPlatforms.map((platform, index) => (
            <Link key={index} href={platform.link}>
              <a className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-6 rounded-xl border border-purple-500/50 hover:border-pink-500 transition-all duration-300 transform hover:scale-105 group">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-pink-400 transition-colors">
                      {platform.name}
                    </h3>
                    <p className="text-gray-400 text-sm">AI Search Platform</p>
                  </div>
                  <ArrowRight className="h-6 w-6 text-gray-600 group-hover:text-pink-400 transition-colors" />
                </div>
                <div className="bg-purple-900/30 p-3 rounded-lg">
                  <div className="text-3xl font-bold text-white">{platform.users}</div>
                  <div className="text-sm text-gray-300">Monthly Users</div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>

      {/* Core Strategies */}
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-white mb-8 flex items-center">
          <Target className="h-10 w-10 text-purple-400 mr-4" />
          4 Core AI SEO Strategies
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {keyStrategies.map((strategy, index) => {
            const Icon = strategy.icon
            return (
              <Link key={index} href={strategy.link}>
                <a className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 hover:border-pink-500 transition-all duration-300 group">
                  <Icon className="h-12 w-12 text-blue-400 group-hover:text-pink-400 transition-colors mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-pink-400 transition-colors">
                    {strategy.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{strategy.description}</p>
                  <div className="flex items-center text-pink-400 font-semibold">
                    Learn More <ArrowRight className="h-4 w-4 ml-2" />
                  </div>
                </a>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Quick Wins */}
      <div className="bg-gradient-to-r from-gray-900/60 to-emerald-900/20 backdrop-blur-sm p-8 rounded-xl border border-emerald-500/50 mb-12">
        <h2 className="text-4xl font-bold text-white mb-6 flex items-center">
          <Zap className="h-10 w-10 text-emerald-400 mr-4" />
          8 Quick AI SEO Wins (Implement Today)
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
          <Link href="/">
            <a className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-4 rounded-lg font-bold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105">
              <Search className="h-5 w-5 mr-2" />
              Scan Your Site to Find Issues
            </a>
          </Link>
        </div>
      </div>

      {/* Industry-Specific Guides */}
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-white mb-8 flex items-center">
          <BarChart3 className="h-10 w-10 text-pink-400 mr-4" />
          AI SEO by Industry
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {useCases.map((useCase, index) => (
            <Link key={index} href={useCase.link}>
              <a className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-6 rounded-xl border border-purple-500/50 hover:border-pink-500 transition-all duration-300 text-center group">
                <div className="text-4xl mb-3">{useCase.icon}</div>
                <div className="text-white font-semibold group-hover:text-pink-400 transition-colors">
                  {useCase.name}
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>

      {/* Common Mistakes */}
      <div className="bg-gradient-to-r from-gray-900/60 to-rose-900/20 backdrop-blur-sm p-8 rounded-xl border border-rose-500/50 mb-12">
        <h2 className="text-4xl font-bold text-white mb-6 flex items-center">
          <AlertTriangle className="h-10 w-10 text-rose-400 mr-4" />
          5 Critical AI SEO Mistakes to Avoid
        </h2>
        
        <div className="space-y-6">
          <div className="border-l-4 border-rose-400 pl-6">
            <h3 className="text-xl font-bold text-white mb-2">1. Treating AI SEO Like Traditional SEO</h3>
            <p className="text-gray-300">
              AI systems evaluate content differently. Keyword stuffing and backlink farms don't work. Focus on content structure, schema markup, and authority signals instead.
            </p>
          </div>

          <div className="border-l-4 border-rose-400 pl-6">
            <h3 className="text-xl font-bold text-white mb-2">2. Ignoring Schema Markup</h3>
            <p className="text-gray-300">
              AI systems heavily rely on structured data to understand content. Missing or incorrect schema markup is the #1 reason websites don't get cited by AI search engines.
            </p>
          </div>

          <div className="border-l-4 border-rose-400 pl-6">
            <h3 className="text-xl font-bold text-white mb-2">3. Thin, Low-Value Content</h3>
            <p className="text-gray-300">
              AI systems favor comprehensive, well-researched content over thin pages. Aim for 1,500+ words with clear facts, sources, and expertise indicators.
            </p>
          </div>

          <div className="border-l-4 border-rose-400 pl-6">
            <h3 className="text-xl font-bold text-white mb-2">4. No Author Attribution</h3>
            <p className="text-gray-300">
              AI systems check author credentials and expertise. Content without proper author bios, credentials, and expertise signals gets deprioritized.
            </p>
          </div>

          <div className="border-l-4 border-rose-400 pl-6">
            <h3 className="text-xl font-bold text-white mb-2">5. Optimizing for Only One AI Platform</h3>
            <p className="text-gray-300">
              Different AI platforms have different preferences, but core principles apply across all. Optimize for the fundamentals (schema, structure, authority) rather than gaming one specific system.
            </p>
          </div>
        </div>
      </div>

      {/* Tools & Resources */}
      <div className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 mb-12">
        <h2 className="text-4xl font-bold text-white mb-8 flex items-center">
          <Server className="h-10 w-10 text-blue-400 mr-4" />
          Essential AI SEO Tools & Resources
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/">
            <a className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/50 hover:border-pink-500 transition-all group">
              <Search className="h-10 w-10 text-blue-400 group-hover:text-pink-400 transition-colors mb-4" />
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">AISEOScan</h3>
              <p className="text-gray-300 text-sm mb-3">Free scanner with 30+ AI SEO checks</p>
              <div className="text-pink-400 font-semibold text-sm flex items-center">
                Try Free <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </a>
          </Link>

          <Link href="/best-ai-seo-tools-2025">
            <a className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/50 hover:border-pink-500 transition-all group">
              <Award className="h-10 w-10 text-blue-400 group-hover:text-pink-400 transition-colors mb-4" />
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">Tool Comparison</h3>
              <p className="text-gray-300 text-sm mb-3">Compare top AI SEO tools side-by-side</p>
              <div className="text-pink-400 font-semibold text-sm flex items-center">
                View Guide <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </a>
          </Link>

          <Link href="/ai-seo-services">
            <a className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/50 hover:border-pink-500 transition-all group">
              <Users className="h-10 w-10 text-blue-400 group-hover:text-pink-400 transition-colors mb-4" />
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">AI SEO Services</h3>
              <p className="text-gray-300 text-sm mb-3">Professional optimization services</p>
              <div className="text-pink-400 font-semibold text-sm flex items-center">
                Learn More <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </a>
          </Link>
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-12">
        <h2 className="text-4xl font-bold text-white mb-6">Getting Started with AI SEO</h2>
        
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="bg-pink-500 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              1
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Audit Your Current State</h3>
              <p className="text-gray-300 mb-3">
                Use AISEOScan to get a comprehensive report on your website's AI search optimization. Identify gaps in schema markup, content structure, and authority signals.
              </p>
              <Link href="/">
                <a className="text-pink-400 hover:text-pink-300 font-semibold flex items-center">
                  Run Free Audit <ArrowRight className="h-4 w-4 ml-2" />
                </a>
              </Link>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-pink-500 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              2
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Implement Quick Wins</h3>
              <p className="text-gray-300">
                Start with the 8 quick wins listed above. These are low-effort, high-impact changes that immediately improve AI SEO performance. Focus on schema markup and content structure first.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-pink-500 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              3
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Optimize for Specific Platforms</h3>
              <p className="text-gray-300">
                After foundational optimization, tailor strategies for specific AI platforms. Each has unique preferences—ChatGPT favors conversational content, Perplexity prefers academic-style citations.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-pink-500 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              4
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Monitor & Iterate</h3>
              <p className="text-gray-300">
                Track citation rates, referral traffic, and content performance. AI search is evolving rapidly—what works today may need adjustments tomorrow. Stay agile.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-blue-900/40 backdrop-blur-sm p-12 rounded-xl border border-pink-500/50 text-center">
        <h2 className="text-5xl font-bold text-white mb-4">Ready to Dominate AI Search?</h2>
        <p className="text-gray-200 text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
          Get a free, comprehensive AI SEO audit of your website. See exactly how you perform in ChatGPT, Perplexity, Claude, and other AI search engines—then get actionable recommendations to improve.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <Link href="/">
            <a className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
              <Zap className="h-6 w-6 mr-2" />
              Start Free AI SEO Scan
            </a>
          </Link>
          <Link href="/best-ai-seo-tools-2025">
            <a className="bg-gray-800 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-700 transition-all duration-300 border border-gray-600 flex items-center justify-center">
              Compare AI SEO Tools
            </a>
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300">
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
            30+ AI SEO checks
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
            Detailed PDF report
          </div>
        </div>
      </div>
    </Layout>
  )
}