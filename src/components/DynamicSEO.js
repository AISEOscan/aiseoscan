import { Helmet } from 'react-helmet-async';

export default function DynamicSEO({ 
  title, 
  description, 
  url, 
  scanResults, 
  isReportPage = false,
  reportId = null 
}) {
  // Generate dynamic content based on scan results
  const generateDynamicMeta = () => {
    if (!scanResults) {
  return {
    title: "AISEOScan - Complete AI SEO audit",
    description: "Is your website ready for AI search? If ChatGPT can’t find you, neither can your customers. Get a complete AI SEO audit and optimization plan designed for the age of AI-powered search.",
    keywords: "AISEO , SEO Checker, ChatGPT SEO, Perplexity SEO, SearchGPT SEO, schema markup, AI SEO, content optimization, AI search , AISEO Humanizer, free SEO, Site analyzer"
  };
}


    const overallScore = scanResults.summary?.overallScore || 0;
    const seoIssues = scanResults.seo?.total || scanResults.seo?.issues?.length || 0;
    const complianceIssues = scanResults.compliance?.total || scanResults.compliance?.issues?.length || 0;
    const totalIssues = seoIssues + complianceIssues;

    if (isReportPage && reportId) {
      return {
        title: `AI SEO Analysis Report ${reportId} - Score: ${overallScore}/100 | AISEOScan`,
        description: `AI SEO readiness analysis found ${totalIssues} optimization opportunities for ChatGPT and AI search engines. Schema markup: ${scanResults.seo?.score || 0}/100, Trust signals: ${100 - (complianceIssues * 10)}/100. Get cited by AI engines.`,
        keywords: `AI SEO report, ChatGPT optimization, schema markup audit, AI citation ready, ${url || 'website'} AI analysis, Perplexity SEO, SearchGPT optimization`
      };
    }

    // For home page with results
    let aiReadinessStatus = 'needs AI optimization';
    if (overallScore >= 80) aiReadinessStatus = 'AI-ready';
    else if (overallScore >= 60) aiReadinessStatus = 'good AI foundation';

    return {
      title: `${url || 'Website'} AI SEO Analysis - ${overallScore}/100 Score | AISEOScan`,
      description: `AI SEO analysis complete! Found ${totalIssues} optimization opportunities for ChatGPT, Perplexity & AI search engines. Your website is ${aiReadinessStatus}. Get detailed AI optimization plan for $29.`,
      keywords: `${url || 'website'} AI SEO, AI search optimization, ChatGPT citation ready, schema markup analysis, AI content optimization, voice search SEO`
    };
  };

  const meta = generateDynamicMeta();
  const pageUrl = url ? `https://aiseoscan.dev${url}` : 'https://aiseoscan.dev';
  
  // Generate Open Graph image URL based on results
  const getOGImage = () => {
    if (scanResults) {
      const score = scanResults.summary?.overallScore || 0;
      // You can create dynamic OG images based on AI readiness score
      return `https://aiseoscan.dev/og/ai-seo-${score >= 80 ? 'ready' : score >= 60 ? 'good' : 'needs-optimization'}.png`;
    }
    return 'https://aiseoscan.dev/og/ai-seo-default.png';
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title || meta.title}</title>
      <meta name="title" content={title || meta.title} />
      <meta name="description" content={description || meta.description} />
      <meta name="keywords" content={meta.keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={pageUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={isReportPage ? "article" : "website"} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={title || meta.title} />
      <meta property="og:description" content={description || meta.description} />
      <meta property="og:image" content={getOGImage()} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`AISEOScan AI readiness analysis ${scanResults ? `showing ${scanResults.summary?.overallScore}/100 score` : 'for AI search engine optimization'}`} />
      <meta property="og:site_name" content="AISEOScan" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={pageUrl} />
      <meta property="twitter:title" content={title || meta.title} />
      <meta property="twitter:description" content={description || meta.description} />
      <meta property="twitter:image" content={getOGImage()} />
      <meta property="twitter:image:alt" content={`AISEOScan AI readiness analysis ${scanResults ? `showing ${scanResults.summary?.overallScore}/100 score` : 'for AI search engine optimization'}`} />
      <meta property="twitter:creator" content="@aiseoscan" />
      <meta property="twitter:site" content="@aiseoscan" />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="author" content="AISEOScan" />
      
      {/* Schema.org structured data - Enhanced for AI SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": isReportPage ? "Report" : "SoftwareApplication",
          "name": isReportPage ? `AI SEO Readiness Report` : "AISEOScan",
          "applicationCategory": isReportPage ? undefined : "WebApplication",
          "applicationSubCategory": isReportPage ? undefined : "SEO Tools",
          "url": pageUrl,
          "description": description || meta.description,
          "category": "AI SEO Optimization",
          "keywords": "AI SEO, ChatGPT optimization, schema markup, AI citation, content optimization",
          "offers": isReportPage ? undefined : {
            "@type": "Offer",
            "name": "AI SEO Readiness Audit",
            "description": "Comprehensive AI SEO analysis for ChatGPT, Perplexity, and SearchGPT optimization",
            "price": "29.00",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "category": "AI SEO Analysis"
          },
          "creator": {
            "@type": "Organization",
            "name": "AISEOScan",
            "url": "https://aiseoscan.dev",
            "description": "AI SEO optimization platform for modern search engines"
          },
          "audience": {
            "@type": "Audience",
            "audienceType": "Content Marketers, SEO Professionals, Business Owners"
          },
          "serviceType": "AI SEO Analysis",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": pageUrl
          },
          ...(scanResults && {
            "about": {
              "@type": "WebSite",
              "url": scanResults.url || url,
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://aiseoscan.dev/scan?url={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          })
        })}
      </script>
      
      {/* Additional AI SEO specific schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What makes AISEOScan different from traditional SEO tools?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "AISEOScan is the only tool built specifically for AI search optimization, analyzing schema markup, content structure, and authority signals that ChatGPT, Perplexity, and SearchGPT need for content citation."
              }
            },
            {
              "@type": "Question", 
              "name": "Which AI search engines does this optimize for?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "AISEOScan optimizes for ChatGPT, Perplexity AI, SearchGPT, Claude, and other major AI search engines by focusing on structured data, content quality, and authority signals."
              }
            }
          ]
        })}
      </script>
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      
      {/* Favicon and App Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Additional performance hints */}
      {scanResults && (
        <>
          <meta name="theme-color" content={scanResults.summary?.overallScore >= 80 ? "#10b981" : scanResults.summary?.overallScore >= 60 ? "#3b82f6" : "#f472b6"} />
          <meta name="msapplication-TileColor" content="#1f2937" />
        </>
      )}
    </Helmet>
  );
}