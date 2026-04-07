import { type TFunction } from 'i18next'

export type SidebarMode = 'show' | 'mini' | 'hide'

export type NotifyType = 'danger' | 'warning' | 'info'

export interface UrgentTask {
  id: number
  titleKey: string
  descKey: string
  timestamp: Date
  done: boolean
}

export interface Notification {
  id: number
  type: NotifyType
  titleKey: string
  descKey: string
  timestamp: Date
  read: boolean
}

export function timeAgo(date: Date, t: TFunction): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  if (seconds < 60) return t('time.justNow')
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return t('time.minutesAgo', { count: minutes })
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return t('time.hoursAgo', { count: hours })
  const days = Math.floor(hours / 24)
  if (days < 7) return t('time.daysAgo', { count: days })
  const weeks = Math.floor(days / 7)
  if (weeks < 4) return t('time.weeksAgo', { count: weeks })
  const months = Math.floor(days / 30)
  return t('time.monthsAgo', { count: months })
}
