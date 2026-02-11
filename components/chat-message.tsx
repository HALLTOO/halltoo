"use client";

import { Message } from "ai/react";
import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { ThoughtProcess } from "./thought-process";
import { useMemo } from "react";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  // 解析思考过程和内容
  const { thought, content } = useMemo(() => {
    const thinkingRegex = /<thinking>([\s\S]*?)<\/thinking>/;
    const match = message.content.match(thinkingRegex);
    
    if (match) {
      return {
        thought: match[1].trim(),
        content: message.content.replace(thinkingRegex, "").trim(),
      };
    }
    
    return {
      thought: "",
      content: message.content,
    };
  }, [message.content]);

  return (
    <div
      className={cn(
        "flex w-full gap-3 px-4 py-6",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Bot className="h-5 w-5" />
        </div>
      )}
      
      <div className={cn("max-w-[80%]", !isUser && "space-y-2")}>
        {!isUser && thought && (
          <ThoughtProcess thought={thought} />
        )}
        
        <div
          className={cn(
            "rounded-2xl px-4 py-3",
            isUser
              ? "bg-black text-white"
              : "bg-gray-100 text-black"
          )}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap break-words">{content}</p>
          ) : (
            <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-pre:p-0">
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                  ul: ({ children }) => <ul className="mb-2 ml-4 list-disc">{children}</ul>,
                  ol: ({ children }) => <ol className="mb-2 ml-4 list-decimal">{children}</ol>,
                  li: ({ children }) => <li className="mb-1">{children}</li>,
                  code: ({ children, className }) => {
                    const isInline = !className;
                    return isInline ? (
                      <code className="rounded bg-gray-200 px-1 py-0.5 font-mono text-sm">
                        {children}
                      </code>
                    ) : (
                      <code className="block rounded bg-gray-200 p-2 font-mono text-sm overflow-x-auto">
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>

      {isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-white">
          <User className="h-5 w-5" />
        </div>
      )}
    </div>
  );
}
