import Image from 'next/image'
import Link from 'next/link'
import { clsx } from 'clsx'
import type { HeroBlock } from '@/lib/sanity/types'
import { urlFor } from '@/lib/sanity/image'

interface HeroProps {
  block: HeroBlock
}

export function Hero({ block }: HeroProps) {
  const { title, subtitle, image, imagePosition = 'background', cta, overlay = true } = block

  if (imagePosition === 'background') {
    return (
      <div className="relative min-h-[400px] flex items-center justify-center text-center px-4 py-16">
        {image && (
          <Image
            src={urlFor(image).width(1920).height(600).url()}
            alt=""
            fill
            className="object-cover"
            priority
          />
        )}
        {overlay && image && <div className="absolute inset-0 bg-black/50" />}
        <div className={clsx('relative z-10 max-w-3xl', image ? 'text-white' : '')}>
          <h1
            className={clsx(
              'text-4xl md:text-5xl font-bold mb-4',
              image ? 'text-white' : 'text-zinc-900 dark:text-zinc-50'
            )}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className={clsx(
                'text-lg md:text-xl mb-8',
                image ? 'text-zinc-200' : 'text-zinc-600 dark:text-zinc-400'
              )}
            >
              {subtitle}
            </p>
          )}
          {cta?.text && cta?.url && (
            <Link
              href={cta.url}
              className="inline-block px-8 py-4 bg-accent hover:bg-accent-dark text-zinc-900 font-semibold rounded-lg transition-colors text-lg"
            >
              {cta.text}
            </Link>
          )}
        </div>
      </div>
    )
  }

  // Side-by-side layout
  return (
    <div
      className={clsx(
        'grid md:grid-cols-2 gap-8 items-center py-12',
        imagePosition === 'left' && 'md:flex-row-reverse'
      )}
    >
      <div className={imagePosition === 'left' ? 'md:order-2' : ''}>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">{subtitle}</p>
        )}
        {cta?.text && cta?.url && (
          <Link
            href={cta.url}
            className="inline-block px-8 py-4 bg-accent hover:bg-accent-dark text-zinc-900 font-semibold rounded-lg transition-colors text-lg"
          >
            {cta.text}
          </Link>
        )}
      </div>
      {image && (
        <div className={imagePosition === 'left' ? 'md:order-1' : ''}>
          <Image
            src={urlFor(image).width(600).height(400).url()}
            alt=""
            width={600}
            height={400}
            className="rounded-lg w-full h-auto"
            priority
          />
        </div>
      )}
    </div>
  )
}
