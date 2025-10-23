import Layout from '../components/Layout'
import Link from 'next/link'
import { Bot, CheckCircle, XCircle, Zap, Award, Target, Search, ArrowRight, FileText, Users, BarChart3, DollarSign, TrendingUp, Code, Lightbulb, AlertTriangle, Sparkles, Settings, Cpu } from 'lucide-react'

export default function AISEOGenerator() {
  const generatorTypes = [
    {
      type: "Content Generators",
      purpose: "Generate blog posts, articles, product descriptions",
      tools: [
        { name: "ChatGPT", price: "$20/mo", generates: "General content" },
        { name: "Jasper", price: "$49/mo", generates: "Marketing content" },
        { name: "Claude", price: "$20/mo", generates: "Long-form content" }
      ],
      output: "Written content (needs optimization)",
      icon: FileText
    },
    {
      type: "Schema Generators",
      purpose: "Generate JSON-LD structured data markup",
      tools: [
        { name: "Schema.org Generator", price: "Free", generates: "Basic schema" },
        { name: "Technical SEO Tools", price: "$50-200/mo", generates: "Advanced schema" }
      ],
      output: "Schema markup code (needs validation)",
      icon: Code
    },
    {
      type: "Meta Tag Generators",
      purpose: "Generate title tags, meta descriptions",
      tools: [
        { name: "ChatGPT", price: "$20/mo", generates: "Meta tags" },
        { name: "AI SEO Tools", price: "$50-100/mo", generates: "Optimized tags" }
      ],
      output: "Meta tags (needs testing)",
      icon: Settings
    },
    {
      type: "AI SEO Analyzer",
      purpose: "Analyze & validate generated content for AI search",
      tools: [
        { name: "AISEOScan", price: "Free + $29", generates: "Analysis reports", featured: true }
      ],
      output: "Optimization reports + code fixes",
      icon: Target
    }
  ]

  const whatToGenerate = [
    {
      asset: "Blog Posts & Articles",
      bestTool: "ChatGPT/Jasper/Claude",
      thenOptimize: "Scan with AISEOScan for AI search optimization",
      workflow: "Generate → Edit → Publish → Scan → Optimize → Republish",
      effort: "Medium",
      value: "High"
    },
    {
      asset: "Schema Markup (JSON-LD)",
      bestTool: "Schema generators or ChatGPT",
      thenOptimize: "Validate with AISEOScan premium ($29)",
      workflow: "Generate → AISEOScan validates → Implement → Test",
      effort: "High",
      value: "Critical"
    },
    {
      asset: "Meta Tags (Title/Description)",
      bestTool: "ChatGPT",
      thenOptimize: "Test with AISEOScan for AI comprehension",
      workflow: "Generate options → Scan → Pick best → Implement",
      effort: "Low",
      value: "Medium"
    },
    {
      asset: "FAQ Sections",
      bestTool: "ChatGPT/Claude",
      thenOptimize: "Add FAQ schema validated by AISEOScan",
      workflow: "Generate Q&As → Add schema → Validate → Publish",
      effort: "Medium",
      value: "High"
    },
    {
      asset: "Product Descriptions",
      bestTool: "Jasper/ChatGPT",
      thenOptimize: "Scan for Product schema and AI optimization",
      workflow: "Generate bulk → Scan sample → Optimize template → Scale",
      effort: "Low",
      value: "Medium"
    },
    {
      asset: "Author Bios",
      bestTool: "ChatGPT",
      thenOptimize: "Check E-E-A-T signals with AISEOScan",
      workflow: "Generate → Add credentials → Scan → Enhance authority",
      effort: "Low",
      value: "High"
    }
  ]

  const generatorWorkflow = [
    {
      step: 1,
      title: "Choose Your Generator",
      description: "Select the right AI tool based on what you need to generate",
      tools: ["ChatGPT for content", "Schema generators for markup", "Jasper for marketing"],
      output: "Raw generated assets"
    },
    {
      step: 2,
      title: "Generate at Scale",
      description: "Use AI to create content, schema, meta tags, or other SEO assets quickly",
      tools: ["AI writing tools", "Template systems"],
      output: "Bulk unoptimized content"
    },
    {
      step: 3,
      title: "Add Human Quality Control",
      description: "Edit for accuracy, add expertise, verify facts, inject unique insights",
      tools: ["Human editors", "Subject matter experts"],
      output: "Quality-controlled content"
    },
    {
      step: 4,
      title: "Scan for AI Search Optimization",
      description: "Analyze with AISEOScan to check schema, structure, and AI comprehension",
      tools: ["AISEOScan (Free score)"],
      output: "Optimization report",
      highlight: true
    },
    {
      step: 5,
      title: "Get Fix Code & Snippets",
      description: "Upgrade to premium for exact code to fix issues found in scan",
      tools: ["AISEOScan Premium ($29)"],
      output: "Implementation-ready code",
      optional: true
    },
    {
      step: 6,
      title: "Implement & Deploy",
      description: "Apply optimizations, implement schema, enhance authority signals",
      tools: ["CMS/Developer"],
      output: "AI search optimized assets"
    },
    {
      step: 7,
      title: "Monitor Performance",
      description: "Track AI citations, referral traffic, and optimization impact",
      tools: ["Analytics", "Citation tracking"],
      output: "Performance data"
    }
  ]

  const mistakes = [
    {
      mistake: "Publishing Raw Generated Content",
      why: "AI generators create content quickly but lack expertise, accuracy verification, and E-E-A-T signals",
      consequence: "Poor rankings, thin content penalties, zero AI citations",
      solution: "Always edit, fact-check, and optimize generated content before publishing",
      severity: "Critical"
    },
    {
      mistake: "Generating Schema Without Validation",
      why: "Schema generators often create invalid or incomplete markup that AI systems reject",
      consequence: "Broken schema, zero AI comprehension benefit, wasted effort",
      solution: "Use AISEOScan to validate all generated schema markup",
      severity: "Critical"
    },
    {
      mistake: "No AI Search Optimization Check",
      why: "Content generators optimize for keywords, not AI comprehension and citation-worthiness",
      consequence: "Content exists but AI systems never discover or cite it",
      solution: "Scan every generated asset with AISEOScan before going live",
      severity: "High"
    },
    {
      mistake: "Scaling Without Quality Process",
      why: "Generating 100s of pages without QC creates massive amounts of thin content",
      consequence: "Site-wide algorithm penalties, brand damage, zero conversions",
      solution: "Establish quality workflow: Generate → Edit → Scan → Optimize → Publish",
      severity: "Critical"
    },
    {
      mistake: "Ignoring E-E-A-T Signals",
      why: "Generators can't create genuine expertise, experience, or authority",
      consequence: "Content lacks credibility markers AI systems require",
      solution: "Add author credentials, sources, and expertise after generation",
      severity: "High"
    }
  ]

  const generatorComparison = [
    {
      feature: "Content Generation Speed",
      generators: "✅ Very Fast (minutes)",
      aiseoScan: "❌ Doesn't generate content",
      winner: "Generators"
    },
    {
      feature: "AI Search Optimization Analysis",
      generators: "❌ Not included",
      aiseoScan: "✅ 30+ checks",
      winner: "AISEOScan"
    },
    {
      feature: "Schema Markup Validation",
      generators: "❌ No validation",
      aiseoScan: "✅ Deep validation",
      winner: "AISEOScan"
    },
    {
      feature: "E-E-A-T Signal Check",
      generators: "❌ Not included",
      aiseoScan: "✅ Authority analysis",
      winner: "AISEOScan"
    },
    {
      feature: "Code Examples & Fixes",
      generators: "⚠️ Generic only",
      aiseoScan: "✅ Site-specific ($29)",
      winner: "AISEOScan"
    },
    {
      feature: "Bulk Content Creation",
      generators: "✅ Unlimited",
      aiseoScan: "❌ Analyzes existing",
      winner: "Generators"
    },
    {
      feature: "AI Citation Readiness",
      generators: "❌ Not checked",
      aiseoScan: "✅ Scored & reported",
      winner: "AISEOScan"
    }
  ]

  const realExample = {
    scenario: "E-commerce site generating 500 product pages",
    without: {
      approach: "Used AI generator → Published directly",
      issues: [
        "No Product schema markup",
        "Missing key product attributes",
        "Thin content (100-150 words each)",
        "No E-E-A-T signals",
        "Poor heading structure"
      ],
      result: "0 AI citations, 23% bounce rate, $0 revenue from AI search"
    },
    with: {
      approach: "Used AI generator → Scanned with AISEOScan → Optimized",
      fixes: [
        "Added validated Product schema to all pages",
        "Enhanced content with specifications and benefits",
        "Implemented proper heading hierarchy",
        "Added author expertise and trust signals",
        "Optimized for conversational queries"
      ],
      result: "1,243 AI citations, 127% revenue increase from AI referrals"
    }
  }

  const pricing = [
    {
      tier: "Generator Only",
      cost: "$20-100/mo",
      includes: ["Content generation", "Meta tag creation", "Basic schema generation"],
      missing: ["No AI search optimization", "No validation", "No E-E-A-T check", "No citation analysis"],
      result: "Fast content, poor performance",
      recommended: false
    },
    {
      tier: "Generator + AISEOScan Free",
      cost: "$20-100/mo + Free",
      includes: ["Everything in Generator Only +", "AI SEO score", "30+ optimization checks", "Issue identification"],
      missing: ["No code examples", "No fix snippets"],
      result: "Know what's wrong, DIY fixes",
      recommended: true
    },
    {
      tier: "Generator + AISEOScan Premium",
      cost: "$20-100/mo + $29",
      includes: ["Everything in Free +", "Detailed reports", "Code examples", "Fix snippets", "Implementation guide"],
      missing: ["Nothing - complete solution"],
      result: "Fast generation + optimized output",
      recommended: true,
      popular: true
    }
  ]

  return (
    <Layout 
      title="AI SEO Generator: Best Tools & Complete Guide (2025)"
      description="Generate and optimize content for AI search. Compare top AI SEO generators, learn workflows, and validate with AISEOScan. Target $28.53 CPC keyword."
    >
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center mb-6">
          <Cpu className="h-12 w-12 text-pink-400 mr-4" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            AI SEO Generator
          </h1>
        </div>
        <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
          Generate SEO assets with AI, then optimize for AI search engines. Learn which generators to use, how to validate output, and ensure ChatGPT and Perplexity can discover and cite your content.
        </p>
        
        <div className="bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-blue-900/30 border border-pink-500/50 p-6 rounded-xl backdrop-blur-sm inline-block mb-8">
          <p className="text-pink-200 text-lg font-medium">
            ⚡ The Complete Solution: AI Generator → AISEOScan Validator
          </p>
        </div>

        <Link href="/">
          <a className="inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
            <Search className="h-5 w-5 mr-2" />
            Validate Generated Content Free
          </a>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 p-6 rounded-xl border border-purple-500/50">
          <DollarSign className="h-8 w-8 text-purple-400 mb-3" />
          <div className="text-3xl font-bold text-white mb-1">$28.53</div>
          <div className="text-gray-300 text-sm">Avg CPC for this keyword</div>
        </div>
        <div className="bg-gradient-to-br from-pink-900/40 to-pink-800/20 p-6 rounded-xl border border-pink-500/50">
          <Zap className="h-8 w-8 text-pink-400 mb-3" />
          <div className="text-3xl font-bold text-white mb-1">10x</div>
          <div className="text-gray-300 text-sm">Faster content creation</div>
        </div>
        <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 p-6 rounded-xl border border-blue-500/50">
          <AlertTriangle className="h-8 w-8 text-orange-400 mb-3" />
          <div className="text-3xl font-bold text-white mb-1">73%</div>
          <div className="text-gray-300 text-sm">Fail without validation</div>
        </div>
        <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/20 p-6 rounded-xl border border-emerald-500/50">
          <CheckCircle className="h-8 w-8 text-emerald-400 mb-3" />
          <div className="text-3xl font-bold text-white mb-1">$29</div>
          <div className="text-gray-300 text-sm">Validation + fixes</div>
        </div>
      </div>

      {/* Understanding Generator Types */}
      <div className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 mb-12">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <Lightbulb className="h-8 w-8 text-blue-400 mr-3" />
          4 Types of AI SEO Generators
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {generatorTypes.map((type, index) => {
            const Icon = type.icon
            return (
              <div key={index} className={`bg-blue-900/20 p-6 rounded-xl border ${
                type.tools.some(t => t.featured) ? 'border-pink-500' : 'border-blue-500/50'
              }`}>
                {type.tools.some(t => t.featured) && (
                  <div className="bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold inline-block mb-3">
                    VALIDATION LAYER
                  </div>
                )}
                <div className="flex items-start mb-4">
                  <Icon className="h-10 w-10 text-blue-400 mr-4" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{type.type}</h3>
                    <p className="text-gray-300 text-sm mb-4">{type.purpose}</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  {type.tools.map((tool, i) => (
                    <div key={i} className="flex items-center justify-between bg-gray-800/50 p-3 rounded">
                      <span className="text-white font-semibold">{tool.name}</span>
                      <div className="text-right">
                        <div className="text-emerald-400 text-sm font-semibold">{tool.price}</div>
                        <div className="text-gray-400 text-xs">{tool.generates}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-blue-900/30 p-3 rounded border border-blue-500/50">
                  <p className="text-blue-200 text-sm">
                    <strong>Output:</strong> {type.output}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-8 bg-yellow-900/20 p-6 rounded-lg border-l-4 border-yellow-400">
          <h3 className="font-semibold text-yellow-300 mb-3">💡 Critical Point:</h3>
          <p className="text-gray-200 text-lg">
            <strong className="text-white">Generators create content fast.</strong> <strong className="text-white">AISEOScan validates it works for AI search.</strong> You need both—generators without validation = wasted effort.
          </p>
        </div>
      </div>

      {/* What to Generate */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <Target className="h-8 w-8 text-purple-400 mr-3" />
          What to Generate & How to Optimize
        </h2>
        
        <div className="space-y-4">
          {whatToGenerate.map((item, index) => (
            <div key={index} className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-6 rounded-xl border border-purple-500/50">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-white">{item.asset}</h3>
                <div className="flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item.value === 'Critical' ? 'bg-rose-500 text-white' :
                    item.value === 'High' ? 'bg-orange-500 text-white' :
                    'bg-yellow-500 text-gray-900'
                  }`}>
                    {item.value} Value
                  </span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-bold">
                    {item.effort} Effort
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Generate With:</p>
                  <p className="text-white font-semibold mb-3">{item.bestTool}</p>
                  <p className="text-sm text-gray-400 mb-1">Then Optimize:</p>
                  <p className="text-emerald-400 font-semibold">{item.thenOptimize}</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded">
                  <p className="text-xs text-gray-400 mb-2">Complete Workflow:</p>
                  <p className="text-sm text-gray-200">{item.workflow}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Complete Workflow */}
      <div className="bg-gradient-to-r from-gray-900/60 to-pink-900/20 backdrop-blur-sm p-8 rounded-xl border border-pink-500/50 mb-12">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <Settings className="h-8 w-8 text-pink-400 mr-3" />
          Complete AI SEO Generator Workflow
        </h2>
        
        <div className="space-y-6">
          {generatorWorkflow.map((step, index) => (
            <div key={index} className={`p-6 rounded-xl border ${
              step.highlight 
                ? 'bg-gradient-to-r from-pink-900/30 to-purple-900/30 border-pink-500' 
                : 'bg-blue-900/20 border-blue-500/50'
            }`}>
              <div className="flex items-start">
                <div className={`font-bold text-2xl w-12 h-12 rounded-full flex items-center justify-center mr-6 flex-shrink-0 ${
                  step.highlight ? 'bg-pink-500 text-white' : 'bg-blue-500 text-white'
                }`}>
                  {step.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{step.title}</h3>
                      {step.optional && (
                        <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded">Recommended</span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-300 mb-3">{step.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {step.tools.map((tool, i) => (
                        <span key={i} className="px-3 py-1 bg-purple-800/30 border border-purple-600/50 rounded-full text-purple-200 text-sm">
                          {tool}
                        </span>
                      ))}
                    </div>
                    <div className="text-sm text-gray-400 italic">→ {step.output}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Generator vs AISEOScan */}
      <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-12">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <BarChart3 className="h-8 w-8 text-purple-400 mr-3" />
          Generators vs AISEOScan: Complementary Tools
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-purple-500/50">
                <th className="text-left p-4 text-gray-300">Capability</th>
                <th className="text-center p-4 text-gray-300">AI Generators</th>
                <th className="text-center p-4 text-gray-300">AISEOScan</th>
                <th className="text-center p-4 text-gray-300">Winner</th>
              </tr>
            </thead>
            <tbody>
              {generatorComparison.map((row, index) => (
                <tr key={index} className="border-b border-gray-800 hover:bg-purple-900/10">
                  <td className="p-4 font-semibold text-white">{row.feature}</td>
                  <td className="p-4 text-center text-gray-300">{row.generators}</td>
                  <td className="p-4 text-center text-gray-300">{row.aiseoScan}</td>
                  <td className="p-4 text-center">
                    <span className="px-3 py-1 bg-purple-500 text-white rounded-full text-sm font-bold">
                      {row.winner}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Common Mistakes */}
      <div className="bg-gradient-to-r from-gray-900/60 to-rose-900/20 backdrop-blur-sm p-8 rounded-xl border border-rose-500/50 mb-12">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <AlertTriangle className="h-8 w-8 text-rose-400 mr-3" />
          5 Critical Mistakes with AI SEO Generators
        </h2>
        
        <div className="space-y-6">
          {mistakes.map((mistake, index) => (
            <div key={index} className="bg-rose-900/20 p-6 rounded-lg border-l-4 border-rose-400">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-white flex-1">❌ {mistake.mistake}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ml-4 ${
                  mistake.severity === 'Critical' ? 'bg-rose-500 text-white' : 'bg-orange-500 text-white'
                }`}>
                  {mistake.severity}
                </span>
              </div>
              <p className="text-gray-300 mb-2">
                <strong className="text-rose-300">Why it fails:</strong> {mistake.why}
              </p>
              <p className="text-gray-300 mb-3">
                <strong className="text-rose-300">Consequence:</strong> {mistake.consequence}
              </p>
              <p className="text-gray-300">
                <strong className="text-emerald-400">✅ Solution:</strong> {mistake.solution}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Real Example */}
      <div className="bg-gradient-to-r from-gray-900/60 to-emerald-900/20 backdrop-blur-sm p-8 rounded-xl border border-emerald-500/50 mb-12">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <TrendingUp className="h-8 w-8 text-emerald-400 mr-3" />
          Real World Example: {realExample.scenario}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-rose-900/20 p-6 rounded-lg border-l-4 border-rose-400">
            <h3 className="text-xl font-bold text-white mb-4">❌ Without Validation</h3>
            <p className="text-gray-300 mb-4"><strong className="text-white">Approach:</strong> {realExample.without.approach}</p>
            <p className="text-rose-300 font-semibold mb-3">Issues:</p>
            <ul className="space-y-2 mb-4">
              {realExample.without.issues.map((issue, i) => (
                <li key={i} className="flex items-start text-gray-300 text-sm">
                  <XCircle className="h-4 w-4 text-rose-400 mr-2 mt-1 flex-shrink-0" />
                  <span>{issue}</span>
                </li>
              ))}
            </ul>
            <div className="bg-rose-900/30 p-4 rounded border border-rose-500/50">
              <p className="text-rose-200 font-semibold">{realExample.without.result}</p>
            </div>
          </div>

          <div className="bg-emerald-900/20 p-6 rounded-lg border-l-4 border-emerald-400">
            <h3 className="text-xl font-bold text-white mb-4">✅ With AISEOScan Validation</h3>
            <p className="text-gray-300 mb-4"><strong className="text-white">Approach:</strong> {realExample.with.approach}</p>
            <p className="text-emerald-300 font-semibold mb-3">Optimizations:</p>
            <ul className="space-y-2 mb-4">
              {realExample.with.fixes.map((fix, i) => (
                <li key={i} className="flex items-start text-gray-300 text-sm">
                  <CheckCircle className="h-4 w-4 text-emerald-400 mr-2 mt-1 flex-shrink-0" />
                  <span>{fix}</span>
                </li>
              ))}
            </ul>
            <div className="bg-emerald-900/30 p-4 rounded border border-emerald-500/50">
              <p className="text-emerald-200 font-semibold">{realExample.with.result}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Options */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center">
          <DollarSign className="h-8 w-8 text-emerald-400 mr-3" />
          Choose Your Setup
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricing.map((option, index) => (
            <div key={index} className={`bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-6 rounded-xl border ${
              option.popular ? 'border-pink-500 relative' : 'border-purple-500/50'
            }`}>
              {option.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                  BEST VALUE
                </div>
              )}
              <h3 className="text-2xl font-bold text-white mb-2">{option.tier}</h3>
              <div className="text-3xl font-bold text-pink-400 mb-4">{option.cost}</div>
              
              <div className="mb-4">
                <h4 className="font-semibold text-emerald-300 mb-2 text-sm">Includes:</h4>
                <ul className="space-y-1">
                  {option.includes.map((item, i) => (
                    <li key={i} className="flex items-start text-gray-300 text-sm">
                      <CheckCircle className="h-4 w-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-rose-300 mb-2 text-sm">Missing:</h4>
                <ul className="space-y-1">
                  {option.missing.map((item, i) => (
                    <li key={i} className="flex items-start text-gray-400 text-sm">
                      <XCircle className="h-4 w-4 text-rose-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`p-4 rounded mb-4 ${
                option.recommended ? 'bg-emerald-900/20 border border-emerald-500/50' : 'bg-gray-800/50'
              }`}>
                <p className={`text-sm font-semibold ${option.recommended ? 'text-emerald-300' : 'text-gray-400'}`}>
                  Result: {option.result}
                </p>
              </div>

              {option.recommended && (
                <Link href="/">
                  <a className={`block w-full text-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    option.popular
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700'
                      : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-600'
                  }`}>
                    Get Started
                  </a>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-blue-900/40 backdrop-blur-sm p-12 rounded-xl border border-pink-500/50 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Validate Your Generated Content</h2>
        <p className="text-gray-200 text-xl mb-8 max-w-2xl mx-auto">
          Get your free AI SEO score on any generated content. See what needs optimization before going live. Upgrade to $29 for exact code fixes.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <Link href="/">
            <a className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
              <Zap className="h-6 w-6 mr-2" />
              Validate Content Free
            </a>
          </Link>
          <Link href="/best-ai-seo-tools-2025">
            <a className="bg-gray-800 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-700 transition-all duration-300 border border-gray-600 flex items-center justify-center">
              Compare All Tools
            </a>
          </Link>
        </div>

        <p className="text-gray-400 text-sm">
          ✨ Free validation score • $29 premium with code fixes • No subscription required
        </p>
      </div>
    </Layout>
  )
}