import { clsx } from 'clsx'
import type { InfoBoxBlock } from '@/lib/sanity/types'

interface InfoBoxProps {
  block: InfoBoxBlock
}

export function InfoBox({ block }: InfoBoxProps) {
  const { title, content, variant = 'info' } = block

  const variantStyles = {
    info: {
      container: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
      title: 'text-blue-800 dark:text-blue-200',
      content: 'text-blue-700 dark:text-blue-300',
    },
    warning: {
      container: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
      title: 'text-yellow-800 dark:text-yellow-200',
      content: 'text-yellow-700 dark:text-yellow-300',
    },
    success: {
      container: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
      title: 'text-green-800 dark:text-green-200',
      content: 'text-green-700 dark:text-green-300',
    },
    danger: {
      container: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
      title: 'text-red-800 dark:text-red-200',
      content: 'text-red-700 dark:text-red-300',
    },
  }

  const icons = {
    info: 'i',
    warning: '!',
    success: '✓',
    danger: '!',
  }

  const styles = variantStyles[variant]

  return (
    <div className={clsx('border rounded-lg p-6', styles.container)}>
      <div className="flex items-start gap-3">
        <span
          className={clsx(
            'flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold',
            variant === 'info' && 'bg-blue-500 text-white',
            variant === 'warning' && 'bg-yellow-500 text-white',
            variant === 'success' && 'bg-green-500 text-white',
            variant === 'danger' && 'bg-red-500 text-white'
          )}
        >
          {icons[variant]}
        </span>
        <div>
          {title && <h4 className={clsx('font-semibold mb-2', styles.title)}>{title}</h4>}
          <p className={styles.content}>{content}</p>
        </div>
      </div>
    </div>
  )
}
