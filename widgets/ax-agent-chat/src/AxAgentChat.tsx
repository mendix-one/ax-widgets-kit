import { AxThemeProvider, ErrorBoundary, useWidgetEvents, type AxEvent } from '@ax/shared'
import { configure } from 'mobx'
import { type ReactElement, useCallback, useEffect } from 'react'

import { AgentChat } from './main/AgentChat'
import { AgentChatProvider, useAgentChatStore } from './main/context'
import { AgentChatStore } from './main/store'

import type { AxAgentChatContainerProps } from '../typings/AxAgentChatProps'

configure({ isolateGlobalState: true })

export function AxAgentChat(props: AxAgentChatContainerProps): ReactElement {
  return (
    <ErrorBoundary>
      <AxThemeProvider>
        <AgentChatProvider createStore={() => new AgentChatStore(props.welcomeMessage?.value)}>
          <AxAgentChatSync {...props} />
        </AgentChatProvider>
      </AxThemeProvider>
    </ErrorBoundary>
  )
}

function AxAgentChatSync(props: AxAgentChatContainerProps): ReactElement {
  const store = useAgentChatStore()

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

  return <AgentChat />
}
