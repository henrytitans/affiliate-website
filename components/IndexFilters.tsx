'use client'

import { useRouter, useSearchParams } from 'next/navigation'

interface IndexFiltersProps {
  basePath: string
  showFeaturedFilter?: boolean
  showFormatSwitch?: boolean
}

const sortOptions = [
  { value: 'rating', label: 'Top Rated' },
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'newest', label: 'Newest' },
]

const formatOptions = [
  { value: 'default', label: 'Cards' },
  { value: 'comparison', label: 'Table' },
]

export function IndexFilters({
  basePath,
  showFeaturedFilter = true,
  showFormatSwitch = false,
}: IndexFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentSort = searchParams.get('sort') || 'rating'
  const currentFeatured = searchParams.get('featured') === 'true'
  const currentFormat = searchParams.get('format') || 'default'

  const updateParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === null || value === '') {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    params.delete('page') // Reset pagination on filter change
    const query = params.toString()
    router.push(`${basePath}${query ? `?${query}` : ''}`)
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-card border border-border rounded-xl">
      <div className="flex flex-wrap items-center gap-4">
        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm text-text-secondary">
            Sort by:
          </label>
          <select
            id="sort"
            value={currentSort}
            onChange={(e) => updateParams('sort', e.target.value === 'rating' ? null : e.target.value)}
            className="px-3 py-2 bg-elevated border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Featured Filter */}
        {showFeaturedFilter && (
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={currentFeatured}
              onChange={(e) => updateParams('featured', e.target.checked ? 'true' : null)}
              className="w-4 h-4 rounded border-border bg-elevated text-primary focus:ring-primary focus:ring-offset-0"
            />
            <span className="text-sm text-text-secondary group-hover:text-foreground transition-colors">
              Featured only
            </span>
          </label>
        )}
      </div>

      {/* Format Switch */}
      {showFormatSwitch && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-text-secondary">View:</span>
          <div className="flex rounded-lg overflow-hidden border border-border">
            {formatOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateParams('format', option.value === 'default' ? null : option.value)}
                className={`px-3 py-1.5 text-sm font-medium transition-all ${
                  currentFormat === option.value
                    ? 'bg-primary text-white'
                    : 'bg-elevated text-text-secondary hover:text-foreground hover:bg-border'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
