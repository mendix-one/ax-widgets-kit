import { AxAuthLayout } from '@ax/auth-layout/src/AxAuthLayout'
import { AxSigninForm } from '@ax/signin-form/src/AxSigninForm'
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

export default function SignInPage() {
  const navigate = useNavigate()
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
        <AxSigninForm
          name="AxSigninForm1"
          class=""
          emailAttr={emailAttr}
          passwordAttr={passwordAttr}
          showSSO={true}
          ssoLabel={mockDynamic('Sign in with SSO')}
          onSubmit={mockAction}
          onNavigateSignUp={navAction('/sign-up')}
          onNavigateResetPass={navAction('/reset-psw')}
          onSSO={mockAction}
        />
      }
    />
  )
}
