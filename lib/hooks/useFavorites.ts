'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Casino } from '@/lib/sanity/types'

const STORAGE_KEY = 'casino-favorites'

type FavoritesState = {
  ids: string[]
  casinos: Casino[]
}

export function useFavorites() {
  const [state, setState] = useState<FavoritesState>({ ids: [], casinos: [] })

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as FavoritesState
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setState(parsed)
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }, [])

  // Save to localStorage on change
  useEffect(() => {
    if (state.ids.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [state])

  const addFavorite = useCallback((casino: Casino) => {
    setState((prev) => {
      if (prev.ids.includes(casino._id)) return prev
      return {
        ids: [...prev.ids, casino._id],
        casinos: [...prev.casinos, casino],
      }
    })
  }, [])

  const removeFavorite = useCallback((casinoId: string) => {
    setState((prev) => ({
      ids: prev.ids.filter((id) => id !== casinoId),
      casinos: prev.casinos.filter((c) => c._id !== casinoId),
    }))
  }, [])

  const toggleFavorite = useCallback((casino: Casino) => {
    setState((prev) => {
      if (prev.ids.includes(casino._id)) {
        return {
          ids: prev.ids.filter((id) => id !== casino._id),
          casinos: prev.casinos.filter((c) => c._id !== casino._id),
        }
      }
      return {
        ids: [...prev.ids, casino._id],
        casinos: [...prev.casinos, casino],
      }
    })
  }, [])

  const clearFavorites = useCallback(() => {
    setState({ ids: [], casinos: [] })
  }, [])

  const isFavorite = useCallback(
    (casinoId: string) => state.ids.includes(casinoId),
    [state.ids]
  )

  return {
    favorites: state.casinos,
    count: state.ids.length,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    clearFavorites,
    isFavorite,
  }
}
