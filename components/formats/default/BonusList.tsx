import type { Bonus } from '@/lib/sanity/types'
import { BonusCard } from './BonusCard'

interface BonusListProps {
  bonuses: Bonus[]
  total?: number
}

export function BonusList({ bonuses, total }: BonusListProps) {
  if (bonuses.length === 0) {
    return (
      <div className="text-center py-12 bg-card border border-border rounded-xl">
        <p className="text-text-secondary mb-4">
          No bonuses found.
        </p>
      </div>
    )
  }

  return (
    <>
      {total !== undefined && (
        <p className="text-sm text-text-secondary mb-4">
          Showing {bonuses.length} of {total} bonuses
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bonuses.map((bonus) => (
          <BonusCard key={bonus._id} bonus={bonus} />
        ))}
      </div>
    </>
  )
}
