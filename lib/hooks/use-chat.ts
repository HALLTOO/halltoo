import { useState, useRef, useEffect } from "react"
import { Message, Conversation } from "@/lib/types/chat"
import { getConversations, saveConversation, createNewConversation } from "@/lib/storage/local-storage"
import { v4 as uuidv4 } from "uuid"
import { useSearchParams, useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const abortControllerRef = useRef<AbortController | null>(null)
  
  const searchParams = useSearchParams()
  const router = useRouter()
  const chatId = searchParams.get("id")
  const { toast } = useToast()

  // Load chat on mount or id change
  useEffect(() => {
    if (chatId) {
      const conversations = getConversations()
      const chat = conversations.find(c => c.id === chatId)
      if (chat) {
        setMessages(chat.messages)
      } else {
        setMessages([])
      }
    } else {
      setMessages([])
    }
  }, [chatId])

  const handleSend = async (turnstileToken?: string) => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content: input,
      createdAt: Date.now()
    }

    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput("")
    setIsLoading(true)

    // Optimistic UI: Insert empty assistant message
    const assistantMessage: Message = {
      id: uuidv4(),
      role: "assistant",
      content: "",
      createdAt: Date.now()
    }
    setMessages(prev => [...prev, assistantMessage])

    // Save conversation state immediately (User message + Empty assistant)
    let currentChatId = chatId
    if (!currentChatId) {
      const newChat = createNewConversation()
      currentChatId = newChat.id
      newChat.messages = [...newMessages, assistantMessage]
      newChat.title = input.slice(0, 30) + (input.length > 30 ? "..." : "")
      saveConversation(newChat)
      
      window.dispatchEvent(new Event("halltoo_update"))
      router.push(`/app?id=${currentChatId}`, { scroll: false })
    } else {
      const conversations = getConversations()
      const chat = conversations.find(c => c.id === currentChatId)
      if (chat) {
        chat.messages = [...newMessages, assistantMessage]
        chat.updatedAt = Date.now()
        saveConversation(chat)
        window.dispatchEvent(new Event("halltoo_update"))
      }
    }

    // Stream response
    abortControllerRef.current = new AbortController()
    let accumulatedContent = ""
    
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          model: "gpt-4o", // Default for now, should come from context
          provider: "openai", // Default
          temperature: 0.7,
          maxTokens: 4000,
          turnstileToken
        }),
        signal: abortControllerRef.current.signal
      })

      if (!response.ok) {
        let errorMessage = response.statusText
        let errorCode = ""
        try {
          const errorJson = await response.json()
          errorMessage = errorJson.error || errorMessage
          errorCode = errorJson.code
        } catch (e) {
           // ignore json parse error
        }
        const err = new Error(errorMessage) as any
        err.code = errorCode
        throw err
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error("No reader available")

      const decoder = new TextDecoder()
      
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        accumulatedContent += chunk
        
        // Update UI
        setMessages(prev => {
          const updated = [...prev]
          const lastMsg = updated[updated.length - 1]
          if (lastMsg.role === "assistant") {
            updated[updated.length - 1] = { 
              ...lastMsg, 
              content: accumulatedContent 
            }
          }
          return updated
        })
      }

      // Save final state
      const conversations = getConversations()
      const chat = conversations.find(c => c.id === currentChatId)
      if (chat) {
        // Find the assistant message we just updated and save it
        const msgs = [...chat.messages]
        const lastMsgIndex = msgs.findIndex(m => m.id === assistantMessage.id)
        if (lastMsgIndex !== -1) {
           msgs[lastMsgIndex].content = accumulatedContent
           chat.messages = msgs
           chat.updatedAt = Date.now()
           saveConversation(chat)
           window.dispatchEvent(new Event("halltoo_update"))
        }
      }

    } catch (error: any) {
      if (error.name === "AbortError") {
        console.log("Generation stopped by user")
        // Save what we have so far
        const conversations = getConversations()
        const chat = conversations.find(c => c.id === currentChatId)
        if (chat) {
             const msgs = [...chat.messages]
             const lastMsgIndex = msgs.findIndex(m => m.id === assistantMessage.id)
             if (lastMsgIndex !== -1) {
                msgs[lastMsgIndex].content = accumulatedContent
                chat.messages = msgs
                chat.updatedAt = Date.now()
                saveConversation(chat)
                window.dispatchEvent(new Event("halltoo_update"))
             }
        }
      } else {
        console.error(error)
        toast({
          title: error.code === "timeout-or-duplicate" ? "Verification Expired" : "Error generating response",
          description: error.message || "Please try again later.",
          variant: "destructive",
        })
      }
    } finally {
      setIsLoading(false)
      abortControllerRef.current = null
    }
  }

  const stop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
      setIsLoading(false)
    }
  }

  return {
    messages,
    isLoading,
    input,
    setInput,
    handleSend,
    stop
  }
}
