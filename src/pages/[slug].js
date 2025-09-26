import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '../components/Layout'
import PSEOPageTemplate from '../components/pseo/PSEOPageTemplate'
import fs from 'fs'
import path from 'path'

export default function PSEOPage({ pageData }) {
  if (!pageData) {
    return (
      <Layout title="Page Not Found">
        <div className="text-center py-16">
          <h1 className="text-4xl font-bold text-white mb-4">Page Not Found</h1>
          <p className="text-gray-300">The requested page could not be found.</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout 
      title={pageData.title}
      description={pageData.meta_description}
    >
      <PSEOPageTemplate pageData={pageData} />
    </Layout>
  )
}

export const getStaticPaths = async () => {
  try {
    const originalPagesPath = path.join(process.cwd(), 'src', 'data', 'pseo', 'all-pages.json')
    const technicalPagesPath = path.join(process.cwd(), 'src', 'data', 'pseo', 'technical-pages.json')
    
    let allPages = []
    
    // Load original pages
    try {
      const originalPages = JSON.parse(fs.readFileSync(originalPagesPath, 'utf8'))
      allPages = [...originalPages]
      console.log('✅ Loaded original pages:', originalPages.length)
    } catch (error) {
      console.error('❌ Error loading original pages:', error.message)
    }
    
    // Load technical pages
    try {
      const technicalPages = JSON.parse(fs.readFileSync(technicalPagesPath, 'utf8'))
      allPages = [...allPages, ...technicalPages]
      console.log('✅ Loaded technical pages:', technicalPages.length)
      console.log('📝 Sample technical slugs:', technicalPages.slice(0, 5).map(p => p.slug))
    } catch (error) {
      console.error('❌ Error loading technical pages:', error.message)
    }

    console.log('🔢 Total pages for build:', allPages.length)

    const paths = allPages.map(page => ({
      params: { slug: page.slug }
    }))

    return {
      paths,
      fallback: false
    }
  } catch (error) {
    console.error('❌ Critical error in getStaticPaths:', error)
    return {
      paths: [],
      fallback: false
    }
  }
}

export const getStaticProps = async ({ params }) => {
  try {
    // Read both original pages and new technical pages
    const originalPagesPath = path.join(process.cwd(), 'src', 'data', 'pseo', 'all-pages.json')
    const technicalPagesPath = path.join(process.cwd(), 'src', 'data', 'pseo', 'technical-pages.json')
    
    let allPages = []
    
    // Load original pages
    try {
      const originalPages = JSON.parse(fs.readFileSync(originalPagesPath, 'utf8'))
      allPages = [...originalPages]
    } catch (error) {
      console.warn('Could not load original pages:', error.message)
    }
    
    // Load technical pages  
    try {
      const technicalPages = JSON.parse(fs.readFileSync(technicalPagesPath, 'utf8'))
      allPages = [...allPages, ...technicalPages]
    } catch (error) {
      console.warn('Could not load technical pages:', error.message)
    }

    // Find the specific page data
    const pageData = allPages.find(page => page.slug === params.slug)

    if (!pageData) {
      return {
        notFound: true
      }
    }

    return {
      props: {
        pageData
      }
    }
  } catch (error) {
    console.error('Error loading page data:', error)
    return {
      notFound: true
    }
  }
}