import Image from 'next/image'
import Link from 'next/link'
import type { Bonus } from '@/lib/sanity/types'
import { bonusTypeLabels } from '@/lib/sanity/types'
import { urlFor } from '@/lib/sanity/image'
import { Badge } from '@/components/ui/Badge'
import { Rating } from '@/components/ui/Rating'

interface BonusDetailProps {
  bonus: Bonus
}

export function BonusDetail({ bonus }: BonusDetailProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
            {bonus.casino?.logo ? (
              <Image
                src={urlFor(bonus.casino.logo).width(100).height(100).url()}
                alt={`${bonus.casino.name} logo`}
                width={100}
                height={100}
                className="rounded-xl object-contain"
              />
            ) : (
              <div className="w-24 h-24 bg-zinc-200 dark:bg-zinc-700 rounded-xl flex items-center justify-center">
                <span className="text-3xl font-bold text-zinc-400">
                  {bonus.casino?.name?.charAt(0) || '?'}
                </span>
              </div>
            )}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant={bonus.type === 'no-deposit' ? 'success' : 'default'}>
                  {bonusTypeLabels[bonus.type]}
                </Badge>
                {bonus.featured && <Badge variant="warning">Featured</Badge>}
              </div>
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                {bonus.title}
              </h1>
              <Link
                href={`/casinos/${bonus.casino?.slug?.current || ''}`}
                className="text-primary hover:underline font-medium"
              >
                {bonus.casino?.name}
              </Link>
              {bonus.casino?.rating !== undefined && (
                <div className="mt-2">
                  <Rating value={bonus.casino.rating} size="sm" />
                </div>
              )}
            </div>
          </div>

          {/* Bonus Details */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {bonus.value && (
              <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4">
                <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Bonus Value</div>
                <div className="font-semibold text-zinc-900 dark:text-zinc-50">{bonus.value}</div>
              </div>
            )}
            {bonus.wageringRequirement && (
              <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4">
                <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Wagering</div>
                <div className="font-semibold text-zinc-900 dark:text-zinc-50">{bonus.wageringRequirement}x</div>
              </div>
            )}
            {bonus.minDeposit && (
              <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4">
                <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Min Deposit</div>
                <div className="font-semibold text-zinc-900 dark:text-zinc-50">${bonus.minDeposit}</div>
              </div>
            )}
            {bonus.code && (
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
                <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Bonus Code</div>
                <div className="font-mono font-bold text-zinc-900 dark:text-zinc-50">{bonus.code}</div>
              </div>
            )}
          </div>

          {/* Description */}
          {bonus.description && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
                About This Bonus
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {bonus.description}
              </p>
            </div>
          )}

          {/* Terms */}
          {bonus.terms && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
                Terms & Conditions
              </h2>
              <div className="text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4 whitespace-pre-wrap">
                {bonus.terms}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={`/go/${bonus.casino?.slug?.current || ''}`}
              className="flex-1 text-center py-4 bg-accent hover:bg-accent-dark text-zinc-900 font-semibold rounded-lg transition-colors text-lg"
            >
              Claim Bonus at {bonus.casino?.name}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
