import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import { type ReactNode } from 'react'

import { type Attachment, type Message } from './types'

function highlightText(text: string, query: string): ReactNode {
  if (!query.trim()) return text
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  return parts.map((part, i) =>
    regex.test(part) ? (
      <Box
        key={`hl-${i}-${part}`}
        component="mark"
        sx={{ bgcolor: 'warning.light', color: 'text.primary', borderRadius: 0.5, px: 0.25 }}
      >
        {part}
      </Box>
    ) : (
      part
    ),
  )
}

function AttachmentPreview({ attachment }: { attachment: Attachment }) {
  if (attachment.type === 'image') {
    return (
      <Box
        component="img"
        src={attachment.url}
        alt={attachment.name}
        sx={{
          maxWidth: '100%',
          maxHeight: 160,
          borderRadius: 1,
          objectFit: 'cover',
          display: 'block',
        }}
      />
    )
  }
  return (
    <Chip
      icon={<InsertDriveFileOutlinedIcon sx={{ fontSize: 16 }} />}
      label={attachment.name}
      size="small"
      variant="outlined"
      sx={{ maxWidth: '100%' }}
    />
  )
}

interface MessageBubbleProps {
  message: Message
  searchQuery: string
}

export function MessageBubble({ message, searchQuery }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          maxWidth: '85%',
          flexDirection: isUser ? 'row-reverse' : 'row',
          alignItems: 'flex-start',
        }}
      >
        {!isUser && (
          <Avatar sx={{ width: 28, height: 28, bgcolor: 'primary.main', flexShrink: 0, mt: 0.5 }}>
            <SmartToyIcon sx={{ fontSize: 16 }} />
          </Avatar>
        )}
        <Box sx={{ minWidth: 0 }}>
          <Box
            sx={{
              px: 1.5,
              py: 1,
              borderRadius: 2,
              bgcolor: isUser ? 'primary.main' : 'background.paper',
              color: isUser ? 'primary.contrastText' : 'text.primary',
              border: !isUser ? '1px solid' : 'none',
              borderColor: 'divider',
            }}
          >
            {message.attachments && message.attachments.length > 0 && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.5,
                  mb: message.text ? 1 : 0,
                }}
              >
                {message.attachments.map((att) => (
                  <AttachmentPreview key={att.id} attachment={att} />
                ))}
              </Box>
            )}
            {message.text && (
              <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                {highlightText(message.text, searchQuery)}
              </Typography>
            )}
          </Box>
          <Typography
            variant="caption"
            color="text.disabled"
            sx={{
              mt: 0.5,
              display: 'block',
              textAlign: isUser ? 'right' : 'left',
              px: 0.5,
            }}
          >
            {message.time}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
