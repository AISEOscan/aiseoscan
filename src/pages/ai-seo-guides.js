import Layout from '../components/Layout'
import Link from 'next/link'
import allPages from '../data/pseo/all-pages.json'
import technicalPages from '../data/pseo/technical-pages.json'

export default function AISEOGuides() {
  const combinedPages = [...allPages, ...technicalPages]
  
  return (
    <Layout title="AI SEO Guides - Complete Resource Library">
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">AI SEO Optimization Guides</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {combinedPages.map(page => (
            <Link 
              key={page.slug} 
              href={`/${page.slug}`}
              className="block p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                {page.title}
              </h3>
              <p className="text-gray-300 text-sm">
                {page.meta_description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}