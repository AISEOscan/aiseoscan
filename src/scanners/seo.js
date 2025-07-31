import axios from 'axios';
import { REQUEST_TIMEOUT } from './index';

export async function scanSEO(url) {
  try {
    // Make sure URL is properly formatted
    const parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
    const baseUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}`;
    
    console.log(`Starting comprehensive SEO scan for: ${baseUrl}`);
    
    // Fetch the main page HTML with SEO-friendly headers
    const response = await axios.get(baseUrl, {
      timeout: REQUEST_TIMEOUT,
      validateStatus: () => true,
      headers: {
        'User-Agent': 'FounderScan SEO Bot/1.0 (Mozilla/5.0 compatible; +https://founderscan.com/bot)',
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
        error: 'Unable to fetch page content',
        issues: []
      };
    }
    
    console.log(`SEO scan - Retrieved ${html.length} characters of HTML content`);
    
    // Comprehensive SEO analysis
    const metaIssues = await checkMetaTags(html, baseUrl);
    issues.push(...metaIssues);
    
    const contentIssues = await checkContentStructure(html);
    issues.push(...contentIssues);
    
    const imageIssues = await checkImages(html, baseUrl);
    issues.push(...imageIssues);
    
    const technicalIssues = await checkTechnicalSEO(html, baseUrl, response.headers);
    issues.push(...technicalIssues);
    
    const linkIssues = await checkLinks(html, baseUrl);
    issues.push(...linkIssues);
    
    const socialIssues = await checkSocialMediaOptimization(html, baseUrl);
    issues.push(...socialIssues);
    
    const performanceIssues = await checkSEOPerformance(html, response.headers);
    issues.push(...performanceIssues);
    
    const mobileSEOIssues = await checkMobileSEO(html);
    issues.push(...mobileSEOIssues);
    
    console.log(`SEO scan completed for ${baseUrl}. Found ${issues.length} issues.`);
    
    return {
      scanner: 'seo',
      status: 'completed',
      issues
    };
  } catch (error) {
    console.error('SEO scan error:', error);
    return {
      scanner: 'seo',
      status: 'error',
      error: error.message,
      issues: []
    };
  }
}

// Enhanced meta tags optimization check
async function checkMetaTags(html, baseUrl) {
  const issues = [];
  
  // Title tag analysis with comprehensive recommendations
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
  if (!titleMatch || !titleMatch[1]) {
    issues.push({
      type: 'missing-title',
      severity: 'critical',
      description: 'Missing title tag - critical for search rankings',
      fix: {
        title: 'Add Optimized Title Tag',
        description: 'Title tags are one of the most important on-page SEO factors. They should be unique, descriptive, and include your target keywords.',
        code: `<!-- Examples of optimized title tags -->
<title>Primary Keyword - Secondary Keyword | Brand Name</title>
<title>Product Name - Category - Brand (2024)</title>
<title>Service Name in City - Professional Company Name</title>

<!-- Best practices: -->
<!-- 1. Include primary keyword at the beginning -->
<!-- 2. Keep under 60 characters -->
<!-- 3. Make it compelling for click-through -->
<!-- 4. Include brand name at the end -->`
      }
    });
  } else {
    const title = titleMatch[1].trim();
    
    // More nuanced title length analysis
    if (title.length < 15) {
      issues.push({
        type: 'title-too-short',
        severity: 'medium',
        description: `Title tag is too short (${title.length} characters) - missing optimization opportunity`,
        fix: {
          title: 'Expand Title Tag for Better SEO',
          description: 'Short titles miss valuable keyword opportunities and may appear incomplete in search results.',
          code: `<!-- Current title: "${title}" -->
<!-- Improved examples: -->
<title>${title} - Professional Services & Solutions</title>
<title>${title} | Expert Guide & Reviews 2024</title>
<title>Complete Guide to ${title} - Tips & Best Practices</title>`
        }
      });
    } else if (title.length > 60) {
      issues.push({
        type: 'title-too-long',
        severity: 'medium',
        description: `Title tag may be truncated in search results (${title.length} characters)`,
        fix: {
          title: 'Optimize Title Length',
          description: 'Google typically displays 50-60 characters of title tags. Longer titles get cut off with "..."',
          code: `<!-- Current title: "${title}" -->
<!-- Optimized version (under 60 chars): -->
<title>${title.substring(0, 50).trim()}... | Brand</title>

<!-- Alternative approach - prioritize keywords: -->
<title>Key Product Name - Category | Brand</title>`
        }
      });
    }
    
    // Check for keyword optimization patterns
    const hasNumbers = /\d/.test(title);
    const hasBrand = title.toLowerCase().includes('|') || title.toLowerCase().includes('-');
    
    if (!hasNumbers && !title.toLowerCase().includes('guide') && !title.toLowerCase().includes('tips')) {
      issues.push({
        type: 'title-missing-power-words',
        severity: 'low',
        description: 'Title could be more compelling with power words or current year',
        fix: {
          title: 'Add Power Words to Title',
          description: 'Power words and current information can improve click-through rates from search results.',
          code: `<!-- Enhanced title examples: -->
<title>Ultimate ${title} Guide (2024)</title>
<title>Top 10 ${title} Tips & Tricks</title>
<title>Complete ${title} Solution - Expert Review</title>
<title>${title}: Professional Services & Support</title>`
        }
      });
    }
  }
  
  // Meta description with advanced analysis
  const descriptionMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i);
  if (!descriptionMatch || !descriptionMatch[1]) {
    issues.push({
      type: 'missing-meta-description',
      severity: 'medium',
      description: 'Missing meta description - impacts click-through rates',
      fix: {
        title: 'Add Compelling Meta Description',
        description: 'Meta descriptions are your ad copy in search results. They should entice users to click while accurately describing your content.',
        code: `<!-- Formula for effective meta descriptions -->
<meta name="description" content="Action verb + benefit + target keyword + call to action (120-160 chars)">

<!-- Examples: -->
<meta name="description" content="Discover proven SEO strategies that increase organic traffic by 300%. Get expert tips, tools, and step-by-step guides. Start ranking higher today!">

<meta name="description" content="Professional web design services in [City]. Custom websites that convert visitors into customers. Free consultation available. Call (555) 123-4567!">

<meta name="description" content="Learn JavaScript fundamentals with interactive tutorials and real projects. Perfect for beginners. Join 50,000+ students. Start coding today!">
        
<!-- Best practices: -->
<!-- 1. Include primary keyword naturally -->
<!-- 2. Add a clear value proposition -->
<!-- 3. Include a call-to-action -->
<!-- 4. Match user search intent -->
<!-- 5. Use active voice -->`
      }
    });
  } else {
    const description = descriptionMatch[1].trim();
    
    if (description.length < 120) {
      issues.push({
        type: 'meta-description-too-short',
        severity: 'low',
        description: `Meta description could be longer (${description.length}/160 characters) for better optimization`,
        fix: {
          title: 'Expand Meta Description',
          description: 'Longer descriptions (up to 160 characters) provide more space to convince users to click.',
          code: `<!-- Current: "${description}" -->
<!-- Expanded version: -->
<meta name="description" content="${description} Get expert advice, proven strategies, and step-by-step guides to achieve your goals. Start today!">

<!-- Or add specific benefits: -->
<meta name="description" content="${description} Trusted by 10,000+ customers. Free shipping, 30-day returns, and 24/7 support included.">`
        }
      });
    } else if (description.length > 160) {
      issues.push({
        type: 'meta-description-too-long',
        severity: 'low',
        description: `Meta description may be truncated (${description.length} characters)`,
        fix: {
          title: 'Optimize Meta Description Length',
          description: 'Keep meta descriptions under 160 characters to avoid truncation in search results.',
          code: `<!-- Current: "${description}" -->
<!-- Optimized version: -->
<meta name="description" content="${description.substring(0, 155).trim()}...">

<!-- Alternative - rewrite to prioritize key information: -->
<meta name="description" content="[Most important benefit]. [Key features]. [Call to action]. Get started today!">`
        }
      });
    }
    
    // Check for call-to-action and power words
    const hasCallToAction = /\b(get|start|learn|discover|find|try|buy|shop|download|call|contact|book|join|subscribe)\b/i.test(description);
    const hasBenefits = /\b(save|increase|improve|boost|reduce|optimize|enhance|maximize|achieve)\b/i.test(description);
    
    if (!hasCallToAction) {
      issues.push({
        type: 'meta-description-no-cta',
        severity: 'low',
        description: 'Meta description lacks a clear call-to-action',
        fix: {
          title: 'Add Call-to-Action to Meta Description',
          description: 'Include action words to encourage clicks from search results.',
          code: `<!-- Add compelling CTAs: -->
<meta name="description" content="${description} Get started today!">
<meta name="description" content="${description} Learn more now!">
<meta name="description" content="${description} Try it free for 30 days!">
<meta name="description" content="${description} Contact us for a free consultation!">`
        }
      });
    }
  }
  
  // Advanced meta tag checks
  const metaKeywords = html.match(/<meta[^>]*name=["']keywords["'][^>]*>/i);
  if (metaKeywords) {
    issues.push({
      type: 'meta-keywords-present',
      severity: 'low',
      description: 'Meta keywords tag detected (no longer used by search engines)',
      fix: {
        title: 'Remove Meta Keywords Tag',
        description: 'Meta keywords tags are obsolete and can potentially harm SEO. Remove them and focus on content optimization.',
        code: `<!-- Remove this tag: -->
<!-- <meta name="keywords" content="..."> -->

<!-- Instead, focus on: -->
<!-- 1. Natural keyword usage in content -->
<!-- 2. Header tags (H1, H2, H3) -->
<!-- 3. Alt text for images -->
<!-- 4. Internal link anchor text -->`
      }
    });
  }
  
  // Check for language declaration
  const htmlLangMatch = html.match(/<html[^>]*lang=["']([^"']*)["'][^>]*>/i);
  if (!htmlLangMatch) {
    issues.push({
      type: 'missing-language-declaration',
      severity: 'low',
      description: 'Missing language declaration in HTML tag',
      fix: {
        title: 'Add Language Declaration',
        description: 'Language declarations help search engines understand your content and improve accessibility.',
        code: `<!-- Add lang attribute to html tag -->
<html lang="en">  <!-- For English -->
<html lang="es">  <!-- For Spanish -->
<html lang="fr">  <!-- For French -->

<!-- For multiple languages: -->
<html lang="en">
<meta name="language" content="English">

<!-- Add hreflang for international sites: -->
<link rel="alternate" hreflang="en" href="https://example.com/">
<link rel="alternate" hreflang="es" href="https://example.com/es/">
<link rel="alternate" hreflang="fr" href="https://example.com/fr/">`
      }
    });
  }
  
  return issues;
}

// Enhanced content structure analysis
async function checkContentStructure(html) {
  const issues = [];
  
  // H1 analysis with content quality checks
  const h1Tags = html.match(/<h1[^>]*>(.*?)<\/h1>/gi) || [];
  
  if (h1Tags.length === 0) {
    issues.push({
      type: 'missing-h1',
      severity: 'critical',
      description: 'Missing H1 heading tag - critical for SEO hierarchy',
      fix: {
        title: 'Add Strategic H1 Heading',
        description: 'H1 tags signal the main topic to search engines and should include your primary keyword.',
        code: `<!-- H1 best practices: -->
<h1>Primary Keyword: Clear Value Proposition</h1>

<!-- Examples: -->
<h1>Professional Web Design Services in Chicago</h1>
<h1>Ultimate JavaScript Tutorial for Beginners</h1>
<h1>Organic SEO Strategies That Actually Work</h1>

<!-- Structure your content: -->
<h1>Main Topic</h1>
  <h2>Important Subtopic 1</h2>
    <h3>Specific Detail</h3>
  <h2>Important Subtopic 2</h2>
    <h3>Another Detail</h3>`
      }
    });
  } else if (h1Tags.length > 1) {
    issues.push({
      type: 'multiple-h1',
      severity: 'medium',
      description: `Found ${h1Tags.length} H1 tags - should have exactly one per page`,
      fix: {
        title: 'Optimize H1 Structure',
        description: 'Multiple H1s can confuse search engines about your page\'s main topic. Use one H1 and organize content with H2-H6.',
        code: `<!-- Convert to proper hierarchy: -->
<h1>Main Page Topic</h1>           <!-- Only one H1 -->
<h2>Major Section 1</h2>           <!-- Primary sections -->
  <h3>Subsection 1.1</h3>          <!-- Secondary sections -->
  <h3>Subsection 1.2</h3>
<h2>Major Section 2</h2>
  <h3>Subsection 2.1</h3>
    <h4>Detail 2.1.1</h4>          <!-- Detailed subsections -->

<!-- Good example structure: -->
<h1>Complete Guide to Email Marketing</h1>
  <h2>Getting Started with Email Marketing</h2>
    <h3>Choosing an Email Platform</h3>
    <h3>Building Your Email List</h3>
  <h2>Advanced Email Marketing Strategies</h2>
    <h3>Segmentation Techniques</h3>
    <h3>A/B Testing Your Campaigns</h3>`
      }
    });
  }
  
  // Comprehensive heading hierarchy analysis
  const headings = html.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi) || [];
  if (headings.length > 0) {
    const headingData = headings.map(h => {
      const level = parseInt(h.match(/<h([1-6])/)[1]);
      const text = h.replace(/<[^>]*>/g, '').trim();
      return { level, text, length: text.length };
    });
    
    // Check for heading hierarchy issues
    for (let i = 1; i < headingData.length; i++) {
      if (headingData[i].level - headingData[i-1].level > 1) {
        issues.push({
          type: 'heading-hierarchy-skip',
          severity: 'low',
          description: 'Heading hierarchy skips levels (affects content structure understanding)',
          fix: {
            title: 'Fix Heading Hierarchy',
            description: 'Use heading tags in logical order without skipping levels for better content structure.',
            code: `<!-- Current problematic structure: -->
<!-- <h1>Main Title</h1> -->
<!-- <h3>Skips H2!</h3>     ❌ Problems for SEO -->

<!-- Corrected structure: -->
<h1>Main Title</h1>
<h2>Major Section</h2>              <!-- Don't skip to H3 -->
  <h3>Subsection</h3>               <!-- Now H3 makes sense -->
  <h3>Another Subsection</h3>
<h2>Another Major Section</h2>
  <h3>Related Subsection</h3>

<!-- SEO benefits of proper hierarchy: -->
<!-- 1. Better content understanding by search engines -->
<!-- 2. Improved featured snippet opportunities -->
<!-- 3. Better accessibility for screen readers -->
<!-- 4. Cleaner content structure for users -->`
          }
        });
        break;
      }
    }
    
    // Check for empty or very short headings
    const shortHeadings = headingData.filter(h => h.text.length < 3);
    if (shortHeadings.length > 0) {
      issues.push({
        type: 'short-headings',
        severity: 'low',
        description: `${shortHeadings.length} headings are too short or empty`,
        fix: {
          title: 'Improve Heading Content',
          description: 'Headings should be descriptive and include relevant keywords.',
          code: `<!-- Instead of short headings: -->
<!-- <h2>FAQ</h2> -->
<!-- <h3>Tips</h3> -->

<!-- Use descriptive headings: -->
<h2>Frequently Asked Questions About Our Services</h2>
<h3>Expert Tips for Better Results</h3>
<h2>Step-by-Step Implementation Guide</h2>
<h3>Common Mistakes to Avoid</h3>`
        }
      });
    }
  }
  
  // Advanced content analysis
  const textContent = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                         .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
                         .replace(/<[^>]*>/g, ' ')
                         .replace(/\s+/g, ' ')
                         .trim();
  
  const wordCount = textContent.split(' ').filter(word => word.length > 0).length;
  const sentences = textContent.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const avgWordsPerSentence = sentences.length > 0 ? wordCount / sentences.length : 0;
  
  if (wordCount < 300) {
    issues.push({
      type: 'low-content-length',
      severity: 'medium',
      description: `Content is thin (${wordCount} words) - may struggle to rank for competitive keywords`,
      fix: {
        title: 'Expand Content for Better SEO',
        description: 'Pages with comprehensive content (300+ words) typically rank better and provide more value to users.',
        code: `<!-- Content expansion strategies: -->

<!-- 1. Add detailed explanations -->
<section>
  <h2>What is [Your Topic]?</h2>
  <p>Detailed explanation with examples...</p>
</section>

<!-- 2. Include step-by-step guides -->
<section>
  <h2>How to [Achieve Desired Outcome]</h2>
  <ol>
    <li>Step 1: Detailed instructions...</li>
    <li>Step 2: More helpful information...</li>
  </ol>
</section>

<!-- 3. Add FAQ section -->
<section>
  <h2>Frequently Asked Questions</h2>
  <h3>Question 1?</h3>
  <p>Detailed answer...</p>
</section>

<!-- 4. Include benefits and features -->
<section>
  <h2>Key Benefits</h2>
  <ul>
    <li>Benefit 1: Explanation...</li>
    <li>Benefit 2: Explanation...</li>
  </ul>
</section>

<!-- Target word count guidelines: -->
<!-- - Blog posts: 1,500-2,500 words -->
<!-- - Product pages: 300-500 words -->
<!-- - Service pages: 500-1,000 words -->
<!-- - Homepage: 300-800 words -->`
      }
    });
  }
  
  if (avgWordsPerSentence > 25) {
    issues.push({
      type: 'long-sentences',
      severity: 'low',
      description: 'Content contains long sentences that may hurt readability',
      fix: {
        title: 'Improve Content Readability',
        description: 'Shorter sentences improve user experience and may benefit SEO rankings.',
        code: `<!-- Break long sentences into shorter ones: -->

<!-- Instead of: -->
<!-- "Our comprehensive web design services include custom website development, responsive mobile optimization, search engine optimization, content management system integration, e-commerce functionality, and ongoing maintenance and support to ensure your online presence delivers maximum results for your business." -->

<!-- Use: -->
<p>Our web design services include custom website development and responsive mobile optimization. We also provide search engine optimization and content management system integration.</p>

<p>Additional services include e-commerce functionality and ongoing maintenance. This ensures your online presence delivers maximum results for your business.</p>

<!-- Readability tips: -->
<!-- 1. Average 15-20 words per sentence -->
<!-- 2. Use bullet points for lists -->
<!-- 3. Include subheadings every 200-300 words -->
<!-- 4. Use simple, clear language -->`
      }
    });
  }
  
  return issues;
}

// Enhanced image SEO analysis
async function checkImages(html, baseUrl) {
  const issues = [];
  
  const imgTags = html.match(/<img[^>]*>/gi) || [];
  
  if (imgTags.length === 0) {
    issues.push({
      type: 'no-images',
      severity: 'low',
      description: 'No images found - missing opportunity for visual search optimization',
      fix: {
        title: 'Add Optimized Images',
        description: 'Images improve user engagement and provide additional ranking opportunities through image search.',
        code: `<!-- Add relevant, optimized images: -->
<img src="optimized-image.jpg" 
     alt="Descriptive alt text with keywords" 
     title="Image title for additional context"
     loading="lazy"
     width="800" 
     height="600">

<!-- Image SEO best practices: -->
<!-- 1. Use descriptive filenames: "blue-running-shoes.jpg" not "IMG_1234.jpg" -->
<!-- 2. Optimize file sizes (WebP format recommended) -->
<!-- 3. Include relevant keywords in alt text naturally -->
<!-- 4. Use responsive images for mobile -->
<!-- 5. Add structured data for products/recipes -->`
      }
    });
    return issues;
  }
  
  let imagesWithoutAlt = 0;
  let imagesWithEmptyAlt = 0;
  let imagesWithBadFilenames = 0;
  let imagesWithoutDimensions = 0;
  
  imgTags.forEach(img => {
    // Check alt attributes
    const altMatch = img.match(/alt=["']([^"']*)["']/i);
    if (!altMatch) {
      imagesWithoutAlt++;
    } else if (!altMatch[1] || altMatch[1].trim().length === 0) {
      imagesWithEmptyAlt++;
    }
    
    // Check for dimensions
    const hasWidth = img.includes('width=');
    const hasHeight = img.includes('height=');
    if (!hasWidth || !hasHeight) {
      imagesWithoutDimensions++;
    }
    
    // Check filename quality
    const srcMatch = img.match(/src=["']([^"']*)["']/i);
    if (srcMatch && srcMatch[1]) {
      const filename = srcMatch[1].split('/').pop().toLowerCase();
      if (/^(img_|image|photo|picture|dsc_|_mg_|\d+\.)/i.test(filename)) {
        imagesWithBadFilenames++;
      }
    }
  });
  
  if (imagesWithoutAlt > 0) {
    issues.push({
      type: 'images-missing-alt',
      severity: 'medium',
      description: `${imagesWithoutAlt} images missing alt attributes (accessibility and SEO issue)`,
      fix: {
        title: 'Add Descriptive Alt Text',
        description: 'Alt text helps search engines understand images and improves accessibility for visually impaired users.',
        code: `<!-- Examples of good alt text: -->
<img src="red-sports-car.jpg" alt="Red Ferrari 488 GTB sports car on mountain road">
<img src="team-meeting.jpg" alt="Business team discussing strategy in modern conference room">
<img src="chocolate-cake.jpg" alt="Three-layer chocolate cake with vanilla frosting and berries">

<!-- Alt text best practices: -->
<!-- 1. Be descriptive but concise (125 characters max) -->
<!-- 2. Include relevant keywords naturally -->
<!-- 3. Don't start with "Image of" or "Picture of" -->
<!-- 4. For decorative images, use empty alt="" -->
<!-- 5. For complex images, provide detailed description in caption -->`
      }
    });
  }
  
  if (imagesWithBadFilenames > 0) {
    issues.push({
      type: 'images-poor-filenames',
      severity: 'low',
      description: `${imagesWithBadFilenames} images have non-descriptive filenames`,
      fix: {
        title: 'Use SEO-Friendly Image Filenames',
        description: 'Descriptive filenames help search engines understand image content and can improve image search rankings.',
        code: `<!-- Bad filenames: -->
<!-- IMG_1234.jpg -->
<!-- DSC_0567.jpg -->
<!-- image1.png -->
<!-- photo.jpeg -->

<!-- Good SEO filenames: -->
<!-- professional-web-designer-chicago.jpg -->
<!-- organic-vegetables-farmers-market.jpg -->
<!-- modern-kitchen-renovation-ideas.jpg -->
<!-- best-running-shoes-2024.jpg -->

<!-- Filename optimization tips: -->
<!-- 1. Use hyphens (-) to separate words -->
<!-- 2. Keep filenames concise but descriptive -->
<!-- 3. Include relevant keywords -->
<!-- 4. Use lowercase letters -->
<!-- 5. Avoid special characters and spaces -->`
      }
    });
  }
  
  if (imagesWithoutDimensions > 0) {
    issues.push({
      type: 'images-missing-dimensions',
      severity: 'low',
      description: `${imagesWithoutDimensions} images missing width/height attributes`,
      fix: {
        title: 'Add Image Dimensions',
        description: 'Specifying image dimensions prevents layout shift and improves Core Web Vitals scores.',
        code: `<!-- Add width and height attributes: -->
<img src="hero-image.jpg" 
     alt="Professional web design services" 
     width="1200" 
     height="600"
     loading="lazy">

<!-- For responsive images: -->
<img src="responsive-image.jpg" 
     alt="Description" 
     width="800" 
     height="400"
     style="max-width: 100%; height: auto;"
     loading="lazy">

<!-- Using picture element for multiple formats: -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="Description" width="800" height="400">
</picture>`
      }
    });
  }
  
  return issues;
}

// Enhanced technical SEO checks
async function checkTechnicalSEO(html, baseUrl, responseHeaders) {
  const issues = [];
  
  // Canonical URL analysis
  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*>/i);
  if (!canonicalMatch) {
    issues.push({
      type: 'missing-canonical',
      severity: 'medium',
      description: 'Missing canonical URL tag (important for duplicate content prevention)',
      fix: {
        title: 'Add Canonical Tag',
        description: 'Canonical tags prevent duplicate content issues and consolidate page authority.',
        code: `<!-- Add to <head> section: -->
<link rel="canonical" href="${baseUrl}">

<!-- For paginated content: -->
<link rel="canonical" href="${baseUrl}/category/page-1">

<!-- For product variants: -->
<link rel="canonical" href="${baseUrl}/product/main-version">

<!-- Self-referencing canonical (recommended): -->
<link rel="canonical" href="${baseUrl}/current-page">

<!-- Why canonical tags matter: -->
<!-- 1. Prevent duplicate content penalties -->
<!-- 2. Consolidate link equity -->
<!-- 3. Control which version appears in search results -->
<!-- 4. Essential for e-commerce and paginated content -->`
      }
    });
  } else {
    const canonicalUrl = canonicalMatch[1];
    if (!canonicalUrl.startsWith('http')) {
      issues.push({
        type: 'invalid-canonical',
        severity: 'medium',
        description: 'Canonical URL should be absolute, not relative',
        fix: {
          title: 'Fix Canonical URL Format',
          description: 'Canonical URLs must be absolute (include protocol and domain) to work properly.',
          code: `<!-- Current (incorrect): -->
<!-- <link rel="canonical" href="/page"> -->

<!-- Correct format: -->
<link rel="canonical" href="${baseUrl}/page">

<!-- Always use absolute URLs for canonical tags -->`
        }
      });
    }
  }
  
  // Schema markup comprehensive analysis
  const hasJsonLd = html.includes('application/ld+json');
  const hasMicrodata = html.includes('itemscope') || html.includes('itemtype');
  const hasRDFa = html.includes('property=') && html.includes('typeof=');
  
  if (!hasJsonLd && !hasMicrodata && !hasRDFa) {
    issues.push({
      type: 'missing-schema-markup',
      severity: 'medium',
      description: 'No structured data detected - missing rich snippet opportunities',
      fix: {
        title: 'Add Schema Markup for Rich Snippets',
        description: 'Structured data helps search engines understand your content and can result in rich snippets, increasing click-through rates.',
        code: `<!-- Business/Organization Schema: -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Your Business Name",
  "url": "${baseUrl}",
  "logo": "${baseUrl}/logo.jpg",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-555-123-4567",
    "contactType": "Customer Service"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "City",
    "addressRegion": "State",
    "postalCode": "12345",
    "addressCountry": "US"
  }
}
</script>

<!-- Article/Blog Post Schema: -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Your Article Title",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  },
  "datePublished": "2024-01-15",
  "dateModified": "2024-01-20",
  "image": "${baseUrl}/article-image.jpg",
  "publisher": {
    "@type": "Organization",
    "name": "Your Site Name",
    "logo": "${baseUrl}/logo.jpg"
  }
}
</script>

<!-- Product Schema (for e-commerce): -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Product Name",
  "image": "${baseUrl}/product-image.jpg",
  "description": "Product description",
  "brand": "Brand Name",
  "offers": {
    "@type": "Offer",
    "price": "29.99",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  }
}
</script>

<!-- Local Business Schema: -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Business Name",
  "telephone": "+1-555-123-4567",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Business St",
    "addressLocality": "City",
    "addressRegion": "State",
    "postalCode": "12345"
  },
  "openingHours": "Mo-Fr 09:00-17:00",
  "priceRange": "$"
}
</script>`
      }
    });
  }
  
  // Robots meta tag analysis
  const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["'][^>]*>/i);
  if (robotsMatch && robotsMatch[1]) {
    const robotsContent = robotsMatch[1].toLowerCase();
    if (robotsContent.includes('noindex')) {
      issues.push({
        type: 'robots-noindex',
        severity: 'critical',
        description: 'Page is set to noindex - will not appear in search results',
        fix: {
          title: 'Review Noindex Directive',
          description: 'Remove noindex if you want this page to appear in search results, or confirm it\'s intentional.',
          code: `<!-- Current setting (blocking search engines): -->
<!-- <meta name="robots" content="noindex, nofollow"> -->

<!-- For pages you want indexed: -->
<meta name="robots" content="index, follow">

<!-- Or simply remove the robots meta tag for default behavior -->

<!-- Use noindex only for: -->
<!-- - Admin/login pages -->
<!-- - Thank you/confirmation pages -->
<!-- - Duplicate content pages -->
<!-- - Private/internal pages -->

<!-- Alternative: Use robots.txt for site-wide blocking -->
User-agent: *
Disallow: /admin/
Disallow: /private/`
        }
      });
    }
    
    if (robotsContent.includes('nofollow')) {
      issues.push({
        type: 'robots-nofollow',
        severity: 'medium',
        description: 'Page is set to nofollow - search engines won\'t follow links',
        fix: {
          title: 'Review Nofollow Directive',
          description: 'Nofollow prevents search engines from following links on this page, which may limit SEO benefits.',
          code: `<!-- Current: -->
<!-- <meta name="robots" content="index, nofollow"> -->

<!-- Recommended for most pages: -->
<meta name="robots" content="index, follow">

<!-- Use nofollow sparingly, only for: -->
<!-- - Pages with many external/untrusted links -->
<!-- - Comment sections -->
<!-- - User-generated content pages -->`
        }
      });
    }
  }
  
  // Check for sitemap
  try {
    const sitemapResponse = await axios.get(`${baseUrl}/sitemap.xml`, {
      timeout: REQUEST_TIMEOUT / 2,
      validateStatus: () => true
    });
    
    if (sitemapResponse.status === 404) {
      issues.push({
        type: 'missing-sitemap',
        severity: 'medium',
        description: 'XML sitemap not found at /sitemap.xml',
        fix: {
          title: 'Create XML Sitemap',
          description: 'XML sitemaps help search engines discover and index your pages more efficiently.',
          code: `<!-- Basic sitemap.xml structure: -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>2024-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>2024-01-10</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>

<!-- Add to robots.txt: -->
Sitemap: ${baseUrl}/sitemap.xml

<!-- For WordPress: Use Yoast SEO or RankMath plugins -->
<!-- For other CMS: Check available sitemap plugins -->
<!-- For custom sites: Use sitemap generators or create programmatically -->`
        }
      });
    }
  } catch (error) {
    // Sitemap check failed, skip
  }
  
  // Check robots.txt
  try {
    const robotsResponse = await axios.get(`${baseUrl}/robots.txt`, {
      timeout: REQUEST_TIMEOUT / 2,
      validateStatus: () => true
    });
    
    if (robotsResponse.status === 404) {
      issues.push({
        type: 'missing-robots-txt',
        severity: 'low',
        description: 'robots.txt file not found',
        fix: {
          title: 'Create robots.txt File',
          description: 'A robots.txt file helps search engines understand which pages to crawl and provides sitemap location.',
          code: `# Basic robots.txt file:
User-agent: *
Allow: /

# Block sensitive areas:
Disallow: /admin/
Disallow: /private/
Disallow: /wp-admin/
Disallow: /wp-includes/

# Allow important directories:
Allow: /wp-content/uploads/
Allow: /wp-content/themes/

# Specify sitemap location:
Sitemap: ${baseUrl}/sitemap.xml

# For e-commerce sites:
Disallow: /cart/
Disallow: /checkout/
Disallow: /account/
Allow: /products/

# Block search result pages:
Disallow: /*?s=
Disallow: /search/`
        }
      });
    } else if (robotsResponse.status === 200) {
      const robotsTxt = robotsResponse.data;
      if (!robotsTxt.includes('Sitemap:')) {
        issues.push({
          type: 'robots-txt-missing-sitemap',
          severity: 'low',
          description: 'robots.txt exists but doesn\'t specify sitemap location',
          fix: {
            title: 'Add Sitemap to robots.txt',
            description: 'Include your sitemap location in robots.txt to help search engines find it.',
            code: `# Add this line to your robots.txt:
Sitemap: ${baseUrl}/sitemap.xml

# If you have multiple sitemaps:
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemap-images.xml
Sitemap: ${baseUrl}/sitemap-news.xml`
          }
        });
      }
    }
  } catch (error) {
    // robots.txt check failed, skip
  }
  
  // Check for Google Analytics/tracking
  const hasGA = html.includes('google-analytics') || 
                html.includes('gtag') || 
                html.includes('ga(') ||
                html.includes('GoogleAnalytics');
  
  if (!hasGA) {
    issues.push({
      type: 'missing-analytics',
      severity: 'low',
      description: 'No Google Analytics or tracking code detected',
      fix: {
        title: 'Add Analytics Tracking',
        description: 'Web analytics help you understand user behavior and measure SEO success.',
        code: `<!-- Google Analytics 4 (GA4) - Recommended: -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>

<!-- Google Tag Manager (GTM) - More flexible: -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>

<!-- Alternative analytics platforms: -->
<!-- - Adobe Analytics -->
<!-- - Matomo (privacy-focused) -->
<!-- - Plausible Analytics -->
<!-- - Fathom Analytics -->`
      }
    });
  }
  
  return issues;
}

// Social media optimization analysis
async function checkSocialMediaOptimization(html, baseUrl) {
  const issues = [];
  
  // Open Graph tags analysis
  const ogTitle = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["'][^>]*>/i);
  const ogDescription = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["'][^>]*>/i);
  const ogImage = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["'][^>]*>/i);
  const ogUrl = html.match(/<meta[^>]*property=["']og:url["'][^>]*content=["']([^"']*)["'][^>]*>/i);
  
  if (!ogTitle || !ogDescription || !ogImage) {
    issues.push({
      type: 'incomplete-open-graph',
      severity: 'low',
      description: 'Incomplete Open Graph tags for social media sharing',
      fix: {
        title: 'Add Complete Open Graph Tags',
        description: 'Open Graph tags control how your content appears when shared on social media platforms.',
        code: `<!-- Essential Open Graph tags: -->
<meta property="og:type" content="website">
<meta property="og:title" content="Your Page Title">
<meta property="og:description" content="Compelling description for social sharing">
<meta property="og:image" content="${baseUrl}/social-share-image.jpg">
<meta property="og:url" content="${baseUrl}">
<meta property="og:site_name" content="Your Site Name">

<!-- Additional recommended tags: -->
<meta property="og:locale" content="en_US">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Description of your image">

<!-- For articles/blog posts: -->
<meta property="article:author" content="Author Name">
<meta property="article:published_time" content="2024-01-15T10:00:00Z">
<meta property="article:modified_time" content="2024-01-20T14:30:00Z">

<!-- Image guidelines: -->
<!-- - Minimum size: 1200x630 pixels -->
<!-- - Aspect ratio: 1.91:1 -->
<!-- - File format: JPG or PNG -->
<!-- - File size: Under 1MB -->`
      }
    });
  }
  
  // Twitter Card tags
  const twitterCard = html.match(/<meta[^>]*name=["']twitter:card["'][^>]*>/i);
  const twitterTitle = html.match(/<meta[^>]*name=["']twitter:title["'][^>]*>/i);
  const twitterDescription = html.match(/<meta[^>]*name=["']twitter:description["'][^>]*>/i);
  
  if (!twitterCard || !twitterTitle || !twitterDescription) {
    issues.push({
      type: 'incomplete-twitter-cards',
      severity: 'low',
      description: 'Incomplete Twitter Card tags for better Twitter sharing',
      fix: {
        title: 'Add Twitter Card Tags',
        description: 'Twitter Cards enhance how your content appears when shared on Twitter.',
        code: `<!-- Twitter Card tags: -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Your Page Title">
<meta name="twitter:description" content="Description for Twitter sharing">
<meta name="twitter:image" content="${baseUrl}/twitter-image.jpg">
<meta name="twitter:site" content="@yourtwitterhandle">
<meta name="twitter:creator" content="@authorhandle">

<!-- Card types: -->
<!-- summary: Default card with image, title, description -->
<!-- summary_large_image: Large image card (recommended) -->
<!-- app: For mobile app promotion -->
<!-- player: For audio/video content -->

<!-- Image guidelines for Twitter: -->
<!-- - Large image: 1200x628 pixels -->
<!-- - Summary: 120x120 pixels (minimum) -->
<!-- - File formats: JPG, PNG, WebP, GIF -->
<!-- - File size: Under 1MB -->`
      }
    });
  }
  
  return issues;
}

// SEO performance factors
async function checkSEOPerformance(html, responseHeaders) {
  const issues = [];
  
  // Check for compression
  const contentEncoding = responseHeaders['content-encoding'];
  if (!contentEncoding || !contentEncoding.includes('gzip')) {
    issues.push({
      type: 'missing-compression',
      severity: 'medium',
      description: 'Content not compressed (affects page speed and SEO)',
      fix: {
        title: 'Enable GZIP Compression',
        description: 'Compression reduces file sizes and improves page loading speed, which is a ranking factor.',
        code: `<!-- Apache (.htaccess): -->
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE application/xhtml+xml
  AddOutputFilterByType DEFLATE application/rss+xml
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

<!-- Nginx: -->
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

<!-- Benefits of compression: -->
<!-- - 60-80% size reduction -->
<!-- - Faster page load times -->
<!-- - Better Core Web Vitals scores -->
<!-- - Improved user experience -->`
      }
    });
  }
  
  // Check for caching headers
  const cacheControl = responseHeaders['cache-control'];
  const expires = responseHeaders['expires'];
  const etag = responseHeaders['etag'];
  
  if (!cacheControl && !expires && !etag) {
    issues.push({
      type: 'missing-cache-headers',
      severity: 'low',
      description: 'No caching headers detected (affects repeat visit performance)',
      fix: {
        title: 'Add Browser Caching Headers',
        description: 'Caching headers improve page load speed for returning visitors and reduce server load.',
        code: `<!-- Apache (.htaccess): -->
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType image/png "access plus 1 month"
  ExpiresByType image/jpg "access plus 1 month"
  ExpiresByType image/jpeg "access plus 1 month"
  ExpiresByType image/gif "access plus 1 month"
  ExpiresByType image/svg+xml "access plus 1 month"
</IfModule>

<!-- Nginx: -->
location ~* \\.(css|js|png|jpg|jpeg|gif|svg|woff|woff2)$ {
  expires 1M;
  add_header Cache-Control "public, immutable";
}

<!-- Cache-Control examples: -->
<!-- Static assets: Cache-Control: public, max-age=31536000 -->
<!-- HTML pages: Cache-Control: public, max-age=3600 -->
<!-- Dynamic content: Cache-Control: private, max-age=0 -->`
      }
    });
  }
  
  return issues;
}

// Mobile SEO optimization
async function checkMobileSEO(html) {
  const issues = [];
  
  // Viewport meta tag (critical for mobile)
  const viewportMatch = html.match(/<meta[^>]*name=["']viewport["'][^>]*content=["']([^"']*)["'][^>]*>/i);
  if (!viewportMatch) {
    issues.push({
      type: 'missing-viewport',
      severity: 'critical',
      description: 'Missing viewport meta tag - essential for mobile SEO',
      fix: {
        title: 'Add Viewport Meta Tag',
        description: 'The viewport meta tag is essential for mobile-first indexing and responsive design.',
        code: `<!-- Essential viewport tag: -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Advanced viewport options: -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">

<!-- For PWAs: -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">

<!-- What each parameter does: -->
<!-- width=device-width: Match device width -->
<!-- initial-scale=1.0: No initial zoom -->
<!-- maximum-scale=5.0: Allow zoom up to 5x -->
<!-- user-scalable=yes: Allow pinch-to-zoom -->
<!-- viewport-fit=cover: Handle iPhone notch -->`
      }
    });
  } else {
    const viewportContent = viewportMatch[1];
    if (!viewportContent.includes('width=device-width')) {
      issues.push({
        type: 'viewport-not-responsive',
        severity: 'medium',
        description: 'Viewport tag doesn\'t include width=device-width',
        fix: {
          title: 'Fix Viewport Configuration',
          description: 'Ensure viewport tag includes width=device-width for proper mobile rendering.',
          code: `<!-- Current: -->
<!-- <meta name="viewport" content="${viewportContent}"> -->

<!-- Recommended: -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">`
        }
      });
    }
  }
  
  // Check for mobile-specific improvements
  const hasAMP = html.includes('⚡') || html.includes('amp-') || html.includes('amp.js');
  const hasPWA = html.includes('manifest.json') || html.includes('service-worker') || html.includes('sw.js');
  
  if (!hasAMP && !hasPWA) {
    issues.push({
      type: 'missing-mobile-optimization',
      severity: 'low',
      description: 'Consider implementing AMP or PWA for enhanced mobile performance',
      fix: {
        title: 'Consider Mobile Performance Enhancements',
        description: 'AMP or PWA can significantly improve mobile performance and user experience.',
        code: `<!-- Progressive Web App (PWA) setup: -->
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#000000">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">

<!-- manifest.json example: -->
{
  "name": "Your App Name",
  "short_name": "App",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}

<!-- Service Worker for offline functionality: -->
<script>
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
</script>

<!-- AMP alternative (for content sites): -->
<!-- Add AMP version: -->
<link rel="amphtml" href="/amp/page.html">

<!-- Mobile performance tips: -->
<!-- 1. Optimize images for mobile -->
<!-- 2. Use lazy loading -->
<!-- 3. Minimize JavaScript -->
<!-- 4. Implement critical CSS -->
<!-- 5. Use CDN for static assets -->`
      }
    });
  }
  
  return issues;
}

// Enhanced link analysis
async function checkLinks(html, baseUrl) {
  const issues = [];
  
  const linkTags = html.match(/<a[^>]*href=["']([^"']*)["'][^>]*>/gi) || [];
  
  if (linkTags.length === 0) {
    issues.push({
      type: 'no-links',
      severity: 'medium',
      description: 'No links found - missing internal linking opportunities',
      fix: {
        title: 'Add Strategic Internal Links',
        description: 'Internal links help search engines discover content and distribute page authority throughout your site.',
        code: `<!-- Strategic internal linking examples: -->

<!-- Link to related content: -->
<p>Learn more about <a href="/related-topic">related topic</a> in our comprehensive guide.</p>

<!-- Link to important pages: -->
<nav>
  <a href="/services">Our Services</a>
  <a href="/about">About Us</a>
  <a href="/contact">Contact</a>
</nav>

<!-- Contextual internal links: -->
<p>Our <a href="/web-design-services">web design services</a> include responsive layouts and SEO optimization.</p>

<!-- Link to category pages: -->
<a href="/blog/seo-tips">SEO Tips Category</a>
<a href="/products/web-hosting">Web Hosting Products</a>

<!-- Best practices: -->
<!-- 1. Use descriptive anchor text -->
<!-- 2. Link to relevant, helpful content -->
<!-- 3. Don't over-optimize anchor text -->
<!-- 4. Create topic clusters -->
<!-- 5. Link to both new and old content -->`
      }
    });
    return issues;
  }
  
  let internalLinks = 0;
  let externalLinks = 0;
  let externalLinksWithoutNofollow = 0;
  let emptyAnchorText = 0;
  let genericAnchorText = 0;
  
  const parsedBaseUrl = new URL(baseUrl);
  
  linkTags.forEach(link => {
    const hrefMatch = link.match(/href=["']([^"']*)["']/i);
    if (!hrefMatch || !hrefMatch[1]) return;
    
    const href = hrefMatch[1];
    
    // Skip mailto, tel, and fragment links
    if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
      return;
    }
    
    // Extract anchor text
    const anchorMatch = link.match(/>([^<]*)</);
    const anchorText = anchorMatch ? anchorMatch[1].trim().toLowerCase() : '';
    
    // Check anchor text quality
    if (!anchorText || anchorText.length === 0) {
      emptyAnchorText++;
    } else if (['click here', 'read more', 'more', 'here', 'link', 'this'].includes(anchorText)) {
      genericAnchorText++;
    }
    
    // Determine if internal or external
    try {
      if (href.startsWith('/') || href.includes(parsedBaseUrl.hostname)) {
        internalLinks++;
      } else if (href.startsWith('http')) {
        externalLinks++;
        
        // Check for nofollow
        if (!link.includes('rel=') || !link.includes('nofollow')) {
          externalLinksWithoutNofollow++;
        }
      }
    } catch (error) {
      // Skip malformed URLs
    }
  });
  
  if (internalLinks < 3) {
    issues.push({
      type: 'insufficient-internal-links',
      severity: 'medium',
      description: `Only ${internalLinks} internal links found - add more for better SEO`,
      fix: {
        title: 'Increase Internal Linking',
        description: 'Internal links help search engines understand your site structure and distribute page authority.',
        code: `<!-- Add contextual internal links: -->
<p>Our <a href="/services/web-development">web development services</a> include modern frameworks and responsive design.</p>

<!-- Create related content sections: -->
<aside>
  <h3>Related Articles</h3>
  <ul>
    <li><a href="/blog/seo-basics">SEO Basics for Beginners</a></li>
    <li><a href="/blog/content-strategy">Content Strategy Guide</a></li>
    <li><a href="/blog/technical-seo">Technical SEO Checklist</a></li>
  </ul>
</aside>

<!-- Link to category/tag pages: -->
<p>Filed under: <a href="/category/digital-marketing">Digital Marketing</a></p>

<!-- Internal linking strategy: -->
<!-- 1. Link from high-authority pages to new content -->
<!-- 2. Create topic clusters around main keywords -->
<!-- 3. Use varied, descriptive anchor text -->
<!-- 4. Link to both related and authoritative pages -->
<!-- 5. Update old content with links to new content -->`
      }
    });
  }
  
  if (genericAnchorText > 0) {
    issues.push({
      type: 'generic-anchor-text',
      severity: 'low',
      description: `${genericAnchorText} links use generic anchor text ('click here', 'read more', etc.)`,
      fix: {
        title: 'Improve Anchor Text',
        description: 'Descriptive anchor text helps search engines understand the linked content and improves user experience.',
        code: `<!-- Bad anchor text examples: -->
<!-- <a href="/services">Click here</a> -->
<!-- <a href="/blog/seo-tips">Read more</a> -->
<!-- <a href="/contact">This page</a> -->

<!-- Good anchor text examples: -->
<a href="/services">Professional web design services</a>
<a href="/blog/seo-tips">Advanced SEO tips for 2024</a>
<a href="/contact">Contact our expert team</a>

<!-- Anchor text best practices: -->
<!-- 1. Be descriptive and specific -->
<!-- 2. Include relevant keywords naturally -->
<!-- 3. Match user expectations -->
<!-- 4. Keep it concise (2-5 words typically) -->
<!-- 5. Avoid over-optimization -->`
      }
    });
  }
  
  return issues;
}