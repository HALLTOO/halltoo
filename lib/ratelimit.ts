// Simple in-memory rate limiter for demo purposes
// In production, use Redis (e.g., Upstash)

type RateLimitStore = Map<string, { count: number; reset: number }>

const store: RateLimitStore = new Map()

const WINDOW_SIZE = 60 * 1000 // 1 minute
const MAX_REQUESTS = 10 // 10 requests per minute per IP

export function rateLimit(ip: string) {
  const now = Date.now()
  const record = store.get(ip)

  if (!record) {
    store.set(ip, { count: 1, reset: now + WINDOW_SIZE })
    return { success: true }
  }

  if (now > record.reset) {
    store.set(ip, { count: 1, reset: now + WINDOW_SIZE })
    return { success: true }
  }

  if (record.count >= MAX_REQUESTS) {
    return { success: false, reset: record.reset }
  }

  record.count++
  return { success: true }
}
