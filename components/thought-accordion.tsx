"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";

interface ThoughtAccordionProps {
  thought: string;
  isThinking: boolean;
}

export function ThoughtAccordion({ thought, isThinking }: ThoughtAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Auto-expand when thinking starts
  useEffect(() => {
    if (isThinking && thought) {
      setIsOpen(true);
    }
  }, [isThinking, thought]);

  if (!thought) return null;

  return (
    <div className="mb-3">
      {/* Collapsed state - Pill badge */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-50 to-blue-50 px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:shadow-md transition-all duration-200 btn-press"
        >
          <motion.div
            animate={isThinking ? {
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            } : {}}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            <Sparkles className="h-3 w-3 text-purple-500" />
          </motion.div>
          <span>
            {isThinking ? "正在思考..." : "查看思考过程"}
          </span>
        </motion.button>
      )}

      {/* Expanded state */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="glass-input rounded-2xl p-4 shadow-apple">
              {/* Header */}
              <motion.button
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center gap-2 mb-3 text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors btn-press"
              >
                <motion.div
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </motion.div>
                <Sparkles className="h-3.5 w-3.5 text-purple-500" />
                <span>思考过程</span>
                {isThinking && (
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="ml-auto text-purple-600"
                  >
                    思考中...
                  </motion.span>
                )}
              </motion.button>

              {/* Content - Terminal/Xcode style */}
              <div className="relative">
                {/* Thinking indicator line */}
                {isThinking && (
                  <motion.div
                    className="absolute -left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-cyan-500 rounded-full"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
                
                {/* Thought content */}
                <div className="bg-gray-50/50 rounded-xl p-3 border border-gray-100">
                  <pre className="whitespace-pre-wrap break-words font-mono text-xs leading-relaxed text-gray-600 tracking-tight">
                    {thought}
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
