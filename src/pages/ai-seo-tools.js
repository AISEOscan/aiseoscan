import Layout from '../components/Layout'
import Link from 'next/link'
import { Bot, CheckCircle, Zap, ArrowRight, Search, Code, FileText, Shield, TrendingUp } from 'lucide-react'

export default function AISEOTools() {
  const whatWeActuallyCheck = [
    {
      category: "Structured Data & Schema Markup",
      icon: Code,
      checks: [
        "JSON-LD structured data presence",
        "Article schema validation (headline, author, datePublished, publisher)",
        "FAQ schema detection for Q&A content",
        "Organization schema with company details",
        "Person/Author schema for expertise signals",
        "Open Graph tags (title, description, image, url, type)",
        "Twitter Card implementation"
      ],
      whyItMatters: "AI engines like ChatGPT, Perplexity, and SearchGPT rely on schema markup to understand what your content is about. Without it, they can't properly parse or cite your content."
    },
    {
      category: "Content Quality & AI Digestibility",
      icon: FileText,
      checks: [
        "Heading hierarchy (H1 → H2 → H3 structure)",
        "H1 tag presence and optimization",
        "FAQ sections for direct answers",
        "Question-based headings",
        "Answer-format content structure",
        "Content depth (word count analysis)",
        "Factual density scoring",
        "Author attribution",
        "Publication/update dates",
        "Readability (sentence length)"
      ],
      whyItMatters: "AI systems prefer well-structured content with clear headings, FAQs, and factual information. Proper structure helps AI understand and extract information for citations."
    },
    {
      category: "Technical AI SEO Foundation",
      icon: Zap,
      checks: [
        "Render-blocking resources (CSS/JavaScript)",
        "Viewport meta tag for mobile optimization",
        "Semantic HTML tags (main, article, section, etc.)",
        "Internal linking structure",
        "URL structure and readability",
        "HTTPS/SSL security"
      ],
      whyItMatters: "AI crawlers need fast, accessible, mobile-friendly sites. Technical issues can prevent AI systems from properly accessing and indexing your content."
    },
    {
      category: "Authority & Trust Signals",
      icon: Shield,
      checks: [
        "About page presence",
        "Contact information availability",
        "Privacy policy link",
        "Terms of service link"
      ],
      whyItMatters: "AI engines evaluate trustworthiness before citing content. Sites with clear about pages, contact info, and legal pages signal legitimacy and credibility."
    }
  ]

  const platformsSupported = [
    { name: "ChatGPT", users: "347M", color: "emerald" },
    { name: "Perplexity", users: "230M", color: "blue" },
    { name: "Gemini", users: "200M", color: "pink" },
    { name: "Claude", users: "150M", color: "orange" },
    { name: "SearchGPT", users: "120M", color: "cyan" }
  ]

  return (
    <Layout 
      title="AI SEO Tools: Check Your ChatGPT, Perplexity & AI Search Optimization"
      description="Free AI SEO checker. Scan your website for schema markup, content structure, technical optimization, and authority signals that AI search engines need to cite your content."
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
            Free AI SEO checker that scans your website for the schema markup, content structure, technical optimization, and authority signals that ChatGPT, Perplexity, and other AI search engines need to understand and cite your content.
          </p>
          
          <Link href="https://www.aiseoscan.dev">
            <a className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
              <Zap className="h-5 w-5 mr-2" />
              Check Your AI SEO Free
            </a>
          </Link>
        </div>

        {/* What We Actually Check */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            What AISEOScan Actually Checks
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whatWeActuallyCheck.map((category, index) => {
              const Icon = category.icon
              return (
                <div key={index} className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50">
                  <Icon className="h-10 w-10 text-purple-400 mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-4">{category.category}</h3>
                  
                  <div className="mb-4">
                    <h4 className="text-purple-300 font-semibold mb-3">Checks Performed:</h4>
                    <div className="space-y-2">
                      {category.checks.map((check, cIndex) => (
                        <div key={cIndex} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-purple-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{check}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/50">
                    <p className="text-purple-200 text-sm">
                      <strong>Why it matters:</strong> {category.whyItMatters}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Platforms Supported */}
        <div className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Works for All Major AI Search Platforms
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {platformsSupported.map((platform, index) => (
              <div key={index} className="bg-gray-900/60 p-4 rounded-lg border border-blue-500/30 text-center">
                <div className="text-2xl font-bold text-white">{platform.users}</div>
                <div className="text-sm text-gray-400">{platform.name}</div>
              </div>
            ))}
          </div>

          <p className="text-gray-300 text-center">
            Our scanner checks for universal AI SEO factors that work across ChatGPT, Perplexity, Gemini, Claude, SearchGPT, and other AI search engines. We focus on the fundamental elements all AI systems need: proper schema markup, clear content structure, fast loading, and trust signals.
          </p>
        </div>

        {/* How It Works */}
        <div className="bg-gradient-to-r from-gray-900/60 to-emerald-900/20 backdrop-blur-sm p-8 rounded-xl border border-emerald-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">
            How AISEOScan Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-emerald-500 text-white font-bold w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                1
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Enter Your URL</h3>
              <p className="text-gray-300 text-sm">
                Paste your website URL and we'll scan it in under 30 seconds. No signup required for basic scan.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-emerald-500 text-white font-bold w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                2
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Get Your Score</h3>
              <p className="text-gray-300 text-sm">
                See your AI SEO score (0-100) across schema markup, content quality, technical SEO, and authority signals.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-emerald-500 text-white font-bold w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                3
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Fix Issues</h3>
              <p className="text-gray-300 text-sm">
                Get specific, actionable recommendations with code examples. Premium report ($29) includes detailed fixes.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-blue-900/40 backdrop-blur-sm p-12 rounded-xl border border-purple-500/50 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Check Your AI SEO Now
          </h2>
          <p className="text-gray-200 text-xl mb-8 max-w-2xl mx-auto">
            See how well your website is optimized for AI search engines. Free scan shows your score and top issues.
          </p>
          
          <Link href="https://www.aiseoscan.dev">
            <a className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
              <Search className="h-6 w-6 mr-2" />
              Start Free AI SEO Scan
            </a>
          </Link>

          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-300">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              No signup required
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              Results in 30 seconds
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              Free scan
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link href="/ai-seo">
            <a className="text-purple-400 hover:text-purple-300 flex items-center justify-center transition-colors">
              <ArrowRight className="h-4 w-4 mr-2 transform rotate-180" />
              Back to AI SEO Guide
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  )
}