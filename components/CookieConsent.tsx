'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCookieConsent } from '@/lib/hooks/useCookieConsent'

export function CookieConsent() {
  const {
    showBanner,
    acceptAll,
    acceptNecessary,
    updateConsent,
  } = useCookieConsent()

  const [showSettings, setShowSettings] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  if (!showBanner) return null

  const handleSaveSettings = () => {
    updateConsent({ analytics, marketing })
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] bg-card border-t border-border shadow-2xl">
      {showSettings ? (
        // Settings view
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-foreground">Cookie Settings</h3>
            <button
              onClick={() => setShowSettings(false)}
              className="p-2 rounded-lg hover:bg-elevated transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="space-y-4 mb-6">
            {/* Necessary */}
            <div className="flex items-center justify-between p-4 bg-elevated rounded-lg">
              <div>
                <p className="font-medium text-foreground">Necessary Cookies</p>
                <p className="text-sm text-text-secondary">
                  Required for the website to function properly
                </p>
              </div>
              <div className="px-3 py-1 bg-success/20 text-success text-sm rounded-full">
                Always On
              </div>
            </div>

            {/* Analytics */}
            <label className="flex items-center justify-between p-4 bg-elevated rounded-lg cursor-pointer">
              <div>
                <p className="font-medium text-foreground">Analytics Cookies</p>
                <p className="text-sm text-text-secondary">
                  Help us understand how visitors interact with our website
                </p>
              </div>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="w-5 h-5 rounded border-border bg-elevated text-primary focus:ring-primary"
              />
            </label>

            {/* Marketing */}
            <label className="flex items-center justify-between p-4 bg-elevated rounded-lg cursor-pointer">
              <div>
                <p className="font-medium text-foreground">Marketing Cookies</p>
                <p className="text-sm text-text-secondary">
                  Used to deliver personalized advertisements
                </p>
              </div>
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="w-5 h-5 rounded border-border bg-elevated text-primary focus:ring-primary"
              />
            </label>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSaveSettings}
              className="flex-1 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all"
            >
              Save Settings
            </button>
            <button
              onClick={acceptAll}
              className="flex-1 py-3 bg-gradient-gold text-background font-bold rounded-lg hover:shadow-glow-accent transition-all"
            >
              Accept All
            </button>
          </div>
        </div>
      ) : (
        // Banner view
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <p className="text-foreground">
                We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.{' '}
                <Link href="/privacy" className="text-primary hover:underline">
                  Learn more
                </Link>
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowSettings(true)}
                className="px-4 py-2 text-text-secondary border border-border rounded-lg hover:border-primary hover:text-primary transition-all"
              >
                Settings
              </button>
              <button
                onClick={acceptNecessary}
                className="px-4 py-2 text-foreground border border-border rounded-lg hover:border-primary transition-all"
              >
                Necessary Only
              </button>
              <button
                onClick={acceptAll}
                className="px-6 py-2 bg-gradient-gold text-background font-bold rounded-lg hover:shadow-glow-accent transition-all"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
