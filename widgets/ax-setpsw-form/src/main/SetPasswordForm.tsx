import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { observer } from 'mobx-react-lite'
import type { FormEvent, ReactElement } from 'react'

import { useSetPasswordFormStore } from './context'

export const SetPasswordForm = observer(function SetPasswordForm(): ReactElement {
  const store = useSetPasswordFormStore()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    store.submit()
  }

  const passwordAdornment = (
    <InputAdornment position="end">
      <IconButton size="small" onClick={() => store.toggleShowPassword()} edge="end">
        {store.showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
      </IconButton>
    </InputAdornment>
  )

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
        Set New Password
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Enter your new password below
      </Typography>

      {store.success ? (
        <Box>
          <Typography color="success.main" variant="body2" sx={{ mb: 1.5 }}>
            Your password has been updated successfully.
          </Typography>
          {store.onNavigateSignIn && (
            <Link
              component="button"
              type="button"
              variant="body2"
              underline="hover"
              onClick={() => store.onNavigateSignIn?.()}
            >
              Back to Sign In
            </Link>
          )}
        </Box>
      ) : (
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="New password"
            type={store.showPassword ? 'text' : 'password'}
            fullWidth
            size="small"
            value={store.password}
            onChange={(e) => store.setPassword(e.target.value)}
            disabled={store.readOnly}
            sx={{ mb: 2 }}
            slotProps={{ input: { endAdornment: passwordAdornment } }}
          />

          <TextField
            label="Confirm password"
            type={store.showPassword ? 'text' : 'password'}
            fullWidth
            size="small"
            value={store.confirmPassword}
            onChange={(e) => store.setConfirmPassword(e.target.value)}
            disabled={store.readOnly}
            sx={{ mb: 2 }}
          />

          {store.error && (
            <Typography color="error" variant="body2" sx={{ mb: 2 }}>
              {store.error}
            </Typography>
          )}

          <Button type="submit" variant="contained" fullWidth disabled={store.loading || store.readOnly} sx={{ mb: 2 }}>
            {store.loading ? 'Updating\u2026' : 'Set Password'}
          </Button>

          {store.onNavigateSignIn && (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              <Link component="button" type="button" underline="hover" onClick={() => store.onNavigateSignIn?.()}>
                Back to Sign In
              </Link>
            </Typography>
          )}
        </Box>
      )}
    </Box>
  )
})
