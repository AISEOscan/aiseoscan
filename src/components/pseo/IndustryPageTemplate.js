import { Bot, FileText, Award, CheckCircle, ArrowRight, Target, Zap, Lightbulb, Eye, Globe, MessageSquare, BarChart3, TrendingUp, AlertTriangle, Users, Server, Search, Code, Layers, Shield, Clock, DollarSign, TrendingDown, XCircle, List, BookOpen } from 'lucide-react'
import Link from 'next/link'

export default function IndustryPageTemplate({ pageData }) {
  const {
    title,
    meta_description,
    industry,
    industry_name,
    content_type,
    slug,
    hero_section,
    introduction,
    main_content,
    challenges,
    solutions,
    implementation,
    mistakes,
    checklist,
    best_practices,
    code_examples,
    measurement,
    faq,
    conclusion
  } = pageData

  // CTA Component for reuse
  const ScanCTA = ({ style = "primary", text, subtitle }) => {
    const styles = {
      primary: "bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500",
      secondary: "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500",
      outline: "border-2 border-pink-500 hover:bg-pink-500/10"
    }
    
    return (
      <div className="bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-blue-900/40 border border-pink-500/50 p-8 rounded-xl backdrop-blur-sm text-center">
        <h3 className="text-2xl font-bold text-white mb-3">
          {text || `Check Your ${industry_name} Website's AI SEO Score`}
        </h3>
        {subtitle && (
          <p className="text-gray-300 mb-6 text-lg">
            {subtitle}
          </p>
        )}
        <Link href="https://aiseoscan.dev">
          <button className={`${styles[style]} text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl`}>
            <span className="flex items-center justify-center">
              <Search className="mr-2 h-5 w-5" />
              Scan Your Website Free
            </span>
          </button>
        </Link>
        <p className="text-gray-400 text-sm mt-4">
          Get instant AI SEO score + 20-page detailed report with exact code fixes
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <Bot className="h-16 w-16 text-pink-400 mr-4" />
         <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent leading-tight pb-2">
            {hero_section.headline}
          </h1>
        </div>
        <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
          {hero_section.subheadline}
        </p>
        
        <div className="bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-blue-900/30 border border-pink-500/50 p-6 rounded-xl backdrop-blur-sm inline-block mb-10">
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <div className="text-center">
              <p className="text-3xl font-bold text-pink-400">{hero_section.stats.ai_growth}</p>
              <p className="text-gray-300 text-sm">AI Search Growth</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-400">{hero_section.stats.industry_adoption}</p>
              <p className="text-gray-300 text-sm">{industry_name} Adoption</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-400">{hero_section.stats.visibility_impact}</p>
              <p className="text-gray-300 text-sm">Visibility Impact</p>
            </div>
          </div>
        </div>

        {/* First CTA */}
        <ScanCTA 
          text={`Get Your Free ${industry_name} AI SEO Analysis`}
          subtitle="Scan takes 60 seconds • No credit card required • Instant results"
        />
      </div>

      {/* Introduction Section */}
      <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-10">
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
          <Lightbulb className="mr-3 text-yellow-400" />
          {introduction.title}
        </h2>
        <div className="space-y-4 text-gray-200 text-lg leading-relaxed">
          {introduction.paragraphs.map((para, index) => (
            <p key={index}>{para}</p>
          ))}
        </div>
        
        {introduction.key_points && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {introduction.key_points.map((point, index) => (
              <div key={index} className="bg-purple-900/20 p-5 rounded-lg border border-purple-500/30">
                <CheckCircle className="h-6 w-6 text-green-400 mb-3" />
                <h4 className="font-semibold text-white mb-2">{point.title}</h4>
                <p className="text-sm text-gray-300">{point.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

     {/* Main Content Sections - Dynamic based on content_type */}
{content_type === 'guide' && main_content && (
  <>
    {main_content.sections.map((section, index) => (
      <div key={index} className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-8">
        <div className="flex items-start mb-6">
          <div className="bg-purple-900/40 p-3 rounded-lg mr-4">
            <FileText className="h-8 w-8 text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-4">{section.title}</h3>
            <p className="text-gray-200 text-lg mb-6 leading-relaxed">
              {section.introduction}
            </p>
          </div>
        </div>
        
        {section.strategies && (
          <div className="space-y-4 mb-6">
            <h4 className="font-semibold text-purple-400 mb-4">Core Implementation Strategies:</h4>
            {section.strategies.map((strategy, strategyIndex) => (
              <div key={strategyIndex} className="flex items-start text-gray-300 mb-3">
                <ArrowRight className="h-4 w-4 text-purple-400 mr-2 mt-1 flex-shrink-0" />
                <span className="leading-relaxed">{strategy}</span>
              </div>
            ))}
          </div>
        )}

        {section.benefits && (
          <div className="bg-blue-900/20 p-5 rounded-lg border-l-4 border-blue-400">
            <h4 className="font-semibold text-blue-300 mb-3 flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Why This Matters for {industry_name}
            </h4>
            <ul className="space-y-2">
              {section.benefits.map((benefit, benefitIndex) => (
                <li key={benefitIndex} className="flex items-start text-blue-200">
                  <CheckCircle className="h-4 w-4 text-blue-400 mr-2 mt-1 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    ))}
  </>
)}

      {/* Challenges Section */}
      {challenges && (
        <div className="bg-gradient-to-r from-gray-900/60 to-red-900/20 backdrop-blur-sm p-8 rounded-xl border border-red-500/50 mb-8">
          <div className="flex items-start mb-6">
            <AlertTriangle className="h-10 w-10 text-red-400 mr-4 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">{challenges.title}</h3>
              <p className="text-gray-200 text-lg leading-relaxed">{challenges.introduction}</p>
            </div>
          </div>
          
          <div className="space-y-5">
            {challenges.items.map((challenge, index) => (
              <div key={index} className="bg-gray-800/40 p-6 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-300 mb-3 text-xl flex items-center">
                  <span className="bg-red-900/40 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">
                    {index + 1}
                  </span>
                  {challenge.title}
                </h4>
                <p className="text-gray-300 mb-3 leading-relaxed">{challenge.description}</p>
                <div className="bg-red-900/20 p-4 rounded border border-red-500/30">
                  <p className="text-sm text-red-200"><span className="font-semibold">Impact:</span> {challenge.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Second CTA - After Challenges */}
      <div className="my-10">
        <ScanCTA 
          style="secondary"
          text="Don't Let These Issues Hurt Your Rankings"
          subtitle="Get a comprehensive AI SEO analysis and learn exactly what to fix"
        />
      </div>

      {/* Solutions/Implementation Section */}
      {solutions && (
        <div className="bg-gradient-to-r from-gray-900/60 to-green-900/20 backdrop-blur-sm p-8 rounded-xl border border-green-500/50 mb-8">
          <div className="flex items-start mb-6">
            <div className="bg-green-900/40 p-3 rounded-lg mr-4">
              <Target className="h-8 w-8 text-green-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">{solutions.title}</h3>
              <p className="text-gray-200 text-lg leading-relaxed">{solutions.introduction}</p>
            </div>
          </div>
          
          <div className="space-y-6">
            {solutions.items.map((solution, index) => (
              <div key={index} className="bg-gray-800/30 p-6 rounded-lg border border-green-500/30">
                <h4 className="font-bold text-green-300 mb-3 text-xl flex items-center">
                  <CheckCircle className="h-6 w-6 mr-3 text-green-400" />
                  {solution.title}
                </h4>
                <p className="text-gray-300 mb-4 leading-relaxed">{solution.description}</p>
                
                {solution.steps && (
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-green-400 mb-2">Implementation Steps:</p>
                    {solution.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-start bg-gray-900/50 p-3 rounded">
                        <span className="bg-green-900/40 text-green-300 rounded-full w-6 h-6 flex items-center justify-center mr-3 text-sm font-bold flex-shrink-0 mt-0.5">
                          {stepIndex + 1}
                        </span>
                        <span className="text-gray-300">{step}</span>
                      </div>
                    ))}
                  </div>
                )}

                {solution.expected_result && (
                  <div className="mt-4 bg-green-900/20 p-4 rounded border border-green-500/30">
                    <p className="text-sm text-green-200">
                      <span className="font-semibold">Expected Result:</span> {solution.expected_result}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mistakes Section - for 'mistakes' content type */}
      {mistakes && (
        <div className="bg-gradient-to-r from-gray-900/60 to-orange-900/20 backdrop-blur-sm p-8 rounded-xl border border-orange-500/50 mb-8">
          <div className="flex items-start mb-6">
            <XCircle className="h-10 w-10 text-orange-400 mr-4 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">{mistakes.title}</h3>
              <p className="text-gray-200 text-lg leading-relaxed">{mistakes.introduction}</p>
            </div>
          </div>
          
          <div className="space-y-6">
            {mistakes.items.map((mistake, index) => (
              <div key={index} className="bg-gray-800/40 p-6 rounded-lg border-l-4 border-orange-500">
                <div className="flex items-start mb-4">
                  <div className="bg-orange-900/40 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                    <XCircle className="h-6 w-6 text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-orange-300 mb-2 text-xl">{mistake.title}</h4>
                    <p className="text-gray-300 mb-3 leading-relaxed">{mistake.description}</p>
                  </div>
                </div>
                
                <div className="bg-orange-900/20 p-4 rounded mb-3">
                  <p className="text-sm text-orange-200">
                    <span className="font-semibold">Why It's Harmful:</span> {mistake.why_harmful}
                  </p>
                </div>

                <div className="bg-green-900/20 p-4 rounded border border-green-500/30">
                  <p className="text-sm font-semibold text-green-400 mb-2">✓ How to Fix It:</p>
                  <p className="text-gray-300">{mistake.how_to_fix}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Checklist Section - for 'checklist' content type */}
      {checklist && (
        <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-8">
          <div className="flex items-start mb-6">
            <List className="h-10 w-10 text-purple-400 mr-4 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">{checklist.title}</h3>
              <p className="text-gray-200 text-lg leading-relaxed">{checklist.introduction}</p>
            </div>
          </div>
          
          {checklist.categories.map((category, catIndex) => (
            <div key={catIndex} className="mb-8 last:mb-0">
              <h4 className="text-xl font-bold text-purple-300 mb-4 flex items-center">
                <Layers className="h-6 w-6 mr-3" />
                {category.category}
              </h4>
              <div className="space-y-3">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="bg-gray-800/30 p-5 rounded-lg border border-purple-500/30 hover:border-purple-400/50 transition-colors">
                    <div className="flex items-start">
                      <div className="bg-purple-900/40 rounded p-1 mr-4 mt-1">
                        <CheckCircle className="h-5 w-5 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-white mb-2">{item.task}</h5>
                        <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
                        {item.priority && (
                          <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                            item.priority === 'High' ? 'bg-red-900/40 text-red-300 border border-red-500/50' :
                            item.priority === 'Medium' ? 'bg-yellow-900/40 text-yellow-300 border border-yellow-500/50' :
                            'bg-blue-900/40 text-blue-300 border border-blue-500/50'
                          }`}>
                            {item.priority} Priority
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Best Practices Section - for 'best-practices' content type */}
      {best_practices && (
        <div className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 mb-8">
          <div className="flex items-start mb-6">
            <Award className="h-10 w-10 text-blue-400 mr-4 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">{best_practices.title}</h3>
              <p className="text-gray-200 text-lg leading-relaxed">{best_practices.introduction}</p>
            </div>
          </div>
          
          <div className="space-y-6">
            {best_practices.items.map((practice, index) => (
              <div key={index} className="bg-gray-800/30 p-6 rounded-lg border border-blue-500/30">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-900/40 p-2 rounded mr-4">
                    <Award className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-blue-300 mb-2 text-xl">{practice.title}</h4>
                    <p className="text-gray-300 mb-4 leading-relaxed">{practice.description}</p>
                  </div>
                </div>
                
                {practice.implementation && (
                  <div className="bg-gray-900/50 p-4 rounded mb-3">
                    <p className="text-sm font-semibold text-blue-400 mb-2">Implementation:</p>
                    <p className="text-gray-300">{practice.implementation}</p>
                  </div>
                )}

                {practice.pro_tip && (
                  <div className="bg-blue-900/20 p-4 rounded border-l-4 border-blue-400">
                    <p className="text-sm text-blue-200">
                      <Lightbulb className="inline h-4 w-4 mr-2 text-yellow-400" />
                      <span className="font-semibold">Pro Tip:</span> {practice.pro_tip}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Third CTA - Mid Content */}
      <div className="my-10">
        <ScanCTA 
          text={`Ready to Optimize Your ${industry_name} Website?`}
          subtitle="Get your complete AI SEO report with specific fixes for your industry"
        />
      </div>

      {/* Code Examples Section */}
      {code_examples && (
        <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-8">
          <div className="flex items-start mb-6">
            <Code className="h-10 w-10 text-purple-400 mr-4 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">{code_examples.title}</h3>
              <p className="text-gray-200 text-lg leading-relaxed">{code_examples.introduction}</p>
            </div>
          </div>
          
          <div className="space-y-6">
            {code_examples.examples.map((example, index) => (
              <div key={index} className="bg-gray-800/40 p-6 rounded-lg border border-purple-500/30">
                <h4 className="font-bold text-purple-300 mb-3 text-lg">{example.title}</h4>
                <p className="text-gray-300 mb-4">{example.description}</p>
                <div className="bg-gray-950 p-4 rounded border border-gray-700 overflow-x-auto">
                  <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
                    {example.code}
                  </pre>
                </div>
                {example.note && (
                  <p className="text-sm text-gray-400 mt-3 italic">Note: {example.note}</p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gradient-to-r from-pink-900/30 to-purple-900/30 p-6 rounded-lg border border-pink-500/50">
            <p className="text-pink-200 text-center text-lg font-semibold">
              📄 Get 50+ more industry-specific code examples in your full AI SEO report
            </p>
          </div>
        </div>
      )}

      {/* Measurement & Analytics Section */}
      {measurement && (
        <div className="bg-gradient-to-r from-gray-900/60 to-green-900/20 backdrop-blur-sm p-8 rounded-xl border border-green-500/50 mb-8">
          <div className="flex items-start mb-6">
            <BarChart3 className="h-10 w-10 text-green-400 mr-4 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">{measurement.title}</h3>
              <p className="text-gray-200 text-lg leading-relaxed">{measurement.introduction}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {measurement.kpis.map((kpi, index) => (
              <div key={index} className="bg-gray-800/30 p-5 rounded-lg border border-green-500/30">
                <div className="flex items-start">
                  <TrendingUp className="h-6 w-6 text-green-400 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-green-300 mb-2">{kpi.metric}</h4>
                    <p className="text-gray-300 text-sm mb-2">{kpi.description}</p>
                    <p className="text-xs text-green-400 font-semibold">Target: {kpi.target}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {measurement.timeline && (
            <div className="bg-gray-800/30 p-6 rounded-lg border border-green-500/30">
              <h4 className="font-semibold text-green-400 mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Expected Timeline
              </h4>
              <div className="space-y-3">
                {measurement.timeline.map((phase, index) => (
                  <div key={index} className="flex items-start">
                    <span className="bg-green-900/40 text-green-300 rounded-full w-8 h-8 flex items-center justify-center mr-4 text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-white">{phase.period}</p>
                      <p className="text-gray-300 text-sm">{phase.expectation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* FAQ Section */}
      {faq && (
        <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <MessageSquare className="h-8 w-8 text-purple-400 mr-3" />
            Frequently Asked Questions
          </h3>
          <div className="space-y-5">
            {faq.map((item, index) => (
              <div key={index} className="bg-gray-800/30 p-6 rounded-lg border border-purple-500/30">
                <h4 className="font-bold text-purple-300 mb-3 text-lg">{item.question}</h4>
                <p className="text-gray-300 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fourth CTA - Before Conclusion */}
      <div className="my-10">
        <ScanCTA 
          style="primary"
          text="Get Your Complete AI SEO Audit Now"
          subtitle="20+ page report • Exact code fixes • Implementation timeline • Industry-specific recommendations"
        />
      </div>

      {/* Conclusion Section */}
      {conclusion && (
        <div className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Target className="h-8 w-8 text-blue-400 mr-3" />
            {conclusion.title}
          </h3>
          <div className="space-y-4 text-gray-200 text-lg leading-relaxed">
            {conclusion.paragraphs.map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </div>

          {conclusion.next_steps && (
            <div className="mt-8 bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
              <h4 className="font-semibold text-blue-300 mb-4 flex items-center">
                <ArrowRight className="h-5 w-5 mr-2" />
                Next Steps for {industry_name} Websites
              </h4>
              <ol className="space-y-3">
                {conclusion.next_steps.map((step, index) => (
                  <li key={index} className="flex items-start text-gray-300">
                    <span className="bg-blue-900/40 text-blue-300 rounded-full w-6 h-6 flex items-center justify-center mr-3 text-sm font-bold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}

      {/* Final CTA */}
      <div className="mb-12">
        <div className="bg-gradient-to-r from-pink-900/40 via-purple-900/40 to-blue-900/40 border-2 border-pink-500/60 p-10 rounded-xl backdrop-blur-sm text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Start Optimizing Your {industry_name} Website for AI Search Today
          </h3>
          <p className="text-gray-200 mb-6 text-lg max-w-2xl mx-auto">
            Get instant access to your AI SEO score and comprehensive optimization report. 
            No credit card required. Results in 60 seconds.
          </p>
          <Link href="https://aiseoscan.dev">
            <button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-5 px-10 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl">
              <span className="flex items-center justify-center">
                <Bot className="mr-3 h-6 w-6" />
                Scan Your Website Now - It's Free
              </span>
            </button>
          </Link>
          <div className="mt-6 flex items-center justify-center gap-8 text-sm text-gray-300">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              <span>Instant Results</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              <span>20+ Page Report</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              <span>Exact Code Fixes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Industries - Internal Linking */}
      {pageData.related_industries && pageData.related_industries.length > 0 && (
        <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Globe className="h-6 w-6 text-purple-400 mr-3" />
            AI SEO Guides for Related Industries
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pageData.related_industries.map((related, index) => (
              <Link key={index} href={related.url}>
                <div className="bg-gray-800/30 p-4 rounded-lg border border-purple-500/30 hover:border-purple-400 transition-colors cursor-pointer">
                  <h4 className="font-semibold text-purple-300 mb-2">{related.name}</h4>
                  <p className="text-gray-400 text-sm flex items-center">
                    Read guide <ArrowRight className="ml-2 h-4 w-4" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}