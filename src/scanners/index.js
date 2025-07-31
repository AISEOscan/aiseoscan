// FIXED: /src/scanners/index.js
// Returns clean raw data for processing

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

// MAIN FUNCTION: Returns clean raw data for processMultiDimensionalData to process
export async function runPreliminaryScan(url) {
  try {
    console.log(`🔍 Starting preliminary scan for: ${url}`);
    
    const normalizedUrl = normalizeUrl(url);
    console.log(`📝 Normalized URL: ${normalizedUrl}`);
    
    // Run all scanners in parallel
    const scannerResults = await Promise.allSettled([
      withRetry(() => scanSSL(normalizedUrl)),
      withRetry(() => scanHeaders(normalizedUrl)),
      withRetry(() => scanExposedFiles(normalizedUrl)),     
      withRetry(() => scanForOWASPVulnerabilities(normalizedUrl)), 
      withRetry(() => scanForStripeIssues(normalizedUrl)),  
      withRetry(() => scanWordPress(normalizedUrl)),        
      withRetry(() => scanForSecrets(normalizedUrl)),       
      withRetry(() => scanForSupabaseIssues(normalizedUrl)),
      withRetry(() => scanSEO(normalizedUrl)),
      withRetry(() => scanPerformance(normalizedUrl)),
      withRetry(() => scanCompliance(normalizedUrl))
    ]);
    
    // Extract and validate results
    const results = scannerResults.map((result, index) => {
      const scannerNames = ['SSL', 'Headers', 'Files', 'OWASP', 'Stripe', 'WordPress', 'Secrets', 'Supabase', 'SEO', 'Performance', 'Compliance'];
      
      if (result.status === 'fulfilled') {
        const issueCount = result.value?.issues?.length || 0;
        console.log(`✅ ${scannerNames[index]}: ${issueCount} issues found`);
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

    // Detect WordPress
    const isWordPress = wordpressResults.isWordPress || false;
    console.log(`🔍 WordPress detected: ${isWordPress}`);
    
    // Collect and sanitize ALL issues
    const allRawIssues = [
      ...sanitizeIssues(sslResults.issues || []),
      ...sanitizeIssues(headersResults.issues || []),
      ...sanitizeIssues(filesResults.issues || []),         
      ...sanitizeIssues(owaspResults.issues || []),         
      ...sanitizeIssues(stripeResults.issues || []),        
      ...sanitizeIssues(wordpressResults.issues || []),     
      ...sanitizeIssues(secretsResults.issues || []),       
      ...sanitizeIssues(supabaseResults.issues || []),
      ...sanitizeIssues(seoResults.issues || []),
      ...sanitizeIssues(performanceResults.issues || []),
      ...sanitizeIssues(complianceResults.issues || [])
    ];

    console.log(`📊 Collected ${allRawIssues.length} total issues from all scanners`);

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
      
      // Scanner metadata for reference
      scanners: createScannersFromResults(results),
      
      // Preview issues for frontend display
      previewIssues: selectPreviewIssues(allRawIssues, 3)
    };

    console.log('✅ PRELIMINARY SCAN COMPLETE:', {
      url: normalizedUrl,
      totalIssues: rawScanData.issues.length,
      breakdown: {
        critical: rawScanData.summary.critical,
        medium: rawScanData.summary.medium,
        low: rawScanData.summary.low
      },
      isWordPress: rawScanData.isWordPress,
      note: 'Raw data ready for processMultiDimensionalData()'
    });

    return rawScanData;
    
  } catch (error) {
    console.error('❌ Preliminary scan error:', error);
    throw new Error(`Failed to run preliminary scan: ${error.message}`);
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
    const type = issue.type || `generic-issue-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    
    // Normalize and validate severity
    let severity = issue.severity || 'medium';
    
    if (!['critical', 'medium', 'low'].includes(severity)) {
      console.log(`⚠️ Normalizing invalid severity "${severity}" for issue ${type}`);
      if (severity === 'high') severity = 'critical';
      else if (severity === 'info' || severity === 'informational') severity = 'low';
      else severity = 'medium';
    }
    
    // Ensure description
    const description = issue.description || `Website issue of type ${type}`;
    
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