import { memo } from 'react'

export type SeoProps = {
  title: string
  description: string
  canonical: string
  image: string
  schemaMarkup?: Record<string, any>
}

const Seo = memo(
  ({
    title,
    description,
    canonical,
    image,
    schemaMarkup,
  }: Readonly<SeoProps>) => (
    <>
      <title>{`${title ? title + ' - ' : ''}DEJAVU NAIL SPA`}</title>
      <meta name='description' content={description} />
      <link
        rel='canonical'
        href={`${import.meta.env.VITE_PUBLIC_DOMAIN}${canonical}`}
      />

      {/* Open Graph for Facebook, LinkedIn */}
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />

      {/* Twitter Card */}
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />

      {/* Structured Data (Schema Markup) */}
      {schemaMarkup && (
        <script type='application/ld+json'>
          {JSON.stringify(schemaMarkup)}
        </script>
      )}
    </>
  ),
  (prevProps, nextProps) => prevProps.title === nextProps.title
)

export default Seo
