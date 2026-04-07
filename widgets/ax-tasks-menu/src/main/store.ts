import { makeAutoObservable } from 'mobx'

interface TaskItem {
  id: number
  title: string
  description: string
  timestamp: string
  done: boolean
}

export class TasksMenuStore {
  title = 'Urgent tasks'
  items: TaskItem[] = []
  onTaskClick?: (id: number) => void

  constructor() {
    makeAutoObservable(this)
  }

  get pendingCount(): number {
    return this.items.filter((t) => !t.done).length
  }

  setTitle(title: string) {
    this.title = title
  }

  setItems(items: TaskItem[]) {
    this.items = items
  }

  setOnTaskClick(fn?: (id: number) => void) {
    this.onTaskClick = fn
  }

  markDone(id: number) {
    const task = this.items.find((t) => t.id === id)
    if (task) task.done = true
    this.onTaskClick?.(id)
  }

  markAllDone() {
    this.items.forEach((t) => {
      t.done = true
    })
  }
}
