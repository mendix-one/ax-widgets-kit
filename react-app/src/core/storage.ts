const STORAGE_PREFIX = 'aox_'

export const StorageKeys = {
  DISPLAY_MODE: `${STORAGE_PREFIX}display_mode`,
  LANGUAGE: `${STORAGE_PREFIX}language`,
  SIDEBAR_MODE: `${STORAGE_PREFIX}sidebar_mode`,
  AGENT_OPEN: `${STORAGE_PREFIX}agent_open`,
  AGENT_WIDTH: `${STORAGE_PREFIX}agent_width`,
  AGENT_CONVERSATIONS: `${STORAGE_PREFIX}agent_conversations`,
  AGENT_ACTIVE_ID: `${STORAGE_PREFIX}agent_active_id`,
  AGENT_SEARCH_MODE: `${STORAGE_PREFIX}agent_search_mode`,
  AGENT_SEARCH_QUERY: `${STORAGE_PREFIX}agent_search_query`,
  AUTH_USER: `${STORAGE_PREFIX}auth_user`,
} as const

export function loadSetting<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key)
    return value !== null ? (JSON.parse(value) as T) : fallback
  } catch {
    return fallback
  }
}

export function saveSetting<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // storage full or unavailable — silently ignore
  }
}
