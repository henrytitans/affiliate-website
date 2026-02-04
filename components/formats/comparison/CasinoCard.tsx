import Image from 'next/image'
import Link from 'next/link'
import type { Casino } from '@/lib/sanity/types'
import { urlFor } from '@/lib/sanity/image'
import { Rating } from '@/components/ui/Rating'
import { Badge } from '@/components/ui/Badge'
import { clsx } from 'clsx'

interface CasinoCardProps {
  casino: Casino
  rank?: number
  isHighlighted?: boolean
}

export function CasinoCard({ casino, rank, isHighlighted }: CasinoCardProps) {
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

      {/* Casino Info */}
      <td className="p-4">
        <Link
          href={`/casinos/${casino.slug.current}`}
          className="flex items-center gap-3 group"
        >
          {casino.logo ? (
            <div className="relative w-12 h-12 rounded-lg bg-elevated p-1 flex-shrink-0 group-hover:shadow-glow-primary transition-shadow">
              <Image
                src={urlFor(casino.logo).width(48).height(48).url()}
                alt={`${casino.name} logo`}
                width={48}
                height={48}
                className="w-full h-full object-contain rounded"
              />
            </div>
          ) : (
            <div className="w-12 h-12 bg-elevated rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="font-bold text-primary">{casino.name.charAt(0)}</span>
            </div>
          )}
          <div>
            <span className="font-medium text-foreground group-hover:text-primary transition-colors">
              {casino.name}
            </span>
            {casino.featured && (
              <Badge variant="premium" className="ml-2">Featured</Badge>
            )}
          </div>
        </Link>
      </td>

      {/* Rating */}
      <td className="p-4">
        {casino.rating !== undefined ? (
          <Rating value={casino.rating} size="sm" />
        ) : (
          <span className="text-text-muted">-</span>
        )}
      </td>

      {/* Bonus (placeholder) */}
      <td className="p-4 text-text-secondary">
        <span>See website</span>
      </td>

      {/* Action */}
      <td className="p-4 text-center">
        <a
          href={`/go/${casino.slug.current}`}
          className="inline-block px-4 py-2 bg-gradient-gold text-background font-semibold rounded-lg transition-all text-sm hover:shadow-glow-accent hover:scale-105"
        >
          Visit
        </a>
      </td>
    </tr>
  )
}
