import { Bot, FileText, Award, CheckCircle, ArrowRight, Target, Zap, Lightbulb, Eye, Globe, MessageSquare, BarChart3, TrendingUp, AlertTriangle, Users, Server, Search } from 'lucide-react'

export default function PSEOPageTemplate({ pageData }) {
  const {
    title,
    platform,
    content_type,
    industry,
    hero_section,
    introduction,
    main_sections,
    technical_implementation,
    best_practices,
    common_mistakes,
    measurement_analytics,
    conclusion_cta
  } = pageData

  // Icon mapping for different sections
  const getIcon = (section) => {
    const iconMap = {
      'platform': Bot,
      'content': FileText,
      'technical': Server,
      'authority': Award,
      'measurement': BarChart3,
      'best_practices': CheckCircle,
      'mistakes': AlertTriangle,
      'advanced': Target,
      'implementation': Zap,
      'optimization': TrendingUp,
      'search': Search,
      'users': Users,
      'analytics': Eye
    }
    
    return iconMap[section] || Bot
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <Bot className="h-12 w-12 text-pink-400 mr-4" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            {hero_section.headline}
          </h1>
        </div>
        <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
          {hero_section.subheadline}
        </p>
        
        <div className="bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-blue-900/30 border border-pink-500/50 p-6 rounded-xl backdrop-blur-sm inline-block mb-8">
          <p className="text-pink-200 text-lg font-medium">
            {platform} processes over {hero_section.stats} queries monthly - optimize your content for maximum AI visibility
          </p>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-12">
        <h2 className="text-3xl font-bold text-white mb-6">
          Understanding {platform} Optimization
          {content_type && ` for ${content_type}`}
          {industry && ` in ${industry}`}
        </h2>
        <p className="text-gray-200 mb-6 text-lg leading-relaxed">
          {introduction.opening_paragraph}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
            <Globe className="h-8 w-8 text-purple-400 mb-3" />
            <h3 className="font-semibold text-white mb-2">AI Discovery</h3>
            <p className="text-sm text-gray-300">Optimize content structure for AI comprehension and citation preferences</p>
          </div>
          <div className="bg-pink-900/20 p-4 rounded-lg border border-pink-500/30">
            <Eye className="h-8 w-8 text-pink-400 mb-3" />
            <h3 className="font-semibold text-white mb-2">Citation Ready</h3>
            <p className="text-sm text-gray-300">Structure information for direct AI citation and reference generation</p>
          </div>
          <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
            <Target className="h-8 w-8 text-blue-400 mb-3" />
            <h3 className="font-semibold text-white mb-2">Authority Signals</h3>
            <p className="text-sm text-gray-300">Build credibility markers that AI systems use for source evaluation</p>
          </div>
        </div>
        
        <p className="text-gray-200 text-lg">
          {introduction.statistics}
        </p>

        {introduction.key_benefits && (
          <div className="mt-6">
            <h3 className="font-semibold text-purple-400 mb-3">Key Optimization Benefits:</h3>
            <ul className="space-y-2">
              {introduction.key_benefits.map((benefit, index) => (
                <li key={index} className="flex items-start text-gray-300">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2 mt-1 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Main Content Sections */}
      {main_sections && main_sections.map((section, index) => (
        <div key={index} className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-8">
          <div className="flex items-start mb-6">
            <FileText className="h-8 w-8 text-purple-400 mr-4 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">{section.title}</h3>
              <p className="text-gray-200 text-lg mb-6">
                {section.content.introduction}
              </p>
            </div>
          </div>
          
          {section.content.key_strategies && (
            <div className="mb-6">
              <h4 className="font-semibold text-purple-400 mb-4">Core Implementation Strategies:</h4>
              <ul className="space-y-3">
                {section.content.key_strategies.map((strategy, strategyIndex) => (
                  <li key={strategyIndex} className="flex items-start text-gray-300">
                    <ArrowRight className="h-4 w-4 text-purple-400 mr-2 mt-1 flex-shrink-0" />
                    <span>{strategy}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {section.content.optimization_strategies && (
            <div className="mb-6">
              <h4 className="font-semibold text-purple-400 mb-4">Optimization Strategies:</h4>
              <ul className="space-y-3">
                {section.content.optimization_strategies.map((strategy, strategyIndex) => (
                  <li key={strategyIndex} className="flex items-start text-gray-300">
                    <Target className="h-4 w-4 text-pink-400 mr-2 mt-1 flex-shrink-0" />
                    <span>{strategy}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {section.content.implementation_details && (
            <div className="bg-gray-800/30 p-6 rounded-lg">
              <h4 className="font-semibold text-purple-400 mb-4">Implementation Details:</h4>
              <ul className="space-y-2">
                {section.content.implementation_details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-start text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-2 mt-1 flex-shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {section.content.ai_benefits && (
            <div className="mt-6 bg-blue-900/20 p-4 rounded border-l-4 border-blue-400">
              <h4 className="font-semibold text-blue-300 mb-3">AI-Specific Benefits:</h4>
              <ul className="space-y-2">
                {section.content.ai_benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-start text-blue-200 text-sm">
                    <Lightbulb className="h-4 w-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}

      {/* Technical Implementation Section */}
      {technical_implementation && (
  <div className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 mb-8">
    <div className="flex items-start mb-6">
      <Server className="h-8 w-8 text-blue-400 mr-4 mt-1 flex-shrink-0" />
      <div>
        <h3 className="text-2xl font-bold text-white mb-4">{technical_implementation.title}</h3>
        {technical_implementation.introduction && (
          <p className="text-gray-200 mb-4">{technical_implementation.introduction}</p>
        )}
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
      {/* Core Requirements - handles both old and new structure */}
      {technical_implementation.core_requirements && (
        <div>
          <h4 className="font-semibold text-blue-400 mb-4">Core Technical Requirements:</h4>
          <ul className="space-y-3">
            {technical_implementation.core_requirements.map((req, index) => (
              <li key={index} className="flex items-start text-gray-300">
                <Zap className="h-4 w-4 text-blue-400 mr-2 mt-1 flex-shrink-0" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Content Structure - new use case pages */}
      {technical_implementation.content_structure && (
        <div>
          <h4 className="font-semibold text-blue-400 mb-4">{technical_implementation.content_structure.title}</h4>
          <ul className="space-y-3">
            {technical_implementation.content_structure.requirements.map((req, index) => (
              <li key={index} className="flex items-start text-gray-300">
                <Zap className="h-4 w-4 text-blue-400 mr-2 mt-1 flex-shrink-0" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Schema Markup - handles both structures */}
      {technical_implementation.schema_markup && (
        <div>
          <h4 className="font-semibold text-blue-400 mb-4">
            {technical_implementation.schema_markup.title || "Schema Markup Implementation:"}
          </h4>
          {technical_implementation.schema_markup.importance && (
            <p className="text-gray-300 text-sm mb-3">{technical_implementation.schema_markup.importance}</p>
          )}
          <ul className="space-y-3">
            {technical_implementation.schema_markup.implementation_guide?.map((guide, index) => (
              <li key={index} className="flex items-start text-gray-300">
                <FileText className="h-4 w-4 text-pink-400 mr-2 mt-1 flex-shrink-0" />
                <span>{guide}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>

    {/* Performance Requirements - new use case pages */}
    {technical_implementation.performance_requirements && (
      <div className="mb-6">
        <h4 className="font-semibold text-blue-400 mb-4">{technical_implementation.performance_requirements.title}</h4>
        <ul className="space-y-3">
          {technical_implementation.performance_requirements.requirements.map((req, index) => (
            <li key={index} className="flex items-start text-gray-300">
              <Zap className="h-4 w-4 text-emerald-400 mr-2 mt-1 flex-shrink-0" />
              <span>{req}</span>
            </li>
          ))}
        </ul>
      </div>
    )}

    {/* Priority Schema Types */}
    {technical_implementation.schema_markup?.primary_schemas && (
      <div className="bg-blue-900/20 p-4 rounded border-l-4 border-blue-400">
        <h4 className="font-semibold text-blue-300 mb-3">Priority Schema Types:</h4>
        <div className="flex flex-wrap gap-2">
          {technical_implementation.schema_markup.primary_schemas.map((schema, index) => (
            <span key={index} className="px-3 py-1 bg-blue-800/30 border border-blue-600/50 rounded-full text-blue-200 text-sm">
              {schema}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
)}

      {/* Best Practices Section */}
      {best_practices && (
        <div className="bg-gradient-to-r from-gray-900/60 to-emerald-900/20 backdrop-blur-sm p-8 rounded-xl border border-emerald-500/50 mb-8">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <CheckCircle className="h-8 w-8 text-emerald-400 mr-3" />
            {best_practices.title}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-emerald-400 mb-4">Content Best Practices:</h3>
              <ul className="space-y-3">
                {best_practices.content_best_practices.map((practice, index) => (
                  <li key={index} className="flex items-start text-gray-300">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mr-2 mt-1 flex-shrink-0" />
                    <span>{practice}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-emerald-400 mb-4">Technical Best Practices:</h3>
              <ul className="space-y-3">
                {best_practices.technical_best_practices.map((practice, index) => (
                  <li key={index} className="flex items-start text-gray-300">
                    <Zap className="h-4 w-4 text-blue-400 mr-2 mt-1 flex-shrink-0" />
                    <span>{practice}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold text-emerald-400 mb-4">Authority Building:</h3>
            <ul className="space-y-3">
              {best_practices.authority_building.map((practice, index) => (
                <li key={index} className="flex items-start text-gray-300">
                  <Award className="h-4 w-4 text-emerald-400 mr-2 mt-1 flex-shrink-0" />
                  <span>{practice}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Common Mistakes Section */}
      {common_mistakes && (
        <div className="bg-gradient-to-r from-rose-900/20 to-red-900/20 backdrop-blur-sm p-8 rounded-xl border border-rose-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <AlertTriangle className="h-8 w-8 text-rose-400 mr-3" />
            {common_mistakes.title}
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-rose-400 mb-4">Content Mistakes to Avoid:</h3>
              {common_mistakes.content_mistakes.map((mistake, index) => (
                <div key={index} className="border-l-4 border-rose-400 pl-6 mb-4">
                  <p className="text-gray-300">{mistake}</p>
                </div>
              ))}
            </div>
            
            <div>
              <h3 className="font-semibold text-rose-400 mb-4">Technical Implementation Mistakes:</h3>
              {common_mistakes.technical_mistakes.map((mistake, index) => (
                <div key={index} className="border-l-4 border-rose-400 pl-6 mb-4">
                  <p className="text-gray-300">{mistake}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Measurement Section */}
      {measurement_analytics && (
        <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <BarChart3 className="h-8 w-8 text-purple-400 mr-3" />
            {measurement_analytics.title}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-purple-400 mb-4">Key Performance Indicators:</h3>
              <ul className="space-y-3">
                {measurement_analytics.key_metrics.map((metric, index) => (
                  <li key={index} className="flex items-start text-gray-300">
                    <Target className="h-4 w-4 text-purple-400 mr-2 mt-1 flex-shrink-0" />
                    <span>{metric}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-purple-400 mb-4">Tracking Methods:</h3>
              <ul className="space-y-3">
                {measurement_analytics.tracking_methods.map((method, index) => (
                  <li key={index} className="flex items-start text-gray-300">
                    <Eye className="h-4 w-4 text-pink-400 mr-2 mt-1 flex-shrink-0" />
                    <span>{method}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action Section */}
      {conclusion_cta && (
        <div className="bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-blue-900/40 backdrop-blur-sm p-8 rounded-xl border border-pink-500/50 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{conclusion_cta.title}</h2>
          <p className="text-gray-200 text-lg mb-6 max-w-2xl mx-auto">
            {conclusion_cta.summary}
          </p>
          
          {conclusion_cta.specialized_message && (
            <div className="bg-gradient-to-r from-pink-900/30 to-purple-900/30 border border-pink-500/50 p-4 rounded-lg mb-6 inline-block">
              <p className="text-pink-200 font-medium">
                {conclusion_cta.specialized_message}
              </p>
            </div>
          )}

          <div className="mb-6">
            <h3 className="font-semibold text-pink-400 mb-4">Key Takeaways:</h3>
            <ul className="space-y-2 text-left max-w-2xl mx-auto">
              {conclusion_cta.key_takeaways.map((takeaway, index) => (
                <li key={index} className="flex items-start text-gray-300">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2 mt-1 flex-shrink-0" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
              Start Your AI SEO Analysis
            </a>
            <a href="/" className="bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all duration-300 border border-gray-600">
              Explore AI SEO Features
            </a>
          </div>
        </div>
      )}
    </div>
  )
}