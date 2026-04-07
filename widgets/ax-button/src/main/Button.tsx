import MuiButton from '@mui/material/Button'
import { observer } from 'mobx-react-lite'

import { useButtonStore } from './context'

import type { ReactElement } from 'react'


export const Button = observer(function Button(): ReactElement {
  const store = useButtonStore()

  return (
    <MuiButton
      variant={store.variant}
      color={store.color}
      size={store.size}
      disabled={store.disabled}
      fullWidth={store.fullWidth}
      onClick={() => store.handleClick()}
    >
      {store.label}
    </MuiButton>
  )
})
