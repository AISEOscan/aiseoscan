import Layout from '../components/Layout'
import Link from 'next/link'
import { Bot, CheckCircle, Zap, ArrowRight, Search, Target, BarChart3, Shield, Code, FileText } from 'lucide-react'

export default function CopilotSEOTool() {
  const features = [
    {
      icon: Search,
      title: "Bing Index Analysis",
      description: "Check if your site is properly indexed by Bing (Copilot's search engine). Identify indexing issues and opportunities."
    },
    {
      icon: Code,
      title: "Microsoft Schema Validation",
      description: "Validate your schema markup against Microsoft's requirements. Copilot heavily relies on structured data for citations."
    },
    {
      icon: Target,
      title: "Enterprise Optimization",
      description: "Professional, business-focused content analysis. Copilot users are enterprise professionals—content must match their expectations."
    },
    {
      icon: BarChart3,
      title: "Authority Signal Detection",
      description: "Check trust signals that Copilot prioritizes: HTTPS, clear contact info, professional design, and editorial standards."
    },
    {
      icon: Shield,
      title: "Bing Webmaster Integration",
      description: "Guidance on submitting your site to Bing Webmaster Tools for maximum Copilot visibility."
    },
    {
      icon: FileText,
      title: "Citation Readiness Score",
      description: "See how likely Copilot is to cite your content with specific scoring across 30+ factors."
    }
  ]

  const checklistItems = [
    "Is your site indexed by Bing? (Critical - Copilot pulls from Bing's index)",
    "Do you have proper Article, Organization, and Person schema markup?",
    "Is your content professional and business-focused (Copilot's audience)?",
    "Are you registered with Bing Webmaster Tools?",
    "Do you have clear trust signals (HTTPS, contact info, about page)?",
    "Is your content recent and regularly updated?",
    "Do you have author credentials and expertise clearly displayed?",
    "Is your site mobile-friendly and fast-loading?"
  ]

  const comparison = [
    {
      feature: "Bing Index Check",
      aiseoscan: true,
      competitors: "Partial"
    },
    {
      feature: "Microsoft Schema Validation",
      aiseoscan: true,
      competitors: false
    },
    {
      feature: "Copilot-Specific Analysis",
      aiseoscan: true,
      competitors: false
    },
    {
      feature: "Enterprise Content Check",
      aiseoscan: true,
      competitors: false
    },
    {
      feature: "Citation Readiness Score",
      aiseoscan: true,
      competitors: "Generic"
    },
    {
      feature: "Bing Webmaster Guidance",
      aiseoscan: true,
      competitors: false
    },
    {
      feature: "Price",
      aiseoscan: "$29",
      competitors: "$99-299"
    }
  ]

  const whyCopilot = [
    {
      stat: "180M",
      label: "Monthly Active Users",
      description: "Copilot reaches 180M+ professionals every month"
    },
    {
      stat: "73%",
      label: "Enterprise Adoption",
      description: "Used by Fortune 500 companies and decision-makers"
    },
    {
      stat: "4.3x",
      label: "Higher Conversion",
      description: "Copilot users convert 4.3x better than general search"
    },
    {
      stat: "$30/mo",
      label: "Premium Users",
      description: "High-value audience paying for Copilot Pro"
    }
  ]

  return (
    <Layout 
      title="Copilot SEO Tool: Optimize for Microsoft Copilot Citations (2026)"
      description="The only SEO tool built specifically for Microsoft Copilot optimization. Check Bing indexing, validate schema, and improve your Copilot citation rate. Free scan available."
    >
      <div className="max-w-5xl mx-auto py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-block bg-purple-900/30 px-4 py-2 rounded-full mb-6">
            <span className="text-purple-200 text-sm font-semibold">1,041 monthly searches</span>
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
            Copilot SEO Tool
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            The only SEO tool built specifically for Microsoft Copilot optimization. Check your site's readiness for Copilot citations across Bing indexing, schema markup, and enterprise content standards.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Link href="https://www.aiseoscan.dev">
              <a className="inline-flex items-center bg-gradient-to-r from-purple-500 to-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
                <Zap className="h-5 w-5 mr-2" />
                Scan Your Site for Copilot
              </a>
            </Link>
            <Link href="/ai-seo-copilot">
              <a className="inline-flex items-center bg-gray-800 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-700 transition-all duration-300 border border-gray-600">
                Copilot SEO Guide
                <ArrowRight className="h-5 w-5 ml-2" />
              </a>
            </Link>
          </div>
        </div>

        {/* Why Copilot Matters */}
        <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">
            Why Optimize for Microsoft Copilot?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyCopilot.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">{item.stat}</div>
                <div className="text-white font-semibold mb-2">{item.label}</div>
                <div className="text-gray-400 text-sm">{item.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">
            What Our Copilot SEO Tool Checks
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-6 rounded-xl border border-purple-500/50">
                  <Icon className="h-10 w-10 text-purple-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Copilot SEO Checklist */}
        <div className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">
            Copilot SEO Checklist
          </h2>
          
          <p className="text-gray-300 mb-6">
            Our Copilot SEO tool checks all of these critical factors:
          </p>

          <div className="space-y-3">
            {checklistItems.map((item, index) => (
              <div key={index} className="flex items-start bg-blue-900/20 p-4 rounded-lg">
                <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-200">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-gradient-to-r from-gray-900/60 to-emerald-900/20 backdrop-blur-sm p-8 rounded-xl border border-emerald-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">
            AISEOScan vs Traditional SEO Tools
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-emerald-500/50">
                  <th className="text-left p-4 text-gray-400 font-semibold">Feature</th>
                  <th className="text-left p-4 text-emerald-300 font-semibold">AISEOScan</th>
                  <th className="text-left p-4 text-gray-400 font-semibold">Traditional Tools</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, index) => (
                  <tr key={index} className="border-b border-gray-700/50">
                    <td className="p-4 text-white font-medium">{row.feature}</td>
                    <td className="p-4">
                      {typeof row.aiseoscan === 'boolean' ? (
                        row.aiseoscan ? (
                          <CheckCircle className="h-5 w-5 text-emerald-400" />
                        ) : (
                          <span className="text-gray-500">—</span>
                        )
                      ) : (
                        <span className="text-emerald-400 font-semibold">{row.aiseoscan}</span>
                      )}
                    </td>
                    <td className="p-4">
                      {typeof row.competitors === 'boolean' ? (
                        row.competitors ? (
                          <CheckCircle className="h-5 w-5 text-gray-400" />
                        ) : (
                          <span className="text-gray-500">—</span>
                        )
                      ) : (
                        <span className="text-gray-400">{row.competitors}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 bg-emerald-900/20 p-6 rounded-lg border-l-4 border-emerald-400">
            <p className="text-emerald-200 text-lg">
              <strong>Bottom line:</strong> Traditional SEO tools weren't built for AI search. AISEOScan is the only tool specifically designed for Copilot optimization—at 1/3 the price.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">
            How the Copilot SEO Tool Works
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-purple-500 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Enter Your URL</h3>
                <p className="text-gray-300">
                  Enter your website URL and we'll scan it instantly. No signup required for the basic free scan.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-purple-500 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Comprehensive Analysis</h3>
                <p className="text-gray-300">
                  Our tool checks 30+ factors including Bing indexing, schema markup, content quality, mobile optimization, and Copilot-specific requirements.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-purple-500 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Get Actionable Report</h3>
                <p className="text-gray-300">
                  Receive a detailed report with your Copilot readiness score, prioritized issues, and specific fixes with code examples. Premium reports ($29) include implementation guides.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-900/40 via-blue-900/40 to-purple-900/40 backdrop-blur-sm p-12 rounded-xl border border-purple-500/50 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Optimize for Microsoft Copilot?
          </h2>
          <p className="text-gray-200 text-xl mb-8 max-w-2xl mx-auto">
            Get instant analysis of your site's Copilot SEO. Free basic scan shows your readiness score and top issues.
          </p>
          
          <Link href="https://www.aiseoscan.dev">
            <a className="inline-flex items-center bg-gradient-to-r from-purple-500 to-blue-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
              <Zap className="h-6 w-6 mr-2" />
              Start Free Copilot SEO Scan
            </a>
          </Link>

          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-300">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              Instant results
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              Premium reports $29
            </div>
          </div>
        </div>

        {/* Related Tools */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-6">Related Copilot SEO Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/copilot-seo-checker">
              <a className="bg-gray-900/60 p-4 rounded-lg border border-purple-500/30 hover:border-purple-500 transition-colors group">
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold group-hover:text-purple-400 transition-colors">Copilot SEO Checker</span>
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