import Layout from '../components/Layout'
import Link from 'next/link'
import { Bot, CheckCircle, Zap, ArrowRight, Search, Award, Star, TrendingUp, Users, Code, FileText, Shield, Target, AlertCircle, Lightbulb } from 'lucide-react'

export default function BestPerplexitySEOTrackingTools() {
  const topTools = [
    {
      rank: 1,
      name: "AISEOScan",
      rating: 5.0,
      type: "AI-Specific SEO Scanner",
      bestFor: "Tracking Perplexity-specific optimization (schema, content, authority)",
      pricing: "Free basic scan / $29 premium report",
      perplexitySpecific: true,
      whatItTracks: [
        "Schema markup completeness over time",
        "Content structure quality (headings, FAQs)",
        "Author attribution and credentials",
        "Technical AI SEO health (HTTPS, mobile, speed)",
        "Authority signals (about page, contact, legal)"
      ],
      pros: [
        "Built specifically for AI search optimization",
        "Tracks what Perplexity actually uses (schema, structure, authority)",
        "Shows before/after score comparisons",
        "Free basic tracking (run scan monthly, compare scores)",
        "Premium reports ($29) include detailed progress analysis"
      ],
      cons: [
        "Premium reports require payment for full tracking details",
        "No automated alerts (manual re-scan needed)"
      ],
      trackingFeatures: {
        automated: false,
        costPerMonth: "$0 (manual) or $29/month (monthly premium)",
        metrics: "30+ AI SEO factors",
        reporting: "PDF reports with score history",
        alerts: "Manual - run scans to check"
      },
      bestUseCase: "Best for: Anyone optimizing for Perplexity citations - tracks the factors that actually matter (schema completeness, content structure, authority signals)"
    },
    {
      rank: 2,
      name: "Ahrefs Site Audit",
      rating: 4.5,
      type: "General SEO Tracking",
      bestFor: "Traditional SEO health tracking with some AI-relevant metrics",
      pricing: "$99-999/month",
      perplexitySpecific: false,
      whatItTracks: [
        "Traditional SEO metrics (backlinks, keywords, rankings)",
        "Technical SEO issues",
        "Some schema validation",
        "Page speed",
        "Mobile optimization"
      ],
      pros: [
        "Comprehensive traditional SEO data",
        "Automated weekly/monthly scans",
        "Historical tracking and alerts",
        "Large data set for competitive analysis"
      ],
      cons: [
        "NOT built for AI search - misses Perplexity-specific factors",
        "Doesn't track FAQ sections, author attribution, or factual density",
        "Expensive ($99-999/month)",
        "Overwhelming data if you only care about AI SEO"
      ],
      trackingFeatures: {
        automated: true,
        costPerMonth: "$99-999",
        metrics: "Traditional SEO (backlinks, keywords, crawl errors)",
        reporting: "Web dashboard, email alerts",
        alerts: "Yes - automated"
      },
      bestUseCase: "Best for: Companies doing both traditional SEO AND AI SEO who need comprehensive tracking across both"
    },
    {
      rank: 3,
      name: "Moz Pro",
      rating: 4.0,
      type: "General SEO Tracking",
      bestFor: "Traditional SEO tracking with some technical checks",
      pricing: "$99-599/month",
      perplexitySpecific: false,
      whatItTracks: [
        "Domain authority tracking",
        "Keyword rankings",
        "Technical crawl issues",
        "Page optimization scores",
        "Backlink monitoring"
      ],
      pros: [
        "Good domain authority tracking (relevant for Perplexity)",
        "Automated weekly scans",
        "Clean, easy-to-use interface"
      ],
      cons: [
        "NOT designed for AI search optimization",
        "Misses AI-specific factors (schema completeness, FAQ structure, author signals)",
        "Expensive for limited AI SEO value",
        "Domain authority is just one small factor for Perplexity"
      ],
      trackingFeatures: {
        automated: true,
        costPerMonth: "$99-599",
        metrics: "Domain authority, keywords, technical crawl",
        reporting: "Web dashboard",
        alerts: "Yes - weekly email"
      },
      bestUseCase: "Best for: Agencies tracking domain authority as one input, but need to supplement with AI-specific tools"
    },
    {
      rank: 4,
      name: "SEMrush Site Audit",
      rating: 4.0,
      type: "General SEO Tracking",
      bestFor: "Enterprise SEO tracking with some technical overlap",
      pricing: "$119-449/month",
      perplexitySpecific: false,
      whatItTracks: [
        "Traditional SEO metrics",
        "Technical site health",
        "Some schema checking",
        "Page speed monitoring",
        "Competitive analysis"
      ],
      pros: [
        "Comprehensive SEO platform",
        "Automated tracking and alerts",
        "Good technical SEO coverage"
      ],
      cons: [
        "NOT focused on AI search optimization",
        "Misses Perplexity-specific content factors (FAQ sections, factual density, author attribution)",
        "Very expensive for AI SEO alone",
        "Complex - steep learning curve"
      ],
      trackingFeatures: {
        automated: true,
        costPerMonth: "$119-449",
        metrics: "Traditional SEO, technical health",
        reporting: "Web dashboard, PDF exports",
        alerts: "Yes - customizable"
      },
      bestUseCase: "Best for: Large enterprises with SEO teams doing comprehensive tracking, supplement with AI-specific tools"
    },
    {
      rank: 5,
      name: "Manual Tracking (Spreadsheet)",
      rating: 3.0,
      type: "DIY Tracking",
      bestFor: "Budget-conscious tracking with full control",
      pricing: "Free (time investment)",
      perplexitySpecific: "You control what to track",
      whatItTracks: [
        "Whatever you manually check (schema presence, heading structure, etc.)",
        "Requires running free AISEOScan scans and recording scores",
        "Can track any custom metrics you care about"
      ],
      pros: [
        "Free",
        "Complete control over what to track",
        "Can combine data from multiple sources"
      ],
      cons: [
        "Very time-consuming (2-3 hours per month)",
        "Easy to miss issues or track inconsistently",
        "No automated alerts",
        "Requires discipline to maintain"
      ],
      trackingFeatures: {
        automated: false,
        costPerMonth: "$0 (time cost only)",
        metrics: "Whatever you manually track",
        reporting: "DIY spreadsheet",
        alerts: "None - manual review"
      },
      bestUseCase: "Best for: Small sites, hobby projects, or learning how AI SEO works - run free AISEOScan monthly, record scores in spreadsheet"
    }
  ]

  const comparisonMatrix = [
    {
      feature: "Perplexity-Specific",
      aiseoscan: "✓ Yes",
      ahrefs: "✗ No",
      moz: "✗ No",
      semrush: "✗ No",
      manual: "✓ You control"
    },
    {
      feature: "Schema Completeness Tracking",
      aiseoscan: "✓ Yes (Article, FAQ, Org, Person)",
      ahrefs: "Partial (basic validation only)",
      moz: "✗ No",
      semrush: "Partial (basic validation only)",
      manual: "✓ If you track it"
    },
    {
      feature: "Content Structure Analysis",
      aiseoscan: "✓ Yes (headings, FAQs, depth)",
      ahrefs: "✗ No",
      moz: "✗ No",
      semrush: "✗ No",
      manual: "✓ If you track it"
    },
    {
      feature: "Author Attribution Tracking",
      aiseoscan: "✓ Yes",
      ahrefs: "✗ No",
      moz: "✗ No",
      semrush: "✗ No",
      manual: "✓ If you track it"
    },
    {
      feature: "Automated Tracking",
      aiseoscan: "Manual re-scan",
      ahrefs: "✓ Yes",
      moz: "✓ Yes",
      semrush: "✓ Yes",
      manual: "✗ No"
    },
    {
      feature: "Monthly Cost",
      aiseoscan: "$0 basic / $29 premium",
      ahrefs: "$99-999",
      moz: "$99-599",
      semrush: "$119-449",
      manual: "$0"
    },
    {
      feature: "Setup Time",
      aiseoscan: "0 min (instant)",
      ahrefs: "30-60 min",
      moz: "30-60 min",
      semrush: "30-60 min",
      manual: "Varies"
    }
  ]

  const keyFeatures = [
    {
      feature: "AI-Specific Metrics",
      importance: "Critical",
      why: "Traditional SEO tools track Google factors. For Perplexity, you need schema completeness, FAQ sections, author attribution, and factual density tracking.",
      checkFor: "Does it track Article schema completeness? FAQ section presence? Author credentials?"
    },
    {
      feature: "Score History / Trends",
      importance: "High",
      why: "Tracking is useless without historical data. You need to see 'Score went from 45 → 62 → 78' over time.",
      checkFor: "Can you compare this month's score to last month? Does it show progress graphs?"
    },
    {
      feature: "Before/After Comparisons",
      importance: "High",
      why: "After implementing fixes, you need to prove they worked. 'Added schema → score increased 12 points.'",
      checkFor: "Can you see what changed between scans? Does it highlight improvements?"
    },
    {
      feature: "Automated Alerts",
      importance: "Medium",
      why: "Nice to have but not critical. Alerts catch regressions (e.g., schema removed during site update).",
      checkFor: "Does it email you when score drops? Can you set up custom alerts?"
    },
    {
      feature: "Affordable Pricing",
      importance: "High",
      why: "If tracking costs $99-999/month but doesn't track AI-specific factors, you're wasting money.",
      checkFor: "Is there a free tier? What's the monthly cost for features you actually need?"
    },
    {
      feature: "Easy to Understand Reports",
      importance: "Medium",
      why: "Complex dashboards slow you down. You need: 'Score this month: 78. Last month: 65. +13 points.'",
      checkFor: "Can non-technical people understand the reports? Is the data actionable?"
    }
  ]

  const selectionGuide = [
    {
      scenario: "I only care about Perplexity optimization",
      recommendation: "AISEOScan",
      reasoning: "Only tool built specifically for AI search. Tracks schema completeness, content structure, and authority signals that Perplexity uses. Free basic tracking, $29/month for detailed reports."
    },
    {
      scenario: "I need to track both Google SEO AND Perplexity",
      recommendation: "Ahrefs/SEMrush + AISEOScan",
      reasoning: "Use Ahrefs for traditional metrics (backlinks, keywords), supplement with AISEOScan for AI-specific factors (schema, FAQs, author attribution)."
    },
    {
      scenario: "I have a small budget (<$50/month)",
      recommendation: "AISEOScan premium ($29/month)",
      reasoning: "Best value for Perplexity optimization. Monthly premium reports track all AI-specific factors. Save $70-970/month vs traditional tools."
    },
    {
      scenario: "I want automated alerts for regressions",
      recommendation: "Ahrefs/Moz/SEMrush (but supplement with AISEOScan)",
      reasoning: "Traditional tools have automated alerts, but they miss AI-specific issues. Use both for complete coverage."
    },
    {
      scenario: "Just learning / hobby project",
      recommendation: "Manual tracking with AISEOScan free scans",
      reasoning: "Run free AISEOScan monthly, record scores in spreadsheet. Zero cost, full control."
    },
    {
      scenario: "Agency tracking 10+ clients",
      recommendation: "AISEOScan premium for each client",
      reasoning: "10 clients × $29 = $290/month. Cheaper than enterprise SEO tools, provides exactly what clients need for AI citations."
    }
  ]

  const commonMistakes = [
    {
      mistake: "Using Only Traditional SEO Tools",
      problem: "Ahrefs/Moz/SEMrush track Google metrics (backlinks, keyword rankings, PageRank). They miss Perplexity-specific factors like schema completeness, FAQ structure, author attribution, and factual density.",
      solution: "Either use AI-specific tools (AISEOScan), or supplement traditional tools with manual AI SEO checks.",
      realExample: "Company spent $500/month on SEMrush, saw great Google rankings but zero Perplexity citations. Why? Missing schema markup and FAQ sections - which SEMrush doesn't track."
    },
    {
      mistake: "Not Tracking Schema Completeness",
      problem: "Having 'some schema' isn't enough. Article schema needs headline, author, datePublished, publisher. Most tools just check 'schema exists' but not completeness.",
      solution: "Track schema completeness percentage. AISEOScan shows 'Article schema 60% complete - missing author and publisher fields.'",
      realExample: "Site had Article schema but missing author field. Perplexity ignored content. After adding author → citations increased 4x."
    },
    {
      mistake: "Tracking Too Infrequently",
      problem: "Checking once every 3-6 months misses issues that hurt citations for months before being caught.",
      solution: "Track monthly during active optimization (first 3 months), then quarterly for maintenance. Immediate re-scan after major site changes.",
      realExample: "Site redesign broke schema markup. Took 4 months to notice because they only tracked quarterly. Lost 4 months of potential citations."
    },
    {
      mistake: "No Baseline Documentation",
      problem: "Can't prove ROI without knowing starting point. 'We're at 78 now' is meaningless without 'we started at 45.'",
      solution: "Document initial state before any optimization. Screenshot scores, export first report, record all baseline metrics.",
      realExample: "Agency improved client score from 42 → 85. Client asked for proof. No baseline screenshot = couldn't prove ROI."
    }
  ]

  return (
    <Layout 
      title="Best Perplexity SEO Tracking Tools (2026 Comparison)"
      description="Compare the best Perplexity SEO tracking tools. Rankings, features, pricing for AISEOScan, Ahrefs, Moz, SEMrush, and manual tracking approaches."
    >
      <div className="max-w-6xl mx-auto py-12">
        {/* Hero */}
        <div className="mb-16">
          <div className="inline-block bg-blue-900/30 px-4 py-2 rounded-full mb-6">
            <span className="text-blue-200 text-sm font-semibold">460 monthly searches</span>
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
            Best Perplexity SEO Tracking Tools
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-4xl leading-relaxed">
            Compare the best tools for tracking Perplexity SEO progress. Ranked comparison of AISEOScan, Ahrefs, Moz, SEMrush, and manual tracking - what they track, pricing, pros/cons, and which is best for your use case.
          </p>
          
          <Link href="https://www.aiseoscan.dev">
            <a className="inline-flex items-center bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105">
              <Award className="h-5 w-5 mr-2" />
              Try #1 Ranked Tool Free
            </a>
          </Link>
        </div>

        {/* Top 5 Tools */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">
            Top 5 Perplexity SEO Tracking Tools (Ranked)
          </h2>

          <div className="space-y-8">
            {topTools.map((tool, index) => (
              <div key={index} className={`p-8 rounded-xl border-2 ${
                tool.rank === 1
                  ? 'bg-gradient-to-r from-emerald-900/40 to-emerald-800/20 border-emerald-500'
                  : 'bg-gradient-to-r from-gray-900/60 to-gray-800/20 border-gray-700'
              }`}>
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start">
                    <div className={`font-bold text-4xl mr-4 ${
                      tool.rank === 1 ? 'text-emerald-400' : 'text-gray-500'
                    }`}>
                      #{tool.rank}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-white">{tool.name}</h3>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-5 w-5 ${
                              i < Math.floor(tool.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
                            }`} />
                          ))}
                          <span className="text-gray-400 text-sm ml-2">{tool.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm mb-3">
                        <span className="text-gray-400">{tool.type}</span>
                        <span className="text-gray-600">•</span>
                        <span className="text-blue-400 font-semibold">{tool.pricing}</span>
                      </div>
                      {tool.perplexitySpecific && (
                        <div className="inline-block bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-4">
                          ⭐ Perplexity-Specific
                        </div>
                      )}
                      <p className="text-gray-300 mb-4">
                        <strong className="text-white">Best for:</strong> {tool.bestFor}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-purple-300 font-semibold mb-3">What It Tracks:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {tool.whatItTracks.map((item, i) => (
                      <li key={i} className="text-gray-300 text-sm flex items-start">
                        <CheckCircle className="h-4 w-4 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-emerald-300 font-semibold mb-3">✅ Pros:</h4>
                    <ul className="space-y-2">
                      {tool.pros.map((pro, i) => (
                        <li key={i} className="text-gray-300 text-sm flex items-start">
                          <CheckCircle className="h-4 w-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-rose-300 font-semibold mb-3">❌ Cons:</h4>
                    <ul className="space-y-1">
                      {tool.cons.map((con, i) => (
                        <li key={i} className="text-gray-400 text-sm">• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-gray-900/50 p-4 rounded-lg mb-4">
                  <div>
                    <div className="text-gray-500 text-xs uppercase mb-1">Automated</div>
                    <div className="text-white text-sm font-semibold">
                      {tool.trackingFeatures.automated ? 'Yes' : 'Manual'}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs uppercase mb-1">Cost/Month</div>
                    <div className="text-blue-400 text-sm font-semibold">{tool.trackingFeatures.costPerMonth}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs uppercase mb-1">Metrics</div>
                    <div className="text-white text-sm">{tool.trackingFeatures.metrics}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs uppercase mb-1">Reporting</div>
                    <div className="text-white text-sm">{tool.trackingFeatures.reporting}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs uppercase mb-1">Alerts</div>
                    <div className="text-white text-sm">{tool.trackingFeatures.alerts}</div>
                  </div>
                </div>

                <div className="bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
                  <p className="text-blue-200 text-sm">
                    <strong>{tool.bestUseCase}</strong>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Matrix */}
        <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">
            Side-by-Side Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-purple-500/50">
                  <th className="text-left p-4 text-purple-300 font-semibold">Feature</th>
                  <th className="text-left p-4 text-emerald-300 font-semibold">AISEOScan</th>
                  <th className="text-left p-4 text-gray-400 font-semibold">Ahrefs</th>
                  <th className="text-left p-4 text-gray-400 font-semibold">Moz</th>
                  <th className="text-left p-4 text-gray-400 font-semibold">SEMrush</th>
                  <th className="text-left p-4 text-gray-400 font-semibold">Manual</th>
                </tr>
              </thead>
              <tbody>
                {comparisonMatrix.map((row, index) => (
                  <tr key={index} className="border-b border-gray-700/50">
                    <td className="p-4 text-white font-medium">{row.feature}</td>
                    <td className="p-4 text-emerald-300 text-sm font-semibold">{row.aiseoscan}</td>
                    <td className="p-4 text-gray-400 text-sm">{row.ahrefs}</td>
                    <td className="p-4 text-gray-400 text-sm">{row.moz}</td>
                    <td className="p-4 text-gray-400 text-sm">{row.semrush}</td>
                    <td className="p-4 text-gray-400 text-sm">{row.manual}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Features */}
        <div className="bg-gradient-to-r from-gray-900/60 to-emerald-900/20 backdrop-blur-sm p-8 rounded-xl border border-emerald-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Target className="h-8 w-8 text-emerald-400 mr-3" />
            6 Key Features to Look For
          </h2>

          <div className="space-y-6">
            {keyFeatures.map((feature, index) => (
              <div key={index} className="bg-emerald-900/20 p-6 rounded-xl border border-emerald-500/50">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white">{feature.feature}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ml-3 ${
                    feature.importance === 'Critical' ? 'bg-rose-500 text-white' :
                    feature.importance === 'High' ? 'bg-orange-500 text-white' :
                    'bg-blue-500 text-white'
                  }`}>
                    {feature.importance}
                  </span>
                </div>
                <div className="mb-3">
                  <span className="text-emerald-300 font-semibold text-sm">Why: </span>
                  <p className="text-gray-300 text-sm inline">{feature.why}</p>
                </div>
                <div className="bg-emerald-900/30 p-4 rounded border border-emerald-500/50">
                  <span className="text-emerald-300 font-semibold text-sm">Check for: </span>
                  <p className="text-emerald-200 text-sm inline">{feature.checkFor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selection Guide */}
        <div className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Lightbulb className="h-8 w-8 text-blue-400 mr-3" />
            Which Tool Should You Choose?
          </h2>

          <div className="space-y-4">
            {selectionGuide.map((guide, index) => (
              <div key={index} className="bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-400">
                <h3 className="text-lg font-bold text-white mb-3">
                  If: "{guide.scenario}"
                </h3>
                <div className="mb-3">
                  <span className="text-blue-300 font-semibold">→ Choose: </span>
                  <span className="text-white font-bold">{guide.recommendation}</span>
                </div>
                <div className="bg-blue-900/30 p-3 rounded">
                  <span className="text-blue-200 text-sm">
                    <strong>Why:</strong> {guide.reasoning}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="bg-gradient-to-r from-gray-900/60 to-rose-900/20 backdrop-blur-sm p-8 rounded-xl border border-rose-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <AlertCircle className="h-8 w-8 text-rose-400 mr-3" />
            4 Common Tool Selection Mistakes
          </h2>

          <div className="space-y-6">
            {commonMistakes.map((mistake, index) => (
              <div key={index} className="bg-rose-900/20 p-6 rounded-xl border-l-4 border-rose-400">
                <h3 className="text-xl font-bold text-rose-300 mb-3">❌ {mistake.mistake}</h3>
                <p className="text-gray-300 mb-3">
                  <strong className="text-white">Problem:</strong> {mistake.problem}
                </p>
                <p className="text-gray-300 mb-4">
                  <strong className="text-emerald-300">Solution:</strong> {mistake.solution}
                </p>
                <div className="bg-blue-900/30 p-4 rounded border border-blue-500/50">
                  <p className="text-blue-200 text-sm">
                    <strong>Real example:</strong> {mistake.realExample}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-900/40 via-emerald-900/40 to-blue-900/40 backdrop-blur-sm p-12 rounded-xl border border-blue-500/50 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Try the #1 Ranked Tool Free
          </h2>
          <p className="text-gray-200 text-xl mb-8 max-w-2xl mx-auto">
            AISEOScan tracks what actually matters for Perplexity: schema completeness, content structure, and authority signals. Free basic tracking, $29/month for detailed reports.
          </p>
          
          <Link href="https://www.aiseoscan.dev">
            <a className="inline-flex items-center bg-gradient-to-r from-blue-500 to-emerald-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:from-blue-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105">
              <Award className="h-6 w-6 mr-2" />
              Start Tracking Free
            </a>
          </Link>

          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-300">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              #1 for Perplexity SEO
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              Free basic tracking
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              $29/month premium
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