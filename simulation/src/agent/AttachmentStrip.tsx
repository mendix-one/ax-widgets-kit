import CloseIcon from '@mui/icons-material/Close'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import { type Attachment } from './types'

interface AttachmentStripProps {
  attachments: Attachment[]
  onRemove: (id: number) => void
}

export function AttachmentStrip({ attachments, onRemove }: AttachmentStripProps) {
  if (attachments.length === 0) return null

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        px: 2,
        py: 1,
        overflowX: 'auto',
        flexShrink: 0,
        borderTop: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      {attachments.map((att) => (
        <Box key={att.id} sx={{ position: 'relative', flexShrink: 0 }}>
          {att.type === 'image' ? (
            <Box
              component="img"
              src={att.url}
              alt={att.name}
              sx={{ width: 56, height: 56, borderRadius: 1, objectFit: 'cover' }}
            />
          ) : (
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                px: 0.5,
              }}
            >
              <InsertDriveFileOutlinedIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
              <Typography variant="caption" noWrap sx={{ fontSize: 9, maxWidth: 48 }}>
                {att.name}
              </Typography>
            </Box>
          )}
          <IconButton
            size="small"
            onClick={() => onRemove(att.id)}
            sx={{
              position: 'absolute',
              top: -6,
              right: -6,
              width: 18,
              height: 18,
              bgcolor: 'error.main',
              color: 'white',
              '&:hover': { bgcolor: 'error.dark' },
            }}
          >
            <CloseIcon sx={{ fontSize: 12 }} />
          </IconButton>
        </Box>
      ))}
    </Box>
  )
}
