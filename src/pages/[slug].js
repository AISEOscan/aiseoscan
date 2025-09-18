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
    // Read the generated pages data
    const dataPath = path.join(process.cwd(), 'src', 'data', 'pseo', 'all-pages.json')
    const pagesData = JSON.parse(fs.readFileSync(dataPath, 'utf8'))

    // Generate paths for all PSEO pages
    const paths = pagesData.map(page => ({
      params: { slug: page.slug }
    }))

    return {
      paths,
      fallback: false // Return 404 for non-existent pages
    }
  } catch (error) {
    console.error('Error loading PSEO pages:', error)
    return {
      paths: [],
      fallback: false
    }
  }
}

export const getStaticProps = async ({ params }) => {
  try {
    // Read the generated pages data
    const dataPath = path.join(process.cwd(), 'src', 'data', 'pseo', 'all-pages.json')
    const pagesData = JSON.parse(fs.readFileSync(dataPath, 'utf8'))

    // Find the specific page data
    const pageData = pagesData.find(page => page.slug === params.slug)

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