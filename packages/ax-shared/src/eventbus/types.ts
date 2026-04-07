/**
 * Event payload for inter-widget communication.
 */
export interface AxEvent {
  /** Event action name (e.g. 'reset', 'theme-changed', 'navigate') */
  action: string
  /** Optional data payload */
  payload?: unknown
}

export type AxEventHandler = (event: AxEvent) => void

/** Broadcast topic — all widgets receive events on this topic */
export const Ax_BROADCAST = 'ax:broadcast'

/** Build a private topic name for a specific widget instance */
export const widgetTopic = (widgetName: string): string => `ax:${widgetName}`
