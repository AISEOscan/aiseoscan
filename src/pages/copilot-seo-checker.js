import Layout from '../components/Layout'
import Link from 'next/link'
import { Bot, CheckCircle, Zap, ArrowRight, Play, Clock, ThumbsUp, AlertTriangle, Lightbulb, Award, TrendingUp } from 'lucide-react'

export default function CopilotSEOChecker() {
  const instantChecks = [
    {
      check: "Is your site in Bing?",
      how: "Search 'site:yoursite.com' in Bing",
      passing: "You see your pages listed",
      failing: "No results or very few pages",
      quickFix: "Submit to Bing Webmaster Tools",
      timeToFix: "15 minutes"
    },
    {
      check: "Do you have schema markup?",
      how: "View source, search for 'schema.org'",
      passing: "You find JSON-LD with Article/Organization/Person",
      failing: "No schema found",
      quickFix: "Add schema.org markup to pages",
      timeToFix: "30 minutes"
    },
    {
      check: "Is your site HTTPS?",
      how: "Look at your URL - does it start with 'https://'?",
      passing: "Yes, padlock icon in browser",
      failing: "No, shows 'Not Secure' warning",
      quickFix: "Get SSL certificate (free from Let's Encrypt)",
      timeToFix: "1 hour"
    },
    {
      check: "Do you have a contact page?",
      how: "Look for /contact or similar in your menu",
      passing: "Contact page with phone/email/address",
      failing: "No contact page or just a form",
      quickFix: "Create contact page with real info",
      timeToFix: "20 minutes"
    },
    {
      check: "Is content professional?",
      how: "Read your top page - does it sound business-appropriate?",
      passing: "Professional tone, 1,500+ words",
      failing: "Casual tone or under 1,000 words",
      quickFix: "Rewrite in professional style, expand depth",
      timeToFix: "2-4 hours"
    }
  ]

  const checkerWorkflow = [
    {
      step: "Run Quick Check",
      what: "Enter your URL, get instant pass/fail results",
      time: "30 seconds",
      tool: "Free - AISEOScan basic scan"
    },
    {
      step: "Review Your Score",
      what: "See overall score (0-100) and grade (A-F)",
      time: "1 minute",
      tool: "Instant results page"
    },
    {
      step: "Identify Top Issues",
      what: "Free scan shows top 5 critical issues",
      time: "2 minutes",
      tool: "Basic report (free)"
    },
    {
      step: "Get Detailed Fixes",
      what: "Upgrade to premium for step-by-step fixes with code",
      time: "10 minutes to review",
      tool: "Premium report ($29)"
    },
    {
      step: "Implement Fixes",
      what: "Follow prioritized action plan",
      time: "1-7 days depending on issues",
      tool: "Your CMS/developer"
    },
    {
      step: "Re-check Progress",
      what: "Run checker again to verify improvements",
      time: "30 seconds",
      tool: "Free re-scan"
    }
  ]

  const scoreGuide = [
    {
      range: "90-100",
      grade: "A",
      emoji: "🎉",
      message: "Excellent! You're Copilot-ready",
      action: "Maintain your optimization and monitor regularly"
    },
    {
      range: "75-89",
      grade: "B",
      emoji: "👍",
      message: "Good! Minor improvements needed",
      action: "Fix the 2-3 issues identified, then re-check"
    },
    {
      range: "60-74",
      grade: "C",
      emoji: "⚠️",
      message: "Fair. Key gaps to address",
      action: "Focus on schema and indexing first (biggest impact)"
    },
    {
      range: "40-59",
      grade: "D",
      emoji: "❌",
      message: "Poor. Significant work needed",
      action: "Follow the full implementation roadmap (2-3 weeks)"
    },
    {
      range: "0-39",
      grade: "F",
      emoji: "🚨",
      message: "Critical. Not Copilot-ready",
      action: "Start with basics: get indexed, add HTTPS, create schema"
    }
  ]

  const beforeAfter = [
    {
      metric: "Bing Index Coverage",
      before: "23 pages indexed",
      after: "147 pages indexed (all important pages)",
      improvement: "+539%",
      timeframe: "2 weeks"
    },
    {
      metric: "Schema Validation",
      before: "No schema markup",
      after: "Valid Article + Organization schema on all pages",
      improvement: "0 → 100%",
      timeframe: "1 day"
    },
    {
      metric: "Content Depth",
      before: "Avg 650 words per page",
      after: "Avg 2,100 words per page",
      improvement: "+223%",
      timeframe: "3 weeks"
    },
    {
      metric: "Overall Copilot Score",
      before: "42/100 (F)",
      after: "87/100 (B+)",
      improvement: "+107%",
      timeframe: "1 month"
    }
  ]

  const quickWins = [
    {
      win: "Submit Sitemap to Bing",
      impact: "Get indexed in 1-2 weeks",
      difficulty: "Easy",
      time: "15 minutes",
      instructions: "Sign up for Bing Webmaster Tools → Sitemaps → Submit your sitemap.xml URL"
    },
    {
      win: "Add Article Schema",
      impact: "Copilot can parse your content",
      difficulty: "Medium",
      time: "30 minutes",
      instructions: "Use schema.org Article template → Add to <head> as JSON-LD → Validate with Google Rich Results Test"
    },
    {
      win: "Enable HTTPS Site-Wide",
      impact: "Instant trust signal",
      difficulty: "Easy",
      time: "1 hour",
      instructions: "Get free SSL from Let's Encrypt → Install on server → Force HTTPS redirects in .htaccess"
    },
    {
      win: "Add Contact Page",
      impact: "Show you're a real business",
      difficulty: "Easy",
      time: "20 minutes",
      instructions: "Create /contact page → Add phone, email, physical address → Link from footer"
    },
    {
      win: "Expand Top 3 Pages to 2,000+ Words",
      impact: "Meet enterprise depth standards",
      difficulty: "Hard",
      time: "4-6 hours",
      instructions: "Identify top traffic pages → Add case studies, data, examples → Maintain professional tone"
    }
  ]

  const freeVsPremium = [
    {
      feature: "Overall Copilot Score (0-100)",
      free: true,
      premium: true
    },
    {
      feature: "Pass/Fail Status per Category",
      free: true,
      premium: true
    },
    {
      feature: "Top 5 Critical Issues",
      free: true,
      premium: true
    },
    {
      feature: "Detailed Issue Descriptions",
      free: "Limited",
      premium: true
    },
    {
      feature: "Step-by-Step Fix Instructions",
      free: false,
      premium: true
    },
    {
      feature: "Code Examples & Templates",
      free: false,
      premium: true
    },
    {
      feature: "Competitor Benchmarking",
      free: false,
      premium: true
    },
    {
      feature: "Prioritized Implementation Roadmap",
      free: false,
      premium: true
    },
    {
      feature: "Downloadable PDF Report",
      free: false,
      premium: true
    },
    {
      feature: "Price",
      free: "Free",
      premium: "$29"
    }
  ]

  const faqs = [
    {
      q: "How is this different from Google SEO checkers?",
      a: "Google SEO checkers test for Google's algorithm (backlinks, keywords, PageRank). This checks for Copilot's algorithm (Bing indexing, schema, enterprise content). Completely different factors."
    },
    {
      q: "Do I need technical skills to use this?",
      a: "No. The free checker shows you what's wrong in plain English. Premium reports include step-by-step fixes with code you can copy-paste."
    },
    {
      q: "How long does a check take?",
      a: "Under 30 seconds. Enter your URL, instant results."
    },
    {
      q: "Can I check multiple pages?",
      a: "Yes. Free checker does one page at a time. Premium reports can scan up to 10 pages in one report."
    },
    {
      q: "What if my score is low?",
      a: "Don't panic. Most sites score 40-60 on first check. The checker tells you exactly what to fix and prioritizes quick wins."
    },
    {
      q: "How often should I re-check?",
      a: "After making fixes, re-check to verify improvements. Then monthly maintenance checks to catch issues early."
    }
  ]

  return (
    <Layout 
      title="Copilot SEO Checker: Free 30-Second Microsoft Copilot SEO Check"
      description="Free Copilot SEO checker. Check your Microsoft Copilot optimization in 30 seconds. Get instant score, top issues, and quick fixes. No signup required."
    >
      <div className="max-w-6xl mx-auto py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-block bg-purple-900/30 px-4 py-2 rounded-full mb-6">
            <span className="text-purple-200 text-sm font-semibold">454 monthly searches</span>
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
            Copilot SEO Checker
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Free 30-second check for Microsoft Copilot SEO. Enter your URL, get instant score, see top issues, and get actionable fixes. No signup required.
          </p>
          
          <Link href="https://www.aiseoscan.dev">
            <a className="inline-flex items-center bg-gradient-to-r from-purple-500 to-blue-600 text-white px-10 py-5 rounded-lg font-bold text-xl hover:from-purple-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <Play className="h-6 w-6 mr-3" />
              Check Your Copilot SEO Free
            </a>
          </Link>

          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-12">
            <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/50">
              <Clock className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-white font-bold">30 Seconds</div>
              <div className="text-gray-400 text-sm">Instant results</div>
            </div>
            <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/50">
              <Zap className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-white font-bold">5 Categories</div>
              <div className="text-gray-400 text-sm">Comprehensive</div>
            </div>
            <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/50">
              <ThumbsUp className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-white font-bold">Free</div>
              <div className="text-gray-400 text-sm">No signup</div>
            </div>
          </div>
        </div>

        {/* 5 Instant Checks */}
        <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Lightbulb className="h-8 w-8 text-yellow-400 mr-3" />
            5 Instant Checks You Can Do Right Now (No Tool Needed)
          </h2>

          <p className="text-gray-300 mb-6">
            Before using the automated checker, try these manual checks to get a quick sense of your Copilot SEO:
          </p>

          <div className="space-y-4">
            {instantChecks.map((check, index) => (
              <div key={index} className="bg-purple-900/20 p-5 rounded-lg border border-purple-500/50">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-white">{index + 1}. {check.check}</h3>
                  <span className="text-xs bg-purple-500 text-white px-3 py-1 rounded-full whitespace-nowrap ml-3">
                    {check.timeToFix}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <span className="text-purple-300 font-semibold text-sm">How to Check:</span>
                    <p className="text-gray-300 text-sm">{check.how}</p>
                  </div>
                  <div>
                    <span className="text-emerald-300 font-semibold text-sm">✅ Passing:</span>
                    <p className="text-gray-300 text-sm">{check.passing}</p>
                  </div>
                  <div>
                    <span className="text-rose-300 font-semibold text-sm">❌ Failing:</span>
                    <p className="text-gray-300 text-sm">{check.failing}</p>
                  </div>
                </div>

                <div className="bg-blue-900/30 p-3 rounded">
                  <span className="text-blue-300 font-semibold text-sm">Quick Fix: </span>
                  <span className="text-gray-300 text-sm">{check.quickFix}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-purple-900/30 p-6 rounded-lg text-center">
            <p className="text-purple-200 mb-4">
              <strong>Manual checking takes 30+ minutes and you'll miss issues.</strong> Our automated checker does all 5 checks (plus 25 more) in 30 seconds.
            </p>
            <Link href="https://www.aiseoscan.dev">
              <a className="inline-flex items-center bg-purple-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-600 transition-all">
                Use Automated Checker Instead
                <ArrowRight className="h-4 w-4 ml-2" />
              </a>
            </Link>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <Play className="h-8 w-8 text-blue-400 mr-3" />
            How the Copilot SEO Checker Works (6 Steps)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {checkerWorkflow.map((step, index) => (
              <div key={index} className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-6 rounded-xl border border-blue-500/50">
                <div className="bg-blue-500 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center mb-4 text-lg">
                  {index + 1}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.step}</h3>
                <p className="text-gray-300 text-sm mb-3">{step.what}</p>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center text-blue-300">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{step.time}</span>
                  </div>
                  <span className="text-gray-500">{step.tool}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Score Guide */}
        <div className="bg-gradient-to-r from-gray-900/60 to-emerald-900/20 backdrop-blur-sm p-8 rounded-xl border border-emerald-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Award className="h-8 w-8 text-emerald-400 mr-3" />
            What Your Score Means
          </h2>

          <div className="space-y-4">
            {scoreGuide.map((item, index) => (
              <div key={index} className="bg-emerald-900/20 p-5 rounded-lg border-l-4 border-emerald-400">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-4xl">{item.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-white">{item.range}</span>
                      <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        Grade {item.grade}
                      </span>
                    </div>
                    <p className="text-emerald-200 font-semibold">{item.message}</p>
                  </div>
                </div>
                <div className="bg-emerald-900/30 p-3 rounded mt-3">
                  <span className="text-emerald-300 font-semibold text-sm">What to do: </span>
                  <span className="text-gray-300 text-sm">{item.action}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Before/After */}
        <div className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <TrendingUp className="h-8 w-8 text-blue-400 mr-3" />
            Real Results: Before & After Using the Checker
          </h2>

          <p className="text-gray-300 mb-6">
            Example from a B2B SaaS company that used our checker and implemented fixes:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-blue-500/50">
                  <th className="text-left p-4 text-blue-300 font-semibold">Metric</th>
                  <th className="text-left p-4 text-rose-300 font-semibold">Before</th>
                  <th className="text-left p-4 text-emerald-300 font-semibold">After</th>
                  <th className="text-left p-4 text-white font-semibold">Improvement</th>
                  <th className="text-left p-4 text-gray-400 font-semibold">Time</th>
                </tr>
              </thead>
              <tbody>
                {beforeAfter.map((row, index) => (
                  <tr key={index} className="border-b border-gray-700/50">
                    <td className="p-4 text-white font-medium">{row.metric}</td>
                    <td className="p-4 text-rose-400">{row.before}</td>
                    <td className="p-4 text-emerald-400">{row.after}</td>
                    <td className="p-4 text-white font-bold">{row.improvement}</td>
                    <td className="p-4 text-gray-400">{row.timeframe}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Wins */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">
            5 Quick Wins After Running the Checker
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickWins.map((win, index) => (
              <div key={index} className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-6 rounded-xl border border-purple-500/50">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-white">{win.win}</h3>
                  <div className="flex flex-col gap-1 ml-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap text-center ${
                      win.difficulty === 'Easy' ? 'bg-emerald-500 text-white' :
                      win.difficulty === 'Medium' ? 'bg-yellow-500 text-white' :
                      'bg-rose-500 text-white'
                    }`}>
                      {win.difficulty}
                    </span>
                    <span className="text-xs text-gray-400 whitespace-nowrap">{win.time}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <span className="text-purple-300 font-semibold text-sm">Impact: </span>
                  <span className="text-gray-300 text-sm">{win.impact}</span>
                </div>

                <div className="bg-purple-900/30 p-3 rounded">
                  <span className="text-purple-200 font-semibold text-sm">How: </span>
                  <p className="text-gray-300 text-sm mt-1">{win.instructions}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Free vs Premium */}
        <div className="bg-gradient-to-r from-gray-900/60 to-emerald-900/20 backdrop-blur-sm p-8 rounded-xl border border-emerald-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">
            Free vs Premium Checker
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-emerald-500/50">
                  <th className="text-left p-4 text-emerald-300 font-semibold">Feature</th>
                  <th className="text-center p-4 text-gray-400 font-semibold">Free</th>
                  <th className="text-center p-4 text-emerald-300 font-semibold">Premium</th>
                </tr>
              </thead>
              <tbody>
                {freeVsPremium.map((row, index) => (
                  <tr key={index} className="border-b border-gray-700/50">
                    <td className="p-4 text-white">{row.feature}</td>
                    <td className="p-4 text-center">
                      {typeof row.free === 'boolean' ? (
                        row.free ? (
                          <CheckCircle className="h-5 w-5 text-emerald-400 mx-auto" />
                        ) : (
                          <span className="text-gray-500">—</span>
                        )
                      ) : (
                        <span className="text-gray-400 font-semibold">{row.free}</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {typeof row.premium === 'boolean' ? (
                        row.premium ? (
                          <CheckCircle className="h-5 w-5 text-emerald-400 mx-auto" />
                        ) : (
                          <span className="text-gray-500">—</span>
                        )
                      ) : (
                        <span className="text-emerald-400 font-bold">{row.premium}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">
            Common Questions
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index}>
                <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-gray-300">{faq.a}</p>
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
            Stop wondering if your site is Copilot-ready. Get instant answers, prioritized fixes, and a clear action plan.
          </p>
          
          <Link href="https://www.aiseoscan.dev">
            <a className="inline-flex items-center bg-gradient-to-r from-purple-500 to-blue-600 text-white px-12 py-5 rounded-lg font-bold text-xl hover:from-purple-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <Play className="h-7 w-7 mr-3" />
              Run Free Checker Now
            </a>
          </Link>

          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-300">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              30-second check
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              No signup required
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              Instant actionable results
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
            <Link href="/copilot-seo-checking-tool">
              <a className="bg-gray-900/60 p-4 rounded-lg border border-purple-500/30 hover:border-purple-500 transition-colors group">
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold group-hover:text-purple-400 transition-colors">Copilot SEO Checking Tool</span>
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