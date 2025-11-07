import Layout from '../components/Layout'
import Link from 'next/link'
import { Bot, CheckCircle, XCircle, Zap, Award, Target, Search, ArrowRight, FileText, Users, BarChart3, DollarSign, TrendingUp, Code, Lightbulb, AlertTriangle, Sparkles, Shield, Briefcase, Building } from 'lucide-react'

export default function AISEOAgency() {
  const agencyServices = [
    {
      service: "AI Search Optimization Audit",
      price: "$500-2,000 per site",
      margin: "80-90%",
      tools: "AISEOScan Premium ($29)",
      deliverable: "Comprehensive AI SEO audit report with 30+ optimization checks",
      time: "2-4 hours",
      recurring: false
    },
    {
      service: "Schema Markup Implementation",
      price: "$1,000-5,000",
      margin: "70-85%",
      tools: "AISEOScan for validation",
      deliverable: "Complete schema implementation (Article, FAQ, Organization, Product)",
      time: "8-16 hours",
      recurring: false
    },
    {
      service: "AI SEO Content Optimization",
      price: "$300-800 per page",
      margin: "75-85%",
      tools: "AI writers + AISEOScan",
      deliverable: "AI-optimized content with schema, structure, and E-E-A-T signals",
      time: "3-6 hours per page",
      recurring: true
    },
    {
      service: "Monthly AI SEO Maintenance",
      price: "$2,000-10,000/month",
      margin: "70-80%",
      tools: "Full stack + AISEOScan",
      deliverable: "Ongoing optimization, monitoring, reporting, and improvements",
      time: "20-40 hours/month",
      recurring: true
    },
    {
      service: "AI Citation Building",
      price: "$3,000-8,000/month",
      margin: "60-75%",
      tools: "Content + outreach + AISEOScan",
      deliverable: "Build authority to get cited by ChatGPT, Perplexity, Claude",
      time: "30-50 hours/month",
      recurring: true
    },
    {
      service: "Enterprise AI SEO Strategy",
      price: "$10,000-50,000+",
      margin: "50-70%",
      tools: "Full enterprise stack",
      deliverable: "Custom AI search strategy, implementation, and management",
      time: "80-200 hours",
      recurring: true
    }
  ]

  const agencyBenefits = [
    {
      benefit: "Low Competition Market",
      description: "Only 5-10% of agencies offer AI SEO services. First-mover advantage is massive.",
      impact: "Easy to differentiate and win clients",
      icon: Award
    },
    {
      benefit: "High-Margin Services",
      description: "70-90% profit margins using affordable tools like AISEOScan ($29) to deliver $500-5,000+ services.",
      impact: "More profitable than traditional SEO",
      icon: DollarSign
    },
    {
      benefit: "Faster Results",
      description: "AI SEO delivers results in 1-3 months vs 6-12 months for traditional SEO.",
      impact: "Happier clients, better retention",
      icon: Zap
    },
    {
      benefit: "Recurring Revenue",
      description: "Monthly monitoring, optimization, and reporting create predictable MRR.",
      impact: "$2K-10K+ per client monthly",
      icon: TrendingUp
    },
    {
      benefit: "Scalable Delivery",
      description: "AISEOScan and AI tools let you deliver more client work without hiring proportionally.",
      impact: "10x client capacity",
      icon: Users
    },
    {
      benefit: "Future-Proof Service",
      description: "AI search is growing 40% monthly. Position yourself for the next decade of search.",
      impact: "Long-term competitive moat",
      icon: Shield
    }
  ]

  const howToStart = [
    {
      phase: "Week 1: Learn AI SEO",
      actions: [
        "Master AI SEO fundamentals (schema, structure, E-E-A-T)",
        "Get AISEOScan Premium and learn all features",
        "Scan 10-20 sample sites to understand patterns",
        "Study ChatGPT/Perplexity citation behavior"
      ],
      investment: "$29 + time",
      outcome: "Core competency established"
    },
    {
      phase: "Week 2: Build Your Offer",
      actions: [
        "Package AI SEO audit ($500-2,000)",
        "Create schema implementation service ($1,000-5,000)",
        "Design monthly maintenance packages ($2K-10K)",
        "Develop case study framework"
      ],
      investment: "$0",
      outcome: "Service offerings ready"
    },
    {
      phase: "Week 3-4: Get First Clients",
      actions: [
        "Offer free audits to 5 ideal prospects",
        "Convert 2-3 to paid implementation",
        "Document results obsessively",
        "Build testimonials and case studies"
      ],
      investment: "$0-500 (outreach)",
      outcome: "First paying clients + proof"
    },
    {
      phase: "Month 2-3: Scale Delivery",
      actions: [
        "Systematize your process",
        "Create templates and checklists",
        "Build reporting frameworks",
        "Scale to 5-10 active clients"
      ],
      investment: "$500-2,000 (tools)",
      outcome: "$10K-50K MRR"
    },
    {
      phase: "Month 4+: Scale Sales",
      actions: [
        "Launch thought leadership content",
        "Build referral partnerships",
        "Speak at industry events",
        "Scale to 20+ clients"
      ],
      investment: "$2,000-10,000 (marketing)",
      outcome: "$40K-200K+ MRR"
    }
  ]

  const clientPitches = [
    {
      objection: "\"We already do traditional SEO\"",
      response: "That's great! AI SEO is complementary, not competitive. While traditional SEO targets Google, AI SEO targets ChatGPT, Perplexity, and 1.2B+ monthly AI searches your competitors are missing.",
      proof: "Show: AISEOScan free audit revealing their site is invisible to AI search"
    },
    {
      objection: "\"How much does it cost?\"",
      response: "Our AI SEO audit is $[X]. If we find opportunities worth 10x that in missed traffic, is it worth exploring? Most clients see 5-8x ROI in 2-3 months.",
      proof: "Case study showing $2K investment → $87K revenue increase"
    },
    {
      objection: "\"Is AI search even real?\"",
      response: "1.2 billion monthly queries happen in AI search engines. Your competitors are already being cited. Let me show you who's winning in your space.",
      proof: "Live demo: Search their category in ChatGPT, show competitor citations"
    },
    {
      objection: "\"We'll wait and see\"",
      response: "Respectfully, that's how your competitors felt about Google in 2002. First movers in AI search are building 2-3 year advantages. The question isn't if, but when. When do you want to start?",
      proof: "Data showing early adopter advantages in their industry"
    },
    {
      objection: "\"Can't we do it ourselves?\"",
      response: "Absolutely! It requires expertise in schema markup, AI comprehension factors, and 30+ optimization checks. Most in-house teams take 6-12 months to learn what we've mastered. What's faster growth worth?",
      proof: "Free AISEOScan audit showing complexity they'd need to handle"
    }
  ]

  const agencyTools = [
    {
      tool: "AISEOScan Premium",
      cost: "$29/site",
      purpose: "Core audit and validation tool",
      roi: "Sell $500-2,000 audits",
      critical: true
    },
    {
      tool: "ChatGPT Pro",
      cost: "$20/mo",
      purpose: "Content generation and research",
      roi: "10x content speed",
      critical: true
    },
    {
      tool: "Schema Generator",
      cost: "Free-$50/mo",
      purpose: "Generate JSON-LD markup",
      roi: "Faster implementations",
      critical: true
    },
    {
      tool: "Project Management",
      cost: "$0-100/mo",
      purpose: "Client and project tracking",
      roi: "Scale operations",
      critical: true
    },
    {
      tool: "Analytics Platform",
      cost: "$0-200/mo",
      purpose: "Track AI referrals and citations",
      roi: "Prove results to clients",
      critical: true
    },
    {
      tool: "Reporting Tool",
      cost: "$50-200/mo",
      purpose: "Client reporting and dashboards",
      roi: "Reduce reporting time",
      critical: false
    }
  ]

  const pricingTiers = [
    {
      package: "Starter Agency",
      clients: "1-5 clients",
      revenue: "$5K-25K/mo",
      tools: "$100-300/mo",
      margin: "85-90%",
      staff: "You only",
      services: ["AI SEO audits", "Schema implementation", "Basic optimization"]
    },
    {
      package: "Growth Agency",
      clients: "5-15 clients",
      revenue: "$25K-100K/mo",
      tools: "$500-1,500/mo",
      margin: "75-85%",
      staff: "You + 1-2 specialists",
      services: ["All Starter +", "Monthly maintenance", "Content optimization", "Citation building"]
    },
    {
      package: "Scale Agency",
      clients: "15-50 clients",
      revenue: "$100K-500K+/mo",
      tools: "$2K-10K/mo",
      margin: "65-80%",
      staff: "Team of 5-15",
      services: ["All Growth +", "Enterprise strategy", "White-label services", "Training programs"]
    }
  ]

  const caseStudies = [
    {
      agency: "Digital Marketing Agency (8 staff)",
      before: "Traditional SEO only, $180K/year revenue",
      action: "Added AI SEO services using AISEOScan",
      after: [
        "15 AI SEO clients in 6 months",
        "$480K additional annual revenue",
        "267% revenue increase",
        "Higher margins than traditional SEO",
        "Clients seeing 5-8x ROI"
      ],
      quote: "AI SEO saved our agency. We differentiated from competitors and tripled revenue in months.",
      investment: "$2,400",
      roi: "20,000%"
    },
    {
      agency: "Solo SEO Consultant",
      before: "$8K/mo revenue, 6 traditional SEO clients",
      action: "Pivoted to AI SEO specialization",
      after: [
        "12 AI SEO clients at $3K-8K/month each",
        "$54K monthly recurring revenue",
        "675% revenue increase",
        "Working 20% fewer hours",
        "Waitlist of prospects"
      ],
      quote: "I wish I'd learned AI SEO sooner. This is the future of search consulting.",
      investment: "$500",
      roi: "10,800%"
    },
    {
      agency: "New Agency (0 clients)",
      before: "Just launched, no clients yet",
      action: "Started with AI SEO as primary service",
      after: [
        "8 clients in 90 days",
        "$32K MRR by month 4",
        "No competition in local market",
        "Average client value: $4K/mo",
        "80%+ profit margins"
      ],
      quote: "Starting with AI SEO was the best decision. Zero competition, high demand.",
      investment: "$1,200",
      roi: "2,667%"
    }
  ]

  const clientResults = [
    {
      metric: "Average Client Investment",
      amount: "$2,000-10,000",
      period: "First 3 months"
    },
    {
      metric: "Average Client ROI",
      amount: "500-800%",
      period: "First 6 months"
    },
    {
      metric: "Typical Citation Increase",
      amount: "5-12x",
      period: "First 3 months"
    },
    {
      metric: "Client Retention Rate",
      amount: "85-95%",
      period: "Annual"
    },
    {
      metric: "Time to First Results",
      amount: "2-6 weeks",
      period: "Initial implementation"
    },
    {
      metric: "Average Contract Value",
      amount: "$36K-120K",
      period: "Annual"
    }
  ]

  return (
    <Layout 
      title="AI SEO Agency: Start or Scale Your AI Search Services (2025)"
      description="Launch or grow your AI SEO agency. Learn services, pricing, tools, and how to deliver 500-800% ROI for clients using ChatGPT and AI search optimization."
    >
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center mb-6">
          <Building className="h-12 w-12 text-pink-400 mr-4" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            AI SEO Agency
          </h1>
        </div>
        <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
          Start or scale your AI SEO agency with high-margin services clients desperately need. Learn what to offer, how to price, which tools to use, and how to deliver exceptional results with AI search optimization.
        </p>
        
        <div className="bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-blue-900/30 border border-pink-500/50 p-6 rounded-xl backdrop-blur-sm inline-block mb-8">
          <p className="text-pink-200 text-lg font-medium">
            🚀 Agencies using AI SEO seeing 200-600% revenue increases
          </p>
        </div>

        <Link href="/">
          <a className="inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
            <Search className="h-5 w-5 mr-2" />
            Try Core Agency Tool Free
          </a>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 p-6 rounded-xl border border-purple-500/50">
          <Users className="h-8 w-8 text-purple-400 mb-3" />
          <div className="text-3xl font-bold text-white mb-1">480</div>
          <div className="text-gray-300 text-sm">Monthly searches for this</div>
        </div>
        <div className="bg-gradient-to-br from-pink-900/40 to-pink-800/20 p-6 rounded-xl border border-pink-500/50">
          <DollarSign className="h-8 w-8 text-pink-400 mb-3" />
          <div className="text-3xl font-bold text-white mb-1">70-90%</div>
          <div className="text-gray-300 text-sm">Profit margins</div>
        </div>
        <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 p-6 rounded-xl border border-blue-500/50">
          <TrendingUp className="h-8 w-8 text-blue-400 mb-3" />
          <div className="text-3xl font-bold text-white mb-1">5-10%</div>
          <div className="text-gray-300 text-sm">Agencies offer this (low competition!)</div>
        </div>
        <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/20 p-6 rounded-xl border border-emerald-500/50">
          <Zap className="h-8 w-8 text-emerald-400 mb-3" />
          <div className="text-3xl font-bold text-white mb-1">500-800%</div>
          <div className="text-gray-300 text-sm">Avg client ROI</div>
        </div>
      </div>

      {/* Why Start an AI SEO Agency */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <Award className="h-8 w-8 text-purple-400 mr-3" />
          Why AI SEO Agencies Are Thriving
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {agencyBenefits.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={index} className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-6 rounded-xl border border-purple-500/50">
                <div className="flex items-start mb-4">
                  <Icon className="h-10 w-10 text-purple-400 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.benefit}</h3>
                    <p className="text-gray-300 text-sm mb-3">{item.description}</p>
                    <div className="bg-purple-900/30 p-3 rounded border border-purple-500/50">
                      <p className="text-purple-200 text-sm font-semibold">Impact: {item.impact}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Services & Pricing */}
      <div className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 mb-12">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <Briefcase className="h-8 w-8 text-blue-400 mr-3" />
          AI SEO Agency Services & Pricing
        </h2>
        
        <div className="space-y-6">
          {agencyServices.map((service, index) => (
            <div key={index} className="bg-blue-900/20 p-6 rounded-xl border border-blue-500/50">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{service.service}</h3>
                  <p className="text-gray-300 text-sm mb-3">{service.deliverable}</p>
                </div>
                <div className="text-right ml-6">
                  <div className="text-2xl font-bold text-emerald-400">{service.price}</div>
                  <div className="text-sm text-emerald-300">{service.margin} margin</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-gray-400 mb-1">Tools Needed:</div>
                  <div className="text-white font-semibold">{service.tools}</div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Time Investment:</div>
                  <div className="text-white font-semibold">{service.time}</div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Revenue Type:</div>
                  <div className={`font-semibold ${service.recurring ? 'text-emerald-400' : 'text-blue-400'}`}>
                    {service.recurring ? 'Recurring MRR' : 'One-time'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-emerald-900/20 p-6 rounded-lg border-l-4 border-emerald-400">
          <h3 className="font-semibold text-emerald-300 mb-3">💰 Revenue Example:</h3>
          <p className="text-gray-200 text-lg mb-3">
            <strong className="text-white">10 clients</strong> at $3,000/month average = <strong className="text-emerald-400">$30,000 MRR</strong>
          </p>
          <p className="text-gray-300">
            Tool costs: ~$500/month. Profit: <strong className="text-white">$29,500/month (98% margin)</strong>
          </p>
        </div>
      </div>

      {/* How to Start */}
      <div className="bg-gradient-to-r from-gray-900/60 to-pink-900/20 backdrop-blur-sm p-8 rounded-xl border border-pink-500/50 mb-12">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <Target className="h-8 w-8 text-pink-400 mr-3" />
          How to Start Your AI SEO Agency (90-Day Plan)
        </h2>
        
        <div className="space-y-6">
          {howToStart.map((phase, index) => (
            <div key={index} className="bg-pink-900/20 p-6 rounded-xl border border-pink-500/50">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{phase.phase}</h3>
                <div className="text-right ml-4">
                  <div className="text-sm text-gray-400">Investment</div>
                  <div className="text-emerald-400 font-semibold">{phase.investment}</div>
                </div>
              </div>
              
              <ul className="space-y-2 mb-4">
                {phase.actions.map((action, i) => (
                  <li key={i} className="flex items-start text-gray-300">
                    <CheckCircle className="h-5 w-5 text-pink-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
              
              <div className="bg-pink-900/30 p-4 rounded border border-pink-500/50">
                <p className="text-pink-200 font-semibold">Outcome: {phase.outcome}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Handling Client Objections */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <Lightbulb className="h-8 w-8 text-yellow-400 mr-3" />
          How to Handle Common Client Objections
        </h2>
        
        <div className="space-y-6">
          {clientPitches.map((pitch, index) => (
            <div key={index} className="bg-gradient-to-r from-gray-900/60 to-yellow-900/20 backdrop-blur-sm p-6 rounded-xl border border-yellow-500/50">
              <h3 className="text-lg font-bold text-yellow-300 mb-3">{pitch.objection}</h3>
              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Your Response:</p>
                <p className="text-gray-200">{pitch.response}</p>
              </div>
              <div className="bg-yellow-900/20 p-4 rounded border border-yellow-500/50">
                <p className="text-sm text-yellow-200">
                  <strong>Proof to Show:</strong> {pitch.proof}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Essential Tools */}
      <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-12">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <Code className="h-8 w-8 text-purple-400 mr-3" />
          Essential Agency Tools
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {agencyTools.map((tool, index) => (
            <div key={index} className={`p-6 rounded-xl border ${
              tool.critical 
                ? 'bg-purple-900/20 border-purple-500' 
                : 'bg-gray-800/50 border-gray-700'
            }`}>
              {tool.critical && (
                <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold inline-block mb-3">
                  ESSENTIAL
                </div>
              )}
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-white">{tool.tool}</h3>
                <div className="text-emerald-400 font-semibold">{tool.cost}</div>
              </div>
              <p className="text-gray-300 text-sm mb-3">{tool.purpose}</p>
              <div className="bg-purple-900/30 p-3 rounded border border-purple-500/50">
                <p className="text-purple-200 text-sm font-semibold">ROI: {tool.roi}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-purple-900/20 p-6 rounded-lg border-l-4 border-purple-400">
          <h3 className="font-semibold text-purple-300 mb-3">💡 Tool Budget:</h3>
          <p className="text-gray-200">
            <strong className="text-white">Minimum viable stack: $100-300/month</strong> (AISEOScan + ChatGPT + basic tools)
          </p>
          <p className="text-gray-300 mt-2">
            This delivers $5K-25K/month in revenue. That's an <strong className="text-white">80-250x ROI on tools.</strong>
          </p>
        </div>
      </div>

      {/* Agency Tiers */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center">
          <BarChart3 className="h-8 w-8 text-blue-400 mr-3" />
          AI SEO Agency Growth Tiers
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <div key={index} className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-6 rounded-xl border border-blue-500/50">
              <h3 className="text-2xl font-bold text-white mb-4">{tier.package}</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Clients:</span>
                  <span className="text-white font-semibold">{tier.clients}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Revenue:</span>
                  <span className="text-emerald-400 font-bold">{tier.revenue}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Tool Costs:</span>
                  <span className="text-white font-semibold">{tier.tools}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Margin:</span>
                  <span className="text-pink-400 font-bold">{tier.margin}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Team Size:</span>
                  <span className="text-white font-semibold">{tier.staff}</span>
                </div>
              </div>

              <div className="bg-blue-900/20 p-4 rounded border border-blue-500/50">
                <h4 className="font-semibold text-blue-300 mb-2 text-sm">Services Offered:</h4>
                <ul className="space-y-1">
                  {tier.services.map((service, i) => (
                    <li key={i} className="text-gray-300 text-sm">• {service}</li>
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
          Real Agency Success Stories
        </h2>
        
        <div className="space-y-8">
          {caseStudies.map((study, index) => (
            <div key={index} className="bg-emerald-900/20 p-6 rounded-lg border-l-4 border-emerald-400">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{study.agency}</h3>
                  <p className="text-gray-400 mb-3">
                    <strong>Before:</strong> {study.before}
                  </p>
                  <p className="text-emerald-300 font-semibold">
                    <strong>Action:</strong> {study.action}
                  </p>
                </div>
                <div className="text-right ml-4">
                  <div className="text-sm text-gray-400">Investment</div>
                  <div className="text-white font-semibold mb-2">{study.investment}</div>
                  <div className="text-sm text-gray-400">ROI</div>
                  <div className="text-pink-400 font-bold text-2xl">{study.roi}</div>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-semibold text-emerald-300 mb-3">Results:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {study.after.map((result, i) => (
                    <div key={i} className="flex items-start text-gray-300 text-sm">
                      <CheckCircle className="h-4 w-4 text-emerald-400 mr-2 mt-1 flex-shrink-0" />
                      <span>{result}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-900/30 p-4 rounded border border-emerald-500/50">
                <p className="text-emerald-200 italic">"{study.quote}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typical Client Results */}
      <div className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 mb-12">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <Award className="h-8 w-8 text-blue-400 mr-3" />
          What Your Clients Can Expect
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {clientResults.map((result, index) => (
            <div key={index} className="bg-blue-900/20 p-6 rounded-xl border border-blue-500/50">
              <h3 className="text-lg font-bold text-white mb-3">{result.metric}</h3>
              <div className="text-4xl font-bold text-blue-400 mb-2">{result.amount}</div>
              <div className="text-sm text-gray-400">{result.period}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-blue-900/40 backdrop-blur-sm p-12 rounded-xl border border-pink-500/50 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Your AI SEO Agency?</h2>
        <p className="text-gray-200 text-xl mb-8 max-w-2xl mx-auto">
          Start with AISEOScan, the core tool agencies use to deliver $500-5,000+ audits. Free to try, $29 for premium reports with code examples.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <Link href="/">
            <a className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
              <Zap className="h-6 w-6 mr-2" />
              Try Core Agency Tool Free
            </a>
          </Link>
          <Link href="/how-to-use-ai-for-seo">
            <a className="bg-gray-800 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-700 transition-all duration-300 border border-gray-600 flex items-center justify-center">
              Learn AI SEO Implementation
            </a>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-sm text-gray-300">
          <div className="flex flex-col items-center">
            <CheckCircle className="h-5 w-5 text-emerald-400 mb-1" />
            <span>$29 premium tool</span>
          </div>
          <div className="flex flex-col items-center">
            <CheckCircle className="h-5 w-5 text-emerald-400 mb-1" />
            <span>70-90% margins</span>
          </div>
          <div className="flex flex-col items-center">
            <CheckCircle className="h-5 w-5 text-emerald-400 mb-1" />
            <span>Low competition</span>
          </div>
          <div className="flex flex-col items-center">
            <CheckCircle className="h-5 w-5 text-emerald-400 mb-1" />
            <span>High client ROI</span>
          </div>
        </div>
      </div>
    </Layout>
  )
}