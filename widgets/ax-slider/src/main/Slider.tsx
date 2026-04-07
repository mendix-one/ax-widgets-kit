import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import MuiSlider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'
import { observer } from 'mobx-react-lite'
import type { ReactElement } from 'react'

import { useSliderStore } from './context'

export const Slider = observer(function Slider(): ReactElement {
  const store = useSliderStore()

  if (store.loading) return <Skeleton variant="rounded" width="100%" height={store.size === 'small' ? 24 : 36} />

  return (
    <Box sx={{ width: '100%' }}>
      {store.label && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {store.label}
        </Typography>
      )}
      <MuiSlider
        value={store.value}
        min={store.min}
        max={store.max}
        step={store.step}
        disabled={store.disabled}
        color={store.color}
        size={store.size}
        marks={store.marks}
        valueLabelDisplay={store.valueLabelDisplay}
        onChange={(_e, v) => store.setValue(v as number)}
      />
      {store.validation && (
        <Typography color="error" variant="caption">
          {store.validation}
        </Typography>
      )}
    </Box>
  )
})
