import Layout from '../components/Layout'
import Link from 'next/link'
import { Bot, CheckCircle, Zap, ArrowRight, Search, TrendingUp, Clock, BarChart3, Bell, Eye, Lightbulb, AlertTriangle, Code, FileText, Shield } from 'lucide-react'

export default function PerplexitySEOTrackingTools() {
  const trackingVsChecking = {
    checking: {
      what: "One-time snapshot of your current optimization status",
      when: "When you want to know 'How optimized am I right now?'",
      output: "Score (0-100) and list of current issues to fix",
      frequency: "Occasional - after making changes or monthly check-ins",
      examples: ["Is my schema markup complete?", "Do I have proper heading structure?", "Are authority signals present?"]
    },
    tracking: {
      what: "Monitoring changes over time to see improvement or decline",
      when: "When you want to know 'Am I getting better or worse?'",
      output: "Trends, progress graphs, before/after comparisons",
      frequency: "Regular - weekly or monthly to monitor progress",
      examples: ["Did my score improve after adding schema?", "Which fixes had the biggest impact?", "Are new issues appearing?"]
    }
  }

  const whatToTrack = [
    {
      metric: "Overall AI SEO Score",
      whatItIs: "Your total score (0-100) across schema, content, technical, and authority",
      whyTrack: "See if your optimization efforts are working overall",
      howWeTrack: "Run scans weekly/monthly, compare scores over time",
      goodTrend: "Score increasing steadily (e.g., 45 → 62 → 78 over 3 months)",
      badTrend: "Score declining or stagnant despite fixes"
    },
    {
      metric: "Schema Markup Completeness",
      whatItIs: "Percentage of required schema types present and complete",
      whyTrack: "Schema is critical for Perplexity - track if you're adding it consistently",
      howWeTrack: "Check which schema types are present: Article, FAQ, Organization, Person",
      goodTrend: "Adding new schema types: Article added → FAQ added → Person added",
      badTrend: "Schema still missing or incomplete after fixes"
    },
    {
      metric: "Content Structure Issues",
      whatItIs: "Number of heading hierarchy, FAQ, and content depth issues",
      whyTrack: "Monitor if content improvements are being maintained",
      howWeTrack: "Count issues: missing H1, poor hierarchy, no FAQs, thin content",
      goodTrend: "Issues decreasing: 12 issues → 5 issues → 2 issues",
      badTrend: "New content added without proper structure"
    },
    {
      metric: "Technical SEO Health",
      whatItIs: "HTTPS status, mobile optimization, page speed, semantic HTML",
      whyTrack: "Ensure technical foundation stays solid",
      howWeTrack: "Check HTTPS, viewport tag, render-blocking resources, semantic tags",
      goodTrend: "All technical issues resolved and staying resolved",
      badTrend: "New technical issues appearing (e.g., SSL expires, new blocking scripts)"
    },
    {
      metric: "Authority Signals",
      whatItIs: "Presence of About page, contact info, privacy policy, terms",
      whyTrack: "Verify trust signals remain in place",
      howWeTrack: "Check for presence of authority pages and contact information",
      goodTrend: "All authority signals present and up-to-date",
      badTrend: "Authority pages removed or contact info missing"
    }
  ]

  const trackingApproaches = [
    {
      approach: "Automated Tracking (Recommended)",
      howItWorks: "Schedule regular scans (weekly/monthly) and compare results automatically",
      toolsNeeded: "AISEOScan premium reports + spreadsheet for tracking",
      effort: "Low - 15 minutes per month to review trends",
      cost: "$29 per scan (monthly = $29/month)",
      pros: [
        "Consistent data - same checks every time",
        "Catches issues early before they impact citations",
        "Easy to see what's improving vs declining",
        "Quantifiable progress for stakeholders"
      ],
      cons: [
        "Requires premium reports for detailed tracking",
        "Need to remember to run scans regularly"
      ],
      bestFor: "Businesses serious about Perplexity optimization, agencies managing multiple clients"
    },
    {
      approach: "Manual Tracking",
      howItWorks: "Manually check schema, content, and technical factors monthly",
      toolsNeeded: "Browser dev tools, schema validators, checklist",
      effort: "High - 2-3 hours per month to check everything",
      cost: "Free (but time-consuming)",
      pros: [
        "Free",
        "Deep understanding of your site's optimization"
      ],
      cons: [
        "Very time-consuming",
        "Easy to miss things or check inconsistently",
        "Hard to track trends without structured data",
        "Subjective assessments vs objective scores"
      ],
      bestFor: "Small sites, hobby projects, learning how AI SEO works"
    },
    {
      approach: "Hybrid Tracking",
      howItWorks: "Quarterly automated scans + monthly manual spot-checks",
      toolsNeeded: "AISEOScan quarterly + manual checks in between",
      effort: "Medium - 30 minutes per month",
      cost: "$29 quarterly = ~$10/month average",
      pros: [
        "Affordable",
        "Regular monitoring without constant cost",
        "Manual checks catch urgent issues between scans"
      ],
      cons: [
        "Less consistent data than pure automated",
        "Gaps between automated scans may miss trends"
      ],
      bestFor: "Budget-conscious businesses, sites with stable optimization"
    }
  ]

  const trackingWorkflow = [
    {
      step: "Baseline Scan",
      what: "Run initial scan to establish starting point",
      deliverable: "Score (e.g., 45/100), full issue list, priority fixes",
      time: "30 seconds to scan, 10 minutes to review"
    },
    {
      step: "Implement Fixes",
      what: "Work through priority issues: add schema, fix headings, enable HTTPS",
      deliverable: "Completed fixes with documentation",
      time: "Varies - days to weeks depending on issues"
    },
    {
      step: "Progress Scan",
      what: "Run scan again after fixes to measure improvement",
      deliverable: "New score (e.g., 62/100), remaining issues, progress report",
      time: "30 seconds to scan, 5 minutes to compare"
    },
    {
      step: "Track Trends",
      what: "Record scores and issues in spreadsheet over time",
      deliverable: "Trend graph showing score progression",
      time: "5 minutes per scan"
    },
    {
      step: "Monitor Regularly",
      what: "Schedule recurring scans (weekly/monthly) to catch regressions",
      deliverable: "Ongoing optimization health monitoring",
      time: "15 minutes per month"
    },
    {
      step: "Adjust Strategy",
      what: "Based on trends, prioritize what to fix next",
      deliverable: "Updated optimization roadmap",
      time: "30 minutes quarterly"
    }
  ]

  const trackingMetrics = [
    {
      metric: "Schema Coverage",
      baseline: "0% - No schema markup",
      progress1: "40% - Article schema added to blog posts",
      progress2: "70% - Organization + Person schema added",
      current: "95% - FAQ schema added to product pages",
      trend: "↗️ Excellent progress"
    },
    {
      metric: "Heading Structure Issues",
      baseline: "15 issues - Multiple H1s, skipped levels, no hierarchy",
      progress1: "8 issues - Fixed main pages",
      progress2: "3 issues - Fixed blog posts",
      current: "1 issue - One legacy page remaining",
      trend: "↗️ Excellent progress"
    },
    {
      metric: "Technical Score",
      baseline: "35/100 - No HTTPS, missing viewport, slow loading",
      progress1: "55/100 - HTTPS enabled",
      progress2: "75/100 - Viewport tag added, speed improved",
      current: "88/100 - All major technical issues resolved",
      trend: "↗️ Excellent progress"
    },
    {
      metric: "Overall AI SEO Score",
      baseline: "42/100",
      progress1: "58/100 (+16 points in Month 1)",
      progress2: "71/100 (+13 points in Month 2)",
      current: "85/100 (+14 points in Month 3)",
      trend: "↗️ Excellent progress"
    }
  ]

  const alertsToMonitor = [
    {
      alert: "Score Drops by 10+ Points",
      severity: "Critical",
      possibleCauses: [
        "Schema markup removed or broken",
        "Site migration broke technical SEO",
        "Content deleted or changed significantly",
        "SSL certificate expired"
      ],
      action: "Immediate investigation - run comparison scan to identify what changed"
    },
    {
      alert: "New Critical Issues Appear",
      severity: "High",
      possibleCauses: [
        "Site redesign introduced structural issues",
        "CMS update broke schema generation",
        "New pages added without optimization",
        "Third-party scripts breaking page speed"
      ],
      action: "Fix within 1 week - critical issues directly impact Perplexity citations"
    },
    {
      alert: "No Improvement After Fixes",
      severity: "Medium",
      possibleCauses: [
        "Fixes not implemented correctly",
        "Wrong issues prioritized",
        "Site cache not cleared",
        "Changes not yet crawled"
      ],
      action: "Review implementation - verify fixes with manual testing"
    },
    {
      alert: "Authority Signals Removed",
      severity: "Medium",
      possibleCauses: [
        "Redesign removed About/Contact pages",
        "Footer links changed",
        "Privacy policy link broken"
      ],
      action: "Restore authority signals - essential for trust"
    }
  ]

  const commonTrackingMistakes = [
    {
      mistake: "Only Tracking Overall Score",
      problem: "Overall score can hide important trends. Schema might improve while content quality declines, resulting in flat overall score.",
      solution: "Track category scores separately: Schema (30%), Content (25%), Technical (20%), Authority (15%), AI Optimization (10%)"
    },
    {
      mistake: "Not Tracking After Each Major Change",
      problem: "You make 5 fixes at once, score improves, but you don't know which fix had the biggest impact.",
      solution: "Run scan after each major change (e.g., after adding schema, after fixing headings) to measure individual impact"
    },
    {
      mistake: "Tracking Too Infrequently",
      problem: "Monthly scans may miss critical issues that hurt citations for weeks before being caught.",
      solution: "Track weekly for first 3 months during active optimization, then monthly for maintenance"
    },
    {
      mistake: "No Baseline Documentation",
      problem: "You can't prove improvement without knowing where you started.",
      solution: "Document initial state with screenshots, export first report, record all scores before starting fixes"
    }
  ]

  return (
    <Layout 
      title="Perplexity SEO Tracking Tools: Monitor Your Optimization Progress"
      description="Learn how to track Perplexity SEO progress over time. Monitor schema completeness, content quality, technical health, and overall AI SEO score improvements."
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
            Learn how to track Perplexity SEO optimization over time. Monitor schema markup completeness, content structure improvements, technical health, and overall AI SEO score to measure progress and catch regressions early.
          </p>
          
          <Link href="https://www.aiseoscan.dev">
            <a className="inline-flex items-center bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105">
              <BarChart3 className="h-5 w-5 mr-2" />
              Start Tracking Your Perplexity SEO
            </a>
          </Link>
        </div>

        {/* Tracking vs Checking */}
        <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Eye className="h-8 w-8 text-purple-400 mr-3" />
            Tracking vs Checking: What's the Difference?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-purple-900/20 p-6 rounded-xl border border-purple-500/50">
              <h3 className="text-xl font-bold text-white mb-4">✓ Checking (One-Time)</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-purple-300 font-semibold">What: </span>
                  <span className="text-gray-300">{trackingVsChecking.checking.what}</span>
                </div>
                <div>
                  <span className="text-purple-300 font-semibold">When: </span>
                  <span className="text-gray-300">{trackingVsChecking.checking.when}</span>
                </div>
                <div>
                  <span className="text-purple-300 font-semibold">Output: </span>
                  <span className="text-gray-300">{trackingVsChecking.checking.output}</span>
                </div>
                <div>
                  <span className="text-purple-300 font-semibold">Frequency: </span>
                  <span className="text-gray-300">{trackingVsChecking.checking.frequency}</span>
                </div>
                <div>
                  <span className="text-purple-300 font-semibold">Examples:</span>
                  <ul className="mt-2 space-y-1">
                    {trackingVsChecking.checking.examples.map((ex, i) => (
                      <li key={i} className="text-gray-300 ml-4">• {ex}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/20 p-6 rounded-xl border border-blue-500/50">
              <h3 className="text-xl font-bold text-white mb-4">📊 Tracking (Over Time)</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-blue-300 font-semibold">What: </span>
                  <span className="text-gray-300">{trackingVsChecking.tracking.what}</span>
                </div>
                <div>
                  <span className="text-blue-300 font-semibold">When: </span>
                  <span className="text-gray-300">{trackingVsChecking.tracking.when}</span>
                </div>
                <div>
                  <span className="text-blue-300 font-semibold">Output: </span>
                  <span className="text-gray-300">{trackingVsChecking.tracking.output}</span>
                </div>
                <div>
                  <span className="text-blue-300 font-semibold">Frequency: </span>
                  <span className="text-gray-300">{trackingVsChecking.tracking.frequency}</span>
                </div>
                <div>
                  <span className="text-blue-300 font-semibold">Examples:</span>
                  <ul className="mt-2 space-y-1">
                    {trackingVsChecking.tracking.examples.map((ex, i) => (
                      <li key={i} className="text-gray-300 ml-4">• {ex}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-900/30 p-6 rounded-lg border-l-4 border-blue-400">
            <p className="text-blue-200">
              <strong>Key insight:</strong> Checking tells you "where you are now." Tracking tells you "are you getting better or worse." Both are important - checking identifies issues, tracking ensures your fixes are working.
            </p>
          </div>
        </div>

        {/* What to Track */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <TrendingUp className="h-8 w-8 text-emerald-400 mr-3" />
            5 Key Metrics to Track for Perplexity SEO
          </h2>

          <div className="space-y-6">
            {whatToTrack.map((metric, index) => (
              <div key={index} className="bg-gradient-to-r from-gray-900/60 to-emerald-900/20 backdrop-blur-sm p-6 rounded-xl border border-emerald-500/50">
                <h3 className="text-xl font-bold text-white mb-4">{index + 1}. {metric.metric}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-emerald-300 font-semibold text-sm">What it is: </span>
                    <p className="text-gray-300 text-sm">{metric.whatItIs}</p>
                  </div>
                  <div>
                    <span className="text-emerald-300 font-semibold text-sm">Why track: </span>
                    <p className="text-gray-300 text-sm">{metric.whyTrack}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-emerald-300 font-semibold text-sm">How we track: </span>
                  <p className="text-gray-300 text-sm">{metric.howWeTrack}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-emerald-900/20 p-4 rounded border border-emerald-500/50">
                    <span className="text-emerald-300 font-semibold text-sm">✅ Good trend: </span>
                    <p className="text-gray-300 text-sm mt-1">{metric.goodTrend}</p>
                  </div>
                  <div className="bg-rose-900/20 p-4 rounded border border-rose-500/50">
                    <span className="text-rose-300 font-semibold text-sm">❌ Bad trend: </span>
                    <p className="text-gray-300 text-sm mt-1">{metric.badTrend}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tracking Approaches */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">
            3 Approaches to Tracking Perplexity SEO
          </h2>

          <div className="space-y-6">
            {trackingApproaches.map((approach, index) => (
              <div key={index} className={`p-8 rounded-xl border-2 ${
                approach.approach.includes('Recommended')
                  ? 'bg-gradient-to-r from-emerald-900/40 to-emerald-800/20 border-emerald-500'
                  : 'bg-gradient-to-r from-gray-900/60 to-gray-800/20 border-gray-700'
              }`}>
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white">{approach.approach}</h3>
                  {approach.approach.includes('Recommended') && (
                    <span className="bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-bold whitespace-nowrap ml-4">
                      ⭐ Recommended
                    </span>
                  )}
                </div>

                <p className="text-gray-300 mb-4">{approach.howItWorks}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
                  <div>
                    <span className="text-gray-500">Tools: </span>
                    <span className="text-white font-semibold block">{approach.toolsNeeded}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Effort: </span>
                    <span className="text-white font-semibold block">{approach.effort}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Cost: </span>
                    <span className="text-blue-400 font-semibold block">{approach.cost}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Best for: </span>
                    <span className="text-white font-semibold block">{approach.bestFor}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-emerald-300 font-semibold mb-3">✅ Pros:</h4>
                    <ul className="space-y-2">
                      {approach.pros.map((pro, pIndex) => (
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
                      {approach.cons.map((con, cIndex) => (
                        <li key={cIndex} className="text-gray-400 text-sm">• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tracking Workflow */}
        <div className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Lightbulb className="h-8 w-8 text-blue-400 mr-3" />
            6-Step Perplexity SEO Tracking Workflow
          </h2>

          <div className="space-y-6">
            {trackingWorkflow.map((step, index) => (
              <div key={index} className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/50">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-500 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{step.step}</h3>
                    <p className="text-gray-300 text-sm mb-3">{step.what}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-900/30 p-3 rounded">
                        <span className="text-blue-300 font-semibold text-sm">Deliverable: </span>
                        <span className="text-gray-300 text-sm">{step.deliverable}</span>
                      </div>
                      <div className="bg-blue-900/30 p-3 rounded">
                        <span className="text-blue-300 font-semibold text-sm">Time: </span>
                        <span className="text-gray-300 text-sm">{step.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Example */}
        <div className="bg-gradient-to-r from-gray-900/60 to-emerald-900/20 backdrop-blur-sm p-8 rounded-xl border border-emerald-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <TrendingUp className="h-8 w-8 text-emerald-400 mr-3" />
            Real Tracking Example: 3-Month Progress
          </h2>

          <p className="text-gray-300 mb-8">
            Example of tracking key metrics over 3 months of active Perplexity SEO optimization:
          </p>

          <div className="space-y-6">
            {trackingMetrics.map((metric, index) => (
              <div key={index} className="bg-emerald-900/20 p-6 rounded-lg border border-emerald-500/50">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">{metric.metric}</h3>
                  <span className="text-2xl">{metric.trend}</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-gray-500 w-32 flex-shrink-0 text-sm">Baseline:</span>
                    <span className="text-gray-300 text-sm">{metric.baseline}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-500 w-32 flex-shrink-0 text-sm">Month 1:</span>
                    <span className="text-gray-300 text-sm">{metric.progress1}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-500 w-32 flex-shrink-0 text-sm">Month 2:</span>
                    <span className="text-gray-300 text-sm">{metric.progress2}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-emerald-400 w-32 flex-shrink-0 text-sm font-semibold">Current:</span>
                    <span className="text-emerald-300 text-sm font-semibold">{metric.current}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts to Monitor */}
        <div className="bg-gradient-to-r from-gray-900/60 to-rose-900/20 backdrop-blur-sm p-8 rounded-xl border border-rose-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Bell className="h-8 w-8 text-rose-400 mr-3" />
            4 Critical Alerts to Monitor
          </h2>

          <p className="text-gray-300 mb-8">
            Set up monitoring for these alerts to catch problems early:
          </p>

          <div className="space-y-6">
            {alertsToMonitor.map((alert, index) => (
              <div key={index} className="bg-rose-900/20 p-6 rounded-xl border-l-4 border-rose-400">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{alert.alert}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ml-3 ${
                    alert.severity === 'Critical' ? 'bg-rose-500 text-white' :
                    alert.severity === 'High' ? 'bg-orange-500 text-white' :
                    'bg-yellow-500 text-white'
                  }`}>
                    {alert.severity}
                  </span>
                </div>

                <div className="mb-4">
                  <h4 className="text-rose-300 font-semibold mb-2 text-sm">Possible Causes:</h4>
                  <ul className="space-y-1">
                    {alert.possibleCauses.map((cause, cIndex) => (
                      <li key={cIndex} className="text-gray-300 text-sm">• {cause}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-emerald-900/20 p-4 rounded border border-emerald-500/50">
                  <span className="text-emerald-300 font-semibold text-sm">Action: </span>
                  <span className="text-emerald-200 text-sm">{alert.action}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="bg-gradient-to-r from-gray-900/60 to-orange-900/20 backdrop-blur-sm p-8 rounded-xl border border-orange-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <AlertTriangle className="h-8 w-8 text-orange-400 mr-3" />
            4 Common Tracking Mistakes
          </h2>

          <div className="space-y-6">
            {commonTrackingMistakes.map((item, index) => (
              <div key={index} className="bg-orange-900/20 p-6 rounded-lg border-l-4 border-orange-400">
                <h3 className="text-xl font-bold text-orange-300 mb-2">❌ {item.mistake}</h3>
                <p className="text-gray-300 mb-3">
                  <strong className="text-white">Problem:</strong> {item.problem}
                </p>
                <div className="bg-emerald-900/20 p-4 rounded border border-emerald-500/50">
                  <p className="text-emerald-200 text-sm">
                    <strong>Solution:</strong> {item.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-900/40 via-cyan-900/40 to-blue-900/40 backdrop-blur-sm p-12 rounded-xl border border-blue-500/50 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Start Tracking Your Perplexity SEO
          </h2>
          <p className="text-gray-200 text-xl mb-8 max-w-2xl mx-auto">
            Run your baseline scan now. Track schema completeness, content structure, technical health, and overall score over time. See measurable progress.
          </p>
          
          <Link href="https://www.aiseoscan.dev">
            <a className="inline-flex items-center bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105">
              <BarChart3 className="h-6 w-6 mr-2" />
              Run Baseline Scan
            </a>
          </Link>

          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-300">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              No signup required
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              Get baseline score in 30 seconds
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              Track progress over time
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