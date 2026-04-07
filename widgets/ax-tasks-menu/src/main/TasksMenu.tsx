import AssignmentLateIcon from '@mui/icons-material/AssignmentLate'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
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
import { type ReactElement, useState } from 'react'

import { useTasksMenuStore } from './context'

export const TasksMenu = observer(function TasksMenu(): ReactElement {
  const store = useTasksMenuStore()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  return (
    <>
      <Tooltip title={store.title}>
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} color="inherit" aria-haspopup="true" aria-expanded={Boolean(anchorEl)}>
          <Badge badgeContent={store.pendingCount} color="error">
            <AssignmentLateIcon sx={{ color: 'text.secondary' }} />
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
            {store.pendingCount > 0 && (
              <Chip label={store.pendingCount} size="small" color="error" sx={{ height: 20 }} />
            )}
          </Box>
          <Button
            size="small"
            startIcon={<DoneAllIcon sx={{ fontSize: 16 }} />}
            onClick={() => store.markAllDone()}
            disabled={store.pendingCount === 0}
            sx={{ textTransform: 'none', fontSize: 12 }}
          >
            Mark all done
          </Button>
        </Box>
        <Divider sx={{ position: 'sticky', top: 48, zIndex: 1 }} />

        {/* Task list */}
        <Box sx={{ overflowY: 'auto', flex: 1, maxHeight: 420 }} role="list">
          {store.items.map((task) => (
            <Box
              key={task.id}
              role="listitem"
              sx={{
                px: 2,
                py: 1.5,
                display: 'flex',
                gap: 1.5,
                alignItems: 'flex-start',
                bgcolor: task.done ? 'transparent' : 'action.hover',
                borderLeft: '3px solid',
                borderColor: 'error.main',
                cursor: 'pointer',
                '&:hover': { bgcolor: 'action.selected' },
                '&:not(:last-child)': { borderBottom: '1px solid', borderBottomColor: 'divider' },
              }}
              onClick={() => store.markDone(task.id)}
            >
              <Box sx={{ mt: 0.25 }}>
                <AssignmentLateIcon color="error" />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.25 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: task.done ? 400 : 600,
                      textDecoration: task.done ? 'line-through' : 'none',
                      color: task.done ? 'text.disabled' : 'text.primary',
                      flex: 1,
                    }}
                    noWrap
                  >
                    {task.title}
                  </Typography>
                  {!task.done && <FiberManualRecordIcon sx={{ fontSize: 8, color: 'error.main' }} />}
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
                  {task.description}
                </Typography>
                <Typography variant="caption" color="text.disabled" sx={{ mt: 0.5, display: 'block' }}>
                  {task.timestamp}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Menu>
    </>
  )
})
