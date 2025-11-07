import Layout from '../components/Layout'
import Link from 'next/link'
import { Bot, HelpCircle, CheckCircle, TrendingUp, Zap, Globe, MessageSquare, BarChart3, Award, Target, Search, ArrowRight, Lightbulb, Users, Code, FileText, AlertTriangle } from 'lucide-react'

export default function WhatIsAISEO() {
  const keyDifferences = [
    {
      aspect: "Goal",
      traditional: "Rank in Google's top 10 results",
      ai: "Get cited by AI systems in direct answers",
      icon: Target
    },
    {
      aspect: "Algorithm",
      traditional: "PageRank, backlinks, keywords",
      ai: "Content comprehension, structure, authority",
      icon: Code
    },
    {
      aspect: "User Experience",
      traditional: "Users click through to websites",
      ai: "Users get answers with source citations",
      icon: Users
    },
    {
      aspect: "Optimization Focus",
      traditional: "Keywords, meta tags, backlinks",
      ai: "Schema markup, content clarity, expertise",
      icon: FileText
    },
    {
      aspect: "Success Metric",
      traditional: "Rankings, organic traffic, CTR",
      ai: "Citation frequency, referral quality, authority",
      icon: BarChart3
    }
  ]

  const components = [
    {
      title: "Schema Markup",
      description: "Structured data that helps AI systems understand what your content is about, who wrote it, and why it's authoritative.",
      icon: Code,
      importance: "Critical",
      example: "JSON-LD schema for Article, Organization, Person, FAQ"
    },
    {
      title: "Content Structure",
      description: "Clear heading hierarchy, scannable paragraphs, and citation-ready facts that AI systems can easily parse and quote.",
      icon: FileText,
      importance: "Critical",
      example: "H1 → H2 → H3 hierarchy, 1,500+ word depth, clear facts"
    },
    {
      title: "Authority Signals",
      description: "Author credentials, expert bios, sources, and trust indicators that establish content credibility for AI evaluation.",
      icon: Award,
      importance: "High",
      example: "Author PhDs, professional affiliations, cited sources"
    },
    {
      title: "Conversational Optimization",
      description: "Natural language that matches how people ask questions to AI systems, not just keyword targeting.",
      icon: MessageSquare,
      importance: "High",
      example: "'How to bake bread' instead of 'bread baking tips'"
    },
    {
      title: "Technical Performance",
      description: "Fast loading, mobile-friendly, accessible sites that AI crawlers can efficiently discover and index.",
      icon: Zap,
      importance: "Medium",
      example: "Core Web Vitals, mobile responsive, clean URLs"
    }
  ]

  const platforms = [
    { name: "ChatGPT", users: "347M", company: "OpenAI", color: "emerald" },
    { name: "Perplexity", users: "230M", company: "Perplexity AI", color: "blue" },
    { name: "Gemini", users: "200M", company: "Google", color: "pink" },
    { name: "Copilot", users: "180M", company: "Microsoft", color: "purple" },
    { name: "Claude", users: "150M", company: "Anthropic", color: "orange" },
    { name: "SearchGPT", users: "120M", company: "OpenAI", color: "cyan" }
  ]

  const benefits = [
    {
      title: "Access 1.2 Billion Monthly Searches",
      description: "AI search platforms process over 1.2 billion queries monthly—a massive audience looking for information, products, and services.",
      icon: Users,
      stat: "1.2B+"
    },
    {
      title: "Higher Quality Traffic",
      description: "AI-referred visitors have 6.2x higher conversion rates than traditional search because AI pre-qualifies recommendations.",
      icon: TrendingUp,
      stat: "6.2x"
    },
    {
      title: "Build Lasting Authority",
      description: "AI systems learn which sources to trust. Once established as authoritative, you get cited repeatedly without ongoing SEO work.",
      icon: Award,
      stat: "8.3x"
    },
    {
      title: "First-Mover Advantage",
      description: "AI SEO is less competitive than traditional SEO. Early optimization establishes authority before the space becomes crowded.",
      icon: Zap,
      stat: "Early"
    }
  ]

  const commonQuestions = [
    {
      question: "Do I still need traditional SEO if I do AI SEO?",
      answer: "Yes. Google still drives significant traffic. The best strategy combines both—many optimizations (schema markup, page speed, mobile responsiveness) benefit both traditional and AI search. Think of AI SEO as an addition, not a replacement."
    },
    {
      question: "How long does AI SEO take to show results?",
      answer: "Initial improvements appear within 1-2 weeks. Significant citation increases typically occur within 1-3 months. Full authority establishment takes 4-6 months. This is faster than traditional SEO, which often takes 6-12 months."
    },
    {
      question: "Is AI SEO expensive?",
      answer: "No. Many AI SEO optimizations are free (schema markup, content restructuring, author bios). Tools like AISEOScan offer free audits. The main cost is time—3-5 hours for initial setup, then 30 minutes weekly for maintenance."
    },
    {
      question: "Can small businesses compete in AI search?",
      answer: "Absolutely. AI SEO levels the playing field because it prioritizes content quality and expertise over domain age and backlink count. Small businesses with genuine expertise can outrank larger competitors."
    },
    {
      question: "What if AI platforms change their algorithms?",
      answer: "Core principles (clear structure, accurate information, proper attribution, expertise signals) remain constant across platforms and algorithm updates. Focus on fundamentals, not gaming specific systems."
    }
  ]

  return (
    <Layout 
      title="What is AI SEO? Complete Definition and Guide 2025"
      description="AI SEO (Artificial Intelligence Search Engine Optimization) is optimizing websites for ChatGPT, Perplexity, Claude, and AI search engines. Learn how it works and why it matters."
    >
      {/* Hero Section with Direct Answer (for featured snippet) */}
      <div className="mb-16">
        <div className="flex items-center justify-center mb-6">
          <HelpCircle className="h-12 w-12 text-pink-400 mr-4" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            What is AI SEO?
          </h1>
        </div>

        {/* Direct Answer Box - Optimized for Featured Snippet */}
        <div className="bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-blue-900/40 border-2 border-pink-500 p-8 rounded-xl backdrop-blur-sm mb-8">
          <div className="flex items-start mb-4">
            <Lightbulb className="h-8 w-8 text-yellow-400 mr-4 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Quick Answer</h2>
              <p className="text-gray-200 text-lg leading-relaxed">
                <strong className="text-white">AI SEO (Artificial Intelligence Search Engine Optimization)</strong> is the practice of optimizing websites to rank well in AI-powered search engines like ChatGPT, Perplexity, Claude, Gemini, and SearchGPT. Unlike traditional SEO that focuses on Google rankings, AI SEO optimizes for how AI systems discover, analyze, understand, and cite content when providing direct answers to user queries.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <Link href="/">
            <a className="inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
              <Search className="h-5 w-5 mr-2" />
              Check Your AI SEO Score Free
            </a>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/50 text-center">
            <div className="text-3xl font-bold text-white">1.2B+</div>
            <div className="text-sm text-gray-300">Monthly AI searches</div>
          </div>
          <div className="bg-pink-900/30 p-4 rounded-lg border border-pink-500/50 text-center">
            <div className="text-3xl font-bold text-white">6</div>
            <div className="text-sm text-gray-300">Major AI platforms</div>
          </div>
          <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/50 text-center">
            <div className="text-3xl font-bold text-white">8.3x</div>
            <div className="text-sm text-gray-300">Citation increase</div>
          </div>
          <div className="bg-emerald-900/30 p-4 rounded-lg border border-emerald-500/50 text-center">
            <div className="text-3xl font-bold text-white">2025</div>
            <div className="text-sm text-gray-300">The AI search era</div>
          </div>
        </div>
      </div>

      {/* How AI Search Works */}
      <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
          <Bot className="h-8 w-8 text-purple-400 mr-3" />
          How AI Search Engines Work
        </h2>
        
        <p className="text-gray-200 text-lg leading-relaxed mb-6">
          Traditional search engines like Google return a list of 10 blue links. AI search engines like ChatGPT and Perplexity provide <strong className="text-white">direct answers with citations</strong>. When you ask ChatGPT "How to bake sourdough bread?", it doesn't give you links—it gives you step-by-step instructions and cites the sources it used.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/50">
            <div className="text-4xl mb-4">1️⃣</div>
            <h3 className="text-xl font-bold text-white mb-3">User Asks Question</h3>
            <p className="text-gray-300 text-sm">
              "What are the best AI SEO tools?" - Natural language query, not keywords
            </p>
          </div>

          <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-500/50">
            <div className="text-4xl mb-4">2️⃣</div>
            <h3 className="text-xl font-bold text-white mb-3">AI Analyzes Web</h3>
            <p className="text-gray-300 text-sm">
              Searches relevant sources, evaluates content quality, checks author expertise
            </p>
          </div>

          <div className="bg-pink-900/20 p-6 rounded-lg border border-pink-500/50">
            <div className="text-4xl mb-4">3️⃣</div>
            <h3 className="text-xl font-bold text-white mb-3">Provides Answer + Citations</h3>
            <p className="text-gray-300 text-sm">
              Direct answer with numbered citations to trusted sources
            </p>
          </div>
        </div>

        <div className="bg-emerald-900/20 p-6 rounded-lg border-l-4 border-emerald-400">
          <h3 className="font-semibold text-emerald-300 mb-3">💡 Key Insight:</h3>
          <p className="text-gray-200">
            AI systems don't just find relevant pages—they <strong className="text-white">understand and synthesize information</strong> from multiple sources. Your content must be structured for AI comprehension, not just keyword matching.
          </p>
        </div>
      </div>

      {/* AI SEO vs Traditional SEO Comparison */}
      <div className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 mb-12">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <BarChart3 className="h-8 w-8 text-blue-400 mr-3" />
          AI SEO vs Traditional SEO
        </h2>
        
        <div className="space-y-6">
          {keyDifferences.map((diff, index) => {
            const Icon = diff.icon
            return (
              <div key={index} className="border border-gray-700 rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-4 border-b border-gray-700">
                  <div className="flex items-center">
                    <Icon className="h-6 w-6 text-pink-400 mr-3" />
                    <h3 className="text-xl font-bold text-white">{diff.aspect}</h3>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-gray-700">
                  <div className="p-6 bg-rose-900/10">
                    <div className="text-sm text-rose-300 font-semibold mb-2">Traditional SEO</div>
                    <p className="text-gray-300">{diff.traditional}</p>
                  </div>
                  <div className="p-6 bg-emerald-900/10">
                    <div className="text-sm text-emerald-300 font-semibold mb-2">AI SEO</div>
                    <p className="text-gray-300">{diff.ai}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Core Components */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <Target className="h-8 w-8 text-pink-400 mr-3" />
          5 Core Components of AI SEO
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {components.map((component, index) => {
            const Icon = component.icon
            return (
              <div key={index} className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-6 rounded-xl border border-purple-500/50">
                <div className="flex items-start justify-between mb-4">
                  <Icon className="h-10 w-10 text-purple-400" />
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    component.importance === 'Critical' ? 'bg-rose-500 text-white' :
                    component.importance === 'High' ? 'bg-orange-500 text-white' :
                    'bg-yellow-500 text-gray-900'
                  }`}>
                    {component.importance}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{component.title}</h3>
                <p className="text-gray-300 mb-4">{component.description}</p>
                <div className="bg-gray-800/50 p-3 rounded border border-gray-700">
                  <p className="text-sm text-gray-400 mb-1">Example:</p>
                  <p className="text-sm text-gray-200">{component.example}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Major AI Platforms */}
      <div className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
          <Globe className="h-8 w-8 text-blue-400 mr-3" />
          Major AI Search Platforms
        </h2>
        
        <p className="text-gray-200 mb-8">
          AI SEO isn't just about one platform. Multiple AI-powered search engines are competing for user attention, each with hundreds of millions of monthly users.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform, index) => (
            <div key={index} className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/50">
              <h3 className="text-2xl font-bold text-white mb-2">{platform.name}</h3>
              <p className="text-sm text-gray-400 mb-4">{platform.company}</p>
              <div className="bg-purple-900/30 p-3 rounded">
                <div className="text-3xl font-bold text-white">{platform.users}</div>
                <div className="text-sm text-gray-300">Monthly Active Users</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-pink-900/20 p-6 rounded-lg border-l-4 border-pink-400">
          <p className="text-gray-200">
            <strong className="text-white">Combined reach:</strong> Over 1.2 billion monthly queries across all AI platforms. This represents a massive opportunity for visibility that traditional search alone can't provide.
          </p>
        </div>
      </div>

      {/* Why AI SEO Matters */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <TrendingUp className="h-8 w-8 text-emerald-400 mr-3" />
          Why AI SEO Matters in 2025
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div key={index} className="bg-gradient-to-r from-gray-900/60 to-emerald-900/20 backdrop-blur-sm p-8 rounded-xl border border-emerald-500/50">
                <div className="flex items-start justify-between mb-4">
                  <Icon className="h-12 w-12 text-emerald-400" />
                  <div className="text-3xl font-bold text-emerald-400">{benefit.stat}</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Common Questions */}
      <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-12">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <HelpCircle className="h-8 w-8 text-purple-400 mr-3" />
          Common Questions About AI SEO
        </h2>
        
        <div className="space-y-6">
          {commonQuestions.map((item, index) => (
            <div key={index} className="border-l-4 border-purple-500 pl-6 py-4">
              <h3 className="text-xl font-bold text-white mb-3">❓ {item.question}</h3>
              <p className="text-gray-300 leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-gradient-to-r from-gray-900/60 to-pink-900/20 backdrop-blur-sm p-8 rounded-xl border border-pink-500/50 mb-12">
        <h2 className="text-3xl font-bold text-white mb-6">How to Get Started with AI SEO</h2>
        
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="bg-pink-500 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              1
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Run an AI SEO Audit</h3>
              <p className="text-gray-300 mb-3">
                Start by understanding your current AI search optimization status. Use AISEOScan to get a free comprehensive report showing gaps in schema markup, content structure, and authority signals.
              </p>
              <Link href="/">
                <a className="text-pink-400 hover:text-pink-300 font-semibold flex items-center">
                  Get Free AI SEO Audit <ArrowRight className="h-4 w-4 ml-2" />
                </a>
              </Link>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-pink-500 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              2
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Learn Platform-Specific Strategies</h3>
              <p className="text-gray-300 mb-3">
                Each AI platform (ChatGPT, Perplexity, Claude) has unique preferences. Study platform-specific guides to maximize your citation rates.
              </p>
              <Link href="/ai-seo">
                <a className="text-pink-400 hover:text-pink-300 font-semibold flex items-center">
                  View AI SEO Platform Guides <ArrowRight className="h-4 w-4 ml-2" />
                </a>
              </Link>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-pink-500 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              3
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Implement Step-by-Step</h3>
              <p className="text-gray-300 mb-3">
                Follow proven implementation guides to optimize schema markup, content structure, and authority signals systematically.
              </p>
              <Link href="/how-to-use-ai-for-seo">
                <a className="text-pink-400 hover:text-pink-300 font-semibold flex items-center">
                  Follow Step-by-Step Tutorial <ArrowRight className="h-4 w-4 ml-2" />
                </a>
              </Link>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-pink-500 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              4
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Use the Right Tools</h3>
              <p className="text-gray-300 mb-3">
                Leverage specialized AI SEO tools to automate audits, validate schema, and track citation performance across platforms.
              </p>
              <Link href="/best-ai-seo-tools-2025">
                <a className="text-pink-400 hover:text-pink-300 font-semibold flex items-center">
                  Compare AI SEO Tools <ArrowRight className="h-4 w-4 ml-2" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-blue-900/40 backdrop-blur-sm p-12 rounded-xl border border-pink-500/50 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Ready to Optimize for AI Search?</h2>
        <p className="text-gray-200 text-xl mb-8 max-w-2xl mx-auto">
          Get a free AI SEO audit showing exactly how your website performs in ChatGPT, Perplexity, Claude, and other AI search engines.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <Link href="/">
            <a className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
              <Search className="h-6 w-6 mr-2" />
              Get Free AI SEO Scan
            </a>
          </Link>
          <Link href="/ai-seo">
            <a className="bg-gray-800 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-700 transition-all duration-300 border border-gray-600 flex items-center justify-center">
              Learn More About AI SEO
            </a>
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300">
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
            Free forever
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
            30+ AI SEO checks
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
            Instant results
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
            No credit card needed
          </div>
        </div>
      </div>
    </Layout>
  )
}