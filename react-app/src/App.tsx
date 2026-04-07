import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { observer } from 'mobx-react-lite'
import { RouterProvider } from 'react-router'

import { router } from './core/router'
import { useStore } from './core/stores'
import { darkTheme, lightTheme } from './core/theme'

export const App = observer(function App() {
  const { ui } = useStore()
  const theme = ui.resolvedMode === 'dark' ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
})
