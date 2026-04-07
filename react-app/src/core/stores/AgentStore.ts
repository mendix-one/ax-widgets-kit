import i18next from 'i18next'
import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import {
  type Attachment,
  type ConvAssets,
  type Conversation,
  type Message,
} from '../../agent/types'
import { StorageKeys, loadSetting, saveSetting } from '../storage'

const timestamp = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

function createId() {
  return `conv_${Date.now()}`
}

const DEFAULT_LABELS = ['production', 'quality', 'yield', 'maintenance', 'defects', 'planning']
const URL_REGEX = /https?:\/\/[^\s]+/g

export class AgentStore {
  conversations: Conversation[] = []
  activeId: string | null = null
  searchMode = false
  searchQuery = ''

  constructor() {
    makeAutoObservable(this)

    // Load persisted values
    const saved = loadSetting<Conversation[] | null>(StorageKeys.AGENT_CONVERSATIONS, null)
    if (saved && saved.length > 0) {
      this.conversations = saved
    } else {
      this.conversations = [
        {
          id: 'conv_default',
          title: i18next.t('agent.defaultConvTitle'),
          label: 'production',
          messages: [{ id: 1, role: 'agent', text: i18next.t('agent.welcome'), time: timestamp() }],
          updatedAt: Date.now(),
        },
      ]
    }
    this.activeId = loadSetting(StorageKeys.AGENT_ACTIVE_ID, 'conv_default')
    this.searchMode = loadSetting(StorageKeys.AGENT_SEARCH_MODE, false)
    this.searchQuery = loadSetting(StorageKeys.AGENT_SEARCH_QUERY, '')

    // Auto-persist to localStorage
    reaction(
      () => this.activeId,
      (id) => saveSetting(StorageKeys.AGENT_ACTIVE_ID, id),
    )
    reaction(
      () => this.searchMode,
      (mode) => saveSetting(StorageKeys.AGENT_SEARCH_MODE, mode),
    )
    reaction(
      () => this.searchQuery,
      (query) => saveSetting(StorageKeys.AGENT_SEARCH_QUERY, query),
    )
    reaction(
      () => toJS(this.conversations),
      (convs) => saveSetting(StorageKeys.AGENT_CONVERSATIONS, convs),
      { delay: 300 },
    )
  }

  get activeConversation(): Conversation | null {
    return this.conversations.find((c) => c.id === this.activeId) ?? null
  }

  get allLabels(): string[] {
    return [...new Set(this.conversations.map((c) => c.label).filter(Boolean))]
  }

  get convAssets(): ConvAssets {
    const conv = this.activeConversation
    if (!conv) return { images: [], files: [], links: [] }
    const images: { name: string; url: string }[] = []
    const files: { name: string; url: string }[] = []
    const links: string[] = []
    for (const msg of conv.messages) {
      if (msg.attachments) {
        for (const att of msg.attachments) {
          if (att.type === 'image') images.push({ name: att.name, url: att.url })
          else files.push({ name: att.name, url: att.url })
        }
      }
      const found = msg.text.match(URL_REGEX)
      if (found) links.push(...found)
    }
    return { images, files, links }
  }

  get filteredConversations(): Conversation[] {
    if (!this.searchQuery.trim()) return this.conversations
    const q = this.searchQuery.toLowerCase()
    return this.conversations.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.label.toLowerCase().includes(q) ||
        c.messages.some((m) => m.text.toLowerCase().includes(q)),
    )
  }

  setActiveId(id: string | null) {
    this.activeId = id
  }

  setSearchQuery(query: string) {
    this.searchQuery = query
  }

  enterSearch() {
    this.searchMode = true
    this.searchQuery = ''
  }

  exitSearch() {
    this.searchMode = false
    this.searchQuery = ''
  }

  createConversation() {
    const id = createId()
    const conv: Conversation = {
      id,
      title: `${i18next.t('agent.newConversation')} #${this.conversations.length + 1}`,
      label: DEFAULT_LABELS[this.conversations.length % DEFAULT_LABELS.length],
      messages: [{ id: 1, role: 'agent', text: i18next.t('agent.welcome'), time: timestamp() }],
      updatedAt: Date.now(),
    }
    this.conversations.unshift(conv)
    this.activeId = id
    this.searchMode = false
    this.searchQuery = ''
  }

  deleteConversation(id: string) {
    const idx = this.conversations.findIndex((c) => c.id === id)
    if (idx !== -1) this.conversations.splice(idx, 1)
    if (this.activeId === id) this.activeId = null
  }

  /** Returns true if handled internally (went back to list), false if panel should close */
  handleClose(): boolean {
    if (this.activeConversation) {
      this.activeId = null
      this.exitSearch()
      return true
    }
    return false
  }

  sendMessage(conversationId: string, text: string, attachments: Attachment[]) {
    const conv = this.conversations.find((c) => c.id === conversationId)
    if (!conv) return

    const userMsg: Message = {
      id: Date.now(),
      role: 'user',
      text,
      time: timestamp(),
      attachments: attachments.length > 0 ? attachments : undefined,
    }

    if (conv.messages.length <= 1) {
      conv.title = (text || attachments[0]?.name || '').slice(0, 40)
    }
    conv.messages.push(userMsg)
    conv.updatedAt = Date.now()

    setTimeout(() => {
      runInAction(() => {
        const c = this.conversations.find((c) => c.id === conversationId)
        if (!c) return
        c.messages.push({
          id: Date.now() + 1,
          role: 'agent',
          text: i18next.t('agent.defaultReply'),
          time: timestamp(),
        })
        c.updatedAt = Date.now()
      })
    }, 800)
  }
}
