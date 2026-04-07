import { type ReactElement, useCallback, useEffect, useState } from 'react'
import { AxThemeProvider, ErrorBoundary, executeAction, useWidgetEvents, type AxEvent } from '@ax/shared'

import type { AxUserMenuContainerProps } from '../typings/AxUserMenuProps'

import { UserMenuProvider } from './main/context'
import { UserMenuStore } from './main/store'
import { UserMenu } from './main/UserMenu'

export function AxUserMenu(props: AxUserMenuContainerProps): ReactElement {
  const [store] = useState(() => new UserMenuStore())

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

  return (
    <ErrorBoundary>
      <div className={props.class} style={{ ...props.style, display: 'inline-flex' }}>
        <AxThemeProvider>
          <UserMenuProvider store={store}>
            <UserMenu />
          </UserMenuProvider>
        </AxThemeProvider>
      </div>
    </ErrorBoundary>
  )
}
