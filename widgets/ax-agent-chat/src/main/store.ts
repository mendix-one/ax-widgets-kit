import { makeAutoObservable, runInAction } from 'mobx'

interface ChatMessage {
  id: number
  role: 'user' | 'agent'
  text: string
  time: string
}

const timestamp = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

const sampleMessages: ChatMessage[] = [
  { id: 1, role: 'agent', text: "Hi! I'm your aPlanner assistant. How can I help you today?", time: '09:00' },
  { id: 2, role: 'user', text: 'What is the current yield on Line 3?', time: '09:01' },
  {
    id: 3,
    role: 'agent',
    text: "Line 3 is currently running at 87.2% yield, which is below the 90% target. The drop started approximately 4 hours ago. I've identified a potential correlation with the CMP tool calibration drift on CMP-04. Would you like me to generate a detailed root cause analysis?",
    time: '09:01',
  },
  {
    id: 4,
    role: 'user',
    text: 'Yes, please generate the analysis and also check if any lots are affected.',
    time: '09:02',
  },
  {
    id: 5,
    role: 'agent',
    text: "I've initiated the root cause analysis. Here's what I found so far:\n\n1. CMP-04 removal rate variance increased by 12% since last calibration\n2. 3 lots currently in process may be affected: W-4821, W-4822, W-4825\n3. Lot W-4821 has already been flagged and placed on hold\n\nI recommend scheduling immediate calibration for CMP-04 and reviewing the other two lots at the next measurement step.",
    time: '09:03',
  },
]

export class AgentChatStore {
  title = 'AI Assistant'
  messages: ChatMessage[] = []
  input = ''
  onSendMessage?: (text: string) => void

  constructor(welcomeMessage?: string) {
    makeAutoObservable(this)
    if (welcomeMessage) {
      this.messages = [{ id: 1, role: 'agent', text: welcomeMessage, time: timestamp() }]
    } else {
      this.messages = sampleMessages
    }
  }

  get canSend(): boolean {
    return this.input.trim().length > 0
  }

  setTitle(title: string) {
    this.title = title
  }

  setInput(input: string) {
    this.input = input
  }

  setOnSendMessage(fn?: (text: string) => void) {
    this.onSendMessage = fn
  }

  sendMessage() {
    const text = this.input.trim()
    if (!text) return

    this.messages.push({ id: Date.now(), role: 'user', text, time: timestamp() })
    this.input = ''
    this.onSendMessage?.(text)

    // Simulate agent reply
    setTimeout(() => {
      runInAction(() => {
        this.messages.push({
          id: Date.now() + 1,
          role: 'agent',
          text: "Thanks for your message. I'm analyzing your production data — I'll have an answer shortly.",
          time: timestamp(),
        })
      })
    }, 800)
  }
}
