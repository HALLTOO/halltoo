"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

const modelGroups = [
  {
    label: "OpenAI",
    models: [
      { value: "openai-gpt-4o", label: "GPT-4o" },
      { value: "openai-gpt-4o-mini", label: "GPT-4o mini" }
    ]
  },
  {
    label: "Gemini",
    models: [
      { value: "gemini-1.5-pro", label: "Gemini 1.5 Pro" },
      { value: "gemini-1.5-flash", label: "Gemini 1.5 Flash" }
    ]
  },
  {
    label: "Claude",
    models: [
      { value: "claude-3.5-sonnet", label: "Claude 3.5 Sonnet" },
      { value: "claude-3-opus", label: "Claude 3 Opus" }
    ]
  },
  {
    label: "DeepSeek",
    models: [
      { value: "deepseek-r1", label: "DeepSeek R1" },
      { value: "deepseek-v3", label: "DeepSeek V3" }
    ]
  }
]

type ModelSelectProps = {
  value: string
  onValueChange: (value: string) => void
}

export default function ModelSelect({ value, onValueChange }: ModelSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger aria-label="模型选择">
        <SelectValue placeholder="选择模型" />
      </SelectTrigger>
      <SelectContent>
        {modelGroups.map((group, index) => (
          <div key={group.label}>
            <SelectGroup>
              <SelectLabel>{group.label}</SelectLabel>
              {group.models.map((model) => (
                <SelectItem key={model.value} value={model.value}>
                  {model.label}
                </SelectItem>
              ))}
            </SelectGroup>
            {index < modelGroups.length - 1 && <SelectSeparator />}
          </div>
        ))}
      </SelectContent>
    </Select>
  )
}
