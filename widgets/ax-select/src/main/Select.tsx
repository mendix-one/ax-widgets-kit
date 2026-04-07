import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import MuiSelect from '@mui/material/Select'
import Skeleton from '@mui/material/Skeleton'
import { observer } from 'mobx-react-lite'
import type { ReactElement } from 'react'

import { useSelectStore } from './context'

export const Select = observer(function Select(): ReactElement {
  const store = useSelectStore()

  if (store.loading) return <Skeleton variant="rounded" width="100%" height={store.size === 'small' ? 40 : 56} />

  const labelId = `ax-select-label-${store.label}`

  return (
    <FormControl
      variant={store.variant}
      size={store.size}
      disabled={store.disabled}
      fullWidth={store.fullWidth}
      error={!!store.validation}
    >
      {store.label && <InputLabel id={labelId}>{store.label}</InputLabel>}
      <MuiSelect
        labelId={labelId}
        value={store.value}
        label={store.label}
        onChange={(e) => store.setValue(e.target.value as string)}
      >
        {store.options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
      {(store.validation || store.helperText) && (
        <FormHelperText>{store.validation || store.helperText}</FormHelperText>
      )}
    </FormControl>
  )
})
