"use client"

import * as React from "react"
import { Bot, ChevronDown, SlidersHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const models = [
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI" },
  { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet", provider: "Anthropic" },
  { id: "gemini-1-5-pro", name: "Gemini 1.5 Pro", provider: "Google" },
  { id: "deepseek-v3", name: "DeepSeek V3", provider: "DeepSeek" },
]

export function Topbar() {
  const [selectedModel, setSelectedModel] = React.useState(models[0])

  return (
    <div className="h-14 border-b border-border/40 flex items-center justify-between px-4 bg-background/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <div className="md:hidden">
          {/* Mobile Menu Trigger Placeholder */}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="font-semibold text-lg gap-2 px-2 hover:bg-muted/50">
              {selectedModel.name}
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[240px]">
            {models.map((model) => (
              <DropdownMenuItem key={model.id} onClick={() => setSelectedModel(model)} className="flex items-center justify-between">
                <span>{model.name}</span>
                <Badge variant="secondary" className="text-[10px] h-5">{model.provider}</Badge>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <SlidersHorizontal className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
