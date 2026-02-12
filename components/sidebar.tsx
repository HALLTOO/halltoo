"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Settings, MessageSquare } from "lucide-react";
import { useChatStore, ChatSession } from "@/store/chat-store";
import { AnimatedLogo } from "./animated-logo";
import { AlertDialog } from "./ui/alert-dialog";
import { useState } from "react";

interface SidebarProps {
  onSettingsClick: () => void;
}

export function Sidebar({ onSettingsClick }: SidebarProps) {
  const {
    sessions,
    currentSessionId,
    createSession,
    deleteSession,
    setCurrentSession,
  } = useChatStore();

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);

  const handleNewChat = () => {
    createSession();
  };

  const handleDeleteClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSessionToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (sessionToDelete) {
      deleteSession(sessionToDelete);
      setSessionToDelete(null);
    }
  };

  const sessionToDeleteTitle = sessions.find((s) => s.id === sessionToDelete)?.title || "此对话";

  // Group sessions by date
  const groupedSessions = {
    today: [] as ChatSession[],
    yesterday: [] as ChatSession[],
    previous7Days: [] as ChatSession[],
    older: [] as ChatSession[],
  };

  const now = Date.now();
  const oneDayMs = 24 * 60 * 60 * 1000;

  sessions.forEach((session) => {
    const diff = now - session.updatedAt;
    if (diff < oneDayMs) {
      groupedSessions.today.push(session);
    } else if (diff < 2 * oneDayMs) {
      groupedSessions.yesterday.push(session);
    } else if (diff < 7 * oneDayMs) {
      groupedSessions.previous7Days.push(session);
    } else {
      groupedSessions.older.push(session);
    }
  });

  const renderSessionGroup = (title: string, sessions: ChatSession[]) => {
    if (sessions.length === 0) return null;

    return (
      <div className="mb-4">
        <h3 className="px-3 mb-2 text-xs font-medium text-gray-500 tracking-tight">
          {title}
        </h3>
        <div className="space-y-1">
          {sessions.map((session) => (
            <motion.button
              key={session.id}
              onClick={() => setCurrentSession(session.id)}
              onMouseEnter={() => setHoveredId(session.id)}
              onMouseLeave={() => setHoveredId(null)}
              whileHover={{ x: 2 }}
              className={`group relative w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-200 ${
                currentSessionId === session.id
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <MessageSquare className="h-4 w-4 shrink-0 opacity-60" />
              <span className="flex-1 truncate text-sm tracking-tight">
                {session.title}
              </span>
              
              <AnimatePresence>
                {hoveredId === session.id && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={(e) => handleDeleteClick(session.id, e)}
                    className="absolute right-2 p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors btn-press"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <motion.aside
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-0 bottom-0 w-64 glass border-r border-gray-200/50 flex flex-col z-50"
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200/50">
          <div className="flex items-center gap-3 mb-4">
            <AnimatedLogo size={32} />
            <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
              Halltoo
            </h2>
          </div>
          
          {/* New Chat Button */}
          <motion.button
            onClick={handleNewChat}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-gray-800 shadow-sm btn-press"
          >
            <Plus className="h-4 w-4" />
            新对话
          </motion.button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-3">
          {sessions.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <MessageSquare className="h-12 w-12 text-gray-300 mb-3" />
              <p className="text-sm text-gray-500 tracking-tight">
                还没有对话记录
              </p>
              <p className="text-xs text-gray-400 mt-1 tracking-tight">
                点击"新对话"开始
              </p>
            </div>
          ) : (
            <>
              {renderSessionGroup('今天', groupedSessions.today)}
              {renderSessionGroup('昨天', groupedSessions.yesterday)}
              {renderSessionGroup('最近 7 天', groupedSessions.previous7Days)}
              {renderSessionGroup('更早', groupedSessions.older)}
            </>
          )}
        </div>

        {/* Settings Button */}
        <div className="p-4 border-t border-gray-200/50">
          <motion.button
            onClick={onSettingsClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 btn-press"
          >
            <Settings className="h-4 w-4" />
            设置
          </motion.button>
        </div>
      </motion.aside>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="删除对话"
        description={`确定要删除"${sessionToDeleteTitle}"吗？此操作无法撤销。`}
        confirmText="删除"
        cancelText="取消"
      />
    </>
  );
}
