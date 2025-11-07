export default function Sitemap() {}

export async function getServerSideProps({ res }) {
  // Load ALL page sources
  const allPages = await import('../data/pseo/all-pages.json')
  const technicalPages = await import('../data/pseo/technical-pages.json')
  const usecasePages = await import('../data/pseo/usecase-pages.json')
  const industryPages = await import('../data/pseo/industry-pages.json') 
  const industryPlatformPages = await import('../data/pseo/industry-platform-pages.json')
  
  // Load location pages from 6 chunks
  let industryLocationPages = []
  for (let i = 1; i <= 6; i++) {
    try {
      const chunk = await import(`../data/pseo/industry-location-pages-${i}.json`)
      industryLocationPages = [...industryLocationPages, ...chunk.default]
    } catch (error) {
      console.warn(`Could not load location chunk ${i}:`, error.message)
    }
  }
  
  // Combine all pages
  const combinedPages = [
    ...allPages.default, 
    ...technicalPages.default, 
    ...usecasePages.default,
    ...industryPages.default,
    ...industryPlatformPages.default,
    ...industryLocationPages
  ]
  
  // Get current date for lastmod
  const currentDate = new Date().toISOString()
  
  // Define all manual high-priority pages
  const newAISEOPages = [
    // Core educational pages
    { slug: 'ai-seo', priority: '0.9', changefreq: 'weekly' },
    { slug: 'what-is-ai-seo', priority: '0.8', changefreq: 'weekly' },
    { slug: 'how-to-use-ai-for-seo', priority: '0.9', changefreq: 'weekly' },
    { slug: 'ai-seo-platforms', priority: '0.9', changefreq: 'weekly' },
    
    // Question-based pages
    { slug: 'can-ai-do-seo', priority: '0.8', changefreq: 'weekly' },
    { slug: 'will-ai-replace-seo', priority: '0.8', changefreq: 'weekly' },
    { slug: 'is-ai-content-good-for-seo', priority: '0.8', changefreq: 'weekly' },
    
    // High-CPC commercial pages
    { slug: 'ai-seo-content-writer', priority: '0.9', changefreq: 'weekly' },
    { slug: 'ai-seo-blog-writer', priority: '0.9', changefreq: 'weekly' },
    { slug: 'ai-seo-marketing', priority: '0.9', changefreq: 'weekly' },
    { slug: 'ai-seo-generator', priority: '0.9', changefreq: 'weekly' },
    
    // High-volume pages
    { slug: 'ai-seo-agency', priority: '1.0', changefreq: 'daily' },
    
    // Comparison/tools page
    { slug: 'best-ai-seo-tools-2025', priority: '0.9', changefreq: 'weekly' },
    
    // Industry hub page
    { slug: 'ai-seo-by-industry', priority: '0.9', changefreq: 'weekly' },
    
    // Guides hub
    { slug: 'ai-seo-guides', priority: '0.9', changefreq: 'weekly' }
  ]
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://aiseoscan.dev</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${newAISEOPages.map(page => `
      <url>
        <loc>https://aiseoscan.dev/${page.slug}</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
      </url>`).join('')}
      ${combinedPages.map(page => `
      <url>
        <loc>https://aiseoscan.dev/${page.slug}</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>`).join('')}
    </urlset>`
  
  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()
  
  return { props: {} }
}