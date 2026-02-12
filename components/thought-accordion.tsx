"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Brain } from "lucide-react";

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

  // Auto-collapse when thinking completes (optional)
  useEffect(() => {
    if (!isThinking && thought && isOpen) {
      // Keep it open after thinking completes
      // If you want to auto-collapse, uncomment the next line:
      // setTimeout(() => setIsOpen(false), 1000);
    }
  }, [isThinking, thought, isOpen]);

  if (!thought) return null;

  return (
    <div className="mb-4">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-left transition-colors hover:bg-gray-100"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <Brain className="h-4 w-4 text-purple-600 shrink-0" />
        <span className="flex-1 text-sm font-medium text-gray-700">
          {isThinking ? (
            <span className="flex items-center gap-2">
              正在思考
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ...
              </motion.span>
            </span>
          ) : (
            "思考过程"
          )}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-2 rounded-lg border border-gray-200 bg-white p-4">
              <div className="relative">
                {isThinking && (
                  <motion.div
                    className="absolute -left-1 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"
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
                <pre className="whitespace-pre-wrap break-words font-mono text-xs leading-relaxed text-gray-600 pl-3">
                  {thought}
                </pre>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
