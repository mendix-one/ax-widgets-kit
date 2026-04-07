import { type ThemeOptions } from '@mui/material/styles'

/**
 * Default Ax widget theme options.
 * Based on the simulation app theme — indigo primary, clean typography, snappy interactions.
 */
export const defaultThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    fontSize: 14,
  },
  shape: {
    borderRadius: 12,
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#3F51B5',
      light: '#5C6BC0',
      dark: '#002B75',
      contrastText: '#FFFFFF',
    },
    secondary: { main: '#009688' },
    success: { main: '#4CAF50' },
    warning: { main: '#FF9800' },
    error: { main: '#F44336' },
    info: { main: '#2196F3' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        // Optimized ripple
        '.MuiTouchRipple-root': { transitionDuration: '350ms' },
        '.MuiTouchRipple-rippleVisible': { animationDuration: '400ms !important' },
        '.MuiTouchRipple-child': { backgroundColor: 'currentColor' },
        '.MuiTouchRipple-childLeaving': { animationDuration: '300ms !important' },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          transition: 'background-color 200ms, box-shadow 200ms, transform 100ms',
          '&:active': { transform: 'scale(0.98)' },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'background-color 200ms',
          '&:active': { transform: 'scale(0.92)' },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: { root: { transition: 'background-color 200ms' } },
    },
    MuiMenuItem: {
      styleOverrides: { root: { transition: 'background-color 200ms' } },
    },
  },
}
