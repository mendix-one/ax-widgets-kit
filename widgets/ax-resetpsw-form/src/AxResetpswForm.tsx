import { AxThemeProvider, ErrorBoundary, useWidgetEvents, type AxEvent } from '@ax/shared'
import { configure } from 'mobx'
import { type ReactElement, useCallback, useEffect } from 'react'

import { ResetPassFormProvider, useResetPassFormStore } from './main/context'
import { ResetPassForm } from './main/ResetPassForm'
import { ResetPassFormStore } from './main/store'

import type { AxResetpswFormContainerProps } from '../typings/AxResetpswFormProps'

configure({ isolateGlobalState: true })

export function AxResetpswForm(props: AxResetpswFormContainerProps): ReactElement {
  return (
    <ErrorBoundary>
      <AxThemeProvider>
        <ResetPassFormProvider createStore={() => new ResetPassFormStore()}>
          <AxResetpswFormSync {...props} />
        </ResetPassFormProvider>
      </AxThemeProvider>
    </ErrorBoundary>
  )
}

function AxResetpswFormSync(props: AxResetpswFormContainerProps): ReactElement {
  const store = useResetPassFormStore()

  // Sync Mendix EditableValue props to store
  useEffect(() => {
    store.syncEmail(props.emailAttr?.value ?? '')
  }, [store, props.emailAttr?.value])

  useEffect(() => {
    store.setReadOnly(props.emailAttr?.readOnly ?? false)
  }, [store, props.emailAttr?.readOnly])

  // Sync callbacks
  useEffect(() => {
    store.setOnEmailChange((v: string) => props.emailAttr?.setValue(v))
    store.setOnSubmit(props.onSubmit?.canExecute ? () => props.onSubmit!.execute() : undefined)
    store.setOnNavigateSignIn(props.onNavigateSignIn?.canExecute ? () => props.onNavigateSignIn!.execute() : undefined)
  })

  // Subscribe to event bus (broadcast + private topic)
  const handleEvent = useCallback((_event: AxEvent) => {
    // Handle events from other widgets or Mendix nanoflows
  }, [])

  useWidgetEvents({ widgetName: props.name, onEvent: handleEvent })

  return <ResetPassForm />
}
