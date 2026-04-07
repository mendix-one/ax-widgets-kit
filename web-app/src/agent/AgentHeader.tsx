import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SearchIcon from '@mui/icons-material/Search'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { observer } from 'mobx-react-lite'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { useStore } from '../core/stores'

interface AgentHeaderProps {
  onClose: () => void
  infoOpen?: boolean
  onToggleInfo?: () => void
}

const headerSx = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  px: 1.5,
  minHeight: 48,
  flexShrink: 0,
  bgcolor: 'background.paper',
  borderBottom: '1px solid',
  borderColor: 'divider',
}

export const AgentHeader = observer(function AgentHeader({
  onClose,
  infoOpen,
  onToggleInfo,
}: AgentHeaderProps) {
  const { t } = useTranslation()
  const { agent } = useStore()
  const searchRef = useRef<HTMLInputElement>(null)

  const handleEnterSearch = () => {
    agent.enterSearch()
    setTimeout(() => searchRef.current?.focus(), 50)
  }

  if (agent.searchMode) {
    return (
      <Box sx={headerSx}>
        <SearchIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
        <TextField
          inputRef={searchRef}
          fullWidth
          size="small"
          variant="standard"
          placeholder={
            agent.activeConversation ? t('agent.searchMessages') : t('agent.searchConversations')
          }
          value={agent.searchQuery}
          onChange={(e) => agent.setSearchQuery(e.target.value)}
          slotProps={{
            input: {
              disableUnderline: true,
              endAdornment: agent.searchQuery && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => agent.setSearchQuery('')}>
                    <CloseIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') agent.exitSearch()
          }}
        />
        <IconButton size="small" onClick={() => agent.exitSearch()}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
    )
  }

  const conv = agent.activeConversation
  if (conv) {
    return (
      <Box sx={headerSx}>
        <Typography variant="subtitle2" sx={{ flex: 1 }} noWrap>
          {conv.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
          <Tooltip title={t('agent.search')}>
            <IconButton size="small" onClick={handleEnterSearch}>
              <SearchIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('agent.options')}>
            <IconButton
              size="small"
              onClick={onToggleInfo}
              sx={{ color: infoOpen ? 'primary.main' : undefined }}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('agent.backToList')}>
            <IconButton size="small" onClick={onClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        ...headerSx,
        borderBottom: '2px solid',
      }}
    >
      <SmartToyIcon color="primary" sx={{ fontSize: 20 }} />
      <Typography variant="subtitle2" sx={{ flex: 1, ml: 0.5 }} noWrap>
        {t('agent.title')}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
        <Tooltip title={t('agent.search')}>
          <IconButton size="small" onClick={handleEnterSearch}>
            <SearchIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title={t('agent.newConversation')}>
          <IconButton size="small" onClick={() => agent.createConversation()}>
            <AddIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title={t('agent.closePanel')}>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  )
})
