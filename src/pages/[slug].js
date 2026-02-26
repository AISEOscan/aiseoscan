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
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params }) => {
  try {
    // Only load industry pages (all other files deleted)
    const industryPagesPath = path.join(process.cwd(), 'src', 'data', 'pseo', 'industry-pages.json')
    
    let allPages = []
    
    // Load industry pages
    try {
      const industryPages = JSON.parse(fs.readFileSync(industryPagesPath, 'utf8'))
      allPages = [...industryPages]
    } catch (error) {
      console.warn('Could not load industry pages:', error.message)
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