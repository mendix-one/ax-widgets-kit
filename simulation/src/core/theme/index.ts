import { createTheme } from '@mui/material/styles'

export type DisplayMode = 'light' | 'dark' | 'auto'

const shared = {
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    fontSize: 14,
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        },
        body: {
          width: '100%',
          height: '100%',
          margin: 0,
          overflow: 'hidden',
          overscrollBehavior: 'none',
        },
        '#root': {
          width: '100%',
          height: '100%',
        },
        // Optimized ripple: faster enter, snappier exit, GPU-accelerated
        '.MuiTouchRipple-root': {
          transitionDuration: '350ms',
        },
        '.MuiTouchRipple-rippleVisible': {
          animationDuration: '400ms !important',
        },
        '.MuiTouchRipple-child': {
          backgroundColor: 'currentColor',
        },
        '.MuiTouchRipple-childLeaving': {
          animationDuration: '300ms !important',
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: false,
      },
      styleOverrides: {
        root: {
          // GPU-accelerate ripple layer
          '& .MuiTouchRipple-root': {
            willChange: 'opacity',
            contain: 'strict',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // Smooth hover/active state transitions
          transition: 'background-color 200ms, box-shadow 200ms, transform 100ms',
          '&:active': {
            transform: 'scale(0.98)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'background-color 200ms',
          '&:active': {
            transform: 'scale(0.92)',
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          transition: 'background-color 200ms',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          transition: 'background-color 200ms',
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          transition: 'background-color 200ms, border-color 200ms, color 200ms',
          '&:active': {
            transform: 'scale(0.96)',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          transition: 'color 200ms, background-color 200ms',
        },
      },
    },
  },
} as const

export const lightTheme = createTheme({
  ...shared,
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
})

export const darkTheme = createTheme({
  ...shared,
  palette: {
    mode: 'dark',
    primary: {
      main: '#5C6BC0',
      light: '#7986CB',
      dark: '#3F51B5',
      contrastText: '#FFFFFF',
    },
    secondary: { main: '#4DB6AC' },
    success: { main: '#66BB6A' },
    warning: { main: '#FFA726' },
    error: { main: '#EF5350' },
    info: { main: '#42A5F5' },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
})
