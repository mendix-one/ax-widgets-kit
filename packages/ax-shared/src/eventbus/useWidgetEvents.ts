import { useEffect, useRef } from 'react'

import { getEventBus, initEventBus } from './bus'
import { Ax_BROADCAST, type AxEventHandler, widgetTopic } from './types'

interface UseWidgetEventsOptions {
  /** Widget instance name from Mendix props (e.g. 'AxSigninForm1') */
  widgetName: string
  /** Handler called for events on both broadcast and private topics */
  onEvent: AxEventHandler
  /** If true, initialize the bus (layout widgets only). Default: false */
  isLayout?: boolean
}

/**
 * React hook for subscribing to the Ax event bus in the container layer.
 *
 * - **Layout widgets** pass `isLayout: true` to ensure the bus is created.
 * - **Child widgets** connect to the existing bus.
 *
 * Each widget listens to two topics:
 * 1. `ax:broadcast` — common topic, all widgets receive
 * 2. `ax:{widgetName}` — private topic, only this widget instance
 *
 * The handler receives `{ action: string, payload?: unknown }`.
 */
export function useWidgetEvents({ widgetName, onEvent, isLayout }: UseWidgetEventsOptions): void {
  const handlerRef = useRef(onEvent)
  handlerRef.current = onEvent

  useEffect(() => {
    const bus = isLayout ? initEventBus() : getEventBus()
    if (!bus) return

    const privateTopic = widgetTopic(widgetName)
    const handler: AxEventHandler = (event) => handlerRef.current(event)

    bus.on(Ax_BROADCAST, handler)
    bus.on(privateTopic, handler)

    return () => {
      bus.removeListener(Ax_BROADCAST, handler)
      bus.removeListener(privateTopic, handler)
    }
  }, [widgetName, isLayout])
}
