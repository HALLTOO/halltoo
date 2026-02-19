import { Bot } from "lucide-react"

interface EmptyStateProps {
  onSelectPrompt: (prompt: string) => void
}

export function EmptyState({ onSelectPrompt }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-20">
      <div className="w-16 h-16 rounded-full bg-secondary/30 flex items-center justify-center mb-4">
        <Bot className="w-8 h-8 text-primary" />
      </div>
      <h2 className="text-2xl font-semibold">How can I help you today?</h2>
      <p className="text-muted-foreground max-w-sm">
        I&apos;m halltoo, your AI assistant. I can help you write code, draft emails, or brainstorm ideas.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-2xl mt-8">
        {[
          "Explain quantum computing in simple terms",
          "Write a Python script to scrape a website",
          "Draft a professional email to a client",
          "Create a workout plan for beginners"
        ].map((prompt, i) => (
          <button
            key={i}
            onClick={() => onSelectPrompt(prompt)}
            className="p-3 text-sm text-left border border-border/40 rounded-xl hover:bg-secondary/20 transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  )
}
