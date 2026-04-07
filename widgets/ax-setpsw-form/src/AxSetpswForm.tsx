import { AxThemeProvider, ErrorBoundary, useWidgetEvents, type AxEvent } from '@ax/shared'
import { configure } from 'mobx'
import { type ReactElement, useCallback, useEffect } from 'react'

import { SetPasswordFormProvider, useSetPasswordFormStore } from './main/context'
import { SetPasswordForm } from './main/SetPasswordForm'
import { SetPasswordFormStore } from './main/store'

import type { AxSetpswFormContainerProps } from '../typings/AxSetpswFormProps'

configure({ isolateGlobalState: true })

export function AxSetpswForm(props: AxSetpswFormContainerProps): ReactElement {
  return (
    <ErrorBoundary>
      <AxThemeProvider>
        <SetPasswordFormProvider createStore={() => new SetPasswordFormStore()}>
          <AxSetpswFormSync {...props} />
        </SetPasswordFormProvider>
      </AxThemeProvider>
    </ErrorBoundary>
  )
}

function AxSetpswFormSync(props: AxSetpswFormContainerProps): ReactElement {
  const store = useSetPasswordFormStore()

  // Sync Mendix EditableValue props to store
  useEffect(() => {
    store.syncPassword(props.passwordAttr?.value ?? '')
  }, [store, props.passwordAttr?.value])

  useEffect(() => {
    store.setReadOnly(props.passwordAttr?.readOnly ?? false)
  }, [store, props.passwordAttr?.readOnly])

  // Sync callbacks
  useEffect(() => {
    store.setOnPasswordChange((v: string) => props.passwordAttr?.setValue(v))
    store.setOnSubmit(props.onSubmit?.canExecute ? () => props.onSubmit!.execute() : undefined)
    store.setOnNavigateSignIn(props.onNavigateSignIn?.canExecute ? () => props.onNavigateSignIn!.execute() : undefined)
  })

  // Subscribe to event bus (broadcast + private topic)
  const handleEvent = useCallback((_event: AxEvent) => {
    // Handle events from other widgets or Mendix nanoflows
  }, [])

  useWidgetEvents({ widgetName: props.name, onEvent: handleEvent })

  return <SetPasswordForm />
}
