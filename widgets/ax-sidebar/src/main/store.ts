import { makeAutoObservable } from 'mobx'
import { type ReactNode } from 'react'

export interface NavItem {
  id: string
  label: string
  icon: ReactNode
}

export class SidebarStore {
  items: NavItem[] = []
  activeId = ''
  onItemClick?: (id: string) => void

  constructor() {
    makeAutoObservable(this, { items: false })
  }

  setItems(items: NavItem[]) {
    this.items = items
  }

  setActiveId(id: string) {
    this.activeId = id
  }

  setOnItemClick(fn?: (id: string) => void) {
    this.onItemClick = fn
  }

  selectItem(id: string) {
    this.activeId = id
    this.onItemClick?.(id)
  }
}
