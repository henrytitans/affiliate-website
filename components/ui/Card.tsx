import { clsx } from 'clsx'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
}

export function Card({ children, className, hover = true, glow = false }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-card border border-border rounded-xl overflow-hidden transition-all duration-300',
        {
          'hover:border-primary/50 hover:shadow-card-hover': hover,
          'shadow-glow-primary': glow,
        },
        className
      )}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx('p-6 border-b border-border', className)}>
      {children}
    </div>
  )
}

export function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx('p-6', className)}>{children}</div>
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx('p-6 pt-0', className)}>
      {children}
    </div>
  )
}
