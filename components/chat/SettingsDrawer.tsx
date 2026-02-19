"use client"

import { ReactNode } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"

type SettingsDrawerProps = {
  temperature: number
  maxTokens: number
  onTemperatureChange: (value: number) => void
  onMaxTokensChange: (value: number) => void
  children: ReactNode
}

export default function SettingsDrawer({
  temperature,
  maxTokens,
  onTemperatureChange,
  onMaxTokensChange,
  children
}: SettingsDrawerProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>高级设置</SheetTitle>
          <SheetDescription>控制模型的生成策略与长度上限。</SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Temperature</p>
                <p className="text-xs text-foreground/50">控制输出的随机性</p>
              </div>
              <span className="text-sm text-foreground/70">{temperature.toFixed(2)}</span>
            </div>
            <input
              aria-label="Temperature"
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={temperature}
              onChange={(event) => onTemperatureChange(Number(event.target.value))}
              className="w-full accent-primary"
            />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">最大 Tokens</p>
                <p className="text-xs text-foreground/50">限制单次回复长度</p>
              </div>
            </div>
            <Input
              aria-label="最大 Tokens"
              type="number"
              min={256}
              max={8192}
              value={maxTokens}
              onChange={(event) => onMaxTokensChange(Number(event.target.value))}
            />
          </div>
          <div className="rounded-2xl border border-border/60 bg-card/50 p-4">
            <p className="text-sm font-medium text-foreground">提示</p>
            <p className="mt-2 text-xs text-foreground/50">
              这些设置仅影响前端预览，可按需对接你的后端参数。
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
