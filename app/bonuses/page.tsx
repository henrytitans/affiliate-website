import Link from 'next/link'
import { getBonuses } from '@/lib/sanity/queries/bonus'
import { Container } from '@/components/layout/Container'
import { IndexFilters } from '@/components/IndexFilters'
import { getFormat } from '@/components/formats'
import { getFormatKey } from '@/lib/config'

export const revalidate = 3600

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

export const metadata = {
  title: 'Casino Bonuses',
  description: 'Find the best casino bonuses, free spins, and no deposit offers.',
  alternates: {
    canonical: `${siteUrl}/bonuses`,
  },
  openGraph: {
    title: 'Casino Bonuses | Casino Guide',
    description: 'Find the best casino bonuses, free spins, and no deposit offers.',
    url: `${siteUrl}/bonuses`,
    type: 'website' as const,
  },
}

interface PageProps {
  searchParams: Promise<{
    format?: string
  }>
}

export default async function BonusesPage({ searchParams }: PageProps) {
  const params = await searchParams
  const formatKey = getFormatKey(params)
  const { BonusList } = getFormat(formatKey)

  const bonuses = await getBonuses()

  return (
    <div className="bg-background py-12">
      <Container>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Casino Bonuses
          </h1>
          <p className="text-text-secondary">
            Find the best welcome bonuses, free spins, and exclusive offers.
          </p>
        </div>

        <IndexFilters basePath="/bonuses" showFeaturedFilter={false} showFormatSwitch />

        {bonuses.length === 0 ? (
          <div className="text-center py-12 bg-card border border-border rounded-xl">
            <p className="text-text-secondary mb-4">
              No bonuses found. Add some in Sanity Studio.
            </p>
            <Link href="/studio" className="text-primary hover:underline">
              Open Sanity Studio →
            </Link>
          </div>
        ) : (
          <BonusList bonuses={bonuses} total={bonuses.length} />
        )}
      </Container>
    </div>
  )
}
