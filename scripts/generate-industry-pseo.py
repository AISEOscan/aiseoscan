import json
import os
from datetime import datetime

# Content generation templates and helpers
class IndustryContentGenerator:
    def __init__(self, industry, content_type):
        self.industry = industry
        self.content_type = content_type
        self.industry_name = industry['name']
        self.industry_slug = industry['slug']
        self.stats = industry['stats']
        
    def generate_hero_section(self):
        """Generate hero section based on content type"""
        headlines = {
            'guide': f"How to Improve AI SEO Score for {self.industry_name} Websites",
            'mistakes': f"Common AI SEO Mistakes {self.industry_name} Websites Make (And How to Fix Them)",
            'checklist': f"Complete AI SEO Checklist for {self.industry_name} Websites",
            'best-practices': f"{self.industry_name} AI SEO Best Practices for 2025"
        }
        
        subheadlines = {
            'guide': f"Comprehensive guide to optimizing {self.industry_name} websites for ChatGPT, Perplexity, SearchGPT, and other AI search engines. Get actionable strategies, code examples, and proven results.",
            'mistakes': f"Learn the critical AI SEO errors that prevent {self.industry_name} websites from ranking in AI search results. Discover exactly what's hurting your visibility and how to fix it fast.",
            'checklist': f"Follow this step-by-step AI SEO checklist specifically designed for {self.industry_name} websites. Every task you need to rank higher in AI search engines.",
            'best-practices': f"Industry-leading AI SEO strategies for {self.industry_name}. Stay ahead of the competition with expert tactics that actually work in 2025."
        }
        
        return {
            'headline': headlines[self.content_type['id']],
            'subheadline': subheadlines[self.content_type['id']],
            'stats': self.stats
        }
    
    def generate_introduction(self):
        """Generate rich introduction section"""
        
        base_paragraphs = {
            'guide': [
                f"AI search engines like ChatGPT, Perplexity, and SearchGPT are fundamentally changing how people find {self.industry_name.lower()} services. These AI systems don't just rank websites—they synthesize information, cite sources, and directly answer user questions. For {self.industry_name.lower()} businesses, this means traditional SEO strategies are no longer enough.",
                f"When someone asks an AI search engine about {self.industry_name.lower()} services, your website needs to be structured in a way that AI can easily understand, extract, and cite. This requires specific technical implementations, content strategies, and authority signals that traditional search engines don't prioritize.",
                f"This comprehensive guide walks you through every aspect of AI SEO optimization for {self.industry_name.lower()} websites. You'll learn the exact technical requirements, content structures, and schema implementations that help AI engines discover, understand, and recommend your services."
            ],
            'mistakes': [
                f"Most {self.industry_name.lower()} websites are making critical AI SEO mistakes that prevent them from appearing in ChatGPT, Perplexity, and SearchGPT results. These aren't traditional SEO issues—they're AI-specific problems that require new solutions.",
                f"The challenge is that AI search engines evaluate websites differently than Google. They prioritize structured data, content clarity, and authoritative signals that many {self.industry_name.lower()} sites overlook. Even websites that rank well in traditional search often fail to appear in AI results.",
                f"This guide identifies the most common and damaging AI SEO mistakes specific to {self.industry_name.lower()} websites, explains why they hurt your visibility, and provides clear solutions you can implement immediately."
            ],
            'checklist': [
                f"Optimizing a {self.industry_name.lower()} website for AI search requires systematic implementation across technical infrastructure, content structure, and authority signals. This checklist provides a complete, step-by-step framework.",
                f"Unlike traditional SEO checklists, AI search optimization demands specific attention to structured data, content formatting for AI comprehension, and technical implementations that help AI engines extract and cite your information accurately.",
                f"Follow each item in this checklist to ensure your {self.industry_name.lower()} website is fully optimized for ChatGPT, Perplexity, SearchGPT, and other AI search platforms. Each task includes implementation details and priority levels."
            ],
            'best-practices': [
                f"The {self.industry_name.lower()} industry faces unique challenges when optimizing for AI search engines. Success requires understanding both general AI SEO principles and industry-specific requirements that help AI systems accurately represent your services.",
                f"Leading {self.industry_name.lower()} websites are implementing advanced AI SEO strategies that go beyond basic optimization. These best practices combine technical excellence, content strategy, and authority building specifically designed for AI comprehension.",
                f"This expert guide reveals the AI SEO best practices that top-performing {self.industry_name.lower()} websites use to dominate AI search results. Learn strategies that actually work in 2025 and beyond."
            ]
        }
        
        return {
            'title': f"Understanding AI SEO for {self.industry_name}",
            'paragraphs': base_paragraphs[self.content_type['id']],
            'key_points': [
                {
                    'title': 'AI Discovery',
                    'description': f'Optimize your {self.industry_name.lower()} content structure for AI comprehension and citation'
                },
                {
                    'title': 'Technical Foundation',
                    'description': 'Implement schema markup and structured data that AI engines prioritize'
                },
                {
                    'title': 'Authority Signals',
                    'description': 'Build credibility markers that help AI systems trust and cite your content'
                }
            ]
        }
    
    def generate_guide_content(self):
        """Generate main content for 'guide' type"""
        return {
            'sections': [
                {
                    'title': f'Content Structure for {self.industry_name} AI Optimization',
                    'introduction': f'AI search engines analyze {self.industry_name.lower()} content differently than traditional search. They prioritize clear hierarchies, semantic relationships, and extractable information blocks that can be synthesized into answers.',
                    'strategies': [
                        f'Use clear H1-H6 hierarchies that define topical relationships relevant to {self.industry_name.lower()} services',
                        'Structure content in discrete, answer-focused sections that AI can extract independently',
                        f'Include specific data points, statistics, and quantifiable information about {self.industry_name.lower()} topics',
                        'Format lists, tables, and structured elements that AI can easily parse and cite',
                        f'Create FAQ sections addressing common {self.industry_name.lower()} questions with direct, complete answers'
                    ],
                    'benefits': [
                        'AI engines can extract precise information without parsing lengthy paragraphs',
                        f'Your {self.industry_name.lower()} content appears in more AI-generated responses',
                        'Citations link directly to relevant content sections rather than generic pages',
                        'Structured content improves both AI visibility and user experience'
                    ]
                },
                {
                    'title': f'Schema Markup Implementation for {self.industry_name}',
                    'introduction': f'Structured data is critical for {self.industry_name.lower()} AI SEO. AI engines rely heavily on schema markup to understand entity relationships, service offerings, and authoritative information.',
                    'strategies': [
                        f'Implement Organization schema with complete {self.industry_name.lower()} business information',
                        f'Use LocalBusiness schema if serving {self.industry_name.lower()} customers in specific geographic areas',
                        f'Add Service schema for each {self.industry_name.lower()} service or offering you provide',
                        'Include Article schema on all informational and educational content pages',
                        'Implement FAQPage schema on pages with question-answer content',
                        'Use BreadcrumbList schema to establish content hierarchy and relationships'
                    ],
                    'benefits': [
                        'AI engines can accurately categorize your business and services',
                        f'Your {self.industry_name.lower()} content appears for more specific queries',
                        'Schema provides structured data that AI systems prioritize for citations',
                        'Rich snippets in traditional search improve overall visibility'
                    ]
                },
                {
                    'title': f'Technical SEO Requirements for {self.industry_name} AI Visibility',
                    'introduction': 'AI crawlers have different technical requirements than traditional search bots. Your technical infrastructure must support AI discovery and content extraction.',
                    'strategies': [
                        'Ensure clean HTML structure with semantic elements (header, main, article, section)',
                        'Optimize page load speed—AI crawlers prioritize fast, accessible content',
                        f'Implement mobile-responsive design (many {self.industry_name.lower()} searches happen on mobile)',
                        'Use descriptive alt text on all images with relevant context',
                        'Create XML sitemaps that include all important content pages',
                        'Ensure robots.txt allows AI crawler access to key content'
                    ],
                    'benefits': [
                        'AI crawlers can efficiently discover and index your content',
                        f'Technical excellence signals authority in the {self.industry_name.lower()} space',
                        'Faster sites provide better data for AI training and indexing',
                        'Accessible content reaches both AI engines and human users'
                    ]
                },
                {
                    'title': f'Authority and Trust Signals for {self.industry_name}',
                    'introduction': f'AI engines evaluate source credibility heavily. For {self.industry_name.lower()} websites, establishing authority requires specific signals that AI systems recognize and value.',
                    'strategies': [
                        f'Display clear credentials, certifications, and qualifications relevant to {self.industry_name.lower()}',
                        'Include author bylines with expert credentials on all content',
                        'Cite authoritative sources and link to reputable external resources',
                        f'Publish original research, case studies, or data specific to {self.industry_name.lower()}',
                        'Maintain an active, regularly updated blog with high-quality content',
                        'Ensure consistent NAP (Name, Address, Phone) across all platforms'
                    ],
                    'benefits': [
                        'AI systems identify you as an authoritative source in your industry',
                        'Your content gets cited more frequently in AI-generated responses',
                        f'{self.industry_name} expertise signals improve trust and credibility',
                        'Authority compounds over time as AI systems learn your domain expertise'
                    ]
                }
            ]
        }
    
    def generate_mistakes_content(self):
        """Generate content for 'mistakes' type"""
        return [
            {
                'title': f'Ignoring {self.industry_name}-Specific Schema Markup',
                'description': f'Many {self.industry_name.lower()} websites use only basic schema or skip it entirely. AI engines rely on structured data to understand services, locations, and entity relationships.',
                'why_harmful': f'Without proper schema, AI engines cannot accurately categorize your {self.industry_name.lower()} business. Your content may be overlooked entirely or misrepresented in AI responses.',
                'how_to_fix': f'Implement comprehensive schema including Organization, Service, LocalBusiness (if applicable), and industry-specific structured data. Validate with Google\'s Rich Results Test and Schema Markup Validator.'
            },
            {
                'title': 'Using Vague or Marketing-Heavy Language',
                'description': f'{self.industry_name} websites often prioritize marketing copy over clear, factual information. AI engines struggle with hyperbole and prefer direct, informative content.',
                'why_harmful': 'AI cannot extract clear, citable facts from promotional language. Your content gets skipped in favor of sites that present information more directly.',
                'how_to_fix': f'Balance marketing with factual content. Include specific details about {self.industry_name.lower()} services, processes, timelines, and results. Use clear headings and direct language.'
            },
            {
                'title': 'Neglecting Content Structure and Hierarchy',
                'description': f'Poorly structured content with unclear hierarchies makes it impossible for AI to understand topical relationships in {self.industry_name.lower()} information.',
                'why_harmful': 'AI engines cannot determine which content is primary, supporting, or related. This results in inaccurate citations or complete omission from results.',
                'how_to_fix': 'Use proper H1-H6 hierarchies. Each page should have one clear H1, with H2s defining major sections and H3-H6s for subsections. Ensure logical flow and semantic relationships.'
            },
            {
                'title': 'Missing or Inadequate FAQ Sections',
                'description': f'{self.industry_name} customers have specific questions. Sites without comprehensive FAQ sections miss opportunities for AI citations.',
                'why_harmful': 'AI engines prioritize question-answer content. Without FAQs, you lose visibility for "how," "what," "why," and "when" queries in your industry.',
                'how_to_fix': f'Create detailed FAQ sections addressing common {self.industry_name.lower()} questions. Use FAQPage schema. Provide complete, direct answers—not just teasers that require form submissions.'
            },
            {
                'title': f'Hiding Important {self.industry_name} Information Behind Forms',
                'description': 'Requiring email submission or registration to access content prevents AI engines from discovering and indexing valuable information.',
                'why_harmful': 'AI crawlers cannot access gated content. Your most valuable information remains invisible to AI search engines.',
                'how_to_fix': 'Make core informational content freely accessible. Save forms for downloads, consultations, or premium resources. AI will cite freely available content.'
            },
            {
                'title': 'Inconsistent NAP (Name, Address, Phone) Information',
                'description': f'Inconsistent business information across platforms confuses AI engines trying to build accurate knowledge graphs about {self.industry_name.lower()} businesses.',
                'why_harmful': 'AI cannot confidently cite businesses with conflicting information. Trust signals decrease, reducing overall visibility.',
                'how_to_fix': 'Audit all online mentions of your business. Ensure identical NAP on your website, Google Business Profile, social media, directories, and citations.'
            },
            {
                'title': 'Slow Page Load Times and Poor Core Web Vitals',
                'description': f'Many {self.industry_name.lower()} websites have heavy images, unoptimized code, or slow hosting that impacts performance.',
                'why_harmful': 'AI crawlers allocate limited resources per site. Slow pages get partially crawled or skipped entirely, reducing AI visibility.',
                'how_to_fix': 'Optimize images (use WebP, lazy loading). Minimize JavaScript and CSS. Use quality hosting. Aim for Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1.'
            }
        ]
    
    def generate_checklist_content(self):
        """Generate content for 'checklist' type"""
        return {
            'categories': [
                {
                    'category': 'Technical Foundation',
                    'items': [
                        {
                            'task': 'Implement Complete Schema Markup',
                            'description': f'Add Organization, LocalBusiness, Service, and {self.industry_name}-specific schema to all relevant pages',
                            'priority': 'High'
                        },
                        {
                            'task': 'Optimize Page Load Speed',
                            'description': 'Ensure all pages load in under 3 seconds. Compress images, minimize code, enable caching',
                            'priority': 'High'
                        },
                        {
                            'task': 'Create XML Sitemap',
                            'description': 'Generate and submit comprehensive sitemap including all important content pages',
                            'priority': 'High'
                        },
                        {
                            'task': 'Verify Mobile Responsiveness',
                            'description': 'Test all pages on mobile devices. Ensure readable text, accessible buttons, proper spacing',
                            'priority': 'High'
                        },
                        {
                            'task': 'Implement Semantic HTML',
                            'description': 'Use proper semantic elements (header, nav, main, article, section, aside, footer)',
                            'priority': 'Medium'
                        },
                        {
                            'task': 'Add Descriptive Alt Text',
                            'description': f'Write descriptive alt text for all images, including relevant {self.industry_name.lower()} context',
                            'priority': 'Medium'
                        }
                    ]
                },
                {
                    'category': 'Content Structure',
                    'items': [
                        {
                            'task': 'Establish Clear H1-H6 Hierarchy',
                            'description': 'One H1 per page, logical H2-H6 structure that defines content relationships',
                            'priority': 'High'
                        },
                        {
                            'task': f'Create Comprehensive FAQ Section',
                            'description': f'Address 15-20 common {self.industry_name.lower()} questions with complete answers',
                            'priority': 'High'
                        },
                        {
                            'task': 'Format Content for AI Extraction',
                            'description': 'Use lists, tables, and discrete answer blocks that AI can easily extract',
                            'priority': 'High'
                        },
                        {
                            'task': 'Add Statistics and Data Points',
                            'description': f'Include specific numbers, percentages, and quantifiable information about {self.industry_name.lower()}',
                            'priority': 'Medium'
                        },
                        {
                            'task': 'Implement Internal Linking',
                            'description': 'Link related content with descriptive anchor text that clarifies relationships',
                            'priority': 'Medium'
                        },
                        {
                            'task': 'Update Content Regularly',
                            'description': 'Refresh key pages quarterly. Add timestamps showing content freshness',
                            'priority': 'Medium'
                        }
                    ]
                },
                {
                    'category': 'Authority Signals',
                    'items': [
                        {
                            'task': 'Display Credentials Prominently',
                            'description': f'Show relevant {self.industry_name.lower()} certifications, licenses, awards on every page',
                            'priority': 'High'
                        },
                        {
                            'task': 'Add Author Bylines',
                            'description': 'Include author names and credentials on all content. Use Person schema',
                            'priority': 'High'
                        },
                        {
                            'task': 'Cite Authoritative Sources',
                            'description': 'Link to reputable external sources when making claims or citing research',
                            'priority': 'Medium'
                        },
                        {
                            'task': 'Ensure NAP Consistency',
                            'description': 'Verify identical Name, Address, Phone across website, Google Business, social media',
                            'priority': 'High'
                        },
                        {
                            'task': 'Publish Original Content',
                            'description': f'Create unique {self.industry_name.lower()} insights, research, or case studies monthly',
                            'priority': 'Medium'
                        },
                        {
                            'task': 'Build Quality Backlinks',
                            'description': f'Earn links from authoritative {self.industry_name.lower()} sites, industry publications, local directories',
                            'priority': 'Low'
                        }
                    ]
                },
                {
                    'category': 'AI-Specific Optimizations',
                    'items': [
                        {
                            'task': 'Implement FAQPage Schema',
                            'description': 'Add structured data to all FAQ sections for enhanced AI discovery',
                            'priority': 'High'
                        },
                        {
                            'task': 'Create Entity-Rich Content',
                            'description': f'Use specific {self.industry_name.lower()} terminology, named entities, and industry concepts',
                            'priority': 'Medium'
                        },
                        {
                            'task': 'Optimize for Voice Search',
                            'description': 'Use natural language, question formats, conversational tone in content',
                            'priority': 'Medium'
                        },
                        {
                            'task': 'Add Structured Data Testing',
                            'description': 'Validate all schema markup with Google Rich Results Test and Schema Validator',
                            'priority': 'High'
                        },
                        {
                            'task': 'Enable AI Crawler Access',
                            'description': 'Verify robots.txt allows GPTBot, CCBot, anthropic-ai, and other AI crawlers',
                            'priority': 'High'
                        }
                    ]
                }
            ]
        }
    
    def generate_best_practices_content(self):
        """Generate content for 'best-practices' type"""
        return [
            {
                'title': f'Implement Industry-Specific Schema Markup Comprehensively',
                'description': f'Beyond basic Organization schema, {self.industry_name.lower()} websites should implement Service schema for each offering, LocalBusiness if serving local customers, FAQ schema on relevant pages, and Article schema on all informational content.',
                'implementation': f'Use Google Tag Manager or directly embed JSON-LD schema in page headers. Create templates for common {self.industry_name.lower()} page types (service pages, location pages, blog posts) that automatically include appropriate schema.',
                'pro_tip': f'Research competitors in {self.industry_name.lower()} who rank well in AI search. Inspect their schema implementation for ideas on comprehensive structured data strategies.'
            },
            {
                'title': 'Structure Content Specifically for AI Comprehension',
                'description': f'AI engines excel at extracting information from well-structured content. For {self.industry_name.lower()} websites, this means using clear hierarchies, discrete answer blocks, and formats that facilitate AI extraction.',
                'implementation': 'Start each major content section with a clear H2 that acts as a standalone question or topic. Follow with 2-3 paragraphs of 3-4 sentences each. Include bullet points for lists. Use tables for comparisons. Add FAQ sections at the end.',
                'pro_tip': f'Test your content by asking AI engines questions about your {self.industry_name.lower()} topic. If the AI can extract and cite your content accurately, your structure is working.'
            },
            {
                'title': f'Build Topical Authority in {self.industry_name} Through Content Depth',
                'description': f'AI engines identify authoritative sources by analyzing content depth, breadth, and consistency. {self.industry_name} websites should create comprehensive content clusters covering all major topics in their domain.',
                'implementation': f'Identify 5-10 core {self.industry_name.lower()} topics. Create pillar content (2,000+ words) for each topic. Develop 5-10 supporting articles per pillar. Interlink all related content. Update quarterly.',
                'pro_tip': 'AI engines recognize expertise patterns. Consistently covering topics in depth signals authority more effectively than broad, shallow coverage.'
            },
            {
                'title': 'Optimize for Natural Language and Question-Based Queries',
                'description': f'Users interact with AI search using conversational language. {self.industry_name} content should address questions people actually ask, using natural phrasing.',
                'implementation': f'Research common {self.industry_name.lower()} questions using "People Also Ask" boxes, Reddit, Quora, industry forums. Create content that directly answers these questions. Use question phrases as H2/H3 headings.',
                'pro_tip': 'Include "how," "what," "why," "when," and "where" questions throughout your content. AI engines prioritize question-answer formats for citations.'
            },
            {
                'title': f'Establish {self.industry_name} Expertise Through Credibility Signals',
                'description': 'AI systems evaluate source credibility heavily. Displaying expertise, credentials, and authority signals helps AI engines trust and cite your content.',
                'implementation': f'Add author bios with {self.industry_name.lower()} credentials to all articles. Display certifications, awards, and professional affiliations prominently. Link to your team\'s LinkedIn profiles. Include case studies and testimonials.',
                'pro_tip': 'Use Person schema for author bios. This helps AI engines understand your team\'s expertise and credentials in structured format.'
            },
            {
                'title': 'Maintain Technical Excellence and Performance',
                'description': f'AI crawlers prioritize fast, accessible websites. {self.industry_name} sites must maintain excellent technical performance to maximize AI visibility.',
                'implementation': 'Target Core Web Vitals: LCP under 2.5s, FID under 100ms, CLS under 0.1. Optimize images (WebP format, proper sizing, lazy loading). Minimize JavaScript. Use quality hosting. Enable caching.',
                'pro_tip': 'AI crawlers allocate limited resources per site. Fast, efficient sites get crawled more deeply and frequently, improving overall visibility.'
            },
            {
                'title': f'Create Original, Data-Driven {self.industry_name} Content',
                'description': f'AI engines prioritize unique, valuable information. {self.industry_name} websites that publish original research, case studies, or proprietary data earn more citations.',
                'implementation': f'Conduct annual surveys in your {self.industry_name.lower()} market. Publish original research or analysis. Create detailed case studies. Share unique insights from your experience. Include specific data points and statistics.',
                'pro_tip': 'Original data becomes citation-worthy. When you publish unique information, other sites link to you, and AI engines recognize you as a primary source.'
            },
            {
                'title': 'Implement Consistent NAP and Entity Verification',
                'description': f'AI engines build knowledge graphs about {self.industry_name.lower()} businesses. Consistent Name, Address, and Phone information across all platforms helps AI accurately represent your business.',
                'implementation': 'Audit all online mentions. Ensure identical NAP on website, Google Business Profile, Bing Places, social media, industry directories, citations. Use LocalBusiness schema with complete information.',
                'pro_tip': f'Claim and verify all profiles on major platforms. Verified entities receive higher trust scores from AI systems.'
            }
        ]
    
    def generate_challenges(self):
        """Generate industry-specific challenges"""
        return {
            'title': f'AI SEO Challenges Specific to {self.industry_name}',
            'introduction': f'The {self.industry_name.lower()} industry faces unique obstacles when optimizing for AI search engines. Understanding these challenges helps prioritize solutions effectively.',
            'items': [
                {
                    'title': f'Complex {self.industry_name} Terminology and Jargon',
                    'description': f'AI engines struggle with industry-specific terminology when it lacks context. {self.industry_name} websites must balance technical accuracy with clarity.',
                    'impact': 'AI may misunderstand specialized terms, leading to inaccurate citations or omission from results'
                },
                {
                    'title': 'Service Differentiation and Specificity',
                    'description': f'AI engines need clear differentiation between similar {self.industry_name.lower()} services. Vague descriptions reduce citation accuracy.',
                    'impact': 'Generic service descriptions result in AI lumping distinct offerings together or citing competitors instead'
                },
                {
                    'title': 'Local vs. National Search Intent',
                    'description': f'Many {self.industry_name.lower()} searches have geographic intent. AI must understand your service areas and local relevance.',
                    'impact': 'Without clear location signals, AI may show your business for irrelevant geographic queries or miss local opportunities'
                },
                {
                    'title': 'Trust and Credibility Verification',
                    'description': f'{self.industry_name} services require high trust. AI engines look for specific credibility signals like certifications, reviews, and authoritative mentions.',
                    'impact': 'Insufficient trust signals reduce AI citation likelihood, especially for sensitive or important decisions'
                },
                {
                    'title': 'Content Depth vs. Accessibility Balance',
                    'description': f'{self.industry_name} topics can be complex. Content must be comprehensive enough for AI understanding yet accessible to users.',
                    'impact': 'Too technical or too simple content fails to provide the balanced information AI prefers for citations'
                }
            ]
        }
    
    def generate_solutions(self):
        """Generate solutions section"""
        return {
            'title': f'AI SEO Solutions for {self.industry_name} Websites',
            'introduction': f'These proven solutions address the unique AI SEO challenges facing {self.industry_name.lower()} websites. Each solution includes specific implementation steps.',
            'items': [
                {
                    'title': 'Implement Comprehensive Schema Markup',
                    'description': f'Structured data helps AI engines accurately understand your {self.industry_name.lower()} business, services, and content.',
                    'steps': [
                        'Add Organization schema with complete business details',
                        f'Implement Service schema for each {self.industry_name.lower()} offering',
                        'Use LocalBusiness schema if you serve specific geographic areas',
                        'Add FAQPage schema to question-answer content',
                        'Include Article schema on all informational pages',
                        'Validate all schema with Google Rich Results Test'
                    ],
                    'expected_result': 'AI engines can accurately categorize your business and extract specific information for citations'
                },
                {
                    'title': 'Create Clear Content Hierarchies',
                    'description': f'Well-structured content helps AI understand relationships between {self.industry_name.lower()} topics and extract relevant information.',
                    'steps': [
                        'Use one clear H1 per page describing the main topic',
                        'Structure content with H2 headings for major sections',
                        'Use H3-H6 for subsections and supporting details',
                        'Keep paragraphs to 3-4 sentences for easy extraction',
                        'Format lists and tables for structured information',
                        'Add internal links connecting related topics'
                    ],
                    'expected_result': 'AI can map your content structure and extract specific sections for relevant queries'
                },
                {
                    'title': f'Build {self.industry_name} Topical Authority',
                    'description': 'AI engines identify expert sources through comprehensive, consistent coverage of topics.',
                    'steps': [
                        f'Identify 5-10 core {self.industry_name.lower()} topics',
                        'Create detailed pillar content (2,000+ words) for each topic',
                        'Develop 5-10 supporting articles per pillar topic',
                        'Interlink all related content with descriptive anchors',
                        'Update content quarterly with fresh information',
                        'Publish consistently (weekly or bi-weekly schedule)'
                    ],
                    'expected_result': f'AI recognizes your website as an authoritative source for {self.industry_name.lower()} information'
                }
            ]
        }
    
    def generate_code_examples(self):
        """Generate industry-specific code examples"""
        org_type = 'LocalBusiness' if any(cat in self.industry['category'] for cat in ['Home Services', 'Healthcare', 'Food & Hospitality']) else 'Organization'
        
        return {
            'title': f'Code Examples for {self.industry_name} AI SEO',
            'introduction': f'These code snippets show proper implementation of schema markup and structured data for {self.industry_name.lower()} websites.',
            'examples': [
                {
                    'title': f'{org_type} Schema for {self.industry_name}',
                    'description': f'Basic organization schema that helps AI engines understand your {self.industry_name.lower()} business.',
                    'code': f'''<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "{org_type}",
  "name": "Your {self.industry_name} Business Name",
  "description": "Brief description of your {self.industry_name.lower()} services",
  "url": "https://yourwebsite.com",
  "telephone": "+1-555-555-5555",
  "address": {{
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street",
    "addressLocality": "Your City",
    "addressRegion": "ST",
    "postalCode": "12345",
    "addressCountry": "US"
  }},
  "sameAs": [
    "https://facebook.com/yourpage",
    "https://linkedin.com/company/yourcompany"
  ]
}}
</script>''',
                    'note': 'Replace placeholder text with your actual business information'
                },
                {
                    'title': f'Service Schema for {self.industry_name}',
                    'description': f'Service schema helps AI understand specific {self.industry_name.lower()} offerings.',
                    'code': f'''<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Primary {self.industry_name} Service",
  "provider": {{
    "@type": "{org_type}",
    "name": "Your Business Name"
  }},
  "description": "Detailed description of this specific service",
  "areaServed": {{
    "@type": "City",
    "name": "Your City"
  }},
  "hasOfferCatalog": {{
    "@type": "OfferCatalog",
    "name": "{self.industry_name} Services",
    "itemListElement": [
      {{
        "@type": "Offer",
        "itemOffered": {{
          "@type": "Service",
          "name": "Specific Service 1"
        }}
      }}
    ]
  }}
}}
</script>''',
                    'note': 'Add separate Service schema for each major service offering'
                },
                {
                    'title': 'FAQPage Schema Example',
                    'description': f'FAQ schema helps AI engines extract and cite your {self.industry_name.lower()} Q&A content.',
                    'code': f'''<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {{
      "@type": "Question",
      "name": "Common {self.industry_name} question?",
      "acceptedAnswer": {{
        "@type": "Answer",
        "text": "Complete answer to the question with relevant details about {self.industry_name.lower()} topic."
      }}
    }},
    {{
      "@type": "Question",
      "name": "Another {self.industry_name} question?",
      "acceptedAnswer": {{
        "@type": "Answer",
        "text": "Another complete answer with specific information."
      }}
    }}
  ]
}}
</script>''',
                    'note': 'Include 8-15 questions per FAQ page for maximum AI visibility'
                }
            ]
        }
    
    def generate_measurement(self):
        """Generate measurement section"""
        return {
            'title': f'Measuring AI SEO Success for {self.industry_name}',
            'introduction': 'Track these key performance indicators to measure AI SEO improvements and ROI.',
            'kpis': [
                {
                    'metric': 'AI Search Citations',
                    'description': 'Number of times your website is cited by ChatGPT, Perplexity, SearchGPT',
                    'target': '10-50+ citations per month depending on content volume'
                },
                {
                    'metric': 'AI Referral Traffic',
                    'description': 'Direct traffic from AI search engines to your website',
                    'target': '15-30% monthly growth after optimization'
                },
                {
                    'metric': 'Schema Validation Score',
                    'description': 'Percentage of pages with valid, comprehensive schema markup',
                    'target': '100% of important pages have validated schema'
                },
                {
                    'metric': 'Content Extraction Rate',
                    'description': f'How often AI can extract and use your {self.industry_name.lower()} content accurately',
                    'target': '80%+ of content should be AI-extractable'
                },
                {
                    'metric': 'Page Speed Score',
                    'description': 'Core Web Vitals and overall page performance',
                    'target': 'LCP < 2.5s, FID < 100ms, CLS < 0.1'
                }
            ],
            'timeline': [
                {
                    'period': 'Weeks 1-2',
                    'expectation': 'Complete technical audit and schema implementation'
                },
                {
                    'period': 'Weeks 3-4',
                    'expectation': 'Content restructuring and FAQ development'
                },
                {
                    'period': 'Months 2-3',
                    'expectation': 'Begin seeing AI citations and improved crawl activity'
                },
                {
                    'period': 'Months 4-6',
                    'expectation': 'Measurable increase in AI referral traffic and citations'
                }
            ]
        }
    
    def generate_faq(self):
        """Generate FAQ section"""
        return [
            {
                'question': f'How long does it take to see AI SEO results for {self.industry_name.lower()} websites?',
                'answer': f'Most {self.industry_name.lower()} websites begin seeing AI citations within 2-3 months of proper implementation. Traffic increases typically appear in months 3-6. The timeline depends on your existing authority, content quality, and how thoroughly you implement AI SEO best practices.'
            },
            {
                'question': f'What\'s the most important AI SEO factor for {self.industry_name}?',
                'answer': 'No single factor dominates, but comprehensive schema markup combined with well-structured content provides the foundation. AI engines need structured data to understand your business and clear content hierarchies to extract information accurately.'
            },
            {
                'question': f'Do I need different content for AI search vs. Google for {self.industry_name}?',
                'answer': f'No, you don\'t need separate content. However, {self.industry_name.lower()} content should be optimized for both. Focus on clear structure, factual information, and proper schema markup—this benefits both traditional and AI search.'
            },
            {
                'question': 'Can I measure AI SEO performance specifically?',
                'answer': 'Yes, through several methods: monitor citations in AI responses, track referral traffic from AI search engines, test your content in AI chatbots, and analyze schema validation. Many analytics tools now include AI traffic segmentation.'
            },
            {
                'question': f'Should {self.industry_name.lower()} websites block AI crawlers?',
                'answer': 'No. Blocking AI crawlers (GPTBot, CCBot, etc.) prevents your content from appearing in AI search results. Unless you have specific legal reasons, allowing AI crawler access is essential for AI SEO visibility.'
            },
            {
                'question': f'Is AI SEO different for local vs. national {self.industry_name.lower()} businesses?',
                'answer': 'Partially. Local businesses should emphasize LocalBusiness schema, consistent NAP, and geographic signal s. National businesses focus more on topical authority and comprehensive content. Both need strong technical foundations and well-structured content.'
            }
        ]
    
    def generate_conclusion(self):
        """Generate conclusion section"""
        return {
            'title': f'Taking Action on {self.industry_name} AI SEO',
            'paragraphs': [
                f'AI search is transforming how customers discover {self.industry_name.lower()} services. Businesses that optimize now gain significant competitive advantages as AI engines become primary information sources.',
                f'The strategies in this guide provide a comprehensive roadmap for {self.industry_name.lower()} AI SEO success. Start with technical foundations (schema markup, site speed, structure), then expand to content optimization and authority building.',
                'AI SEO isn\'t a one-time project—it requires ongoing attention and refinement. As AI systems evolve, optimization strategies adapt. However, the fundamentals remain: clear structure, authoritative content, and technical excellence.'
            ],
            'next_steps': [
                f'Run a comprehensive AI SEO audit of your {self.industry_name.lower()} website',
                'Implement priority schema markup on all important pages',
                'Restructure content with clear hierarchies and FAQ sections',
                'Optimize technical performance for AI crawler efficiency',
                'Establish a content plan focused on topical authority',
                'Monitor AI citations and referral traffic monthly',
                'Refine strategies based on performance data'
            ]
        }

def generate_industry_page(industry, content_type):
    """Generate a complete page data object for an industry and content type"""
    generator = IndustryContentGenerator(industry, content_type)
    
    # Base page data
    page_data = {
        'title': content_type['title_pattern'].replace('{industry_name}', industry['name']),
        'meta_description': content_type['meta_description_pattern'].replace('{industry_name}', industry['name']),
        'slug': content_type['url_pattern'].replace('{industry_slug}', industry['slug']),
        'industry': industry['id'],
        'industry_name': industry['name'],
        'content_type': content_type['id'],
        'hero_section': generator.generate_hero_section(),
        'introduction': generator.generate_introduction(),
        'code_examples': generator.generate_code_examples(),
        'measurement': generator.generate_measurement(),
        'faq': generator.generate_faq(),
        'conclusion': generator.generate_conclusion(),
        'related_industries': []  # Will be populated later
    }
    
    # Content type-specific sections
    if content_type['id'] == 'guide':
        page_data['main_content'] = generator.generate_guide_content()
        page_data['challenges'] = generator.generate_challenges()
        page_data['solutions'] = generator.generate_solutions()
    elif content_type['id'] == 'mistakes':
        page_data['mistakes'] = {
            'title': f'Critical AI SEO Mistakes {industry["name"]} Websites Make',
            'introduction': f'These mistakes are costing {industry["name"].lower()} websites valuable AI search visibility. Each represents a missed opportunity for citations and traffic.',
            'items': generator.generate_mistakes_content()
        }
    elif content_type['id'] == 'checklist':
        page_data['checklist'] = {
            'title': f'Complete AI SEO Checklist for {industry["name"]}',
            'introduction': f'Follow this systematic checklist to optimize your {industry["name"].lower()} website for AI search engines. Each item includes implementation details and priority levels.'
        }
        page_data['checklist'].update(generator.generate_checklist_content())
    elif content_type['id'] == 'best-practices':
        page_data['best_practices'] = {
            'title': f'{industry["name"]} AI SEO Best Practices',
            'introduction': f'These expert best practices represent the cutting edge of AI SEO for {industry["name"].lower()} websites. Implement them to stay ahead of competition.',
            'items': generator.generate_best_practices_content()
        }
    
    return page_data

def get_related_industries(current_industry, all_industries, count=6):
    """Get related industries from the same category"""
    same_category = [
        ind for ind in all_industries 
        if ind['category'] == current_industry['category'] 
        and ind['id'] != current_industry['id']
    ]
    
    # Take up to count industries from same category
    related = same_category[:count]
    
    # If not enough, add from other categories
    if len(related) < count:
        other_industries = [
            ind for ind in all_industries 
            if ind['id'] != current_industry['id'] 
            and ind not in related
        ]
        related.extend(other_industries[:(count - len(related))])
    
    return [
        {
            'name': ind['name'],
            'url': f'/ai-seo-{ind["slug"]}'
        }
        for ind in related
    ]

def main():
    """Main generation function"""
    print("🚀 Starting Industry pSEO Generation...")
    print("=" * 60)
    
    # Load industries and content types
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    data_dir = os.path.join(project_root, 'src', 'data', 'pseo')
    
    # Load data files
    with open(os.path.join(data_dir, 'industries-ai-seo.json'), 'r') as f:
        industries_data = json.load(f)
        industries = industries_data['industries']
    
    with open(os.path.join(data_dir, 'content-types-industry.json'), 'r') as f:
        content_types_data = json.load(f)
        content_types = content_types_data['content_types']
    
    print(f"✅ Loaded {len(industries)} industries")
    print(f"✅ Loaded {len(content_types)} content types")
    print(f"📄 Will generate {len(industries) * len(content_types)} pages")
    print()
    
    # Generate all pages
    all_pages = []
    stats = {
        'total_pages': 0,
        'by_content_type': {},
        'by_category': {}
    }
    
    for industry in industries:
        print(f"Generating pages for {industry['name']}...")
        
        for content_type in content_types:
            page_data = generate_industry_page(industry, content_type)
            
            # Add related industries
            page_data['related_industries'] = get_related_industries(industry, industries)
            
            all_pages.append(page_data)
            stats['total_pages'] += 1
            
            # Track stats
            if content_type['id'] not in stats['by_content_type']:
                stats['by_content_type'][content_type['id']] = 0
            stats['by_content_type'][content_type['id']] += 1
            
            if industry['category'] not in stats['by_category']:
                stats['by_category'][industry['category']] = 0
            stats['by_category'][industry['category']] += 1
        
        print(f"  ✓ Generated {len(content_types)} pages for {industry['name']}")
    
    # Save generated pages
    output_path = os.path.join(data_dir, 'industry-pages.json')
    with open(output_path, 'w') as f:
        json.dump(all_pages, f, indent=2)
    
    print()
    print("=" * 60)
    print("✅ Generation Complete!")
    print(f"📄 Total pages generated: {stats['total_pages']}")
    print(f"💾 Saved to: {output_path}")
    print()
    
    print("📊 Pages by Content Type:")
    for content_type, count in stats['by_content_type'].items():
        print(f"  • {content_type}: {count} pages")
    print()
    
    print("📊 Pages by Category:")
    for category, count in sorted(stats['by_category'].items()):
        print(f"  • {category}: {count} pages")
    print()
    
    # Save generation summary
    summary = {
        'generated_at': datetime.now().isoformat(),
        'total_pages': stats['total_pages'],
        'industries_count': len(industries),
        'content_types_count': len(content_types),
        'by_content_type': stats['by_content_type'],
        'by_category': stats['by_category']
    }
    
    summary_path = os.path.join(data_dir, 'industry-summary.json')
    with open(summary_path, 'w') as f:
        json.dump(summary, f, indent=2)
    
    print(f"📊 Summary saved to: {summary_path}")
    print()
    print("🎉 All done! You can now build your Next.js site.")
    print("=" * 60)

if __name__ == '__main__':
    main()