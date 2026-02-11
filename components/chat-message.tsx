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
      initial={{ opacity: 0, x: isUser ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-start gap-4 group"
    >
      {/* Avatar */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-lg ${
          isUser
            ? "bg-gradient-to-br from-slate-700 to-slate-900 shadow-slate-500/30"
            : ""
        }`}
      >
        {isUser ? (
          <User className="h-5 w-5 text-white" />
        ) : (
          <AnimatedLogo size={40} />
        )}
      </motion.div>

      {/* Message Content */}
      <div className="flex-1 space-y-2">
        {isUser ? (
          <motion.div 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
            className="inline-block glass-strong rounded-2xl px-5 py-3 shadow-lg"
          >
            <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-white">
              {message.content}
            </p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-p:text-cyan-50/90 prose-headings:text-white prose-headings:tracking-tight prose-a:text-cyan-400 prose-code:text-cyan-400 prose-code:bg-cyan-500/10 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:glass prose-pre:border prose-pre:border-white/10"
          >
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p className="mb-4 last:mb-0 text-cyan-50/90 leading-relaxed">
                    {children}
                    {showCursor && (
                      <AnimatePresence>
                        <AliveCursor />
                      </AnimatePresence>
                    )}
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
            {/* Show cursor at the end if not inside a paragraph */}
            {showCursor && !message.content.includes('\n\n') && (
              <AnimatePresence>
                <AliveCursor />
              </AnimatePresence>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
