"use client"

import { KeyboardEvent } from "react"
import { Send, StopCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

type ChatComposerProps = {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  isSending: boolean
  onStop: () => void
}

export default function ChatComposer({
  value,
  onChange,
  onSend,
  isSending,
  onStop
}: ChatComposerProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      onSend()
    }
  }

  return (
    <div className="glass flex items-end gap-3 rounded-2xl p-4">
      <div className="flex-1">
        <Textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="输入消息，Shift + Enter 换行"
          rows={3}
          aria-label="消息输入框"
        />
        <p className="mt-2 text-xs text-foreground/40">
          Enter 发送，Shift + Enter 换行
        </p>
      </div>
      {isSending ? (
        <Button
          variant="secondary"
          size="icon"
          aria-label="停止生成"
          onClick={onStop}
        >
          <StopCircle className="h-5 w-5" />
        </Button>
      ) : (
        <Button
          size="icon"
          aria-label="发送消息"
          onClick={() => onSend()}
        >
          <Send className="h-5 w-5" />
        </Button>
      )}
    </div>
  )
}
