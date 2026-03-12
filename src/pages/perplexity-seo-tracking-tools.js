import Layout from '../components/Layout'
import Link from 'next/link'
import { Bot, CheckCircle, Zap, ArrowRight, BarChart3, TrendingUp, Clock, Target, Bell, LineChart, Activity, Calendar, AlertTriangle, Users } from 'lucide-react'

export default function PerplexitySEOTrackingTools() {
  const trackingMetrics = [
    {
      metric: "Citation Rate",
      description: "How often your site gets cited by Perplexity for relevant queries",
      why: "The ultimate measure of Perplexity SEO success. Track weekly to spot trends.",
      howToTrack: "Search for your target queries in Perplexity, count citations of your site vs competitors. AISEOScan automates this.",
      frequency: "Weekly",
      importance: "Critical"
    },
    {
      metric: "Citation Position",
      description: "Where you rank among cited sources (1st, 2nd, 3rd citation)",
      why: "First-position citations get 4.7x more clicks than 3rd position. Position matters.",
      howToTrack: "Note your position in citation lists. Track if you're moving up or down over time.",
      frequency: "Weekly",
      importance: "High"
    },
    {
      metric: "Query Coverage",
      description: "Percentage of target queries where you get cited at all",
      why: "Expanding coverage means Perplexity sees you as authoritative across more topics.",
      howToTrack: "List your target queries, check which ones cite you. Calculate coverage percentage.",
      frequency: "Bi-weekly",
      importance: "High"
    },
    {
      metric: "Citation Stability",
      description: "How consistently you appear in citations over time",
      why: "Volatile citations mean Perplexity isn't confident in your authority. Stability indicates trust.",
      howToTrack: "Track daily/weekly. Stable = good authority signal. Volatile = authority issues.",
      frequency: "Daily",
      importance: "Medium-High"
    },
    {
      metric: "Domain Authority Trend",
      description: "Your site's authority score over time (DR/DA)",
      why: "Perplexity heavily weighs authority. Track monthly to ensure you're building credibility.",
      howToTrack: "Check Ahrefs/Moz DR monthly. Look for upward trend from quality backlinks.",
      frequency: "Monthly",
      importance: "Critical"
    },
    {
      metric: "Content Freshness Score",
      description: "How recently your cited content was updated",
      why: "Perplexity has extreme recency bias. Track to ensure your best content stays fresh.",
      howToTrack: "Monitor last-modified dates on top pages. Update quarterly minimum.",
      frequency: "Monthly",
      importance: "High"
    }
  ]

  const trackingApproaches = [
    {
      approach: "Automated Tracking (Recommended)",
      tool: "AISEOScan",
      frequency: "Daily/Weekly",
      effort: "Low (5 min/week)",
      cost: "$29/report",
      pros: [
        "Set up once, runs automatically",
        "Tracks multiple queries simultaneously",
        "Historical data and trend analysis",
        "Alerts when citations drop",
        "Competitor comparison built-in",
        "Exportable reports and charts"
      ],
      cons: [
        "Requires budget for premium reports",
        "Initial setup time (30 minutes)"
      ],
      bestFor: "Agencies, businesses, and serious publishers",
      recommended: true
    },
    {
      approach: "Manual Tracking",
      tool: "Spreadsheet + Perplexity",
      frequency: "Weekly",
      effort: "High (2+ hours/week)",
      cost: "Free",
      pros: [
        "No cost",
        "Complete control over what you track",
        "Can customize to specific needs"
      ],
      cons: [
        "Extremely time-consuming",
        "Prone to human error",
        "No historical trend analysis",
        "Can't scale beyond 5-10 queries",
        "No competitor tracking",
        "Easy to forget or skip"
      ],
      bestFor: "Small bloggers with 1-2 key queries",
      recommended: false
    },
    {
      approach: "Hybrid Approach",
      tool: "AISEOScan + Manual Spot Checks",
      frequency: "Automated weekly + manual monthly",
      effort: "Medium (30 min/week)",
      cost: "$29/month",
      pros: [
        "Best of both worlds",
        "Automated tracking for consistency",
        "Manual checks for qualitative insights",
        "Verify tool accuracy periodically"
      ],
      cons: [
        "Still requires some manual effort",
        "Need to maintain spreadsheet"
      ],
      bestFor: "In-house SEO teams with multiple sites",
      recommended: false
    }
  ]

  const trackingWorkflow = [
    {
      step: "1. Define Target Queries",
      description: "List 10-50 queries where you want Perplexity citations",
      example: "For a CRM software company: 'best CRM software', 'CRM for small business', 'how to choose CRM', etc.",
      timeInvestment: "1 hour (one-time setup)"
    },
    {
      step: "2. Baseline Measurement",
      description: "Check current citation rate, position, and coverage for each query",
      example: "Query 'best CRM software': Cited 0/10 times, not in top 5 sources",
      timeInvestment: "2-3 hours (one-time)"
    },
    {
      step: "3. Set Up Tracking Schedule",
      description: "Decide frequency (daily, weekly, monthly) and set up tools/reminders",
      example: "Weekly automated scans via AISEOScan, monthly manual spot-checks",
      timeInvestment: "30 minutes (one-time setup)"
    },
    {
      step: "4. Monitor Trends",
      description: "Track changes over time. Look for upward trends (good) or drops (need action)",
      example: "Week 1: 2/10 citations → Week 4: 5/10 citations (positive trend)",
      timeInvestment: "15 minutes/week"
    },
    {
      step: "5. Investigate Changes",
      description: "When citations drop or spike, investigate why. Competitor updates? Content freshness?",
      example: "Citation rate dropped 40% → Check: Did competitor publish new content? Did algorithm change?",
      timeInvestment: "30-60 minutes when changes occur"
    },
    {
      step: "6. Report & Act",
      description: "Monthly reports to stakeholders. Prioritize fixes based on tracking data.",
      example: "Report: DR increased from 45→52, but citations flat. Action: Update content freshness.",
      timeInvestment: "1 hour/month"
    }
  ]

  const alertsToSet = [
    {
      alert: "Citation Rate Drop > 20%",
      trigger: "When overall citation rate drops more than 20% week-over-week",
      action: "Investigate immediately. Check if competitor launched new content or if your content became stale.",
      severity: "High"
    },
    {
      alert: "Lost Top Position",
      trigger: "When you drop from 1st citation to 2nd/3rd for key queries",
      action: "Analyze what competitor is doing better. Update content to reclaim position.",
      severity: "Medium"
    },
    {
      alert: "Domain Authority Drop",
      trigger: "DR/DA decreases (monthly check)",
      action: "Audit backlink profile. Check for lost backlinks or toxic links affecting authority.",
      severity: "High"
    },
    {
      alert: "Content Staleness Warning",
      trigger: "Top pages haven't been updated in 90+ days",
      action: "Schedule content refresh with new data, examples, and updated dates.",
      severity: "Medium"
    },
    {
      alert: "New Competitor Cited",
      trigger: "New site starts appearing in citations for your target queries",
      action: "Analyze new competitor's strategy. Identify gaps in your content.",
      severity: "Low"
    }
  ]

  const trackingDashboardExample = {
    overview: {
      citationRate: "32%",
      avgPosition: "2.1",
      queryCoverage: "16/50 queries",
      domainAuthority: "DR 48",
      trend: "+8% vs last month"
    },
    topQueries: [
      { query: "best perplexity seo tools", citations: "8/10", position: "1st", trend: "↑" },
      { query: "how to optimize for perplexity", citations: "6/10", position: "2nd", trend: "→" },
      { query: "perplexity citation rate", citations: "4/10", position: "3rd", trend: "↓" }
    ],
    alerts: [
      { severity: "high", message: "Citation rate dropped 15% for 'perplexity seo guide'" },
      { severity: "medium", message: "New competitor (competitor.com) cited 5x this week" }
    ]
  }

  const competitorTracking = [
    {
      what: "Citation Rate Comparison",
      why: "See how you stack up against top competitors getting cited",
      howToTrack: "Track same queries for you + 3-5 competitors. Compare citation rates.",
      insight: "If competitor gets cited 8/10 times and you get 2/10, there's a gap to analyze"
    },
    {
      what: "Content Update Frequency",
      why: "Perplexity favors fresh content. Track when competitors update.",
      howToTrack: "Monitor last-modified dates on competitor pages via web scraping or manual checks.",
      insight: "Competitors updating weekly while you update quarterly = you're falling behind"
    },
    {
      what: "Authority Score Trends",
      why: "Domain authority is Perplexity's #1 ranking factor",
      howToTrack: "Track DR/DA monthly for you + competitors. Look for who's gaining authority faster.",
      insight: "Competitor went from DR 40→55 in 6 months = they're earning high-quality backlinks"
    },
    {
      what: "Citation Position",
      why: "Being cited 3rd vs 1st dramatically affects traffic",
      howToTrack: "For each query, note which position each competitor holds in citations.",
      insight: "Competitor always cited 1st = they have content/authority advantage to study"
    }
  ]

  return (
    <Layout 
      title="Perplexity SEO Tracking Tools: Monitor Citations, Rankings & Performance (2026)"
      description="Track your Perplexity SEO performance over time. Monitor citation rates, query coverage, domain authority trends, and competitor movements. Automated and manual tracking methods."
    >
      <div className="max-w-6xl mx-auto py-12">
        {/* Hero */}
        <div className="mb-16">
          <div className="inline-block bg-blue-900/30 px-4 py-2 rounded-full mb-6">
            <span className="text-blue-200 text-sm font-semibold">852 monthly searches</span>
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
            Perplexity SEO Tracking Tools
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-4xl leading-relaxed">
            Monitor your Perplexity SEO performance over time. Track citation rates, query coverage, domain authority trends, and competitor movements with automated tools and smart workflows.
          </p>
          
          <Link href="https://www.aiseoscan.dev">
            <a className="inline-flex items-center bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105">
              <BarChart3 className="h-5 w-5 mr-2" />
              Start Tracking Your Perplexity SEO
            </a>
          </Link>
        </div>

        {/* Why Track */}
        <div className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">
            Why You Need to Track Perplexity SEO (Not Just Check It)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-900/20 p-6 rounded-lg">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="text-xl font-bold text-white mb-3">Spot Trends Before Crisis</h3>
              <p className="text-gray-300">
                A one-time check tells you where you are today. Tracking shows you the trend. Are you improving or declining? Catch drops early before they become disasters.
              </p>
            </div>

            <div className="bg-blue-900/20 p-6 rounded-lg">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-xl font-bold text-white mb-3">Measure What Works</h3>
              <p className="text-gray-300">
                You updated content, built backlinks, optimized schema. But did it work? Tracking shows which optimizations actually moved the needle on citations.
              </p>
            </div>

            <div className="bg-blue-900/20 p-6 rounded-lg">
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="text-xl font-bold text-white mb-3">Beat Competitors</h3>
              <p className="text-gray-300">
                Track your competitors' citation rates and authority scores. When they make gains, you'll know immediately and can counter their strategy.
              </p>
            </div>

            <div className="bg-blue-900/20 p-6 rounded-lg">
              <div className="text-4xl mb-3">📈</div>
              <h3 className="text-xl font-bold text-white mb-3">Prove ROI</h3>
              <p className="text-gray-300">
                Stakeholders want proof that AI SEO works. Show them month-over-month citation rate increases, query coverage expansion, and authority growth.
              </p>
            </div>
          </div>
        </div>

        {/* Key Metrics to Track */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <Target className="h-8 w-8 text-blue-400 mr-3" />
            6 Key Metrics Every Perplexity Tracking Tool Must Monitor
          </h2>

          <div className="space-y-6">
            {trackingMetrics.map((metric, index) => (
              <div key={index} className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-6 rounded-xl border border-blue-500/50">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{metric.metric}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        metric.importance === 'Critical' ? 'bg-rose-500 text-white' :
                        metric.importance === 'High' ? 'bg-orange-500 text-white' :
                        'bg-blue-500 text-white'
                      }`}>
                        {metric.importance}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-3">{metric.description}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-2 md:mt-0">
                    <Clock className="h-4 w-4 text-blue-400" />
                    <span className="text-blue-300 text-sm font-semibold">{metric.frequency}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-900/20 p-4 rounded-lg">
                    <h4 className="text-blue-300 font-semibold mb-2 text-sm">Why Track This:</h4>
                    <p className="text-gray-300 text-sm">{metric.why}</p>
                  </div>
                  <div className="bg-blue-900/20 p-4 rounded-lg">
                    <h4 className="text-blue-300 font-semibold mb-2 text-sm">How to Track:</h4>
                    <p className="text-gray-300 text-sm">{metric.howToTrack}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tracking Approaches */}
        <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">
            3 Ways to Track Perplexity SEO
          </h2>

          <div className="space-y-8">
            {trackingApproaches.map((approach, index) => (
              <div key={index} className={`p-6 rounded-xl border-2 ${
                approach.recommended 
                  ? 'bg-gradient-to-r from-emerald-900/40 to-emerald-800/20 border-emerald-500' 
                  : 'bg-gray-900/40 border-gray-700'
              }`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{approach.approach}</h3>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-gray-400 text-sm">{approach.tool}</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-400 text-sm">{approach.frequency}</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-400 text-sm">Effort: {approach.effort}</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-blue-400 font-semibold text-sm">{approach.cost}</span>
                    </div>
                  </div>
                  {approach.recommended && (
                    <div className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap ml-4">
                      ⭐ Recommended
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h4 className="text-white font-semibold mb-2">✅ Pros:</h4>
                    <ul className="space-y-1">
                      {approach.pros.map((pro, pIndex) => (
                        <li key={pIndex} className="text-gray-300 text-sm flex items-start">
                          <CheckCircle className="h-4 w-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">❌ Cons:</h4>
                    <ul className="space-y-1">
                      {approach.cons.map((con, cIndex) => (
                        <li key={cIndex} className="text-gray-400 text-sm">• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-purple-900/20 p-4 rounded border border-purple-500/50">
                  <span className="text-purple-200 font-semibold">Best for: </span>
                  <span className="text-gray-300">{approach.bestFor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tracking Workflow */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <Activity className="h-8 w-8 text-blue-400 mr-3" />
            6-Step Perplexity SEO Tracking Workflow
          </h2>

          <div className="space-y-6">
            {trackingWorkflow.map((item, index) => (
              <div key={index} className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-6 rounded-xl border border-blue-500/50">
                <div className="flex items-start">
                  <div className="bg-blue-500 text-white font-bold w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-lg">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{item.step}</h3>
                    <p className="text-gray-300 mb-3">{item.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-900/20 p-3 rounded">
                        <span className="text-blue-300 font-semibold text-sm">Example:</span>
                        <p className="text-gray-400 text-sm mt-1">{item.example}</p>
                      </div>
                      <div className="bg-blue-900/20 p-3 rounded">
                        <span className="text-blue-300 font-semibold text-sm">Time Investment:</span>
                        <p className="text-gray-400 text-sm mt-1">{item.timeInvestment}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts to Set */}
        <div className="bg-gradient-to-r from-gray-900/60 to-rose-900/20 backdrop-blur-sm p-8 rounded-xl border border-rose-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Bell className="h-8 w-8 text-rose-400 mr-3" />
            Critical Alerts to Set Up in Your Tracking Tool
          </h2>

          <p className="text-gray-300 mb-6">
            Don't wait for monthly reports to discover problems. Set up automated alerts for these critical events:
          </p>

          <div className="space-y-4">
            {alertsToSet.map((alert, index) => (
              <div key={index} className="bg-rose-900/20 p-5 rounded-lg border-l-4 border-rose-400">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-white">{alert.alert}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ml-3 ${
                    alert.severity === 'High' ? 'bg-rose-500 text-white' :
                    alert.severity === 'Medium' ? 'bg-orange-500 text-white' :
                    'bg-blue-500 text-white'
                  }`}>
                    {alert.severity}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-2">
                  <strong className="text-rose-300">Trigger:</strong> {alert.trigger}
                </p>
                <div className="bg-rose-900/30 p-3 rounded">
                  <p className="text-rose-200 text-sm">
                    <strong>Action:</strong> {alert.action}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard Example */}
        <div className="bg-gradient-to-r from-gray-900/60 to-emerald-900/20 backdrop-blur-sm p-8 rounded-xl border border-emerald-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <LineChart className="h-8 w-8 text-emerald-400 mr-3" />
            What Your Tracking Dashboard Should Look Like
          </h2>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-4">Overview Metrics</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-emerald-900/20 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-white mb-1">{trackingDashboardExample.overview.citationRate}</div>
                <div className="text-xs text-gray-400">Citation Rate</div>
              </div>
              <div className="bg-emerald-900/20 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-white mb-1">{trackingDashboardExample.overview.avgPosition}</div>
                <div className="text-xs text-gray-400">Avg Position</div>
              </div>
              <div className="bg-emerald-900/20 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-white mb-1">{trackingDashboardExample.overview.queryCoverage}</div>
                <div className="text-xs text-gray-400">Query Coverage</div>
              </div>
              <div className="bg-emerald-900/20 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-white mb-1">{trackingDashboardExample.overview.domainAuthority}</div>
                <div className="text-xs text-gray-400">Domain Authority</div>
              </div>
              <div className="bg-emerald-900/20 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-emerald-400 mb-1">{trackingDashboardExample.overview.trend}</div>
                <div className="text-xs text-gray-400">Trend</div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-4">Top Queries Performance</h3>
            <div className="bg-gray-900/60 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-emerald-900/30">
                  <tr>
                    <th className="text-left p-3 text-emerald-300 text-sm font-semibold">Query</th>
                    <th className="text-left p-3 text-emerald-300 text-sm font-semibold">Citations</th>
                    <th className="text-left p-3 text-emerald-300 text-sm font-semibold">Position</th>
                    <th className="text-left p-3 text-emerald-300 text-sm font-semibold">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {trackingDashboardExample.topQueries.map((query, index) => (
                    <tr key={index} className="border-b border-gray-800">
                      <td className="p-3 text-gray-300 text-sm">{query.query}</td>
                      <td className="p-3 text-white text-sm font-semibold">{query.citations}</td>
                      <td className="p-3 text-blue-400 text-sm font-semibold">{query.position}</td>
                      <td className="p-3 text-2xl">{query.trend}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-4">Active Alerts</h3>
            <div className="space-y-2">
              {trackingDashboardExample.alerts.map((alert, index) => (
                <div key={index} className={`flex items-start p-3 rounded-lg ${
                  alert.severity === 'high' ? 'bg-rose-900/30 border-l-4 border-rose-400' :
                  'bg-orange-900/30 border-l-4 border-orange-400'
                }`}>
                  <AlertTriangle className={`h-5 w-5 mr-3 mt-0.5 flex-shrink-0 ${
                    alert.severity === 'high' ? 'text-rose-400' : 'text-orange-400'
                  }`} />
                  <span className="text-gray-300 text-sm">{alert.message}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Competitor Tracking */}
        <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Users className="h-8 w-8 text-purple-400 mr-3" />
            Competitor Tracking: What to Monitor
          </h2>

          <p className="text-gray-300 mb-6">
            Your Perplexity SEO doesn't exist in a vacuum. Track competitors to understand why they're winning citations and you're not:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {competitorTracking.map((item, index) => (
              <div key={index} className="bg-purple-900/20 p-6 rounded-lg border border-purple-500/50">
                <h3 className="text-lg font-bold text-white mb-3">{item.what}</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-purple-300 font-semibold text-sm">Why:</span>
                    <p className="text-gray-300 text-sm">{item.why}</p>
                  </div>
                  <div>
                    <span className="text-purple-300 font-semibold text-sm">How to Track:</span>
                    <p className="text-gray-400 text-sm">{item.howToTrack}</p>
                  </div>
                  <div className="bg-purple-900/30 p-3 rounded">
                    <span className="text-purple-200 font-semibold text-sm">Insight:</span>
                    <p className="text-gray-400 text-sm mt-1">{item.insight}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-900/40 via-cyan-900/40 to-blue-900/40 backdrop-blur-sm p-12 rounded-xl border border-blue-500/50 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Start Tracking Your Perplexity SEO Today
          </h2>
          <p className="text-gray-200 text-xl mb-8 max-w-2xl mx-auto">
            Stop guessing if your AI SEO is working. Get automated tracking with alerts, trend analysis, and competitor benchmarking.
          </p>
          
          <Link href="https://www.aiseoscan.dev">
            <a className="inline-flex items-center bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105">
              <TrendingUp className="h-6 w-6 mr-2" />
              Set Up Tracking Now
            </a>
          </Link>

          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-300">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              Automated weekly scans
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              Historical trends
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              Competitor tracking
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
            <Link href="/best-perplexity-seo-tracking-tools">
              <a className="bg-gray-900/60 p-4 rounded-lg border border-blue-500/30 hover:border-blue-500 transition-colors group">
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold group-hover:text-blue-400 transition-colors">Best Perplexity SEO Tracking Tools</span>
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