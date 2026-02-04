import Image from 'next/image'
import Link from 'next/link'
import type { Bonus } from '@/lib/sanity/types'
import { bonusTypeLabels } from '@/lib/sanity/types'
import { urlFor } from '@/lib/sanity/image'
import { Badge } from '@/components/ui/Badge'

interface BonusCardProps {
  bonus: Bonus
}

export function BonusCard({ bonus }: BonusCardProps) {
  return (
    <div className="group relative bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-card-hover">
      {/* Hot badge indicator */}
      {bonus.featured && (
        <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-accent border-l-[40px] border-l-transparent">
          <span className="absolute -top-8 -right-1 text-background text-xs font-bold rotate-45">🔥</span>
        </div>
      )}

      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-card opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <Link href={`/bonuses/${bonus.slug.current}`} className="block">
        <div className="relative p-6">
          <div className="flex items-start gap-4 mb-4">
            {/* Casino logo */}
            <div className="relative w-14 h-14 rounded-xl bg-elevated p-1.5 flex-shrink-0 group-hover:shadow-glow-primary transition-shadow duration-300">
              {bonus.casino?.logo ? (
                <Image
                  src={urlFor(bonus.casino.logo).width(60).height(60).url()}
                  alt={`${bonus.casino.name} logo`}
                  width={60}
                  height={60}
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">
                    {bonus.casino?.name?.charAt(0) || '?'}
                  </span>
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <Badge variant={bonus.type === 'no-deposit' ? 'success' : bonus.type === 'welcome' ? 'premium' : 'default'}>
                  {bonusTypeLabels[bonus.type]}
                </Badge>
              </div>
              <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                {bonus.title}
              </h3>
              <p className="text-sm text-text-secondary">
                {bonus.casino?.name}
              </p>
            </div>
          </div>

          {/* Bonus details */}
          <div className="grid grid-cols-2 gap-3 text-sm mb-4">
            {bonus.wageringRequirement && (
              <div className="bg-elevated rounded-lg px-3 py-2">
                <span className="text-text-muted text-xs block">Wagering</span>
                <span className="font-semibold text-foreground">
                  {bonus.wageringRequirement}x
                </span>
              </div>
            )}
            {bonus.minDeposit && (
              <div className="bg-elevated rounded-lg px-3 py-2">
                <span className="text-text-muted text-xs block">Min Deposit</span>
                <span className="font-semibold text-foreground">
                  ${bonus.minDeposit}
                </span>
              </div>
            )}
          </div>

          {/* Bonus code */}
          {bonus.code && (
            <div className="bg-primary/10 border border-primary/20 rounded-lg px-3 py-2 text-center">
              <span className="text-xs text-text-secondary">Use Code: </span>
              <span className="font-mono font-bold text-primary">
                {bonus.code}
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* CTA Button */}
      <div className="px-6 pb-6">
        <a
          href={`/go/${bonus.casino?.slug?.current || ''}`}
          className="block w-full text-center py-3 bg-gradient-gold text-background font-bold rounded-lg transition-all duration-300 hover:shadow-glow-accent transform hover:scale-[1.02]"
        >
          Claim Bonus
        </a>
      </div>
    </div>
  )
}
