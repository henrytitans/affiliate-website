'use client'

import { ReactNode } from 'react'
import { CompareProvider } from '@/lib/hooks/useCompareContext'
import { FavoritesProvider } from '@/lib/hooks/useFavoritesContext'
import { CompareDrawer } from '@/components/CompareDrawer'
import { CookieConsent } from '@/components/CookieConsent'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <CompareProvider>
      <FavoritesProvider>
        {children}
        <CompareDrawer />
        <CookieConsent />
      </FavoritesProvider>
    </CompareProvider>
  )
}
