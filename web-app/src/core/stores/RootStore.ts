import { AgentStore } from './AgentStore'
import { AuthStore } from './AuthStore'
import { NotificationStore } from './NotificationStore'
import { UiStore } from './UiStore'

export class RootStore {
  ui = new UiStore()
  auth = new AuthStore()
  notifications = new NotificationStore()
  agent = new AgentStore()
}
