export type ChatProvider = "openai" | "gemini" | "claude" | "deepseek"

export type ChatRole = "system" | "user" | "assistant"

export type ChatMessageInput = {
  role: ChatRole
  content: string
}

export type ChatRequest = {
  provider: ChatProvider
  model: string
  messages: ChatMessageInput[]
  temperature?: number
}
