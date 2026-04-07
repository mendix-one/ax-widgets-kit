import { makeAutoObservable } from 'mobx'

export class ButtonGroupStore {
  variant: 'contained' | 'outlined' | 'text' = 'outlined'
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' = 'primary'
  size: 'small' | 'medium' | 'large' = 'medium'
  orientation: 'horizontal' | 'vertical' = 'horizontal'
  disabled = false
  fullWidth = false

  constructor() {
    makeAutoObservable(this)
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

  setOrientation(v: 'horizontal' | 'vertical') {
    this.orientation = v
  }

  setDisabled(v: boolean) {
    this.disabled = v
  }

  setFullWidth(v: boolean) {
    this.fullWidth = v
  }
}
