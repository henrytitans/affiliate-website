import casino from './documents/casino'
import bonus from './documents/bonus'
import country from './documents/country'
import paymentMethod from './documents/paymentMethod'
import blogPost from './documents/blogPost'
import page from './documents/page'
import review from './documents/review'
import seo from './objects/seo'

// Block schemas
import heroBlock from './objects/blocks/heroBlock'
import richTextBlock from './objects/blocks/richTextBlock'
import casinoListBlock from './objects/blocks/casinoListBlock'
import comparisonTableBlock from './objects/blocks/comparisonTableBlock'
import prosConsBlock from './objects/blocks/prosConsBlock'
import ctaBlock from './objects/blocks/ctaBlock'
import faqBlock from './objects/blocks/faqBlock'
import infoBoxBlock from './objects/blocks/infoBoxBlock'

export const schemaTypes = [
  // Documents
  casino,
  bonus,
  country,
  paymentMethod,
  blogPost,
  page,
  review,
  // Objects
  seo,
  // Blocks
  heroBlock,
  richTextBlock,
  casinoListBlock,
  comparisonTableBlock,
  prosConsBlock,
  ctaBlock,
  faqBlock,
  infoBoxBlock,
]
