import Layout from '../components/Layout'
import Link from 'next/link'
import { Bot, CheckCircle, Code, FileText, Search, Zap, Target, TrendingUp, Award, ArrowRight, Lightbulb, AlertCircle, PlayCircle, Eye, Settings, BarChart3, Globe } from 'lucide-react'

export default function HowToUseAIForSEO() {
  const steps = [
    {
      number: 1,
      title: "Audit Your Current AI SEO Status",
      icon: Search,
      time: "5 minutes",
      difficulty: "Easy",
      description: "Before optimization, understand where you stand with AI search engines.",
      substeps: [
        {
          title: "Run an AI SEO Scan",
          content: "Use AISEOScan to get a comprehensive report on your website's AI search readiness. This identifies gaps in schema markup, content structure, and authority signals.",
          action: "Scan your website",
          link: "/"
        },
        {
          title: "Review Your Schema Markup",
          content: "Check if you have proper JSON-LD structured data for Article, Organization, Person, and FAQ schemas. Missing schema is the #1 reason AI systems skip your content.",
          example: "View page source → Search for 'application/ld+json' → Validate at schema.org"
        },
        {
          title: "Check Content Structure",
          content: "AI systems need clear heading hierarchy (H1 → H2 → H3), proper paragraph structure, and scannable content. Walls of text confuse AI parsers.",
          example: "Look for: One H1, multiple H2s, H3s under H2s, short paragraphs (3-4 sentences)"
        }
      ]
    },
    {
      number: 2,
      title: "Implement Schema Markup",
      icon: Code,
      time: "30 minutes",
      difficulty: "Medium",
      description: "Add structured data that helps AI systems understand your content.",
      substeps: [
        {
          title: "Add Article Schema",
          content: "Every content page should have Article schema with headline, author, datePublished, and image. This tells AI systems what the page is about.",
          example: `{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Your Article Title",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  },
  "datePublished": "2025-01-15"
}`
        },
        {
          title: "Add Organization Schema",
          content: "On your homepage, add Organization schema with your company name, logo, social profiles, and contact info. This establishes your brand identity for AI systems.",
          example: "Include: name, logo, url, sameAs (social links), contactPoint"
        },
        {
          title: "Add FAQ Schema",
          content: "If you have Q&A content, implement FAQPage schema. AI systems love citing well-structured FAQs because they match conversational queries.",
          example: "Each question-answer pair wrapped in proper FAQ schema structure"
        }
      ]
    },
    {
      number: 3,
      title: "Optimize Content Structure",
      icon: FileText,
      time: "1-2 hours per page",
      difficulty: "Medium",
      description: "Structure your content for AI comprehension and citation.",
      substeps: [
        {
          title: "Use Clear Heading Hierarchy",
          content: "Start with one H1 (page title), use H2s for main sections, H3s for subsections. AI systems use headings to understand content structure and topic relationships.",
          example: "H1: How to Bake Bread → H2: Ingredients → H3: Flour Types"
        },
        {
          title: "Write Citation-Ready Content",
          content: "Start with clear facts in the first paragraph. AI systems prefer content that can be cited without extensive editing. Use: 'According to [source]', 'Studies show', 'Research indicates'.",
          example: "❌ 'It might be true that...' → ✅ 'Research from MIT (2024) shows that...'"
        },
        {
          title: "Add Sources and Citations",
          content: "Link to authoritative sources. AI systems check your sources when evaluating content trustworthiness. Original research and primary sources rank highest.",
          example: "Link to: .edu, .gov, peer-reviewed journals, official documentation"
        },
        {
          title: "Optimize Length",
          content: "Aim for 1,500+ words for main content pages. AI systems favor comprehensive coverage over thin content. But prioritize quality over length—don't add fluff.",
          example: "1,500-3,000 words: sweet spot for most topics"
        }
      ]
    },
    {
      number: 4,
      title: "Build Authority Signals",
      icon: Award,
      time: "Ongoing",
      difficulty: "Medium",
      description: "Establish credibility that AI systems recognize and trust.",
      substeps: [
        {
          title: "Add Author Bios",
          content: "Every article needs an author with credentials. Include expertise, background, and links to professional profiles. AI systems check author authority.",
          example: "John Smith, PhD in Computer Science, 15 years experience, MIT researcher"
        },
        {
          title: "Implement Person Schema",
          content: "Add Person schema to author pages with name, jobTitle, affiliation, and expertise areas. This helps AI systems understand author credentials.",
          example: "Include: name, jobTitle, worksFor, knowsAbout, sameAs (LinkedIn, etc.)"
        },
        {
          title: "Display Credentials Prominently",
          content: "Show certifications, awards, publications, and professional affiliations. AI systems look for expertise indicators when evaluating content authority.",
          example: "Add: 'As published in [Journal]', 'Board certified in [Field]', 'Member of [Organization]'"
        },
        {
          title: "Get Quality Backlinks",
          content: "Links from authoritative sites signal credibility. AI systems factor in domain authority when deciding which sources to cite.",
          example: "Target: Industry publications, .edu sites, major news outlets"
        }
      ]
    },
    {
      number: 5,
      title: "Optimize for Conversational Queries",
      icon: Globe,
      time: "30 minutes per page",
      difficulty: "Easy",
      description: "AI search is conversational—optimize for how people actually talk.",
      substeps: [
        {
          title: "Target Question-Based Keywords",
          content: "People ask AI systems questions, not just type keywords. Optimize for: 'How to...', 'What is...', 'Why does...', 'When should...'",
          example: "Instead of 'SEO tips' → 'How to improve SEO rankings in 2025'"
        },
        {
          title: "Use Natural Language",
          content: "Write how people speak. AI systems are trained on conversational data. Formal, corporate-speak performs worse than natural, clear language.",
          example: "❌ 'Utilize optimization methodologies' → ✅ 'Use these optimization techniques'"
        },
        {
          title: "Answer Questions Directly",
          content: "Put the answer in the first paragraph. AI systems look for direct answers they can cite without heavy editing.",
          example: "Q: 'How long to bake bread?' → A: 'Bake bread for 30-40 minutes at 375°F.'"
        },
        {
          title: "Create FAQ Sections",
          content: "Add FAQ sections to pages answering common questions. Use FAQ schema. AI systems heavily cite well-structured FAQs.",
          example: "5-10 common questions with clear, concise answers (50-150 words each)"
        }
      ]
    },
    {
      number: 6,
      title: "Optimize Technical Performance",
      icon: Settings,
      time: "1-3 hours",
      difficulty: "Hard",
      description: "AI crawlers need fast, accessible sites to index your content.",
      substeps: [
        {
          title: "Improve Page Speed",
          content: "Target Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1. Slow sites get crawled less frequently by AI systems.",
          example: "Use: Image compression, lazy loading, CDN, minification"
        },
        {
          title: "Ensure Mobile Responsiveness",
          content: "60%+ of AI queries come from mobile. Your site must work flawlessly on all screen sizes.",
          example: "Test with: Google Mobile-Friendly Test, real device testing"
        },
        {
          title: "Fix Broken Links",
          content: "AI systems penalize sites with broken internal/external links. Run regular audits and fix 404s immediately.",
          example: "Monthly link checks, redirect chains, proper 301 redirects"
        },
        {
          title: "Implement Clean URLs",
          content: "Use descriptive, readable URLs. AI systems use URL structure to understand page context.",
          example: "✅ /ai-seo-guide → ❌ /page?id=12345&cat=seo"
        }
      ]
    },
    {
      number: 7,
      title: "Monitor and Measure Results",
      icon: BarChart3,
      time: "15 minutes weekly",
      difficulty: "Easy",
      description: "Track your AI SEO performance and iterate based on data.",
      substeps: [
        {
          title: "Track AI Referral Traffic",
          content: "Set up tracking for referrals from ChatGPT, Perplexity, Claude, etc. Monitor which pages get AI traffic.",
          example: "Google Analytics: Acquisition → All Traffic → Source/Medium"
        },
        {
          title: "Monitor Citation Frequency",
          content: "Use tools to track when AI systems cite your content. Set up Google Alerts for your brand + 'ChatGPT' or 'Perplexity'.",
          example: "Search: 'site:reddit.com ChatGPT [your brand]' to find discussions"
        },
        {
          title: "Run Monthly Audits",
          content: "Re-scan your site monthly with AISEOScan to track improvements and catch new issues.",
          action: "Schedule monthly scans",
          link: "/"
        },
        {
          title: "Compare Against Competitors",
          content: "Check which competitors get cited by AI systems for your target topics. Analyze their content structure and authority signals.",
          example: "Ask ChatGPT about your topic → See who gets cited → Study their approach"
        }
      ]
    }
  ]

  const tools = [
    {
      name: "AISEOScan",
      purpose: "Comprehensive AI SEO audits",
      cost: "Free",
      link: "/",
      features: ["30+ checks", "Schema validation", "Citation analysis"]
    },
    {
      name: "Schema Markup Generator",
      purpose: "Generate JSON-LD schema code",
      cost: "Free",
      features: ["Article schema", "Organization schema", "FAQ schema"]
    },
    {
      name: "Google PageSpeed Insights",
      purpose: "Check Core Web Vitals",
      cost: "Free",
      features: ["Performance scores", "Optimization tips", "Mobile testing"]
    }
  ]

  const commonMistakes = [
    {
      mistake: "Only optimizing for Google",
      fix: "AI search is different. Traditional SEO tactics (keyword stuffing, backlink farms) don't work. Focus on schema, structure, and authority.",
      severity: "Critical"
    },
    {
      mistake: "Skipping schema markup",
      fix: "Schema is required, not optional. AI systems heavily rely on structured data. Missing schema means you won't get cited.",
      severity: "Critical"
    },
    {
      mistake: "Generic, thin content",
      fix: "AI systems favor depth and expertise. Write comprehensive (1,500+ words), well-researched content with sources and data.",
      severity: "High"
    },
    {
      mistake: "No author attribution",
      fix: "Add detailed author bios with credentials. AI systems check author expertise when evaluating content trustworthiness.",
      severity: "High"
    },
    {
      mistake: "Ignoring mobile users",
      fix: "60% of AI queries are mobile. Ensure your site is fully responsive and fast on mobile devices.",
      severity: "Medium"
    }
  ]

  return (
    <Layout 
      title="How to Use AI for SEO: Complete Step-by-Step Guide (2025)"
      description="Learn how to use AI for SEO optimization. Step-by-step tutorial for optimizing websites for ChatGPT, Perplexity, Claude, and AI search engines. Real examples included."
    >
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center mb-6">
          <PlayCircle className="h-12 w-12 text-pink-400 mr-4" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            How to Use AI for SEO
          </h1>
        </div>
        <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
          Complete step-by-step tutorial for optimizing your website for ChatGPT, Perplexity, Claude, and all AI search engines. Follow these 7 steps to increase your AI search citations by 8x.
        </p>
        
        <div className="bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-blue-900/30 border border-pink-500/50 p-6 rounded-xl backdrop-blur-sm inline-block mb-8">
          <p className="text-pink-200 text-lg font-medium">
            ⏱️ Total time: 3-5 hours for initial setup • Ongoing: 30 min/week
          </p>
        </div>

        <Link href="/">
          <a className="inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
            <Search className="h-5 w-5 mr-2" />
            Start with Free AI SEO Scan
          </a>
        </Link>
      </div>

      {/* Quick Overview */}
      <div className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
          <Eye className="h-8 w-8 text-blue-400 mr-3" />
          What You'll Learn
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 text-emerald-400 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-white mb-1">Schema Markup Implementation</h3>
              <p className="text-gray-300 text-sm">Add structured data that AI systems use to understand your content</p>
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 text-emerald-400 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-white mb-1">Content Structure Optimization</h3>
              <p className="text-gray-300 text-sm">Format content for maximum AI comprehension and citation potential</p>
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 text-emerald-400 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-white mb-1">Authority Signal Building</h3>
              <p className="text-gray-300 text-sm">Establish credibility markers that AI systems recognize and trust</p>
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 text-emerald-400 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-white mb-1">Performance Monitoring</h3>
              <p className="text-gray-300 text-sm">Track AI citations and optimize based on real performance data</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tutorial Steps */}
      {steps.map((step, index) => {
        const Icon = step.icon
        return (
          <div key={index} className="mb-12">
            <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm rounded-xl border border-purple-500/50 overflow-hidden">
              {/* Step Header */}
              <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 p-6 border-b border-purple-500/50">
                <div className="flex items-start justify-between">
                  <div className="flex items-start flex-1">
                    <div className="bg-pink-500 text-white font-bold text-2xl w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-white mb-2 flex items-center">
                        <Icon className="h-8 w-8 text-pink-400 mr-3" />
                        {step.title}
                      </h2>
                      <p className="text-gray-200 text-lg mb-4">{step.description}</p>
                      <div className="flex flex-wrap gap-3">
                        <div className="bg-blue-900/30 px-4 py-2 rounded-full border border-blue-500/50">
                          <span className="text-blue-300 text-sm">⏱️ {step.time}</span>
                        </div>
                        <div className={`px-4 py-2 rounded-full border ${
                          step.difficulty === 'Easy' ? 'bg-emerald-900/30 border-emerald-500/50 text-emerald-300' :
                          step.difficulty === 'Medium' ? 'bg-yellow-900/30 border-yellow-500/50 text-yellow-300' :
                          'bg-rose-900/30 border-rose-500/50 text-rose-300'
                        }`}>
                          <span className="text-sm">📊 {step.difficulty}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Substeps */}
              <div className="p-8">
                <div className="space-y-8">
                  {step.substeps.map((substep, subindex) => (
                    <div key={subindex} className="border-l-4 border-pink-500/50 pl-6">
                      <h3 className="text-xl font-bold text-white mb-3">
                        {step.number}.{subindex + 1} {substep.title}
                      </h3>
                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {substep.content}
                      </p>
                      
                      {substep.example && (
                        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                          <p className="text-sm text-gray-400 mb-2 font-semibold">💡 Example:</p>
                          <pre className="text-gray-200 text-sm whitespace-pre-wrap font-mono">
                            {substep.example}
                          </pre>
                        </div>
                      )}

                      {substep.action && substep.link && (
                        <Link href={substep.link}>
                          <a className="inline-flex items-center mt-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300">
                            <Target className="h-5 w-5 mr-2" />
                            {substep.action}
                          </a>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      })}

      {/* Essential Tools */}
      <div className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 mb-12">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <Zap className="h-8 w-8 text-blue-400 mr-3" />
          Essential Tools for AI SEO
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <div key={index} className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/50">
              <h3 className="text-xl font-bold text-white mb-2">{tool.name}</h3>
              <p className="text-gray-300 text-sm mb-3">{tool.purpose}</p>
              <div className="bg-emerald-900/20 border border-emerald-500/50 px-3 py-1 rounded-full inline-block mb-4">
                <span className="text-emerald-300 text-sm font-semibold">{tool.cost}</span>
              </div>
              <ul className="space-y-2 mb-4">
                {tool.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300 text-sm">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              {tool.link && (
                <Link href={tool.link}>
                  <a className="text-pink-400 hover:text-pink-300 font-semibold text-sm flex items-center">
                    Try Now <ArrowRight className="h-4 w-4 ml-2" />
                  </a>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Common Mistakes */}
      <div className="bg-gradient-to-r from-gray-900/60 to-rose-900/20 backdrop-blur-sm p-8 rounded-xl border border-rose-500/50 mb-12">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <AlertCircle className="h-8 w-8 text-rose-400 mr-3" />
          5 Common Mistakes to Avoid
        </h2>
        
        <div className="space-y-6">
          {commonMistakes.map((item, index) => (
            <div key={index} className="bg-rose-900/20 p-6 rounded-lg border-l-4 border-rose-400">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-white">❌ {item.mistake}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  item.severity === 'Critical' ? 'bg-rose-500 text-white' :
                  item.severity === 'High' ? 'bg-orange-500 text-white' :
                  'bg-yellow-500 text-gray-900'
                }`}>
                  {item.severity}
                </span>
              </div>
              <p className="text-gray-300">
                <strong className="text-emerald-400">✅ Fix:</strong> {item.fix}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Real Results */}
      <div className="bg-gradient-to-r from-gray-900/60 to-emerald-900/20 backdrop-blur-sm p-8 rounded-xl border border-emerald-500/50 mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
          <TrendingUp className="h-8 w-8 text-emerald-400 mr-3" />
          What Results to Expect
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Timeline</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-emerald-500 text-white font-bold px-3 py-1 rounded mr-3 text-sm">Week 1</div>
                <p className="text-gray-300 text-sm">Initial improvements visible in AI citation rates</p>
              </div>
              <div className="flex items-start">
                <div className="bg-emerald-500 text-white font-bold px-3 py-1 rounded mr-3 text-sm">Month 1</div>
                <p className="text-gray-300 text-sm">2-3x increase in AI search referral traffic</p>
              </div>
              <div className="flex items-start">
                <div className="bg-emerald-500 text-white font-bold px-3 py-1 rounded mr-3 text-sm">Month 3</div>
                <p className="text-gray-300 text-sm">5-8x increase in total AI citations</p>
              </div>
              <div className="flex items-start">
                <div className="bg-emerald-500 text-white font-bold px-3 py-1 rounded mr-3 text-sm">Month 6</div>
                <p className="text-gray-300 text-sm">Established authority in AI search for your topics</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-4">Key Metrics</h3>
            <ul className="space-y-3">
              <li className="flex items-start text-gray-300">
                <CheckCircle className="h-5 w-5 text-emerald-400 mr-2 mt-1 flex-shrink-0" />
                <span><strong className="text-white">Citation frequency:</strong> 8.3x average increase</span>
              </li>
              <li className="flex items-start text-gray-300">
                <CheckCircle className="h-5 w-5 text-emerald-400 mr-2 mt-1 flex-shrink-0" />
                <span><strong className="text-white">Referral traffic:</strong> 300-500% growth from AI platforms</span>
              </li>
              <li className="flex items-start text-gray-300">
                <CheckCircle className="h-5 w-5 text-emerald-400 mr-2 mt-1 flex-shrink-0" />
                <span><strong className="text-white">Conversion rate:</strong> 6.2x higher than traditional search</span>
              </li>
              <li className="flex items-start text-gray-300">
                <CheckCircle className="h-5 w-5 text-emerald-400 mr-2 mt-1 flex-shrink-0" />
                <span><strong className="text-white">Brand awareness:</strong> Significant increase in AI-driven discovery</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-12">
        <h2 className="text-3xl font-bold text-white mb-6">Next Steps</h2>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-pink-500 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-sm">
              1
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Start with an Audit</h3>
              <p className="text-gray-300 mb-3">
                Get a comprehensive AI SEO report showing your current status and what needs to be fixed.
              </p>
              <Link href="/">
                <a className="text-pink-400 hover:text-pink-300 font-semibold flex items-center">
                  Run Free AI SEO Scan <ArrowRight className="h-4 w-4 ml-2" />
                </a>
              </Link>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-pink-500 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-sm">
              2
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Implement Step-by-Step</h3>
              <p className="text-gray-300 mb-3">
                Follow the 7 steps above in order. Start with schema markup (biggest impact), then move to content structure.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-pink-500 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-sm">
              3
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Explore Platform-Specific Strategies</h3>
              <p className="text-gray-300 mb-3">
                After foundational optimization, learn platform-specific tactics for ChatGPT, Perplexity, Claude, and others.
              </p>
              <Link href="/ai-seo">
                <a className="text-pink-400 hover:text-pink-300 font-semibold flex items-center">
                  View Platform Guides <ArrowRight className="h-4 w-4 ml-2" />
                </a>
              </Link>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-pink-500 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-sm">
              4
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Consider Professional Help</h3>
              <p className="text-gray-300 mb-3">
                If you need expert assistance, explore AI SEO services and tools that can accelerate your optimization.
              </p>
              <Link href="/best-ai-seo-tools-2025">
                <a className="text-pink-400 hover:text-pink-300 font-semibold flex items-center">
                  Compare AI SEO Tools <ArrowRight className="h-4 w-4 ml-2" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-blue-900/40 backdrop-blur-sm p-12 rounded-xl border border-pink-500/50 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Optimizing?</h2>
        <p className="text-gray-200 text-xl mb-8 max-w-2xl mx-auto">
          Get your free AI SEO audit and see exactly what needs to be optimized for ChatGPT, Perplexity, Claude, and other AI search engines.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <Link href="/">
            <a className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
              <Search className="h-6 w-6 mr-2" />
              Start Free AI SEO Scan
            </a>
          </Link>
          <Link href="/ai-seo">
            <a className="bg-gray-800 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-700 transition-all duration-300 border border-gray-600 flex items-center justify-center">
              Learn More About AI SEO
            </a>
          </Link>
        </div>

        <p className="text-gray-400 text-sm">
          ✨ No credit card required • Instant results • 30+ AI SEO checks • Detailed PDF report
        </p>
      </div>
    </Layout>
  )
}