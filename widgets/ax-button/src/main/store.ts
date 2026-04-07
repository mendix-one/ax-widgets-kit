import { makeAutoObservable } from 'mobx'

export class ButtonStore {
  label = ''
  variant: 'contained' | 'outlined' | 'text' = 'contained'
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' = 'primary'
  size: 'small' | 'medium' | 'large' = 'medium'
  disabled = false
  fullWidth = false

  // Callbacks set by container
  onClick?: () => void

  constructor() {
    makeAutoObservable(this)
  }

  setLabel(v: string) {
    this.label = v
  }

  setVariant(v: 'contained' | 'outlined' | 'text') {
    this.variant = v
  }

  setColor(v: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info') {
    this.color = v
  }

  setSize(v: 'small' | 'medium' | 'large') {
    this.size = v
  }

  setDisabled(v: boolean) {
    this.disabled = v
  }

  setFullWidth(v: boolean) {
    this.fullWidth = v
  }

  handleClick() {
    this.onClick?.()
  }
}
