import axios from 'axios';
import { REQUEST_TIMEOUT } from './index';

// Simplified compliance standards
const COMPLIANCE_STANDARDS = {
  GDPR: {
    REQUIRED_ELEMENTS: ['privacy policy', 'cookie consent', 'data protection'],
    KEYWORDS: ['gdpr', 'privacy', 'data protection', 'cookie', 'consent']
  },
  CCPA: {
    REQUIRED_ELEMENTS: ['do not sell', 'privacy rights', 'california'],
    KEYWORDS: ['ccpa', 'california', 'do not sell', 'privacy rights']
  },
  ACCESSIBILITY: {
    REQUIRED_ELEMENTS: ['alt text', 'aria labels', 'heading structure'],
    KEYWORDS: ['accessibility', 'alt=', 'aria-', 'role=']
  }
};

// Main compliance scanning function
export async function scanCompliance(url) {
  try {
    const parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
    const baseUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}`;
    
    console.log(`Starting compliance scan for: ${baseUrl}`);
    
    const response = await axios.get(baseUrl, {
      timeout: REQUEST_TIMEOUT,
      validateStatus: () => true,
      headers: {
        'User-Agent': 'FounderScan Compliance Bot/1.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    });
    
    const html = typeof response.data === 'string' ? response.data : '';
    const issues = [];
    
    // DEBUG: Log response details
    console.log(`Compliance scan - Response status: ${response.status}`);
    console.log(`Compliance scan - Content length: ${html.length}`);
    console.log(`Compliance scan - Content type: ${response.headers['content-type']}`);
    console.log(`Compliance scan - First 200 chars: ${html.substring(0, 200)}`);
    
    if (!html) {
      console.log('Compliance scan - No HTML content received');
      return {
        scanner: 'compliance',
        status: 'error',
        error: 'Unable to fetch page content',
        issues: []
      };
    }
    
  
    
    if (!html) {
      return {
        scanner: 'compliance',
        status: 'error',
        error: 'Unable to fetch page content',
        issues: []
      };
    }
    
    console.log(`Compliance scan - Retrieved ${html.length} characters`);
    
    // 1. Privacy Policy Analysis
    const privacyIssues = await checkPrivacyPolicy(html, baseUrl);
    issues.push(...privacyIssues);
    
    // 2. Terms of Service Check
    const termsIssues = checkTermsOfService(html);
    issues.push(...termsIssues);
    
    // 3. Contact Information Check
    const contactIssues = checkContactInformation(html);
    issues.push(...contactIssues);
    
    // 4. Cookie Compliance Check
    const cookieIssues = checkCookieCompliance(html);
    issues.push(...cookieIssues);
    
    // 5. GDPR Compliance Check
    const gdprIssues = checkGDPRCompliance(html);
    issues.push(...gdprIssues);
    
    // 6. Accessibility Compliance Check
    const accessibilityIssues = checkAccessibilityCompliance(html);
    issues.push(...accessibilityIssues);
    
    // 7. Business Compliance Check
    const businessIssues = checkBusinessCompliance(html, baseUrl);
    issues.push(...businessIssues);
    
    console.log(`Compliance scan completed for ${baseUrl}. Found ${issues.length} issues.`);
    
    return {
      scanner: 'compliance',
      status: 'completed',
      issues,
      metadata: {
        jurisdiction: detectJurisdiction(html),
        riskLevel: assessComplianceRisk(issues),
        complianceScore: calculateComplianceScore(issues)
      }
    };
  } catch (error) {
    console.error('Compliance scan error:', error);
    return {
      scanner: 'compliance',
      status: 'error',
      error: error.message,
      issues: []
    };
  }
}

// Privacy Policy Analysis
async function checkPrivacyPolicy(html, baseUrl) {
  const issues = [];
  
  const privacyIndicators = [
    'privacy policy', 'privacy notice', 'data protection', 'privacy statement'
  ];
  
  const hasPrivacyLink = privacyIndicators.some(indicator => 
    html.toLowerCase().includes(indicator.toLowerCase())
  );
  
  if (!hasPrivacyLink) {
    issues.push({
      type: 'missing-privacy-policy',
      severity: 'critical',
      description: 'No privacy policy link found - required for GDPR/CCPA compliance',
      fix: {
        title: 'Add Privacy Policy Link',
        description: 'Create and link to a comprehensive privacy policy in your website footer or header.',
        code: `<!-- Add to footer or header -->
<a href="/privacy-policy">Privacy Policy</a>

<!-- Or create a legal links section -->
<div class="legal-links">
  <a href="/privacy-policy">Privacy Policy</a>
  <a href="/terms-of-service">Terms of Service</a>
  <a href="/cookie-policy">Cookie Policy</a>
</div>`
      }
    });
  }
  
  return issues;
}

// Terms of Service Check
function checkTermsOfService(html) {
  const issues = [];
  
  const termsIndicators = [
    'terms of service', 'terms and conditions', 'terms of use', 'tos'
  ];
  
  const hasTermsLink = termsIndicators.some(indicator => 
    html.toLowerCase().includes(indicator.toLowerCase())
  );
  
  if (!hasTermsLink) {
    issues.push({
      type: 'missing-terms-of-service',
      severity: 'medium',
      description: 'No terms of service found - important for legal protection',
      fix: {
        title: 'Add Terms of Service',
        description: 'Create terms of service to protect your business and clarify user responsibilities.',
        code: `<!-- Add terms of service link -->
<a href="/terms-of-service">Terms of Service</a>

<!-- Example terms section -->
<footer>
  <div class="legal-links">
    <a href="/terms">Terms</a>
    <a href="/privacy">Privacy</a>
    <a href="/contact">Contact</a>
  </div>
</footer>`
      }
    });
  }
  
  return issues;
}

// Contact Information Check
function checkContactInformation(html) {
  const issues = [];
  
  // Check for email addresses
  const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const hasEmail = emailPattern.test(html);
  
  // Check for phone numbers
  const phonePatterns = [
    /\+?[\d\s\-\(\)]{10,}/,
    /\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/,
    /tel:/i
  ];
  const hasPhone = phonePatterns.some(pattern => pattern.test(html));
  
  // Check for contact form
  const hasContactForm = html.toLowerCase().includes('contact') && 
                        (html.includes('<form') || html.includes('contact form'));
  
  if (!hasEmail && !hasPhone && !hasContactForm) {
    issues.push({
      type: 'missing-contact-information',
      severity: 'medium',
      description: 'No clear contact information found - required for business transparency',
      fix: {
        title: 'Add Contact Information',
        description: 'Provide multiple ways for users to contact your business.',
        code: `<!-- Contact information section -->
<section class="contact-info">
  <h3>Contact Us</h3>
  <p>Email: <a href="mailto:info@company.com">info@company.com</a></p>
  <p>Phone: <a href="tel:+15551234567">+1 (555) 123-4567</a></p>
  <p>Address: 123 Main St, City, State 12345</p>
</section>

<!-- Or contact form -->
<form action="/contact" method="post">
  <input type="email" name="email" placeholder="Your Email" required>
  <textarea name="message" placeholder="Your Message" required></textarea>
  <button type="submit">Send Message</button>
</form>`
      }
    });
  }
  
  return issues;
}

// Cookie Compliance Check
function checkCookieCompliance(html) {
  const issues = [];
  
  // Check for cookie consent mechanism
  const cookieConsentIndicators = [
    'cookie consent', 'accept cookies', 'cookie banner', 'cookie notice',
    'cookie policy', 'manage cookies'
  ];
  
  const hasCookieConsent = cookieConsentIndicators.some(indicator => 
    html.toLowerCase().includes(indicator.toLowerCase())
  );
  
  // Check for tracking scripts without consent
  const trackingScripts = [
    'google-analytics', 'gtag', 'facebook.net', 'doubleclick'
  ];
  
  const hasTracking = trackingScripts.some(script => 
    html.toLowerCase().includes(script.toLowerCase())
  );
  
  if (hasTracking && !hasCookieConsent) {
    issues.push({
      type: 'missing-cookie-consent',
      severity: 'critical',
      description: 'Tracking scripts detected without cookie consent mechanism',
      fix: {
        title: 'Add Cookie Consent Banner',
        description: 'Implement a cookie consent banner before loading tracking scripts.',
        code: `<!-- Cookie consent banner -->
<div id="cookie-banner" style="position: fixed; bottom: 0; width: 100%; background: #333; color: white; padding: 15px; z-index: 1000;">
  <p>We use cookies to improve your experience. 
    <a href="/cookie-policy" style="color: #ccc;">Learn more</a>
  </p>
  <button onclick="acceptCookies()" style="background: #007cba; color: white; border: none; padding: 10px 20px; margin-left: 10px;">
    Accept
  </button>
</div>

<script>
function acceptCookies() {
  document.getElementById('cookie-banner').style.display = 'none';
  localStorage.setItem('cookiesAccepted', 'true');
  // Load tracking scripts here
  loadAnalytics();
}

function loadAnalytics() {
  // Google Analytics or other tracking scripts
  gtag('config', 'GA_MEASUREMENT_ID');
}

// Check if cookies already accepted
if (localStorage.getItem('cookiesAccepted')) {
  document.getElementById('cookie-banner').style.display = 'none';
  loadAnalytics();
}
</script>`
      }
    });
  }
  
  return issues;
}

// GDPR Compliance Check
function checkGDPRCompliance(html) {
  const issues = [];
  
  const gdprKeywords = [
    'gdpr', 'data protection', 'data subject rights', 'right to be forgotten',
    'data controller', 'legitimate interest'
  ];
  
  const hasGDPRContent = gdprKeywords.some(keyword => 
    html.toLowerCase().includes(keyword.toLowerCase())
  );
  
  if (!hasGDPRContent) {
    issues.push({
      type: 'missing-gdpr-compliance',
      severity: 'medium',
      description: 'No GDPR compliance indicators found - required for EU visitors',
      fix: {
        title: 'Add GDPR Compliance Information',
        description: 'Include GDPR compliance information in your privacy policy and contact forms.',
        code: `<!-- GDPR compliance section -->
<section class="gdpr-compliance">
  <h3>Your Data Rights (GDPR)</h3>
  <p>Under GDPR, you have the right to:</p>
  <ul>
    <li>Access your personal data</li>
    <li>Correct inaccurate data</li>
    <li>Delete your data</li>
    <li>Object to processing</li>
    <li>Data portability</li>
  </ul>
  <p>Contact us at <a href="mailto:privacy@company.com">privacy@company.com</a> to exercise these rights.</p>
</section>

<!-- Add to contact forms -->
<label>
  <input type="checkbox" required>
  I consent to processing my personal data according to the 
  <a href="/privacy-policy">Privacy Policy</a>
</label>`
      }
    });
  }
  
  return issues;
}

// Accessibility Compliance Check
function checkAccessibilityCompliance(html) {
  const issues = [];
  
  // Check for alt text on images
  const imgTags = html.match(/<img[^>]*>/gi) || [];
  let imagesWithoutAlt = 0;
  
  imgTags.forEach(img => {
    if (!img.includes('alt=') || img.includes('alt=""') || img.includes("alt=''")) {
      imagesWithoutAlt++;
    }
  });
  
  if (imagesWithoutAlt > 0) {
    issues.push({
      type: 'images-missing-alt-text',
      severity: 'medium',
      description: `${imagesWithoutAlt} images missing alt text - accessibility violation`,
      fix: {
        title: 'Add Alt Text to Images',
        description: 'Provide descriptive alt text for all images to improve accessibility.',
        code: `<!-- Bad: Missing alt text -->
<img src="photo.jpg">

<!-- Good: Descriptive alt text -->
<img src="photo.jpg" alt="Team meeting in conference room">

<!-- For decorative images -->
<img src="decoration.jpg" alt="" role="presentation">

<!-- For complex images -->
<img src="chart.jpg" alt="Sales increased 25% from Q1 to Q2" longdesc="#chart-description">`
      }
    });
  }
  
  // Check for heading structure
  const h1Tags = html.match(/<h1[^>]*>/gi) || [];
  
  if (h1Tags.length === 0) {
    issues.push({
      type: 'missing-h1-heading',
      severity: 'low',
      description: 'No H1 heading found - important for accessibility and SEO',
      fix: {
        title: 'Add H1 Heading',
        description: 'Include exactly one H1 heading per page that describes the main content.',
        code: `<!-- Add H1 heading to your page -->
<h1>Main Page Title</h1>

<!-- Use proper heading hierarchy -->
<h1>Main Title</h1>
  <h2>Section Title</h2>
    <h3>Subsection Title</h3>
  <h2>Another Section</h2>`
      }
    });
  } else if (h1Tags.length > 1) {
    issues.push({
      type: 'multiple-h1-headings',
      severity: 'low',
      description: `${h1Tags.length} H1 headings found - should have exactly one per page`,
      fix: {
        title: 'Use Single H1 Heading',
        description: 'Use only one H1 heading per page and organize content with H2-H6.',
        code: `<!-- Convert multiple H1s to proper hierarchy -->
<h1>Main Page Title</h1>     <!-- Only one H1 -->
<h2>Section Title</h2>       <!-- Use H2 for sections -->
<h2>Another Section</h2>     <!-- Use H2 for sections -->`
      }
    });
  }
  
  // Check for form labels
  const inputTags = html.match(/<input[^>]*>/gi) || [];
  const labelTags = html.match(/<label[^>]*>/gi) || [];
  
  if (inputTags.length > 0 && labelTags.length === 0) {
    issues.push({
      type: 'forms-missing-labels',
      severity: 'medium',
      description: 'Form inputs found without labels - accessibility violation',
      fix: {
        title: 'Add Labels to Form Inputs',
        description: 'Associate labels with form inputs for better accessibility.',
        code: `<!-- Bad: Input without label -->
<input type="email" placeholder="Email">

<!-- Good: Input with label -->
<label for="email">Email Address:</label>
<input type="email" id="email" name="email">

<!-- Or implicit labeling -->
<label>
  Email Address:
  <input type="email" name="email">
</label>`
      }
    });
  }
  
  return issues;
}

// Check for business-specific compliance requirements
function checkBusinessCompliance(html, baseUrl) {
  const issues = [];
  
  // Check for SSL/HTTPS
  if (baseUrl.startsWith('http://')) {
    issues.push({
      type: 'missing-ssl-certificate',
      severity: 'critical',
      description: 'Website not using HTTPS - security and compliance risk',
      fix: {
        title: 'Install SSL Certificate',
        description: 'Enable HTTPS to protect user data and meet compliance requirements.',
        code: `<!-- Redirect HTTP to HTTPS -->
<!-- Add to .htaccess (Apache) -->
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

<!-- Or use Cloudflare, Let's Encrypt, or hosting provider SSL -->

<!-- Update all internal links to use HTTPS -->
<a href="https://yoursite.com/page">Internal Link</a>

<!-- Use protocol-relative URLs for external resources -->
<script src="//cdn.example.com/script.js"></script>`
      }
    });
  }
  
  // Check for e-commerce compliance (if shopping indicators present)
  const ecommerceIndicators = [
    'add to cart', 'buy now', 'checkout', 'payment', 'shopping cart', 'price'
  ];
  
  const isEcommerce = ecommerceIndicators.some(indicator => 
    html.toLowerCase().includes(indicator.toLowerCase())
  );
  
  if (isEcommerce) {
    const returnPolicyIndicators = ['return policy', 'refund', 'returns'];
    const hasReturnPolicy = returnPolicyIndicators.some(indicator => 
      html.toLowerCase().includes(indicator.toLowerCase())
    );
    
    if (!hasReturnPolicy) {
      issues.push({
        type: 'ecommerce-missing-return-policy',
        severity: 'medium',
        description: 'E-commerce site missing return/refund policy',
        fix: {
          title: 'Add Return Policy',
          description: 'Create a clear return and refund policy for your online store.',
          code: `<!-- Add return policy link -->
<a href="/return-policy">Return & Refund Policy</a>

<!-- Example return policy section -->
<section class="return-policy">
  <h3>Return Policy</h3>
  <p>Items can be returned within 30 days of purchase.</p>
  <p>Items must be in original condition with tags attached.</p>
  <p>Refunds will be processed within 5-7 business days.</p>
  <p>Contact us at returns@company.com to initiate a return.</p>
</section>`
        }
      });
    }
  }
  
  return issues;
}

// Utility function to detect jurisdiction (simplified)
function detectJurisdiction(html) {
  const euIndicators = ['gdpr', 'european', 'eu cookie', 'data protection'];
  const usIndicators = ['ccpa', 'california', 'do not sell'];
  
  const hasEU = euIndicators.some(indicator => 
    html.toLowerCase().includes(indicator.toLowerCase())
  );
  
  const hasUS = usIndicators.some(indicator => 
    html.toLowerCase().includes(indicator.toLowerCase())
  );
  
  if (hasEU) return 'EU';
  if (hasUS) return 'US';
  return 'GLOBAL';
}

// Severity assessment helper
function assessComplianceRisk(issues) {
  const criticalCount = issues.filter(i => i.severity === 'critical').length;
  const mediumCount = issues.filter(i => i.severity === 'medium').length;
  
  if (criticalCount > 0) return 'HIGH_RISK';
  if (mediumCount > 2) return 'MEDIUM_RISK';
  return 'LOW_RISK';
}

// Generate compliance score based on issues
function calculateComplianceScore(issues) {
  let score = 100;
  
  issues.forEach(issue => {
    switch (issue.severity) {
      case 'critical':
        score -= 15;
        break;
      case 'medium':
        score -= 8;
        break;
      case 'low':
        score -= 3;
        break;
    }
  });
  
  return Math.max(0, Math.min(100, score));
}