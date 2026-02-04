'use client'

import { useState } from 'react'
import { clsx } from 'clsx'

interface NewsletterFormProps {
  variant?: 'default' | 'inline' | 'card'
  className?: string
}

export function NewsletterForm({ variant = 'default', className }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(data.message || 'Successfully subscribed!')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Failed to subscribe')
      }
    } catch {
      setStatus('error')
      setMessage('An error occurred. Please try again.')
    }
  }

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className={clsx('flex gap-2', className)}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={status === 'loading' || status === 'success'}
          className="flex-1 px-4 py-2 bg-elevated border border-border rounded-lg text-foreground placeholder:text-text-muted focus:outline-none focus:border-primary disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="px-4 py-2 bg-gradient-gold text-background font-semibold rounded-lg hover:shadow-glow-accent transition-all disabled:opacity-50"
        >
          {status === 'loading' ? '...' : status === 'success' ? 'Done' : 'Subscribe'}
        </button>
      </form>
    )
  }

  if (variant === 'card') {
    return (
      <div className={clsx('bg-card border border-border rounded-xl p-6', className)}>
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-foreground mb-2">
            Get Exclusive Bonuses
          </h3>
          <p className="text-text-secondary text-sm">
            Subscribe to receive the best casino bonuses and promotions directly in your inbox.
          </p>
        </div>

        {status === 'success' ? (
          <div className="text-center py-4">
            <div className="w-12 h-12 mx-auto mb-3 bg-success/20 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-success"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="text-success font-medium">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={status === 'loading'}
              className="w-full px-4 py-3 bg-elevated border border-border rounded-lg text-foreground placeholder:text-text-muted focus:outline-none focus:border-primary disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3 bg-gradient-gold text-background font-bold rounded-lg hover:shadow-glow-accent transition-all disabled:opacity-50"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe Now'}
            </button>
            {status === 'error' && (
              <p className="text-danger text-sm text-center">{message}</p>
            )}
          </form>
        )}

        <p className="text-xs text-text-muted text-center mt-4">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    )
  }

  // Default variant
  return (
    <div className={clsx('', className)}>
      <h3 className="text-lg font-bold text-foreground mb-2">
        Stay Updated
      </h3>
      <p className="text-text-secondary text-sm mb-4">
        Get the latest casino bonuses and promotions.
      </p>

      {status === 'success' ? (
        <div className="flex items-center gap-2 text-success">
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
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span className="font-medium">{message}</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={status === 'loading'}
            className="w-full px-4 py-3 bg-elevated border border-border rounded-lg text-foreground placeholder:text-text-muted focus:outline-none focus:border-primary disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
          {status === 'error' && (
            <p className="text-danger text-sm">{message}</p>
          )}
        </form>
      )}
    </div>
  )
}
