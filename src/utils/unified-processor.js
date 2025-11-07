import { createIssueId } from './categorization';

// MASTER processing function - used by EVERYTHING
export async function processWebsiteScan(url, includeFullDetails = false) {
  console.log(`🔄 Starting unified scan for: ${url} (fullDetails: ${includeFullDetails})`);
  
  try {
    // Import scanners dynamically to avoid circular imports
    const { scanSSL } = await import('../scanners/ssl');
    const { scanHeaders } = await import('../scanners/headers');
    const { scanExposedFiles } = await import('../scanners/files');
    const { scanForOWASPVulnerabilities } = await import('../scanners/owasp');
    const { scanForStripeIssues } = await import('../scanners/stripe');
    const { scanWordPress } = await import('../scanners/wordpress');
    const { scanForSecrets } = await import('../scanners/secrets');
    const { scanForSupabaseIssues } = await import('../scanners/supabase');
    const { scanSEO } = await import('../scanners/seo');
    const { scanPerformance } = await import('../scanners/performance');
    const { scanCompliance } = await import('../scanners/compliance');
    
    // Normalize URL
    const normalizedUrl = normalizeUrl(url);
    
    // Run ALL scanners with consistent error handling
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
    
    // Extract results with fallbacks
    const results = scannerResults.map((result, index) => {
      const scannerNames = ['SSL', 'Headers', 'Files', 'OWASP', 'Stripe', 'WordPress', 'Secrets', 'Supabase', 'SEO', 'Performance', 'Compliance'];
      
      if (result.status === 'fulfilled') {
        console.log(`✅ ${scannerNames[index]}: ${result.value?.issues?.length || 0} issues`);
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
    
    console.log(`📋 Collected ${allRawIssues.length} raw issues`);
    
    // UNIFIED categorization and deduplication
    const processedIssues = new Set();
    const categorizedIssues = {
      security: [],
      seo: [],
      performance: [],
      compliance: []
    };
    
    allRawIssues.forEach(issue => {
      if (!issue || !issue.type) return;
      
      // Create stable deduplication ID
      const issueId = createIssueId(issue);
      if (processedIssues.has(issueId)) {
        console.log(`🔄 Skipping duplicate: ${issue.type}`);
        return;
      }
      processedIssues.add(issueId);
      
      // Enhance issue with fix details if requested
      const enhancedIssue = includeFullDetails ? enhanceIssueWithDetails(issue) : issue;
      
      // Categorize using CONSISTENT logic
      const category = categorizeIssueType(enhancedIssue.type);
      categorizedIssues[category].push(enhancedIssue);
      
      console.log(`📝 ${enhancedIssue.type} → ${category.toUpperCase()}`);
    });
    
    console.log(`🎯 Final categorization:`, {
      security: categorizedIssues.security.length,
      seo: categorizedIssues.seo.length,
      performance: categorizedIssues.performance.length,
      compliance: categorizedIssues.compliance.length
    });
    
    // Calculate scores consistently
    const dimensions = {};
    Object.keys(categorizedIssues).forEach(dimension => {
      const issues = categorizedIssues[dimension];
      dimensions[dimension] = {
        score: calculateDimensionScore(issues),
        total: issues.length,
        critical: issues.filter(i => i.severity === 'critical').length,
        medium: issues.filter(i => i.severity === 'medium').length,
        low: issues.filter(i => i.severity === 'low').length,
        issues: issues
      };
    });
    
    // Calculate overall score
    const overallScore = Math.round(
      (dimensions.security.score * 0.35) +
      (dimensions.seo.score * 0.25) +
      (dimensions.performance.score * 0.25) +
      (dimensions.compliance.score * 0.15)
    );
    
    // Combine all issues
    const allCategorizedIssues = [
      ...categorizedIssues.security,
      ...categorizedIssues.seo,
      ...categorizedIssues.performance,
      ...categorizedIssues.compliance
    ];
    
    return {
      url: normalizedUrl,
      scanId: generateScanId(),
      timestamp: new Date().toISOString(),
      isWordPress: wordpressResults.isWordPress || false,
      
      // Dimensional data
      security: dimensions.security,
      seo: dimensions.seo,
      performance: dimensions.performance,
      compliance: dimensions.compliance,
      
      // Summary
      summary: {
        overallScore,
        securityScore: dimensions.security.score,
        seoScore: dimensions.seo.score,
        performanceScore: dimensions.performance.score,
        complianceScore: dimensions.compliance.score,
        total: allCategorizedIssues.length,
        critical: allCategorizedIssues.filter(i => i.severity === 'critical').length,
        medium: allCategorizedIssues.filter(i => i.severity === 'medium').length,
        low: allCategorizedIssues.filter(i => i.severity === 'low').length
      },
      
      // Legacy compatibility
      issues: allCategorizedIssues,
      previewIssues: allCategorizedIssues.slice(0, 3).map(issue => ({
        type: issue.type,
        severity: issue.severity,
        description: issue.description
      })),
      
      scanners: createScannersFromResults(results)
    };
    
  } catch (error) {
    console.error('Unified scan error:', error);
    throw error;
  }
}

// Helper functions
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

async function withRetry(fn, maxRetries = 2) {
  let lastError;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 500 * Math.pow(2, attempt)));
      }
    }
  }
  
  throw lastError;
}

function sanitizeIssues(issues) {
  if (!Array.isArray(issues)) return [];
  
  return issues.map(issue => {
    if (!issue) return null;
    
    const type = issue.type || `generic-issue-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    
    let severity = issue.severity || 'medium';
    if (!['critical', 'medium', 'low'].includes(severity)) {
      if (severity === 'high') severity = 'critical';
      else if (severity === 'info' || severity === 'informational') severity = 'low';
      else severity = 'medium';
    }
    
    const description = issue.description || `Website issue of type ${type}`;
    
    return {
      type,
      severity,
      description,
      ...(issue.location ? { location: issue.location } : {}),
      ...(issue.fix ? { fix: issue.fix } : {})
    };
  }).filter(issue => issue !== null);
}

function categorizeIssueType(type) {
  // Import and use your existing categorization logic
  const { categorizeIssueType: existingCategorize } = require('./categorization');
  return existingCategorize(type);
}

function enhanceIssueWithDetails(issue) {
  if (issue.fix) return issue; // Already has fix details
  
  return {
    ...issue,
    fix: {
      title: `Fix for ${issue.description}`,
      description: getDetailedRecommendation(issue),
      code: getCodeExample(issue)
    }
  };
}

function calculateDimensionScore(issues) {
  if (!issues || issues.length === 0) return 100;
  
  const critical = issues.filter(i => i.severity === 'critical').length;
  const medium = issues.filter(i => i.severity === 'medium').length;
  const low = issues.filter(i => i.severity === 'low').length;
  
  const maxDeduction = 50;
  let totalDeduction = (critical * 3) + (medium * 1.5) + (low * 0.5);
  totalDeduction = Math.min(totalDeduction, maxDeduction);
  
  return Math.max(40, Math.min(100, Math.round(100 - totalDeduction)));
}

function generateScanId() {
  return 'scan_' + Date.now() + '_' + Math.random().toString(36).substring(2, 15);
}

function createScannersFromResults(results) {
  // Create scanner structure from results
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

function getDetailedRecommendation(issue) {
  return "Address this issue to improve your website.";
}

function getCodeExample(issue) {
  return null;
}
