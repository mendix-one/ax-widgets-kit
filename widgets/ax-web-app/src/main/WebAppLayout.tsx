import MenuIcon from '@mui/icons-material/Menu'
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { observer } from 'mobx-react-lite'
import { type ReactElement, type ReactNode, useCallback } from 'react'

import { useWebAppStore } from './context'

const DRAWER_FULL = 240
const RESIZE_W = 4
const TRANSITION = 'width 0.25s ease-in-out'

interface WebAppLayoutProps {
  logo?: ReactNode
  tasksMenu?: ReactNode
  notifyMenu?: ReactNode
  userMenu?: ReactNode
  sidebar?: ReactNode
  content?: ReactNode
  agentChat?: ReactNode
}

export const WebAppLayout = observer(function WebAppLayout({
  logo,
  tasksMenu,
  notifyMenu,
  userMenu,
  sidebar,
  content,
  agentChat,
}: WebAppLayoutProps): ReactElement {
  const theme = useTheme()
  const store = useWebAppStore()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleResizeStart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      store.setResizing(true)
      const startX = e.clientX
      const startW = store.agentWidth

      const onMouseMove = (ev: MouseEvent) => store.setAgentWidth(startW + (startX - ev.clientX))
      const onMouseUp = () => {
        store.setResizing(false)
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
      }

      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    },
    [store],
  )

  return (
    <Box sx={{ display: 'flex', height: '100dvh', overflow: 'hidden' }}>
      {/* Left panel */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minWidth: 0,
          overflow: 'hidden',
          transition: store.resizing ? 'none' : TRANSITION,
        }}
      >
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
              {logo}
              <IconButton onClick={() => store.toggleSidebar(isMobile)} size="small" sx={{ color: 'text.secondary' }}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {agentChat && (
                <Tooltip title="AI Assistant">
                  <IconButton
                    onClick={() => store.toggleAgent()}
                    sx={{ color: store.agentOpen ? 'primary.main' : 'text.secondary' }}
                  >
                    <SmartToyOutlinedIcon />
                  </IconButton>
                </Tooltip>
              )}
              {tasksMenu}
              {notifyMenu}
              {userMenu}
            </Box>
          </Toolbar>
        </AppBar>

        <Box sx={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>
          {sidebar && !isMobile && (
            <Drawer
              variant="permanent"
              sx={{
                width: store.drawerWidth,
                flexShrink: 0,
                transition: 'width 0.25s ease-in-out',
                '& .MuiDrawer-paper': {
                  position: 'relative',
                  width: store.drawerWidth,
                  boxSizing: 'border-box',
                  overflowX: 'hidden',
                  transition: 'width 0.25s ease-in-out',
                },
              }}
            >
              {sidebar}
            </Drawer>
          )}
          {sidebar && isMobile && (
            <Drawer
              variant="temporary"
              open={store.mobileOpen}
              onClose={() => store.setMobileOpen(false)}
              ModalProps={{ keepMounted: true }}
              sx={{ '& .MuiDrawer-paper': { width: DRAWER_FULL, boxSizing: 'border-box' } }}
            >
              {sidebar}
            </Drawer>
          )}
          <Box component="main" sx={{ flex: 1, overflowY: 'auto', minWidth: 0, p: { xs: 2, sm: 3 } }}>
            {content}
          </Box>
        </Box>
      </Box>

      {/* Agent panel (desktop) */}
      {agentChat && !isMobile && (
        <Box
          sx={{
            display: 'flex',
            flexShrink: 0,
            overflow: 'hidden',
            width: store.agentPanelWidth,
            transition: store.resizing ? 'none' : TRANSITION,
          }}
        >
          <Box
            onMouseDown={handleResizeStart}
            sx={{
              width: RESIZE_W,
              flexShrink: 0,
              cursor: 'col-resize',
              bgcolor: 'divider',
              '&:hover': { bgcolor: 'primary.main' },
              transition: 'background-color 0.15s',
            }}
          />
          <Box
            sx={{
              width: store.agentWidth,
              minWidth: store.agentWidth,
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              borderLeft: '1px solid',
              borderColor: 'divider',
            }}
          >
            {agentChat}
          </Box>
        </Box>
      )}

      {/* Agent panel (mobile) */}
      {agentChat && isMobile && (
        <Drawer
          variant="temporary"
          anchor="bottom"
          open={store.agentOpen}
          onClose={() => store.setAgentOpen(false)}
          sx={{ '& .MuiDrawer-paper': { height: '75dvh', borderRadius: '16px 16px 0 0' } }}
        >
          {agentChat}
        </Drawer>
      )}
    </Box>
  )
})
