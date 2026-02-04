'use client'

import { clsx } from 'clsx'
import type { Casino } from '@/lib/sanity/types'
import { useFavoritesContext } from '@/lib/hooks/useFavoritesContext'

interface FavoriteButtonProps {
  casino: Casino
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function FavoriteButton({ casino, className, size = 'md' }: FavoriteButtonProps) {
  const { toggleFavorite, isFavorite } = useFavoritesContext()
  const favorite = isFavorite(casino._id)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(casino)
  }

  const sizes = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
  }

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  }

  return (
    <button
      onClick={handleClick}
      className={clsx(
        'rounded-lg transition-all',
        sizes[size],
        favorite
          ? 'bg-danger/20 text-danger hover:bg-danger/30'
          : 'bg-elevated text-text-secondary hover:bg-danger/10 hover:text-danger',
        className
      )}
      title={favorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={iconSizes[size]}
        height={iconSizes[size]}
        viewBox="0 0 24 24"
        fill={favorite ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    </button>
  )
}
