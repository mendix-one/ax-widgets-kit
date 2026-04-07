import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

export default function YieldPage() {
  const { t } = useTranslation()

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('yield.title')}
      </Typography>
      <Typography color="text.secondary">{t('yield.description')}</Typography>
    </Box>
  )
}
