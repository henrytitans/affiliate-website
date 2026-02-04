import Image from 'next/image'
import Link from 'next/link'
import type { Casino } from '@/lib/sanity/types'
import { urlFor } from '@/lib/sanity/image'
import { Rating } from '@/components/ui/Rating'
import { Badge } from '@/components/ui/Badge'

interface CasinoCardProps {
  casino: Casino
}

export function CasinoCard({ casino }: CasinoCardProps) {
  return (
    <div className="group relative bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-card-hover">
      {/* Featured ribbon */}
      {casino.featured && (
        <div className="absolute top-4 -right-8 bg-gradient-gold text-background text-xs font-bold px-10 py-1 rotate-45 shadow-lg z-10">
          TOP PICK
        </div>
      )}

      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-card opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <Link href={`/casinos/${casino.slug.current}`} className="block">
        <div className="relative p-6">
          <div className="flex items-start gap-4 mb-4">
            {/* Logo with glow on hover */}
            <div className="relative w-20 h-20 rounded-xl bg-elevated p-2 flex-shrink-0 group-hover:shadow-glow-primary transition-shadow duration-300">
              {casino.logo ? (
                <Image
                  src={urlFor(casino.logo).width(80).height(80).url()}
                  alt={`${casino.name} logo`}
                  width={80}
                  height={80}
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">
                    {casino.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors truncate">
                  {casino.name}
                </h3>
                {casino.featured && (
                  <Badge variant="premium">Featured</Badge>
                )}
              </div>
              {casino.rating !== undefined && (
                <Rating value={casino.rating} size="sm" />
              )}
            </div>
          </div>

          {casino.description && (
            <p className="text-text-secondary text-sm line-clamp-2 mb-4">
              {casino.description}
            </p>
          )}
        </div>
      </Link>

      {/* CTA Button */}
      <div className="px-6 pb-6">
        <a
          href={`/go/${casino.slug.current}`}
          className="block w-full text-center py-3 bg-gradient-gold text-background font-bold rounded-lg transition-all duration-300 hover:shadow-glow-accent transform hover:scale-[1.02]"
        >
          Visit Casino
        </a>
      </div>
    </div>
  )
}
