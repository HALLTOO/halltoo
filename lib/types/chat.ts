export type Role = 'user' | 'assistant' | 'system'

export interface Message {
  id: string
  role: Role
  content: string
  createdAt: number
}

export interface Conversation {
  id: string
  title: string
  messages: Message[]
  updatedAt: number
  model: string
}

export interface ModelOption {
  id: string
  name: string
  provider: 'OpenAI' | 'Anthropic' | 'Google' | 'DeepSeek'
  icon: string
}
