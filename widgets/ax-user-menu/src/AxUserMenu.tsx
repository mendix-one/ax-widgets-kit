import { AxThemeProvider, ErrorBoundary, executeAction, useWidgetEvents, type AxEvent } from '@ax/shared'
import { configure } from 'mobx'
import { type ReactElement, useCallback, useEffect } from 'react'

import { UserMenuProvider, useUserMenuStore } from './main/context'
import { UserMenuStore } from './main/store'
import { UserMenu } from './main/UserMenu'

import type { AxUserMenuContainerProps } from '../typings/AxUserMenuProps'

configure({ isolateGlobalState: true })

export function AxUserMenu(props: AxUserMenuContainerProps): ReactElement {
  return (
    <ErrorBoundary>
      <div className={props.class} style={{ ...props.style, display: 'inline-flex' }}>
        <AxThemeProvider>
          <UserMenuProvider createStore={() => new UserMenuStore()}>
            <AxUserMenuSync {...props} />
          </UserMenuProvider>
        </AxThemeProvider>
      </div>
    </ErrorBoundary>
  )
}

function AxUserMenuSync(props: AxUserMenuContainerProps): ReactElement {
  const store = useUserMenuStore()

  useEffect(() => {
    if (props.userName?.value !== undefined) {
      store.setName(props.userName.value)
    }
  }, [store, props.userName?.value])

  useEffect(() => {
    if (props.userEmail?.value !== undefined) {
      store.setEmail(props.userEmail.value)
    }
  }, [store, props.userEmail?.value])

  useEffect(() => {
    store.setOnSignOut(() => executeAction(props.onSignOut))
  }, [store, props.onSignOut?.canExecute])

  useEffect(() => {
    store.setOnProfile(() => executeAction(props.onProfile))
  }, [store, props.onProfile?.canExecute])

  useEffect(() => {
    store.setOnSettings(() => executeAction(props.onSettings))
  }, [store, props.onSettings?.canExecute])

  // Subscribe to event bus (broadcast + private topic)
  const handleEvent = useCallback((_event: AxEvent) => {
    // Handle events from other widgets or Mendix nanoflows
  }, [])

  useWidgetEvents({ widgetName: props.name, onEvent: handleEvent })

  return <UserMenu />
}
