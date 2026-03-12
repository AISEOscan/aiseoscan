export default function Sitemap() {}

export async function getServerSideProps({ res }) {
  const fs = require('fs')
  const path = require('path')
  
  // 1. CLEAN BASE URL: Remove any trailing slash from the env variable
  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.aiseoscan.dev').replace(/\/$/, '')
  
  const currentDate = new Date().toISOString()
  
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
    { slug: 'ai-seo-guides', priority: '0.9', changefreq: 'weekly' },
    // Platform-specific AI SEO pages (6 pages)
    { slug: 'ai-seo-chatgpt', priority: '0.9', changefreq: 'weekly' },
    { slug: 'ai-seo-perplexity', priority: '0.9', changefreq: 'weekly' },
    { slug: 'ai-seo-gemini', priority: '0.9', changefreq: 'weekly' },
    { slug: 'ai-seo-copilot', priority: '0.9', changefreq: 'weekly' },
    { slug: 'ai-seo-claude', priority: '0.9', changefreq: 'weekly' },
    { slug: 'ai-seo-searchgpt', priority: '0.9', changefreq: 'weekly' },
    // AI SEO Tools hub and tool pages (10 pages)
    { slug: 'ai-seo-tools', priority: '0.9', changefreq: 'weekly' },
    { slug: 'copilot-seo-tool', priority: '0.8', changefreq: 'weekly' },
    { slug: 'perplexity-seo-checking-tools', priority: '0.8', changefreq: 'weekly' },
    { slug: 'perplexity-seo-tracking-tools', priority: '0.8', changefreq: 'weekly' },
    { slug: 'perplexity-seo-checking-software', priority: '0.8', changefreq: 'weekly' },
    { slug: 'copilot-seo-analysis-tool', priority: '0.8', changefreq: 'weekly' },
    { slug: 'best-perplexity-seo-tracking-tools', priority: '0.8', changefreq: 'weekly' },
    { slug: 'copilot-seo-checking-tool', priority: '0.8', changefreq: 'weekly' },
    { slug: 'copilot-seo-analysis-software', priority: '0.8', changefreq: 'weekly' },
    { slug: 'copilot-seo-checker', priority: '0.8', changefreq: 'weekly' }
  ]
  
  function getSlugs(filePath) {
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
      return data.map(page => page.slug)
    } catch (error) {
      console.warn(`Could not load ${filePath}:`, error.message)
      return []
    }
  }
  
  // Load all three page types
  const industrySlugs = getSlugs(path.join(process.cwd(), 'src/data/pseo/industry-pages.json'))
  const technicalSlugs = getSlugs(path.join(process.cwd(), 'src/data/pseo/technical-pages.json'))
  const usecaseSlugs = getSlugs(path.join(process.cwd(), 'src/data/pseo/usecase-pages.json'))
  
  // Combine all slugs
  const allSlugs = [...industrySlugs, ...technicalSlugs, ...usecaseSlugs]
  
  // 2. GENERATE SITEMAP: Ensure no trailing slashes on individual URLs
  // The .replace(/^\//, '') ensures we don't get double slashes if a slug starts with /
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}/</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${manualPages.map(page => `
      <url>
        <loc>${baseUrl}/${page.slug.replace(/^\//, '')}</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
      </url>`).join('')}
      ${allSlugs.map(slug => `
      <url>
        <loc>${baseUrl}/${slug.replace(/^\//, '')}</loc>
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