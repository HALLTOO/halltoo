"use client";

import { useChat } from "ai/react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Send, LogOut } from "lucide-react";
import { ChatMessage } from "@/components/chat-message";
import { AnimatedLogo } from "@/components/animated-logo";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (status === "unauthenticated" && mounted) {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (!isLoggedIn) {
        router.push("/login");
      }
    }
  }, [status, router, mounted]);

  const [selectedModel, setSelectedModel] = useState("deepseek-chat");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    body: {
      model: selectedModel,
    },
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    handleSubmit(e);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    if (session) {
      signOut({ callbackUrl: "/login" });
    } else {
      router.push("/login");
    }
  };

  if (!mounted || status === "loading") return null;

  return (
    <div className="relative flex h-screen bg-gray-50">
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200"
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <AnimatedLogo size={32} />
            <h1 className="text-lg font-semibold text-gray-900">
              Halltoo
            </h1>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-3"
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-[140px] h-9 border-gray-200 bg-white text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                <SelectItem value="deepseek-chat">DeepSeek</SelectItem>
                <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                <SelectItem value="claude-3-5-sonnet">Claude 3.5</SelectItem>
              </SelectContent>
            </Select>
            
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100"
            >
              <LogOut className="h-4 w-4" />
            </motion.button>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Chat Area */}
      <div className="relative z-10 flex-1 overflow-hidden pt-16 pb-24">
        <ScrollArea className="h-full">
          <div ref={scrollRef} className="h-full">
            <AnimatePresence mode="wait">
              {messages.length === 0 ? (
                <motion.div 
                  key="welcome"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex h-full items-center justify-center px-4"
                >
                  <div className="text-center space-y-6 max-w-md">
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                      className="mx-auto flex items-center justify-center"
                    >
                      <AnimatedLogo size={80} />
                    </motion.div>
                    <motion.h2 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="text-3xl font-semibold text-gray-900"
                    >
                      欢迎使用 Halltoo
                    </motion.h2>
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      className="text-gray-500 leading-relaxed"
                    >
                      开始对话，体验智能 AI 助手
                    </motion.p>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="messages"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mx-auto max-w-3xl space-y-6 px-4 py-8"
                >
                  <AnimatePresence>
                    {messages.map((message, index) => {
                      const isLastMessage = index === messages.length - 1;
                      const isStreamingThisMessage = isLastMessage && isLoading && message.role === 'assistant';
                      
                      return (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                        >
                          <ChatMessage message={message} isStreaming={isStreamingThisMessage} />
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                  {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                        <AnimatedLogo size={32} />
                      </div>
                      <div className="flex-1 space-y-2 pt-1">
                        <div className="flex items-center gap-2">
                          <motion.div 
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                            className="h-1.5 w-1.5 rounded-full bg-gray-400"
                          />
                          <motion.div 
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                            className="h-1.5 w-1.5 rounded-full bg-gray-400"
                          />
                          <motion.div 
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                            className="h-1.5 w-1.5 rounded-full bg-gray-400"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>
      </div>

      {/* Input Bar */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-t border-gray-200 px-4 py-4"
      >
        <form onSubmit={onSubmit} className="mx-auto max-w-3xl">
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 shadow-sm">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="输入消息..."
              disabled={isLoading}
              className="flex-1 bg-transparent text-base text-gray-900 placeholder-gray-400 focus:outline-none disabled:opacity-50"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onSubmit(e as any);
                }
              }}
            />
            <motion.button
              type="submit"
              disabled={!input.trim() || isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-black text-white transition-all hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
