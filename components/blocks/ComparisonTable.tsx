import Image from 'next/image'
import Link from 'next/link'
import { clsx } from 'clsx'
import type { ComparisonTableBlock } from '@/lib/sanity/types'
import { urlFor } from '@/lib/sanity/image'
import { Rating } from '@/components/ui/Rating'

interface ComparisonTableProps {
  block: ComparisonTableBlock
}

export function ComparisonTable({ block }: ComparisonTableProps) {
  const { title, casinos, columns = ['rating', 'bonus'], highlightWinner = true } = block

  if (!casinos || casinos.length === 0) {
    return null
  }

  // Find the highest rated casino for highlighting
  const highestRated = highlightWinner
    ? casinos.reduce((prev, current) =>
        (current.rating || 0) > (prev.rating || 0) ? current : prev
      )
    : null

  const columnLabels: Record<string, string> = {
    rating: 'Rating',
    bonus: 'Welcome Bonus',
    minDeposit: 'Min Deposit',
    payoutSpeed: 'Payout Speed',
    license: 'License',
  }

  return (
    <div>
      {title && (
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">{title}</h2>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-800">
              <th className="text-left p-4 font-semibold text-zinc-900 dark:text-zinc-50">
                Casino
              </th>
              {columns?.map((col) => (
                <th
                  key={col}
                  className="text-left p-4 font-semibold text-zinc-900 dark:text-zinc-50"
                >
                  {columnLabels[col]}
                </th>
              ))}
              <th className="text-center p-4 font-semibold text-zinc-900 dark:text-zinc-50">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {casinos.map((casino) => {
              const isWinner = highlightWinner && casino._id === highestRated?._id
              return (
                <tr
                  key={casino._id}
                  className={clsx(
                    'border-b border-zinc-200 dark:border-zinc-700',
                    isWinner && 'bg-accent/10'
                  )}
                >
                  <td className="p-4">
                    <Link
                      href={`/casinos/${casino.slug.current}`}
                      className="flex items-center gap-3"
                    >
                      {casino.logo ? (
                        <Image
                          src={urlFor(casino.logo).width(48).height(48).url()}
                          alt={`${casino.name} logo`}
                          width={48}
                          height={48}
                          className="rounded"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-zinc-200 dark:bg-zinc-700 rounded flex items-center justify-center">
                          <span className="font-bold text-zinc-400">{casino.name.charAt(0)}</span>
                        </div>
                      )}
                      <div>
                        <span className="font-medium text-zinc-900 dark:text-zinc-50">
                          {casino.name}
                        </span>
                        {isWinner && (
                          <span className="ml-2 text-xs bg-accent text-zinc-900 px-2 py-0.5 rounded">
                            Best Pick
                          </span>
                        )}
                      </div>
                    </Link>
                  </td>
                  {columns?.map((col) => (
                    <td key={col} className="p-4 text-zinc-600 dark:text-zinc-400">
                      {col === 'rating' && casino.rating !== undefined && (
                        <Rating value={casino.rating} size="sm" />
                      )}
                      {col === 'bonus' && <span>See website</span>}
                      {col === 'minDeposit' && <span>$20</span>}
                      {col === 'payoutSpeed' && <span>24-48h</span>}
                      {col === 'license' && <span>MGA</span>}
                    </td>
                  ))}
                  <td className="p-4 text-center">
                    <a
                      href={`/go/${casino.slug.current}`}
                      className="inline-block px-4 py-2 bg-accent hover:bg-accent-dark text-zinc-900 font-semibold rounded transition-colors text-sm"
                    >
                      Visit
                    </a>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
