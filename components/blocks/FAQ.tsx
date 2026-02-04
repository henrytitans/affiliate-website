'use client'

import { useState } from 'react'
import { clsx } from 'clsx'
import type { FAQBlock } from '@/lib/sanity/types'

interface FAQProps {
  block: FAQBlock
}

export function FAQ({ block }: FAQProps) {
  const { title, items } = block
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div>
      {title && (
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">{title}</h3>
      )}
      <div className="space-y-3">
        {items?.map((item, index) => (
          <div
            key={item._key || index}
            className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex items-center justify-between p-4 text-left bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
            >
              <span className="font-medium text-zinc-900 dark:text-zinc-50">{item.question}</span>
              <span
                className={clsx(
                  'text-2xl text-zinc-400 transition-transform',
                  openIndex === index && 'rotate-45'
                )}
              >
                +
              </span>
            </button>
            <div
              className={clsx(
                'overflow-hidden transition-all duration-300',
                openIndex === index ? 'max-h-96' : 'max-h-0'
              )}
            >
              <div className="p-4 pt-0 text-zinc-600 dark:text-zinc-400">{item.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
