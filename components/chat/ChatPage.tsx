"use client"

import { useEffect, useRef, useState } from "react"
import ChatComposer from "@/components/chat/ChatComposer"
import ChatHeader from "@/components/chat/ChatHeader"
import ChatMessages from "@/components/chat/ChatMessages"
import ChatSidebar from "@/components/chat/ChatSidebar"
import type { ChatMessage } from "@/components/chat/types"
import type { ChatProvider } from "@/lib/chat/types"

const initialMessages: ChatMessage[] = [
  {
    id: "m1",
    role: "assistant",
    content:
      "你好，我是 halltoo 的 AI 助手。你可以在这里体验高级玻璃拟态聊天界面。",
    createdAt: new Date().toISOString()
  },
  {
    id: "m2",
    role: "user",
    content: "帮我写一个带玻璃拟态风格的聊天 UI 设计。",
    createdAt: new Date().toISOString()
  }
]

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [autoScroll, setAutoScroll] = useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedModel, setSelectedModel] = useState("openai-gpt-4o")
  const [temperature, setTemperature] = useState(0.6)
  const [maxTokens, setMaxTokens] = useState(2048)
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const streamRef = useRef<number | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    const root = document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [theme])

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        window.clearInterval(streamRef.current)
        streamRef.current = null
      }
    }
  }, [])

  const createMessageId = () =>
    globalThis.crypto?.randomUUID?.() ?? `m-${Date.now()}`

  const stopStreaming = () => {
    abortRef.current?.abort()
    abortRef.current = null
    setIsSending(false)
    setMessages((prev) =>
      prev.map((msg) =>
        msg.isStreaming ? { ...msg, isStreaming: false } : msg
      )
    )
  }

  const handleSend = async (value?: string) => {
    const content = (value ?? input).trim()
    if (!content || isSending) return

    const nowLabel = new Date().toISOString()
    const userMessage: ChatMessage = {
      id: createMessageId(),
      role: "user",
      content,
      createdAt: nowLabel
    }

    const assistantId = createMessageId()
    const assistantMessage: ChatMessage = {
      id: assistantId,
      role: "assistant",
      content: "",
      createdAt: nowLabel,
      isStreaming: true
    }

    setMessages((prev) => [...prev, userMessage, assistantMessage])
    setInput("")
    setIsSending(true)

    const provider = resolveProvider(selectedModel)
    const model = stripProviderPrefix(selectedModel, provider)
    const history = messages
      .filter((msg) => !msg.isStreaming)
      .map((msg) => ({ role: msg.role, content: msg.content }))

    const controller = new AbortController()
    abortRef.current = controller

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          provider,
          model,
          messages: [...history, { role: "user", content }],
          temperature
        }),
        signal: controller.signal
      })

      if (!response.ok || !response.body) {
        const payload = await response.json().catch(() => null)
        const message =
          payload?.error ?? "请求失败，请稍后再试"
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId
              ? { ...msg, content: message, isStreaming: false }
              : msg
          )
        )
        setIsSending(false)
        return
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ""

      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        let boundary = buffer.indexOf("\n\n")
        while (boundary !== -1) {
          const chunk = buffer.slice(0, boundary)
          buffer = buffer.slice(boundary + 2)
          const lines = chunk.split("\n")
          for (const line of lines) {
            if (!line.startsWith("data:")) continue
            const data = line.replace(/^data:\s*/, "")
            if (!data || data === "[DONE]") continue
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantId
                  ? {
                      ...msg,
                      content: `${msg.content}${data}`,
                      isStreaming: true
                    }
                  : msg
              )
            )
          }
          boundary = buffer.indexOf("\n\n")
        }
      }
    } catch (error) {
      if ((error as DOMException).name !== "AbortError") {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId
              ? {
                  ...msg,
                  content: "连接中断，请稍后重试",
                  isStreaming: false
                }
              : msg
          )
        )
      }
    } finally {
      abortRef.current = null
      setIsSending(false)
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId ? { ...msg, isStreaming: false } : msg
        )
      )
    }
  }

  return (
    <div className="flex min-h-screen w-full items-stretch gap-6 px-6 py-6 lg:px-10">
      <ChatSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((prev) => !prev)}
        theme={theme}
        onThemeChange={setTheme}
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
      />
      <main className="flex flex-1 flex-col gap-4">
        <ChatHeader
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
          temperature={temperature}
          maxTokens={maxTokens}
          onTemperatureChange={setTemperature}
          onMaxTokensChange={setMaxTokens}
        />
        <ChatMessages
          messages={messages}
          autoScroll={autoScroll}
          onAutoScrollChange={setAutoScroll}
        />
        <ChatComposer
          value={input}
          onChange={setInput}
          onSend={handleSend}
          isSending={isSending}
          onStop={stopStreaming}
        />
      </main>
    </div>
  )
}

function resolveProvider(modelValue: string): ChatProvider {
  if (modelValue.startsWith("openai-")) return "openai"
  if (modelValue.startsWith("gemini-")) return "gemini"
  if (modelValue.startsWith("claude-")) return "claude"
  if (modelValue.startsWith("deepseek-")) return "deepseek"
  return "openai"
}

function stripProviderPrefix(modelValue: string, provider: ChatProvider) {
  const prefix = `${provider}-`
  return modelValue.startsWith(prefix)
    ? modelValue.slice(prefix.length)
    : modelValue
}
