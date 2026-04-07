import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { type EChartsOption } from 'echarts'
import ReactECharts from 'echarts-for-react'
import { useState } from 'react'

// ─── Timeline Constants ─────────────────────────────────────────────

const QUARTERS = [
  "Q1'25",
  "Q2'25",
  "Q3'25",
  "Q4'25",
  "Q1'26",
  "Q2'26",
  "Q3'26",
  "Q4'26",
  "Q1'27",
  "Q2'27",
  "Q3'27",
  "Q4'27",
  "Q1'28",
  "Q2'28",
  "Q3'28",
]

const Q_CENTERS = [195, 263, 331, 399, 467, 535, 603, 671, 739, 807, 875, 943, 1011, 1079, 1147]
const GRID_X = [229, 297, 365, 433, 501, 569, 637, 705, 773, 841, 909, 977, 1045, 1113]

// ─── Capacity vs Demand Data (K WSPM) ───────────────────────────────

const v8Cap = [200, 190, 175, 155, 120, 100, 80, 60, 45, 30, 20, 10, 5, 0, 0]
const v9Cap = [80, 120, 170, 220, 260, 270, 280, 280, 275, 265, 250, 235, 215, 200, 180]
const v10Cap = [0, 0, 0, 0, 5, 10, 20, 40, 65, 95, 120, 150, 175, 200, 220]
const demandData = [280, 295, 310, 330, 350, 365, 380, 400, 420, 440, 455, 475, 490, 510, 525]

// ─── Decision Table Data ────────────────────────────────────────────

const decisions = [
  {
    status: 'URGENT',
    statusColor: '#F44336',
    decision: 'V10 equipment purchase GO/NO-GO (Lam Cryo 3.0 etch tools)',
    timeline: 'Q2 2026',
    owner: 'VP Manufacturing',
    impact: '+80K WSPM capacity by Q1 2027',
    scenario: 'SC-042: V10 Aggressive Ramp',
    scenarioBg: '#E3F2FD',
    scenarioColor: '#1976D2',
    risk: 'High',
    riskBg: '#FFEBEE',
    riskColor: '#F44336',
  },
  {
    status: 'PENDING',
    statusColor: '#FF9800',
    decision: 'V8 wind-down schedule (Hwaseong Line 12 NAND-to-DRAM conversion)',
    timeline: 'Q3 2026',
    owner: 'Memory Head',
    impact: '-60K WSPM; reallocate to DRAM',
    scenario: 'SC-038: Balanced Transition',
    scenarioBg: '#E8F5E9',
    scenarioColor: '#388E3C',
    risk: 'Med',
    riskBg: '#FFF3E0',
    riskColor: '#FF9800',
  },
  {
    status: 'PENDING',
    statusColor: '#FF9800',
    decision: "Xi'an V9 ramp approval (requires US license renewal confirmation)",
    timeline: 'Q2 2026',
    owner: 'DS Strategy Head',
    impact: "+50K WSPM V9 at Xi'an",
    scenario: "SC-045: Xi'an Contingency",
    scenarioBg: '#FFF3E0',
    scenarioColor: '#C66900',
    risk: 'High',
    riskBg: '#FFEBEE',
    riskColor: '#F44336',
  },
  {
    status: 'ON TRACK',
    statusColor: '#4CAF50',
    decision: 'V9 QLC customer qualification (Apple, Hyperscaler-A, Hyperscaler-B)',
    timeline: 'Q2 2026',
    owner: 'Key Account Mgr',
    impact: 'Unlock QLC enterprise demand',
    scenario: 'SC-041: QLC Ramp Plan',
    scenarioBg: '#E3F2FD',
    scenarioColor: '#1976D2',
    risk: 'Low',
    riskBg: '#E8F5E9',
    riskColor: '#4CAF50',
  },
]

// ─── Section A: Technology Lifecycle Timeline (SVG) ─────────────────

function TimelineChart() {
  return (
    <svg
      viewBox="0 0 1200 460"
      width="100%"
      style={{ display: 'block', fontFamily: 'Roboto, Arial, sans-serif' }}
    >
      {/* Background */}
      <rect width={1200} height={460} fill="#FAFAFA" rx={8} />

      {/* Title */}
      <text x={24} y={28} fontSize={14} fontWeight={600} fill="#212121">
        Technology Lifecycle Timeline
      </text>
      <text x={24} y={44} fontSize={11} fill="#757575">
        V-NAND Generation Roadmap — Lifecycle Phases, Milestones, Yield Maturity
      </text>

      {/* Timeline Header */}
      <rect x={160} y={56} width={1020} height={28} fill="#F5F5F5" rx={4} />
      {QUARTERS.map((q, i) => (
        <text key={q} x={Q_CENTERS[i]} y={74} fontSize={10} fill="#757575" textAnchor="middle">
          {q}
        </text>
      ))}

      {/* Vertical Grid Lines */}
      <g stroke="#EEEEEE" strokeWidth={1} strokeDasharray="4,4">
        {GRID_X.map((x) => (
          <line key={x} x1={x} y1={84} x2={x} y2={440} />
        ))}
      </g>

      {/* "Today" Marker (March 2026 ≈ end of Q1'26) */}
      <line
        x1={490}
        y1={56}
        x2={490}
        y2={440}
        stroke="#F44336"
        strokeWidth={2}
        strokeDasharray="6,3"
      />
      <rect x={472} y={48} width={36} height={16} fill="#F44336" rx={3} />
      <text x={490} y={59} fontSize={8} fill="white" textAnchor="middle" fontWeight={600}>
        TODAY
      </text>

      {/* ═══════════ V8 SWIM LANE (236L) ═══════════ */}
      <rect x={0} y={90} width={160} height={76} fill="#FFFFFF" stroke="#E0E0E0" strokeWidth={1} />
      <text x={16} y={112} fontSize={13} fontWeight={700} fill="#7B1FA2">
        V8
      </text>
      <text x={16} y={127} fontSize={10} fill="#757575">
        236 Layers
      </text>
      <text x={16} y={141} fontSize={9} fill="#9E9E9E">
        TLC 1Tb | Double Stack
      </text>
      <rect x={120} y={99} width={32} height={16} fill="#E8F5E9" rx={3} />
      <text x={136} y={110} fontSize={8} fill="#087F23" textAnchor="middle">
        Mature
      </text>

      {/* V8 Mass Production */}
      <rect x={160} y={104} width={340} height={32} fill="#CE93D8" rx={4} opacity={0.7} />
      <text x={330} y={124} fontSize={10} fill="#4A148C" textAnchor="middle" fontWeight={500}>
        Mass Production
      </text>
      {/* V8 Wind-Down */}
      <rect x={500} y={104} width={204} height={32} fill="#CE93D8" rx={4} opacity={0.35} />
      <text x={602} y={124} fontSize={10} fill="#7B1FA2" textAnchor="middle" fontWeight={500}>
        Wind-Down
      </text>
      {/* V8 EOL */}
      <rect
        x={700}
        y={104}
        width={68}
        height={32}
        fill="#F5F5F5"
        rx={4}
        stroke="#E0E0E0"
        strokeDasharray="4,2"
      />
      <text x={734} y={124} fontSize={9} fill="#9E9E9E" textAnchor="middle">
        EOL
      </text>

      {/* V8 Yield Curve */}
      <polyline
        points="160,152 230,150 330,148 430,148 500,148 600,150 700,155"
        fill="none"
        stroke="#7B1FA2"
        strokeWidth={1.5}
        strokeDasharray="3,2"
      />
      <text x={162} y={158} fontSize={8} fill="#7B1FA2">
        Yield 94%
      </text>
      <text x={580} y={158} fontSize={8} fill="#7B1FA2">
        92%
      </text>

      {/* V8 Milestone */}
      <circle cx={500} cy={120} r={5} fill="#FF9800" stroke="white" strokeWidth={1.5} />
      <text x={500} y={100} fontSize={8} fill="#C66900" textAnchor="middle">
        Ramp-down start
      </text>

      {/* ═══════════ V9 SWIM LANE (280-290L) ═══════════ */}
      <rect x={0} y={170} width={160} height={76} fill="#FFFFFF" stroke="#E0E0E0" strokeWidth={1} />
      <text x={16} y={192} fontSize={13} fontWeight={700} fill="#1976D2">
        V9
      </text>
      <text x={16} y={207} fontSize={10} fill="#757575">
        280-290 Layers
      </text>
      <text x={16} y={221} fontSize={9} fill="#9E9E9E">
        TLC 1Tb / QLC 2Tb
      </text>
      <rect x={104} y={179} width={48} height={16} fill="#E3F2FD" rx={3} />
      <text x={128} y={190} fontSize={8} fill="#004BA0" textAnchor="middle">
        Ramping
      </text>

      {/* V9 TLC Ramp */}
      <rect x={160} y={184} width={136} height={28} fill="#64B5F6" rx={4} opacity={0.5} />
      <text x={228} y={202} fontSize={9} fill="#0D47A1" textAnchor="middle">
        TLC Ramp
      </text>
      {/* V9 TLC Mass Production */}
      <rect x={296} y={184} width={544} height={28} fill="#42A5F5" rx={4} opacity={0.7} />
      <text x={568} y={202} fontSize={10} fill="white" textAnchor="middle" fontWeight={500}>
        V9 TLC Mass Production
      </text>
      {/* V9 QLC Ramp */}
      <rect x={433} y={216} width={136} height={20} fill="#90CAF9" rx={3} opacity={0.6} />
      <text x={501} y={230} fontSize={8} fill="#1565C0" textAnchor="middle">
        QLC Ramp
      </text>
      {/* V9 QLC Mass Production */}
      <rect x={569} y={216} width={340} height={20} fill="#64B5F6" rx={3} opacity={0.6} />
      <text x={739} y={230} fontSize={9} fill="#0D47A1" textAnchor="middle">
        V9 QLC Mass Production
      </text>
      {/* V9 Volume Reduction */}
      <rect x={840} y={184} width={200} height={28} fill="#42A5F5" rx={4} opacity={0.35} />
      <text x={940} y={202} fontSize={9} fill="#1976D2" textAnchor="middle">
        Volume Reduction
      </text>

      {/* V9 Yield Curve */}
      <polyline
        points="160,240 230,238 296,235 365,232 433,230 501,228 569,228 637,228 705,228 773,228 840,229 909,230"
        fill="none"
        stroke="#1976D2"
        strokeWidth={1.5}
        strokeDasharray="3,2"
      />
      <text x={162} y={242} fontSize={8} fill="#1976D2">
        82%
      </text>
      <text x={445} y={242} fontSize={8} fill="#1976D2">
        91%
      </text>
      <text x={720} y={240} fontSize={8} fill="#1976D2">
        93%
      </text>

      {/* V9 Milestones */}
      <circle cx={467} cy={198} r={5} fill="#4CAF50" stroke="white" strokeWidth={1.5} />
      <text x={467} y={178} fontSize={8} fill="#087F23" textAnchor="middle">
        QLC qual start
      </text>
      <circle cx={569} cy={226} r={5} fill="#1976D2" stroke="white" strokeWidth={1.5} />
      <text x={569} y={214} fontSize={8} fill="#004BA0" textAnchor="middle">
        QLC MP
      </text>

      {/* ═══════════ V10 SWIM LANE (400+ Layers) ═══════════ */}
      <rect x={0} y={250} width={160} height={76} fill="#FFFFFF" stroke="#E0E0E0" strokeWidth={1} />
      <text x={16} y={272} fontSize={13} fontWeight={700} fill="#388E3C">
        V10
      </text>
      <text x={16} y={287} fontSize={10} fill="#757575">
        400-430 Layers
      </text>
      <text x={16} y={301} fontSize={9} fill="#9E9E9E">
        BV-NAND | Hybrid Bond
      </text>
      <rect x={108} y={259} width={44} height={16} fill="#FFF3E0" rx={3} />
      <text x={130} y={270} fontSize={8} fill="#C66900" textAnchor="middle">
        {'Eng. \u2192'}
      </text>

      {/* V10 Engineering & Pilot */}
      <rect x={296} y={264} width={204} height={28} fill="#A5D6A7" rx={4} opacity={0.4} />
      <text x={398} y={282} fontSize={9} fill="#1B5E20" textAnchor="middle">
        Engineering & Pilot
      </text>
      {/* V10 Yield Ramp */}
      <rect x={500} y={264} width={204} height={28} fill="#66BB6A" rx={4} opacity={0.6} />
      <text x={602} y={282} fontSize={10} fill="white" textAnchor="middle" fontWeight={500}>
        Yield Ramp
      </text>
      {/* V10 Mass Production */}
      <rect x={704} y={264} width={476} height={28} fill="#43A047" rx={4} opacity={0.75} />
      <text x={942} y={282} fontSize={10} fill="white" textAnchor="middle" fontWeight={600}>
        V10 Mass Production
      </text>

      {/* V10 Yield Curve (S-curve) */}
      <polyline
        points="296,318 330,316 365,314 398,310 433,304 467,298 501,290 535,284 569,278 603,274 637,271 671,269 705,268 773,266 841,265 909,264 977,264 1045,264 1113,264"
        fill="none"
        stroke="#388E3C"
        strokeWidth={1.5}
        strokeDasharray="3,2"
      />
      <text x={310} y={322} fontSize={8} fill="#388E3C">
        30%
      </text>
      <text x={520} y={300} fontSize={8} fill="#388E3C">
        65%
      </text>
      <text x={720} y={276} fontSize={8} fill="#388E3C">
        85%
      </text>
      <text x={970} y={272} fontSize={8} fill="#388E3C">
        92%
      </text>

      {/* V10 Milestones */}
      <circle cx={365} cy={278} r={5} fill="#FF9800" stroke="white" strokeWidth={1.5} />
      <text x={365} y={260} fontSize={8} fill="#C66900" textAnchor="middle">
        Equip install
      </text>
      <circle cx={500} cy={278} r={5} fill="#4CAF50" stroke="white" strokeWidth={1.5} />
      <text x={500} y={260} fontSize={8} fill="#087F23" textAnchor="middle">
        First wafer out
      </text>
      <circle cx={704} cy={278} r={5} fill="#1976D2" stroke="white" strokeWidth={1.5} />
      <text x={704} y={260} fontSize={8} fill="#004BA0" textAnchor="middle">
        Qual complete
      </text>

      {/* ═══════════ V11 SWIM LANE (500-600L) ═══════════ */}
      <rect x={0} y={330} width={160} height={76} fill="#FFFFFF" stroke="#E0E0E0" strokeWidth={1} />
      <text x={16} y={352} fontSize={13} fontWeight={700} fill="#00838F">
        V11
      </text>
      <text x={16} y={367} fontSize={10} fill="#757575">
        500-600 Layers
      </text>
      <text x={16} y={381} fontSize={9} fill="#9E9E9E">
        Next-gen | FeFET R&D
      </text>
      <rect x={120} y={339} width={32} height={16} fill="#F5F5F5" rx={3} stroke="#E0E0E0" />
      <text x={136} y={350} fontSize={8} fill="#9E9E9E" textAnchor="middle">
        R&D
      </text>

      {/* V11 R&D */}
      <rect
        x={433}
        y={344}
        width={340}
        height={24}
        fill="#B2EBF2"
        rx={4}
        opacity={0.4}
        stroke="#00838F"
        strokeWidth={1}
        strokeDasharray="4,3"
      />
      <text x={603} y={360} fontSize={9} fill="#006064" textAnchor="middle">
        Research & Development
      </text>
      {/* V11 Engineering Samples */}
      <rect
        x={773}
        y={344}
        width={272}
        height={24}
        fill="#80DEEA"
        rx={4}
        opacity={0.4}
        stroke="#00838F"
        strokeWidth={1}
        strokeDasharray="4,3"
      />
      <text x={909} y={360} fontSize={9} fill="#006064" textAnchor="middle">
        Engineering Samples
      </text>
      {/* V11 Pilot */}
      <rect x={1045} y={344} width={135} height={24} fill="#4DD0E1" rx={4} opacity={0.5} />
      <text x={1112} y={360} fontSize={9} fill="#00695C" textAnchor="middle">
        Pilot
      </text>

      {/* V11 Milestone */}
      <circle cx={773} cy={356} r={5} fill="#00BCD4" stroke="white" strokeWidth={1.5} />
      <text x={773} y={340} fontSize={8} fill="#006064" textAnchor="middle">
        First silicon
      </text>

      {/* ═══════════ LEGEND ═══════════ */}
      <rect x={24} y={418} width={1152} height={34} fill="#FFFFFF" rx={4} stroke="#E0E0E0" />
      <text x={40} y={439} fontSize={9} fontWeight={600} fill="#424242">
        LEGEND:
      </text>

      {/* Lifecycle phases */}
      <rect x={110} y={428} width={16} height={10} fill="#CE93D8" rx={2} opacity={0.5} />
      <text x={130} y={438} fontSize={8} fill="#757575">
        Ramp
      </text>
      <rect x={168} y={428} width={16} height={10} fill="#42A5F5" rx={2} opacity={0.7} />
      <text x={188} y={438} fontSize={8} fill="#757575">
        Mass Prod.
      </text>
      <rect x={244} y={428} width={16} height={10} fill="#42A5F5" rx={2} opacity={0.35} />
      <text x={264} y={438} fontSize={8} fill="#757575">
        Wind-Down
      </text>
      <rect
        x={324}
        y={428}
        width={16}
        height={10}
        fill="#F5F5F5"
        rx={2}
        stroke="#E0E0E0"
        strokeDasharray="3,1"
      />
      <text x={344} y={438} fontSize={8} fill="#757575">
        EOL/R&D
      </text>

      {/* Yield */}
      <line
        x1={400}
        y1={433}
        x2={430}
        y2={433}
        stroke="#424242"
        strokeWidth={1.5}
        strokeDasharray="3,2"
      />
      <text x={436} y={438} fontSize={8} fill="#757575">
        Yield Curve
      </text>

      {/* Milestones */}
      <circle cx={500} cy={433} r={4} fill="#4CAF50" stroke="white" strokeWidth={1} />
      <text x={508} y={438} fontSize={8} fill="#757575">
        Go
      </text>
      <circle cx={538} cy={433} r={4} fill="#FF9800" stroke="white" strokeWidth={1} />
      <text x={546} y={438} fontSize={8} fill="#757575">
        Transition
      </text>
      <circle cx={596} cy={433} r={4} fill="#1976D2" stroke="white" strokeWidth={1} />
      <text x={604} y={438} fontSize={8} fill="#757575">
        Qualification
      </text>
      <circle cx={670} cy={433} r={4} fill="#F44336" stroke="white" strokeWidth={1} />
      <text x={678} y={438} fontSize={8} fill="#757575">
        Risk
      </text>

      {/* Today */}
      <line
        x1={720}
        y1={428}
        x2={720}
        y2={438}
        stroke="#F44336"
        strokeWidth={2}
        strokeDasharray="4,2"
      />
      <text x={726} y={438} fontSize={8} fill="#757575">
        Today
      </text>

      {/* Technologies */}
      <rect x={780} y={428} width={10} height={10} fill="#7B1FA2" rx={2} opacity={0.6} />
      <text x={794} y={438} fontSize={8} fill="#757575">
        V8
      </text>
      <rect x={820} y={428} width={10} height={10} fill="#1976D2" rx={2} opacity={0.7} />
      <text x={834} y={438} fontSize={8} fill="#757575">
        V9
      </text>
      <rect x={860} y={428} width={10} height={10} fill="#388E3C" rx={2} opacity={0.7} />
      <text x={874} y={438} fontSize={8} fill="#757575">
        V10
      </text>
      <rect x={900} y={428} width={10} height={10} fill="#00838F" rx={2} opacity={0.5} />
      <text x={914} y={438} fontSize={8} fill="#757575">
        V11
      </text>
    </svg>
  )
}

// ─── Section B: Capacity vs. Demand (ECharts) ───────────────────────

function CapacityDemandChart() {
  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' },
    },
    legend: {
      data: ['V8 Capacity', 'V9 Capacity', 'V10 Capacity', 'Customer Demand'],
      bottom: 0,
    },
    grid: { left: 60, right: 24, top: 50, bottom: 40 },
    xAxis: {
      type: 'category',
      data: QUARTERS,
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
      name: 'WSPM (K)',
      min: 0,
      max: 600,
      axisLabel: { formatter: '{value}K' },
    },
    series: [
      {
        name: 'V8 Capacity',
        type: 'line',
        stack: 'capacity',
        areaStyle: { opacity: 0.35 },
        itemStyle: { color: '#7B1FA2' },
        lineStyle: { width: 0 },
        symbol: 'none',
        data: v8Cap,
      },
      {
        name: 'V9 Capacity',
        type: 'line',
        stack: 'capacity',
        areaStyle: { opacity: 0.45 },
        itemStyle: { color: '#1976D2' },
        lineStyle: { width: 0 },
        symbol: 'none',
        data: v9Cap,
      },
      {
        name: 'V10 Capacity',
        type: 'line',
        stack: 'capacity',
        areaStyle: { opacity: 0.45 },
        itemStyle: { color: '#388E3C' },
        lineStyle: { width: 0 },
        symbol: 'none',
        data: v10Cap,
      },
      {
        name: 'Customer Demand',
        type: 'line',
        itemStyle: { color: '#F44336' },
        lineStyle: { width: 2.5 },
        symbol: 'circle',
        symbolSize: 6,
        data: demandData,
        markLine: {
          silent: true,
          symbol: 'none',
          data: [{ xAxis: "Q1'26", label: { formatter: 'TODAY', fontSize: 9 } }],
          lineStyle: { color: '#F44336', type: 'dashed', width: 1.5 },
        },
        markArea: {
          silent: true,
          data: [
            [
              {
                xAxis: "Q3'26",
                itemStyle: { color: 'rgba(244, 67, 54, 0.08)' },
                label: {
                  show: true,
                  formatter: 'DEMAND GAP',
                  color: '#F44336',
                  fontSize: 10,
                  fontWeight: 'bold',
                  position: 'insideTop',
                },
              },
              { xAxis: "Q3'28" },
            ],
          ],
        },
      },
    ],
  }

  return <ReactECharts option={option} style={{ height: 340 }} />
}

// ─── Section C: Key Metrics Cards ───────────────────────────────────

function MetricsCards() {
  return (
    <Grid container spacing={2}>
      {/* Card 1: Total Capacity */}
      <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
        <Card sx={{ height: '100%' }}>
          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            <Typography variant="caption" color="text.secondary">
              Total NAND Capacity
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mt: 0.5 }}>
              <Typography variant="h4" fontWeight={700} fontFamily="monospace">
                420K
              </Typography>
              <Typography variant="body2" color="text.secondary">
                WSPM
              </Typography>
            </Box>
            <Box sx={{ mt: 1, height: 6, bgcolor: '#E0E0E0', borderRadius: 3 }}>
              <Box sx={{ height: 6, width: '84%', bgcolor: '#1976D2', borderRadius: 3 }} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
              <Typography variant="caption" color="success.main">
                +3.2% vs last quarter
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Util: 84%
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Card 2: Demand Forecast */}
      <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
        <Card sx={{ height: '100%' }}>
          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            <Typography variant="caption" color="text.secondary">
              Demand Forecast (Next Q)
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mt: 0.5 }}>
              <Typography variant="h4" fontWeight={700} fontFamily="monospace">
                455K
              </Typography>
              <Typography variant="body2" color="text.secondary">
                WSPM eq.
              </Typography>
            </Box>
            <Typography variant="caption" color="error.main" sx={{ mt: 1, display: 'block' }}>
              Exceeds capacity by 35K
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Card 3: Supply-Demand Gap */}
      <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
        <Card
          sx={{ height: '100%', borderColor: '#F44336', borderWidth: 1.5, borderStyle: 'solid' }}
        >
          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            <Typography variant="caption" color="text.secondary">
              Supply-Demand Gap
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mt: 0.5 }}>
              <Typography variant="h4" fontWeight={700} fontFamily="monospace" color="error.main">
                -35K
              </Typography>
              <Typography variant="body2" color="error.main">
                WSPM short
              </Typography>
            </Box>
            <Box sx={{ mt: 1, height: 6, bgcolor: '#FFCDD2', borderRadius: 3 }}>
              <Box sx={{ height: 6, width: '75%', bgcolor: '#F44336', borderRadius: 3 }} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
              <Typography variant="caption" color="error.main" fontWeight={500}>
                Action Required
              </Typography>
              <Typography variant="caption" color="text.secondary">
                8.3% gap
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Card 4: Weighted Avg Yield */}
      <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
        <Card sx={{ height: '100%' }}>
          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            <Typography variant="caption" color="text.secondary">
              Weighted Avg Yield
            </Typography>
            <Typography
              variant="h4"
              fontWeight={700}
              fontFamily="monospace"
              color="success.main"
              sx={{ mt: 0.5 }}
            >
              89.2%
            </Typography>
            {[
              { name: 'V8', pct: 94, color: '#7B1FA2' },
              { name: 'V9', pct: 91, color: '#1976D2' },
              { name: 'V10', pct: 42, color: '#388E3C' },
            ].map((t) => (
              <Box key={t.name} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                <Box
                  sx={{
                    height: 4,
                    width: `${t.pct * 0.85}%`,
                    bgcolor: t.color,
                    borderRadius: 2,
                    opacity: 0.7,
                  }}
                />
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontSize: 10, whiteSpace: 'nowrap' }}
                >
                  {t.name}: {t.pct}%
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Grid>

      {/* Card 5: Transition Risk Score */}
      <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
        <Card sx={{ height: '100%' }}>
          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            <Typography variant="caption" color="text.secondary">
              Transition Risk Score
            </Typography>
            <Typography
              variant="h4"
              fontWeight={700}
              fontFamily="monospace"
              color="warning.main"
              sx={{ mt: 0.5 }}
            >
              Medium
            </Typography>
            <Box
              sx={{ mt: 1, position: 'relative', height: 8, bgcolor: '#E0E0E0', borderRadius: 4 }}
            >
              <Box sx={{ height: 8, width: '58%', bgcolor: '#FF9800', borderRadius: 4 }} />
              <Box
                sx={{
                  position: 'absolute',
                  top: -1,
                  left: '58%',
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  bgcolor: '#FF9800',
                  border: '1.5px solid white',
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
              <Typography variant="caption" color="text.secondary">
                V10 yield ramp on track
              </Typography>
              <Typography variant="caption" color="warning.main" fontWeight={500}>
                58/100
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

// ─── Section D: Strategic Decision Table ────────────────────────────

function DecisionTable() {
  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ '& th': { fontWeight: 600, bgcolor: 'action.hover' } }}>
            <TableCell>Status</TableCell>
            <TableCell>Decision</TableCell>
            <TableCell>Timeline</TableCell>
            <TableCell>Owner</TableCell>
            <TableCell>Impact</TableCell>
            <TableCell>Linked Scenario</TableCell>
            <TableCell>Risk</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {decisions.map((d) => (
            <TableRow key={d.timeline + d.decision} hover>
              <TableCell>
                <Chip
                  label={d.status}
                  size="small"
                  sx={{
                    bgcolor: d.statusColor,
                    color: 'white',
                    fontWeight: 600,
                    fontSize: 11,
                    height: 24,
                  }}
                />
              </TableCell>
              <TableCell sx={{ maxWidth: 320 }}>{d.decision}</TableCell>
              <TableCell sx={{ fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                {d.timeline}
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>{d.owner}</TableCell>
              <TableCell sx={{ maxWidth: 200 }}>{d.impact}</TableCell>
              <TableCell>
                <Chip
                  label={d.scenario}
                  size="small"
                  sx={{
                    bgcolor: d.scenarioBg,
                    color: d.scenarioColor,
                    fontSize: 11,
                    height: 24,
                  }}
                />
              </TableCell>
              <TableCell>
                <Chip
                  label={d.risk}
                  size="small"
                  sx={{
                    bgcolor: d.riskBg,
                    color: d.riskColor,
                    fontWeight: 600,
                    fontSize: 11,
                    height: 24,
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box sx={{ px: 2, py: 1, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="caption" color="text.secondary">
          Showing 4 of 12 active decisions
        </Typography>
        <Typography variant="caption" color="primary" sx={{ cursor: 'pointer', fontWeight: 500 }}>
          {'View All Decisions >'}
        </Typography>
      </Box>
    </TableContainer>
  )
}

// ─── Main Page ──────────────────────────────────────────────────────

export default function TechnologyRoadmapPage() {
  const [fab, setFab] = useState('all')
  const [viewMode, setViewMode] = useState('wspm')

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
        Technology Roadmap & Strategy
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        V-NAND technology lifecycle, capacity planning, and strategic decision tracking
      </Typography>

      {/* Context Bar */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
        <Chip label="Planning Horizon: Q1 2025 — Q4 2028" variant="outlined" />
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Fab</InputLabel>
          <Select value={fab} label="Fab" onChange={(e) => setFab(e.target.value)}>
            <MenuItem value="all">All Fabs</MenuItem>
            <MenuItem value="pyeongtaek">Pyeongtaek</MenuItem>
            <MenuItem value="hwaseong">Hwaseong</MenuItem>
            <MenuItem value="xian">Xi'an</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>View</InputLabel>
          <Select value={viewMode} label="View" onChange={(e) => setViewMode(e.target.value)}>
            <MenuItem value="wspm">Capacity (WSPM)</MenuItem>
            <MenuItem value="bit">Bit Output (Gb)</MenuItem>
            <MenuItem value="revenue">Revenue ($)</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Section A: Technology Lifecycle Timeline */}
      <Card sx={{ mb: 3, overflow: 'visible' }}>
        <CardContent sx={{ p: { xs: 1, sm: 2 }, '&:last-child': { pb: { xs: 1, sm: 2 } } }}>
          <TimelineChart />
        </CardContent>
      </Card>

      {/* Section B: Capacity vs. Demand */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: { xs: 1, sm: 2 }, '&:last-child': { pb: { xs: 1, sm: 2 } } }}>
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
            Capacity Allocation vs. Customer Demand
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            NAND Wafer Starts per Month (WSPM, thousands) by Technology Node
          </Typography>
          <CapacityDemandChart />
        </CardContent>
      </Card>

      {/* Section C: Key Metrics Cards */}
      <Box sx={{ mb: 3 }}>
        <MetricsCards />
      </Box>

      {/* Section D: Strategic Decision Table */}
      <Card>
        <CardContent sx={{ p: { xs: 1, sm: 2 }, '&:last-child': { pb: 0 } }}>
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 0.5 }}>
            Strategic Decision Points
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Upcoming decisions linked to technology roadmap and capacity planning
          </Typography>
          <DecisionTable />
        </CardContent>
      </Card>
    </Box>
  )
}
