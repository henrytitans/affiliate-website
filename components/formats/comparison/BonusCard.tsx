import Image from 'next/image'
import Link from 'next/link'
import type { Bonus } from '@/lib/sanity/types'
import { bonusTypeLabels } from '@/lib/sanity/types'
import { urlFor } from '@/lib/sanity/image'
import { Badge } from '@/components/ui/Badge'
import { clsx } from 'clsx'

interface BonusCardProps {
  bonus: Bonus
  rank?: number
  isHighlighted?: boolean
}

export function BonusCard({ bonus, rank, isHighlighted }: BonusCardProps) {
  return (
    <tr
      className={clsx(
        'border-b border-border hover:bg-elevated/50 transition-colors',
        isHighlighted && 'bg-primary/10'
      )}
    >
      {/* Rank */}
      {rank !== undefined && (
        <td className="p-4 text-center">
          <span className={clsx(
            'inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm',
            rank === 1 ? 'bg-gradient-gold text-background' : 'bg-elevated text-foreground'
          )}>
            {rank}
          </span>
        </td>
      )}

      {/* Casino Logo */}
      <td className="p-4">
        <Link
          href={`/bonuses/${bonus.slug.current}`}
          className="flex items-center gap-3 group"
        >
          {bonus.casino?.logo ? (
            <div className="relative w-10 h-10 rounded-lg bg-elevated p-1 flex-shrink-0 group-hover:shadow-glow-primary transition-shadow">
              <Image
                src={urlFor(bonus.casino.logo).width(40).height(40).url()}
                alt={`${bonus.casino.name} logo`}
                width={40}
                height={40}
                className="w-full h-full object-contain rounded"
              />
            </div>
          ) : (
            <div className="w-10 h-10 bg-elevated rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="font-bold text-primary text-sm">
                {bonus.casino?.name?.charAt(0) || '?'}
              </span>
            </div>
          )}
          <span className="text-sm text-text-secondary group-hover:text-foreground transition-colors">
            {bonus.casino?.name}
          </span>
        </Link>
      </td>

      {/* Bonus Title */}
      <td className="p-4">
        <Link href={`/bonuses/${bonus.slug.current}`} className="group">
          <span className="font-medium text-foreground group-hover:text-primary transition-colors">
            {bonus.title}
          </span>
        </Link>
        {bonus.featured && (
          <Badge variant="premium" className="ml-2">Hot</Badge>
        )}
      </td>

      {/* Type */}
      <td className="p-4">
        <Badge variant={bonus.type === 'no-deposit' ? 'success' : bonus.type === 'welcome' ? 'premium' : 'default'}>
          {bonusTypeLabels[bonus.type]}
        </Badge>
      </td>

      {/* Wagering */}
      <td className="p-4 text-text-secondary">
        {bonus.wageringRequirement ? `${bonus.wageringRequirement}x` : '-'}
      </td>

      {/* Min Deposit */}
      <td className="p-4 text-text-secondary">
        {bonus.minDeposit ? `$${bonus.minDeposit}` : '-'}
      </td>

      {/* Code */}
      <td className="p-4">
        {bonus.code ? (
          <code className="px-2 py-1 bg-primary/10 border border-primary/20 rounded text-sm font-mono text-primary">
            {bonus.code}
          </code>
        ) : (
          <span className="text-text-muted">-</span>
        )}
      </td>

      {/* Action */}
      <td className="p-4 text-center">
        <a
          href={`/go/${bonus.casino?.slug?.current || ''}`}
          className="inline-block px-4 py-2 bg-gradient-gold text-background font-semibold rounded-lg transition-all text-sm hover:shadow-glow-accent hover:scale-105"
        >
          Claim
        </a>
      </td>
    </tr>
  )
}
