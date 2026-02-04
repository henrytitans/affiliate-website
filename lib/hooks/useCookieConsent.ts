'use client'

import { useState, useEffect, useCallback } from 'react'

const CONSENT_KEY = 'cookie-consent'

type ConsentState = {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  timestamp?: number
}

const defaultConsent: ConsentState = {
  necessary: true, // Always required
  analytics: false,
  marketing: false,
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentState | null>(null)
  const [showBanner, setShowBanner] = useState(false)

  // Load consent from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as ConsentState
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setConsent(parsed)
        setShowBanner(false)
      } catch {
        setShowBanner(true)
      }
    } else {
      setShowBanner(true)
    }
  }, [])

  const acceptAll = useCallback(() => {
    const newConsent: ConsentState = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now(),
    }
    localStorage.setItem(CONSENT_KEY, JSON.stringify(newConsent))
    setConsent(newConsent)
    setShowBanner(false)
  }, [])

  const acceptNecessary = useCallback(() => {
    const newConsent: ConsentState = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
    }
    localStorage.setItem(CONSENT_KEY, JSON.stringify(newConsent))
    setConsent(newConsent)
    setShowBanner(false)
  }, [])

  const updateConsent = useCallback((updates: Partial<ConsentState>) => {
    const newConsent: ConsentState = {
      ...defaultConsent,
      ...consent,
      ...updates,
      necessary: true, // Always true
      timestamp: Date.now(),
    }
    localStorage.setItem(CONSENT_KEY, JSON.stringify(newConsent))
    setConsent(newConsent)
    setShowBanner(false)
  }, [consent])

  const resetConsent = useCallback(() => {
    localStorage.removeItem(CONSENT_KEY)
    setConsent(null)
    setShowBanner(true)
  }, [])

  const hasAnalyticsConsent = consent?.analytics ?? false
  const hasMarketingConsent = consent?.marketing ?? false

  return {
    consent,
    showBanner,
    hasAnalyticsConsent,
    hasMarketingConsent,
    acceptAll,
    acceptNecessary,
    updateConsent,
    resetConsent,
    setShowBanner,
  }
}
