import FormControlLabel from '@mui/material/FormControlLabel'
import Skeleton from '@mui/material/Skeleton'
import MuiSwitch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import { observer } from 'mobx-react-lite'
import type { ReactElement } from 'react'

import { useSwitchStore } from './context'

export const Switch = observer(function Switch(): ReactElement {
  const store = useSwitchStore()

  if (store.loading) return <Skeleton variant="rectangular" width={150} height={24} sx={{ borderRadius: 1 }} />

  return (
    <>
      <FormControlLabel
        label={store.label}
        labelPlacement={store.labelPlacement}
        disabled={store.disabled}
        control={
          <MuiSwitch
            checked={store.checked}
            color={store.color}
            size={store.size}
            onChange={(_e, checked) => store.setChecked(checked)}
          />
        }
      />
      {store.validation && (
        <Typography color="error" variant="caption" sx={{ ml: 4 }}>
          {store.validation}
        </Typography>
      )}
    </>
  )
})
