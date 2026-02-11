"use client";

import { Message } from "ai/react";
import { User, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className="flex items-start gap-4 group">
      {/* Avatar */}
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-lg transition-transform group-hover:scale-110 ${
          isUser
            ? "bg-gradient-to-br from-slate-700 to-slate-900 shadow-slate-500/30"
            : "bg-gradient-to-br from-cyan-500 to-purple-600 shadow-purple-500/50 animate-breathe"
        }`}
      >
        {isUser ? (
          <User className="h-5 w-5 text-white" />
        ) : (
          <Sparkles className="h-5 w-5 text-white" />
        )}
      </div>

      {/* Message Content */}
      <div className="flex-1 space-y-2">
        {isUser ? (
          <div className="inline-block glass-strong rounded-2xl px-5 py-3 shadow-lg">
            <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-white">
              {message.content}
            </p>
          </div>
        ) : (
          <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-p:text-cyan-50/90 prose-headings:text-white prose-headings:tracking-tight prose-a:text-cyan-400 prose-code:text-cyan-400 prose-code:bg-cyan-500/10 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:glass prose-pre:border prose-pre:border-white/10">
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p className="mb-4 last:mb-0 text-cyan-50/90 leading-relaxed">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="mb-4 ml-6 list-disc space-y-2 text-cyan-50/80">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-4 ml-6 list-decimal space-y-2 text-cyan-50/80">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="text-cyan-50/80">{children}</li>
                ),
                code: ({ children, className }) => {
                  const isInline = !className;
                  return isInline ? (
                    <code className="rounded bg-cyan-500/10 px-2 py-1 font-mono text-xs text-cyan-400 border border-cyan-500/20">
                      {children}
                    </code>
                  ) : (
                    <code className="block glass rounded-xl border border-white/10 p-4 font-mono text-xs text-cyan-100 overflow-x-auto">
                      {children}
                    </code>
                  );
                },
                h1: ({ children }) => (
                  <h1 className="mb-4 text-2xl font-bold tracking-tight text-white text-glow">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="mb-3 text-xl font-semibold tracking-tight text-white">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="mb-2 text-lg font-semibold tracking-tight text-cyan-100">
                    {children}
                  </h3>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
