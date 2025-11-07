import { Bot, FileText, Award, CheckCircle, ArrowRight, Target, Zap, Code, Server, Package, Wrench, AlertTriangle, TrendingUp, Download, ExternalLink, Settings } from 'lucide-react'
import Link from 'next/link'

export default function IndustryPlatformTemplate({ pageData }) {
  const {
    title,
    meta_description,
    industry,
    industry_name,
    platform,
    platform_name,
    slug,
    hero_section,
    introduction,
    platform_overview,
    technical_setup,
    schema_implementation,
    plugins_tools,
    optimization_steps,
    common_issues,
    advanced_tips,
    code_examples,
    performance,
    conclusion
  } = pageData

  // CTA Component
  const ScanCTA = ({ style = "primary", text, subtitle }) => {
    const styles = {
      primary: "bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500",
      secondary: "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
    }
    
    return (
      <div className="bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-blue-900/40 border border-pink-500/50 p-8 rounded-xl backdrop-blur-sm text-center">
        <h3 className="text-2xl font-bold text-white mb-3">
          {text || `Scan Your ${platform_name} Website`}
        </h3>
        {subtitle && (
          <p className="text-gray-300 mb-6 text-lg">
            {subtitle}
          </p>
        )}
        <Link href="https://aiseoscan.dev">
          <button className={`${styles[style]} text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl`}>
            <span className="flex items-center justify-center">
              <Bot className="mr-2 h-5 w-5" />
              Get Free AI SEO Analysis
            </span>
          </button>
        </Link>
        <p className="text-gray-400 text-sm mt-4">
          Platform-specific recommendations • Instant results • No credit card
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <Package className="h-16 w-16 text-pink-400 mr-4" />
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
              <p className="text-3xl font-bold text-pink-400">{platform_name}</p>
              <p className="text-gray-300 text-sm">Platform</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-400">{industry_name}</p>
              <p className="text-gray-300 text-sm">Industry</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-400">{hero_section.setup_time}</p>
              <p className="text-gray-300 text-sm">Setup Time</p>
            </div>
          </div>
        </div>

        <ScanCTA 
          text={`Analyze Your ${platform_name} ${industry_name} Website`}
          subtitle="Get platform-specific AI SEO recommendations in 60 seconds"
        />
      </div>

      {/* Introduction */}
      <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-10">
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
          <Target className="mr-3 text-purple-400" />
          Why {platform_name} for {industry_name} AI SEO?
        </h2>
        <div className="space-y-4 text-gray-200 text-lg leading-relaxed">
          {introduction.paragraphs.map((para, index) => (
            <p key={index}>{para}</p>
          ))}
        </div>

        {introduction.key_advantages && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {introduction.key_advantages.map((advantage, index) => (
              <div key={index} className="bg-purple-900/20 p-5 rounded-lg border border-purple-500/30">
                <CheckCircle className="h-6 w-6 text-green-400 mb-3" />
                <h4 className="font-semibold text-white mb-2">{advantage.title}</h4>
                <p className="text-sm text-gray-300">{advantage.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Platform Overview */}
      {platform_overview && (
        <div className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 mb-10">
          <div className="flex items-start mb-6">
            <Server className="h-10 w-10 text-blue-400 mr-4 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">{platform_overview.title}</h3>
              <p className="text-gray-200 text-lg leading-relaxed">{platform_overview.description}</p>
            </div>
          </div>

          {platform_overview.capabilities && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {platform_overview.capabilities.map((capability, index) => (
                <div key={index} className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
                  <h4 className="font-semibold text-blue-300 mb-2 flex items-center">
                    <Zap className="h-5 w-5 mr-2" />
                    {capability.feature}
                  </h4>
                  <p className="text-sm text-gray-300">{capability.benefit}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Technical Setup */}
      {technical_setup && (
        <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-10">
          <div className="flex items-start mb-6">
            <Settings className="h-10 w-10 text-purple-400 mr-4 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">{technical_setup.title}</h3>
              <p className="text-gray-200 text-lg leading-relaxed">{technical_setup.introduction}</p>
            </div>
          </div>

          {technical_setup.steps && (
            <div className="space-y-5">
              {technical_setup.steps.map((step, index) => (
                <div key={index} className="bg-gray-800/30 p-6 rounded-lg border-l-4 border-purple-500">
                  <div className="flex items-start">
                    <span className="bg-purple-900/40 text-purple-300 rounded-full w-10 h-10 flex items-center justify-center mr-4 text-lg font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <h4 className="font-bold text-white mb-2 text-lg">{step.title}</h4>
                      <p className="text-gray-300 mb-3 leading-relaxed">{step.description}</p>
                      {step.sub_steps && (
                        <ul className="space-y-2 ml-4">
                          {step.sub_steps.map((sub, subIndex) => (
                            <li key={subIndex} className="flex items-start text-gray-400 text-sm">
                              <ArrowRight className="h-4 w-4 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{sub}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Second CTA */}
      <div className="my-10">
        <ScanCTA 
          style="secondary"
          text="Ready to Optimize Your Site?"
          subtitle={`Get ${platform_name}-specific recommendations for ${industry_name}`}
        />
      </div>

      {/* Schema Implementation */}
      {schema_implementation && (
        <div className="bg-gradient-to-r from-gray-900/60 to-green-900/20 backdrop-blur-sm p-8 rounded-xl border border-green-500/50 mb-10">
          <div className="flex items-start mb-6">
            <Code className="h-10 w-10 text-green-400 mr-4 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">{schema_implementation.title}</h3>
              <p className="text-gray-200 text-lg leading-relaxed">{schema_implementation.introduction}</p>
            </div>
          </div>

          {schema_implementation.methods && (
            <div className="space-y-6">
              {schema_implementation.methods.map((method, index) => (
                <div key={index} className="bg-gray-800/30 p-6 rounded-lg border border-green-500/30">
                  <h4 className="font-bold text-green-300 mb-3 text-xl flex items-center">
                    <CheckCircle className="h-6 w-6 mr-3" />
                    {method.method}
                  </h4>
                  <p className="text-gray-300 mb-4 leading-relaxed">{method.description}</p>
                  
                  {method.steps && (
                    <div className="bg-gray-900/50 p-4 rounded">
                      <p className="text-sm font-semibold text-green-400 mb-3">Implementation:</p>
                      <ol className="space-y-2">
                        {method.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start text-gray-300 text-sm">
                            <span className="bg-green-900/40 text-green-300 rounded-full w-6 h-6 flex items-center justify-center mr-3 text-xs font-bold flex-shrink-0 mt-0.5">
                              {stepIndex + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Plugins & Tools */}
      {plugins_tools && (
        <div className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 mb-10">
          <div className="flex items-start mb-6">
            <Package className="h-10 w-10 text-blue-400 mr-4 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">{plugins_tools.title}</h3>
              <p className="text-gray-200 text-lg leading-relaxed">{plugins_tools.introduction}</p>
            </div>
          </div>

          {plugins_tools.recommended && (
            <div className="space-y-5">
              {plugins_tools.recommended.map((tool, index) => (
                <div key={index} className="bg-gray-800/30 p-6 rounded-lg border border-blue-500/30">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-blue-300 text-xl">{tool.name}</h4>
                    {tool.type && (
                      <span className="bg-blue-900/40 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold">
                        {tool.type}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 mb-4">{tool.description}</p>
                  
                  {tool.features && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-blue-400 mb-2">Key Features:</p>
                      <ul className="space-y-1">
                        {tool.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-start text-gray-400 text-sm">
                            <CheckCircle className="h-4 w-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {tool.setup_difficulty && (
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-400">Setup:</span>
                      <span className={`font-semibold ${
                        tool.setup_difficulty === 'Easy' ? 'text-green-400' :
                        tool.setup_difficulty === 'Medium' ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {tool.setup_difficulty}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Optimization Steps */}
      {optimization_steps && (
        <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-10">
          <div className="flex items-start mb-6">
            <TrendingUp className="h-10 w-10 text-purple-400 mr-4 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">{optimization_steps.title}</h3>
              <p className="text-gray-200 text-lg leading-relaxed">{optimization_steps.introduction}</p>
            </div>
          </div>

          {optimization_steps.categories && (
            <div className="space-y-8">
              {optimization_steps.categories.map((category, catIndex) => (
                <div key={catIndex}>
                  <h4 className="text-xl font-bold text-purple-300 mb-4 flex items-center">
                    <Wrench className="h-6 w-6 mr-3" />
                    {category.category}
                  </h4>
                  <div className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="bg-gray-800/30 p-5 rounded-lg border border-purple-500/30">
                        <h5 className="font-semibold text-white mb-2">{item.task}</h5>
                        <p className="text-gray-300 text-sm mb-3">{item.description}</p>
                        {item.impact && (
                          <div className="bg-purple-900/20 p-3 rounded">
                            <p className="text-sm text-purple-300">
                              <span className="font-semibold">Impact:</span> {item.impact}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Third CTA */}
      <div className="my-10">
        <ScanCTA 
          text={`Get Your ${platform_name} AI SEO Report`}
          subtitle="Detailed analysis with platform-specific fixes and code examples"
        />
      </div>

      {/* Common Issues */}
      {common_issues && (
        <div className="bg-gradient-to-r from-gray-900/60 to-red-900/20 backdrop-blur-sm p-8 rounded-xl border border-red-500/50 mb-10">
          <div className="flex items-start mb-6">
            <AlertTriangle className="h-10 w-10 text-red-400 mr-4 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">{common_issues.title}</h3>
              <p className="text-gray-200 text-lg leading-relaxed">{common_issues.introduction}</p>
            </div>
          </div>

          {common_issues.issues && (
            <div className="space-y-5">
              {common_issues.issues.map((issue, index) => (
                <div key={index} className="bg-gray-800/40 p-6 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-bold text-red-300 mb-3 text-lg flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    {issue.problem}
                  </h4>
                  <p className="text-gray-300 mb-4">{issue.description}</p>
                  <div className="bg-green-900/20 p-4 rounded border border-green-500/30">
                    <p className="text-sm font-semibold text-green-400 mb-2">✓ Solution:</p>
                    <p className="text-gray-300 text-sm">{issue.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Code Examples */}
      {code_examples && (
        <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-10">
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
                  <p className="text-sm text-gray-400 mt-3 italic">💡 {example.note}</p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gradient-to-r from-pink-900/30 to-purple-900/30 p-6 rounded-lg border border-pink-500/50">
            <p className="text-pink-200 text-center text-lg font-semibold">
              📄 Get 20+ more {platform_name}-specific code examples in your full report
            </p>
          </div>
        </div>
      )}

      {/* Performance Tips */}
      {performance && (
        <div className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 mb-10">
          <div className="flex items-start mb-6">
            <Zap className="h-10 w-10 text-blue-400 mr-4 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">{performance.title}</h3>
              <p className="text-gray-200 text-lg leading-relaxed">{performance.introduction}</p>
            </div>
          </div>

          {performance.optimizations && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {performance.optimizations.map((opt, index) => (
                <div key={index} className="bg-gray-800/30 p-5 rounded-lg border border-blue-500/30">
                  <h4 className="font-semibold text-blue-300 mb-2">{opt.area}</h4>
                  <p className="text-gray-300 text-sm mb-3">{opt.recommendation}</p>
                  {opt.expected_improvement && (
                    <p className="text-xs text-blue-400">
                      <TrendingUp className="inline h-3 w-3 mr-1" />
                      {opt.expected_improvement}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Conclusion */}
      {conclusion && (
        <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-10">
          <h3 className="text-2xl font-bold text-white mb-6">{conclusion.title}</h3>
          <div className="space-y-4 text-gray-200 text-lg leading-relaxed">
            {conclusion.paragraphs.map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </div>

          {conclusion.next_steps && (
            <div className="mt-8 bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
              <h4 className="font-semibold text-blue-300 mb-4">Next Steps:</h4>
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
            Start Optimizing Your {platform_name} {industry_name} Site Today
          </h3>
          <p className="text-gray-200 mb-6 text-lg max-w-2xl mx-auto">
            Get instant platform-specific AI SEO analysis. No credit card required. Results in 60 seconds.
          </p>
          <Link href="https://aiseoscan.dev">
            <button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-5 px-10 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl">
              <span className="flex items-center justify-center">
                <Bot className="mr-3 h-6 w-6" />
                Scan Your {platform_name} Website Now
              </span>
            </button>
          </Link>
          <div className="mt-6 flex items-center justify-center gap-8 text-sm text-gray-300">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              <span>Platform-Specific Analysis</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              <span>Code Examples</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              <span>Implementation Guide</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Resources */}
      {pageData.related_pages && pageData.related_pages.length > 0 && (
        <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <FileText className="h-6 w-6 text-purple-400 mr-3" />
            Related Guides
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pageData.related_pages.map((related, index) => (
              <Link key={index} href={related.url}>
                <div className="bg-gray-800/30 p-4 rounded-lg border border-purple-500/30 hover:border-purple-400 transition-colors cursor-pointer">
                  <h4 className="font-semibold text-purple-300 mb-2">{related.title}</h4>
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