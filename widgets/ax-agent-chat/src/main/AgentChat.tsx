import SendIcon from '@mui/icons-material/Send'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { observer } from 'mobx-react-lite'
import { type ReactElement, useEffect, useRef } from 'react'

import { useAgentChatStore } from './context'

export const AgentChat = observer(function AgentChat(): ReactElement {
  const store = useAgentChatStore()
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [store.messages.length])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: 'background.default' }}>
      {/* Header */}
      <Box
        role="banner"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 1.5,
          minHeight: 48,
          flexShrink: 0,
          bgcolor: 'background.paper',
          borderBottom: '2px solid',
          borderColor: 'divider',
        }}
      >
        <SmartToyIcon color="primary" sx={{ fontSize: 20 }} />
        <Typography variant="subtitle2" sx={{ flex: 1, ml: 0.5 }} noWrap>
          {store.title}
        </Typography>
      </Box>

      {/* Messages */}
      <Box sx={{ flex: 1, overflowY: 'auto', px: 2, py: 2 }} role="log" aria-live="polite">
        {store.messages.map((msg) => {
          const isUser = msg.role === 'user'
          return (
            <Box key={msg.id} role="article" sx={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', mb: 2 }}>
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
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                      {msg.text}
                    </Typography>
                  </Box>
                  <Typography
                    variant="caption"
                    color="text.disabled"
                    sx={{ mt: 0.5, display: 'block', textAlign: isUser ? 'right' : 'left', px: 0.5 }}
                  >
                    {msg.time}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )
        })}
        <div ref={bottomRef} />
      </Box>

      {/* Input */}
      <Box
        sx={{
          px: 1.5,
          py: 1,
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          display: 'flex',
          alignItems: 'flex-end',
          gap: 0.5,
          flexShrink: 0,
        }}
      >
        <TextField
          fullWidth
          size="small"
          multiline
          maxRows={4}
          placeholder="Type a message..."
          value={store.input}
          onChange={(e) => store.setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              store.sendMessage()
            }
          }}
          sx={{ flex: 1, '& .MuiOutlinedInput-root': { py: 0.75, fontSize: 14 } }}
          slotProps={{ input: { 'aria-label': 'Type a message' } }}
        />
        <IconButton size="small" onClick={() => store.sendMessage()} disabled={!store.canSend} sx={{ mb: 0.5 }}>
          <SendIcon fontSize="small" color={store.canSend ? 'primary' : 'disabled'} />
        </IconButton>
      </Box>
    </Box>
  )
})
