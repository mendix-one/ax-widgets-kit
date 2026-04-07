import { makeAutoObservable, runInAction } from 'mobx'

export class SetPasswordFormStore {
  password = ''
  confirmPassword = ''
  showPassword = false
  error = ''
  loading = false
  success = false
  readOnly = false

  // Callbacks set by container
  onPasswordChange?: (v: string) => void
  onSubmit?: () => void
  onNavigateSignIn?: () => void

  constructor() {
    makeAutoObservable(this)
  }

  setPassword(v: string) {
    this.password = v
    this.onPasswordChange?.(v)
  }

  setConfirmPassword(v: string) {
    this.confirmPassword = v
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword
  }

  setReadOnly(v: boolean) {
    this.readOnly = v
  }

  setError(v: string) {
    this.error = v
  }

  // Sync from Mendix (don't trigger onChange callback)
  syncPassword(v: string) {
    this.password = v
  }

  submit() {
    this.error = ''
    if (!this.password || !this.confirmPassword) {
      this.error = 'Both fields are required.'
      return
    }
    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match.'
      return
    }
    this.loading = true
    this.onSubmit?.()
    setTimeout(() => {
      runInAction(() => {
        this.loading = false
        this.success = true
      })
    }, 600)
  }
}
