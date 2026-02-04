import type { PageBlock } from '@/lib/sanity/types'
import { Hero } from './Hero'
import { RichText } from './RichText'
import { CasinoList } from './CasinoList'
import { ComparisonTable } from './ComparisonTable'
import { ProsCons } from './ProsCons'
import { CTA } from './CTA'
import { FAQ } from './FAQ'
import { InfoBox } from './InfoBox'

interface BlockRendererProps {
  blocks: PageBlock[]
}

export function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) {
    return null
  }

  return (
    <div className="space-y-12">
      {blocks.map((block) => {
        switch (block._type) {
          case 'heroBlock':
            return <Hero key={block._key} block={block} />
          case 'richTextBlock':
            return <RichText key={block._key} block={block} />
          case 'casinoListBlock':
            return <CasinoList key={block._key} block={block} />
          case 'comparisonTableBlock':
            return <ComparisonTable key={block._key} block={block} />
          case 'prosConsBlock':
            return <ProsCons key={block._key} block={block} />
          case 'ctaBlock':
            return <CTA key={block._key} block={block} />
          case 'faqBlock':
            return <FAQ key={block._key} block={block} />
          case 'infoBoxBlock':
            return <InfoBox key={block._key} block={block} />
          default:
            console.warn(`Unknown block type: ${(block as PageBlock)._type}`)
            return null
        }
      })}
    </div>
  )
}
