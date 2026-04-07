import MuiButtonGroup from '@mui/material/ButtonGroup'
import { observer } from 'mobx-react-lite'
import type { ReactElement, ReactNode } from 'react'

import { useButtonGroupStore } from './context'

interface ButtonGroupProps {
  children?: ReactNode
}

export const ButtonGroup = observer(function ButtonGroup({ children }: ButtonGroupProps): ReactElement {
  const store = useButtonGroupStore()

  return (
    <MuiButtonGroup
      variant={store.variant}
      color={store.color}
      size={store.size}
      orientation={store.orientation}
      disabled={store.disabled}
      fullWidth={store.fullWidth}
    >
      {children}
    </MuiButtonGroup>
  )
})
