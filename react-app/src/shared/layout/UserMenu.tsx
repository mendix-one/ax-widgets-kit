import BrightnessAutoIcon from '@mui/icons-material/BrightnessAuto'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

import { StorageKeys, saveSetting } from '../../core/storage'
import { useStore } from '../../core/stores'
import { type DisplayMode } from '../../core/theme'

const languages: { value: string; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'ko', label: '한국어' },
  { value: 'ja', label: '日本語' },
  { value: 'vi', label: 'Tiếng Việt' },
]

interface UserMenuProps {
  anchorEl: HTMLElement | null
  onClose: () => void
  menuWidth: Record<string, unknown>
}

export const UserMenu = observer(function UserMenu({
  anchorEl,
  onClose,
  menuWidth,
}: UserMenuProps) {
  const { t, i18n } = useTranslation()
  const { ui, auth } = useStore()
  const user = auth.user

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      slotProps={{ paper: { sx: menuWidth } }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {/* User info */}
      <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>
          {user ? user.name.slice(0, 2).toUpperCase() : 'OP'}
        </Avatar>
        <Box>
          <Typography variant="subtitle2">{user?.name ?? 'Operator'}</Typography>
          <Typography variant="caption" color="text.secondary">
            {user?.email ?? 'operator@amoza.ai'}
          </Typography>
        </Box>
      </Box>
      <Divider />

      {/* Display mode */}
      <Box sx={{ px: 2, py: 1.5 }}>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          {t('userMenu.displayMode')}
        </Typography>
        <ToggleButtonGroup
          value={ui.displayMode}
          exclusive
          onChange={(_e, val: DisplayMode | null) => val && ui.setDisplayMode(val)}
          size="small"
          fullWidth
        >
          <ToggleButton value="light">
            <LightModeIcon sx={{ fontSize: 16, mr: 0.5 }} />
            {t('userMenu.light')}
          </ToggleButton>
          <ToggleButton value="dark">
            <DarkModeIcon sx={{ fontSize: 16, mr: 0.5 }} />
            {t('userMenu.dark')}
          </ToggleButton>
          <ToggleButton value="auto">
            <BrightnessAutoIcon sx={{ fontSize: 16, mr: 0.5 }} />
            {t('userMenu.auto')}
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Divider />

      {/* Language */}
      <Box sx={{ px: 2, py: 1.5 }}>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          {t('userMenu.language')}
        </Typography>
        <Select
          value={i18n.language}
          onChange={(e) => {
            const lang = e.target.value
            void i18n.changeLanguage(lang)
            saveSetting(StorageKeys.LANGUAGE, lang)
          }}
          size="small"
          fullWidth
        >
          {languages.map((lang) => (
            <MenuItem key={lang.value} value={lang.value}>
              {lang.label}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Divider />

      {/* Actions */}
      <MenuItem onClick={onClose}>
        <ListItemIcon>
          <PersonIcon fontSize="small" />
        </ListItemIcon>
        {t('userMenu.profile')}
      </MenuItem>
      <MenuItem onClick={onClose}>
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        {t('userMenu.settings')}
      </MenuItem>
      <Divider />

      {/* Logout */}
      <MenuItem
        onClick={() => {
          onClose()
          auth.signOut()
        }}
        sx={{ color: 'error.main' }}
      >
        <ListItemIcon>
          <LogoutIcon fontSize="small" color="error" />
        </ListItemIcon>
        {t('userMenu.signOut')}
      </MenuItem>
    </Menu>
  )
})
