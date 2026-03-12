import Layout from '../components/Layout'
import Link from 'next/link'
import { Bot, CheckCircle, Zap, ArrowRight, Search, Award, Users, BookOpen, TrendingUp, AlertCircle, Code, FileText, Shield } from 'lucide-react'

export default function PerplexitySEOCheckingTools() {
  const whatWeCheck = [
    {
      category: "Schema Markup & Structured Data",
      icon: Code,
      description: "Perplexity relies on structured data to understand and cite content accurately",
      checks: [
        "JSON-LD presence and validation",
        "Article schema completeness (headline, author, publisher, dates)",
        "FAQ schema for direct answer extraction",
        "Organization schema",
        "Person/Author schema for expertise signals",
        "Open Graph tags for social context"
      ],
      perplexitySpecific: "Perplexity heavily weights sites with complete schema markup. Sites with proper Article schema and author attribution get cited 6-8x more often than sites without."
    },
    {
      category: "Content Structure & Quality",
      icon: FileText,
      description: "Well-structured content helps Perplexity extract and cite specific information",
      checks: [
        "Heading hierarchy (H1 → H2 → H3)",
        "Single, clear H1 tag",
        "FAQ sections with Q&A format",
        "Content depth (word count)",
        "Factual density (specific data vs vague statements)",
        "Author attribution",
        "Publication and update dates",
        "Readability and sentence structure"
      ],
      perplexitySpecific: "Perplexity users ask research-oriented questions. Content with clear headings, FAQ sections, and specific facts (statistics, dates, numbers) gets cited far more than vague, general content."
    },
    {
      category: "Technical Foundation",
      icon: Zap,
      description: "Technical optimization ensures Perplexity can access and process your content",
      checks: [
        "HTTPS/SSL security",
        "Mobile viewport tag",
        "Semantic HTML structure",
        "Page speed (render-blocking resources)",
        "Internal linking",
        "Clean URL structure"
      ],
      perplexitySpecific: "Perplexity crawls the web in real-time for many queries. Fast-loading, properly structured sites get crawled more frequently and cited more often."
    },
    {
      category: "Authority & Trust Signals",
      icon: Shield,
      description: "Perplexity evaluates source credibility before citing",
      checks: [
        "About page presence",
        "Contact information",
        "Privacy policy",
        "Terms of service"
      ],
      perplexitySpecific: "Perplexity users are 68% professionals and researchers who care about source credibility. Sites with clear about pages and contact info signal legitimacy."
    }
  ]

  const toolApproaches = [
    {
      approach: "AISEOScan (Our Tool)",
      howItWorks: "Automated scanner that checks schema markup, content structure, technical SEO, and authority signals specifically for AI search engines",
      whatItChecks: "30+ factors across schema, content, technical, and authority categories",
      speed: "30 seconds",
      cost: "Free basic scan / $29 premium report",
      perplexitySpecific: true,
      pros: [
        "Built specifically for AI search (not repurposed traditional SEO)",
        "Checks what Perplexity actually uses (schema, structure, authority)",
        "Instant results with actionable fixes",
        "Shows exactly which schema types are missing"
      ],
      cons: [
        "Premium reports require payment ($29)"
      ]
    },
    {
      approach: "Manual Schema Validation",
      howItWorks: "Use Google's Rich Results Test or Schema.org validator to check individual pages",
      whatItChecks: "Schema markup syntax and completeness",
      speed: "5-10 minutes per page",
      cost: "Free",
      perplexitySpecific: false,
      pros: [
        "Free",
        "Shows exact schema errors",
        "Good for validating schema you've already added"
      ],
      cons: [
        "Only checks schema, not content structure or authority",
        "Doesn't tell you WHICH schema types to add",
        "Time-consuming for multiple pages",
        "No Perplexity-specific insights"
      ]
    },
    {
      approach: "Traditional SEO Tools (Ahrefs, Moz, SEMrush)",
      howItWorks: "General SEO audits focused on Google rankings",
      whatItChecks: "Backlinks, keywords, traditional on-page SEO",
      speed: "Varies",
      cost: "$99-399/month",
      perplexitySpecific: false,
      pros: [
        "Comprehensive traditional SEO data",
        "Good for overall website health"
      ],
      cons: [
        "Not designed for AI search optimization",
        "Don't check for AI-specific factors (schema, FAQ sections, author attribution)",
        "Expensive monthly subscriptions",
        "Miss what Perplexity actually prioritizes"
      ]
    }
  ]

  const essentialChecks = [
    {
      check: "Schema Markup Completeness",
      why: "Perplexity needs schema to understand what your content is about, who wrote it, and when",
      howToCheck: "View page source, search for 'application/ld+json'. Look for Article, Organization, and Person schema types.",
      passing: "Has Article schema with headline, author, datePublished, publisher fields filled in",
      failing: "No schema at all, or incomplete schema missing required fields",
      impact: "Without proper schema, Perplexity may not cite you even if your content is excellent"
    },
    {
      check: "FAQ Sections",
      why: "Perplexity users ask questions. FAQ sections provide direct, quotable answers",
      howToCheck: "Look for Q&A format content on your pages. Check if you have FAQ schema markup.",
      passing: "Clear FAQ sections with question headings and concise answers, marked up with FAQ schema",
      failing: "No FAQ sections, or FAQs without proper structure or schema",
      impact: "Content with FAQ sections gets cited 4-5x more for question-based queries"
    },
    {
      check: "Author Attribution",
      why: "Perplexity weighs author expertise when deciding what to cite",
      howToCheck: "Look for author bylines, author bios with credentials, Person schema with author details",
      passing: "Clear author attribution with bio, credentials, and Person schema",
      failing: "Anonymous content or author name only without credentials",
      impact: "Content with clear author expertise signals gets prioritized over anonymous content"
    },
    {
      check: "Content Factual Density",
      why: "Perplexity prefers content with specific facts, data, and statistics over vague statements",
      howToCheck: "Count specific facts (numbers, dates, statistics) vs general statements in your content",
      passing: "High ratio of specific facts: '73% of users', 'published in 2024', '$29 pricing'",
      failing: "Vague statements: 'many users', 'recently', 'affordable pricing'",
      impact: "Fact-dense content is easier for Perplexity to cite and verify"
    },
    {
      check: "Heading Hierarchy",
      why: "Clear heading structure helps Perplexity understand content organization and extract information",
      howToCheck: "Check if you have single H1, followed by logical H2s and H3s",
      passing: "One H1 (page topic), multiple H2s (main sections), H3s (subsections)",
      failing: "Multiple H1s, missing headings, or illogical heading order",
      impact: "Well-structured content is easier for Perplexity to parse and cite specific sections"
    },
    {
      check: "HTTPS Security",
      why: "Perplexity prioritizes secure sites for credibility",
      howToCheck: "Check if your URL starts with 'https://' and has padlock icon in browser",
      passing: "HTTPS enabled site-wide with valid SSL certificate",
      failing: "HTTP (not secure) or mixed content warnings",
      impact: "Non-secure sites get deprioritized for citation"
    }
  ]

  const perplexityFactors = [
    {
      factor: "Domain Authority",
      weight: "Very High",
      description: "Perplexity strongly favors high-authority domains",
      note: "Our tool doesn't measure domain authority (requires external backlink data), but we check all on-page factors you can control: schema, content, structure."
    },
    {
      factor: "Schema Markup",
      weight: "Critical",
      description: "Proper Article, FAQ, and Person schema markup",
      note: "We check for presence and completeness of all major schema types"
    },
    {
      factor: "Content Freshness",
      weight: "High",
      description: "Recently published or updated content",
      note: "We check for datePublished and dateModified in schema, plus visible update dates"
    },
    {
      factor: "Author Credentials",
      weight: "High",
      description: "Clear author attribution with expertise signals",
      note: "We check for author bylines and Person schema with author details"
    },
    {
      factor: "Content Depth",
      weight: "Medium-High",
      description: "Comprehensive content (typically 1,500+ words)",
      note: "We analyze word count and factual density"
    },
    {
      factor: "Technical Quality",
      weight: "Medium",
      description: "HTTPS, mobile-friendly, fast loading",
      note: "We check HTTPS, viewport tag, semantic HTML, and render-blocking resources"
    }
  ]

  const commonMistakes = [
    {
      mistake: "Using Generic SEO Tools for Perplexity",
      problem: "Traditional SEO tools check Google-specific factors (backlinks, keyword density, PageRank signals). They miss what Perplexity actually cares about: schema markup, FAQ sections, author attribution, factual density.",
      solution: "Use AI-specific checking tools like AISEOScan that understand what Perplexity prioritizes. Free scan shows your schema completeness, content structure, and authority signals."
    },
    {
      mistake: "Ignoring Schema Markup",
      problem: "75% of sites we scan have missing or incomplete schema. This is the #1 reason sites don't get cited by Perplexity despite having good content.",
      solution: "Add Article schema (minimum), plus FAQ schema if you have Q&A content, and Person schema for author attribution. Our premium report provides copy-paste schema code."
    },
    {
      mistake: "Only Checking Schema Syntax",
      problem: "Schema validators (like Google's Rich Results Test) only check if your schema is syntactically correct. They don't tell you which schema TYPES to add or if your schema is complete.",
      solution: "Use tools that tell you what's missing, not just what's broken. Our scanner identifies missing schema types and incomplete required fields."
    },
    {
      mistake: "Optimizing for Google Instead of AI",
      problem: "Google SEO and Perplexity optimization are different. Backlink building, keyword density, and traditional on-page SEO matter less for Perplexity than schema, structure, and authority signals.",
      solution: "Focus on AI-specific factors: complete schema markup, FAQ sections, clear headings, author credentials, and factual content."
    }
  ]

  return (
    <Layout 
      title="Perplexity SEO Checking Tools: Check Your Perplexity Optimization"
      description="Compare tools for checking Perplexity SEO. Learn what to check, which tools work best, and how to verify your schema markup, content structure, and authority signals."
    >
      <div className="max-w-6xl mx-auto py-12">
        {/* Hero */}
        <div className="mb-16">
          <div className="inline-block bg-blue-900/30 px-4 py-2 rounded-full mb-6">
            <span className="text-blue-200 text-sm font-semibold">933 monthly searches</span>
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
            Perplexity SEO Checking Tools
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-4xl leading-relaxed">
            Compare tools for checking Perplexity SEO. Learn what factors matter most, which tools actually check them, and how to validate your schema markup, content structure, and authority signals for Perplexity citations.
          </p>
          
          <Link href="https://www.aiseoscan.dev">
            <a className="inline-flex items-center bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105">
              <Zap className="h-5 w-5 mr-2" />
              Check Your Perplexity SEO Free
            </a>
          </Link>
        </div>

        {/* What to Check */}
        <div className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <BookOpen className="h-8 w-8 text-blue-400 mr-3" />
            What Your Perplexity SEO Checking Tool Must Analyze
          </h2>
          
          <p className="text-gray-300 mb-8">
            Not all SEO factors matter for Perplexity. Here's what actually needs to be checked:
          </p>

          <div className="space-y-6">
            {whatWeCheck.map((category, index) => {
              const Icon = category.icon
              return (
                <div key={index} className="bg-blue-900/20 p-6 rounded-xl border border-blue-500/50">
                  <div className="flex items-start mb-4">
                    <Icon className="h-8 w-8 text-blue-400 mr-4 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{category.category}</h3>
                      <p className="text-gray-400 text-sm mb-4">{category.description}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-blue-300 font-semibold mb-3 text-sm">Must Check For:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {category.checks.map((check, cIndex) => (
                        <div key={cIndex} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{check}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-900/30 p-4 rounded border border-blue-500/50">
                    <p className="text-blue-200 text-sm">
                      <strong>Perplexity-specific:</strong> {category.perplexitySpecific}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Tool Comparison */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <Award className="h-8 w-8 text-blue-400 mr-3" />
            Perplexity SEO Checking Tools Compared
          </h2>

          <div className="space-y-8">
            {toolApproaches.map((tool, index) => (
              <div key={index} className={`p-8 rounded-xl border-2 ${
                tool.perplexitySpecific 
                  ? 'bg-gradient-to-r from-emerald-900/40 to-emerald-800/20 border-emerald-500' 
                  : 'bg-gradient-to-r from-gray-900/60 to-gray-800/20 border-gray-700'
              }`}>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{tool.approach}</h3>
                    <p className="text-gray-300 mb-3">{tool.howItWorks}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Checks: </span>
                        <span className="text-white font-semibold">{tool.whatItChecks}</span>
                      </div>
                      <span className="text-gray-600">•</span>
                      <div>
                        <span className="text-gray-500">Speed: </span>
                        <span className="text-white font-semibold">{tool.speed}</span>
                      </div>
                      <span className="text-gray-600">•</span>
                      <div>
                        <span className="text-gray-500">Cost: </span>
                        <span className="text-blue-400 font-semibold">{tool.cost}</span>
                      </div>
                    </div>
                  </div>
                  {tool.perplexitySpecific && (
                    <div className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap ml-4">
                      ⭐ AI-Specific
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-emerald-300 font-semibold mb-3">✅ Pros:</h4>
                    <ul className="space-y-2">
                      {tool.pros.map((pro, pIndex) => (
                        <li key={pIndex} className="text-gray-300 text-sm flex items-start">
                          <CheckCircle className="h-4 w-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-rose-300 font-semibold mb-3">❌ Cons:</h4>
                    <ul className="space-y-1">
                      {tool.cons.map((con, cIndex) => (
                        <li key={cIndex} className="text-gray-400 text-sm">• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Essential Checks */}
        <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">
            6 Essential Perplexity SEO Checks
          </h2>

          <div className="space-y-6">
            {essentialChecks.map((item, index) => (
              <div key={index} className="bg-purple-900/20 p-6 rounded-xl border border-purple-500/50">
                <h3 className="text-xl font-bold text-white mb-3">{index + 1}. {item.check}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-purple-300 font-semibold text-sm">Why: </span>
                    <p className="text-gray-300 text-sm">{item.why}</p>
                  </div>
                  <div>
                    <span className="text-purple-300 font-semibold text-sm">How to Check: </span>
                    <p className="text-gray-300 text-sm">{item.howToCheck}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-emerald-900/20 p-3 rounded border border-emerald-500/50">
                    <span className="text-emerald-300 font-semibold text-sm">✅ Passing: </span>
                    <p className="text-gray-300 text-sm mt-1">{item.passing}</p>
                  </div>
                  <div className="bg-rose-900/20 p-3 rounded border border-rose-500/50">
                    <span className="text-rose-300 font-semibold text-sm">❌ Failing: </span>
                    <p className="text-gray-300 text-sm mt-1">{item.failing}</p>
                  </div>
                </div>

                <div className="bg-blue-900/30 p-4 rounded border border-blue-500/50">
                  <p className="text-blue-200 text-sm">
                    <strong>Impact:</strong> {item.impact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Perplexity Ranking Factors */}
        <div className="bg-gradient-to-r from-gray-900/60 to-emerald-900/20 backdrop-blur-sm p-8 rounded-xl border border-emerald-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <TrendingUp className="h-8 w-8 text-emerald-400 mr-3" />
            What Perplexity Actually Weighs (And What We Check)
          </h2>

          <div className="space-y-4">
            {perplexityFactors.map((item, index) => (
              <div key={index} className="bg-emerald-900/20 p-5 rounded-lg border border-emerald-500/50">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-white">{item.factor}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ml-3 ${
                    item.weight === 'Critical' || item.weight === 'Very High' ? 'bg-rose-500 text-white' :
                    item.weight === 'High' ? 'bg-orange-500 text-white' :
                    'bg-blue-500 text-white'
                  }`}>
                    {item.weight}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-3">{item.description}</p>
                <div className="bg-emerald-900/30 p-3 rounded">
                  <p className="text-emerald-200 text-sm">
                    <strong>What we check:</strong> {item.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="bg-gradient-to-r from-gray-900/60 to-rose-900/20 backdrop-blur-sm p-8 rounded-xl border border-rose-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <AlertCircle className="h-8 w-8 text-rose-400 mr-3" />
            4 Common Mistakes When Checking Perplexity SEO
          </h2>

          <div className="space-y-6">
            {commonMistakes.map((item, index) => (
              <div key={index} className="bg-rose-900/20 p-6 rounded-xl border-l-4 border-rose-400">
                <h3 className="text-xl font-bold text-rose-300 mb-2">❌ {item.mistake}</h3>
                <p className="text-gray-300 mb-3">
                  <strong className="text-white">Problem:</strong> {item.problem}
                </p>
                <div className="bg-emerald-900/20 p-4 rounded border border-emerald-500/50">
                  <p className="text-emerald-200">
                    <strong>Solution:</strong> {item.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Perplexity Matters */}
        <div className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">
            Why Checking Perplexity SEO Matters
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center bg-blue-900/30 p-6 rounded-lg">
              <Users className="h-12 w-12 text-blue-400 mx-auto mb-3" />
              <div className="text-4xl font-bold text-white mb-2">230M</div>
              <p className="text-gray-300">Monthly users searching for research and analysis</p>
            </div>
            <div className="text-center bg-blue-900/30 p-6 rounded-lg">
              <Award className="h-12 w-12 text-purple-400 mx-auto mb-3" />
              <div className="text-4xl font-bold text-white mb-2">68%</div>
              <p className="text-gray-300">Professional and researcher user base</p>
            </div>
            <div className="text-center bg-blue-900/30 p-6 rounded-lg">
              <TrendingUp className="h-12 w-12 text-emerald-400 mx-auto mb-3" />
              <div className="text-4xl font-bold text-white mb-2">6-8x</div>
              <p className="text-gray-300">More citations with proper schema markup</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-900/40 via-cyan-900/40 to-blue-900/40 backdrop-blur-sm p-12 rounded-xl border border-blue-500/50 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Check Your Perplexity SEO Now
          </h2>
          <p className="text-gray-200 text-xl mb-8 max-w-2xl mx-auto">
            Get instant analysis of your schema markup, content structure, and authority signals. Free scan shows what's missing and how to fix it.
          </p>
          
          <Link href="https://www.aiseoscan.dev">
            <a className="inline-flex items-center bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105">
              <Search className="h-6 w-6 mr-2" />
              Start Free Perplexity SEO Check
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
              Free basic scan
            </div>
          </div>
        </div>

        {/* Back to Hub */}
        <div className="mt-12 text-center">
          <Link href="/ai-seo-tools">
            <a className="text-blue-400 hover:text-blue-300 flex items-center justify-center transition-colors">
              <ArrowRight className="h-4 w-4 mr-2 transform rotate-180" />
              Back to All AI SEO Tools
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  )
}