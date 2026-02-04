'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Casino } from '@/lib/sanity/types'

const STORAGE_KEY = 'casino-compare'
const MAX_COMPARE = 4

type CompareState = {
  ids: string[]
  casinos: Casino[]
}

export function useCompare() {
  const [state, setState] = useState<CompareState>({ ids: [], casinos: [] })
  const [isOpen, setIsOpen] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as CompareState
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

  const addToCompare = useCallback((casino: Casino) => {
    setState((prev) => {
      if (prev.ids.includes(casino._id)) return prev
      if (prev.ids.length >= MAX_COMPARE) return prev
      return {
        ids: [...prev.ids, casino._id],
        casinos: [...prev.casinos, casino],
      }
    })
    setIsOpen(true)
  }, [])

  const removeFromCompare = useCallback((casinoId: string) => {
    setState((prev) => ({
      ids: prev.ids.filter((id) => id !== casinoId),
      casinos: prev.casinos.filter((c) => c._id !== casinoId),
    }))
  }, [])

  const clearCompare = useCallback(() => {
    setState({ ids: [], casinos: [] })
    setIsOpen(false)
  }, [])

  const isInCompare = useCallback(
    (casinoId: string) => state.ids.includes(casinoId),
    [state.ids]
  )

  const canAdd = state.ids.length < MAX_COMPARE

  return {
    casinos: state.casinos,
    count: state.ids.length,
    isOpen,
    setIsOpen,
    addToCompare,
    removeFromCompare,
    clearCompare,
    isInCompare,
    canAdd,
    maxCompare: MAX_COMPARE,
  }
}
