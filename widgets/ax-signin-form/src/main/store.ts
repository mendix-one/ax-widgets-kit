import { makeAutoObservable, runInAction } from 'mobx'

export type DisplayMode = 'light' | 'dark' | 'auto'
export type Locale = 'en' | 'ko' | 'ja' | 'vi'

const LS_LOCALE = 'ax_signin_locale'
const LS_DISPLAY_MODE = 'ax_signin_display_mode'

function readLS<T extends string>(key: string, fallback: T): T {
  try {
    return (localStorage.getItem(key) as T | null) ?? fallback
  } catch {
    return fallback
  }
}

function writeLS(key: string, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch {
    // ignore
  }
}

export class SignInFormStore {
  email = ''
  password = ''
  showPassword = false
  showSSO = true
  ssoLabel = ''
  readOnly = false
  error = ''
  loading = false
  locale: Locale = readLS<Locale>(LS_LOCALE, 'en')
  displayMode: DisplayMode = readLS<DisplayMode>(LS_DISPLAY_MODE, 'auto')
  systemPrefersDark = false

  // Callbacks set by container
  onEmailChange?: (v: string) => void
  onPasswordChange?: (v: string) => void
  onSubmit?: () => void
  onNavigateSignUp?: () => void
  onNavigateResetPass?: () => void
  onSSO?: () => void

  constructor() {
    makeAutoObservable(this)
    // Track system dark mode preference
    if (typeof window !== 'undefined') {
      const mql = window.matchMedia('(prefers-color-scheme: dark)')
      this.systemPrefersDark = mql.matches
      mql.addEventListener('change', (e) => {
        runInAction(() => {
          this.systemPrefersDark = e.matches
        })
      })
    }
  }

  get resolvedMode(): 'light' | 'dark' {
    if (this.displayMode === 'auto') return this.systemPrefersDark ? 'dark' : 'light'
    return this.displayMode
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

  setSsoLabel(v: string) {
    this.ssoLabel = v
  }

  setReadOnly(v: boolean) {
    this.readOnly = v
  }

  setError(v: string) {
    this.error = v
  }

  setLocale(v: Locale) {
    this.locale = v
    writeLS(LS_LOCALE, v)
  }

  setDisplayMode(v: DisplayMode) {
    this.displayMode = v
    writeLS(LS_DISPLAY_MODE, v)
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

  setOnEmailChange(fn: ((v: string) => void) | undefined) { this.onEmailChange = fn }

  setOnPasswordChange(fn: ((v: string) => void) | undefined) { this.onPasswordChange = fn }

  setOnSubmit(fn: (() => void) | undefined) { this.onSubmit = fn }

  setOnNavigateSignUp(fn: (() => void) | undefined) { this.onNavigateSignUp = fn }

  setOnNavigateResetPass(fn: (() => void) | undefined) { this.onNavigateResetPass = fn }

  setOnSSO(fn: (() => void) | undefined) { this.onSSO = fn }
}
