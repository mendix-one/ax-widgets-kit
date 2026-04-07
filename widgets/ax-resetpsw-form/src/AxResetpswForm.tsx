import { type ReactElement, useCallback, useEffect, useState } from 'react'
import { AxThemeProvider, ErrorBoundary, useWidgetEvents, type AxEvent } from '@ax/shared'

import type { AxResetpswFormContainerProps } from '../typings/AxResetpswFormProps'

import { ResetPassFormProvider } from './main/context'
import { ResetPassForm } from './main/ResetPassForm'
import { ResetPassFormStore } from './main/store'

export function AxResetpswForm(props: AxResetpswFormContainerProps): ReactElement {
  const [store] = useState(() => new ResetPassFormStore())

  // Sync Mendix EditableValue props to store
  useEffect(() => {
    store.syncEmail(props.emailAttr?.value ?? '')
  }, [props.emailAttr?.value])

  useEffect(() => {
    store.setReadOnly(props.emailAttr?.readOnly ?? false)
  }, [props.emailAttr?.readOnly])

  // Sync callbacks
  useEffect(() => {
    store.onEmailChange = (v: string) => props.emailAttr?.setValue(v)
    store.onSubmit = props.onSubmit?.canExecute ? () => props.onSubmit!.execute() : undefined
    store.onNavigateSignIn = props.onNavigateSignIn?.canExecute ? () => props.onNavigateSignIn!.execute() : undefined
  })

  // Subscribe to event bus (broadcast + private topic)
  const handleEvent = useCallback((_event: AxEvent) => {
    // Handle events from other widgets or Mendix nanoflows
  }, [])

  useWidgetEvents({ widgetName: props.name, onEvent: handleEvent })

  return (
    <ErrorBoundary>
      <AxThemeProvider>
        <ResetPassFormProvider store={store}>
          <ResetPassForm />
        </ResetPassFormProvider>
      </AxThemeProvider>
    </ErrorBoundary>
  )
}
