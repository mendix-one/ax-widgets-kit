import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

import { useStore } from '../core/stores'

function timeAgo(ts: number): string {
  const seconds = Math.floor((Date.now() - ts) / 1000)
  if (seconds < 60) return 'Just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  const weeks = Math.floor(days / 7)
  if (weeks < 4) return `${weeks}w ago`
  const months = Math.floor(days / 30)
  return `${months}mo ago`
}

export const ConversationList = observer(function ConversationList() {
  const { t } = useTranslation()
  const { agent } = useStore()
  const filtered = agent.filteredConversations

  return (
    <Box sx={{ flex: 1, overflowY: 'auto' }}>
      <List disablePadding>
        {filtered.map((conv) => (
          <ListItemButton
            key={conv.id}
            selected={conv.id === agent.activeId}
            onClick={() => {
              agent.setActiveId(conv.id)
              agent.exitSearch()
            }}
            sx={{
              py: 1.25,
              px: 2,
              alignItems: 'flex-start',
              gap: 1,
              '&:not(:last-child)': { borderBottom: '1px solid', borderColor: 'divider' },
            }}
          >
            <ListItemIcon sx={{ minWidth: 28, mt: 0.25 }}>
              <ChatBubbleOutlineIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
            </ListItemIcon>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" noWrap sx={{ fontWeight: 500, lineHeight: 1.4 }}>
                {conv.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                <Chip
                  label={conv.label}
                  size="small"
                  variant="outlined"
                  sx={{ height: 18, fontSize: 11 }}
                />
                <Typography variant="caption" color="text.disabled" sx={{ lineHeight: 1 }}>
                  {timeAgo(conv.updatedAt)}
                </Typography>
              </Box>
            </Box>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation()
                agent.deleteConversation(conv.id)
              }}
              sx={{ opacity: 0.5, '&:hover': { opacity: 1 }, mt: 0.25 }}
            >
              <DeleteOutlineIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </ListItemButton>
        ))}
      </List>
      {filtered.length === 0 && (
        <Typography variant="caption" color="text.disabled" sx={{ px: 2, py: 2, display: 'block' }}>
          {agent.searchQuery ? t('agent.noResults') : t('agent.noConversations')}
        </Typography>
      )}
    </Box>
  )
})
