"use client"

import { ChevronLeft, ChevronRight, Plus, Settings, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import ModelSelect from "@/components/chat/ModelSelect"

const sessions = [
  { id: "s1", title: "品牌升级 & 视觉策略" },
  { id: "s2", title: "AI 产品命名头脑风暴" },
  { id: "s3", title: "Landing Page 文案优化" },
  { id: "s4", title: "系统提示词模板" }
]

type SidebarProps = {
  collapsed: boolean
  onToggle: () => void
  theme: "dark" | "light"
  onThemeChange: (value: "dark" | "light") => void
  selectedModel: string
  onModelChange: (value: string) => void
}

export default function ChatSidebar({
  collapsed,
  onToggle,
  theme,
  onThemeChange,
  selectedModel,
  onModelChange
}: SidebarProps) {
  return (
    <aside
      className={`glass relative flex h-[calc(100vh-48px)] flex-col rounded-2xl p-4 transition-all duration-300 ${
        collapsed ? "w-[88px]" : "w-[280px]"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-foreground">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-foreground/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          {!collapsed && (
            <div className="leading-tight">
              <p className="text-sm font-semibold">halltoo</p>
              <p className="text-xs text-foreground/50">Public AI Chat</p>
            </div>
          )}
        </div>
        <Button
          size="icon"
          variant="ghost"
          aria-label="切换侧边栏"
          onClick={onToggle}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <Button
        className="mt-4 w-full justify-start gap-2"
        aria-label="新建会话"
      >
        <Plus className="h-4 w-4" />
        {!collapsed && "新建会话"}
      </Button>

      <div className="mt-4 space-y-3">
        {!collapsed && (
          <>
            <div className="text-xs text-foreground/50">模型选择</div>
            <ModelSelect value={selectedModel} onValueChange={onModelChange} />
          </>
        )}
      </div>

      <Separator className="my-4" />

      <div className="flex-1">
        <div className="mb-2 text-xs text-foreground/50">{collapsed ? "会话" : "会话列表"}</div>
        <ScrollArea className="h-[52vh] pr-2">
          <div className="space-y-2">
            {sessions.map((session) => (
              <button
                key={session.id}
                className="flex w-full items-center gap-3 rounded-2xl border border-border/60 bg-card/50 px-3 py-3 text-left text-sm text-foreground/80 transition hover:bg-card/70 focus:outline-none focus:ring-2 focus:ring-primary/60"
              >
                <div className="h-8 w-8 rounded-xl bg-foreground/10" />
                {!collapsed && (
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{session.title}</p>
                    <p className="text-xs text-foreground/40">刚刚</p>
                  </div>
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      <Separator className="my-4" />

      <div className="flex items-center justify-between gap-2">
        {!collapsed && (
          <div className="flex items-center gap-2 text-sm text-foreground/70">
            <Settings className="h-4 w-4" />
            设置
          </div>
        )}
        <div className="flex items-center gap-2">
          {!collapsed && <span className="text-xs text-foreground/50">暗色</span>}
          <Switch
            aria-label="切换主题"
            checked={theme === "dark"}
            onCheckedChange={(checked) => onThemeChange(checked ? "dark" : "light")}
          />
        </div>
      </div>
    </aside>
  )
}
