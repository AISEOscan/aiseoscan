import { jsPDF } from 'jspdf';
import { isSecurityIssue, isSeoIssue, isPerformanceIssue, isComplianceIssue, processMultiDimensionalData } from './categorization';


//  PDF constants for better layout
const PDF_CONSTANTS = {
  PAGE_HEIGHT: 297, // A4 height in mm
  PAGE_WIDTH: 210,  // A4 width in mm
  FOOTER_START: 275, // Footer starts higher to prevent overlap
  SAFE_CONTENT_BOTTOM: 235, // Much more conservative safe area
  CONSERVATIVE_BREAK: 220, // Earlier page break point
  FOOTER_MARGIN: 25, // Larger footer margin
  HEADER_HEIGHT: 35, // Standard header height
  CONTENT_START: 50, // Where main content starts
  CONTENT_WIDTH: 180, // Available content width
  LEFT_MARGIN: 15,
  RIGHT_MARGIN: 15
};


//  text processing without strange symbols
function cleanTextForPDF(text) {
  if (!text) return '';
  
  // Convert to string and normalize
  let cleaned = String(text).normalize('NFD');
  
  // Remove problematic Unicode characters that cause strange symbols
  cleaned = cleaned.replace(/[\u0300-\u036f]/g, ''); // Remove diacritical marks
  cleaned = cleaned.replace(/[^\x20-\x7E\u00A0-\u00FF]/g, ''); // Keep only printable ASCII + Latin-1
  
  // Replace common problematic patterns with safe alternatives
  cleaned = cleaned.replace(/[""]/g, '"'); // Smart quotes to regular quotes
  cleaned = cleaned.replace(/['']/g, "'"); // Smart apostrophes to regular apostrophe
  cleaned = cleaned.replace(/…/g, "..."); // Ellipsis to three dots
  cleaned = cleaned.replace(/–/g, "-"); // En dash to hyphen
  cleaned = cleaned.replace(/—/g, "--"); // Em dash to double hyphen
  cleaned = cleaned.replace(/©/g, "(c)"); // Copyright symbol
  cleaned = cleaned.replace(/®/g, "(R)"); // Registered trademark
  cleaned = cleaned.replace(/™/g, "(TM)"); // Trademark
  cleaned = cleaned.replace(/°/g, " degrees"); // Degree symbol
  cleaned = cleaned.replace(/×/g, "x"); // Multiplication sign
  cleaned = cleaned.replace(/÷/g, "/"); // Division sign
  
  // Remove any remaining problematic characters
  cleaned = cleaned.replace(/[\u2000-\u206F\u2E00-\u2E7F\u3000-\u303F]/g, ' '); // Various Unicode spaces and punctuation
  cleaned = cleaned.replace(/[\uE000-\uF8FF]/g, ''); // Private use area (often icons)
  cleaned = cleaned.replace(/[\uFFF0-\uFFFF]/g, ''); // Specials block
  
  // Clean up multiple spaces
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  
  return cleaned;
}

//  text wrapping that respects PDF boundaries
function safeTextWrap(doc, text, maxWidth, maxLines = null) {
  const cleanedText = cleanTextForPDF(text);
  const lines = doc.splitTextToSize(cleanedText, maxWidth);
  
  if (maxLines && lines.length > maxLines) {
    const truncatedLines = lines.slice(0, maxLines);
    if (maxLines > 0) {
      // Add ellipsis to last line if truncated
      truncatedLines[maxLines - 1] = truncatedLines[maxLines - 1].replace(/(.{0,50}).*/, '$1...');
    }
    return truncatedLines;
  }
  
  return lines;
}


//  Issue card renderer
function renderIssueCard(doc, x, y, width, height, count, severity, timeframe, color) {
  // Card background
  doc.setFillColor(255, 255, 255);
  doc.setGState(doc.GState({opacity: 0.1}));
  doc.roundedRect(x, y, width, height, 6, 6, 'F');
  doc.setGState(doc.GState({opacity: 1}));

  // Card border
  doc.setDrawColor(color[0], color[1], color[2]);
  doc.setGState(doc.GState({opacity: 0.4}));
  doc.setLineWidth(1);
  doc.roundedRect(x, y, width, height, 6, 6, 'S');
  doc.setGState(doc.GState({opacity: 1}));

  // Count
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(color[0], color[1], color[2]);
  doc.setFontSize(28);
  doc.text(count.toString(), x + width/2, y + 25, { align: 'center' });
  
  // Severity
  doc.setFontSize(11);
  doc.text(severity, x + width/2, y + 35, { align: 'center' });
  
  // Timeframe - CHANGED: Make text white instead of gray
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255); // CHANGED: White text instead of gray
  doc.text(timeframe, x + width/2, y + 48, { align: 'center' });
}

export async function generatePdf(reportData) {
  try {
    // Create a new jsPDF instance
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

     doc._reportData = reportData; 
    
    // Updated colors to match the modern gradient blue theme from web interface
    const colors = {
  // Main brand colors (more professional, less cyan)
  primary: [255, 255, 255],           // #ffffff - White for professional look
  secondary: [229, 231, 235],         // #e5e7eb - Light gray secondary
  
  // Severity colors (unchanged - these work well)
  critical: [239, 68, 68],            // #ef4444 - Red-500 for critical
  medium: [245, 158, 11],             // #f59e0b - Amber-500 for medium  
  low: [59, 130, 246],                // #3b82f6 - Blue-500 for low
  
  // Background colors (gradient blue theme)
  darkBg: [31, 41, 55],               // #1f2937 - Gray-800 (main background)
  lightBg: [30, 58, 138],             // #1e3a8a - Blue-800 (gradient end)
  darkPanel: [55, 65, 81],            // #374151 - Gray-700 (panel background)
  cardBg: [75, 85, 99],               // #4b5563 - Gray-600 (card background)
  
  // Text colors (improved contrast)
  text: [255, 255, 255],              // White primary text
  textSecondary: [229, 231, 235],     // #e5e7eb - Gray-200 secondary text
  textMuted: [156, 163, 175],         // #9ca3af - Gray-400 muted text
  
  // Status colors (consistent with web interface)
  success: [34, 197, 94],             // #22c55e - Green-500
  warning: [245, 158, 11],            // #f59e0b - Amber-500
  error: [239, 68, 68],               // #ef4444 - Red-500
  
  // Accent colors (more professional)
  accent: [255, 255, 255],            // #ffffff - White accent
  highlight: [229, 231, 235],         // #e5e7eb - Light gray highlight
  
  // Enhanced gradient colors for modern look
  gradientStart: [31, 41, 55],        // #1f2937 - Gray-800
  gradientEnd: [30, 58, 138],         // #1e3a8a - Blue-800
  
  // Border colors for modern card design
  borderLight: [107, 114, 128],       // #6b7280 - Gray-500
  borderAccent: [255, 255, 255],      // #ffffff - White border
  
  // Code block colors (black background, white text)
  codeBackground: [17, 24, 39],       // #111827 - Very dark gray/black
  codeText: [255, 255, 255],          // #ffffff - White text
  codeBorder: [75, 85, 99],           // #4b5563 - Gray border
};
    
    // Ensure report data has valid structure for comprehensive security report
    if (!reportData) {
      reportData = { 
        url: 'Unknown', 
        summary: {}, 
        issues: [], 
        security: {},
        timestamp: new Date().toISOString()
      };
    }
    
    // Structure security data properly to match report page
    if (!reportData.security) {
      reportData.security = {
        score: reportData.summary?.securityScore || 85,
        total: 0,
        critical: 0,
        medium: 0,
        low: 0,
        issues: []
      };
    }
    
    if (!reportData.summary) {
      reportData.summary = {
        securityScore: reportData.security?.score || 85,
        total: 0,
        critical: 0,
        medium: 0,
        low: 0
      };
    }
    
    // Collect all security issues from scanners (enhanced collection)
    reportData = collectSecurityIssues(reportData);
    
    // Don't calculate security score - use what's already been calculated
// The collectSecurityIssues() function already processed the data with the correct scoring
console.log(`📊 PDF: Using existing security score: ${reportData.security?.score}`);

    // Process issues to enhance code blocks
    if (reportData.security && reportData.security.issues) {
      reportData.security.issues = reportData.security.issues.map(issue => {
        if (issue.fix && issue.fix.code) {
          return {
            ...issue,
            fix: {
              ...issue.fix,
              code: enhanceCodeForFullDisplay(issue.fix.code)
            }
          };
        }
        return issue;
      });
    }
    
    // Generate comprehensive security report pages
    createModernCoverPage(doc, reportData, colors);
    
    doc.addPage();
    createModernExecutiveSummary(doc, reportData, colors);
    
    doc.addPage();
    createSecurityBreakdown(doc, reportData, colors);
    
    doc.addPage();
    createDetailedSecurityFindings(doc, reportData, colors);
    
    doc.addPage();
    createStepByStepFixInstructions(doc, reportData, colors);
    
    doc.addPage();
    createSecurityRecommendations(doc, reportData, colors);
    
    doc.addPage();
    createImplementationGuide(doc, reportData, colors);
    
    // Add modern footers to all pages
    addModernFooters(doc, reportData, colors);
    
    // Return the PDF as a buffer
     return doc.output('arraybuffer');
  } catch (error) {
    console.error('Enhanced PDF generation error:', error);
    throw new Error('Failed to generate enhanced PDF: ' + error.message);
  }
}


// Enhanced security issue collection with improved formatting and deduplication
function collectSecurityIssues(reportData) {
  console.log('Collecting comprehensive security issues for PDF report');
  
  try {
    // Use the centralized processing logic to get properly categorized data
    const processedData = processMultiDimensionalData(reportData);
    
    // Simply use the processed data - don't recalculate anything
    reportData.security = processedData.security;
    reportData.seo = processedData.seo;
    reportData.performance = processedData.performance;
    reportData.compliance = processedData.compliance;
    
    console.log(`✅ PDF: Using security score from categorization: ${reportData.security.score}`);
    
    return reportData;
  } catch (error) {
    console.error('Error in collectSecurityIssues:', error);
    throw error;
  }
}



// Enhance issue with fix instructions if not present
function enhanceIssueWithFix(issue, scannerKey) {
  // If issue already has comprehensive fix instructions, return as-is
  if (issue.fix && issue.fix.title && issue.fix.description) {
    return issue;
  }
  
  // Create enhanced fix based on issue type and scanner
  const enhancedFix = generateClearFixInstructions(issue, scannerKey);
  
  return {
    ...issue,
    fix: enhancedFix
  };
}



function enhanceCodeForFullDisplay(code) {
  if (!code) return '# No implementation steps available';
  
  // Clean up the code formatting
  let lines = code.split('\n');
  
  // Remove excessive empty lines at start and end
  while (lines.length > 0 && lines[0].trim() === '') {
    lines.shift();
  }
  while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
    lines.pop();
  }
  
  // Ensure proper step formatting
  let enhanced = [];
  let stepCounter = 1;
  let inCodeBlock = false;
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    const trimmedLine = line.trim();
    
    // Detect and enhance step headers
    if (trimmedLine.startsWith('#') && 
        trimmedLine.length > 10 && 
        !trimmedLine.toLowerCase().includes('step') &&
        isLikelyStepDescription(trimmedLine)) {
      
      if (enhanced.length > 0) enhanced.push(''); // Add spacing
      enhanced.push(`# Step ${stepCounter}: ${trimmedLine.substring(1).trim()}`);
      stepCounter++;
      
    } else if (trimmedLine.match(/^#\s*Step\s*\d+/i)) {
      // Already a step header
      if (enhanced.length > 0) enhanced.push(''); // Add spacing
      enhanced.push(line);
      
    } else {
      // Regular line
      enhanced.push(line);
    }
  }
  
  return enhanced.join('\n');
}


// Generate comprehensive fix instructions based on issue type
function generateClearFixInstructions(issue, scannerKey) {
  const type = (issue.type || '').toLowerCase();
  
  // Return existing fix if it's already well-formatted
  if (issue.fix && issue.fix.title && issue.fix.description && issue.fix.code) {
    const enhancedCode = enhanceCodeForClearSteps(issue.fix.code);
    return {
      ...issue.fix,
      code: enhancedCode
    };
  }
  
  // Generate fixes with clear step separation
  if (type.includes('ssl') || type.includes('cert')) {
    return {
      title: 'Fix SSL/TLS Configuration',
      description: 'Update your SSL/TLS certificate and configuration to ensure secure connections.',
      code: `# Step 1: Obtain SSL certificate from Let's Encrypt
certbot --nginx -d yourdomain.com

# Step 2: Configure Apache SSL settings
<VirtualHost *:443>
    SSLEngine on
    SSLCertificateFile /path/to/certificate.crt
    SSLCertificateKeyFile /path/to/private.key
    SSLProtocol all -SSLv3 -TLSv1 -TLSv1.1
    SSLCipherSuite ECDHE+AESGCM:ECDHE+AES256:!aNULL:!MD5
</VirtualHost>

# Step 3: Enable HTTPS redirect
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Step 4: Test your SSL configuration
# Visit: https://www.ssllabs.com/ssltest/
# Enter your domain to verify proper SSL setup`
    };
  }
  
  if (type.includes('header') || type.includes('missing-csp') || type.includes('x-frame')) {
    return {
      title: 'Configure Security Headers',
      description: 'Add essential HTTP security headers to protect against common attacks.',
      code: `# Step 1: Apache configuration via .htaccess
Header always set Content-Security-Policy "default-src 'self'; script-src 'self'"
Header always set X-Frame-Options "SAMEORIGIN"
Header always set X-Content-Type-Options "nosniff"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set Strict-Transport-Security "max-age=31536000"

# Step 2: Nginx configuration
add_header Content-Security-Policy "default-src 'self';" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;

# Step 3: Verify headers are working
curl -I https://yourdomain.com

# Step 4: Test with online security header checker
# Visit: https://securityheaders.com/
# Enter your domain to verify all headers are present`
    };
  }
  
  if (type.includes('exposed') || type.includes('config') || type.includes('env')) {
    return {
      title: 'Secure Exposed Files',
      description: 'Block access to sensitive configuration files and move them outside the web root.',
      code: `# Step 1: Block sensitive files with Apache .htaccess
<FilesMatch "\\.(env|config|sql|json|yml|yaml|log|bak)$">
    Order allow,deny
    Deny from all
</FilesMatch>

# Step 2: Block files with Nginx configuration
location ~ \\.(env|config|sql|json|yml|yaml|log|bak)$ {
    deny all;
    return 404;
}

# Step 3: Move files outside web root
mv .env ../config/.env
mv config.php ../config/config.php

# Step 4: Update application to use new paths
# Modify your app to load from ../config/.env

# Step 5: Test file protection
# Try accessing: https://yourdomain.com/.env
# Should return 403 Forbidden or 404 Not Found`
    };
  }

  if (type.includes('stripe')) {
    return {
      title: 'Remove Hardcoded Stripe API Key',
      description: 'Move API keys to environment variables and implement secure server-side handling.',
      code: `# Step 1: Remove hardcoded key from client-side code
# BAD - Never do this in JavaScript:
# const apiKey = "pk_live_your_key_here";

# Step 2: Create environment variables
# Add to .env file:
STRIPE_PUBLISHABLE_KEY=pk_live_your_key_here
STRIPE_SECRET_KEY=sk_live_your_secret_key

# Step 3: Use environment variables server-side (Node.js)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

# Step 4: Create secure API endpoint for client
app.get('/api/stripe-config', (req, res) => {
  res.json({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
  });
});

# Step 5: Revoke exposed keys immediately
# Log into Stripe Dashboard
# Go to Developers > API keys
# Delete the exposed key and generate new ones`
    };
  }

  // Default comprehensive fix
  return {
    title: `Fix ${issue.description || 'Security Issue'}`,
    description: 'Follow security best practices to resolve this issue.',
    code: `# Step 1: Identify the specific issue
# Review the security finding details above carefully

# Step 2: Create a backup before making changes
# Always backup your website before applying security fixes

# Step 3: Apply the recommended fix
# Follow the specific instructions for your server environment

# Step 4: Test the fix thoroughly
# Verify the issue is resolved and your site works properly

# Step 5: Monitor for any problems
# Watch your website for issues after implementing the fix`
  };
}

// Enhance existing code formatting for better readability
function enhanceCodeForClearSteps(code) {
  if (!code) return '# No implementation steps available';
  
  const lines = code.split('\n');
  const enhanced = [];
  let stepCounter = 1;
  let inCodeBlock = false;
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    const trimmedLine = line.trim();
    
    // Skip empty lines at start
    if (trimmedLine === '' && enhanced.length === 0) continue;
    
    // Detect if this should be a new step
    if (trimmedLine.startsWith('#') && 
        trimmedLine.length > 10 && 
        !trimmedLine.toLowerCase().includes('step') &&
        isLikelyStepDescription(trimmedLine)) {
      
      // Add spacing before new step
      if (enhanced.length > 0) {
        enhanced.push('');
      }
      
      // Convert to numbered step
      line = `# Step ${stepCounter}: ${trimmedLine.substring(1).trim()}`;
      stepCounter++;
    }
    
    enhanced.push(line);
  }
  
  return enhanced.join('\n');
}




// FIXED: Create a modern cover page with consistent security score
// FIXED: Create a modern cover page with consistent security score
function createModernCoverPage(doc, reportData, colors) {
  // IMPORTANT: Call setGradientBackground first to set the dark gradient
  setGradientBackground(doc, colors);
  
  // Main title with modern typography
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255); // Pure white for better contrast
  doc.setFontSize(36);
  doc.text('SECURITY ANALYSIS', 105, 35, { align: 'center' });
  
  // Subtitle with better spacing
  doc.setFontSize(20);
  doc.setTextColor(229, 231, 235); // gray-200
  doc.text('Comprehensive Security Report', 105, 55, { align: 'center' });
  
  // Website URL with modern styling
  doc.setFontSize(14);
  doc.setTextColor(156, 163, 175); // gray-400
  doc.text('Website:', 105, 75, { align: 'center' });
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(34, 211, 238); // cyan-400 for website URL
  doc.setFontSize(18);
  doc.text(`${reportData.url}`, 105, 90, { align: 'center' });
  
  // Add scan date with better formatting
  let scanDate;
  try {
    scanDate = new Date(reportData.timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (e) {
    scanDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  doc.setFontSize(13);
  doc.setTextColor(156, 163, 175); // gray-400
  doc.text(`Report generated on ${scanDate}`, 105, 105, { align: 'center' });
  
  // Get the calculated security score (already processed by processMultiDimensionalData)
  const securityScore = reportData?.security?.score || 0;
  
  console.log(`📊 PDF Cover: Using security score: ${securityScore}`);
  
  // Security score display matching report page style
  displayModernSecurityScore(doc, securityScore, 105, 150, colors);
 
  
  // Add security metrics summary
  const critical = reportData.security?.critical || 0;
  const medium = reportData.security?.medium || 0;
  const low = reportData.security?.low || 0;
  const total = reportData.security?.total || 0;
  
  // Metrics boxes with glass-morphism design
  const boxWidth = 48;
  const boxHeight = 40;
  const startX = 105 - (boxWidth * 1.5 + 15);
  let currentX = startX;
  
  // Critical issues box
  // Glass-morphism card background (more visible on dark background)
  doc.setFillColor(255, 255, 255);
  doc.setGState(doc.GState({opacity: 0.15})); // Slightly more visible
  doc.roundedRect(currentX, 190, boxWidth, boxHeight, 4, 4, 'F');
  doc.setGState(doc.GState({opacity: 1}));
  
  // Add colored border with glow effect
  doc.setDrawColor(239, 68, 68); // red-500
  doc.setGState(doc.GState({opacity: 0.8})); // More visible glow
  doc.setLineWidth(1.2);
  doc.roundedRect(currentX, 190, boxWidth, boxHeight, 4, 4, 'S');
  doc.setGState(doc.GState({opacity: 1}));
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(248, 113, 113); // red-400 for better contrast
  doc.setFontSize(22);
  doc.text(critical.toString(), currentX + boxWidth/2, 205, { align: 'center' });
  doc.setFontSize(11);
  doc.text('CRITICAL', currentX + boxWidth/2, 216, { align: 'center' });
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255); // CHANGED: White text instead of gray
  doc.text('Fix immediately', currentX + boxWidth/2, 224, { align: 'center' });
  
  currentX += boxWidth + 15;
  
  // Medium issues box
  doc.setFillColor(255, 255, 255);
  doc.setGState(doc.GState({opacity: 0.15}));
  doc.roundedRect(currentX, 190, boxWidth, boxHeight, 4, 4, 'F');
  doc.setGState(doc.GState({opacity: 1}));
  
  doc.setDrawColor(245, 158, 11); // amber-500
  doc.setGState(doc.GState({opacity: 0.8}));
  doc.setLineWidth(1.2);
  doc.roundedRect(currentX, 190, boxWidth, boxHeight, 4, 4, 'S');
  doc.setGState(doc.GState({opacity: 1}));
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(251, 191, 36); // amber-400
  doc.setFontSize(22);
  doc.text(medium.toString(), currentX + boxWidth/2, 205, { align: 'center' });
  doc.setFontSize(11);
  doc.text('MEDIUM', currentX + boxWidth/2, 216, { align: 'center' });
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255); // CHANGED: White text instead of gray
  doc.text('This month', currentX + boxWidth/2, 224, { align: 'center' });
  
  currentX += boxWidth + 15;
  
  // Low issues box
  doc.setFillColor(255, 255, 255);
  doc.setGState(doc.GState({opacity: 0.15}));
  doc.roundedRect(currentX, 190, boxWidth, boxHeight, 4, 4, 'F');
  doc.setGState(doc.GState({opacity: 1}));
  
  doc.setDrawColor(59, 130, 246); // blue-500
  doc.setGState(doc.GState({opacity: 0.8}));
  doc.setLineWidth(1.2);
  doc.roundedRect(currentX, 190, boxWidth, boxHeight, 4, 4, 'S');
  doc.setGState(doc.GState({opacity: 1}));
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(96, 165, 250); // blue-400
  doc.setFontSize(22);
  doc.text(low.toString(), currentX + boxWidth/2, 205, { align: 'center' });
  doc.setFontSize(11);
  doc.text('LOW', currentX + boxWidth/2, 216, { align: 'center' });
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255); // CHANGED: White text instead of gray
  doc.text('Opportunities', currentX + boxWidth/2, 224, { align: 'center' });
  
  // Add modern tagline with better positioning
  doc.setTextColor(229, 231, 235); // gray-200
  doc.setFontSize(14);
  doc.setFont('helvetica', 'italic');
  doc.text('Protect your website and users from threats', 105, 250, { align: 'center' });
  
  // Brand name with improved styling - CHANGED: Added bottom padding (moved up from 275 to 270)
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255); // Pure white
  doc.setFontSize(28);
  doc.text('FounderScan', 105, 270, { align: 'center' }); // CHANGED: Moved up from 275 to 270 for bottom padding
}

// FIXED: Create modern executive summary with consistent security score
// FIXED: Create modern executive summary with consistent security score
function createModernExecutiveSummary(doc, reportData, colors) {
  setGradientBackground(doc, colors);
  addModernPageHeader(doc, 'Executive Summary', colors);

  let y = PDF_CONSTANTS.CONTENT_START;

  // Introduction with proper spacing
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(229, 231, 235);
  doc.setFontSize(12);

  const introText = `This report presents a comprehensive security analysis of ${reportData.url}. Our advanced scanning technology evaluated your website across multiple security dimensions to identify vulnerabilities and provide actionable remediation steps.`;
  const introLines = safeTextWrap(doc, introText, PDF_CONSTANTS.CONTENT_WIDTH);
  doc.text(introLines, PDF_CONSTANTS.LEFT_MARGIN, y);
  y += introLines.length * 8 + 20;

  
  // Get the calculated security score (already processed by processMultiDimensionalData)
  const securityScore = reportData?.security?.score || 0;
  
  console.log(`📊 PDF Executive Summary: Using security score: ${securityScore}`);
  
  // Get the issue counts separately without affecting the score
  const critical = reportData.security?.critical || 0;
  const medium = reportData.security?.medium || 0;
  const low = reportData.security?.low || 0;
  const total = reportData.security?.total || 0;

  // Results section
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text('Security Assessment Results', PDF_CONSTANTS.LEFT_MARGIN, y);
  y += 15;

  //  Score card with proper height management
  const cardHeight = 60;
  if (needsPageBreak(y, cardHeight + 25)) {
    doc.addPage();
    setGradientBackground(doc, colors);
    addModernPageHeader(doc, 'Executive Summary (Continued)', colors);
    y = PDF_CONSTANTS.CONTENT_START;
  }

  // Score card background
  doc.setFillColor(255, 255, 255);
  doc.setGState(doc.GState({opacity: 0.1}));
  doc.roundedRect(PDF_CONSTANTS.LEFT_MARGIN, y, PDF_CONSTANTS.CONTENT_WIDTH, cardHeight, 8, 8, 'F');
  doc.setGState(doc.GState({opacity: 1}));

  // Score color determination - FIXED: Use the corrected score
  let scoreColor, scoreText;
  if (securityScore >= 80) {
    scoreColor = colors.success;
    scoreText = 'EXCELLENT';
  } else if (securityScore >= 60) {
    scoreColor = colors.warning;
    scoreText = 'GOOD';
  } else if (securityScore >= 40) {
    scoreColor = colors.medium;
    scoreText = 'FAIR';
  } else {
    scoreColor = colors.critical;
    scoreText = 'NEEDS WORK';
  }

  // Score border
  doc.setDrawColor(scoreColor[0], scoreColor[1], scoreColor[2]);
  doc.setLineWidth(1);
  doc.roundedRect(PDF_CONSTANTS.LEFT_MARGIN, y, PDF_CONSTANTS.CONTENT_WIDTH, cardHeight, 6, 6, 'S');

  
 // Score display - use the security score directly
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2]);
  doc.setFontSize(32);
  
  doc.text(`${securityScore}`, 30, y + 25);

  // Issue breakdown
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.textSecondary[0], colors.textSecondary[1], colors.textSecondary[2]);
  doc.setFontSize(12);
  
  let detailY = y + 15;
  doc.text(`Total Issues Found: ${total}`, 100, detailY);
  detailY += 8;
  
  if (critical > 0) {
    doc.setTextColor(colors.critical[0], colors.critical[1], colors.critical[2]);
    doc.text(`Critical: ${critical}`, 100, detailY);
    detailY += 7;
  }
  
  if (medium > 0) {
    doc.setTextColor(colors.medium[0], colors.medium[1], colors.medium[2]);
    doc.text(`Medium: ${medium}`, 100, detailY);
    detailY += 7;
  }
  
  if (low > 0) {
    doc.setTextColor(colors.low[0], colors.low[1], colors.low[2]);
    doc.text(`Low: ${low}`, 100, detailY);
    detailY += 7;
  }
  
  y += cardHeight + 20;
  
  // Summary text
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.textSecondary[0], colors.textSecondary[1], colors.textSecondary[2]);
  doc.setFontSize(12);
  
  let summaryText;
  if (total === 0) {
    summaryText = 'Excellent! Your website shows strong security practices with no critical vulnerabilities detected. Continue monitoring and maintaining your security posture with regular scans.';
  } else if (critical > 0) {
    summaryText = `Your website has ${critical} critical security ${critical === 1 ? 'issue' : 'issues'} that require immediate attention. Address these vulnerabilities as soon as possible to protect your website and users.`;
  } else if (medium > 0) {
    summaryText = `Your website has ${medium} medium-priority security ${medium === 1 ? 'issue' : 'issues'}. While not immediately critical, these should be addressed within the next 30 days.`;
  } else {
    summaryText = `Your website has ${low} low-priority optimization ${low === 1 ? 'opportunity' : 'opportunities'}. These improvements can enhance your overall security posture.`;
  }
  
  const summaryLines = safeTextWrap(doc, summaryText, PDF_CONSTANTS.CONTENT_WIDTH);
  doc.text(summaryLines, PDF_CONSTANTS.LEFT_MARGIN, y);
  y += summaryLines.length * 8 + 20;
  
  return y;
}




// Display modern security score with improved design
function displayModernSecurityScore(doc, score, x, y, colors) {
  // Simply use the score as provided - no calculations, no fallbacks
  const validScore = score || 0;
  
  console.log(`📊 PDF: Displaying security score: ${validScore}`);
  
  // Choose color and status based on score
  let scoreColor;
  let scoreStatus;
  
  if (validScore >= 80) {
    scoreColor = colors.success;
    scoreStatus = 'EXCELLENT';
  } else if (validScore >= 60) {
    scoreColor = colors.warning;
    scoreStatus = 'GOOD';
  } else if (validScore >= 40) {
    scoreColor = colors.medium;
    scoreStatus = 'FAIR';
  } else {
    scoreColor = colors.critical;
    scoreStatus = 'NEEDS WORK';
  }
  
  // Main score container with glass-morphism design
  const containerWidth = 130;
  const containerHeight = 70;

  // Glass-morphism card background
  doc.setFillColor(255, 255, 255);
  doc.setGState(doc.GState({opacity: 0.1}));
  doc.roundedRect(x - containerWidth/2, y - containerHeight/2, containerWidth, containerHeight, 6, 6, 'F');
  doc.setGState(doc.GState({opacity: 1}));

  // Add subtle white border
  doc.setDrawColor(255, 255, 255);
  doc.setGState(doc.GState({opacity: 0.2}));
  doc.setLineWidth(0.5);
  doc.roundedRect(x - containerWidth/2, y - containerHeight/2, containerWidth, containerHeight, 6, 6, 'S');
  doc.setGState(doc.GState({opacity: 1}));

  // Border with score color for visual hierarchy
  doc.setDrawColor(scoreColor[0], scoreColor[1], scoreColor[2]);
  doc.setGState(doc.GState({opacity: 0.4}));
  doc.setLineWidth(1.5);
  doc.roundedRect(x - containerWidth/2, y - containerHeight/2, containerWidth, containerHeight, 6, 6, 'S');
  doc.setGState(doc.GState({opacity: 1}));
  
  // Border with score color
  doc.setDrawColor(scoreColor[0], scoreColor[1], scoreColor[2]);
  doc.setLineWidth(2);
  doc.roundedRect(x - containerWidth/2, y - containerHeight/2, containerWidth, containerHeight, 6, 6, 'S');
  
  // Score number (large and prominent)
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2]);
  doc.setFontSize(42);
  doc.text(`${validScore}`, x - 12, y + 8, { align: 'center' });
  
  // "/100" text
  doc.setFontSize(16);
  doc.text('/100', x + 25, y + 8);
  
  // Status text
  doc.setFontSize(13);
  doc.text(scoreStatus, x, y + 25, { align: 'center' });
  
  // Security label above
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.textSecondary[0], colors.textSecondary[1], colors.textSecondary[2]);
  doc.setFontSize(13);
  doc.text('SECURITY SCORE', x, y - 40, { align: 'center' });
}

  

// Create security breakdown page with improved design and clean icons
function createSecurityBreakdown(doc, reportData, colors) {
  // Set gradient background
  setGradientBackground(doc, colors);
  
  addModernPageHeader(doc, 'Security Analysis Breakdown', colors);
  
  let y = 50;
  
  // Introduction text with improved formatting
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.textSecondary[0], colors.textSecondary[1], colors.textSecondary[2]);
  doc.setFontSize(12);
  
  const introText = 'Our comprehensive security analysis evaluates your website across multiple critical security dimensions. Each category includes specialized checks designed to identify vulnerabilities and provide actionable remediation guidance.';
  const introLines = doc.splitTextToSize(introText, 180);
  doc.text(introLines, 15, y);
  y += introLines.length * 8 + 20;
  
  // Define security test categories with clean icons (no broken Unicode)
  const securityCategories = [
    {
      name: 'SSL/TLS Security',
      description: 'Validates certificate integrity, protocol versions, and secure connection implementation',
      checks: [
        'SSL certificate validity and expiration monitoring',
        'TLS protocol version assessment (TLSv1.2/1.3)',
        'HTTP to HTTPS redirection verification',
        'HSTS implementation and configuration',
        'Certificate chain validation'
      ],
      result: getSecurityScannerStatus(reportData, 'ssl')
    },
    {
      name: 'Security Headers',
      description: 'Analyzes HTTP security headers that protect against common web vulnerabilities',
      checks: [
        'Content-Security-Policy implementation',
        'X-Frame-Options clickjacking protection',
        'X-Content-Type-Options MIME sniffing prevention',
        'Referrer-Policy privacy controls',
        'X-XSS-Protection cross-site scripting defense'
      ],
      result: getSecurityScannerStatus(reportData, 'headers')
    },
    {
      name: 'File & Directory Security',
      description: 'Detects exposed sensitive files and misconfigured directory permissions',
      checks: [
        'Environment configuration file exposure (.env)',
        'Git repository and configuration accessibility',
        'Database backup and dump file detection',
        'Server configuration file exposure',
        'Directory listing vulnerability assessment'
      ],
      result: getSecurityScannerStatus(reportData, 'exposedFiles')
    },
    {
      name: 'OWASP Vulnerability Assessment',
      description: 'Identifies common web application security vulnerabilities from OWASP Top 10',
      checks: [
        'Cross-site scripting (XSS) pattern detection',
        'SQL injection vulnerability indicators',
        'Cross-site request forgery (CSRF) protection',
        'Security misconfiguration identification',
        'Insecure direct object reference detection'
      ],
      result: getSecurityScannerStatus(reportData, 'owasp')
    },
    {
      name: 'Credential & Secret Protection',
      description: 'Scans for exposed API keys, passwords, and sensitive configuration data',
      checks: [
        'API key pattern detection in client code',
        'Database connection string exposure',
        'Authentication token leakage',
        'Private key and certificate exposure',
        'Environment variable security assessment'
      ],
      result: getSecurityScannerStatus(reportData, 'secrets')
    },
    {
      name: 'Payment Security (Stripe)',
      description: 'Evaluates payment processing implementation and API key security',
      checks: [
        'Stripe API key exposure detection',
        'Webhook signature verification',
        'PCI DSS compliance indicators',
        'Secure payment form implementation',
        'Client-side payment data handling'
      ],
      result: getSecurityScannerStatus(reportData, 'stripe')
    }
  ];
  
  // Add WordPress-specific category if detected
  if (isWordPressSite(reportData)) {
    securityCategories.push({
      name: 'WordPress Security',
      description: 'WordPress-specific security assessment including core, plugins, and configuration',
      checks: [
        'WordPress core version and vulnerability status',
        'Plugin security and update status',
        'Theme security assessment',
        'WordPress configuration hardening',
        'User authentication and access controls'
      ],
      result: getSecurityScannerStatus(reportData, 'wordpress')
    });
  }
  
  // Add database security if Supabase detected
  if (hasSupabaseIntegration(reportData)) {
    securityCategories.push({
      name: 'Database Security',
      description: 'Database access controls and Row-Level Security policy evaluation',
      checks: [
        'Supabase anonymous key exposure assessment',
        'Row-Level Security (RLS) policy verification',
        'Database access control implementation',
        'Query injection vulnerability testing',
        'Data exposure risk evaluation'
      ],
      result: getSecurityScannerStatus(reportData, 'supabase')
    });
  }
  
  // Display categories with modern card design and improved spacing
  let categoriesOnPage = 0;
  const maxCategoriesPerPage = 3;
  
  securityCategories.forEach((category, index) => {
    // Check if we need a page break
    if (categoriesOnPage >= maxCategoriesPerPage || y > 220) {
      doc.addPage();
      setGradientBackground(doc, colors);
      addModernPageHeader(doc, 'Security Analysis Breakdown (Continued)', colors);
      y = 50;
      categoriesOnPage = 0;
    }
    
    const cardHeight = 75;
    
    // Glass-morphism card background
    doc.setFillColor(255, 255, 255);
    doc.setGState(doc.GState({opacity: 0.1}));
    doc.roundedRect(15, y, 180, cardHeight, 6, 6, 'F');
    doc.setGState(doc.GState({opacity: 1}));

    // Add subtle white border
    doc.setDrawColor(255, 255, 255);
    doc.setGState(doc.GState({opacity: 0.2}));
    doc.setLineWidth(0.5);
    doc.roundedRect(15, y, 180, cardHeight, 6, 6, 'S');
    doc.setGState(doc.GState({opacity: 1}));
    
    // Status-based border color
    const statusColor = getStatusBorderColor(category.result, colors);
    doc.setDrawColor(statusColor[0], statusColor[1], statusColor[2]);
    doc.setLineWidth(1);
    doc.roundedRect(15, y, 180, cardHeight, 6, 6, 'S');
    
    // Category header with white text - FIXED
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.setTextColor(255, 255, 255); // CHANGED: Always white text
    doc.text(category.name, 22, y + 15);
    
    // Status badge with improved positioning
    const statusText = getStatusDisplayText(category.result);
    
    // Glass-morphism badge background
    doc.setFillColor(255, 255, 255);
    doc.setGState(doc.GState({opacity: 0.15}));
    doc.roundedRect(155, y + 6, 35, 15, 3, 3, 'F');
    doc.setGState(doc.GState({opacity: 1}));

    // Add colored border for status indication
    doc.setDrawColor(statusColor[0], statusColor[1], statusColor[2]);
    doc.setGState(doc.GState({opacity: 0.6}));
    doc.setLineWidth(0.8);
    doc.roundedRect(155, y + 6, 35, 15, 3, 3, 'S');
    doc.setGState(doc.GState({opacity: 1}));
    
    // Status text - FIXED
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255); // CHANGED: Always white text
    doc.text(statusText, 172.5, y + 15, { align: 'center' });
    
    // Category description with white text - FIXED
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(255, 255, 255); // CHANGED: Always white text
    doc.setFontSize(11);
    const descLines = doc.splitTextToSize(category.description, 170);
    doc.text(descLines, 22, y + 26);
    
    // Security checks (displayed in two columns with white text) - FIXED
    const checksPerColumn = Math.ceil(category.checks.length / 2);
    const leftChecks = category.checks.slice(0, checksPerColumn);
    const rightChecks = category.checks.slice(checksPerColumn);
    
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255); // CHANGED: White text instead of muted gray
    
    // Left column
    let checkY = y + 40;
    leftChecks.forEach(check => {
      const checkLines = doc.splitTextToSize(`• ${check}`, 85);
      doc.text(checkLines, 25, checkY);
      checkY += checkLines.length * 5.5;
    });
    
    // Right column
    checkY = y + 40;
    rightChecks.forEach(check => {
      const checkLines = doc.splitTextToSize(`• ${check}`, 85);
      doc.text(checkLines, 112, checkY);
      checkY += checkLines.length * 5.5;
    });
    
    y += cardHeight + 12;
    categoriesOnPage++;
  });
  
  return y;
}

// Helper functions for security breakdown with improved status handling
function getSecurityScannerStatus(reportData, scannerKey) {
  if (!reportData.scanners || !reportData.scanners[scannerKey]) {
    return 'pass'; // Default to pass if scanner not found
  }
  
  const scanner = reportData.scanners[scannerKey];
  
  if (scanner.status === 'error' || scanner.error) {
    return 'error';
  }
  
  if (scanner.issues && scanner.issues.length > 0) {
    const hasCritical = scanner.issues.some(issue => 
      issue.severity === 'critical' || issue.severity === 'high'
    );
    
    if (hasCritical) {
      return 'critical';
    }
    
    const hasMedium = scanner.issues.some(issue => 
      issue.severity === 'medium'
    );
    
    return hasMedium ? 'warning' : 'info';
  }
  
  return 'pass';
}

function getStatusBorderColor(status, colors) {
  switch (status) {
    case 'pass': return colors.success;
    case 'critical': return colors.critical;
    case 'warning': return colors.medium;
    case 'info': return colors.low;
    case 'error': return colors.error;
    default: return colors.textMuted;
  }
}


function getStatusDisplayText(status) {
  switch (status) {
    case 'pass': return 'SECURE';
    case 'critical': return 'CRITICAL';
    case 'warning': return 'WARNINGS';
    case 'info': return 'MINOR';
    case 'error': return 'ERROR';
    default: return 'UNKNOWN';
  }
}

// Helper functions to detect specific integrations
function isWordPressSite(reportData) {
  return reportData.isWordPress || 
         (reportData.scanners && reportData.scanners.wordpress && 
          reportData.scanners.wordpress.isWordPress) ||
         hasSecurityIssueType(reportData, 'wp-');
}

function hasSupabaseIntegration(reportData) {
  return (reportData.scanners && reportData.scanners.supabase) || 
         hasSecurityIssueType(reportData, 'supabase');
}

function hasSecurityIssueType(reportData, typePrefix) {
  if (!reportData.security || !reportData.security.issues) {
    return false;
  }
  
  return reportData.security.issues.some(issue => 
    issue && issue.type && issue.type.includes(typePrefix)
  );
}
// Create detailed security findings page with enhanced styling and improved readability
function createDetailedSecurityFindings(doc, reportData, colors) {
  setGradientBackground(doc, colors);
  
  addModernPageHeader(doc, 'Detailed Security Findings', colors);
  
  let y = 50;
  
  // Introduction section
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.textSecondary[0], colors.textSecondary[1], colors.textSecondary[2]);
  doc.setFontSize(12);
  
  const issuesCount = reportData.security?.total || 0;
  
  if (issuesCount > 0) {
    const introText = `Our security analysis identified ${issuesCount} security ${issuesCount === 1 ? 'issue' : 'issues'} that require attention. Each finding includes detailed remediation steps with implementation examples to help you secure your website effectively.`;
    const introLines = doc.splitTextToSize(introText, 180);
    doc.text(introLines, 15, y);
    y += introLines.length * 8 + 20;
  } else {
    // IMPROVED: Better content for no issues case
    const introText = "Excellent! No security issues were found during our comprehensive analysis. Your website implements security best practices effectively across all tested dimensions.";
    const introLines = doc.splitTextToSize(introText, 180);
    doc.text(introLines, 15, y);
    y += introLines.length * 8 + 20;
    
    // Add the security areas checked immediately
    y = displaySecurityAreasChecked(doc, y, colors);
    return y; // Return early since we have content
  }
  
  // Organize issues by severity
  const criticalIssues = [];
  const mediumIssues = [];
  const lowIssues = [];
  
  if (reportData.security && Array.isArray(reportData.security.issues)) {
    reportData.security.issues.forEach(issue => {
      if (!issue || !issue.severity) return;
      
      const severity = issue.severity.toLowerCase();
      
      if (severity === 'critical') {
        criticalIssues.push(issue);
      } else if (severity === 'medium') {
        mediumIssues.push(issue);
      } else if (severity === 'low') {
        lowIssues.push(issue);
      }
    });
  }
  
  // Display issues using the improved function
  if (criticalIssues.length > 0) {
    y = displaySecurityIssueSection(doc, criticalIssues, 'Critical Security Issues', colors.critical, y, colors, 'ALERT: Immediate Action Required');
  }
  
  if (mediumIssues.length > 0) {
    if (y > 220) { // IMPROVED: More conservative page break
      doc.addPage();
      setGradientBackground(doc, colors);
      addModernPageHeader(doc, 'Detailed Security Findings (Continued)', colors);
      y = 50;
    }
    y = displaySecurityIssueSection(doc, mediumIssues, 'Medium Priority Issues', colors.medium, y, colors, 'WARNING: Address Within 30 Days');
  }
  
  if (lowIssues.length > 0) {
    if (y > 220) { // IMPROVED: More conservative page break
      doc.addPage();
      setGradientBackground(doc, colors);
      addModernPageHeader(doc, 'Detailed Security Findings (Continued)', colors);
      y = 50;
    }
    y = displaySecurityIssueSection(doc, lowIssues, 'Low Priority Optimizations', colors.low, y, colors, 'INFO: Improvement Opportunities');
  }
  
  return y;
}


// Remove strange symbols and improve text handling
function displaySecurityIssueSection(doc, issues, sectionTitle, sectionColor, startY, colors, sectionSubtitle) {
  let y = startY;
  
  // Section header
  doc.setFillColor(255, 255, 255);
  doc.setGState(doc.GState({opacity: 0.1}));
  doc.roundedRect(15, y, 180, 28, 6, 6, 'F');
  doc.setGState(doc.GState({opacity: 1}));

  doc.setDrawColor(255, 255, 255);
  doc.setGState(doc.GState({opacity: 0.2}));
  doc.setLineWidth(0.5);
  doc.roundedRect(15, y, 180, 28, 6, 6, 'S');
  doc.setGState(doc.GState({opacity: 1}));

  doc.setFillColor(sectionColor[0], sectionColor[1], sectionColor[2]);
  doc.setGState(doc.GState({opacity: 0.8}));
  doc.roundedRect(15, y, 5, 28, 3, 3, 'F');
  doc.setGState(doc.GState({opacity: 1}));
  
  // Section title
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(sectionColor[0], sectionColor[1], sectionColor[2]);
  doc.setFontSize(18);
  doc.text(sectionTitle, 26, y + 12);
  
  // Section subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text(sectionSubtitle, 26, y + 22);
  
  // Issue count badge
  doc.setFillColor(255, 255, 255);
  doc.setGState(doc.GState({opacity: 0.15}));
  doc.roundedRect(170, y + 6, 20, 16, 4, 4, 'F');
  doc.setGState(doc.GState({opacity: 1}));

  doc.setDrawColor(sectionColor[0], sectionColor[1], sectionColor[2]);
  doc.setGState(doc.GState({opacity: 0.6}));
  doc.setLineWidth(1);
  doc.roundedRect(170, y + 6, 20, 16, 4, 4, 'S');
  doc.setGState(doc.GState({opacity: 1}));

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.text(issues.length.toString(), 180, y + 16, { align: 'center' });

  y += 38;
  
  // Display each issue with dynamic height based on content
  issues.forEach((issue, index) => {
    if (!issue || !issue.description) {
      return;
    }
    
    // Calculate dynamic card height based on content
    const cardHeight = calculateDynamicIssueHeight(doc, issue, index);
    
    // Check if card fits on current page
    if (y + cardHeight > 250) {
      doc.addPage();
      setGradientBackground(doc, colors);
      addModernPageHeader(doc, 'Detailed Security Findings (Continued)', colors);
      y = 50;
    }

    // Issue card background
    doc.setFillColor(255, 255, 255);
    doc.setGState(doc.GState({opacity: 0.1}));
    doc.roundedRect(15, y, 180, cardHeight, 6, 6, 'F');
    doc.setGState(doc.GState({opacity: 1}));

    doc.setDrawColor(255, 255, 255);
    doc.setGState(doc.GState({opacity: 0.2}));
    doc.setLineWidth(0.5);
    doc.roundedRect(15, y, 180, cardHeight, 6, 6, 'S');
    doc.setGState(doc.GState({opacity: 1}));

    doc.setFillColor(sectionColor[0], sectionColor[1], sectionColor[2]);
    doc.setGState(doc.GState({opacity: 0.8}));
    doc.roundedRect(15, y, 4, cardHeight, 3, 3, 'F');
    doc.setGState(doc.GState({opacity: 1}));
    
    // Issue header with full text (no truncation)
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    
    const fullTitle = `${index + 1}. ${issue.description}`;
    const titleLines = safeTextWrap(doc, fullTitle, 170);
    doc.text(titleLines, 24, y + 14);
    
    let currentY = y + 14 + (titleLines.length * 7);
    
    // Location with proper spacing
    if (issue.location && currentY + 12 < y + cardHeight - 5) {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(156, 163, 175);
      doc.setFontSize(9);
      
      const locationText = `Location: ${issue.location}`;
      const locationLines = safeTextWrap(doc, locationText, 165);
      doc.text(locationLines, 26, currentY + 8);
      currentY += 8 + (locationLines.length * 6);
    }
    
    // Fix description with proper wrapping
    if (currentY + 15 < y + cardHeight - 5) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      doc.text('FIX:', 24, currentY + 8);
      currentY += 12;
      
      const fixDescription = issue.fix?.description || 'Follow security best practices to resolve this issue.';
      
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(229, 231, 235);
      doc.setFontSize(9);
      
      const availableHeight = y + cardHeight - 10 - currentY;
      const maxLines = Math.floor(availableHeight / 6);
      const fixLines = safeTextWrap(doc, fixDescription, 150, maxLines);
      
      doc.text(fixLines, 26, currentY);
    }
    
    y += cardHeight + 10;
  });
  
  return y;
}



// FIXED: Updated page break checker with more conservative margins
function needsPageBreak(currentY, requiredHeight, safeBottom = 250) {
  return currentY + requiredHeight > safeBottom;
}


// Create step-by-step fix instructions page with improved design and clean formatting

function createStepByStepFixInstructions(doc, reportData, colors) {
  setGradientBackground(doc, colors);
  
  addModernPageHeader(doc, 'Fix Instructions', colors);
  
  let y = 50;
  
  // Introduction with better formatting
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.textSecondary[0], colors.textSecondary[1], colors.textSecondary[2]);
  doc.setFontSize(12);
  
  const introText = 'Follow these prioritized, step-by-step instructions to fix all security issues. Each section includes complete implementation code and verification steps.';
  const introLines = doc.splitTextToSize(introText, 180);
  doc.text(introLines, 15, y);
  y += introLines.length * 8 + 20;
  
  // Get issue counts for priority sections
  const critical = reportData.security?.critical || 0;
  const medium = reportData.security?.medium || 0;
  const low = reportData.security?.low || 0;
  
  // Organize issues by severity
  const criticalIssues = [];
  const mediumIssues = [];
  const lowIssues = [];
  
  if (reportData.security && Array.isArray(reportData.security.issues)) {
    reportData.security.issues.forEach(issue => {
      if (!issue || !issue.severity) return;
      
      const severity = issue.severity.toLowerCase();
      
      if (severity === 'critical') {
        criticalIssues.push(issue);
      } else if (severity === 'medium') {
        mediumIssues.push(issue);
      } else if (severity === 'low') {
        lowIssues.push(issue);
      }
    });
  }
  
  // STEP 1: Critical Issues (if any) - FIXED: Use the improved function
  if (critical > 0) {
    y = createFixInstructionSection(doc, criticalIssues, 'ALERT STEP 1: Critical Issues (Fix Immediately)', colors.critical, y, colors, 'These issues pose immediate security risks and must be fixed right away.');
  }
  
  // STEP 2: Medium Issues (if any) - FIXED: Use the improved function
  if (medium > 0) {
    if (y > 240) {
      doc.addPage();
      setGradientBackground(doc, colors);
      addModernPageHeader(doc, 'Step-by-Step Fix Instructions (Continued)', colors);
      y = 50;
    }
    y = createFixInstructionSection(doc, mediumIssues, 'WARNING STEP 2: Medium Priority Issues', colors.medium, y, colors, 'Address these issues within 30 days to strengthen your security.');
  }
  
  // STEP 3: Low Issues (if any) - FIXED: Use the improved function
  if (low > 0) {
    if (y > 240) {
      doc.addPage();
      setGradientBackground(doc, colors);
      addModernPageHeader(doc, 'Step-by-Step Fix Instructions (Continued)', colors);
      y = 50;
    }
    y = createFixInstructionSection(doc, lowIssues, 'INFO STEP 3: Optimization Opportunities', colors.low, y, colors, 'Implement these improvements when convenient to enhance security.');
  }
  
  // If no issues, show maintenance steps
  if (critical === 0 && medium === 0 && low === 0) {
    y = createMaintenanceSteps(doc, y, colors);
  }
  
  return y;
}



// Updated calculateDynamicIssueHeight to account for full code display
function calculateDynamicIssueHeight(doc, issue, index) {
  let height = 40; // Base height for header and padding
  
  // Calculate title height
  const titleText = issue.description || 'Security Issue';
  const titleLines = safeTextWrap(doc, `${index + 1}. ${titleText}`, 170);
  height += titleLines.length * 7;
  
  // Add space for location if present
  if (issue.location) {
    const locationLines = safeTextWrap(doc, `Location: ${issue.location}`, 165);
    height += locationLines.length * 6 + 8;
  }
  
  // Add space for fix description
  const fixDescription = issue.fix?.description || 'Follow security best practices to resolve this issue.';
  const fixLines = safeTextWrap(doc, fixDescription, 150, 4); // Limit to 4 lines
  height += fixLines.length * 6 + 20; // Extra space for "FIX:" label
  
  // Add minimum spacing and cap maximum height - ORIGINAL working version
  height += 15;
  return Math.min(height, 120); // Back to original cap that worked
}



// Check if a comment line is likely a step description
function isLikelyStepDescription(line) {
  const stepIndicators = [
    'apache', 'nginx', 'method', 'configuration', 'install', 'setup', 
    'create', 'update', 'remove', 'delete', 'add', 'configure',
    'immediate', 'backup', 'test', 'verify', 'check', 'deploy'
  ];
  
  const lowerLine = line.toLowerCase();
  return stepIndicators.some(indicator => lowerLine.includes(indicator));
}


// Updated function for step-by-step instructions with improved code formatting
function createFixInstructionSection(doc, issues, sectionTitle, sectionColor, startY, colors, description) {
  let y = startY;
  
  // Section header (existing code remains the same)
  doc.setFillColor(255, 255, 255);
  doc.setGState(doc.GState({opacity: 0.1}));
  doc.roundedRect(15, y, 180, 32, 6, 6, 'F');
  doc.setGState(doc.GState({opacity: 1}));

  doc.setDrawColor(255, 255, 255);
  doc.setGState(doc.GState({opacity: 0.2}));
  doc.setLineWidth(0.5);
  doc.roundedRect(15, y, 180, 32, 6, 6, 'S');
  doc.setGState(doc.GState({opacity: 1}));

  doc.setFillColor(sectionColor[0], sectionColor[1], sectionColor[2]);
  doc.setGState(doc.GState({opacity: 0.8}));
  doc.roundedRect(15, y, 5, 32, 3, 3, 'F');
  doc.setGState(doc.GState({opacity: 1}));
  
  // Section title and description
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(sectionColor[0], sectionColor[1], sectionColor[2]);
  doc.setFontSize(16);
  doc.text(sectionTitle, 26, y + 14);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text(description, 26, y + 24);
  
  y += 42;
  
  // Display each issue with enhanced code handling
  issues.forEach((issue, index) => {
    // Calculate instruction card height
    const stepCardHeight = calculateInstructionCardHeight(doc, issue, index);
    
    // Check if instruction card fits on current page
    if (y + stepCardHeight > 235) {
      doc.addPage();
      setGradientBackground(doc, colors);
      addModernPageHeader(doc, 'Step-by-Step Fix Instructions (Continued)', colors);
      y = 50;
    }

    // Render instruction card
    y = renderInstructionCard(doc, issue, index, y, stepCardHeight, sectionColor, colors);
    
    // Handle code block separately - potentially on new page
    if (issue.fix?.code) {
      y = renderFullCodeBlock(doc, issue, index, y, sectionColor, colors);
    }
    
    y += 15; // Spacing between issues
  });
  
  return y;
}

// New function to calculate instruction card height (without code)
function calculateInstructionCardHeight(doc, issue, index) {
  let height = 20; // Base padding
  
  // Title height
  const titleText = issue.fix?.title || issue.description;
  const titleLines = safeTextWrap(doc, titleText, 140, 2);
  height += titleLines.length * 7 + 8;
  
  // Description height
  const descText = issue.fix?.description || 'Follow the implementation steps below.';
  const descLines = safeTextWrap(doc, descText, 140, 3);
  height += descLines.length * 6 + 15;
  
  return Math.min(height, 80); // Cap at reasonable height
}

// New function to render just the instruction card (without code)
function renderInstructionCard(doc, issue, index, y, cardHeight, sectionColor, colors) {
  // Step card background
  doc.setFillColor(255, 255, 255);
  doc.setGState(doc.GState({opacity: 0.1}));
  doc.roundedRect(15, y, 180, cardHeight, 6, 6, 'F');
  doc.setGState(doc.GState({opacity: 1}));

  doc.setDrawColor(255, 255, 255);
  doc.setGState(doc.GState({opacity: 0.2}));
  doc.setLineWidth(0.5);
  doc.roundedRect(15, y, 180, cardHeight, 6, 6, 'S');
  doc.setGState(doc.GState({opacity: 1}));

  // Step number circle
  doc.setFillColor(255, 255, 255);
  doc.setGState(doc.GState({opacity: 0.15}));
  doc.circle(27, y + 15, 9, 'F');
  doc.setGState(doc.GState({opacity: 1}));

  doc.setDrawColor(sectionColor[0], sectionColor[1], sectionColor[2]);
  doc.setGState(doc.GState({opacity: 0.8}));
  doc.setLineWidth(1.5);
  doc.circle(27, y + 15, 9, 'S');
  doc.setGState(doc.GState({opacity: 1}));
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.text((index + 1).toString(), 27, y + 18, { align: 'center' });
  
  // Title and description
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  const titleText = issue.fix?.title || issue.description;
  const titleLines = safeTextWrap(doc, titleText, 140, 2);
  doc.text(titleLines, 45, y + 15);
  
  let descY = y + 15 + (titleLines.length * 7) + 5;
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(229, 231, 235);
  doc.setFontSize(10);
  const descText = issue.fix?.description || 'Follow the implementation steps below.';
  const descLines = safeTextWrap(doc, descText, 140, 3);
  doc.text(descLines, 45, descY);
  
  // Add "Code on next page" indicator if there's code
  if (issue.fix?.code) {
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(34, 211, 238); // cyan
    doc.setFontSize(9);
    doc.text('→ Implementation code on next page', 45, y + cardHeight - 8);
  }
  
  return y + cardHeight + 8;
}


// Function to calculate the full height needed for code
function calculateFullCodeHeight(doc, code) {
  if (!code) return 0;
  
  doc.setFont('courier', 'normal');
  doc.setFontSize(8);
  
  const lines = code.split('\n');
  const lineHeight = 5; // Reduced line height
  const maxWidth = 150; // Reduced width to ensure it fits
  
  let totalLines = 0;
  
  lines.forEach(line => {
    if (line.trim() === '') {
      totalLines += 1;
    } else {
      const wrappedLines = doc.splitTextToSize(line, maxWidth);
      totalLines += wrappedLines.length;
    }
  });
  
  return totalLines * lineHeight + 20; // Add padding
}

// Function to render code with automatic page breaks
function renderPaginatedCodeBlock(doc, code, x, startY, width, colors) {
 let y = startY;
 const lineHeight = 5;
 const leftMargin = x + 10;
 const maxWidth = 150;
 
 // Split code into lines
 const lines = code.split('\n');
 const processedLines = [];
 
 // Process each line for wrapping
 doc.setFont('courier', 'normal');
 doc.setFontSize(8);
 
 lines.forEach(line => {
   if (line.trim() === '') {
     processedLines.push({ text: '', isWrapped: false, isComment: false });
   } else {
     const isComment = line.trim().startsWith('#') || line.trim().startsWith('//');
     const wrappedLines = doc.splitTextToSize(line, maxWidth);
     
     wrappedLines.forEach((wrappedLine, index) => {
       processedLines.push({
         text: wrappedLine,
         isWrapped: index > 0,
         isComment: isComment
       });
     });
   }
 });
 
 let currentLineIndex = 0;
 
 while (currentLineIndex < processedLines.length) {
   // Ensure font settings are maintained
   doc.setFont('courier', 'normal');
   doc.setFontSize(8);
   
   // Calculate how many lines fit on current page
   const currentAvailableHeight = 230 - y;
   const currentMaxLines = Math.floor(currentAvailableHeight / lineHeight);
   
   // Determine how many lines to render on this page
   const linesToRender = Math.min(
     currentMaxLines,
     processedLines.length - currentLineIndex
   );
   
   if (linesToRender <= 0) {
     // Start new page
     doc.addPage();
     setGradientBackground(doc, colors);
     addModernPageHeader(doc, 'Implementation Code (Continued)', colors);
     y = 50;
     continue;
   }
   
   // Calculate block height for this page
   const blockHeight = linesToRender * lineHeight + 15;
   
   // Draw code background for this block
   const actualWidth = Math.min(width, 180);
   doc.setFillColor(17, 24, 39);
   doc.roundedRect(x, y, actualWidth, blockHeight, 6, 6, 'F');
   
   // Draw border
   doc.setDrawColor(75, 85, 99);
   doc.setLineWidth(1);
   doc.roundedRect(x, y, actualWidth, blockHeight, 6, 6, 'S');
   
   // Render lines for this page
   let currentY = y + 10;
   
   // Ensure proper font settings for code rendering
   doc.setFont('courier', 'normal');
   doc.setFontSize(8);
   
   for (let i = 0; i < linesToRender; i++) {
     const lineData = processedLines[currentLineIndex + i];
     
     // Maintain font settings for each line
     doc.setFont('courier', 'normal');
     doc.setFontSize(8);
     
     // Set text color based on content
     if (lineData.isComment) {
       doc.setTextColor(156, 163, 175);
     } else if (lineData.text.includes('$') || lineData.text.includes('=')) {
       doc.setTextColor(34, 197, 94);
     } else {
       doc.setTextColor(255, 255, 255);
     }
     
     // Add indentation for wrapped lines
     const xOffset = lineData.isWrapped ? leftMargin + 15 : leftMargin;
     const safeXOffset = Math.min(xOffset, x + actualWidth - 20);
     
     doc.text(lineData.text, safeXOffset, currentY);
     currentY += lineHeight;
   }
   
   y += blockHeight + 8;
   currentLineIndex += linesToRender;
   
   // Check if we need a new page for remaining content
   if (currentLineIndex < processedLines.length) {
     const remainingLines = processedLines.length - currentLineIndex;
     const remainingHeight = remainingLines * lineHeight + 25;
     
     if (y + remainingHeight > 230) {
       doc.addPage();
       setGradientBackground(doc, colors);
       addModernPageHeader(doc, 'Implementation Code (Continued)', colors);
       y = 50;
       
       // Reset font settings after new page
       doc.setFont('courier', 'normal');
       doc.setFontSize(8);
     }
   }
 }
 
 return y;
}

function renderFullCodeBlock(doc, issue, index, startY, sectionColor, colors) {
  let y = startY;
  const code = issue.fix?.code;
  
  if (!code) return y;
  
  // Calculate required space for code
  const codeHeight = calculateFullCodeHeight(doc, code);
  const headerHeight = 35;
  const totalCodeSpace = headerHeight + codeHeight + 20; // Extra padding
  
  // Always put substantial code blocks on a new page for better readability
  if (totalCodeSpace > 120 || y > 160) { // More conservative thresholds
    doc.addPage();
    setGradientBackground(doc, colors);
    addModernPageHeader(doc, `Implementation Code - Step ${index + 1}`, colors);
    y = 50;
  }
  
  // Code block header
  const headerY = y;
  const headerWidth = 180; // Ensure header fits
  doc.setFillColor(31, 41, 55); // Dark header background
  doc.roundedRect(15, headerY, headerWidth, headerHeight, 6, 6, 'F');
  doc.roundedRect(15, headerY + 20, headerWidth, 15, 0, 0, 'F'); // Remove bottom rounded corners
  
  // Header title - ensure it fits
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  const stepTitle = issue.fix?.title || issue.description;
  const titleText = `Step ${index + 1}: ${stepTitle}`;
  const titleLines = doc.splitTextToSize(titleText, 160); // Ensure title fits
  doc.text(titleLines[0], 25, headerY + 15); // Only show first line if too long
  
  // Implementation label
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(156, 163, 175);
  doc.setFontSize(11);
  doc.text('Implementation Steps:', 25, headerY + 28);
  
  y += headerHeight;
  
  // Render code with pagination support - use consistent width
  y = renderPaginatedCodeBlock(doc, code, 15, y, 180, colors);
  
  return y + 10;
}





// Security areas display with proper spacing
function displaySecurityAreasChecked(doc, startY, colors) {
  let y = startY;
  
  // Success header
  doc.setFillColor(255, 255, 255);
  doc.setGState(doc.GState({opacity: 0.1}));
  doc.roundedRect(15, y, 180, 28, 6, 6, 'F');
  doc.setGState(doc.GState({opacity: 1}));

  doc.setDrawColor(255, 255, 255);
  doc.setGState(doc.GState({opacity: 0.2}));
  doc.setLineWidth(0.5);
  doc.roundedRect(15, y, 180, 28, 6, 6, 'S');
  doc.setGState(doc.GState({opacity: 1}));

  doc.setFillColor(34, 197, 94);
  doc.setGState(doc.GState({opacity: 0.8}));
  doc.roundedRect(15, y, 5, 28, 3, 3, 'F');
  doc.setGState(doc.GState({opacity: 1}));
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(34, 197, 94);
  doc.setFontSize(18);
  doc.text('Security Areas Analyzed', 26, y + 18);
  
  y += 38;
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(229, 231, 235);
  doc.setFontSize(12);
  
  const introText = "Your website passed all security checks! Here are the critical security areas we analyzed:";
  const introLines = doc.splitTextToSize(introText, 180);
  doc.text(introLines, 15, y);
  y += introLines.length * 8 + 20;
  
  const securityAreas = [
    {
      title: 'SSL/TLS Security',
      description: 'Certificate validity, encryption protocols, and secure connection implementation.'
    },
    {
      title: 'HTTP Security Headers',
      description: 'Content Security Policy, frame options, and XSS protection headers.'
    },
    {
      title: 'File & Directory Security',
      description: 'Sensitive file exposure, configuration files, and directory listing protection.'
    },
    {
      title: 'Credential Protection',
      description: 'API key exposure, environment variables, and secret management.'
    },
    {
      title: 'Database Security',
      description: 'Access controls, Row-Level Security policies, and connection security.'
    },
    {
      title: 'Application Security',
      description: 'OWASP vulnerability assessment, injection attacks, and cross-site scripting.'
    }
  ];
  
  securityAreas.forEach((area, index) => {
    // Check if card would exceed safe area (leave room for footer)
    const cardHeight = 30; // Reduced height
    if (y + cardHeight > 250) { // Conservative limit
      doc.addPage();
      setGradientBackground(doc, colors);
      addModernPageHeader(doc, 'Security Areas Analyzed (Continued)', colors);
      y = 50;
    }
    
    // Area card
    doc.setFillColor(255, 255, 255);
    doc.setGState(doc.GState({opacity: 0.1}));
    doc.roundedRect(15, y, 180, cardHeight, 4, 4, 'F');
    doc.setGState(doc.GState({opacity: 1}));

    doc.setDrawColor(255, 255, 255);
    doc.setGState(doc.GState({opacity: 0.2}));
    doc.setLineWidth(0.5);
    doc.roundedRect(15, y, 180, cardHeight, 4, 4, 'S');
    doc.setGState(doc.GState({opacity: 1}));

    doc.setFillColor(34, 197, 94);
    doc.setGState(doc.GState({opacity: 0.8}));
    doc.roundedRect(15, y, 4, cardHeight, 2, 2, 'F');
    doc.setGState(doc.GState({opacity: 1}));
    
    // Area content
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text(area.title, 24, y + 12);
    
    doc.setTextColor(34, 197, 94);
    doc.setFontSize(10);
    doc.text('SECURE', 175, y + 12);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(156, 163, 175);
    doc.setFontSize(9);
    const descLines = doc.splitTextToSize(area.description, 145);
    doc.text(descLines[0], 24, y + 22); // Only show first line to prevent overflow
    
    y += cardHeight + 8; // Reduced spacing
  });
  
  return y;
}



// Create maintenance steps for sites with no issues
function createMaintenanceSteps(doc, startY, colors) {
  let y = startY;
  
  // Header
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.success[0], colors.success[1], colors.success[2]);
  doc.setFontSize(18);
  doc.text('SHIELD Security Maintenance Plan', 15, y);
  y += 18;
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.textSecondary[0], colors.textSecondary[1], colors.textSecondary[2]);
  doc.setFontSize(12);
  
  const introText = 'Excellent! Your website has no security issues. Follow these maintenance steps to keep your security posture strong:';
  const introLines = doc.splitTextToSize(introText, 180);
  doc.text(introLines, 15, y);
  y += introLines.length * 8 + 18;
  
  const maintenanceSteps = [
    {
      title: 'Regular Security Scans',
      description: 'Run security scans monthly to catch new vulnerabilities early.',
      action: 'Schedule recurring scans with FounderScan or similar tools.'
    },
    {
      title: 'Software Updates',
      description: 'Keep all software, frameworks, and dependencies updated.',
      action: 'Set up automated updates where possible and review monthly.'
    },
    {
      title: 'Security Monitoring',
      description: 'Monitor access logs and set up alerts for suspicious activity.',
      action: 'Implement intrusion detection and log monitoring systems.'
    },
    {
      title: 'Backup Strategy',
      description: 'Maintain regular, tested backups of your website and database.',
      action: 'Automate daily backups and test restoration quarterly.'
    },
    {
      title: 'Access Control Review',
      description: 'Regularly review user accounts and permissions.',
      action: 'Audit user access monthly and remove unused accounts.'
    }
  ];
  
  maintenanceSteps.forEach((step, index) => {
    if (y > 240) {
      doc.addPage();
      setGradientBackground(doc, colors);
      addModernPageHeader(doc, 'Security Maintenance Plan (Continued)', colors);
      y = 50;
    }
    
  // Step container with glass-morphism design
const stepHeight = 38;

// Glass-morphism card background
doc.setFillColor(255, 255, 255);
doc.setGState(doc.GState({opacity: 0.1}));
doc.roundedRect(15, y, 180, stepHeight, 6, 6, 'F');
doc.setGState(doc.GState({opacity: 1}));

// Add subtle white border
doc.setDrawColor(255, 255, 255);
doc.setGState(doc.GState({opacity: 0.2}));
doc.setLineWidth(0.5);
doc.roundedRect(15, y, 180, stepHeight, 6, 6, 'S');
doc.setGState(doc.GState({opacity: 1}));

// Step number circle with glass-morphism effect
// Glass-morphism circle background
doc.setFillColor(255, 255, 255);
doc.setGState(doc.GState({opacity: 0.15}));
doc.circle(27, y + 14, 9, 'F');
doc.setGState(doc.GState({opacity: 1}));

// Success colored circle border
doc.setDrawColor(34, 197, 94); // green-500
doc.setGState(doc.GState({opacity: 0.8}));
doc.setLineWidth(1.5);
doc.circle(27, y + 14, 9, 'S');
doc.setGState(doc.GState({opacity: 1}));

// Step number text with better contrast
doc.setFont('helvetica', 'bold');
doc.setTextColor(255, 255, 255); // Pure white for better contrast
doc.setFontSize(13);
doc.text((index + 1).toString(), 27, y + 17, { align: 'center' });
    
    // Step content
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
    doc.setFontSize(12);
    doc.text(step.title, 42, y + 12);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(colors.textSecondary[0], colors.textSecondary[1], colors.textSecondary[2]);
    doc.setFontSize(10);
    doc.text(step.description, 42, y + 20);
    
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(colors.accent[0], colors.accent[1], colors.accent[2]);
    doc.setFontSize(10);
    doc.text(`Action: ${step.action}`, 42, y + 28);
    
    y += stepHeight + 10;
  });
  
  return y;
}
// Create security recommendations page with improved design
function createSecurityRecommendations(doc, reportData, colors) {
  setGradientBackground(doc, colors);
  
  addModernPageHeader(doc, 'Security Action Plan', colors);
  
  let y = 50;
  
  // Introduction
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.textSecondary[0], colors.textSecondary[1], colors.textSecondary[2]);
  doc.setFontSize(12);
  
  const introText = 'Based on our comprehensive security analysis, follow this prioritized action plan to strengthen your website security and protect against threats.';
  const introLines = doc.splitTextToSize(introText, 180);
  doc.text(introLines, 15, y);
  y += introLines.length * 8 + 20;
  
  // Security best practices section
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.setFontSize(18);
  doc.text('LOCK Security Best Practices', 15, y);
  y += 18;
  
  const bestPractices = [
    'Keep all software, frameworks, and dependencies updated to the latest versions',
    'Implement strong password policies and enable two-factor authentication',
    'Regular security monitoring and log analysis for suspicious activities',
    'Backup your website and database regularly with encrypted offsite storage',
    'Use HTTPS for all communications and implement HSTS headers'
  ];
  
  // Display best practices with glass-morphism design
const practicesHeight = bestPractices.length * 15 + 20;

// Glass-morphism card background
doc.setFillColor(255, 255, 255);
doc.setGState(doc.GState({opacity: 0.1}));
doc.roundedRect(15, y, 180, practicesHeight, 6, 6, 'F');
doc.setGState(doc.GState({opacity: 1}));

// Add subtle white border
doc.setDrawColor(255, 255, 255);
doc.setGState(doc.GState({opacity: 0.2}));
doc.setLineWidth(0.5);
doc.roundedRect(15, y, 180, practicesHeight, 6, 6, 'S');
doc.setGState(doc.GState({opacity: 1}));
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.textSecondary[0], colors.textSecondary[1], colors.textSecondary[2]);
  doc.setFontSize(11);
  
  let practiceY = y + 12;
  bestPractices.forEach(practice => {
    const lines = doc.splitTextToSize(`• ${practice}`, 170);
    doc.text(lines, 24, practiceY);
    practiceY += lines.length * 7 + 4;
  });
  
  return y + practicesHeight + 20;
}

// Create implementation guide with improved design
function createImplementationGuide(doc, reportData, colors) {
  setGradientBackground(doc, colors);
  
  addModernPageHeader(doc, 'Implementation Guide', colors);
  
  let y = 50;
  
  // Introduction
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.textSecondary[0], colors.textSecondary[1], colors.textSecondary[2]);
  doc.setFontSize(12);
  
  const introText = 'Follow these step-by-step instructions to implement the security fixes and strengthen your website protection.';
  const introLines = doc.splitTextToSize(introText, 180);
  doc.text(introLines, 15, y);
  y += introLines.length * 8 + 20;
  
  // Implementation tips
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.setFontSize(18);
  doc.text('TARGET Implementation Best Practices', 15, y);
  y += 18;
  
  const implementationTips = [
    'Test Before Deploy: Always test security fixes in a staging environment',
    'Backup First: Create complete backups before making security changes',
    'Monitor Changes: Watch your website closely after implementing fixes',
    'Document Changes: Keep records of all security modifications',
    'Regular Reviews: Schedule ongoing security assessments'
  ];
  
  implementationTips.forEach(tip => {
  // Tip card with glass-morphism design
const cardHeight = 24;

// Glass-morphism card background
doc.setFillColor(255, 255, 255);
doc.setGState(doc.GState({opacity: 0.1}));
doc.roundedRect(15, y, 180, cardHeight, 4, 4, 'F');
doc.setGState(doc.GState({opacity: 1}));

// Add subtle white border
doc.setDrawColor(255, 255, 255);
doc.setGState(doc.GState({opacity: 0.2}));
doc.setLineWidth(0.5);
doc.roundedRect(15, y, 180, cardHeight, 4, 4, 'S');
doc.setGState(doc.GState({opacity: 1}));
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(colors.textSecondary[0], colors.textSecondary[1], colors.textSecondary[2]);
    doc.setFontSize(11);
    doc.text(`• ${tip}`, 24, y + 14);
    
    y += cardHeight + 8;
  });
  
  return y;
}

// Add modern page headers with gradient background and clean design
function addModernPageHeader(doc, title, colors) {
  // No separate header background - the gradient background already covers everything
  
  // Add a subtle top accent line that blends with the gradient
  doc.setDrawColor(255, 255, 255);
  doc.setGState(doc.GState({opacity: 0.1}));
  doc.setLineWidth(1);
  doc.line(0, 3, 210, 3);
  doc.setGState(doc.GState({opacity: 1}));
  
  // Title text with modern styling
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255); // Pure white for contrast
  doc.setFontSize(18);
  doc.text(title, 15, 25);
  
  // Decorative accent line under title with cyan color
  doc.setDrawColor(34, 211, 238); // cyan-400
  doc.setGState(doc.GState({opacity: 0.6}));
  doc.setLineWidth(2);
  doc.line(15, 30, 195, 30);
  doc.setGState(doc.GState({opacity: 1}));
}


// Set gradient background for all pages
function setGradientBackground(doc, colors) {
  // Create a much darker gradient that matches the web interface
  // Using much darker blues that match your web design
  
  const startColor = [17, 24, 39];     // #111827 - gray-900 (much darker)
  const midColor = [15, 23, 42];       // #0f172a - slate-900 (very dark)
  const endColor = [12, 74, 110];      // #0c4a6e - sky-900 (dark blue)
  
  // Create vertical gradient across entire page
  for (let i = 0; i < 297; i++) {
    let ratio;
    let r, g, b;
    
    if (i < 80) {
      // Top section: gray-900 to slate-900
      ratio = i / 80;
      r = Math.round(startColor[0] * (1 - ratio) + midColor[0] * ratio);
      g = Math.round(startColor[1] * (1 - ratio) + midColor[1] * ratio);
      b = Math.round(startColor[2] * (1 - ratio) + midColor[2] * ratio);
    } else {
      // Bottom section: slate-900 to sky-900
      ratio = (i - 80) / 217;
      r = Math.round(midColor[0] * (1 - ratio) + endColor[0] * ratio);
      g = Math.round(midColor[1] * (1 - ratio) + endColor[1] * ratio);
      b = Math.round(midColor[2] * (1 - ratio) + endColor[2] * ratio);
    }
    
    doc.setFillColor(r, g, b);
    doc.rect(0, i, 210, 1, 'F');
  }
  
  // Add very subtle overlay pattern for texture (less visible on dark background)
  doc.setFillColor(255, 255, 255);
  doc.setGState(doc.GState({opacity: 0.01})); // Even more subtle
  
  // Create subtle dot pattern
  for (let x = 0; x < 210; x += 25) {
    for (let y = 0; y < 297; y += 25) {
      doc.circle(x, y, 0.3, 'F');
    }
  }
  
  doc.setGState(doc.GState({opacity: 1})); // Reset opacity
}

// Add modern footers to all pages with improved design
function addModernFooters(doc, reportData, colors) {
  const pageCount = doc.internal.getNumberOfPages();
  
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    
    //  Consistent footer positioning at the very bottom
    const footerY = 275; // Fixed position near bottom of page
    
    // Subtle separator line
    doc.setDrawColor(255, 255, 255);
    doc.setGState(doc.GState({opacity: 0.1}));
    doc.setLineWidth(0.5);
    doc.line(15, footerY, 195, footerY);
    doc.setGState(doc.GState({opacity: 1}));
    
    // Footer content in a single line to save space
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text('FounderScan Security Analysis', 15, footerY + 8);
    
    // Website URL (smaller)
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(156, 163, 175);
    let url = reportData.url;
    if (url.length > 40) {
      url = url.substring(0, 37) + '...';
    }
    doc.text(url, 15, footerY + 15);
    
    // Generation date - centered
    doc.setFontSize(7);
    doc.setTextColor(156, 163, 175);
    const date = new Date().toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
    doc.text(`Generated: ${date}`, 105, footerY + 8, { align: 'center' });
    
    // Page numbers
    doc.setFontSize(8);
    doc.setTextColor(34, 211, 238);
    doc.text(`Page ${i} of ${pageCount}`, 195, footerY + 8, { align: 'right' });
    
    // Security badge (only on cover page)
    if (i === 1) {
      doc.setTextColor(34, 211, 238);
      doc.setFontSize(6);
      doc.text('SECURITY REPORT', 195, footerY + 15, { align: 'right' });
    }
  }
}

// Export the main function and utility functions for use in the application
export { collectSecurityIssues, enhanceIssueWithFix, generateClearFixInstructions };

// Additional utility functions that might be needed elsewhere
export function validateReportData(reportData) {
  // Validate that report data has the required structure
  if (!reportData) {
    throw new Error('Report data is required');
  }
  
  if (!reportData.url) {
    throw new Error('Report must include a URL');
  }
  
  // Ensure security object exists
  if (!reportData.security) {
    reportData.security = {
      score: 85,
      total: 0,
      critical: 0,
      medium: 0,
      low: 0,
      issues: []
    };
  }
  
  // Ensure summary object exists
  if (!reportData.summary) {
    reportData.summary = {
      securityScore: reportData.security.score,
      total: reportData.security.total,
      critical: reportData.security.critical,
      medium: reportData.security.medium,
      low: reportData.security.low
    };
  }
  
  return reportData;
}

export function formatSecurityScore(score) {
  // Ensure score is a valid number between 0-100
  const numScore = parseInt(score, 10) || 0;
  return Math.min(100, Math.max(0, numScore));
}

export function getScoreStatus(score) {
  // Get human-readable status for a security score
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  return 'Needs Work';
}

export function getScoreColor(score, colors) {
  // Get color array for a security score
  if (score >= 80) return colors.success;
  if (score >= 60) return colors.warning;
  if (score >= 40) return colors.medium;
  return colors.critical;
}

export function categorizeIssuesBySeverity(issues) {
  // Organize issues by severity level
  const categorized = {
    critical: [],
    medium: [],
    low: []
  };
  
  if (!Array.isArray(issues)) {
    return categorized;
  }
  
  issues.forEach(issue => {
    if (!issue || !issue.severity) return;
    
    const severity = issue.severity.toLowerCase();
    if (categorized[severity]) {
      categorized[severity].push(issue);
    }
  });
  
  return categorized;
}

export function calculateSecurityScore(issues) {
  // Calculate security score based on issues
  if (!Array.isArray(issues)) {
    return 100;
  }
  
  const critical = issues.filter(i => i.severity === 'critical').length;
  const medium = issues.filter(i => i.severity === 'medium').length;
  const low = issues.filter(i => i.severity === 'low').length;
  
  let score = 100;
  score -= critical * 15; // -15 points per critical issue
  score -= medium * 5;    // -5 points per medium issue
  score -= low * 1;       // -1 point per low issue
  
  return Math.max(0, Math.min(100, score));
}

// Debug helper for development
export function debugReportStructure(reportData) {
  console.log('Report Data Structure:', {
    url: reportData.url,
    status: reportData.status,
    timestamp: reportData.timestamp,
    security: {
      score: reportData.security?.score,
      total: reportData.security?.total,
      critical: reportData.security?.critical,
      medium: reportData.security?.medium,
      low: reportData.security?.low,
      issuesCount: reportData.security?.issues?.length || 0
    },
    scanners: reportData.scanners ? Object.keys(reportData.scanners) : [],
    scannersWithIssues: reportData.scanners ? 
      Object.entries(reportData.scanners)
        .filter(([key, scanner]) => scanner.issues && scanner.issues.length > 0)
        .map(([key, scanner]) => ({ 
          scanner: key, 
          issueCount: scanner.issues.length 
        })) : []
  });
}