"use client"

import { SlidersHorizontal } from "lucide-react"
import ModelSelect from "@/components/chat/ModelSelect"
import SettingsDrawer from "@/components/chat/SettingsDrawer"
import { Button } from "@/components/ui/button"

type ChatHeaderProps = {
  selectedModel: string
  onModelChange: (value: string) => void
  temperature: number
  maxTokens: number
  onTemperatureChange: (value: number) => void
  onMaxTokensChange: (value: number) => void
}

export default function ChatHeader({
  selectedModel,
  onModelChange,
  temperature,
  maxTokens,
  onTemperatureChange,
  onMaxTokensChange
}: ChatHeaderProps) {
  return (
    <header className="glass flex items-center justify-between rounded-2xl px-5 py-4">
      <div className="flex items-center gap-3">
        <div>
          <p className="text-sm text-foreground/60">当前模型</p>
          <div className="mt-1 w-[260px]">
            <ModelSelect value={selectedModel} onValueChange={onModelChange} />
          </div>
        </div>
      </div>
      <SettingsDrawer
        temperature={temperature}
        maxTokens={maxTokens}
        onTemperatureChange={onTemperatureChange}
        onMaxTokensChange={onMaxTokensChange}
      >
        <Button variant="secondary" className="gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          高级设置
        </Button>
      </SettingsDrawer>
    </header>
  )
}
