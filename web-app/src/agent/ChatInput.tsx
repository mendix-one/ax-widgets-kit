import AddIcon from '@mui/icons-material/Add'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'
import ScreenshotMonitorOutlinedIcon from '@mui/icons-material/ScreenshotMonitorOutlined'
import SendIcon from '@mui/icons-material/Send'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { type Attachment } from './types'

interface ChatInputProps {
  onSend: (text: string, attachments: Attachment[]) => void
  attachments: Attachment[]
  onAttachmentsChange: (attachments: Attachment[]) => void
  hasAttachments: boolean
}

export function ChatInput({
  onSend,
  attachments,
  onAttachmentsChange,
  hasAttachments,
}: ChatInputProps) {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [addMenuAnchor, setAddMenuAnchor] = useState<null | HTMLElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const attachmentsRef = useRef(attachments)
  useEffect(() => {
    attachmentsRef.current = attachments
  }, [attachments])

  const canSend = input.trim() || attachments.length > 0

  const handleSend = () => {
    const text = input.trim()
    if (!text && attachments.length === 0) return
    onSend(text, attachments)
    setInput('')
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const newAttachments: Attachment[] = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.type.startsWith('image/') ? 'image' : 'file',
      url: URL.createObjectURL(file),
    }))
    onAttachmentsChange([...attachments, ...newAttachments])
    e.target.value = ''
  }

  const openFilePicker = (accept: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = accept
    }
    setAddMenuAnchor(null)
    setTimeout(() => fileInputRef.current?.click(), 0)
  }

  const openCamera = () => {
    setAddMenuAnchor(null)
    setTimeout(() => cameraInputRef.current?.click(), 0)
  }

  const handleCaptureScreen = async () => {
    setAddMenuAnchor(null)
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true })
      const video = document.createElement('video')
      video.srcObject = stream
      await video.play()
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      canvas.getContext('2d')?.drawImage(video, 0, 0)
      stream.getTracks().forEach((track) => track.stop())
      canvas.toBlob((blob) => {
        if (!blob) return
        const file = new File([blob], `screenshot_${Date.now()}.png`, { type: 'image/png' })
        const att: Attachment = {
          id: Date.now() + Math.random(),
          name: file.name,
          type: 'image',
          url: URL.createObjectURL(file),
        }
        onAttachmentsChange([...attachmentsRef.current, att])
      }, 'image/png')
    } catch {
      // User cancelled or API not supported
    }
  }

  return (
    <Box
      sx={{
        px: 1.5,
        py: 1,
        borderTop: hasAttachments ? 'none' : '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        display: 'flex',
        alignItems: 'flex-end',
        gap: 0.5,
        flexShrink: 0,
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        hidden
        accept="*"
        onChange={handleFileSelect}
      />
      <input
        ref={cameraInputRef}
        type="file"
        hidden
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
      />
      <IconButton
        size="small"
        onClick={(e) => setAddMenuAnchor(e.currentTarget)}
        sx={{ color: 'text.secondary', mb: 0.5 }}
      >
        <AddIcon fontSize="small" />
      </IconButton>
      <Menu
        anchorEl={addMenuAnchor}
        open={Boolean(addMenuAnchor)}
        onClose={() => setAddMenuAnchor(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <MenuItem onClick={openCamera}>
          <ListItemIcon>
            <CameraAltOutlinedIcon fontSize="small" />
          </ListItemIcon>
          {t('agent.takePicture')}
        </MenuItem>
        <MenuItem onClick={() => handleCaptureScreen()}>
          <ListItemIcon>
            <ScreenshotMonitorOutlinedIcon fontSize="small" />
          </ListItemIcon>
          {t('agent.captureScreen')}
        </MenuItem>
        <MenuItem onClick={() => openFilePicker('image/*')}>
          <ListItemIcon>
            <ImageOutlinedIcon fontSize="small" />
          </ListItemIcon>
          {t('agent.chooseImages')}
        </MenuItem>
        <MenuItem onClick={() => openFilePicker('*')}>
          <ListItemIcon>
            <InsertDriveFileOutlinedIcon fontSize="small" />
          </ListItemIcon>
          {t('agent.chooseFile')}
        </MenuItem>
      </Menu>
      <TextField
        fullWidth
        size="small"
        multiline
        maxRows={4}
        placeholder={t('agent.placeholder')}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
          }
        }}
        sx={{
          flex: 1,
          '& .MuiOutlinedInput-root': { py: 0.75, fontSize: 14 },
        }}
      />
      <IconButton size="small" onClick={handleSend} disabled={!canSend} sx={{ mb: 0.5 }}>
        <SendIcon fontSize="small" color={canSend ? 'primary' : 'disabled'} />
      </IconButton>
    </Box>
  )
}
