import { makeAutoObservable, runInAction } from 'mobx'

export class SignUpFormStore {
  fullName = ''
  email = ''
  password = ''
  confirmPassword = ''
  showPassword = false
  showSSO = true
  readOnly = false
  error = ''
  loading = false

  // Callbacks set by container
  onFullNameChange?: (v: string) => void
  onEmailChange?: (v: string) => void
  onPasswordChange?: (v: string) => void
  onSubmit?: () => void
  onNavigateSignIn?: () => void
  onGoogleSSO?: () => void
  onMicrosoftSSO?: () => void

  constructor() {
    makeAutoObservable(this)
  }

  setFullName(v: string) {
    this.fullName = v
    this.onFullNameChange?.(v)
  }

  setEmail(v: string) {
    this.email = v
    this.onEmailChange?.(v)
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

  setShowSSO(v: boolean) {
    this.showSSO = v
  }

  setReadOnly(v: boolean) {
    this.readOnly = v
  }

  setError(v: string) {
    this.error = v
  }

  // Sync from Mendix (don't trigger onChange callback)
  syncFullName(v: string) {
    this.fullName = v
  }

  syncEmail(v: string) {
    this.email = v
  }

  syncPassword(v: string) {
    this.password = v
  }

  submit() {
    this.error = ''
    if (!this.fullName || !this.email || !this.password || !this.confirmPassword) {
      this.error = 'All fields are required.'
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
      })
    }, 600)
  }
}
