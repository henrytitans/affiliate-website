import { clsx } from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  glow?: boolean
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  glow = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'font-semibold rounded-lg transition-all duration-300 inline-flex items-center justify-center',
        'transform hover:scale-[1.02] active:scale-[0.98]',
        {
          // Primary - Purple
          'bg-primary hover:bg-primary-light text-white': variant === 'primary',
          // Secondary - Subtle
          'bg-elevated hover:bg-border text-foreground': variant === 'secondary',
          // Accent - Gold gradient (main CTA)
          'bg-gradient-gold text-background font-bold hover:shadow-glow-accent': variant === 'accent',
          // Outline - Border only
          'border-2 border-primary text-primary hover:bg-primary hover:text-white': variant === 'outline',
          // Ghost - Minimal
          'text-text-secondary hover:text-foreground hover:bg-elevated': variant === 'ghost',
          // Sizes
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-5 py-2.5 text-base': size === 'md',
          'px-8 py-4 text-lg': size === 'lg',
          // Glow effect
          'shadow-glow-primary': glow && variant === 'primary',
          'shadow-glow-accent animate-pulse-glow': glow && variant === 'accent',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
