import axios from 'axios';
import { REQUEST_TIMEOUT } from './index';

export async function scanWordPress(url) {
  try {
    // Make sure URL is properly formatted
    const parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
    const baseUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}`;
    
    // Step 1: Detect if site is running WordPress
    const isWordPress = await detectWordPress(baseUrl);
    
    // If not a WordPress site, return early with empty issues
    if (!isWordPress) {
      return {
        scanner: 'wordpress',
        status: 'completed',
        isWordPress: false,
        issues: []
      };
    }
    
    // Step 2: Run WordPress-specific security checks
    const issues = [];
    
    // Run all checks in parallel for efficiency
    const [
      versionIssues,
      configIssues,
      pluginIssues,
      loginIssues,
      xmlrpcIssues
    ] = await Promise.all([
      checkWPVersion(baseUrl),
      checkWPConfig(baseUrl),
      checkVulnerablePlugins(baseUrl),
      checkLoginSecurity(baseUrl),
      checkXMLRPC(baseUrl)
    ]);
    
    // Combine all issues
    issues.push(...versionIssues, ...configIssues, ...pluginIssues, ...loginIssues, ...xmlrpcIssues);
    
    return {
      scanner: 'wordpress',
      status: 'completed',
      isWordPress: true,
      issues
    };
  } catch (error) {
    console.error('WordPress scan error:', error);
    return {
      scanner: 'wordpress',
      status: 'error',
      error: error.message,
      issues: []
    };
  }
}

// Enhanced WordPress detection with stricter criteria
async function detectWordPress(baseUrl) {
  try {
    let wpScore = 0;
    const requiredScore = 2; // Need at least 2 strong indicators
    
    // Method 1: Check for WP REST API (strongest indicator)
    try {
      const wpJsonResponse = await axios.get(`${baseUrl}/wp-json/wp/v2/`, {
        timeout: REQUEST_TIMEOUT,
        validateStatus: () => true,
      });
      
      if (wpJsonResponse.status === 200 && wpJsonResponse.data) {
        const jsonData = wpJsonResponse.data;
        // Check for WordPress-specific REST API structure
        if (typeof jsonData === 'object' && 
            (jsonData.name || jsonData.description || jsonData.url || 
             (Array.isArray(jsonData) && jsonData.some(item => item && item.slug)))) {
          wpScore += 3; // Strong indicator
        }
      }
    } catch (error) {
      // API not available
    }
    
    // Method 2: Check wp-admin accessibility
    try {
      const adminResponse = await axios.get(`${baseUrl}/wp-admin/`, {
        timeout: REQUEST_TIMEOUT,
        validateStatus: () => true,
        maxRedirects: 1
      });
      
      if (adminResponse.status === 200 || adminResponse.status === 302) {
        const adminContent = adminResponse.data || '';
        if (typeof adminContent === 'string' && 
            (adminContent.includes('wp-admin') || 
             adminContent.includes('WordPress') ||
             adminContent.includes('wp-login.php'))) {
          wpScore += 2; // Strong indicator
        }
      }
    } catch (error) {
      // wp-admin not accessible
    }
    
    // Method 3: Check wp-login.php
    try {
      const loginResponse = await axios.get(`${baseUrl}/wp-login.php`, {
        timeout: REQUEST_TIMEOUT,
        validateStatus: () => true,
      });
      
      if (loginResponse.status === 200) {
        const loginContent = loginResponse.data || '';
        if (typeof loginContent === 'string' && 
            (loginContent.includes('wp-login-php') || 
             loginContent.includes('loginform') ||
             loginContent.includes('WordPress'))) {
          wpScore += 2; // Strong indicator
        }
      }
    } catch (error) {
      // wp-login not accessible
    }
    
    // Method 4: Check home page for WordPress-specific patterns (weaker indicator)
    try {
      const homeResponse = await axios.get(baseUrl, {
        timeout: REQUEST_TIMEOUT,
        validateStatus: () => true,
      });
      
      const htmlContent = homeResponse.data || '';
      if (typeof htmlContent === 'string') {
        let contentScore = 0;
        
        // Check for WordPress-specific file paths
        if (htmlContent.includes('/wp-content/themes/') || 
            htmlContent.includes('/wp-content/plugins/')) {
          contentScore += 1;
        }
        
        // Check for WordPress-specific includes
        if (htmlContent.includes('/wp-includes/js/') || 
            htmlContent.includes('wp-embed.min.js')) {
          contentScore += 1;
        }
        
        // Check for WordPress generator tag (most reliable HTML indicator)
        if (htmlContent.match(/<meta\s+name=["']generator["']\s+content=["']WordPress/i)) {
          contentScore += 2;
        }
        
        // Check for WordPress-specific CSS classes/IDs
        if (htmlContent.includes('wp-block-') || 
            htmlContent.includes('wp-embed-') ||
            htmlContent.match(/class=["'][^"']*wp-/)) {
          contentScore += 0.5;
        }
        
        // Only add content score if we have multiple indicators
        if (contentScore >= 1.5) {
          wpScore += Math.min(contentScore, 2);
        }
      }
    } catch (error) {
      // Home page not accessible
    }
    
    // Method 5: Check for xmlrpc.php (additional confirmation)
    try {
      const xmlrpcResponse = await axios.post(`${baseUrl}/xmlrpc.php`, 
        `<?xml version="1.0"?><methodCall><methodName>system.listMethods</methodName></methodCall>`,
        {
          headers: { 'Content-Type': 'text/xml' },
          timeout: REQUEST_TIMEOUT,
          validateStatus: () => true
        }
      );
      
      if (xmlrpcResponse.status === 200 && 
          typeof xmlrpcResponse.data === 'string' &&
          xmlrpcResponse.data.includes('WordPress')) {
        wpScore += 1; // Additional confirmation
      }
    } catch (error) {
      // XML-RPC not available
    }
    
    // Method 6: Check feed for WordPress generator
    try {
      const feedResponse = await axios.get(`${baseUrl}/feed/`, {
        timeout: REQUEST_TIMEOUT,
        validateStatus: () => true,
      });
      
      if (feedResponse.status === 200) {
        const feedContent = feedResponse.data || '';
        if (typeof feedContent === 'string' && 
            feedContent.includes('wordpress.org/?v=')) {
          wpScore += 1; // Additional confirmation
        }
      }
    } catch (error) {
      // Feed not available
    }
    
    console.log(`WordPress detection score for ${baseUrl}: ${wpScore}/${requiredScore}`);
    return wpScore >= requiredScore;
    
  } catch (error) {
    console.error('WordPress detection error:', error);
    return false;
  }
}

// Check WordPress version for outdated installations
async function checkWPVersion(baseUrl) {
  const issues = [];
  
  try {
    // Try to find version in various ways
    const response = await axios.get(baseUrl, {
      timeout: REQUEST_TIMEOUT,
      validateStatus: () => true,
    });
    
    const htmlContent = response.data || '';
    
    // Method 1: Check generator meta tag
    let version = null;
    const generatorMatch = typeof htmlContent === 'string' ? 
      htmlContent.match(/<meta\s+name=["']generator["']\s+content=["']WordPress\s+([0-9.]+)["']/i) : null;
    
    if (generatorMatch && generatorMatch[1]) {
      version = generatorMatch[1];
    }
    
    // Method 2: Check if version is in RSS feed
    if (!version) {
      try {
        const feedResponse = await axios.get(`${baseUrl}/feed/`, {
          timeout: REQUEST_TIMEOUT,
          validateStatus: () => true,
        });
        
        const feedContent = feedResponse.data || '';
        const feedMatch = typeof feedContent === 'string' ? 
          feedContent.match(/<generator>https:\/\/wordpress\.org\/\?v=([0-9.]+)<\/generator>/i) : null;
        
        if (feedMatch && feedMatch[1]) {
          version = feedMatch[1];
        }
      } catch (error) {
        // Ignore feed errors
      }
    }
    
    // Method 3: Check readme.html
    if (!version) {
      try {
        const readmeResponse = await axios.get(`${baseUrl}/readme.html`, {
          timeout: REQUEST_TIMEOUT,
          validateStatus: () => true,
        });
        
        if (readmeResponse.status === 200) {
          const readmeContent = readmeResponse.data || '';
          const readmeMatch = typeof readmeContent === 'string' ? 
            readmeContent.match(/WordPress.*?Version\s+([0-9.]+)/i) : null;
          
          if (readmeMatch && readmeMatch[1]) {
            version = readmeMatch[1];
            
            // readme.html should not be accessible
            issues.push({
              type: 'wp-exposed-readme',
              severity: 'medium',
              description: 'WordPress readme.html file is publicly accessible',
              location: `${baseUrl}/readme.html`,
              fix: {
                title: 'Block Access to readme.html',
                description: 'This file can reveal your WordPress version. Block access to it via .htaccess or web server configuration.',
                code: `# Add to .htaccess file
<Files readme.html>
  order allow,deny
  deny from all
</Files>`
              }
            });
          }
        }
      } catch (error) {
        // Ignore readme errors
      }
    }
    
    // If version found, check if it's outdated
    if (version) {
      const versionParts = version.split('.').map(v => parseInt(v, 10));
      const [major, minor, patch = 0] = versionParts;
      
      // Current WordPress version as of June 2025 (adjust as needed)
      const currentMajor = 6;
      const currentMinor = 6;
      const currentPatch = 0;
      
      const isOutdated = major < currentMajor || 
                        (major === currentMajor && minor < currentMinor) ||
                        (major === currentMajor && minor === currentMinor && patch < currentPatch);
      
      if (isOutdated) {
        issues.push({
          type: 'wp-outdated-version',
          severity: 'critical',
          description: `Outdated WordPress version ${version} detected`,
          fix: {
            title: 'Update WordPress Core',
            description: `Your WordPress version (${version}) is outdated and may contain security vulnerabilities. Update to the latest version as soon as possible.`,
            code: `# Login to your WordPress admin
# Navigate to Dashboard > Updates
# Click "Update Now"

# Or use WP-CLI:
wp core update`
          }
        });
      }
      
      // Version information is exposed (bad practice)
      if (generatorMatch) {
        issues.push({
          type: 'wp-version-disclosure',
          severity: 'low',
          description: 'WordPress version is publicly disclosed in meta generator tag',
          fix: {
            title: 'Hide WordPress Version',
            description: 'Disclosing your WordPress version makes it easier for attackers to target known vulnerabilities.',
            code: `// Add to your theme's functions.php file
function remove_wp_version_info() {
    remove_action('wp_head', 'wp_generator');
}
add_action('init', 'remove_wp_version_info');`
          }
        });
      }
    }
  } catch (error) {
    console.error('WordPress version check error:', error);
  }
  
  return issues;
}

// Check wp-config.php and other configuration files
async function checkWPConfig(baseUrl) {
  const issues = [];
  
  // Check if wp-config.php or wp-config.php.bak are accessible
  const configFiles = [
    '/wp-config.php',
    '/wp-config.php.bak',
    '/wp-config.php.old',
    '/wp-config.php~',
    '/wp-config.php.save',
    '/.wp-config.php.swp'
  ];
  
  for (const file of configFiles) {
    try {
      const response = await axios.get(`${baseUrl}${file}`, {
        timeout: REQUEST_TIMEOUT,
        validateStatus: () => true,
      });
      
      // Check if file content is returned (likely misconfiguration)
      // A properly configured server should not return wp-config.php content
      if (response.status === 200 && response.data && typeof response.data === 'string') {
        if (response.data.includes('DB_') || response.data.includes('AUTH_KEY') || 
            response.data.includes('SECURE_AUTH_KEY') || response.data.includes('wordpress')) {
          issues.push({
            type: 'wp-exposed-config',
            severity: 'critical',
            description: `WordPress configuration file ${file} is exposed`,
            location: `${baseUrl}${file}`,
            fix: {
              title: 'Block Access to wp-config.php',
              description: 'This file contains sensitive information like database credentials and authentication keys. Block access immediately.',
              code: `# Add to .htaccess file
<Files wp-config.php>
  order allow,deny
  deny from all
</Files>

# Or for Nginx
location ~ ^/wp-config\.php$ {
  deny all;
}`
            }
          });
        }
      }
    } catch (error) {
      // Connection error or 404 - this is good
    }
  }
  
  // Check debug.log
  try {
    const debugLogResponse = await axios.get(`${baseUrl}/wp-content/debug.log`, {
      timeout: REQUEST_TIMEOUT,
      validateStatus: () => true,
    });
    
    if (debugLogResponse.status === 200 && debugLogResponse.data) {
      issues.push({
        type: 'wp-exposed-debug-log',
        severity: 'high',
        description: 'WordPress debug.log file is publicly accessible',
        location: `${baseUrl}/wp-content/debug.log`,
        fix: {
          title: 'Secure debug.log File',
          description: 'This file may contain sensitive information. Disable debugging in production or block access to this file.',
          code: `# Disable debugging in wp-config.php
define('WP_DEBUG', false);
define('WP_DEBUG_LOG', false);
define('WP_DEBUG_DISPLAY', false);

# Add to .htaccess in wp-content directory
<Files debug.log>
  order allow,deny
  deny from all
</Files>`
        }
      });
    }
  } catch (error) {
    // Connection error or 404 - this is good
  }
  
  return issues;
}

// Check for vulnerable plugins and themes
async function checkVulnerablePlugins(baseUrl) {
  const issues = [];
  
  try {
    // Fetch main page to look for plugin paths
    const response = await axios.get(baseUrl, {
      timeout: REQUEST_TIMEOUT,
      validateStatus: () => true,
    });
    
    const htmlContent = response.data || '';
    
    if (typeof htmlContent !== 'string') {
      return issues;
    }
    
    // Find plugin paths in HTML - more specific regex
    const pluginRegex = /\/wp-content\/plugins\/([a-z0-9\-_]+)(?=\/)/gi;
    const matches = [...htmlContent.matchAll(pluginRegex)];
    const pluginSet = new Set();
    
    matches.forEach(match => {
      if (match[1] && match[1].length > 2) { // Avoid false matches
        pluginSet.add(match[1]);
      }
    });
    
    // Limit the number of plugins to check to avoid excessive requests
    const pluginsToCheck = Array.from(pluginSet).slice(0, 10);
    
    // Check readme files for potentially vulnerable plugins
    for (const plugin of pluginsToCheck) {
      try {
        const readmeResponse = await axios.get(`${baseUrl}/wp-content/plugins/${plugin}/readme.txt`, {
          timeout: REQUEST_TIMEOUT,
          validateStatus: () => true,
        });
        
        if (readmeResponse.status === 200 && readmeResponse.data) {
          const readmeContent = readmeResponse.data || '';
          
          // Verify this is actually a WordPress plugin readme
          if (typeof readmeContent === 'string' && 
              (readmeContent.includes('=== ') || readmeContent.includes('Plugin Name'))) {
            
            issues.push({
              type: 'wp-plugin-info-disclosure',
              severity: 'low',
              description: `Plugin ${plugin} has exposed readme.txt file`,
              location: `${baseUrl}/wp-content/plugins/${plugin}/readme.txt`,
              fix: {
                title: 'Protect Plugin Information Files',
                description: 'Exposed readme files reveal plugin versions which can aid attackers.',
                code: `# Add to .htaccess in wp-content/plugins directory
<Files ~ "^readme\\.(txt|html)$">
  order allow,deny
  deny from all
</Files>`
              }
            });
            
            // Check plugin version for common vulnerabilities
            const stableTagMatch = readmeContent.match(/Stable tag:\s*([0-9.]+)/i);
            
            if (stableTagMatch && stableTagMatch[1]) {
              const version = stableTagMatch[1];
              
              // Check if plugin is in our vulnerability database
              if (isVulnerablePlugin(plugin, version)) {
                issues.push({
                  type: 'wp-vulnerable-plugin',
                  severity: 'high',
                  description: `Potentially vulnerable plugin detected: ${plugin} v${version}`,
                  location: `${baseUrl}/wp-content/plugins/${plugin}/`,
                  fix: {
                    title: 'Update Vulnerable Plugin',
                    description: `The ${plugin} plugin (version ${version}) may contain security vulnerabilities. Update to the latest version.`,
                    code: `# Login to WordPress admin panel
# Navigate to Plugins > Installed Plugins
# Update ${plugin} to the latest version`
                  }
                });
              }
            }
          }
        }
      } catch (error) {
        // Ignore errors, likely 404 which is good
      }
    }
    
    // Check for directory browsing in plugins directory
    try {
      const directoryResponse = await axios.get(`${baseUrl}/wp-content/plugins/`, {
        timeout: REQUEST_TIMEOUT,
        validateStatus: () => true,
      });
      
      if (directoryResponse.status === 200 && 
          typeof directoryResponse.data === 'string' &&
          (directoryResponse.data.includes('Index of /') || 
           directoryResponse.data.includes('Directory Listing') ||
           directoryResponse.data.includes('<title>Index of'))) {
        
        issues.push({
          type: 'wp-directory-listing',
          severity: 'medium',
          description: 'Plugin directory listing is enabled',
          location: `${baseUrl}/wp-content/plugins/`,
          fix: {
            title: 'Disable Directory Browsing',
            description: 'Directory browsing allows attackers to see all installed plugins, making it easier to target vulnerable ones.',
            code: `# Add to root .htaccess file
Options -Indexes

# Or for Nginx
location /wp-content/plugins/ {
  autoindex off;
}`
          }
        });
      }
    } catch (error) {
      // Ignore directory check errors
    }
  } catch (error) {
    console.error('Plugin check error:', error);
  }
  
  return issues;
}

// Check login security
async function checkLoginSecurity(baseUrl) {
  const issues = [];
  
  try {
    // Check if login page is accessible
    const loginResponse = await axios.get(`${baseUrl}/wp-login.php`, {
      timeout: REQUEST_TIMEOUT,
      validateStatus: () => true,
    });
    
    if (loginResponse.status === 200 && typeof loginResponse.data === 'string' &&
        loginResponse.data.includes('wp-login')) {
      
      // Check if xmlrpc.php is accessible for brute force attacks
      const xmlrpcCheckResponse = await axios.get(`${baseUrl}/xmlrpc.php`, {
        timeout: REQUEST_TIMEOUT,
        validateStatus: () => true,
      });
      
      if (xmlrpcCheckResponse.status === 200) {
        issues.push({
          type: 'wp-login-bruteforce-risk',
          severity: 'medium',
          description: 'WordPress login is vulnerable to brute force attacks via xmlrpc.php',
          fix: {
            title: 'Protect WordPress Login',
            description: 'Implement login protection by limiting login attempts and disabling XML-RPC if not needed.',
            code: `# Disable XML-RPC - add to .htaccess
<Files xmlrpc.php>
  order deny,allow
  deny from all
</Files>

# Or install a security plugin like Wordfence or Limit Login Attempts`
          }
        });
      }
      
      // Check for admin username enumeration
      try {
        const authorResponse = await axios.get(`${baseUrl}/?author=1`, {
          timeout: REQUEST_TIMEOUT,
          validateStatus: () => true,
          maxRedirects: 1
        });
        
        if (authorResponse.status === 200) {
          const finalUrl = authorResponse.request?.res?.responseUrl || authorResponse.config?.url || '';
          if (typeof finalUrl === 'string' && finalUrl.includes('/author/')) {
            const authorMatch = finalUrl.match(/\/author\/([^\/\?#]+)/);
            if (authorMatch && authorMatch[1]) {
              const authorUsername = decodeURIComponent(authorMatch[1]);
              
              if (authorUsername.toLowerCase() === 'admin') {
                issues.push({
                  type: 'wp-default-admin-user',
                  severity: 'medium',
                  description: 'Default "admin" username is being used',
                  fix: {
                    title: 'Change Default Admin Username',
                    description: 'Using the default "admin" username makes brute force attacks easier. Create a new admin user with a different username and delete the default one.',
                    code: `# Login to WordPress admin
# Go to Users > Add New
# Create new admin user
# Log out and log in as new user
# Delete old "admin" user`
                  }
                });
              }
            }
          }
        }
      } catch (error) {
        // Ignore author enumeration errors
      }
    }
  } catch (error) {
    console.error('Login security check error:', error);
  }
  
  return issues;
}

// Check XML-RPC security
async function checkXMLRPC(baseUrl) {
  const issues = [];
  
  try {
    // Check if xmlrpc.php is accessible
    const response = await axios.post(`${baseUrl}/xmlrpc.php`, 
      `<?xml version="1.0" encoding="iso-8859-1"?>
      <methodCall>
        <methodName>system.listMethods</methodName>
        <params></params>
      </methodCall>`,
      {
        headers: {
          'Content-Type': 'text/xml'
        },
        timeout: REQUEST_TIMEOUT,
        validateStatus: () => true
      }
    );
    
    if (response.status === 200 && 
        typeof response.data === 'string' && 
        response.data.includes('<methodResponse>')) {
      
      // Check if multicall is available (can be used for amplification attacks)
      if (response.data.includes('system.multicall')) {
        issues.push({
          type: 'wp-xmlrpc-multicall',
          severity: 'critical',
          description: 'XML-RPC multicall method is enabled, allowing amplification attacks',
          location: `${baseUrl}/xmlrpc.php`,
          fix: {
            title: 'Disable XML-RPC or Protect Against Amplification Attacks',
            description: 'The XML-RPC multicall method can be used for brute force and DDoS amplification attacks.',
            code: `# Disable XML-RPC completely - add to .htaccess
<Files xmlrpc.php>
  order deny,allow
  deny from all
</Files>

# Or disable in wp-config.php
add_filter('xmlrpc_enabled', '__return_false');

# Or install a security plugin with XML-RPC protection`
          }
        });
      } else if (response.data.includes('<value>')) {
        // XML-RPC is enabled but multicall might not be available
        issues.push({
          type: 'wp-xmlrpc-enabled',
          severity: 'medium',
          description: 'XML-RPC is enabled but may not be needed',
          location: `${baseUrl}/xmlrpc.php`,
          fix: {
            title: 'Disable XML-RPC If Not Used',
            description: 'XML-RPC can be a security risk if not needed. Only enable it if you use mobile apps or other services that require it.',
            code: `# Disable XML-RPC - add to .htaccess
<Files xmlrpc.php>
  order deny,allow
  deny from all
</Files>

# Or add to wp-config.php
add_filter('xmlrpc_enabled', '__return_false');`
          }
        });
      }
    }
  } catch (error) {
    // Error connecting - might be blocked which is good
  }
  
  return issues;
}

// Enhanced vulnerable plugin check with better version comparison
function isVulnerablePlugin(plugin, version) {
  // Updated vulnerable plugin versions (as of June 2025)
  const vulnerablePlugins = {
    'contact-form-7': {
      vulnerableVersions: ['<5.7.0'],
      maxSafeVersion: '5.7.0'
    },
    'wp-super-cache': {
      vulnerableVersions: ['<1.9.0'],
      maxSafeVersion: '1.9.0'
    },
    'woocommerce': {
      vulnerableVersions: ['<7.8.0'],
      maxSafeVersion: '7.8.0'
    },
    'elementor': {
      vulnerableVersions: ['<3.13.0'],
      maxSafeVersion: '3.13.0'
    },
    'wordfence': {
      vulnerableVersions: ['<7.6.0'],
      maxSafeVersion: '7.6.0'
    },
    'all-in-one-seo-pack': {
      vulnerableVersions: ['<4.3.0'],
      maxSafeVersion: '4.3.0'
    },
    'jetpack': {
      vulnerableVersions: ['<12.0.0'],
      maxSafeVersion: '12.0.0'
    },
    'yoast-seo': {
      vulnerableVersions: ['<20.0.0'],
      maxSafeVersion: '20.0.0'
    },
    'wpforms': {
      vulnerableVersions: ['<1.8.0'],
      maxSafeVersion: '1.8.0'
    }
  };
  
  // Check if plugin is in our vulnerability list
  if (vulnerablePlugins[plugin]) {
    const versionObj = vulnerablePlugins[plugin];
    
    // Enhanced version comparison
    const currentVersion = parseVersion(version);
    const safeVersion = parseVersion(versionObj.maxSafeVersion);
    
    return compareVersions(currentVersion, safeVersion) < 0;
  }
  
  return false;
}

// Helper function to parse version strings
function parseVersion(version) {
  return version.split('.').map(num => parseInt(num, 10) || 0);
}

// Helper function to compare version arrays
function compareVersions(version1, version2) {
  const maxLength = Math.max(version1.length, version2.length);
  
  for (let i = 0; i < maxLength; i++) {
    const v1 = version1[i] || 0;
    const v2 = version2[i] || 0;
    
    if (v1 < v2) return -1;
    if (v1 > v2) return 1;
  }
  
  return 0;
}