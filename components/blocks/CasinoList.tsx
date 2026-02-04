import Link from 'next/link'
import { clsx } from 'clsx'
import type { CasinoListBlock, Casino } from '@/lib/sanity/types'
import { getCasinosForBlock } from '@/lib/sanity/queries/page'
import { CasinoCard } from '@/components/CasinoCard'

interface CasinoListProps {
  block: CasinoListBlock
}

export async function CasinoList({ block }: CasinoListProps) {
  const {
    title,
    subtitle,
    displayMode,
    manualCasinos,
    filter = 'all',
    limit = 6,
    columns = 3,
    showViewAllLink = true,
  } = block

  // Get casinos either from manual selection or automatic filter
  let casinos: Casino[] = []
  if (displayMode === 'manual' && manualCasinos && manualCasinos.length > 0) {
    casinos = manualCasinos
  } else {
    casinos = await getCasinosForBlock(filter, limit)
  }

  const columnClasses = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }

  if (casinos.length === 0) {
    return null
  }

  return (
    <div>
      {(title || subtitle) && (
        <div className="mb-8">
          {title && (
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">{title}</h2>
          )}
          {subtitle && <p className="text-zinc-600 dark:text-zinc-400">{subtitle}</p>}
        </div>
      )}
      <div className={clsx('grid grid-cols-1 gap-6', columnClasses[columns])}>
        {casinos.map((casino) => (
          <CasinoCard key={casino._id} casino={casino} />
        ))}
      </div>
      {showViewAllLink && (
        <div className="text-center mt-8">
          <Link href="/casinos" className="text-primary hover:text-primary-dark font-medium">
            View All Casinos →
          </Link>
        </div>
      )}
    </div>
  )
}
