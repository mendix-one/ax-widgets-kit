import Nanobus from 'nanobus'

const GLOBAL_KEY = '__AX_EVENT_BUS__'

/**
 * Initialize the global event bus. Called by layout widgets (AxWebApp, AxAuthLayout).
 * If a bus already exists on window, it is returned as-is (idempotent).
 */
export function initEventBus(): Nanobus {
  // @ts-ignore
  const win = window as Record<string, unknown>
  if (!win[GLOBAL_KEY]) {
    win[GLOBAL_KEY] = new Nanobus('ax-event-bus')
  }
  return win[GLOBAL_KEY] as Nanobus
}

/**
 * Get the global event bus. Returns undefined if no layout widget has initialized it yet.
 */
export function getEventBus(): Nanobus | undefined {
  // @ts-ignore
  return (window as Record<string, unknown>)[GLOBAL_KEY] as Nanobus | undefined
}

/**
 * Emit an event to a topic on the global bus.
 * Can be called from widget code, Mendix nanoflows, or browser console:
 *
 * ```js
 * window.__AX_EVENT_BUS__.emit('ax:broadcast', { action: 'theme-changed', payload: { mode: 'dark' } })
 * window.__AX_EVENT_BUS__.emit('ax:AxSigninForm1', { action: 'reset' })
 * ```
 */
export function emitEvent(topic: string, event: { action: string; payload?: unknown }): void {
  const bus = getEventBus()
  if (bus) bus.emit(topic, event)
}
