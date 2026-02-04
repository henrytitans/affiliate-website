import { PortableText, PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import type { RichTextBlock, PortableTextBlock } from '@/lib/sanity/types'
import { urlFor } from '@/lib/sanity/image'

interface RichTextProps {
  block?: RichTextBlock
  value?: PortableTextBlock[]
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value: { asset: { _ref: string }; alt?: string } }) => (
      <Image
        src={urlFor(value).width(800).url()}
        alt={value.alt || ''}
        width={800}
        height={400}
        className="rounded-lg my-8"
      />
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || '#'
      const openInNewTab = value?.openInNewTab
      return (
        <a
          href={href}
          target={openInNewTab ? '_blank' : undefined}
          rel={openInNewTab ? 'noopener noreferrer' : undefined}
          className="text-primary hover:text-primary-dark underline"
        >
          {children}
        </a>
      )
    },
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-6 mb-3">{children}</h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mt-4 mb-2">{children}</h4>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-accent pl-4 italic text-zinc-600 dark:text-zinc-400 my-4">
        {children}
      </blockquote>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">{children}</p>
    ),
  },
}

export function RichText({ block, value }: RichTextProps) {
  // Support both block.content (from page builder) and direct value (from blog/review)
  const content = value || block?.content
  if (!content) return null

  return (
    <div className="prose dark:prose-invert max-w-none">
      <PortableText value={content} components={portableTextComponents} />
    </div>
  )
}
