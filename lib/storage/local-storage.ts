import { Conversation, Message } from "@/lib/types/chat"
import { v4 as uuidv4 } from "uuid"

const STORAGE_KEY = "halltoo_conversations"

export const getConversations = (): Conversation[] => {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

export const saveConversation = (conversation: Conversation) => {
  const conversations = getConversations()
  const index = conversations.findIndex((c) => c.id === conversation.id)
  
  if (index > -1) {
    conversations[index] = conversation
  } else {
    conversations.unshift(conversation)
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations))
}

export const deleteConversation = (id: string) => {
  const conversations = getConversations().filter((c) => c.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations))
}

export const createNewConversation = (): Conversation => {
  return {
    id: uuidv4(),
    title: "New Chat",
    messages: [],
    updatedAt: Date.now(),
    model: "gpt-4o"
  }
}
