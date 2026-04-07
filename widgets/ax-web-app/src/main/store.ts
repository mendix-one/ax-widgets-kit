import { makeAutoObservable } from 'mobx'

export type SidebarMode = 'show' | 'mini' | 'hide'

export class WebAppStore {
  sidebarMode: SidebarMode = 'show'
  mobileOpen = false
  agentOpen = false
  agentWidth = 360
  resizing = false

  constructor() {
    makeAutoObservable(this)
  }

  toggleSidebar(isMobile: boolean) {
    if (isMobile) {
      this.mobileOpen = !this.mobileOpen
    } else {
      this.sidebarMode = this.sidebarMode === 'show' ? 'mini' : this.sidebarMode === 'mini' ? 'hide' : 'show'
    }
  }

  setMobileOpen(open: boolean) {
    this.mobileOpen = open
  }

  toggleAgent() {
    this.agentOpen = !this.agentOpen
  }

  setAgentOpen(open: boolean) {
    this.agentOpen = open
  }

  setAgentWidth(width: number) {
    this.agentWidth = Math.max(280, Math.min(600, width))
  }

  setResizing(resizing: boolean) {
    this.resizing = resizing
  }

  get drawerWidth(): number {
    return this.sidebarMode === 'show' ? 240 : this.sidebarMode === 'mini' ? 64 : 0
  }

  get agentPanelWidth(): number {
    return this.agentOpen ? this.agentWidth + 4 : 0
  }
}
