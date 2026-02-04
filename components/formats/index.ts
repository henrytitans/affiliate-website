import * as defaultFormat from './default'
import * as comparisonFormat from './comparison'

export const formats = {
  default: defaultFormat,
  comparison: comparisonFormat,
} as const

export type FormatKey = keyof typeof formats
export type Format = (typeof formats)[FormatKey]

// Helper to get format components
export function getFormat(key: FormatKey = 'default') {
  return formats[key] || formats.default
}
