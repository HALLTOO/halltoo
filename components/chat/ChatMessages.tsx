"use client"

import { useEffect, useRef } from "react"
import { MessageBubble } from "@/components/chat/MessageBubble"
import type { ChatMessage } from "@/components/chat/types"

type ChatMessagesProps = {
  messages: ChatMessage[]
  autoScroll: boolean
  onAutoScrollChange: (value: boolean) => void
}

export default function ChatMessages({
  messages,
  autoScroll,
  onAutoScrollChange
}: ChatMessagesProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const endRef = useRef<HTMLDivElement | null>(null)
  const userTouchedRef = useRef(false)

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    const handleScroll = () => {
      const bottomGap =
        viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight
      const isNearBottom = bottomGap < 20
      if (!isNearBottom) {
        userTouchedRef.current = true
        if (autoScroll) onAutoScrollChange(false)
      } else {
        if (!autoScroll && userTouchedRef.current) {
          onAutoScrollChange(true)
          userTouchedRef.current = false
        }
      }
    }
    viewport.addEventListener("scroll", handleScroll)
    return () => viewport.removeEventListener("scroll", handleScroll)
  }, [autoScroll, onAutoScrollChange])

  useEffect(() => {
    if (!autoScroll) return
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [messages, autoScroll])

  return (
    <div className="glass relative flex h-[66vh] flex-col rounded-2xl">
      <div
        ref={viewportRef}
        className="h-full overflow-y-auto px-6 py-6"
        role="log"
        aria-live="polite"
        aria-relevant="additions text"
      >
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          {messages.map((m) => (
            <MessageBubble key={m.id} message={m} />
          ))}
          <div ref={endRef} aria-hidden />
        </div>
      </div>
      {!autoScroll && (
        <button
          type="button"
          onClick={() => {
            onAutoScrollChange(true)
            endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
          }}
          aria-label="回到底部"
          className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-border/60 bg-card/80 px-4 py-2 text-xs text-foreground shadow-soft transition hover:bg-card focus:outline-none focus:ring-2 focus:ring-primary/60"
        >
          回到底部
        </button>
      )}
    </div>
  )
}
