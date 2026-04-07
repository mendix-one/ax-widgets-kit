import { makeAutoObservable } from 'mobx'

export class LogoStore {
  src: string | undefined = undefined
  alt: string | undefined = undefined
  height: number = 24
  onClick: (() => void) | undefined = undefined

  constructor() {
    makeAutoObservable(this)
  }

  setOnClick(fn: (() => void) | undefined) {
    this.onClick = fn
  }

  setSrc(v: string | undefined) { this.src = v }

  setAlt(v: string | undefined) { this.alt = v }

  setHeight(v: number) { this.height = v }
}
