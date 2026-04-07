import Box from '@mui/material/Box'
import { useEffect, useRef } from 'react'

import { MessageBubble } from './MessageBubble'
import { type Message } from './types'

interface MessageListProps {
  messages: Message[]
  searchQuery: string
}

export function MessageList({ messages, searchQuery }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  return (
    <Box sx={{ flex: 1, overflowY: 'auto', px: 2, py: 2 }}>
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} searchQuery={searchQuery} />
      ))}
      <div ref={bottomRef} />
    </Box>
  )
}
