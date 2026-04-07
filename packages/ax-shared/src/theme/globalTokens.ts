import { type ThemeOptions } from '@mui/material/styles'

const GLOBAL_KEY = '__Ax_THEME_TOKENS__'

/**
 * Set theme tokens on the global window object.
 * Called by layout widgets (AxWebApp, AxAuthLayout) to share theme config with child widgets.
 */
export function setGlobalThemeTokens(tokens: ThemeOptions): void {
  // @ts-ignore
  ;(window as Record<string, unknown>)[GLOBAL_KEY] = tokens
}

/**
 * Get theme tokens from the global window object.
 * Returns undefined if no layout widget has set tokens yet.
 */
export function getGlobalThemeTokens(): ThemeOptions | undefined {
  // @ts-ignore
  return (window as Record<string, unknown>)[GLOBAL_KEY] as ThemeOptions | undefined
}

/**
 * Parse a JSON string into ThemeOptions. Returns undefined on invalid input.
 */
export function parseThemeTokens(json: string | undefined): ThemeOptions | undefined {
  if (!json) return undefined
  try {
    return JSON.parse(json) as ThemeOptions
  } catch {
    return undefined
  }
}
