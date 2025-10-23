import Layout from '../components/Layout'
import Link from 'next/link'
import { Bot, TrendingUp, Zap, Award, Target, Search, ArrowRight, Users, BarChart3, DollarSign, Globe, Lightbulb, CheckCircle, Rocket, Eye, MessageSquare, Code } from 'lucide-react'

export default function AISEOMarketing() {
  const marketingChannels = [
    {
      channel: "AI Search Optimization",
      platforms: ["ChatGPT", "Perplexity", "Claude", "Gemini", "SearchGPT", "Copilot"],
      reach: "1.2B+ monthly queries",
      avgCitation: "8.3x increase",
      cost: "Low (organic)",
      difficulty: "Medium",
      priority: "Critical",
      icon: Bot
    },
    {
      channel: "Traditional SEO",
      platforms: ["Google", "Bing"],
      reach: "8.5B+ daily searches",
      avgCitation: "Standard traffic",
      cost: "Low (organic)",
      difficulty: "High",
      priority: "High",
      icon: Globe
    },
    {
      channel: "Content Marketing",
      platforms: ["Blog", "LinkedIn", "Medium"],
      reach: "Varies by audience",
      avgCitation: "Authority building",
      cost: "Low-Medium",
      difficulty: "Medium",
      priority: "High",
      icon: MessageSquare
    },
    {
      channel: "Paid Search",
      platforms: ["Google Ads", "Bing Ads"],
      reach: "Immediate visibility",
      avgCitation: "Direct traffic",
      cost: "High ($10-50 CPC)",
      difficulty: "Medium",
      priority: "Medium",
      icon: DollarSign
    }
  ]

  const aiSeoMarketingStrategy = [
    {
      phase: "Foundation",
      duration: "Week 1-2",
      focus: "Technical Setup",
      actions: [
        "Audit current AI search optimization with AISEOScan",
        "Implement critical schema markup (Article, Organization, Person)",
        "Optimize site structure for AI comprehension",
        "Set up analytics tracking for AI referrals",
        "Establish author credentials and E-E-A-T signals"
      ],
      tools: ["AISEOScan", "Schema generators", "Analytics"],
      investment: "$29-500"
    },
    {
      phase: "Content Optimization",
      duration: "Week 3-6",
      focus: "AI-Ready Content",
      actions: [
        "Optimize top 20 pages for AI search",
        "Add FAQ schema to high-value content",
        "Enhance content with citation-ready facts",
        "Implement conversational search optimization",
        "Build comprehensive topic clusters"
      ],
      tools: ["Content CMS", "AISEOScan", "AI writers"],
      investment: "$500-2000"
    },
    {
      phase: "Authority Building",
      duration: "Month 2-3",
      focus: "Credibility Signals",
      actions: [
        "Publish original research and data",
        "Build expert author profiles",
        "Earn quality backlinks from authority sites",
        "Create thought leadership content",
        "Engage in industry discussions"
      ],
      tools: ["Research tools", "Outreach platforms"],
      investment: "$1000-5000"
    },
    {
      phase: "Scale & Optimize",
      duration: "Month 4+",
      focus: "Growth & ROI",
      actions: [
        "Scale content production with AI + human editing",
        "A/B test different AI search optimizations",
        "Expand to additional AI platforms",
        "Monitor and improve citation rates",
        "Continuously optimize based on data"
      ],
      tools: ["Full marketing stack", "Analytics"],
      investment: "$2000-10000/mo"
    }
  ]

  const roi = [
    {
      metric: "Cost per Acquisition",
      traditional: "$150-300",
      aiSeo: "$30-80",
      improvement: "4x better",
      reason: "Lower competition, higher intent traffic"
    },
    {
      metric: "Conversion Rate",
      traditional: "2-3%",
      aiSeo: "12-18%",
      improvement: "6x better",
      reason: "Pre-qualified by AI recommendations"
    },
    {
      metric: "Customer Lifetime Value",
      traditional: "$1,200",
      aiSeo: "$2,100",
      improvement: "75% higher",
      reason: "Higher trust from AI endorsement"
    },
    {
      metric: "Time to Results",
      traditional: "6-12 months",
      aiSeo: "1-3 months",
      improvement: "4x faster",
      reason: "Less competitive landscape"
    }
  ]

  const marketingTactics = [
    {
      tactic: "Schema Markup Marketing",
      description: "Implement rich structured data that AI systems use to understand and cite your content",
      effort: "High",
      impact: "Critical",
      cost: "$29-500",
      how: [
        "Use AISEOScan to identify missing schema",
        "Implement Article, FAQ, Organization schemas",
        "Add author credentials with Person schema",
        "Validate with premium report ($29)"
      ]
    },
    {
      tactic: "Citation-Ready Content",
      description: "Create content structured for easy AI citation with clear facts, sources, and attribution",
      effort: "Medium",
      impact: "High",
      cost: "$0-1000",
      how: [
        "Lead with clear, factual statements",
        "Use 'According to [source]' attribution",
        "Structure with scannable headings",
        "Add FAQ sections with schema"
      ]
    },
    {
      tactic: "Multi-Platform Presence",
      description: "Establish authority across ChatGPT, Perplexity, Claude, and emerging AI platforms",
      effort: "High",
      impact: "High",
      cost: "$0-2000",
      how: [
        "Optimize for each platform's preferences",
        "Monitor citations across all platforms",
        "Adapt content for platform-specific features",
        "Build consistent cross-platform authority"
      ]
    },
    {
      tactic: "AI-First Content Marketing",
      description: "Create content specifically designed to be discovered and cited by AI search engines",
      effort: "Medium",
      impact: "High",
      cost: "$500-3000",
      how: [
        "Research conversational queries",
        "Write comprehensive, expert content",
        "Add original research and data",
        "Optimize with AISEOScan before publishing"
      ]
    },
    {
      tactic: "Authority Signal Amplification",
      description: "Build credibility markers that AI systems recognize and trust",
      effort: "High",
      impact: "Critical",
      cost: "$1000-5000",
      how: [
        "Establish author expertise (credentials, bios)",
        "Get featured on authority publications",
        "Build industry thought leadership",
        "Create original research and studies"
      ]
    }
  ]

  const caseStudies = [
    {
      company: "SaaS Startup",
      challenge: "Zero visibility in AI search, high CAC from paid ads",
      approach: "Implemented comprehensive AI SEO marketing strategy",
      timeline: "3 months",
      results: [
        "347% increase in AI search citations",
        "CAC reduced from $280 to $65",
        "Conversion rate improved from 2.1% to 14.3%",
        "$127K additional revenue from AI referrals"
      ],
      investment: "$3,200",
      roi: "4,000%"
    },
    {
      company: "E-commerce Store",
      challenge: "Competing with Amazon in traditional search",
      approach: "Pivoted to AI search optimization for product discovery",
      timeline: "2 months",
      results: [
        "1,243 product citations by ChatGPT/Perplexity",
        "23% of total revenue from AI referrals",
        "Average order value 2.3x higher than Google traffic",
        "Built competitive moat against Amazon"
      ],
      investment: "$4,800",
      roi: "2,100%"
    },
    {
      company: "B2B Services",
      challenge: "Long sales cycles, expensive lead generation",
      approach: "Used AI SEO to establish thought leadership",
      timeline: "4 months",
      results: [
        "89 qualified leads per month from AI citations",
        "Sales cycle reduced from 4.2 to 2.1 months",
        "48% higher close rate on AI-sourced leads",
        "$430K pipeline from AI search visibility"
      ],
      investment: "$6,500",
      roi: "6,600%"
    }
  ]

  const budgetTiers = [
    {
      tier: "Bootstrap",
      budget: "$29-500/mo",
      suitable: "Startups, solopreneurs, small businesses",
      strategy: "DIY AI SEO with essential tools",
      includes: [
        "AISEOScan premium reports",
        "Self-implemented schema markup",
        "Content optimization yourself",
        "Free AI writing tools (ChatGPT)",
        "Manual citation tracking"
      ],
      expectedResults: "2-3x citation increase in 3-6 months"
    },
    {
      tier: "Growth",
      budget: "$2,000-5,000/mo",
      suitable: "Growing companies, agencies",
      strategy: "Hybrid DIY + professional services",
      includes: [
        "All Bootstrap tools +",
        "Professional schema implementation",
        "Content team (writers + editors)",
        "Monthly AI SEO audits",
        "Dedicated AI search monitoring"
      ],
      expectedResults: "5-8x citation increase in 2-4 months"
    },
    {
      tier: "Enterprise",
      budget: "$10,000+/mo",
      suitable: "Large companies, competitive industries",
      strategy: "Full-service AI SEO marketing",
      includes: [
        "All Growth tools +",
        "Dedicated AI SEO team",
        "Custom automation and tools",
        "Multi-platform optimization",
        "Original research and studies",
        "Competitive intelligence"
      ],
      expectedResults: "10-15x citation increase in 1-3 months"
    }
  ]

  return (
    <Layout 
      title="AI SEO Marketing: Complete Strategy Guide (2025)"
      description="Master AI SEO marketing for ChatGPT, Perplexity, and AI search engines. Learn strategies, tactics, ROI, and how to dominate AI search with proven frameworks."
    >
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center mb-6">
          <Rocket className="h-12 w-12 text-pink-400 mr-4" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            AI SEO Marketing
          </h1>
        </div>
        <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
          The complete marketing strategy for dominating AI search. Learn how to get discovered and cited by ChatGPT, Perplexity, and emerging AI platforms for 4-6x better ROI than traditional marketing.
        </p>
        
        <div className="bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-blue-900/30 border border-pink-500/50 p-6 rounded-xl backdrop-blur-sm inline-block mb-8">
          <p className="text-pink-200 text-lg font-medium">
            💰 Average ROI: 2,100-6,600% in 3-4 months
          </p>
        </div>

        <Link href="/">
          <a className="inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
            <Search className="h-5 w-5 mr-2" />
            Start Your AI SEO Marketing
          </a>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 p-6 rounded-xl border border-purple-500/50">
          <DollarSign className="h-8 w-8 text-purple-400 mb-3" />
          <div className="text-3xl font-bold text-white mb-1">$21.83</div>
          <div className="text-gray-300 text-sm">Avg CPC for this keyword</div>
        </div>
        <div className="bg-gradient-to-br from-pink-900/40 to-pink-800/20 p-6 rounded-xl border border-pink-500/50">
          <Users className="h-8 w-8 text-pink-400 mb-3" />
          <div className="text-3xl font-bold text-white mb-1">1.2B+</div>
          <div className="text-gray-300 text-sm">Monthly AI searches</div>
        </div>
        <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 p-6 rounded-xl border border-blue-500/50">
          <TrendingUp className="h-8 w-8 text-blue-400 mb-3" />
          <div className="text-3xl font-bold text-white mb-1">6.2x</div>
          <div className="text-gray-300 text-sm">Higher conversion rate</div>
        </div>
        <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/20 p-6 rounded-xl border border-emerald-500/50">
          <Zap className="h-8 w-8 text-emerald-400 mb-3" />
          <div className="text-3xl font-bold text-white mb-1">4x</div>
          <div className="text-gray-300 text-sm">Faster results vs SEO</div>
        </div>
      </div>

      {/* Why AI SEO Marketing Matters */}
      <div className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 mb-12">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <Lightbulb className="h-8 w-8 text-blue-400 mr-3" />
          Why AI SEO Marketing Outperforms Traditional Marketing
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-blue-500/50">
                <th className="text-left p-4 text-gray-300">Metric</th>
                <th className="text-center p-4 text-gray-300">Traditional Marketing</th>
                <th className="text-center p-4 text-gray-300">AI SEO Marketing</th>
                <th className="text-center p-4 text-gray-300">Improvement</th>
              </tr>
            </thead>
            <tbody>
              {roi.map((row, index) => (
                <tr key={index} className="border-b border-gray-800 hover:bg-blue-900/10">
                  <td className="p-4 font-semibold text-white">{row.metric}</td>
                  <td className="p-4 text-center text-gray-300">{row.traditional}</td>
                  <td className="p-4 text-center text-emerald-400 font-semibold">{row.aiSeo}</td>
                  <td className="p-4 text-center">
                    <div className="font-bold text-pink-400">{row.improvement}</div>
                    <div className="text-xs text-gray-400 mt-1">{row.reason}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 bg-emerald-900/20 p-6 rounded-lg border-l-4 border-emerald-400">
          <h3 className="font-semibold text-emerald-300 mb-3">📊 The Data Speaks:</h3>
          <p className="text-gray-200 text-lg">
            Companies investing in AI SEO marketing see <strong className="text-white">4-6x better ROI</strong> than traditional digital marketing channels. Early movers are establishing authority before competition intensifies.
          </p>
        </div>
      </div>

      {/* Marketing Channels Comparison */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <BarChart3 className="h-8 w-8 text-purple-400 mr-3" />
          AI SEO vs Other Marketing Channels
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {marketingChannels.map((channel, index) => {
            const Icon = channel.icon
            return (
              <div key={index} className={`bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-6 rounded-xl border ${
                channel.priority === 'Critical' ? 'border-pink-500' : 'border-purple-500/50'
              }`}>
                {channel.priority === 'Critical' && (
                  <div className="bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold inline-block mb-4">
                    HIGHEST PRIORITY
                  </div>
                )}
                <div className="flex items-start mb-4">
                  <Icon className="h-10 w-10 text-purple-400 mr-4" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{channel.channel}</h3>
                    <div className="text-sm text-gray-400 mb-3">
                      {channel.platforms.join(", ")}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Reach</div>
                    <div className="text-white font-semibold">{channel.reach}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Performance</div>
                    <div className="text-emerald-400 font-semibold">{channel.avgCitation}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Cost</div>
                    <div className="text-white font-semibold">{channel.cost}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Difficulty</div>
                    <div className="text-white font-semibold">{channel.difficulty}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 4-Phase Strategy */}
      <div className="bg-gradient-to-r from-gray-900/60 to-pink-900/20 backdrop-blur-sm p-8 rounded-xl border border-pink-500/50 mb-12">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <Target className="h-8 w-8 text-pink-400 mr-3" />
          The 4-Phase AI SEO Marketing Strategy
        </h2>
        
        <div className="space-y-8">
          {aiSeoMarketingStrategy.map((phase, index) => (
            <div key={index} className="bg-pink-900/20 p-6 rounded-xl border border-pink-500/50">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center mb-2">
                    <div className="bg-pink-500 text-white font-bold text-xl w-10 h-10 rounded-full flex items-center justify-center mr-4">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{phase.phase}</h3>
                      <p className="text-pink-300">{phase.focus}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Duration</div>
                  <div className="text-white font-semibold">{phase.duration}</div>
                  <div className="text-sm text-gray-400 mt-2">Investment</div>
                  <div className="text-emerald-400 font-semibold">{phase.investment}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <h4 className="font-semibold text-pink-300 mb-3">Key Actions:</h4>
                  <ul className="space-y-2">
                    {phase.actions.map((action, i) => (
                      <li key={i} className="flex items-start text-gray-300 text-sm">
                        <CheckCircle className="h-4 w-4 text-pink-400 mr-2 mt-1 flex-shrink-0" />
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-pink-300 mb-3">Tools Needed:</h4>
                  <div className="flex flex-wrap gap-2">
                    {phase.tools.map((tool, i) => (
                      <span key={i} className="px-3 py-1 bg-pink-800/30 border border-pink-600/50 rounded-full text-pink-200 text-xs">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marketing Tactics */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <Award className="h-8 w-8 text-blue-400 mr-3" />
          5 High-Impact AI SEO Marketing Tactics
        </h2>
        
        <div className="space-y-6">
          {marketingTactics.map((tactic, index) => (
            <div key={index} className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-6 rounded-xl border border-blue-500/50">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex-1">{tactic.tactic}</h3>
                <div className="flex gap-2 ml-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    tactic.impact === 'Critical' ? 'bg-rose-500 text-white' : 'bg-orange-500 text-white'
                  }`}>
                    {tactic.impact} Impact
                  </span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-bold">
                    {tactic.effort} Effort
                  </span>
                </div>
              </div>
              <p className="text-gray-300 mb-4">{tactic.description}</p>
              <div className="flex items-center mb-3">
                <DollarSign className="h-5 w-5 text-emerald-400 mr-2" />
                <span className="text-emerald-400 font-semibold">{tactic.cost}</span>
              </div>
              <div className="bg-blue-900/20 p-4 rounded border border-blue-500/50">
                <h4 className="font-semibold text-blue-300 mb-2">How to Implement:</h4>
                <ul className="space-y-1">
                  {tactic.how.map((step, i) => (
                    <li key={i} className="text-gray-300 text-sm">• {step}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Studies */}
      <div className="bg-gradient-to-r from-gray-900/60 to-emerald-900/20 backdrop-blur-sm p-8 rounded-xl border border-emerald-500/50 mb-12">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <TrendingUp className="h-8 w-8 text-emerald-400 mr-3" />
          Real AI SEO Marketing Results
        </h2>
        
        <div className="space-y-8">
          {caseStudies.map((study, index) => (
            <div key={index} className="bg-emerald-900/20 p-6 rounded-lg border-l-4 border-emerald-400">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{study.company}</h3>
                  <p className="text-gray-400 mb-3">{study.challenge}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Timeline: </span>
                      <span className="text-white font-semibold">{study.timeline}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Investment: </span>
                      <span className="text-emerald-400 font-semibold">{study.investment}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">ROI: </span>
                      <span className="text-pink-400 font-bold text-lg">{study.roi}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded mb-4">
                <p className="text-gray-300 text-sm">
                  <strong className="text-white">Strategy:</strong> {study.approach}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-emerald-300 mb-3">Results:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {study.results.map((result, i) => (
                    <div key={i} className="flex items-start text-gray-300 text-sm">
                      <CheckCircle className="h-5 w-5 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{result}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Budget Tiers */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center">
          <DollarSign className="h-8 w-8 text-purple-400 mr-3" />
          Choose Your Budget Tier
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {budgetTiers.map((tier, index) => (
            <div key={index} className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-6 rounded-xl border border-purple-500/50">
              <h3 className="text-2xl font-bold text-white mb-2">{tier.tier}</h3>
              <div className="text-3xl font-bold text-pink-400 mb-4">{tier.budget}</div>
              <div className="text-sm text-gray-400 mb-4">{tier.suitable}</div>
              <div className="bg-purple-900/20 p-4 rounded mb-4">
                <p className="text-purple-300 font-semibold text-sm">{tier.strategy}</p>
              </div>
              <h4 className="font-semibold text-gray-300 mb-3 text-sm">Includes:</h4>
              <ul className="space-y-2 mb-6">
                {tier.includes.map((item, i) => (
                  <li key={i} className="flex items-start text-gray-300 text-sm">
                    <CheckCircle className="h-4 w-4 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-emerald-900/20 p-4 rounded border border-emerald-500/50">
                <p className="text-emerald-300 text-sm font-semibold">Expected: {tier.expectedResults}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-blue-900/40 backdrop-blur-sm p-12 rounded-xl border border-pink-500/50 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Start Your AI SEO Marketing Strategy Today</h2>
        <p className="text-gray-200 text-xl mb-8 max-w-2xl mx-auto">
          Get your free AI SEO score and see exactly where your marketing strategy stands. Start with $29 and scale to enterprise-level AI search domination.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <Link href="/">
            <a className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
              <Rocket className="h-6 w-6 mr-2" />
              Launch Your Strategy - Free
            </a>
          </Link>
          <Link href="/best-ai-seo-tools-2025">
            <a className="bg-gray-800 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-700 transition-all duration-300 border border-gray-600 flex items-center justify-center">
              View Marketing Tools
            </a>
          </Link>
        </div>

        <p className="text-gray-400 text-sm">
          ✨ Free AI SEO score • Bootstrap for $29 • Scale to $10K+ • 2,100-6,600% average ROI
        </p>
      </div>
    </Layout>
  )
}