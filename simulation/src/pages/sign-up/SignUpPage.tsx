import { AxAuthLayout } from '@ax/auth-layout/src/AxAuthLayout'
import { AxSignupForm } from '@ax/signup-form/src/AxSignupForm'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import type { DynamicValue, EditableValue } from 'mendix'


function useMockAttr(initial = '') {
  const [value, setVal] = useState(initial)
  return {
    status: 'available',
    readOnly: false,
    value,
    displayValue: value,
    setValue: setVal,
    validation: undefined,
    setValidator: () => {},
    setTextValue: setVal,
    formatter: { format: (v: string) => v, parse: () => ({ valid: true }) },
    setFormatter: () => {},
    isList: false,
  } as unknown as EditableValue<string>
}

function mockDynamic(value: string) {
  return { status: 'available' as const, value } as DynamicValue<string>
}

export default function SignUpPage() {
  const navigate = useNavigate()
  const fullNameAttr = useMockAttr('')
  const emailAttr = useMockAttr('')
  const passwordAttr = useMockAttr('')

  const mockAction = { canExecute: true, isExecuting: false, execute: () => {} }
  const navAction = (path: string) => ({ ...mockAction, execute: () => navigate(path) })

  return (
    <AxAuthLayout
      name="AxAuthLayout1"
      class=""
      tagline={mockDynamic('AI-Powered\nSmart Manufacturing')}
      brandDescription={mockDynamic(
        'Streamline your semiconductor operations with intelligent planning, real-time monitoring, and predictive analytics.',
      )}
      themeTokens=""
      showBackground={true}
      content={
        <AxSignupForm
          name="AxSignupForm1"
          class=""
          fullNameAttr={fullNameAttr}
          emailAttr={emailAttr}
          passwordAttr={passwordAttr}
          showSSO={true}
          onSubmit={mockAction}
          onNavigateSignIn={navAction('/sign-in')}
          onGoogleSSO={mockAction}
          onMicrosoftSSO={mockAction}
        />
      }
    />
  )
}
