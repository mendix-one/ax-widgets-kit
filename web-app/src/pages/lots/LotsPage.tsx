import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

export default function LotsPage() {
  const { t } = useTranslation()

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('lots.title')}
      </Typography>
      <Typography color="text.secondary">{t('lots.description')}</Typography>
    </Box>
  )
}
