import CssBaseline from '@mui/material/CssBaseline'
import { type ThemeOptions, ThemeProvider } from '@mui/material/styles'
import { type ReactElement, type ReactNode, useMemo } from 'react'

import { createAxTheme } from './createAxTheme'
import { getGlobalThemeTokens } from './globalTokens'

interface AxThemeProviderProps {
  /** Extra theme overrides on top of defaults + global tokens */
  overrides?: ThemeOptions
  /** Skip reading global tokens (for layout widgets that set them) */
  isLayout?: boolean
  children: ReactNode
}

/**
 * Wraps children with MUI ThemeProvider + CssBaseline using the Ax default theme.
 *
 * For **layout widgets** (isLayout=true): applies defaults + overrides only, then sets global tokens.
 * For **child widgets** (default): reads global tokens set by the layout, merges with defaults + overrides.
 */
export function AxThemeProvider({
  overrides,
  isLayout,
  children,
}: AxThemeProviderProps): ReactElement {
  const theme = useMemo(() => {
    if (isLayout) {
      return createAxTheme(overrides)
    }
    const globalTokens = getGlobalThemeTokens()
    return createAxTheme(globalTokens, overrides)
  }, [overrides, isLayout])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  )
}
