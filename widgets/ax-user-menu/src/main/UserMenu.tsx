import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { observer } from 'mobx-react-lite'
import { type ReactElement, useState } from 'react'

import { useUserMenuStore } from './context'

export const UserMenu = observer(function UserMenu(): ReactElement {
  const store = useUserMenuStore()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClose = () => setAnchorEl(null)

  return (
    <>
      <Tooltip title="Account">
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ ml: 1 }} aria-haspopup="true" aria-expanded={Boolean(anchorEl)}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: 14 }}>{store.initials}</Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        slotProps={{ paper: { sx: { width: 280 } } }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* User info */}
        <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>{store.initials}</Avatar>
          <Box>
            <Typography variant="subtitle2">{store.name}</Typography>
            <Typography variant="caption" color="text.secondary">
              {store.email}
            </Typography>
          </Box>
        </Box>
        <Divider />

        {/* Actions */}
        <MenuItem
          onClick={() => {
            handleClose()
            store.onProfile?.()
          }}
        >
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose()
            store.onSettings?.()
          }}
        >
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />

        {/* Sign out */}
        <MenuItem
          onClick={() => {
            handleClose()
            store.onSignOut?.()
          }}
          sx={{ color: 'error.main' }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" color="error" />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </Menu>
    </>
  )
})
