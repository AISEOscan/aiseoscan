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
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://aiseoscan.dev</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
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