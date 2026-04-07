import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { observer } from 'mobx-react-lite'
import { useCallback, useState } from 'react'
import { Outlet } from 'react-router'

import { AgentPanel } from '../../agent/AgentPanel'
import aPlannerDark from '../../assets/a-planner-ai-dark.png'
import aPlannerLight from '../../assets/a-planner-ai-light.png'
import { useStore } from '../../core/stores'

import { AppHeader } from './AppHeader'
import { AppSidebar } from './AppSidebar'

const RESIZE_HANDLE_WIDTH = 4
const AGENT_TRANSITION = 'width 0.25s ease-in-out'

export const Layout = observer(function Layout() {
  const theme = useTheme()
  const { ui } = useStore()
  const logo = ui.resolvedMode === 'dark' ? aPlannerDark : aPlannerLight
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [resizing, setResizing] = useState(false)

  const handleResizeStart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      setResizing(true)
      const startX = e.clientX
      const startWidth = ui.agentWidth

      const onMouseMove = (ev: MouseEvent) => {
        ui.setAgentWidth(startWidth + (startX - ev.clientX))
      }

      const onMouseUp = () => {
        setResizing(false)
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
      }

      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    },
    [ui],
  )

  const toggleSidebar = () => {
    if (isMobile) {
      ui.setMobileOpen(!ui.mobileOpen)
    } else {
      const next = ui.sidebarMode === 'show' ? 'mini' : ui.sidebarMode === 'mini' ? 'hide' : 'show'
      ui.setSidebarMode(next)
    }
  }

  const agentPanelWidth = ui.agentOpen ? ui.agentWidth + RESIZE_HANDLE_WIDTH : 0

  return (
    <Box sx={{ display: 'flex', height: '100dvh', overflow: 'hidden' }}>
      {/* Left panel: header + sidebar + main */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minWidth: 0,
          overflow: 'hidden',
          transition: resizing ? 'none' : AGENT_TRANSITION,
        }}
      >
        <AppHeader logo={logo} onToggleSidebar={toggleSidebar} />

        {/* Content row: sidebar + main */}
        <Box sx={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>
          <AppSidebar isMobile={isMobile} />

          {/* Main body: scrollable */}
          <Box
            component="main"
            sx={{ flex: 1, overflowY: 'auto', minWidth: 0, p: { xs: 2, sm: 3 } }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>

      {/* Right panel: agent chat (desktop) — always mounted for animation */}
      {!isMobile && (
        <Box
          sx={{
            display: 'flex',
            flexShrink: 0,
            overflow: 'hidden',
            width: agentPanelWidth,
            transition: resizing ? 'none' : AGENT_TRANSITION,
          }}
        >
          <Box
            onMouseDown={handleResizeStart}
            sx={{
              width: RESIZE_HANDLE_WIDTH,
              flexShrink: 0,
              cursor: 'col-resize',
              bgcolor: 'divider',
              '&:hover': { bgcolor: 'primary.main' },
              transition: 'background-color 0.15s',
            }}
          />
          <Box
            sx={{
              width: ui.agentWidth,
              minWidth: ui.agentWidth,
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              borderLeft: '1px solid',
              borderColor: 'divider',
            }}
          >
            <AgentPanel />
          </Box>
        </Box>
      )}

      {/* Mobile: agent as bottom drawer (has built-in slide animation) */}
      {isMobile && (
        <Drawer
          variant="temporary"
          anchor="bottom"
          open={ui.agentOpen}
          onClose={() => ui.setAgentOpen(false)}
          sx={{ '& .MuiDrawer-paper': { height: '75dvh', borderRadius: '16px 16px 0 0' } }}
        >
          <AgentPanel />
        </Drawer>
      )}
    </Box>
  )
})
