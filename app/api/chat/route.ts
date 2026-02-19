import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { anthropic } from '@ai-sdk/anthropic'
import { google } from '@ai-sdk/google'
import { rateLimit } from '@/lib/ratelimit'
import { headers } from 'next/headers'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const ip = headers().get('x-forwarded-for') || '127.0.0.1'
    const { success } = rateLimit(ip)
    
    if (!success) {
      return new Response('Rate limit exceeded', { status: 429 })
    }

    const { messages, model, provider, temperature, maxTokens } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response('Invalid messages format', { status: 400 })
    }

    // Input length check (simple character count)
    const totalChars = messages.reduce((acc: number, m: any) => acc + (m.content?.length || 0), 0)
    if (totalChars > 30000) {
      return new Response('Message context too long', { status: 400 })
    }

    let modelInstance

    switch (provider) {
      case 'openai':
        if (!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY is not configured')
        modelInstance = openai(model || 'gpt-4o')
        break
      case 'anthropic':
        if (!process.env.ANTHROPIC_API_KEY) throw new Error('ANTHROPIC_API_KEY is not configured')
        modelInstance = anthropic(model || 'claude-3-5-sonnet-20240620')
        break
      case 'google':
        if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) throw new Error('GOOGLE_GENERATIVE_AI_API_KEY is not configured')
        modelInstance = google(model || 'models/gemini-1.5-pro-latest')
        break
      case 'deepseek':
        if (!process.env.DEEPSEEK_API_KEY) throw new Error('DEEPSEEK_API_KEY is not configured')
        // DeepSeek is OpenAI compatible
        modelInstance = openai(model || 'deepseek-chat', {
          apiKey: process.env.DEEPSEEK_API_KEY,
          baseURL: 'https://api.deepseek.com/v1',
        })
        break
      default:
        return new Response('Invalid provider', { status: 400 })
    }

    const result = await streamText({
      model: modelInstance,
      messages: messages.map((m: any) => ({
        role: m.role,
        content: m.content
      })),
      temperature: temperature || 0.7,
      maxTokens: maxTokens || 4000,
    } as any)

    // Return raw text stream for simple client handling
    return new Response(result.textStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
      },
    })

  } catch (error: any) {
    console.error('Chat API Error:', error)
    return new Response(JSON.stringify({ error: error.message || 'An error occurred during generation.' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
