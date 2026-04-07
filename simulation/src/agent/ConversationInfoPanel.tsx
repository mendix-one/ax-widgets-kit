import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'
import LinkIcon from '@mui/icons-material/Link'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { observer } from 'mobx-react-lite'
import { type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { useStore } from '../core/stores'

interface ConversationInfoPanelProps {
  open: boolean
  onDelete: () => void
}

function AssetSection({
  icon,
  label,
  count,
  emptyText,
  children,
}: {
  icon: ReactNode
  label: string
  count: number
  emptyText: string
  children: ReactNode
}) {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 0.75 }}>
        {icon}
        <Typography variant="caption" sx={{ fontWeight: 600, textTransform: 'uppercase', flex: 1 }}>
          {label}
        </Typography>
        {count > 0 && (
          <Typography variant="caption" color="text.secondary">
            {count}
          </Typography>
        )}
      </Box>
      {count > 0 ? (
        <List dense disablePadding sx={{ px: 1 }}>
          {children}
        </List>
      ) : (
        <Typography variant="caption" color="text.disabled" sx={{ px: 2, pb: 1, display: 'block' }}>
          {emptyText}
        </Typography>
      )}
      <Divider />
    </>
  )
}

export const ConversationInfoPanel = observer(function ConversationInfoPanel({
  open,
  onDelete,
}: ConversationInfoPanelProps) {
  const { t } = useTranslation()
  const { agent } = useStore()
  const conv = agent.activeConversation
  if (!conv) return null
  const assets = agent.convAssets
  const noItems = t('agent.noItems')

  return (
    <Collapse
      in={open}
      unmountOnExit
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          overflowY: 'auto',
          maxHeight: 'calc(100% - 1px)',
          boxShadow: 3,
        }}
      >
        {/* Title & label */}
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
            {conv.title}
          </Typography>
          <Chip
            label={conv.label}
            size="small"
            variant="outlined"
            sx={{ fontSize: 11, height: 20 }}
          />
        </Box>
        <Divider />

        {/* Images */}
        <AssetSection
          icon={<ImageOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />}
          label={t('agent.images')}
          count={assets.images.length}
          emptyText={noItems}
        >
          {assets.images.map((img, i) => (
            <ListItem key={`img-${i}`} sx={{ py: 0.25 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Box
                  component="img"
                  src={img.url}
                  alt={img.name}
                  sx={{ width: 28, height: 28, borderRadius: 0.5, objectFit: 'cover' }}
                />
              </ListItemIcon>
              <ListItemText
                primary={img.name}
                primaryTypographyProps={{ variant: 'caption', noWrap: true }}
              />
            </ListItem>
          ))}
        </AssetSection>

        {/* Files */}
        <AssetSection
          icon={<InsertDriveFileOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />}
          label={t('agent.files')}
          count={assets.files.length}
          emptyText={noItems}
        >
          {assets.files.map((file, i) => (
            <ListItem key={`file-${i}`} sx={{ py: 0.25 }}>
              <ListItemIcon sx={{ minWidth: 28 }}>
                <InsertDriveFileOutlinedIcon sx={{ fontSize: 16 }} />
              </ListItemIcon>
              <ListItemText
                primary={file.name}
                primaryTypographyProps={{ variant: 'caption', noWrap: true }}
              />
            </ListItem>
          ))}
        </AssetSection>

        {/* Links */}
        <AssetSection
          icon={<LinkIcon sx={{ fontSize: 16, color: 'text.secondary' }} />}
          label={t('agent.links')}
          count={assets.links.length}
          emptyText={noItems}
        >
          {assets.links.map((link, i) => (
            <ListItem
              key={`link-${i}`}
              component="a"
              href={link}
              target="_blank"
              rel="noopener"
              sx={{ py: 0.25, color: 'primary.main', textDecoration: 'none' }}
            >
              <ListItemIcon sx={{ minWidth: 28 }}>
                <LinkIcon sx={{ fontSize: 16 }} />
              </ListItemIcon>
              <ListItemText
                primary={link}
                primaryTypographyProps={{ variant: 'caption', noWrap: true }}
              />
            </ListItem>
          ))}
        </AssetSection>

        {/* Delete */}
        <Box sx={{ px: 2, py: 1.5 }}>
          <Button
            fullWidth
            size="small"
            color="error"
            variant="outlined"
            startIcon={<DeleteOutlineIcon sx={{ fontSize: 16 }} />}
            onClick={onDelete}
            sx={{ textTransform: 'none', fontSize: 12 }}
          >
            {t('agent.deleteConversation')}
          </Button>
        </Box>
      </Box>
    </Collapse>
  )
})
