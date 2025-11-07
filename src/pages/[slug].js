import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '../components/Layout'
import PSEOPageTemplate from '../components/pseo/PSEOPageTemplate'
import IndustryPageTemplate from '../components/pseo/IndustryPageTemplate'
import IndustryPlatformTemplate from '../components/pseo/IndustryPlatformTemplate'
import IndustryLocationTemplate from '../components/pseo/IndustryLocationTemplate'
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

  // Determine which template to use based on content structure
  const isIndustryLocationPage = pageData.type === 'industry-location'
  const isIndustryPlatformPage = pageData.industry_name && pageData.platform_name
  
  const isIndustryPage = pageData.industry_name && (
    pageData.content_type === 'guide' || 
    pageData.content_type === 'mistakes' || 
    pageData.content_type === 'checklist' || 
    pageData.content_type === 'best-practices'
  )

  return (
    <Layout 
      title={pageData.title}
      description={pageData.metaDescription || pageData.meta_description}
    >
      {isIndustryLocationPage ? (
        <IndustryLocationTemplate pageData={pageData} />
      ) : isIndustryPlatformPage ? (
        <IndustryPlatformTemplate pageData={pageData} />
      ) : isIndustryPage ? (
        <IndustryPageTemplate pageData={pageData} />
      ) : (
        <PSEOPageTemplate pageData={pageData} />
      )}
    </Layout>
  )
}

export const getStaticPaths = async () => {
  try {
    const originalPagesPath = path.join(process.cwd(), 'src', 'data', 'pseo', 'all-pages.json')
    const technicalPagesPath = path.join(process.cwd(), 'src', 'data', 'pseo', 'technical-pages.json')
    const usecasePagesPath = path.join(process.cwd(), 'src', 'data', 'pseo', 'usecase-pages.json')
    const industryPagesPath = path.join(process.cwd(), 'src', 'data', 'pseo', 'industry-pages.json')
    const industryPlatformPagesPath = path.join(process.cwd(), 'src', 'data', 'pseo', 'industry-platform-pages.json')
    
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

    // Load use case pages
    try {
      const usecasePages = JSON.parse(fs.readFileSync(usecasePagesPath, 'utf8'))
      allPages = [...allPages, ...usecasePages]
      console.log('✅ Loaded use case pages:', usecasePages.length)
      console.log('📝 Sample usecase slugs:', usecasePages.slice(0, 5).map(p => p.slug))
    } catch (error) {
      console.error('❌ Error loading use case pages:', error.message)
    }

    // Load industry pages
    try {
      const industryPages = JSON.parse(fs.readFileSync(industryPagesPath, 'utf8'))
      allPages = [...allPages, ...industryPages]
      console.log('✅ Loaded industry pages:', industryPages.length)
      console.log('📝 Sample industry slugs:', industryPages.slice(0, 5).map(p => p.slug))
    } catch (error) {
      console.error('❌ Error loading industry pages:', error.message)
    }

    // Load industry-platform pages (PHASE 2A)
    try {
      const industryPlatformPages = JSON.parse(fs.readFileSync(industryPlatformPagesPath, 'utf8'))
      allPages = [...allPages, ...industryPlatformPages]
      console.log('✅ Loaded industry-platform pages:', industryPlatformPages.length)
      console.log('📝 Sample industry-platform slugs:', industryPlatformPages.slice(0, 5).map(p => p.slug))
    } catch (error) {
      console.error('❌ Error loading industry-platform pages:', error.message)
    }

    // Load industry-location pages (PHASE 2B) - Split into 6 chunks
    try {
      let industryLocationPages = []
      for (let i = 1; i <= 6; i++) {
        try {
          const chunkPath = path.join(process.cwd(), 'src', 'data', 'pseo', `industry-location-pages-${i}.json`)
          const chunk = JSON.parse(fs.readFileSync(chunkPath, 'utf8'))
          industryLocationPages = [...industryLocationPages, ...chunk]
          console.log(`✅ Loaded location chunk ${i}:`, chunk.length)
        } catch (chunkError) {
          console.warn(`⚠️ Could not load location chunk ${i}:`, chunkError.message)
        }
      }
      allPages = [...allPages, ...industryLocationPages]
      console.log('✅ Total industry-location pages:', industryLocationPages.length)
      if (industryLocationPages.length > 0) {
        console.log('📝 Sample location slugs:', industryLocationPages.slice(0, 5).map(p => p.slug))
      }
    } catch (error) {
      console.error('❌ Error loading industry-location pages:', error.message)
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
    // Read all page sources
    const originalPagesPath = path.join(process.cwd(), 'src', 'data', 'pseo', 'all-pages.json')
    const technicalPagesPath = path.join(process.cwd(), 'src', 'data', 'pseo', 'technical-pages.json')
    const usecasePagesPath = path.join(process.cwd(), 'src', 'data', 'pseo', 'usecase-pages.json')
    const industryPagesPath = path.join(process.cwd(), 'src', 'data', 'pseo', 'industry-pages.json')
    const industryPlatformPagesPath = path.join(process.cwd(), 'src', 'data', 'pseo', 'industry-platform-pages.json')
    
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

    // Load use case pages
    try {
      const usecasePages = JSON.parse(fs.readFileSync(usecasePagesPath, 'utf8'))
      allPages = [...allPages, ...usecasePages]
    } catch (error) {
      console.warn('Could not load use case pages:', error.message)
    }

    // Load industry pages
    try {
      const industryPages = JSON.parse(fs.readFileSync(industryPagesPath, 'utf8'))
      allPages = [...allPages, ...industryPages]
    } catch (error) {
      console.warn('Could not load industry pages:', error.message)
    }

    // Load industry-platform pages (PHASE 2A)
    try {
      const industryPlatformPages = JSON.parse(fs.readFileSync(industryPlatformPagesPath, 'utf8'))
      allPages = [...allPages, ...industryPlatformPages]
    } catch (error) {
      console.warn('Could not load industry-platform pages:', error.message)
    }

    // Load industry-location pages (PHASE 2B) - Split into 6 chunks
    try {
      let industryLocationPages = []
      for (let i = 1; i <= 6; i++) {
        try {
          const chunkPath = path.join(process.cwd(), 'src', 'data', 'pseo', `industry-location-pages-${i}.json`)
          const chunk = JSON.parse(fs.readFileSync(chunkPath, 'utf8'))
          industryLocationPages = [...industryLocationPages, ...chunk]
        } catch (chunkError) {
          console.warn(`Could not load location chunk ${i}:`, chunkError.message)
        }
      }
      allPages = [...allPages, ...industryLocationPages]
    } catch (error) {
      console.warn('Could not load industry-location pages:', error.message)
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