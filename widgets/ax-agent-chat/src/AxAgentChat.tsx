import { type ReactElement, useCallback, useEffect, useState } from 'react'
import { AxThemeProvider, ErrorBoundary, useWidgetEvents, type AxEvent } from '@ax/shared'

import type { AxAgentChatContainerProps } from '../typings/AxAgentChatProps'

import { AgentChat } from './main/AgentChat'
import { AgentChatProvider } from './main/context'
import { AgentChatStore } from './main/store'

export function AxAgentChat(props: AxAgentChatContainerProps): ReactElement {
  const [store] = useState(() => new AgentChatStore(props.welcomeMessage?.value))

  useEffect(() => {
    if (props.title?.value) store.setTitle(props.title.value)
  }, [store, props.title?.value])

  useEffect(() => {
    store.setOnSendMessage(props.onSendMessage?.canExecute ? () => props.onSendMessage?.execute() : undefined)
  }, [store, props.onSendMessage?.canExecute])

  // Subscribe to event bus (broadcast + private topic)
  const handleEvent = useCallback((_event: AxEvent) => {
    // Handle events from other widgets or Mendix nanoflows
  }, [])

  useWidgetEvents({ widgetName: props.name, onEvent: handleEvent })

  return (
    <ErrorBoundary>
      <AxThemeProvider>
        <AgentChatProvider store={store}>
          <AgentChat />
        </AgentChatProvider>
      </AxThemeProvider>
    </ErrorBoundary>
  )
}
