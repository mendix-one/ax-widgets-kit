import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { observer } from 'mobx-react-lite'
import type { ReactElement, ReactNode } from 'react'

import { AiBg } from './AiBg'
import { useAuthLayoutStore } from './context'

interface AuthLayoutProps {
  children?: ReactNode
}

export const AuthLayout = observer(function AuthLayout({ children }: AuthLayoutProps): ReactElement {
  const { tagline, description, showBackground } = useAuthLayoutStore()
  const isDesktop = useMediaQuery('(min-width:900px)')
  const isLarge = useMediaQuery('(min-width:1200px)')

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        display: 'flex',
        background: 'linear-gradient(135deg, #1a237e 0%, #283593 35%, #3949ab 65%, #5c6bc0 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {showBackground && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            '& svg': { width: '100%', height: '100%' },
          }}
        >
          <AiBg />
        </Box>
      )}

      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 1600,
          mx: 'auto',
          flex: 1,
          display: 'flex',
          flexDirection: isDesktop ? 'row' : 'column',
          alignItems: isDesktop ? 'center' : 'stretch',
          justifyContent: isDesktop ? 'space-between' : 'flex-start',
          px: isDesktop ? (isLarge ? 8 : 3) : 0,
        }}
      >
        {/* Left panel — branding */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: '#fff',
            ...(isDesktop ? { flex: 1, maxWidth: 560, py: 6 } : { p: '32px 24px' }),
          }}
        >
          {tagline && (
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: '#fff',
                lineHeight: 1.2,
                whiteSpace: 'pre-line',
                fontSize: isDesktop ? '2.5rem' : '1.5rem',
              }}
            >
              {tagline}
            </Typography>
          )}
          {description && (
            <Typography
              sx={{
                mt: 2,
                color: 'rgba(255,255,255,0.75)',
                maxWidth: 480,
                lineHeight: 1.7,
                fontSize: '1rem',
                display: isDesktop ? 'block' : 'none',
              }}
            >
              {description}
            </Typography>
          )}
        </Box>

        {/* Right panel — form card */}
        <Box
          sx={{
            flex: isDesktop ? 'none' : 1,
            display: 'flex',
            alignItems: isDesktop ? 'center' : 'flex-start',
            width: isDesktop ? (isLarge ? 480 : 440) : '100%',
            ...(isDesktop && { py: 3 }),
          }}
        >
          <Paper
            elevation={isDesktop ? 8 : 0}
            sx={{
              width: '100%',
              ...(isDesktop ? { borderRadius: 3 } : { borderRadius: '24px 24px 0 0', flex: 1 }),
            }}
          >
            <Box sx={{ p: isDesktop ? '32px 40px' : '32px 24px' }}>{children}</Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  )
})
