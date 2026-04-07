import { makeAutoObservable } from 'mobx'

export class CheckboxStore {
  checked = false
  label = ''
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'default' = 'primary'
  size: 'small' | 'medium' = 'medium'
  disabled = false

  // Callbacks set by container
  onCheckedChange?: (v: boolean) => void
  onChangeAction?: () => void

  validation: string | undefined = undefined
  loading = false
  constructor() {
    makeAutoObservable(this)
  }

  // Sync from Mendix (don't trigger onChange callback)
  syncChecked(v: boolean) {
    this.checked = v
  }

  setChecked(v: boolean) {
    this.checked = v
    this.onCheckedChange?.(v)
    this.onChangeAction?.()
  }

  toggle() {
    this.setChecked(!this.checked)
  }

  setLabel(v: string) {
    this.label = v
  }

  setColor(v: typeof this.color) {
    this.color = v
  }

  setSize(v: typeof this.size) {
    this.size = v
  }

  setDisabled(v: boolean) {
    this.disabled = v
  }

  setValidation(v: string | undefined) {
    this.validation = v
  }

  setLoading(v: boolean) {
    this.loading = v
  }
}
