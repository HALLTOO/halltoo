"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, StopCircle, RefreshCw, Paperclip, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useChat } from "@/lib/hooks/use-chat"
import { MessageBubble } from "@/components/chat/MessageBubble"
import { EmptyState } from "@/components/chat/EmptyState"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

export default function ChatPageContent() {
  const { messages, isLoading, input, setInput, handleSend, stop } = useChat()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true)
  const { ref: bottomRef, inView: bottomInView } = useInView()

  useEffect(() => {
    if (bottomInView) {
      setShouldAutoScroll(true)
    } else {
      setShouldAutoScroll(false)
    }
  }, [bottomInView])

  useEffect(() => {
    if (shouldAutoScroll && scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages, shouldAutoScroll])

  const scrollToBottom = () => {
    const scrollContainer = scrollRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: scrollContainer.scrollHeight, behavior: 'smooth' })
    }
  }

  return (
    <div className="flex flex-col h-full relative">
      <ScrollArea className="flex-1 px-4 md:px-8 py-6" ref={scrollRef}>
        <div className="max-w-3xl mx-auto space-y-6 pb-32">
          {messages.length === 0 ? (
            <EmptyState onSelectPrompt={(prompt) => setInput(prompt)} />
          ) : (
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
            </AnimatePresence>
          )}
          {isLoading && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-secondary animate-pulse" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-3/4 bg-muted/30 rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-muted/30 rounded animate-pulse" />
              </div>
            </div>
          )}
          <div ref={bottomRef} className="h-1 w-full" />
        </div>
      </ScrollArea>

      {/* Jump to bottom button */}
      {!shouldAutoScroll && messages.length > 0 && (
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-30">
          <Button 
            size="sm" 
            variant="secondary" 
            className="rounded-full shadow-lg gap-2 border border-border/50 bg-background/80 backdrop-blur-md hover:bg-background"
            onClick={scrollToBottom}
          >
            <ArrowDown className="w-4 h-4" />
            Jump to latest
          </Button>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent pt-12 z-20">
        <div className="max-w-3xl mx-auto relative bg-secondary/10 rounded-2xl border border-border/40 backdrop-blur-xl shadow-lg ring-1 ring-white/5 focus-within:ring-primary/50 transition-all duration-300">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            placeholder="Send a message..."
            className="min-h-[56px] max-h-[200px] bg-transparent border-0 resize-none py-4 pr-12 text-base focus-visible:ring-0 placeholder:text-muted-foreground/50"
            rows={1}
          />
          <div className="absolute right-2 bottom-2 flex gap-2">
            <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground">
              <Paperclip className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              onClick={isLoading ? stop : handleSend}
              disabled={!input.trim() && !isLoading}
              className={cn(
                "h-8 w-8 rounded-lg transition-all duration-200",
                isLoading ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : "bg-primary text-primary-foreground hover:bg-primary/90",
                !input.trim() && !isLoading && "opacity-50 cursor-not-allowed"
              )}
            >
              {isLoading ? <StopCircle className="w-4 h-4" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        <div className="text-center text-xs text-muted-foreground mt-2">
          AI can make mistakes. Please verify important information.
        </div>
      </div>
    </div>
  )
}
