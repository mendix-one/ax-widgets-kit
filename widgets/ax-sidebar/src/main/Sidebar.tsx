import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Tooltip from '@mui/material/Tooltip'
import { observer } from 'mobx-react-lite'
import { type ReactElement, type ReactNode } from 'react'

import { useSidebarStore } from './context'

interface SidebarProps {
  collapsed?: boolean
  children?: ReactNode
}

export const Sidebar = observer(function Sidebar({ collapsed = false, children }: SidebarProps): ReactElement {
  const store = useSidebarStore()

  if (children) {
    return <>{children}</>
  }

  return (
    <List role="navigation" aria-label="Sidebar navigation">
      {store.items.map((item) => (
        <Tooltip key={item.id} title={collapsed ? item.label : ''} placement="right">
          <ListItemButton
            selected={store.activeId === item.id}
            onClick={() => store.selectItem(item.id)}
            sx={{
              justifyContent: collapsed ? 'center' : 'initial',
              '&.Mui-selected': {
                bgcolor: 'action.selected',
                color: 'primary.main',
                '& .MuiListItemIcon-root': { color: 'primary.main' },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: collapsed ? 0 : 40, justifyContent: 'center' }}>{item.icon}</ListItemIcon>
            {!collapsed && <ListItemText primary={item.label} />}
          </ListItemButton>
        </Tooltip>
      ))}
    </List>
  )
})
