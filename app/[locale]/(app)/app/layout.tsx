"use client"

import { ReactNode } from "react"
import { Sidebar } from "@/components/app-shell/Sidebar"
import { Topbar } from "@/components/app-shell/Topbar"
import { cn } from "@/lib/utils"

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar className="hidden md:flex border-r border-border/40" />
      <div className="flex flex-1 flex-col h-full relative">
        <Topbar />
        <main className="flex-1 overflow-hidden relative">
          {children}
        </main>
      </div>
    </div>
  )
}
