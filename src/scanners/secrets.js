import axios from 'axios';
import { REQUEST_TIMEOUT } from './index';

export async function scanForSecrets(url) {
  try {
    // Make sure URL is properly formatted
    const parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
    const baseUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}`;
    
    // Set up issues array
    const issues = [];
    
    // Fetch the main page HTML
    const response = await axios.get(baseUrl, {
      timeout: REQUEST_TIMEOUT,
      validateStatus: () => true,
    });
    
    // Extract script sources from HTML
    const htmlContent = response.data || '';
    
    if (typeof htmlContent !== 'string') {
      return {
        scanner: 'secrets',
        status: 'completed',
        issues
      };
    }
    
    // Get script sources to check
    const scriptSources = extractScriptSources(htmlContent, baseUrl);
    
    // Check client-side scripts for secrets
    await checkScriptsForSecrets(scriptSources, issues);
    
    // Check for common config files
    await checkConfigFiles(baseUrl, issues);
    
    // Check source code for environment variables
    await checkForExposedEnvironmentVariables(baseUrl, issues);
    
    return {
      scanner: 'secrets',
      status: 'completed',
      issues
    };
  } catch (error) {
    console.error('Secrets scan error:', error);
    return {
      scanner: 'secrets',
      status: 'error',
      error: error.message,
      issues: []
    };
  }
}

// Extract script sources from HTML
function extractScriptSources(htmlContent, baseUrl) {
  const scriptRegex = /<script[^>]*src=["']([^"']+)["'][^>]*>/gi;
  const sources = [];
  let match;
  
  while ((match = scriptRegex.exec(htmlContent)) !== null) {
    let src = match[1];
    
    // Convert relative URLs to absolute
    if (src.startsWith('/')) {
      src = baseUrl + src;
    } else if (!src.startsWith('http')) {
      src = baseUrl + '/' + src;
    }
    
    sources.push(src);
  }
  
  // Also check inline scripts
  const inlineScriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
  let inlineMatch;
  
  while ((inlineMatch = inlineScriptRegex.exec(htmlContent)) !== null) {
    if (inlineMatch[1] && inlineMatch[1].trim().length > 0) {
      sources.push({ isInline: true, content: inlineMatch[1] });
    }
  }
  
  return sources;
}

// Check scripts for hardcoded secrets
async function checkScriptsForSecrets(sources, issues) {
  // Regex patterns for various types of secrets
  const secretPatterns = [
    {
      type: 'api-key-generic',
      name: 'Generic API Key',
      regex: /['"`]?((api[_-]?key|apikey|api[_-]?token|access[_-]?token)['":]?\s*[=:]\s*['"`]([a-zA-Z0-9_\-\.]{20,}?)['"`])/gi,
      severity: 'critical'
    },
    {
      type: 'stripe-key',
      name: 'Stripe API Key',
      regex: /['"`]?(pk_live_[a-zA-Z0-9]{24,}|sk_live_[a-zA-Z0-9]{24,}|pk_test_[a-zA-Z0-9]{24,}|sk_test_[a-zA-Z0-9]{24,})['"`]/g,
      severity: 'critical'
    },
    {
      type: 'aws-key',
      name: 'AWS Access Key',
      regex: /['"`]?(AKIA[0-9A-Z]{16})['"`]/g,
      severity: 'critical'
    },
    {
      type: 'google-api-key',
      name: 'Google API Key',
      regex: /['"`]?(AIza[0-9A-Za-z\-_]{35})['"`]/g,
      severity: 'critical'
    },
    {
      type: 'jwt-token',
      name: 'JWT Token',
      regex: /['"`]?ey[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*['"`]/g,
      severity: 'critical'
    },
    {
      type: 'password',
      name: 'Hardcoded Password',
      regex: /['"`]?(password|passwd|pwd)['":]?\s*[=:]\s*['"`]([^'"`\s]{8,})['"`]/gi,
      severity: 'critical'
    },
    {
      type: 'connection-string',
      name: 'Database Connection String',
      regex: /['"`]?(mongodb(\+srv)?:\/\/|mysql:\/\/|postgres:\/\/|postgresql:\/\/)[^'"`\s]+['"`]/g,
      severity: 'critical'
    }
  ];
  
  for (const source of sources) {
    try {
      let content;
      
      if (source.isInline) {
        content = source.content;
      } else {
        // Fetch external script
        const response = await axios.get(source, {
          timeout: REQUEST_TIMEOUT,
          validateStatus: () => true,
        });
        
        content = response.data;
        
        // Skip if not a string (e.g., binary data)
        if (typeof content !== 'string') {
          continue;
        }
      }
      
      // Check each pattern
      for (const pattern of secretPatterns) {
        const matches = content.match(pattern.regex);
        
        if (matches && matches.length > 0) {
          // Get a small snippet of code around the match for context
          // But don't include the full key in the report for security
          const snippets = matches.map(match => {
            let sanitizedMatch = match;
            
            // Mask most of the actual secret value
            if (pattern.type !== 'connection-string') {
              const parts = match.split(/[=:]/);
              if (parts.length > 1) {
                const key = parts[0];
                sanitizedMatch = `${key}="********"`;
              } else {
                sanitizedMatch = sanitizedMatch.substring(0, 10) + '********';
              }
            } else {
              // For connection strings, just show the protocol part
              sanitizedMatch = sanitizedMatch.replace(/(mongodb(\+srv)?:\/\/|mysql:\/\/|postgres:\/\/|postgresql:\/\/)[^'"]*/, '$1********');
            }
            
            return sanitizedMatch;
          });
          
          issues.push({
            type: `exposed-secret-${pattern.type}`,
            severity: pattern.severity,
            description: `${pattern.name} found in ${source.isInline ? 'inline script' : 'external script'}`,
            location: source.isInline ? 'Inline script' : source,
            context: snippets[0], // Include first match as context
            fix: {
              title: `Remove Hardcoded ${pattern.name}`,
              description: `Hardcoded secrets should never be included in client-side JavaScript. Use environment variables and server-side code to handle sensitive data.`,
              code: `// BAD - Hardcoded secret
const apiKey = "your-secret-key-here";

// GOOD - Use environment variables server-side
// Server-side code (Node.js)
const apiKey = process.env.API_KEY;

// Or for client-side, use a secure backend endpoint
// Client-side code
async function fetchProtectedData() {
  const response = await fetch('/api/protected-endpoint');
  return response.json();
}`
            }
          });
        }
      }
    } catch (error) {
      console.error(`Error checking script ${source.isInline ? 'inline' : source}:`, error.message);
    }
  }
}

// Check common config files
async function checkConfigFiles(baseUrl, issues) {
  const configFiles = [
    '/.env',
    '/config.js',
    '/config.json',
    '/configuration.js',
    '/settings.js',
    '/settings.json',
    '/app.config.js',
    '/env.js',
    '/env.json',
    '/secrets.js',
    '/secrets.json',
    '/credentials.js',
    '/credentials.json'
  ];
  
  for (const file of configFiles) {
    try {
      const response = await axios.get(`${baseUrl}${file}`, {
        timeout: REQUEST_TIMEOUT,
        validateStatus: () => true,
      });
      
      if (response.status === 200 && response.data) {
        // Check if it looks like a config file with sensitive data
        const content = typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
        
        const containsSensitiveData = 
          /api[_-]?key|token|secret|password|credential|auth|access[_-]?key/i.test(content);
        
        if (containsSensitiveData) {
          issues.push({
            type: 'exposed-config-file',
            severity: 'critical',
            description: `Configuration file ${file} is publicly accessible and contains sensitive data`,
            location: `${baseUrl}${file}`,
            fix: {
              title: 'Secure Configuration Files',
              description: 'Configuration files with sensitive data should never be accessible from the web. Move them outside the web root or block access with server configuration.',
              code: `# For Apache, add to .htaccess
<Files ~ "\\.(env|config|json)$">
  Order allow,deny
  Deny from all
</Files>

# For Nginx
location ~ \\.(env|config|json)$ {
  deny all;
}`
            }
          });
        }
      }
    } catch (error) {
      // 404 is expected and good - the file shouldn't be accessible
    }
  }
}

// Check for exposed environment variables
async function checkForExposedEnvironmentVariables(baseUrl, issues) {
  // Common paths where environment variables might be exposed
  const paths = [
    '/',
    '/index.html',
    '/main.js',
    '/app.js',
    '/bundle.js',
    '/assets/js/main.js',
    '/assets/js/app.js',
    '/assets/js/bundle.js',
    '/dist/main.js',
    '/dist/app.js',
    '/dist/bundle.js',
  ];
  
  // Regex to find environment variables
  const envVarRegex = /process\.env\.([A-Z0-9_]+)/g;
  const windowEnvRegex = /window\.(env|ENV|_env|_ENV|config|CONFIG)\.([A-Z0-9_]+)/g;
  
  for (const path of paths) {
    try {
      const response = await axios.get(`${baseUrl}${path}`, {
        timeout: REQUEST_TIMEOUT,
        validateStatus: () => true,
      });
      
      if (response.status === 200 && typeof response.data === 'string') {
        const content = response.data;
        
        // Check for exposed environment variables
        let processEnvMatches = [...content.matchAll(envVarRegex)].map(match => match[1]);
        let windowEnvMatches = [...content.matchAll(windowEnvRegex)].map(match => match[2]);
        
        // Filter out common non-sensitive env vars
        const nonSensitiveVars = [
          'NODE_ENV', 'ENV', 'DEBUG', 'REACT_APP_VERSION', 'PUBLIC_URL', 'PORT', 'HOST', 
          'ENVIRONMENT', 'VERSION', 'LOCALE', 'LANG', 'DOMAIN', 'APP_NAME', 'PUBLIC'
        ];
        
        // Keep only potential sensitive vars
        processEnvMatches = processEnvMatches.filter(v => 
          !nonSensitiveVars.includes(v) && 
          /API|KEY|TOKEN|SECRET|PASSWORD|CREDENTIAL|AUTH|PRIVATE/i.test(v)
        );
        
        windowEnvMatches = windowEnvMatches.filter(v => 
          !nonSensitiveVars.includes(v) && 
          /API|KEY|TOKEN|SECRET|PASSWORD|CREDENTIAL|AUTH|PRIVATE/i.test(v)
        );
        
        // Combine matches and remove duplicates
        const matches = [...new Set([...processEnvMatches, ...windowEnvMatches])];
        
        if (matches.length > 0) {
          issues.push({
            type: 'exposed-env-variables',
            severity: 'medium',
            description: `Found potentially sensitive environment variables in client-side code`,
            location: `${baseUrl}${path}`,
            context: `Environment variables found: ${matches.join(', ')}`,
            fix: {
              title: 'Secure Environment Variables',
              description: 'Environment variables containing sensitive information should not be exposed in client-side code. Access sensitive data only from server-side code.',
              code: `// WRONG - Exposing sensitive env vars client-side
const apiKey = process.env.API_KEY;

// RIGHT - Only expose non-sensitive vars with proper prefixes
// In Next.js, use NEXT_PUBLIC_ prefix
// In Create React App, use REACT_APP_ prefix
// For truly sensitive data, access only from server-side code`
            }
          });
        }
      }
    } catch (error) {
      // Ignore 404 errors or connection issues
    }
  }
}