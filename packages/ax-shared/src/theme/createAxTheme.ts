import { type ThemeOptions, createTheme } from '@mui/material/styles'
import deepmerge from '@mui/utils/deepmerge'

import { defaultThemeOptions } from './defaults'

/**
 * Create a MUI theme by deep-merging default Ax options with optional overrides.
 * Multiple override layers are supported (applied left to right).
 */
export function createAxTheme(
  ...overrides: (ThemeOptions | undefined)[]
): ReturnType<typeof createTheme> {
  let merged = { ...defaultThemeOptions }
  for (const o of overrides) {
    if (o) merged = deepmerge(merged, o)
  }
  return createTheme(merged)
}
