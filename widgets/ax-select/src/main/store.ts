import { makeAutoObservable } from 'mobx'

export interface SelectOption {
  value: string
  label: string
}

export class SelectStore {
  value = ''
  label = ''
  options: SelectOption[] = []
  variant: 'outlined' | 'filled' | 'standard' = 'outlined'
  size: 'small' | 'medium' = 'small'
  disabled = false
  fullWidth = true
  helperText = ''

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

  setOptions(v: SelectOption[]) {
    this.options = v
  }

  setVariant(v: typeof this.variant) {
    this.variant = v
  }

  setSize(v: typeof this.size) {
    this.size = v
  }

  setDisabled(v: boolean) {
    this.disabled = v
  }

  setFullWidth(v: boolean) {
    this.fullWidth = v
  }

  setHelperText(v: string) {
    this.helperText = v
  }

  setValidation(v: string | undefined) {
    this.validation = v
  }

  setLoading(v: boolean) {
    this.loading = v
  }
}
