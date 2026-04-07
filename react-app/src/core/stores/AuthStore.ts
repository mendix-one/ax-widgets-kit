import { makeAutoObservable } from 'mobx'

import { StorageKeys, loadSetting, saveSetting } from '../storage'

export interface AuthUser {
  username: string
  name: string
  email: string
}

const SAMPLE_ACCOUNT: AuthUser & { password: string } = {
  username: 'planner',
  name: 'AI Planner',
  email: 'contact@aplanner.ai',
  password: 'MyPass@123',
}

export class AuthStore {
  user: AuthUser | null = null
  isAuthenticated = false

  constructor() {
    makeAutoObservable(this)

    const saved = loadSetting<AuthUser | null>(StorageKeys.AUTH_USER, null)
    if (saved) {
      this.user = saved
      this.isAuthenticated = true
    }
  }

  /** Returns true on success, false on invalid credentials. */
  signIn(usernameOrEmail: string, password: string): boolean {
    const id = usernameOrEmail.trim().toLowerCase()
    const match =
      (id === SAMPLE_ACCOUNT.username || id === SAMPLE_ACCOUNT.email) &&
      password === SAMPLE_ACCOUNT.password

    if (!match) return false

    this.user = {
      username: SAMPLE_ACCOUNT.username,
      name: SAMPLE_ACCOUNT.name,
      email: SAMPLE_ACCOUNT.email,
    }
    this.isAuthenticated = true
    saveSetting(StorageKeys.AUTH_USER, this.user)
    return true
  }

  signup(name: string, email: string, _password: string) {
    this.user = { username: email.split('@')[0], name, email }
    this.isAuthenticated = true
    saveSetting(StorageKeys.AUTH_USER, this.user)
  }

  signOut() {
    this.user = null
    this.isAuthenticated = false
    saveSetting(StorageKeys.AUTH_USER, null)
  }

  resetPass(_email: string) {
    // Mock: in a real app this would trigger an API call
  }
}
