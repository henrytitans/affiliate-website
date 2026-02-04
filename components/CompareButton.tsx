'use client'

import { clsx } from 'clsx'
import type { Casino } from '@/lib/sanity/types'
import { useCompareContext } from '@/lib/hooks/useCompareContext'

interface CompareButtonProps {
  casino: Casino
  className?: string
  variant?: 'icon' | 'full'
}

export function CompareButton({ casino, className, variant = 'icon' }: CompareButtonProps) {
  const { addToCompare, removeFromCompare, isInCompare, canAdd } = useCompareContext()
  const inCompare = isInCompare(casino._id)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (inCompare) {
      removeFromCompare(casino._id)
    } else if (canAdd) {
      addToCompare(casino)
    }
  }

  if (variant === 'icon') {
    return (
      <button
        onClick={handleClick}
        disabled={!inCompare && !canAdd}
        className={clsx(
          'p-2 rounded-lg transition-all',
          inCompare
            ? 'bg-primary text-white'
            : canAdd
              ? 'bg-elevated text-text-secondary hover:bg-primary/20 hover:text-primary'
              : 'bg-elevated/50 text-text-muted cursor-not-allowed',
          className
        )}
        title={inCompare ? 'Remove from compare' : canAdd ? 'Add to compare' : 'Compare limit reached'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      disabled={!inCompare && !canAdd}
      className={clsx(
        'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm',
        inCompare
          ? 'bg-primary text-white hover:bg-primary/80'
          : canAdd
            ? 'bg-elevated text-text-secondary hover:bg-primary/20 hover:text-primary border border-border'
            : 'bg-elevated/50 text-text-muted cursor-not-allowed border border-border/50',
        className
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
      {inCompare ? 'In Compare' : 'Compare'}
    </button>
  )
}
