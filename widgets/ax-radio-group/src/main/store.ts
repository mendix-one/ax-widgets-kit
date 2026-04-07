import { makeAutoObservable } from 'mobx'

export interface RadioOption {
  value: string
  label: string
}

export class RadioGroupStore {
  value = ''
  label = ''
  options: RadioOption[] = []
  row = false
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' = 'primary'
  size: 'small' | 'medium' = 'medium'
  disabled = false

  // Callbacks set by container
  onValueChange?: (v: string) => void
  onChangeAction?: () => void

  validation: string | undefined = undefined
  loading = false
  constructor() {
    makeAutoObservable(this)
  }

  // Sync from Mendix (don't trigger onChange callback)
  syncValue(v: string) {
    this.value = v
  }

  setValue(v: string) {
    this.value = v
    this.onValueChange?.(v)
    this.onChangeAction?.()
  }

  setLabel(v: string) {
    this.label = v
  }

  setOptions(v: RadioOption[]) {
    this.options = v
  }

  setRow(v: boolean) {
    this.row = v
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
