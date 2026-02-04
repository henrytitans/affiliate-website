# Casino Affiliate Website — Technical Specification

---

## 📚 REQUIRED READING — Always Load These Files

**Before writing ANY code, Claude MUST read and understand:**

| File | Purpose | When to Reference |
|------|---------|-------------------|
| `CLAUDE.md` | Rules, pillars, testing protocol | Every task |
| `ARCHITECTURE.md` | System design, patterns, templates | When writing code |
| `EXECUTION_STEPS.md` | Build phases, milestones, checklists | When planning work |

**If these files exist, Claude must account for their contents in every response.**

---

## 🖥️ Local Development Commands

### Start Development Server

```bash
# Start Next.js + view in browser
npm run dev
# → Opens http://localhost:3000

# Start Sanity Studio (if separate)
cd sanity && npm run dev
# → Opens http://localhost:3333
```

### Quick Test Command

```bash
# Run this before any commit or phase completion
npm run build && npm run start
```

### Full Local Test Suite

```bash
# 1. Build check
npm run build

# 2. Start server
npm run start &

# 3. Basic smoke test (in another terminal)
curl -s http://localhost:3000 | head -20          # Homepage loads
curl -s http://localhost:3000/casinos | head -20  # Index loads
curl -s http://localhost:3000/sitemap.xml         # Sitemap exists

# 4. Kill background server
kill %1
```

### Recommended package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "npm run build",
    "test:local": "npm run build && npm run start"
  }
}
```

---

## ⚠️ KEY PILLARS — Non-Negotiable Principles

This project is built on three foundational pillars. Every decision must support these:

### 1. MODULARITY
- **Everything is a composable module** — components, pages, content types, layouts
- **New pages require zero code changes** — create in Sanity, it works
- **New content types are plug-and-play** — add schema, add queries, add route
- **Components are self-contained** — no hidden dependencies, clear interfaces
- **Formats are swappable** — change entire site appearance via config

### 2. TESTABILITY
- **Every phase has testable milestones** — no subjective "looks good"
- **Tests gate progress** — cannot proceed until all tests pass
- **Regression is mandatory** — previous phase tests must still pass
- **Pass/fail is binary** — no "partially working"

### 3. EASY CONTENT MANAGEMENT
- **Adding a new page = 5 minutes in Sanity** — no developer needed
- **Adding content to existing page = edit in Sanity** — instant
- **New content types follow the same pattern** — schema → query → route
- **Editors never touch code** — all content via CMS

### Modularity Checklist (Ask Before Every Implementation)

```
[ ] Can a new page of this type be added without code changes?
[ ] Can content be edited without redeploying?
[ ] Is this component reusable in other contexts?
[ ] Are dependencies explicit and minimal?
[ ] Can this be tested in isolation?
[ ] Would adding a similar feature require copy-paste? (BAD)
[ ] Does this follow the established pattern? (GOOD)
```

---

## Rules for Claude

- **Never commit code without explicit permission.** Always ask before running `git commit`. Do not assume permission from phrases like "save this" or "finish up" — only commit when the user explicitly says "commit", "make a commit", or similar.

- **All milestone tests must pass before moving to the next phase.** Each phase has defined testable milestones. Before starting a new phase:
  1. Run all tests for the current phase
  2. Verify all previous phase tests still pass (regression)
  3. Only proceed when all tests are green

- **Report test status explicitly.** When completing a phase, list each milestone test and its pass/fail status.

- **Modularity is mandatory.** Before implementing any feature, verify it follows modular patterns. If adding a new page type requires more than: (1) Sanity schema, (2) query function, (3) route file — the design is wrong.

---

## Milestone Testing Protocol

Before moving from Phase N to Phase N+1:

```
1. Run Phase N milestone tests        → All must pass
2. Run Phase 0 to N-1 regression      → All must still pass
3. Deploy to staging/preview          → Verify in browser
4. Document any skipped tests         → With justification
5. Get explicit approval to proceed   → User must confirm
```

### Test Types

| Type | How to Test | When |
|------|-------------|------|
| **Build** | `npm run build` succeeds | Every phase |
| **Route** | Page loads without error | When adding pages |
| **Data** | Content from Sanity displays | When adding queries |
| **Redirect** | `/go/[slug]` redirects correctly | Phase 4+ |
| **SEO** | Meta tags present in source | Phase 5+ |
| **Mobile** | Renders correctly at 375px | Phase 2+ |
| **Performance** | Lighthouse > 80 | Every phase |

---

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                │
│                    Next.js 14 (App Router)                      │
│        SSG for content pages / ISR for indexes / Edge API       │
└─────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│     Sanity      │  │   PostgreSQL    │  │   Redis/KV      │
│  (Content CMS)  │  │   (Optional)    │  │   (Optional)    │
│                 │  │                 │  │                 │
│ - Casinos       │  │ - Click logs    │  │ - Index cache   │
│ - Reviews       │  │ - User sessions │  │ - Geo lookups   │
│ - Bonuses       │  │ - A/B tests     │  │                 │
│ - Pages         │  │                 │  │                 │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

**Why this stack:**
- **Next.js App Router**: Server components = fast pages, built-in caching, easy SEO
- **Sanity**: Real-time editing, GROQ queries, image CDN, portable text for rich content
- **PostgreSQL** (later): Click tracking, analytics — Sanity isn't built for high-write ops
- **Redis/Vercel KV** (later): Cache computed indexes, geo-IP lookups

**Data flow:**
1. Content editors manage casinos/bonuses/pages in Sanity Studio
2. Next.js fetches via GROQ at build time (SSG) or request time (ISR)
3. Affiliate clicks hit `/go/[slug]` → logged → redirected
4. Indexes are pre-computed or cached with revalidation

---

## 2. Folder Structure

```
ds-web/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (html, body, providers)
│   ├── page.tsx                  # Homepage
│   ├── globals.css
│   │
│   ├── (content)/                # Route group: content pages
│   │   ├── casinos/
│   │   │   ├── page.tsx          # /casinos (index)
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # /casinos/[slug] (detail)
│   │   ├── bonuses/
│   │   │   ├── page.tsx          # /bonuses (index)
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # /bonuses/[slug]
│   │   ├── reviews/
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # /reviews/[slug] (no index, accessed via casino)
│   │   ├── countries/
│   │   │   ├── page.tsx          # /countries
│   │   │   └── [code]/
│   │   │       └── page.tsx      # /countries/us, /countries/uk
│   │   ├── payment-methods/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   └── blog/
│   │       ├── page.tsx
│   │       └── [slug]/
│   │           └── page.tsx
│   │
│   ├── go/
│   │   └── [slug]/
│   │       └── route.ts          # Affiliate redirect API route
│   │
│   ├── api/
│   │   ├── revalidate/
│   │   │   └── route.ts          # Webhook for Sanity → revalidate cache
│   │   └── click/
│   │       └── route.ts          # Click logging endpoint
│   │
│   └── sitemap.ts                # Dynamic sitemap generation
│
├── components/
│   ├── ui/                       # Primitives (Button, Card, Badge, etc.)
│   ├── blocks/                   # Content blocks (Hero, CasinoCard, BonusTable)
│   ├── layouts/                  # Page layouts (DefaultLayout, LandingLayout)
│   └── formats/                  # Format variants (see section 6)
│       ├── default/
│       ├── minimal/
│       └── comparison/
│
├── lib/
│   ├── sanity/
│   │   ├── client.ts             # Sanity client config
│   │   ├── queries.ts            # GROQ queries
│   │   ├── types.ts              # Generated/manual TypeScript types
│   │   └── portable-text.tsx     # Portable text renderer
│   ├── affiliate/
│   │   ├── links.ts              # Link generation helpers
│   │   └── tracking.ts           # Click tracking logic
│   ├── seo/
│   │   ├── metadata.ts           # generateMetadata helpers
│   │   └── schema.ts             # JSON-LD generators
│   └── utils/
│       ├── filters.ts            # Index filtering logic
│       └── sorting.ts            # Index sorting logic
│
├── sanity/                       # Sanity Studio (embedded)
│   ├── schemas/
│   │   ├── documents/
│   │   │   ├── casino.ts
│   │   │   ├── bonus.ts
│   │   │   ├── review.ts
│   │   │   ├── country.ts
│   │   │   ├── paymentMethod.ts
│   │   │   ├── blogPost.ts
│   │   │   └── page.ts           # Generic pages
│   │   └── objects/
│   │       ├── seo.ts
│   │       ├── affiliateLink.ts
│   │       ├── rating.ts
│   │       └── prosCons.ts
│   ├── schema.ts                 # Schema index
│   └── sanity.config.ts
│
├── public/
│   └── images/
│
├── .env.local                    # Environment variables
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 3. Sanity Content Model

### 3.1 Document Types

#### `casino`
| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Casino name |
| `slug` | slug | URL slug (unique) |
| `logo` | image | Casino logo |
| `description` | portableText | Rich description |
| `rating` | object | `{ overall: number, games: number, support: number, payout: number }` |
| `established` | number | Year founded |
| `licenses` | array<string> | e.g., `["MGA", "UKGC", "Curacao"]` |
| `countries` | array<ref:country> | Accepted countries |
| `blockedCountries` | array<ref:country> | Blocked countries |
| `paymentMethods` | array<ref:paymentMethod> | Supported payments |
| `minDeposit` | number | Minimum deposit USD |
| `withdrawalTime` | string | e.g., "24-48 hours" |
| `affiliateLinks` | array<affiliateLink> | Geo-specific affiliate URLs |
| `prosCons` | object | `{ pros: string[], cons: string[] }` |
| `seo` | object:seo | SEO metadata |
| `featured` | boolean | Show in featured sections |
| `publishedAt` | datetime | Publish date |

#### `bonus`
| Field | Type | Description |
|-------|------|-------------|
| `title` | string | e.g., "100% up to $500" |
| `slug` | slug | URL slug |
| `casino` | ref:casino | Parent casino |
| `type` | string | `welcome | reload | freespins | cashback | no-deposit` |
| `value` | string | Human-readable value |
| `wageringRequirement` | number | e.g., 35 (times) |
| `minDeposit` | number | |
| `maxBet` | number | Max bet while wagering |
| `validGames` | array<string> | Game types that count |
| `expiryDays` | number | Days to use bonus |
| `code` | string | Bonus code (optional) |
| `terms` | portableText | Full T&C |
| `countries` | array<ref:country> | Geo-targeted |
| `affiliateLink` | ref→casino.affiliateLinks | Or override |
| `seo` | object:seo | |
| `publishedAt` | datetime | |

#### `review`
| Field | Type | Description |
|-------|------|-------------|
| `slug` | slug | |
| `casino` | ref:casino | One review per casino |
| `headline` | string | |
| `body` | portableText | Full review content |
| `author` | string | |
| `lastTested` | date | When we last verified |
| `verdict` | string | Short summary |
| `seo` | object:seo | |
| `publishedAt` | datetime | |

#### `country`
| Field | Type | Description |
|-------|------|-------------|
| `name` | string | e.g., "United States" |
| `code` | string | ISO 3166-1 alpha-2: "US" |
| `flag` | image | |
| `legalStatus` | string | `legal | restricted | prohibited | unregulated` |
| `overview` | portableText | Gambling laws overview |
| `seo` | object:seo | |

#### `paymentMethod`
| Field | Type | Description |
|-------|------|-------------|
| `name` | string | e.g., "Visa" |
| `slug` | slug | |
| `logo` | image | |
| `type` | string | `card | ewallet | crypto | bank` |
| `description` | portableText | |
| `processingTime` | string | |
| `fees` | string | |
| `seo` | object:seo | |

#### `blogPost`
| Field | Type | Description |
|-------|------|-------------|
| `title` | string | |
| `slug` | slug | |
| `excerpt` | text | Short preview |
| `body` | portableText | |
| `coverImage` | image | |
| `categories` | array<string> | |
| `relatedCasinos` | array<ref:casino> | |
| `author` | string | |
| `seo` | object:seo | |
| `publishedAt` | datetime | |

#### `page` (generic)
| Field | Type | Description |
|-------|------|-------------|
| `title` | string | |
| `slug` | slug | |
| `template` | string | `default | landing | comparison` |
| `blocks` | array<block> | Modular content blocks |
| `seo` | object:seo | |

### 3.2 Object Types

#### `seo`
```ts
{
  metaTitle: string
  metaDescription: string
  canonicalUrl?: string
  noIndex?: boolean
  ogImage?: image
}
```

#### `affiliateLink`
```ts
{
  country: ref:country     // null = default/global
  url: string              // Full affiliate URL
  trackingId?: string      // Our internal ID for this link
}
```

### 3.3 Relationships Diagram

```
                    ┌─────────────┐
                    │   country   │
                    └─────────────┘
                          ▲
          ┌───────────────┼───────────────┐
          │               │               │
    ┌─────┴─────┐   ┌─────┴─────┐   ┌─────┴─────┐
    │  casino   │◄──│   bonus   │   │ blogPost  │
    └───────────┘   └───────────┘   └───────────┘
          │               │
          │         ┌─────┘
          ▼         ▼
    ┌───────────┐
    │  review   │ (1:1 with casino)
    └───────────┘

    ┌───────────────┐
    │ paymentMethod │◄── casino (many-to-many)
    └───────────────┘
```

---

## 4. URL Routing Map

| Route | Type | Source | Description |
|-------|------|--------|-------------|
| `/` | SSG | hardcoded + queries | Homepage |
| `/casinos` | ISR | index query | Casino listing with filters |
| `/casinos/[slug]` | SSG | `casino` document | Casino detail page |
| `/bonuses` | ISR | index query | Bonus listing |
| `/bonuses/[slug]` | SSG | `bonus` document | Bonus detail |
| `/reviews/[slug]` | SSG | `review` document | Full review (linked from casino) |
| `/countries` | SSG | index query | Country listing |
| `/countries/[code]` | SSG | `country` document | Country page + casinos accepting |
| `/payment-methods` | SSG | index query | Payment methods listing |
| `/payment-methods/[slug]` | SSG | `paymentMethod` document | Method detail + casinos |
| `/blog` | ISR | index query | Blog listing |
| `/blog/[slug]` | SSG | `blogPost` document | Blog post |
| `/go/[slug]` | Edge | casino lookup | Affiliate redirect |
| `/[...slug]` | SSG | `page` document | Generic pages (about, terms, etc.) |
| `/sitemap.xml` | Dynamic | all documents | XML sitemap |

**Revalidation strategy:**
- SSG pages: Rebuilt on deploy OR via webhook (`/api/revalidate`)
- ISR pages: `revalidate: 3600` (1 hour) + on-demand revalidation
- Edge routes: No caching, real-time

---

## 5. Indexing Strategy

### 5.1 How Indexes Work

Index pages (`/casinos`, `/bonuses`, etc.) need:
1. **Filtering**: by country, payment method, bonus type, etc.
2. **Sorting**: by rating, newest, name
3. **Pagination**: cursor or offset-based

**Approach: Server-side filtering with URL params**

```
/casinos?country=us&payment=bitcoin&sort=rating&page=2
```

### 5.2 Implementation

```tsx
// app/(content)/casinos/page.tsx
import { getCasinos } from '@/lib/sanity/queries'

type SearchParams = {
  country?: string
  payment?: string
  sort?: 'rating' | 'newest' | 'name'
  page?: string
}

export default async function CasinosIndex({
  searchParams
}: {
  searchParams: SearchParams
}) {
  const filters = {
    country: searchParams.country,
    payment: searchParams.payment,
  }
  const sort = searchParams.sort || 'rating'
  const page = parseInt(searchParams.page || '1')

  const { casinos, total } = await getCasinos({ filters, sort, page, perPage: 20 })

  return (
    <IndexPage
      items={casinos}
      total={total}
      filters={filters}
      currentSort={sort}
      currentPage={page}
    />
  )
}

export const revalidate = 3600 // ISR: 1 hour
```

### 5.3 GROQ Query with Filters

```ts
// lib/sanity/queries.ts
export async function getCasinos({ filters, sort, page, perPage }) {
  const start = (page - 1) * perPage
  const end = start + perPage

  // Build filter conditions
  const conditions = [`_type == "casino"`, `!(_id in path("drafts.**"))`]

  if (filters.country) {
    conditions.push(`"${filters.country}" in countries[]->code`)
  }
  if (filters.payment) {
    conditions.push(`"${filters.payment}" in paymentMethods[]->slug.current`)
  }

  const filter = conditions.join(' && ')

  const sortMap = {
    rating: 'rating.overall desc',
    newest: 'publishedAt desc',
    name: 'name asc',
  }

  const query = groq`{
    "casinos": *[${filter}] | order(${sortMap[sort]}) [${start}...${end}] {
      _id, name, slug, logo, rating, minDeposit,
      "bonusCount": count(*[_type == "bonus" && references(^._id)])
    },
    "total": count(*[${filter}])
  }`

  return client.fetch(query)
}
```

### 5.4 Filter UI Component

Filters update URL params → triggers server refetch → no client JS needed for core functionality.

```tsx
// components/blocks/IndexFilters.tsx
'use client'
import { useRouter, useSearchParams } from 'next/navigation'

export function IndexFilters({ countries, payments }) {
  const router = useRouter()
  const params = useSearchParams()

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(params)
    if (value) newParams.set(key, value)
    else newParams.delete(key)
    newParams.delete('page') // Reset pagination
    router.push(`?${newParams.toString()}`)
  }

  return (/* Filter dropdowns */)
}
```

---

## 6. Format Variant Strategy

**Problem**: Same content (e.g., casino data) needs different presentations:
- Default card layout
- Comparison table layout
- Minimal/fast landing page
- Different themes per geo/brand

**Solution**: Component-level variants selected by config

### 6.1 Variant Registry

```ts
// components/formats/index.ts
import * as defaultFormat from './default'
import * as minimalFormat from './minimal'
import * as comparisonFormat from './comparison'

export const formats = {
  default: defaultFormat,
  minimal: minimalFormat,
  comparison: comparisonFormat,
} as const

export type FormatKey = keyof typeof formats
```

### 6.2 Format Structure

Each format exports the same component interface:

```ts
// components/formats/default/index.ts
export { CasinoCard } from './CasinoCard'
export { CasinoList } from './CasinoList'
export { BonusCard } from './BonusCard'
export { PageLayout } from './PageLayout'

// components/formats/comparison/index.ts
export { CasinoCard } from './CasinoCard'      // Table row version
export { CasinoList } from './CasinoList'      // Full table
export { BonusCard } from './BonusCard'
export { PageLayout } from './PageLayout'      // Wider layout
```

### 6.3 Using Variants

```tsx
// app/(content)/casinos/page.tsx
import { formats, FormatKey } from '@/components/formats'

export default async function CasinosIndex({ searchParams }) {
  const formatKey: FormatKey = (searchParams.format as FormatKey) || 'default'
  const { CasinoList, PageLayout } = formats[formatKey]

  const { casinos } = await getCasinos(/* ... */)

  return (
    <PageLayout>
      <CasinoList casinos={casinos} />
    </PageLayout>
  )
}
```

### 6.4 Site-Wide Variant (for white-label)

```ts
// lib/config.ts
export const siteConfig = {
  format: (process.env.SITE_FORMAT || 'default') as FormatKey,
  // ... other site config
}

// Usage in components
import { siteConfig } from '@/lib/config'
import { formats } from '@/components/formats'

const { CasinoCard } = formats[siteConfig.format]
```

### 6.5 Per-Page Variant (from Sanity)

For pages that specify their own template:

```tsx
// app/[...slug]/page.tsx
export default async function GenericPage({ params }) {
  const page = await getPage(params.slug.join('/'))
  const { PageLayout } = formats[page.template || 'default']

  return (
    <PageLayout>
      <PortableText value={page.blocks} />
    </PageLayout>
  )
}
```

---

## 7. Build Checklist

### Phase 0: Setup (Day 1)
- [ ] Initialize Next.js project
- [ ] Install and configure Sanity
- [ ] Set up Tailwind CSS
- [ ] Configure TypeScript strict mode
- [ ] Set up environment variables
- [ ] Create basic folder structure
- [ ] Deploy empty shell to Vercel

### Phase 1: MVP Content (Week 1)
- [ ] **Sanity schemas**: casino, bonus, country (minimal fields)
- [ ] **Sanity Studio**: Basic studio with these 3 types
- [ ] **Seed data**: 5 casinos, 10 bonuses, 5 countries manually
- [ ] **Pages**:
  - [ ] `/casinos` index (no filters yet)
  - [ ] `/casinos/[slug]` detail
  - [ ] `/bonuses` index
  - [ ] `/bonuses/[slug]` detail
- [ ] **Components**: CasinoCard, BonusCard, basic layout
- [ ] **Affiliate redirect**: `/go/[slug]` with basic redirect (no logging)

### Phase 2: SEO Foundation (Week 2)
- [ ] `generateMetadata` for all pages
- [ ] JSON-LD schemas (Organization, Casino, Review)
- [ ] `sitemap.ts` dynamic generation
- [ ] `robots.txt`
- [ ] Canonical URLs
- [ ] Open Graph images

### Phase 3: Indexing & Filters (Week 2-3)
- [ ] URL-based filtering on `/casinos`
- [ ] Sorting (rating, newest)
- [ ] Pagination
- [ ] Filter UI components
- [ ] Apply same pattern to `/bonuses`

### Phase 4: Remaining Content Types (Week 3)
- [ ] Country pages with casino listings
- [ ] Payment method schema + pages
- [ ] Review schema + pages
- [ ] Blog schema + pages
- [ ] Generic page schema (for about, terms, etc.)

### Phase 5: Format Variants (Week 4)
- [ ] Extract current UI into `default` format
- [ ] Create `comparison` format (table layout)
- [ ] Wire up format switching
- [ ] Test with URL param `?format=comparison`

### Phase 6: Affiliate System (Week 4-5)
- [ ] Geo-specific affiliate links in Sanity
- [ ] Click logging endpoint (simple, file/console first)
- [ ] `/go/[slug]` with geo detection (IP-based)
- [ ] Add PostgreSQL for click storage (or Vercel Postgres)

### Phase 7: Polish (Week 5+)
- [ ] Revalidation webhook from Sanity
- [ ] Image optimization
- [ ] Loading states / skeletons
- [ ] Error boundaries
- [ ] 404 pages
- [ ] Analytics integration

### Phase 8: Scale Prep (Later)
- [ ] Redis/KV caching for heavy queries
- [ ] ISR tuning
- [ ] hreflang for multi-language
- [ ] A/B testing infrastructure

---

## 8. Setup Commands

### 8.1 Initialize Next.js

```bash
# Create Next.js app with TypeScript, Tailwind, App Router
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
```

### 8.2 Install Sanity

```bash
# Install Sanity dependencies
npm install next-sanity @sanity/image-url @sanity/vision @portabletext/react

# Initialize Sanity in the project (creates /sanity folder)
npm create sanity@latest -- --template clean --create-project "DS Web" --dataset production --output-path ./sanity
```

When prompted:
- Project name: `ds-web` (or your preference)
- Use TypeScript: Yes
- Package manager: npm

### 8.3 Additional Dependencies

```bash
# Utilities
npm install groq zod

# UI (optional but recommended)
npm install clsx tailwind-merge lucide-react

# Dev tools
npm install -D @types/node
```

### 8.4 Environment Variables

Create `.env.local`:

```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN="your-api-token"  # For server-side, create in sanity.io/manage

# Site
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
SITE_FORMAT="default"

# Revalidation (generate a random string)
REVALIDATION_SECRET="your-random-secret-here"
```

Get your Sanity project ID from the output of `npm create sanity` or from [sanity.io/manage](https://sanity.io/manage).

### 8.5 Configure Sanity Client

```ts
// lib/sanity/client.ts
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})
```

### 8.6 Embed Sanity Studio (Optional)

To access Studio at `/studio`:

```tsx
// app/studio/[[...tool]]/page.tsx
'use client'
import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity/sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

```ts
// next.config.js - add this to avoid issues
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  // Required for Sanity Studio
  experimental: {
    taint: true,
  },
}

module.exports = nextConfig
```

### 8.7 Verify Setup

```bash
# Run development server
npm run dev

# In another terminal, run Sanity Studio (if not embedded)
cd sanity && npm run dev
```

Visit:
- `http://localhost:3000` — Next.js app
- `http://localhost:3000/studio` — Sanity Studio (if embedded)
- `http://localhost:3333` — Sanity Studio (if separate)

---

## 9. Key Code Snippets

### 9.1 Basic Sanity Schema (Casino)

```ts
// sanity/schemas/documents/casino.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'casino',
  title: 'Casino',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'object',
      fields: [
        { name: 'overall', type: 'number', validation: (r) => r.min(0).max(5) },
        { name: 'games', type: 'number', validation: (r) => r.min(0).max(5) },
        { name: 'support', type: 'number', validation: (r) => r.min(0).max(5) },
        { name: 'payout', type: 'number', validation: (r) => r.min(0).max(5) },
      ],
    }),
    defineField({
      name: 'countries',
      title: 'Accepted Countries',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'country' }] }],
    }),
    defineField({
      name: 'affiliateUrl',
      title: 'Affiliate URL',
      type: 'url',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'name', media: 'logo' },
  },
})
```

### 9.2 Affiliate Redirect Route

```ts
// app/go/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/sanity/client'
import { groq } from 'next-sanity'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const casino = await client.fetch(
    groq`*[_type == "casino" && slug.current == $slug][0]{ affiliateUrl }`,
    { slug: params.slug }
  )

  if (!casino?.affiliateUrl) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // TODO: Log click to database
  // await logClick({ slug: params.slug, ip: request.ip, userAgent: request.headers.get('user-agent') })

  return NextResponse.redirect(casino.affiliateUrl)
}
```

### 9.3 generateMetadata Helper

```ts
// lib/seo/metadata.ts
import { Metadata } from 'next'

type SEOInput = {
  title: string
  description: string
  slug: string
  ogImage?: string
  noIndex?: boolean
}

export function generatePageMetadata({
  title,
  description,
  slug,
  ogImage,
  noIndex,
}: SEOInput): Metadata {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/${slug}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  }
}
```

### 9.4 Revalidation Webhook

```ts
// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  const body = await request.json()
  const { _type, slug } = body

  // Revalidate specific paths based on content type
  switch (_type) {
    case 'casino':
      revalidatePath('/casinos')
      revalidatePath(`/casinos/${slug?.current}`)
      break
    case 'bonus':
      revalidatePath('/bonuses')
      revalidatePath(`/bonuses/${slug?.current}`)
      break
    // Add other types...
  }

  return NextResponse.json({ revalidated: true })
}
```

---

## Quick Reference

| Task | Command/Location |
|------|------------------|
| Run dev server | `npm run dev` |
| Run Sanity Studio | Visit `/studio` or `cd sanity && npm run dev` |
| Add new content type | Create schema in `sanity/schemas/documents/` |
| Add new page type | Create folder in `app/(content)/` |
| Add new format variant | Create folder in `components/formats/` |
| Deploy | Push to GitHub → Vercel auto-deploys |
| Manual revalidate | `curl -X POST "https://your-site.com/api/revalidate?secret=xxx"` |
| Check Sanity data | Use Vision plugin in Studio or GROQ playground |
