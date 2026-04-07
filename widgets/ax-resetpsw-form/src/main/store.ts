import { makeAutoObservable, runInAction } from 'mobx'

export class ResetPassFormStore {
  email = ''
  error = ''
  loading = false
  sent = false
  readOnly = false

  // Callbacks set by container
  onEmailChange?: (v: string) => void
  onSubmit?: () => void
  onNavigateSignIn?: () => void

  constructor() {
    makeAutoObservable(this)
  }

  setEmail(v: string) {
    this.email = v
    this.onEmailChange?.(v)
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

  submit() {
    this.error = ''
    if (!this.email) {
      this.error = 'Email is required.'
      return
    }
    this.loading = true
    this.onSubmit?.()
    setTimeout(() => {
      runInAction(() => {
        this.loading = false
        this.sent = true
      })
    }, 600)
  }
}
