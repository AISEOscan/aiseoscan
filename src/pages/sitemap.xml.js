export default function Sitemap() {}

export async function getServerSideProps({ res }) {
  const fs = require('fs')
  const path = require('path')
  
  // Use environment variable for base URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.aiseoscan.dev'
  
  // Get current date
  const currentDate = new Date().toISOString()
  
  // Manual high-priority pages
  const manualPages = [
    { slug: 'ai-seo', priority: '0.9', changefreq: 'weekly' },
    { slug: 'what-is-ai-seo', priority: '0.8', changefreq: 'weekly' },
    { slug: 'how-to-use-ai-for-seo', priority: '0.9', changefreq: 'weekly' },
    { slug: 'ai-seo-platforms', priority: '0.9', changefreq: 'weekly' },
    { slug: 'can-ai-do-seo', priority: '0.8', changefreq: 'weekly' },
    { slug: 'will-ai-replace-seo', priority: '0.8', changefreq: 'weekly' },
    { slug: 'is-ai-content-good-for-seo', priority: '0.8', changefreq: 'weekly' },
    { slug: 'ai-seo-content-writer', priority: '0.9', changefreq: 'weekly' },
    { slug: 'ai-seo-blog-writer', priority: '0.9', changefreq: 'weekly' },
    { slug: 'ai-seo-marketing', priority: '0.9', changefreq: 'weekly' },
    { slug: 'ai-seo-generator', priority: '0.9', changefreq: 'weekly' },
    { slug: 'ai-seo-agency', priority: '1.0', changefreq: 'daily' },
    { slug: 'best-ai-seo-tools-2026', priority: '0.9', changefreq: 'weekly' },
    { slug: 'ai-seo-by-industry', priority: '0.9', changefreq: 'weekly' },
    { slug: 'ai-seo-guides', priority: '0.9', changefreq: 'weekly' }
  ]
  
  // Function to get slugs from a JSON file without loading full content
  function getSlugs(filePath) {
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
      return data.map(page => page.slug)
    } catch (error) {
      console.warn(`Could not load ${filePath}:`, error.message)
      return []
    }
  }
  
  // Load slugs only - SKIP DELETED FILES
  const industrySlugs = getSlugs(path.join(process.cwd(), 'src/data/pseo/industry-pages.json'))
  
  // Combine all slugs (removed deleted files)
  const allSlugs = [...industrySlugs]
  
  // Generate sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${manualPages.map(page => `
      <url>
        <loc>${baseUrl}/${page.slug}</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
      </url>`).join('')}
      ${allSlugs.map(slug => `
      <url>
        <loc>${baseUrl}/${slug}</loc>
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
