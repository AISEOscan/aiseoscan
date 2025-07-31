import axios from 'axios';
import { REQUEST_TIMEOUT } from './index';

export async function scanForStripeIssues(url) {
  try {
    // Make sure URL is properly formatted
    const parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
    const baseUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}`;
    
    // Fetch the main page HTML
    const response = await axios.get(baseUrl, {
      timeout: REQUEST_TIMEOUT,
      validateStatus: () => true,
      headers: {
        'User-Agent': 'FounderScan Security Scanner',
        'Accept': 'text/html,application/xhtml+xml,application/xml'
      }
    });
    
    const html = response.data || '';
    const issues = [];
    
    // FIRST: Check if the site actually uses Stripe before running tests
    const hasStripeIntegration = detectStripeUsage(html);
    
    if (!hasStripeIntegration) {
      // No Stripe detected - return clean result without running intrusive tests
      return {
        scanner: 'stripe',
        status: 'completed',
        issues: [],
        hasStripe: false
      };
    }

    // Enhanced Stripe key detection patterns
    const stripePatterns = {
      publishableTest: /pk_test_[a-zA-Z0-9]{24,}/g,
      publishableLive: /pk_live_[a-zA-Z0-9]{24,}/g,
      secretTest: /sk_test_[a-zA-Z0-9]{24,}/g,
      secretLive: /sk_live_[a-zA-Z0-9]{24,}/g,
      restrictedTest: /rk_test_[a-zA-Z0-9]{24,}/g,
      restrictedLive: /rk_live_[a-zA-Z0-9]{24,}/g,
      webhookSecret: /whsec_[a-zA-Z0-9]{32,}/g
    };
    
    // 1. Check for exposed Stripe API keys in HTML
    const allMatches = checkForStripeKeys(html, stripePatterns);
    
    // Process secret key exposures (CRITICAL)
    if (allMatches.secretTest.length > 0 || allMatches.secretLive.length > 0) {
      issues.push({
        type: 'exposed-stripe-secret-key',
        severity: 'critical',
        description: 'Stripe secret key exposed in client-side code - IMMEDIATE SECURITY RISK',
        location: 'HTML source code',
        fix: {
          title: 'URGENT: Revoke and Replace Secret Key',
          description: 'Your Stripe secret key is exposed publicly, giving anyone full access to your Stripe account. This is a critical security breach that must be fixed immediately.',
          code: `// IMMEDIATE ACTIONS REQUIRED:

1. REVOKE THE EXPOSED KEY IMMEDIATELY:
   • Go to Stripe Dashboard > Developers > API Keys
   • Find the exposed key and click "Delete" or "Revoke"
   • Generate a new secret key

2. NEVER put secret keys in client-side code:
   ❌ WRONG - Client-side exposure:
   <script>
     const stripe = Stripe('sk_test_...');  // NEVER DO THIS!
   </script>

   ✅ CORRECT - Server-side only:
   // Client-side (public key only)
   const stripe = Stripe('pk_test_...');

   // Server-side only (Node.js example)
   const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

3. USE ENVIRONMENT VARIABLES:
   # .env file (server-side only)
   STRIPE_SECRET_KEY=sk_test_your_new_key_here
   STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key

4. REVIEW ALL TRANSACTIONS:
   • Check Stripe Dashboard for unauthorized transactions
   • Review webhook endpoints and API calls
   • Monitor for suspicious activity`
        }
      });
    }

    // Check for webhook secret exposure (CRITICAL)
    if (allMatches.webhookSecret.length > 0) {
      issues.push({
        type: 'exposed-webhook-secret',
        severity: 'critical',
        description: 'Stripe webhook secret exposed in client-side code',
        location: 'HTML source code',
        fix: {
          title: 'Secure Webhook Secret',
          description: 'Webhook secrets should never be exposed in client-side code as they are used to verify webhook authenticity.',
          code: `// IMMEDIATE ACTION: Regenerate webhook secret
// 1. Go to Stripe Dashboard > Developers > Webhooks
// 2. Select your webhook endpoint
// 3. Click "Reveal" next to signing secret, then "Roll" to generate new

// ❌ WRONG - Client-side exposure:
const webhookSecret = 'whsec_...';  // NEVER expose this!

// ✅ CORRECT - Server-side only:
// Environment variable
STRIPE_WEBHOOK_SECRET=whsec_your_new_secret

// Server-side verification (Node.js)
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const sig = req.headers['stripe-signature'];

try {
  const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  // Process webhook...
} catch (err) {
  console.log('Webhook signature verification failed:', err.message);
  return res.status(400).send('Webhook Error');
}`
        }
      });
    }

    // Check for test keys in production environment (MEDIUM)
    const isProdEnvironment = !parsedUrl.hostname.includes('localhost') && 
                             !parsedUrl.hostname.includes('127.0.0.1') &&
                             !parsedUrl.hostname.includes('test') &&
                             !parsedUrl.hostname.includes('staging') &&
                             !parsedUrl.hostname.includes('dev') &&
                             !parsedUrl.hostname.includes('preview');

    if (isProdEnvironment && (allMatches.publishableTest.length > 0 || allMatches.secretTest.length > 0)) {
      issues.push({
        type: 'stripe-test-key-in-production',
        severity: 'medium',
        description: 'Stripe test keys detected in production environment',
        location: 'Production website',
        fix: {
          title: 'Use Production Stripe Keys',
          description: 'Test keys should only be used in development/staging. Production sites must use live keys to process real payments.',
          code: `// Environment-specific key configuration:

// Development/Testing
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

// Production
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...

// Implementation example:
const stripePublishableKey = process.env.NODE_ENV === 'production' 
  ? process.env.STRIPE_LIVE_PUBLISHABLE_KEY 
  : process.env.STRIPE_TEST_PUBLISHABLE_KEY;

// Client-side initialization:
const stripe = Stripe(stripePublishableKey);

// Deployment checklist:
// ✅ Update environment variables
// ✅ Test payment flow with live keys
// ✅ Verify webhook endpoints
// ✅ Update any hardcoded test keys`
        }
      });
    }

    // 2. Check for Stripe.js on non-HTTPS (CRITICAL)
    if (parsedUrl.protocol === 'http:' && html.includes('stripe.com/v3')) {
      issues.push({
        type: 'stripe-without-https',
        severity: 'critical',
        description: 'Stripe.js loaded on non-HTTPS page - Stripe requires HTTPS',
        location: 'Website protocol',
        fix: {
          title: 'Enable HTTPS for Stripe Integration',
          description: 'Stripe requires HTTPS for all pages using Stripe.js to ensure payment data security.',
          code: `// HTTPS is required for Stripe.js - here's how to enable it:

1. OBTAIN SSL CERTIFICATE:
   • Let's Encrypt (free): certbot --nginx -d yourdomain.com
   • Commercial SSL: Purchase from CA (Cloudflare, Namecheap, etc.)
   • CDN SSL: Use Cloudflare or similar service

2. CONFIGURE SERVER (Apache):
<VirtualHost *:443>
    ServerName yourdomain.com
    DocumentRoot /var/www/html
    
    SSLEngine on
    SSLCertificateFile /path/to/certificate.crt
    SSLCertificateKeyFile /path/to/private.key
    SSLCertificateChainFile /path/to/chain.crt
</VirtualHost>

3. CONFIGURE SERVER (Nginx):
server {
    listen 443 ssl;
    server_name yourdomain.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    location / {
        root /var/www/html;
    }
}

4. FORCE HTTPS REDIRECT:
# Apache .htaccess
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}`
        }
      });
    }

    // 3. Check for JavaScript files to scan (only if Stripe is detected)
    const scriptSources = extractScriptSources(html, baseUrl);
    
    // 4. Scan JavaScript files for Stripe keys
    for (const scriptSrc of scriptSources) {
      try {
        const scriptResponse = await axios.get(scriptSrc, {
          timeout: REQUEST_TIMEOUT,
          validateStatus: () => true,
          headers: {
            'User-Agent': 'FounderScan Security Scanner',
            'Accept': 'application/javascript, text/javascript'
          }
        });
        
        if (scriptResponse.status === 200 && scriptResponse.data) {
          const scriptContent = typeof scriptResponse.data === 'string' ? scriptResponse.data : '';
          const scriptMatches = checkForStripeKeys(scriptContent, stripePatterns);
          
          // Report any secret keys found in JavaScript files
          if (scriptMatches.secretTest.length > 0 || scriptMatches.secretLive.length > 0) {
            issues.push({
              type: 'exposed-stripe-secret-key-js',
              severity: 'critical',
              description: `Stripe secret key found in JavaScript file`,
              location: scriptSrc,
              fix: {
                title: 'Remove Secret Key from JavaScript',
                description: 'Secret keys must never be included in client-side JavaScript files.',
                code: `// The exposed file: ${scriptSrc}
// Contains secret key(s) that must be removed immediately

// SECURE IMPLEMENTATION:
// 1. Remove all secret keys from client-side files
// 2. Move payment processing to server-side endpoints
// 3. Use only publishable keys in client-side code

// Client-side (safe):
const stripe = Stripe('pk_test_...');  // Only publishable keys

// Server-side payment processing:
app.post('/create-payment-intent', async (req, res) => {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
  });
  
  res.send({
    client_secret: paymentIntent.client_secret
  });
});`
              }
            });
          }
        }
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (error) {
        // Continue scanning other scripts if one fails
        continue;
      }
    }

    // 5. Check for webhook implementation issues (ONLY if Stripe is confirmed)
    const webhookIssues = await checkWebhookSecurity(baseUrl, html);
    issues.push(...webhookIssues);

    // 6. Check for Stripe Elements security best practices
    const elementsIssues = checkStripeElementsSecurity(html);
    issues.push(...elementsIssues);

    return {
      scanner: 'stripe',
      status: 'completed',
      issues,
      hasStripe: true
    };
  } catch (error) {
    console.error('Stripe scan error:', error);
    return {
      scanner: 'stripe',
      status: 'error',
      error: error.message,
      issues: []
    };
  }
}

// NEW: Function to detect if a site actually uses Stripe
function detectStripeUsage(html) {
  if (!html || typeof html !== 'string') {
    return false;
  }
  
  // Check for clear Stripe indicators
  const stripeIndicators = [
    'stripe.com/v3',              // Stripe.js library
    'js.stripe.com',              // Stripe CDN
    'stripe.createToken',         // Stripe API calls
    'stripe.createPaymentMethod', // Stripe API calls
    'stripe.confirmCardPayment',  // Stripe API calls
    'stripe.redirectToCheckout',  // Stripe Checkout
    'stripe.elements',            // Stripe Elements
    'pk_test_',                   // Stripe publishable test key
    'pk_live_',                   // Stripe publishable live key
    'data-stripe-key',           // Stripe key in HTML attributes
    'checkout.stripe.com',        // Stripe Checkout
    'payment-element',            // Stripe Payment Element
    'card-element'               // Stripe Card Element
  ];
  
  // Check if any Stripe indicators are present
  const hasStripeIndicators = stripeIndicators.some(indicator => 
    html.toLowerCase().includes(indicator.toLowerCase())
  );
  
  // Additional check for payment-related terms with Stripe context
  if (hasStripeIndicators) {
    return true;
  }
  
  // Check for payment forms that might use Stripe (more conservative)
  const paymentFormIndicators = [
    'payment',
    'checkout',
    'billing',
    'subscribe',
    'donation'
  ];
  
  const hasPaymentForms = paymentFormIndicators.some(indicator =>
    html.toLowerCase().includes(indicator)
  );
  
  // Only return true if we have both payment context AND some Stripe-related content
  if (hasPaymentForms) {
    const stripeRelatedTerms = [
      'stripe',
      'card-number',
      'card-expiry',
      'card-cvc',
      'payment-element'
    ];
    
    return stripeRelatedTerms.some(term => 
      html.toLowerCase().includes(term.toLowerCase())
    );
  }
  
  return false;
}

// Helper function to check for Stripe keys in content
function checkForStripeKeys(content, patterns) {
  const matches = {};
  
  for (const [type, pattern] of Object.entries(patterns)) {
    matches[type] = content.match(pattern) || [];
  }
  
  return matches;
}

// Helper function to extract script sources
function extractScriptSources(html, baseUrl) {
  const scriptRegex = /<script[^>]*src=["']([^"']+)["'][^>]*>/gi;
  const scripts = [];
  let match;
  
  while ((match = scriptRegex.exec(html)) !== null) {
    let scriptSrc = match[1];
    
    // Convert relative URLs to absolute
    if (scriptSrc.startsWith('/')) {
      scriptSrc = `${baseUrl}${scriptSrc}`;
    } else if (!scriptSrc.startsWith('http')) {
      scriptSrc = `${baseUrl}/${scriptSrc}`;
    }
    
    // Only scan same-origin scripts to avoid scanning third-party CDNs
    if (scriptSrc.includes(new URL(baseUrl).hostname)) {
      scripts.push(scriptSrc);
    }
  }
  
  return scripts;
}

// Enhanced webhook security checks (ONLY run if Stripe is detected)
async function checkWebhookSecurity(baseUrl, html) {
  const issues = [];
  
  // Only check webhooks if there's clear evidence of Stripe usage
  if (!html.includes('stripe') && !html.includes('webhook')) {
    return issues;
  }
  
  // Check for common webhook endpoints
  const webhookPaths = ['/webhook', '/stripe-webhook', '/webhooks/stripe', '/api/webhook'];
  
  for (const path of webhookPaths) {
    try {
      const response = await axios.post(`${baseUrl}${path}`, 
        { test: 'data' },
        {
          timeout: 5000, // Shorter timeout to avoid hanging
          validateStatus: () => true,
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'FounderScan Security Scanner'
          }
        }
      );
      
      // If we get a response that doesn't indicate signature verification
      if (response.status === 200 || (response.status >= 400 && response.status < 500)) {
        const responseText = typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
        
        if (!responseText.includes('signature') && !responseText.includes('Stripe-Signature')) {
          issues.push({
            type: 'unverified-webhook-endpoint',
            severity: 'medium',
            description: `Webhook endpoint ${path} may not be verifying Stripe signatures`,
            location: `${baseUrl}${path}`,
            fix: {
              title: 'Implement Webhook Signature Verification',
              description: 'Always verify webhook signatures to prevent attackers from sending fake webhooks to your endpoint.',
              code: `// Secure webhook implementation:

// Node.js/Express example:
const express = require('express');
const app = express();

// Use raw body parser for webhooks
app.use('/webhook', express.raw({type: 'application/json'}));

app.post('/webhook', (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  let event;
  
  try {
    // Verify the webhook signature
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.log('Webhook signature verification failed:', err.message);
    return res.status(400).send('Webhook Error: Invalid signature');
  }
  
  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful!');
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      console.log('PaymentMethod was attached to a Customer!');
      break;
    default:
      console.log('Unhandled event type:', event.type);
  }
  
  res.json({received: true});
});

// PHP example:
$payload = @file_get_contents('php://input');
$sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
$endpoint_secret = $_ENV['STRIPE_WEBHOOK_SECRET'];

try {
    $event = \\Stripe\\Webhook::constructEvent(
        $payload, $sig_header, $endpoint_secret
    );
} catch(\\UnexpectedValueException $e) {
    http_response_code(400);
    exit('Invalid payload');
} catch(\\Stripe\\Exception\\SignatureVerificationException $e) {
    http_response_code(400);
    exit('Invalid signature');
}

// Handle the event...`
            }
          });
        }
      }
    } catch (error) {
      // Webhook endpoint not found or not accessible, which is fine
      continue;
    }
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  
  return issues;
}

// Check Stripe Elements security implementation
function checkStripeElementsSecurity(html) {
  const issues = [];
  
  // Check if Stripe Elements is being used
  const hasStripeElements = html.includes('elements.create') || 
                           html.includes('stripe.elements') ||
                           html.includes('elements.mount');
  
  if (hasStripeElements) {
    // Check for proper CSP implementation with Stripe
    if (!html.includes('js.stripe.com') && !html.includes('Content-Security-Policy')) {
      issues.push({
        type: 'missing-stripe-csp',
        severity: 'low',
        description: 'Content Security Policy not configured for Stripe Elements',
        location: 'HTML head section',
        fix: {
          title: 'Configure CSP for Stripe Elements',
          description: 'Add Content Security Policy headers to allow Stripe Elements while maintaining security.',
          code: `<!-- Add to HTML head or configure server headers -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://js.stripe.com; 
               frame-src 'self' https://js.stripe.com https://hooks.stripe.com; 
               connect-src 'self' https://api.stripe.com;">

<!-- Apache server configuration -->
Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://js.stripe.com; frame-src 'self' https://js.stripe.com https://hooks.stripe.com; connect-src 'self' https://api.stripe.com"

<!-- Nginx server configuration -->
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://js.stripe.com; frame-src 'self' https://js.stripe.com https://hooks.stripe.com; connect-src 'self' https://api.stripe.com" always;`
        }
      });
    }
    
    // Check for SRI (Subresource Integrity) on Stripe.js
    if (html.includes('js.stripe.com/v3/') && !html.includes('integrity=')) {
      issues.push({
        type: 'missing-stripe-sri',
        severity: 'low',
        description: 'Stripe.js loaded without Subresource Integrity (SRI)',
        location: 'Script tag loading Stripe.js',
        fix: {
          title: 'Add SRI to Stripe.js',
          description: 'Use Subresource Integrity to ensure the Stripe.js library hasn\'t been tampered with.',
          code: `<!-- Add integrity attribute to Stripe.js script tag -->
<script src="https://js.stripe.com/v3/" 
        integrity="sha384-[current-sri-hash]" 
        crossorigin="anonymous"></script>

<!-- Check Stripe's documentation for current SRI hash -->
<!-- Or use a service like https://www.srihash.org/ -->

<!-- Note: Stripe regularly updates their library, so you'll need to -->
<!-- update the integrity hash when they release updates -->`
        }
      });
    }
  }
  
  return issues;
}