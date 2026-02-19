"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, MessageSquare, Search, Settings, Trash2, PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Conversation } from "@/lib/types/chat"
import { getConversations, createNewConversation, deleteConversation } from "@/lib/storage/local-storage"
import { useRouter, useParams } from "next/navigation"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [conversations, setConversations] = React.useState<Conversation[]>([])
  const router = useRouter()
  const params = useParams()
  const [isCollapsed, setIsCollapsed] = React.useState(false)

  React.useEffect(() => {
    setConversations(getConversations())
    
    // Listen for storage events to update list
    const handleStorage = () => setConversations(getConversations())
    window.addEventListener("storage", handleStorage)
    // Custom event for internal updates
    window.addEventListener("halltoo_update", handleStorage)
    
    return () => {
      window.removeEventListener("storage", handleStorage)
      window.removeEventListener("halltoo_update", handleStorage)
    }
  }, [])

  const handleNewChat = () => {
    const newChat = createNewConversation()
    // We don't save it immediately to storage to avoid empty chats cluttering
    // Instead we navigate to it, and the ChatPage will handle saving on first message
    // But for UI feedback, let's pretend
    router.push(`/app?id=${newChat.id}`)
  }

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    deleteConversation(id)
    setConversations(getConversations())
    if (params?.id === id) {
      router.push("/app")
    }
  }

  return (
    <div className={cn("flex flex-col h-full bg-muted/10 border-r border-border/40 transition-all duration-300", isCollapsed ? "w-[60px]" : "w-[260px]", className)}>
      <div className="p-4 flex items-center justify-between">
        {!isCollapsed && (
          <Button onClick={handleNewChat} className="flex-1 justify-start gap-2 bg-background border border-border/50 hover:bg-accent text-foreground shadow-sm">
            <Plus className="w-4 h-4" />
            New Chat
          </Button>
        )}
        <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="ml-2 shrink-0">
          {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </Button>
      </div>

      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1 py-2">
          {conversations.map((chat) => (
            <div
              key={chat.id}
              onClick={() => router.push(`/app?id=${chat.id}`)}
              className={cn(
                "group flex items-center gap-3 px-3 py-2 text-sm rounded-lg cursor-pointer transition-colors relative",
                params?.id === chat.id ? "bg-accent text-accent-foreground" : "hover:bg-muted/50 text-muted-foreground"
              )}
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              {!isCollapsed && (
                <>
                  <span className="truncate flex-1">{chat.title || "New Chat"}</span>
                  <div className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => handleDelete(e, chat.id)}>
                      <Trash2 className="w-3 h-3 text-muted-foreground hover:text-destructive" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border/40">
        <Button variant="ghost" className={cn("w-full justify-start gap-2", isCollapsed && "justify-center px-0")}>
          <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium text-primary">
            H
          </div>
          {!isCollapsed && <span className="text-sm font-medium">User Account</span>}
        </Button>
      </div>
    </div>
  )
}
