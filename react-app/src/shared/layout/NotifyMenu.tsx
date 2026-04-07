import DoneAllIcon from '@mui/icons-material/DoneAll'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Menu from '@mui/material/Menu'
import Typography from '@mui/material/Typography'
import { type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { type Notification, type NotifyType, timeAgo } from './types'

const notifyConfig: Record<NotifyType, { color: string; icon: ReactNode }> = {
  danger: { color: 'error.main', icon: <ErrorOutlineIcon color="error" /> },
  warning: { color: 'warning.main', icon: <WarningAmberIcon color="warning" /> },
  info: { color: 'info.main', icon: <InfoOutlinedIcon color="info" /> },
}

interface NotifyMenuProps {
  anchorEl: HTMLElement | null
  onClose: () => void
  notifications: Notification[]
  onMarkRead: (id: number) => void
  onMarkAllRead: () => void
  dropdownWidth: Record<string, unknown>
}

export function NotifyMenu({
  anchorEl,
  onClose,
  notifications,
  onMarkRead,
  onMarkAllRead,
  dropdownWidth,
}: NotifyMenuProps) {
  const { t } = useTranslation()
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            ...dropdownWidth,
            maxHeight: 520,
            display: 'flex',
            flexDirection: 'column',
          },
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
          <Typography variant="subtitle2">{t('layout.notifications')}</Typography>
          {unreadCount > 0 && (
            <Chip label={unreadCount} size="small" color="error" sx={{ height: 20 }} />
          )}
        </Box>
        <Button
          size="small"
          startIcon={<DoneAllIcon sx={{ fontSize: 16 }} />}
          onClick={onMarkAllRead}
          disabled={unreadCount === 0}
          sx={{ textTransform: 'none', fontSize: 12 }}
        >
          {t('layout.markAllAsRead')}
        </Button>
      </Box>
      <Divider sx={{ position: 'sticky', top: 48, zIndex: 1 }} />

      {/* Scrollable list */}
      <Box sx={{ overflowY: 'auto', flex: 1, maxHeight: 420 }}>
        {notifications.map((n) => {
          const config = notifyConfig[n.type]
          return (
            <Box
              key={n.id}
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
                '&:not(:last-child)': {
                  borderBottom: '1px solid',
                  borderBottomColor: 'divider',
                },
              }}
              onClick={() => onMarkRead(n.id)}
            >
              <Box sx={{ mt: 0.25 }}>{config.icon}</Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.25 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: n.read ? 400 : 600, flex: 1 }}
                    noWrap
                  >
                    {t(n.titleKey)}
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
                  {t(n.descKey)}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.disabled"
                  sx={{ mt: 0.5, display: 'block' }}
                >
                  {timeAgo(n.timestamp, t)}
                </Typography>
              </Box>
            </Box>
          )
        })}
      </Box>
    </Menu>
  )
}
