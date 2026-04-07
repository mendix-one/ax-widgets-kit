import { makeAutoObservable } from 'mobx'

type NotifyType = 'danger' | 'warning' | 'info'

export interface NotifyItem {
  id: number
  type: NotifyType
  title: string
  description: string
  timestamp: string
  read: boolean
}

export class NotifyMenuStore {
  title = 'Notifications'
  items: NotifyItem[] = []
  onNotifyClick?: (id: number) => void

  constructor() {
    makeAutoObservable(this)
  }

  get unreadCount(): number {
    return this.items.filter((n) => !n.read).length
  }

  setTitle(title: string) {
    this.title = title
  }

  setItems(items: NotifyItem[]) {
    this.items = items
  }

  setOnNotifyClick(fn?: (id: number) => void) {
    this.onNotifyClick = fn
  }

  markRead(id: number) {
    const item = this.items.find((n) => n.id === id)
    if (item) item.read = true
    this.onNotifyClick?.(id)
  }

  markAllRead() {
    this.items.forEach((n) => {
      n.read = true
    })
  }
}
