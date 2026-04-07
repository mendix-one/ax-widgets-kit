import { makeAutoObservable } from 'mobx'

export class SwitchStore {
  checked = false
  label = ''
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' = 'primary'
  size: 'small' | 'medium' = 'medium'
  disabled = false
  labelPlacement: 'end' | 'start' | 'top' | 'bottom' = 'end'

  // Callbacks set by container
  onCheckedChange?: (v: boolean) => void
  onChangeAction?: () => void

  validation: string | undefined = undefined
  loading = false
  constructor() {
    makeAutoObservable(this)
  }

  setChecked(v: boolean) {
    this.checked = v
    this.onCheckedChange?.(v)
    this.onChangeAction?.()
  }

  toggle() {
    this.setChecked(!this.checked)
  }

  // Sync from Mendix (don't trigger onChange callback)
  syncChecked(v: boolean) {
    this.checked = v
  }

  setLabel(v: string) {
    this.label = v
  }

  setColor(v: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info') {
    this.color = v
  }

  setSize(v: 'small' | 'medium') {
    this.size = v
  }

  setDisabled(v: boolean) {
    this.disabled = v
  }

  setLabelPlacement(v: 'end' | 'start' | 'top' | 'bottom') {
    this.labelPlacement = v
  }

  setValidation(v: string | undefined) {
    this.validation = v
  }

  setLoading(v: boolean) {
    this.loading = v
  }
}
