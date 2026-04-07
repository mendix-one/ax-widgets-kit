import { createWidgetContext } from '@ax/shared'

import { type AgentChatStore } from './store'

export const { Provider: AgentChatProvider, useStore: useAgentChatStore } =
  createWidgetContext<AgentChatStore>('AgentChat')
