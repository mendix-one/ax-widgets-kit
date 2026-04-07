import { makeAutoObservable } from 'mobx'

export class AuthLayoutStore {
  tagline: string | undefined = undefined
  description: string | undefined = undefined
  showBackground = true

  constructor() {
    makeAutoObservable(this)
  }

  setTagline(v: string | undefined) { this.tagline = v }

  setDescription(v: string | undefined) { this.description = v }

  setShowBackground(v: boolean) { this.showBackground = v }
}
