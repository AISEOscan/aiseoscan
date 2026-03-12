import Layout from '../components/Layout'
import Link from 'next/link'
import { Bot, CheckCircle, Zap, ArrowRight, Search, FileText, BarChart3, Target, TrendingUp, Lightbulb, Code, Shield, Clock } from 'lucide-react'

export default function CopilotSEOAnalysisTool() {
  const analysisVsChecking = {
    checking: {
      title: "Checking (Quick Health Check)",
      what: "Binary pass/fail assessment - does this exist or not?",
      output: "List of issues: 'Missing schema', 'No H1 tag', 'No HTTPS'",
      depth: "Surface level - tells you WHAT is wrong",
      example: "Your site is missing Article schema - YES or NO",
      useCase: "Quick audit to identify problems",
      time: "30 seconds"
    },
    analysis: {
      title: "Analysis (Deep Dive)",
      what: "Detailed examination of HOW WELL you're optimized",
      output: "Scores, trends, competitive benchmarks, prioritized roadmap",
      depth: "Deep - tells you WHY it matters and WHAT TO DO",
      example: "Your schema coverage is 40% complete - here's the impact and fix priority",
      useCase: "Understanding optimization quality and planning improvements",
      time: "Review takes 10-15 minutes"
    }
  }

  const analysisLayers = [
    {
      layer: "Layer 1: Schema Markup Completeness",
      icon: Code,
      whatWeAnalyze: [
        "Which schema types are present (Article, FAQ, Organization, Person)",
        "Completeness of each schema type (% of required fields filled)",
        "Schema validation - is JSON-LD properly formatted?",
        "Open Graph completeness for Microsoft ecosystem sharing"
      ],
      whyItMatters: "Copilot relies heavily on schema to understand content. We analyze not just presence, but quality and completeness.",
      scoring: "0-100 based on: schema types present, field completeness, validation errors",
      reportShows: "Exact schema gaps, which fields are missing, code examples to add missing schema"
    },
    {
      layer: "Layer 2: Content Structure Quality",
      icon: FileText,
      whatWeAnalyze: [
        "Heading hierarchy depth and logic (H1 → H2 → H3)",
        "FAQ section presence and structure",
        "Content depth (word count, factual density)",
        "Author attribution and credentials display",
        "Question-format headings for Copilot queries"
      ],
      whyItMatters: "Copilot's 73% enterprise user base expects professional, well-structured content. We analyze if your structure meets enterprise standards.",
      scoring: "0-100 based on: heading quality, FAQ presence, content depth, author signals",
      reportShows: "Content structure gaps, missing FAQ opportunities, author attribution improvements"
    },
    {
      layer: "Layer 3: Technical Foundation",
      icon: Zap,
      whatWeAnalyze: [
        "HTTPS status (required for Bing trust)",
        "Mobile optimization (viewport tag presence)",
        "Page speed indicators (render-blocking resources)",
        "Semantic HTML usage (main, article, section tags)",
        "URL structure clarity",
        "Internal linking patterns"
      ],
      whyItMatters: "Copilot uses Bing's index. Technical issues prevent Bing indexing, which means Copilot can't see your content.",
      scoring: "0-100 based on: HTTPS, mobile optimization, speed, semantic HTML",
      reportShows: "Technical blockers, render-blocking resources to fix, semantic HTML improvements"
    },
    {
      layer: "Layer 4: Authority Signals",
      icon: Shield,
      whatWeAnalyze: [
        "About page presence and discoverability",
        "Contact information availability",
        "Privacy policy link presence",
        "Terms of service link presence"
      ],
      whyItMatters: "Enterprise Copilot users expect to see who they're learning from. Authority signals build trust.",
      scoring: "0-100 based on: presence of about page, contact info, legal pages",
      reportShows: "Missing authority signals, where to add contact info, legal page requirements"
    }
  ]

  const reportContents = [
    {
      section: "Executive Summary",
      includes: [
        "Overall Copilot SEO Score (0-100)",
        "Category breakdown (Schema 30%, Content 25%, Technical 20%, Authority 15%, AI 10%)",
        "Top 3 critical issues blocking Copilot citations",
        "Estimated time to fix critical issues"
      ]
    },
    {
      section: "Schema Analysis",
      includes: [
        "Schema types found vs recommended",
        "Completeness percentage for each schema type",
        "Validation errors with line numbers",
        "Copy-paste schema code to add missing types"
      ]
    },
    {
      section: "Content Structure Analysis",
      includes: [
        "Heading hierarchy diagram",
        "FAQ opportunities (questions your content could answer)",
        "Content depth score vs enterprise standards",
        "Author attribution recommendations"
      ]
    },
    {
      section: "Technical Health Analysis",
      includes: [
        "HTTPS status and SSL certificate validity",
        "Mobile optimization score",
        "Render-blocking resources list with fix instructions",
        "Semantic HTML usage analysis"
      ]
    },
    {
      section: "Authority Signal Analysis",
      includes: [
        "About page assessment",
        "Contact information visibility",
        "Legal page presence check",
        "Trust signal recommendations"
      ]
    },
    {
      section: "Competitive Benchmark",
      includes: [
        "Your score vs industry average",
        "Schema completeness vs typical sites",
        "Where you rank (percentile)"
      ]
    },
    {
      section: "Priority Roadmap",
      includes: [
        "Fixes ordered by impact (high to low)",
        "Time estimates for each fix",
        "Quick wins (30 min or less)",
        "3-month optimization timeline"
      ]
    },
    {
      section: "Code Examples",
      includes: [
        "Copy-paste schema markup for your site",
        "HTML structure improvements",
        "Meta tag additions",
        "Implementation instructions"
      ]
    }
  ]

  const competitiveBenchmark = {
    categories: [
      { metric: "Overall Score", yourScore: 64, industryAvg: 52, topPerformer: 91 },
      { metric: "Schema Completeness", yourScore: 45, industryAvg: 38, topPerformer: 95 },
      { metric: "Content Structure", yourScore: 72, industryAvg: 61, topPerformer: 88 },
      { metric: "Technical SEO", yourScore: 55, industryAvg: 48, topPerformer: 92 },
      { metric: "Authority Signals", yourScore: 80, industryAvg: 70, topPerformer: 100 }
    ],
    interpretation: "You're above industry average overall but have significant room for improvement in schema and technical areas to reach top-performer levels."
  }

  const pageLevelExample = {
    page: "Product Features Page",
    url: "/features",
    overallScore: 64,
    breakdown: [
      {
        category: "Schema Markup",
        score: 40,
        weight: "30%",
        weightedScore: 12,
        issues: [
          "Missing Article schema",
          "Organization schema incomplete (missing logo, contactPoint)",
          "No FAQ schema despite having Q&A content"
        ]
      },
      {
        category: "Content Structure",
        score: 75,
        weight: "25%",
        weightedScore: 18.75,
        issues: [
          "Good heading hierarchy",
          "FAQ section present but missing schema markup",
          "Content depth good (2,400 words)"
        ]
      },
      {
        category: "Technical SEO",
        score: 60,
        weight: "20%",
        weightedScore: 12,
        issues: [
          "HTTPS enabled ✓",
          "5 render-blocking CSS files",
          "Missing viewport meta tag"
        ]
      },
      {
        category: "Authority Signals",
        score: 90,
        weight: "15%",
        weightedScore: 13.5,
        issues: [
          "About page linked ✓",
          "Contact info present ✓",
          "All legal pages present ✓"
        ]
      },
      {
        category: "AI Optimization",
        score: 80,
        weight: "10%",
        weightedScore: 8,
        issues: [
          "Good internal linking",
          "Clear URL structure"
        ]
      }
    ],
    topPriority: "Add Article schema with complete fields - will increase score from 64 to ~72 (+8 points)"
  }

  const analysisWorkflow = [
    {
      step: "Run Full Scan",
      what: "Enter URL, we analyze all layers (schema, content, technical, authority)",
      time: "30 seconds",
      output: "Raw data collected"
    },
    {
      step: "Data Processing",
      what: "Our system scores each category, identifies issues, benchmarks vs industry",
      time: "Instant",
      output: "Scored analysis"
    },
    {
      step: "Report Generation",
      what: "Premium report created with executive summary, detailed findings, code examples",
      time: "Instant",
      output: "Downloadable PDF report"
    },
    {
      step: "Review Analysis",
      what: "Read executive summary, understand score breakdown, identify top priorities",
      time: "10-15 minutes",
      output: "Understanding of current state"
    },
    {
      step: "Implement Fixes",
      what: "Follow priority roadmap, use code examples, implement recommended changes",
      time: "Days to weeks",
      output: "Improved optimization"
    },
    {
      step: "Re-Analyze Progress",
      what: "Run analysis again to measure improvement",
      time: "30 seconds",
      output: "Progress tracking"
    }
  ]

  return (
    <Layout 
      title="Copilot SEO Analysis Tool: Deep Copilot Optimization Analysis"
      description="Deep Copilot SEO analysis tool. Get detailed scores, competitive benchmarks, and priority roadmap for schema markup, content structure, technical SEO, and authority signals."
    >
      <div className="max-w-6xl mx-auto py-12">
        {/* Hero */}
        <div className="mb-16">
          <div className="inline-block bg-purple-900/30 px-4 py-2 rounded-full mb-6">
            <span className="text-purple-200 text-sm font-semibold">467 monthly searches</span>
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
            Copilot SEO Analysis Tool
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-4xl leading-relaxed">
            Deep Copilot SEO analysis tool that goes beyond basic checking. Get detailed scoring, competitive benchmarking, priority roadmap, and code examples for schema markup, content structure, technical optimization, and authority signals.
          </p>
          
          <Link href="https://www.aiseoscan.dev">
            <a className="inline-flex items-center bg-gradient-to-r from-purple-500 to-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
              <BarChart3 className="h-5 w-5 mr-2" />
              Get Full Copilot SEO Analysis
            </a>
          </Link>
        </div>

        {/* Analysis vs Checking */}
        <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">
            Analysis vs Checking: What's the Difference?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-900/20 p-6 rounded-xl border border-blue-500/50">
              <h3 className="text-xl font-bold text-white mb-4">{analysisVsChecking.checking.title}</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-blue-300 font-semibold">What: </span>
                  <span className="text-gray-300">{analysisVsChecking.checking.what}</span>
                </div>
                <div>
                  <span className="text-blue-300 font-semibold">Output: </span>
                  <span className="text-gray-300">{analysisVsChecking.checking.output}</span>
                </div>
                <div>
                  <span className="text-blue-300 font-semibold">Depth: </span>
                  <span className="text-gray-300">{analysisVsChecking.checking.depth}</span>
                </div>
                <div>
                  <span className="text-blue-300 font-semibold">Example: </span>
                  <span className="text-gray-300">{analysisVsChecking.checking.example}</span>
                </div>
                <div>
                  <span className="text-blue-300 font-semibold">Use case: </span>
                  <span className="text-gray-300">{analysisVsChecking.checking.useCase}</span>
                </div>
                <div>
                  <span className="text-blue-300 font-semibold">Time: </span>
                  <span className="text-gray-300">{analysisVsChecking.checking.time}</span>
                </div>
              </div>
            </div>

            <div className="bg-purple-900/20 p-6 rounded-xl border border-purple-500/50">
              <h3 className="text-xl font-bold text-white mb-4">{analysisVsChecking.analysis.title}</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-purple-300 font-semibold">What: </span>
                  <span className="text-gray-300">{analysisVsChecking.analysis.what}</span>
                </div>
                <div>
                  <span className="text-purple-300 font-semibold">Output: </span>
                  <span className="text-gray-300">{analysisVsChecking.analysis.output}</span>
                </div>
                <div>
                  <span className="text-purple-300 font-semibold">Depth: </span>
                  <span className="text-gray-300">{analysisVsChecking.analysis.depth}</span>
                </div>
                <div>
                  <span className="text-purple-300 font-semibold">Example: </span>
                  <span className="text-gray-300">{analysisVsChecking.analysis.example}</span>
                </div>
                <div>
                  <span className="text-purple-300 font-semibold">Use case: </span>
                  <span className="text-gray-300">{analysisVsChecking.analysis.useCase}</span>
                </div>
                <div>
                  <span className="text-purple-300 font-semibold">Time: </span>
                  <span className="text-gray-300">{analysisVsChecking.analysis.time}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-purple-900/30 p-6 rounded-lg border-l-4 border-purple-400">
            <p className="text-purple-200">
              <strong>Key difference:</strong> Checking tells you "you're missing schema." Analysis tells you "you're missing 3 specific schema types, here's the impact (-15 points), here's the code to add them, and this should take 45 minutes to implement."
            </p>
          </div>
        </div>

        {/* Analysis Layers */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">
            4 Layers of Copilot SEO Analysis
          </h2>

          <div className="space-y-6">
            {analysisLayers.map((layer, index) => {
              const Icon = layer.icon
              return (
                <div key={index} className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50">
                  <div className="flex items-start mb-4">
                    <Icon className="h-10 w-10 text-purple-400 mr-4 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-4">{layer.layer}</h3>
                      
                      <div className="mb-4">
                        <h4 className="text-purple-300 font-semibold mb-3">What We Analyze:</h4>
                        <ul className="space-y-2">
                          {layer.whatWeAnalyze.map((item, i) => (
                            <li key={i} className="text-gray-300 text-sm flex items-start">
                              <CheckCircle className="h-4 w-4 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <div className="bg-purple-900/30 p-4 rounded border border-purple-500/50">
                          <p className="text-purple-200 text-sm">
                            <strong>Why it matters:</strong> {layer.whyItMatters}
                          </p>
                        </div>

                        <div className="bg-blue-900/30 p-4 rounded border border-blue-500/50">
                          <p className="text-blue-200 text-sm">
                            <strong>Scoring:</strong> {layer.scoring}
                          </p>
                        </div>

                        <div className="bg-emerald-900/30 p-4 rounded border border-emerald-500/50">
                          <p className="text-emerald-200 text-sm">
                            <strong>Report shows:</strong> {layer.reportShows}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Report Contents */}
        <div className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">
            What's in Your Copilot SEO Analysis Report
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reportContents.map((section, index) => (
              <div key={index} className="bg-blue-900/20 p-6 rounded-xl border border-blue-500/50">
                <h3 className="text-lg font-bold text-white mb-4">{section.section}</h3>
                <ul className="space-y-2">
                  {section.includes.map((item, i) => (
                    <li key={i} className="text-gray-300 text-sm flex items-start">
                      <CheckCircle className="h-4 w-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Competitive Benchmark */}
        <div className="bg-gradient-to-r from-gray-900/60 to-emerald-900/20 backdrop-blur-sm p-8 rounded-xl border border-emerald-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <TrendingUp className="h-8 w-8 text-emerald-400 mr-3" />
            Competitive Benchmarking Example
          </h2>

          <p className="text-gray-300 mb-8">
            Your analysis includes competitive benchmarking to show where you stand:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-emerald-500/50">
                  <th className="text-left p-4 text-emerald-300 font-semibold">Metric</th>
                  <th className="text-center p-4 text-purple-300 font-semibold">Your Score</th>
                  <th className="text-center p-4 text-gray-400 font-semibold">Industry Avg</th>
                  <th className="text-center p-4 text-emerald-300 font-semibold">Top Performer</th>
                </tr>
              </thead>
              <tbody>
                {competitiveBenchmark.categories.map((row, index) => (
                  <tr key={index} className="border-b border-gray-700/50">
                    <td className="p-4 text-white font-medium">{row.metric}</td>
                    <td className="p-4 text-center">
                      <span className="text-purple-400 font-bold text-lg">{row.yourScore}</span>
                    </td>
                    <td className="p-4 text-center text-gray-400">{row.industryAvg}</td>
                    <td className="p-4 text-center text-emerald-400 font-semibold">{row.topPerformer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-emerald-900/30 p-6 rounded-lg border-l-4 border-emerald-400">
            <p className="text-emerald-200">
              <strong>Interpretation:</strong> {competitiveBenchmark.interpretation}
            </p>
          </div>
        </div>

        {/* Page-Level Deep Dive */}
        <div className="bg-gradient-to-r from-gray-900/60 to-orange-900/20 backdrop-blur-sm p-8 rounded-xl border border-orange-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Target className="h-8 w-8 text-orange-400 mr-3" />
            Page-Level Deep Dive Example
          </h2>

          <div className="bg-orange-900/20 p-6 rounded-lg border border-orange-500/50 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{pageLevelExample.page}</h3>
                <p className="text-gray-400 text-sm">{pageLevelExample.url}</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-400">{pageLevelExample.overallScore}</div>
                <div className="text-gray-400 text-sm">Overall Score</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {pageLevelExample.breakdown.map((category, index) => (
              <div key={index} className="bg-orange-900/20 p-5 rounded-lg border border-orange-500/50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-bold text-white">{category.category}</h4>
                  <div className="flex items-center gap-3">
                    <span className="text-orange-300 text-sm">{category.weight} weight</span>
                    <span className="text-2xl font-bold text-orange-400">{category.score}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-400 mb-2">
                  Weighted contribution: <span className="text-white font-semibold">{category.weightedScore.toFixed(1)} points</span>
                </div>
                <ul className="space-y-1">
                  {category.issues.map((issue, i) => (
                    <li key={i} className="text-gray-300 text-sm">• {issue}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-emerald-900/30 p-6 rounded-lg border-l-4 border-emerald-400">
            <p className="text-emerald-200 font-semibold">
              🎯 Top Priority Fix: {pageLevelExample.topPriority}
            </p>
          </div>
        </div>

        {/* Analysis Workflow */}
        <div className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Lightbulb className="h-8 w-8 text-blue-400 mr-3" />
            How the Analysis Works
          </h2>

          <div className="space-y-4">
            {analysisWorkflow.map((step, index) => (
              <div key={index} className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/50">
                <div className="flex items-start">
                  <div className="bg-blue-500 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">{step.step}</h3>
                    <p className="text-gray-300 text-sm mb-3">{step.what}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-900/30 p-3 rounded">
                        <span className="text-blue-300 text-xs">Time: </span>
                        <span className="text-gray-300 text-sm">{step.time}</span>
                      </div>
                      <div className="bg-blue-900/30 p-3 rounded">
                        <span className="text-blue-300 text-xs">Output: </span>
                        <span className="text-gray-300 text-sm">{step.output}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-900/40 via-blue-900/40 to-purple-900/40 backdrop-blur-sm p-12 rounded-xl border border-purple-500/50 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Get Your Copilot SEO Analysis
          </h2>
          <p className="text-gray-200 text-xl mb-8 max-w-2xl mx-auto">
            Deep analysis with scores, benchmarks, priority roadmap, and code examples. Free basic scan shows high-level issues. Premium report ($29) includes full analysis.
          </p>
          
          <Link href="https://www.aiseoscan.dev">
            <a className="inline-flex items-center bg-gradient-to-r from-purple-500 to-blue-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
              <BarChart3 className="h-6 w-6 mr-2" />
              Get Full Analysis Report
            </a>
          </Link>

          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-300">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              Free basic scan
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              $29 premium analysis
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              Downloadable PDF
            </div>
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