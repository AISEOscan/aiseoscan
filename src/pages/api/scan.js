import { runPreliminaryScan } from '../../scanners';
import { rateLimit } from '../../../lib/rateLimit.js';
import { generateReportId, storeReport } from '../../utils/report';
import { processMultiDimensionalData } from '../../utils/categorization';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress || 'unknown';
  const userAgent = req.headers['user-agent'] || '';

  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    let formattedUrl = url;
    if (!formattedUrl.startsWith('http')) {
      formattedUrl = 'https://' + formattedUrl;
    }

    // Validate URL format
    try {
      new URL(formattedUrl);
    } catch (error) {
      return res.status(400).json({ 
        error: 'Invalid URL format',
        details: 'Please enter a valid website URL (e.g., example.com or https://example.com)'
      });
    }

    // CRITICAL: Check rate limits BEFORE processing
    // This checks both global (IP-based) and per-URL limits
    const rateLimitResult = await rateLimit(ip, formattedUrl, userAgent);

    if (!rateLimitResult.allowed) {
      const errorResponse = {
        error: rateLimitResult.message || 'Rate limit exceeded',
        retryAfter: rateLimitResult.resetAt,
        type: rateLimitResult.type, // 'global' or 'url'
      };

      // Add upgrade info for URL-specific limits
      if (rateLimitResult.type === 'url') {
        errorResponse.upgradeMessage = 'Get unlimited scans with our paid plans';
        errorResponse.upgradeUrl = '/buy-credits';
        errorResponse.scansUsed = rateLimitResult.scansUsed;
      }

      return res.status(429).json(errorResponse);
    }

    console.log(`🔍 FREE SCAN API: Starting scan for ${formattedUrl}`, {
      ip: ip.substring(0, 10) + '...',
      globalRemaining: rateLimitResult.global?.remaining,
      urlRemaining: rateLimitResult.url?.remaining,
      urlScansUsed: rateLimitResult.url?.scansUsed
    });
    
    // Step 1: Get raw scan data from scanners
    const rawScanData = await runPreliminaryScan(formattedUrl);
    
    console.log(`🔍 FREE SCAN API - Raw data from scanners:`, {
      totalIssues: rawScanData.issues?.length || 0,
      summary: rawScanData.summary,
      hasIssues: !!rawScanData.issues,
      sampleIssues: rawScanData.issues?.slice(0, 3).map(i => i.type) || []
    });

    // Step 2: Generate report IDs and prepare storage
    const reportIds = generateReportId();
    const createdAt = new Date().toISOString();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    // Step 3: Store ONLY raw data with clear structure
    const reportToStore = {
      id: reportIds.id,
      publicId: reportIds.publicId,
      url: formattedUrl,
      createdAt,
      expiresAt,
      status: 'preliminary',
      
      // CRITICAL: Store complete raw data structure
      scanId: rawScanData.scanId,
      timestamp: rawScanData.timestamp,
      isWordPress: rawScanData.isWordPress,
      issues: rawScanData.issues,                    // Raw issues array
      summary: rawScanData.summary,                  // Basic severity summary
      scanners: rawScanData.scanners,                // Scanner metadata
      previewIssues: rawScanData.previewIssues,      // For frontend preview
      
      // Store backup of raw data
      _rawScanData: JSON.parse(JSON.stringify(rawScanData))
    };

    await storeReport(reportToStore);

    // Step 4: Process for immediate frontend display (NOT stored)
    const processedForDisplay = processMultiDimensionalData(rawScanData);
    
    console.log(`✅ FREE SCAN API - Complete! Stored raw data, returning processed:`, {
      reportId: reportIds.publicId,
      storedRawIssues: rawScanData.issues?.length || 0,
      returnedDimensions: {
        security: processedForDisplay.security?.total,
        seo: processedForDisplay.seo?.total,
        performance: processedForDisplay.performance?.total,
        compliance: processedForDisplay.compliance?.total
      }
    });

    // Step 5: Return processed data with rate limit info
    return res.status(200).json({
      reportId: reportIds.publicId,
      ...processedForDisplay,
      
      // Include rate limit info in response (helpful for UI)
      rateLimitInfo: {
        globalRemaining: rateLimitResult.global?.remaining,
        urlScansRemaining: rateLimitResult.url?.remaining,
        urlScansUsed: rateLimitResult.url?.scansUsed,
        globalResetAt: rateLimitResult.global?.resetAt,
        urlResetAt: rateLimitResult.url?.resetAt
      }
    });

  } catch (error) {
    console.error('❌ Free scan API error:', error);
    return res.status(500).json({ 
      error: 'Failed to run security scan', 
      details: error.message 
    });
  }
}