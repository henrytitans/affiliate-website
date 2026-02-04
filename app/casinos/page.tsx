import { Suspense } from 'react'
import Link from 'next/link'
import { getCasinos, type CasinoFilters } from '@/lib/sanity/queries/casino'
import { Container } from '@/components/layout/Container'
import { IndexFilters } from '@/components/IndexFilters'
import { Pagination } from '@/components/Pagination'
import { getFormat } from '@/components/formats'
import { getFormatKey } from '@/lib/config'

export const revalidate = 3600

export const metadata = {
  title: 'Online Casinos',
  description: 'Discover the best online casinos with our expert reviews and ratings.',
}

interface PageProps {
  searchParams: Promise<{
    sort?: string
    featured?: string
    page?: string
    format?: string
  }>
}

async function CasinosList({ searchParams }: { searchParams: PageProps['searchParams'] }) {
  const params = await searchParams
  const formatKey = getFormatKey(params)
  const { CasinoList } = getFormat(formatKey)

  const filters: CasinoFilters = {
    sort: (params.sort as CasinoFilters['sort']) || 'rating',
    featured: params.featured === 'true',
    page: params.page ? parseInt(params.page) : 1,
  }

  const { casinos, total, page, totalPages } = await getCasinos(filters)

  return (
    <>
      <IndexFilters basePath="/casinos" showFormatSwitch />

      {casinos.length === 0 ? (
        <div className="text-center py-12 bg-card border border-border rounded-xl">
          <p className="text-text-secondary mb-4">
            No casinos found. {filters.featured ? 'Try removing the featured filter.' : 'Add some in Sanity Studio.'}
          </p>
          {!filters.featured && (
            <Link href="/studio" className="text-primary hover:underline">
              Open Sanity Studio →
            </Link>
          )}
        </div>
      ) : (
        <>
          <CasinoList casinos={casinos} total={total} />
          <Pagination basePath="/casinos" currentPage={page} totalPages={totalPages} />
        </>
      )}
    </>
  )
}

export default async function CasinosPage({ searchParams }: PageProps) {
  return (
    <div className="bg-background py-12">
      <Container>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Online Casinos
          </h1>
          <p className="text-text-secondary">
            Discover the best online casinos with our expert reviews and ratings.
          </p>
        </div>

        <Suspense fallback={<div className="text-center py-12 text-text-secondary">Loading...</div>}>
          <CasinosList searchParams={searchParams} />
        </Suspense>
      </Container>
    </div>
  )
}
