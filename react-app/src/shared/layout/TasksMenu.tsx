import AssignmentLateIcon from '@mui/icons-material/AssignmentLate'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Menu from '@mui/material/Menu'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import { type UrgentTask, timeAgo } from './types'

interface TasksMenuProps {
  anchorEl: HTMLElement | null
  onClose: () => void
  tasks: UrgentTask[]
  onMarkDone: (id: number) => void
  onMarkAllDone: () => void
  dropdownWidth: Record<string, unknown>
}

export function TasksMenu({
  anchorEl,
  onClose,
  tasks,
  onMarkDone,
  onMarkAllDone,
  dropdownWidth,
}: TasksMenuProps) {
  const { t } = useTranslation()
  const pendingCount = tasks.filter((task) => !task.done).length

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
          <Typography variant="subtitle2">{t('layout.urgentTasks')}</Typography>
          {pendingCount > 0 && (
            <Chip label={pendingCount} size="small" color="error" sx={{ height: 20 }} />
          )}
        </Box>
        <Button
          size="small"
          startIcon={<DoneAllIcon sx={{ fontSize: 16 }} />}
          onClick={onMarkAllDone}
          disabled={pendingCount === 0}
          sx={{ textTransform: 'none', fontSize: 12 }}
        >
          {t('layout.markAllDone')}
        </Button>
      </Box>
      <Divider sx={{ position: 'sticky', top: 48, zIndex: 1 }} />

      {/* Scrollable list */}
      <Box sx={{ overflowY: 'auto', flex: 1, maxHeight: 420 }}>
        {tasks.map((task) => (
          <Box
            key={task.id}
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
              '&:not(:last-child)': {
                borderBottom: '1px solid',
                borderBottomColor: 'divider',
              },
            }}
            onClick={() => onMarkDone(task.id)}
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
                  {t(task.titleKey)}
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
                {t(task.descKey)}
              </Typography>
              <Typography
                variant="caption"
                color="text.disabled"
                sx={{ mt: 0.5, display: 'block' }}
              >
                {timeAgo(task.timestamp, t)}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Menu>
  )
}
