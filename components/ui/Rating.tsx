import { clsx } from 'clsx'

interface RatingProps {
  value: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
  className?: string
}

export function Rating({
  value,
  max = 5,
  size = 'md',
  showValue = true,
  className,
}: RatingProps) {
  const stars = Array.from({ length: max }, (_, i) => i + 1)

  return (
    <div className={clsx('flex items-center gap-2', className)}>
      {/* Star display */}
      <div className="flex gap-0.5">
        {stars.map((star) => {
          const isFilled = star <= Math.floor(value)
          const isPartial = star === Math.ceil(value) && value % 1 !== 0

          return (
            <span
              key={star}
              className={clsx(
                'transition-colors',
                {
                  'text-sm': size === 'sm',
                  'text-lg': size === 'md',
                  'text-2xl': size === 'lg',
                }
              )}
            >
              {isFilled ? (
                <span className="text-accent">★</span>
              ) : isPartial ? (
                <span className="text-accent/50">★</span>
              ) : (
                <span className="text-border">★</span>
              )}
            </span>
          )
        })}
      </div>

      {/* Numeric value */}
      {showValue && (
        <span
          className={clsx('font-semibold text-accent', {
            'text-xs': size === 'sm',
            'text-sm': size === 'md',
            'text-base': size === 'lg',
          })}
        >
          {value.toFixed(1)}
        </span>
      )}
    </div>
  )
}

// Compact rating bar variant
export function RatingBar({ value, max = 5, label }: { value: number; max?: number; label?: string }) {
  const percentage = (value / max) * 100

  return (
    <div className="flex items-center gap-3">
      {label && (
        <span className="text-sm text-text-secondary w-20">{label}</span>
      )}
      <div className="flex-1 h-2 bg-elevated rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-semibold text-accent w-8">{value.toFixed(1)}</span>
    </div>
  )
}
