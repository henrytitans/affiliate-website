import type { ProsConsBlock } from '@/lib/sanity/types'

interface ProsConsProps {
  block: ProsConsBlock
}

export function ProsCons({ block }: ProsConsProps) {
  const { title, pros, cons } = block

  return (
    <div>
      {title && (
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">{title}</h3>
      )}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-4 flex items-center gap-2">
            <span className="text-green-500">✓</span> Pros
          </h4>
          <ul className="space-y-2">
            {pros?.map((pro, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-green-700 dark:text-green-300"
              >
                <span className="text-green-500 mt-1">✓</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
          <h4 className="font-semibold text-red-800 dark:text-red-200 mb-4 flex items-center gap-2">
            <span className="text-red-500">✗</span> Cons
          </h4>
          <ul className="space-y-2">
            {cons?.map((con, index) => (
              <li key={index} className="flex items-start gap-2 text-red-700 dark:text-red-300">
                <span className="text-red-500 mt-1">✗</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
