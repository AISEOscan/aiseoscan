export default function Sitemap() {}

export async function getServerSideProps({ res }) {
  // Load ALL three page sources
  const allPages = await import('../data/pseo/all-pages.json')
  const technicalPages = await import('../data/pseo/technical-pages.json')
  const usecasePages = await import('../data/pseo/usecase-pages.json')
  
  // Combine all pages
  const combinedPages = [...allPages.default, ...technicalPages.default, ...usecasePages.default]
  
  // Get current date for lastmod
  const currentDate = new Date().toISOString()
  
  // Define ALL 13 new AI SEO pages we created (manual high-priority pages)
  const newAISEOPages = [
    // Core educational pages
    { slug: 'ai-seo', priority: '0.9', changefreq: 'weekly' },
    { slug: 'what-is-ai-seo', priority: '0.8', changefreq: 'weekly' },
    { slug: 'how-to-use-ai-for-seo', priority: '0.9', changefreq: 'weekly' },
    
    // Question-based pages
    { slug: 'can-ai-do-seo', priority: '0.8', changefreq: 'weekly' },
    { slug: 'will-ai-replace-seo', priority: '0.8', changefreq: 'weekly' },
    { slug: 'is-ai-content-good-for-seo', priority: '0.8', changefreq: 'weekly' },
    
    // High-CPC commercial pages
    { slug: 'ai-seo-content-writer', priority: '0.9', changefreq: 'weekly' }, // $20.42 CPC
    { slug: 'ai-seo-blog-writer', priority: '0.9', changefreq: 'weekly' }, // $20.42 CPC
    { slug: 'ai-seo-marketing', priority: '0.9', changefreq: 'weekly' }, // $21.83 CPC
    { slug: 'ai-seo-generator', priority: '0.9', changefreq: 'weekly' }, // $28.53 CPC (highest CPC!)
    
    // High-volume pages
    { slug: 'ai-seo-agency', priority: '1.0', changefreq: 'daily' }, // 480 volume (highest!)
    
    // Comparison/tools page
    { slug: 'best-ai-seo-tools-2025', priority: '0.9', changefreq: 'weekly' }
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