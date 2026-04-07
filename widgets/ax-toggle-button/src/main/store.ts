import { makeAutoObservable } from 'mobx'

export interface ToggleOption {
  value: string
  label: string
}

export class ToggleButtonStore {
  value = ''
  options: ToggleOption[] = []
  exclusive = true
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' = 'primary'
  size: 'small' | 'medium' | 'large' = 'medium'
  orientation: 'horizontal' | 'vertical' = 'horizontal'
  disabled = false
  fullWidth = false

  // Callbacks set by container
  onValueChange?: (v: string) => void
  onChangeAction?: () => void

  validation: string | undefined = undefined
  loading = false
  constructor() {
    makeAutoObservable(this)
  }

  setValue(v: string) {
    this.value = v
    this.onValueChange?.(v)
    this.onChangeAction?.()
  }

  // Sync from Mendix (don't trigger onChange callback)
  syncValue(v: string) {
    this.value = v
  }

  setOptions(v: ToggleOption[]) {
    this.options = v
  }

  setExclusive(v: boolean) {
    this.exclusive = v
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

  setValidation(v: string | undefined) {
    this.validation = v
  }

  setLoading(v: boolean) {
    this.loading = v
  }
}
