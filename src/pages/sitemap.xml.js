export default function Sitemap() {}

export async function getServerSideProps({ res }) {
  const allPages = await import('../data/pseo/all-pages.json')
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://aiseoscan.dev</loc>
        <priority>1.0</priority>
      </url>
      ${allPages.default.map(page => `
      <url>
        <loc>https://aiseoscan.dev/${page.slug}</loc>
        <priority>0.8</priority>
      </url>`).join('')}
    </urlset>`

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return { props: {} }
}