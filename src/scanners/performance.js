import axios from 'axios';
import { REQUEST_TIMEOUT } from './index';

// Performance thresholds and constants
const PERFORMANCE_THRESHOLDS = {
  LOAD_TIME: {
    CRITICAL: 3000,
    SLOW: 2000,
    MODERATE: 1500
  },
  PAGE_SIZE: {
    CRITICAL: 3000000, // 3MB
    WARNING: 1500000,  // 1.5MB
    GOOD: 500000       // 500KB
  },
  CORE_WEB_VITALS: {
    LCP: {
      GOOD: 2500,
      NEEDS_IMPROVEMENT: 4000
    },
    CLS: {
      GOOD: 0.1,
      NEEDS_IMPROVEMENT: 0.25
    },
    INP: {
      GOOD: 200,
      NEEDS_IMPROVEMENT: 500
    }
  },
  RESOURCE_LIMITS: {
    CSS_FILES: 3,
    JS_FILES: 5,
    THIRD_PARTY_SCRIPTS: 5,
    INLINE_CSS_BLOCKS: 3,
    INLINE_JS_BLOCKS: 3,
    LARGE_IMAGE_SIZE: 500000 // 500KB
  }
};

// Modern web standards and best practices
const MODERN_FORMATS = {
  IMAGES: ['webp', 'avif'],
  COMPRESSION: ['br', 'gzip'],
  PROTOCOLS: ['http/2', 'http/3']
};

// Core Web Vitals estimation utilities
const estimateWebVitals = (loadTime, pageSize, resourceCount) => {
  // Simplified estimation based on performance metrics
  const lcp = Math.max(loadTime * 0.8, 1000); // LCP usually 80% of load time
  const cls = Math.min(resourceCount * 0.02, 0.5); // More resources = more layout shift
  const inp = Math.max(100, loadTime * 0.1); // Base responsiveness estimate
  
  return { lcp, cls, inp };
};

// Main performance scanning function
async function scanPerformance(url) {
  try {
    // Make sure URL is properly formatted
    const parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
    const baseUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}`;
    
    console.log(`Starting comprehensive performance scan for: ${baseUrl}`);
    
    // Fetch the main page with performance timing
    const startTime = Date.now();
    const response = await axios.get(baseUrl, {
      timeout: REQUEST_TIMEOUT,
      validateStatus: () => true,
      headers: {
        'User-Agent': 'FounderScan Performance Bot (Mozilla/5.0 compatible)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive'
      }
    });
    const loadTime = Date.now() - startTime;
    
    const html = typeof response.data === 'string' ? response.data : '';
    const issues = [];
    
    if (!html) {
      return {
        scanner: 'performance',
        status: 'error',
        error: 'Unable to fetch page content',
        issues: []
      };
    }
    
    const pageSize = Buffer.byteLength(html, 'utf8');
    const resourceCounts = analyzeResourceCounts(html);
    const estimatedVitals = estimateWebVitals(loadTime, pageSize, resourceCounts.total);
    
    console.log(`Performance scan - Page loaded in ${loadTime}ms, ${html.length} characters, ${Math.round(pageSize/1024)}KB`);
    
    // 1. Advanced Load Time Analysis
    const loadTimeIssues = checkAdvancedLoadTime(loadTime, pageSize);
    issues.push(...loadTimeIssues);
    
    // 2. Page Size Optimization
    const pageSizeIssues = checkPageSizeOptimization(pageSize, html, loadTime);
    issues.push(...pageSizeIssues);
    
    // 3. Core Web Vitals Focus
    const webVitalsIssues = checkCoreWebVitals(estimatedVitals, loadTime, pageSize);
    issues.push(...webVitalsIssues);
    
    // 4. Modern Compression & Caching
    const compressionIssues = await checkModernCompression(response.headers, html);
    issues.push(...compressionIssues);
    
    // 5. Enhanced Resource Optimization
    const resourceIssues = await checkEnhancedResourceOptimization(html, response.headers, baseUrl);
    issues.push(...resourceIssues);
    
    // 6. Image Performance Excellence
    const imageIssues = await checkImagePerformanceExcellence(html, baseUrl);
    issues.push(...imageIssues);
    
    // 7. JavaScript Optimization
    const jsOptimizationIssues = checkJavaScriptOptimization(html);
    issues.push(...jsOptimizationIssues);
    
    // 8. Mobile Performance Excellence
    const mobileIssues = checkMobilePerformanceExcellence(html);
    issues.push(...mobileIssues);
    
    // 9. Resource Loading Optimization
    const resourceLoadingIssues = checkResourceLoadingOptimization(html);
    issues.push(...resourceLoadingIssues);
    
    // Enhanced caching analysis
    const cachingIssues = checkAdvancedCaching(response.headers);
    issues.push(...cachingIssues);
    
    // Third-party script optimization
    const thirdPartyIssues = checkAdvancedThirdPartyScripts(html);
    issues.push(...thirdPartyIssues);
    
    // Render-blocking resource optimization
    const renderBlockingIssues = checkAdvancedRenderBlocking(html);
    issues.push(...renderBlockingIssues);
    
    console.log(`Comprehensive performance scan completed for ${baseUrl}. Found ${issues.length} optimization opportunities.`);
    
    return {
      scanner: 'performance',
      status: 'completed',
      issues,
      metrics: {
        loadTime,
        pageSize,
        estimatedVitals,
        resourceCounts
      }
    };
  } catch (error) {
    console.error('Performance scan error:', error);
    return {
      scanner: 'performance',
      status: 'error',
      error: error.message,
      issues: []
    };
  }
}

// Utility function to analyze resource counts
function analyzeResourceCounts(html) {
  const cssFiles = (html.match(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi) || []).length;
  const jsFiles = (html.match(/<script[^>]*src=["'][^"']*["'][^>]*>/gi) || []).length;
  const images = (html.match(/<img[^>]*>/gi) || []).length;
  const inlineCSS = (html.match(/<style[^>]*>[\s\S]*?<\/style>/gi) || []).length;
  const inlineJS = (html.match(/<script(?![^>]*src)[^>]*>[\s\S]*?<\/script>/gi) || []).length;
  
  return {
    cssFiles,
    jsFiles,
    images,
    inlineCSS,
    inlineJS,
    total: cssFiles + jsFiles + images + inlineCSS + inlineJS
  };
}
// 1. Advanced Load Time Analysis with Performance Tiers
function checkAdvancedLoadTime(loadTime, pageSize) {
  const issues = [];
  const sizeImpact = pageSize > PERFORMANCE_THRESHOLDS.PAGE_SIZE.WARNING ? 'large page size' : '';
  
  if (loadTime > PERFORMANCE_THRESHOLDS.LOAD_TIME.CRITICAL) {
    issues.push({
      type: 'critical-page-load',
      severity: 'critical',
      description: `Critical load time: ${(loadTime / 1000).toFixed(1)}s (${sizeImpact ? `affected by ${sizeImpact}` : 'needs immediate attention'})`,
      impact: 'High bounce rate, poor SEO rankings, significant revenue loss',
      expectedImprovement: '60-80% load time reduction possible',
      timeline: 'Immediate (1-2 days for basic optimizations)',
      fix: {
        title: 'Critical Load Time Optimization',
        description: 'Your page load time is critically slow. Users expect pages to load in under 2 seconds, and every additional second can increase bounce rate by 32%.',
        priority: 'URGENT',
        code: `/* IMMEDIATE ACTIONS - Implement Today */

// 1. Enable Compression (60-70% size reduction)
# Apache .htaccess
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json image/svg+xml
  SetOutputFilter DEFLATE
</IfModule>

# Nginx
gzip on;
gzip_vary on;
gzip_min_length 1000;
gzip_types text/css application/javascript application/json text/html image/svg+xml;

// 2. Optimize Critical Resources
<!-- Inline critical CSS -->
<style>
  /* Only above-the-fold styles - keep under 14KB */
  body { font-family: system-ui; margin: 0; }
  .header { background: #333; color: white; padding: 1rem; }
  .hero { min-height: 400px; background: #f0f0f0; }
</style>

// 3. Preload Critical Resources
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/images/hero.webp" as="image">

// 4. Defer Non-Critical JavaScript
<script defer src="/js/main.js"></script>
<script defer src="/js/analytics.js"></script>

/* EXPECTED RESULTS */
// Before: ${(loadTime / 1000).toFixed(1)}s load time
// After: 1.2-2.0s load time (60-80% improvement)
// User Experience: Dramatic improvement in perceived performance`
      }
    });
  } else if (loadTime > PERFORMANCE_THRESHOLDS.LOAD_TIME.SLOW) {
    issues.push({
      type: 'slow-page-load',
      severity: 'high',
      description: `Slow load time: ${(loadTime / 1000).toFixed(1)}s (target: under 2s)`,
      impact: 'Increased bounce rate, reduced conversions',
      expectedImprovement: '40-60% load time reduction possible',
      timeline: '1-3 days for implementation',
      fix: {
        title: 'Load Time Optimization Strategy',
        description: 'Your page load time needs improvement. Optimize for the 2-second target to match user expectations and improve SEO rankings.',
        priority: 'HIGH',
        code: `/* PERFORMANCE OPTIMIZATION STRATEGY */

// 1. Implement Resource Optimization
// Combine and minify CSS/JS files
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};

// 2. Optimize Images
<!-- Responsive images with modern formats -->
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Optimized image" loading="lazy">
</picture>

// 3. Enable Browser Caching
# Cache static resources for 1 year
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
</IfModule>

/* PERFORMANCE TARGETS */
// Current: ${(loadTime / 1000).toFixed(1)}s
// Target: 1.5-2.0s (40-60% improvement)
// Core Web Vitals: LCP < 2.5s, CLS < 0.1`
      }
    });
  } else if (loadTime > PERFORMANCE_THRESHOLDS.LOAD_TIME.MODERATE) {
    issues.push({
      type: 'moderate-page-load',
      severity: 'medium',
      description: `Moderate load time: ${(loadTime / 1000).toFixed(1)}s (good, but can be excellent)`,
      impact: 'Room for performance excellence',
      expectedImprovement: '20-40% load time reduction possible',
      timeline: '2-5 days for fine-tuning',
      fix: {
        title: 'Performance Excellence Optimization',
        description: 'Your page loads reasonably well, but there\'s opportunity to achieve excellence and stand out from competitors.',
        priority: 'MEDIUM',
        code: `/* PERFORMANCE EXCELLENCE STRATEGIES */

// 1. Advanced Resource Hints
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
<link rel="dns-prefetch" href="https://analytics.google.com">
<link rel="prefetch" href="/pages/about">

// 2. Service Worker for Caching
// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// sw.js - Cache critical resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/',
        '/css/main.css',
        '/js/main.js',
        '/images/logo.webp'
      ]);
    })
  );
});

// 3. Advanced Lazy Loading
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      imageObserver.unobserve(img);
    }
  });
});

/* EXCELLENCE TARGETS */
// Current: ${(loadTime / 1000).toFixed(1)}s  
// Target: Under 1.5s (top 10% of websites)
// Core Web Vitals: All metrics in "Good" range`
      }
    });
  }
  
  return issues;
}

// 2. Page Size Optimization with Mobile-First Considerations
function checkPageSizeOptimization(pageSize, html, loadTime) {
  const issues = [];
  const sizeInKB = Math.round(pageSize / 1024);
  const sizeInMB = (pageSize / 1024 / 1024).toFixed(2);
  
  // Calculate mobile impact
  const mobileLoadTime3G = (pageSize / 1024 / 50) * 1000; // Rough 3G estimate (50KB/s)
  const mobileLoadTime4G = (pageSize / 1024 / 200) * 1000; // Rough 4G estimate (200KB/s)
  
  if (pageSize > PERFORMANCE_THRESHOLDS.PAGE_SIZE.CRITICAL) {
    issues.push({
      type: 'critical-page-size',
      severity: 'critical',
      description: `Critical page size: ${sizeInMB}MB (${sizeInKB}KB) - severely impacts mobile users`,
      mobileImpact: `3G load time: ${(mobileLoadTime3G/1000).toFixed(1)}s, 4G: ${(mobileLoadTime4G/1000).toFixed(1)}s`,
      impact: 'High data usage, slow mobile loading, poor user experience',
      expectedImprovement: '70-80% size reduction possible',
      timeline: 'Immediate (same day implementation)',
      fix: {
        title: 'Critical Page Size Reduction',
        description: 'Your page is too large and will cause significant issues for mobile users and those on slower connections.',
        priority: 'URGENT',
        code: `/* IMMEDIATE SIZE REDUCTION STRATEGIES */

// 1. Enable Brotli + Gzip Compression (up to 80% reduction)
# Nginx configuration
brotli on;
brotli_comp_level 11;
brotli_types text/html text/css application/javascript application/json image/svg+xml;

gzip on;
gzip_vary on;
gzip_comp_level 6;
gzip_types text/html text/css application/javascript application/json;

// 2. Implement Critical CSS Inlining
<!-- Inline only critical CSS (under 14KB) -->
<style>
  /* Critical above-the-fold styles only */
  body{font:16px/1.5 system-ui;margin:0}
  .hero{min-height:400px;background:#f0f0f0}
</style>

<!-- Load remaining CSS asynchronously -->
<link rel="preload" href="/css/non-critical.css" as="style" onload="this.onload=null;this.rel='stylesheet'">

// 3. Code Splitting for JavaScript
// Split large bundles
import('./features/advanced-features.js').then(module => {
  // Load only when needed
});

// Dynamic imports for heavy libraries
const loadChartLibrary = async () => {
  const { Chart } = await import('chart.js');
  return Chart;
};

// 4. Lazy Load Non-Critical Content
<!-- Lazy load images -->
<img src="placeholder.jpg" data-src="actual-image.jpg" loading="lazy" class="lazy">

<!-- Lazy load iframes -->
<iframe data-src="https://youtube.com/embed/video" loading="lazy"></iframe>

/* SIZE OPTIMIZATION RESULTS */
// Before: ${sizeInMB}MB
// After: 0.3-0.8MB (70-80% reduction)
// Mobile 3G: From ${(mobileLoadTime3G/1000).toFixed(1)}s to 2-4s
// Mobile 4G: From ${(mobileLoadTime4G/1000).toFixed(1)}s to 1-2s`
      }
    });
  } else if (pageSize > PERFORMANCE_THRESHOLDS.PAGE_SIZE.WARNING) {
    issues.push({
      type: 'large-page-size',
      severity: 'high',
      description: `Large page size: ${sizeInMB}MB (${sizeInKB}KB) - affects mobile performance`,
      mobileImpact: `Mobile users may experience ${(mobileLoadTime3G/1000).toFixed(1)}s load time on 3G`,
      impact: 'Slower mobile loading, increased data usage',
      expectedImprovement: '50-70% size reduction possible',
      timeline: '1-2 days for implementation',
      fix: {
        title: 'Page Size Optimization',
        description: 'Reduce page size to improve mobile performance and reduce data usage for your users.',
        priority: 'HIGH',
        code: `/* PAGE SIZE OPTIMIZATION STRATEGY */

// 1. Content Optimization
// Remove unused CSS and JavaScript
const PurgeCSS = require('purgecss');
const purgecss = new PurgeCSS({
  content: ['./src/**/*.html', './src/**/*.js'],
  css: ['./src/**/*.css']
});

// 2. Resource Bundling
// Webpack configuration for optimal bundles
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxSize: 250000, // 250KB chunks
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        common: {
          minChunks: 2,
          chunks: 'all',
          enforce: true
        }
      },
    },
  },
};

// 3. Progressive Enhancement
// Load enhanced features progressively
if ('IntersectionObserver' in window) {
  // Enhanced lazy loading for modern browsers
} else {
  // Basic experience for older browsers
}

// 4. Content Delivery Network
// Use CDN for static assets
<link rel="dns-prefetch" href="//cdn.example.com">
<script src="//cdn.example.com/js/optimized.min.js"></script>

/* OPTIMIZATION TARGETS */
// Current: ${sizeInMB}MB
// Target: Under 1.5MB (50-70% reduction)
// Mobile Impact: Significantly improved loading on all connections`
      }
    });
  } else if (pageSize > PERFORMANCE_THRESHOLDS.PAGE_SIZE.GOOD) {
    issues.push({
      type: 'moderate-page-size',
      severity: 'medium',
      description: `Moderate page size: ${sizeInKB}KB - room for mobile optimization`,
      mobileImpact: 'Good mobile performance, but can be optimized further',
      expectedImprovement: '30-50% size reduction possible',
      timeline: '2-3 days for optimization',
      fix: {
        title: 'Mobile-First Size Optimization',
        description: 'Fine-tune your page size for excellent mobile performance and user experience.',
        code: `/* MOBILE-FIRST OPTIMIZATION */

// 1. Responsive Resource Loading
// Load appropriate resources for device
const isLowBandwidth = navigator.connection && navigator.connection.effectiveType === 'slow-2g';
if (!isLowBandwidth) {
  // Load high-quality assets
  import('./high-quality-features.js');
}

// 2. Modern Image Formats
<picture>
  <source media="(max-width: 768px)" srcset="mobile.avif" type="image/avif">
  <source media="(max-width: 768px)" srcset="mobile.webp" type="image/webp">
  <source srcset="desktop.avif" type="image/avif">
  <source srcset="desktop.webp" type="image/webp">
  <img src="fallback.jpg" alt="Responsive image">
</picture>

/* TARGET RESULTS */
// Current: ${sizeInKB}KB
// Target: Under 500KB (mobile-optimized)
// Mobile Performance: Excellent across all devices`
      }
    });
  }
  
  return issues;
}

// 3. Core Web Vitals Focus
function checkCoreWebVitals(estimatedVitals, loadTime, pageSize) {
  const issues = [];
  const { lcp, cls, inp } = estimatedVitals;
  
  // LCP (Largest Contentful Paint) Analysis
  if (lcp > PERFORMANCE_THRESHOLDS.CORE_WEB_VITALS.LCP.NEEDS_IMPROVEMENT) {
    issues.push({
      type: 'poor-lcp',
      severity: 'critical',
      description: `Poor LCP: ${(lcp/1000).toFixed(1)}s (needs < 2.5s for good rating)`,
      coreWebVital: 'LCP',
      impact: 'Poor SEO rankings, bad user experience, failed Core Web Vitals',
      expectedImprovement: 'Achieve LCP under 2.5s (good rating)',
      timeline: '1-3 days with preloading optimizations',
      fix: {
        title: 'Optimize Largest Contentful Paint (LCP)',
        description: 'LCP measures loading performance. To achieve a good LCP score, aim for LCP to occur within 2.5s of page start loading.',
        priority: 'CRITICAL',
        code: `/* LCP OPTIMIZATION STRATEGIES */

// 1. Preload Critical Resources
<!-- Preload LCP element (hero image, font, etc.) -->
<link rel="preload" href="/images/hero-image.webp" as="image">
<link rel="preload" href="/fonts/heading-font.woff2" as="font" type="font/woff2" crossorigin>

// 2. Optimize Critical Rendering Path
<!-- Inline critical CSS for LCP element -->
<style>
  .hero-section {
    min-height: 400px;
    background-image: url('/images/hero-image.webp');
    background-size: cover;
    background-position: center;
  }
  .hero-text {
    font-family: 'HeadingFont', serif;
    font-size: 3rem;
    font-weight: 700;
  }
</style>

// 3. Implement Resource Priorities
<!-- High priority for LCP resources -->
<img src="/images/hero.webp" fetchpriority="high" alt="Hero image">

// 4. Server-Side Optimizations
// Implement HTTP/2 Server Push for critical resources
app.get('/', (req, res) => {
  res.append('Link', '</css/critical.css>; rel=preload; as=style');
  res.append('Link', '</images/hero.webp>; rel=preload; as=image');
  res.render('index');
});

/* EXPECTED RESULTS */
// Current LCP: ${(lcp/1000).toFixed(1)}s
// Target LCP: Under 2.5s (Good rating)
// SEO Impact: Improved Core Web Vitals score`
      }
    });
  } else if (lcp > PERFORMANCE_THRESHOLDS.CORE_WEB_VITALS.LCP.GOOD) {
    issues.push({
      type: 'needs-improvement-lcp',
      severity: 'high',
      description: `LCP needs improvement: ${(lcp/1000).toFixed(1)}s (good < 2.5s, excellent < 2.0s)`,
      coreWebVital: 'LCP',
      impact: 'Suboptimal SEO performance, room for user experience improvement',
      expectedImprovement: 'Achieve excellent LCP under 2.0s',
      timeline: '2-4 days for fine-tuning',
      fix: {
        title: 'Improve Largest Contentful Paint (LCP)',
        description: 'Your LCP is in the "needs improvement" range. Optimize further to achieve excellent performance.',
        code: `/* LCP IMPROVEMENT STRATEGIES */

// 1. Advanced Preloading
<link rel="preload" href="/images/hero.webp" as="image" 
      imagesrcset="/images/hero-400.webp 400w, /images/hero-800.webp 800w" 
      imagesizes="100vw">

// 2. Critical CSS Optimization
<style>
  .hero{min-height:50vh;background:url('/images/hero.webp')center/cover;display:flex;align-items:center}
  .hero-text{font:700 clamp(2rem,5vw,4rem)/1.2 system-ui;color:#fff;text-align:center}
</style>

// 3. Resource Hint Optimization
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
<link rel="dns-prefetch" href="https://images.unsplash.com">

/* TARGET: LCP under 2.0s for excellence */`
      }
    });
  }
  
  // CLS (Cumulative Layout Shift) Analysis
  if (cls > PERFORMANCE_THRESHOLDS.CORE_WEB_VITALS.CLS.NEEDS_IMPROVEMENT) {
    issues.push({
      type: 'poor-cls',
      severity: 'high',
      description: `High layout shift: ${cls.toFixed(3)} (needs < 0.1 for good rating)`,
      coreWebVital: 'CLS',
      impact: 'Poor user experience, accidental clicks, SEO penalties',
      expectedImprovement: 'Achieve CLS under 0.1 (good rating)',
      timeline: '1-2 days with proper sizing',
      fix: {
        title: 'Prevent Cumulative Layout Shift (CLS)',
        description: 'CLS measures visual stability. Ensure page elements don\'t shift unexpectedly during loading.',
        priority: 'HIGH',
        code: `/* CLS PREVENTION STRATEGIES */

// 1. Reserve Space for Images
<!-- Always include width and height -->
<img src="/images/content.webp" 
     width="800" 
     height="600" 
     alt="Content image"
     style="max-width: 100%; height: auto;">

// 2. Web Font Loading Optimization
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
<style>
  @font-face {
    font-family: 'MainFont';
    src: url('/fonts/main.woff2') format('woff2');
    font-display: optional; /* Prevents layout shift */
  }
  body {
    font-family: 'MainFont', system-ui, sans-serif;
  }
</style>

// 3. Container Sizing for Dynamic Content
<!-- Reserve space for ads, widgets, etc. -->
<div class="ad-container" style="min-height: 250px; width: 300px;">
  <!-- Ad content loads here -->
</div>

// 4. CSS for Stable Layouts
.content-skeleton {
  min-height: 200px; /* Prevent collapse during loading */
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 2s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* EXPECTED RESULTS */
// Current CLS: ${cls.toFixed(3)}
// Target CLS: Under 0.1 (Good rating)
// User Experience: Stable, no unexpected shifts`
      }
    });
  } else if (cls > PERFORMANCE_THRESHOLDS.CORE_WEB_VITALS.CLS.GOOD) {
    issues.push({
      type: 'moderate-cls',
      severity: 'medium',
      description: `Moderate layout shift: ${cls.toFixed(3)} (good < 0.1, excellent < 0.05)`,
      coreWebVital: 'CLS',
      expectedImprovement: 'Achieve excellent CLS under 0.05',
      timeline: '1-2 days for fine-tuning',
      fix: {
        title: 'Fine-tune Layout Stability',
        description: 'Your CLS is acceptable but can be optimized for excellence.',
        code: `/* CLS FINE-TUNING */

// 1. Aspect Ratio Boxes
.image-container {
  aspect-ratio: 16 / 9;
  background: #f0f0f0;
}

// 2. Transition Optimizations
.smooth-transition {
  transition: transform 0.3s ease-out;
  will-change: transform;
}

/* TARGET: CLS under 0.05 for excellence */`
      }
    });
  }
  
  // INP (Interaction to Next Paint) Analysis
  if (inp > PERFORMANCE_THRESHOLDS.CORE_WEB_VITALS.INP.NEEDS_IMPROVEMENT) {
    issues.push({
      type: 'poor-inp',
      severity: 'high',
      description: `Poor responsiveness: ${inp}ms (needs < 200ms for good rating)`,
      coreWebVital: 'INP',
      impact: 'Sluggish interactions, poor user experience',
      expectedImprovement: 'Achieve INP under 200ms (good rating)',
      timeline: '2-3 days with code optimization',
      fix: {
        title: 'Optimize Interaction to Next Paint (INP)',
        description: 'INP measures responsiveness. Optimize JavaScript execution and reduce main thread blocking.',
        priority: 'HIGH',
        code: `/* INP OPTIMIZATION STRATEGIES */

// 1. Debounce Heavy Operations
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Use debouncing for search, scroll, resize events
const debouncedSearch = debounce((query) => {
  performSearch(query);
}, 300);

// 2. Use Web Workers for Heavy Computation
// main.js
const worker = new Worker('/js/worker.js');
worker.postMessage({data: heavyData});
worker.onmessage = (e) => {
  console.log('Result:', e.data);
};

// worker.js
self.onmessage = function(e) {
  const result = performHeavyCalculation(e.data);
  self.postMessage(result);
};

// 3. Optimize Event Handlers
// Use passive listeners for scroll events
window.addEventListener('scroll', handleScroll, { passive: true });

// 4. Code Splitting for Better Performance
// Load heavy features only when needed
const loadAdvancedFeatures = async () => {
  const { AdvancedFeature } = await import('./advanced-feature.js');
  return new AdvancedFeature();
};

/* EXPECTED RESULTS */
// Current INP: ${inp}ms
// Target INP: Under 200ms (Good rating)
// User Experience: Highly responsive interactions`
      }
    });
  } else if (inp > PERFORMANCE_THRESHOLDS.CORE_WEB_VITALS.INP.GOOD) {
    issues.push({
      type: 'moderate-inp',
      severity: 'medium',
      description: `Moderate responsiveness: ${inp}ms (good < 200ms, excellent < 100ms)`,
      coreWebVital: 'INP',
      expectedImprovement: 'Achieve excellent INP under 100ms',
      timeline: '1-2 days for optimization',
      fix: {
        title: 'Enhance Interaction Responsiveness',
        description: 'Your INP is acceptable but can be optimized for excellent responsiveness.',
        code: `/* INP ENHANCEMENT */

// 1. RequestAnimationFrame for Smooth Animations
function smoothScroll(target) {
  requestAnimationFrame(() => {
    target.scrollIntoView({ behavior: 'smooth' });
  });
}

// 2. Efficient DOM Manipulation
// Batch DOM updates
const fragment = document.createDocumentFragment();
items.forEach(item => {
  const element = createElement(item);
  fragment.appendChild(element);
});
container.appendChild(fragment);

/* TARGET: INP under 100ms for excellence */`
      }
    });
  }
  
  return issues;
}

// 4. Modern Compression & Caching
async function checkModernCompression(headers, html) {
  const issues = [];
  
  const contentEncoding = headers['content-encoding'];
  const contentType = headers['content-type'] || '';
  const htmlSize = Buffer.byteLength(html, 'utf8');
  
  // Check for Brotli compression
  if (!contentEncoding || !contentEncoding.includes('br')) {
    const estimatedBrotliSavings = Math.round(htmlSize * 0.25); // Brotli typically saves 25% over gzip
    
    issues.push({
      type: 'missing-brotli-compression',
      severity: 'medium',
      description: `Missing Brotli compression (potential ${Math.round(estimatedBrotliSavings/1024)}KB savings)`,
      impact: 'Missing 15-25% additional compression over gzip',
      expectedImprovement: '15-25% smaller file sizes',
      timeline: 'Same day implementation',
      fix: {
        title: 'Enable Brotli Compression',
        description: 'Brotli provides superior compression compared to gzip, with 15-25% better compression ratios.',
        priority: 'MEDIUM',
        code: `/* BROTLI COMPRESSION SETUP */

# Nginx Configuration
http {
  # Enable Brotli
  brotli on;
  brotli_comp_level 11;
  brotli_min_length 1000;
  brotli_types
    text/html
    text/css
    text/xml
    text/javascript
    text/plain
    application/javascript
    application/json
    application/xml
    application/rss+xml
    application/atom+xml
    image/svg+xml;
    
  # Fallback to gzip
  gzip on;
  gzip_vary on;
  gzip_comp_level 6;
  gzip_types
    text/html
    text/css
    text/javascript
    application/javascript
    application/json;
}

# Apache .htaccess
<IfModule mod_brotli.c>
  SetOutputFilter BROTLI
  SetEnvIfNoCase Request_URI \
    \.(?:gif|jpe?g|png|webp|avif)$ no-brotli dont-vary
  SetEnvIfNoCase Request_URI \
    \.(?:exe|t?gz|zip|bz2|sit|rar)$ no-brotli dont-vary
</IfModule>

# Express.js with compression middleware
const compression = require('compression');
const shrinkRay = require('shrink-ray-current');

app.use(shrinkRay()); // Supports both brotli and gzip

/* COMPRESSION RESULTS */
// Current size: ${Math.round(htmlSize/1024)}KB
// With Brotli: ~${Math.round((htmlSize - estimatedBrotliSavings)/1024)}KB
// Savings: ${Math.round(estimatedBrotliSavings/1024)}KB (${Math.round((estimatedBrotliSavings/htmlSize)*100)}%)`
      }
    });
  }
  
  // Check for gzip if no compression at all
  if (!contentEncoding) {
    const estimatedGzipSavings = Math.round(htmlSize * 0.7); // Gzip typically saves 70%
    
    issues.push({
      type: 'no-compression',
      severity: 'critical',
      description: `No compression enabled (missing ${Math.round(estimatedGzipSavings/1024)}KB savings)`,
      impact: 'Massive file sizes, slow loading, high bandwidth usage',
      expectedImprovement: '60-80% file size reduction',
      timeline: 'Immediate implementation',
      fix: {
        title: 'Enable Critical Compression',
        description: 'Enable compression to reduce file sizes by 60-80%. This is essential for web performance.',
        priority: 'CRITICAL',
        code: `/* ENABLE COMPRESSION IMMEDIATELY */

# Nginx
gzip on;
gzip_vary on;
gzip_min_length 1000;
gzip_comp_level 6;
gzip_types
  text/html
  text/css
  text/javascript
  application/javascript
  application/json
  application/xml
  text/xml
  text/plain;

# Apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json
</IfModule>

# Node.js/Express
const compression = require('compression');
app.use(compression({
  level: 6,
  threshold: 1000,
  filter: (req, res) => {
    if (req.headers['x-no-compression']) return false;
    return compression.filter(req, res);
  }
}));

/* IMMEDIATE RESULTS */
// Before: ${Math.round(htmlSize/1024)}KB
// After: ~${Math.round((htmlSize - estimatedGzipSavings)/1024)}KB
// Savings: ${Math.round(estimatedGzipSavings/1024)}KB (70% reduction)`
      }
    });
  }
  
  return issues;
}

// 5. Enhanced Resource Optimization
async function checkEnhancedResourceOptimization(html, headers, baseUrl) {
  const issues = [];
  
  // Advanced CSS optimization analysis
  const cssFiles = (html.match(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi) || []).length;
  const inlineCSS = (html.match(/<style[^>]*>[\s\S]*?<\/style>/gi) || []).length;
  
  // Advanced JavaScript optimization analysis
  const jsFiles = (html.match(/<script[^>]*src=["'][^"']*["'][^>]*>/gi) || []).length;
  const inlineJS = (html.match(/<script(?![^>]*src)[^>]*>[\s\S]*?<\/script>/gi) || []).length;
  
  // Check for modern bundling practices
  const hasModuleScript = html.includes('type="module"');
  const hasNomoduleScript = html.includes('nomodule');
  
  if (cssFiles > PERFORMANCE_THRESHOLDS.RESOURCE_LIMITS.CSS_FILES) {
    issues.push({
      type: 'excessive-css-files',
      severity: 'high',
      description: `${cssFiles} CSS files detected (recommended: max 3 for optimal performance)`,
      impact: 'Multiple HTTP requests, slower loading, render blocking',
      expectedImprovement: '40-60% faster CSS loading',
      timeline: '1-2 days for bundling implementation',
      fix: {
        title: 'Optimize CSS File Bundling',
        description: 'Reduce HTTP requests and improve loading performance by combining CSS files strategically.',
        priority: 'HIGH',
        code: `/* CSS BUNDLING OPTIMIZATION */

// 1. Webpack CSS Optimization
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].[contenthash].css',
    }),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          type: 'css/mini-extract',
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
};

// 2. Critical CSS Strategy
<!-- Inline critical CSS -->
<style>
  /* Critical above-the-fold styles only */
  body{margin:0;font:16px/1.5 system-ui}
  .header{background:#333;color:#fff;padding:1rem}
  .hero{min-height:50vh;display:flex;align-items:center;justify-content:center}
</style>

<!-- Load non-critical CSS asynchronously -->
<link rel="preload" href="/css/non-critical.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/css/non-critical.css"></noscript>

// 3. PostCSS Optimization
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')({
      preset: ['advanced', {
        discardComments: { removeAll: true },
        normalizeWhitespace: false,
      }]
    }),
  ],
};

/* PERFORMANCE RESULTS */
// Before: ${cssFiles} separate CSS files
// After: 1-2 optimized bundles
// Loading Speed: 40-60% faster CSS loading
// HTTP Requests: Reduced from ${cssFiles} to 2 requests`
      }
    });
  }
  
  if (jsFiles > PERFORMANCE_THRESHOLDS.RESOURCE_LIMITS.JS_FILES) {
    issues.push({
      type: 'excessive-js-files',
      severity: 'high',
      description: `${jsFiles} JavaScript files detected (recommended: max 5 with code splitting)`,
      impact: 'Multiple HTTP requests, render blocking, slower interactivity',
      expectedImprovement: '50-70% faster JavaScript loading',
      timeline: '2-3 days for advanced bundling',
      fix: {
        title: 'Implement Advanced JavaScript Bundling',
        description: 'Optimize JavaScript delivery with modern bundling, code splitting, and dynamic imports.',
        priority: 'HIGH',
        code: `/* ADVANCED JAVASCRIPT OPTIMIZATION */

// 1. Webpack Code Splitting Configuration
module.exports = {
  entry: {
    main: './src/index.js',
    vendor: './src/vendor.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxSize: 250000, // 250KB chunks
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: 'single',
  },
};

// 2. Dynamic Imports for Route-Based Splitting
// Load components only when needed
const LazyComponent = React.lazy(() => 
  import('./components/LazyComponent')
);

// Load features conditionally
const loadAdvancedFeatures = async () => {
  if (userNeedsAdvancedFeatures) {
    const { AdvancedFeature } = await import('./advanced-features');
    return new AdvancedFeature();
  }
};

// 3. Modern JavaScript Loading
<!-- Modern browsers -->
<script type="module" src="/js/modern.js"></script>
<!-- Legacy browsers -->
<script nomodule src="/js/legacy.js"></script>

// 4. Preload Critical JavaScript
<link rel="modulepreload" href="/js/critical.js">
<link rel="preload" href="/js/polyfills.js" as="script">

// 5. Service Worker for JavaScript Caching
// Cache JavaScript files aggressively
const CACHE_NAME = 'js-cache-v1';
const JS_FILES = ['/js/main.js', '/js/vendor.js'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(JS_FILES))
  );
});

/* OPTIMIZATION RESULTS */
// Before: ${jsFiles} separate JavaScript files
// After: 2-3 optimized bundles + dynamic chunks
// Loading Speed: 50-70% faster JavaScript loading
// Code Splitting: Load only what's needed when needed`
      }
    });
  }
  
  // Check for modern JavaScript features
  if (!hasModuleScript) {
    issues.push({
      type: 'missing-modern-js-loading',
      severity: 'medium',
      description: 'Missing modern JavaScript module loading (ES6 modules)',
      impact: 'Loading unnecessary polyfills for modern browsers',
      expectedImprovement: '20-30% smaller JavaScript payload for modern browsers',
      timeline: '1 day for implementation',
      fix: {
        title: 'Implement Modern JavaScript Loading',
        description: 'Use ES6 modules to serve optimized JavaScript to modern browsers while maintaining legacy support.',
        code: `/* MODERN JAVASCRIPT LOADING */

// 1. Differential Loading
<!-- Modern browsers get modern code -->
<script type="module" src="/js/modern.js"></script>
<!-- Legacy browsers get polyfilled code -->
<script nomodule src="/js/legacy.js"></script>

// 2. Module Bundling
// modern.js - ES6+ syntax, smaller size
export class ModernFeature {
  async loadData() {
    const response = await fetch('/api/data');
    return response.json();
  }
}

// legacy.js - ES5 syntax with polyfills
var ModernFeature = function() {};
ModernFeature.prototype.loadData = function() {
  return fetch('/api/data').then(function(response) {
    return response.json();
  });
};

// 3. Feature Detection
if ('modules' in HTMLScriptElement.prototype) {
  // Modern browser - load minimal code
  import('./modern-features.js');
} else {
  // Legacy browser - load polyfills
  loadScript('/js/polyfills.js');
}

/* BENEFITS */
// Modern browsers: 20-30% smaller JavaScript
// Legacy browsers: Full compatibility maintained
// Performance: Faster execution on modern browsers`
      }
    });
  }
  
  return issues;
}

// 6. Image Performance Excellence
async function checkImagePerformanceExcellence(html, baseUrl) {
  const issues = [];
  
  // Find all img tags and analyze comprehensively
  const imgTags = html.match(/<img[^>]*>/gi) || [];
  
  if (imgTags.length === 0) {
    return issues;
  }
  
  let modernFormatCount = 0;
  let lazyLoadingCount = 0;
  let responsiveImageCount = 0;
  let properDimensionsCount = 0;
  let fetchPriorityCount = 0;
  let largeImages = [];
  let missingAltCount = 0;
  
  // Analyze each image (limit to first 15 to avoid timeout)
  for (const imgTag of imgTags.slice(0, 15)) {
    // Check for modern formats (WebP, AVIF)
    if (imgTag.includes('.webp') || imgTag.includes('.avif')) {
      modernFormatCount++;
    }
    
    // Check for lazy loading
    if (imgTag.includes('loading="lazy"') || imgTag.includes('loading=lazy')) {
      lazyLoadingCount++;
    }
    
    // Check for responsive images (srcset)
    if (imgTag.includes('srcset')) {
      responsiveImageCount++;
    }
    
    // Check for proper dimensions
    if (imgTag.includes('width=') && imgTag.includes('height=')) {
      properDimensionsCount++;
    }
    
    // Check for fetch priority
    if (imgTag.includes('fetchpriority=')) {
      fetchPriorityCount++;
    }
    
    // Check for alt attribute
    if (!imgTag.includes('alt=')) {
      missingAltCount++;
    }
    
    // Try to check image size (basic analysis)
    const srcMatch = imgTag.match(/src=["']([^"']*)["']/i);
    if (srcMatch && srcMatch[1]) {
      let src = srcMatch[1];
      
      // Convert relative URLs to absolute
      if (src.startsWith('/')) {
        src = baseUrl + src;
      } else if (!src.startsWith('http') && !src.startsWith('data:')) {
        src = baseUrl + '/' + src;
      }
      
      // Skip data URLs and external images for size checking
      if (!src.startsWith('data:') && src.includes(new URL(baseUrl).hostname)) {
        try {
          const imgResponse = await axios.head(src, {
            timeout: REQUEST_TIMEOUT / 6,
            validateStatus: () => true
          });
          
          const contentLength = imgResponse.headers['content-length'];
          if (contentLength && parseInt(contentLength) > PERFORMANCE_THRESHOLDS.RESOURCE_LIMITS.LARGE_IMAGE_SIZE) {
            largeImages.push({
              src: src.split('/').pop() || 'unknown',
              size: Math.round(parseInt(contentLength) / 1024) + 'KB'
            });
          }
        } catch (error) {
          // Ignore individual image check errors
        }
      }
    }
  }
  
  // Modern image format analysis
  const modernFormatPercentage = Math.round((modernFormatCount / imgTags.length) * 100);
  if (modernFormatPercentage < 80) {
    issues.push({
      type: 'insufficient-modern-image-formats',
      severity: modernFormatPercentage < 30 ? 'high' : 'medium',
      description: `Only ${modernFormatPercentage}% of images use modern formats (WebP/AVIF)`,
      impact: 'Larger image sizes, slower loading, higher bandwidth usage',
      expectedImprovement: '25-50% smaller image sizes with modern formats',
      timeline: '1-2 days for image conversion',
      fix: {
        title: 'Implement Modern Image Formats',
        description: 'Modern formats like WebP and AVIF provide superior compression while maintaining visual quality.',
        priority: modernFormatPercentage < 30 ? 'HIGH' : 'MEDIUM',
        code: `/* MODERN IMAGE FORMAT IMPLEMENTATION */

// 1. Progressive Enhancement with Picture Element
<picture>
  <!-- AVIF for cutting-edge browsers (best compression) -->
  <source srcset="/images/hero.avif" type="image/avif">
  <!-- WebP for modern browsers (excellent compression) -->
  <source srcset="/images/hero.webp" type="image/webp">
  <!-- JPEG fallback for all browsers -->
  <img src="/images/hero.jpg" alt="Hero image" width="800" height="600">
</picture>

// 2. Responsive Modern Images
<picture>
  <source media="(max-width: 768px)" 
          srcset="/images/mobile.avif 400w, /images/mobile-2x.avif 800w" 
          type="image/avif">
  <source media="(max-width: 768px)" 
          srcset="/images/mobile.webp 400w, /images/mobile-2x.webp 800w" 
          type="image/webp">
  <source srcset="/images/desktop.avif 1200w, /images/desktop-2x.avif 2400w" 
          type="image/avif">
  <source srcset="/images/desktop.webp 1200w, /images/desktop-2x.webp 2400w" 
          type="image/webp">
  <img src="/images/fallback.jpg" 
       srcset="/images/fallback.jpg 1200w, /images/fallback-2x.jpg 2400w"
       sizes="(max-width: 768px) 100vw, 1200px"
       alt="Responsive image"
       width="1200" 
       height="800">
</picture>

// 3. Automated Image Optimization (Next.js example)
import Image from 'next/image';

<Image
  src="/images/hero.jpg"
  alt="Hero image"
  width={1200}
  height={800}
  priority={true} // For above-the-fold images
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."
  formats={['avif', 'webp']}
/>

// 4. Server-Side Image Optimization
// Using Sharp for Node.js
const sharp = require('sharp');

async function optimizeImage(inputPath, outputPath) {
  await sharp(inputPath)
    .resize(1200, 800, { fit: 'inside', withoutEnlargement: true })
    .avif({ quality: 80 })
    .toFile(outputPath + '.avif');
    
  await sharp(inputPath)
    .resize(1200, 800, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(outputPath + '.webp');
}

// 5. CDN with Automatic Format Delivery
<!-- Cloudinary example -->
<img src="https://res.cloudinary.com/demo/image/fetch/f_auto,q_auto,w_800/https://example.com/image.jpg" 
     alt="Auto-optimized image">

/* OPTIMIZATION RESULTS */
// Before: JPEG/PNG only (larger files)
// After: AVIF/WebP with JPEG fallback
// File Size Reduction: 25-50% smaller
// Loading Speed: Significantly faster
// Browser Support: 95%+ with fallbacks`
      }
    });
  }
  
  // Lazy loading analysis
  const lazyLoadingPercentage = Math.round((lazyLoadingCount / imgTags.length) * 100);
  if (lazyLoadingPercentage < 70 && imgTags.length > 3) {
    issues.push({
      type: 'insufficient-lazy-loading',
      severity: 'medium',
      description: `Only ${lazyLoadingPercentage}% of images use lazy loading (${lazyLoadingCount}/${imgTags.length})`,
      impact: 'Slower initial page load, unnecessary resource loading',
      expectedImprovement: '30-50% faster initial page load',
      timeline: '1 day for implementation',
      fix: {
        title: 'Implement Comprehensive Lazy Loading',
        description: 'Lazy loading defers image loading until they\'re needed, significantly improving initial page load performance.',
        priority: 'MEDIUM',
        code: `/* COMPREHENSIVE LAZY LOADING */

// 1. Native Lazy Loading (Modern Browsers)
<img src="/images/content.jpg" 
     loading="lazy" 
     alt="Content image"
     width="800" 
     height="600">

// 2. Advanced Lazy Loading with Intersection Observer
class LazyImageLoader {
  constructor() {
    this.imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage(entry.target);
          this.imageObserver.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '50px 0px', // Start loading 50px before entering viewport
      threshold: 0.1
    });
    
    this.init();
  }
  
  init() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => this.imageObserver.observe(img));
  }
  
  loadImage(img) {
    img.src = img.dataset.src;
    img.classList.remove('lazy');
    img.classList.add('loaded');
  }
}

// Initialize lazy loading
new LazyImageLoader();

// 3. Progressive Image Loading with Blur Effect
.lazy {
  filter: blur(5px);
  transition: filter 0.3s;
}

.loaded {
  filter: blur(0);
}

// 4. Responsive Lazy Loading
<img data-src="/images/desktop.jpg"
     data-srcset="/images/mobile.jpg 400w, /images/desktop.jpg 800w"
     data-sizes="(max-width: 768px) 400px, 800px"
     src="/images/placeholder.jpg"
     loading="lazy"
     alt="Responsive lazy image">

// 5. Background Image Lazy Loading
.lazy-bg {
  background-image: url('/images/placeholder.jpg');
  transition: background-image 0.3s;
}

.lazy-bg.loaded {
  background-image: url('/images/actual-bg.jpg');
}

/* PERFORMANCE IMPACT */
// Initial Page Load: 30-50% faster
// Data Savings: Only load images when needed
// User Experience: Smooth progressive loading`
      }
    });
  }
  
  // Responsive images analysis
  const responsivePercentage = Math.round((responsiveImageCount / imgTags.length) * 100);
  if (responsivePercentage < 60) {
    issues.push({
      type: 'insufficient-responsive-images',
      severity: 'medium',
      description: `Only ${responsivePercentage}% of images are responsive (using srcset)`,
      impact: 'Oversized images on mobile, wasted bandwidth',
      expectedImprovement: '40-60% smaller images on mobile devices',
      timeline: '1-2 days for implementation',
      fix: {
        title: 'Implement Responsive Images',
        description: 'Serve appropriately sized images for different devices and screen densities.',
        code: `/* RESPONSIVE IMAGE IMPLEMENTATION */

// 1. Basic Responsive Images
<img src="/images/medium.jpg"
     srcset="/images/small.jpg 400w,
             /images/medium.jpg 800w,
             /images/large.jpg 1200w"
     sizes="(max-width: 480px) 400px,
            (max-width: 800px) 800px,
            1200px"
     alt="Responsive image">

// 2. Art Direction with Picture Element
<picture>
  <!-- Mobile: Cropped/focused image -->
  <source media="(max-width: 768px)" 
          srcset="/images/mobile-crop.jpg">
  <!-- Desktop: Full image -->
  <source media="(min-width: 769px)" 
          srcset="/images/desktop-full.jpg">
  <img src="/images/fallback.jpg" alt="Art directed image">
</picture>

// 3. High DPI Support
<img src="/images/standard.jpg"
     srcset="/images/standard.jpg 1x,
             /images/retina.jpg 2x,
             /images/ultra.jpg 3x"
     alt="High DPI image">

/* MOBILE OPTIMIZATION RESULTS */
// Mobile Data Savings: 40-60% smaller images
// Loading Speed: Significantly faster on mobile
// User Experience: Crisp images on all devices`
      }
    });
  }
  
  // Large images analysis
  if (largeImages.length > 0) {
    issues.push({
      type: 'oversized-images',
      severity: 'high',
      description: `${largeImages.length} oversized images detected (${largeImages.slice(0, 3).map(img => `${img.src}: ${img.size}`).join(', ')})`,
      impact: 'Slow loading, high bandwidth usage, poor mobile experience',
      expectedImprovement: '60-80% smaller image sizes',
      timeline: '1 day for compression',
      fix: {
        title: 'Optimize Image Sizes',
        description: 'Compress and resize images for optimal web delivery while maintaining visual quality.',
        priority: 'HIGH',
        code: `/* IMAGE SIZE OPTIMIZATION */

// 1. Automated Image Compression
// Using imagemin for batch optimization
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const imageminMozjpeg = require('imagemin-mozjpeg');

await imagemin(['images/*.jpg'], {
  destination: 'images/optimized',
  plugins: [
    imageminMozjpeg({ quality: 85 }),
    imageminWebp({ quality: 85 })
  ]
});

// 2. Responsive Image Sizes
// Generate multiple sizes automatically
const sharp = require('sharp');

const sizes = [400, 800, 1200, 1600];
for (const size of sizes) {
  await sharp('input.jpg')
    .resize(size, null, { withoutEnlargement: true })
    .jpeg({ quality: 85, progressive: true })
    .toFile(\`output-\${size}.jpg\`);
}

// 3. Modern Format Conversion
await sharp('input.jpg')
  .avif({ quality: 80, effort: 4 })
  .toFile('output.avif');

await sharp('input.jpg')
  .webp({ quality: 85, effort: 4 })
  .toFile('output.webp');

// 4. Image Optimization Guidelines
/* 
- JPEG: 85% quality for photos
- WebP: 85% quality (25% smaller than JPEG)
- AVIF: 80% quality (50% smaller than JPEG)
- Max width: 1920px for desktop, 800px for mobile
- Progressive JPEG for better perceived performance
*/

/* SIZE REDUCTION RESULTS */
// Large images identified: ${largeImages.length}
// Expected size reduction: 60-80%
// Loading speed improvement: 3-5x faster`
      }
    });
  }
  
  return issues;
}

// 7. JavaScript Optimization
function checkJavaScriptOptimization(html) {
  const issues = [];
  
  // Analyze JavaScript patterns
  const scriptTags = html.match(/<script[^>]*>/gi) || [];
  const inlineScripts = html.match(/<script(?![^>]*src)[^>]*>[\s\S]*?<\/script>/gi) || [];
  
  let asyncScriptCount = 0;
  let deferScriptCount = 0;
  let moduleScriptCount = 0;
  let renderBlockingScripts = 0;
  
  scriptTags.forEach(script => {
    if (script.includes('async')) asyncScriptCount++;
    if (script.includes('defer')) deferScriptCount++;
    if (script.includes('type="module"')) moduleScriptCount++;
    if (!script.includes('async') && !script.includes('defer') && script.includes('src=')) {
      renderBlockingScripts++;
    }
  });
  
  // Check for render-blocking JavaScript
  if (renderBlockingScripts > 0) {
    issues.push({
      type: 'render-blocking-javascript',
      severity: 'high',
      description: `${renderBlockingScripts} render-blocking JavaScript files detected`,
      impact: 'Delayed page rendering, poor user experience, slower Core Web Vitals',
      expectedImprovement: '40-60% faster page rendering',
      timeline: '1 day for async/defer implementation',
      fix: {
        title: 'Eliminate Render-Blocking JavaScript',
        description: 'Optimize JavaScript loading to prevent blocking page rendering and improve perceived performance.',
        priority: 'HIGH',
        code: `/* RENDER-BLOCKING JAVASCRIPT FIXES */

// 1. Async vs Defer Strategy
<!-- For analytics, tracking (independent scripts) -->
<script async src="/js/analytics.js"></script>
<script async src="/js/chat-widget.js"></script>

<!-- For DOM-dependent scripts (run after HTML parsing) -->
<script defer src="/js/main.js"></script>
<script defer src="/js/ui-components.js"></script>

<!-- For critical scripts only (avoid if possible) -->
<script src="/js/critical-polyfills.js"></script>

// 2. Dynamic Script Loading
function loadScriptAsync(src, callback) {
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  script.onload = callback;
  document.head.appendChild(script);
}

// Load non-critical scripts after page load
window.addEventListener('load', () => {
  loadScriptAsync('/js/non-critical.js');
  loadScriptAsync('/js/third-party.js');
});

// 3. Conditional Script Loading
// Load scripts based on user interaction
const loadAdvancedFeatures = () => {
  import('./advanced-features.js').then(module => {
    module.initAdvancedFeatures();
  });
};

// Load on scroll, click, or other user actions
let advanced = false;
const triggerAdvanced = () => {
  if (!advanced) {
    advanced = true;
    loadAdvancedFeatures();
  }
};

window.addEventListener('scroll', triggerAdvanced, { once: true });
document.addEventListener('click', triggerAdvanced, { once: true });

// 4. Modern JavaScript Loading
<!-- Modern browsers get modern code -->
<script type="module">
  import { ModernApp } from './js/modern-app.js';
  new ModernApp().init();
</script>

<!-- Legacy browsers get polyfilled code -->
<script nomodule defer src="/js/legacy-app.js"></script>

// 5. Critical JavaScript Inlining (minimal)
<script>
  // Only critical initialization code
  window.APP_CONFIG = {
    apiUrl: '/api',
    version: '1.0.0'
  };
  
  // Critical performance measurements
  window.performance.mark('script-start');
</script>

/* PERFORMANCE RESULTS */
// Render Blocking: Eliminated ${renderBlockingScripts} blocking scripts
// Page Rendering: 40-60% faster
// User Experience: Immediate visual feedback
// Core Web Vitals: Improved LCP and INP scores`
      }
    });
  }
  
  // Check for excessive inline JavaScript
  if (inlineScripts.length > PERFORMANCE_THRESHOLDS.RESOURCE_LIMITS.INLINE_JS_BLOCKS) {
    issues.push({
      type: 'excessive-inline-javascript',
      severity: 'medium',
      description: `${inlineScripts.length} inline JavaScript blocks detected (recommended: max 3)`,
      impact: 'Bloated HTML, no caching benefits, CSP violations',
      expectedImprovement: '20-30% smaller HTML, better caching',
      timeline: '1-2 days for externalization',
      fix: {
        title: 'Optimize Inline JavaScript Usage',
        description: 'Move JavaScript to external files for better caching, maintainability, and security.',
        priority: 'MEDIUM',
        code: `/* INLINE JAVASCRIPT OPTIMIZATION */

// 1. Extract to External Files
// Before: Multiple inline scripts
// After: Consolidated external file

// main.js
(function() {
  'use strict';
  
  // All your JavaScript functionality
  const app = {
    init() {
      this.setupEventListeners();
      this.loadComponents();
    },
    
    setupEventListeners() {
      document.addEventListener('DOMContentLoaded', () => {
        // DOM manipulation code
      });
    },
    
    loadComponents() {
      // Component initialization
    }
  };
  
  app.init();
})();

// 2. Keep Only Essential Inline Code
<script>
  // Only critical configuration
  window.APP_CONFIG = {
    apiUrl: '/api',
    userId: '${userId}',
    csrfToken: '${csrfToken}'
  };
</script>

// Load main functionality externally
<script defer src="/js/main.js"></script>

// 3. Use Data Attributes for Configuration
<!-- Pass data via HTML attributes -->
<div id="app" 
     data-api-url="/api"
     data-user-id="${userId}"
     data-feature-flags='${JSON.stringify(featureFlags)}'>
</div>

// Read configuration in external JavaScript
const appElement = document.getElementById('app');
const config = {
  apiUrl: appElement.dataset.apiUrl,
  userId: appElement.dataset.userId,
  featureFlags: JSON.parse(appElement.dataset.featureFlags)
};

// 4. Content Security Policy Compliance
// Enable strict CSP
Content-Security-Policy: script-src 'self' 'strict-dynamic'; object-src 'none';

/* OPTIMIZATION BENEFITS */
// HTML Size: 20-30% smaller
// Caching: JavaScript can be cached separately
// Security: Better CSP compliance
// Maintainability: Easier to manage and debug`
      }
    });
  }
  
  // Check for modern JavaScript features
  if (moduleScriptCount === 0 && scriptTags.length > 2) {
    issues.push({
      type: 'missing-modern-javascript',
      severity: 'medium',
      description: 'Missing modern JavaScript modules (ES6 imports/exports)',
      impact: 'Larger bundles, missing optimization opportunities',
      expectedImprovement: '15-25% smaller JavaScript for modern browsers',
      timeline: '2-3 days for modernization',
      fix: {
        title: 'Implement Modern JavaScript Modules',
        description: 'Use ES6 modules for better tree-shaking, code splitting, and performance optimization.',
        code: `/* MODERN JAVASCRIPT IMPLEMENTATION */

// 1. Convert to ES6 Modules
// main.js (ES6 modules)
import { analytics } from './analytics.js';
import { ui } from './ui-components.js';
import { api } from './api-client.js';

class App {
  constructor() {
    this.analytics = analytics;
    this.ui = ui;
    this.api = api;
  }
  
  async init() {
    await this.loadCriticalResources();
    this.setupEventListeners();
  }
  
  async loadCriticalResources() {
    // Dynamic imports for code splitting
    const { AdvancedFeature } = await import('./advanced-feature.js');
    this.advancedFeature = new AdvancedFeature();
  }
}

new App().init();

// 2. HTML Loading Strategy
<!-- Modern browsers -->
<script type="module" src="/js/main.js"></script>
<!-- Legacy browsers -->
<script nomodule src="/js/legacy-bundle.js"></script>

// 3. Dynamic Imports for Code Splitting
// Load features on demand
const loadFeature = async (featureName) => {
  const module = await import(\`./features/\${featureName}.js\`);
  return module.default;
};

// Usage
document.getElementById('advanced-btn').addEventListener('click', async () => {
  const AdvancedFeature = await loadFeature('advanced');
  new AdvancedFeature().show();
});

// 4. Tree Shaking Optimization
// utils.js - Only import what you need
export const debounce = (fn, delay) => { /* implementation */ };
export const throttle = (fn, limit) => { /* implementation */ };
export const formatDate = (date) => { /* implementation */ };

// main.js - Tree shaking will remove unused exports
import { debounce, formatDate } from './utils.js';
// throttle function won't be included in the bundle

/* MODERNIZATION BENEFITS */
// Bundle Size: 15-25% smaller for modern browsers
// Loading: Parallel module loading
// Caching: Better granular caching
// Maintenance: Cleaner code organization`
      }
    });
  }
  
  return issues;
}

// 8. Mobile Performance Excellence
// 8. Mobile Performance Excellence
function checkMobilePerformanceExcellence(html) {
  const issues = [];
  
  // Check viewport configuration
  const viewportMatch = html.match(/<meta[^>]*name=["']viewport["'][^>]*>/i);
  const hasProperViewport = viewportMatch && 
    viewportMatch[0].includes('width=device-width') && 
    viewportMatch[0].includes('initial-scale=1');
  
  // Check for mobile-specific optimizations
  const hasTouchIcons = html.includes('apple-touch-icon') || html.includes('touch-icon');
  const hasManifest = html.includes('manifest.json') || html.includes('site.webmanifest');
  const hasServiceWorker = html.includes('serviceWorker') || html.includes('service-worker');
  
  // Check for touch-friendly elements
  const hasTouchOptimization = html.includes('touch-action') || html.includes('user-select');
  
  if (!hasProperViewport) {
    issues.push({
      type: 'improper-mobile-viewport',
      severity: 'critical',
      description: 'Missing or improper mobile viewport configuration',
      impact: 'Poor mobile rendering, zooming issues, layout problems',
      expectedImprovement: 'Proper mobile rendering and touch experience',
      timeline: 'Immediate (same day fix)',
      fix: {
        title: 'Optimize Mobile Viewport Configuration',
        description: 'Proper viewport configuration is essential for mobile performance and user experience.',
        priority: 'HIGH',
        code: `/* MOBILE VIEWPORT OPTIMIZATION */

// 1. Essential Viewport Meta Tag
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">

// 2. Advanced Viewport Configuration
<!-- For PWAs and modern mobile apps -->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, user-scalable=yes, viewport-fit=cover">

// 3. Safe Area Handling (iPhone X+)
<!-- Handle notch and safe areas -->
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">

// CSS for safe areas
:root {
  --safe-area-inset-top: env(safe-area-inset-top);
  --safe-area-inset-right: env(safe-area-inset-right);
  --safe-area-inset-bottom: env(safe-area-inset-bottom);
  --safe-area-inset-left: env(safe-area-inset-left);
}

.header {
  padding-top: calc(1rem + var(--safe-area-inset-top));
  padding-left: calc(1rem + var(--safe-area-inset-left));
  padding-right: calc(1rem + var(--safe-area-inset-right));
}

// 4. Responsive Design Verification
@media (max-width: 768px) {
  .container {
    width: 100%;
    padding: 0 1rem;
  }
  
  .touch-target {
    min-height: 44px; /* Apple's recommended touch target */
    min-width: 44px;
  }
}

/* MOBILE RENDERING RESULTS */
// Before: Improper scaling, layout issues
// After: Perfect mobile rendering
// User Experience: Native app-like interface
// Touch Interactions: Optimized for mobile use`
      }
    });
  }
  
  if (!hasTouchIcons) {
    issues.push({
      type: 'missing-touch-icons',
      severity: 'low',
      description: 'Missing touch icons for mobile home screen',
      impact: 'Poor branding when added to home screen',
      expectedImprovement: 'Professional app-like appearance on mobile',
      timeline: '1 day for icon creation and implementation',
      fix: {
        title: 'Implement Touch Icons and PWA Assets',
        description: 'Add touch icons and PWA assets for better mobile integration and user experience.',
        code: `/* TOUCH ICONS AND PWA ASSETS */

// 1. Apple Touch Icons
<link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png">
<link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-touch-icon-152x152.png">
<link rel="apple-touch-icon" sizes="144x144" href="/icons/apple-touch-icon-144x144.png">
<link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-touch-icon-120x120.png">

// 2. Android Chrome Icons
<link rel="icon" type="image/png" sizes="192x192" href="/icons/android-chrome-192x192.png">
<link rel="icon" type="image/png" sizes="512x512" href="/icons/android-chrome-512x512.png">

// 3. Progressive Web App Manifest
<link rel="manifest" href="/manifest.json">

// manifest.json
{
  "name": "Your App Name",
  "short_name": "App",
  "description": "Your app description",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/icons/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}

// 4. iOS Specific Meta Tags
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Your App">

/* MOBILE INTEGRATION BENEFITS */
// Home Screen: Professional app appearance
// Branding: Consistent icon representation
// User Experience: Native app feel
// Engagement: Higher retention when bookmarked`
      }
    });
  }
  
  if (!hasServiceWorker && !hasManifest) {
    issues.push({
      type: 'missing-pwa-features',
      severity: 'medium',
      description: 'Missing Progressive Web App features (Service Worker, Manifest)',
      impact: 'No offline capability, missed engagement opportunities',
      expectedImprovement: 'Offline functionality, faster loading, app-like experience',
      timeline: '2-3 days for PWA implementation',
      fix: {
        title: 'Implement Progressive Web App Features',
        description: 'Add PWA capabilities for offline functionality, faster loading, and better mobile engagement.',
        code: `/* PROGRESSIVE WEB APP IMPLEMENTATION */

// 1. Service Worker Registration
// sw-register.js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(registration => {
      console.log('SW registered:', registration);
    })
    .catch(error => {
      console.log('SW registration failed:', error);
    });
}

// 2. Service Worker Implementation
// sw.js
const CACHE_NAME = 'app-cache-v1';
const CRITICAL_FILES = [
  '/',
  '/css/main.css',
  '/js/main.js',
  '/images/logo.webp'
];

// Install event - cache critical files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CRITICAL_FILES))
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

// 3. App Shell Architecture
// Cache the app shell for instant loading
const APP_SHELL = [
  '/app-shell.html',
  '/css/app-shell.css',
  '/js/app-shell.js'
];

// 4. Background Sync (for offline actions)
// Register background sync
navigator.serviceWorker.ready.then(registration => {
  registration.sync.register('background-sync');
});

// Handle background sync in service worker
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(syncData());
  }
});

// 5. Push Notifications Setup
// Request permission
Notification.requestPermission().then(permission => {
  if (permission === 'granted') {
    // Subscribe to push notifications
    navigator.serviceWorker.ready.then(registration => {
      registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: 'your-vapid-public-key'
      });
    });
  }
});

/* PWA BENEFITS */
// Offline: App works without internet
// Performance: Instant loading from cache
// Engagement: Push notifications, home screen install
// User Experience: Native app-like behavior`
      }
    });
  }
  
  return issues;
}

// 9. Resource Loading Optimization
function checkResourceLoadingOptimization(html) {
  const issues = [];
  
  // Check for resource hints
  const hasPreconnect = html.includes('rel="preconnect"');
  const hasDnsPrefetch = html.includes('rel="dns-prefetch"');
  const hasPreload = html.includes('rel="preload"');
  const hasPrefetch = html.includes('rel="prefetch"');
  const hasModulePreload = html.includes('rel="modulepreload"');
  
  // Count external domains
  const externalDomains = new Set();
  const linkTags = html.match(/<link[^>]*href=["']([^"']*)["'][^>]*>/gi) || [];
  const scriptTags = html.match(/<script[^>]*src=["']([^"']*)["'][^>]*>/gi) || [];
  
  [...linkTags, ...scriptTags].forEach(tag => {
    const urlMatch = tag.match(/(?:href|src)=["']([^"']*)["']/i);
    if (urlMatch && urlMatch[1]) {
      try {
        const url = new URL(urlMatch[1].startsWith('//') ? 'https:' + urlMatch[1] : urlMatch[1]);
        if (url.hostname !== 'localhost' && !url.hostname.includes('127.0.0.1')) {
          externalDomains.add(url.hostname);
        }
      } catch (error) {
        // Invalid URL, skip
      }
    }
  });
  
  // Check critical resource preloading
  const hasCriticalPreloads = html.includes('rel="preload"') && (
    html.includes('as="font"') || 
    html.includes('as="image"') || 
    html.includes('as="style"')
  );
  
  if (!hasCriticalPreloads) {
    issues.push({
      type: 'missing-critical-resource-preloads',
      severity: 'medium',
      description: 'Missing preload hints for critical resources (fonts, images, CSS)',
      impact: 'Delayed loading of critical resources, poor Core Web Vitals',
      expectedImprovement: '20-40% faster critical resource loading',
      timeline: '1 day for implementation',
      fix: {
        title: 'Implement Critical Resource Preloading',
        description: 'Preload critical resources to improve loading performance and Core Web Vitals scores.',
        priority: 'MEDIUM',
        code: `/* CRITICAL RESOURCE PRELOADING */

// 1. Font Preloading (Prevents Layout Shift)
<link rel="preload" href="/fonts/main-font.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/heading-font.woff2" as="font" type="font/woff2" crossorigin>

// 2. Critical Image Preloading (Improves LCP)
<link rel="preload" href="/images/hero-image.webp" as="image">
<link rel="preload" href="/images/logo.webp" as="image">

// 3. Critical CSS Preloading
<link rel="preload" href="/css/critical.css" as="style">
<link rel="preload" href="/css/above-fold.css" as="style">

// 4. Critical JavaScript Preloading
<link rel="preload" href="/js/critical.js" as="script">
<link rel="modulepreload" href="/js/main.js"> <!-- For ES6 modules -->

// 5. Responsive Image Preloading
<link rel="preload" 
      href="/images/hero-mobile.webp" 
      as="image" 
      media="(max-width: 768px)">
<link rel="preload" 
      href="/images/hero-desktop.webp" 
      as="image" 
      media="(min-width: 769px)">

// 6. Dynamic Preloading with JavaScript
// Preload next page resources on hover
document.addEventListener('mouseover', (e) => {
  if (e.target.tagName === 'A' && e.target.href) {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = e.target.href;
    document.head.appendChild(link);
  }
});

// 7. Intersection Observer for Smart Preloading
const preloadObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const preloadUrl = entry.target.dataset.preload;
      if (preloadUrl) {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = preloadUrl;
        document.head.appendChild(link);
      }
    }
  });
});

// Preload content when user scrolls near sections
document.querySelectorAll('[data-preload]').forEach(el => {
  preloadObserver.observe(el);
});

/* PRELOADING RESULTS */
// Critical Resources: Load 20-40% faster
// LCP Improvement: Better Largest Contentful Paint
// Font Loading: No layout shift from web fonts
// User Experience: Smoother, more responsive feel`
      }
    });
  }
  
  // Check for third-party domain optimization
  if (externalDomains.size > 2 && (!hasPreconnect || !hasDnsPrefetch)) {
    const domainList = Array.from(externalDomains).slice(0, 3).join(', ');
    
    issues.push({
      type: 'missing-external-domain-optimization',
      severity: 'medium',
      description: `${externalDomains.size} external domains without connection optimization (${domainList}...)`,
      impact: 'Slower third-party resource loading, increased connection times',
      expectedImprovement: '30-50% faster external resource loading',
      timeline: '1 day for implementation',
      fix: {
        title: 'Optimize External Domain Connections',
        description: 'Use connection hints to speed up loading of external resources like fonts, analytics, and CDNs.',
        priority: 'MEDIUM',
        code: `/* EXTERNAL DOMAIN OPTIMIZATION */

// 1. Preconnect for Critical Third-Party Resources
<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- CDNs -->
<link rel="preconnect" href="https://cdn.jsdelivr.net">
<link rel="preconnect" href="https://cdnjs.cloudflare.com">

<!-- Analytics -->
<link rel="preconnect" href="https://www.google-analytics.com">

// 2. DNS Prefetch for Less Critical Resources
<!-- Social Media -->
<link rel="dns-prefetch" href="https://platform.twitter.com">
<link rel="dns-prefetch" href="https://connect.facebook.net">

<!-- Other Third-Party Services -->
<link rel="dns-prefetch" href="https://www.googletagmanager.com">
<link rel="dns-prefetch" href="https://maps.googleapis.com">

// 3. Preload Third-Party Critical Resources
<link rel="preload" 
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" 
      as="style">

// 4. Resource Priority Management
// High priority for critical third-party resources
<script src="https://polyfill.io/v3/polyfill.min.js" fetchpriority="high"></script>

// Low priority for non-critical resources
<script src="https://www.googletagmanager.com/gtag/js" fetchpriority="low" async></script>

// 5. Self-Hosting Critical Third-Party Resources
// Instead of: <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
// Use: <script src="/js/vendor/jquery-3.6.0.min.js"></script>

// 6. Connection Monitoring and Optimization
// Monitor connection performance
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    if (entry.name.includes('third-party-domain.com')) {
      console.log('Third-party connection time:', entry.connectEnd - entry.connectStart);
    }
  });
});
observer.observe({entryTypes: ['navigation', 'resource']});

/* EXTERNAL DOMAIN RESULTS */
// Connection Speed: 30-50% faster to external domains
// Third-Party Loading: Parallel connection establishment
// User Experience: Reduced waiting time for external resources
// Performance: Better Core Web Vitals scores`
      }
    });
  }
  
  // Check for resource prefetching strategy
  if (!hasPrefetch) {
    issues.push({
      type: 'missing-resource-prefetching',
      severity: 'low',
      description: 'Missing resource prefetching for anticipated user navigation',
      impact: 'Slower subsequent page loads, missed optimization opportunity',
      expectedImprovement: 'Instant loading for predicted user actions',
      timeline: '1-2 days for intelligent prefetching',
      fix: {
        title: 'Implement Intelligent Resource Prefetching',
        description: 'Prefetch resources that users are likely to need next for instant loading experience.',
        code: `/* INTELLIGENT RESOURCE PREFETCHING */

// 1. Navigation Prefetching
<!-- Prefetch likely next pages -->
<link rel="prefetch" href="/about">
<link rel="prefetch" href="/contact">
<link rel="prefetch" href="/products">

// 2. Hover-Based Prefetching
let prefetchedLinks = new Set();

document.addEventListener('mouseover', (e) => {
  if (e.target.tagName === 'A' && e.target.href && !prefetchedLinks.has(e.target.href)) {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = e.target.href;
    document.head.appendChild(link);
    prefetchedLinks.add(e.target.href);
  }
});

// 3. Intersection Observer Prefetching
const prefetchObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.target.href) {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = entry.target.href;
      document.head.appendChild(link);
    }
  });
}, { rootMargin: '100px' });

// Prefetch when links come into viewport
document.querySelectorAll('a[href^="/"]').forEach(link => {
  prefetchObserver.observe(link);
});

// 4. User Behavior-Based Prefetching
// Track user patterns and prefetch accordingly
const userBehavior = {
  visitedPages: JSON.parse(localStorage.getItem('visitedPages') || '[]'),
  
  trackVisit(page) {
    this.visitedPages.push(page);
    if (this.visitedPages.length > 10) {
      this.visitedPages.shift(); // Keep last 10 visits
    }
    localStorage.setItem('visitedPages', JSON.stringify(this.visitedPages));
  },
  
  predictNextPage() {
    // Simple prediction based on common patterns
    const currentPage = window.location.pathname;
    const patterns = {
      '/': ['/products', '/about'],
      '/products': ['/product/', '/cart'],
      '/product/': ['/cart', '/checkout']
    };
    
    return patterns[currentPage] || [];
  }
};

// Prefetch predicted pages
userBehavior.predictNextPage().forEach(page => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = page;
  document.head.appendChild(link);
});

// 5. Conditional Prefetching
// Only prefetch on fast connections
if (navigator.connection && navigator.connection.effectiveType === '4g') {
  // Prefetch more aggressively on fast connections
  document.querySelectorAll('a[href]').forEach(link => {
    const prefetchLink = document.createElement('link');
    prefetchLink.rel = 'prefetch';
    prefetchLink.href = link.href;
    document.head.appendChild(prefetchLink);
  });
}

/* PREFETCHING BENEFITS */
// Next Page Loading: Instant for predicted navigation
// User Experience: Seamless browsing experience
// Engagement: Higher page views due to faster loading
// Conversion: Better user flow through faster interactions`
      }
    });
  }
  
  return issues;
}

// 10. Advanced Caching
function checkAdvancedCaching(headers) {
  const issues = [];
  
  const cacheControl = headers['cache-control'];
  const expires = headers['expires'];
  const etag = headers['etag'];
  const lastModified = headers['last-modified'];
  const vary = headers['vary'];
  
  // Check for modern caching strategies
  if (!cacheControl || (!cacheControl.includes('max-age') && !cacheControl.includes('s-maxage'))) {
    issues.push({
      type: 'missing-modern-caching',
      severity: 'high',
      description: 'Missing modern cache-control directives',
      impact: 'Poor caching efficiency, slower repeat visits, higher server load',
      expectedImprovement: '70-90% faster loading for returning visitors',
      timeline: 'Same day implementation',
      fix: {
        title: 'Implement Modern Caching Strategy',
        description: 'Use modern cache-control directives for optimal caching performance and user experience.',
        priority: 'HIGH',
        code: `/* MODERN CACHING STRATEGY */

// 1. Optimal Cache-Control Headers
# Nginx Configuration
location ~* \.(css|js)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
  add_header Vary "Accept-Encoding";
}

location ~* \.(jpg|jpeg|png|gif|webp|avif|svg)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
  add_header Vary "Accept-Encoding";
}

location ~* \.(woff|woff2|ttf|otf)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
  add_header Access-Control-Allow-Origin "*";
}

# HTML Files - Short cache with validation
location ~* \.html$ {
  expires 5m;
  add_header Cache-Control "public, must-revalidate";
  add_header Vary "Accept-Encoding";
}

// 2. Apache .htaccess Configuration
<IfModule mod_expires.c>
  ExpiresActive On
  
  # Static Assets - Long cache
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/avif "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
  
  # HTML - Short cache with validation
  ExpiresByType text/html "access plus 5 minutes"
</IfModule>

<IfModule mod_headers.c>
  # Add immutable directive for static assets
  <FilesMatch "\.(css|js|woff|woff2|jpg|jpeg|png|gif|webp|avif|svg)$">
    Header append Cache-Control "immutable"
  </FilesMatch>
  
  # Add Vary header for compressed content
  <FilesMatch "\.(css|js|html)$">
    Header append Vary "Accept-Encoding"
  </FilesMatch>
</IfModule>

// 3. Express.js Caching
const express = require('express');
const app = express();

// Static assets with long cache
app.use('/static', express.static('public', {
  maxAge: 31536000000, // 1 year
  immutable: true,
  setHeaders: (res, path) => {
    res.setHeader('Vary', 'Accept-Encoding');
  }
}));

// HTML with short cache and validation
app.get('*', (req, res, next) => {
  if (req.path.endsWith('.html') || req.path === '/') {
    res.setHeader('Cache-Control', 'public, max-age=300, must-revalidate');
    res.setHeader('Vary', 'Accept-Encoding');
  }
  next();
});

// 4. Service Worker Advanced Caching
// sw.js
const CACHE_STRATEGIES = {
  STATIC_CACHE: 'static-cache-v1',
  DYNAMIC_CACHE: 'dynamic-cache-v1',
  API_CACHE: 'api-cache-v1'
};

// Cache strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // Static assets - Cache First
  if (request.url.includes('/static/')) {
    event.respondWith(
      caches.match(request).then(response => {
        return response || fetch(request).then(fetchResponse => {
          const responseClone = fetchResponse.clone();
          caches.open(CACHE_STRATEGIES.STATIC_CACHE).then(cache => {
            cache.put(request, responseClone);
          });
          return fetchResponse;
        });
      })
    );
  }
  
  // API calls - Network First with fallback
  else if (request.url.includes('/api/')) {
    event.respondWith(
      fetch(request).then(response => {
        const responseClone = response.clone();
        caches.open(CACHE_STRATEGIES.API_CACHE).then(cache => {
          cache.put(request, responseClone);
        });
        return response;
      }).catch(() => {
        return caches.match(request);
      })
    );
  }
  
  // HTML pages - Stale While Revalidate
  else {
    event.respondWith(
      caches.match(request).then(response => {
        const fetchPromise = fetch(request).then(fetchResponse => {
          caches.open(CACHE_STRATEGIES.DYNAMIC_CACHE).then(cache => {
            cache.put(request, fetchResponse.clone());
          });
          return fetchResponse;
        });
        
        return response || fetchPromise;
      })
    );
  }
});

/* CACHING PERFORMANCE RESULTS */
// Static Assets: Instant loading after first visit
// Repeat Visitors: 70-90% faster page loads
// Server Load: Significantly reduced
// Bandwidth: Reduced by 60-80% for repeat visitors
// User Experience: Near-instant subsequent page loads`
      }
    });
  }
  
  // Check for cache validation headers
  if (!etag && !lastModified) {
    issues.push({
      type: 'missing-cache-validation',
      severity: 'medium',
      description: 'Missing cache validation headers (ETag, Last-Modified)',
      impact: 'Inefficient cache validation, unnecessary downloads',
      expectedImprovement: '30-50% fewer unnecessary downloads',
      timeline: '1 day for implementation',
      fix: {
        title: 'Implement Cache Validation Headers',
        description: 'Add cache validation headers to enable efficient conditional requests and reduce bandwidth usage.',
        code: `/* CACHE VALIDATION IMPLEMENTATION */

// 1. Nginx ETag and Last-Modified
server {
  # Enable ETags
  etag on;
  
  # Enable Last-Modified
  location ~* \.(css|js|jpg|jpeg|png|gif|webp|avif)$ {
    add_header Last-Modified $date_gmt;
    if_modified_since before;
  }
}

// 2. Apache Configuration
# Enable ETags
FileETag MTime Size

# Enable conditional requests
<IfModule mod_headers.c>
  Header set Last-Modified "%{LAST_MODIFIED}e"
</IfModule>

// 3. Express.js with ETags
app.use(express.static('public', {
  etag: true,
  lastModified: true,
  maxAge: 31536000000
}));

// Custom ETag generation
app.get('/api/data', (req, res) => {
  const data = getData();
  const etag = generateETag(data);
  
  res.set('ETag', etag);
  
  if (req.get('If-None-Match') === etag) {
    res.status(304).send();
  } else {
    res.json(data);
  }
});

// 4. Service Worker Cache Validation
// Check for updates using ETags
self.addEventListener('fetch', (event) => {
  if (event.request.method === 'GET') {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        // If we have a cached response, make a conditional request
        if (cachedResponse) {
          const conditionalRequest = new Request(event.request.url, {
            headers: {
              'If-None-Match': cachedResponse.headers.get('etag') || '',
              'If-Modified-Since': cachedResponse.headers.get('last-modified') || ''
            }
          });
          
          return fetch(conditionalRequest).then(response => {
            if (response.status === 304) {
              // Not modified, return cached version
              return cachedResponse;
            } else {
              // Updated, cache new version
              const cache = caches.open('dynamic-cache');
              cache.then(c => c.put(event.request, response.clone()));
              return response;
            }
          });
        }
        
        // No cached version, fetch normally
        return fetch(event.request);
      })
    );
  }
});

/* CACHE VALIDATION BENEFITS */
// Bandwidth: 30-50% reduction in unnecessary downloads
// Server Load: Reduced processing for unchanged resources
// Performance: Faster validation of cached content
// User Experience: Quicker content freshness checks`
      }
    });
  }
  
  // Check for Vary header optimization
  if (!vary || !vary.includes('Accept-Encoding')) {
    issues.push({
      type: 'missing-vary-header',
      severity: 'medium',
      description: 'Missing Vary: Accept-Encoding header for compressed content',
      impact: 'Incorrect caching of compressed/uncompressed content',
      expectedImprovement: 'Proper caching for different compression formats',
      timeline: 'Same day fix',
      fix: {
        title: 'Implement Vary Header Optimization',
        description: 'Add proper Vary headers to ensure correct caching behavior for compressed content.',
        code: `/* VARY HEADER OPTIMIZATION */

# Nginx
location ~* \.(css|js|html)$ {
  gzip on;
  add_header Vary "Accept-Encoding";
}

# Apache
<FilesMatch "\.(css|js|html)$">
  Header append Vary "Accept-Encoding"
</FilesMatch>

// Express.js
app.use((req, res, next) => {
  res.setHeader('Vary', 'Accept-Encoding');
  next();
});

/* BENEFITS */
// Proper compression caching
// Correct content delivery
// Better CDN behavior`
      }
    });
  }
  
  return issues;
}

// Enhanced third-party script optimization
function checkAdvancedThirdPartyScripts(html) {
  const issues = [];
  
  // Find all script tags
  const scriptTags = html.match(/<script[^>]*>/gi) || [];
  
  const thirdPartyDomains = new Set();
  const thirdPartyScripts = [];
  let criticalThirdPartyCount = 0;
  let asyncThirdPartyCount = 0;
  
  scriptTags.forEach(script => {
    const srcMatch = script.match(/src=["']([^"']*)["']/i);
    if (!srcMatch || !srcMatch[1]) return;
    
    const src = srcMatch[1];
    
    try {
      const url = new URL(src.startsWith('//') ? 'https:' + src : src);
      const domain = url.hostname;
      
      // Common third-party services with impact analysis
      const thirdPartyServices = {
        'google-analytics.com': { type: 'analytics', impact: 'medium', critical: false },
        'googletagmanager.com': { type: 'analytics', impact: 'medium', critical: false },
        'facebook.net': { type: 'social', impact: 'high', critical: false },
        'doubleclick.net': { type: 'ads', impact: 'high', critical: false },
        'googlesyndication.com': { type: 'ads', impact: 'high', critical: false },
        'hotjar.com': { type: 'analytics', impact: 'medium', critical: false },
        'intercom.io': { type: 'chat', impact: 'medium', critical: true },
        'zendesk.com': { type: 'support', impact: 'medium', critical: true },
        'stripe.com': { type: 'payment', impact: 'low', critical: true },
        'recaptcha.net': { type: 'security', impact: 'medium', critical: true }
      };
      
      const serviceInfo = Object.entries(thirdPartyServices).find(([key]) => domain.includes(key));
      if (serviceInfo) {
        const [serviceDomain, info] = serviceInfo;
        thirdPartyDomains.add(domain);
        thirdPartyScripts.push({
          domain: serviceDomain,
          type: info.type,
          impact: info.impact,
          critical: info.critical,
          hasAsync: script.includes('async'),
          hasDefer: script.includes('defer')
        });
        
        if (info.critical) criticalThirdPartyCount++;
        if (script.includes('async') || script.includes('defer')) asyncThirdPartyCount++;
      }
    } catch (error) {
      // Invalid URL, skip
    }
  });
  
  if (thirdPartyScripts.length > 5) {
    const highImpactScripts = thirdPartyScripts.filter(s => s.impact === 'high').length;
    const syncScripts = thirdPartyScripts.filter(s => !s.hasAsync && !s.hasDefer).length;
    
    issues.push({
      type: 'excessive-third-party-scripts',
      severity: highImpactScripts > 2 ? 'critical' : 'high',
      description: `${thirdPartyScripts.length} third-party scripts detected (${highImpactScripts} high-impact, ${syncScripts} blocking)`,
      impact: 'Slow page loading, privacy concerns, dependency on external services',
      expectedImprovement: '40-70% faster loading with optimization',
      timeline: '2-3 days for comprehensive optimization',
      fix: {
        title: 'Optimize Third-Party Script Performance',
        description: 'Reduce third-party script impact through strategic loading, bundling, and conditional inclusion.',
        priority: highImpactScripts > 2 ? 'CRITICAL' : 'HIGH',
        code: `/* THIRD-PARTY SCRIPT OPTIMIZATION */

// 1. Performance Budget for Third-Party Scripts
const SCRIPT_BUDGET = {
  analytics: 2, // Max 2 analytics scripts
  social: 1,    // Max 1 social widget
  ads: 1,       // Max 1 ad network
  chat: 1       // Max 1 chat widget
};

// 2. Conditional Loading Based on User Consent
class ThirdPartyManager {
  constructor() {
    this.consentGiven = false;
    this.criticalScripts = ['stripe', 'recaptcha'];
    this.optionalScripts = ['analytics', 'social', 'ads'];
  }
  
  loadCriticalScripts() {
    // Load essential scripts immediately
    this.loadScript('https://js.stripe.com/v3/', 'critical');
    this.loadScript('https://www.google.com/recaptcha/api.js', 'critical');
  }
  
  loadOptionalScripts() {
    if (this.consentGiven) {
      // Load after user consent
      setTimeout(() => {
        this.loadScript('https://www.googletagmanager.com/gtag/js?id=GA_ID', 'analytics');
      }, 3000); // Delay non-critical scripts
    }
  }
  
  loadScript(src, category) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.setAttribute('data-category', category);
    document.head.appendChild(script);
  }
}

// 3. Lazy Loading Third-Party Widgets
// Social media embeds
class LazyWidget {
  static initSocialEmbeds() {
    const socialElements = document.querySelectorAll('[data-social-embed]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadSocialEmbed(entry.target);
          observer.unobserve(entry.target);
        }
      });
    });
    
    socialElements.forEach(el => observer.observe(el));
  }
  
  static loadSocialEmbed(element) {
    const platform = element.dataset.socialEmbed;
    const embedUrl = element.dataset.embedUrl;
    
    const iframe = document.createElement('iframe');
    iframe.src = embedUrl;
    iframe.width = '100%';
    iframe.height = '400';
    iframe.frameBorder = '0';
    iframe.loading = 'lazy';
    
    element.appendChild(iframe);
  }
}

// 4. Service Worker for Third-Party Script Caching
// Cache third-party scripts locally
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('googleapis.com') || 
      event.request.url.includes('gstatic.com')) {
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) return response;
        
        return fetch(event.request).then(fetchResponse => {
          const responseClone = fetchResponse.clone();
          caches.open('third-party-cache').then(cache => {
            cache.put(event.request, responseClone);
          });
          return fetchResponse;
        });
      })
    );
  }
});

// 5. Performance Monitoring for Third-Party Scripts
class ThirdPartyMonitor {
  static init() {
    // Monitor third-party script performance
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (this.isThirdParty(entry.name)) {
          console.log(\`Third-party script: \${entry.name}\`);
          console.log(\`Load time: \${entry.duration}ms\`);
          
          // Alert if script takes too long
          if (entry.duration > 1000) {
            console.warn(\`Slow third-party script detected: \${entry.name}\`);
          }
        }
      });
    });
    
    observer.observe({entryTypes: ['resource']});
  }
  
  static isThirdParty(url) {
    const thirdPartyDomains = [
      'google-analytics.com', 'googletagmanager.com', 'facebook.net',
      'doubleclick.net', 'hotjar.com', 'intercom.io', 'zendesk.com'
    ];
    return thirdPartyDomains.some(domain => url.includes(domain));
  }
}

// 6. Script Loading Priority System
const ScriptLoader = {
  queues: {
    critical: [],
    high: [],
    medium: [],
    low: []
  },
  
  add(src, priority = 'medium', options = {}) {
    this.queues[priority].push({ src, options });
  },
  
  async loadAll() {
    // Load critical scripts first
    await this.loadQueue('critical');
    
    // Load high priority after initial render
    requestIdleCallback(() => {
      this.loadQueue('high');
    });
    
    // Load medium priority after user interaction
    document.addEventListener('click', () => {
      this.loadQueue('medium');
    }, { once: true });
    
    // Load low priority scripts last
    setTimeout(() => {
      this.loadQueue('low');
    }, 5000);
  },
  
  loadQueue(priority) {
    return Promise.all(
      this.queues[priority].map(item => this.loadScript(item))
    );
  },
  
  loadScript({ src, options }) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      Object.assign(script, options);
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
};

// Usage
ScriptLoader.add('https://js.stripe.com/v3/', 'critical');
ScriptLoader.add('https://www.googletagmanager.com/gtag/js', 'low');
ScriptLoader.loadAll();

/* THIRD-PARTY OPTIMIZATION RESULTS */
// Script Count: Reduced from ${thirdPartyScripts.length} to essential only
// Loading Speed: 40-70% faster page loading
// User Privacy: Better consent management
// Performance: Reduced third-party impact on Core Web Vitals
// Reliability: Less dependency on external services`
      }
    });
  }
  
  return issues;
}

// Enhanced render-blocking resource optimization
function checkAdvancedRenderBlocking(html) {
  const issues = [];
  
  // Analyze CSS blocking patterns
  const cssLinks = html.match(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi) || [];
  const styleBlocks = html.match(/<style[^>]*>[\s\S]*?<\/style>/gi) || [];
  
  let criticalCSSInlined = false;
  let nonCriticalCSSAsync = false;
  let renderBlockingCSS = 0;
  
  // Check if critical CSS is inlined
  styleBlocks.forEach(style => {
    const content = style.replace(/<\/?style[^>]*>/gi, '');
    // Look for common above-the-fold selectors
    if (content.includes('body') || content.includes('header') || content.includes('nav')) {
      criticalCSSInlined = true;
    }
  });
  
  // Check CSS loading strategy
  cssLinks.forEach(link => {
    if (link.includes('media="print"') || link.includes('rel="preload"')) {
      nonCriticalCSSAsync = true;
    } else if (!link.includes('media=') || link.includes('media="all"') || link.includes('media="screen"')) {
      renderBlockingCSS++;
    }
  });
  
  if (renderBlockingCSS > 1 || !criticalCSSInlined) {
    issues.push({
      type: 'suboptimal-css-loading',
      severity: 'high',
      description: `${renderBlockingCSS} render-blocking CSS files, critical CSS ${criticalCSSInlined ? 'inlined' : 'not inlined'}`,
      impact: 'Delayed first paint, poor perceived performance, slower Core Web Vitals',
      expectedImprovement: '50-80% faster first contentful paint',
      timeline: '2-3 days for critical CSS extraction',
      fix: {
        title: 'Optimize Critical CSS Loading Strategy',
        description: 'Implement critical CSS inlining and asynchronous loading for non-critical styles.',
        priority: 'HIGH',
        code: `/* CRITICAL CSS OPTIMIZATION */

// 1. Critical CSS Extraction and Inlining
<!-- Inline critical above-the-fold CSS (14KB max) -->
<style>
  /* Critical CSS - Keep minimal, only above-the-fold styles */
  *{box-sizing:border-box}
  body{margin:0;font:16px/1.5 -apple-system,BlinkMacSystemFont,segoe ui,roboto,sans-serif}
  .header{background:#333;color:#fff;padding:1rem;position:relative;z-index:100}
  .nav{display:flex;justify-content:space-between;align-items:center}
  .hero{min-height:60vh;display:flex;align-items:center;justify-content:center;text-align:center}
  .hero h1{font-size:clamp(2rem,5vw,4rem);margin:0 0 1rem;font-weight:700}
  .btn{display:inline-block;padding:0.75rem 1.5rem;background:#007bff;color:#fff;text-decoration:none;border-radius:0.25rem}
</style>

// 2. Asynchronous Non-Critical CSS Loading
<!-- Load non-critical CSS asynchronously -->
<link rel="preload" href="/css/non-critical.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/css/non-critical.css"></noscript>

<!-- Load additional styles conditionally -->
<link rel="preload" href="/css/components.css" as="style" onload="this.onload=null;this.rel='stylesheet'" media="print" onload="this.media='all'">

// 3. Automated Critical CSS Extraction
// Using Critical (Node.js tool)
const critical = require('critical');

critical.generate({
  base: 'dist/',
  src: 'index.html',
  dest: 'index-critical.html',
  width: 1300,
  height: 900,
  inline: true,
  minify: true,
  extract: true, // Extract critical CSS to separate file
  ignore: {
    atrule: ['@font-face'],
    rule: [/\.sr-only/],
    decl: (node, value) => /url\(/.test(value)
  }
});

// 4. Service Worker for CSS Caching
// Cache CSS files aggressively
self.addEventListener('fetch', (event) => {
  if (event.request.url.endsWith('.css')) {
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) return response;
        
        return fetch(event.request).then(fetchResponse => {
          const responseClone = fetchResponse.clone();
          caches.open('css-cache-v1').then(cache => {
            cache.put(event.request, responseClone);
          });
          return fetchResponse;
        });
      })
    );
  }
});

// 5. Runtime CSS Loading for Dynamic Content
class DynamicStyleLoader {
  static loadedStyles = new Set();
  
  static async loadComponentStyles(componentName) {
    if (this.loadedStyles.has(componentName)) return;
    
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = \`/css/components/\${componentName}.css\`;
    
    return new Promise((resolve, reject) => {
      link.onload = () => {
        this.loadedStyles.add(componentName);
        resolve();
      };
      link.onerror = reject;
      document.head.appendChild(link);
    });
  }
}

// Load component styles on demand
document.addEventListener('click', async (e) => {
  if (e.target.dataset.component) {
    await DynamicStyleLoader.loadComponentStyles(e.target.dataset.component);
  }
});

// 6. CSS-in-JS Alternative for Critical Components
// For React/Vue components
const CriticalButton = styled.button\`
  /* Critical button styles inlined */
  padding: 0.75rem 1.5rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #0056b3;
  }
\`;

/* CSS OPTIMIZATION RESULTS */
// First Contentful Paint: 50-80% faster
// Render Blocking: Eliminated for non-critical CSS
// Critical Path: Optimized for above-the-fold content
// User Experience: Immediate visual feedback
// Core Web Vitals: Significantly improved LCP scores`
      }
    });
  }
  
  // Check for font loading optimization
  const fontLinks = html.match(/<link[^>]*href=["'][^"']*font[^"']*["'][^>]*>/gi) || [];
  const fontFaceRules = html.match(/@font-face[^}]*}/gi) || [];
  
  let webFontCount = fontLinks.length + fontFaceRules.length;
  let hasFontDisplay = html.includes('font-display:') || html.includes('font-display=');
  let hasFontPreload = html.includes('rel="preload"') && html.includes('as="font"');
  
  if (webFontCount > 0 && (!hasFontDisplay || !hasFontPreload)) {
    issues.push({
      type: 'unoptimized-web-fonts',
      severity: 'medium',
      description: `${webFontCount} web fonts without optimization (${hasFontPreload ? 'has' : 'missing'} preload, ${hasFontDisplay ? 'has' : 'missing'} font-display)`,
      impact: 'Layout shift, slow text rendering, poor reading experience',
      expectedImprovement: 'Eliminate font-related layout shift',
      timeline: '1 day for font optimization',
      fix: {
        title: 'Optimize Web Font Loading',
        description: 'Prevent layout shift and improve text rendering performance with proper font loading strategies.',
        code: `/* WEB FONT OPTIMIZATION */

// 1. Font Preloading
<!-- Preload critical fonts -->
<link rel="preload" href="/fonts/inter-regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/inter-bold.woff2" as="font" type="font/woff2" crossorigin>

// 2. Optimized Font Face Declarations
<style>
  @font-face {
    font-family: 'Inter';
    src: url('/fonts/inter-regular.woff2') format('woff2'),
         url('/fonts/inter-regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
    font-display: swap; /* Prevents invisible text during font load */
  }
  
  @font-face {
    font-family: 'Inter';
    src: url('/fonts/inter-bold.woff2') format('woff2'),
         url('/fonts/inter-bold.woff') format('woff');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
  
  /* Fallback font stack */
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
</style>

// 3. Font Loading API for Advanced Control
if ('fonts' in document) {
  // Load fonts programmatically
  const inter400 = new FontFace('Inter', 'url(/fonts/inter-regular.woff2)', {
    weight: '400',
    style: 'normal'
  });
  
  const inter700 = new FontFace('Inter', 'url(/fonts/inter-bold.woff2)', {
    weight: '700',
    style: 'normal'
  });
  
  Promise.all([
    inter400.load(),
    inter700.load()
  ]).then(fonts => {
    fonts.forEach(font => document.fonts.add(font));
    document.body.classList.add('fonts-loaded');
  });
}

// 4. CSS for Font Loading States
.fonts-loading {
  /* Styles while fonts are loading */
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}

.fonts-loaded {
  /* Styles after fonts have loaded */
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.fonts-failed {
  /* Fallback if font loading fails */
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}

// 5. Variable Fonts for Better Performance
@font-face {
  font-family: 'InterVariable';
  src: url('/fonts/inter-variable.woff2') format('woff2-variations');
  font-weight: 100 900; /* Variable weight range */
  font-display: swap;
}

/* Use variable font */
.heading {
  font-family: 'InterVariable', sans-serif;
  font-weight: 600; /* Any weight between 100-900 */
}

/* FONT OPTIMIZATION BENEFITS */
// Layout Shift: Eliminated with font-display: swap
// Loading Speed: Faster with preloading
// File Size: Reduced with variable fonts
// User Experience: No flash of invisible text (FOIT)
// Performance: Better Core Web Vitals scores`
      }
    });
  }
  
  return issues;
}

// Export the main scanning function and all helper functions
export {
  scanPerformance,
  checkAdvancedLoadTime,
  checkPageSizeOptimization,
  checkCoreWebVitals,
  checkModernCompression,
  checkEnhancedResourceOptimization,
  checkImagePerformanceExcellence,
  checkJavaScriptOptimization,
  checkMobilePerformanceExcellence,
  checkResourceLoadingOptimization,
  checkAdvancedCaching,
  checkAdvancedThirdPartyScripts,
  checkAdvancedRenderBlocking,
  PERFORMANCE_THRESHOLDS,
  MODERN_FORMATS,
  estimateWebVitals,
  analyzeResourceCounts
};