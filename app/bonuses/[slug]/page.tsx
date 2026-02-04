import { notFound } from 'next/navigation'
import { getBonusBySlug, getBonusSlugs } from '@/lib/sanity/queries/bonus'
import { BonusDetail } from '@/components/BonusDetail'
import { Container } from '@/components/layout/Container'
import { JsonLd } from '@/components/JsonLd'
import { generateBonusSchema, generateBreadcrumbSchema } from '@/lib/seo/schema'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const bonuses = await getBonusSlugs()
  return bonuses.map((bonus) => ({
    slug: bonus.slug.current,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const bonus = await getBonusBySlug(slug)

  if (!bonus) {
    return { title: 'Bonus Not Found' }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

  return {
    title: `${bonus.title} - ${bonus.casino?.name || 'Casino Bonus'}`,
    description: bonus.description || `Claim ${bonus.title} at ${bonus.casino?.name}`,
    alternates: {
      canonical: `${siteUrl}/bonuses/${slug}`,
    },
    openGraph: {
      title: `${bonus.title} - ${bonus.casino?.name}`,
      description: bonus.description || `Claim ${bonus.title}`,
      type: 'website',
    },
  }
}

export default async function BonusPage({ params }: PageProps) {
  const { slug } = await params
  const bonus = await getBonusBySlug(slug)

  if (!bonus) {
    notFound()
  }

  const schemas = [
    generateBonusSchema(bonus),
    generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Bonuses', url: '/bonuses' },
      { name: bonus.title, url: `/bonuses/${slug}` },
    ]),
  ]

  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 py-12">
      <JsonLd data={schemas} />
      <Container>
        <BonusDetail bonus={bonus} />
      </Container>
    </div>
  )
}
