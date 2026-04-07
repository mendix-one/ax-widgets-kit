import { makeAutoObservable } from 'mobx'

export class AuthLayoutStore {
  tagline: string | undefined = undefined
  description: string | undefined = undefined
  showBackground = true

  constructor() {
    makeAutoObservable(this)
  }
}
