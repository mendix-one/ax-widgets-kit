import AssignmentLateIcon from '@mui/icons-material/AssignmentLate'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import useMediaQuery from '@mui/material/useMediaQuery'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useStore } from '../../core/stores'

import { NotifyMenu } from './NotifyMenu'
import { TasksMenu } from './TasksMenu'
import { UserMenu } from './UserMenu'

interface AppHeaderProps {
  logo: string
  onToggleSidebar: () => void
}

export const AppHeader = observer(function AppHeader({ logo, onToggleSidebar }: AppHeaderProps) {
  const theme = useTheme()
  const { t } = useTranslation()
  const { ui, notifications } = useStore()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [taskMenuAnchor, setTaskMenuAnchor] = useState<null | HTMLElement>(null)
  const [notifyMenuAnchor, setNotifyMenuAnchor] = useState<null | HTMLElement>(null)
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null)

  const dropdownWidth = isMobile ? { width: 'calc(100vw - 32px)', maxWidth: 400 } : { width: 400 }
  const userMenuWidth = isMobile ? { width: 'calc(100vw - 32px)', maxWidth: 300 } : { width: 280 }

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        zIndex: (t) => t.zIndex.drawer + 1,
      }}
    >
      <Toolbar variant="dense" sx={{ minHeight: 48 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 }, flexGrow: 1 }}>
          <Box component="img" src={logo} alt="aPlanner" sx={{ height: { xs: 20, sm: 24 } }} />
          <IconButton onClick={onToggleSidebar} size="small" sx={{ color: 'text.secondary' }}>
            <MenuIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Tooltip title={t('agent.title')}>
            <IconButton
              onClick={() => ui.toggleAgentOpen()}
              color="inherit"
              sx={{ color: ui.agentOpen ? 'primary.main' : 'text.secondary' }}
            >
              <SmartToyOutlinedIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title={t('layout.urgentTasks')}>
            <IconButton onClick={(e) => setTaskMenuAnchor(e.currentTarget)} color="inherit">
              <Badge badgeContent={notifications.pendingTaskCount} color="error">
                <AssignmentLateIcon sx={{ color: 'text.secondary' }} />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title={t('layout.notifications')}>
            <IconButton onClick={(e) => setNotifyMenuAnchor(e.currentTarget)} color="inherit">
              <Badge badgeContent={notifications.unreadCount} color="error">
                <NotificationsNoneIcon sx={{ color: 'text.secondary' }} />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title={t('layout.account')}>
            <IconButton onClick={(e) => setUserMenuAnchor(e.currentTarget)} sx={{ ml: 1 }}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: 14 }}>
                OP
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>

        <TasksMenu
          anchorEl={taskMenuAnchor}
          onClose={() => setTaskMenuAnchor(null)}
          tasks={notifications.tasks}
          onMarkDone={(id) => notifications.markDone(id)}
          onMarkAllDone={() => notifications.markAllDone()}
          dropdownWidth={dropdownWidth}
        />

        <NotifyMenu
          anchorEl={notifyMenuAnchor}
          onClose={() => setNotifyMenuAnchor(null)}
          notifications={notifications.notifications}
          onMarkRead={(id) => notifications.markRead(id)}
          onMarkAllRead={() => notifications.markAllRead()}
          dropdownWidth={dropdownWidth}
        />

        <UserMenu
          anchorEl={userMenuAnchor}
          onClose={() => setUserMenuAnchor(null)}
          menuWidth={userMenuWidth}
        />
      </Toolbar>
    </AppBar>
  )
})
