import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { observer } from 'mobx-react-lite'
import type { FormEvent, ReactElement } from 'react'

import { useResetPassFormStore } from './context'

export const ResetPassForm = observer(function ResetPassForm(): ReactElement {
  const store = useResetPassFormStore()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    store.submit()
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
        {store.onNavigateSignIn && (
          <IconButton size="small" onClick={() => store.onNavigateSignIn?.()} aria-label="Back to sign in">
            <ArrowBackIcon fontSize="small" />
          </IconButton>
        )}
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Reset Password
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Enter your email to receive a reset link
      </Typography>

      {store.sent ? (
        <Box>
          <Typography color="success.main" variant="body2" sx={{ mb: 1.5 }}>
            A password reset link has been sent to your email.
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
            label="Email"
            type="email"
            fullWidth
            size="small"
            value={store.email}
            onChange={(e) => store.setEmail(e.target.value)}
            disabled={store.readOnly}
            sx={{ mb: 2 }}
          />

          {store.error && (
            <Typography color="error" variant="body2" sx={{ mb: 2 }}>
              {store.error}
            </Typography>
          )}

          <Button type="submit" variant="contained" fullWidth disabled={store.loading || store.readOnly} sx={{ mb: 2 }}>
            {store.loading ? 'Sending\u2026' : 'Send Reset Link'}
          </Button>

          {store.onNavigateSignIn && (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              Remember your password?{' '}
              <Link component="button" type="button" underline="hover" onClick={() => store.onNavigateSignIn?.()}>
                Sign In
              </Link>
            </Typography>
          )}
        </Box>
      )}
    </Box>
  )
})
