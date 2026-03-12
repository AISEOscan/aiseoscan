import Layout from '../components/Layout'
import Link from 'next/link'
import { Bot, CheckCircle, Zap, ArrowRight, Search, FileText, Code, Shield, AlertCircle, TrendingUp, Clock, Target } from 'lucide-react'

export default function CopilotSEOCheckingTool() {
  const checkingSteps = [
    {
      step: "Bing Index Status Check",
      what: "Verify if your site is in Bing's index",
      why: "Copilot only cites pages indexed by Bing. Not indexed = invisible to Copilot.",
      howToCheck: [
        "Method 1: Search 'site:yoursite.com' in Bing",
        "Method 2: Check Bing Webmaster Tools index count",
        "Method 3: Use AISEOScan's automated index check"
      ],
      passing: "All key pages indexed, last crawled within 7 days",
      failing: "Pages missing from index, crawl errors, or not crawled in 30+ days",
      fix: "Submit sitemap to Bing Webmaster Tools, fix robots.txt blocks, ensure crawlability"
    },
    {
      step: "Schema Markup Validation",
      what: "Check if your structured data is correct",
      why: "Copilot relies on schema to understand content. Broken schema = Copilot can't parse your content.",
      howToCheck: [
        "Method 1: Google's Rich Results Test (works for Bing too)",
        "Method 2: Bing Webmaster Tools > Markup Validator",
        "Method 3: AISEOScan's schema analysis"
      ],
      passing: "Valid Article, Organization, Person schema with all required fields",
      failing: "Missing schema, validation errors, or incomplete required fields",
      fix: "Add missing schema types, fix validation errors, include dateModified and author fields"
    },
    {
      step: "Enterprise Content Quality",
      what: "Assess if content meets professional standards",
      why: "Copilot users are 73% enterprise professionals. Casual or thin content gets ignored.",
      howToCheck: [
        "Word count: Is it 1,500+ words?",
        "Tone: Professional and business-focused?",
        "Structure: Clear headings and logical flow?",
        "Value: Does it answer business questions?"
      ],
      passing: "1,500+ words, professional tone, clear structure, actionable insights",
      failing: "< 1,000 words, casual tone, poor structure, or vague advice",
      fix: "Expand content depth, professionalize language, add case studies and data"
    },
    {
      step: "Authority & Trust Signals",
      what: "Verify presence of credibility indicators",
      why: "Copilot prioritizes trustworthy sites. Missing trust signals = lower citation probability.",
      howToCheck: [
        "HTTPS enabled site-wide?",
        "Clear contact page with phone/email/address?",
        "About page with company info?",
        "Author bios with credentials?",
        "Privacy policy and terms of service?"
      ],
      passing: "All trust signals present and professional",
      failing: "Missing 2+ trust signals or unprofessional implementation",
      fix: "Add missing pages, display certifications, show team credentials"
    },
    {
      step: "Mobile & Speed Performance",
      what: "Test mobile responsiveness and load speed",
      why: "Copilot users expect fast, mobile-friendly sites. Poor performance = lower rankings.",
      howToCheck: [
        "Method 1: Google PageSpeed Insights",
        "Method 2: Bing Webmaster Tools > Site Scan",
        "Method 3: AISEOScan's performance audit"
      ],
      passing: "Mobile-friendly, LCP < 2.5s, no layout shifts",
      failing: "Not mobile-responsive, LCP > 4s, or major CLS issues",
      fix: "Optimize images, reduce JavaScript, enable caching, fix mobile layout"
    }
  ]

  const quickCheckChecklist = [
    {
      category: "Bing Indexing",
      checks: [
        "Homepage indexed in Bing",
        "Top 10 pages indexed",
        "No crawl errors in Bing Webmaster",
        "Sitemap submitted to Bing"
      ]
    },
    {
      category: "Schema Markup",
      checks: [
        "Article schema on blog posts",
        "Organization schema on homepage",
        "Person schema for authors",
        "All schema validates without errors"
      ]
    },
    {
      category: "Content Quality",
      checks: [
        "Main pages are 1,500+ words",
        "Professional, business-focused tone",
        "Clear H1, H2, H3 structure",
        "Original insights and data"
      ]
    },
    {
      category: "Trust Signals",
      checks: [
        "HTTPS enabled site-wide",
        "Contact page with real info",
        "About page exists",
        "Author credentials visible"
      ]
    },
    {
      category: "Technical",
      checks: [
        "Mobile-friendly (responsive)",
        "Page loads in < 3 seconds",
        "No major JavaScript errors",
        "Valid SSL certificate"
      ]
    }
  ]

  const commonIssues = [
    {
      issue: "Pages Not Indexed by Bing",
      symptom: "Search 'site:yoursite.com' in Bing returns 0 or very few results",
      causes: [
        "Never submitted sitemap to Bing Webmaster Tools",
        "Robots.txt blocking Bingbot",
        "Pages blocked by noindex meta tag",
        "Site too new (< 30 days old)"
      ],
      fix: "Sign up for Bing Webmaster Tools, submit sitemap, check robots.txt, remove noindex tags",
      severity: "Critical"
    },
    {
      issue: "Schema Validation Errors",
      symptom: "Rich Results Test shows errors or warnings",
      causes: [
        "Missing required fields (author, dateModified)",
        "Incorrect schema type usage",
        "Malformed JSON-LD syntax",
        "Duplicate schema definitions"
      ],
      fix: "Use schema.org documentation, validate before deploying, include all required fields",
      severity: "High"
    },
    {
      issue: "Thin or Casual Content",
      symptom: "Articles under 1,000 words or written in casual tone",
      causes: [
        "Targeting consumer audience instead of enterprise",
        "Not understanding Copilot's professional user base",
        "Prioritizing quantity over quality"
      ],
      fix: "Rewrite top 10 pages in professional tone, expand to 1,500+ words, add business value",
      severity: "High"
    },
    {
      issue: "Missing Trust Signals",
      symptom: "No contact page, missing about page, or no author info",
      causes: [
        "Site built quickly without credibility considerations",
        "Not understanding enterprise audience expectations"
      ],
      fix: "Create professional contact page, add team bios, display certifications",
      severity: "Medium-High"
    },
    {
      issue: "Poor Mobile Performance",
      symptom: "PageSpeed score < 50 on mobile, or layout breaks on phones",
      causes: [
        "Large unoptimized images",
        "Too much JavaScript",
        "Not using responsive design"
      ],
      fix: "Compress images (WebP format), lazy load content, implement responsive CSS",
      severity: "Medium"
    }
  ]

  const toolComparison = [
    {
      method: "AISEOScan (Recommended)",
      speed: "< 30 seconds",
      coverage: "All 5 check categories",
      accuracy: "High (automated + human-verified rules)",
      reporting: "PDF report with prioritized fixes",
      cost: "$29 premium / Free basic",
      bestFor: "Anyone who wants comprehensive, fast results"
    },
    {
      method: "Manual Checking",
      speed: "2-3 hours",
      coverage: "Depends on your knowledge",
      accuracy: "Variable (easy to miss issues)",
      reporting: "You create your own notes",
      cost: "Free (your time)",
      bestFor: "Technical users with lots of free time"
    },
    {
      method: "Bing Webmaster Tools",
      speed: "1-2 hours",
      coverage: "Indexing + some technical (no schema/content)",
      accuracy: "High for indexing, limited elsewhere",
      reporting: "Dashboard (no downloadable report)",
      cost: "Free",
      bestFor: "Checking index status only"
    },
    {
      method: "Google Tools (PageSpeed, Rich Results)",
      speed: "30-60 minutes",
      coverage: "Schema + performance (no Copilot-specific)",
      accuracy: "High for what they check",
      reporting: "Individual tool outputs (fragmented)",
      cost: "Free",
      bestFor: "Schema validation and speed testing"
    }
  ]

  const scoreInterpretation = [
    {
      score: "90-100",
      grade: "A - Excellent",
      color: "emerald",
      meaning: "Copilot-ready. Site meets all criteria for citations.",
      action: "Monitor and maintain. Focus on content freshness."
    },
    {
      score: "75-89",
      grade: "B - Good",
      color: "blue",
      meaning: "Strong foundation. Minor issues to address.",
      action: "Fix identified issues. Most are quick wins (< 1 week)."
    },
    {
      score: "60-74",
      grade: "C - Fair",
      color: "yellow",
      meaning: "Some critical gaps. Unlikely to get cited consistently.",
      action: "Prioritize schema and indexing fixes. 2-3 week project."
    },
    {
      score: "40-59",
      grade: "D - Poor",
      color: "orange",
      meaning: "Major issues. Very low citation probability.",
      action: "Comprehensive overhaul needed. 1-2 month project."
    },
    {
      score: "0-39",
      grade: "F - Critical",
      color: "rose",
      meaning: "Site not Copilot-ready at all. Zero citation probability.",
      action: "Start from scratch. Not indexed or missing fundamentals."
    }
  ]

  return (
    <Layout 
      title="Copilot SEO Checking Tool: Check Your Microsoft Copilot Optimization (Free)"
      description="Free Copilot SEO checking tool. Verify Bing indexing, validate schema markup, check enterprise content quality, and test mobile performance. Get instant results."
    >
      <div className="max-w-6xl mx-auto py-12">
        {/* Hero */}
        <div className="mb-16">
          <div className="inline-block bg-purple-900/30 px-4 py-2 rounded-full mb-6">
            <span className="text-purple-200 text-sm font-semibold">457 monthly searches</span>
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
            Copilot SEO Checking Tool
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-4xl leading-relaxed">
            Free tool to check your Microsoft Copilot SEO in under 30 seconds. Verify Bing indexing, schema markup, content quality, trust signals, and mobile performance. Get instant results with actionable fixes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link href="https://www.aiseoscan.dev">
              <a className="inline-flex items-center bg-gradient-to-r from-purple-500 to-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
                <Zap className="h-5 w-5 mr-2" />
                Check Your Copilot SEO Free
              </a>
            </Link>
            <Link href="/copilot-seo-analysis-tool">
              <a className="inline-flex items-center bg-gray-800 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-700 transition-all duration-300 border border-gray-600">
                Deep Analysis Tool
                <ArrowRight className="h-5 w-5 ml-2" />
              </a>
            </Link>
          </div>

          <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-500/50">
            <div className="flex items-start">
              <Clock className="h-6 w-6 text-purple-400 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Quick Check (30 seconds)</h3>
                <p className="text-gray-300">
                  Enter your URL, get instant results. Free basic scan shows your Copilot readiness score and top 5 issues. Premium report ($29) includes detailed fixes and competitive analysis.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Step Checking Process */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <Target className="h-8 w-8 text-purple-400 mr-3" />
            What Our Copilot SEO Checking Tool Tests (5 Categories)
          </h2>

          <div className="space-y-8">
            {checkingSteps.map((step, index) => (
              <div key={index} className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50">
                <div className="flex items-start mb-6">
                  <div className="bg-purple-500 text-white font-bold w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-lg">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">{step.step}</h3>
                    <p className="text-gray-400 mb-4">{step.what}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-purple-900/20 p-5 rounded-lg">
                    <h4 className="text-purple-300 font-semibold mb-3">Why We Check This:</h4>
                    <p className="text-gray-300 text-sm">{step.why}</p>
                  </div>
                  <div className="bg-purple-900/20 p-5 rounded-lg">
                    <h4 className="text-purple-300 font-semibold mb-3">How We Check:</h4>
                    <ul className="space-y-2">
                      {step.howToCheck.map((method, mIndex) => (
                        <li key={mIndex} className="text-gray-300 text-sm flex items-start">
                          <CheckCircle className="h-4 w-4 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{method}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-emerald-900/20 p-4 rounded-lg border-l-4 border-emerald-400">
                    <h4 className="text-emerald-300 font-semibold text-sm mb-2">✅ Passing Criteria:</h4>
                    <p className="text-gray-300 text-sm">{step.passing}</p>
                  </div>
                  <div className="bg-rose-900/20 p-4 rounded-lg border-l-4 border-rose-400">
                    <h4 className="text-rose-300 font-semibold text-sm mb-2">❌ Failing Criteria:</h4>
                    <p className="text-gray-300 text-sm">{step.failing}</p>
                  </div>
                </div>

                <div className="mt-4 bg-blue-900/20 p-4 rounded-lg border border-blue-500/50">
                  <h4 className="text-blue-300 font-semibold text-sm mb-2">🔧 How to Fix:</h4>
                  <p className="text-gray-300 text-sm">{step.fix}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Checklist */}
        <div className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <CheckCircle className="h-8 w-8 text-blue-400 mr-3" />
            DIY Quick Checklist (Manual Check)
          </h2>

          <p className="text-gray-300 mb-6">
            If you want to check manually before using the tool, here's what to verify:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickCheckChecklist.map((category, index) => (
              <div key={index} className="bg-blue-900/20 p-5 rounded-lg border border-blue-500/50">
                <h3 className="text-lg font-bold text-white mb-4">{category.category}</h3>
                <div className="space-y-2">
                  {category.checks.map((check, cIndex) => (
                    <div key={cIndex} className="flex items-start">
                      <div className="w-5 h-5 border-2 border-blue-400 rounded mr-3 mt-0.5 flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">{check}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-blue-900/30 p-6 rounded-lg">
            <p className="text-blue-200">
              <strong>Time investment:</strong> Manual checking takes 2-3 hours. Our automated tool does it in 30 seconds and catches issues you'd likely miss.
            </p>
          </div>
        </div>

        {/* Common Issues */}
        <div className="bg-gradient-to-r from-gray-900/60 to-rose-900/20 backdrop-blur-sm p-8 rounded-xl border border-rose-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <AlertCircle className="h-8 w-8 text-rose-400 mr-3" />
            5 Most Common Copilot SEO Issues We Find
          </h2>

          <div className="space-y-6">
            {commonIssues.map((item, index) => (
              <div key={index} className="bg-rose-900/20 p-6 rounded-xl border-l-4 border-rose-400">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white">{item.issue}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ml-3 ${
                    item.severity === 'Critical' ? 'bg-rose-500 text-white' :
                    item.severity === 'High' ? 'bg-orange-500 text-white' :
                    'bg-yellow-500 text-white'
                  }`}>
                    {item.severity}
                  </span>
                </div>

                <div className="mb-4">
                  <span className="text-rose-300 font-semibold text-sm">Symptom: </span>
                  <span className="text-gray-300 text-sm">{item.symptom}</span>
                </div>

                <div className="mb-4">
                  <h4 className="text-rose-300 font-semibold text-sm mb-2">Common Causes:</h4>
                  <ul className="space-y-1">
                    {item.causes.map((cause, cIndex) => (
                      <li key={cIndex} className="text-gray-300 text-sm">• {cause}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-emerald-900/20 p-4 rounded border border-emerald-500/50">
                  <h4 className="text-emerald-300 font-semibold text-sm mb-2">✓ Fix:</h4>
                  <p className="text-emerald-200 text-sm">{item.fix}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tool Comparison */}
        <div className="bg-gradient-to-r from-gray-900/60 to-emerald-900/20 backdrop-blur-sm p-8 rounded-xl border border-emerald-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">
            Checking Methods Compared
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-emerald-500/50">
                  <th className="text-left p-4 text-emerald-300 font-semibold">Method</th>
                  <th className="text-left p-4 text-emerald-300 font-semibold">Speed</th>
                  <th className="text-left p-4 text-emerald-300 font-semibold">Coverage</th>
                  <th className="text-left p-4 text-emerald-300 font-semibold">Accuracy</th>
                  <th className="text-left p-4 text-emerald-300 font-semibold">Cost</th>
                  <th className="text-left p-4 text-emerald-300 font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody>
                {toolComparison.map((row, index) => (
                  <tr key={index} className="border-b border-gray-700/50">
                    <td className="p-4 text-white font-medium">{row.method}</td>
                    <td className="p-4 text-gray-300 text-sm">{row.speed}</td>
                    <td className="p-4 text-gray-300 text-sm">{row.coverage}</td>
                    <td className="p-4 text-gray-300 text-sm">{row.accuracy}</td>
                    <td className="p-4 text-gray-300 text-sm font-semibold">{row.cost}</td>
                    <td className="p-4 text-gray-400 text-sm">{row.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Score Interpretation */}
        <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-400 mr-3" />
            Understanding Your Copilot SEO Score
          </h2>

          <p className="text-gray-300 mb-6">
            Our checking tool gives you a score from 0-100. Here's what each score range means:
          </p>

          <div className="space-y-4">
            {scoreInterpretation.map((item, index) => (
              <div key={index} className={`p-6 rounded-lg border-l-4 bg-${item.color}-900/20 border-${item.color}-400`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div className={`text-3xl font-bold text-${item.color}-400`}>{item.score}</div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{item.grade}</h3>
                      <p className="text-gray-400 text-sm">{item.meaning}</p>
                    </div>
                  </div>
                </div>
                <div className={`bg-${item.color}-900/30 p-4 rounded`}>
                  <span className={`text-${item.color}-300 font-semibold`}>Recommended Action: </span>
                  <span className="text-gray-300">{item.action}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-900/40 via-blue-900/40 to-purple-900/40 backdrop-blur-sm p-12 rounded-xl border border-purple-500/50 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Check Your Copilot SEO in 30 Seconds
          </h2>
          <p className="text-gray-200 text-xl mb-8 max-w-2xl mx-auto">
            Stop guessing if your site is Copilot-ready. Get instant results with specific fixes for each issue found.
          </p>
          
          <Link href="https://www.aiseoscan.dev">
            <a className="inline-flex items-center bg-gradient-to-r from-purple-500 to-blue-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
              <Search className="h-6 w-6 mr-2" />
              Run Free Copilot Check
            </a>
          </Link>

          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-300">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              Results in 30 seconds
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              No signup required
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              5 categories checked
            </div>
          </div>
        </div>

        {/* Related Tools */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-6">Related Copilot Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/copilot-seo-tool">
              <a className="bg-gray-900/60 p-4 rounded-lg border border-purple-500/30 hover:border-purple-500 transition-colors group">
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold group-hover:text-purple-400 transition-colors">Copilot SEO Tool</span>
                  <ArrowRight className="h-5 w-5 text-gray-600 group-hover:text-purple-400 transition-colors" />
                </div>
              </a>
            </Link>
            <Link href="/copilot-seo-checker">
              <a className="bg-gray-900/60 p-4 rounded-lg border border-purple-500/30 hover:border-purple-500 transition-colors group">
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold group-hover:text-purple-400 transition-colors">Copilot SEO Checker</span>
                  <ArrowRight className="h-5 w-5 text-gray-600 group-hover:text-purple-400 transition-colors" />
                </div>
              </a>
            </Link>
          </div>
        </div>

        {/* Back to Hub */}
        <div className="mt-12 text-center">
          <Link href="/ai-seo-tools">
            <a className="text-purple-400 hover:text-purple-300 flex items-center justify-center transition-colors">
              <ArrowRight className="h-4 w-4 mr-2 transform rotate-180" />
              Back to All AI SEO Tools
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  )
}