import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { observer } from 'mobx-react-lite'
import { type FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link as RouterLink, useNavigate } from 'react-router'

import { useStore } from '../core/stores'

const SignupPage = observer(function SignupPage() {
  const { t } = useTranslation()
  const { auth } = useStore()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name || !email || !password || !confirmPassword) {
      setError(t('auth.required'))
      return
    }

    if (password !== confirmPassword) {
      setError(t('auth.passwordMismatch'))
      return
    }

    setLoading(true)
    setTimeout(() => {
      auth.signup(name, email, password)
      setLoading(false)
      void navigate('/')
    }, 600)
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        {t('auth.signup')}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {t('auth.signupSubtitle')}
      </Typography>

      {/* SSO buttons */}
      <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
        <Button variant="outlined" fullWidth sx={{ textTransform: 'none', py: 1 }}>
          <Box component="img" src={googleSvg} alt="" sx={{ width: 20, height: 20, mr: 1 }} />
          Google
        </Button>
        <Button variant="outlined" fullWidth sx={{ textTransform: 'none', py: 1 }}>
          <Box component="img" src={microsoftSvg} alt="" sx={{ width: 20, height: 20, mr: 1 }} />
          Microsoft
        </Button>
      </Box>

      <Divider sx={{ mb: 3 }}>
        <Typography variant="caption" color="text.secondary">
          {t('auth.orContinueWith')}
        </Typography>
      </Divider>

      {/* Registration form */}
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          label={t('auth.fullName')}
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          label={t('auth.email')}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          label={t('auth.password')}
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          label={t('auth.confirmPassword')}
          type={showPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          {t('auth.signup')}
        </LoadingButton>

        <Typography variant="body2" color="text.secondary" textAlign="center">
          {t('auth.hasAccount')}{' '}
          <Link component={RouterLink} to="/auth/sign-in" underline="hover">
            {t('auth.signIn')}
          </Link>
        </Typography>
      </Box>
    </Box>
  )
})

export default SignupPage

const googleSvg =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath fill='%23fbc02d' d='M43.6 20.1H42V20H24v8h11.3C33.9 33.1 29.4 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.7-.4-3.9z'/%3E%3Cpath fill='%23e53935' d='M6.3 14.7l6.6 4.8C14.3 15.7 18.8 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z'/%3E%3Cpath fill='%234caf50' d='M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.2 26.7 36 24 36c-5.4 0-9.9-3.5-11.5-8.3l-6.5 5C9.5 39.5 16.2 44 24 44z'/%3E%3Cpath fill='%231565c0' d='M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.6l6.2 5.2C37 39.3 44 34 44 24c0-1.3-.1-2.7-.4-3.9z'/%3E%3C/svg%3E"

const microsoftSvg =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 23 23'%3E%3Crect x='1' y='1' width='10' height='10' fill='%23f25022'/%3E%3Crect x='12' y='1' width='10' height='10' fill='%237fba00'/%3E%3Crect x='1' y='12' width='10' height='10' fill='%2300a4ef'/%3E%3Crect x='12' y='12' width='10' height='10' fill='%23ffb900'/%3E%3C/svg%3E"
