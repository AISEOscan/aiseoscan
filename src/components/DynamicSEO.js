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
        title: "FounderScan - Professional Website Analysis for Business Growth",
        description: "Comprehensive website analysis covering security, SEO, performance, and compliance. Enterprise-grade security scanning plus growth insights to accelerate your business for just $19.",
        keywords: "website analysis, security scan, SEO audit, performance optimization, compliance check, website growth, founder tools, vulnerability scanner"
      };
    }

    const overallScore = scanResults.summary?.overallScore || 0;
    const totalIssues = (scanResults.security?.total || 0) + 
                       (scanResults.seo?.total || 0) + 
                       (scanResults.performance?.total || 0) + 
                       (scanResults.compliance?.total || 0);

    if (isReportPage && reportId) {
      return {
        title: `Website Analysis Report ${reportId} - Score: ${overallScore}/100 | FounderScan`,
        description: `Complete analysis found ${totalIssues} optimization opportunities. Security: ${scanResults.security?.score || 0}/100, SEO: ${scanResults.seo?.score || 0}/100, Performance: ${scanResults.performance?.score || 0}/100, Compliance: ${scanResults.compliance?.score || 0}/100.`,
        keywords: `website analysis report, security scan results, SEO audit report, performance analysis, compliance check, ${url || 'website'} analysis`
      };
    }

    // For home page with results
    let scoreStatus = 'needs optimization';
    if (overallScore >= 80) scoreStatus = 'excellent performance';
    else if (overallScore >= 60) scoreStatus = 'good foundation';

    return {
      title: `${url || 'Website'} Analysis Complete - ${overallScore}/100 Score | FounderScan`,
      description: `Analysis complete! Found ${totalIssues} optimization opportunities across security, SEO, performance & compliance. Your website shows ${scoreStatus}. Get detailed fix instructions for $19.`,
      keywords: `${url || 'website'} analysis, website scan results, security issues, SEO opportunities, performance optimization, compliance check`
    };
  };

  const meta = generateDynamicMeta();
  const pageUrl = url ? `https://founderscan.com${url}` : 'https://founderscan.com';
  
  // Generate Open Graph image URL based on results
  const getOGImage = () => {
    if (scanResults) {
      const score = scanResults.summary?.overallScore || 0;
      // You can create dynamic OG images based on score
      return `https://founderscan.com/og/report-${score >= 80 ? 'excellent' : score >= 60 ? 'good' : 'needs-work'}.png`;
    }
    return 'https://founderscan.com/og/default.png';
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
      <meta property="og:image:alt" content={`FounderScan analysis ${scanResults ? `showing ${scanResults.summary?.overallScore}/100 score` : 'for website optimization'}`} />
      <meta property="og:site_name" content="FounderScan" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={pageUrl} />
      <meta property="twitter:title" content={title || meta.title} />
      <meta property="twitter:description" content={description || meta.description} />
      <meta property="twitter:image" content={getOGImage()} />
      <meta property="twitter:image:alt" content={`FounderScan analysis ${scanResults ? `showing ${scanResults.summary?.overallScore}/100 score` : 'for website optimization'}`} />
      <meta property="twitter:creator" content="@founderscan" />
      <meta property="twitter:site" content="@founderscan" />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="author" content="FounderScan" />
      
      {/* Schema.org structured data - Enhanced */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": isReportPage ? "Report" : "SoftwareApplication",
          "name": isReportPage ? `Website Analysis Report` : "FounderScan",
          "applicationCategory": isReportPage ? undefined : "WebApplication",
          "url": pageUrl,
          "description": description || meta.description,
          "offers": isReportPage ? undefined : {
            "@type": "Offer",
            "price": "19.00",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          },
          "creator": {
            "@type": "Organization",
            "name": "FounderScan",
            "url": "https://founderscan.com"
          },
          ...(scanResults && {
            "about": {
              "@type": "WebSite",
              "url": scanResults.url || url,
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://founderscan.com/scan?url={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          })
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
          <meta name="theme-color" content={scanResults.summary?.overallScore >= 80 ? "#22c55e" : scanResults.summary?.overallScore >= 60 ? "#3b82f6" : "#ef4444"} />
          <meta name="msapplication-TileColor" content="#1f2937" />
        </>
      )}
    </Helmet>
  );
}