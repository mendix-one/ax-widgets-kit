import Skeleton from '@mui/material/Skeleton'
import MuiToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import { observer } from 'mobx-react-lite'
import type { ReactElement } from 'react'

import { useToggleButtonStore } from './context'

export const ToggleButton = observer(function ToggleButton(): ReactElement {
  const store = useToggleButtonStore()

  if (store.loading)
    return (
      <Skeleton
        variant="rounded"
        width="100%"
        height={store.size === 'small' ? 32 : store.size === 'large' ? 48 : 40}
      />
    )

  return (
    <>
      <ToggleButtonGroup
        value={store.value}
        exclusive={store.exclusive}
        color={store.color}
        size={store.size}
        orientation={store.orientation}
        disabled={store.disabled}
        fullWidth={store.fullWidth}
        onChange={(_e, v) => {
          if (v !== null) {
            store.setValue(v as string)
          }
        }}
      >
        {store.options.map((opt) => (
          <MuiToggleButton key={opt.value} value={opt.value}>
            {opt.label || opt.value}
          </MuiToggleButton>
        ))}
      </ToggleButtonGroup>
      {store.validation && (
        <Typography color="error" variant="caption">
          {store.validation}
        </Typography>
      )}
    </>
  )
})
