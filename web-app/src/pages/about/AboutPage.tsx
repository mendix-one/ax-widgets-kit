import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import aPlannerDark from '../../assets/a-planner-ai-dark.png'
import aPlannerLight from '../../assets/a-planner-ai-light.png'

const techStack = [
  'React 19 + TypeScript 5.9',
  'Vite 7',
  'React Router v7',
  'MobX + mobx-react-lite',
  'MUI (Material UI)',
  'ECharts',
]

export default function AboutPage() {
  const { t } = useTranslation()
  const theme = useTheme()
  const logo = theme.palette.mode === 'dark' ? aPlannerDark : aPlannerLight

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('about.title')}
      </Typography>
      <Box sx={{ mb: 3 }}>
        <Box component="img" src={logo} alt="aPlanner" sx={{ height: 32, mb: 1 }} />
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {t('about.tagline')}
        </Typography>
      </Box>
      <Typography sx={{ mb: 2 }} dangerouslySetInnerHTML={{ __html: t('about.description') }} />
      <Typography sx={{ mb: 2 }}>{t('about.subtitle')}</Typography>
      <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
        {t('about.techStack')}
      </Typography>
      <List>
        {techStack.map((item) => (
          <ListItem key={item}>
            <ListItemIcon>
              <ChevronRightIcon />
            </ListItemIcon>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </>
  )
}
