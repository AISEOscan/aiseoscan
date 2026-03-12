import Layout from '../components/Layout'
import Link from 'next/link'
import { Bot, CheckCircle, Zap, ArrowRight, Search, Code, FileText, Shield, Target, AlertTriangle, Lightbulb, ClipboardCheck } from 'lucide-react'

export default function CopilotSEOCheckingTool() {
  const checkingCategories = [
    {
      category: "Schema Markup",
      icon: Code,
      checks: [
        {
          check: "JSON-LD Presence",
          passing: "Has <script type=\"application/ld+json\"> tags with valid JSON",
          failing: "No JSON-LD scripts found on page",
          howToCheck: "View page source (Ctrl+U), search for 'application/ld+json'",
          fix: "Add JSON-LD script tag with Article, Organization, or Person schema"
        },
        {
          check: "Article Schema Completeness",
          passing: "Article schema has headline, author, datePublished, publisher fields filled",
          failing: "Missing Article schema or incomplete (missing required fields)",
          howToCheck: "Check JSON-LD content for @type: 'Article' and required properties",
          fix: "Add missing fields to Article schema - author, datePublished, publisher are critical"
        },
        {
          check: "Organization Schema",
          passing: "Has Organization schema with name, logo, contactPoint",
          failing: "No Organization schema or incomplete",
          howToCheck: "Look for @type: 'Organization' in JSON-LD",
          fix: "Add Organization schema with company details and contact information"
        },
        {
          check: "Author/Person Schema",
          passing: "Has Person schema for authors with name and credentials",
          failing: "No Person schema or missing author information",
          howToCheck: "Check for @type: 'Person' in author field of Article schema",
          fix: "Add Person schema with author name, job title, and affiliation"
        },
        {
          check: "Open Graph Tags",
          passing: "Has og:title, og:description, og:image, og:url, og:type",
          failing: "Missing Open Graph tags or incomplete set",
          howToCheck: "View source, search for 'og:' - should have at least 5 OG tags",
          fix: "Add missing Open Graph meta tags to <head> section"
        }
      ]
    },
    {
      category: "Content Structure",
      icon: FileText,
      checks: [
        {
          check: "Heading Hierarchy",
          passing: "Single H1, followed by logical H2s and H3s in proper order",
          failing: "Multiple H1s, missing headings, or skipped levels (H1 → H3)",
          howToCheck: "Inspect page, look at heading tags - should be H1 → H2 → H3 flow",
          fix: "Restructure headings: one H1 (page title), H2s for main sections, H3s for subsections"
        },
        {
          check: "FAQ Sections",
          passing: "Has Q&A format content, ideally with FAQ schema markup",
          failing: "No FAQ sections or Q&A content",
          howToCheck: "Look for question-answer pairs on page",
          fix: "Add FAQ section with common questions and answers, add FAQ schema"
        },
        {
          check: "Content Depth",
          passing: "1,500+ words with substantial information",
          failing: "Under 500 words or thin content",
          howToCheck: "Copy page content, paste in word counter tool",
          fix: "Expand content with case studies, examples, data, and detailed explanations"
        },
        {
          check: "Author Attribution",
          passing: "Clear author byline with name and credentials visible",
          failing: "No author information or anonymous content",
          howToCheck: "Look for author name, bio, credentials on page",
          fix: "Add author byline, short bio, and credentials near content"
        }
      ]
    },
    {
      category: "Technical SEO",
      icon: Zap,
      checks: [
        {
          check: "HTTPS Security",
          passing: "URL starts with https://, valid SSL certificate, padlock icon",
          failing: "HTTP (not HTTPS) or SSL certificate errors",
          howToCheck: "Look at URL bar - should show padlock and https://",
          fix: "Get SSL certificate (free from Let's Encrypt), enable HTTPS site-wide"
        },
        {
          check: "Mobile Viewport Tag",
          passing: "Has <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">",
          failing: "Missing viewport meta tag",
          howToCheck: "View source, search for 'viewport' in <head> section",
          fix: "Add viewport meta tag to <head>: <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">"
        },
        {
          check: "Semantic HTML",
          passing: "Uses <main>, <article>, <section>, <nav>, <header>, <footer> tags",
          failing: "Only uses generic <div> tags without semantic meaning",
          howToCheck: "View source, look for semantic HTML5 tags",
          fix: "Replace generic divs with semantic tags where appropriate"
        },
        {
          check: "Render-Blocking Resources",
          passing: "Minimal CSS/JS in <head>, most scripts deferred or async",
          failing: "Many blocking CSS/JS files preventing fast page load",
          howToCheck: "Run Lighthouse audit in Chrome DevTools, check for blocking resources",
          fix: "Move non-critical CSS/JS to bottom of page, use async/defer attributes"
        }
      ]
    },
    {
      category: "Authority Signals",
      icon: Shield,
      checks: [
        {
          check: "About Page",
          passing: "Has /about page linked in navigation or footer",
          failing: "No About page or not discoverable",
          howToCheck: "Look for 'About' link in menu or footer",
          fix: "Create comprehensive About page, link from footer/navigation"
        },
        {
          check: "Contact Information",
          passing: "Email, phone, or physical address visible on site",
          failing: "No contact information or only a contact form",
          howToCheck: "Look for contact details in footer or contact page",
          fix: "Add real contact information - not just a form. Include email and/or phone."
        },
        {
          check: "Privacy Policy",
          passing: "Has /privacy or /privacy-policy linked in footer",
          failing: "No privacy policy",
          howToCheck: "Look for 'Privacy' or 'Privacy Policy' link in footer",
          fix: "Create privacy policy page, link from footer"
        },
        {
          check: "Terms of Service",
          passing: "Has /terms or /terms-of-service linked in footer",
          failing: "No terms of service",
          howToCheck: "Look for 'Terms' or 'Terms of Service' link in footer",
          fix: "Create terms of service page, link from footer"
        }
      ]
    }
  ]

  const diyChecklist = [
    {
      category: "Schema (5 min)",
      tasks: [
        "□ View page source (Ctrl+U), search for 'application/ld+json'",
        "□ If found: verify Article schema has headline, author, datePublished, publisher",
        "□ If missing: add Article schema with all required fields",
        "□ Check for Organization schema (company info)",
        "□ Check for Person schema (author details)"
      ]
    },
    {
      category: "Content (10 min)",
      tasks: [
        "□ Count headings: Should have 1 H1, multiple H2s, H3s under H2s",
        "□ Check for FAQ section with Q&A format",
        "□ Verify word count is 1,500+ (paste in word counter)",
        "□ Confirm visible author name and credentials"
      ]
    },
    {
      category: "Technical (5 min)",
      tasks: [
        "□ Verify URL starts with https:// and shows padlock",
        "□ View source, search for 'viewport' meta tag",
        "□ Check for semantic HTML tags (main, article, section)",
        "□ Run Lighthouse audit in Chrome (Ctrl+Shift+I → Lighthouse tab)"
      ]
    },
    {
      category: "Authority (5 min)",
      tasks: [
        "□ Check footer for About page link",
        "□ Verify contact information visible (not just form)",
        "□ Check footer for Privacy Policy link",
        "□ Check footer for Terms of Service link"
      ]
    }
  ]

  const commonIssues = [
    {
      issue: "Missing Schema Markup Completely",
      symptom: "View source, search for 'application/ld+json' - nothing found",
      cause: "Never added structured data to site",
      fix: "Add Article schema at minimum. Include headline, author, datePublished, publisher fields. Use JSON-LD format in <head> section.",
      impact: "Critical - Copilot can't understand what your content is about without schema",
      timeToFix: "30-60 minutes per page"
    },
    {
      issue: "Incomplete Article Schema",
      symptom: "Has Article schema but missing author or publisher fields",
      cause: "Added basic schema but didn't fill all required fields",
      fix: "Add missing fields to existing schema. Author (with Person schema) and publisher (with Organization schema) are most commonly missing.",
      impact: "High - Partial schema is better than none, but incomplete data reduces trust",
      timeToFix: "15-30 minutes to complete"
    },
    {
      issue: "No HTTPS (Still Using HTTP)",
      symptom: "URL shows 'Not Secure' warning, starts with http:// not https://",
      cause: "Haven't migrated to HTTPS or SSL certificate expired",
      fix: "Get SSL certificate (free from Let's Encrypt), configure server to force HTTPS, set up 301 redirects from HTTP to HTTPS.",
      impact: "Critical - Bing (and Copilot) heavily deprioritize non-secure sites",
      timeToFix: "1-2 hours including setup and testing"
    },
    {
      issue: "Multiple H1 Tags",
      symptom: "Page has 2+ H1 headings",
      cause: "Multiple H1s from poor theme/template or header/logo marked as H1",
      fix: "Keep only one H1 (main page title). Change others to H2, H3, or regular text. Logo should not be H1.",
      impact: "Medium - Confuses AI about page topic. One clear H1 shows focus.",
      timeToFix: "15-30 minutes to restructure"
    },
    {
      issue: "No Author Attribution",
      symptom: "Content has no author byline or author name visible",
      cause: "Anonymous content or forgot to add author information",
      fix: "Add author byline near content with name, short bio, credentials. Add Person schema with author details.",
      impact: "Medium - Enterprise Copilot users expect to know who wrote content",
      timeToFix: "30 minutes to add author info and schema"
    }
  ]

  const checkingMethods = [
    {
      method: "Automated Checking (Recommended)",
      description: "Use AISEOScan to check all 30+ factors automatically",
      time: "30 seconds",
      accuracy: "High - checks everything consistently",
      cost: "Free basic / $29 premium",
      pros: [
        "Instant results",
        "Checks all categories (schema, content, technical, authority)",
        "Shows exact issues with fix instructions",
        "Consistent - same checks every time"
      ],
      cons: [
        "Premium reports require payment"
      ]
    },
    {
      method: "Manual DIY Checking",
      description: "Follow checklist above, manually inspect each factor",
      time: "25-30 minutes per page",
      accuracy: "Medium - easy to miss things",
      cost: "Free (time investment)",
      pros: [
        "Free",
        "Learn exactly what to look for",
        "Complete control"
      ],
      cons: [
        "Very time-consuming",
        "Easy to miss issues",
        "Inconsistent - might check different things each time",
        "Requires technical knowledge for schema validation"
      ]
    },
    {
      method: "Schema Validators Only",
      description: "Use Google Rich Results Test or Schema.org validator",
      time: "5-10 minutes",
      accuracy: "High for schema only, misses everything else",
      cost: "Free",
      pros: [
        "Free",
        "Good for validating schema syntax"
      ],
      cons: [
        "Only checks schema - misses content, technical, authority factors",
        "Doesn't tell you which schema types to add",
        "No Copilot-specific guidance"
      ]
    },
    {
      method: "Traditional SEO Tools",
      description: "Use Ahrefs, Moz, SEMrush site audit",
      time: "Varies",
      accuracy: "Medium - miss AI-specific factors",
      cost: "$99-999/month",
      pros: [
        "Comprehensive traditional SEO data",
        "Automated crawling"
      ],
      cons: [
        "Not designed for Copilot optimization",
        "Miss AI-specific factors (FAQ sections, author attribution, factual density)",
        "Expensive for limited Copilot value"
      ]
    }
  ]

  const scoreInterpretation = [
    {
      range: "90-100",
      grade: "A",
      status: "Excellent - Copilot Ready",
      meaning: "All critical factors are optimized. Schema complete, content well-structured, technical foundation solid, authority signals present.",
      action: "Maintain current optimization. Run monthly checks to ensure nothing breaks."
    },
    {
      range: "75-89",
      grade: "B",
      status: "Good - Minor Improvements Needed",
      meaning: "Most factors optimized, but 2-3 issues remain. Typically missing FAQ schema, some incomplete schema fields, or minor technical issues.",
      action: "Fix the 2-3 remaining issues identified. Re-check to reach 90+."
    },
    {
      range: "60-74",
      grade: "C",
      status: "Fair - Significant Gaps",
      meaning: "Core structure present but quality issues. Usually incomplete schema, poor content structure, or missing authority signals.",
      action: "Prioritize schema completeness and content structure. Follow fix roadmap for 2-4 weeks."
    },
    {
      range: "40-59",
      grade: "D",
      status: "Poor - Major Work Needed",
      meaning: "Multiple critical issues. Likely missing schema entirely, no HTTPS, poor content structure, no authority signals.",
      action: "Start with quick wins: enable HTTPS, add basic Article schema, fix heading hierarchy. 1-2 month optimization project."
    },
    {
      range: "0-39",
      grade: "F",
      status: "Critical - Not Copilot Ready",
      meaning: "Fundamentals missing. No schema, no HTTPS, broken structure, no authority signals. Site is invisible to Copilot.",
      action: "Complete rebuild needed. Follow full optimization roadmap. Expect 2-3 months to reach acceptable levels."
    }
  ]

  return (
    <Layout 
      title="Copilot SEO Checking Tool: How to Check Microsoft Copilot Optimization"
      description="Learn how to check Copilot SEO: schema markup validation, content structure, technical health, and authority signals. DIY checklist and automated tool comparison."
    >
      <div className="max-w-6xl mx-auto py-12">
        {/* Hero */}
        <div className="mb-16">
          <div className="inline-block bg-purple-900/30 px-4 py-2 rounded-full mb-6">
            <span className="text-purple-200 text-sm font-semibold">457 monthly searches</span>
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
            Copilot SEO Checking Tool
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-4xl leading-relaxed">
            Learn how to check your Microsoft Copilot optimization. Complete guide to checking schema markup, content structure, technical SEO, and authority signals - with DIY checklist, automated tool comparison, and pass/fail criteria for each factor.
          </p>
          
          <Link href="https://www.aiseoscan.dev">
            <a className="inline-flex items-center bg-gradient-to-r from-purple-500 to-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
              <ClipboardCheck className="h-5 w-5 mr-2" />
              Check Your Copilot SEO Now
            </a>
          </Link>
        </div>

        {/* What to Check */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">
            What to Check for Copilot SEO (4 Categories)
          </h2>

          <div className="space-y-8">
            {checkingCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <div key={index} className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50">
                  <div className="flex items-start mb-6">
                    <Icon className="h-10 w-10 text-purple-400 mr-4 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-6">{category.category}</h3>
                      
                      <div className="space-y-6">
                        {category.checks.map((check, cIndex) => (
                          <div key={cIndex} className="bg-purple-900/20 p-6 rounded-lg border border-purple-500/50">
                            <h4 className="text-lg font-bold text-white mb-4">{check.check}</h4>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div className="bg-emerald-900/20 p-4 rounded border border-emerald-500/50">
                                <span className="text-emerald-300 font-semibold text-sm">✅ Passing:</span>
                                <p className="text-gray-300 text-sm mt-2">{check.passing}</p>
                              </div>
                              <div className="bg-rose-900/20 p-4 rounded border border-rose-500/50">
                                <span className="text-rose-300 font-semibold text-sm">❌ Failing:</span>
                                <p className="text-gray-300 text-sm mt-2">{check.failing}</p>
                              </div>
                            </div>

                            <div className="mb-3">
                              <span className="text-purple-300 font-semibold text-sm">How to Check: </span>
                              <p className="text-gray-300 text-sm inline">{check.howToCheck}</p>
                            </div>

                            <div className="bg-blue-900/30 p-4 rounded border border-blue-500/50">
                              <span className="text-blue-300 font-semibold text-sm">How to Fix: </span>
                              <p className="text-blue-200 text-sm inline">{check.fix}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* DIY Checklist */}
        <div className="bg-gradient-to-r from-gray-900/60 to-emerald-900/20 backdrop-blur-sm p-8 rounded-xl border border-emerald-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <ClipboardCheck className="h-8 w-8 text-emerald-400 mr-3" />
            DIY Checking Checklist (25 Minutes)
          </h2>

          <p className="text-gray-300 mb-8">
            Follow this checklist to manually check all Copilot SEO factors. Total time: ~25 minutes per page.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {diyChecklist.map((section, index) => (
              <div key={index} className="bg-emerald-900/20 p-6 rounded-xl border border-emerald-500/50">
                <h3 className="text-xl font-bold text-white mb-4">{section.category}</h3>
                <div className="space-y-2">
                  {section.tasks.map((task, tIndex) => (
                    <div key={tIndex} className="text-gray-300 text-sm font-mono bg-emerald-900/20 p-3 rounded border border-emerald-500/30">
                      {task}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-emerald-900/30 p-6 rounded-lg border-l-4 border-emerald-400">
            <p className="text-emerald-200">
              <strong>Pro tip:</strong> Manual checking takes 25+ minutes and you'll likely miss issues. Automated checking (AISEOScan) does all this in 30 seconds with consistent accuracy.
            </p>
          </div>
        </div>

        {/* Common Issues */}
        <div className="bg-gradient-to-r from-gray-900/60 to-rose-900/20 backdrop-blur-sm p-8 rounded-xl border border-rose-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <AlertTriangle className="h-8 w-8 text-rose-400 mr-3" />
            5 Most Common Issues We Find
          </h2>

          <div className="space-y-6">
            {commonIssues.map((issue, index) => (
              <div key={index} className="bg-rose-900/20 p-6 rounded-xl border-l-4 border-rose-400">
                <h3 className="text-xl font-bold text-white mb-3">{index + 1}. {issue.issue}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-rose-300 font-semibold text-sm">Symptom: </span>
                    <p className="text-gray-300 text-sm">{issue.symptom}</p>
                  </div>
                  <div>
                    <span className="text-orange-300 font-semibold text-sm">Cause: </span>
                    <p className="text-gray-300 text-sm">{issue.cause}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-blue-300 font-semibold text-sm">Fix: </span>
                  <p className="text-gray-300 text-sm">{issue.fix}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-rose-900/30 p-3 rounded">
                    <span className="text-rose-200 font-semibold text-sm">Impact: </span>
                    <span className="text-gray-300 text-sm">{issue.impact}</span>
                  </div>
                  <div className="bg-blue-900/30 p-3 rounded">
                    <span className="text-blue-200 font-semibold text-sm">Time to fix: </span>
                    <span className="text-gray-300 text-sm">{issue.timeToFix}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Checking Methods */}
        <div className="bg-gradient-to-r from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">
            4 Ways to Check Copilot SEO
          </h2>

          <div className="space-y-6">
            {checkingMethods.map((method, index) => (
              <div key={index} className={`p-6 rounded-xl border-2 ${
                method.method.includes('Recommended')
                  ? 'bg-emerald-900/20 border-emerald-500'
                  : 'bg-blue-900/20 border-blue-500/50'
              }`}>
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{method.method}</h3>
                  {method.method.includes('Recommended') && (
                    <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ml-3">
                      ⭐ Best
                    </span>
                  )}
                </div>

                <p className="text-gray-300 mb-4">{method.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                  <div>
                    <div className="text-gray-500 text-xs uppercase mb-1">Time</div>
                    <div className="text-white font-semibold">{method.time}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs uppercase mb-1">Accuracy</div>
                    <div className="text-white font-semibold">{method.accuracy}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs uppercase mb-1">Cost</div>
                    <div className="text-blue-400 font-semibold">{method.cost}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-emerald-300 font-semibold mb-2 text-sm">✅ Pros:</h4>
                    <ul className="space-y-1">
                      {method.pros.map((pro, pIndex) => (
                        <li key={pIndex} className="text-gray-300 text-sm flex items-start">
                          <CheckCircle className="h-4 w-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-rose-300 font-semibold mb-2 text-sm">❌ Cons:</h4>
                    <ul className="space-y-1">
                      {method.cons.map((con, cIndex) => (
                        <li key={cIndex} className="text-gray-400 text-sm">• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Score Interpretation */}
        <div className="bg-gradient-to-r from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Target className="h-8 w-8 text-purple-400 mr-3" />
            Understanding Your Copilot SEO Score
          </h2>

          <div className="space-y-4">
            {scoreInterpretation.map((score, index) => (
              <div key={index} className="bg-purple-900/20 p-6 rounded-lg border-l-4 border-purple-400">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-3xl font-bold text-white">{score.range}</span>
                  <span className="bg-purple-500 text-white px-4 py-1 rounded-full font-bold">
                    Grade {score.grade}
                  </span>
                  <span className="text-purple-300 font-semibold">{score.status}</span>
                </div>
                <p className="text-gray-300 mb-3">
                  <strong className="text-white">What it means:</strong> {score.meaning}
                </p>
                <div className="bg-purple-900/30 p-4 rounded border border-purple-500/50">
                  <p className="text-purple-200 text-sm">
                    <strong>What to do:</strong> {score.action}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-900/40 via-blue-900/40 to-purple-900/40 backdrop-blur-sm p-12 rounded-xl border border-purple-500/50 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Check Your Copilot SEO in 30 Seconds
          </h2>
          <p className="text-gray-200 text-xl mb-8 max-w-2xl mx-auto">
            Automated checking covers all 30+ factors instantly. Free basic scan shows top issues. Premium report ($29) includes detailed pass/fail for every check plus fix instructions.
          </p>
          
          <Link href="https://www.aiseoscan.dev">
            <a className="inline-flex items-center bg-gradient-to-r from-purple-500 to-blue-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
              <ClipboardCheck className="h-6 w-6 mr-2" />
              Run Automated Check
            </a>
          </Link>

          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-300">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              30 seconds vs 25 minutes manual
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              Checks everything consistently
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
              Free basic scan
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