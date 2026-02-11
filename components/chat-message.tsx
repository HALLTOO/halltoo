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
    <div className="flex items-start gap-4">
      {/* Avatar */}
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-lg ${
          isUser
            ? "bg-gradient-to-br from-gray-900 to-black"
            : "bg-gradient-to-br from-purple-500 to-pink-500"
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
          <div className="inline-block rounded-2xl bg-gradient-to-br from-gray-900 to-black px-5 py-3 shadow-float">
            <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-white">
              {message.content}
            </p>
          </div>
        ) : (
          <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-p:text-gray-700 prose-headings:text-gray-900 prose-headings:tracking-tight prose-a:text-purple-600 prose-code:text-purple-600 prose-code:bg-purple-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200">
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p className="mb-4 last:mb-0 text-gray-700 leading-relaxed">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="mb-4 ml-6 list-disc space-y-2">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-4 ml-6 list-decimal space-y-2">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="text-gray-700">{children}</li>
                ),
                code: ({ children, className }) => {
                  const isInline = !className;
                  return isInline ? (
                    <code className="rounded bg-purple-50 px-1.5 py-0.5 font-mono text-xs text-purple-600">
                      {children}
                    </code>
                  ) : (
                    <code className="block rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-xs text-gray-800 overflow-x-auto">
                      {children}
                    </code>
                  );
                },
                h1: ({ children }) => (
                  <h1 className="mb-4 text-2xl font-bold tracking-tight text-gray-900">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="mb-3 text-xl font-semibold tracking-tight text-gray-900">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="mb-2 text-lg font-semibold tracking-tight text-gray-900">
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
