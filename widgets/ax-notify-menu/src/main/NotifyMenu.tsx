import DoneAllIcon from '@mui/icons-material/DoneAll'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { observer } from 'mobx-react-lite'
import { type ReactElement, type ReactNode, useState } from 'react'

import { useNotifyMenuStore } from './context'

type NotifyType = 'danger' | 'warning' | 'info'

const notifyConfig: Record<NotifyType, { color: string; icon: ReactNode }> = {
  danger: { color: 'error.main', icon: <ErrorOutlineIcon color="error" /> },
  warning: { color: 'warning.main', icon: <WarningAmberIcon color="warning" /> },
  info: { color: 'info.main', icon: <InfoOutlinedIcon color="info" /> },
}

export const NotifyMenu = observer(function NotifyMenu(): ReactElement {
  const store = useNotifyMenuStore()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  return (
    <>
      <Tooltip title={store.title}>
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} color="inherit" aria-haspopup="true" aria-expanded={Boolean(anchorEl)}>
          <Badge badgeContent={store.unreadCount} color="error">
            <NotificationsNoneIcon sx={{ color: 'text.secondary' }} />
          </Badge>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        slotProps={{
          paper: {
            sx: { width: 400, maxHeight: 520, display: 'flex', flexDirection: 'column' },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* Header */}
        <Box
          sx={{
            px: 2,
            py: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            bgcolor: 'background.paper',
            zIndex: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="subtitle2">{store.title}</Typography>
            {store.unreadCount > 0 && <Chip label={store.unreadCount} size="small" color="error" sx={{ height: 20 }} />}
          </Box>
          <Button
            size="small"
            startIcon={<DoneAllIcon sx={{ fontSize: 16 }} />}
            onClick={() => store.markAllRead()}
            disabled={store.unreadCount === 0}
            sx={{ textTransform: 'none', fontSize: 12 }}
          >
            Mark all as read
          </Button>
        </Box>
        <Divider sx={{ position: 'sticky', top: 48, zIndex: 1 }} />

        {/* Notification list */}
        <Box sx={{ overflowY: 'auto', flex: 1, maxHeight: 420 }} role="list">
          {store.items.map((n) => {
            const config = notifyConfig[n.type]
            return (
              <Box
                key={n.id}
                role="listitem"
                sx={{
                  px: 2,
                  py: 1.5,
                  display: 'flex',
                  gap: 1.5,
                  alignItems: 'flex-start',
                  bgcolor: n.read ? 'transparent' : 'action.hover',
                  borderLeft: '3px solid',
                  borderColor: config.color,
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'action.selected' },
                  '&:not(:last-child)': { borderBottom: '1px solid', borderBottomColor: 'divider' },
                }}
                onClick={() => store.markRead(n.id)}
              >
                <Box sx={{ mt: 0.25 }}>{config.icon}</Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.25 }}>
                    <Typography variant="body2" sx={{ fontWeight: n.read ? 400 : 600, flex: 1 }} noWrap>
                      {n.title}
                    </Typography>
                    {!n.read && <FiberManualRecordIcon sx={{ fontSize: 8, color: 'primary.main' }} />}
                  </Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      lineHeight: 1.4,
                    }}
                  >
                    {n.description}
                  </Typography>
                  <Typography variant="caption" color="text.disabled" sx={{ mt: 0.5, display: 'block' }}>
                    {n.timestamp}
                  </Typography>
                </Box>
              </Box>
            )
          })}
        </Box>
      </Menu>
    </>
  )
})
