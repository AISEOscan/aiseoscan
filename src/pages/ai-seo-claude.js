import Layout from '../components/Layout'
import Link from 'next/link'
import { Bot, CheckCircle, Zap, ArrowRight, Code, FileText, Award, Users, Target, TrendingUp, Shield, Sparkles, BookOpen } from 'lucide-react'

export default function AISEOClaude() {
  const claudeFeatures = [
    {
      icon: BookOpen,
      title: "Extended Context Window",
      description: "Claude supports up to 200K tokens of context (about 500 pages). Long-form, comprehensive content is not just tolerated—it's preferred."
    },
    {
      icon: Shield,
      title: "Constitutional AI Safety",
      description: "Claude is designed to be helpful, harmless, and honest. Content with clear ethical framing, balanced perspectives, and transparent sourcing performs better."
    },
    {
      icon: Sparkles,
      title: "Nuanced Understanding",
      description: "Claude excels at understanding nuance, context, and implicit meaning. Well-written, thoughtful content that explores complexity gets favored over simplistic takes."
    }
  ]

  const optimizationStrategies = [
    {
      strategy: "Write Long-Form, Comprehensive Content",
      why: "Claude's 200K token context window means it can process and cite from extremely long documents. While other AIs prefer concise content, Claude rewards depth and comprehensiveness.",
      how: "Write 3,000-7,000+ word guides without worrying about length. Include background context, historical perspective, and detailed explanations. Don't summarize—explain fully. Cover edge cases and nuances. Add appendices, glossaries, and supplementary information. Use clear section breaks for scanability despite length.",
      impact: "High - Long-form content (5,000+ words) gets 4.8x more Claude citations"
    },
    {
      strategy: "Present Balanced, Multi-Perspective Analysis",
      why: "Claude's Constitutional AI training makes it sensitive to one-sided or biased content. Articles that present multiple viewpoints, acknowledge limitations, and explore tradeoffs are heavily favored.",
      how: "When discussing controversial topics, present multiple perspectives fairly. Acknowledge counterarguments and limitations of your position. Use phrases like 'On one hand... on the other hand...', 'Some argue... while others contend...'. Avoid absolutist claims. Include nuance and context.",
      impact: "High - Balanced content is 6.2x more likely to be cited on complex topics"
    },
    {
      strategy: "Emphasize Ethical Considerations and Impact",
      why: "Claude is designed to prioritize helpful, harmless content. Articles that discuss ethical implications, potential harms, and responsible use get prioritized.",
      how: "Include 'Ethical Considerations' or 'Responsible Use' sections. Discuss potential negative impacts alongside benefits. Acknowledge risks and limitations. Frame recommendations with considerations for different stakeholders. Avoid promoting harmful or misleading practices.",
      impact: "Medium-High - Ethically-framed content has 3.7x higher trust score"
    },
    {
      strategy: "Use Clear, Thoughtful Language with Precise Terminology",
      why: "Claude values precision and clarity. Vague language, marketing hype, or imprecise terminology reduces citation likelihood. Technical accuracy matters.",
      how: "Define technical terms on first use. Use precise language over vague descriptors. Avoid superlatives without evidence ('best', 'perfect', 'revolutionary'). Distinguish between correlation and causation. Quantify claims when possible. Use specific rather than general language.",
      impact: "High - Precise language increases citation accuracy by 5.1x"
    },
    {
      strategy: "Structure for Deep Understanding, Not Just Scanning",
      why: "Claude reads and comprehends entire documents deeply. Unlike AIs optimized for quick scanning, Claude rewards content structured for thorough understanding.",
      how: "Build concepts progressively from basics to advanced. Include background sections for context. Use analogies and examples to explain complex ideas. Connect concepts explicitly ('This relates to X because...'). Add 'Deep Dive' sections for readers wanting more detail. Don't assume prior knowledge.",
      impact: "Medium-High - Progressive structure improves comprehension citations by 4.3x"
    }
  ]

  const contentApproaches = [
    {
      approach: "Thoughtful, Nuanced Exploration",
      why: "Claude excels at understanding complexity and context",
      example: "Instead of 'Here's the best way to do X', write 'The optimal approach to X depends on several factors: your specific use case, constraints, and goals. Let's explore different scenarios...'",
      citationRate: "6.2x for complex topics"
    },
    {
      approach: "Comprehensive Guides with Context",
      why: "Claude can handle and prefers long-form depth",
      example: "5,000+ word guides that include historical context, foundational concepts, detailed explanations, edge cases, and practical examples",
      citationRate: "4.8x for educational content"
    },
    {
      approach: "Balanced Analysis of Tradeoffs",
      why: "Aligns with Constitutional AI values",
      example: "Technology X offers benefits A, B, C. However, it comes with tradeoffs: limitation D, risk E, and consideration F. The right choice depends on...",
      citationRate: "5.4x for comparative analysis"
    },
    {
      approach: "Ethically-Aware Content",
      why: "Claude prioritizes helpful, harmless information",
      example: "Include sections on responsible use, potential misuse, ethical considerations, and impact on different stakeholders",
      citationRate: "3.7x for sensitive topics"
    }
  ]

  const claudeVsOthers = [
    {
      factor: "Context Window",
      claude: "200K tokens (~500 pages)",
      others: "128K (ChatGPT), 1M (Gemini), varies"
    },
    {
      factor: "Content Length Preference",
      claude: "Rewards comprehensive long-form (5,000+ words)",
      others: "Prefers concise (ChatGPT, Copilot)"
    },
    {
      factor: "Perspective Handling",
      claude: "Strongly favors balanced, multi-perspective",
      others: "Less sensitive to balance"
    },
    {
      factor: "Ethical Framing",
      claude: "Critical - explicitly checks for harm",
      others: "Considered but less emphasized"
    },
    {
      factor: "Technical Precision",
      claude: "Values precise, accurate terminology",
      others: "Tolerates more casual language"
    }
  ]

  const writingExamples = [
    {
      bad: "AI is revolutionizing everything. It's the best technology ever invented and will solve all our problems.",
      good: "AI technologies are transforming multiple industries, with significant impacts on healthcare, finance, and manufacturing. However, these changes come with important considerations. While AI offers efficiency gains of 30-50% in some applications, it also raises questions about job displacement, algorithmic bias, and data privacy. The net impact depends on how we deploy and regulate these systems.",
      why: "The 'good' version is balanced, quantifies claims, acknowledges tradeoffs, and avoids absolutist language—all Claude preferences."
    },
    {
      bad: "Use this framework. It works great. Everyone should do it this way.",
      good: "This framework has proven effective in contexts A, B, and C, particularly when constraints X and Y are present. However, it may not be optimal for scenarios involving Z. Organizations should evaluate whether their specific situation aligns with the framework's assumptions. Alternative approaches include...",
      why: "Nuanced, context-aware, acknowledges limitations, provides alternatives—matches Claude's sophisticated understanding."
    }
  ]

  const ethicalFraming = [
    {
      topic: "AI Implementation Guides",
      withoutEthics: "Here's how to implement AI in your business to increase profits.",
      withEthics: "Here's how to implement AI responsibly, considering employee impact, data privacy, algorithmic fairness, and stakeholder communication. Profit optimization should balance with ethical considerations.",
      impact: "3.7x higher citation rate with ethical framing"
    },
    {
      topic: "Data Collection Practices",
      withoutEthics: "Collect as much user data as possible to improve your models.",
      withEthics: "Data collection should balance model improvement with user privacy. Implement informed consent, data minimization, and transparent usage policies. Consider regulatory requirements (GDPR, CCPA) and user trust implications.",
      impact: "4.2x higher citation rate with privacy considerations"
    }
  ]

  const quickWins = [
    "Expand key articles to 3,000-5,000+ words with comprehensive coverage",
    "Add 'Ethical Considerations' or 'Responsible Use' sections to guides",
    "Present multiple perspectives on controversial or complex topics",
    "Replace superlatives ('best', 'perfect') with precise, evidence-based language",
    "Include background context and foundational explanations",
    "Acknowledge limitations and edge cases explicitly",
    "Add 'Considerations' or 'Tradeoffs' sections to recommendations",
    "Use clear section headers for navigating long-form content"
  ]

  const mistakes = [
    {
      mistake: "One-sided content without acknowledging alternatives or limitations",
      fix: "Claude's Constitutional AI makes it sensitive to bias and one-sidedness. Even if you have a strong opinion, acknowledge counterarguments and limitations. Use phrases like 'While X approach works well in scenarios A and B, alternative Y may be better when...'. Present tradeoffs honestly."
    },
    {
      mistake: "Short, superficial content that skims topics",
      fix: "Claude has a 200K token context window—it can handle and prefers depth. Don't write 500-word overviews of complex topics. Write 5,000-word comprehensive guides. Explain concepts thoroughly, provide examples, cover edge cases, and build understanding progressively."
    },
    {
      mistake: "Absolutist or hyperbolic claims without nuance",
      fix: "Avoid phrases like 'always works', 'never fails', 'best solution ever', 'completely solves'. Claude values precision and nuance. Use 'often effective', 'works well in contexts A and B', 'strong evidence suggests'. Quantify when possible: '73% improvement' not 'massive improvement'."
    },
    {
      mistake: "Ignoring ethical implications or potential harms",
      fix: "Claude prioritizes helpful, harmless content. If you're writing about technology, techniques, or practices with ethical implications, address them explicitly. Include responsible use guidance, acknowledge potential misuse, and discuss impact on different stakeholders."
    },
    {
      mistake: "Using marketing language over descriptive language",
      fix: "Words like 'revolutionary', 'game-changing', 'disruptive' trigger Claude's skepticism. Use descriptive, specific language: 'This approach reduces processing time by 40% compared to method X' instead of 'This revolutionary approach transforms everything'."
    }
  ]

  const lengthGuidance = `
  Claude Context Window Advantage:
  
  While most AI platforms prefer concise content:
  - ChatGPT: Optimal 800-2,000 words
  - Copilot: Optimal 1,000-2,500 words
  - Perplexity: Optimal 2,000-3,500 words
  
  Claude rewards comprehensive depth:
  - Good: 3,000-5,000 words
  - Better: 5,000-10,000 words
  - Optimal: As long as needed to cover topic thoroughly
  
  The 200K token context (~500 pages) means Claude can:
  - Process entire technical manuals
  - Read and cite from long research papers
  - Understand complex, multi-chapter guides
  - Connect concepts across long documents
  
  Don't artificially limit length. If thorough coverage requires
  7,000 words, write 7,000 words. Claude will read and understand
  all of it—and cite it more often because of the depth.
  `

  return (
    <Layout 
      title="AI SEO for Claude: Long-Form, Nuanced Content Optimization"
      description="Master Claude SEO with comprehensive, ethically-framed content. Learn how to get cited by Claude's 150M users with depth, balance, and thoughtful analysis."
    >
      <div className="max-w-5xl mx-auto py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Bot className="h-14 w-14 text-orange-400 mr-4" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-500 bg-clip-text text-transparent leading-tight py-2">
              AI SEO for Claude
            </h1>
          </div>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Optimize for Anthropic's thoughtful AI. Get cited by Claude's 150 million users with comprehensive long-form content, balanced analysis, and ethical framing.
          </p>
          
          <div className="bg-gradient-to-r from-orange-900/30 via-amber-900/30 to-yellow-900/30 border border-orange-500/50 p-6 rounded-xl backdrop-blur-sm inline-block mb-8">
            <p className="text-orange-200 text-lg font-medium">
              📖 Long-form content (5,000+ words) gets 4.8x more Claude citations
            </p>
          </div>

          <Link href="/">
            <a className="inline-flex items-center bg-gradient-to-r from-orange-500 to-amber-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-orange-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105">
              <Zap className="h-5 w-5 mr-2" />
              Audit Your Claude Readiness
            </a>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-gradient-to-br from-orange-900/40 to-orange-800/20 p-6 rounded-xl border border-orange-500/50">
            <div className="text-3xl font-bold text-white mb-1">150M</div>
            <div className="text-gray-300 text-sm">Monthly Users</div>
          </div>
          <div className="bg-gradient-to-br from-amber-900/40 to-amber-800/20 p-6 rounded-xl border border-amber-500/50">
            <div className="text-3xl font-bold text-white mb-1">200K</div>
            <div className="text-gray-300 text-sm">Token Context Window</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-900/40 to-yellow-800/20 p-6 rounded-xl border border-yellow-500/50">
            <div className="text-3xl font-bold text-white mb-1">6.2x</div>
            <div className="text-gray-300 text-sm">Balanced Content Advantage</div>
          </div>
          <div className="bg-gradient-to-br from-orange-900/40 to-orange-800/20 p-6 rounded-xl border border-orange-500/50">
            <div className="text-3xl font-bold text-white mb-1">Claude 3</div>
            <div className="text-gray-300 text-sm">Latest Model Family</div>
          </div>
        </div>

        {/* What is Claude */}
        <div className="bg-gradient-to-r from-gray-900/60 to-orange-900/20 backdrop-blur-sm p-8 rounded-xl border border-orange-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Shield className="h-8 w-8 text-orange-400 mr-3" />
            What is Claude?
          </h2>
          
          <p className="text-gray-200 text-lg mb-6 leading-relaxed">
            Claude, developed by Anthropic, is an AI assistant designed with Constitutional AI—a framework that makes it helpful, harmless, and honest. Unlike models optimized purely for capability, Claude is specifically trained to be thoughtful, balanced, and ethically aware. With a 200,000 token context window (about 500 pages), Claude can process and understand extremely long documents, making it ideal for researchers, analysts, and professionals who need deep, nuanced understanding.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {claudeFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="bg-orange-900/20 p-6 rounded-xl border border-orange-500/50">
                  <Icon className="h-10 w-10 text-orange-400 mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-8 bg-amber-900/20 p-6 rounded-lg border-l-4 border-amber-400">
            <h3 className="font-semibold text-amber-300 mb-3">Why Claude Matters for SEO</h3>
            <p className="text-gray-300">
              Claude's 150 million users are often professionals, researchers, and thoughtful consumers who value depth over quick answers. Claude's Constitutional AI training means it actively filters for quality, balance, and ethical content. Low-quality, biased, or misleading content gets deprioritized. This makes Claude citations particularly valuable—they represent true quality endorsement, not just keyword matching. The massive 200K context window also means comprehensive, long-form content isn't just tolerated—it's preferred.
            </p>
          </div>
        </div>

        {/* Optimization Strategies */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <Target className="h-8 w-8 text-orange-400 mr-3" />
            5 Core Claude Optimization Strategies
          </h2>
          
          <div className="space-y-6">
            {optimizationStrategies.map((item, index) => (
              <div key={index} className="bg-gradient-to-r from-gray-900/60 to-orange-900/20 backdrop-blur-sm p-8 rounded-xl border border-orange-500/50">
                <div className="flex items-start mb-4">
                  <div className="bg-orange-500 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3">{item.strategy}</h3>
                    
                    <div className="mb-4">
                      <h4 className="text-orange-300 font-semibold mb-2">Why This Matters:</h4>
                      <p className="text-gray-300">{item.why}</p>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-orange-300 font-semibold mb-2">How to Implement:</h4>
                      <p className="text-gray-300">{item.how}</p>
                    </div>

                    <div className="bg-orange-900/30 p-4 rounded border border-orange-500/50">
                      <p className="text-orange-200 text-sm font-semibold">
                        <strong>Impact:</strong> {item.impact}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Approaches */}
        <div className="bg-gradient-to-r from-gray-900/60 to-amber-900/20 backdrop-blur-sm p-8 rounded-xl border border-amber-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <FileText className="h-8 w-8 text-amber-400 mr-3" />
            Content Approaches That Win Claude Citations
          </h2>
          
          <div className="space-y-6">
            {contentApproaches.map((approach, index) => (
              <div key={index} className="bg-amber-900/20 p-6 rounded-xl border border-amber-500/50">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white">{approach.approach}</h3>
                  <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ml-4">
                    {approach.citationRate}
                  </span>
                </div>
                <p className="text-gray-300 mb-3"><strong className="text-amber-300">Why:</strong> {approach.why}</p>
                <div className="bg-amber-900/30 p-4 rounded border border-amber-500/50">
                  <p className="text-amber-200 text-sm"><strong>Example:</strong> {approach.example}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Writing Examples */}
        <div className="bg-gradient-to-r from-gray-900/60 to-yellow-900/20 backdrop-blur-sm p-8 rounded-xl border border-yellow-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Sparkles className="h-8 w-8 text-yellow-400 mr-3" />
            Writing for Claude: Before & After
          </h2>
          
          <div className="space-y-8">
            {writingExamples.map((example, index) => (
              <div key={index} className="space-y-4">
                <div className="bg-rose-900/20 p-6 rounded-lg border-l-4 border-rose-400">
                  <div className="text-rose-300 font-semibold mb-2">❌ Absolutist (Low Citations):</div>
                  <p className="text-gray-300 italic">"{example.bad}"</p>
                </div>

                <div className="bg-emerald-900/20 p-6 rounded-lg border-l-4 border-emerald-400">
                  <div className="text-emerald-300 font-semibold mb-2">✅ Nuanced (High Citations):</div>
                  <p className="text-gray-300 italic">"{example.good}"</p>
                </div>

                <div className="bg-yellow-900/20 p-4 rounded border border-yellow-500/50">
                  <p className="text-yellow-200 text-sm"><strong>Why it works:</strong> {example.why}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ethical Framing */}
        <div className="bg-gradient-to-r from-gray-900/60 to-emerald-900/20 backdrop-blur-sm p-8 rounded-xl border border-emerald-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Shield className="h-8 w-8 text-emerald-400 mr-3" />
            The Power of Ethical Framing
          </h2>
          
          <p className="text-gray-300 mb-6">
            Claude's Constitutional AI actively checks for harmful or misleading content. Ethical framing isn't just nice to have—it's critical for citations:
          </p>

          <div className="space-y-6">
            {ethicalFraming.map((item, index) => (
              <div key={index} className="bg-emerald-900/20 p-6 rounded-xl border border-emerald-500/50">
                <h3 className="text-lg font-bold text-white mb-4">{item.topic}</h3>
                
                <div className="mb-4">
                  <div className="text-rose-300 font-semibold mb-2 text-sm">❌ Without Ethical Framing:</div>
                  <p className="text-gray-400 italic text-sm">"{item.withoutEthics}"</p>
                </div>

                <div className="mb-4">
                  <div className="text-emerald-300 font-semibold mb-2 text-sm">✅ With Ethical Framing:</div>
                  <p className="text-gray-300 italic text-sm">"{item.withEthics}"</p>
                </div>

                <div className="bg-emerald-900/30 p-3 rounded border border-emerald-500/50">
                  <p className="text-emerald-200 text-sm font-semibold">{item.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Length Guidance */}
        <div className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <BookOpen className="h-8 w-8 text-blue-400 mr-3" />
            Claude's Context Window Advantage
          </h2>
          
          <div className="bg-gray-950 p-6 rounded-lg border border-blue-500/50">
            <pre className="text-blue-300 text-sm whitespace-pre-wrap"><code>{lengthGuidance}</code></pre>
          </div>
        </div>

        {/* Claude vs Others */}
        <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <Award className="h-8 w-8 text-purple-400 mr-3" />
            Claude vs Other AI Platforms
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-purple-500/50">
                  <th className="text-left p-4 text-purple-300 font-semibold">Factor</th>
                  <th className="text-left p-4 text-orange-300 font-semibold">Claude</th>
                  <th className="text-left p-4 text-gray-400 font-semibold">ChatGPT/Others</th>
                </tr>
              </thead>
              <tbody>
                {claudeVsOthers.map((row, index) => (
                  <tr key={index} className="border-b border-gray-700/50">
                    <td className="p-4 text-white font-medium">{row.factor}</td>
                    <td className="p-4 text-gray-300">{row.claude}</td>
                    <td className="p-4 text-gray-400">{row.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Wins */}
        <div className="bg-gradient-to-r from-orange-900/30 to-amber-900/30 p-8 rounded-xl border border-orange-500/50 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Zap className="h-7 w-7 text-orange-400 mr-3" />
            8 Quick Claude SEO Wins (Start This Week)
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickWins.map((win, index) => (
              <div key={index} className="flex items-start bg-orange-900/20 p-4 rounded-lg">
                <CheckCircle className="h-5 w-5 text-orange-400 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-200">{win}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="bg-gradient-to-r from-gray-900/60 to-rose-900/20 backdrop-blur-sm p-8 rounded-xl border border-rose-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">
            5 Critical Claude SEO Mistakes
          </h2>
          
          <div className="space-y-6">
            {mistakes.map((item, index) => (
              <div key={index} className="border-l-4 border-rose-400 pl-6">
                <h3 className="text-lg font-bold text-rose-300 mb-2">❌ {item.mistake}</h3>
                <p className="text-gray-300"><strong className="text-white">Fix:</strong> {item.fix}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-orange-900/40 via-amber-900/40 to-yellow-900/40 backdrop-blur-sm p-12 rounded-xl border border-orange-500/50 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Master Claude Citations?</h2>
          <p className="text-gray-200 text-xl mb-8 max-w-2xl mx-auto">
            Audit your content depth, balance, and ethical framing for Claude's Constitutional AI standards.
          </p>
          
          <Link href="/">
            <a className="inline-flex items-center bg-gradient-to-r from-orange-500 to-amber-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:from-orange-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105">
              <Zap className="h-6 w-6 mr-2" />
              Free Claude Readiness Audit
            </a>
          </Link>

          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-300">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              Content depth analysis
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              Balance check
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              Ethical framing score
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link href="/ai-seo">
            <a className="text-orange-400 hover:text-orange-300 flex items-center justify-center transition-colors">
              <ArrowRight className="h-4 w-4 mr-2 transform rotate-180" />
              Back to Complete AI SEO Guide
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  )
}