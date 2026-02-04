import { notFound } from 'next/navigation'
import { getCasinoBySlug, getCasinoSlugs } from '@/lib/sanity/queries/casino'
import { getBonusesByCasino } from '@/lib/sanity/queries/bonus'
import { CasinoDetail } from '@/components/CasinoDetail'
import { BonusCard } from '@/components/BonusCard'
import { Container } from '@/components/layout/Container'
import { JsonLd } from '@/components/JsonLd'
import { generateCasinoSchema, generateReviewSchema, generateBreadcrumbSchema } from '@/lib/seo/schema'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const casinos = await getCasinoSlugs()
  return casinos.map((casino) => ({
    slug: casino.slug.current,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const casino = await getCasinoBySlug(slug)

  if (!casino) {
    return { title: 'Casino Not Found' }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

  return {
    title: casino.name,
    description: casino.description || `Discover ${casino.name} - reviews, bonuses, and more.`,
    alternates: {
      canonical: `${siteUrl}/casinos/${slug}`,
    },
    openGraph: {
      title: casino.name,
      description: casino.description || `Discover ${casino.name}`,
      type: 'website',
    },
  }
}

export default async function CasinoPage({ params }: PageProps) {
  const { slug } = await params
  const casino = await getCasinoBySlug(slug)

  if (!casino) {
    notFound()
  }

  const bonuses = await getBonusesByCasino(casino._id)

  const schemas = [
    generateCasinoSchema(casino),
    generateReviewSchema(casino),
    generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Casinos', url: '/casinos' },
      { name: casino.name, url: `/casinos/${slug}` },
    ]),
  ].filter(Boolean)

  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 py-12">
      <JsonLd data={schemas} />
      <Container>
        <CasinoDetail casino={casino} />

        {bonuses.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
              Bonuses at {casino.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bonuses.map((bonus) => (
                <BonusCard key={bonus._id} bonus={bonus} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}
