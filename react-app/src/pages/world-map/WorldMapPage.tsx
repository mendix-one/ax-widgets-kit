import AddIcon from '@mui/icons-material/Add'
import MyLocationIcon from '@mui/icons-material/MyLocation'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'
import RemoveIcon from '@mui/icons-material/Remove'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { alpha, useTheme } from '@mui/material/styles'
import { type EChartsOption } from 'echarts'
import * as echarts from 'echarts'
import ReactECharts from 'echarts-for-react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import worldGeoJsonText from './countries.geo.json?raw'

type MapPoint = [number, number]

type TranslateFn = ReturnType<typeof useTranslation>['t']

type CountryFeature = {
  properties?: {
    name?: string
  }
  geometry?: {
    coordinates?: unknown
  }
}

type WorldGeoJson = Parameters<typeof echarts.registerMap>[1] & {
  features?: CountryFeature[]
}

type CountryViewport = {
  center: MapPoint
  zoom: number
}

type Manufactory = {
  id: string
  name: string
  region: string
  specialty: string
  resourcing: string
  yield: string
  defect: string
  coord: MapPoint
}

type ClickEventParams = {
  componentType?: string
  name?: string
  seriesType?: string
  data?: {
    site?: Manufactory
  }
}

const MAP_NAME = 'ax-world-geo'

const WORLD_GEOJSON = JSON.parse(worldGeoJsonText) as WorldGeoJson

const MANUFACTORIES: Manufactory[] = [
  {
    id: 'samsung-giheung',
    name: 'Samsung Giheung Campus',
    region: 'Yongin, South Korea',
    specialty: 'Memory R&D and fabrication',
    resourcing: '93% staffed',
    yield: '95.8%',
    defect: '1.3%',
    coord: [127.11, 37.28],
  },
  {
    id: 'samsung-hwaseong',
    name: 'Samsung Hwaseong Campus',
    region: 'Hwaseong, South Korea',
    specialty: 'DRAM and foundry lines',
    resourcing: '95% staffed',
    yield: '96.4%',
    defect: '1.0%',
    coord: [126.83, 37.2],
  },
  {
    id: 'samsung-pyeongtaek',
    name: 'Samsung Pyeongtaek Campus',
    region: 'Pyeongtaek, South Korea',
    specialty: 'NAND and advanced memory',
    resourcing: '94% staffed',
    yield: '96.0%',
    defect: '1.1%',
    coord: [127.06, 36.99],
  },
  {
    id: 'samsung-onyang',
    name: 'Samsung Onyang Campus',
    region: 'Asan, South Korea',
    specialty: 'Advanced packaging and test',
    resourcing: '91% staffed',
    yield: '95.5%',
    defect: '1.4%',
    coord: [127.0, 36.78],
  },
  {
    id: 'samsung-cheonan',
    name: 'Samsung Cheonan Complex',
    region: 'Cheonan, South Korea',
    specialty: 'Display component operations',
    resourcing: '89% staffed',
    yield: '94.9%',
    defect: '1.6%',
    coord: [127.15, 36.81],
  },
  {
    id: 'samsung-suwon',
    name: 'Samsung Suwon Digital City',
    region: 'Suwon, South Korea',
    specialty: 'Electronics operations and pilot builds',
    resourcing: '92% staffed',
    yield: '95.2%',
    defect: '1.5%',
    coord: [127.03, 37.26],
  },
  {
    id: 'samsung-austin',
    name: 'Samsung Austin Semiconductor',
    region: 'Austin, Texas, USA',
    specialty: 'Foundry and logic semiconductor',
    resourcing: '88% staffed',
    yield: '94.3%',
    defect: '1.9%',
    coord: [-97.74, 30.27],
  },
  {
    id: 'samsung-taylor',
    name: 'Samsung Taylor Campus',
    region: 'Taylor, Texas, USA',
    specialty: 'Next-generation foundry ramp',
    resourcing: '84% staffed',
    yield: '93.9%',
    defect: '2.1%',
    coord: [-97.42, 30.57],
  },
  {
    id: 'samsung-xian',
    name: 'Samsung China Semiconductor',
    region: "Xi'an, China",
    specialty: 'NAND flash manufacturing',
    resourcing: '90% staffed',
    yield: '95.7%',
    defect: '1.2%',
    coord: [108.94, 34.34],
  },
  {
    id: 'samsung-suzhou',
    name: 'Samsung Suzhou Semiconductor',
    region: 'Suzhou, China',
    specialty: 'Packaging and final test',
    resourcing: '87% staffed',
    yield: '94.6%',
    defect: '1.8%',
    coord: [120.58, 31.3],
  },
  {
    id: 'samsung-tianjin',
    name: 'Tianjin Samsung LED',
    region: 'Tianjin, China',
    specialty: 'LED component manufacturing',
    resourcing: '86% staffed',
    yield: '94.1%',
    defect: '2.0%',
    coord: [117.2, 39.13],
  },
  {
    id: 'samsung-bacninh',
    name: 'Samsung Electronics Vietnam SEV',
    region: 'Bac Ninh, Vietnam',
    specialty: 'Mobile device assembly',
    resourcing: '93% staffed',
    yield: '96.2%',
    defect: '1.0%',
    coord: [106.08, 21.19],
  },
  {
    id: 'samsung-thainguyen',
    name: 'Samsung Electronics Vietnam SEVT',
    region: 'Thai Nguyen, Vietnam',
    specialty: 'Smartphone manufacturing',
    resourcing: '94% staffed',
    yield: '96.5%',
    defect: '0.9%',
    coord: [105.84, 21.59],
  },
  {
    id: 'samsung-hcmc',
    name: 'Samsung CE Complex',
    region: 'Ho Chi Minh City, Vietnam',
    specialty: 'TV and home appliance production',
    resourcing: '90% staffed',
    yield: '95.1%',
    defect: '1.5%',
    coord: [106.7, 10.82],
  },
  {
    id: 'samsung-noida',
    name: 'Samsung Noida Factory',
    region: 'Noida, India',
    specialty: 'Smartphone manufacturing',
    resourcing: '89% staffed',
    yield: '94.7%',
    defect: '1.7%',
    coord: [77.39, 28.57],
  },
  {
    id: 'samsung-campinas',
    name: 'Samsung Campinas Plant',
    region: 'Campinas, Brazil',
    specialty: 'Mobile and network equipment',
    resourcing: '85% staffed',
    yield: '93.8%',
    defect: '2.2%',
    coord: [-47.06, -22.91],
  },
  {
    id: 'samsung-manaus',
    name: 'Samsung Manaus Plant',
    region: 'Manaus, Brazil',
    specialty: 'TV and display assembly',
    resourcing: '86% staffed',
    yield: '94.0%',
    defect: '2.0%',
    coord: [-60.02, -3.1],
  },
  {
    id: 'samsung-tijuana',
    name: 'Samsung Tijuana Operations',
    region: 'Tijuana, Mexico',
    specialty: 'Home appliance and TV operations',
    resourcing: '88% staffed',
    yield: '94.4%',
    defect: '1.8%',
    coord: [-117.04, 32.53],
  },
  {
    id: 'samsung-god',
    name: 'Samsung SDI Göd',
    region: 'Göd, Hungary',
    specialty: 'EV battery manufacturing',
    resourcing: '87% staffed',
    yield: '94.5%',
    defect: '1.7%',
    coord: [19.15, 47.69],
  },
  {
    id: 'samsung-galanta',
    name: 'Samsung Electronics Slovakia',
    region: 'Galanta, Slovakia',
    specialty: 'TV manufacturing',
    resourcing: '84% staffed',
    yield: '93.6%',
    defect: '2.1%',
    coord: [17.73, 48.19],
  },
]

const DEFAULT_SITE = MANUFACTORIES[1]
const INITIAL_CENTER: MapPoint = [15, 20]
const INITIAL_ZOOM = 1.15
const MIN_ZOOM = 1
const MAX_ZOOM = 200
const MIN_COUNTRY_ZOOM = 3
const MAX_COUNTRY_ZOOM = 40
const SELECT_ZOOM = 100
const ZOOM_STEP = 1.6

function updateBoundsFromCoordinates(
  coordinates: unknown,
  bounds: { minLon: number; maxLon: number; minLat: number; maxLat: number },
) {
  if (!Array.isArray(coordinates) || coordinates.length === 0) {
    return
  }

  const [first, second] = coordinates

  if (typeof first === 'number' && typeof second === 'number') {
    bounds.minLon = Math.min(bounds.minLon, first)
    bounds.maxLon = Math.max(bounds.maxLon, first)
    bounds.minLat = Math.min(bounds.minLat, second)
    bounds.maxLat = Math.max(bounds.maxLat, second)
    return
  }

  for (const nestedCoordinates of coordinates) {
    updateBoundsFromCoordinates(nestedCoordinates, bounds)
  }
}

function buildCountryViewports(geoJson: WorldGeoJson) {
  const viewports = new Map<string, CountryViewport>()

  for (const feature of geoJson.features ?? []) {
    const countryName = feature.properties?.name
    const coordinates = feature.geometry?.coordinates

    if (!countryName || !coordinates) {
      continue
    }

    const bounds = {
      minLon: Number.POSITIVE_INFINITY,
      maxLon: Number.NEGATIVE_INFINITY,
      minLat: Number.POSITIVE_INFINITY,
      maxLat: Number.NEGATIVE_INFINITY,
    }

    updateBoundsFromCoordinates(coordinates, bounds)

    if (
      !Number.isFinite(bounds.minLon)
      || !Number.isFinite(bounds.maxLon)
      || !Number.isFinite(bounds.minLat)
      || !Number.isFinite(bounds.maxLat)
    ) {
      continue
    }

    const lonSpan = bounds.maxLon - bounds.minLon
    const latSpan = bounds.maxLat - bounds.minLat
    const span = Math.max(lonSpan, latSpan * 1.35, 1.2)

    viewports.set(countryName, {
      center: [(bounds.minLon + bounds.maxLon) / 2, (bounds.minLat + bounds.maxLat) / 2],
      zoom: Math.min(MAX_COUNTRY_ZOOM, Math.max(MIN_COUNTRY_ZOOM, Number((140 / span).toFixed(2)))),
    })
  }

  return viewports
}

const COUNTRY_VIEWPORTS = buildCountryViewports(WORLD_GEOJSON)

if (!echarts.getMap(MAP_NAME)) {
  echarts.registerMap(MAP_NAME, WORLD_GEOJSON)
}

function buildTooltipHtml(site: Manufactory, t: TranslateFn) {
  return [
    '<div style="min-width:220px">',
    `<div style="font-weight:700;margin-bottom:4px">${site.name}</div>`,
    `<div style="font-size:12px;opacity:0.8;margin-bottom:8px">${site.region}</div>`,
    `<div><strong>${t('worldMap.specialty')}:</strong> ${site.specialty}</div>`,
    `<div><strong>${t('worldMap.resourcing')}:</strong> ${site.resourcing}</div>`,
    `<div><strong>${t('worldMap.yield')}:</strong> ${site.yield}</div>`,
    `<div><strong>${t('worldMap.defect')}:</strong> ${site.defect}</div>`,
    '</div>',
  ].join('')
}

export default function WorldMapPage() {
  const { t } = useTranslation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [selectedId, setSelectedId] = useState(DEFAULT_SITE.id)
  const [mapCenter, setMapCenter] = useState<MapPoint>(INITIAL_CENTER)
  const [mapZoom, setMapZoom] = useState(INITIAL_ZOOM)

  const isDarkMode = theme.palette.mode === 'dark'
  const selectedSite = MANUFACTORIES.find((site) => site.id === selectedId) ?? DEFAULT_SITE

  const chartOption = useMemo<EChartsOption>(() => {
    return {
      animationDurationUpdate: 250,
      tooltip: {
        trigger: 'item',
        renderMode: 'html',
        backgroundColor: isDarkMode ? alpha(theme.palette.grey[900], 0.96) : alpha(theme.palette.grey[800], 0.92),
        borderColor: alpha(theme.palette.divider, 0.4),
        borderWidth: 1,
        textStyle: { color: theme.palette.common.white },
        formatter: (params: unknown) => {
          const typed = params as ClickEventParams
          const site = typed.data?.site

          if (!site) {
            return ''
          }

          return buildTooltipHtml(site, t)
        },
      },
      geo: {
        map: MAP_NAME,
        roam: true,
        center: mapCenter,
        zoom: mapZoom,
        scaleLimit: {
          min: MIN_ZOOM,
          max: MAX_ZOOM,
        },
        left: 0,
        right: 0,
        top: 10,
        bottom: 10,
        label: {
          show: false,
          color: alpha(theme.palette.text.primary, isDarkMode ? 0.6 : 0.7),
          fontSize: isMobile ? 7 : 9,
        },
        itemStyle: {
          areaColor: isDarkMode ? alpha(theme.palette.success.dark, 0.42) : alpha(theme.palette.success.light, 0.45),
          borderColor: isDarkMode ? alpha(theme.palette.success.light, 0.4) : alpha(theme.palette.success.dark, 0.55),
          borderWidth: 1.2,
        },
        emphasis: {
          itemStyle: {
            areaColor: isDarkMode ? alpha(theme.palette.success.main, 0.58) : alpha(theme.palette.success.main, 0.75),
          },
          label: {
            show: true,
            color: theme.palette.text.primary,
          },
        },
      },
      series: [
        {
          name: 'World',
          type: 'map',
          map: MAP_NAME,
          geoIndex: 0,
          silent: false,
          label: {
            show: false,
          },
          emphasis: {
            label: {
              show: true,
            },
          },
          data: [],
        },
        {
          name: 'Manufactories',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: {
            scale: 3,
            brushType: 'stroke',
          },
          label: {
            show: !isMobile,
            position: 'right',
            formatter: '{b}',
            color: theme.palette.text.primary,
            backgroundColor: alpha(theme.palette.background.paper, 0.86),
            padding: [3, 6],
            borderRadius: 6,
          },
          emphasis: {
            scale: true,
            label: {
              show: true,
            },
          },
          symbolSize: (_value: unknown, params: unknown) => {
            const data = (params as { data?: { site?: Manufactory } }).data
            return data?.site?.id === selectedId ? 18 : 13
          },
          data: MANUFACTORIES.map((site) => ({
            name: site.name,
            value: [...site.coord, Number.parseFloat(site.yield)],
            site,
            itemStyle: {
              color: site.id === selectedId ? theme.palette.error.main : theme.palette.primary.main,
              shadowBlur: 10,
              shadowColor: alpha(theme.palette.primary.main, 0.4),
            },
          })),
        },
      ],
    }
  }, [isDarkMode, isMobile, mapCenter, mapZoom, selectedId, t, theme])

  const handleZoomIn = () => {
    setMapZoom((current) => Math.min(MAX_ZOOM, Number((current * ZOOM_STEP).toFixed(2))))
  }

  const handleZoomOut = () => {
    setMapZoom((current) => Math.max(MIN_ZOOM, Number((current / ZOOM_STEP).toFixed(2))))
  }

  const handleResetZoom = () => {
    setMapCenter(INITIAL_CENTER)
    setMapZoom(INITIAL_ZOOM)
  }

  const handleChartClick = (params: unknown) => {
    const typed = params as ClickEventParams
    const site = typed.data?.site

    if (site) {
      setSelectedId(site.id)
      setMapCenter(site.coord)
      setMapZoom(SELECT_ZOOM)
    }
  }

  const handleCountryDoubleClick = (params: unknown) => {
    const typed = params as ClickEventParams

    if (typed.data?.site || typed.seriesType !== 'map' || !typed.name) {
      return
    }

    const countryViewport = COUNTRY_VIEWPORTS.get(typed.name)

    if (!countryViewport) {
      return
    }

    setMapCenter(countryViewport.center)
    setMapZoom((current) => Math.min(MAX_ZOOM, Number((current * ZOOM_STEP).toFixed(2))))
  }

  return (
    <Box maxHeight={'100%'} id='root-box'>
      <Typography variant={isMobile ? 'h5' : 'h4'} component="h1" gutterBottom>
        {t('worldMap.title')}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, maxWidth: 900 }}>
        {t('worldMap.subtitle')}
      </Typography>

      <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2} height={'100%'}>
        <Card sx={{ flex: 1, minWidth: 0, height: '100%' }}>
          <CardContent sx={{ height: '100%' }}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.5}
              justifyContent="space-between"
              sx={{ mb: 1.5 }}
            >
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                <Chip
                  icon={<PrecisionManufacturingIcon />}
                  label={t('worldMap.factories', { count: MANUFACTORIES.length })}
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  icon={<MyLocationIcon />}
                  label={isMobile ? 'Pinch to zoom' : 'Double-click a country or scroll to zoom'}
                  variant="outlined"
                />
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems={{ sm: 'center' }}>
                <Autocomplete
                  size="small"
                  options={MANUFACTORIES}
                  value={selectedSite}
                  sx={{ minWidth: { xs: '100%', sm: 320 } }}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  getOptionLabel={(option) => `${option.name}`}
                  onChange={(_event, value) => {
                    if (value) {
                      setSelectedId(value.id)
                      setMapCenter(value.coord)
                      setMapZoom(SELECT_ZOOM)
                    }
                  }}
                  slotProps={{
                    listbox: {
                      sx: {
                        maxHeight: 6 * 48,
                        overflowY: 'auto',
                      },
                    },
                  }}
                  renderInput={(params) => <TextField {...params} label="Factory" placeholder="Search factory" />}
                />

                <Stack direction="row" spacing={0.5}>
                  <Tooltip title="Zoom out">
                    <span>
                      <IconButton onClick={handleZoomOut} disabled={mapZoom <= MIN_ZOOM} color="primary">
                        <RemoveIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                  <Tooltip title="Zoom in">
                    <span>
                      <IconButton onClick={handleZoomIn} disabled={mapZoom >= MAX_ZOOM} color="primary">
                        <AddIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                  <Tooltip title="Reset zoom">
                    <span>
                      <IconButton onClick={handleResetZoom} color="primary">
                        <RestartAltIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                </Stack>
              </Stack>
            </Stack>

            <Box
              sx={{
                overflow: 'hidden',
                height: 'calc(100% - 60px)',
                borderRadius: 0,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.16)}`,
                background: isDarkMode
                  ? `linear-gradient(180deg, ${alpha(theme.palette.primary.dark, 0.28)} 0%, ${alpha(theme.palette.background.default, 0.92)} 100%)`
                  : `linear-gradient(180deg, ${alpha(theme.palette.primary.light, 0.12)} 0%, ${alpha(theme.palette.info.light, 0.18)} 100%)`,
                touchAction: 'none',
              }}
            >
              <ReactECharts
                option={chartOption}
                notMerge
                lazyUpdate
                onEvents={{ click: handleChartClick, dblclick: handleCountryDoubleClick }}
                style={{ height: '100%', width: '100%' }}
              />
            </Box>

          </CardContent>
        </Card>

        <Card sx={{ width: { xs: '100%', lg: 340 }, flexShrink: 0 }}>
          <CardContent>
            <Typography variant="overline" color="text.secondary">
              {t('worldMap.details')}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
              {selectedSite.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {selectedSite.region}
            </Typography>

            <Stack spacing={1.25}>
              <Chip label={`${t('worldMap.specialty')}: ${selectedSite.specialty}`} />
              <Chip
                color="info"
                variant="outlined"
                label={`${t('worldMap.resourcing')}: ${selectedSite.resourcing}`}
              />
              <Chip
                color="success"
                variant="outlined"
                label={`${t('worldMap.yield')}: ${selectedSite.yield}`}
              />
              <Chip
                color="warning"
                variant="outlined"
                label={`${t('worldMap.defect')}: ${selectedSite.defect}`}
              />
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  )
}
