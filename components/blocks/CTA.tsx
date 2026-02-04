import Link from 'next/link'
import { clsx } from 'clsx'
import type { CTABlock } from '@/lib/sanity/types'

interface CTAProps {
  block: CTABlock
}

export function CTA({ block }: CTAProps) {
  const { text, url, variant = 'accent', size = 'lg', centered = true } = block

  const variantClasses = {
    primary: 'bg-primary hover:bg-primary-dark text-white',
    accent: 'bg-accent hover:bg-accent-dark text-zinc-900',
    secondary:
      'bg-zinc-200 hover:bg-zinc-300 text-zinc-900 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:text-white',
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <div className={clsx('py-4', centered && 'text-center')}>
      <Link
        href={url}
        className={clsx(
          'inline-block font-semibold rounded-lg transition-colors',
          variantClasses[variant],
          sizeClasses[size]
        )}
      >
        {text}
      </Link>
    </div>
  )
}
