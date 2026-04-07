import { makeAutoObservable } from 'mobx'

export class UserMenuStore {
  name = 'Operator'
  email = 'operator@amoza.ai'
  onSignOut?: () => void
  onProfile?: () => void
  onSettings?: () => void

  constructor() {
    makeAutoObservable(this)
  }

  get initials(): string {
    return this.name.slice(0, 2).toUpperCase()
  }

  setName(name: string) {
    this.name = name
  }

  setEmail(email: string) {
    this.email = email
  }

  setOnSignOut(fn?: () => void) {
    this.onSignOut = fn
  }

  setOnProfile(fn?: () => void) {
    this.onProfile = fn
  }

  setOnSettings(fn?: () => void) {
    this.onSettings = fn
  }
}
