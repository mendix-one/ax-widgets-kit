
import { AxAgentChat } from '@ax/agent-chat/src/AxAgentChat'
import { AxLogo } from '@ax/logo/src/AxLogo'
import { AxNotifyMenu } from '@ax/notify-menu/src/AxNotifyMenu'
import { AxSidebar } from '@ax/sidebar/src/AxSidebar'
import { AxTasksMenu } from '@ax/tasks-menu/src/AxTasksMenu'
import { AxUserMenu } from '@ax/user-menu/src/AxUserMenu'
import { AxWebApp } from '@ax/web-app/src/AxWebApp'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import aPlannerDark from '../../assets/a-planner-ai-dark.png'
import aPlannerLight from '../../assets/a-planner-ai-light.png'

import type { DynamicValue } from 'mendix'

function mockDynamic(value: string) {
  return { status: 'available' as const, value } as DynamicValue<string>
}

const mockAction = { canExecute: true, isExecuting: false, execute: () => {} }

const kpis = [
  { label: 'Overall Yield', value: '92.4%', color: 'success.main' },
  { label: 'Throughput', value: '1,247 wafers/day', color: 'primary.main' },
  { label: 'Defect Rate', value: '1.8%', color: 'warning.main' },
  { label: 'WIP Count', value: '3,421 wafers', color: 'secondary.main' },
]

const charts = ['Yield Trend', 'Defect Distribution', 'Daily Throughput', 'Defect Heatmap']

function DemoContent() {
  return (
    <Box sx={{ maxWidth: 960 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Production Dashboard
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Plan smarter. Produce faster. Real-time wafer manufacturing intelligence at a glance.
      </Typography>

      {/* KPI Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {kpis.map((kpi) => (
          <Grid key={kpi.label} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card variant="outlined" sx={{ borderLeft: 4, borderColor: kpi.color }}>
              <CardContent>
                <Typography variant="caption" color="text.secondary">
                  {kpi.label}
                </Typography>
                <Typography variant="h5" fontWeight={600}>
                  {kpi.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Placeholder charts */}
      <Grid container spacing={2}>
        {charts.map((chart) => (
          <Grid key={chart} size={{ xs: 12, md: 6 }}>
            <Card variant="outlined" sx={{ minHeight: 200 }}>
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                  {chart}
                </Typography>
                <Box
                  sx={{
                    height: 150,
                    background: 'linear-gradient(135deg, #f5f5f5 0%, #eeeeee 100%)',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="caption" color="text.disabled">
                    Chart placeholder
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default function WebAppPage() {
  // Detect dark mode from the system (simulation app handles theme switching)
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
  const logo = isDark ? aPlannerDark : aPlannerLight

  return (
    <AxWebApp
      name="AxWebApp1"
      class=""
      themeTokens=""
      logo={
        <AxLogo
          name="AxLogo1"
          class=""
          logoUrl={mockDynamic(logo)}
          altText={mockDynamic('aPlanner')}
          height={24}
          onClick={mockAction}
        />
      }
      tasksMenu={
        <AxTasksMenu
          name="AxTasksMenu1"
          class=""
          title={mockDynamic('Urgent tasks')}
          onTaskClick={mockAction}
        />
      }
      notifyMenu={
        <AxNotifyMenu
          name="AxNotifyMenu1"
          class=""
          title={mockDynamic('Notifications')}
          onNotifyClick={mockAction}
        />
      }
      userMenu={
        <AxUserMenu
          name="AxUserMenu1"
          class=""
          userName={mockDynamic('AI Planner')}
          userEmail={mockDynamic('contact@aplanner.ai')}
          onSignOut={mockAction}
          onProfile={mockAction}
          onSettings={mockAction}
        />
      }
      sidebar={<AxSidebar name="AxSidebar1" class="" />}
      content={<DemoContent />}
      agentChat={
        <AxAgentChat
          name="AxAgentChat1"
          class=""
          title={mockDynamic('AI Assistant')}
          onSendMessage={mockAction}
        />
      }
    />
  )
}
