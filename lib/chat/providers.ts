import type { ChatMessageInput, ChatProvider } from "@/lib/chat/types"

type ProviderParams = {
  provider: ChatProvider
  model: string
  messages: ChatMessageInput[]
  temperature: number
  signal?: AbortSignal
}

const encoder = new TextEncoder()

export async function createProviderStream(params: ProviderParams) {
  switch (params.provider) {
    case "openai":
      return streamOpenAI(params)
    case "gemini":
      return streamGemini(params)
    case "claude":
      return streamClaude(params)
    case "deepseek":
      return streamDeepSeek(params)
    default:
      throw new Error("Unsupported provider")
  }
}

export function createSseStream(iterator: AsyncGenerator<string>) {
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of iterator) {
          controller.enqueue(encoder.encode(`data: ${chunk}\n\n`))
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"))
        controller.close()
      } catch {
        controller.error()
      }
    }
  })
}

async function* streamOpenAI({
  model,
  messages,
  temperature,
  signal
}: ProviderParams) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) throw new Error("Missing OPENAI_API_KEY")
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      messages,
      temperature,
      stream: true
    }),
    signal
  })
  if (!response.ok || !response.body) {
    throw new Error("OpenAI request failed")
  }
  yield* streamSseJson(response, (payload) => {
    const content = payload?.choices?.[0]?.delta?.content
    return typeof content === "string" ? content : ""
  })
}

async function* streamDeepSeek({
  model,
  messages,
  temperature,
  signal
}: ProviderParams) {
  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) throw new Error("Missing DEEPSEEK_API_KEY")
  const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      messages,
      temperature,
      stream: true
    }),
    signal
  })
  if (!response.ok || !response.body) {
    throw new Error("DeepSeek request failed")
  }
  yield* streamSseJson(response, (payload) => {
    const content = payload?.choices?.[0]?.delta?.content
    return typeof content === "string" ? content : ""
  })
}

async function* streamClaude({
  model,
  messages,
  temperature,
  signal
}: ProviderParams) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error("Missing ANTHROPIC_API_KEY")
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      messages: messages.map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content
      })),
      max_tokens: 1024,
      temperature,
      stream: true
    }),
    signal
  })
  if (!response.ok || !response.body) {
    throw new Error("Claude request failed")
  }
  yield* streamSseJson(response, (payload) => {
    if (payload?.type === "content_block_delta") {
      const text = payload?.delta?.text
      return typeof text === "string" ? text : ""
    }
    return ""
  })
}

async function* streamGemini({
  model,
  messages,
  temperature,
  signal
}: ProviderParams) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) throw new Error("Missing GEMINI_API_KEY")
  const contents = normalizeGeminiMessages(messages)
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature
        }
      }),
      signal
    }
  )
  if (!response.ok || !response.body) {
    throw new Error("Gemini request failed")
  }
  yield* streamSseJson(response, (payload) => {
    const parts = payload?.candidates?.[0]?.content?.parts ?? []
    const text = parts.map((part: { text?: string }) => part.text ?? "").join("")
    return text
  })
}

function normalizeGeminiMessages(messages: ChatMessageInput[]) {
  const contents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = []
  let systemBuffer = ""
  for (const message of messages) {
    if (message.role === "system") {
      systemBuffer += `${message.content}\n`
      continue
    }
    const role = message.role === "assistant" ? "model" : "user"
    const text = systemBuffer ? `${systemBuffer}${message.content}` : message.content
    systemBuffer = ""
    contents.push({ role, parts: [{ text }] })
  }
  if (systemBuffer) {
    contents.unshift({ role: "user", parts: [{ text: systemBuffer }] })
  }
  return contents
}

async function* streamSseJson(
  response: Response,
  pick: (payload: any) => string
) {
  const reader = response.body!.getReader()
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
        const trimmed = line.trim()
        if (!trimmed.startsWith("data:")) continue
        const data = trimmed.replace(/^data:\s*/, "")
        if (!data || data === "[DONE]") continue
        try {
          const payload = JSON.parse(data)
          const text = pick(payload)
          if (text) yield text
        } catch {
          continue
        }
      }
      boundary = buffer.indexOf("\n\n")
    }
  }
}
