'use client'

import { useState, useEffect, useMemo } from 'react'
import { clsx } from 'clsx'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  total: number
}

function calculateTimeLeft(expiresAt: Date): TimeLeft {
  const total = expiresAt.getTime() - Date.now()

  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 }
  }

  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
    total,
  }
}

interface TimeUnitProps {
  value: number
  label: string
  urgent?: boolean
}

function TimeUnit({ value, label, urgent }: TimeUnitProps) {
  return (
    <div className="flex flex-col items-center">
      <span
        className={clsx(
          'text-xl font-mono font-bold tabular-nums',
          urgent ? 'text-danger' : 'text-accent'
        )}
      >
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-xs text-text-muted uppercase">{label}</span>
    </div>
  )
}

interface BonusTimerProps {
  expiresAt: Date | string
  variant?: 'default' | 'compact' | 'inline'
  showLabel?: boolean
  className?: string
}

export function BonusTimer({
  expiresAt,
  variant = 'default',
  showLabel = true,
  className
}: BonusTimerProps) {
  const expiry = useMemo(
    () => (typeof expiresAt === 'string' ? new Date(expiresAt) : expiresAt),
    [expiresAt]
  )
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(expiry))
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(expiry))
    }, 1000)

    return () => clearInterval(timer)
  }, [expiry])

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={clsx('animate-pulse bg-elevated rounded h-12 w-48', className)} />
    )
  }

  if (timeLeft.total <= 0) {
    return (
      <div className={clsx('text-danger font-semibold', className)}>
        Expired
      </div>
    )
  }

  const isUrgent = timeLeft.days === 0 && timeLeft.hours < 24

  if (variant === 'inline') {
    return (
      <span className={clsx('font-mono text-sm', isUrgent ? 'text-danger' : 'text-accent', className)}>
        {timeLeft.days > 0 && `${timeLeft.days}d `}
        {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </span>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={clsx('flex items-center gap-1', className)}>
        {isUrgent && (
          <span className="flex h-2 w-2 mr-1">
            <span className="animate-ping absolute h-2 w-2 rounded-full bg-danger opacity-75" />
            <span className="relative rounded-full h-2 w-2 bg-danger" />
          </span>
        )}
        <span className={clsx('font-mono text-sm font-semibold', isUrgent ? 'text-danger' : 'text-accent')}>
          {timeLeft.days > 0 && `${timeLeft.days}d `}
          {timeLeft.hours.toString().padStart(2, '0')}:
          {timeLeft.minutes.toString().padStart(2, '0')}:
          {timeLeft.seconds.toString().padStart(2, '0')}
        </span>
      </div>
    )
  }

  return (
    <div className={clsx('', className)}>
      {showLabel && (
        <p className="text-xs text-text-secondary mb-2 flex items-center gap-1">
          {isUrgent && (
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute h-2 w-2 rounded-full bg-danger opacity-75" />
              <span className="relative rounded-full h-2 w-2 bg-danger" />
            </span>
          )}
          Expires in
        </p>
      )}
      <div className="flex items-center gap-3">
        {timeLeft.days > 0 && (
          <>
            <TimeUnit value={timeLeft.days} label="Days" urgent={isUrgent} />
            <span className={clsx('text-lg font-bold', isUrgent ? 'text-danger' : 'text-accent')}>:</span>
          </>
        )}
        <TimeUnit value={timeLeft.hours} label="Hours" urgent={isUrgent} />
        <span className={clsx('text-lg font-bold', isUrgent ? 'text-danger' : 'text-accent')}>:</span>
        <TimeUnit value={timeLeft.minutes} label="Mins" urgent={isUrgent} />
        <span className={clsx('text-lg font-bold', isUrgent ? 'text-danger' : 'text-accent')}>:</span>
        <TimeUnit value={timeLeft.seconds} label="Secs" urgent={isUrgent} />
      </div>
    </div>
  )
}
