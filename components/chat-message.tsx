"use client";

import { Message } from "ai/react";
import { User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import { AliveCursor } from "./alive-cursor";
import { AnimatedLogo } from "./animated-logo";

interface ChatMessageProps {
  message: Message;
  isStreaming?: boolean;
}

export function ChatMessage({ message, isStreaming = false }: ChatMessageProps) {
  const isUser = message.role === "user";
  const showCursor = !isUser && isStreaming;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-start gap-3 group"
    >
      {/* Avatar */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400 }}
        className="flex h-8 w-8 shrink-0 items-center justify-center"
      >
        {isUser ? (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
            <User className="h-4 w-4 text-gray-600" />
          </div>
        ) : (
          <AnimatedLogo size={32} />
        )}
      </motion.div>

      {/* Message Content */}
      <div className="flex-1 space-y-1 min-w-0">
        {isUser ? (
          <div className="inline-block rounded-2xl bg-black px-4 py-2.5 shadow-sm">
            <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-white">
              {message.content}
            </p>
          </div>
        ) : (
          <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-p:text-gray-700 prose-headings:text-gray-900 prose-headings:font-semibold prose-a:text-black prose-a:underline prose-code:text-gray-900 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-pre:bg-gray-100 prose-pre:border prose-pre:border-gray-200 prose-pre:rounded-xl">
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p className="mb-3 last:mb-0 text-gray-700 leading-relaxed">
                    {children}
                    {showCursor && (
                      <AnimatePresence>
                        <AliveCursor />
                      </AnimatePresence>
                    )}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="mb-3 ml-5 list-disc space-y-1 text-gray-700">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-3 ml-5 list-decimal space-y-1 text-gray-700">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="text-gray-700">{children}</li>
                ),
                code: ({ children, className }) => {
                  const isInline = !className;
                  return isInline ? (
                    <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-xs text-gray-900 border border-gray-200">
                      {children}
                    </code>
                  ) : (
                    <code className="block bg-gray-100 rounded-xl border border-gray-200 p-4 font-mono text-xs text-gray-900 overflow-x-auto">
                      {children}
                    </code>
                  );
                },
                h1: ({ children }) => (
                  <h1 className="mb-3 text-xl font-semibold text-gray-900">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="mb-2 text-lg font-semibold text-gray-900">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="mb-2 text-base font-semibold text-gray-900">
                    {children}
                  </h3>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
            {showCursor && !message.content.includes('\n\n') && (
              <AnimatePresence>
                <AliveCursor />
              </AnimatePresence>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
