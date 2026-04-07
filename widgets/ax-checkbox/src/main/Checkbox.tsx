import MuiCheckbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { observer } from 'mobx-react-lite'
import type { ReactElement } from 'react'

import { useCheckboxStore } from './context'

export const Checkbox = observer(function Checkbox(): ReactElement {
  const store = useCheckboxStore()

  if (store.loading) return <Skeleton variant="rectangular" width={150} height={24} sx={{ borderRadius: 1 }} />

  return (
    <>
      <FormControlLabel
        label={store.label}
        disabled={store.disabled}
        control={
          <MuiCheckbox
            checked={store.checked}
            onChange={(_e, checked) => store.setChecked(checked)}
            color={store.color}
            size={store.size}
            disabled={store.disabled}
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
