import Box from '@mui/material/Box'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'

import { useStore } from '../core/stores'

import { AttachmentStrip } from './AttachmentStrip'
import { ChatInput } from './ChatInput'
import { MessageList } from './MessageList'
import { type Attachment } from './types'

export const ConversationDetail = observer(function ConversationDetail() {
  const { agent } = useStore()
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const conv = agent.activeConversation
  if (!conv) return null

  const handleSend = (text: string, atts: Attachment[]) => {
    agent.sendMessage(conv.id, text, atts)
    setAttachments([])
  }

  const removeAttachment = (id: number) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id))
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      <MessageList messages={conv.messages} searchQuery={agent.searchQuery} />
      <AttachmentStrip attachments={attachments} onRemove={removeAttachment} />
      <ChatInput
        onSend={handleSend}
        attachments={attachments}
        onAttachmentsChange={setAttachments}
        hasAttachments={attachments.length > 0}
      />
    </Box>
  )
})
