// UPDATED: /src/utils/categorization.js 
// Phase 1: Simplified for AI SEO focus while preserving function signatures

export const isSecurityIssue = (type) => {
  if (!type || typeof type !== 'string') return false;
  
  const lowerType = type.toLowerCase();
  
  return lowerType.includes('ssl') || lowerType.includes('cert') || lowerType.includes('header') || 
         lowerType.includes('exposed') || lowerType.includes('secret') || lowerType.includes('stripe') ||
         lowerType.includes('supabase') || lowerType.includes('owasp') || lowerType.includes('vulnerability') ||
         lowerType.includes('xss') || lowerType.includes('csrf') || lowerType.includes('auth') ||
         lowerType.includes('cookie') || lowerType.includes('security') || lowerType.includes('hack') ||
         lowerType.includes('malware') || lowerType.includes('injection') ||
         lowerType.includes('wp-') || lowerType.includes('wordpress') ||
         lowerType.includes('hsts') || lowerType.includes('csp') || lowerType.includes('frame-options') ||
         lowerType.includes('redirect') || lowerType.includes('https') || lowerType.includes('referrer-policy') ||
         lowerType.includes('touch-icons') || lowerType.includes('pwa-features') || 
         lowerType.includes('modern-caching') || lowerType.includes('x-content-type') ||
         lowerType.includes('x-xss-protection') || lowerType.includes('missing-csp') ||
         lowerType.includes('missing-x-frame') || lowerType.includes('missing-hsts') ||
         lowerType.includes('missing-x-content') || lowerType.includes('missing-referrer');
};

// PHASE 1 CHANGE: Enhanced SEO detection for AI SEO focus
export const isSeoIssue = (type) => {
  if (!type || typeof type !== 'string') return false;
  
  const lowerType = type.toLowerCase();
  
  const seoKeywords = [
    // Core SEO
    'seo', 'meta', 'title', 'description', 'heading', 'schema', 'canonical', 
    'robots', 'sitemap', 'alt', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'missing-h1', 'content-length', 'keyword', 'search', 'ranking',
    
    // Social & Rich Snippets
    'twitter-cards', 'open-graph', 'structured-data', 'breadcrumb',
    'incomplete-twitter', 'incomplete-open-graph', 'missing-schema',
    
    // Content Quality (AI SEO focus)
    'content-quality', 'factual-density', 'author-credentials', 'expertise',
    'authority', 'trustworthiness', 'e-a-t', 'content-depth',
    'readability', 'content-structure', 'faq', 'qa-format',
    
    // Technical AI SEO
    'json-ld', 'microdata', 'rdfa', 'voice-search', 'featured-snippet',
    'answer-format', 'question-format', 'how-to', 'step-by-step',
    
    // Link analysis
    'no-links', 'duplicate', 'analytics', 'missing-analytics',
    'power-words', 'title-missing-power', 'anchor-text', 'internal-links',
    
    // Mobile & Modern SEO
    'mobile-optimization', 'viewport', 'amp', 'pwa',
    
    // AI-specific optimizations
    'ai-optimization', 'chatgpt-ready', 'llm-optimized', 'citation-ready'
  ];
  
  return seoKeywords.some(keyword => lowerType.includes(keyword));
};

export const isPerformanceIssue = (type) => {
  if (!type || typeof type !== 'string') return false;
  
  const lowerType = type.toLowerCase();
  
  // First check if it's already categorized as SEO or Security to avoid conflicts
  if (isSeoIssue(type) || isSecurityIssue(type)) {
    return false;
  }
  
  const performanceKeywords = [
    'performance', 'speed', 'load', 'compress', 'image', 
    'script', 'render', 'minif', 'blocking', 'third-party', 'css',
    'javascript', 'lazy', 'webp', 'optimization', 'bandwidth',
    'brotli', 'preload', 'prefetch', 'critical-resource',
    'mobile-optimization', 'amp', 'pwa', 'no-images',
    'render-blocking', 'suboptimal-css', 'missing-compression',
    'images-poor-filenames'
  ];
  
  return performanceKeywords.some(keyword => lowerType.includes(keyword));
};

export const isComplianceIssue = (type) => {
  if (!type || typeof type !== 'string') return false;
  
  const lowerType = type.toLowerCase();
  
  return lowerType.includes('compliance') || lowerType.includes('gdpr') || lowerType.includes('privacy') ||
         lowerType.includes('accessibility') || lowerType.includes('legal') || lowerType.includes('contact') ||
         lowerType.includes('terms') || lowerType.includes('tracking') || lowerType.includes('consent') ||
         lowerType.includes('policy') || lowerType.includes('a11y') || lowerType.includes('wcag') ||
         lowerType.includes('aria') || lowerType.includes('ada') || lowerType.includes('missing-gdpr');
};

// PHASE 1 CHANGE: Simplified categorization - most issues will be SEO for AI focus
export const categorizeIssueType = (type) => {
  if (!type || typeof type !== 'string') {
    console.warn('Invalid issue type provided to categorizeIssueType:', type);
    return 'seo'; // CHANGED: Default to SEO instead of security for AI focus
  }
  
  const lowerType = type.toLowerCase();
  
  // Priority 1: SEO issues (highest priority for AI SEO tool)
  if (isSeoIssue(lowerType)) return 'seo';
  
  // Priority 2: Security issues (but disabled scanners return empty)
  if (isSecurityIssue(lowerType)) return 'security';
  
  // Priority 3: Performance issues (but disabled scanners return empty)
  if (isPerformanceIssue(lowerType)) return 'performance';
  
  // Priority 4: Compliance issues (but disabled scanners return empty)
  if (isComplianceIssue(lowerType)) return 'compliance';
  
  // CHANGED: Default to SEO for unknown issues (AI SEO focus)
  console.log(`Unknown issue type "${type}", defaulting to SEO for AI focus`);
  return 'seo';
};

// Enhanced deduplication with better ID generation
export const createIssueId = (issue) => {
  if (!issue || !issue.type) {
    return `ai-seo-unknown-${Date.now()}-${Math.random()}`;
  }
  
  const typeHash = issue.type.toLowerCase().replace(/[^a-z0-9]/g, '');
  const descHash = (issue.description || '').substring(0, 30).toLowerCase().replace(/[^a-z0-9]/g, '');
  const locationHash = (issue.location || '').substring(0, 20).toLowerCase().replace(/[^a-z0-9]/g, '');
  
  return `${typeHash}-${descHash}-${locationHash}`.substring(0, 80);
};

// Safe severity counting with validation
function countIssuesBySeverity(issues, targetSeverity) {
  if (!Array.isArray(issues)) {
    console.warn('Invalid issues array provided to countIssuesBySeverity');
    return 0;
  }
  
  if (!['critical', 'medium', 'low'].includes(targetSeverity)) {
    console.warn('Invalid severity provided to countIssuesBySeverity:', targetSeverity);
    return 0;
  }
  
  try {
    return issues.filter(issue => {
      return issue && issue.severity === targetSeverity;
    }).length;
  } catch (error) {
    console.error('Error counting issues by severity:', error);
    return 0;
  }
}

// Validate issue structure
function validateIssue(issue, index) {
  if (!issue) {
    console.warn(`Null issue at index ${index}`);
    return false;
  }
  
  if (!issue.type || typeof issue.type !== 'string') {
    console.warn(`Invalid or missing type for issue at index ${index}:`, issue);
    return false;
  }
  
  if (!issue.severity || !['critical', 'medium', 'low'].includes(issue.severity)) {
    console.warn(`Invalid severity "${issue.severity}" for issue at index ${index}, will be normalized`);
    // Don't return false - we can fix this
  }
  
  return true;
}

// Normalize issue severity
function normalizeSeverity(severity) {
  if (!severity || typeof severity !== 'string') return 'medium';
  
  const lower = severity.toLowerCase();
  
  if (['critical', 'high', 'severe'].includes(lower)) return 'critical';
  if (['medium', 'moderate', 'warning'].includes(lower)) return 'medium';
  if (['low', 'minor', 'info', 'informational'].includes(lower)) return 'low';
  
  return 'medium'; // Default fallback
}

// CRITICAL: Main processing function with extensive validation (PRESERVED SIGNATURE)
export const processMultiDimensionalData = (data) => {
  try {
    console.log('🔄 PROCESSING AI SEO DATA:', {
      inputIssuesCount: data?.issues?.length || 0,
      inputType: typeof data,
      hasExistingDimensions: !!(data?.security?.total || data?.seo?.total),
      dataKeys: data ? Object.keys(data) : []
    });

    // Validate input data
    if (!data || typeof data !== 'object') {
      console.error('Invalid data input for processing:', data);
      throw new Error('Invalid data input - expected object');
    }

    // Create deep copy to avoid mutations
    let processedData;
    try {
      processedData = JSON.parse(JSON.stringify(data));
    } catch (parseError) {
      console.error('Error creating deep copy of data:', parseError);
      processedData = { ...data }; // Shallow copy fallback
    }
    
    // PHASE 1 CHANGE: Initialize dimensions with AI SEO focus (but preserve structure)
    processedData.security = {
      score: 100, // High score since disabled
      total: 0,
      critical: 0,
      medium: 0,
      low: 0,
      issues: []
    };

    processedData.seo = {
      score: 0, // Will be calculated after processing AI SEO issues
      total: 0,
      critical: 0,
      medium: 0,
      low: 0,
      issues: []
    };

    processedData.performance = {
      score: 100, // High score since disabled
      total: 0,
      critical: 0,
      medium: 0,
      low: 0,
      issues: []
    };

    processedData.compliance = {
      score: 100, // High score since disabled
      total: 0,
      critical: 0,
      medium: 0,
      low: 0,
      issues: []
    };

    // Process issues if they exist and are valid
    if (processedData.issues && Array.isArray(processedData.issues) && processedData.issues.length > 0) {
      console.log('🔍 Processing', processedData.issues.length, 'issues for AI SEO categorization');
      
      // Deduplicate and categorize issues
      const processedIssues = new Set();
      const categorizedIssues = {
        security: [],
        seo: [],
        performance: [],
        compliance: []
      };

      let validIssueCount = 0;
      let skippedIssueCount = 0;

      processedData.issues.forEach((issue, index) => {
        // Validate issue structure
        console.log(`🔍 CATEGORIZATION DEBUG: Issue ${index}:`, {
  type: issue.type,
  severity: issue.severity,
  description: issue.description?.substring(0, 50),
  isSeoByFunction: isSeoIssue(issue.type),
  categorizedAs: categorizeIssueType(issue.type)
})
        if (!validateIssue(issue, index)) {
          skippedIssueCount++;
          return;
        }
        
        try {
          // Normalize the issue
          const normalizedIssue = {
            ...issue,
            type: issue.type.trim(),
            severity: normalizeSeverity(issue.severity),
            description: issue.description || `AI SEO issue: ${issue.type}`
          };
          
          // Create unique identifier for deduplication
          const issueId = createIssueId(normalizedIssue);
          if (processedIssues.has(issueId)) {
            console.log(`Duplicate issue skipped: ${issueId}`);
            skippedIssueCount++;
            return;
          }
          processedIssues.add(issueId);
          
          // Categorize the issue
          const category = categorizeIssueType(normalizedIssue.type);
          categorizedIssues[category].push(normalizedIssue);
          validIssueCount++;
          
          console.log(`Issue "${normalizedIssue.type}" → ${category} (${normalizedIssue.severity})`);
        } catch (issueError) {
          console.error('Error processing issue at index', index, ':', issueError, issue);
          skippedIssueCount++;
          
          // Try to save the issue to SEO as fallback (CHANGED from security)
          try {
            categorizedIssues.seo.push({
              type: issue.type || `unknown-ai-seo-issue-${index}`,
              severity: 'medium',
              description: issue.description || 'Unknown AI SEO issue detected',
              ...issue
            });
            validIssueCount++;
          } catch (fallbackError) {
            console.error('Failed to save issue even as fallback:', fallbackError);
          }
        }
      });

      console.log(`✅ AI SEO issue processing complete: ${validIssueCount} processed, ${skippedIssueCount} skipped`);

      // Populate dimensional structures with validation
      ['security', 'seo', 'performance', 'compliance'].forEach(dimension => {
        const dimensionIssues = categorizedIssues[dimension] || [];
        
        processedData[dimension].issues = dimensionIssues;
        processedData[dimension].total = dimensionIssues.length;
        processedData[dimension].critical = countIssuesBySeverity(dimensionIssues, 'critical');
        processedData[dimension].medium = countIssuesBySeverity(dimensionIssues, 'medium');
        processedData[dimension].low = countIssuesBySeverity(dimensionIssues, 'low');
        
        // Validation: ensure counts add up
        const calculatedTotal = processedData[dimension].critical + processedData[dimension].medium + processedData[dimension].low;
        if (calculatedTotal !== processedData[dimension].total) {
          console.warn(`Count mismatch in ${dimension}: total=${processedData[dimension].total}, calculated=${calculatedTotal}`);
          // Use calculated total as it's more reliable
          processedData[dimension].total = calculatedTotal;
        }
      });

      // PHASE 1 CHANGE: Modified scoring for AI SEO focus
['security', 'seo', 'performance', 'compliance'].forEach(dimension => {
  const critical = processedData[dimension].critical;
  const medium = processedData[dimension].medium;
  const low = processedData[dimension].low;
  
  // FIXED: Calculate score differently for disabled vs active scanners
  if (dimension === 'seo') {
    // Active SEO scanner - calculate based on actual issues
    let calculatedScore = 100;
    calculatedScore -= critical * 8;   // -8 points per critical AI SEO issue
    calculatedScore -= medium * 3;     // -3 points per medium AI SEO issue  
    calculatedScore -= low * 1;        // -1 point per low AI SEO issue
    
    processedData[dimension].score = Math.max(0, Math.min(100, calculatedScore));
  } else if (dimension === 'compliance') {
    // Fixed scoring based on issue count for consistency across all displays
    if (critical > 0) {
      processedData[dimension].score = 70;
    } else if (medium > 0 || low > 0) {
      processedData[dimension].score = 85;
    } else {
      processedData[dimension].score = 100;
    }
  } else {
    // Disabled scanners with no issues - high score since they're not running
    processedData[dimension].score = 100;
  }
  
  console.log(`📊 ${dimension} score calculated: ${processedData[dimension].score} (${critical}/${medium}/${low} issues) ${dimension === 'seo' ? '[ACTIVE]' : (dimension === 'compliance' && (critical > 0 || medium > 0 || low > 0)) ? '[COMPLIANCE WITH ISSUES]' : '[DISABLED]'}`);
});


      const totalProcessed = processedData.security.total + processedData.seo.total + 
                           processedData.performance.total + processedData.compliance.total;

      console.log('✅ AI SEO CATEGORIZATION COMPLETE:', {
        security: processedData.security.total + ' (disabled)',
        seo: processedData.seo.total + ' (ACTIVE - AI SEO focus)',
        performance: processedData.performance.total + ' (disabled)',
        compliance: processedData.compliance.total + ' (disabled)',
        totalProcessed,
        originalCount: processedData.issues.length,
        validIssueCount,
        skippedIssueCount
      });

      // Verify we didn't lose issues
     if (totalProcessed < validIssueCount * 0.9) { // Allow for some deduplication
       console.warn(`Potential data loss detected: processed ${totalProcessed} but expected ~${validIssueCount}`);
     }

   } else {
     console.log('ℹ️ No valid issues to process, using zero counts');
   }

   // Calculate overall score with validation - PHASE 1 CHANGE: AI SEO focused weighting
   if (!processedData.summary) processedData.summary = {};
   
   try {
  // FIXED: Proper weighting that accounts for compliance issues
  const securityScore = processedData.security.score * 0.05;
  const seoScore = processedData.seo.score * 0.75;  // Primary AI SEO focus
  const performanceScore = processedData.performance.score * 0.05;
  
  // FIXED: Give compliance proper weight if it has issues, minimal weight if disabled
  const complianceWeight = (processedData.compliance.critical > 0 || processedData.compliance.medium > 0 || processedData.compliance.low > 0) ? 0.15 : 0.05;
  const complianceScore = processedData.compliance.score * complianceWeight;
  
  const calculatedOverallScore = Math.round(securityScore + seoScore + performanceScore + complianceScore);
  
  processedData.summary.overallScore = Math.max(0, Math.min(100, calculatedOverallScore));
  console.log(`🎯 AI SEO Overall Score: ${processedData.summary.overallScore} (SEO: ${processedData.seo.score}, Compliance: ${processedData.compliance.score})`);
} catch (scoreError) {
  console.error('Error calculating overall score:', scoreError);
  processedData.summary.overallScore = 80; // Safe fallback
}

   // Update summary totals with validation
   const totalIssues = processedData.security.total + processedData.seo.total + 
                      processedData.performance.total + processedData.compliance.total;
   const totalCritical = processedData.security.critical + processedData.seo.critical + 
                        processedData.performance.critical + processedData.compliance.critical;
   const totalMedium = processedData.security.medium + processedData.seo.medium + 
                      processedData.performance.medium + processedData.compliance.medium;
   const totalLow = processedData.security.low + processedData.seo.low + 
                   processedData.performance.low + processedData.compliance.low;
   
   processedData.summary.total = totalIssues;
   processedData.summary.critical = totalCritical;
   processedData.summary.medium = totalMedium;
   processedData.summary.low = totalLow;
   
   // Final validation
   const summaryTotal = totalCritical + totalMedium + totalLow;
   if (summaryTotal !== totalIssues) {
     console.warn(`Summary count mismatch: total=${totalIssues}, sum=${summaryTotal}`);
     // Use the sum as it's more accurate
     processedData.summary.total = summaryTotal;
   }

   console.log('✅ FINAL AI SEO PROCESSED DATA VALIDATION:', {
     overallScore: processedData.summary.overallScore,
     totalIssues: processedData.summary.total,
     breakdown: `${processedData.summary.critical}/${processedData.summary.medium}/${processedData.summary.low}`,
     dimensions: {
       security: `${processedData.security.total} (disabled) - Score: ${processedData.security.score}`,
       seo: `${processedData.seo.total} (ACTIVE AI SEO) - Score: ${processedData.seo.score}`,
       performance: `${processedData.performance.total} (disabled) - Score: ${processedData.performance.score}`,
       compliance: `${processedData.compliance.total} (disabled) - Score: ${processedData.compliance.score}`
     }
   });

   return processedData;
   
 } catch (error) {
   console.error('❌ Critical error in processMultiDimensionalData:', error);
   console.error('Stack trace:', error.stack);
   
   // PHASE 1 CHANGE: AI SEO focused safe fallback structure
   const safeFallback = {
     ...data,
     security: { score: 100, total: 0, critical: 0, medium: 0, low: 0, issues: [] }, // High score (disabled)
     seo: { score: 75, total: 0, critical: 0, medium: 0, low: 0, issues: [] },       // Medium score (active but no data)
     performance: { score: 100, total: 0, critical: 0, medium: 0, low: 0, issues: [] }, // High score (disabled)
     compliance: { score: 100, total: 0, critical: 0, medium: 0, low: 0, issues: [] },  // High score (disabled)
     summary: { 
       overallScore: 85, // Good score since most scanners disabled
       total: 0, 
       critical: 0, 
       medium: 0, 
       low: 0,
       error: 'Processing failed - using AI SEO safe defaults'
     }
   };
   
   console.log('📦 Returning AI SEO safe fallback structure due to processing error');
   return safeFallback;
 }
};

// PRESERVED: Growth PDF version (excludes security) with validation
export const processGrowthDimensionalData = (data) => {
 try {
   const fullProcessed = processMultiDimensionalData(data);
   
   // Remove security dimension for growth reports
   const growthData = {
     ...fullProcessed,
     security: undefined
   };
   
   // PHASE 1 CHANGE: Recalculate overall score for AI SEO focus (without security)
   if (growthData.summary) {
     growthData.summary.overallScore = Math.round(
       (growthData.seo.score * 0.85) +        // HEAVILY weighted on AI SEO
       (growthData.performance.score * 0.10) + // Minimal (disabled)
       (growthData.compliance.score * 0.05)    // Minimal (disabled)
     );
     console.log(`🎯 Growth PDF Score (AI SEO focused): ${growthData.summary.overallScore}`);
   }
   
   return growthData;
 } catch (error) {
   console.error('Error in processGrowthDimensionalData:', error);
   return processMultiDimensionalData(data); // Fallback to full processing
 }
};