import { makeAutoObservable, reaction } from 'mobx'

import { type SidebarMode } from '../../shared/layout/types'
import { StorageKeys, loadSetting, saveSetting } from '../storage'
import { type DisplayMode } from '../theme'

export class UiStore {
  displayMode: DisplayMode = 'auto'
  systemPrefersDark = false
  sidebarMode: SidebarMode = 'show'
  mobileOpen = false
  agentOpen = false
  agentWidth = 360

  constructor() {
    makeAutoObservable(this)

    // Load persisted values
    this.displayMode = loadSetting<DisplayMode>(StorageKeys.DISPLAY_MODE, 'auto')
    this.sidebarMode = loadSetting<SidebarMode>(StorageKeys.SIDEBAR_MODE, 'show')
    this.agentOpen = loadSetting(StorageKeys.AGENT_OPEN, false)
    this.agentWidth = loadSetting(StorageKeys.AGENT_WIDTH, 360)

    // System dark mode preference
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    this.systemPrefersDark = mql.matches
    mql.addEventListener('change', (e) => {
      this.systemPrefersDark = e.matches
    })

    // Auto-persist to localStorage
    reaction(
      () => this.displayMode,
      (mode) => saveSetting(StorageKeys.DISPLAY_MODE, mode),
    )
    reaction(
      () => this.sidebarMode,
      (mode) => saveSetting(StorageKeys.SIDEBAR_MODE, mode),
    )
    reaction(
      () => this.agentOpen,
      (open) => saveSetting(StorageKeys.AGENT_OPEN, open),
    )
    reaction(
      () => this.agentWidth,
      (width) => saveSetting(StorageKeys.AGENT_WIDTH, width),
    )

    // Favicon side-effect
    reaction(
      () => this.resolvedMode,
      (mode) => {
        const el = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
        if (el) el.href = mode === 'dark' ? '/amoza-icon-dark.png' : '/amoza-icon-light.png'
      },
      { fireImmediately: true },
    )
  }

  get resolvedMode(): 'light' | 'dark' {
    if (this.displayMode === 'auto') {
      return this.systemPrefersDark ? 'dark' : 'light'
    }
    return this.displayMode
  }

  setDisplayMode(mode: DisplayMode) {
    this.displayMode = mode
  }

  setSidebarMode(mode: SidebarMode) {
    this.sidebarMode = mode
  }

  setMobileOpen(open: boolean) {
    this.mobileOpen = open
  }

  setAgentOpen(open: boolean) {
    this.agentOpen = open
  }

  toggleAgentOpen() {
    this.agentOpen = !this.agentOpen
  }

  setAgentWidth(width: number) {
    this.agentWidth = Math.max(280, Math.min(600, width))
  }
}
