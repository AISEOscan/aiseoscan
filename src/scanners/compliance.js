import axios from 'axios';
import { REQUEST_TIMEOUT } from './index';

// AI Trust Signal Categories - What AI engines look for to establish credibility
const AI_TRUST_CATEGORIES = {
  EXPERTISE: {
    INDICATORS: ['expert', 'certified', 'professional', 'specialist', 'years experience', 'phd', 'md', 'certified'],
    WEIGHT: 25
  },
  AUTHORITATIVENESS: {
    INDICATORS: ['published', 'author', 'researcher', 'award', 'recognition', 'featured in', 'quoted by'],
    WEIGHT: 25
  },
  TRUSTWORTHINESS: {
    INDICATORS: ['about us', 'contact', 'privacy policy', 'terms', 'testimonials', 'reviews', 'verified'],
    WEIGHT: 30
  },
  TRANSPARENCY: {
    INDICATORS: ['disclosure', 'methodology', 'sources', 'references', 'citations', 'updated', 'published date'],
    WEIGHT: 20
  }
};

// Professional credentials that AI engines recognize
const PROFESSIONAL_CREDENTIALS = [
  // Education
  'phd', 'ph.d', 'doctorate', 'md', 'mba', 'masters', 'bachelor',
  // Certifications
  'certified', 'certification', 'licensed', 'accredited', 'chartered',
  // Professional titles
  'professor', 'director', 'manager', 'specialist', 'expert', 'consultant',
  // Industry recognition
  'award', 'winner', 'recognized', 'featured', 'published author'
];

// Authority signals that indicate content expertise
const AUTHORITY_SIGNALS = [
  'years of experience', 'decade of experience', 'founded', 'established',
  'industry leader', 'thought leader', 'keynote speaker', 'published research',
  'peer reviewed', 'cited by', 'quoted in', 'interviewed by',
  'featured in forbes', 'featured in harvard', 'featured in wsj'
];

// Main AI Trust Signals scanning function
export async function scanCompliance(url) {
  try {
    const parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
    const baseUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}`;
    
    console.log(`🛡️ Starting AI Trust Signals scan for: ${baseUrl}`);
    
    const response = await axios.get(baseUrl, {
      timeout: REQUEST_TIMEOUT,
      validateStatus: () => true,
      headers: {
        'User-Agent': 'AISEOScan Trust Analysis Bot/1.0 (+https://aiseoscan.dev/bot)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Cache-Control': 'no-cache'
      }
    });
    
    const html = typeof response.data === 'string' ? response.data : '';
    const issues = [];
    
    // Enhanced logging for debugging
    console.log(`🛡️ AI Trust scan - Response status: ${response.status}`);
    console.log(`🛡️ AI Trust scan - Content length: ${html.length} characters`);
    console.log(`🛡️ AI Trust scan - Content type: ${response.headers['content-type'] || 'unknown'}`);
    
    if (!html || html.length < 100) {
      console.log('🛡️ AI Trust scan - Insufficient HTML content received');
      return {
        scanner: 'compliance',
        status: 'error',
        error: 'Unable to fetch sufficient page content for trust analysis',
        issues: []
      };
    }
    
    // Extract page data for comprehensive analysis
    const pageData = extractTrustSignalData(html, baseUrl);
    
    console.log(`🛡️ AI Trust scan - Analyzing ${pageData.textContent.length} characters of text content`);
    console.log(`🛡️ AI Trust scan - Found ${pageData.links.length} links, ${pageData.images.length} images`);
    // Extract comprehensive data needed for AI trust signal analysis
function extractTrustSignalData(html, baseUrl) {
  // Clean text content extraction
  const textContent = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Extract title and meta description
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';
  
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i);
  const description = descMatch ? descMatch[1].trim() : '';
  
  // Extract all links for analysis
  const linkMatches = html.match(/<a[^>]*href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gi) || [];
  const links = linkMatches.map(link => {
    const hrefMatch = link.match(/href=["']([^"']*)["']/i);
    const textMatch = link.replace(/<[^>]*>/g, '').trim();
    return {
      href: hrefMatch ? hrefMatch[1] : '',
      text: textMatch,
      isInternal: hrefMatch && hrefMatch[1].startsWith('/'),
      isExternal: hrefMatch && (hrefMatch[1].startsWith('http') && !hrefMatch[1].includes(baseUrl))
    };
  });
  
  // Extract images for alt text analysis
  const imageMatches = html.match(/<img[^>]*>/gi) || [];
  const images = imageMatches.map(img => {
    const srcMatch = img.match(/src=["']([^"']*)["']/i);
    const altMatch = img.match(/alt=["']([^"']*)["']/i);
    return {
      src: srcMatch ? srcMatch[1] : '',
      alt: altMatch ? altMatch[1] : '',
      hasAlt: altMatch && altMatch[1].length > 0
    };
  });
  
  // Extract structured data
  const jsonLdMatches = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gis) || [];
  const structuredData = jsonLdMatches.map(match => {
    try {
      const jsonContent = match.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '');
      return JSON.parse(jsonContent);
    } catch (e) {
      return null;
    }
  }).filter(data => data !== null);
  
  // Extract author information patterns
  const authorPatterns = [
    /(?:by|author|written by|created by)[:\s]+([^<\n,.]{3,50})/gi,
    /<[^>]*class[^>]*author[^>]*>([^<]+)/gi,
    /<[^>]*itemprop=["']author["'][^>]*>([^<]+)/gi
  ];
  
  const authorMatches = [];
  authorPatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(html)) !== null) {
      authorMatches.push(match[1].trim());
    }
  });
  
  // Extract date information
  const datePatterns = [
    /(?:published|updated|modified|created)[:\s]*([^<\n]{8,30})/gi,
    /<time[^>]*datetime=["']([^"']*)["'][^>]*>([^<]*)<\/time>/gi,
    /\b(january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{1,2},?\s+\d{4}/gi
  ];
  
  const dateMatches = [];
  datePatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(html)) !== null) {
      dateMatches.push(match[1] || match[2] || match[0]);
    }
  });
  
  // Calculate content metrics
  const words = textContent.split(/\s+/).filter(word => word.length > 0);
  const sentences = textContent.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  return {
    title,
    description,
    textContent,
    links,
    images,
    structuredData,
    authorMatches,
    dateMatches,
    wordCount: words.length,
    sentenceCount: sentences.length,
    html
  };
}
// 1. AUTHOR AUTHORITY & EXPERTISE ANALYSIS (30%)
    const authorityIssues = await checkAuthorAuthorityAndExpertise(html, pageData, baseUrl);
    issues.push(...authorityIssues);
    
    // 2. BUSINESS CREDIBILITY & TRANSPARENCY (25%)
    const credibilityIssues = await checkBusinessCredibilityAndTransparency(html, pageData, baseUrl);
    issues.push(...credibilityIssues);
    
    // 3. CONTENT AUTHENTICITY & SOURCING (20%)
    const authenticityIssues = await checkContentAuthenticityAndSourcing(html, pageData, baseUrl);
    issues.push(...authenticityIssues);
    
    // 4. PROFESSIONAL CREDENTIALS & CERTIFICATIONS (15%)
    const credentialsIssues = await checkProfessionalCredentialsAndCertifications(html, pageData);
    issues.push(...credentialsIssues);
    
    // 5. SOCIAL PROOF & EXTERNAL VALIDATION (10%)
    const socialProofIssues = await checkSocialProofAndExternalValidation(html, pageData, baseUrl);
    issues.push(...socialProofIssues);
    
    // Calculate comprehensive trust score
   
const trustScore = calculateComplianceScore(issues);
    
    console.log(`🛡️ AI Trust Signals scan completed for ${baseUrl}:`, {
      totalIssues: issues.length,
      trustScore: trustScore,
      breakdown: {
        critical: issues.filter(i => i.severity === 'critical').length,
        medium: issues.filter(i => i.severity === 'medium').length,
        low: issues.filter(i => i.severity === 'low').length
      },
      categories: {
        authority: authorityIssues.length,
        credibility: credibilityIssues.length,
        authenticity: authenticityIssues.length,
        credentials: credentialsIssues.length,
        socialProof: socialProofIssues.length
      }
    });
    
    return {
      scanner: 'compliance',
      status: 'completed',
      issues,
      metadata: {
         complianceScore: trustScore,
        trustScore: trustScore,
        authorityLevel: assessAuthorityLevel(pageData, issues),
        credibilityRating: assessCredibilityRating(issues),
        aiTrustGrade: getAITrustGrade(trustScore)
      }
    };
  } catch (error) {
    console.error('🛡️ AI Trust Signals scan error:', error);
    return {
      scanner: 'compliance',
      status: 'error',
      error: error.message,
      issues: []
    };
  }
}

// 1. AUTHOR AUTHORITY & EXPERTISE ANALYSIS
async function checkAuthorAuthorityAndExpertise(html, pageData, baseUrl) {
  const issues = [];
  
  // Check for clear author attribution
  if (pageData.authorMatches.length === 0) {
    issues.push({
      type: 'missing-author-attribution',
      severity: 'critical',
      description: 'No clear author attribution found - AI engines need to identify content creators for credibility assessment',
      fix: {
        title: 'Add Clear Author Attribution',
        description: 'Author attribution is crucial for AI engines to assess content credibility and expertise. Clear authorship helps establish E-A-T (Expertise, Authoritativeness, Trustworthiness).',
        code: `<!-- Clear author attribution examples: -->

<!-- Simple author byline -->
<div class="author-byline">
  <p>By <span class="author-name" itemprop="author">Dr. Sarah Johnson</span></p>
  <p class="author-credentials">Certified SEO Specialist with 15+ years experience</p>
</div>

<!-- Enhanced author section -->
<section class="author-info">
  <div class="author-details">
    <img src="/authors/sarah-johnson.jpg" alt="Dr. Sarah Johnson" class="author-photo">
    <div class="author-text">
      <h3 class="author-name">Dr. Sarah Johnson</h3>
      <p class="author-title">Senior SEO Strategist & Digital Marketing Expert</p>
      <p class="author-credentials">PhD in Information Science, Google Certified, 15+ years industry experience</p>
      <div class="author-links">
        <a href="/author/sarah-johnson">View Profile</a>
        <a href="https://linkedin.com/in/sarahjohnson">LinkedIn</a>
        <a href="https://twitter.com/sarahjohnsonseo">Twitter</a>
      </div>
    </div>
  </div>
</section>

<!-- Schema markup for author -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Dr. Sarah Johnson",
  "jobTitle": "Senior SEO Strategist",
  "worksFor": {
    "@type": "Organization",
    "name": "Your Company Name"
  },
  "url": "${baseUrl}/author/sarah-johnson",
  "sameAs": [
    "https://linkedin.com/in/sarahjohnson",
    "https://twitter.com/sarahjohnsonseo"
  ],
  "knowsAbout": ["SEO", "Digital Marketing", "Content Strategy"],
  "alumniOf": "University Name",
  "hasCredential": "PhD in Information Science"
}
</script>

<!-- Article with author markup -->
<article itemscope itemtype="https://schema.org/Article">
  <h1 itemprop="headline">Article Title</h1>
  <div itemprop="author" itemscope itemtype="https://schema.org/Person">
    <span itemprop="name">Dr. Sarah Johnson</span>
  </div>
  <time itemprop="datePublished" datetime="2024-01-15">January 15, 2024</time>
  <div itemprop="articleBody">
    <!-- Article content -->
  </div>
</article>`
      }
    });
  } else {
    // Analyze quality of existing author attribution
    const authorText = pageData.authorMatches.join(' ').toLowerCase();
    
    // Check for professional credentials in author attribution
    const hasCredentials = PROFESSIONAL_CREDENTIALS.some(credential => 
      authorText.includes(credential.toLowerCase())
    );
    
    if (!hasCredentials) {
      issues.push({
        type: 'author-lacks-visible-credentials',
        severity: 'medium',
        description: 'Author attribution found but lacks visible professional credentials - missed authority opportunity',
        fix: {
          title: 'Enhance Author Credentials Display',
          description: 'Showcase author credentials to establish expertise and authority for AI engines.',
          code: `<!-- Enhance existing author attribution: -->

<!-- Before: Basic attribution -->
<p>By John Smith</p>

<!-- After: Enhanced with credentials -->
<div class="author-attribution">
  <p><strong>Written by:</strong> 
    <span class="author-name">John Smith, MBA</span>
  </p>
  <p class="author-credentials">
    Certified Digital Marketing Professional | 12+ Years Experience | 
    Former Google Marketing Manager
  </p>
  <p class="author-expertise">
    Specializes in SEO strategy, content marketing, and AI optimization
  </p>
</div>

<!-- Add credential indicators: -->
<!-- Educational: PhD, MBA, Masters, Bachelor -->
<!-- Professional: Certified, Licensed, Accredited -->
<!-- Experience: 10+ years, Decade of experience, Senior -->
<!-- Recognition: Award winner, Published author, Speaker -->
<!-- Company: Former [Big Company], Founded [Company] -->

<!-- Example combinations: -->
<p>By Dr. Lisa Chen, PhD - Senior Data Scientist with 15+ years at Microsoft</p>
<p>By Mark Rodriguez, CPA - Certified Tax Professional and Published Author</p>
<p>By Jennifer Kim, MBA - Former McKinsey Consultant, Startup Founder</p>`
        }
      });
    }
  }

  // Check for author bio or about section
  const authorBioIndicators = [
    /about\s+the\s+author/i,
    /author\s+bio/i,
    /meet\s+the\s+author/i,
    /<section[^>]*class[^>]*author[^>]*>/i,
    /contributor\s+bio/i
  ];
  
  const hasAuthorBio = authorBioIndicators.some(pattern => pattern.test(html));
  
  if (!hasAuthorBio && pageData.wordCount > 500) {
    issues.push({
      type: 'missing-author-bio-section',
      severity: 'medium',
      description: 'No author bio section found - AI engines use author background to assess content credibility',
      fix: {
        title: 'Add Comprehensive Author Bio Section',
        description: 'Author bios help AI engines understand the expertise and authority behind the content.',
        code: `<!-- Comprehensive author bio section -->
<section class="author-bio" itemscope itemtype="https://schema.org/Person">
  <h3>About the Author</h3>
  <div class="bio-content">
    <img src="/authors/john-doe.jpg" alt="John Doe" itemprop="image" class="author-photo">
    <div class="bio-text">
      <h4 itemprop="name">John Doe</h4>
      <p itemprop="jobTitle">Senior SEO Strategist & Content Marketing Expert</p>
      
      <p itemprop="description">
        John has over 12 years of experience in digital marketing and SEO. 
        He holds an MBA from Stanford and is Google Analytics certified. 
        Previously, he led SEO initiatives at Fortune 500 companies including 
        Microsoft and Adobe, helping them achieve 300%+ organic growth.
      </p>
      
      <div class="expertise">
        <h5>Areas of Expertise:</h5>
        <ul>
          <li itemprop="knowsAbout">Technical SEO & Site Architecture</li>
          <li itemprop="knowsAbout">Content Strategy & AI Optimization</li>
          <li itemprop="knowsAbout">E-commerce SEO & Conversion Optimization</li>
        </ul>
      </div>
      
      <div class="credentials">
        <h5>Credentials & Recognition:</h5>
        <ul>
          <li>MBA in Marketing, Stanford University</li>
          <li>Google Analytics & Google Ads Certified</li>
          <li>Published author: "Modern SEO Strategies" (2023)</li>
          <li>Speaker at SearchLove, BrightonSEO, and MozCon</li>
          <li>Featured expert in Search Engine Journal, Moz, and SEMrush</li>
        </ul>
      </div>
      
      <div class="social-links">
        <a href="https://linkedin.com/in/johndoe" itemprop="sameAs">LinkedIn</a>
        <a href="https://twitter.com/johndoeseo" itemprop="sameAs">Twitter</a>
        <a href="/author/john-doe">View All Articles</a>
      </div>
    </div>
  </div>
</section>

<!-- Schema markup for detailed author info -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "John Doe",
  "jobTitle": "Senior SEO Strategist",
  "description": "SEO expert with 12+ years experience helping Fortune 500 companies achieve 300%+ organic growth",
  "image": "${baseUrl}/authors/john-doe.jpg",
  "url": "${baseUrl}/author/john-doe",
  "sameAs": [
    "https://linkedin.com/in/johndoe",
    "https://twitter.com/johndoeseo"
  ],
  "knowsAbout": [
    "Technical SEO",
    "Content Strategy", 
    "AI Optimization",
    "E-commerce SEO"
  ],
  "hasCredential": [
    "MBA in Marketing, Stanford University",
    "Google Analytics Certified",
    "Google Ads Certified"
  ],
  "alumniOf": "Stanford University",
  "worksFor": {
    "@type": "Organization",
    "name": "Your Company Name"
  }
}
</script>`
      }
    });
  }

  // Check for expertise indicators in content
  const expertiseIndicators = [
    'years of experience', 'decade of experience', 'expert in', 'specialist in',
    'certified', 'licensed', 'accredited', 'trained in', 'studied at',
    'worked at', 'former', 'previously', 'founded', 'established'
  ];
  
  const expertiseMatches = expertiseIndicators.filter(indicator => 
    pageData.textContent.toLowerCase().includes(indicator.toLowerCase())
  ).length;
  
  if (expertiseMatches < 2 && pageData.wordCount > 400) {
    issues.push({
      type: 'limited-expertise-indicators',
      severity: 'low',
      description: 'Limited expertise indicators in content - missed opportunity to establish author authority',
      fix: {
        title: 'Add Expertise Indicators Throughout Content',
        description: 'Weave expertise indicators naturally throughout your content to establish credibility.',
        code: `<!-- Natural expertise indicators in content: -->

<!-- Experience-based authority -->
<p>In my 15 years of SEO consulting, I've seen firsthand how AI is reshaping search...</p>

<p>Having worked with over 200 businesses to improve their search rankings, I can confidently say...</p>

<p>During my time as SEO Director at Microsoft, we discovered that...</p>

<!-- Credential-based authority -->
<p>As a Google-certified SEO professional, I recommend focusing on...</p>

<p>My research at Stanford University revealed that...</p>

<p>According to my analysis of 10,000+ websites (published in Search Engine Journal)...</p>

<!-- Industry recognition -->
<p>This strategy, which I presented at MozCon 2024, has helped clients achieve...</p>

<p>The methodology I developed (featured in Search Engine Land) involves...</p>

<!-- Practical expertise -->
<p>In our agency's work with Fortune 500 companies, we've found that...</p>

<p>The case studies from my book "Modern SEO Strategies" show that...</p>

<p>Based on proprietary research from our team of 20+ SEO specialists...</p>

<!-- Educational background -->
<p>My PhD research in Information Science at MIT focused on...</p>

<p>The principles I learned during my MBA at Wharton apply directly to...</p>

<!-- Authority positioning phrases: -->
<!-- "In my experience..." | "I've found that..." | "My research shows..." -->
<!-- "Having worked with..." | "In my role as..." | "As an expert in..." -->
<!-- "My team and I discovered..." | "Our analysis reveals..." -->
<!-- "The methodology I developed..." | "Based on my studies..." -->`
      }
    });
  }

  return issues;
}
// 2. BUSINESS CREDIBILITY & TRANSPARENCY ANALYSIS
async function checkBusinessCredibilityAndTransparency(html, pageData, baseUrl) {
  const issues = [];
  
  // Check for comprehensive About page or section
  const aboutPageIndicators = [
    /<a[^>]*href=["'][^"']*about[^"']*["'][^>]*>/i,
    /about\s+us/i,
    /our\s+story/i,
    /our\s+company/i,
    /our\s+mission/i,
    /who\s+we\s+are/i
  ];
  
  const hasAboutLink = aboutPageIndicators.some(pattern => pattern.test(html));
  
  if (!hasAboutLink) {
    issues.push({
      type: 'missing-comprehensive-about-section',
      severity: 'critical',
      description: 'No About page or section found - AI engines need business background to assess content credibility',
      fix: {
        title: 'Create Comprehensive About Page',
        description: 'About pages are crucial for establishing business legitimacy and expertise in the eyes of AI engines.',
        code: `<!-- Comprehensive About page structure -->
<main class="about-page">
  <header class="about-header">
    <h1>About [Company Name]</h1>
    <p class="company-tagline">Leading experts in [your industry] since [founding year]</p>
  </header>
  
  <section class="company-story" itemscope itemtype="https://schema.org/Organization">
    <h2>Our Story</h2>
    <p itemprop="description">
      Founded in <span itemprop="foundingDate">[year]</span>, [Company Name] has been at the forefront of 
      [industry] innovation. We specialize in [specific expertise areas] and have helped over 
      [number] clients achieve [specific results].
    </p>
    
    <div class="company-stats">
      <div class="stat">
        <strong>[15+]</strong>
        <span>Years of Experience</span>
      </div>
      <div class="stat">
        <strong>[500+]</strong>
        <span>Successful Projects</span>
      </div>
      <div class="stat">
        <strong>[98%]</strong>
        <span>Client Satisfaction</span>
      </div>
    </div>
  </section>
  
  <section class="expertise-areas">
    <h2>Our Expertise</h2>
    <div class="expertise-grid">
      <div class="expertise-item">
        <h3>[Service Area 1]</h3>
        <p>Detailed explanation of expertise and results achieved...</p>
      </div>
      <div class="expertise-item">
        <h3>[Service Area 2]</h3>
        <p>Specific credentials and experience in this area...</p>
      </div>
      <div class="expertise-item">
        <h3>[Service Area 3]</h3>
        <p>Quantifiable results and case studies...</p>
      </div>
    </div>
  </section>
  
  <section class="team-credentials">
    <h2>Our Expert Team</h2>
    <div class="team-grid">
      <div class="team-member" itemscope itemtype="https://schema.org/Person">
        <img src="/team/ceo.jpg" alt="CEO Name" itemprop="image">
        <h3 itemprop="name">[CEO Name]</h3>
        <p itemprop="jobTitle">Chief Executive Officer</p>
        <p itemprop="description">
          [Specific background, education, previous companies, achievements]
        </p>
        <div class="credentials">
          <span itemprop="hasCredential">MBA, Harvard Business School</span>
          <span itemprop="hasCredential">Former VP at [Major Company]</span>
        </div>
      </div>
      <!-- Repeat for key team members -->
    </div>
  </section>
  
  <section class="company-values">
    <h2>Our Mission & Values</h2>
    <div class="values-content">
      <div class="mission">
        <h3>Mission Statement</h3>
        <p>[Clear mission that demonstrates expertise and commitment]</p>
      </div>
      <div class="values">
        <h3>Core Values</h3>
        <ul>
          <li><strong>Expertise:</strong> Continuous learning and industry leadership</li>
          <li><strong>Transparency:</strong> Clear communication and honest practices</li>
          <li><strong>Results:</strong> Measurable outcomes for every client</li>
        </ul>
      </div>
    </div>
  </section>
  
  <section class="credentials-certifications">
    <h2>Credentials & Certifications</h2>
    <div class="credentials-grid">
      <div class="credential">
        <img src="/badges/google-certified.png" alt="Google Certified">
        <p>Google Analytics & Ads Certified</p>
      </div>
      <div class="credential">
        <img src="/badges/industry-member.png" alt="Industry Association">
        <p>Member of [Professional Association]</p>
      </div>
      <!-- Add all relevant certifications -->
    </div>
  </section>
  
  <section class="contact-information" itemscope itemtype="https://schema.org/ContactPoint">
    <h2>Contact Information</h2>
    <div class="contact-details">
      <p><strong>Address:</strong> 
        <span itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
          <span itemprop="streetAddress">[Street Address]</span>,
          <span itemprop="addressLocality">[City]</span>,
          <span itemprop="addressRegion">[State]</span>
          <span itemprop="postalCode">[ZIP]</span>
        </span>
      </p>
      <p><strong>Phone:</strong> <a href="tel:[phone]" itemprop="telephone">[Phone Number]</a></p>
      <p><strong>Email:</strong> <a href="mailto:[email]" itemprop="email">[Email Address]</a></p>
      <p><strong>Business Hours:</strong> <span itemprop="hoursAvailable">Monday-Friday, 9AM-6PM EST</span></p>
    </div>
  </section>
</main>

<!-- Schema markup for organization -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "[Company Name]",
  "description": "[Company description]",
  "url": "${baseUrl}",
  "logo": "${baseUrl}/logo.png",
  "foundingDate": "[YYYY-MM-DD]",
  "founder": {
    "@type": "Person",
    "name": "[Founder Name]"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Street Address]",
    "addressLocality": "[City]",
    "addressRegion": "[State]",
    "postalCode": "[ZIP Code]",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "[Phone]",
    "contactType": "customer service",
    "email": "[Email]"
  },
  "sameAs": [
   "[LinkedIn URL]",
   "[Twitter URL]",
   "[Facebook URL]"
 ],
 "knowsAbout": [
   "[Primary Service Area]",
   "[Secondary Service Area]",
   "[Industry Expertise]"
 ],
 "hasCredential": [
   "[Key Certification 1]",
   "[Key Certification 2]"
 ],
 "award": [
   "[Industry Award 1]",
   "[Recognition 2]"
 ]
}
</script>`
     }
   });
 }
 
 // Check for detailed contact information
 const contactElements = {
   email: /@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(html),
   phone: /(?:\+?1[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}|tel:/.test(html),
   address: /address|street|city|state|zip|postal/i.test(html),
   businessHours: /hours|open|closed|monday|tuesday|wednesday|thursday|friday|saturday|sunday/i.test(html)
 };
 
 const contactScore = Object.values(contactElements).filter(Boolean).length;
 
 if (contactScore < 2) {
   issues.push({
     type: 'insufficient-contact-information',
     severity: 'medium',
     description: 'Insufficient contact information found - AI engines need multiple contact methods to verify business legitimacy',
     fix: {
       title: 'Add Comprehensive Contact Information',
       description: 'Multiple contact methods establish business legitimacy and transparency for AI trust assessment.',
       code: `<!-- Comprehensive contact information -->
<section class="contact-information" itemscope itemtype="https://schema.org/Organization">
 <h2>Contact Us</h2>
 
 <div class="contact-methods">
   <div class="contact-method">
     <h3>Business Address</h3>
     <address itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
       <span itemprop="streetAddress">123 Business Street, Suite 100</span><br>
       <span itemprop="addressLocality">Your City</span>, 
       <span itemprop="addressRegion">State</span> 
       <span itemprop="postalCode">12345</span><br>
       <span itemprop="addressCountry">United States</span>
     </address>
   </div>
   
   <div class="contact-method">
     <h3>Phone & Email</h3>
     <p><strong>Main Office:</strong> <a href="tel:+15551234567" itemprop="telephone">+1 (555) 123-4567</a></p>
     <p><strong>Sales:</strong> <a href="tel:+15551234568">+1 (555) 123-4568</a></p>
     <p><strong>Support:</strong> <a href="tel:+15551234569">+1 (555) 123-4569</a></p>
     <p><strong>General Inquiries:</strong> <a href="mailto:info@company.com" itemprop="email">info@company.com</a></p>
     <p><strong>Sales:</strong> <a href="mailto:sales@company.com">sales@company.com</a></p>
     <p><strong>Support:</strong> <a href="mailto:support@company.com">support@company.com</a></p>
   </div>
   
   <div class="contact-method">
     <h3>Business Hours</h3>
     <div itemprop="openingHours" content="Mo-Fr 09:00-18:00">
       <p><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM EST</p>
       <p><strong>Saturday:</strong> 10:00 AM - 4:00 PM EST</p>
       <p><strong>Sunday:</strong> Closed</p>
     </div>
     <p><strong>Emergency Support:</strong> Available 24/7 for premium clients</p>
   </div>
   
   <div class="contact-method">
     <h3>Additional Contact Options</h3>
     <ul>
       <li><strong>Live Chat:</strong> Available on website during business hours</li>
       <li><strong>WhatsApp:</strong> <a href="https://wa.me/15551234567">+1 (555) 123-4567</a></li>
       <li><strong>Skype:</strong> yourcompany.official</li>
       <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/company/yourcompany">@YourCompany</a></li>
     </ul>
   </div>
 </div>
 
 <!-- Contact form for immediate inquiries -->
 <div class="contact-form">
   <h3>Send Us a Message</h3>
   <form action="/contact" method="post">
     <div class="form-group">
       <label for="name">Full Name *</label>
       <input type="text" id="name" name="name" required>
     </div>
     <div class="form-group">
       <label for="email">Email Address *</label>
       <input type="email" id="email" name="email" required>
     </div>
     <div class="form-group">
       <label for="phone">Phone Number</label>
       <input type="tel" id="phone" name="phone">
     </div>
     <div class="form-group">
       <label for="company">Company Name</label>
       <input type="text" id="company" name="company">
     </div>
     <div class="form-group">
       <label for="subject">Subject *</label>
       <select id="subject" name="subject" required>
         <option value="">Select a topic</option>
         <option value="general">General Inquiry</option>
         <option value="services">Services Information</option>
         <option value="support">Technical Support</option>
         <option value="partnership">Partnership Opportunity</option>
       </select>
     </div>
     <div class="form-group">
       <label for="message">Message *</label>
       <textarea id="message" name="message" rows="5" required></textarea>
     </div>
     <button type="submit">Send Message</button>
   </form>
 </div>
</section>

<!-- Schema markup for contact information -->
<script type="application/ld+json">
{
 "@context": "https://schema.org",
 "@type": "ContactPage",
 "mainEntity": {
   "@type": "Organization",
   "name": "Your Company Name",
   "contactPoint": [
     {
       "@type": "ContactPoint",
       "telephone": "+1-555-123-4567",
       "contactType": "customer service",
       "email": "info@company.com",
       "availableLanguage": "English",
       "hoursAvailable": "Mo-Fr 09:00-18:00"
     },
     {
       "@type": "ContactPoint",
       "telephone": "+1-555-123-4568",
       "contactType": "sales",
       "email": "sales@company.com"
     },
     {
       "@type": "ContactPoint",
       "telephone": "+1-555-123-4569",
       "contactType": "technical support",
       "email": "support@company.com"
     }
   ]
 }
}
</script>`
     }
   });
 }
 
 // Check for legal pages (Privacy Policy, Terms of Service)
 const legalPageIndicators = [
   /privacy\s*policy/i,
   /terms\s*of\s*(service|use)/i,
   /cookie\s*policy/i,
   /disclaimer/i,
   /legal/i
 ];
 
 const foundLegalPages = legalPageIndicators.filter(pattern => pattern.test(html)).length;
 
 if (foundLegalPages < 2) {
   issues.push({
     type: 'missing-legal-pages',
     severity: 'low',
     description: 'Missing essential legal pages (Privacy Policy, Terms of Service) - impacts business credibility assessment',
     fix: {
       title: 'Add Essential Legal Pages',
       description: 'Legal pages demonstrate business professionalism and compliance awareness to AI engines.',
       code: `<!-- Legal pages navigation (typically in footer) -->
<footer class="site-footer">
 <nav class="legal-navigation">
   <h3>Legal & Privacy</h3>
   <ul>
     <li><a href="/privacy-policy">Privacy Policy</a></li>
     <li><a href="/terms-of-service">Terms of Service</a></li>
     <li><a href="/cookie-policy">Cookie Policy</a></li>
     <li><a href="/disclaimer">Disclaimer</a></li>
     <li><a href="/refund-policy">Refund Policy</a></li>
   </ul>
 </nav>
 
 <div class="legal-compliance">
   <p>&copy; 2024 Your Company Name. All rights reserved.</p>
   <p>Licensed and insured business operating in [State/Country]</p>
   <p>Business License #[License Number] | Tax ID: [Tax ID]</p>
 </div>
</footer>

<!-- Privacy Policy page structure -->
<main class="privacy-policy">
 <h1>Privacy Policy</h1>
 <p><strong>Last Updated:</strong> [Date]</p>
 
 <section>
   <h2>Information We Collect</h2>
   <p>We collect information you provide directly to us, such as when you:</p>
   <ul>
     <li>Create an account or fill out forms</li>
     <li>Subscribe to our newsletter</li>
     <li>Contact us for support</li>
     <li>Participate in surveys or promotions</li>
   </ul>
 </section>
 
 <section>
   <h2>How We Use Your Information</h2>
   <p>We use the information we collect to:</p>
   <ul>
     <li>Provide and improve our services</li>
     <li>Communicate with you about your account</li>
     <li>Send marketing communications (with your consent)</li>
     <li>Comply with legal obligations</li>
   </ul>
 </section>
 
 <section>
   <h2>Data Protection Rights</h2>
   <p>You have the right to:</p>
   <ul>
     <li>Access your personal data</li>
     <li>Correct inaccurate data</li>
     <li>Request deletion of your data</li>
     <li>Object to processing</li>
     <li>Data portability</li>
   </ul>
 </section>
 
 <section>
   <h2>Contact Us</h2>
   <p>For privacy-related questions, contact us at:</p>
   <p>Email: privacy@company.com</p>
   <p>Phone: [Phone Number]</p>
   <p>Address: [Business Address]</p>
 </section>
</main>

<!-- Terms of Service page structure -->
<main class="terms-of-service">
 <h1>Terms of Service</h1>
 <p><strong>Last Updated:</strong> [Date]</p>
 
 <section>
   <h2>Acceptance of Terms</h2>
   <p>By accessing and using our services, you accept and agree to be bound by the terms and provision of this agreement.</p>
 </section>
 
 <section>
   <h2>Service Description</h2>
   <p>We provide [detailed description of services]...</p>
 </section>
 
 <section>
   <h2>User Responsibilities</h2>
   <p>Users agree to:</p>
   <ul>
     <li>Provide accurate information</li>
     <li>Use services lawfully and ethically</li>
     <li>Respect intellectual property rights</li>
     <li>Not engage in prohibited activities</li>
   </ul>
 </section>
 
 <section>
   <h2>Limitation of Liability</h2>
   <p>Our liability is limited to the maximum extent permitted by law...</p>
 </section>
 
 <section>
   <h2>Governing Law</h2>
   <p>These terms are governed by the laws of [Jurisdiction].</p>
 </section>
</main>`
     }
   });
 }
 
 // Check for business transparency indicators
 const transparencyIndicators = [
   /founded|established|since/i,
   /team|staff|employees/i,
   /office|headquarters|location/i,
   /clients|customers|projects/i,
   /years|experience|expertise/i
 ];
 
 const transparencyScore = transparencyIndicators.filter(pattern => 
   pattern.test(pageData.textContent)
 ).length;
 
 if (transparencyScore < 3) {
   issues.push({
     type: 'limited-business-transparency',
     severity: 'low',
     description: 'Limited business transparency information - missed opportunity to establish credibility',
     fix: {
       title: 'Increase Business Transparency',
       description: 'Transparent business information helps AI engines assess legitimacy and trustworthiness.',
       code: `<!-- Business transparency elements to add throughout site -->

<!-- Company founding and history -->
<div class="company-history">
 <p><strong>Established 2015:</strong> Founded by industry veterans with 20+ years combined experience</p>
 <p><strong>Headquarters:</strong> Located in the heart of Silicon Valley, California</p>
 <p><strong>Team Size:</strong> 25+ dedicated professionals across marketing, development, and strategy</p>
</div>

<!-- Client and project statistics -->
<div class="business-stats">
 <div class="stat-item">
   <span class="stat-number">500+</span>
   <span class="stat-label">Successful Projects Completed</span>
 </div>
 <div class="stat-item">
   <span class="stat-number">150+</span>
   <span class="stat-label">Happy Clients Worldwide</span>
 </div>
 <div class="stat-item">
   <span class="stat-number">9 Years</span>
   <span class="stat-label">Industry Experience</span>
 </div>
 <div class="stat-item">
   <span class="stat-number">98%</span>
   <span class="stat-label">Client Retention Rate</span>
 </div>
</div>

<!-- Office and team information -->
<div class="office-info">
 <h3>Our Offices</h3>
 <div class="office">
   <h4>San Francisco Headquarters</h4>
   <p>123 Tech Street, Suite 400<br>San Francisco, CA 94105</p>
   <p>Main hub for strategy and client relations</p>
 </div>
 <div class="office">
   <h4>Austin Development Center</h4>
   <p>456 Innovation Blvd<br>Austin, TX 78701</p>
   <p>Technical development and implementation</p>
 </div>
</div>

<!-- Experience and expertise timeline -->
<div class="experience-timeline">
 <h3>Our Journey</h3>
 <div class="timeline-item">
   <span class="year">2015</span>
   <p>Founded by former Google and Facebook marketing executives</p>
 </div>
 <div class="timeline-item">
   <span class="year">2017</span>
   <p>Expanded to serve Fortune 500 companies</p>
 </div>
 <div class="timeline-item">
   <span class="year">2019</span>
   <p>Launched AI-powered optimization platform</p>
 </div>
 <div class="timeline-item">
   <span class="year">2022</span>
   <p>Opened Austin development center</p>
 </div>
 <div class="timeline-item">
   <span class="year">2024</span>
   <p>Leading provider of AI SEO solutions</p>
 </div>
</div>

<!-- Industry involvement and partnerships -->
<div class="industry-involvement">
 <h3>Industry Involvement</h3>
 <ul>
   <li>Active members of Search Engine Marketing Association (SEMA)</li>
   <li>Certified Google Partners since 2016</li>
   <li>Regular speakers at industry conferences (MozCon, SearchLove, SMX)</li>
   <li>Contributing authors to Search Engine Journal and Moz Blog</li>
   <li>Advisory board members for emerging marketing technology companies</li>
 </ul>
</div>`
     }
   });
 }
 
 return issues;
}
// 3. CONTENT AUTHENTICITY & SOURCING ANALYSIS
async function checkContentAuthenticityAndSourcing(html, pageData, baseUrl) {
  const issues = [];
  
  // Check for publication dates and content freshness
  if (pageData.dateMatches.length === 0) {
    issues.push({
      type: 'missing-publication-dates',
      severity: 'medium',
      description: 'No publication or update dates found - AI engines use dates to assess content freshness and reliability',
      fix: {
        title: 'Add Publication and Update Dates',
        description: 'Clear dates help AI engines assess content freshness and establish when expertise was current.',
        code: `<!-- Publication date markup -->
<article itemscope itemtype="https://schema.org/Article">
  <header class="article-header">
    <h1 itemprop="headline">Article Title</h1>
    
    <div class="article-meta">
      <span class="publish-date">
        <strong>Published:</strong> 
        <time datetime="2024-01-15T10:00:00Z" itemprop="datePublished">
          January 15, 2024
        </time>
      </span>
      
      <span class="update-date">
        <strong>Last Updated:</strong> 
        <time datetime="2024-01-20T14:30:00Z" itemprop="dateModified">
          January 20, 2024
        </time>
      </span>
      
      <span class="reading-time">
        <strong>Reading Time:</strong> 8 minutes
      </span>
    </div>
    
    <div class="author-info" itemprop="author" itemscope itemtype="https://schema.org/Person">
      <span>By <span itemprop="name">Expert Author Name</span></span>
      <span itemprop="jobTitle">Senior SEO Strategist</span>
    </div>
  </header>
  
  <!-- Article content -->
  <div itemprop="articleBody">
    <!-- Your content here -->
  </div>
  
  <footer class="article-footer">
    <div class="content-freshness">
      <p><strong>Content Accuracy:</strong> This article is reviewed and updated regularly to ensure accuracy and relevance.</p>
      <p><strong>Next Review Date:</strong> <time datetime="2024-07-15">July 15, 2024</time></p>
    </div>
  </footer>
</article>

<!-- Schema markup for comprehensive article information -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "description": "Article description",
  "author": {
    "@type": "Person",
    "name": "Expert Author Name",
    "jobTitle": "Senior SEO Strategist",
    "url": "${baseUrl}/author/expert-author"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Your Company",
    "logo": {
      "@type": "ImageObject",
      "url": "${baseUrl}/logo.png"
    }
  },
  "datePublished": "2024-01-15T10:00:00Z",
  "dateModified": "2024-01-20T14:30:00Z",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "${baseUrl}/article-url"
  },
  "image": {
    "@type": "ImageObject",
    "url": "${baseUrl}/article-image.jpg",
    "width": 1200,
    "height": 630
  }
}
</script>

<!-- For blog posts and news articles -->
<div class="content-freshness-indicator">
  <div class="freshness-badge">
    <span class="badge recently-updated">Recently Updated</span>
    <time datetime="2024-01-20">Updated 3 days ago</time>
  </div>
  
  <div class="content-review-schedule">
    <p><small>
      <strong>Review Schedule:</strong> This content is reviewed monthly for accuracy and updated as needed.
      <strong>Last Review:</strong> January 20, 2024
    </small></p>
  </div>
</div>

<!-- For evergreen content -->
<div class="evergreen-content-note">
  <p><strong>Evergreen Content:</strong> This guide contains timeless principles that remain relevant. 
  Last verified for accuracy: <time datetime="2024-01-20">January 20, 2024</time></p>
</div>`
      }
    });
  }
  
  // Check for external sources and citations
  const citationIndicators = [
    /according to/i,
    /research shows/i,
    /study found/i,
    /data from/i,
    /source:/i,
    /cited by/i,
    /published in/i,
    /research by/i
  ];
  
  const citationMatches = citationIndicators.filter(indicator => 
    pageData.textContent.match(new RegExp(indicator, 'gi'))
  ).length;
  
  if (citationMatches < 2 && pageData.wordCount > 500) {
    issues.push({
      type: 'insufficient-source-citations',
      severity: 'medium',
      description: 'Limited source citations found - AI engines prefer well-researched, cited content for credibility',
      fix: {
        title: 'Add Authoritative Source Citations',
        description: 'Citations to authoritative sources establish content credibility and demonstrate thorough research.',
        code: `<!-- Proper citation examples throughout content -->

<!-- Statistical citations -->
<p>According to a recent study by <a href="https://authoritative-source.com/study" target="_blank" rel="noopener">
MarketingProfs (2024)</a>, 73% of businesses that implement comprehensive SEO strategies 
see a 40% increase in organic traffic within the first year.</p>

<!-- Expert citations -->
<p>As noted by Google's John Mueller in his 
<a href="https://developers.google.com/search/blog/2024/01/seo-guidance" target="_blank" rel="noopener">
official SEO guidance</a>, "Content quality remains the most important ranking factor in 2024."</p>

<!-- Research citations -->
<p>Research published in the <em>Journal of Digital Marketing</em> 
<a href="https://journal-link.com/article" target="_blank" rel="noopener">(Smith et al., 2024)</a> 
demonstrates that websites with FAQ sections are 3x more likely to appear in featured snippets.</p>

<!-- Industry report citations -->
<p>The latest <a href="https://semrush.com/state-of-search-2024" target="_blank" rel="noopener">
State of Search Report by SEMrush</a> reveals that AI-optimized content receives 
250% more engagement than traditional SEO content.</p>

<!-- Government/Educational citations -->
<p>Data from the <a href="https://www.census.gov/business-stats" target="_blank" rel="noopener">
U.S. Census Bureau</a> shows that small businesses investing in digital marketing 
grow 2.5x faster than those that don't.</p>

<!-- Case study citations -->
<p>Our analysis of 1,000+ client websites, documented in our 
<a href="${baseUrl}/case-studies/seo-performance-analysis">comprehensive case study</a>, 
found that implementing structured data improved click-through rates by an average of 15%.</p>

<!-- Create a references section -->
<section class="references">
  <h2>References and Sources</h2>
  <ol>
    <li>
      Smith, J., Johnson, M., & Brown, L. (2024). "Impact of FAQ Sections on Search Visibility." 
      <em>Journal of Digital Marketing</em>, 15(3), 45-62. 
      <a href="https://journal-link.com/article" target="_blank" rel="noopener">
        https://journal-link.com/article
      </a>
    </li>
    <li>
      MarketingProfs. (2024). "SEO Strategy Implementation Study." 
      <a href="https://marketingprofs.com/seo-study-2024" target="_blank" rel="noopener">
        https://marketingprofs.com/seo-study-2024
      </a>
    </li>
    <li>
      Mueller, J. (2024). "Google's Official SEO Guidance for 2024." Google Search Central Blog. 
      <a href="https://developers.google.com/search/blog/2024/01/seo-guidance" target="_blank" rel="noopener">
        https://developers.google.com/search/blog/2024/01/seo-guidance
      </a>
    </li>
    <li>
      SEMrush. (2024). "State of Search Report 2024." 
      <a href="https://semrush.com/state-of-search-2024" target="_blank" rel="noopener">
        https://semrush.com/state-of-search-2024
      </a>
    </li>
  </ol>
</section>

<!-- Inline citation best practices -->
<!-- 1. Link to original, authoritative sources -->
<!-- 2. Use recent data and studies (within 2-3 years) -->
<!-- 3. Cite specific statistics and claims -->
<!-- 4. Include publication dates when available -->
<!-- 5. Use reputable sources (government, universities, industry leaders) -->

<!-- Citation quality indicators for AI trust: -->
<!-- ✓ Links to .edu, .gov, or recognized industry authorities -->
<!-- ✓ Recent publication dates (2022-2024) -->
<!-- ✓ Specific statistics and data points -->
<!-- ✓ Named researchers and institutions -->
<!-- ✓ Peer-reviewed or officially published sources -->`
      }
    });
  }
  
  // Check for methodology or process transparency
  const methodologyIndicators = [
    /methodology/i,
    /process/i,
    /approach/i,
    /how we/i,
    /our method/i,
    /step by step/i,
    /analysis/i,
    /research method/i
  ];
  
  const hasMethodology = methodologyIndicators.some(indicator => 
    pageData.textContent.match(new RegExp(indicator, 'gi'))
  );
  
  if (!hasMethodology && pageData.wordCount > 600) {
    issues.push({
      type: 'missing-methodology-transparency',
      severity: 'low',
      description: 'No methodology or process information found - transparency helps establish content credibility',
      fix: {
        title: 'Add Methodology and Process Transparency',
        description: 'Explaining your methods and processes demonstrates expertise and builds trust with AI engines.',
        code: `<!-- Methodology transparency examples -->

<!-- Research methodology section -->
<section class="methodology">
  <h2>Our Research Methodology</h2>
  
  <div class="method-overview">
    <p>Our analysis is based on comprehensive research using the following methodology:</p>
  </div>
  
  <div class="method-steps">
    <div class="method-step">
      <h3>1. Data Collection</h3>
      <ul>
        <li>Analyzed 10,000+ websites across 50 industries</li>
        <li>Collected performance data over 12-month period</li>
        <li>Used proprietary SEO analysis tools and Google Search Console data</li>
        <li>Gathered information from January 2023 to January 2024</li>
      </ul>
    </div>
    
    <div class="method-step">
      <h3>2. Analysis Framework</h3>
      <ul>
        <li>Applied statistical analysis using SPSS and R</li>
        <li>Controlled for industry, website age, and content volume</li>
        <li>Used correlation and regression analysis</li>
        <li>Validated findings with A/B testing on 100 client websites</li>
      </ul>
    </div>
    
    <div class="method-step">
      <h3>3. Quality Assurance</h3>
      <ul>
        <li>Peer review by team of 5 senior SEO specialists</li>
        <li>Cross-validation with industry benchmarks</li>
        <li>External validation by academic partners</li>
        <li>Ongoing monitoring and updates based on algorithm changes</li>
      </ul>
    </div>
  </div>
  
  <div class="limitations">
    <h3>Study Limitations</h3>
    <p>This analysis is based on websites primarily in English-speaking markets. 
    Results may vary for different languages, geographic regions, or highly specialized industries.</p>
  </div>
</section>

<!-- Service process transparency -->
<section class="our-process">
  <h2>Our Proven Process</h2>
  
  <div class="process-intro">
    <p>We've refined this process over 9 years and 500+ successful projects. 
    Here's exactly how we deliver results:</p>
  </div>
  
  <div class="process-steps">
    <div class="process-step">
      <div class="step-number">1</div>
      <div class="step-content">
        <h3>Comprehensive Audit</h3>
        <p><strong>Duration:</strong> 5-7 business days</p>
        <p><strong>Deliverable:</strong> 40-page detailed analysis report</p>
        <ul>
          <li>Technical SEO analysis using Screaming Frog and custom tools</li>
          <li>Content gap analysis against top 10 competitors</li>
          <li>Keyword opportunity assessment (500+ keywords analyzed)</li>
          <li>User experience and site speed evaluation</li>
        </ul>
      </div>
    </div>
    
    <div class="process-step">
      <div class="step-number">2</div>
      <div class="step-content">
        <h3>Strategy Development</h3>
        <p><strong>Duration:</strong> 3-5 business days</p>
        <p><strong>Deliverable:</strong> Custom strategy roadmap</p>
        <ul>
          <li>Prioritized action plan based on impact vs. effort matrix</li>
          <li>Content strategy with 90-day publishing calendar</li>
          <li>Technical implementation timeline</li>
          <li>Success metrics and KPI definitions</li>
        </ul>
      </div>
    </div>
    
    <div class="process-step">
      <div class="step-number">3</div>
      <div class="step-content">
        <h3>Implementation</h3>
        <p><strong>Duration:</strong> Ongoing (typically 3-6 months for full implementation)</p>
        <p><strong>Deliverable:</strong> Weekly progress reports</p>
        <ul>
          <li>Technical optimizations implemented by certified developers</li>
          <li>Content creation by subject matter experts</li>
          <li>Monthly strategy reviews and adjustments</li>
          <li>Continuous monitoring and optimization</li>
        </ul>
      </div>
    </div>
  </div>
  
  <div class="process-validation">
    <h3>Process Validation</h3>
   <p>Our process effectiveness is validated through:</p>
   <ul>
     <li><strong>Client Results:</strong> Average 247% increase in organic traffic within 6 months</li>
     <li><strong>Case Studies:</strong> 50+ documented success stories across industries</li>
     <li><strong>Third-Party Validation:</strong> Featured methodology in Search Engine Journal</li>
     <li><strong>Continuous Improvement:</strong> Process updated quarterly based on algorithm changes</li>
     <li><strong>Industry Recognition:</strong> Winner of "Best SEO Process" - Marketing Excellence Awards 2023</li>
   </ul>
 </div>
</section>

<!-- Content creation process -->
<section class="content-methodology">
 <h2>How We Create Expert Content</h2>
 
 <div class="content-process">
   <div class="content-step">
     <h3>Research Phase</h3>
     <ul>
       <li><strong>Industry Analysis:</strong> Review 20+ authoritative sources per topic</li>
       <li><strong>Competitor Research:</strong> Analyze top 10 ranking pages for target keywords</li>
       <li><strong>Expert Interviews:</strong> Conduct interviews with 3-5 industry professionals</li>
       <li><strong>Data Collection:</strong> Gather original research data when applicable</li>
     </ul>
   </div>
   
   <div class="content-step">
     <h3>Writing & Review</h3>
     <ul>
       <li><strong>Expert Authors:</strong> Content written by certified professionals with 10+ years experience</li>
       <li><strong>Fact Checking:</strong> All claims verified against original sources</li>
       <li><strong>Peer Review:</strong> Reviewed by 2+ additional subject matter experts</li>
       <li><strong>AI Optimization:</strong> Structured for optimal AI search engine understanding</li>
     </ul>
   </div>
   
   <div class="content-step">
     <h3>Quality Assurance</h3>
     <ul>
       <li><strong>Editorial Review:</strong> Grammar, style, and clarity check</li>
       <li><strong>Technical Validation:</strong> Schema markup and SEO optimization verification</li>
       <li><strong>User Testing:</strong> Content tested with target audience sample</li>
       <li><strong>Performance Monitoring:</strong> Ongoing tracking of content engagement and rankings</li>
     </ul>
   </div>
 </div>
</section>

<!-- Transparency in recommendations -->
<section class="recommendation-basis">
 <h2>How We Develop Our Recommendations</h2>
 
 <div class="rec-methodology">
   <p>Our recommendations are based on:</p>
   
   <div class="data-sources">
     <h3>Primary Data Sources</h3>
     <ul>
       <li><strong>Proprietary Research:</strong> Analysis of 50,000+ websites in our database</li>
       <li><strong>Client Results:</strong> Performance data from 500+ successful campaigns</li>
       <li><strong>A/B Testing:</strong> 200+ controlled experiments across different industries</li>
       <li><strong>Algorithm Updates:</strong> Real-time analysis of Google algorithm changes</li>
     </ul>
   </div>
   
   <div class="validation-process">
     <h3>Validation Process</h3>
     <ul>
       <li><strong>Statistical Significance:</strong> All findings validated with 95% confidence interval</li>
       <li><strong>Cross-Industry Testing:</strong> Recommendations tested across 15+ industries</li>
       <li><strong>Peer Review:</strong> External validation by academic and industry partners</li>
       <li><strong>Continuous Updates:</strong> Recommendations updated monthly based on new data</li>
     </ul>
   </div>
 </div>
</section>`
     }
   });
 }
 
 // Check for content update indicators
 const updateIndicators = [
   /updated/i,
   /revised/i,
   /modified/i,
   /refreshed/i,
   /current as of/i,
   /last reviewed/i,
   /accuracy verified/i
 ];
 
 const hasUpdateInfo = updateIndicators.some(indicator => 
   pageData.textContent.match(new RegExp(indicator, 'gi'))
 );
 
 if (!hasUpdateInfo && pageData.wordCount > 800) {
   issues.push({
     type: 'missing-content-freshness-indicators',
     severity: 'low',
     description: 'No content freshness or update indicators found - AI engines value current and maintained content',
     fix: {
       title: 'Add Content Freshness Indicators',
       description: 'Content freshness signals help AI engines understand the currency and reliability of information.',
       code: `<!-- Content freshness indicators -->

<!-- Article update notice -->
<div class="content-freshness-notice">
 <div class="update-badge">
   <span class="badge updated">Recently Updated</span>
   <time datetime="2024-01-20T10:00:00Z">Updated January 20, 2024</time>
 </div>
 
 <div class="update-summary">
   <h4>What's New in This Update:</h4>
   <ul>
     <li>Added latest 2024 SEO best practices</li>
     <li>Updated statistics with Q4 2023 data</li>
     <li>Revised recommendations based on recent algorithm changes</li>
     <li>Added new case study examples</li>
   </ul>
 </div>
</div>

<!-- Ongoing maintenance notice -->
<div class="content-maintenance">
 <div class="maintenance-schedule">
   <h4>Content Maintenance Schedule</h4>
   <p><strong>Review Frequency:</strong> Monthly</p>
   <p><strong>Last Review:</strong> <time datetime="2024-01-15">January 15, 2024</time></p>
   <p><strong>Next Scheduled Review:</strong> <time datetime="2024-02-15">February 15, 2024</time></p>
   <p><strong>Accuracy Verified:</strong> All statistics and examples current as of January 2024</p>
 </div>
 
 <div class="accuracy-commitment">
   <p><strong>Our Accuracy Commitment:</strong> We review and update this content monthly to ensure 
   all information remains current and accurate. If you notice outdated information, 
   <a href="mailto:content@company.com">please let us know</a>.</p>
 </div>
</div>

<!-- Version history for comprehensive content -->
<div class="version-history">
 <h4>Content Version History</h4>
 <div class="version-item">
   <span class="version-date">January 20, 2024 (v2.3)</span>
   <span class="version-changes">Updated AI optimization strategies, added new case studies</span>
 </div>
 <div class="version-item">
   <span class="version-date">December 15, 2023 (v2.2)</span>
   <span class="version-changes">Revised technical SEO recommendations, updated statistics</span>
 </div>
 <div class="version-item">
   <span class="version-date">November 10, 2023 (v2.1)</span>
   <span class="version-changes">Added mobile optimization section, corrected minor errors</span>
 </div>
 <div class="version-item">
   <span class="version-date">October 5, 2023 (v2.0)</span>
   <span class="version-changes">Major revision: added AI search optimization strategies</span>
 </div>
</div>

<!-- Data currency indicators -->
<div class="data-currency">
 <h4>Data Currency Statement</h4>
 <p>All statistics and examples in this content are current as of <strong>January 2024</strong>. 
 Data sources include:</p>
 <ul>
   <li>Google Search Console data (updated monthly)</li>
   <li>Industry reports from SEMrush, Ahrefs, Moz (Q4 2023)</li>
   <li>Client performance data (December 2023 - January 2024)</li>
   <li>Academic research (published 2022-2024)</li>
 </ul>
</div>

<!-- Evergreen content disclaimer -->
<div class="evergreen-disclaimer">
 <p><strong>Evergreen Content Note:</strong> While SEO best practices evolve, the fundamental 
 principles in this guide remain applicable. We monitor algorithm changes and update 
 recommendations accordingly. Last verified: <time datetime="2024-01-20">January 20, 2024</time></p>
</div>

<!-- Quick freshness indicators throughout content -->
<span class="inline-freshness">(Updated January 2024)</span>
<span class="current-data">[2024 data]</span>
<span class="recent-verification">(verified January 2024)</span>

<!-- Schema markup for content freshness -->
<script type="application/ld+json">
{
 "@context": "https://schema.org",
 "@type": "Article",
 "datePublished": "2023-01-15T10:00:00Z",
 "dateModified": "2024-01-20T14:30:00Z",
 "author": {
   "@type": "Person",
   "name": "Expert Author"
 },
 "publisher": {
   "@type": "Organization",
   "name": "Your Company"
 },
 "maintenancePolicy": "This content is reviewed monthly and updated as needed to ensure accuracy and relevance."
}
</script>`
     }
   });
 }
 
 return issues;
}
// 4. PROFESSIONAL CREDENTIALS & CERTIFICATIONS ANALYSIS
async function checkProfessionalCredentialsAndCertifications(html, pageData) {
  const issues = [];
  
  // Check for visible professional credentials
  const credentialMatches = PROFESSIONAL_CREDENTIALS.filter(credential => 
    pageData.textContent.toLowerCase().includes(credential.toLowerCase())
  );
  
  if (credentialMatches.length < 2) {
    issues.push({
      type: 'limited-professional-credentials',
      severity: 'medium',
      description: 'Limited professional credentials visible - missed opportunity to establish expertise authority',
      fix: {
        title: 'Showcase Professional Credentials and Certifications',
        description: 'Visible credentials help AI engines assess content creator expertise and establish topical authority.',
        code: `<!-- Professional credentials showcase -->

<!-- Individual author credentials -->
<div class="author-credentials" itemscope itemtype="https://schema.org/Person">
  <div class="author-header">
    <img src="/authors/john-doe.jpg" alt="John Doe" itemprop="image">
    <div class="author-info">
      <h3 itemprop="name">John Doe</h3>
      <p itemprop="jobTitle">Senior SEO Strategist & Digital Marketing Expert</p>
    </div>
  </div>
  
  <div class="credentials-section">
    <h4>Professional Credentials</h4>
    
    <div class="education">
      <h5>Education</h5>
      <ul>
        <li itemprop="hasCredential">MBA in Marketing, Stanford University (2015)</li>
        <li itemprop="hasCredential">Bachelor of Science in Computer Science, UC Berkeley (2010)</li>
        <li itemprop="hasCredential">Certificate in Data Analytics, MIT (2018)</li>
      </ul>
    </div>
    
    <div class="certifications">
      <h5>Professional Certifications</h5>
      <div class="cert-grid">
        <div class="certification-item">
          <img src="/badges/google-analytics.png" alt="Google Analytics Certified">
          <span>Google Analytics Certified Professional</span>
          <small>Valid: 2024-2025</small>
        </div>
        <div class="certification-item">
          <img src="/badges/google-ads.png" alt="Google Ads Certified">
          <span>Google Ads Certified Professional</span>
          <small>Valid: 2024-2025</small>
        </div>
        <div class="certification-item">
          <img src="/badges/hubspot.png" alt="HubSpot Certified">
          <span>HubSpot Inbound Marketing Certified</span>
          <small>Valid: 2024-2025</small>
        </div>
        <div class="certification-item">
          <img src="/badges/semrush.png" alt="SEMrush Certified">
          <span>SEMrush SEO Toolkit Certified</span>
          <small>Valid: 2024-2025</small>
        </div>
      </div>
    </div>
    
    <div class="professional-memberships">
      <h5>Professional Memberships</h5>
      <ul>
        <li>Member, Search Engine Marketing Association (SEMA) - Since 2018</li>
        <li>Active Member, Digital Marketing Institute - Since 2017</li>
        <li>Advisory Board Member, Marketing Technology Association - Since 2022</li>
        <li>Certified Member, American Marketing Association (AMA) - Since 2016</li>
      </ul>
    </div>
    
    <div class="industry-recognition">
      <h5>Industry Recognition & Awards</h5>
      <ul>
        <li><strong>2024:</strong> "Top 50 SEO Professionals" - Search Engine Journal</li>
        <li><strong>2023:</strong> "Digital Marketing Excellence Award" - Marketing Awards Council</li>
        <li><strong>2022:</strong> "SEO Innovation Award" - BrightonSEO Conference</li>
        <li><strong>2021:</strong> "Rising Star in Digital Marketing" - Marketing Land</li>
      </ul>
    </div>
  </div>
</div>

<!-- Company-wide credentials -->
<section class="company-credentials">
  <h2>Our Team's Credentials</h2>
  
  <div class="credential-stats">
    <div class="stat-item">
      <span class="stat-number">25+</span>
      <span class="stat-label">Certified Professionals</span>
    </div>
    <div class="stat-item">
      <span class="stat-number">150+</span>
      <span class="stat-label">Industry Certifications</span>
    </div>
    <div class="stat-item">
      <span class="stat-number">75+</span>
      <span class="stat-label">Years Combined Experience</span>
    </div>
    <div class="stat-item">
      <span class="stat-number">12</span>
      <span class="stat-label">Advanced Degrees</span>
    </div>
  </div>
  
  <div class="certification-categories">
    <div class="cert-category">
      <h3>Google Certifications</h3>
      <ul>
        <li>15 Google Analytics Certified professionals</li>
        <li>12 Google Ads Certified specialists</li>
        <li>8 Google Tag Manager Certified experts</li>
        <li>5 Google Cloud Platform Certified architects</li>
      </ul>
    </div>
    
    <div class="cert-category">
      <h3>SEO & Marketing Certifications</h3>
      <ul>
        <li>HubSpot Inbound Marketing: 20 certified</li>
        <li>SEMrush SEO Toolkit: 18 certified</li>
        <li>Moz SEO Essentials: 15 certified</li>
        <li>Ahrefs Certified: 12 certified</li>
      </ul>
    </div>
    
    <div class="cert-category">
      <h3>Technical Certifications</h3>
      <ul>
        <li>AWS Certified Solutions Architect: 6 certified</li>
        <li>Microsoft Azure Certified: 4 certified</li>
        <li>Salesforce Certified: 8 certified</li>
        <li>WordPress Developer Certified: 10 certified</li>
      </ul>
    </div>
    
    <div class="cert-category">
      <h3>Advanced Education</h3>
      <ul>
        <li>MBA degrees: 8 team members</li>
        <li>Master's in Computer Science: 4 team members</li>
        <li>PhD in Marketing/Psychology: 2 team members</li>
        <li>Bachelor's degrees: 25 team members</li>
      </ul>
    </div>
  </div>
</section>

<!-- Credentials verification -->
<section class="credential-verification">
  <h2>Credential Verification</h2>
  <p>All professional credentials and certifications listed are current and verifiable. 
  We maintain public profiles on certification platforms where applicable:</p>
  
  <div class="verification-links">
    <a href="https://skillshop.withgoogle.com/u/profile" target="_blank" rel="noopener">
      Verify Google Certifications
    </a>
    <a href="https://academy.hubspot.com/certification-directory" target="_blank" rel="noopener">
      Verify HubSpot Certifications
    </a>
    <a href="https://www.semrush.com/academy/certificates" target="_blank" rel="noopener">
      Verify SEMrush Certifications
    </a>
  </div>
  
  <div class="credential-policy">
    <h3>Our Credential Policy</h3>
    <ul>
      <li><strong>Continuous Learning:</strong> All team members complete 40+ hours of training annually</li>
      <li><strong>Certification Maintenance:</strong> We maintain current certifications and renew as required</li>
      <li><strong>New Technology Adoption:</strong> Team members pursue certifications in emerging technologies</li>
      <li><strong>Knowledge Sharing:</strong> Regular internal training sessions to share expertise across the team</li>
    </ul>
  </div>
</section>

<!-- Schema markup for professional credentials -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "John Doe",
  "jobTitle": "Senior SEO Strategist",
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "name": "MBA in Marketing",
      "credentialCategory": "degree",
      "educationalLevel": "Master's degree",
      "recognizedBy": {
        "@type": "EducationalOrganization",
        "name": "Stanford University"
      }
    },
    {
      "@type": "EducationalOccupationalCredential",
      "name": "Google Analytics Certified",
      "credentialCategory": "certification",
      "recognizedBy": {
        "@type": "Organization",
        "name": "Google"
      },
      "validFor": "P1Y"
    }
  ],
  "memberOf": [
    {
      "@type": "Organization",
      "name": "Search Engine Marketing Association"
    },
    {
      "@type": "Organization", 
      "name": "Digital Marketing Institute"
    }
  ]
}
</script>`
      }
    });
  }
  
  // Check for industry experience indicators
  const experienceIndicators = [
    /\d+\s*years?\s*(of\s*)?experience/i,
    /decade\s*of\s*experience/i,
    /worked\s*(at|with|for)/i,
    /former/i,
    /previously/i,
    /veteran/i,
    /seasoned/i,
    /senior/i
  ];
  
  const experienceMatches = experienceIndicators.filter(indicator => 
    pageData.textContent.match(indicator)
  ).length;
  
  if (experienceMatches < 1 && pageData.wordCount > 300) {
    issues.push({
      type: 'missing-experience-indicators',
      severity: 'low',
      description: 'No clear experience indicators found - missed opportunity to establish professional authority',
      fix: {
        title: 'Add Professional Experience Indicators',
        description: 'Experience indicators help AI engines understand the depth of expertise behind the content.',
        code: `<!-- Professional experience indicators -->

<!-- Experience in content author attribution -->
<div class="author-experience">
  <div class="author-intro">
    <p><strong>About the Author:</strong> John Doe brings over 15 years of experience in digital marketing 
    and SEO strategy. As a former Google marketing manager and current SEO director, he has helped 
    Fortune 500 companies achieve 300%+ organic growth.</p>
  </div>
  
  <div class="experience-timeline">
    <h4>Professional Experience</h4>
    
    <div class="experience-item">
      <span class="years">2020 - Present</span>
      <div class="role-info">
        <h5>Senior SEO Strategist | Your Company</h5>
        <p>Leading SEO initiatives for 100+ enterprise clients, developing AI-optimized content strategies</p>
        <ul>
          <li>Managed $2M+ in SEO budgets annually</li>
          <li>Achieved average 247% increase in organic traffic for clients</li>
          <li>Developed proprietary AI SEO methodology adopted industry-wide</li>
        </ul>
      </div>
    </div>
    
    <div class="experience-item">
      <span class="years">2018 - 2020</span>
      <div class="role-info">
        <h5>Marketing Manager | Google</h5>
        <p>Led search marketing initiatives for Google's enterprise products</p>
        <ul>
          <li>Managed marketing campaigns with $10M+ annual spend</li>
          <li>Collaborated directly with Google's search algorithm team</li>
          <li>Contributed to Google's official SEO documentation</li>
        </ul>
      </div>
    </div>
    
    <div class="experience-item">
      <span class="years">2015 - 2018</span>
      <div class="role-info">
        <h5>SEO Consultant | Microsoft</h5>
        <p>Optimized Microsoft's product pages and content strategy</p>
        <ul>
          <li>Improved organic visibility for 50+ product lines</li>
          <li>Increased Microsoft's search traffic by 180%</li>
          <li>Trained internal teams on SEO best practices</li>
        </ul>
      </div>
    </div>
    
    <div class="experience-item">
      <span class="years">2010 - 2015</span>
      <div class="role-info">
        <h5>Digital Marketing Specialist | Adobe</h5>
        <p>Entry-level to senior progression in digital marketing</p>
        <ul>
          <li>Started as junior analyst, promoted to specialist</li>
          <li>Managed SEO for Adobe Creative Suite products</li>
          <li>Developed expertise in technical SEO and content optimization</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- Company team experience -->
<section class="team-experience">
  <h2>Our Team's Experience</h2>
  
  <div class="experience-stats">
    <div class="stat-group">
      <h3>Collective Experience</h3>
      <div class="stat-item">
        <span class="stat-number">200+</span>
        <span class="stat-label">Years Combined Experience</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">1,000+</span>
        <span class="stat-label">Successful Projects</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">50+</span>
        <span class="stat-label">Industries Served</span>
      </div>
    </div>
    
    <div class="experience-levels">
      <h3>Experience Distribution</h3>
      <div class="experience-breakdown">
        <div class="experience-tier">
          <span class="tier-label">15+ Years Experience</span>
          <span class="tier-count">8 team members</span>
          <div class="tier-roles">Senior Directors, VP-level</div>
        </div>
        <div class="experience-tier">
          <span class="tier-label">10-15 Years Experience</span>
          <span class="tier-count">12 team members</span>
          <div class="tier-roles">Senior Managers, Lead Specialists</div>
        </div>
        <div class="experience-tier">
          <span class="tier-label">5-10 Years Experience</span>
          <span class="tier-count">15 team members</span>
          <div class="tier-roles">Specialists, Account Managers</div>
        </div>
        <div class="experience-tier">
          <span class="tier-label">2-5 Years Experience</span>
          <span class="tier-count">10 team members</span>
          <div class="tier-roles">Analysts, Junior Specialists</div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="notable-experience">
    <h3>Notable Previous Experience</h3>
    <div class="company-alumni">
      <div class="alumni-group">
        <h4>Big Tech Alumni</h4>
        <ul>
          <li><strong>Google:</strong> 6 former employees (Marketing, Engineering, Product)</li>
          <li><strong>Microsoft:</strong> 4 former employees (Marketing, Azure, Office 365)</li>
          <li><strong>Facebook/Meta:</strong> 3 former employees (Ads, Analytics, Growth)</li>
          <li><strong>Amazon:</strong> 2 former employees (AWS, Advertising)</li>
        </ul>
      </div>
      
      <div class="alumni-group">
        <h4>Agency Veterans</h4>
        <ul>
          <li><strong>McKinsey & Company:</strong> 2 former consultants</li>
          <li><strong>Deloitte Digital:</strong> 3 former strategists</li>
          <li><strong>Accenture Interactive:</strong> 4 former specialists</li>
          <li><strong>WPP/GroupM:</strong> 5 former agency professionals</li>
        </ul>
      </div>
      
      <div class="alumni-group">
        <h4>Startup Experience</h4>
        <ul>
          <li><strong>Founded Companies:</strong> 3 team members are former founders</li>
          <li><strong>Series A-C Startups:</strong> 8 team members with startup experience</li>
          <li><strong>Unicorn Companies:</strong> 4 team members from billion-dollar startups</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- Experience-based content authority -->
<div class="content-authority">
  <div class="authority-statement">
    <p><strong>Why Trust Our Analysis:</strong> This analysis is based on our team's collective 
    200+ years of experience managing SEO for companies including Google, Microsoft, Adobe, 
    and 500+ enterprise clients. Our insights come from hands-on implementation, not just theory.</p>
  </div>
  
  <div class="practical-experience">
    <h4>Real-World Experience Behind This Content:</h4>
    <ul>
      <li><strong>Campaign Management:</strong> Over $50M in SEO and PPC campaigns managed</li>
      <li><strong>Website Optimization:</strong> 10,000+ websites analyzed and optimized</li>
      <li><strong>Algorithm Updates:</strong> Navigated 25+ major Google algorithm changes</li>
      <li><strong>Industry Verticals:</strong> Deep experience across 50+ industries</li>
      <li><strong>International SEO:</strong> Multi-language and multi-market campaigns</li>
    </ul>
  </div>
</div>`
      }
    });
  }
  
  return issues;
}
// 5. SOCIAL PROOF & EXTERNAL VALIDATION ANALYSIS
async function checkSocialProofAndExternalValidation(html, pageData, baseUrl) {
  const issues = [];
  
  // Check for testimonials and reviews
  const testimonialIndicators = [
    /testimonial/i,
    /review/i,
    /client says/i,
    /customer feedback/i,
    /"[^"]{20,}"/g, // Quoted text that might be testimonials
    /rating/i,
    /stars/i
  ];
  
  const testimonialMatches = testimonialIndicators.filter(indicator => 
    pageData.textContent.match(indicator)
  ).length;
  
  if (testimonialMatches < 2) {
    issues.push({
      type: 'limited-social-proof-testimonials',
      severity: 'low',
      description: 'Limited testimonials or client feedback found - missed opportunity for social proof credibility',
      fix: {
        title: 'Add Client Testimonials and Social Proof',
        description: 'Client testimonials and reviews provide social proof that helps AI engines assess service quality and credibility.',
        code: `<!-- Comprehensive testimonials section -->
<section class="client-testimonials" itemscope itemtype="https://schema.org/Organization">
  <h2>What Our Clients Say</h2>
  
  <div class="testimonials-grid">
    <div class="testimonial-item" itemscope itemtype="https://schema.org/Review">
      <div class="testimonial-content">
        <div class="rating" itemprop="reviewRating" itemscope itemtype="https://schema.org/Rating">
          <meta itemprop="ratingValue" content="5">
          <meta itemprop="bestRating" content="5">
          <div class="stars">★★★★★</div>
        </div>
        
        <blockquote itemprop="reviewBody">
          "Working with this team increased our organic traffic by 312% in just 8 months. 
          Their AI-optimized SEO approach delivered results we never thought possible. 
          The ROI has been incredible - we've seen a 450% increase in qualified leads."
        </blockquote>
        
        <div class="reviewer-info" itemprop="author" itemscope itemtype="https://schema.org/Person">
          <img src="/testimonials/sarah-johnson.jpg" alt="Sarah Johnson" itemprop="image">
          <div class="reviewer-details">
            <cite itemprop="name">Sarah Johnson</cite>
            <span itemprop="jobTitle">VP of Marketing</span>
            <span class="company" itemprop="worksFor">TechCorp Inc.</span>
            <div class="company-info">Fortune 500 SaaS Company</div>
          </div>
        </div>
        
        <div class="testimonial-metrics">
          <div class="metric">
            <span class="metric-value">312%</span>
            <span class="metric-label">Traffic Increase</span>
          </div>
          <div class="metric">
            <span class="metric-value">450%</span>
            <span class="metric-label">Lead Increase</span>
          </div>
          <div class="metric">
            <span class="metric-value">8 months</span>
            <span class="metric-label">Time to Results</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="testimonial-item" itemscope itemtype="https://schema.org/Review">
      <div class="testimonial-content">
        <div class="rating" itemprop="reviewRating" itemscope itemtype="https://schema.org/Rating">
          <meta itemprop="ratingValue" content="5">
        <meta itemprop="bestRating" content="5">
         <div class="stars">★★★★★</div>
       </div>
       
       <blockquote itemprop="reviewBody">
         "The depth of expertise and strategic thinking is unmatched. They didn't just improve our rankings - 
         they transformed our entire digital presence. Our revenue from organic search has tripled, 
         and we're now dominating our competitive landscape."
       </blockquote>
       
       <div class="reviewer-info" itemprop="author" itemscope itemtype="https://schema.org/Person">
         <img src="/testimonials/michael-chen.jpg" alt="Michael Chen" itemprop="image">
         <div class="reviewer-details">
           <cite itemprop="name">Michael Chen</cite>
           <span itemprop="jobTitle">CEO & Founder</span>
           <span class="company" itemprop="worksFor">GrowthTech Solutions</span>
           <div class="company-info">$50M ARR E-commerce Platform</div>
         </div>
       </div>
       
       <div class="testimonial-metrics">
         <div class="metric">
           <span class="metric-value">3x</span>
           <span class="metric-label">Organic Revenue</span>
         </div>
         <div class="metric">
           <span class="metric-value">#1</span>
           <span class="metric-label">Market Position</span>
         </div>
         <div class="metric">
           <span class="metric-value">85%</span>
           <span class="metric-label">Keyword Rankings Top 3</span>
         </div>
       </div>
     </div>
   </div>
   
   <div class="testimonial-item" itemscope itemtype="https://schema.org/Review">
     <div class="testimonial-content">
       <div class="rating" itemprop="reviewRating" itemscope itemtype="https://schema.org/Rating">
         <meta itemprop="ratingValue" content="5">
         <meta itemprop="bestRating" content="5">
         <div class="stars">★★★★★</div>
       </div>
       
       <blockquote itemprop="reviewBody">
         "As a healthcare organization, trust and credibility are everything. Their AI SEO approach 
         helped us become the go-to authority in our field. We're now cited by medical journals 
         and referenced by AI engines like ChatGPT regularly."
       </blockquote>
       
       <div class="reviewer-info" itemprop="author" itemscope itemtype="https://schema.org/Person">
         <img src="/testimonials/dr-lisa-rodriguez.jpg" alt="Dr. Lisa Rodriguez" itemprop="image">
         <div class="reviewer-details">
           <cite itemprop="name">Dr. Lisa Rodriguez</cite>
           <span itemprop="jobTitle">Chief Medical Officer</span>
           <span class="company" itemprop="worksFor">Metropolitan Health System</span>
           <div class="company-info">Leading Healthcare Provider</div>
         </div>
       </div>
       
       <div class="testimonial-metrics">
         <div class="metric">
           <span class="metric-value">500%</span>
           <span class="metric-label">Authority Score Increase</span>
         </div>
         <div class="metric">
           <span class="metric-value">50+</span>
           <span class="metric-label">Media Citations</span>
         </div>
         <div class="metric">
           <span class="metric-value">12 months</span>
           <span class="metric-label">To Market Leadership</span>
         </div>
       </div>
     </div>
   </div>
 </div>
 
 <div class="testimonial-summary">
   <div class="overall-rating">
     <div class="rating-display">
       <span class="rating-number">4.9</span>
       <div class="stars">★★★★★</div>
       <span class="rating-label">Average Client Rating</span>
     </div>
     <div class="rating-breakdown">
       <div class="rating-bar">
         <span class="rating-level">5 stars</span>
         <div class="bar"><div class="fill" style="width: 92%"></div></div>
         <span class="percentage">92%</span>
       </div>
       <div class="rating-bar">
         <span class="rating-level">4 stars</span>
         <div class="bar"><div class="fill" style="width: 8%"></div></div>
         <span class="percentage">8%</span>
       </div>
       <div class="rating-bar">
         <span class="rating-level">3 stars</span>
         <div class="bar"><div class="fill" style="width: 0%"></div></div>
         <span class="percentage">0%</span>
       </div>
     </div>
   </div>
   
   <div class="client-stats">
     <div class="stat-item">
       <span class="stat-number">98%</span>
       <span class="stat-label">Client Retention Rate</span>
     </div>
     <div class="stat-item">
       <span class="stat-number">500+</span>
       <span class="stat-label">Successful Projects</span>
     </div>
     <div class="stat-item">
       <span class="stat-number">9.2/10</span>
       <span class="stat-label">Net Promoter Score</span>
     </div>
   </div>
 </div>
 
 <div class="testimonial-verification">
   <p><strong>Verified Reviews:</strong> All testimonials are from real clients and have been verified. 
   Client consent obtained for use of names and company information.</p>
   <a href="/case-studies" class="cta-link">View Detailed Case Studies →</a>
 </div>
</section>

<!-- Industry recognition and awards -->
<section class="industry-recognition">
 <h2>Industry Recognition & Awards</h2>
 
 <div class="awards-grid">
   <div class="award-item">
     <img src="/awards/sej-top-agency.png" alt="Search Engine Journal Top Agency">
     <div class="award-info">
       <h3>Top SEO Agency 2024</h3>
       <p>Search Engine Journal</p>
       <span class="award-year">2024</span>
     </div>
   </div>
   
   <div class="award-item">
     <img src="/awards/marketing-excellence.png" alt="Marketing Excellence Award">
     <div class="award-info">
       <h3>Digital Marketing Excellence</h3>
       <p>Marketing Awards Council</p>
       <span class="award-year">2023</span>
     </div>
   </div>
   
   <div class="award-item">
     <img src="/awards/best-seo-innovation.png" alt="SEO Innovation Award">
     <div class="award-info">
       <h3>SEO Innovation Award</h3>
       <p>BrightonSEO Conference</p>
       <span class="award-year">2023</span>
     </div>
   </div>
 </div>
 
 <div class="media-mentions">
   <h3>Featured In</h3>
   <div class="media-logos">
     <img src="/media/search-engine-journal.png" alt="Search Engine Journal">
     <img src="/media/moz.png" alt="Moz">
     <img src="/media/search-engine-land.png" alt="Search Engine Land">
     <img src="/media/marketing-land.png" alt="Marketing Land">
     <img src="/media/entrepreneur.png" alt="Entrepreneur">
     <img src="/media/forbes.png" alt="Forbes">
   </div>
 </div>
</section>

<!-- Client logos and case studies -->
<section class="client-showcase">
 <h2>Trusted by Industry Leaders</h2>
 
 <div class="client-categories">
   <div class="client-category">
     <h3>Fortune 500 Companies</h3>
     <div class="client-logos">
       <img src="/clients/microsoft-logo.png" alt="Microsoft">
       <img src="/clients/adobe-logo.png" alt="Adobe">
       <img src="/clients/salesforce-logo.png" alt="Salesforce">
       <img src="/clients/oracle-logo.png" alt="Oracle">
     </div>
   </div>
   
   <div class="client-category">
     <h3>High-Growth Startups</h3>
     <div class="client-logos">
       <img src="/clients/startup1-logo.png" alt="TechStartup 1">
       <img src="/clients/startup2-logo.png" alt="TechStartup 2">
       <img src="/clients/startup3-logo.png" alt="TechStartup 3">
       <img src="/clients/startup4-logo.png" alt="TechStartup 4">
     </div>
   </div>
   
   <div class="client-category">
     <h3>Healthcare & Professional Services</h3>
     <div class="client-logos">
       <img src="/clients/healthcare1-logo.png" alt="Healthcare Provider 1">
       <img src="/clients/law-firm-logo.png" alt="Law Firm">
       <img src="/clients/consulting-logo.png" alt="Consulting Firm">
       <img src="/clients/finance-logo.png" alt="Financial Services">
     </div>
   </div>
 </div>
 
 <div class="client-stats-summary">
   <p><strong>Client Portfolio:</strong> 500+ successful projects across 50+ industries, 
   with a 98% client retention rate and average 247% increase in organic traffic.</p>
 </div>
</section>

<!-- Schema markup for reviews and ratings -->
<script type="application/ld+json">
{
 "@context": "https://schema.org",
 "@type": "Organization",
 "name": "Your Company Name",
 "aggregateRating": {
   "@type": "AggregateRating",
   "ratingValue": "4.9",
   "reviewCount": "127",
   "bestRating": "5",
   "worstRating": "4"
 },
 "review": [
   {
     "@type": "Review",
     "author": {
       "@type": "Person",
       "name": "Sarah Johnson"
     },
     "reviewRating": {
       "@type": "Rating",
       "ratingValue": "5",
       "bestRating": "5"
     },
     "reviewBody": "Working with this team increased our organic traffic by 312% in just 8 months. Their AI-optimized SEO approach delivered results we never thought possible."
   }
 ]
}
</script>`
     }
   });
 }
 
 // Check for external validation and media mentions
 const mediaIndicators = [
   /featured in/i,
   /mentioned in/i,
   /quoted by/i,
   /interviewed by/i,
   /published in/i,
   /appeared on/i,
   /cited by/i,
   /recognized by/i
 ];
 
 const mediaMatches = mediaIndicators.filter(indicator => 
   pageData.textContent.match(indicator)
 ).length;
 
 if (mediaMatches < 1) {
   issues.push({
     type: 'limited-external-validation',
     severity: 'low',
     description: 'No external validation or media mentions found - missed authority building opportunity',
     fix: {
       title: 'Add External Validation and Media Mentions',
       description: 'External validation from reputable sources helps AI engines assess credibility and industry recognition.',
       code: `<!-- External validation section -->
<section class="external-validation">
 <h2>Industry Recognition & Media Coverage</h2>
 
 <div class="validation-categories">
   <div class="media-coverage">
     <h3>Featured In Major Publications</h3>
     <div class="media-mentions">
       <div class="mention-item">
         <img src="/media/search-engine-journal-logo.png" alt="Search Engine Journal">
         <div class="mention-details">
           <h4>Search Engine Journal</h4>
           <p>"Expert Analysis: How AI is Revolutionizing SEO"</p>
           <a href="https://searchenginejournal.com/ai-seo-expert-analysis" target="_blank" rel="noopener">
             Read Article →
           </a>
           <span class="mention-date">January 2024</span>
         </div>
       </div>
       
       <div class="mention-item">
         <img src="/media/moz-logo.png" alt="Moz">
         <div class="mention-details">
           <h4>Moz Blog</h4>
           <p>"Case Study: 300% Traffic Increase Through AI Optimization"</p>
           <a href="https://moz.com/blog/ai-optimization-case-study" target="_blank" rel="noopener">
             Read Case Study →
           </a>
           <span class="mention-date">December 2023</span>
         </div>
       </div>
       
       <div class="mention-item">
         <img src="/media/forbes-logo.png" alt="Forbes">
         <div class="mention-details">
           <h4>Forbes</h4>
           <p>"The Future of SEO: Insights from Leading Practitioners"</p>
           <a href="https://forbes.com/future-seo-insights" target="_blank" rel="noopener">
             Read Article →
           </a>
           <span class="mention-date">November 2023</span>
         </div>
       </div>
     </div>
   </div>
   
   <div class="speaking-engagements">
     <h3>Conference Speaking & Industry Events</h3>
     <div class="speaking-list">
       <div class="speaking-item">
         <div class="event-info">
           <h4>MozCon 2024</h4>
           <p><strong>Keynote:</strong> "AI SEO: Preparing for the Next Decade of Search"</p>
           <span class="event-date">March 2024, Seattle</span>
           <div class="event-stats">
             <span>1,200+ attendees</span> | 
             <span>Rated 4.8/5</span> | 
             <span>50K+ video views</span>
           </div>
         </div>
       </div>
       
       <div class="speaking-item">
         <div class="event-info">
           <h4>BrightonSEO 2023</h4>
           <p><strong>Workshop:</strong> "Implementing AI-First SEO Strategies"</p>
           <span class="event-date">September 2023, Brighton, UK</span>
           <div class="event-stats">
             <span>800+ attendees</span> | 
             <span>Winner: Best Workshop</span> | 
             <span>95% satisfaction rate</span>
           </div>
         </div>
       </div>
       
       <div class="speaking-item">
         <div class="event-info">
           <h4>SearchLove London 2023</h4>
           <p><strong>Presentation:</strong> "Data-Driven Content Strategy for AI Engines"</p>
           <span class="event-date">October 2023, London, UK</span>
           <div class="event-stats">
             <span>600+ attendees</span> | 
             <span>Audience Choice Award</span> | 
             <span>Featured in recap videos</span>
           </div>
         </div>
       </div>
     </div>
   </div>
   
   <div class="thought-leadership">
     <h3>Thought Leadership & Research</h3>
     <div class="research-publications">
       <div class="publication-item">
         <div class="publication-details">
           <h4>"The Impact of AI on Search Behavior: A 2024 Analysis"</h4>
           <p><strong>Published:</strong> Journal of Digital Marketing, Vol. 28, Issue 3</p>
           <p><strong>Citations:</strong> 47 academic citations, featured in 12 industry reports</p>
           <p><strong>Co-authors:</strong> Dr. Michael Smith (Stanford), Prof. Lisa Chen (MIT)</p>
           <a href="https://journal.com/ai-search-behavior-analysis" target="_blank" rel="noopener">
             View Publication →
           </a>
         </div>
       </div>
       
       <div class="publication-item">
         <div class="publication-details">
           <h4>"Enterprise SEO Strategy in the Age of AI"</h4>
           <p><strong>White Paper:</strong> Co-published with Harvard Business Review</p>
           <p><strong>Downloads:</strong> 25,000+ downloads, referenced by Fortune 500 companies</p>
           <p><strong>Recognition:</strong> "Best Research Paper" - Digital Marketing Institute</p>
           <a href="${baseUrl}/whitepapers/enterprise-seo-ai-strategy" target="_blank" rel="noopener">
             Download White Paper →
           </a>
         </div>
       </div>
     </div>
   </div>
   
   <div class="industry-partnerships">
     <h3>Strategic Partnerships & Advisory Roles</h3>
     <div class="partnerships-list">
       <div class="partnership-item">
         <h4>Google Partners Advisory Board</h4>
         <p>Selected as one of 12 global advisors to Google's Partner Program, 
         providing input on search marketing best practices and platform development.</p>
         <span class="partnership-duration">2022 - Present</span>
       </div>
       
       <div class="partnership-item">
         <h4>SEMrush Academy Board Member</h4>
         <p>Contributing to curriculum development for SEO certification programs, 
         helping train the next generation of search marketing professionals.</p>
         <span class="partnership-duration">2023 - Present</span>
       </div>
       
       <div class="partnership-item">
         <h4>Marketing Technology Startup Advisor</h4>
         <p>Advising 8+ marketing technology startups on product development, 
         go-to-market strategy, and industry positioning.</p>
         <span class="partnership-duration">2021 - Present</span>
       </div>
     </div>
   </div>
 </div>
 
 <div class="validation-summary">
   <div class="summary-stats">
     <div class="stat-item">
       <span class="stat-number">50+</span>
       <span class="stat-label">Media Mentions</span>
     </div>
     <div class="stat-item">
       <span class="stat-number">25+</span>
       <span class="stat-label">Conference Presentations</span>
     </div>
     <div class="stat-item">
       <span class="stat-number">100K+</span>
       <span class="stat-label">Content Views</span>
     </div>
     <div class="stat-item">
       <span class="stat-number">15+</span>
       <span class="stat-label">Industry Awards</span>
     </div>
   </div>
   
   <div class="credibility-statement">
     <p><strong>Industry Recognition:</strong> Our expertise is validated by consistent recognition 
     from leading industry publications, speaking opportunities at major conferences, and 
     strategic partnerships with technology leaders. This external validation demonstrates 
     our position as thought leaders in the AI SEO space.</p>
   </div>
 </div>
</section>

<!-- Press kit and media resources -->
<section class="media-resources">
 <h2>Media Resources</h2>
 
 <div class="press-kit">
   <h3>Press Kit & Media Assets</h3>
   <div class="resource-links">
     <a href="${baseUrl}/press-kit" class="resource-link">
       <span class="resource-icon">📄</span>
       <span class="resource-title">Complete Press Kit</span>
       <span class="resource-description">Logos, bios, fact sheets, and high-res photos</span>
     </a>
     
     <a href="${baseUrl}/media-mentions" class="resource-link">
       <span class="resource-icon">📰</span>
       <span class="resource-title">Media Coverage Archive</span>
       <span class="resource-description">Complete list of press mentions and interviews</span>
     </a>
     
     <a href="${baseUrl}/speaking-topics" class="resource-link">
       <span class="resource-icon">🎤</span>
       <span class="resource-title">Speaking Topics</span>
       <span class="resource-description">Available presentation topics and speaker bios</span>
     </a>
   </div>
 </div>
 
 <div class="media-contact">
   <h3>Media Inquiries</h3>
   <p>For interviews, quotes, or expert commentary on AI SEO and digital marketing:</p>
   <p><strong>Media Contact:</strong> <a href="mailto:media@company.com">media@company.com</a></p>
   <p><strong>Response Time:</strong> Within 4 hours during business hours</p>
   <p><strong>Available For:</strong> Interviews, quotes, guest articles, podcast appearances</p>
 </div>
</section>`
     }
   });
 }
 
 return issues;
}

// FINAL UTILITY FUNCTIONS

// Calculate comprehensive AI trust score
function calculateAITrustScore(issues, pageData) {
 let baseScore = 100;
 
 // Apply weighted penalties based on AI trust importance
 issues.forEach(issue => {
   switch (issue.severity) {
     case 'critical':
       baseScore -= 20; // Higher penalty for critical trust issues
       break;
     case 'medium':
       baseScore -= 10; // Moderate penalty
       break;
     case 'low':
       baseScore -= 3;  // Light penalty
       break;
   }
 });
 
 // Bonus points for positive trust indicators
 if (pageData.authorMatches.length > 0) baseScore += 5;
 if (pageData.dateMatches.length > 0) baseScore += 3;
 if (pageData.structuredData.length > 0) baseScore += 5;
 if (pageData.wordCount > 500) baseScore += 2;
 
 return Math.max(0, Math.min(100, Math.round(baseScore)));
}

// Assess authority level based on indicators
function assessAuthorityLevel(pageData, issues) {
 const criticalIssues = issues.filter(i => i.severity === 'critical').length;
 const authorIndicators = pageData.authorMatches.length;
 const contentDepth = pageData.wordCount;
 
 if (criticalIssues === 0 && authorIndicators > 0 && contentDepth > 800) {
   return 'HIGH_AUTHORITY';
 } else if (criticalIssues <= 1 && (authorIndicators > 0 || contentDepth > 500)) {
   return 'MODERATE_AUTHORITY';
 } else {
   return 'LOW_AUTHORITY';
 }
}

// Assess credibility rating
function assessCredibilityRating(issues) {
 const criticalCount = issues.filter(i => i.severity === 'critical').length;
 const mediumCount = issues.filter(i => i.severity === 'medium').length;
 
 if (criticalCount === 0 && mediumCount <= 1) return 'EXCELLENT';
 if (criticalCount === 0 && mediumCount <= 3) return 'GOOD';
 if (criticalCount <= 1 && mediumCount <= 5) return 'FAIR';
 return 'POOR';
}

// Get AI trust grade
function getAITrustGrade(score) {
 if (score >= 90) return 'A+';
 if (score >= 85) return 'A';
 if (score >= 80) return 'A-';
 if (score >= 75) return 'B+';
 if (score >= 70) return 'B';
 if (score >= 65) return 'B-';
 if (score >= 60) return 'C+';
 if (score >= 55) return 'C';
 if (score >= 50) return 'C-';
 if (score >= 45) return 'D+';
 if (score >= 40) return 'D';
 return 'F';
}


// Calculate compliance score (maintaining compatibility with existing app structure)
function calculateComplianceScore(issues) {
  let score = 100;
  
  // Apply penalties based on issue severity
  issues.forEach(issue => {
    switch (issue.severity) {
      case 'critical':
        score -= 20;
        break;
      case 'medium':
        score -= 10;
        break;
      case 'low':
        score -= 3;
        break;
    }
  });
  
  return Math.max(0, Math.min(100, score));
}