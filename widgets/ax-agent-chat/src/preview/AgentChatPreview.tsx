import { ReactElement } from 'react'

export interface AgentChatPreviewProps {
  title: string
  welcomeMessage: string
}

export function AgentChatPreview({ title, welcomeMessage }: AgentChatPreviewProps): ReactElement {
  const displayTitle = title || 'AI Assistant'
  const displayMessage = welcomeMessage || 'Hi! I\'m your assistant. How can I help?'

  return (
    <div className="ax-preview-agent-chat">
      {/* Header */}
      <div className="ax-preview-agent-chat__header">
        <span className="ax-preview-agent-chat__header-avatar">AI</span>
        <span className="ax-preview-agent-chat__header-title">{displayTitle}</span>
      </div>

      {/* Messages */}
      <div className="ax-preview-agent-chat__messages">
        {/* Agent message */}
        <div className="ax-preview-agent-chat__msg ax-preview-agent-chat__msg--agent">
          <div className="ax-preview-agent-chat__msg-row">
            <span className="ax-preview-agent-chat__msg-avatar">AI</span>
            <div className="ax-preview-agent-chat__bubble ax-preview-agent-chat__bubble--agent">
              {displayMessage}
            </div>
          </div>
        </div>

        {/* User message */}
        <div className="ax-preview-agent-chat__msg ax-preview-agent-chat__msg--user">
          <div className="ax-preview-agent-chat__msg-row">
            <div className="ax-preview-agent-chat__bubble ax-preview-agent-chat__bubble--user">
              What is the current yield?
            </div>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="ax-preview-agent-chat__input">
        <div className="ax-preview-agent-chat__field">Type a message...</div>
        <span className="ax-preview-agent-chat__send">&#10148;</span>
      </div>
    </div>
  )
}
