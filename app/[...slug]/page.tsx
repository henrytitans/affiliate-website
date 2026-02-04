import { notFound } from 'next/navigation'
import { getPageBySlug, getPageSlugs } from '@/lib/sanity/queries/page'
import { BlockRenderer } from '@/components/blocks'
import { Container } from '@/components/layout/Container'
import { JsonLd } from '@/components/JsonLd'
import { generateBreadcrumbSchema, generateWebPageSchema } from '@/lib/seo/schema'

interface PageProps {
  params: Promise<{ slug: string[] }>
}

export async function generateStaticParams() {
  const pages = await getPageSlugs()
  return pages.map((page) => ({
    slug: page.slug.current.split('/'),
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const slugPath = slug.join('/')
  const page = await getPageBySlug(slugPath)

  if (!page) {
    return { title: 'Page Not Found' }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

  return {
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription,
    alternates: {
      canonical: `${siteUrl}/${slugPath}`,
    },
    openGraph: {
      title: page.seo?.metaTitle || page.title,
      description: page.seo?.metaDescription,
      type: 'website',
    },
    robots: page.seo?.noIndex ? { index: false } : undefined,
  }
}

export default async function GenericPage({ params }: PageProps) {
  const { slug } = await params
  const slugPath = slug.join('/')
  const page = await getPageBySlug(slugPath)

  if (!page) {
    notFound()
  }

  const schemas = [
    generateWebPageSchema({
      title: page.seo?.metaTitle || page.title,
      description: page.seo?.metaDescription || '',
      url: `/${slugPath}`,
    }),
    generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: page.title, url: `/${slugPath}` },
    ]),
  ].filter(Boolean)

  const hasBlocks = page.blocks && page.blocks.length > 0
  const firstBlockIsHero = hasBlocks && page.blocks![0]._type === 'heroBlock'

  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 min-h-screen">
      <JsonLd data={schemas} />
      {hasBlocks ? (
        <>
          {firstBlockIsHero ? (
            <>
              <BlockRenderer blocks={[page.blocks![0]]} />
              <Container>
                <div className="py-12">
                  <BlockRenderer blocks={page.blocks!.slice(1)} />
                </div>
              </Container>
            </>
          ) : (
            <Container>
              <div className="py-12">
                <BlockRenderer blocks={page.blocks!} />
              </div>
            </Container>
          )}
        </>
      ) : (
        <Container>
          <div className="py-12">
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">{page.title}</h1>
          </div>
        </Container>
      )}
    </div>
  )
}
