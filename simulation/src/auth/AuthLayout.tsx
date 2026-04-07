import BrightnessAutoIcon from '@mui/icons-material/BrightnessAuto'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { alpha, useTheme } from '@mui/material/styles'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router'

import aPlannerDark from '../assets/a-planner-ai-dark.png'
import aPlannerLight from '../assets/a-planner-ai-light.png'
import { StorageKeys, saveSetting } from '../core/storage'
import { useStore } from '../core/stores'
import { type DisplayMode } from '../core/theme'

import { AiBg } from './AiBg'

const languages: { value: string; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'ko', label: '한국어' },
  { value: 'ja', label: '日本語' },
  { value: 'vi', label: 'Tiếng Việt' },
]

export const AuthLayout = observer(function AuthLayout() {
  const theme = useTheme()
  const { ui } = useStore()
  const { t, i18n } = useTranslation()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const logo = ui.resolvedMode === 'dark' ? aPlannerDark : aPlannerLight
  const isDark = ui.resolvedMode === 'dark'

  const bg = isDark
    ? 'linear-gradient(135deg, #0a0e27 0%, #1a1a3e 40%, #1e2a5e 70%, #283593 100%)'
    : 'linear-gradient(135deg, #1a237e 0%, #283593 35%, #3949ab 65%, #5c6bc0 100%)'

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        display: 'flex',
        background: bg,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated AI background */}
      <AiBg />

      {/* Content container — max 1600px for full-HD, centered */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 1600,
          mx: 'auto',
          flex: 1,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { md: 'center' },
          justifyContent: { md: 'space-between' },
          px: { xs: 0, sm: 3, lg: 8 },
        }}
      >
        {/* Left panel — site info, aligned left */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            px: { xs: 3, md: 0 },
            py: { xs: 4, md: 6 },
            color: '#fff',
            flex: { md: 1 },
            maxWidth: { md: 560 },
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="aPlanner"
            sx={{ height: { xs: 28, md: 36 }, alignSelf: 'flex-start', mb: { xs: 2, md: 4 } }}
          />

          <Typography
            variant={isDesktop ? 'h3' : 'h5'}
            fontWeight={700}
            sx={{ color: '#fff', lineHeight: 1.2, whiteSpace: 'pre-line' }}
          >
            {t('auth.tagline')}
          </Typography>

          {isDesktop && (
            <Typography
              variant="body1"
              sx={{ mt: 2, color: alpha('#fff', 0.75), maxWidth: 480, lineHeight: 1.7 }}
            >
              {t('auth.siteDesc')}
            </Typography>
          )}
        </Box>

        {/* Right panel — form card, aligned right */}
        <Box
          sx={{
            width: { xs: '100%', md: 440, lg: 480 },
            flexShrink: 0,
            display: 'flex',
            alignItems: { md: 'center' },
            py: { xs: 0, md: 3 },
            flex: { xs: 1, md: 'none' },
          }}
        >
          <Box
            sx={{
              width: '100%',
              bgcolor: 'background.paper',
              borderRadius: { xs: '24px 24px 0 0', md: 3 },
              boxShadow: { xs: 'none', md: theme.shadows[8] },
              flex: { xs: 1, md: 'none' },
            }}
          >
            {/* Form area */}
            <Box sx={{ px: { xs: 3, sm: 5 }, py: { xs: 4, sm: 4 } }}>
              <Outlet />
            </Box>

            {/* Options bar — language + display mode */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                px: 3,
                py: 2,
                borderTop: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Select
                value={i18n.language}
                onChange={(e) => {
                  const lang = e.target.value
                  void i18n.changeLanguage(lang)
                  saveSetting(StorageKeys.LANGUAGE, lang)
                }}
                size="small"
                variant="outlined"
                sx={{ minWidth: 120, '.MuiSelect-select': { py: '5px' } }}
              >
                {languages.map((lang) => (
                  <MenuItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </MenuItem>
                ))}
              </Select>

              <ToggleButtonGroup
                value={ui.displayMode}
                exclusive
                onChange={(_e, val: DisplayMode | null) => val && ui.setDisplayMode(val)}
                size="small"
              >
                <ToggleButton value="light" aria-label={t('userMenu.light')}>
                  <LightModeIcon sx={{ fontSize: 18 }} />
                </ToggleButton>
                <ToggleButton value="dark" aria-label={t('userMenu.dark')}>
                  <DarkModeIcon sx={{ fontSize: 18 }} />
                </ToggleButton>
                <ToggleButton value="auto" aria-label={t('userMenu.auto')}>
                  <BrightnessAutoIcon sx={{ fontSize: 18 }} />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
})
