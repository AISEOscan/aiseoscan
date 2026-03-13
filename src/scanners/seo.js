// AI SEO Scanner - Comprehensive analysis for LLM optimization

import axios from 'axios';
import { REQUEST_TIMEOUT } from './index';

// Sanitize a raw page title for use in fix suggestions.
// Strips HTML entities, removes repeated site name suffixes (e.g. "· GitHub · GitHub"),
// and truncates to a readable length.
function sanitizeTitle(title) {
  if (!title) return 'Your Page Title';
  // Decode common HTML entities
  let clean = title
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
  // Remove repeated site name suffixes separated by · or | or -
  // e.g. "Article Title · Site Name · Site Name" → "Article Title"
  const parts = clean.split(/\s*[·|—–-]\s*/);
  if (parts.length > 1) {
    clean = parts[0].trim();
  }
  // Truncate to 60 chars
  if (clean.length > 60) {
    clean = clean.substring(0, 57) + '...';
  }
  return clean || 'Your Page Title';
}

// Sanitize a raw meta description for use in fix suggestions.
// Strips HTML entities and truncates to a readable length.
function sanitizeDescription(desc) {
  if (!desc) return 'your page topic';
  let clean = desc
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
  if (clean.length > 80) {
    clean = clean.substring(0, 77) + '...';
  }
  return clean;
}

export async function scanSEO(url) {
  try {
    // Make sure URL is properly formatted
    const parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
    const baseUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}`;
    
    console.log(` Starting AI SEO scan for: ${baseUrl}`);
    
    // Fetch the main page HTML with AI-friendly headers
    const response = await axios.get(baseUrl, {
      timeout: REQUEST_TIMEOUT,
      validateStatus: () => true,
      headers: {
        'User-Agent': 'AISEOScan Bot/1.0 (AI Search Optimization; +https://aiseoscan.dev/bot)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Cache-Control': 'no-cache'
      }
    });
    
    const html = typeof response.data === 'string' ? response.data : '';
    const issues = [];
    
    if (!html) {
      return {
        scanner: 'seo',
        status: 'error',
        error: 'Unable to fetch page content for AI SEO analysis',
        issues: []
      };
    }
    
    console.log(`🔍 AI SEO scan - Retrieved ${html.length} characters of HTML content`);
    
    // Extract key content for analysis
    const pageData = extractPageData(html, baseUrl);
    // Helper function to extract key page data for AI analysis
function extractPageData(html, baseUrl) {
  // Extract text content without scripts/styles
  const textContent = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Extract title
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';
  
  // Extract meta description
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i);
  const description = descMatch ? descMatch[1].trim() : '';
  
  // Extract headings
  const headings = html.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi) || [];
  const headingData = headings.map(h => {
    const level = parseInt(h.match(/<h([1-6])/)[1]);
    const text = h.replace(/<[^>]*>/g, '').trim();
    return { level, text };
  });
  
  // Extract FAQ content
 const faqPatterns = [
  /(?:frequently asked questions|faq|q&a|questions and answers)/i,
  /<dt[^>]*>(.*?)<\/dt>\s*<dd[^>]*>(.*?)<\/dd>/gi,
  /(?:q:|question:|a:|answer:)/gi,
  /<h[2-4][^>]*>[^<]*\?[^<]*<\/h[2-4]>/gi,
];
  
  const hasFAQ = faqPatterns.some(pattern => pattern.test(html));
  
  // Word count and readability
  const words = textContent.split(/\s+/).filter(word => word.length > 0);
  const sentences = textContent.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const avgWordsPerSentence = sentences.length > 0 ? words.length / sentences.length : 0;
  
  return {
    title,
    description,
    textContent,
    headingData,
    hasFAQ,
    wordCount: words.length,
    sentenceCount: sentences.length,
    avgWordsPerSentence,
    html
  };
}
// 1. STRUCTURED DATA & SCHEMA MARKUP (30%)
async function checkStructuredDataAndSchema(html, baseUrl, pageData) {
  const issues = [];
  
  // JSON-LD Detection and Analysis
  const jsonLdMatches = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gis) || [];
  
  if (jsonLdMatches.length === 0) {
    issues.push({
      type: 'missing-json-ld-schema',
      severity: 'critical',
      description: 'No JSON-LD structured data found - AI engines rely on this for content understanding',
      fix: {
        title: 'Implement JSON-LD Structured Data',
        description: 'JSON-LD helps AI engines understand your content context and increases citation potential.',
        code: `<!-- Essential JSON-LD for AI SEO: -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "${pageData.title || 'Your Article Title'}",
  "author": {
    "@type": "Person",
    "name": "Author Name",
    "url": "${baseUrl}/about",
    "sameAs": ["https://linkedin.com/in/author", "https://twitter.com/author"]
  },
  "publisher": {
    "@type": "Organization",
    "name": "Your Organization",
    "logo": "${baseUrl}/logo.jpg",
    "url": "${baseUrl}"
  },
  "datePublished": "2024-01-15T10:00:00Z",
  "dateModified": "2024-01-20T14:30:00Z",
  "description": "${pageData.description || 'Article description'}",
  "mainEntityOfPage": "${baseUrl}",
  "image": "${baseUrl}/article-image.jpg"
}
</script>

<!-- For FAQ content (critical for AI citation): -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the main benefit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The main benefit is improved AI search visibility through proper structured data implementation."
      }
    }
  ]
}
</script>`
      }
    });
  } else {
    // Analyze existing JSON-LD quality
    let hasArticleSchema = false;
    let hasFAQSchema = false;
    let hasOrganizationSchema = false;
    let hasPersonSchema = false;
    let schemaErrors = [];
    
    jsonLdMatches.forEach((match, index) => {
      try {
        const jsonContent = match.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '');
        const schema = JSON.parse(jsonContent);
        
        // Unwrap @graph pattern used by WordPress/Yoast, Next.js, and other modern CMSes.
        // A @graph schema looks like: { "@context": "...", "@graph": [ { "@type": "Article" }, ... ] }
        // Without unwrapping, all type checks below fail and valid schema gets flagged as missing.
        const schemaNodes = schema['@graph'] 
          ? schema['@graph'] 
          : (Array.isArray(schema) ? schema : [schema]);
        
        // Check schema types against the normalized node list
        if (schemaNodes.some(s => s['@type'] === 'Article')) {
          hasArticleSchema = true;
          
          // Validate Article schema completeness
          const articleNode = schemaNodes.find(s => s['@type'] === 'Article');
          const requiredFields = ['headline', 'author', 'datePublished', 'publisher'];
          const missingFields = requiredFields.filter(field => !articleNode[field]);
          
          if (missingFields.length > 0) {
            schemaErrors.push(`Article schema missing: ${missingFields.join(', ')}`);
          }
        }
        
        if (schemaNodes.some(s => s['@type'] === 'FAQPage')) {
          hasFAQSchema = true;
        }
        
        if (schemaNodes.some(s => s['@type'] === 'Organization')) {
          hasOrganizationSchema = true;
        }
        
        if (schemaNodes.some(s => s['@type'] === 'Person')) {
          hasPersonSchema = true;
        }
        
      } catch (parseError) {
        schemaErrors.push(`Invalid JSON-LD syntax in schema ${index + 1}`);
      }
    });
    
    // Flag missing critical schemas
    if (!hasArticleSchema && pageData.wordCount > 300) {
      issues.push({
        type: 'missing-article-schema',
        severity: 'medium',
        description: 'Content appears to be article-style but missing Article schema markup',
        fix: {
          title: 'Add Article Schema for AI Citation',
          description: 'Article schema helps AI engines understand your content structure and increases citation potential.',
          code: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "${pageData.title}",
  "author": {
    "@type": "Person", 
    "name": "Author Name"
  },
  "datePublished": "2024-01-15T10:00:00Z",
  "publisher": {
    "@type": "Organization",
    "name": "Your Site Name"
  }
}
</script>`
        }
      });
    }
    
    if (pageData.hasFAQ && !hasFAQSchema) {
      issues.push({
        type: 'missing-faq-schema',
        severity: 'medium',
        description: 'FAQ content detected but missing FAQ schema - missed AI citation opportunity',
        fix: {
          title: 'Add FAQ Schema for AI Answers',
          description: 'FAQ schema makes your Q&A content easily extractable by AI engines for direct answers.',
          code: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage", 
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Your question here?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your detailed answer here that AI engines can cite."
      }
    }
  ]
}
</script>`
        }
      });
    }
    
    if (schemaErrors.length > 0) {
      issues.push({
        type: 'schema-validation-errors',
        severity: 'medium',
        description: `Schema validation issues found: ${schemaErrors.join('; ')}`,
        fix: {
          title: 'Fix Schema Validation Errors',
          description: 'Invalid schema markup can prevent AI engines from understanding your content.',
          code: `<!-- Validate your schema at: https://validator.schema.org -->
<!-- Common fixes: -->
<!-- 1. Ensure all required properties are present -->
<!-- 2. Use correct data types (string, URL, Date) -->
<!-- 3. Follow Schema.org specifications -->
<!-- 4. Test with Google's Rich Results Test -->`
        }
      });
    }
  }
  
  // Open Graph Analysis
  const ogTags = ['og:title', 'og:description', 'og:image', 'og:url', 'og:type'];
  const missingOGTags = ogTags.filter(tag => 
    !html.match(new RegExp(`<meta[^>]*property=["']${tag}["'][^>]*>`, 'i'))
  );
  
  if (missingOGTags.length > 0) {
    issues.push({
      type: 'incomplete-open-graph-ai',
      severity: 'medium',
      description: `Missing Open Graph tags: ${missingOGTags.join(', ')} - impacts AI content sharing`,
      fix: {
        title: 'Complete Open Graph Implementation',
        description: 'Complete Open Graph tags ensure AI engines have rich context when processing shared content.',
        code: `<!-- Complete Open Graph for AI optimization: -->
<meta property="og:type" content="article">
<meta property="og:title" content="${pageData.title}">
<meta property="og:description" content="${pageData.description}">
<meta property="og:image" content="${baseUrl}/ai-optimized-image.jpg">
<meta property="og:url" content="${baseUrl}">
<meta property="og:site_name" content="Your Site Name">
<meta property="article:author" content="Author Name">
<meta property="article:published_time" content="2024-01-15T10:00:00Z">
<meta property="article:section" content="Your Content Category">`
      }
    });
  }
  
  return issues;
}
// 2. CONTENT QUALITY & AI DIGESTIBILITY (25%)
async function checkContentQualityForAI(html, pageData) {
  const issues = [];
  
  // Heading Hierarchy Analysis
  const { headingData } = pageData;
  
  if (headingData.length === 0) {
    issues.push({
      type: 'no-heading-structure',
      severity: 'critical',
      description: 'No heading structure found - AI engines need clear content hierarchy',
      fix: {
        title: 'Create Clear Heading Structure',
        description: 'AI engines use heading hierarchy to understand content structure and extract key information.',
        code: `<!-- AI-optimized heading structure: -->
<h1>Main Topic: Clear Primary Keyword</h1>
  <h2>Key Subtopic 1: Answering "What is..."</h2>
    <h3>Specific Detail That Answers Common Questions</h3>
  <h2>Key Subtopic 2: Answering "How to..."</h2>
    <h3>Step-by-Step Information</h3>
  <h2>Frequently Asked Questions</h2>
    <h3>Common Question 1?</h3>
    <h3>Common Question 2?</h3>

<!-- AI benefits of proper hierarchy: -->
<!-- 1. Better content understanding -->
<!-- 2. Easier answer extraction -->
<!-- 3. Improved featured snippet potential -->
<!-- 4. Better topic authority recognition -->`
      }
    });
  } else {
    // Check H1 optimization for AI
    const h1Tags = headingData.filter(h => h.level === 1);
    
    if (h1Tags.length === 0) {
      issues.push({
        type: 'missing-h1-ai-optimization',
        severity: 'critical',
        description: 'Missing H1 tag - AI engines need clear page topic identification',
        fix: {
          title: 'Add AI-Optimized H1 Tag',
          description: 'H1 tags help AI engines identify the main topic and improve citation accuracy.',
          code: `<!-- AI-optimized H1 examples: -->
<h1>Complete Guide to [Main Topic]: Everything You Need to Know</h1>
<h1>How to [Achieve Goal]: Step-by-Step Expert Guide</h1>
<h1>What is [Topic]? Definition, Benefits, and Best Practices</h1>
<h1>[Topic] vs [Alternative]: Comprehensive Comparison Guide</h1>`
        }
      });
    } else if (h1Tags.length > 1) {
      issues.push({
        type: 'multiple-h1-ai-confusion',
        severity: 'medium',
        description: `Multiple H1 tags (${h1Tags.length}) can confuse AI topic identification`,
        fix: {
          title: 'Optimize H1 Structure for AI Clarity',
          description: 'Single H1 tag provides clear topic signal to AI engines.',
          code: `<!-- Fix multiple H1s: -->
<h1>Primary Topic (Keep only this H1)</h1>
<h2>Secondary Topics (Convert other H1s to H2)</h2>
<h2>Related Topics</h2>`
        }
      });
    }
    
    // Check for question-based headings (AI loves these)
    const questionHeadings = headingData.filter(h => 
      /\b(what|how|why|when|where|which|who)\b/i.test(h.text) || h.text.includes('?')
    );
    
    if (questionHeadings.length === 0 && pageData.wordCount > 500) {
      issues.push({
        type: 'missing-question-headings',
        severity: 'low',
        description: 'No question-based headings found - missed AI answer optimization opportunity',
        fix: {
          title: 'Add Question-Based Headings',
          description: 'Question headings help AI engines identify answerable content and improve citation chances.',
          code: `<!-- Add question-based headings: -->
<h2>What is [Your Topic]?</h2>
<h2>How Does [Process] Work?</h2>
<h2>Why is [Topic] Important?</h2>
<h2>When Should You [Take Action]?</h2>
<h2>What Are the Benefits of [Topic]?</h2>
<h2>How to Get Started with [Topic]?</h2>`
        }
      });
    }
  }
  
  // FAQ Section Analysis (Critical for AI)
  if (!pageData.hasFAQ && pageData.wordCount > 300) {
    issues.push({
  type: 'missing-faq-section',
  severity: 'medium',
  description: 'No FAQ section detected - major missed opportunity for AI citation',
  fix: {
    title: 'Add a FAQ Section',
    description: 'No FAQ content was detected on this page. FAQ sections are the highest-return content addition for AI visibility — they give AI engines pre-formatted question-answer pairs to cite directly. The questions should match what your customers actually ask.',
    code: `<!-- Add this section to your page, ideally before the footer -->
<section>
  <h2>Frequently Asked Questions</h2>

  <div>
    <h3>[Most common question customers ask before buying]?</h3>
    <p>[Direct, complete answer. Write it as if answering one person, not a crowd.]</p>
  </div>

  <div>
    <h3>[Second most common question]?</h3>
    <p>[Answer with specific details — avoid vague reassurances like "we're the best".]</p>
  </div>

  <div>
    <h3>[A question about pricing, timeline, or process]?</h3>
    <p>[Be specific. "Starting from X" or "typically takes Y days" is more useful than "contact us".]</p>
  </div>

</section>

<!-- Then add FAQ schema so AI engines can parse it directly: -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Your first question]?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Your answer — copy it exactly from the HTML above]"
      }
    },
    {
      "@type": "Question", 
      "name": "[Your second question]?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Your answer]"
      }
    }
  ]
}
</script>

<!-- FAQ writing rules: -->
<!-- 1. Use the exact words your customers use, not industry jargon -->
<!-- 2. Each answer should be self-contained — readable without context -->
<!-- 3. Aim for 3-6 questions minimum, 10 maximum per page -->
<!-- 4. Keep answers under 100 words each for best AI citation format -->`
  }
});
   
  }
  
  // Content Quality Analysis
  if (pageData.wordCount < 300) {
    issues.push({
      type: 'thin-content-ai-impact',
      severity: 'medium',
      description: `Content is thin (${pageData.wordCount} words) - AI engines prefer comprehensive content`,
      fix: {
        title: 'Expand Content for AI Authority',
        description: 'AI engines favor comprehensive, authoritative content. Aim for 500+ words with in-depth information.',
        code: `<!-- Content expansion strategies for AI: -->

<!-- 1. Add comprehensive definitions -->
<section>
  <h2>What is [Topic]: Complete Definition</h2>
  <p>Detailed explanation with context, examples, and background information...</p>
</section>

<!-- 2. Include step-by-step guides -->
<section>
  <h2>How to [Achieve Goal]: Step-by-Step Guide</h2>
  <ol>
    <li><strong>Step 1:</strong> Detailed instructions with reasoning...</li>
    <li><strong>Step 2:</strong> Specific actions with examples...</li>
  </ol>
</section>

<!-- 3. Add comparative analysis -->
<section>
  <h2>[Topic] vs Alternatives: Complete Comparison</h2>
  <p>Detailed comparison with pros, cons, and use cases...</p>
</section>

<!-- 4. Include expert insights -->
<section>
  <h2>Expert Tips and Best Practices</h2>
  <p>Professional advice and industry insights...</p>
</section>`
      }
    });
  }
  
  // Factual Density Analysis
  const factualIndicators = pageData.textContent.match(/\b(\d+%|\$\d+|\d+\s*(years|months|days|hours)|according to|research shows|studies indicate|data reveals)\b/gi) || [];
  const factualDensity = factualIndicators.length / Math.max(1, pageData.wordCount / 100); // Facts per 100 words
  
  if (factualDensity < 1) {
    issues.push({
  type: 'low-factual-density',
  severity: 'low',
  description: 'Content lacks specific facts and data - AI engines prefer factual, citable information',
  fix: {
    title: 'Increase Factual Content Density',
    description: 'Your content reads as mostly opinion or general advice with few concrete numbers or sources. AI engines prefer content they can cite — specific stats, timeframes, and named examples. Here\'s how to add factual density to your existing content:',
    code: `<!-- Pattern: replace vague claims with specific, sourced statements -->

<!-- INSTEAD OF vague: -->
<!-- <p>Many businesses see improved results with this approach.</p> -->

<!-- USE specific + sourced: -->
<!-- <p>According to [Source Name], businesses that [specific action] see [specific result].</p> -->

<!-- Types of factual elements to add: -->

<!-- 1. Statistics with source -->
<p>According to [Industry Report / Study Name], [specific stat]% of [audience] [specific outcome].</p>

<!-- 2. Specific timeframes -->
<p>Most [users/customers/businesses] see results within [X days/weeks] of [specific action].</p>

<!-- 3. Your own data (most credible) -->
<p>Based on our analysis of [X] [customers/sites/campaigns], [specific finding].</p>

<!-- 4. Named examples -->
<p>For example, [Real Company or Case Study] achieved [specific result] by [specific method].</p>

<!-- Priority: your own data > named case studies > industry reports > general claims -->`
  }
});
     
  }
  
  return issues;
}
// Author Authority and Content Attribution (Part of Content Quality)
// Author Authority and Content Attribution (Part of Content Quality)
async function checkAuthorAuthorityAndAttribution(html, pageData) {
  const issues = [];
  
  // Publication date analysis
  const datePatterns = [
    /published[:\s]*([^<\n]+)/i,
    /date[:\s]*([^<\n]+)/i,
    /<time[^>]*>(.*?)<\/time>/i,
    /\b(january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{1,2},?\s+\d{4}/i
  ];
  
  const hasPublicationDate = datePatterns.some(pattern => pattern.test(html)) || 
                            html.includes('datePublished') || 
                            html.includes('"dateModified"');
  
  if (!hasPublicationDate) {
    issues.push({
      type: 'missing-publication-date',
      severity: 'low',
      description: 'No clear publication date found - AI engines use dates for content freshness assessment',
      fix: {
        title: 'Add Publication and Update Dates',
        description: 'Clear dates help AI engines assess content freshness and relevance.',
        code: `<!-- Publication date examples: -->

<!-- Visible publication date: -->
<p class="publish-info">
  <time datetime="2024-01-15T10:00:00Z">Published: January 15, 2024</time>
  <time datetime="2024-01-20T14:30:00Z">Last Updated: January 20, 2024</time>
</p>

<!-- In article header: -->
<header class="article-header">
  <h1>Article Title</h1>
  <div class="article-meta">
    <span class="author">By John Smith</span>
    <span class="date">January 15, 2024</span>
  </div>
</header>

<!-- Schema markup for dates: -->
<script type="application/ld+json">
{
  "@type": "Article",
  "datePublished": "2024-01-15T10:00:00Z",
  "dateModified": "2024-01-20T14:30:00Z"
}
</script>`
      }
    });
  }
  
  // Answer-Format Content Analysis
  const answerPatterns = [
    /\b(the answer is|in summary|to summarize|the result is|the solution is)\b/i,
    /\b(here's how|here's what|here's why)\b/i,
    /\b(step 1|first|second|third|finally)\b/i
  ];
  
  const hasAnswerFormat = answerPatterns.some(pattern => pattern.test(pageData.textContent));
  
  if (!hasAnswerFormat && pageData.wordCount > 400) {
    issues.push({
      type: 'missing-answer-format-content',
      severity: 'low',
      description: 'Content lacks clear answer formats - AI engines prefer direct, quotable answers',
      fix: {
        title: 'Structure Content for AI Citation',
        description: 'Format content with clear answers that AI engines can easily extract and cite.',
        code: `<!-- Answer-format content examples: -->

<!-- Direct answers: -->
<p><strong>The answer is:</strong> [Clear, specific answer that AI can quote directly]</p>

<!-- Step-by-step answers: -->
<h3>How to [accomplish goal]:</h3>
<ol>
  <li><strong>Step 1:</strong> [Specific action with clear instructions]</li>
  <li><strong>Step 2:</strong> [Next action with details]</li>
  <li><strong>Step 3:</strong> [Final step with expected outcome]</li>
</ol>

<!-- Definition answers: -->
<p><strong>[Term] is defined as:</strong> [Clear definition that AI can cite]</p>

<!-- Comparison answers: -->
<p><strong>The main difference between X and Y is:</strong> [Specific comparison that AI can reference]</p>

<!-- Summary answers: -->
<p><strong>In summary:</strong> [Concise summary of key points that AI can quote]</p>`
      }
    });
  }
  
  // Readability for AI Processing
  if (pageData.avgWordsPerSentence > 25) {
    issues.push({
      type: 'poor-readability-ai-processing',
      severity: 'low',
      description: 'Long sentences may hinder AI content processing and citation accuracy',
      fix: {
        title: 'Improve Content Readability for AI',
        description: 'Shorter, clearer sentences help AI engines better understand and cite your content.',
        code: `<!-- Readability optimization for AI: -->

<!-- Instead of long, complex sentences: -->
<!-- "Our comprehensive digital marketing platform provides advanced analytics, automated campaign management, real-time performance tracking, and integrated social media scheduling capabilities that help businesses increase their online presence and drive measurable results across all digital channels." -->

<!-- Use clear, AI-friendly sentences: -->
<p>Our digital marketing platform includes four key features:</p>
<ul>
  <li><strong>Advanced Analytics:</strong> Track performance across all channels</li>
  <li><strong>Automated Campaigns:</strong> Set up campaigns that run themselves</li>  
  <li><strong>Real-time Tracking:</strong> Monitor results as they happen</li>
  <li><strong>Social Media Scheduling:</strong> Plan and publish content automatically</li>
</ul>
<p>These features help businesses increase online presence and drive measurable results.</p>

<!-- AI readability tips: -->
<!-- 1. Average 15-20 words per sentence -->
<!-- 2. Use bullet points for complex information -->
<!-- 3. Include clear topic sentences -->
<!-- 4. Use active voice when possible -->
<!-- 5. Define technical terms clearly -->`
      }
    });
  }
  
  return issues;
}
// 3. TECHNICAL SEO FOUNDATION (20%)
async function checkTechnicalAIFoundation(html, baseUrl, responseHeaders) {
  const issues = [];
  
  // Page Speed Analysis (Critical for AI crawling)
  const performanceHints = [];
  
  // Check for render-blocking resources
  const renderBlockingCSS = html.match(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi) || [];
  const renderBlockingJS = html.match(/<script[^>]*src[^>]*(?!async|defer)[^>]*>/gi) || [];
  
  if (renderBlockingCSS.length > 3) {
    performanceHints.push(`${renderBlockingCSS.length} render-blocking CSS files`);
  }
  
  if (renderBlockingJS.length > 2) {
    performanceHints.push(`${renderBlockingJS.length} render-blocking JavaScript files`);
  }
  
  if (performanceHints.length > 0) {
   issues.push({
     type: 'render-blocking-resources-ai-impact',
     severity: 'medium',
     description: `Performance issues detected: ${performanceHints.join(', ')} - may impact AI crawler efficiency`,
     fix: {
       title: 'Optimize Resources for AI Crawlers',
       description: 'Fast-loading pages ensure AI crawlers can efficiently process your content without timeouts.',
       code: `<!-- Your page has ${renderBlockingCSS.length} CSS files and ${renderBlockingJS.length} JS files loaded in a render-blocking way. -->
<!-- These slow down how quickly AI crawlers and users can access your content. -->

<!-- 1. For CSS files — load non-critical styles asynchronously: -->
<link rel="preload" href="your-styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="your-styles.css"></noscript>

<!-- 2. For JavaScript files — add defer or async: -->
<script src="your-script.js" defer></script>   <!-- use for scripts that need DOM -->
<script src="your-analytics.js" async></script> <!-- use for independent scripts -->

<!-- 3. Inline only the CSS needed for above-the-fold content -->
<!-- 4. Use your browser DevTools > Network tab to identify which files are largest -->
<!-- 5. Consider a CDN or bundler (Vite, Webpack) to reduce total file count -->`
     }
   });
 }
 
 // Mobile Optimization (AI engines prioritize mobile)
 const viewportMatch = html.match(/<meta[^>]*name=["']viewport["'][^>]*content=["']([^"']*)["'][^>]*>/i);
 if (!viewportMatch) {
   issues.push({
     type: 'missing-viewport-ai-mobile',
     severity: 'critical',
     description: 'Missing viewport meta tag - AI engines prioritize mobile-optimized content',
     fix: {
       title: 'Add Mobile Viewport for AI Optimization',
       description: 'Mobile-first indexing means AI engines primarily use mobile versions of content for analysis.',
       code: `<!-- Essential mobile viewport: -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Enhanced mobile optimization: -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
<meta name="theme-color" content="#your-brand-color">
<meta name="apple-mobile-web-app-capable" content="yes">

<!-- Mobile-friendly content structure: -->
<!-- 1. Touch-friendly navigation -->
<!-- 2. Readable font sizes (16px minimum) -->
<!-- 3. Proper spacing between clickable elements -->
<!-- 4. Fast-loading images -->
<!-- 5. Simplified layouts for small screens -->`
     }
   });
 }
 
 // Semantic HTML Structure Analysis
 const semanticTags = ['main', 'article', 'section', 'nav', 'header', 'footer', 'aside'];
 const foundSemanticTags = semanticTags.filter(tag => 
   html.includes(`<${tag}`) || html.includes(`<${tag} `)
 );
 
 if (foundSemanticTags.length < 3) {
   issues.push({
     type: 'poor-semantic-structure-ai',
     severity: 'low',
     description: 'Limited semantic HTML structure - AI engines prefer well-structured content',
     fix: {
       title: 'Improve Semantic HTML for AI Understanding',
       description: 'Semantic HTML helps AI engines better understand content structure and context.',
       code: `<!-- AI-friendly semantic structure: -->
<header>
 <nav><!-- Navigation menu --></nav>
</header>

<main>
 <article>
   <header>
     <h1>Article Title</h1>
     <div class="article-meta">
       <span class="author">By Author Name</span>
       <time datetime="2024-01-15">January 15, 2024</time>
     </div>
   </header>
   
   <section>
     <h2>Main Content Section</h2>
     <p>Article content...</p>
   </section>
   
   <section class="faq">
     <h2>Frequently Asked Questions</h2>
     <!-- FAQ content -->
   </section>
 </article>
 
 <aside>
   <section class="related-content">
     <h3>Related Articles</h3>
     <!-- Related links -->
   </section>
 </aside>
</main>

<footer>
 <!-- Site footer -->
</footer>

<!-- Benefits for AI engines: -->
<!-- 1. Clear content boundaries -->
<!-- 2. Better context understanding -->
<!-- 3. Improved content extraction -->
<!-- 4. Enhanced topic identification -->`
     }
   });
 }
 
 // Internal Linking Analysis for AI Context
 const internalLinks = html.match(/<a[^>]*href=["']\/[^"']*["'][^>]*>/gi) || [];
 const contextualLinks = internalLinks.filter(link => {
   const linkText = link.match(/>([^<]*)</);
   return linkText && linkText[1] && linkText[1].trim().length > 5;
 });
 
 if (contextualLinks.length < 3) {
   issues.push({
  type: 'insufficient-contextual-links-ai',
  severity: 'low',
  description: 'Limited contextual internal links - AI engines use links to understand content relationships',
  fix: {
    title: 'Add Contextual Internal Links for AI',
    description: 'Your page has few or no internal links pointing to related content. AI engines use internal links to map topic relationships across your site — pages that link to each other signal they belong to the same subject area, which builds topical authority.',
    code: `<!-- Rule: link to related pages naturally within your prose, not just in navs/footers -->

<!-- Pattern: mention a concept → link to your deeper page on that concept -->
<p>This works best when combined with a solid 
  <a href="/your-related-page">keyword research process</a> — 
  [one sentence explaining the connection].
</p>

<!-- What makes a good contextual link: -->
<!-- 1. Anchor text describes the destination page topic (not "click here") -->
<!-- 2. The link appears inside a sentence, not as a standalone bullet -->
<!-- 3. The linked page is genuinely related to the current topic -->
<!-- 4. The surrounding sentence gives context for why you're linking -->

<!-- Where to add internal links on this page: -->
<!-- - In your introduction, link to any prerequisite concepts you mention -->
<!-- - In body sections, link to deeper guides on subtopics you reference briefly -->
<!-- - At the end, link to logical next steps for the reader -->

<!-- Aim for 3-5 contextual internal links per page of substantial content -->
<!-- Avoid linking the same destination more than once per page -->`
  }
});
    
 }
 
 // URL Structure Analysis
 const urlSegments = baseUrl.split('/').filter(segment => segment.length > 0);
 const hasDescriptiveUrl = urlSegments.some(segment => 
   segment.length > 3 && !segment.match(/^\d+$/) && segment.includes('-')
 );
 
 if (!hasDescriptiveUrl && urlSegments.length > 3) {
   issues.push({
     type: 'non-descriptive-url-structure',
     severity: 'low',
     description: 'URL structure could be more descriptive for AI content understanding',
     fix: {
       title: 'Optimize URL Structure for AI',
       description: 'Descriptive URLs help AI engines understand page content before processing.',
       code: `<!-- AI-friendly URL examples: -->

<!-- Instead of: -->
<!-- /page?id=123 -->
<!-- /p/456789 -->
<!-- /content/item -->

<!-- Use descriptive URLs: -->
<!-- /complete-guide-to-ai-seo -->
<!-- /how-to-optimize-content-for-ai-search -->
<!-- /ai-seo-best-practices-2024 -->
<!-- /category/ai-optimization/getting-started -->

<!-- URL structure best practices: -->
<!-- 1. Include primary keywords -->
<!-- 2. Use hyphens to separate words -->
<!-- 3. Keep URLs under 60 characters when possible -->
<!-- 4. Create logical hierarchy -->
<!-- 5. Avoid unnecessary parameters -->`
     }
   });
 }
 
 return issues;
}

// 4. AUTHORITY & TRUST SIGNALS (15%)
async function checkAuthorityAndTrustSignals(html, baseUrl) {
  const issues = [];
  
  // About Page Detection
  const aboutPagePatterns = [
    /<a[^>]*href=["'][^"']*about[^"']*["'][^>]*>/i,
    /<a[^>]*href=["'][^"']*\/about["'][^>]*>/i,
    /about us|about our|our story|our company/i
  ];
  
  const hasAboutLink = aboutPagePatterns.some(pattern => pattern.test(html));
  
  if (!hasAboutLink) {
    issues.push({
  type: 'missing-about-page-link',
  severity: 'medium',
  description: 'No About page link found - AI engines use this for credibility assessment',
  fix: {
    title: 'Add an About Page and Link to It',
    description: 'Your site has no detectable About page link in the navigation or footer. AI engines look for About pages to verify a business is real and establish who is behind the content. This is one of the fastest trust signals to add.',
    code: `<!-- Step 1: Add the link to your navigation and footer -->
<nav>
  <a href="/about">About</a>
</nav>
<footer>
  <a href="/about">About Us</a>
</footer>

<!-- Step 2: Create /about with these minimum sections -->

<!-- Who you are -->
<section>
  <h1>About [Your Company Name]</h1>
  <p>[2-3 sentences: what you do, who you serve, and how long you've been doing it]</p>
</section>

<!-- Why you're credible -->
<section>
  <h2>Our Expertise</h2>
  <p>[Specific experience, credentials, or results — use real numbers if you have them]</p>
</section>

<!-- How to reach you -->
<section>
  <h2>Contact</h2>
  <p>Email: [your real email]</p>
  <p>Location: [city/country is enough if you don't have a physical address]</p>
</section>

<!-- Minimum viable About page checklist: -->
<!-- ✓ Real company or person name -->
<!-- ✓ What you do and who you help -->
<!-- ✓ Some form of contact information -->
<!-- ✓ Linked from main navigation -->`
  }
});
     
  }
  
  // SSL/HTTPS Check
  if (!baseUrl.startsWith('https://')) {
    issues.push({
      type: 'missing-https-ai-trust',
      severity: 'critical',
      description: 'Site not using HTTPS - major trust signal missing for AI engines',
      fix: {
        title: 'Implement HTTPS for AI Trust',
        description: 'HTTPS is essential for AI engine trust and is required for credible content citation.',
        code: `<!-- HTTPS implementation steps: -->

<!-- 1. Obtain SSL certificate from: -->
<!-- - Let's Encrypt (free) -->
<!-- - Your hosting provider -->
<!-- - Certificate authority (paid) -->

<!-- 2. Configure server redirects: -->
<!-- Apache (.htaccess): -->
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

<!-- Nginx: -->
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

<!-- 3. Update internal links to HTTPS -->
<!-- 4. Update canonical URLs to HTTPS -->
<!-- 5. Update sitemap URLs to HTTPS -->
<!-- 6. Test with SSL checker tools -->`
      }
    });
  }
  
  return issues;
}
// 5. AI SEARCH OPTIMIZATION SPECIFICS (10%)
async function checkAISearchOptimization(html, pageData, baseUrl) {
  const issues = [];
  
  // Featured Snippet Optimization Analysis
  const snippetFormats = [
    // List format detection
    /<ol[^>]*>|<ul[^>]*>/i,
    // Table format detection  
    /<table[^>]*>/i,
    // Definition format detection
    /\b(is defined as|definition|means that)\b/i,
    // Step format detection
    /\b(step \d+|first|second|third|next|finally)\b/i
  ];
  
  const hasSnippetFormat = snippetFormats.some(pattern => pattern.test(html));
  
  if (!hasSnippetFormat && pageData.wordCount > 300) {
    issues.push({
      type: 'missing-featured-snippet-format',
      severity: 'low',
      description: 'Content not optimized for featured snippet extraction by AI engines',
      fix: {
        title: 'Format Content for AI Answer Extraction',
        description: 'Structure content in formats that AI engines can easily extract for direct answers.',
        code: `<!-- Featured snippet optimization formats: -->

<!-- List format (for "best," "top," "ways to"): -->
<h2>Top 5 Ways to Improve SEO</h2>
<ol>
  <li><strong>Optimize Title Tags:</strong> Include primary keywords in titles</li>
  <li><strong>Create Quality Content:</strong> Write comprehensive, helpful content</li>
  <li><strong>Build Internal Links:</strong> Connect related content strategically</li>
  <li><strong>Improve Page Speed:</strong> Optimize loading times for better UX</li>
  <li><strong>Add Schema Markup:</strong> Help search engines understand content</li>
</ol>

<!-- Definition format (for "what is" queries): -->
<h2>What is SEO?</h2>
<p><strong>SEO (Search Engine Optimization) is defined as</strong> the practice of optimizing websites to improve their visibility in search engine results pages (SERPs).</p>

<!-- Step-by-step format (for "how to" queries): -->
<h2>How to Optimize for AI Search</h2>
<ol>
  <li><strong>Step 1:</strong> Implement structured data markup</li>
  <li><strong>Step 2:</strong> Create comprehensive FAQ sections</li>
  <li><strong>Step 3:</strong> Optimize content for question-based queries</li>
</ol>

<!-- Table format (for comparison queries): -->
<table>
  <thead>
    <tr><th>Feature</th><th>Option A</th><th>Option B</th></tr>
  </thead>
  <tbody>
    <tr><td>Price</td><td>$29</td><td>$49</td></tr>
    <tr><td>Features</td><td>Basic</td><td>Advanced</td></tr>
  </tbody>
</table>`
      }
    });
  }
  
  // Conversational Tone Analysis
  const conversationalIndicators = [
    /\b(you|your|we|our|let's|here's|what's)\b/gi,
    /\b(imagine|picture this|for example|let me explain)\b/gi,
    /\?/g // Questions indicate conversational tone
  ];
  
  const conversationalMatches = conversationalIndicators.reduce((total, pattern) => {
    const matches = pageData.textContent.match(pattern) || [];
    return total + matches.length;
  }, 0);
  
  const conversationalScore = conversationalMatches / Math.max(1, pageData.wordCount / 100);
  
  if (conversationalScore < 5 && pageData.wordCount > 300) {
    issues.push({
  type: 'non-conversational-tone',
  severity: 'low',
  description: 'Content tone is not conversational - AI engines prefer natural language content',
  fix: {
    title: 'Adopt Conversational Tone for AI',
    description: 'Your content uses formal or passive language. AI engines are trained on natural human conversation, so content written the way people actually speak gets cited more often. The fix is simple: write to one person, not an audience.',
    code: `<!-- The core shift: write to "you", not "users" or "businesses" -->

<!-- INSTEAD OF formal/passive: -->
<!-- <p>Implementation of this strategy requires consideration of several factors.</p> -->

<!-- USE direct/conversational: -->
<!-- <p>Before you implement this, there are a few things worth knowing.</p> -->

<!-- Practical rewrites to apply across your content: -->

<!-- 1. Replace third person with second person -->
<!-- "Users can benefit from..." → "You can benefit from..." -->
<!-- "Businesses should consider..." → "If you're running a business, consider..." -->

<!-- 2. Turn statements into questions, then answer them -->
<h3>What does this actually mean for your site?</h3>
<p>It means [direct, plain-language answer].</p>

<!-- 3. Use contractions -->
<!-- "It is important to..." → "It's worth..." -->
<!-- "You should not..." → "Don't..." -->

<!-- 4. Lead with the point, not the context -->
<!-- "In order to achieve X, it is necessary to first Y" → "To get X, start with Y" -->

<!-- One test: read a paragraph out loud. If it sounds like a legal document, rewrite it. -->`
  }
});
  }
  
  // Voice Search Readiness
  const voiceSearchPatterns = [
    /\b(near me|close to me|nearby)\b/i,
    /\b(best|top|cheapest|most|least)\b/i,
    /\b(how to|what is|where can|when should|why does)\b/i,
    /\b(vs|versus|compared to|difference between)\b/i
  ];
  
  const voiceSearchIndicators = voiceSearchPatterns.filter(pattern => pattern.test(pageData.textContent));
  
  if (voiceSearchIndicators.length < 2 && pageData.wordCount > 400) {
    issues.push({
      type: 'limited-voice-search-optimization',
      severity: 'low',
      description: 'Content not optimized for voice search queries - missed AI search opportunity',
      fix: {
        title: 'Optimize for Voice Search Queries',
        description: 'Voice search optimization aligns with how people naturally ask AI engines questions.',
        code: `<!-- Voice search optimization examples: -->

<!-- Natural question formats: -->
<h2>What is the best way to improve SEO?</h2>
<p>The best way to improve SEO is to focus on creating high-quality, comprehensive content that directly answers your audience's questions.</p>

<!-- Local optimization: -->
<h2>SEO Services Near Me</h2>
<p>Looking for professional SEO services in [your city]? Our local team provides comprehensive SEO solutions for businesses in [area].</p>

<!-- Comparison content: -->
<h2>SEO vs PPC: Which is Better for Your Business?</h2>
<p>The choice between SEO and PPC depends on your goals: SEO provides long-term results, while PPC delivers immediate visibility.</p>

<!-- Long-tail question optimization: -->
<h2>How long does it take to see SEO results?</h2>
<p>Most businesses start seeing SEO improvements within 3-6 months, with significant results typically appearing after 6-12 months of consistent effort.</p>

<!-- Voice search patterns to target: -->
<!-- 1. Question-based queries -->
<!-- 2. Local search phrases -->
<!-- 3. Comparison queries -->
<!-- 4. Long-tail conversational phrases -->
<!-- 5. "Near me" and location-based terms -->`
      }
    });
  }
  
  // AI Citation Format Analysis
  const citationFormats = [
    /according to|based on|research shows|studies indicate/i,
    /expert|specialist|professional|authority/i,
    /\b\d+%|\$\d+|\d+\s+(years|months|times|percent)/i, // Statistics
    /in conclusion|to summarize|the key takeaway/i
  ];
  
  const citationIndicators = citationFormats.filter(pattern => pattern.test(pageData.textContent));
  
  if (citationIndicators.length < 2) {
    issues.push({
      type: 'poor-citation-format',
      severity: 'low',
      description: 'Content lacks citation-friendly formats - reduced AI reference potential',
      fix: {
        title: 'Format Content for AI Citation',
        description: 'Structure content in ways that make it easy for AI engines to extract and cite.',
        code: `<!-- Citation-friendly content formats: -->

<!-- Statistical statements: -->
<p>According to recent industry research, 73% of businesses that implement comprehensive SEO strategies see a 40% increase in organic traffic within the first year.</p>

<!-- Expert insights: -->
<p>As noted by SEO expert John Mueller from Google, "Content quality is the single most important ranking factor in modern search algorithms."</p>

<!-- Clear conclusions: -->
<p><strong>The key takeaway:</strong> Successful SEO requires a combination of technical optimization, quality content, and consistent effort over 6-12 months.</p>

<!-- Fact-based statements: -->
<p>Studies show that websites with FAQ sections are 3x more likely to appear in featured snippets and voice search results.</p>

<!-- Authoritative sources: -->
<p>Based on Google's official documentation, page loading speed directly impacts search rankings, with pages loading under 3 seconds performing significantly better.</p>

<!-- Citation optimization tips: -->
<!-- 1. Include specific statistics and data -->
<!-- 2. Reference authoritative sources -->
<!-- 3. Use clear, quotable statements -->
<!-- 4. Provide context and background -->
<!-- 5. Use confident, factual language -->`
      }
    });
  }
  
  return issues;
}
// Enhanced Meta Tags and Social Optimization for AI
async function checkEnhancedMetaAndSocial(html, baseUrl, pageData) {
  const issues = [];
  
  // Title Tag AI Optimization
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
  if (!titleMatch || !titleMatch[1]) {
    issues.push({
      type: 'missing-title-ai-critical',
      severity: 'critical',
      description: 'Missing title tag - AI engines need this for content topic identification',
      fix: {
        title: 'Add AI-Optimized Title Tag',
        description: 'Title tags are the primary signal AI engines use to understand page content and context.',
        code: `<!-- AI-optimized title examples: -->
<title>Complete Guide to [Topic]: Everything You Need to Know (2024)</title>
<title>How to [Achieve Goal]: Step-by-Step Expert Guide</title>
<title>What is [Term]? Definition, Benefits & Best Practices</title>
<title>[Topic] vs [Alternative]: Comprehensive Comparison Guide</title>

<!-- AI title optimization tips: -->
<!-- 1. Include primary keyword at the beginning -->
<!-- 2. Add context words (guide, how-to, what is) -->
<!-- 3. Include current year for freshness -->
<!-- 4. Use natural, question-answering language -->
<!-- 5. Keep under 60 characters for full display -->`
      }
    });
  } else {
    const title = titleMatch[1].trim();
    
    // AI-specific title analysis
    const aiOptimizedWords = ['guide', 'how to', 'what is', 'complete', 'ultimate', 'comprehensive', 'step-by-step', 'explained', '2024', '2025'];
    const hasAIWords = aiOptimizedWords.some(word => title.toLowerCase().includes(word));
    
    if (!hasAIWords && title.length > 20) {
  const cleanTitle = sanitizeTitle(title);
  issues.push({
    type: 'title-not-ai-optimized',
    severity: 'low',
    description: 'Title could be more AI-search friendly with intent-based keywords',
    fix: {
      title: 'Optimize Title for AI Search Intent',
      description: 'Your current title reads like a brand label. AI engines favor titles that signal topic and intent — think "Complete Guide to X" or "How to Y". Here\'s a rewritten version based on your page:',
      code: `<!-- Your current title: -->
<title>${title}</title>

<!-- Suggested rewrite (pick the pattern that fits your page): -->

<!-- If this is a guide or article: -->
<title>Complete Guide to ${cleanTitle}</title>

<!-- If this is a how-to page: -->
<title>How to Use ${cleanTitle}: Step-by-Step</title>

<!-- If this is a product or tool: -->
<title>What is ${cleanTitle}? Features, Benefits & Getting Started</title>

<!-- Rules: -->
<!-- 1. Lead with the topic, not your brand name -->
<!-- 2. Include intent words: Guide, How to, What is, Review, vs -->
<!-- 3. Keep under 60 characters total -->
<!-- 4. Add brand name at the end if needed: "... | YourBrand" -->`
    }
  });
}
  }
  
  // Meta Description AI Optimization
  const descriptionMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i);
  if (!descriptionMatch || !descriptionMatch[1]) {
    issues.push({
      type: 'missing-meta-description-ai',
      severity: 'medium',
      description: 'Missing meta description - AI engines use this for content context understanding',
      fix: {
        title: 'Add AI-Focused Meta Description',
        description: 'Meta descriptions help AI engines understand content context and improve citation accuracy.',
        code: `<!-- AI-optimized meta description formula: -->
<meta name="description" content="Learn [specific topic] with our comprehensive guide. Discover [key benefits], [actionable tips], and [expert insights]. Get [desired outcome] in [timeframe].">

<!-- Examples: -->
<meta name="description" content="Learn AI SEO optimization with our comprehensive guide. Discover proven strategies, actionable tips, and expert insights. Improve your search visibility in 30 days.">

<meta name="description" content="Complete guide to content marketing for 2024. Get step-by-step strategies, real examples, and expert tips that increase engagement by 200%.">

<meta name="description" content="What is digital marketing? Complete definition, benefits, and implementation guide. Learn proven techniques from industry experts with 15+ years experience.">

<!-- AI meta description optimization: -->
<!-- 1. Start with action words (Learn, Discover, Get) -->
<!-- 2. Include specific benefits and outcomes -->
<!-- 3. Add credibility indicators (expert, proven, comprehensive) -->
<!-- 4. Include timeframes or statistics -->
<!-- 5. Use natural question-answering language -->`
     }
   });
 } else {
   const description = descriptionMatch[1].trim();
   
   // Check for AI-friendly description elements
   const aiElements = ['learn', 'discover', 'guide', 'complete', 'step-by-step', 'expert', 'proven', 'comprehensive'];
   const hasAIElements = aiElements.some(element => description.toLowerCase().includes(element));
   
   if (!hasAIElements && description.length > 50) {
  const cleanDesc = sanitizeDescription(description);
  issues.push({
    type: 'meta-description-not-ai-optimized',
    severity: 'low',
    description: 'Meta description could be more AI-search friendly',
    fix: {
      title: 'Enhance Meta Description for AI',
      description: 'Your current description is informational but passive. AI engines favor descriptions that lead with action words and signal clear value. Here\'s how to rewrite yours:',
      code: `<!-- Your current description: -->
<meta name="description" content="${description.replace(/"/g, '&quot;')}">

<!-- Suggested rewrite: -->
<meta name="description" content="Learn ${cleanDesc} — step-by-step guide with expert tips and actionable strategies.">

<!-- Pattern used: [Action word] + [topic] + [value signal] -->
<!-- Action words that work well: Learn, Discover, Get, Find out, See how -->
<!-- Value signals: step-by-step, expert tips, proven methods, with examples -->

<!-- Keep your description: -->
<!-- - Between 120-160 characters -->
<!-- - Starting with an action word -->
<!-- - Specific about what the reader gets -->
<!-- - Free of keyword stuffing -->`
    }
   });
}
 }
 
 // Social Media Markup for AI Context
 const twitterCard = html.match(/<meta[^>]*name=["']twitter:card["'][^>]*>/i);
 const twitterTitle = html.match(/<meta[^>]*name=["']twitter:title["'][^>]*>/i);
 
 if (!twitterCard || !twitterTitle) {
   issues.push({
     type: 'incomplete-twitter-cards-ai',
     severity: 'low',
     description: 'Incomplete Twitter Cards - missed opportunity for AI content context',
     fix: {
       title: 'Complete Twitter Cards for AI Context',
       description: 'Complete social media markup provides additional context signals for AI engines.',
       code: `<!-- Complete Twitter Cards: -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${pageData.title}">
<meta name="twitter:description" content="${pageData.description}">
<meta name="twitter:image" content="${baseUrl}/twitter-image.jpg">
<meta name="twitter:site" content="@yourbusiness">
<meta name="twitter:creator" content="@author">

<!-- Benefits for AI engines: -->
<!-- 1. Additional content context -->
<!-- 2. Social signal validation -->
<!-- 3. Multi-platform content consistency -->
<!-- 4. Enhanced content discoverability -->`
     }
   });
 }
 
 return issues;
}
// Run all AI SEO analysis modules
    const structuredDataIssues = await checkStructuredDataAndSchema(html, baseUrl, pageData);
    issues.push(...structuredDataIssues);
    
    const contentQualityIssues = await checkContentQualityForAI(html, pageData);
    issues.push(...contentQualityIssues);

    const authorAttributionIssues = await checkAuthorAuthorityAndAttribution(html, pageData);
issues.push(...authorAttributionIssues);
    
    const technicalFoundationIssues = await checkTechnicalAIFoundation(html, baseUrl, response.headers);
    issues.push(...technicalFoundationIssues);
    
    const authorityTrustIssues = await checkAuthorityAndTrustSignals(html, baseUrl);
    issues.push(...authorityTrustIssues);
    
    const aiOptimizationIssues = await checkAISearchOptimization(html, pageData, baseUrl);
    issues.push(...aiOptimizationIssues);
    
    const enhancedMetaIssues = await checkEnhancedMetaAndSocial(html, baseUrl, pageData);
    issues.push(...enhancedMetaIssues);
    
    // AI SEO Summary Scoring
    const criticalCount = issues.filter(i => i.severity === 'critical').length;
    const mediumCount = issues.filter(i => i.severity === 'medium').length;
    const lowCount = issues.filter(i => i.severity === 'low').length;
    
    console.log(`🤖 AI SEO scan completed for ${baseUrl}:`, {
      totalIssues: issues.length,
      breakdown: {
        critical: criticalCount,
        medium: mediumCount,
        low: lowCount
      },
     categories: {
  structuredData: structuredDataIssues.length,
  contentQuality: contentQualityIssues.length,
  authorAttribution: authorAttributionIssues.length,  
  technical: technicalFoundationIssues.length,
  authority: authorityTrustIssues.length,
  aiOptimization: aiOptimizationIssues.length,
  enhancedMeta: enhancedMetaIssues.length
}
    });
    
    return {
      scanner: 'seo',
      status: 'completed',
      issues,
      metadata: {
        aiReadinessScore: calculateAIReadinessScore(issues),
        contentWords: pageData.wordCount,
        hasStructuredData: structuredDataIssues.length < 3,
        hasFAQContent: pageData.hasFAQ,
        citationPotential: calculateCitationPotential(issues, pageData)
      }
    };
  } catch (error) {
    console.error('AI SEO scan error:', error);
    return {
      scanner: 'seo',
      status: 'error',
      error: error.message,
      issues: []
    };
  }
}

// AI Readiness Scoring Algorithm
function calculateAIReadinessScore(issues) {
  let score = 100;
  
  // Weighted scoring based on AI SEO importance
  issues.forEach(issue => {
    switch (issue.severity) {
      case 'critical':
        score -= 15; // Heavy penalty for critical AI SEO issues
        break;
      case 'medium':
        score -= 5;  // Moderate penalty
        break;
      case 'low':
        score -= 1;  // Light penalty
        break;
    }
  });
  
  return Math.max(0, Math.min(100, score));
}

// Citation Potential Scoring
function calculateCitationPotential(issues, pageData) {
  let potential = 'High';
  
  const criticalIssues = issues.filter(i => i.severity === 'critical').length;
  const hasFAQ = pageData.hasFAQ;
  const hasGoodContent = pageData.wordCount > 500;
  const structuredDataIssues = issues.filter(i => i.type.includes('schema') || i.type.includes('json-ld')).length;
  
  if (criticalIssues > 2 || structuredDataIssues > 3) {
    potential = 'Low';
  } else if (criticalIssues > 0 || !hasFAQ || !hasGoodContent) {
    potential = 'Medium';
  }
  
  return potential;
}