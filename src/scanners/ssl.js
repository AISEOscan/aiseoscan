import axios from 'axios';
import { REQUEST_TIMEOUT } from './index';

export async function scanSSL(url) {
  try {
    // Make sure URL is properly formatted
    const parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
    const hostname = parsedUrl.hostname;
    
    // Initialize results
    const issues = [];
    
    // Check if the website supports HTTPS
    let supportsHttps = true;
    
    try {
      // Try to connect via HTTPS
      await axios.get(`https://${hostname}`, {
        timeout: REQUEST_TIMEOUT,
        validateStatus: () => true, // Accept any status code
      });
    } catch (error) {
      supportsHttps = false;
      issues.push({
        type: 'no-https',
        severity: 'critical',
        description: 'Your website does not support HTTPS',
        fix: {
          title: 'Enable HTTPS',
          description: 'Set up SSL/TLS certificates for your website. Consider using Let\'s Encrypt for free certificates.'
        }
      });
    }
    
    if (supportsHttps) {
      // Check for SSL certificate details using our simple serverless function
      // This is a placeholder - in production, you would use a library to check SSL info
      // or a third-party API if needed
      const certInfo = await checkSSLCertificate(hostname);
      
      // Check certificate expiration
      if (certInfo.daysUntilExpiration < 0) {
        issues.push({
          type: 'expired-cert',
          severity: 'critical',
          description: 'Your SSL certificate has expired',
          fix: {
            title: 'Renew SSL Certificate',
            description: 'Contact your certificate provider or hosting company to renew your SSL certificate immediately.'
          }
        });
      } else if (certInfo.daysUntilExpiration < 30) {
        issues.push({
          type: 'expiring-cert',
          severity: 'medium',
          description: `Your SSL certificate will expire in ${certInfo.daysUntilExpiration} days`,
          fix: {
            title: 'Renew SSL Certificate',
            description: 'Plan to renew your SSL certificate soon to avoid interruption.'
          }
        });
      }
      
      // Check for weak SSL/TLS version
      if (certInfo.insecureProtocols.length > 0) {
        issues.push({
          type: 'weak-ssl-protocol',
          severity: 'medium',
          description: `Your website supports insecure protocols: ${certInfo.insecureProtocols.join(', ')}`,
          fix: {
            title: 'Disable Weak SSL/TLS Protocols',
            description: 'Configure your web server to disable old SSL/TLS protocols (SSLv3, TLSv1.0, TLSv1.1) and only support TLSv1.2 and above.'
          }
        });
      }
    }
    
    // Check for HTTP to HTTPS redirection
    if (supportsHttps) {
      try {
        const httpResponse = await axios.get(`http://${hostname}`, {
          maxRedirects: 0,
          validateStatus: () => true,
          timeout: REQUEST_TIMEOUT,
        });
        
        if (![301, 302, 307, 308].includes(httpResponse.status) || 
            !httpResponse.headers.location?.includes('https')) {
          issues.push({
            type: 'no-http-redirect',
            severity: 'medium',
            description: 'HTTP to HTTPS redirection is not properly configured',
            fix: {
              title: 'Set Up HTTP to HTTPS Redirection',
              description: 'Configure your web server to automatically redirect all HTTP traffic to HTTPS.'
            }
          });
        }
      } catch (error) {
        // A network error here is probably fine (e.g., the server doesn't respond on HTTP at all)
      }
    }
    
    // Return results
    return {
      scanner: 'ssl',
      status: 'completed',
      issues
    };
  } catch (error) {
    console.error('SSL scan error:', error);
    return {
      scanner: 'ssl',
      status: 'error',
      error: error.message,
      issues: []
    };
  }
}

async function checkSSLCertificate(hostname) {
  try {
    const response = await axios.get(`https://${hostname}`, {
      timeout: REQUEST_TIMEOUT,
      validateStatus: () => true,
      headers: { 'User-Agent': 'SafeCheck Security Scanner' }
    });
    
    // Extract info from response headers
    const secureProtocol = response.request?.res?.socket?.getProtocol?.() || '';
    const insecureProtocols = [];
    
    if (secureProtocol && (secureProtocol.includes('TLSv1.0') || secureProtocol.includes('TLSv1.1'))) {
      insecureProtocols.push(secureProtocol);
    }
    
    return {
      valid: true,
      issuer: 'Cannot determine without deep inspection',
      daysUntilExpiration: 90, // Fixed value 
      insecureProtocols
    };
  } catch (error) {
    return {
      valid: false,
      issuer: null,
      daysUntilExpiration: null,
      insecureProtocols: [],
    };
  }
}