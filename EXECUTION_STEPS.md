# Execution Plan — Casino Affiliate Website

> Step-by-step build plan. Each phase has clear deliverables and dependencies.

---

## 🎯 KEY PILLARS — The Three Non-Negotiables

Every implementation decision must serve these three pillars:

| Pillar | Meaning | Violation Example |
|--------|---------|-------------------|
| **MODULARITY** | Everything is composable and self-contained | Hardcoding casino data in a component |
| **TESTABILITY** | Every feature has clear pass/fail criteria | "It looks about right" |
| **EASY CONTENT** | New pages/content require no code changes | Developer needed to add a blog post |

### What Good Modularity Looks Like

```
Adding a new CASINO:
  → Add in Sanity Studio (2 min)
  → Done. Appears on site automatically.

Adding a new PAGE (e.g., /best-crypto-casinos):
  → Create page in Sanity (5 min)
  → Add blocks: Hero, CasinoList (filtered), CTA
  → Done. No code. No deploy.

Adding a new CONTENT TYPE (e.g., "Game Provider"):
  → Create Sanity schema (15 min)
  → Create query function (5 min)
  → Create route + page component (10 min)
  → Follows exact same pattern as Casino, Bonus, etc.

Adding a new FORMAT VARIANT:
  → Copy default/ folder to new-format/
  → Modify components
  → Register in formats/index.ts
  → Switch via env var or URL param
```

### Modularity Anti-Patterns (NEVER DO)

| Anti-Pattern | Why It's Bad | Do This Instead |
|--------------|--------------|-----------------|
| Hardcoded content in components | Requires code change to edit | Fetch from Sanity |
| Page-specific components | Can't reuse | Generic + configurable |
| Inline styles per page | Inconsistent, hard to change | Design tokens + Tailwind |
| Conditionals for specific casinos | Breaks when content changes | Data-driven rendering |
| Copy-paste for new pages | Maintenance nightmare | Shared route pattern |

---

## Philosophy

1. **Vertical slices**: Build one complete feature end-to-end before starting the next
2. **Content-first**: Get real content flowing before polishing UI
3. **Deploy early**: Have a live URL from day 1, deploy every phase
4. **No premature abstraction**: Build concrete, then extract patterns
5. **Gate on tests**: Never proceed to next phase until all milestone tests pass
6. **Modularity first**: If it can't be reused or edited without code, redesign it

---

## ⚠️ CRITICAL: Milestone Testing Rule

**DO NOT proceed to Phase N+1 until ALL Phase N tests pass AND all previous phase tests still pass.**

### Before Moving to Next Phase

```bash
# 1. Build must succeed
npm run build

# 2. Run milestone tests for current phase
# (manual verification checklist below)

# 3. Verify all previous milestones still work (regression)
# Re-run critical tests from all completed phases

# 4. Deploy to preview/staging
# Verify in actual browser, not just dev server

# 5. Get explicit sign-off before proceeding
```

### Test Failure Protocol

If a test fails:
1. **STOP** — Do not proceed to next phase
2. **FIX** — Address the failing test
3. **RETEST** — Run all tests again
4. **DOCUMENT** — Note what broke and why

### Regression Testing

Each phase builds on previous phases. When testing Phase N, also verify:

| If You're On | Also Retest |
|--------------|-------------|
| Phase 1 | Phase 0 |
| Phase 2 | Phase 0, 1 |
| Phase 3 | Phase 0, 1, 2 |
| Phase 4 | Phase 0, 1, 2, 3 |
| Phase 5+ | All previous phases |

### Local Testing Commands

**Always test locally before marking a phase complete.**

```bash
# Quick build test (run after every change)
npm run build

# Start local server for manual testing
npm run dev
# → http://localhost:3000

# Production build + serve (before phase completion)
npm run build && npm run start
# → http://localhost:3000 (production mode)

# Sanity Studio (if running separately)
cd sanity && npm run dev
# → http://localhost:3333
```

**Smoke Test Script (copy-paste this)**

```bash
# Run after npm run start
echo "=== Smoke Test ==="
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 && echo " ✓ Homepage"
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/casinos && echo " ✓ /casinos"
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/sitemap.xml && echo " ✓ Sitemap"
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/robots.txt && echo " ✓ Robots"
echo "=== Done ==="
```

Expected output:
```
=== Smoke Test ===
200 ✓ Homepage
200 ✓ /casinos
200 ✓ Sitemap
200 ✓ Robots
=== Done ===
```

### Modularity Validation (Every Phase)

**Run these checks at the end of EVERY phase:**

| ID | Check | How to Verify | Pass Criteria |
|----|-------|---------------|---------------|
| M.1 | New content without code | Add item in Sanity | Appears on site without deploy |
| M.2 | Edit content without code | Edit item in Sanity | Changes appear on site |
| M.3 | Components are reusable | Review component props | No hardcoded values, accepts data via props |
| M.4 | No page-specific logic | Review page files | Pages only fetch + render components |
| M.5 | Patterns are consistent | Compare to previous content type | Same structure: schema → query → route |
| M.6 | Config over code | Check for hardcoded strings | URLs, labels, etc. come from Sanity or config |

**If any modularity check fails:**
1. STOP — Do not proceed
2. Refactor to follow modular pattern
3. Re-run all tests

### Adding New Content Type Checklist

When adding any new content type (Casino, Bonus, Country, etc.), verify:

```
[ ] Sanity schema created in sanity/schemas/documents/
[ ] Schema registered in sanity/schemas/index.ts
[ ] Query functions in lib/sanity/queries/[type].ts
[ ] TypeScript types defined
[ ] Index page: app/[type]/page.tsx
[ ] Detail page: app/[type]/[slug]/page.tsx
[ ] Card component: components/[Type]Card.tsx
[ ] Detail component: components/[Type]Detail.tsx
[ ] SEO metadata: generateMetadata in both pages
[ ] Added to sitemap.ts
[ ] Pattern matches existing content types exactly
```

**Time to add new content type: ~30 minutes**
If it takes longer, the pattern isn't modular enough.

---

## Monetization Model

**How you make money**: Affiliate commissions from casino signups.

```
User reads content → Clicks "Play Now" / "Claim Bonus"
    → Redirects via /go/[casino-slug]
    → Lands on casino with your tracking ID
    → Signs up + deposits
    → You earn commission (CPA or RevShare)
```

### Commission Types

| Model | How It Works | Typical Rate |
|-------|--------------|--------------|
| **CPA** (Cost Per Acquisition) | Flat fee per depositing player | $50-$200 per player |
| **RevShare** (Revenue Share) | % of player's losses to casino | 25-45% lifetime |
| **Hybrid** | CPA + smaller RevShare | $50 + 20% |

### What Matters for Revenue

1. **Traffic** — More visitors = more clicks
2. **Click-through rate (CTR)** — Compelling CTAs, good placement
3. **Conversion rate** — Quality traffic that actually deposits
4. **Player value** — High-value players = more RevShare

### Key Metrics to Track

| Metric | What It Tells You |
|--------|-------------------|
| Clicks per page | Which content drives action |
| CTR by casino | Which casinos your audience prefers |
| Clicks by country | Where your traffic comes from (affects which programs to join) |
| Conversion rate | Quality of traffic (get from affiliate dashboard) |

### No User Payments

- No subscriptions
- No paywalls
- No user accounts needed
- No payment processing on your site
- All transactions happen on casino sites

**"Payment Methods" in content** = How users deposit/withdraw at casinos (Visa, PayPal, Bitcoin) — informational content, not your payment system.

---

## Modular Architecture — How to Add Things

### Adding a New Casino (Content Editor — No Code)

```
Time: 2 minutes

1. Open Sanity Studio
2. Click "Casino" → "Create new"
3. Fill in: name, slug, logo, rating, description, affiliate URL
4. Click "Publish"
5. Done — casino appears on /casinos and gets its own /casinos/[slug] page
```

### Adding a New Page (Content Editor — No Code)

```
Time: 5 minutes

1. Open Sanity Studio
2. Click "Page" → "Create new"
3. Set title and slug (e.g., "Best Bitcoin Casinos" → /best-bitcoin-casinos)
4. Add blocks:
   - Hero block (title, subtitle, image)
   - CasinoList block (filter: payment method = Bitcoin)
   - RichText block (your content)
   - CTA block (affiliate link)
5. Click "Publish"
6. Done — page is live at /best-bitcoin-casinos, no code, no deploy
```

### Adding a New Content Type (Developer — 30 min)

```
Example: Adding "Game Provider" (e.g., NetEnt, Microgaming)

1. CREATE SCHEMA (5 min)
   sanity/schemas/documents/gameProvider.ts
   - name, slug, logo, description, founded, games count

2. REGISTER SCHEMA (1 min)
   sanity/schemas/index.ts
   - Add to schemaTypes array

3. CREATE QUERIES (5 min)
   lib/sanity/queries/gameProvider.ts
   - getGameProviders()
   - getGameProviderBySlug()

4. CREATE ROUTES (10 min)
   app/game-providers/page.tsx          # Index
   app/game-providers/[slug]/page.tsx   # Detail

5. CREATE COMPONENTS (10 min)
   components/GameProviderCard.tsx
   components/GameProviderDetail.tsx

6. UPDATE SITEMAP (2 min)
   app/sitemap.ts — add game providers query

7. TEST
   - Add 2 game providers in Sanity
   - Verify /game-providers loads
   - Verify /game-providers/[slug] loads
   - Verify appears in sitemap

Pattern is IDENTICAL to Casino, Bonus, Country, etc.
```

### Adding a New Block Type (Developer — 15 min)

```
Example: Adding "Testimonial" block

1. CREATE SCHEMA (5 min)
   sanity/schemas/objects/testimonialBlock.ts
   - quote, author, avatar, casino reference

2. REGISTER (1 min)
   sanity/schemas/index.ts

3. CREATE COMPONENT (8 min)
   components/blocks/Testimonial.tsx

4. REGISTER IN RENDERER (1 min)
   components/blocks/index.tsx — add to switch/map

Now editors can add Testimonial blocks to any page.
```

### Adding a New Format Variant (Developer — 1-2 hours)

```
Example: Adding "dark" theme

1. COPY DEFAULT (5 min)
   cp -r components/formats/default components/formats/dark

2. MODIFY COMPONENTS (1-2 hours)
   - Update colors, styles in each component
   - Keep same props interface

3. REGISTER (1 min)
   components/formats/index.ts
   - Add: dark: () => import('./dark')

4. TEST
   - Set SITE_FORMAT=dark, rebuild
   - Verify all pages work

Entire site now has dark theme option.
```

### The Golden Rule

> **If you need to write code to add content, the architecture is broken.**

Content operations (add casino, add page, edit bonus) = Sanity only
Feature additions (new content type, new block) = Follow established pattern

---

## Reference: ephpp.ca Component Mapping

What they have → What you'll build:

| ephpp.ca Pattern | Your Component | Phase |
|------------------|----------------|-------|
| Fixed header + logo + nav | `Header.tsx` | 2 |
| Mobile hamburger menu | `MobileMenu.tsx` | 2 |
| Hero with title/image | `blocks/Hero.tsx` | 8 |
| Casino listing cards | `CasinoCard.tsx` | 1 |
| Comparison tables | `ComparisonTable.tsx` | 8 |
| Pros/cons with ✓/✗ | `ProsCons.tsx` | 2 |
| Colored info boxes | `InfoBox.tsx` | 8 |
| Numbered step lists | `NumberedSteps.tsx` | 8 |
| Gold CTA buttons | `ui/Button.tsx` | 2 |
| FAQ accordions | `blocks/FAQ.tsx` | 8 |
| Footer with links | `Footer.tsx` | 2 |

### Design Tokens (from ephpp.ca)

```ts
// tailwind.config.ts colors
colors: {
  primary: {
    DEFAULT: '#C92B3A',  // Red - main brand
    dark: '#A12330',
  },
  accent: {
    DEFAULT: '#F1B64E',  // Gold - CTAs
    dark: '#D9A043',
  },
  muted: {
    DEFAULT: '#F5F5F5',  // Light gray - backgrounds
    dark: '#E5E5E5',
  },
  success: '#22C55E',    // Green - checkmarks
  danger: '#EF4444',     // Red - X marks
}
```

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Sanity learning curve | Start with minimal schemas, add fields incrementally |
| Over-engineering early | No abstractions until you have 3+ concrete examples |
| SEO mistakes | Test with Google Search Console from Phase 5 |
| Slow pages | Check Lighthouse after every phase, fix immediately |
| Affiliate link issues | Test `/go/` redirects manually before launch |
| Content bottleneck | Use AI to generate draft content, then edit |

---

## Quick Wins (Do These First Each Phase)

Each phase has one thing that proves it works:

| Phase | Quick Win |
|-------|-----------|
| 0 | See "Hello World" on Vercel URL |
| 1 | See casino from Sanity on `/casinos` |
| 2 | Site looks professional on mobile |
| 3 | Bonus shows linked casino name |
| 4 | `/go/test` redirects correctly |
| 5 | Google Rich Results Test passes |
| 6 | Filter URL updates listing |
| 7 | Country page shows filtered casinos |
| 8 | New page created in Sanity without code |
| 9 | `?format=comparison` changes layout |
| 10 | Lighthouse > 90, no console errors |

---

## Phase 0: Foundation (Day 1)

**Goal**: Empty Next.js app deployed to Vercel with Sanity connected.

### Steps

```bash
# 0.1 — Initialize Next.js
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"

# 0.2 — Install core dependencies
npm install next-sanity @sanity/image-url @portabletext/react groq
npm install clsx tailwind-merge

# 0.3 — Initialize Sanity (run in project root)
npm create sanity@latest -- --template clean --create-project "Casino Affiliate" --dataset production --output-path ./sanity

# 0.4 — Create environment file
cat > .env.local << 'EOF'
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
EOF
```

### Files to Create

```
lib/
└── sanity/
    ├── client.ts       # Sanity client configuration
    └── image.ts        # Image URL builder
```

**client.ts**:
```ts
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})
```

### Milestone Tests — Phase 0

**All must pass before proceeding to Phase 1.**

| ID | Test | Command / Action | Pass Criteria |
|----|------|------------------|---------------|
| 0.1 | Build succeeds | `npm run build` | Exit code 0, no errors |
| 0.2 | Dev server runs | `npm run dev` | Server starts on localhost:3000 |
| 0.3 | Homepage loads | Visit `http://localhost:3000` | Page renders (any content) |
| 0.4 | No console errors | Browser DevTools → Console | Zero errors (warnings OK) |
| 0.5 | Sanity client connects | Add test query in page.tsx | No connection errors |
| 0.6 | Sanity Studio loads | Visit `/studio` or `localhost:3333` | Studio UI renders |
| 0.7 | Production deploy | Push to GitHub | Vercel builds successfully |
| 0.8 | Live URL works | Visit Vercel URL | Page loads, no 500 errors |

```bash
# Quick test script for Phase 0
npm run build && echo "✓ 0.1 Build" || echo "✗ 0.1 Build FAILED"
```

### Sign-off Checklist

```
Phase 0 Complete:
[ ] All 8 milestone tests pass
[ ] Vercel deployment URL: ________________
[ ] Sanity project ID: ________________
[ ] Ready for Phase 1: YES / NO
```

---

## Phase 1: First Content Type — Casino (Days 2-3)

**Goal**: One casino visible on the site, editable in Sanity.

### Why Casino First?
Casino is the core entity. Everything else (bonuses, reviews, countries) relates to it. Get this right first.

### Steps

#### 1.1 — Create Sanity Schema

```
sanity/schemas/
├── index.ts              # Schema registry
└── documents/
    └── casino.ts         # Casino document type
```

**Minimal casino schema** (start simple, expand later):
- name (string)
- slug (slug)
- logo (image)
- description (text)
- rating (number, 0-5)
- affiliateUrl (url)
- featured (boolean)

#### 1.2 — Add Test Data in Sanity Studio

Create 3 casinos manually:
1. "Jackpot City" — rating 4.5, featured
2. "Spin Casino" — rating 4.2
3. "Royal Vegas" — rating 4.0

Use placeholder logos (upload any square image).

#### 1.3 — Create Query Function

```
lib/sanity/
└── queries/
    └── casino.ts         # getCasinos(), getCasinoBySlug()
```

#### 1.4 — Create Casino List Page

```
app/
├── page.tsx              # Homepage (temporary: just list casinos)
└── casinos/
    ├── page.tsx          # /casinos
    └── [slug]/
        └── page.tsx      # /casinos/[slug]
```

#### 1.5 — Create Basic Components

```
components/
├── CasinoCard.tsx        # Card for listing
└── CasinoDetail.tsx      # Full casino view
```

### Milestone Tests — Phase 1

**All must pass before proceeding to Phase 2. Also re-run Phase 0 tests.**

| ID | Test | Action | Pass Criteria |
|----|------|--------|---------------|
| 1.1 | Build succeeds | `npm run build` | Exit code 0 |
| 1.2 | Schema registered | Open Sanity Studio | "Casino" appears in document types |
| 1.3 | Test data exists | Sanity Studio → Casinos | 3 casinos visible |
| 1.4 | Index page loads | Visit `/casinos` | Page renders without error |
| 1.5 | Data displays | Visit `/casinos` | All 3 casino names visible |
| 1.6 | Detail page loads | Visit `/casinos/jackpot-city` | Page renders without error |
| 1.7 | Detail shows data | Visit `/casinos/jackpot-city` | Name, rating, description visible |
| 1.8 | 404 handling | Visit `/casinos/nonexistent` | Returns 404 or redirects (no crash) |
| 1.9 | Content sync | Edit casino in Sanity, refresh page | Change appears |
| 1.10 | No console errors | Browser DevTools | Zero errors |

**Regression: Re-run Phase 0 tests (0.1-0.8)**

### Sign-off Checklist

```
Phase 1 Complete:
[ ] All 10 Phase 1 milestone tests pass
[ ] All 8 Phase 0 tests still pass (regression)
[ ] Test casino slugs: jackpot-city, spin-casino, royal-vegas
[ ] Ready for Phase 2: YES / NO
```

---

## Phase 2: Styling & Layout (Days 4-5)

**Goal**: Site looks like a real affiliate site, not a prototype.

### Reference: ephpp.ca Patterns
- White background, clean typography
- Red/gold accent colors
- Card-based listings
- Fixed header with navigation
- Responsive mobile menu

### Steps

#### 2.1 — Design Tokens

```
tailwind.config.ts — extend with:
- colors: primary (red), accent (gold), muted (gray)
- fonts: sans-serif stack
```

#### 2.2 — Layout Components

```
components/
├── layout/
│   ├── Header.tsx        # Logo + nav + mobile menu
│   ├── Footer.tsx        # Links + legal
│   ├── Container.tsx     # Max-width wrapper
│   └── MobileMenu.tsx    # Slide-out menu
```

#### 2.3 — Root Layout

```
app/
└── layout.tsx            # Wrap all pages with Header/Footer
```

#### 2.4 — UI Primitives

```
components/ui/
├── Button.tsx
├── Badge.tsx
├── Rating.tsx            # Star display
└── Card.tsx
```

#### 2.5 — Refine Casino Components

Update CasinoCard and CasinoDetail with proper styling:
- Logo + name + rating badge
- Short description
- CTA button ("Visit Casino")
- Pros/cons section (detail only)

### Milestone Tests — Phase 2

**All must pass before proceeding to Phase 3.**

| ID | Test | Action | Pass Criteria |
|----|------|--------|---------------|
| 2.1 | Build succeeds | `npm run build` | Exit code 0 |
| 2.2 | Header renders | Visit any page | Header visible with logo + nav |
| 2.3 | Footer renders | Visit any page | Footer visible at bottom |
| 2.4 | Mobile menu opens | Click hamburger (375px viewport) | Menu slides in |
| 2.5 | Mobile menu closes | Click outside or X | Menu closes |
| 2.6 | Nav links work | Click each nav link | Correct page loads |
| 2.7 | Mobile responsive | View `/casinos` at 375px | Cards stack, no horizontal scroll |
| 2.8 | Design tokens applied | Inspect CTA button | Uses accent color (gold) |
| 2.9 | Rating displays | View casino card | Star rating visible |
| 2.10 | CTA button present | View casino card | "Visit Casino" button visible |
| 2.11 | Lighthouse mobile | Run Lighthouse (mobile) | Performance > 70, no major issues |
| 2.12 | No console errors | Browser DevTools | Zero errors |

**Regression: Re-run Phase 0-1 tests**

### Sign-off Checklist

```
Phase 2 Complete:
[ ] All 12 Phase 2 milestone tests pass
[ ] All Phase 0-1 tests still pass (regression)
[ ] Mobile tested on real device or Chrome DevTools
[ ] Ready for Phase 3: YES / NO
```

---

## Phase 3: Bonus Content Type (Days 6-7)

**Goal**: Bonuses linked to casinos, separate listing page.

### Why Bonuses Second?
Bonuses are the money-makers. They reference casinos (first relationship).

### Steps

#### 3.1 — Bonus Schema

```
sanity/schemas/documents/
└── bonus.ts
```

Fields:
- title (string): "100% up to $500"
- slug (slug)
- casino (reference → casino)
- type (string): welcome | reload | freespins | no-deposit
- value (string): human-readable
- wageringRequirement (number)
- code (string, optional)
- description (portableText)

#### 3.2 — Add Test Data

Create 5-6 bonuses across your 3 casinos.

#### 3.3 — Query Functions

```
lib/sanity/queries/
└── bonus.ts              # getBonuses(), getBonusBySlug(), getBonusesByCasino()
```

#### 3.4 — Bonus Pages

```
app/bonuses/
├── page.tsx              # /bonuses (listing)
└── [slug]/
    └── page.tsx          # /bonuses/[slug] (detail)
```

#### 3.5 — Components

```
components/
├── BonusCard.tsx
├── BonusDetail.tsx
└── BonusTable.tsx        # For comparison view
```

#### 3.6 — Link Bonuses on Casino Page

Show related bonuses on `/casinos/[slug]`.

### Milestone Tests — Phase 3

**All must pass before proceeding to Phase 4.**

| ID | Test | Action | Pass Criteria |
|----|------|--------|---------------|
| 3.1 | Build succeeds | `npm run build` | Exit code 0 |
| 3.2 | Bonus schema exists | Sanity Studio | "Bonus" in document types |
| 3.3 | Test data exists | Sanity Studio → Bonuses | 5-6 bonuses visible |
| 3.4 | Bonuses linked | View bonus in Sanity | Casino reference populated |
| 3.5 | Index page loads | Visit `/bonuses` | Page renders without error |
| 3.6 | Index shows data | Visit `/bonuses` | All bonus titles visible |
| 3.7 | Detail page loads | Visit `/bonuses/[slug]` | Page renders without error |
| 3.8 | Detail shows casino | Visit bonus detail | Linked casino name visible |
| 3.9 | Casino shows bonuses | Visit `/casinos/jackpot-city` | Related bonuses section visible |
| 3.10 | Bonus card complete | View bonus card | Title, casino logo, CTA visible |
| 3.11 | 404 handling | Visit `/bonuses/nonexistent` | Returns 404 (no crash) |
| 3.12 | No console errors | Browser DevTools | Zero errors |

**Regression: Re-run Phase 0-2 tests**

### Sign-off Checklist

```
Phase 3 Complete:
[ ] All 12 Phase 3 milestone tests pass
[ ] All Phase 0-2 tests still pass (regression)
[ ] Bonus-to-casino relationship verified
[ ] Ready for Phase 4: YES / NO
```

---

## Phase 4: Affiliate Links (Days 8-9)

**Goal**: `/go/[slug]` redirects work with click tracking. **This is your revenue engine.**

### Why This Matters

Every click through `/go/` is a potential commission. Track everything.

```
User clicks CTA → /go/casino-slug → Log click → Redirect to casino
                                         ↓
                              You now have data:
                              - Which content converts
                              - Which casinos get clicks
                              - Where your traffic comes from
```

### Steps

#### 4.1 — Affiliate Redirect Route

```
app/go/[slug]/
└── route.ts              # Edge function: lookup + redirect
```

Logic:
1. Receive slug (casino slug)
2. Fetch casino's affiliateUrl from Sanity
3. **Log click with context** (critical for optimization)
4. 302 redirect to affiliate URL

```ts
// app/go/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/sanity/client'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const casino = await client.fetch(
    `*[_type == "casino" && slug.current == $slug][0]{ affiliateUrl }`,
    { slug: params.slug }
  )

  if (!casino?.affiliateUrl) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Log click (Phase 4: console, Phase 10: database)
  const clickData = {
    casino: params.slug,
    timestamp: new Date().toISOString(),
    referrer: request.headers.get('referer') || 'direct',
    country: request.geo?.country || 'unknown',
    page: new URL(request.headers.get('referer') || '').pathname || '/',
  }
  console.log('CLICK:', JSON.stringify(clickData))

  return NextResponse.redirect(casino.affiliateUrl)
}

export const runtime = 'edge' // Fast, runs globally
```

#### 4.2 — Update All CTAs

Replace direct affiliate URLs with `/go/casino-slug`:
- CasinoCard "Visit Casino" button
- CasinoDetail main CTA
- BonusCard "Claim Bonus" button
- Any inline links to casinos

**Never expose raw affiliate URLs** — always go through `/go/`.

#### 4.3 — Click Data Structure

Track what you'll need for optimization:

```ts
interface ClickEvent {
  // Identity
  casino: string          // Which casino
  timestamp: string       // When

  // Attribution
  referrer: string        // Full referrer URL
  page: string            // Which page they were on
  position?: string       // "hero" | "sidebar" | "comparison-table"

  // Geo (from Vercel Edge)
  country: string         // For geo-specific optimization
  region?: string

  // Device (optional, for later)
  userAgent?: string
  device?: 'mobile' | 'desktop' | 'tablet'
}
```

#### 4.4 — CTA Placement Strategy

High-converting placements (from affiliate industry):

| Placement | CTR | Notes |
|-----------|-----|-------|
| Above the fold hero | Highest | First thing users see |
| After pros/cons | High | User just evaluated |
| Sticky mobile footer | Medium-High | Always visible |
| In comparison table | Medium | Decision point |
| End of review | Medium | Finished reading |
| Sidebar (desktop) | Low | Often ignored |

#### 4.5 — Affiliate URL Structure

Your affiliate links from casinos will look like:
```
https://casino.com/?tracker=YOUR_ID&source=website
https://record.affiliateprogram.com/_ABC123/click
```

Store these in Sanity. **Never hardcode**.

### Milestone Tests — Phase 4

**All must pass before proceeding to Phase 5. THIS IS YOUR REVENUE — TEST THOROUGHLY.**

| ID | Test | Action | Pass Criteria |
|----|------|--------|---------------|
| 4.1 | Build succeeds | `npm run build` | Exit code 0 |
| 4.2 | Redirect works | Visit `/go/jackpot-city` | Redirects to affiliate URL |
| 4.3 | Redirect fast | Time the redirect | < 200ms (Edge runtime) |
| 4.4 | Click logged | Check server logs after click | Log entry with casino, timestamp |
| 4.5 | Referrer captured | Click from `/casinos` page | Log shows `/casinos` as referrer |
| 4.6 | Country captured | Check log entry | Country field present (may be "unknown" locally) |
| 4.7 | Invalid slug handled | Visit `/go/nonexistent` | Redirects to homepage (no error) |
| 4.8 | Casino CTA updated | View `/casinos/jackpot-city` | CTA links to `/go/jackpot-city` |
| 4.9 | Bonus CTA updated | View bonus detail | CTA links to `/go/[casino-slug]` |
| 4.10 | No raw affiliate URLs | Inspect page source | No direct casino affiliate URLs visible |
| 4.11 | Card CTAs work | Click "Visit Casino" on card | Redirects via `/go/` |
| 4.12 | No console errors | Browser DevTools | Zero errors |

**Regression: Re-run Phase 0-3 tests**

### Sign-off Checklist

```
Phase 4 Complete:
[ ] All 12 Phase 4 milestone tests pass
[ ] All Phase 0-3 tests still pass (regression)
[ ] Clicked each casino's /go/ link manually
[ ] Verified logs capture click data
[ ] Ready for Phase 5: YES / NO
```

---

## Phase 5: SEO Foundation (Days 10-12)

**Goal**: Every page has proper meta tags, schema.org, sitemap.

### Steps

#### 5.1 — SEO Object in Sanity

Add to casino and bonus schemas:
```ts
seo: {
  metaTitle: string
  metaDescription: string
  ogImage: image
}
```

#### 5.2 — Metadata Generation

```
lib/seo/
├── metadata.ts           # generateMetadata helper
└── schema.ts             # JSON-LD generators
```

#### 5.3 — Update All Pages

Add `generateMetadata` export to:
- `/casinos/page.tsx`
- `/casinos/[slug]/page.tsx`
- `/bonuses/page.tsx`
- `/bonuses/[slug]/page.tsx`

#### 5.4 — JSON-LD Schema

Add to casino detail:
- Organization schema
- Review schema (if has rating)
- Product schema (for the casino)

#### 5.5 — Sitemap

```
app/
└── sitemap.ts            # Dynamic sitemap generation
```

#### 5.6 — Robots.txt

```
app/
└── robots.ts             # Or static public/robots.txt
```

### Milestone Tests — Phase 5

**All must pass before proceeding to Phase 6.**

| ID | Test | Action | Pass Criteria |
|----|------|--------|---------------|
| 5.1 | Build succeeds | `npm run build` | Exit code 0 |
| 5.2 | Title tag unique | View source on `/casinos` vs `/bonuses` | Different `<title>` tags |
| 5.3 | Meta description | View source on casino detail | `<meta name="description">` present |
| 5.4 | OG title | View source | `<meta property="og:title">` present |
| 5.5 | OG image | View source on casino detail | `<meta property="og:image">` present |
| 5.6 | Canonical URL | View source | `<link rel="canonical">` present |
| 5.7 | Sitemap exists | Visit `/sitemap.xml` | Valid XML with URLs |
| 5.8 | Sitemap complete | Check `/sitemap.xml` | All casino + bonus URLs listed |
| 5.9 | Robots.txt exists | Visit `/robots.txt` | File loads with directives |
| 5.10 | JSON-LD present | View source on casino detail | `<script type="application/ld+json">` |
| 5.11 | Rich Results Test | Google Rich Results Test tool | No errors, schema detected |
| 5.12 | Social share preview | Facebook Sharing Debugger | Title + image + description show |
| 5.13 | No console errors | Browser DevTools | Zero errors |

**Regression: Re-run Phase 0-4 tests**

### Sign-off Checklist

```
Phase 5 Complete:
[ ] All 13 Phase 5 milestone tests pass
[ ] All Phase 0-4 tests still pass (regression)
[ ] Tested with: Google Rich Results Test, Facebook Debugger
[ ] Ready for Phase 6: YES / NO
```

---

## Phase 6: Index Filtering & Sorting (Days 13-15)

**Goal**: Filter casinos by criteria, sort by rating/name/newest.

### Steps

#### 6.1 — URL Parameter Handling

```
/casinos?sort=rating&type=featured
/bonuses?type=welcome&sort=value
```

#### 6.2 — Update Queries

Modify `getCasinos()` to accept filter/sort params.

#### 6.3 — Filter UI Component

```
components/
└── IndexFilters.tsx      # Dropdowns that update URL params
```

Client component that uses `useRouter` and `useSearchParams`.

#### 6.4 — Sorting Options

- Rating (high to low)
- Name (A-Z)
- Newest first
- Featured first

#### 6.5 — Pagination

Add `page` param, show 12 items per page.

### Milestone Tests — Phase 6

**All must pass before proceeding to Phase 7.**

| ID | Test | Action | Pass Criteria |
|----|------|--------|---------------|
| 6.1 | Build succeeds | `npm run build` | Exit code 0 |
| 6.2 | Sort by rating | Visit `/casinos?sort=rating` | Highest rated casino first |
| 6.3 | Sort by name | Visit `/casinos?sort=name` | Alphabetical order (A-Z) |
| 6.4 | Sort by newest | Visit `/casinos?sort=newest` | Most recent first |
| 6.5 | Filter UI renders | Visit `/casinos` | Sort dropdown visible |
| 6.6 | Filter updates URL | Select sort option | URL changes to include `?sort=` |
| 6.7 | Filter persists | Change sort, refresh page | Same sort applied |
| 6.8 | Back button works | Sort, navigate away, press back | Returns to filtered view |
| 6.9 | Pagination renders | Add 15+ casinos, visit `/casinos` | Page navigation visible |
| 6.10 | Page 2 works | Visit `/casinos?page=2` | Different casinos shown |
| 6.11 | Canonical correct | View source on `/casinos?sort=rating` | Canonical points to `/casinos` |
| 6.12 | Combined params | Visit `/casinos?sort=rating&page=2` | Both applied correctly |
| 6.13 | No console errors | Browser DevTools | Zero errors |

**Regression: Re-run Phase 0-5 tests**

### Sign-off Checklist

```
Phase 6 Complete:
[ ] All 13 Phase 6 milestone tests pass
[ ] All Phase 0-5 tests still pass (regression)
[ ] Tested sort + pagination combinations
[ ] Ready for Phase 7: YES / NO
```

---

## Phase 7: Additional Content Types (Days 16-20)

**Goal**: Countries, payment methods, blog posts, reviews.

### 7.1 — Country

Schema: name, code (ISO), flag, legalStatus, overview

Pages:
- `/countries` — list all
- `/countries/[code]` — country detail + casinos accepting

### 7.2 — Payment Method

Schema: name, slug, logo, type, description

Pages:
- `/payment-methods`
- `/payment-methods/[slug]` — method detail + casinos supporting

### 7.3 — Blog Post

Schema: title, slug, excerpt, body (portableText), coverImage, categories

Pages:
- `/blog`
- `/blog/[slug]`

### 7.4 — Review (1:1 with Casino)

Schema: casino (ref), headline, body, author, verdict, lastTested

Pages:
- `/reviews/[slug]` — accessed via casino detail

### 7.5 — Cross-Linking

- Casino detail shows: country restrictions, payment methods, review link
- Country page shows: casinos accepting
- Payment method page shows: casinos supporting

### Milestone Tests — Phase 7

**All must pass before proceeding to Phase 8.**

| ID | Test | Action | Pass Criteria |
|----|------|--------|---------------|
| 7.1 | Build succeeds | `npm run build` | Exit code 0 |
| **Country** |
| 7.2 | Schema exists | Sanity Studio | "Country" in document types |
| 7.3 | Index loads | Visit `/countries` | Page renders, countries listed |
| 7.4 | Detail loads | Visit `/countries/us` | Page renders with country data |
| 7.5 | Casinos shown | Visit `/countries/us` | Casinos accepting US players listed |
| **Payment Method** |
| 7.6 | Schema exists | Sanity Studio | "Payment Method" in document types |
| 7.7 | Index loads | Visit `/payment-methods` | Page renders |
| 7.8 | Detail loads | Visit `/payment-methods/bitcoin` | Page renders |
| 7.9 | Casinos shown | Visit payment method detail | Casinos supporting method listed |
| **Blog** |
| 7.10 | Schema exists | Sanity Studio | "Blog Post" in document types |
| 7.11 | Index loads | Visit `/blog` | Page renders |
| 7.12 | Post loads | Visit `/blog/[slug]` | Page renders with content |
| **Review** |
| 7.13 | Schema exists | Sanity Studio | "Review" in document types |
| 7.14 | Review loads | Visit `/reviews/[slug]` | Page renders with review |
| 7.15 | Casino links review | Visit casino detail | "Read Review" link works |
| **Cross-linking** |
| 7.16 | Casino → countries | Casino detail | Country restrictions shown |
| 7.17 | Casino → payments | Casino detail | Payment methods shown |
| 7.18 | SEO on all pages | Check new page types | Meta tags present |
| 7.19 | Sitemap updated | Visit `/sitemap.xml` | New URLs included |
| 7.20 | No console errors | Browser DevTools | Zero errors |

**Regression: Re-run Phase 0-6 tests**

### Sign-off Checklist

```
Phase 7 Complete:
[ ] All 20 Phase 7 milestone tests pass
[ ] All Phase 0-6 tests still pass (regression)
[ ] At least 2 items per new content type
[ ] Ready for Phase 8: YES / NO
```

---

## Phase 8: Content Blocks & Rich Pages (Days 21-25)

**Goal**: Flexible page builder for landing pages, comparison pages.

### Steps

#### 8.1 — Block Types in Sanity

```
sanity/schemas/objects/
├── heroBlock.ts
├── casinoListBlock.ts    # Configurable: featured, by country, etc.
├── comparisonTableBlock.ts
├── richTextBlock.ts
├── prosConsBlock.ts
├── ctaBlock.ts
├── faqBlock.ts
└── infoBoxBlock.ts
```

#### 8.2 — Generic Page Schema

```ts
// sanity/schemas/documents/page.ts
{
  title: string
  slug: slug
  blocks: array of block references
  seo: seo object
}
```

#### 8.3 — Block Renderer

```
components/blocks/
├── index.tsx             # Block type router
├── Hero.tsx
├── CasinoList.tsx
├── ComparisonTable.tsx
├── RichText.tsx
├── ProsCons.tsx
├── CTA.tsx
├── FAQ.tsx
└── InfoBox.tsx
```

#### 8.4 — Generic Page Route

```
app/[...slug]/
└── page.tsx              # Catch-all for pages from Sanity
```

#### 8.5 — Create Test Pages

In Sanity, create:
- `/about` — Hero + RichText + CTA
- `/best-casinos-canada` — Hero + CasinoList (filtered) + ComparisonTable

### Milestone Tests — Phase 8

**All must pass before proceeding to Phase 9.**

| ID | Test | Action | Pass Criteria |
|----|------|--------|---------------|
| 8.1 | Build succeeds | `npm run build` | Exit code 0 |
| **Block Types** |
| 8.2 | Hero block | Add Hero to test page | Renders with title + image |
| 8.3 | RichText block | Add RichText block | Renders formatted content |
| 8.4 | CasinoList block | Add CasinoList block | Renders casino cards |
| 8.5 | ComparisonTable | Add comparison block | Renders table with data |
| 8.6 | ProsCons block | Add pros/cons block | Renders ✓/✗ lists |
| 8.7 | CTA block | Add CTA block | Renders button with link |
| 8.8 | FAQ block | Add FAQ block | Renders expandable Q&A |
| 8.9 | InfoBox block | Add InfoBox block | Renders colored callout |
| **Page Builder** |
| 8.10 | Page schema | Sanity Studio | "Page" in document types |
| 8.11 | Create page | Create `/about` in Sanity | Page saves successfully |
| 8.12 | Page loads | Visit `/about` | Renders without error |
| 8.13 | Blocks render | Visit `/about` | All added blocks visible |
| 8.14 | Block reorder | Reorder blocks in Sanity | Order changes on site |
| 8.15 | No code needed | Create new page `/test` | Works without deployment |
| **Complex Page** |
| 8.16 | Landing page | Create `/best-casinos-canada` | Multi-block page works |
| 8.17 | CasinoList filter | Configure list to show featured | Only featured casinos shown |
| 8.18 | SEO on pages | Check `/about` source | Meta tags present |
| 8.19 | Sitemap updated | Check `/sitemap.xml` | New pages included |
| 8.20 | No console errors | Browser DevTools | Zero errors |

**Regression: Re-run Phase 0-7 tests**

### Sign-off Checklist

```
Phase 8 Complete:
[ ] All 20 Phase 8 milestone tests pass
[ ] All Phase 0-7 tests still pass (regression)
[ ] Created at least 2 pages using page builder
[ ] Ready for Phase 9: YES / NO
```

---

## Phase 9: Format Variants (Days 26-28)

**Goal**: Switch entire site appearance via config.

### Steps

#### 9.1 — Extract Current UI to `default` Format

```
components/formats/
└── default/
    ├── CasinoCard.tsx
    ├── CasinoList.tsx
    ├── BonusCard.tsx
    ├── Header.tsx
    └── index.ts          # Export all
```

#### 9.2 — Create `comparison` Format

Table-heavy layout:
- CasinoCard → table row
- CasinoList → full comparison table
- Different header style

#### 9.3 — Format Registry

```ts
// components/formats/index.ts
export const formats = {
  default: () => import('./default'),
  comparison: () => import('./comparison'),
}
```

#### 9.4 — Config-Based Selection

```ts
// lib/config.ts
export const siteConfig = {
  format: process.env.SITE_FORMAT || 'default',
}
```

#### 9.5 — Test

Deploy two versions:
- Main site: `SITE_FORMAT=default`
- Comparison site: `SITE_FORMAT=comparison`

### Milestone Tests — Phase 9

**All must pass before proceeding to Phase 10.**

| ID | Test | Action | Pass Criteria |
|----|------|--------|---------------|
| 9.1 | Build succeeds | `npm run build` | Exit code 0 |
| **Default Format** |
| 9.2 | Default loads | Visit `/casinos` | Card layout renders |
| 9.3 | Components work | Navigate site | All pages functional |
| **Comparison Format** |
| 9.4 | Format switch URL | Visit `/casinos?format=comparison` | Table layout renders |
| 9.5 | Table has data | View comparison format | Casino data in table rows |
| 9.6 | Table sortable | Click column header (if implemented) | Rows reorder |
| 9.7 | CTAs work | Click CTA in table | Redirects via `/go/` |
| **Environment Switch** |
| 9.8 | Env var works | Set `SITE_FORMAT=comparison`, rebuild | Entire site uses comparison |
| 9.9 | Default fallback | Unset `SITE_FORMAT` | Falls back to default |
| **Both Formats** |
| 9.10 | All pages work | Visit all main pages in both formats | No errors |
| 9.11 | Mobile works | Test both formats at 375px | Responsive layouts |
| 9.12 | SEO preserved | Check meta tags in both formats | Present and correct |
| 9.13 | No console errors | Test both formats | Zero errors |

**Regression: Re-run Phase 0-8 tests in BOTH formats**

### Sign-off Checklist

```
Phase 9 Complete:
[ ] All 13 Phase 9 milestone tests pass
[ ] All Phase 0-8 tests pass in default format
[ ] All Phase 0-8 tests pass in comparison format
[ ] Ready for Phase 10: YES / NO
```

---

## Phase 10: Production Hardening (Days 29-35)

**Goal**: Site is production-ready.

### 10.1 — Performance
- [ ] Lighthouse score > 90
- [ ] Images optimized (next/image + Sanity CDN)
- [ ] Fonts optimized (next/font)
- [ ] Bundle size analyzed

### 10.2 — Reliability
- [ ] Error boundaries on all pages
- [ ] 404 page styled
- [ ] 500 page styled
- [ ] Sanity webhook for revalidation
- [ ] Health check endpoint

### 10.3 — Analytics
- [ ] Google Analytics or Plausible
- [ ] Click tracking to database (Vercel Postgres)
- [ ] Basic dashboard for clicks

### 10.4 — Legal
- [ ] Privacy policy page
- [ ] Terms of service page
- [ ] Cookie consent (if needed)
- [ ] Responsible gambling notice

### 10.5 — Security
- [ ] Environment variables secured
- [ ] No API keys exposed client-side
- [ ] Rate limiting on `/go/` routes
- [ ] Input sanitization

### 10.6 — Monitoring
- [ ] Vercel Analytics enabled
- [ ] Error tracking (Sentry optional)
- [ ] Uptime monitoring

### Milestone Tests — Phase 10 (FINAL)

**All must pass before launch.**

| ID | Test | Action | Pass Criteria |
|----|------|--------|---------------|
| **Performance** |
| 10.1 | Lighthouse Performance | Run Lighthouse on homepage | Score > 90 |
| 10.2 | Lighthouse SEO | Run Lighthouse | Score > 90 |
| 10.3 | Lighthouse Accessibility | Run Lighthouse | Score > 85 |
| 10.4 | Lighthouse Best Practices | Run Lighthouse | Score > 90 |
| 10.5 | Mobile performance | Lighthouse mobile preset | Performance > 80 |
| 10.6 | Core Web Vitals | Check LCP, FID, CLS | All "Good" (green) |
| 10.7 | Images optimized | Inspect network tab | All images from Sanity CDN, WebP format |
| **Reliability** |
| 10.8 | 404 page | Visit `/nonexistent-page` | Styled 404 page, not default |
| 10.9 | Error boundary | Trigger error (test mode) | Graceful error page, no crash |
| 10.10 | Webhook works | Edit in Sanity | Site updates within 60s |
| 10.11 | Health endpoint | Visit `/api/health` | Returns 200 OK |
| **Analytics** |
| 10.12 | Analytics loads | Check network tab | Analytics script loads |
| 10.13 | Page views tracked | Visit pages, check dashboard | Views recorded |
| 10.14 | Clicks to database | Click affiliate link | Record in database |
| 10.15 | Click query works | Query click data | Returns recent clicks |
| **Legal** |
| 10.16 | Privacy policy | Visit `/privacy` | Page loads with content |
| 10.17 | Terms of service | Visit `/terms` | Page loads with content |
| 10.18 | Gambling notice | Check footer | Responsible gambling text present |
| 10.19 | Cookie consent | Visit site (EU IP) | Banner appears (if required) |
| **Security** |
| 10.20 | No exposed secrets | View page source | No API keys/tokens visible |
| 10.21 | Env vars server-only | Check client bundle | SANITY_API_TOKEN not in JS |
| 10.22 | Rate limiting | Spam `/go/` endpoint | Returns 429 after limit |
| 10.23 | XSS prevention | Test input fields | No script execution |
| **Monitoring** |
| 10.24 | Vercel Analytics | Check Vercel dashboard | Data flowing |
| 10.25 | Error tracking | Trigger test error | Appears in Sentry (if used) |
| **Full Regression** |
| 10.26 | Phase 0-9 regression | Run all previous tests | All pass |

### Sign-off Checklist — LAUNCH READINESS

```
Phase 10 Complete — Ready for Launch:
[ ] All 26 Phase 10 milestone tests pass
[ ] All Phase 0-9 tests pass (full regression)
[ ] Lighthouse scores: Perf ___ SEO ___ A11y ___ BP ___
[ ] Legal pages reviewed by human
[ ] Affiliate links tested (real redirects)
[ ] Analytics confirmed working
[ ] Monitoring alerts configured
[ ] Domain configured and SSL active
[ ] Ready for LAUNCH: YES / NO

Approved by: _________________ Date: _________
```

---

## Post-Launch Enhancements

### V1.1 — Geo Features
- [ ] IP-based country detection
- [ ] Geo-specific affiliate links
- [ ] Country-specific bonus filtering
- [ ] hreflang for multi-language (later)

### V1.2 — Advanced Affiliate
- [ ] A/B test different CTAs
- [ ] Click-through rate tracking
- [ ] Revenue attribution (if available)

### V1.3 — User Features
- [ ] Newsletter signup
- [ ] Saved/favorite casinos (localStorage)
- [ ] Comparison tool (select & compare)

### V1.4 — Content Expansion
- [ ] Game provider pages
- [ ] Software/game type pages
- [ ] Glossary/education section

---

## Time Estimate Summary

| Phase | Days | Cumulative |
|-------|------|------------|
| 0. Foundation | 1 | 1 |
| 1. Casino | 2 | 3 |
| 2. Styling | 2 | 5 |
| 3. Bonus | 2 | 7 |
| 4. Affiliate Links | 2 | 9 |
| 5. SEO | 3 | 12 |
| 6. Filtering | 3 | 15 |
| 7. More Content | 5 | 20 |
| 8. Content Blocks | 5 | 25 |
| 9. Format Variants | 3 | 28 |
| 10. Production | 7 | 35 |

**MVP (Phases 0-5)**: ~12 days — Functional affiliate site with casinos, bonuses, SEO
**V1 (Phases 0-10)**: ~35 days — Full-featured production site

---

## Decision Log

Track major decisions here as you build:

| Date | Decision | Rationale |
|------|----------|-----------|
| | | |

---

## Common Pitfalls (Avoid These)

| Pitfall | Why It Happens | How to Avoid |
|---------|----------------|--------------|
| Building UI before content model | Excitement to see pixels | Finish Sanity schema first, add 3 test items, then build UI |
| Too many schema fields upfront | Trying to plan for everything | Start with 5-7 fields per type. Add more when you actually need them |
| Client components everywhere | React habits from SPAs | Default to server components. Only add `'use client'` for interactivity |
| Fetching in components | React Query/SWR habits | Fetch in `page.tsx`, pass data down as props |
| Complex state management | Redux/Zustand habits | URL params for filters, server state for content. You probably don't need global state |
| Styling before structure | Want it to look good fast | Get content flowing with ugly UI first. Polish in Phase 2 |
| Skipping mobile testing | Desktop-first development | Check mobile after every component. Use browser devtools |
| Ignoring Lighthouse | "I'll fix it later" | Run Lighthouse after each phase. Performance debt compounds |
| Custom auth too early | "Need user accounts" | You don't. Affiliate sites rarely need auth. Add later if needed |
| Building admin dashboard | "Need to see analytics" | Use Vercel Analytics + Sanity Studio. Build custom dashboard post-launch |

---

## Testing Strategy

### Manual Testing Checklist (Every Phase)

```markdown
## Before Deploying Phase X

### Functionality
- [ ] All new pages load without errors
- [ ] All links work (no 404s)
- [ ] Data from Sanity displays correctly
- [ ] Forms submit (if any)

### Mobile
- [ ] Pages render correctly on 375px width
- [ ] Touch targets are 44px+
- [ ] No horizontal scroll
- [ ] Menu works

### SEO
- [ ] Page has unique <title>
- [ ] Page has meta description
- [ ] Images have alt text
- [ ] No console errors

### Performance
- [ ] Lighthouse Performance > 80
- [ ] No layout shift (CLS)
- [ ] Images lazy load
```

### Automated Testing (Phase 10)

Only add if site grows complex:

```
tests/
├── e2e/                  # Playwright - critical paths only
│   ├── navigation.spec.ts
│   ├── affiliate-redirect.spec.ts
│   └── casino-listing.spec.ts
└── unit/                 # Vitest - utility functions only
    └── lib/
        └── filters.test.ts
```

Don't write tests for:
- Simple components (visual, not logic)
- Sanity queries (test manually)
- One-off pages

---

## Content Strategy

### Minimum Viable Content (Before Launch)

| Content Type | Count | Priority | Purpose |
|--------------|-------|----------|---------|
| Casinos | 10 | Must have | Core listings — each needs affiliate link |
| Bonuses | 20 (2 per casino) | Must have | High-intent pages, drive clicks |
| Countries | 5 (US, CA, UK, AU, NZ) | Must have | Geo-targeted landing pages |
| Payment Methods | 5 | Should have | Informational: "casinos that accept Bitcoin" |
| Blog Posts | 3 | Nice to have | SEO long-tail, guides |
| Reviews | 3 (top casinos) | Nice to have | Trust building, detailed content |

**Note**: "Payment Methods" = informational content about deposit/withdrawal options at casinos (Visa, PayPal, Bitcoin). This helps users find casinos by payment preference — NOT payment processing on your site.

### Content Creation Workflow

1. **Research**: Find real casino data (licenses, bonuses, limits)
2. **Draft**: Use AI to generate initial descriptions
3. **Edit**: Human review for accuracy and tone
4. **Assets**: Source logos (with permission) or use placeholders
5. **Publish**: Add to Sanity, verify on site

### Affiliate Program Setup (Do This Before Building)

**You need affiliate links before you can test the `/go/` redirects.**

#### Option 1: Direct Casino Programs (Best Rates)

Apply directly on casino websites:
- Look for "Affiliates" or "Partners" link in footer
- Approval takes 1-7 days
- You get a unique tracking link per casino

#### Option 2: Affiliate Networks (Easier Start)

One signup, access to many casinos:

| Network | Casinos | Notes |
|---------|---------|-------|
| **Income Access** | Major brands | Industry standard |
| **NetRefer** | European focus | Good for UK/EU |
| **Cellxpert** | Various | Easy dashboard |
| **Betsson Affiliates** | Betsson brands | Direct operator |
| **Kindred Affiliates** | Unibet, 32Red | Good terms |

#### Option 3: Aggregator Partnerships

Partner with established sites:
- Revenue share on referred traffic
- Lower rates but instant access

### What You Need From Each Program

When you join an affiliate program, get:

```
1. Tracking link(s)     → Store in Sanity `affiliateUrl` field
2. Marketing assets     → Logos, banners (optional)
3. Dashboard access     → Track conversions, earnings
4. Payment terms        → When/how you get paid
5. Geo restrictions     → Which countries allowed
```

### Affiliate Link Examples

```
# Direct tracking link
https://www.casinobrand.com/?tracker=YOUR_AFFILIATE_ID

# Network tracking link
https://record.networkname.com/_abc123DEF/click

# With sub-tracking (to identify traffic source)
https://casino.com/?tracker=YOUR_ID&sub=homepage-hero
```

Store these in Sanity. Use sub-tracking to identify which pages/placements convert best.

---

## File Naming Conventions

Be consistent from day 1:

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `CasinoCard.tsx` |
| Pages | lowercase | `page.tsx` |
| Utils/lib | camelCase | `formatCurrency.ts` |
| Sanity schemas | camelCase | `casino.ts` |
| CSS modules | camelCase | `casinoCard.module.css` |
| Types | PascalCase | `Casino`, `Bonus` |
| Constants | UPPER_SNAKE | `DEFAULT_PAGE_SIZE` |

---

## Notes

- Always deploy after each phase
- Get real content in early (even if imperfect)
- Don't over-engineer; you can refactor later
- Keep CLAUDE.md updated as architecture evolves
- When stuck, build the simplest thing that works
- Ask for help in Next.js Discord or Sanity Slack
