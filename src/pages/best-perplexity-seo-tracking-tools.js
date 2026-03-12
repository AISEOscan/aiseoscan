import Layout from '../components/Layout'
import Link from 'next/link'
import { Bot, CheckCircle, Zap, ArrowRight, Award, Star, TrendingUp, DollarSign, Users, Gauge, Shield, Target } from 'lucide-react'

export default function BestPerplexitySEOTrackingTools() {
  const toolRankings = [
    {
      rank: 1,
      name: "AISEOScan",
      rating: 4.8,
      price: "$29/report",
      bestFor: "Agencies and businesses needing Perplexity-specific tracking",
      pros: [
        "Only tool built specifically for Perplexity tracking",
        "Automated citation rate monitoring",
        "Domain authority trend tracking",
        "Competitor benchmarking included",
        "White-label reports for agencies",
        "API access for custom integrations"
      ],
      cons: [
        "Newer tool (launched 2024)",
        "Premium reports require payment"
      ],
      features: {
        citationTracking: true,
        domainAuthority: true,
        competitorAnalysis: true,
        automation: true,
        apiAccess: true,
        historicalData: true,
        alerts: true,
        whiteLabel: true
      },
      verdict: "Best overall Perplexity tracking tool. Purpose-built for AI search, affordable, and comprehensive.",
      link: "https://www.aiseoscan.dev"
    },
    {
      rank: 2,
      name: "Ahrefs",
      rating: 4.5,
      price: "$99-999/mo",
      bestFor: "Large enterprises doing comprehensive SEO + AI tracking",
      pros: [
        "Industry-standard domain authority (DR)",
        "Massive backlink database",
        "Excellent keyword research",
        "Historical data going back years",
        "Strong technical SEO tools"
      ],
      cons: [
        "Not Perplexity-specific (generic SEO)",
        "Expensive monthly subscriptions",
        "No citation rate tracking",
        "Doesn't track AI search performance",
        "Overkill if you only care about Perplexity"
      ],
      features: {
        citationTracking: false,
        domainAuthority: true,
        competitorAnalysis: true,
        automation: true,
        apiAccess: true,
        historicalData: true,
        alerts: true,
        whiteLabel: false
      },
      verdict: "Excellent for traditional SEO + authority tracking, but lacks Perplexity-specific metrics.",
      link: null
    },
    {
      rank: 3,
      name: "Moz Pro",
      rating: 4.3,
      price: "$99-599/mo",
      bestFor: "Mid-market SEO teams with budget",
      pros: [
        "Domain Authority (DA) metric widely recognized",
        "Good rank tracking features",
        "Clean interface",
        "Solid keyword research"
      ],
      cons: [
        "Not designed for AI search",
        "Smaller backlink database than Ahrefs",
        "No Perplexity citation tracking",
        "Expensive for what you get",
        "Limited automation options"
      ],
      features: {
        citationTracking: false,
        domainAuthority: true,
        competitorAnalysis: true,
        automation: "Limited",
        apiAccess: true,
        historicalData: true,
        alerts: "Limited",
        whiteLabel: false
      },
      verdict: "Good for DA tracking but doesn't address Perplexity-specific needs.",
      link: null
    },
    {
      rank: 4,
      name: "SEMrush",
      rating: 4.4,
      price: "$119-449/mo",
      bestFor: "All-in-one SEO + content marketing",
      pros: [
        "Comprehensive feature set",
        "Good content marketing tools",
        "Position tracking",
        "Competitive analysis features"
      ],
      cons: [
        "Not AI-search focused",
        "Complex interface (steep learning curve)",
        "No citation rate tracking",
        "Expensive subscriptions",
        "Feature bloat for simple tracking needs"
      ],
      features: {
        citationTracking: false,
        domainAuthority: "Authority Score",
        competitorAnalysis: true,
        automation: true,
        apiAccess: true,
        historicalData: true,
        alerts: true,
        whiteLabel: true
      },
      verdict: "Powerful all-in-one tool but overkill if you only need Perplexity tracking.",
      link: null
    },
    {
      rank: 5,
      name: "Manual Tracking (Spreadsheet)",
      rating: 3.0,
      price: "Free",
      bestFor: "Solo bloggers with 1-2 queries to track",
      pros: [
        "Completely free",
        "Full control over tracking",
        "No learning curve",
        "Works offline"
      ],
      cons: [
        "Extremely time-consuming (2+ hours/week)",
        "Prone to errors",
        "Can't scale beyond 5 queries",
        "No automation or alerts",
        "No historical trend analysis",
        "Easy to skip or forget"
      ],
      features: {
        citationTracking: "Manual",
        domainAuthority: "External check required",
        competitorAnalysis: "Manual",
        automation: false,
        apiAccess: false,
        historicalData: "If you track it",
        alerts: false,
        whiteLabel: false
      },
      verdict: "Only viable if you have more time than budget. Not scalable.",
      link: null
    }
  ]

  const comparisonMatrix = [
    {
      feature: "Perplexity Citation Tracking",
      aiseoscan: "✓ Native",
      ahrefs: "✗",
      moz: "✗",
      semrush: "✗",
      manual: "Manual"
    },
    {
      feature: "Domain Authority Monitoring",
      aiseoscan: "✓ DR/DA",
      ahrefs: "✓ DR",
      moz: "✓ DA",
      semrush: "✓ AS",
      manual: "External"
    },
    {
      feature: "Automated Tracking",
      aiseoscan: "✓ Daily/Weekly",
      ahrefs: "✓",
      moz: "✓",
      semrush: "✓",
      manual: "✗"
    },
    {
      feature: "Competitor Benchmarking",
      aiseoscan: "✓",
      ahrefs: "✓",
      moz: "✓",
      semrush: "✓",
      manual: "Manual"
    },
    {
      feature: "Historical Trends",
      aiseoscan: "✓",
      ahrefs: "✓",
      moz: "✓",
      semrush: "✓",
      manual: "If tracked"
    },
    {
      feature: "AI Search Specific",
      aiseoscan: "✓",
      ahrefs: "✗",
      moz: "✗",
      semrush: "✗",
      manual: "✗"
    },
    {
      feature: "Price (Monthly)",
      aiseoscan: "$29/report",
      ahrefs: "$99-999",
      moz: "$99-599",
      semrush: "$119-449",
      manual: "Free"
    }
  ]

  const selectionCriteria = [
    {
      criteria: "Your Primary Goal",
      ifThis: "Track Perplexity citations specifically",
      thenThis: "AISEOScan",
      why: "Only tool that tracks citation rates, query coverage, and Perplexity-specific metrics"
    },
    {
      criteria: "Your Budget",
      ifThis: "Under $50/month",
      thenThis: "AISEOScan",
      why: "Pay-per-report model ($29) is most affordable for small teams"
    },
    {
      criteria: "Your Budget",
      ifThis: "Over $500/month",
      thenThis: "Ahrefs or SEMrush",
      why: "Get comprehensive traditional SEO + basic authority tracking"
    },
    {
      criteria: "Team Size",
      ifThis: "Solo or small team (1-3 people)",
      thenThis: "AISEOScan",
      why: "Simple interface, no training needed, pay only for what you use"
    },
    {
      criteria: "Team Size",
      ifThis: "Large agency (10+ people)",
      thenThis: "AISEOScan + Ahrefs",
      why: "Use both: AISEOScan for AI tracking, Ahrefs for traditional SEO"
    },
    {
      criteria: "Technical Skill",
      ifThis: "Non-technical marketer",
      thenThis: "AISEOScan",
      why: "Enter URL, get report. No setup or configuration needed."
    },
    {
      criteria: "Technical Skill",
      ifThis: "Technical team with API needs",
      thenThis: "AISEOScan API",
      why: "RESTful API for custom integrations and automation"
    },
    {
      criteria: "Tracking Volume",
      ifThis: "1-10 sites/queries",
      thenThis: "AISEOScan",
      why: "Pay per report is cost-effective at low volume"
    },
    {
      criteria: "Tracking Volume",
      ifThis: "50+ sites daily",
      thenThis: "Custom solution + AISEOScan API",
      why: "High-volume needs justify custom automation via API"
    }
  ]

  const keyFeatures = [
    {
      feature: "Citation Rate Tracking",
      importance: "Critical",
      description: "Measures how often Perplexity cites your site for target queries",
      whoHasIt: "Only AISEOScan"
    },
    {
      feature: "Domain Authority Monitoring",
      importance: "Critical",
      description: "Tracks DR/DA over time (Perplexity's #1 ranking factor)",
      whoHasIt: "AISEOScan, Ahrefs, Moz, SEMrush"
    },
    {
      feature: "Automated Alerts",
      importance: "High",
      description: "Get notified when citations drop or authority changes",
      whoHasIt: "AISEOScan, Ahrefs, Moz, SEMrush"
    },
    {
      feature: "Competitor Benchmarking",
      importance: "High",
      description: "Compare your performance vs competitors getting cited",
      whoHasIt: "AISEOScan, Ahrefs, Moz, SEMrush"
    },
    {
      feature: "Historical Trends",
      importance: "Medium-High",
      description: "View performance over weeks/months to spot patterns",
      whoHasIt: "AISEOScan, Ahrefs, Moz, SEMrush"
    },
    {
      feature: "API Access",
      importance: "Medium",
      description: "Integrate tracking data into your own dashboards",
      whoHasIt: "AISEOScan, Ahrefs, Moz, SEMrush"
    }
  ]

  const mistakes = [
    {
      mistake: "Choosing Traditional SEO Tools for AI Tracking",
      problem: "Tools like Ahrefs/Moz were built for Google SEO, not Perplexity. They track the wrong metrics (keyword rankings, SERP positions) instead of AI-specific factors (citation rates, query coverage).",
      solution: "Use Perplexity-specific tools like AISEOScan for AI tracking. Use traditional tools for traditional SEO. Don't confuse the two."
    },
    {
      mistake: "Going with the Most Expensive Option",
      problem: "More expensive ≠ better for Perplexity. A $499/mo SEMrush subscription doesn't track citations. A $29 AISEOScan report does.",
      solution: "Match the tool to your needs. If you only need Perplexity tracking, paying for enterprise SEO features is wasteful."
    },
    {
      mistake: "Only Tracking Domain Authority",
      problem: "High DA doesn't guarantee Perplexity citations. You need to track actual citation rates, not just authority scores.",
      solution: "Track both: authority (via any tool) AND citation rate (via Perplexity-specific tools)."
    },
    {
      mistake: "Trying to Track Everything Manually",
      problem: "Manual tracking doesn't scale. You'll skip it when busy, make errors, and miss important trends.",
      solution: "Automate the boring stuff. Even a $29/month tool saves 2+ hours weekly of manual checking."
    }
  ]

  return (
    <Layout 
      title="Best Perplexity SEO Tracking Tools: Top 5 Tools Compared (2026)"
      description="Compare the best Perplexity SEO tracking tools. Expert rankings, pricing, features, and recommendations for agencies, businesses, and solo marketers."
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
            Expert comparison of the top 5 Perplexity SEO tracking tools. See which tools actually track AI search citations, what they cost, and which one is right for your team size and budget.
          </p>
          
          <Link href="https://www.aiseoscan.dev">
            <a className="inline-flex items-center bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105">
              <Award className="h-5 w-5 mr-2" />
              Try #1 Rated Tool Free
            </a>
          </Link>
        </div>

        {/* Quick Summary */}
        <div className="bg-gradient-to-r from-emerald-900/40 to-emerald-800/20 border-2 border-emerald-500 p-8 rounded-xl mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">🏆 Quick Verdict</h2>
          <div className="space-y-3 text-gray-200">
            <p>
              <strong className="text-emerald-300">Best Overall:</strong> AISEOScan - Only tool built specifically for Perplexity tracking. $29/report.
            </p>
            <p>
              <strong className="text-emerald-300">Best for Enterprises:</strong> AISEOScan + Ahrefs - Cover both AI search and traditional SEO.
            </p>
            <p>
              <strong className="text-emerald-300">Best Free Option:</strong> None exist that actually track Perplexity. Manual tracking possible but not scalable.
            </p>
            <p>
              <strong className="text-emerald-300">Not Recommended:</strong> Using traditional SEO tools (Moz, SEMrush) alone - they don't track AI citations.
            </p>
          </div>
        </div>

        {/* Tool Rankings */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <Award className="h-8 w-8 text-blue-400 mr-3" />
            Top 5 Perplexity SEO Tracking Tools (Ranked)
          </h2>

          <div className="space-y-8">
            {toolRankings.map((tool, index) => (
              <div key={index} className={`p-8 rounded-xl border-2 ${
                tool.rank === 1 
                  ? 'bg-gradient-to-r from-emerald-900/40 to-emerald-800/20 border-emerald-500' 
                  : 'bg-gradient-to-r from-gray-900/60 to-blue-900/20 border-blue-500/50'
              }`}>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <div className="flex items-start mb-4 md:mb-0">
                    <div className={`text-4xl font-bold mr-4 ${
                      tool.rank === 1 ? 'text-emerald-400' : 'text-blue-400'
                    }`}>
                      #{tool.rank}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-2">{tool.name}</h3>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-5 w-5 ${
                                i < Math.floor(tool.rating) 
                                  ? 'text-yellow-400 fill-yellow-400' 
                                  : 'text-gray-600'
                              }`} 
                            />
                          ))}
                          <span className="ml-2 text-white font-semibold">{tool.rating}</span>
                        </div>
                        <span className="text-gray-500">•</span>
                        <span className="text-2xl font-bold text-blue-400">{tool.price}</span>
                      </div>
                      <p className="text-gray-400 text-sm">{tool.bestFor}</p>
                    </div>
                  </div>
                  {tool.rank === 1 && (
                    <div className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap">
                      ⭐ Best Overall
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                    <ul className="space-y-2">
                      {tool.cons.map((con, cIndex) => (
                        <li key={cIndex} className="text-gray-400 text-sm">• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">Key Features:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className={`text-center p-3 rounded ${
                      tool.features.citationTracking === true ? 'bg-emerald-900/30' : 
                      tool.features.citationTracking === false ? 'bg-gray-900/30' : 'bg-yellow-900/30'
                    }`}>
                      <div className="text-xs text-gray-400 mb-1">Citation Tracking</div>
                      <div className="text-sm font-semibold text-white">
                        {tool.features.citationTracking === true ? '✓' : 
                         tool.features.citationTracking === false ? '✗' : tool.features.citationTracking}
                      </div>
                    </div>
                    <div className={`text-center p-3 rounded ${
                      tool.features.domainAuthority === true ? 'bg-emerald-900/30' : 'bg-yellow-900/30'
                    }`}>
                      <div className="text-xs text-gray-400 mb-1">Domain Authority</div>
                      <div className="text-sm font-semibold text-white">
                        {tool.features.domainAuthority === true ? '✓' : tool.features.domainAuthority}
                      </div>
                    </div>
                    <div className={`text-center p-3 rounded ${
                      tool.features.automation === true ? 'bg-emerald-900/30' : 
                      tool.features.automation === false ? 'bg-gray-900/30' : 'bg-yellow-900/30'
                    }`}>
                      <div className="text-xs text-gray-400 mb-1">Automation</div>
                      <div className="text-sm font-semibold text-white">
                        {tool.features.automation === true ? '✓' : 
                         tool.features.automation === false ? '✗' : tool.features.automation}
                      </div>
                    </div>
                    <div className={`text-center p-3 rounded ${
                      tool.features.whiteLabel === true ? 'bg-emerald-900/30' : 'bg-gray-900/30'
                    }`}>
                      <div className="text-xs text-gray-400 mb-1">White-Label</div>
                      <div className="text-sm font-semibold text-white">
                        {tool.features.whiteLabel === true ? '✓' : '✗'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-lg border-l-4 mb-6 ${
                  tool.rank === 1 
                    ? 'bg-emerald-900/20 border-emerald-400' 
                    : 'bg-blue-900/20 border-blue-400'
                }`}>
                  <span className="text-white font-semibold">Verdict: </span>
                  <span className="text-gray-300">{tool.verdict}</span>
                </div>

                {tool.link && (
                  <Link href={tool.link}>
                    <a className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-lg font-bold hover:from-emerald-600 hover:to-emerald-700 transition-all">
                      Try {tool.name}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </a>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Matrix */}
        <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <Target className="h-8 w-8 text-purple-400 mr-3" />
            Side-by-Side Feature Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-purple-500/50">
                  <th className="text-left p-4 text-purple-300 font-semibold">Feature</th>
                  <th className="text-center p-4 text-emerald-300 font-semibold">AISEOScan</th>
                  <th className="text-center p-4 text-gray-400 font-semibold">Ahrefs</th>
                  <th className="text-center p-4 text-gray-400 font-semibold">Moz</th>
                  <th className="text-center p-4 text-gray-400 font-semibold">SEMrush</th>
                  <th className="text-center p-4 text-gray-400 font-semibold">Manual</th>
                </tr>
              </thead>
              <tbody>
                {comparisonMatrix.map((row, index) => (
                  <tr key={index} className="border-b border-gray-700/50">
                    <td className="p-4 text-white font-medium">{row.feature}</td>
                    <td className="p-4 text-center text-emerald-400 font-semibold">{row.aiseoscan}</td>
                    <td className="p-4 text-center text-gray-400">{row.ahrefs}</td>
                    <td className="p-4 text-center text-gray-400">{row.moz}</td>
                    <td className="p-4 text-center text-gray-400">{row.semrush}</td>
                    <td className="p-4 text-center text-gray-400">{row.manual}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selection Guide */}
        <div className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Gauge className="h-8 w-8 text-blue-400 mr-3" />
            Which Tool Should You Choose?
          </h2>

          <p className="text-gray-300 mb-6">
            Use this decision matrix to find the right Perplexity tracking tool for your situation:
          </p>

          <div className="space-y-4">
            {selectionCriteria.map((item, index) => (
              <div key={index} className="bg-blue-900/20 p-5 rounded-lg border border-blue-500/50">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <h4 className="text-blue-300 font-semibold text-sm mb-1">{item.criteria}</h4>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">If: </span>
                    <span className="text-white text-sm font-medium">{item.ifThis}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Then: </span>
                    <span className="text-emerald-400 text-sm font-bold">{item.thenThis}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">{item.why}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features Breakdown */}
        <div className="bg-gradient-to-r from-gray-900/60 to-emerald-900/20 backdrop-blur-sm p-8 rounded-xl border border-emerald-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Shield className="h-8 w-8 text-emerald-400 mr-3" />
            Key Features to Look For
          </h2>

          <div className="space-y-4">
            {keyFeatures.map((item, index) => (
              <div key={index} className="bg-emerald-900/20 p-5 rounded-lg border border-emerald-500/50">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-white">{item.feature}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ml-3 ${
                    item.importance === 'Critical' ? 'bg-rose-500 text-white' :
                    item.importance === 'High' ? 'bg-orange-500 text-white' :
                    'bg-blue-500 text-white'
                  }`}>
                    {item.importance}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-2">{item.description}</p>
                <div className="bg-emerald-900/30 p-3 rounded">
                  <span className="text-emerald-300 font-semibold text-sm">Available in: </span>
                  <span className="text-gray-300 text-sm">{item.whoHasIt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="bg-gradient-to-r from-gray-900/60 to-rose-900/20 backdrop-blur-sm p-8 rounded-xl border border-rose-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">
            4 Mistakes When Choosing Perplexity Tracking Tools
          </h2>

          <div className="space-y-6">
            {mistakes.map((item, index) => (
              <div key={index} className="bg-rose-900/20 p-6 rounded-lg border-l-4 border-rose-400">
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

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-900/40 via-cyan-900/40 to-emerald-900/40 backdrop-blur-sm p-12 rounded-xl border border-emerald-500/50 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Start with the #1 Rated Tool
          </h2>
          <p className="text-gray-200 text-xl mb-8 max-w-2xl mx-auto">
            AISEOScan is the only tool built specifically for Perplexity SEO tracking. Try it free and see why agencies and businesses choose it over expensive alternatives.
          </p>
          
          <Link href="https://www.aiseoscan.dev">
            <a className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105">
              <Award className="h-6 w-6 mr-2" />
              Try AISEOScan Free
            </a>
          </Link>

          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-300">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              $29 premium reports
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              Citation tracking included
            </div>
          </div>
        </div>

        {/* Related Tools */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-6">Related Perplexity Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/perplexity-seo-checking-tools">
              <a className="bg-gray-900/60 p-4 rounded-lg border border-blue-500/30 hover:border-blue-500 transition-colors group">
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold group-hover:text-blue-400 transition-colors">Perplexity SEO Checking Tools</span>
                  <ArrowRight className="h-5 w-5 text-gray-600 group-hover:text-blue-400 transition-colors" />
                </div>
              </a>
            </Link>
            <Link href="/perplexity-seo-tracking-tools">
              <a className="bg-gray-900/60 p-4 rounded-lg border border-blue-500/30 hover:border-blue-500 transition-colors group">
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold group-hover:text-blue-400 transition-colors">Perplexity SEO Tracking Tools</span>
                  <ArrowRight className="h-5 w-5 text-gray-600 group-hover:text-blue-400 transition-colors" />
                </div>
              </a>
            </Link>
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