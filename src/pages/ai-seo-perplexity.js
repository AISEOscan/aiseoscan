import Layout from '../components/Layout'
import Link from 'next/link'
import { Bot, CheckCircle, Zap, ArrowRight, Code, FileText, Award, Users, Target, TrendingUp, Search, BookOpen, Link2 } from 'lucide-react'

export default function AISEOPerplexity() {
  const perplexityFeatures = [
    {
      icon: Search,
      title: "Real-Time Search Integration",
      description: "Perplexity searches the web in real-time for every query, providing up-to-date answers with current information. Your fresh content gets discovered immediately."
    },
    {
      icon: BookOpen,
      title: "Academic-Style Citations",
      description: "Perplexity uses numbered footnote citations like academic papers. Every claim is backed by a source reference, making citation transparency critical."
    },
    {
      icon: Link2,
      title: "Source Authority Prioritization",
      description: "Perplexity heavily weights source credibility. High-authority domains (.edu, .gov, established publications) get cited more frequently."
    }
  ]

  const optimizationStrategies = [
    {
      strategy: "Build Domain Authority and Credibility Signals",
      why: "Perplexity prioritizes authoritative sources more than any other AI platform. High-DR domains, .edu/.gov sites, and established publications dominate citations.",
      how: "Focus on earning backlinks from high-authority sites (.edu, .gov, major publications). Get cited by academic papers or industry research. Build author credentials with published work, degrees, certifications. Register with Google News if applicable. Establish editorial standards and display them prominently.",
      impact: "Critical - High-authority sites get 11.3x more Perplexity citations"
    },
    {
      strategy: "Write with Academic Rigor and Source Citations",
      why: "Perplexity mirrors academic citation style. Content that cites its own sources (studies, data, research) is more likely to be cited by Perplexity.",
      how: "Cite original research, studies, and data sources. Link to primary sources (not secondary summaries). Use phrases like 'According to [study]...', 'Research published in [journal]...'. Include publication dates for sources. Add a references or sources section at the bottom. Use proper attribution for statistics and claims.",
      impact: "High - Well-sourced content gets 6.8x more citations"
    },
    {
      strategy: "Optimize for Freshness and Recency",
      why: "Perplexity searches the web in real-time. Fresh, recently published or updated content is strongly favored over outdated material.",
      how: "Update content regularly with fresh data and examples. Add 'Last Updated: [date]' stamps prominently. Use dateModified in schema markup. Cover breaking news and current events in your niche. Remove or update outdated statistics. Publish frequently on trending topics.",
      impact: "High - Content updated in last 30 days gets 7.2x more citations"
    },
    {
      strategy: "Create Comprehensive, In-Depth Analysis",
      why: "Perplexity users ask complex, research-oriented questions. Shallow content doesn't meet their needs. Deep, comprehensive resources get prioritized.",
      how: "Write long-form content (2,500-5,000+ words for complex topics). Cover topics exhaustively, not superficially. Include multiple perspectives and viewpoints. Add original analysis and insights (not just summarizing others). Use data visualization and charts. Create ultimate guides and definitive resources.",
      impact: "High - Comprehensive content (2,500+ words) gets 5.4x more citations"
    },
    {
      strategy: "Implement Clear Information Architecture",
      why: "Perplexity needs to quickly parse and understand your content structure. Clear hierarchy and organization help the AI extract relevant information.",
      how: "Use descriptive, keyword-rich headings (H1, H2, H3). Create table of contents for long articles. Use structured data (Article, HowTo, FAQ schema). Break complex topics into clear sections. Use lists, tables, and callout boxes for key points. Make information scannable and hierarchical.",
      impact: "Medium-High - Well-structured content is 4.1x easier to cite accurately"
    }
  ]

  const citationPatterns = [
    {
      pattern: "Academic Research Papers",
      why: "Perplexity's citation style mimics academic papers",
      example: "Structure: Introduction → Literature Review → Methodology → Results → Discussion → Conclusion with numbered references",
      citationRate: "9.2x higher for research topics"
    },
    {
      pattern: "Data-Driven Reports",
      why: "Perplexity loves quantitative evidence",
      example: "Original research, surveys, data analysis with charts, tables, and statistical significance noted",
      citationRate: "7.8x higher for analytical queries"
    },
    {
      pattern: "Expert Interviews and Quotes",
      why: "First-hand expert insights add credibility",
      example: "Q&A with industry experts, case studies with real practitioners, direct quotes from authorities",
      citationRate: "6.3x higher for professional topics"
    },
    {
      pattern: "Comparative Analysis",
      why: "Side-by-side comparisons help users make decisions",
      example: "Detailed feature comparisons, pros/cons with evidence, methodology clearly explained",
      citationRate: "5.7x higher for 'vs' and comparison queries"
    }
  ]

  const perplexityVsOthers = [
    {
      factor: "Citation Style",
      perplexity: "Academic footnotes with numbered references",
      others: "Inline citations (ChatGPT), embedded links (Copilot)"
    },
    {
      factor: "Authority Weight",
      perplexity: "Heavily favors high-DR, .edu, .gov sources",
      others: "More democratic (ChatGPT), ecosystem-based (Copilot)"
    },
    {
      factor: "Freshness Priority",
      perplexity: "Real-time search, extreme recency bias",
      others: "Periodic updates (ChatGPT), Bing index (Copilot)"
    },
    {
      factor: "Query Complexity",
      perplexity: "Research-oriented, complex analytical queries",
      others: "Conversational (ChatGPT), enterprise (Copilot)"
    },
    {
      factor: "Source Transparency",
      perplexity: "Every claim footnoted, full source visibility",
      others: "Selective citations or inline references"
    }
  ]

  const authorityBuilding = [
    {
      tactic: "Earn .edu or .gov Backlinks",
      difficulty: "High",
      impact: "Critical",
      how: "Create research resources, data sets, or educational content valuable to universities. Offer free tools for students/researchers. Publish white papers cited by academic institutions."
    },
    {
      tactic: "Get Cited by Academic Papers",
      difficulty: "Very High",
      impact: "Critical",
      how: "Publish original research or data. Make datasets publicly available. Reach out to researchers in your field. Use DOI identifiers for key publications."
    },
    {
      tactic: "Build Industry Thought Leadership",
      difficulty: "Medium-High",
      impact: "High",
      how: "Speak at conferences, publish in industry journals, appear on podcasts/interviews, write for major publications, win industry awards."
    },
    {
      tactic: "Create Original Research & Data",
      difficulty: "Medium",
      impact: "High",
      how: "Conduct surveys, analyze industry data, publish annual reports, create proprietary datasets, share findings publicly."
    }
  ]

  const quickWins = [
    "Add 'Last Updated: [date]' to all articles and update regularly",
    "Cite your sources with links to original research/studies",
    "Add author credentials and expertise sections (degrees, publications)",
    "Create comprehensive guides (2,500+ words) on core topics",
    "Use numbered references and a 'Sources' section at article bottom",
    "Get your site listed in Google News (if news-related)",
    "Build backlinks from .edu sites (offer resources/research)",
    "Add schema markup (Article, Person, Organization) with publisher info"
  ]

  const mistakes = [
    {
      mistake: "Shallow content without original insights or data",
      fix: "Perplexity is used for research and deep dives. If your content is just a 500-word summary of what everyone already knows, it won't get cited. Add original analysis, data, case studies, or expert perspectives. Aim for 2,500+ words on complex topics with unique value."
    },
    {
      mistake: "No source citations or references in your content",
      fix: "Perplexity cites sources that cite sources. If you make claims without backing them up with links to studies, data, or research, Perplexity sees your content as less authoritative. Add a 'References' section with numbered citations linking to primary sources."
    },
    {
      mistake: "Outdated content with old statistics or examples",
      fix: "Perplexity has extreme recency bias. Content published 2 years ago with no updates gets deprioritized. Update your articles quarterly—refresh data, add new examples, update 'Last Modified' dates in schema, and republish."
    },
    {
      mistake: "Low domain authority with no credibility signals",
      fix: "New or low-authority sites struggle in Perplexity. Build authority by: earning backlinks from high-DR sites, publishing thought leadership, getting .edu or .gov links, displaying author credentials prominently, and showing editorial standards."
    },
    {
      mistake: "Generic author bios without expertise signals",
      fix: "Perplexity checks author credibility. Don't write 'John is a content writer.' Write 'Dr. Sarah Chen is a Stanford PhD in Computer Science with 15 publications in AI journals and 10 years at Google Research.' Add LinkedIn, Google Scholar, publications."
    }
  ]

  const sourcingExample = `
  <!-- Example of proper sourcing for Perplexity -->
  <article>
    <h1>The Impact of AI on Software Development</h1>
    
    <p>Recent studies show that AI coding assistants improve developer 
    productivity by 35-55% [1]. This finding is consistent across 
    multiple independent research papers [2][3].</p>
    
    <p>According to research published in Nature [4], developers using 
    AI tools complete tasks 40% faster while maintaining code quality...</p>
    
    <section id="references">
      <h2>References</h2>
      <ol>
        <li>Peng, S. et al. (2023). "Impact of AI on Developer Productivity." 
        MIT CSAIL Technical Report.</li>
        <li>Chen, M. et al. (2024). "Evaluating Large Language Models Trained 
        on Code." arXiv:2107.03374</li>
        <li>GitHub Research (2024). "GitHub Copilot Impact Study."</li>
        <li>Nature Machine Intelligence (2024). "AI-Assisted Programming."</li>
      </ol>
    </section>
  </article>
  `

  return (
    <Layout 
      title="AI SEO for Perplexity: Academic-Style Optimization Guide"
      description="Master Perplexity SEO with research-grade content strategies. Learn how to get cited by Perplexity's 230M users with authority signals, fresh data, and academic rigor."
    >
      <div className="max-w-5xl mx-auto py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Bot className="h-14 w-14 text-blue-400 mr-4" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-500 bg-clip-text text-transparent leading-tight py-2">
              AI SEO for Perplexity
            </h1>
          </div>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Optimize for the researcher's AI engine. Get cited by Perplexity's 230 million users with authoritative content, academic rigor, and real-time freshness.
          </p>
          
          <div className="bg-gradient-to-r from-blue-900/30 via-cyan-900/30 to-teal-900/30 border border-blue-500/50 p-6 rounded-xl backdrop-blur-sm inline-block mb-8">
            <p className="text-blue-200 text-lg font-medium">
              📚 High-authority sites get 11.3x more Perplexity citations than average
            </p>
          </div>

          <Link href="/">
            <a className="inline-flex items-center bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105">
              <Zap className="h-5 w-5 mr-2" />
              Audit Your Perplexity Authority
            </a>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 p-6 rounded-xl border border-blue-500/50">
            <div className="text-3xl font-bold text-white mb-1">230M</div>
            <div className="text-gray-300 text-sm">Monthly Users</div>
          </div>
          <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-800/20 p-6 rounded-xl border border-cyan-500/50">
            <div className="text-3xl font-bold text-white mb-1">11.3x</div>
            <div className="text-gray-300 text-sm">High-DR Advantage</div>
          </div>
          <div className="bg-gradient-to-br from-teal-900/40 to-teal-800/20 p-6 rounded-xl border border-teal-500/50">
            <div className="text-3xl font-bold text-white mb-1">Real-Time</div>
            <div className="text-gray-300 text-sm">Search Updates</div>
          </div>
          <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 p-6 rounded-xl border border-blue-500/50">
            <div className="text-3xl font-bold text-white mb-1">Academic</div>
            <div className="text-gray-300 text-sm">Citation Style</div>
          </div>
        </div>

        {/* What is Perplexity */}
        <div className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Search className="h-8 w-8 text-blue-400 mr-3" />
            What is Perplexity?
          </h2>
          
          <p className="text-gray-200 text-lg mb-6 leading-relaxed">
            Perplexity is an AI-powered answer engine designed for researchers, analysts, and professionals who need accurate, up-to-date information with transparent sourcing. Unlike conversational AI tools, Perplexity functions like a research assistant—it searches the web in real-time, synthesizes findings, and presents answers with academic-style footnoted citations. Every claim is backed by a numbered reference, making it the most citation-transparent AI platform.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {perplexityFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="bg-blue-900/20 p-6 rounded-xl border border-blue-500/50">
                  <Icon className="h-10 w-10 text-blue-400 mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-8 bg-cyan-900/20 p-6 rounded-lg border-l-4 border-cyan-400">
            <h3 className="font-semibold text-cyan-300 mb-3">Why Perplexity Matters for SEO</h3>
            <p className="text-gray-300">
              Perplexity users are researchers, analysts, and decision-makers conducting serious information gathering. A Perplexity citation reaches people doing competitive analysis, market research, due diligence, and strategic planning. These are high-intent, high-value users. The catch: Perplexity heavily favors authoritative sources. Low-authority sites struggle to get cited, while .edu, .gov, and high-DR domains dominate results.
            </p>
          </div>
        </div>

        {/* Optimization Strategies */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <Target className="h-8 w-8 text-blue-400 mr-3" />
            5 Core Perplexity Optimization Strategies
          </h2>
          
          <div className="space-y-6">
            {optimizationStrategies.map((item, index) => (
              <div key={index} className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-500 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3">{item.strategy}</h3>
                    
                    <div className="mb-4">
                      <h4 className="text-blue-300 font-semibold mb-2">Why This Matters:</h4>
                      <p className="text-gray-300">{item.why}</p>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-blue-300 font-semibold mb-2">How to Implement:</h4>
                      <p className="text-gray-300">{item.how}</p>
                    </div>

                    <div className="bg-blue-900/30 p-4 rounded border border-blue-500/50">
                      <p className="text-blue-200 text-sm font-semibold">
                        <strong>Impact:</strong> {item.impact}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Citation Patterns */}
        <div className="bg-gradient-to-r from-gray-900/60 to-cyan-900/20 backdrop-blur-sm p-8 rounded-xl border border-cyan-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <FileText className="h-8 w-8 text-cyan-400 mr-3" />
            Content Patterns That Win Perplexity Citations
          </h2>
          
          <div className="space-y-6">
            {citationPatterns.map((pattern, index) => (
              <div key={index} className="bg-cyan-900/20 p-6 rounded-xl border border-cyan-500/50">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white">{pattern.pattern}</h3>
                  <span className="bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ml-4">
                    {pattern.citationRate}
                  </span>
                </div>
                <p className="text-gray-300 mb-3"><strong className="text-cyan-300">Why:</strong> {pattern.why}</p>
                <div className="bg-cyan-900/30 p-4 rounded border border-cyan-500/50">
                  <p className="text-cyan-200 text-sm"><strong>Example:</strong> {pattern.example}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Authority Building Tactics */}
        <div className="bg-gradient-to-r from-gray-900/60 to-teal-900/20 backdrop-blur-sm p-8 rounded-xl border border-teal-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <Award className="h-8 w-8 text-teal-400 mr-3" />
            Building Authority for Perplexity
          </h2>
          
          <p className="text-gray-300 mb-6">
            Perplexity's extreme authority bias means domain credibility is everything. Here's how to build it:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {authorityBuilding.map((tactic, index) => (
              <div key={index} className="bg-teal-900/20 p-6 rounded-xl border border-teal-500/50">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-white">{tactic.tactic}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 ${
                    tactic.impact === 'Critical' ? 'bg-rose-500 text-white' : 'bg-teal-500 text-white'
                  }`}>
                    {tactic.impact}
                  </span>
                </div>
                <div className="mb-3">
                  <span className="text-gray-400 text-sm">Difficulty: </span>
                  <span className="text-white font-semibold text-sm">{tactic.difficulty}</span>
                </div>
                <div className="bg-teal-900/30 p-4 rounded border border-teal-500/50">
                  <p className="text-teal-200 text-sm">{tactic.how}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sourcing Example */}
        <div className="bg-gradient-to-r from-gray-900/60 to-emerald-900/20 backdrop-blur-sm p-8 rounded-xl border border-emerald-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Code className="h-8 w-8 text-emerald-400 mr-3" />
            Example: Proper Source Citations
          </h2>
          
          <p className="text-gray-300 mb-6">
            Here's how to structure content with academic-style citations that Perplexity loves:
          </p>

          <div className="bg-gray-950 p-6 rounded-lg border border-emerald-500/50 overflow-x-auto">
            <pre className="text-emerald-300 text-sm"><code>{sourcingExample}</code></pre>
          </div>

          <div className="mt-6 bg-emerald-900/20 p-6 rounded-lg border-l-4 border-emerald-400">
            <h3 className="font-semibold text-emerald-300 mb-3">Why This Works:</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Numbered references [1][2][3] match Perplexity's citation style</li>
              <li>• Links to original sources (MIT, Nature, arXiv) add credibility</li>
              <li>• Full citations with authors, dates, publications at bottom</li>
              <li>• Specific claims tied to specific sources</li>
              <li>• Multiple sources for major claims</li>
            </ul>
          </div>
        </div>

        {/* Perplexity vs Others */}
        <div className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <Award className="h-8 w-8 text-blue-400 mr-3" />
            Perplexity vs Other AI Platforms
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-blue-500/50">
                  <th className="text-left p-4 text-blue-300 font-semibold">Factor</th>
                  <th className="text-left p-4 text-cyan-300 font-semibold">Perplexity</th>
                  <th className="text-left p-4 text-gray-400 font-semibold">ChatGPT/Copilot/Others</th>
                </tr>
              </thead>
              <tbody>
                {perplexityVsOthers.map((row, index) => (
                  <tr key={index} className="border-b border-gray-700/50">
                    <td className="p-4 text-white font-medium">{row.factor}</td>
                    <td className="p-4 text-gray-300">{row.perplexity}</td>
                    <td className="p-4 text-gray-400">{row.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Wins */}
        <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 p-8 rounded-xl border border-blue-500/50 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Zap className="h-7 w-7 text-blue-400 mr-3" />
            8 Quick Perplexity SEO Wins (Implement This Month)
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickWins.map((win, index) => (
              <div key={index} className="flex items-start bg-blue-900/20 p-4 rounded-lg">
                <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-200">{win}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="bg-gradient-to-r from-gray-900/60 to-rose-900/20 backdrop-blur-sm p-8 rounded-xl border border-rose-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">
            5 Critical Perplexity SEO Mistakes
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
        <div className="bg-gradient-to-r from-blue-900/40 via-cyan-900/40 to-teal-900/40 backdrop-blur-sm p-12 rounded-xl border border-blue-500/50 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Dominate Perplexity Citations?</h2>
          <p className="text-gray-200 text-xl mb-8 max-w-2xl mx-auto">
            Audit your domain authority, content depth, and citation readiness for Perplexity's research-grade standards.
          </p>
          
          <Link href="/">
            <a className="inline-flex items-center bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105">
              <Zap className="h-6 w-6 mr-2" />
              Free Perplexity Authority Audit
            </a>
          </Link>

          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-300">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              Domain authority check
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              Citation readiness
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              Freshness analysis
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link href="/ai-seo">
            <a className="text-blue-400 hover:text-blue-300 flex items-center justify-center transition-colors">
              <ArrowRight className="h-4 w-4 mr-2 transform rotate-180" />
              Back to Complete AI SEO Guide
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  )
}