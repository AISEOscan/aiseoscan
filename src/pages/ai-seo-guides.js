import Layout from '../components/Layout'
import Link from 'next/link'
import industryPages from '../data/pseo/industry-pages.json'

export default function AISEOGuides() {
  return (
    <Layout title="AI SEO Guides - Complete Resource Library">
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8 text-white">AI SEO Optimization Guides</h1>
        
        <p className="text-gray-300 mb-8">
          Comprehensive guides to optimize your website for AI-powered search engines like ChatGPT, Perplexity, and Google AI Overviews.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industryPages.slice(0, 50).map(page => (
            <Link 
              key={page.slug} 
              href={`/${page.slug}`}
              className="block p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                {page.title}
              </h3>
              <p className="text-gray-300 text-sm">
                {page.meta_description || page.metaDescription}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}