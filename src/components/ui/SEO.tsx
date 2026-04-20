import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
  keywords: string
  canonical: string
  ogImage?: string
  schema?: object
}

const BASE_URL = 'https://zoven.it'
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`

export default function SEO({ title, description, keywords, canonical, ogImage, schema }: SEOProps) {
  const fullTitle = title.includes('ZOVEN') ? title : `${title} | ZOVEN`
  const url = `${BASE_URL}${canonical}`
  const image = ogImage || DEFAULT_IMAGE

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="it_IT" />
      <meta property="og:site_name" content="ZOVEN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Schema.org */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  )
}
