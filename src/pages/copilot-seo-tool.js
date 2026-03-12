import Layout from '../components/Layout'
import Link from 'next/link'
import { Bot, CheckCircle, Zap, ArrowRight, Search, Code, FileText, Shield, Award, TrendingUp, Lightbulb, AlertTriangle } from 'lucide-react'

export default function CopilotSEOTool() {
  const whatWeCheck = [
    {
      category: "Schema Markup for Copilot",
      icon: Code,
      checks: [
        "JSON-LD structured data presence and validation",
        "Article schema with headline, author, datePublished, publisher",
        "Organization schema with company information",
        "Person/Author schema for expertise signals",
        "Open Graph tags for Microsoft ecosystem sharing",
        "FAQ schema for question-answer content",
        "Twitter Card markup"
      ],
      why: "Microsoft Copilot uses Bing's index, which relies heavily on structured data to understand content. Proper schema markup helps Copilot parse and cite your content accurately.",
      impact: "Without schema markup, Copilot may not understand what your content is about, who wrote it, or when it was published - making it far less likely to cite you.",
      howToFix: "Add JSON-LD schema markup to your pages. Our scanner shows exactly which schema types are missing and provides code examples in the premium report."
    },
    {
      category: "Content Structure & Quality",
      icon: FileText,
      checks: [
        "Proper heading hierarchy (H1 → H2 → H3)",
        "Single H1 tag presence (Copilot prefers clear page topics)",
        "FAQ sections with question-answer format",
        "Content depth analysis (word count)",
        "Author attribution and credentials",
        "Publication and update dates",
        "Factual density (ratio of specific facts vs general statements)",
        "Readability and sentence structure"
      ],
      why: "Copilot's enterprise user base (73% professionals) expects well-structured, authoritative content. Clear headings and FAQ sections help Copilot extract relevant information.",
      impact: "Well-structured content with clear headings makes it easy for Copilot to understand your content hierarchy and extract specific facts for citations. Content without structure gets ignored.",
      howToFix: "Organize content with clear H1-H3 headings, add FAQ sections for common questions, ensure proper author attribution, and aim for 1,500+ words on important pages."
    },
    {
      category: "Technical Optimization",
      icon: Zap,
      checks: [
        "HTTPS/SSL security (required for Bing trust)",
        "Mobile viewport tag (Bing prioritizes mobile-friendly sites)",
        "Semantic HTML structure (main, article, section tags)",
        "Page speed (render-blocking resources detection)",
        "Clean, descriptive URLs",
        "Internal linking structure"
      ],
      why: "Copilot pulls from Bing's index. Sites must meet Bing's technical standards: HTTPS security, mobile optimization, and fast loading.",
      impact: "Technical issues can prevent Bing from properly indexing your site, which means Copilot won't see your content at all. HTTPS is especially critical - non-secure sites get deprioritized.",
      howToFix: "Enable HTTPS site-wide, add viewport meta tag for mobile, use semantic HTML tags, and optimize page speed by removing render-blocking resources."
    },
    {
      category: "Authority & Trust Signals",
      icon: Shield,
      checks: [
        "About page link presence",
        "Contact information availability",
        "Privacy policy link",
        "Terms of service link"
      ],
      why: "Copilot evaluates site trustworthiness before citing. Professional sites with clear about pages, contact info, and legal pages signal legitimacy.",
      impact: "Sites without clear authority signals appear less trustworthy to both Copilot and users. Enterprise Copilot users expect professional, legitimate sources.",
      howToFix: "Create a comprehensive About page, add clear contact information (not just a form), and include privacy policy and terms of service links in your footer."
    }
  ]

  const copilotSpecifics = [
    {
      title: "Copilot Uses Bing's Index Exclusively",
      description: "Unlike ChatGPT which searches the web in real-time or Perplexity which uses multiple sources, Copilot pulls exclusively from Bing's search index. This means:",
      points: [
        "Your site must be indexed by Bing (use Bing Webmaster Tools to verify)",
        "Bing's ranking factors directly impact Copilot visibility",
        "Schema markup is critical - Bing relies heavily on structured data",
        "Mobile optimization matters more on Bing than some other search engines"
      ]
    },
    {
      title: "Enterprise Professional Audience",
      description: "73% of Copilot users are enterprise professionals using it for business research and decision-making. This means:",
      points: [
        "Content should be professional, not casual or conversational",
        "Factual accuracy and specific data matter more than general advice",
        "Author credentials and expertise signals are heavily weighted",
        "B2B and professional content performs better than consumer content"
      ]
    },
    {
      title: "Integrated Across Microsoft Ecosystem",
      description: "Copilot is deeply integrated into Microsoft products, reaching users where they work:",
      points: [
        "Built into Microsoft 365 (Word, Excel, PowerPoint, Outlook)",
        "Available in Edge browser and Windows search",
        "Used by employees at Fortune 500 companies",
        "Citations often lead to company-wide content discovery"
      ]
    }
  ]

  const optimizationPriorities = [
    {
      priority: "Critical (Do First)",
      items: [
        {
          task: "Enable HTTPS site-wide",
          why: "Bing deprioritizes non-secure sites. This is table stakes.",
          time: "1-2 hours"
        },
        {
          task: "Add Article schema markup",
          why: "Helps Copilot understand your content structure and author credentials",
          time: "30-60 minutes per page"
        },
        {
          task: "Add mobile viewport tag",
          why: "Bing prioritizes mobile-friendly sites for indexing",
          time: "5 minutes"
        }
      ]
    },
    {
      priority: "High (Do This Week)",
      items: [
        {
          task: "Fix heading hierarchy",
          why: "Single H1, logical H2/H3 structure helps Copilot parse content",
          time: "2-4 hours for main pages"
        },
        {
          task: "Add FAQ sections",
          why: "Copilot loves Q&A format content for direct answer extraction",
          time: "1-2 hours per page"
        },
        {
          task: "Create About page with author credentials",
          why: "Enterprise users expect to know who they're learning from",
          time: "2-3 hours"
        }
      ]
    },
    {
      priority: "Medium (Do This Month)",
      items: [
        {
          task: "Expand thin content to 1,500+ words",
          why: "Copilot users expect comprehensive, detailed information",
          time: "4-8 hours per page"
        },
        {
          task: "Add Organization schema",
          why: "Helps Copilot understand your company/brand",
          time: "30 minutes"
        },
        {
          task: "Optimize page speed",
          why: "Fast sites get crawled more frequently by Bing",
          time: "Varies - 2-8 hours"
        }
      ]
    }
  ]

  const commonMistakes = [
    {
      mistake: "Assuming Google SEO = Copilot SEO",
      reality: "Bing's algorithm differs from Google's. Bing weights schema markup more heavily, has different mobile optimization requirements, and evaluates authority signals differently.",
      fix: "Use our tool to check Bing-specific factors, not just general SEO best practices."
    },
    {
      mistake: "Ignoring Schema Markup",
      reality: "75% of sites we scan have missing or incomplete schema markup. This is the #1 reason sites don't get cited by Copilot.",
      fix: "Add Article, Organization, and Person schema at minimum. Our premium report ($29) provides copy-paste schema code."
    },
    {
      mistake: "Writing Casual, Conversational Content",
      reality: "Copilot's enterprise user base expects professional, authoritative content. What works for ChatGPT (conversational) doesn't work for Copilot (professional).",
      fix: "Adopt a professional tone, include data and statistics, cite sources, and display author credentials prominently."
    },
    {
      mistake: "Only Optimizing Desktop Experience",
      reality: "Bing prioritizes mobile-friendly sites more than many realize. Missing mobile viewport tag = poor Copilot visibility.",
      fix: "Ensure responsive design, add viewport meta tag, test on actual mobile devices."
    }
  ]

  const realWorldExample = {
    before: {
      score: 42,
      issues: [
        "No schema markup",
        "Missing HTTPS",
        "No H1 tag on main pages",
        "Thin content (avg 450 words)",
        "No about page or contact info"
      ]
    },
    after: {
      score: 87,
      changes: [
        "Added Article + Organization schema to all pages",
        "Enabled HTTPS site-wide",
        "Fixed heading hierarchy (H1 → H2 → H3)",
        "Expanded content to 2,000+ words with FAQs",
        "Created About page with team credentials"
      ]
    },
    result: "Went from 0 Copilot citations to being cited 3-5x per week for target business keywords within 6 weeks.",
    industry: "B2B SaaS Company"
  }

  return (
    <Layout 
      title="Copilot SEO Tool: Check Microsoft Copilot Optimization (Free)"
      description="Free Copilot SEO checker. Scan your website for schema markup, content structure, and technical optimization that Microsoft Copilot needs to cite your content."
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
            Free tool to check your Microsoft Copilot optimization. Scan for schema markup, content structure, technical SEO, and authority signals that Copilot needs to understand and cite your content.
          </p>
          
          <Link href="https://www.aiseoscan.dev">
            <a className="inline-flex items-center bg-gradient-to-r from-purple-500 to-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
              <Zap className="h-5 w-5 mr-2" />
              Check Your Copilot SEO Free
            </a>
          </Link>
        </div>

        {/* Why Copilot Matters */}
        <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">
            Why Optimize for Microsoft Copilot?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center bg-purple-900/30 p-6 rounded-lg">
              <div className="text-4xl font-bold text-purple-400 mb-2">180M</div>
              <div className="text-white font-semibold mb-2">Monthly Active Users</div>
              <div className="text-gray-400 text-sm">Integrated into Microsoft 365, Edge, and Windows</div>
            </div>
            <div className="text-center bg-purple-900/30 p-6 rounded-lg">
              <div className="text-4xl font-bold text-purple-400 mb-2">73%</div>
              <div className="text-white font-semibold mb-2">Enterprise Users</div>
              <div className="text-gray-400 text-sm">Professionals making business decisions</div>
            </div>
            <div className="text-center bg-purple-900/30 p-6 rounded-lg">
              <div className="text-4xl font-bold text-purple-400 mb-2">Bing</div>
              <div className="text-white font-semibold mb-2">Powered By</div>
              <div className="text-gray-400 text-sm">Pulls exclusively from Bing's index</div>
            </div>
          </div>

          <div className="bg-purple-900/20 p-6 rounded-lg border-l-4 border-purple-400">
            <p className="text-purple-200">
              <strong>Key insight:</strong> Copilot reaches 180M+ enterprise professionals through Microsoft 365 (Word, Excel, PowerPoint), Edge browser, and Windows. Unlike consumer-focused AI search engines, Copilot's users are business decision-makers with high purchasing power and influence.
            </p>
          </div>
        </div>

        {/* What We Check */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">
            What Our Copilot SEO Tool Checks
          </h2>
          
          <div className="space-y-8">
            {whatWeCheck.map((section, index) => {
              const Icon = section.icon
              return (
                <div key={index} className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50">
                  <div className="flex items-start mb-4">
                    <Icon className="h-10 w-10 text-purple-400 mr-4 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-4">{section.category}</h3>
                      
                      <div className="mb-4">
                        <h4 className="text-purple-300 font-semibold mb-3">We Check For:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {section.checks.map((check, cIndex) => (
                            <div key={cIndex} className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">{check}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="bg-purple-900/30 p-4 rounded border border-purple-500/50">
                          <p className="text-purple-200 text-sm">
                            <strong>Why this matters:</strong> {section.why}
                          </p>
                        </div>

                        <div className="bg-blue-900/30 p-4 rounded border border-blue-500/50">
                          <p className="text-blue-200 text-sm">
                            <strong>Impact if missing:</strong> {section.impact}
                          </p>
                        </div>

                        <div className="bg-emerald-900/30 p-4 rounded border border-emerald-500/50">
                          <p className="text-emerald-200 text-sm">
                            <strong>How to fix:</strong> {section.howToFix}
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

        {/* Copilot-Specific Insights */}
        <div className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">
            What Makes Copilot Different from Other AI Search Engines
          </h2>

          <div className="space-y-6">
            {copilotSpecifics.map((item, index) => (
              <div key={index} className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/50">
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-300 mb-4">{item.description}</p>
                <ul className="space-y-2">
                  {item.points.map((point, pIndex) => (
                    <li key={pIndex} className="flex items-start">
                      <ArrowRight className="h-4 w-4 text-blue-400 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Optimization Priorities */}
        <div className="bg-gradient-to-r from-gray-900/60 to-emerald-900/20 backdrop-blur-sm p-8 rounded-xl border border-emerald-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Lightbulb className="h-8 w-8 text-emerald-400 mr-3" />
            Copilot SEO Optimization Roadmap
          </h2>

          <p className="text-gray-300 mb-8">
            Based on scanning thousands of sites, here's the priority order for Copilot optimization:
          </p>

          {optimizationPriorities.map((priority, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className={`px-4 py-1 rounded-full text-sm font-bold mr-3 ${
                  priority.priority.includes('Critical') ? 'bg-rose-500 text-white' :
                  priority.priority.includes('High') ? 'bg-orange-500 text-white' :
                  'bg-yellow-500 text-white'
                }`}>
                  {priority.priority}
                </span>
              </h3>
              <div className="space-y-4">
                {priority.items.map((item, iIndex) => (
                  <div key={iIndex} className="bg-emerald-900/20 p-5 rounded-lg border border-emerald-500/50">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-bold text-white">{item.task}</h4>
                      <span className="text-emerald-400 text-sm font-semibold whitespace-nowrap ml-4">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm">{item.why}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Common Mistakes */}
        <div className="bg-gradient-to-r from-gray-900/60 to-rose-900/20 backdrop-blur-sm p-8 rounded-xl border border-rose-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <AlertTriangle className="h-8 w-8 text-rose-400 mr-3" />
            4 Common Copilot SEO Mistakes
          </h2>

          <div className="space-y-6">
            {commonMistakes.map((item, index) => (
              <div key={index} className="bg-rose-900/20 p-6 rounded-lg border-l-4 border-rose-400">
                <h3 className="text-xl font-bold text-rose-300 mb-3">❌ {item.mistake}</h3>
                <p className="text-gray-300 mb-3">
                  <strong className="text-white">Reality:</strong> {item.reality}
                </p>
                <div className="bg-emerald-900/20 p-4 rounded border border-emerald-500/50">
                  <p className="text-emerald-200 text-sm">
                    <strong>Fix:</strong> {item.fix}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real World Example */}
        <div className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <TrendingUp className="h-8 w-8 text-blue-400 mr-3" />
            Real Results: Before & After
          </h2>

          <div className="bg-blue-900/20 p-6 rounded-lg mb-4">
            <p className="text-blue-200 font-semibold mb-2">Industry: {realWorldExample.industry}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-rose-900/20 p-6 rounded-lg border border-rose-500/50">
              <h3 className="text-xl font-bold text-white mb-4">Before (Score: {realWorldExample.before.score}/100)</h3>
              <ul className="space-y-2">
                {realWorldExample.before.issues.map((issue, index) => (
                  <li key={index} className="flex items-start text-gray-300 text-sm">
                    <span className="text-rose-400 mr-2">✗</span>
                    {issue}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-emerald-900/20 p-6 rounded-lg border border-emerald-500/50">
              <h3 className="text-xl font-bold text-white mb-4">After (Score: {realWorldExample.after.score}/100)</h3>
              <ul className="space-y-2">
                {realWorldExample.after.changes.map((change, index) => (
                  <li key={index} className="flex items-start text-gray-300 text-sm">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                    {change}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-emerald-900/30 p-6 rounded-lg border-l-4 border-emerald-400">
            <p className="text-emerald-200 font-semibold">
              Result: {realWorldExample.result}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-900/40 via-blue-900/40 to-purple-900/40 backdrop-blur-sm p-12 rounded-xl border border-purple-500/50 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Check Your Copilot SEO Now
          </h2>
          <p className="text-gray-200 text-xl mb-8 max-w-2xl mx-auto">
            See how well your website is optimized for Microsoft Copilot. Free scan shows your score across schema, content, technical SEO, and authority. Get specific recommendations with priority ordering.
          </p>
          
          <Link href="https://www.aiseoscan.dev">
            <a className="inline-flex items-center bg-gradient-to-r from-purple-500 to-blue-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
              <Search className="h-6 w-6 mr-2" />
              Start Free Copilot SEO Check
            </a>
          </Link>

          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-300">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              No signup required
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              Results in 30 seconds
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              Premium reports $29
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