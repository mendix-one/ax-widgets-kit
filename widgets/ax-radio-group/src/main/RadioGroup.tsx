import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import MuiRadioGroup from '@mui/material/RadioGroup'
import Skeleton from '@mui/material/Skeleton'
import { observer } from 'mobx-react-lite'
import type { ReactElement } from 'react'

import { useRadioGroupStore } from './context'

export const RadioGroup = observer(function RadioGroup(): ReactElement {
  const store = useRadioGroupStore()

  if (store.loading) return <Skeleton variant="rectangular" width={200} height={80} sx={{ borderRadius: 1 }} />

  return (
    <FormControl disabled={store.disabled} error={!!store.validation}>
      {store.label && <FormLabel>{store.label}</FormLabel>}
      <MuiRadioGroup value={store.value} onChange={(_e, value) => store.setValue(value)} row={store.row}>
        {store.options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            label={option.label}
            control={<Radio color={store.color} size={store.size} />}
          />
        ))}
      </MuiRadioGroup>
      {store.validation && <FormHelperText>{store.validation}</FormHelperText>}
    </FormControl>
  )
})
