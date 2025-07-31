import axios from 'axios';
import { REQUEST_TIMEOUT } from './index';

export async function scanForOWASPVulnerabilities(url) {
  try {
    // Make sure URL is properly formatted
    const parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
    const baseUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}`;
    
    console.log(`Starting OWASP scan for: ${baseUrl}`);
    
    // Fetch the main page HTML with consistent headers
    const response = await axios.get(baseUrl, {
      timeout: REQUEST_TIMEOUT,
      validateStatus: () => true,
      headers: {
        'User-Agent': 'SafeCheck Security Scanner',
        'Accept': 'text/html,application/xhtml+xml,application/xml',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    });
    
    // Ensure we have a string to work with
    const html = typeof response.data === 'string' ? response.data : '';
    const issues = [];
    // 1. Check for XSS vulnerabilities in forms
    const forms = findForms(html);
    console.log(`OWASP scan - Found ${forms.length} forms`);
    
    if (forms.length > 0) {
      // Check for input validation attributes and anti-XSS measures
      // Use more reliable detection patterns
      const hasInputValidation = html.includes('pattern=') || 
                               html.includes(' required') || // Space before to avoid matching unrelated text
                               html.includes(' maxlength=') ||
                               html.includes('minlength=');
                               
      const hasAntiXSS = html.includes('htmlspecialchars') || 
                        html.includes('escapeHTML') || 
                        html.includes('sanitize') ||
                        html.includes('escape(') ||
                        html.includes('.encode');
      
      // Only report if we're reasonably confident
      if (!hasInputValidation && !hasAntiXSS && forms.length >= 1) {
        issues.push({
          type: 'potential-xss',
          severity: 'medium',
          description: 'Forms detected without apparent input validation',
          fix: {
            title: 'Implement Input Validation',
            description: 'Add client-side validation to forms and ensure server-side validation and output escaping is implemented.',
            code: `<!-- Example of form with validation -->\n<input type="text" name="username" pattern="[A-Za-z0-9]+" required maxlength="50">`
          }
        });
      }
      
      // Check for CSRF protection with more patterns
      const hasCSRFToken = html.includes('csrf') || 
                          html.includes('_token') || 
                          html.includes('authenticity_token') ||
                          html.includes('anti-forgery') ||
                          html.includes('xsrf') ||
                          /nonce=["'][a-zA-Z0-9]+["']/.test(html);
      
      // Only report if we're reasonably confident
      if (!hasCSRFToken && forms.length > 0 && forms.some(form => form.includes('method="post"') || form.includes("method='post'"))) {
        issues.push({
          type: 'potential-csrf',
          severity: 'medium',
          description: 'Forms may lack CSRF protection',
          fix: {
            title: 'Add CSRF Protection',
            description: 'Implement CSRF tokens in all forms to prevent cross-site request forgery attacks.',
            code: `<!-- Example CSRF token -->\n<input type="hidden" name="csrf_token" value="UNIQUE_TOKEN_HERE">`
          }
        });
      }
    }
    // 2. Check for potentially injectable parameters in URL
    const injectableParams = findInjectableParams(parsedUrl.toString());
    if (injectableParams.length > 0) {
      issues.push({
        type: 'injectable-params',
        severity: 'medium',
        description: `URL contains potentially injectable parameters: ${injectableParams.join(', ')}`,
        fix: {
          title: 'Validate URL Parameters',
          description: 'Ensure all URL parameters are validated and sanitized on the server side.',
        }
      });
      console.log(`OWASP scan - Found injectable parameters: ${injectableParams.join(', ')}`);
    }
    
    // 3. Check for JavaScript libraries with known vulnerabilities
    // Use a more deterministic approach
    try {
      const jsLibraries = findJavaScriptLibraries(html);
      console.log(`OWASP scan - Found ${jsLibraries.length} JavaScript libraries`);
      
      // Check each library against our list of vulnerable versions
      const vulnerableLibraries = checkVulnerableLibraries(jsLibraries);
      
      if (vulnerableLibraries.length > 0) {
        console.log(`OWASP scan - Found ${vulnerableLibraries.length} vulnerable libraries`);
        
        vulnerableLibraries.forEach(lib => {
          issues.push({
            type: 'vulnerable-library',
            severity: 'medium',
            description: `Potentially vulnerable JavaScript library detected: ${lib.name} ${lib.version}`,
            fix: {
              title: 'Update JavaScript Library',
              description: `Update ${lib.name} to the latest version to fix known security vulnerabilities.`
            }
          });
        });
      }
    } catch (error) {
      console.error('Error checking JavaScript libraries:', error.message);
      // Continue with other checks - don't fail the entire scan
    }
    // 4. Check for insecure cookies (already covered in headers.js, but we'll do a basic check here)
    if (response.headers['set-cookie']) {
      const cookies = Array.isArray(response.headers['set-cookie']) 
        ? response.headers['set-cookie'] 
        : [response.headers['set-cookie']];
      
      const httpOnlyCookies = cookies.filter(cookie => !cookie.toLowerCase().includes('httponly'));
      
      if (httpOnlyCookies.length > 0) {
        issues.push({
          type: 'insecure-cookies-httponly',
          severity: 'medium',
          description: `${httpOnlyCookies.length} cookies are set without the HttpOnly flag`,
          fix: {
            title: 'Add HttpOnly Flag to Cookies',
            description: 'The HttpOnly flag prevents client-side scripts from accessing cookies, reducing the risk of XSS attacks stealing session cookies.'
          }
        });
        console.log(`OWASP scan - Found ${httpOnlyCookies.length} cookies without HttpOnly flag`);
      }
    }
    
    // 5. Check for directory listing
    // Improved to use less requests and be more consistent
    // Only check two directories to avoid rate limiting
    try {
      // Check only the most common directories to limit requests
      const dirsToCheck = ['/images', '/uploads'];
      
      // Make the requests in sequence with slight delay to avoid rate limiting
      for (const dir of dirsToCheck) {
        const dirUrl = `${baseUrl}${dir}`;
        console.log(`OWASP scan - Checking directory listing for: ${dirUrl}`);
        
        try {
          const dirResponse = await axios.get(dirUrl, {
            timeout: REQUEST_TIMEOUT,
            validateStatus: () => true,
            headers: {
              'User-Agent': 'SafeCheck Security Scanner',
              'Accept': 'text/html,application/xhtml+xml'
            }
          });
          
          // Check for common directory listing signatures
          const responseData = typeof dirResponse.data === 'string' ? dirResponse.data : '';
          const hasDirectoryListing = 
            dirResponse.status === 200 && 
            (responseData.includes('Index of /') || 
             responseData.includes('Directory Listing') ||
             responseData.includes('<title>Index of') ||
             responseData.includes('Parent Directory</a>'));
          
          if (hasDirectoryListing) {
            issues.push({
              type: 'directory-listing',
              severity: 'medium',
              description: `Directory listing is enabled for ${dir}`,
              location: dirUrl,
              fix: {
                title: 'Disable Directory Listing',
                description: 'Disable directory listing in your web server configuration.',
                code: `# For Apache, add to .htaccess\nOptions -Indexes\n\n# For Nginx\nautoindex off;`
              }
            });
            console.log(`OWASP scan - Found directory listing at: ${dirUrl}`);
            
            // Only report one directory listing issue to ensure consistency
            break;
          }
          
          // Add a small delay between requests to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 500));
        } catch (dirError) {
          // Log but continue with other directories
          console.error(`Error checking directory ${dir}:`, dirError.message);
        }
      }
    } catch (dirListingError) {
      console.error('Error during directory listing checks:', dirListingError.message);
      // Continue with scan - don't fail due to directory check errors
    }
    console.log(`OWASP scan completed for ${baseUrl}. Found ${issues.length} issues.`);
    
    return {
      scanner: 'owasp',
      status: 'completed',
      issues
    };
  } catch (error) {
    console.error('OWASP scan error:', error);
    return {
      scanner: 'owasp',
      status: 'error',
      error: error.message,
      issues: []
    };
  }
}

// Helper function to find forms in HTML
function findForms(html) {
  if (!html || typeof html !== 'string') return [];
  
  try {
    const formRegex = /<form[^>]*>([\s\S]*?)<\/form>/gi;
    return (html.match(formRegex) || []);
  } catch (error) {
    console.error('Error finding forms:', error);
    return [];
  }
}

// Helper function to find potentially injectable URL parameters
function findInjectableParams(url) {
  try {
    const parsedUrl = new URL(url);
    const params = parsedUrl.searchParams;
    // Expanded list of suspicious parameters
    const suspiciousParamNames = [
      'id', 'page_id', 'user_id', 'file', 'path', 'query', 'search', 
      'load', 'include', 'url', 'redirect', 'return', 'next', 'src', 
      'dest', 'destination', 'redir', 'data', 'reference', 'ref'
    ];
    
    return Array.from(params.keys()).filter(param => 
      suspiciousParamNames.includes(param.toLowerCase())
    );
  } catch (error) {
    console.error('Error finding injectable parameters:', error);
    return [];
  }
}
// Helper function to find JavaScript libraries
function findJavaScriptLibraries(html) {
  if (!html || typeof html !== 'string') return [];
  
  try {
    const libraries = [];
    
    // Common library patterns - regex improved to be more specific
    const libraryPatterns = [
      { regex: /jquery[.-](\d+\.\d+\.\d+)/i, name: 'jQuery' },
      { regex: /bootstrap[.-](\d+\.\d+\.\d+)/i, name: 'Bootstrap' },
      { regex: /angular[.-](\d+\.\d+\.\d+)/i, name: 'Angular' },
      { regex: /react[.-](\d+\.\d+\.\d+)/i, name: 'React' },
      { regex: /vue[.-](\d+\.\d+\.\d+)/i, name: 'Vue.js' },
      { regex: /lodash[.-](\d+\.\d+\.\d+)/i, name: 'Lodash' },
      { regex: /moment[.-](\d+\.\d+\.\d+)/i, name: 'Moment.js' }
    ];
    
    // Find script sources
    const scriptRegex = /<script[^>]*src=["']([^"']+)["'][^>]*>/gi;
    let match;
    
    while ((match = scriptRegex.exec(html)) !== null) {
      const src = match[1];
      
      // Check for each library pattern
      for (const library of libraryPatterns) {
        const libMatch = src.match(library.regex);
        if (libMatch) {
          libraries.push({
            name: library.name,
            version: libMatch[1],
            src: src
          });
        }
      }
    }
    
    return libraries;
  } catch (error) {
    console.error('Error finding JavaScript libraries:', error);
    return [];
  }
}

// Helper function to check for vulnerable library versions
// This is a very simplified version. In reality, you would use a CVE database
function checkVulnerableLibraries(libraries) {
  try {
    // Define known vulnerable versions - using exact version prefixes for consistency
    const vulnerableVersions = {
      'jQuery': ['1.0.', '1.1.', '1.2.', '1.3.', '1.4.', '1.5.', '1.6.', '1.7.', '1.8.', '1.9.', '1.10.', '1.11.0', '1.12.0', '2.0.', '2.1.0', '2.1.1', '2.1.2', '2.1.3'],
      'Bootstrap': ['2.0.', '2.1.', '2.2.', '2.3.', '3.0.', '3.1.', '3.2.', '3.3.0', '3.3.1', '3.3.2', '3.3.3', '3.3.4', '3.3.5', '3.3.6', '3.3.7'],
      'Angular': ['1.0.', '1.1.', '1.2.', '1.3.', '1.4.', '1.5.', '1.6.0', '1.6.1', '1.6.2', '1.6.3'],
      'React': ['0.13.', '0.14.', '15.0.', '15.1.', '15.2.', '15.3.', '15.4.', '15.5.', '15.6.0'],
      'Vue.js': ['1.0.', '2.0.', '2.1.', '2.2.', '2.3.', '2.4.', '2.5.0', '2.5.1'],
      'Lodash': ['0.', '1.', '2.', '3.', '4.0.', '4.1.', '4.2.', '4.3.', '4.4.', '4.5.', '4.6.', '4.7.', '4.8.', '4.9.', '4.10.', '4.11.', '4.12.', '4.13.'],
      'Moment.js': ['1.', '2.0.', '2.1.', '2.2.', '2.3.', '2.4.', '2.5.', '2.6.', '2.7.', '2.8.', '2.9.', '2.10.', '2.11.', '2.12.', '2.13.', '2.14.', '2.15.']
    };
    
    // Check each library against our vulnerability database
    return libraries.filter(lib => {
      // Skip if we don't have vulnerability data for this library
      if (!vulnerableVersions[lib.name]) return false;
      
      // Check if the library version starts with any of our known vulnerable version prefixes
      return vulnerableVersions[lib.name].some(vulnVersion => 
        lib.version.startsWith(vulnVersion)
      );
    });
  } catch (error) {
    console.error('Error checking vulnerable libraries:', error);
    return [];
  }
}