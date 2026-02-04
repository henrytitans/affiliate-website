import { clsx } from 'clsx'

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'premium' | 'new'
  children: React.ReactNode
  className?: string
}

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide',
        {
          'bg-elevated text-text-secondary border border-border': variant === 'default',
          'bg-success/20 text-success-light border border-success/30': variant === 'success',
          'bg-accent/20 text-accent-light border border-accent/30': variant === 'warning',
          'bg-danger/20 text-danger-light border border-danger/30': variant === 'danger',
          'bg-gradient-gold text-background font-bold': variant === 'premium',
          'bg-primary/20 text-primary-light border border-primary/30': variant === 'new',
        },
        className
      )}
    >
      {children}
    </span>
  )
}
