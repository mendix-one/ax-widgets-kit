import { makeAutoObservable } from 'mobx'

import { type Notification, type UrgentTask } from '../../shared/layout/types'

const now = Date.now()

const initialTasks: UrgentTask[] = [
  {
    id: 1,
    titleKey: 'tasks.yieldDropTitle',
    descKey: 'tasks.yieldDropDesc',
    timestamp: new Date(now - 15 * 60 * 1000),
    done: false,
  },
  {
    id: 2,
    titleKey: 'tasks.calibrationTitle',
    descKey: 'tasks.calibrationDesc',
    timestamp: new Date(now - 2 * 60 * 60 * 1000),
    done: false,
  },
  {
    id: 3,
    titleKey: 'tasks.lotHoldTitle',
    descKey: 'tasks.lotHoldDesc',
    timestamp: new Date(now - 5 * 60 * 60 * 1000),
    done: false,
  },
]

const initialNotifications: Notification[] = [
  {
    id: 1,
    type: 'danger',
    titleKey: 'notifications.defectRateTitle',
    descKey: 'notifications.defectRateDesc',
    timestamp: new Date(now - 10 * 60 * 1000),
    read: false,
  },
  {
    id: 2,
    type: 'danger',
    titleKey: 'notifications.yieldDropTitle',
    descKey: 'notifications.yieldDropDesc',
    timestamp: new Date(now - 35 * 60 * 1000),
    read: false,
  },
  {
    id: 3,
    type: 'warning',
    titleKey: 'notifications.calibrationTitle',
    descKey: 'notifications.calibrationDesc',
    timestamp: new Date(now - 4 * 60 * 60 * 1000),
    read: false,
  },
  {
    id: 4,
    type: 'warning',
    titleKey: 'notifications.maintenanceTitle',
    descKey: 'notifications.maintenanceDesc',
    timestamp: new Date(now - 1 * 24 * 60 * 60 * 1000),
    read: true,
  },
  {
    id: 5,
    type: 'info',
    titleKey: 'notifications.yieldReportTitle',
    descKey: 'notifications.yieldReportDesc',
    timestamp: new Date(now - 3 * 24 * 60 * 60 * 1000),
    read: true,
  },
  {
    id: 6,
    type: 'info',
    titleKey: 'notifications.modelRetrainedTitle',
    descKey: 'notifications.modelRetrainedDesc',
    timestamp: new Date(now - 1 * 7 * 24 * 60 * 60 * 1000),
    read: true,
  },
]

export class NotificationStore {
  notifications: Notification[] = initialNotifications
  tasks: UrgentTask[] = initialTasks

  constructor() {
    makeAutoObservable(this)
  }

  get unreadCount() {
    return this.notifications.filter((n) => !n.read).length
  }

  get pendingTaskCount() {
    return this.tasks.filter((t) => !t.done).length
  }

  markRead(id: number) {
    const n = this.notifications.find((n) => n.id === id)
    if (n) n.read = true
  }

  markAllRead() {
    this.notifications.forEach((n) => {
      n.read = true
    })
  }

  markDone(id: number) {
    const t = this.tasks.find((t) => t.id === id)
    if (t) t.done = true
  }

  markAllDone() {
    this.tasks.forEach((t) => {
      t.done = true
    })
  }
}
