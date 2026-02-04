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

  // Find highest rated for highlighting
  const highestRated = casinos.reduce((prev, current) =>
    (current.rating || 0) > (prev.rating || 0) ? current : prev
  )

  return (
    <>
      {total !== undefined && (
        <p className="text-sm text-text-secondary mb-4">
          Showing {casinos.length} of {total} casinos
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
                  Rating
                </th>
                <th className="p-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Bonus
                </th>
                <th className="p-4 text-center text-xs font-semibold text-text-muted uppercase tracking-wider w-32">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {casinos.map((casino, index) => (
                <CasinoCard
                  key={casino._id}
                  casino={casino}
                  rank={index + 1}
                  isHighlighted={casino._id === highestRated._id}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
