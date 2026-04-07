import BarChartIcon from '@mui/icons-material/BarChart'
import BugReportIcon from '@mui/icons-material/BugReport'
import DashboardIcon from '@mui/icons-material/Dashboard'
import FolderIcon from '@mui/icons-material/Folder'
import InfoIcon from '@mui/icons-material/Info'
import MapIcon from '@mui/icons-material/Map'
import { type ReactElement } from 'react'

const icons: Record<string, ReactElement> = {
  dashboard: <DashboardIcon />,
  analytics: <BarChartIcon />,
  defects: <BugReportIcon />,
  lots: <FolderIcon />,
  roadmap: <MapIcon />,
  info: <InfoIcon />,
}

interface SidebarIconProps {
  type: 'dashboard' | 'analytics' | 'defects' | 'lots' | 'roadmap' | 'info'
}

export function SidebarIcon({ type }: SidebarIconProps): ReactElement {
  return icons[type] ?? icons.info
}
