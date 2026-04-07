import type { DynamicValue } from 'mendix'

import { AxAuthLayout } from '@ax/auth-layout/src/AxAuthLayout'

function mockDynamic(value: string) {
  return { status: 'available' as const, value } as DynamicValue<string>
}

export default function AuthLayoutPage() {
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
    />
  )
}
