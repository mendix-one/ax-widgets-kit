import AccountTreeIcon from '@mui/icons-material/AccountTree'
import BugReportIcon from '@mui/icons-material/BugReport'
import DashboardIcon from '@mui/icons-material/Dashboard'
import InfoIcon from '@mui/icons-material/Info'
import InventoryIcon from '@mui/icons-material/Inventory'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Tooltip from '@mui/material/Tooltip'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router'

import { useStore } from '../../core/stores'

import { type SidebarMode } from './types'

const DRAWER_WIDTH_FULL = 240
const DRAWER_WIDTH_MINI = 64

interface AppSidebarProps {
  isMobile: boolean
}

export const AppSidebar = observer(function AppSidebar({ isMobile }: AppSidebarProps) {
  const { t } = useTranslation()
  const { ui } = useStore()

  const navItems = [
    { label: t('nav.dashboard'), icon: <DashboardIcon />, to: '/' },
    { label: t('nav.yieldAnalysis'), icon: <TrendingUpIcon />, to: '/yield' },
    { label: t('nav.defectAnalysis'), icon: <BugReportIcon />, to: '/defects' },
    { label: t('nav.lotTracking'), icon: <InventoryIcon />, to: '/lots' },
    { label: t('nav.technologyRoadmap'), icon: <AccountTreeIcon />, to: '/technology-roadmap' },
  ]

  const handleNavClick = () => {
    if (isMobile) ui.setMobileOpen(false)
  }

  const drawerWidth =
    ui.sidebarMode === 'show'
      ? DRAWER_WIDTH_FULL
      : ui.sidebarMode === 'mini'
        ? DRAWER_WIDTH_MINI
        : 0

  const navLinkSx = (mode: SidebarMode) => ({
    justifyContent: mode === 'mini' ? 'center' : 'initial',
    '&.active': {
      bgcolor: 'action.selected',
      color: 'primary.main',
      '& .MuiListItemIcon-root': { color: 'primary.main' },
    },
  })

  const drawerContent = (mode: SidebarMode) => (
    <>
      <List>
        {navItems.map((item) => (
          <Tooltip key={item.to} title={mode === 'mini' ? item.label : ''} placement="right">
            <ListItemButton
              component={NavLink}
              to={item.to}
              end={item.to === '/'}
              onClick={handleNavClick}
              sx={navLinkSx(mode)}
            >
              <ListItemIcon sx={{ minWidth: mode === 'mini' ? 0 : 40, justifyContent: 'center' }}>
                {item.icon}
              </ListItemIcon>
              {mode === 'show' && <ListItemText primary={item.label} />}
            </ListItemButton>
          </Tooltip>
        ))}
      </List>
      <Divider />
      <List>
        <Tooltip title={mode === 'mini' ? t('nav.about') : ''} placement="right">
          <ListItemButton
            component={NavLink}
            to="/about"
            onClick={handleNavClick}
            sx={navLinkSx(mode)}
          >
            <ListItemIcon sx={{ minWidth: mode === 'mini' ? 0 : 40, justifyContent: 'center' }}>
              <InfoIcon />
            </ListItemIcon>
            {mode === 'show' && <ListItemText primary={t('nav.about')} />}
          </ListItemButton>
        </Tooltip>
      </List>
    </>
  )

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={ui.mobileOpen}
        onClose={() => ui.setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH_FULL, boxSizing: 'border-box' },
        }}
      >
        {drawerContent('show')}
      </Drawer>
    )
  }

  const visibleMode = ui.sidebarMode === 'hide' ? 'mini' : ui.sidebarMode

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        transition: 'width 0.25s ease-in-out',
        '& .MuiDrawer-paper': {
          position: 'relative',
          width: drawerWidth,
          boxSizing: 'border-box',
          overflowX: 'hidden',
          transition: 'width 0.25s ease-in-out',
        },
      }}
    >
      {drawerContent(visibleMode)}
    </Drawer>
  )
})
