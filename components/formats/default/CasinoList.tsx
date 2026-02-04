import type { Casino } from '@/lib/sanity/types'
import { CasinoCard } from './CasinoCard'

interface CasinoListProps {
  casinos: Casino[]
  total?: number
}

export function CasinoList({ casinos, total }: CasinoListProps) {
  if (casinos.length === 0) {
    return (
      <div className="text-center py-12 bg-card border border-border rounded-xl">
        <p className="text-text-secondary mb-4">
          No casinos found.
        </p>
      </div>
    )
  }

  return (
    <>
      {total !== undefined && (
        <p className="text-sm text-text-secondary mb-4">
          Showing {casinos.length} of {total} casinos
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {casinos.map((casino) => (
          <CasinoCard key={casino._id} casino={casino} />
        ))}
      </div>
    </>
  )
}
