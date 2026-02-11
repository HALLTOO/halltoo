"use client";

import { Message } from "ai/react";
import { User, Copy, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import { AliveCursor } from "./alive-cursor";
import { AnimatedLogo } from "./animated-logo";
import { useState } from "react";

interface ChatMessageProps {
  message: Message;
  isStreaming?: boolean;
}

export function ChatMessage({ message, isStreaming = false }: ChatMessageProps) {
  const isUser = message.role === "user";
  const showCursor = !isUser && isStreaming;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`w-full border-b border-gray-100 ${
        isUser ? 'bg-white' : 'bg-gray-50'
      }`}
    >
      <div className="mx-auto flex max-w-3xl items-start gap-6 px-4 py-8 group">
        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
          className="flex h-8 w-8 shrink-0 items-center justify-center"
        >
          {isUser ? (
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-gradient-to-br from-purple-500 to-pink-500">
              <User className="h-5 w-5 text-white" />
            </div>
          ) : (
            <AnimatedLogo size={28} />
          )}
        </motion.div>

        {/* Message Content */}
        <div className="flex-1 space-y-2 min-w-0">
          {isUser ? (
            <div className="text-base leading-relaxed text-gray-900 whitespace-pre-wrap break-words">
              {message.content}
            </div>
          ) : (
            <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-p:text-gray-800 prose-p:my-4 prose-p:first:mt-0 prose-headings:text-gray-900 prose-headings:font-semibold prose-headings:mt-6 prose-headings:mb-3 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-code:text-gray-900 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none prose-pre:bg-black prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:my-4 prose-pre:p-4 prose-pre:overflow-x-auto prose-ul:my-4 prose-ol:my-4 prose-li:my-1">
              <ReactMarkdown
                components={{
                  p: ({ children }) => (
                    <p className="mb-4 last:mb-0 text-gray-800 leading-7">
                      {children}
                      {showCursor && (
                        <AnimatePresence>
                          <AliveCursor />
                        </AnimatePresence>
                      )}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="mb-4 ml-6 list-disc space-y-2 text-gray-800">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="mb-4 ml-6 list-decimal space-y-2 text-gray-800">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-gray-800 leading-7">{children}</li>
                  ),
                  code: ({ children, className }) => {
                    const isInline = !className;
                    const language = className?.replace('language-', '') || '';
                    
                    return isInline ? (
                      <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-900 border border-gray-200">
                        {children}
                      </code>
                    ) : (
                      <div className="relative group/code my-4">
                        {language && (
                          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-2 bg-gray-800 rounded-t-lg border-b border-gray-700">
                            <span className="text-xs text-gray-400 font-mono">{language}</span>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(String(children));
                              }}
                              className="text-xs text-gray-400 hover:text-gray-200 transition-colors"
                            >
                              复制代码
                            </button>
                          </div>
                        )}
                        <pre className={`bg-black text-gray-100 rounded-lg overflow-x-auto ${language ? 'pt-12' : 'p-4'}`}>
                          <code className="font-mono text-sm leading-6">
                            {children}
                          </code>
                        </pre>
                      </div>
                    );
                  },
                  h1: ({ children }) => (
                    <h1 className="mb-3 mt-6 text-2xl font-semibold text-gray-900 first:mt-0">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="mb-3 mt-6 text-xl font-semibold text-gray-900 first:mt-0">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="mb-2 mt-5 text-lg font-semibold text-gray-900 first:mt-0">
                      {children}
                    </h3>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-700 italic">
                      {children}
                    </blockquote>
                  ),
                  a: ({ children, href }) => (
                    <a 
                      href={href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {children}
                    </a>
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

        {/* Action Buttons */}
        {!isUser && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <motion.button
              onClick={handleCopy}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors"
              title="复制"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
