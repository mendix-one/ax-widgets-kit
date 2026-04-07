import HomeIcon from '@mui/icons-material/Home'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

export default function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h1" component="h1" gutterBottom>
        {t('notFound.title')}
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {t('notFound.description')}
      </Typography>
      <Button variant="contained" component={Link} to="/" startIcon={<HomeIcon />}>
        {t('notFound.goToDashboard')}
      </Button>
    </Box>
  )
}
