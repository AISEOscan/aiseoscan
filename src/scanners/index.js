// UPDATED: /src/scanners/index.js
// Phase 1: Simplified for AI SEO focus while preserving architecture

import { scanSSL } from './ssl';
import { scanHeaders } from './headers';
import { scanExposedFiles } from './files';
import { scanForOWASPVulnerabilities } from './owasp';
import { scanForStripeIssues } from './stripe';
import { scanWordPress } from './wordpress';
import { scanForSecrets } from './secrets';
import { scanForSupabaseIssues } from './supabase';
import { generateScanId } from '../utils/report';
import { scanSEO } from './seo';
import { scanPerformance } from './performance';
import { scanCompliance } from './compliance';

// Standardize timeout values
export const REQUEST_TIMEOUT = 8000; 

// Helper function to create scanners metadata from results
function createScannersFromResults(results) {
  return {
    ssl: { status: 'completed', issues: results[0]?.issues || [] },
    headers: { status: 'completed', issues: results[1]?.issues || [] },
    exposedFiles: { status: 'completed', issues: results[2]?.issues || [] },
    owasp: { status: 'completed', issues: results[3]?.issues || [] },
    stripe: { status: 'completed', issues: results[4]?.issues || [] },
    wordpress: { status: 'completed', issues: results[5]?.issues || [] },
    secrets: { status: 'completed', issues: results[6]?.issues || [] },
    supabase: { status: 'completed', issues: results[7]?.issues || [] },
    seo: { status: 'completed', issues: results[8]?.issues || [] },
    performance: { status: 'completed', issues: results[9]?.issues || [] },
    compliance: { status: 'completed', issues: results[10]?.issues || [] }
  };
}

// Helper function for retrying failed operations
async function withRetry(fn, maxRetries = 2) {
  let lastError;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      console.error(`Attempt ${attempt + 1}/${maxRetries + 1} failed:`, error.message);
      lastError = error;
      
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 500 * Math.pow(2, attempt)));
      }
    }
  }
  
  throw lastError;
}

// Normalize URL for consistent scanning
function normalizeUrl(url) {
  try {
    let formattedUrl = url;
    if (!formattedUrl.startsWith('http')) {
      formattedUrl = 'https://' + formattedUrl;
    }
    
    const parsedUrl = new URL(formattedUrl);
    let baseUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}`;
    
    if (parsedUrl.port) {
      baseUrl += `:${parsedUrl.port}`;
    }
    
    if (parsedUrl.pathname && parsedUrl.pathname !== '/') {
      baseUrl += parsedUrl.pathname;
    }
    
    if (parsedUrl.search) {
      baseUrl += parsedUrl.search;
    }
    
    return baseUrl;
  } catch (error) {
    console.error('URL normalization error:', error);
    return url;
  }
}

// PHASE 1 CHANGE: Return empty results for non-SEO scanners
async function runDisabledScanner(scannerName) {
  console.log(`🔄 ${scannerName} scanner disabled for AI SEO focus - returning empty results`);
  return { issues: [] };
}

// MAIN FUNCTION: Returns clean raw data for processMultiDimensionalData to process
export async function runPreliminaryScan(url) {
  try {
    console.log(`🔍 Starting AI SEO scan for: ${url}`);
    
    const normalizedUrl = normalizeUrl(url);
    console.log(`📝 Normalized URL: ${normalizedUrl}`);
    
    // PHASE 1 CHANGE: Only run SEO scanner, return empty for others
    console.log('🎯 Running AI SEO-focused scan (non-SEO scanners disabled)');
    
    const scannerResults = await Promise.allSettled([
      // Disabled scanners - return empty results but preserve structure
      runDisabledScanner('SSL'),
      runDisabledScanner('Headers'), 
      runDisabledScanner('ExposedFiles'),
      runDisabledScanner('OWASP'),
      runDisabledScanner('Stripe'),
      runDisabledScanner('WordPress'),
      runDisabledScanner('Secrets'),
      runDisabledScanner('Supabase'),
      
      // ACTIVE: Enhanced SEO scanner
      withRetry(() => scanSEO(normalizedUrl)),
      
      // Disabled scanners
      runDisabledScanner('Performance'),
      runDisabledScanner('Compliance')
    ]);
    
    // Extract and validate results
    const results = scannerResults.map((result, index) => {
      const scannerNames = ['SSL', 'Headers', 'Files', 'OWASP', 'Stripe', 'WordPress', 'Secrets', 'Supabase', 'SEO', 'Performance', 'Compliance'];
      
      if (result.status === 'fulfilled') {
        const issueCount = result.value?.issues?.length || 0;
        if (index === 8) { // SEO scanner
          console.log(`✅ ${scannerNames[index]}: ${issueCount} AI SEO issues found`);
        } else {
          console.log(`⏸️  ${scannerNames[index]}: Disabled (${issueCount} issues - empty as expected)`);
        }
        return result.value || { issues: [] };
      } else {
        console.error(`❌ ${scannerNames[index]} failed:`, result.reason?.message);
        return { issues: [] };
      }
    });
    
    const [
      sslResults, headersResults, filesResults, owaspResults, stripeResults,
      wordpressResults, secretsResults, supabaseResults, seoResults,
      performanceResults, complianceResults
    ] = results;

    // WordPress detection (keep for potential AI SEO insights)
    const isWordPress = wordpressResults.isWordPress || false;
    console.log(`🔍 WordPress detected: ${isWordPress}`);
    
    // PHASE 1 CHANGE: Only collect SEO issues, but maintain structure for categorization.js
    const allRawIssues = [
      ...sanitizeIssues(sslResults.issues || []),      // Empty but preserves structure
      ...sanitizeIssues(headersResults.issues || []),  // Empty but preserves structure
      ...sanitizeIssues(filesResults.issues || []),    // Empty but preserves structure        
      ...sanitizeIssues(owaspResults.issues || []),    // Empty but preserves structure         
      ...sanitizeIssues(stripeResults.issues || []),   // Empty but preserves structure        
      ...sanitizeIssues(wordpressResults.issues || []),// Empty but preserves structure     
      ...sanitizeIssues(secretsResults.issues || []),  // Empty but preserves structure       
      ...sanitizeIssues(supabaseResults.issues || []), // Empty but preserves structure
      ...sanitizeIssues(seoResults.issues || []),      // ACTIVE: All AI SEO issues
      ...sanitizeIssues(performanceResults.issues || []), // Empty but preserves structure
      ...sanitizeIssues(complianceResults.issues || [])   // Empty but preserves structure
    ];

    console.log(`📊 Collected ${allRawIssues.length} total AI SEO issues (non-SEO scanners disabled)`);

    // Create clean raw data structure (no dimensional processing here)
    const rawScanData = {
      url: normalizedUrl,
      scanId: generateScanId(),
      timestamp: new Date().toISOString(),
      isWordPress: isWordPress,
      status: 'preliminary',
      
      // Clean issues array - processMultiDimensionalData will categorize these
      issues: allRawIssues,
      
      // Basic summary (severity-based only)
      summary: {
        total: allRawIssues.length,
        critical: allRawIssues.filter(i => i.severity === 'critical').length,
        medium: allRawIssues.filter(i => i.severity === 'medium').length,
        low: allRawIssues.filter(i => i.severity === 'low').length
      },
      
      // Scanner metadata for reference (preserves structure)
      scanners: createScannersFromResults(results),
      
      // Preview issues for frontend display
      previewIssues: selectPreviewIssues(allRawIssues, 3)
    };

    console.log('✅ AI SEO SCAN COMPLETE:', {
      url: normalizedUrl,
      totalIssues: rawScanData.issues.length,
      breakdown: {
        critical: rawScanData.summary.critical,
        medium: rawScanData.summary.medium,
        low: rawScanData.summary.low
      },
      isWordPress: rawScanData.isWordPress,
      note: 'AI SEO data ready for processMultiDimensionalData()'
    });

    return rawScanData;
    
  } catch (error) {
    console.error('❌ AI SEO scan error:', error);
    throw new Error(`Failed to run AI SEO scan: ${error.message}`);
  }
}

// Select representative preview issues
function selectPreviewIssues(issues, maxCount) {
  if (!issues || issues.length === 0) return [];
  
  const criticalIssues = issues.filter(issue => issue.severity === 'critical');
  const mediumIssues = issues.filter(issue => issue.severity === 'medium');
  const lowIssues = issues.filter(issue => issue.severity === 'low');
  
  let previewIssues = [];
  
  // Prioritize critical issues
  previewIssues = previewIssues.concat(criticalIssues.slice(0, maxCount));
  
  // Fill with medium issues if space available
  if (previewIssues.length < maxCount) {
    previewIssues = previewIssues.concat(mediumIssues.slice(0, maxCount - previewIssues.length));
  }
  
  // Fill with low issues if space available
  if (previewIssues.length < maxCount) {
    previewIssues = previewIssues.concat(lowIssues.slice(0, maxCount - previewIssues.length));
  }
  
  previewIssues = previewIssues.slice(0, maxCount);
  
  // Return clean preview data (no fix details in preview)
  return previewIssues.map(issue => ({
    type: issue.type,
    severity: issue.severity,
    description: issue.description
  }));
}

// Ensure all issues have required properties and valid data
function sanitizeIssues(issues) {
  if (!issues || !Array.isArray(issues)) return [];
  
  return issues.map((issue, index) => {
    if (!issue) {
      console.warn(`Null issue at index ${index}, skipping`);
      return null;
    }
    
    // Ensure required type property
    const type = issue.type || `ai-seo-issue-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    
    // Normalize and validate severity
    let severity = issue.severity || 'medium';
    
    if (!['critical', 'medium', 'low'].includes(severity)) {
      console.log(`⚠️ Normalizing invalid severity "${severity}" for issue ${type}`);
      if (severity === 'high') severity = 'critical';
      else if (severity === 'info' || severity === 'informational') severity = 'low';
      else severity = 'medium';
    }
    
    // Ensure description
    const description = issue.description || `AI SEO issue of type ${type}`;
    
    // Build clean issue object
    const sanitizedIssue = {
      type,
      severity,
      description,
      // Include optional properties if present
      ...(issue.location ? { location: issue.location } : {}),
      ...(issue.fix ? { fix: issue.fix } : {}),
      ...(issue.details ? { details: issue.details } : {}),
      ...(issue.url ? { url: issue.url } : {}),
      ...(issue.value ? { value: issue.value } : {})
    };
    
    return sanitizedIssue;
  }).filter(issue => issue !== null);
}