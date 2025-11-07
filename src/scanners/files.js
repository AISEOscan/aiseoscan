import axios from 'axios';
import { REQUEST_TIMEOUT } from './index';

export async function scanExposedFiles(url) {
  try {
    // Make sure URL is properly formatted
    const parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
    const baseUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}`;
    
    console.log(`🔍 FILES SCAN: Starting for ${baseUrl} at ${new Date().toISOString()}`);
    
    // CONSISTENCY FIX: Add cache-busting headers
    const consistentHeaders = {
      'User-Agent': `FounderScan-Files-${Date.now()}`,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Accept': '*/*'
    };
    
    // Enhanced sensitive files list with detailed fix instructions
    const filesToCheck = [
      { 
        path: '/.env', 
        severity: 'critical', 
        description: 'Environment configuration file exposed',
        fix: {
          title: 'Secure Environment Files',
          description: 'Environment files contain sensitive information like API keys, database credentials, and secrets. They should never be accessible via web requests.',
          code: `# Method 1: Add to .htaccess (Apache)
<Files ~ "^\\.env">
    Order allow,deny
    Deny from all
</Files>

# Method 2: Nginx configuration
location ~ /\\.env {
    deny all;
    return 404;
}

# Method 3: Move outside web root
# Move .env file to parent directory outside public folder
# Update your application to load from ../env

# Method 4: Remove from web directory entirely
rm .env  # After backing up to secure location`
        }
      },
      { 
        path: '/.git/config', 
        severity: 'critical', 
        description: 'Git configuration exposed',
        fix: {
          title: 'Block Git Directory Access',
          description: 'Git directories contain your entire source code history, including potentially sensitive information, deleted files, and commit messages.',
          code: `# Apache .htaccess
<DirectoryMatch "^\\.git">
    Order allow,deny
    Deny from all
</DirectoryMatch>

# Alternative Apache method
RedirectMatch 404 /\\.git

# Nginx configuration
location ~ /\\.git {
    deny all;
    return 404;
}

# Best practice: Don't deploy .git to production
# Use deployment scripts that exclude .git:
rsync -av --exclude='.git' /local/path/ user@server:/web/path/`
        }
      },
      { 
        path: '/.git/HEAD', 
        severity: 'critical', 
        description: 'Git repository exposed',
        fix: {
          title: 'Remove Git Repository from Web Root',
          description: 'The entire .git directory is exposed, revealing your source code, commit history, and potentially sensitive data.',
          code: `# Immediate fix - Block access
<DirectoryMatch "^\\.git">
    Order allow,deny
    Deny from all
</DirectoryMatch>

# Long-term solution - Remove from production
# 1. Use proper deployment process
git archive --format=tar HEAD | tar -x -C /path/to/deployment

# 2. Or use rsync excluding .git
rsync -av --exclude='.git' --exclude='node_modules' /source/ /destination/

# 3. For automated deployment, consider using:
# - GitHub Actions with deployment keys
# - GitLab CI/CD
# - Deploy scripts that clone to temp and copy files`
        }
      },
      { 
        path: '/wp-config.php', 
        severity: 'critical', 
        description: 'WordPress configuration file exposed',
        fix: {
          title: 'Secure WordPress Configuration',
          description: 'wp-config.php contains database credentials, security keys, and other sensitive WordPress settings.',
          code: `# Apache .htaccess (add to WordPress root)
<Files "wp-config.php">
    Order allow,deny
    Deny from all
</Files>

# Alternative: Move wp-config.php outside web root
# 1. Move wp-config.php to parent directory
mv wp-config.php ../wp-config.php
# WordPress will automatically find it one level up

# Nginx configuration
location ~ /wp-config\\.php {
    deny all;
    return 404;
}

# Additional WordPress security
<Files ~ "\\.(htaccess|htpasswd|ini|log|sh|sql|conf)$">
    Order allow,deny
    Deny from all
</Files>`
        }
      },
      { 
        path: '/config.php', 
        severity: 'critical', 
        description: 'Configuration file exposed',
        fix: {
          title: 'Protect Configuration Files',
          description: 'Configuration files often contain database credentials, API keys, and other sensitive application settings.',
          code: `# Apache .htaccess
<Files "config.php">
    Order allow,deny
    Deny from all
</Files>

# Block all config files
<FilesMatch "^(config|configuration|settings)\\.(php|json|xml|yml|yaml|ini)$">
    Order allow,deny
    Deny from all
</FilesMatch>

# Nginx configuration  
location ~ /(config|configuration|settings)\\.(php|json|xml|yml|yaml|ini)$ {
    deny all;
    return 404;
}

# Best practice: Store config outside web root
# Move sensitive config files to ../config/ directory
# Use environment variables for sensitive data`
        }
      },
      { 
        path: '/.htaccess', 
        severity: 'medium', 
        description: 'Apache .htaccess file exposed',
        fix: {
          title: 'Protect .htaccess Files',
          description: '.htaccess files control server behavior and may reveal security configurations, redirects, and server structure.',
          code: `# Apache configuration (in main server config or virtual host)
<Files ~ "^\\.htaccess">
    Order allow,deny
    Deny from all
</Files>

# This should be the default behavior, but ensure it's set
# Add to your main .htaccess or server configuration:
<FilesMatch "^\\.(htaccess|htpasswd)$">
    Order allow,deny
    Deny from all
</FilesMatch>

# If using Apache 2.4+:
<FilesMatch "^\\.(htaccess|htpasswd)$">
    Require all denied
</FilesMatch>`
        }
      },
      { 
        path: '/phpinfo.php', 
        severity: 'medium', 
        description: 'PHP information file exposed',
        fix: {
          title: 'Remove PHP Info Files',
          description: 'phpinfo() reveals detailed server configuration, installed modules, environment variables, and system information that could help attackers.',
          code: `# Immediate action: Delete the file
rm phpinfo.php
rm info.php
rm test.php

# If you need phpinfo for debugging, protect it:
<Files "phpinfo.php">
    Order allow,deny
    Allow from 127.0.0.1
    Allow from YOUR.IP.ADDRESS.HERE
    Deny from all
</Files>

# Better approach: Use temporary files
# Create phpinfo only when needed:
<?php
// Only show phpinfo to specific IPs
if (in_array($_SERVER['REMOTE_ADDR'], ['127.0.0.1', 'YOUR.IP.HERE'])) {
    phpinfo();
} else {
    http_response_code(404);
    echo 'Not found';
}
?>`
        }
      },
      { 
        path: '/info.php', 
        severity: 'medium', 
        description: 'PHP information file exposed',
        fix: {
          title: 'Remove Debug Information Files',
          description: 'Debug and info files expose sensitive server configuration and should not be accessible in production.',
          code: `# Remove all debug files
rm info.php phpinfo.php test.php debug.php

# Block access to common debug files
<FilesMatch "^(info|phpinfo|test|debug)\\.php$">
    Order allow,deny
    Deny from all
</FilesMatch>

# Nginx equivalent
location ~ ^/(info|phpinfo|test|debug)\\.php$ {
    deny all;
    return 404;
}

# For development environments only:
# Use environment-specific access control
if ($_SERVER['SERVER_NAME'] === 'localhost' || 
    $_SERVER['SERVER_NAME'] === 'dev.yoursite.com') {
    // Allow phpinfo only in development
    phpinfo();
}`
        }
      },
      { 
        path: '/database.yml', 
        severity: 'critical', 
        description: 'Database configuration file exposed',
        fix: {
          title: 'Secure Database Configuration',
          description: 'Database configuration files contain connection strings, usernames, passwords, and database structure information.',
          code: `# Apache .htaccess
<FilesMatch "\\.(yml|yaml|json|ini|conf)$">
    Order allow,deny
    Deny from all
</FilesMatch>

# Nginx configuration
location ~ \\.(yml|yaml|json|ini|conf)$ {
    deny all;
    return 404;
}

# Best practices:
# 1. Move config files outside web root
mv database.yml ../config/database.yml

# 2. Use environment variables instead
# DATABASE_URL=mysql://user:pass@host:port/dbname

# 3. Restrict file permissions
chmod 600 ../config/database.yml
chown www-data:www-data ../config/database.yml`
        }
      },
      { 
        path: '/credentials.json', 
        severity: 'critical', 
        description: 'Credentials file exposed',
        fix: {
          title: 'Secure Credential Files',
          description: 'Credential files contain API keys, passwords, tokens, and other authentication information.',
          code: `# Immediate: Remove from web directory
mv credentials.json ../secure/credentials.json

# Block access to credential files
<FilesMatch "(credentials|auth|secrets|keys)\\.(json|xml|yml|yaml|txt)$">
    Order allow,deny
    Deny from all
</FilesMatch>

# Nginx equivalent
location ~ (credentials|auth|secrets|keys)\\.(json|xml|yml|yaml|txt)$ {
    deny all;
    return 404;
}

# Secure storage alternatives:
# 1. Environment variables
export API_KEY="your-key-here"

# 2. Encrypted key management
# Use tools like HashiCorp Vault, AWS Secrets Manager
# 3. Restrict permissions
chmod 600 /path/to/credentials.json`
        }
      },
      { 
        path: '/backup.sql', 
        severity: 'critical', 
        description: 'Database backup exposed',
        fix: {
          title: 'Secure Database Backups',
          description: 'Database backups contain all your application data, user information, and potentially sensitive records.',
          code: `# Immediate: Remove from web directory
rm backup.sql backup*.sql *.sql

# Block access to backup files
<FilesMatch "\\.(sql|dump|backup|bak)$">
    Order allow,deny
    Deny from all
</FilesMatch>

# Nginx configuration
location ~ \\.(sql|dump|backup|bak)$ {
    deny all;
    return 404;
}

# Proper backup practices:
# 1. Store backups outside web root
mkdir -p /backups/database
chmod 700 /backups

# 2. Automate secure backups
#!/bin/bash
# backup-script.sh
mysqldump -u user -p database > /backups/database/backup-$(date +%Y%m%d).sql
chmod 600 /backups/database/*.sql

# 3. Use encrypted backups for sensitive data
mysqldump database | gzip | gpg --encrypt -r admin@yoursite.com > backup.sql.gz.gpg`
        }
      },
      { 
        path: '/backup.zip', 
        severity: 'critical', 
        description: 'Backup archive exposed',
        fix: {
          title: 'Secure Backup Archives',
          description: 'Backup archives may contain complete copies of your application, including source code, configurations, and data.',
          code: `# Remove backup files from web directory
rm backup.zip backup.tar.gz backup.tar site-backup.*
find . -name "*.backup" -delete
find . -name "*backup*" -type f -delete

# Block access to archive files
<FilesMatch "\\.(zip|tar|gz|rar|7z|backup|bak)$">
    Order allow,deny
    Deny from all
</FilesMatch>

# Nginx configuration
location ~ \\.(zip|tar|gz|rar|7z|backup|bak)$ {
    deny all;
    return 404;
}

# Secure backup strategy:
# 1. Store backups in separate, secure location
mkdir -p /secure-backups
chmod 700 /secure-backups

# 2. Use automated backup with proper exclusions
tar --exclude='./backups' --exclude='./.git' \\
    --exclude='./node_modules' \\
    -czf /secure-backups/site-$(date +%Y%m%d).tar.gz .`
        }
      },
      { 
        path: '/backup.tar.gz', 
        severity: 'critical', 
        description: 'Compressed backup exposed',
        fix: {
          title: 'Remove Exposed Backup Archives',
          description: 'Compressed backups often contain complete site copies with sensitive data.',
          code: `# Find and remove all backup archives
find . -name "*.tar.gz" -path "./backup*" -delete
find . -name "*.zip" -path "./backup*" -delete  
rm -f backup.* site-backup.* website-backup.*

# Comprehensive backup file blocking
<FilesMatch "(backup|archive|dump|export).*\\.(zip|tar|gz|bz2|xz|rar|7z)$">
    Order allow,deny
    Deny from all
</FilesMatch>

# Additional protection for common backup patterns
<FilesMatch "^(backup|site-backup|www-backup|db-backup)">
    Order allow,deny  
    Deny from all
</FilesMatch>

# Nginx equivalent
location ~ (backup|archive|dump|export).*\\.(zip|tar|gz|bz2|xz|rar|7z)$ {
    deny all;
    return 404;
}`
        }
      },
      { 
        path: '/.ds_store', 
        severity: 'low', 
        description: 'DS_Store file exposed',
        fix: {
          title: 'Remove macOS System Files',
          description: 'DS_Store files are created by macOS and may reveal directory structure and file information.',
          code: `# Remove DS_Store files
find . -name ".DS_Store" -delete

# Prevent future DS_Store files in git
echo ".DS_Store" >> .gitignore
git rm --cached .DS_Store

# Block access via .htaccess
<FilesMatch "^\\.DS_Store$">
    Order allow,deny
    Deny from all
</FilesMatch>

# Nginx configuration
location ~ /\\.DS_Store$ {
    deny all;
    return 404;
}

# Disable DS_Store creation on network volumes (macOS)
defaults write com.apple.desktopservices DSDontWriteNetworkStores true`
        }
      },
      { 
        path: '/robots.txt', 
        severity: 'low', 
        description: 'Robots.txt file available',
        checkContent: true // Special flag for content-based analysis
      }
    ];
    
    // CONSISTENCY FIX: Check all files in parallel with timeout controls
    const fileCheckPromises = filesToCheck.map(async (file, index) => {
      try {
        // Add small staggered delay to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, index * 50));
        
        // CONSISTENCY FIX: Add cache-busting to each request
        const fileUrl = `${baseUrl}${file.path}?_cb=${Date.now()}&_idx=${index}`;
        
        const response = await axios.get(fileUrl, {
          timeout: Math.min(REQUEST_TIMEOUT, 5000), // Cap at 5 seconds per file
          validateStatus: () => true,
          headers: consistentHeaders
        });
        
        // If the file exists (status 200) and has content
        if (response.status === 200 && response.data) {
          
          // Special handling for robots.txt
          if (file.path === '/robots.txt' && file.checkContent) {
            const content = typeof response.data === 'string' ? response.data.toLowerCase() : '';
            
            // Check for potentially sensitive paths being disallowed
            const sensitivePaths = [
              'disallow: /admin', 'disallow: /wp-admin', 'disallow: /backup',
              'disallow: /private', 'disallow: /config', 'disallow: /api',
              'disallow: /test', 'disallow: /dev', 'disallow: /staging'
            ];
            
            const foundSensitive = sensitivePaths.some(path => content.includes(path));
            
            if (foundSensitive) {
              return {
                type: 'sensitive-robots-txt',
                severity: 'low',
                description: 'Robots.txt reveals potentially sensitive directory paths',
                location: file.path,
                fix: {
                  title: 'Review and Optimize Robots.txt',
                  description: 'Your robots.txt file may be inadvertently revealing sensitive directories to search engines and potential attackers.',
                  code: `# Current robots.txt may contain revealing paths like:
# Disallow: /admin
# Disallow: /backup
# Disallow: /private

# Better approach - be less specific:
User-agent: *
Disallow: /

# Only allow specific areas:
Allow: /
Allow: /public/
Allow: /images/
Allow: /css/
Allow: /js/

# Don't reveal sensitive directory names
# Instead of: Disallow: /admin-panel
# Use server-level access control:

# Apache .htaccess for admin areas:
<Directory "/path/to/admin">
    Order allow,deny
    Allow from trusted.ip.address
    Deny from all
</Directory>`
                }
              };
            }
            return null; // Skip the general file exposure check for robots.txt
          }
          
          // For all other files, report as exposed
          console.log(`🚨 FILES SCAN: Found exposed file ${file.path} (${response.status})`);
          return {
            type: `exposed-${file.path.substring(1).replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: file.severity,
            description: file.description,
            location: file.path,
            fix: file.fix
          };
        }
        
        return null; // File not found or not accessible (good)
      } catch (error) {
        // File not found or error accessing it, which is good for security
        console.log(`✅ FILES SCAN: File ${file.path} not accessible (good)`);
        return null;
      }
    });
    
    // CONSISTENCY FIX: Wait for all requests to complete with timeout
    const results = await Promise.allSettled(fileCheckPromises);
    
    // Extract successful results
    const issues = results
      .filter(result => result.status === 'fulfilled' && result.value !== null)
      .map(result => result.value);
    
    console.log(`🔍 FILES SCAN: Completed for ${baseUrl} - found ${issues.length} exposed files`);
    console.log(`📊 FILES SCAN: Issues breakdown:`, {
      critical: issues.filter(i => i.severity === 'critical').length,
      medium: issues.filter(i => i.severity === 'medium').length,
      low: issues.filter(i => i.severity === 'low').length
    });
    
    return {
      scanner: 'exposedFiles',
      status: 'completed',
      issues
    };
  } catch (error) {
    console.error('Exposed files scan error:', error);
    return {
      scanner: 'exposedFiles',
      status: 'error',
      error: error.message,
      issues: []
    };
  }
}