import { makeAutoObservable } from 'mobx'

export class TextFieldStore {
  value = ''
  label = ''
  placeholder = ''
  variant: 'outlined' | 'filled' | 'standard' = 'outlined'
  size: 'small' | 'medium' = 'small'
  inputType: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' = 'text'
  multiline = false
  rows = 1
  maxRows = 4
  required = false
  fullWidth = true
  helperText = ''
  readOnly = false
  error = ''
  showPassword = false

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
  }

  submit() {
    this.onChangeAction?.()
  }

  setLabel(v: string) {
    this.label = v
  }

  setPlaceholder(v: string) {
    this.placeholder = v
  }

  setVariant(v: 'outlined' | 'filled' | 'standard') {
    this.variant = v
  }

  setSize(v: 'small' | 'medium') {
    this.size = v
  }

  setInputType(v: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url') {
    this.inputType = v
  }

  setMultiline(v: boolean) {
    this.multiline = v
  }

  setRows(v: number) {
    this.rows = v
  }

  setMaxRows(v: number) {
    this.maxRows = v
  }

  setRequired(v: boolean) {
    this.required = v
  }

  setFullWidth(v: boolean) {
    this.fullWidth = v
  }

  setHelperText(v: string) {
    this.helperText = v
  }

  setReadOnly(v: boolean) {
    this.readOnly = v
  }

  setError(v: string) {
    this.error = v
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword
  }

  setValidation(v: string | undefined) {
    this.validation = v
  }

  setLoading(v: boolean) {
    this.loading = v
  }
}
