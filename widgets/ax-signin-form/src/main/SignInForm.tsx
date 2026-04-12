import BrightnessAutoIcon from '@mui/icons-material/BrightnessAuto'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import KeyIcon from '@mui/icons-material/Key'
import LightModeIcon from '@mui/icons-material/LightMode'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import { observer } from 'mobx-react-lite'

import { useSignInFormStore } from './context'
import { type DisplayMode } from './store'

import type { FormEvent, ReactElement } from 'react'

export const SignInForm = observer(function SignInForm(): ReactElement {
  const store = useSignInFormStore()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    store.submit()
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
        Sign In
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Welcome back — sign in to continue
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          label="Email"
          type="email"
          fullWidth
          size="small"
          value={store.email}
          onChange={(e) => store.setEmail(e.target.value)}
          disabled={store.readOnly}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Password"
          type={store.showPassword ? 'text' : 'password'}
          fullWidth
          size="small"
          value={store.password}
          onChange={(e) => store.setPassword(e.target.value)}
          disabled={store.readOnly}
          sx={{ mb: 1 }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => store.toggleShowPassword()} edge="end">
                    {store.showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        {store.onNavigateResetPass && (
          <Box sx={{ textAlign: 'right', mb: 2 }}>
            <Link
              component="button"
              type="button"
              variant="body2"
              underline="hover"
              onClick={() => store.onNavigateResetPass?.()}
            >
              Forgot password?
            </Link>
          </Box>
        )}

        {store.error && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {store.error}
          </Typography>
        )}

        <Button type="submit" variant="contained" fullWidth disabled={store.loading || store.readOnly} sx={{ mb: 2 }}>
          {store.loading ? 'Signing in…' : 'Sign In'}
        </Button>

        {/* SSO alternative */}
        {store.showSSO && store.onSSO && (
          <>
            <Divider sx={{ mb: 2, fontSize: 12, color: 'text.disabled' }}>or continue with</Divider>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => store.onSSO?.()}
              disabled={store.readOnly}
              startIcon={<KeyIcon fontSize="small" />}
              sx={{ textTransform: 'none', color: 'text.primary', borderColor: 'divider', mb: 2 }}
            >
              {store.ssoLabel || 'Sign in with SSO'}
            </Button>
          </>
        )}

        {store.onNavigateSignUp && (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
            Don&apos;t have an account?{' '}
            <Link component="button" type="button" underline="hover" onClick={() => store.onNavigateSignUp?.()}>
              Sign Up
            </Link>
          </Typography>
        )}
      </Box>

      {/* Bottom options bar — theme */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 3,
          pt: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <ToggleButtonGroup
          value={store.displayMode}
          exclusive
          onChange={(_e, val: DisplayMode | null) => {
            if (val) store.setDisplayMode(val)
          }}
          size="small"
        >
          <ToggleButton value="light" aria-label="Light mode">
            <LightModeIcon sx={{ fontSize: 18 }} />
          </ToggleButton>
          <ToggleButton value="dark" aria-label="Dark mode">
            <DarkModeIcon sx={{ fontSize: 18 }} />
          </ToggleButton>
          <ToggleButton value="auto" aria-label="Auto mode">
            <BrightnessAutoIcon sx={{ fontSize: 18 }} />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Box>
  )
})
