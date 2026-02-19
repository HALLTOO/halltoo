"use client"

import { Suspense } from "react"
import ChatPageContent from "@/components/chat/ChatPageContent"

export default function ChatPage() {
  return (
    <Suspense fallback={
      <div className="flex h-full items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-secondary animate-pulse" />
      </div>
    }>
      <ChatPageContent />
    </Suspense>
  )
}
