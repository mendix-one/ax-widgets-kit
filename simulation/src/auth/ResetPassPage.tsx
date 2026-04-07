import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { observer } from 'mobx-react-lite'
import { type FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link as RouterLink } from 'react-router'

import { useStore } from '../core/stores'

const ResetPassPage = observer(function ResetPassPage() {
  const { t } = useTranslation()
  const { auth } = useStore()

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email) {
      setError(t('auth.required'))
      return
    }

    setLoading(true)
    setTimeout(() => {
      auth.resetPass(email)
      setLoading(false)
      setSent(true)
    }, 600)
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <IconButton component={RouterLink} to="/auth/sign-in" size="small">
          <ArrowBackIcon fontSize="small" />
        </IconButton>
        <Typography variant="h5" fontWeight={600}>
          {t('auth.resetPass')}
        </Typography>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {t('auth.resetSubtitle')}
      </Typography>

      {sent ? (
        <Box>
          <Typography variant="body2" color="success.main" sx={{ mb: 2 }}>
            {t('auth.resetSent')}
          </Typography>
          <Link component={RouterLink} to="/auth/sign-in" variant="body2" underline="hover">
            {t('auth.backToSignIn')}
          </Link>
        </Box>
      ) : (
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label={t('auth.email')}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />

          {error && (
            <Typography variant="body2" color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <LoadingButton
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            loading={loading}
            sx={{ mb: 2 }}
          >
            {t('auth.sendResetLink')}
          </LoadingButton>

          <Typography variant="body2" color="text.secondary" textAlign="center">
            {t('auth.rememberPassword')}{' '}
            <Link component={RouterLink} to="/auth/sign-in" underline="hover">
              {t('auth.signIn')}
            </Link>
          </Typography>
        </Box>
      )}
    </Box>
  )
})

export default ResetPassPage
