export interface Attachment {
  id: number
  name: string
  type: 'image' | 'file'
  url: string
}

export interface Message {
  id: number
  role: 'user' | 'agent'
  text: string
  time: string
  attachments?: Attachment[]
}

export interface Conversation {
  id: string
  title: string
  label: string
  messages: Message[]
  updatedAt: number
}

export interface ConvAssets {
  images: { name: string; url: string }[]
  files: { name: string; url: string }[]
  links: string[]
}
