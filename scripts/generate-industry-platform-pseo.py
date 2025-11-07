import json
import os
from datetime import datetime

class IndustryPlatformContentGenerator:
    def __init__(self, industry, platform):
        self.industry = industry
        self.platform = platform
        self.industry_name = industry['name']
        self.industry_slug = industry['slug']
        self.platform_name = platform['name']
        self.platform_slug = platform['slug']
        
    def generate_hero_section(self):
        """Generate hero section"""
        return {
            'headline': f"AI SEO for {self.industry_name} on {self.platform_name}",
            'subheadline': f"Complete technical guide to optimizing {self.industry_name} websites built on {self.platform_name} for ChatGPT, Perplexity, SearchGPT, and other AI search engines. Get platform-specific implementation strategies and code examples.",
            'setup_time': self.platform['setup_time']
        }
    
    def generate_introduction(self):
        """Generate introduction section"""
        return {
            'paragraphs': [
                f"{self.platform_name} is an excellent platform for {self.industry_name.lower()} websites, powering {self.platform['market_share']} of similar sites. However, optimizing {self.platform_name} sites for AI search engines requires platform-specific strategies that differ from traditional SEO.",
                f"AI engines like ChatGPT, Perplexity, and SearchGPT evaluate {self.platform_name} sites based on their technical implementation, content structure, and schema markup. Each platform has unique capabilities and limitations that affect AI SEO performance.",
                f"This guide provides {self.platform_name}-specific strategies for {self.industry_name.lower()} websites, including code examples, plugin recommendations, and step-by-step implementation instructions designed for your platform."
            ],
            'key_advantages': [
                {
                    'title': advantage,
                    'description': f"Leverage {self.platform_name}'s {advantage.lower()} for better AI search visibility"
                }
                for advantage in self.platform['ai_seo_advantages'][:4]
            ]
        }
    
    def generate_platform_overview(self):
        """Generate platform overview section"""
        return {
            'title': f"{self.platform_name} Platform Overview for AI SEO",
            'description': f"{self.platform['description']}. For {self.industry_name.lower()} businesses, {self.platform_name} offers specific advantages when optimizing for AI search engines.",
            'capabilities': [
                {
                    'feature': 'Schema Markup Support',
                    'benefit': f"{self.platform_name} provides {'excellent' if self.platform['difficulty'] == 'Easy' else 'good'} schema markup capabilities for {self.industry_name.lower()}"
                },
                {
                    'feature': 'Content Structure',
                    'benefit': f"Built-in content organization tools help AI engines understand {self.industry_name.lower()} information"
                },
                {
                    'feature': 'Performance',
                    'benefit': f"{self.platform_name} offers {'fast' if self.platform['difficulty'] == 'Easy' else 'configurable'} loading speeds crucial for AI crawler efficiency"
                },
                {
                    'feature': 'Mobile Optimization',
                    'benefit': f"Responsive design ensures AI engines can access {self.industry_name.lower()} content on all devices"
                }
            ]
        }
    
    def generate_technical_setup(self):
        """Generate technical setup steps"""
        base_steps = [
            {
                'title': 'Install AI SEO Foundation',
                'description': f"Set up the basic {self.platform_name} configuration needed for AI search engine optimization.",
                'sub_steps': [
                    f"Access your {self.platform_name} dashboard",
                    "Enable SEO-friendly URLs and permalinks",
                    "Configure XML sitemap generation",
                    "Set up robots.txt to allow AI crawlers"
                ]
            },
            {
                'title': 'Implement Schema Markup',
                'description': f"Add structured data specific to {self.industry_name.lower()} on {self.platform_name}.",
                'sub_steps': [
                    f"Install schema markup plugin/app for {self.platform_name}",
                    f"Configure Organization schema with {self.industry_name.lower()} details",
                    "Add Service or Product schema for offerings",
                    "Implement FAQPage schema on relevant pages"
                ]
            },
            {
                'title': 'Optimize Content Structure',
                'description': f"Structure {self.industry_name.lower()} content for AI comprehension on {self.platform_name}.",
                'sub_steps': [
                    "Use proper heading hierarchies (H1-H6)",
                    "Create clear, extractable content blocks",
                    "Add FAQ sections with complete answers",
                    "Format lists and tables for AI extraction"
                ]
            },
            {
                'title': 'Configure Performance Settings',
                'description': f"Optimize {self.platform_name} performance for AI crawler efficiency.",
                'sub_steps': [
                    "Enable caching and compression",
                    "Optimize images with lazy loading",
                    "Minimize CSS and JavaScript",
                    "Set up CDN if available"
                ]
            }
        ]
        
        return {
            'title': f"Technical Setup for {self.platform_name}",
            'introduction': f"Follow these {self.platform_name}-specific steps to prepare your {self.industry_name.lower()} website for AI search optimization.",
            'steps': base_steps
        }
    
    def generate_schema_implementation(self):
        """Generate schema implementation methods"""
        if self.platform_slug == 'wordpress':
            methods = [
                {
                    'method': 'Using Schema Pro Plugin',
                    'description': 'Schema Pro is the most comprehensive schema plugin for WordPress, perfect for law firms and professional services.',
                    'steps': [
                        'Install and activate Schema Pro from WordPress.org',
                        'Navigate to Schema Pro > Settings',
                        'Select "Organization" or "LocalBusiness" schema type',
                        'Fill in your business details completely',
                        'Add Service schema for each practice area',
                        'Enable FAQPage schema on relevant pages'
                    ]
                },
                {
                    'method': 'Using Yoast SEO Premium',
                    'description': 'Yoast SEO Premium includes schema markup features built specifically for professional websites.',
                    'steps': [
                        'Install Yoast SEO Premium',
                        'Go to SEO > Search Appearance > Schema',
                        'Configure organization details',
                        'Set up person schema for attorneys/team',
                        'Add local business schema if applicable'
                    ]
                }
            ]
        elif self.platform_slug == 'shopify':
            methods = [
                {
                    'method': 'Built-in Product Schema',
                    'description': 'Shopify automatically generates product schema, but you can enhance it for AI search.',
                    'steps': [
                        'Ensure all product descriptions are complete',
                        'Add high-quality product images with alt text',
                        'Use Shopify\'s built-in metafields for additional data',
                        'Install JSON-LD for SEO app for enhanced schema',
                        'Add Organization schema via theme customization'
                    ]
                },
                {
                    'method': 'Using Schema App',
                    'description': 'Schema App provides advanced schema capabilities for Shopify stores.',
                    'steps': [
                        'Install Schema App from Shopify App Store',
                        'Connect your store',
                        'Configure product schema enhancements',
                        'Add review schema for product ratings',
                        'Set up organization and local business schema'
                    ]
                }
            ]
        else:
            methods = [
                {
                    'method': f'Native {self.platform_name} Tools',
                    'description': f'Use {self.platform_name}\'s built-in features to add schema markup.',
                    'steps': [
                        f'Access {self.platform_name} SEO settings',
                        'Add schema markup to site header',
                        'Configure business information completely',
                        'Add structured data to key pages',
                        'Validate schema with Google\'s Rich Results Test'
                    ]
                },
                {
                    'method': 'Custom Code Injection',
                    'description': f'Manually add schema markup to {self.platform_name} pages.',
                    'steps': [
                        f'Access {self.platform_name} code editor',
                        'Add JSON-LD schema to page header',
                        'Test schema implementation',
                        'Monitor for validation errors',
                        'Update schema as business information changes'
                    ]
                }
            ]
        
        return {
            'title': f"Schema Markup Implementation on {self.platform_name}",
            'introduction': f"Learn the best methods to implement schema markup for {self.industry_name.lower()} on {self.platform_name}.",
            'methods': methods
        }
    
    def generate_plugins_tools(self):
        """Generate plugin/tool recommendations"""
        if self.platform_slug == 'wordpress':
            tools = [
                {
                    'name': 'Rank Math SEO',
                    'type': 'Free/Premium',
                    'description': f'Comprehensive SEO plugin with AI capabilities, perfect for {self.industry_name.lower()} websites.',
                    'features': [
                        'Built-in schema markup generator',
                        'AI content suggestions',
                        'Local SEO module',
                        'FAQ schema support',
                        'Breadcrumb schema'
                    ],
                    'setup_difficulty': 'Easy'
                },
                {
                    'name': 'WP Rocket',
                    'type': 'Premium',
                    'description': 'Performance optimization plugin that improves AI crawler efficiency.',
                    'features': [
                        'Page caching',
                        'Lazy loading images',
                        'Minify CSS/JS',
                        'Database optimization',
                        'CDN integration'
                    ],
                    'setup_difficulty': 'Easy'
                },
                {
                    'name': 'Schema Pro',
                    'type': 'Premium',
                    'description': f'Advanced schema markup specifically designed for {self.industry_name.lower()}.',
                    'features': [
                        'Industry-specific schema types',
                        'Automatic schema generation',
                        'Review schema support',
                        'Local business schema',
                        'FAQ schema automation'
                    ],
                    'setup_difficulty': 'Medium'
                }
            ]
        elif self.platform_slug == 'shopify':
            tools = [
                {
                    'name': 'JSON-LD for SEO',
                    'type': 'Free/Premium',
                    'description': 'Automatic schema markup generation for Shopify stores.',
                    'features': [
                        'Product schema enhancement',
                        'Organization schema',
                        'Review schema',
                        'Breadcrumb markup',
                        'Local business schema'
                    ],
                    'setup_difficulty': 'Easy'
                },
                {
                    'name': 'SEO Manager',
                    'type': 'Premium',
                    'description': f'Comprehensive SEO tool for {self.industry_name.lower()} Shopify stores.',
                    'features': [
                        'Bulk meta tag editing',
                        'Image optimization',
                        'Broken link detection',
                        'Structured data validation',
                        'SEO audit reports'
                    ],
                    'setup_difficulty': 'Easy'
                },
                {
                    'name': 'Page Speed Booster',
                    'type': 'Free',
                    'description': 'Improve store performance for better AI crawler access.',
                    'features': [
                        'Image lazy loading',
                        'Script optimization',
                        'Browser caching',
                        'Mobile optimization',
                        'Performance monitoring'
                    ],
                    'setup_difficulty': 'Easy'
                }
            ]
        else:
            tools = [
                {
                    'name': f'{self.platform_name} SEO Tools',
                    'type': 'Built-in',
                    'description': f'Native SEO capabilities in {self.platform_name}.',
                    'features': [
                        'Meta tag management',
                        'Sitemap generation',
                        'Mobile optimization',
                        'Performance tools',
                        'Analytics integration'
                    ],
                    'setup_difficulty': self.platform['difficulty']
                },
                {
                    'name': 'Google Tag Manager',
                    'type': 'Free',
                    'description': 'Add advanced tracking and schema markup.',
                    'features': [
                        'Custom schema injection',
                        'Event tracking',
                        'Third-party integration',
                        'Testing capabilities',
                        'Version control'
                    ],
                    'setup_difficulty': 'Medium'
                }
            ]
        
        return {
            'title': f"Recommended Tools for {self.platform_name}",
            'introduction': f"These tools and plugins help optimize {self.industry_name.lower()} websites on {self.platform_name} for AI search.",
            'recommended': tools
        }
    
    def generate_optimization_steps(self):
        """Generate optimization steps"""
        return {
            'title': f"Step-by-Step {self.platform_name} Optimization",
            'introduction': f"Follow this systematic approach to optimize your {self.industry_name.lower()} {self.platform_name} site for AI search.",
            'categories': [
                {
                    'category': 'Content Optimization',
                    'items': [
                        {
                            'task': 'Structure Content with Clear Hierarchies',
                            'description': f'Use H1-H6 tags properly to help AI understand {self.industry_name.lower()} content relationships',
                            'impact': 'High - AI engines rely on heading structure for content mapping'
                        },
                        {
                            'task': 'Create Comprehensive FAQ Sections',
                            'description': 'Add detailed Q&A content that AI can extract for responses',
                            'impact': 'High - FAQ content appears frequently in AI-generated answers'
                        },
                        {
                            'task': 'Add Industry-Specific Data Points',
                            'description': f'Include statistics, numbers, and specific information about {self.industry_name.lower()}',
                            'impact': 'Medium - Quantifiable data improves citation likelihood'
                        }
                    ]
                },
                {
                    'category': 'Technical Implementation',
                    'items': [
                        {
                            'task': 'Implement Complete Schema Markup',
                            'description': f'Add Organization, Service, and {self.industry_name}-specific schema',
                            'impact': 'Critical - Schema is foundational for AI understanding'
                        },
                        {
                            'task': 'Optimize Page Load Speed',
                            'description': f'Ensure all {self.platform_name} pages load in under 3 seconds',
                            'impact': 'High - Fast sites get crawled more thoroughly by AI'
                        },
                        {
                            'task': 'Configure XML Sitemap',
                            'description': 'Generate and submit comprehensive sitemap to search engines',
                            'impact': 'High - Helps AI discover all important content'
                        }
                    ]
                },
                {
                    'category': 'Authority Signals',
                    'items': [
                        {
                            'task': 'Display Credentials Prominently',
                            'description': f'Show {self.industry_name.lower()} certifications, awards, and expertise',
                            'impact': 'High - Credentials signal authority to AI systems'
                        },
                        {
                            'task': 'Add Author Bylines',
                            'description': 'Include expert author information on all content',
                            'impact': 'Medium - Author expertise improves content credibility'
                        },
                        {
                            'task': 'Ensure NAP Consistency',
                            'description': 'Verify Name, Address, Phone match across all platforms',
                            'impact': 'High - Consistency builds trust with AI systems'
                        }
                    ]
                }
            ]
        }
    
    def generate_common_issues(self):
        """Generate common platform-specific issues"""
        generic_issues = [
            {
                'problem': f'Slow {self.platform_name} Performance',
                'description': f'Many {self.industry_name.lower()} {self.platform_name} sites load slowly, reducing AI crawler efficiency.',
                'solution': f'Optimize images, enable caching, use a CDN, and minimize plugins/apps on {self.platform_name}. Aim for page loads under 3 seconds.'
            },
            {
                'problem': 'Missing Schema Markup',
                'description': f'{self.platform_name} sites often lack proper structured data for {self.industry_name.lower()} businesses.',
                'solution': f'Install a schema plugin/tool and configure Organization, Service, and FAQPage schema. Validate with Google\'s Rich Results Test.'
            },
            {
                'problem': 'Poor Content Structure',
                'description': 'Content lacks clear hierarchies and extractable information blocks.',
                'solution': 'Reorganize content with proper H1-H6 tags, add FAQ sections, use lists and tables, and create discrete answer blocks.'
            },
            {
                'problem': f'{self.platform_name} URL Structure Issues',
                'description': 'Default URL structures may not be optimal for AI comprehension.',
                'solution': f'Configure {self.platform_name} to use clean, descriptive URLs that include relevant {self.industry_name.lower()} keywords.'
            }
        ]
        
        return {
            'title': f"Common {self.platform_name} AI SEO Issues",
            'introduction': f"These platform-specific issues frequently affect {self.industry_name.lower()} websites on {self.platform_name}.",
            'issues': generic_issues
        }
    
    def generate_code_examples(self):
        """Generate platform-specific code examples"""
        examples = []
        
        # Organization Schema
        examples.append({
            'title': f'Organization Schema for {self.platform_name}',
            'description': f'Add this schema to your {self.platform_name} site header to help AI understand your {self.industry_name.lower()} business.',
            'code': f'''<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "{'LocalBusiness' if 'local' in str(self.industry['category']).lower() else 'Organization'}",
  "name": "Your {self.industry_name} Business",
  "description": "Description of your {self.industry_name.lower()} services",
  "url": "https://yourwebsite.com",
  "telephone": "+1-555-555-5555",
  "address": {{
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street",
    "addressLocality": "City",
    "addressRegion": "ST",
    "postalCode": "12345",
    "addressCountry": "US"
  }}
}}
</script>''',
            'note': f'Place this in your {self.platform_name} theme header or use a schema plugin'
        })
        
        # FAQ Schema
        examples.append({
            'title': 'FAQ Schema Example',
            'description': f'Add FAQ schema to help AI extract {self.industry_name.lower()} Q&A content.',
            'code': '''<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Your question here?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Complete answer with specific details."
      }
    }
  ]
}
</script>''',
            'note': 'Add 8-15 questions per FAQ page for maximum AI visibility'
        })
        
        return {
            'title': f"Code Examples for {self.platform_name}",
            'introduction': f"These code snippets show proper implementation on {self.platform_name} for {self.industry_name.lower()}.",
            'examples': examples
        }
    
    def generate_performance(self):
        """Generate performance optimization tips"""
        return {
            'title': f"{self.platform_name} Performance Optimization",
            'introduction': f"Optimize {self.platform_name} performance to ensure AI crawlers can efficiently access your {self.industry_name.lower()} content.",
            'optimizations': [
                {
                    'area': 'Image Optimization',
                    'recommendation': 'Compress images, use WebP format, implement lazy loading',
                    'expected_improvement': '30-50% faster page loads'
                },
                {
                    'area': 'Caching',
                    'recommendation': f'Enable {self.platform_name} caching and browser caching',
                    'expected_improvement': '40-60% faster repeat visits'
                },
                {
                    'area': 'Code Minification',
                    'recommendation': 'Minify CSS, JavaScript, and HTML',
                    'expected_improvement': '10-20% smaller file sizes'
                },
                {
                    'area': 'CDN Integration',
                    'recommendation': 'Use a content delivery network for static assets',
                    'expected_improvement': '20-40% faster global load times'
                }
            ]
        }
    
    def generate_conclusion(self):
        """Generate conclusion section"""
        return {
            'title': 'Next Steps for Your {platform_name} {industry_name} Site',
            'paragraphs': [
                f'Optimizing your {self.industry_name.lower()} website on {self.platform_name} for AI search requires attention to platform-specific capabilities and limitations. The strategies in this guide provide a roadmap tailored to {self.platform_name}.',
                f'Start with technical foundations—schema markup, site speed, and content structure. Then expand to authority building and ongoing optimization. {self.platform_name} offers {self.platform["difficulty"].lower()}-level complexity, making it a {"great" if self.platform["difficulty"] == "Easy" else "solid"} choice for {self.industry_name.lower()} businesses.',
                'AI SEO requires ongoing attention as AI systems evolve. However, the fundamentals remain: clear structure, technical excellence, and authoritative content optimized for your specific platform.'
            ],
            'next_steps': [
                f'Run a comprehensive AI SEO audit of your {self.platform_name} site',
                f'Implement {self.platform_name}-specific schema markup',
                'Optimize site performance and loading speed',
                f'Configure {self.platform_name} SEO settings properly',
                'Create comprehensive FAQ sections',
                'Monitor AI citations and referral traffic'
            ]
        }

def generate_industry_platform_page(industry, platform):
    """Generate complete page data for industry-platform combination"""
    generator = IndustryPlatformContentGenerator(industry, platform)
    
    slug = f"ai-seo-{industry['slug']}-{platform['slug']}"
    
    page_data = {
        'title': f"AI SEO for {industry['name']} on {platform['name']} | Complete 2025 Guide",
        'meta_description': f"{platform['name']} AI SEO optimization for {industry['name']}. Get platform-specific code examples, plugin recommendations, and implementation guide for ChatGPT, Perplexity & SearchGPT visibility.",
        'slug': slug,
        'industry': industry['id'],
        'industry_name': industry['name'],
        'platform': platform['id'],
        'platform_name': platform['name'],
        'hero_section': generator.generate_hero_section(),
        'introduction': generator.generate_introduction(),
        'platform_overview': generator.generate_platform_overview(),
        'technical_setup': generator.generate_technical_setup(),
        'schema_implementation': generator.generate_schema_implementation(),
        'plugins_tools': generator.generate_plugins_tools(),
        'optimization_steps': generator.generate_optimization_steps(),
        'common_issues': generator.generate_common_issues(),
        'code_examples': generator.generate_code_examples(),
        'performance': generator.generate_performance(),
        'conclusion': generator.generate_conclusion(),
        'related_pages': []
    }
    
    return page_data

def get_related_pages(current_industry, current_platform, all_industries, all_platforms):
    """Get related pages for cross-linking"""
    related = []
    
    # Add same industry, different platforms
    for platform in all_platforms[:3]:
        if platform['id'] != current_platform['id']:
            related.append({
                'title': f"{current_industry['name']} on {platform['name']}",
                'url': f"/ai-seo-{current_industry['slug']}-{platform['slug']}"
            })
    
    # Add different industry, same platform
    same_category = [ind for ind in all_industries if ind['category'] == current_industry['category'] and ind['id'] != current_industry['id']]
    if same_category:
        for industry in same_category[:2]:
            related.append({
                'title': f"{industry['name']} on {current_platform['name']}",
                'url': f"/ai-seo-{industry['slug']}-{current_platform['slug']}"
            })
    
    return related[:6]

def main():
    """Main generation function"""
    print("🚀 Starting Industry × Platform pSEO Generation...")
    print("=" * 60)
    
    # Load data
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    data_dir = os.path.join(project_root, 'src', 'data', 'pseo')
    
    with open(os.path.join(data_dir, 'industries-ai-seo.json'), 'r') as f:
        industries_data = json.load(f)
        industries = industries_data['industries']
    
    with open(os.path.join(data_dir, 'platforms-ai-seo.json'), 'r') as f:
        platforms_data = json.load(f)
        platforms = platforms_data['platforms']
    
    print(f"✅ Loaded {len(industries)} industries")
    print(f"✅ Loaded {len(platforms)} platforms")
    print(f"📄 Will generate {len(industries) * len(platforms)} pages")
    print()
    
    # Generate all pages
    all_pages = []
    stats = {
        'total_pages': 0,
        'by_platform': {},
        'by_category': {}
    }
    
    for industry in industries:
        print(f"Generating pages for {industry['name']}...")
        
        for platform in platforms:
            page_data = generate_industry_platform_page(industry, platform)
            page_data['related_pages'] = get_related_pages(industry, platform, industries, platforms)
            
            all_pages.append(page_data)
            stats['total_pages'] += 1
            
            if platform['id'] not in stats['by_platform']:
                stats['by_platform'][platform['id']] = 0
            stats['by_platform'][platform['id']] += 1
            
            if industry['category'] not in stats['by_category']:
                stats['by_category'][industry['category']] = 0
            stats['by_category'][industry['category']] += 1
        
        print(f"  ✓ Generated {len(platforms)} pages for {industry['name']}")
    
    # Save
    output_path = os.path.join(data_dir, 'industry-platform-pages.json')
    with open(output_path, 'w') as f:
        json.dump(all_pages, f, indent=2)
    
    print()
    print("=" * 60)
    print("✅ Generation Complete!")
    print(f"📄 Total pages generated: {stats['total_pages']}")
    print(f"💾 Saved to: {output_path}")
    print()
    
    print("📊 Pages by Platform:")
    for platform, count in stats['by_platform'].items():
        print(f"  • {platform}: {count} pages")
    print()
    
    print("📊 Pages by Category:")
    for category, count in sorted(stats['by_category'].items()):
        print(f"  • {category}: {count} pages")
    print()
    
    # Save summary
    summary = {
        'generated_at': datetime.now().isoformat(),
        'total_pages': stats['total_pages'],
        'industries_count': len(industries),
        'platforms_count': len(platforms),
        'by_platform': stats['by_platform'],
        'by_category': stats['by_category']
    }
    
    summary_path = os.path.join(data_dir, 'industry-platform-summary.json')
    with open(summary_path, 'w') as f:
        json.dump(summary, f, indent=2)
    
    print(f"📊 Summary saved to: {summary_path}")
    print()
    print("🎉 All done! You can now build your Next.js site.")
    print("=" * 60)

if __name__ == '__main__':
    main()