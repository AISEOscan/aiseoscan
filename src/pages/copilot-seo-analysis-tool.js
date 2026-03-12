import Layout from '../components/Layout'
import Link from 'next/link'
import { Bot, CheckCircle, Zap, ArrowRight, Activity, PieChart, BarChart3, Target, TrendingUp, AlertCircle, FileText, Layers } from 'lucide-react'

export default function CopilotSEOAnalysisTool() {
  const analysisLayers = [
    {
      layer: "Layer 1: Bing Index Analysis",
      icon: Layers,
      checks: [
        "Is your site indexed by Bing at all?",
        "How many of your pages are in Bing's index?",
        "Are your most important pages indexed?",
        "When was your site last crawled by Bing?",
        "Are there indexing errors or warnings?"
      ],
      whyItMatters: "Copilot pulls 100% of its results from Bing's index. If you're not in Bing, you don't exist to Copilot.",
      scoring: "0-100 based on index coverage, recency, and error rate"
    },
    {
      layer: "Layer 2: Schema Markup Validation",
      icon: FileText,
      checks: [
        "Is Article schema present and valid?",
        "Do you have Organization schema?",
        "Is Person schema implemented for authors?",
        "Are dates (published, modified) properly marked up?",
        "Is your schema following Microsoft's guidelines?"
      ],
      whyItMatters: "Copilot relies heavily on structured data to understand content. Missing or broken schema means Copilot can't parse your content properly.",
      scoring: "0-100 based on schema completeness, validity, and Microsoft compliance"
    },
    {
      layer: "Layer 3: Content Quality Analysis",
      icon: FileText,
      checks: [
        "Is content professional and business-focused?",
        "Appropriate length (Copilot favors 1,500-3,000 words)?",
        "Clear structure with proper headings?",
        "Does content answer business questions?",
        "Is tone appropriate for enterprise audience?"
      ],
      whyItMatters: "Copilot's user base is 73% enterprise professionals. Content that's too casual, thin, or consumer-focused gets deprioritized.",
      scoring: "0-100 based on professionalism, depth, structure, and business relevance"
    },
    {
      layer: "Layer 4: Authority Signals",
      icon: Target,
      checks: [
        "HTTPS enabled site-wide?",
        "Clear contact information and about page?",
        "Professional design and branding?",
        "Author credentials and expertise visible?",
        "Trust indicators (certifications, partnerships)?"
      ],
      whyItMatters: "Copilot checks trust signals before citing. Sites without clear authority indicators get filtered out.",
      scoring: "0-100 based on trust signal presence and quality"
    },
    {
      layer: "Layer 5: Technical Performance",
      icon: Activity,
      checks: [
        "Mobile-friendly and responsive?",
        "Core Web Vitals passing (LCP < 2.5s)?",
        "No major JavaScript errors?",
        "SSL certificate valid?",
        "Site accessible without errors?"
      ],
      whyItMatters: "Copilot won't cite sites with poor technical performance. Users expect fast, professional experiences.",
      scoring: "0-100 based on mobile score, speed metrics, and technical health"
    }
  ]

  const analysisReport = {
    sections: [
      {
        title: "Executive Summary",
        content: "Overall Copilot readiness score with key findings and priority recommendations"
      },
      {
        title: "Bing Index Status",
        content: "Detailed breakdown of what's indexed, what's not, and why. Includes crawl history and error analysis."
      },
      {
        title: "Schema Markup Audit",
        content: "Line-by-line schema validation with specific errors and fix recommendations. Includes code examples."
      },
      {
        title: "Content Analysis",
        content: "Page-by-page content scoring. Identifies thin content, structural issues, and tone mismatches."
      },
      {
        title: "Authority Assessment",
        content: "Trust signal checklist with what's present, what's missing, and implementation guidance."
      },
      {
        title: "Technical Performance",
        content: "Core Web Vitals, mobile usability, and technical issues with prioritized fixes."
      },
      {
        title: "Competitive Benchmarking",
        content: "How you compare to competitors getting cited by Copilot. Gap analysis and opportunities."
      },
      {
        title: "Implementation Roadmap",
        content: "Prioritized action plan: Quick wins (this week), medium-term (this month), long-term (this quarter)."
      }
    ]
  }

  const competitorAnalysis = [
    {
      metric: "Bing Index Coverage",
      you: "42%",
      competitor: "87%",
      gap: "Major gap - many pages not indexed",
      action: "Submit sitemap to Bing Webmaster, fix crawl errors"
    },
    {
      metric: "Schema Implementation",
      you: "Partial",
      competitor: "Complete",
      gap: "Missing Person and Organization schema",
      action: "Add author and company schema markup"
    },
    {
      metric: "Content Depth (avg)",
      you: "850 words",
      competitor: "2,400 words",
      gap: "Content too thin for enterprise audience",
      action: "Expand top 10 pages to 2,000+ words"
    },
    {
      metric: "Authority Signals",
      you: "3/7",
      competitor: "6/7",
      gap: "Missing trust indicators",
      action: "Add certifications, team bios, partnerships"
    },
    {
      metric: "Mobile Performance",
      you: "LCP 4.2s",
      competitor: "LCP 1.8s",
      gap: "Site too slow on mobile",
      action: "Optimize images, reduce JavaScript"
    }
  ]

  const deepDiveExample = {
    page: "https://example.com/best-crm-software",
    overallScore: 64,
    breakdown: [
      {
        factor: "Bing Indexing",
        score: 100,
        status: "Pass",
        details: "Page indexed, last crawled 2 days ago"
      },
      {
        factor: "Schema Markup",
        score: 40,
        status: "Fail",
        details: "Article schema present but missing dateModified and author.name fields"
      },
      {
        factor: "Content Quality",
        score: 55,
        status: "Warning",
        details: "Only 1,200 words - expand to 2,500+ for enterprise depth"
      },
      {
        factor: "Business Focus",
        score: 85,
        status: "Pass",
        details: "Professional tone, appropriate for B2B audience"
      },
      {
        factor: "Authority Signals",
        score: 60,
        status: "Warning",
        details: "Missing author bio with credentials"
      },
      {
        factor: "Technical Performance",
        score: 70,
        status: "Warning",
        details: "LCP 2.8s - needs optimization to hit 2.5s target"
      }
    ]
  }

  const analysisVsChecking = [
    {
      aspect: "Depth",
      checking: "Surface-level pass/fail",
      analysis: "Multi-layer diagnostic with root cause identification"
    },
    {
      aspect: "Scope",
      checking: "Individual issues",
      analysis: "Holistic view across all factors + competitive context"
    },
    {
      aspect: "Output",
      checking: "List of issues",
      analysis: "Prioritized roadmap with implementation guidance"
    },
    {
      aspect: "Time Investment",
      checking: "Quick scan (30 seconds)",
      analysis: "Deep audit (detailed report with benchmarking)"
    },
    {
      aspect: "Best For",
      checking: "Quick health check",
      analysis: "Strategic planning and optimization campaigns"
    }
  ]

  return (
    <Layout 
      title="Copilot SEO Analysis Tool: Deep Diagnostic for Microsoft Copilot Optimization"
      description="Go beyond basic checking with comprehensive Copilot SEO analysis. Multi-layer diagnostics, competitive benchmarking, and strategic roadmaps for enterprise optimization."
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
            Go beyond basic checking with comprehensive Copilot SEO analysis. Multi-layer diagnostics, competitive benchmarking, root cause identification, and strategic implementation roadmaps for enterprise Microsoft Copilot optimization.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link href="https://www.aiseoscan.dev">
              <a className="inline-flex items-center bg-gradient-to-r from-purple-500 to-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
                <Activity className="h-5 w-5 mr-2" />
                Get Deep Copilot Analysis
              </a>
            </Link>
            <Link href="/copilot-seo-tool">
              <a className="inline-flex items-center bg-gray-800 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-700 transition-all duration-300 border border-gray-600">
                Basic Copilot Checker
                <ArrowRight className="h-5 w-5 ml-2" />
              </a>
            </Link>
          </div>
        </div>

        {/* Analysis vs Checking */}
        <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">
            Analysis vs Checking: What's the Difference?
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-purple-500/50">
                  <th className="text-left p-4 text-purple-300 font-semibold">Aspect</th>
                  <th className="text-left p-4 text-gray-400 font-semibold">Basic Checking</th>
                  <th className="text-left p-4 text-purple-300 font-semibold">Deep Analysis</th>
                </tr>
              </thead>
              <tbody>
                {analysisVsChecking.map((row, index) => (
                  <tr key={index} className="border-b border-gray-700/50">
                    <td className="p-4 text-white font-medium">{row.aspect}</td>
                    <td className="p-4 text-gray-400">{row.checking}</td>
                    <td className="p-4 text-purple-300">{row.analysis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 bg-purple-900/20 p-6 rounded-lg border-l-4 border-purple-400">
            <p className="text-purple-200">
              <strong>Bottom line:</strong> Use checking for quick health checks. Use analysis when you need to understand WHY you're not getting cited and build a strategic plan to fix it.
            </p>
          </div>
        </div>

        {/* 5 Analysis Layers */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <Layers className="h-8 w-8 text-blue-400 mr-3" />
            5 Layers of Copilot SEO Analysis
          </h2>

          <p className="text-gray-300 mb-8">
            Our analysis tool goes deep across 5 critical layers. Each layer gets its own diagnostic report with scoring, issues, and fixes:
          </p>

          <div className="space-y-6">
            {analysisLayers.map((layer, index) => {
              const Icon = layer.icon
              return (
                <div key={index} className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-6 rounded-xl border border-blue-500/50">
                  <div className="flex items-start mb-4">
                    <div className="bg-blue-500 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-3">{layer.layer}</h3>
                      
                      <div className="mb-4">
                        <h4 className="text-blue-300 font-semibold mb-2">What We Analyze:</h4>
                        <div className="space-y-1">
                          {layer.checks.map((check, cIndex) => (
                            <div key={cIndex} className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-blue-400 mr-2 mt-1 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">{check}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-blue-300 font-semibold mb-2">Why This Layer Matters:</h4>
                        <p className="text-gray-300 text-sm">{layer.whyItMatters}</p>
                      </div>

                      <div className="bg-blue-900/30 p-3 rounded border border-blue-500/50">
                        <span className="text-blue-200 font-semibold text-sm">Scoring: </span>
                        <span className="text-gray-300 text-sm">{layer.scoring}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* What's in the Report */}
        <div className="bg-gradient-to-r from-gray-900/60 to-emerald-900/20 backdrop-blur-sm p-8 rounded-xl border border-emerald-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <FileText className="h-8 w-8 text-emerald-400 mr-3" />
            What's Included in Your Analysis Report
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysisReport.sections.map((section, index) => (
              <div key={index} className="bg-emerald-900/20 p-5 rounded-lg border border-emerald-500/50">
                <h3 className="text-lg font-bold text-white mb-2">{section.title}</h3>
                <p className="text-gray-300 text-sm">{section.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-emerald-900/30 p-6 rounded-lg">
            <p className="text-emerald-200 text-lg mb-4">
              <strong>Premium reports ($29) include:</strong>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center text-gray-300">
                <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
                <span className="text-sm">Downloadable PDF report</span>
              </div>
              <div className="flex items-center text-gray-300">
                <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
                <span className="text-sm">Code examples for fixes</span>
              </div>
              <div className="flex items-center text-gray-300">
                <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
                <span className="text-sm">Competitor benchmarking</span>
              </div>
              <div className="flex items-center text-gray-300">
                <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
                <span className="text-sm">90-day action roadmap</span>
              </div>
            </div>
          </div>
        </div>

        {/* Competitive Analysis Example */}
        <div className="bg-gradient-to-r from-gray-900/60 to-rose-900/20 backdrop-blur-sm p-8 rounded-xl border border-rose-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <BarChart3 className="h-8 w-8 text-rose-400 mr-3" />
            Competitive Benchmarking: You vs Top-Cited Competitors
          </h2>

          <p className="text-gray-300 mb-6">
            Our analysis doesn't just audit your site—it shows how you stack up against competitors already getting cited by Copilot:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-rose-500/50">
                  <th className="text-left p-4 text-rose-300 font-semibold">Metric</th>
                  <th className="text-center p-4 text-rose-300 font-semibold">You</th>
                  <th className="text-center p-4 text-emerald-300 font-semibold">Top Competitor</th>
                  <th className="text-left p-4 text-gray-400 font-semibold">Gap Analysis</th>
                  <th className="text-left p-4 text-blue-300 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {competitorAnalysis.map((row, index) => (
                  <tr key={index} className="border-b border-gray-700/50">
                    <td className="p-4 text-white font-medium">{row.metric}</td>
                    <td className="p-4 text-center text-rose-400 font-bold">{row.you}</td>
                    <td className="p-4 text-center text-emerald-400 font-bold">{row.competitor}</td>
                    <td className="p-4 text-gray-300 text-sm">{row.gap}</td>
                    <td className="p-4 text-blue-300 text-sm">{row.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Deep Dive Example */}
        <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <PieChart className="h-8 w-8 text-purple-400 mr-3" />
            Example: Page-Level Deep Dive
          </h2>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{deepDiveExample.page}</h3>
                <p className="text-gray-400 text-sm">Overall Copilot Readiness Score</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-yellow-400">{deepDiveExample.overallScore}/100</div>
                <p className="text-sm text-yellow-300">Needs Work</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {deepDiveExample.breakdown.map((item, index) => (
              <div key={index} className="bg-gray-900/60 p-4 rounded-lg border border-purple-500/30">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-semibold">{item.factor}</h4>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      item.status === 'Pass' ? 'bg-emerald-500 text-white' :
                      item.status === 'Warning' ? 'bg-yellow-500 text-white' :
                      'bg-rose-500 text-white'
                    }`}>
                      {item.status}
                    </span>
                    <span className="text-2xl font-bold text-white">{item.score}</span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">{item.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-900/40 via-blue-900/40 to-purple-900/40 backdrop-blur-sm p-12 rounded-xl border border-purple-500/50 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Get Your Comprehensive Copilot SEO Analysis
          </h2>
          <p className="text-gray-200 text-xl mb-8 max-w-2xl mx-auto">
            Multi-layer diagnostics, competitive benchmarking, and strategic roadmap. Know exactly why you're not getting cited and how to fix it.
          </p>
          
          <Link href="https://www.aiseoscan.dev">
            <a className="inline-flex items-center bg-gradient-to-r from-purple-500 to-blue-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
              <Activity className="h-6 w-6 mr-2" />
              Start Deep Analysis
            </a>
          </Link>

          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-300">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              5-layer diagnostic
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              Competitor benchmarking
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              Implementation roadmap
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
                  <span className="text-white font-semibold group-hover:text-purple-400 transition-colors">Copilot SEO Tool (Basic)</span>
                  <ArrowRight className="h-5 w-5 text-gray-600 group-hover:text-purple-400 transition-colors" />
                </div>
              </a>
            </Link>
            <Link href="/copilot-seo-analysis-software">
              <a className="bg-gray-900/60 p-4 rounded-lg border border-purple-500/30 hover:border-purple-500 transition-colors group">
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold group-hover:text-purple-400 transition-colors">Copilot SEO Analysis Software</span>
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