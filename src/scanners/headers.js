import axios from 'axios';
import { REQUEST_TIMEOUT } from './index';

export async function scanHeaders(url) {
  try {
    // Make sure URL is properly formatted
    const parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
    
    // Fetch headers
    const response = await axios.get(parsedUrl.toString(), {
      validateStatus: () => true, // Accept any status code
      timeout: REQUEST_TIMEOUT,
    });
    
    const headers = response.headers;
    const issues = [];
    // Check for missing security headers
    
    // Content-Security-Policy
    if (!headers['content-security-policy']) {
      issues.push({
        type: 'missing-csp',
        severity: 'medium',
        description: 'Content-Security-Policy header is missing',
        fix: {
          title: 'Add Content-Security-Policy header',
          description: 'Content-Security-Policy helps prevent XSS attacks by specifying which sources of content are allowed.',
          code: `Content-Security-Policy: default-src 'self'; script-src 'self' trusted-scripts.com;`
        }
      });
    }
    
    // X-Frame-Options
    if (!headers['x-frame-options']) {
      issues.push({
        type: 'missing-x-frame-options',
        severity: 'medium',
        description: 'X-Frame-Options header is missing',
        fix: {
          title: 'Add X-Frame-Options header',
          description: 'X-Frame-Options prevents your site from being embedded in frames on other sites, protecting against clickjacking attacks.',
          code: `X-Frame-Options: SAMEORIGIN`
        }
      });
    }
    // X-Content-Type-Options
    if (!headers['x-content-type-options']) {
      issues.push({
        type: 'missing-x-content-type-options',
        severity: 'low',
        description: 'X-Content-Type-Options header is missing',
        fix: {
          title: 'Add X-Content-Type-Options header',
          description: 'X-Content-Type-Options prevents MIME type sniffing which can lead to security vulnerabilities.',
          code: `X-Content-Type-Options: nosniff`
        }
      });
    }
    
    // Strict-Transport-Security (HSTS)
    if (!headers['strict-transport-security']) {
      issues.push({
        type: 'missing-hsts',
        severity: parsedUrl.protocol === 'https:' ? 'medium' : 'low',
        description: 'Strict-Transport-Security header is missing',
        fix: {
          title: 'Add Strict-Transport-Security header',
          description: 'HSTS ensures that browsers always use HTTPS, even if a user tries to use HTTP.',
          code: `Strict-Transport-Security: max-age=31536000; includeSubDomains`
        }
      });
    } else {
      // Check HSTS max-age
      const hstsHeader = headers['strict-transport-security'];
      const maxAgeMatch = hstsHeader.match(/max-age=(\d+)/);
      
      if (maxAgeMatch && parseInt(maxAgeMatch[1]) < 31536000) {
        issues.push({
          type: 'weak-hsts',
          severity: 'low',
          description: 'HSTS max-age is less than recommended (1 year)',
          fix: {
            title: 'Increase HSTS max-age',
            description: 'For better security, set HSTS max-age to at least 1 year (31536000 seconds).',
            code: `Strict-Transport-Security: max-age=31536000; includeSubDomains`
          }
        });
      }
    }
    // X-XSS-Protection
    if (!headers['x-xss-protection']) {
      issues.push({
        type: 'missing-x-xss-protection',
        severity: 'low',
        description: 'X-XSS-Protection header is missing',
        fix: {
          title: 'Add X-XSS-Protection header',
          description: 'X-XSS-Protection enables browser\'s built-in XSS filtering.',
          code: `X-XSS-Protection: 1; mode=block`
        }
      });
    }
    
    // Referrer-Policy
    if (!headers['referrer-policy']) {
      issues.push({
        type: 'missing-referrer-policy',
        severity: 'low',
        description: 'Referrer-Policy header is missing',
        fix: {
          title: 'Add Referrer-Policy header',
          description: 'Referrer-Policy controls how much referrer information is included with requests.',
          code: `Referrer-Policy: strict-origin-when-cross-origin`
        }
      });
    }
    
    // Check for cookies without secure flag
    if (headers['set-cookie'] && headers['set-cookie'].length > 0) {
      const cookies = Array.isArray(headers['set-cookie']) 
        ? headers['set-cookie'] 
        : [headers['set-cookie']];
      
      // Check for various cookie security attributes
      const cookieSecurityCheck = checkCookieSecurity(cookies, parsedUrl);
      issues.push(...cookieSecurityCheck);
    }
    // Check for Vercel WAF if site is hosted on Vercel
    const vercelWAFIssue = checkVercelWAF(headers);
    if (vercelWAFIssue) {
      issues.push(vercelWAFIssue);
    }
// Check for API rate limiting headers
const rateLimitIssues = checkApiRateLimits(headers);
if (rateLimitIssues.length > 0) {
  issues.push(...rateLimitIssues);
}
    
    
    return {
      scanner: 'headers',
      status: 'completed',
      issues
    };
  } catch (error) {
    console.error('Headers scan error:', error);
    return {
      scanner: 'headers',
      status: 'error',
      error: error.message,
      issues: []
    };
  }
}

/**
 * Checks if the site is hosted on Vercel and has WAF protection enabled
 * @param {Object} headers The response headers from the website
 * @returns {Object|null} An issue object if there's a problem, or null
 */
function checkVercelWAF(headers) {
  // Check for Vercel-specific headers
  const isVercelHosted = headers['x-vercel-id'] || 
                       headers['server']?.includes('vercel') || 
                       headers['x-powered-by']?.includes('Vercel');
                       
  if (isVercelHosted) {
    // Check for WAF headers
    const hasWAFEnabled = headers['x-vercel-protection'] || 
                         headers['x-vercel-security'] ||
                         headers['x-vercel-proxy'];
                         
    if (!hasWAFEnabled) {
      return {
        type: 'vercel-missing-waf',
        severity: 'medium',
        description: 'Vercel hosting detected without WAF protection',
        fix: {
          title: 'Enable Vercel WAF Protection',
          description: 'Your site is hosted on Vercel but doesn\'t appear to have WAF (Web Application Firewall) protection enabled. Vercel WAF provides protection against common attacks and can block malicious traffic.',
          code: `1. Go to your Vercel project dashboard
2. Navigate to Settings > Functions
3. Scroll to "Edge Middleware Protection"
4. Enable "Bot Protection (Attach Challenge)"
5. Optionally enable additional protections based on your needs`
        }
      };
    }
  }
  
  return null;
}


function checkCookieSecurity(cookies, parsedUrl) {
  const issues = [];
  
  // Cookies without Secure flag (keep existing check but enhance it)
  const insecureCookies = cookies.filter(cookie => !cookie.includes('secure'));
  if (insecureCookies.length > 0 && parsedUrl.protocol === 'https:') {
    issues.push({
      type: 'insecure-cookies-missing-secure',
      severity: 'medium',
      description: `${insecureCookies.length} cookies are set without the Secure flag`,
      fix: {
        title: 'Add Secure flag to cookies',
        description: 'The Secure flag ensures cookies are only sent over HTTPS connections, protecting them from being stolen over insecure connections.',
        code: `// Example of setting secure cookies in Express.js
res.cookie('cookieName', 'cookieValue', { 
  secure: true,
  httpOnly: true 
});`
      }
    });
  }
  
  // Cookies without HttpOnly flag
  const nonHttpOnlyCookies = cookies.filter(cookie => !cookie.toLowerCase().includes('httponly'));
  if (nonHttpOnlyCookies.length > 0) {
    issues.push({
      type: 'insecure-cookies-missing-httponly',
      severity: 'medium',
      description: `${nonHttpOnlyCookies.length} cookies are set without the HttpOnly flag`,
      fix: {
        title: 'Add HttpOnly flag to cookies',
        description: 'The HttpOnly flag prevents client-side scripts from accessing cookies, which helps protect against cross-site scripting (XSS) attacks.',
        code: `// Example of setting HttpOnly cookies in Express.js
res.cookie('cookieName', 'cookieValue', { 
  httpOnly: true 
});`
      }
    });
  }
  // Cookies without SameSite attribute
  const noSameSiteCookies = cookies.filter(cookie => 
    !cookie.toLowerCase().includes('samesite=strict') && 
    !cookie.toLowerCase().includes('samesite=lax') && 
    !cookie.toLowerCase().includes('samesite=none')
  );
  
  if (noSameSiteCookies.length > 0) {
    issues.push({
      type: 'insecure-cookies-missing-samesite',
      severity: 'medium',
      description: `${noSameSiteCookies.length} cookies are set without the SameSite attribute`,
      fix: {
        title: 'Add SameSite attribute to cookies',
        description: 'The SameSite attribute protects against cross-site request forgery (CSRF) attacks by controlling when cookies are sent with cross-site requests.',
        code: `// Example of setting SameSite cookies in Express.js
res.cookie('cookieName', 'cookieValue', { 
  sameSite: 'strict', // Options: strict, lax, none (requires secure)
  secure: true,
  httpOnly: true 
});`
      }
    });
  }
  
  // Cookies with SameSite=None but without Secure flag (invalid in modern browsers)
  const sameSiteNoneInsecureCookies = cookies.filter(cookie => 
    cookie.toLowerCase().includes('samesite=none') && 
    !cookie.includes('secure')
  );
  
  if (sameSiteNoneInsecureCookies.length > 0) {
    issues.push({
      type: 'insecure-cookies-samesite-none-without-secure',
      severity: 'high',
      description: `${sameSiteNoneInsecureCookies.length} cookies use SameSite=None without the Secure flag`,
      fix: {
        title: 'Add Secure flag to SameSite=None cookies',
        description: 'When using SameSite=None, the Secure flag must also be set. Modern browsers reject SameSite=None cookies that are not secure.',
        code: `// Example of setting SameSite=None cookies in Express.js
res.cookie('cookieName', 'cookieValue', { 
  sameSite: 'none', 
  secure: true,  // Required with SameSite=None
  httpOnly: true 
});`
      }
    });
  }
  // Check for session cookies with long expiration
  const longExpiringSessionCookies = cookies.filter(cookie => {
    // Check if it might be a session cookie by name
    const isLikelySessionCookie = cookie.toLowerCase().includes('session') || 
                               cookie.toLowerCase().includes('auth') || 
                               cookie.toLowerCase().includes('token') ||
                               cookie.toLowerCase().includes('login');
                               
    if (!isLikelySessionCookie) return false;
    
    // Check if max-age or expires is set to a long time
    const maxAgeMatch = cookie.match(/max-age=(\d+)/i);
    if (maxAgeMatch && parseInt(maxAgeMatch[1]) > 86400 * 30) return true; // More than 30 days
    
    const expiresMatch = cookie.match(/expires=([^;]+)/i);
    if (expiresMatch) {
      try {
        const expiryDate = new Date(expiresMatch[1]);
        const daysDifference = (expiryDate - new Date()) / (1000 * 60 * 60 * 24);
        if (daysDifference > 30) return true; // More than 30 days
      } catch (e) {
        // Ignore date parsing errors
      }
    }
    
    return false;
  });
  
  if (longExpiringSessionCookies.length > 0) {
    issues.push({
      type: 'insecure-cookies-long-expiration',
      severity: 'low',
      description: `${longExpiringSessionCookies.length} session-related cookies have long expiration times (>30 days)`,
      fix: {
        title: 'Reduce session cookie expiration time',
        description: 'Session cookies should have short expiration times to reduce the window of opportunity for attacks. Consider using shorter expiration periods for authentication or session cookies.',
        code: `// Example of setting session cookies with reasonable expiration
res.cookie('session', 'value', { 
  maxAge: 3600000, // 1 hour in milliseconds
  secure: true,
  httpOnly: true,
  sameSite: 'lax'
});`
      }
    });
  }
  
  // Check for cookies with weak or missing prefix
  const sessionCookiesWithoutPrefix = cookies.filter(cookie => {
    // Check if it might be a session cookie by name
    const isLikelySessionCookie = cookie.toLowerCase().includes('session') || 
                               cookie.toLowerCase().includes('auth') || 
                               cookie.toLowerCase().includes('token') ||
                               cookie.toLowerCase().includes('login');
                               
    if (!isLikelySessionCookie) return false;
    
    // Check if it has recommended prefixes
    const hasPrefix = cookie.startsWith('__Secure-') || cookie.startsWith('__Host-');
    
    return !hasPrefix;
  });
  
  if (sessionCookiesWithoutPrefix.length > 0 && parsedUrl.protocol === 'https:') {
    issues.push({
      type: 'insecure-cookies-missing-prefix',
      severity: 'low',
      description: `${sessionCookiesWithoutPrefix.length} security-sensitive cookies don't use the __Secure- or __Host- prefixes`,
      fix: {
        title: 'Add secure prefixes to cookies',
        description: 'The __Secure- and __Host- prefixes enhance cookie security. The __Secure- prefix requires the Secure flag, while the __Host- prefix requires Secure, no Domain attribute, and Path=/.',
        code: `// Examples of using cookie prefixes
// __Secure- prefix (requires HTTPS and secure flag)
res.cookie('__Secure-SessionID', 'value', { 
  secure: true, 
  httpOnly: true 
});

// __Host- prefix (requires HTTPS, secure flag, no domain, path=/)
res.cookie('__Host-SessionID', 'value', { 
  secure: true, 
  httpOnly: true, 
  path: '/',
  domain: null
});`
      }
    });
  }
  
  return issues;

  
}
// Add this function after the checkCookieSecurity function
function checkApiRateLimits(headers) {
  const issues = [];

  // Helper to check if the response is likely from an API
function isLikelyApi(headers) {
  // Common API indicators in headers
  const apiIndicators = [
    'application/json',
    'application/xml',
    'application/vnd.api+json',
    'application/hal+json'
  ];
  
  // Check content-type header
  const contentType = headers['content-type'] || '';
  
  // If content type contains any API indicator, it's likely an API
  return apiIndicators.some(indicator => contentType.includes(indicator));
}
  
  // Common rate limit headers to check for
  const rateLimitHeaders = [
    'x-rate-limit',
    'x-ratelimit-limit',
    'x-ratelimit-remaining',
    'x-ratelimit-reset',
    'retry-after',
    'ratelimit-limit',
    'ratelimit-remaining',
    'ratelimit-reset',
    'x-rate-limit-limit',
    'x-rate-limit-remaining',
    'x-rate-limit-reset'
  ];
  
  // Check if any rate limit headers exist
  const foundRateLimitHeaders = rateLimitHeaders.filter(header => 
    headers[header] !== undefined
  );
  
  if (foundRateLimitHeaders.length > 0) {
    issues.push({
      type: 'api-rate-limit-detected',
      severity: 'low', // Informational, not a security issue
      description: `API rate limiting detected via ${foundRateLimitHeaders.join(', ')} headers`,
      fix: {
        title: 'API Rate Limiting Information',
        description: 'This API implements rate limiting, which is a good security practice. Be aware of these limits when integrating with this API.',
        code: foundRateLimitHeaders.map(header => `${header}: ${headers[header]}`).join('\n')
      }
    });
  }
  // If no rate limiting headers were found but we detect it's likely an API
else if (isLikelyApi(headers)) {
  issues.push({
    type: 'missing-api-rate-limit',
    severity: 'medium',
    description: 'No API rate limiting headers detected',
    fix: {
      title: 'Implement API Rate Limiting',
      description: 'This API does not appear to implement rate limiting, which is important for preventing abuse and protecting server resources.',
      code: `# Example rate limit implementation in Express.js:
const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the RateLimit-* headers
  message: "Too many requests, please try again later"
});

// Apply to all API routes
app.use("/api/", apiLimiter);`
    }
  });
}
  
  return issues;
}