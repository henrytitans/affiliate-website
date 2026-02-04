import Image from 'next/image'
import type { Casino } from '@/lib/sanity/types'
import { urlFor } from '@/lib/sanity/image'
import { Rating } from '@/components/ui/Rating'
import { Badge } from '@/components/ui/Badge'

interface CasinoDetailProps {
  casino: Casino
}

export function CasinoDetail({ casino }: CasinoDetailProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
            {casino.logo ? (
              <Image
                src={urlFor(casino.logo).width(120).height(120).url()}
                alt={`${casino.name} logo`}
                width={120}
                height={120}
                className="rounded-xl object-contain"
              />
            ) : (
              <div className="w-28 h-28 bg-zinc-200 dark:bg-zinc-700 rounded-xl flex items-center justify-center">
                <span className="text-4xl font-bold text-zinc-400">
                  {casino.name.charAt(0)}
                </span>
              </div>
            )}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                  {casino.name}
                </h1>
                {casino.featured && (
                  <Badge variant="warning">Featured</Badge>
                )}
              </div>
              {casino.rating !== undefined && (
                <Rating value={casino.rating} size="lg" />
              )}
            </div>
          </div>

          {/* Description */}
          {casino.description && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
                About {casino.name}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {casino.description}
              </p>
            </div>
          )}

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={`/go/${casino.slug.current}`}
              className="flex-1 text-center py-4 bg-accent hover:bg-accent-dark text-zinc-900 font-semibold rounded-lg transition-colors text-lg"
            >
              Visit {casino.name}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
