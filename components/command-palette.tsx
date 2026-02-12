"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, MessageSquare, Settings, Plus } from "lucide-react";
import { useChatStore } from "@/store/chat-store";
import { useState, useEffect, useMemo } from "react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSettingsClick: () => void;
}

export function CommandPalette({ isOpen, onClose, onSettingsClick }: CommandPaletteProps) {
  const { sessions, setCurrentSession, createSession } = useChatStore();
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Filter sessions based on search
  const filteredSessions = useMemo(() => {
    if (!search) return sessions;
    return sessions.filter((session) =>
      session.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [sessions, search]);

  // Commands
  const commands = useMemo(() => {
    const items = [
      {
        id: "new-chat",
        label: "新建对话",
        icon: Plus,
        action: () => {
          createSession();
          onClose();
        },
      },
      {
        id: "settings",
        label: "打开设置",
        icon: Settings,
        action: () => {
          onSettingsClick();
          onClose();
        },
      },
    ];

    // Add filtered sessions
    filteredSessions.forEach((session) => {
      items.push({
        id: session.id,
        label: session.title,
        icon: MessageSquare,
        action: () => {
          setCurrentSession(session.id);
          onClose();
        },
      });
    });

    return items;
  }, [filteredSessions, createSession, setCurrentSession, onSettingsClick, onClose]);

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % commands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + commands.length) % commands.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        commands[selectedIndex]?.action();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, commands, selectedIndex, onClose]);

  // Reset state when closing
  useEffect(() => {
    if (!isOpen) {
      setSearch("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[150]"
          />

          {/* Command Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="fixed left-1/2 top-[20%] -translate-x-1/2 w-full max-w-2xl rounded-2xl glass-strong shadow-apple-lg z-[151] overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 border-b border-gray-200/50 px-4 py-3">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="搜索对话或输入命令..."
                autoFocus
                className="flex-1 bg-transparent text-base text-gray-900 placeholder-gray-500 focus:outline-none tracking-tight"
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 tracking-tight">
                ESC
              </kbd>
            </div>

            {/* Commands List */}
            <div className="max-h-[400px] overflow-y-auto p-2">
              {commands.length === 0 ? (
                <div className="py-8 text-center text-sm text-gray-500 tracking-tight">
                  没有找到匹配的结果
                </div>
              ) : (
                <div className="space-y-1">
                  {commands.map((command, index) => {
                    const Icon = command.icon;
                    const isSelected = index === selectedIndex;

                    return (
                      <motion.button
                        key={command.id}
                        onClick={command.action}
                        onMouseEnter={() => setSelectedIndex(index)}
                        whileHover={{ x: 2 }}
                        className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all ${
                          isSelected
                            ? "bg-blue-50 text-blue-900"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <Icon
                          className={`h-4 w-4 shrink-0 ${
                            isSelected ? "text-blue-600" : "text-gray-400"
                          }`}
                        />
                        <span className="flex-1 truncate text-sm font-medium tracking-tight">
                          {command.label}
                        </span>
                        {isSelected && (
                          <kbd className="hidden sm:inline-flex items-center gap-1 rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 tracking-tight">
                            ↵
                          </kbd>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200/50 px-4 py-2 flex items-center justify-between text-xs text-gray-500 tracking-tight">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="rounded bg-gray-100 px-1.5 py-0.5 font-medium">↑</kbd>
                  <kbd className="rounded bg-gray-100 px-1.5 py-0.5 font-medium">↓</kbd>
                  导航
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded bg-gray-100 px-1.5 py-0.5 font-medium">↵</kbd>
                  选择
                </span>
              </div>
              <span>
                {commands.length} 个结果
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
