import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { type EChartsOption } from 'echarts'
import ReactECharts from 'echarts-for-react'
import { useTranslation } from 'react-i18next'

const heatmapData = [
  [0, 0, 12],
  [0, 1, 8],
  [0, 2, 15],
  [0, 3, 5],
  [1, 0, 20],
  [1, 1, 14],
  [1, 2, 6],
  [1, 3, 9],
  [2, 0, 7],
  [2, 1, 3],
  [2, 2, 11],
  [2, 3, 18],
  [3, 0, 4],
  [3, 1, 10],
  [3, 2, 8],
  [3, 3, 2],
  [4, 0, 9],
  [4, 1, 6],
  [4, 2, 13],
  [4, 3, 7],
]

export default function DashboardPage() {
  const { t } = useTranslation()
  const muiTheme = useTheme()
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'))
  const chartHeight = isMobile ? 260 : 350

  const kpis = [
    { label: t('dashboard.overallYield'), value: '94.2%', color: '#4CAF50' },
    {
      label: t('dashboard.throughput'),
      value: t('dashboard.wafersPerDay', { count: '1,248' }),
      color: '#3F51B5',
    },
    { label: t('dashboard.defectRate'), value: '2.3%', color: '#FF9800' },
    {
      label: t('dashboard.wipCount'),
      value: t('dashboard.wafers', { count: '3,456' }),
      color: '#3F51B5',
    },
  ]

  const processSteps = [
    t('dashboard.lithography'),
    t('dashboard.etching'),
    t('dashboard.deposition'),
    t('dashboard.cmp'),
    t('dashboard.implantation'),
  ]

  const defectTypes = [
    t('dashboard.particle'),
    t('dashboard.scratch'),
    t('dashboard.pattern'),
    t('dashboard.contamination'),
  ]

  const yieldTrendOption: EChartsOption = {
    title: { text: t('dashboard.yieldTrend'), left: 'center' },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    yAxis: { type: 'value', min: 85, max: 100, axisLabel: { formatter: '{value}%' } },
    series: [
      {
        name: t('dashboard.yieldPercent'),
        type: 'line',
        smooth: true,
        data: [91.2, 92.1, 90.8, 93.5, 92.7, 94.0, 93.8, 94.5, 93.2, 94.8, 94.1, 94.2],
        areaStyle: { opacity: 0.15 },
      },
    ],
  }

  const defectDistOption: EChartsOption = {
    title: { text: t('dashboard.defectDistribution'), left: 'center' },
    tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        data: [
          { value: 35, name: t('dashboard.particle') },
          { value: 25, name: t('dashboard.scratch') },
          { value: 18, name: t('dashboard.pattern') },
          { value: 12, name: t('dashboard.contamination') },
          { value: 10, name: t('dashboard.other') },
        ],
      },
    ],
  }

  const dailyThroughputOption: EChartsOption = {
    title: { text: t('dashboard.dailyThroughput'), left: 'center' },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: Array.from({ length: 14 }, (_, i) => `Day ${i + 1}`),
      axisLabel: { rotate: 45 },
    },
    yAxis: { type: 'value', name: t('dashboard.wafersUnit') },
    series: [
      {
        type: 'bar',
        data: [1180, 1220, 1250, 1190, 1300, 1280, 1150, 1240, 1260, 1310, 1270, 1230, 1290, 1248],
        itemStyle: { borderRadius: [4, 4, 0, 0] },
      },
    ],
  }

  const heatmapOption: EChartsOption = {
    title: { text: t('dashboard.defectHeatmap'), left: 'center' },
    tooltip: {
      formatter: (params: unknown) => {
        const p = params as { data: [number, number, number] }
        return `${processSteps[p.data[0]]} / ${defectTypes[p.data[1]]}: ${p.data[2]}`
      },
    },
    xAxis: { type: 'category', data: processSteps, splitArea: { show: true } },
    yAxis: { type: 'category', data: defectTypes, splitArea: { show: true } },
    visualMap: { min: 0, max: 20, calculable: true, orient: 'horizontal', left: 'center', top: 0 },
    series: [
      {
        type: 'heatmap',
        data: heatmapData,
        label: { show: true },
      },
    ],
  }

  return (
    <Box>
      <Typography variant={isMobile ? 'h5' : 'h4'} component="h1" gutterBottom>
        {t('dashboard.title')}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {t('dashboard.subtitle')}
      </Typography>

      <Grid container spacing={{ xs: 1.5, sm: 2 }} sx={{ mb: { xs: 2, sm: 3 } }}>
        {kpis.map((kpi) => (
          <Grid key={kpi.label} size={{ xs: 6, sm: 6, md: 3 }}>
            <Card>
              <CardContent
                sx={{ p: { xs: 1.5, sm: 2 }, '&:last-child': { pb: { xs: 1.5, sm: 2 } } }}
              >
                <Typography variant="body2" color="text.secondary" noWrap>
                  {kpi.label}
                </Typography>
                <Typography
                  variant={isMobile ? 'h6' : 'h5'}
                  sx={{ fontWeight: 700, color: kpi.color, mt: 0.5 }}
                  noWrap
                >
                  {kpi.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={{ xs: 1.5, sm: 2 }} sx={{ mb: { xs: 2, sm: 3 } }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent sx={{ p: { xs: 1, sm: 2 }, '&:last-child': { pb: { xs: 1, sm: 2 } } }}>
              <ReactECharts option={yieldTrendOption} style={{ height: chartHeight }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent sx={{ p: { xs: 1, sm: 2 }, '&:last-child': { pb: { xs: 1, sm: 2 } } }}>
              <ReactECharts option={defectDistOption} style={{ height: chartHeight }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={{ xs: 1.5, sm: 2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent sx={{ p: { xs: 1, sm: 2 }, '&:last-child': { pb: { xs: 1, sm: 2 } } }}>
              <ReactECharts option={dailyThroughputOption} style={{ height: chartHeight }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent sx={{ p: { xs: 1, sm: 2 }, '&:last-child': { pb: { xs: 1, sm: 2 } } }}>
              <ReactECharts option={heatmapOption} style={{ height: chartHeight }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
