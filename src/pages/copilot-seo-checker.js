import Layout from '../components/Layout'
import Link from 'next/link'
import { Bot, CheckCircle, Zap, ArrowRight, Search, Clock, Play, Target, Lightbulb, AlertCircle, TrendingUp, Award } from 'lucide-react'

export default function CopilotSEOChecker() {
  const instantChecks = [
    {
      check: "Is your site in Bing?",
      how: "Google search: site:yoursite.com",
      passing: "You see your pages listed in results",
      failing: "No results or 'did not match any documents'",
      quickFix: "Submit sitemap to Bing Webmaster Tools",
      timeToFix: "15 minutes",
      note: "Copilot uses Bing's index - if Bing hasn't indexed you, Copilot can't see you"
    },
    {
      check: "Do you have schema markup?",
      how: "View page source (Ctrl+U), search for 'application/ld+json'",
      passing: "You find <script type=\"application/ld+json\"> with Article/Organization schema",
      failing: "No schema found in page source",
      quickFix: "Add Article schema with headline, author, datePublished, publisher",
      timeToFix: "30 minutes",
      note: "Schema is critical - Copilot relies on it to understand content"
    },
    {
      check: "Is your site HTTPS?",
      how: "Look at your URL - does it start with 'https://'?",
      passing: "Yes, shows padlock icon in browser",
      failing: "Shows 'Not Secure' warning, starts with http://",
      quickFix: "Get SSL certificate (free from Let's Encrypt), enable HTTPS site-wide",
      timeToFix: "1-2 hours",
      note: "Bing heavily deprioritizes non-secure sites"
    },
    {
      check: "Do you have proper heading structure?",
      how: "Inspect page, look at heading tags",
      passing: "One H1 (page title), multiple H2s (sections), H3s (subsections)",
      failing: "Multiple H1s or no clear heading hierarchy",
      quickFix: "Restructure: 1 H1 → multiple H2s → H3s under H2s",
      timeToFix: "30 minutes",
      note: "Clear structure helps Copilot understand content organization"
    },
    {
      check: "Is there visible author information?",
      how: "Look for author byline, bio, credentials on page",
      passing: "Author name visible with credentials or bio",
      failing: "Anonymous content or no author attribution",
      quickFix: "Add author byline with name and credentials, add Person schema",
      timeToFix: "30 minutes",
      note: "Enterprise users expect to know who wrote the content"
    }
  ]

  const checkerWorkflow = [
    {
      step: "Enter Your URL",
      what: "Paste your website URL into the checker",
      time: "5 seconds",
      output: "URL submitted for scanning"
    },
    {
      step: "Automated Scan Runs",
      what: "Checker analyzes schema, content structure, technical SEO, authority signals",
      time: "25 seconds",
      output: "30+ checks completed"
    },
    {
      step: "Get Your Score",
      what: "See overall score (0-100) and category breakdown",
      time: "Instant",
      output: "Score displayed: Schema (30%), Content (25%), Technical (20%), Authority (15%), AI (10%)"
    },
    {
      step: "Review Top Issues (Free)",
      what: "Free scan shows top 3-5 critical issues blocking Copilot citations",
      time: "2 minutes",
      output: "High-level issue list"
    },
    {
      step: "Get Detailed Fixes (Premium)",
      what: "Upgrade to $29 premium for complete issue list with code examples",
      time: "10 minutes to review",
      output: "Full PDF report with fix instructions"
    },
    {
      step: "Implement & Re-check",
      what: "Fix issues, run checker again to verify improvements",
      time: "Varies (days to weeks)",
      output: "Progress tracking"
    }
  ]

  const scoreGuide = [
    {
      range: "90-100",
      grade: "A",
      emoji: "🎉",
      message: "Excellent! Copilot-ready",
      action: "Maintain optimization. Run monthly checks to catch regressions.",
      example: "All schema present and complete, perfect heading structure, HTTPS enabled, all authority signals in place"
    },
    {
      range: "75-89",
      grade: "B",
      emoji: "👍",
      message: "Good! Minor improvements needed",
      action: "Fix 2-3 remaining issues (usually FAQ schema or author attribution), then re-check",
      example: "Has Article schema but missing FAQ schema, good structure but thin content (under 1,000 words)"
    },
    {
      range: "60-74",
      grade: "C",
      emoji: "⚠️",
      message: "Fair. Key gaps to address",
      action: "Prioritize schema completeness and content structure (2-4 week project)",
      example: "Incomplete Article schema (missing author), multiple H1s, no HTTPS"
    },
    {
      range: "40-59",
      grade: "D",
      emoji: "❌",
      message: "Poor. Significant work needed",
      action: "Start with quick wins: HTTPS, basic schema, fix headings (1-2 month project)",
      example: "No schema at all, broken heading hierarchy, no author attribution, missing legal pages"
    },
    {
      range: "0-39",
      grade: "F",
      emoji: "🚨",
      message: "Critical. Not Copilot-ready",
      action: "Complete rebuild needed. Follow full optimization roadmap (2-3 months)",
      example: "No schema, no HTTPS, no structure, no authority signals - fundamentals missing"
    }
  ]

  const beforeAfter = [
    {
      metric: "Overall Copilot Score",
      before: "42/100 (F)",
      after: "87/100 (B+)",
      improvement: "+107%",
      timeframe: "6 weeks"
    },
    {
      metric: "Schema Completeness",
      before: "0% - No schema markup",
      after: "95% - Article, FAQ, Organization, Person schema all present",
      improvement: "0 → 95%",
      timeframe: "1 week"
    },
    {
      metric: "Content Structure",
      before: "Multiple H1s, no hierarchy, 650 words avg",
      after: "Clean H1→H2→H3 flow, FAQ sections, 2,100 words avg",
      improvement: "+223% depth",
      timeframe: "3 weeks"
    },
    {
      metric: "Technical Foundation",
      before: "HTTP only, no viewport tag, 8 blocking scripts",
      after: "HTTPS enabled, viewport added, 1 blocking script",
      improvement: "88% technical score",
      timeframe: "1 week"
    }
  ]

  const quickWins = [
    {
      win: "Enable HTTPS",
      impact: "Instant trust signal boost - Bing prioritizes secure sites",
      difficulty: "Medium",
      time: "1-2 hours",
      instructions: "Get free SSL from Let's Encrypt → Install on server → Force HTTPS redirects → Update internal links to https://"
    },
    {
      win: "Add Basic Article Schema",
      impact: "Helps Copilot understand what content is about and who wrote it",
      difficulty: "Medium",
      time: "30-45 minutes",
      instructions: "Copy Article schema template → Fill in headline, author, datePublished, publisher → Add to <head> as JSON-LD → Validate with Google Rich Results Test"
    },
    {
      win: "Fix to Single H1",
      impact: "Clear topic signal - one H1 shows page focus",
      difficulty: "Easy",
      time: "15-30 minutes",
      instructions: "Find all H1 tags on page → Keep only main title as H1 → Change others to H2/H3 → Verify logo/header isn't H1"
    },
    {
      win: "Add Author Byline",
      impact: "Enterprise users expect visible author credentials",
      difficulty: "Easy",
      time: "20 minutes",
      instructions: "Add author name near content → Include short bio with credentials → Add Person schema with author details → Make author info visible (not hidden)"
    },
    {
      win: "Create About Page",
      impact: "Major trust signal - shows you're a legitimate business",
      difficulty: "Medium",
      time: "2-3 hours",
      instructions: "Create /about page → Add company/team info → Include credentials and expertise → Link from footer/navigation → Make it comprehensive (500+ words)"
    }
  ]

  const freeVsPremium = [
    {
      feature: "Overall Copilot Score (0-100)",
      free: true,
      premium: true
    },
    {
      feature: "Category Breakdown (Schema, Content, Technical, Authority)",
      free: true,
      premium: true
    },
    {
      feature: "Top 3-5 Critical Issues",
      free: true,
      premium: true
    },
    {
      feature: "Complete Issue List (All 30+ Checks)",
      free: false,
      premium: true
    },
    {
      feature: "Fix Instructions with Code Examples",
      free: false,
      premium: true
    },
    {
      feature: "Priority Roadmap (Fix These First)",
      free: false,
      premium: true
    },
    {
      feature: "Time Estimates for Each Fix",
      free: false,
      premium: true
    },
    {
      feature: "Competitive Benchmarking",
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
      a: "Google SEO checkers focus on backlinks, keywords, and PageRank. This checks Copilot-specific factors: schema markup completeness, enterprise content structure, Bing technical requirements, and authority signals that Copilot's 73% enterprise user base expects."
    },
    {
      q: "Do I need technical skills?",
      a: "No for running the checker - just paste your URL. The free scan shows what's wrong in plain English. Premium reports ($29) include step-by-step fixes with copy-paste code examples."
    },
    {
      q: "How long does a check take?",
      a: "Under 30 seconds. The checker scans 30+ factors automatically and shows your score instantly."
    },
    {
      q: "What if my score is low?",
      a: "Don't panic. Most sites score 40-60 on first check. The checker prioritizes issues by impact - start with quick wins (HTTPS, basic schema, fix headings), then tackle content depth."
    },
    {
      q: "Can I check multiple pages?",
      a: "Yes. Run separate scans for different pages. Each scan checks one URL. Premium reports can include analysis of up to 10 related pages."
    },
    {
      q: "How often should I re-check?",
      a: "After implementing fixes, re-check to verify improvements. Then monthly maintenance checks to catch regressions (e.g., schema broken during site update)."
    }
  ]

  return (
    <Layout 
      title="Copilot SEO Checker: Free 30-Second Microsoft Copilot SEO Check"
      description="Free Copilot SEO checker. Check your Microsoft Copilot optimization in 30 seconds. Get instant score, top issues, and actionable fixes. No signup required."
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
            Free 30-second Copilot SEO check. Enter your URL, get instant score (0-100), see top issues, and get actionable fixes. Checks schema markup, content structure, technical SEO, and authority signals. No signup required.
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
              <div className="text-white font-bold">30+ Checks</div>
              <div className="text-gray-400 text-sm">Comprehensive</div>
            </div>
            <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/50">
              <CheckCircle className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-white font-bold">Free</div>
              <div className="text-gray-400 text-sm">No signup</div>
            </div>
          </div>
        </div>

        {/* 5 Instant Manual Checks */}
        <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Lightbulb className="h-8 w-8 text-yellow-400 mr-3" />
            5 Quick Manual Checks (Before Using Automated Checker)
          </h2>

          <p className="text-gray-300 mb-6">
            Want a quick sense of your Copilot SEO? Try these 5 manual checks (takes ~10 minutes):
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
                    <span className="text-purple-300 font-semibold text-sm">How:</span>
                    <p className="text-gray-300 text-sm mt-1">{check.how}</p>
                  </div>
                  <div>
                    <span className="text-emerald-300 font-semibold text-sm">✅ Passing:</span>
                    <p className="text-gray-300 text-sm mt-1">{check.passing}</p>
                  </div>
                  <div>
                    <span className="text-rose-300 font-semibold text-sm">❌ Failing:</span>
                    <p className="text-gray-300 text-sm mt-1">{check.failing}</p>
                  </div>
                </div>

                <div className="bg-blue-900/30 p-3 rounded mb-2">
                  <span className="text-blue-300 font-semibold text-sm">Quick Fix: </span>
                  <span className="text-gray-300 text-sm">{check.quickFix}</span>
                </div>

                <div className="bg-purple-900/30 p-3 rounded">
                  <span className="text-purple-200 text-sm italic">💡 {check.note}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-purple-900/30 p-6 rounded-lg text-center">
            <p className="text-purple-200 mb-4">
              <strong>Manual checking takes 10+ minutes and you'll miss issues.</strong> Automated checker does all 5 checks (plus 25 more) in 30 seconds.
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
            How the Checker Works (6 Steps)
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
                  <span className="text-gray-500 text-xs">{step.output}</span>
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
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-2xl font-bold text-white">{item.range}</span>
                      <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        Grade {item.grade}
                      </span>
                    </div>
                    <p className="text-emerald-200 font-semibold">{item.message}</p>
                  </div>
                </div>
                <div className="mb-3">
                  <span className="text-emerald-300 font-semibold text-sm">What to do: </span>
                  <span className="text-gray-300 text-sm">{item.action}</span>
                </div>
                <div className="bg-emerald-900/30 p-3 rounded">
                  <span className="text-emerald-300 font-semibold text-sm">Example: </span>
                  <span className="text-gray-300 text-sm">{item.example}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Before/After */}
        <div className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <TrendingUp className="h-8 w-8 text-blue-400 mr-3" />
            Real Results: Before & After
          </h2>

          <p className="text-gray-300 mb-6">
            B2B SaaS company used the checker, implemented fixes, and tracked progress:
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

          <div className="mt-6 bg-emerald-900/30 p-6 rounded-lg border-l-4 border-emerald-400">
            <p className="text-emerald-200 font-semibold">
              Result: Went from 0 Copilot citations to 3-5 citations per week within 6 weeks of implementing checker recommendations.
            </p>
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
                    <span className="text-xs text-gray-400 whitespace-nowrap text-center">{win.time}</span>
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
            Stop guessing. Get instant answers: schema completeness, content structure quality, technical health, and authority signals. Free basic check shows top issues.
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
            <Link href="/copilot-seo-analysis-tool">
              <a className="bg-gray-900/60 p-4 rounded-lg border border-purple-500/30 hover:border-purple-500 transition-colors group">
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold group-hover:text-purple-400 transition-colors">Copilot SEO Analysis Tool</span>
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