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

  // Find best bonus (no-deposit or featured) for highlighting
  const bestBonus = bonuses.find((b) => b.type === 'no-deposit') || bonuses.find((b) => b.featured) || bonuses[0]

  return (
    <>
      {total !== undefined && (
        <p className="text-sm text-text-secondary mb-4">
          Showing {bonuses.length} of {total} bonuses
        </p>
      )}
      <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-elevated border-b border-border">
                <th className="p-4 text-center text-xs font-semibold text-text-muted uppercase tracking-wider w-16">
                  #
                </th>
                <th className="p-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Casino
                </th>
                <th className="p-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Bonus
                </th>
                <th className="p-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Type
                </th>
                <th className="p-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Wagering
                </th>
                <th className="p-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Min Dep.
                </th>
                <th className="p-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Code
                </th>
                <th className="p-4 text-center text-xs font-semibold text-text-muted uppercase tracking-wider w-24">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {bonuses.map((bonus, index) => (
                <BonusCard
                  key={bonus._id}
                  bonus={bonus}
                  rank={index + 1}
                  isHighlighted={bonus._id === bestBonus._id}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
