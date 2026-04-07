import { makeAutoObservable, runInAction } from 'mobx'

export class SignInFormStore {
  email = ''
  password = ''
  showPassword = false
  showSSO = true
  readOnly = false
  error = ''
  loading = false

  // Callbacks set by container
  onEmailChange?: (v: string) => void
  onPasswordChange?: (v: string) => void
  onSubmit?: () => void
  onNavigateSignUp?: () => void
  onNavigateResetPass?: () => void
  onGoogleSSO?: () => void
  onMicrosoftSSO?: () => void

  constructor() {
    makeAutoObservable(this)
  }

  setEmail(v: string) {
    this.email = v
    this.onEmailChange?.(v)
  }

  setPassword(v: string) {
    this.password = v
    this.onPasswordChange?.(v)
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
  syncEmail(v: string) {
    this.email = v
  }

  syncPassword(v: string) {
    this.password = v
  }

  submit() {
    this.error = ''
    if (!this.email || !this.password) {
      this.error = 'Email and password are required.'
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
