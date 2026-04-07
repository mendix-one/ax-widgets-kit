import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'

import { useStore } from '../core/stores'

import { AgentHeader } from './AgentHeader'
import { ConversationDetail } from './ConversationDetail'
import { ConversationInfoPanel } from './ConversationInfoPanel'
import { ConversationList } from './ConversationList'

export const AgentPanel = observer(function AgentPanel() {
  const { ui, agent } = useStore()
  const [infoOpen, setInfoOpen] = useState(false)

  const handleClose = () => {
    setInfoOpen(false)
    if (!agent.handleClose()) {
      ui.setAgentOpen(false)
    }
  }

  const handleDelete = () => {
    const id = agent.activeConversation?.id
    setInfoOpen(false)
    if (id) agent.deleteConversation(id)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: 'background.default',
      }}
    >
      <AgentHeader
        onClose={handleClose}
        infoOpen={infoOpen}
        onToggleInfo={() => setInfoOpen((prev) => !prev)}
      />

      {/* Label suggestions in list search mode */}
      {agent.searchMode && !agent.activeConversation && (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 0.5,
            px: 1.5,
            py: 1,
            borderBottom: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
            flexShrink: 0,
          }}
        >
          {agent.allLabels.map((label) => (
            <Chip
              key={label}
              label={label}
              size="small"
              variant={
                agent.searchQuery.toLowerCase() === label.toLowerCase() ? 'filled' : 'outlined'
              }
              color={
                agent.searchQuery.toLowerCase() === label.toLowerCase() ? 'primary' : 'default'
              }
              onClick={() => agent.setSearchQuery(label)}
              sx={{ fontSize: 11, height: 22, cursor: 'pointer' }}
            />
          ))}
        </Box>
      )}

      {/* Body (relative container for info panel overlay) */}
      <Box
        sx={{
          position: 'relative',
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Info panel overlay */}
        {agent.activeConversation && (
          <ConversationInfoPanel open={infoOpen} onDelete={handleDelete} />
        )}

        {agent.activeConversation ? (
          <ConversationDetail />
        ) : (
          <>
            <Divider />
            <ConversationList />
          </>
        )}
      </Box>
    </Box>
  )
})
