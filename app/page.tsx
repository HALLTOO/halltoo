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
    <div className="relative flex h-screen">
      {/* Glassmorphic Header with Animation */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="glass-strong fixed top-0 left-0 right-0 z-50 border-b border-white/10"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <AnimatedLogo size={48} />
            <h1 className="text-xl font-semibold tracking-tight text-white text-glow">
              Halltoo
            </h1>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-4"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-[180px] glass border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass-strong border-white/20">
                <SelectItem value="deepseek-chat">DeepSeek</SelectItem>
                <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                <SelectItem value="claude-3-5-sonnet">Claude 3.5</SelectItem>
              </SelectContent>
            </Select>
            
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-white/70 transition-all hover:bg-white/10 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              <span>退出</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Chat Area */}
      <div className="relative z-10 flex-1 overflow-hidden pt-20 pb-32">
        <ScrollArea className="h-full">
          <div ref={scrollRef} className="h-full">
            <AnimatePresence mode="wait">
              {messages.length === 0 ? (
                <motion.div 
                  key="welcome"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="flex h-full items-center justify-center px-4"
                >
                  <div className="text-center space-y-6">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="mx-auto flex items-center justify-center"
                    >
                      <AnimatedLogo size={96} />
                    </motion.div>
                    <motion.h2 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="text-4xl font-bold tracking-tight text-white text-glow"
                    >
                      欢迎使用 Halltoo
                    </motion.h2>
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      className="text-cyan-200/70 leading-relaxed max-w-md mx-auto"
                    >
                      开始对话，体验未来智能 AI 助手
                    </motion.p>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="messages"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mx-auto max-w-3xl space-y-8 px-4 py-8"
                >
                  <AnimatePresence>
                    {messages.map((message, index) => {
                      const isLastMessage = index === messages.length - 1;
                      const isStreamingThisMessage = isLastMessage && isLoading && message.role === 'assistant';
                      
                      return (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.4 }}
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
                      className="flex items-start gap-4"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center">
                        <AnimatedLogo size={40} />
                      </div>
                      <div className="flex-1 space-y-2 pt-2">
                        <div className="flex items-center gap-2">
                          <motion.div 
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                            className="h-2 w-2 rounded-full bg-cyan-400"
                          />
                          <motion.div 
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                            className="h-2 w-2 rounded-full bg-purple-400"
                          />
                          <motion.div 
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                            className="h-2 w-2 rounded-full bg-cyan-400"
                          />
                          <span className="ml-2 text-sm text-cyan-200/70">正在思考...</span>
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

      {/* Floating Input Capsule with Glow */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
        className="fixed bottom-8 left-0 right-0 z-40 px-4"
      >
        <form onSubmit={onSubmit} className="mx-auto max-w-3xl">
          <motion.div 
            animate={isLoading ? {
              boxShadow: [
                "0 0 20px rgba(0, 191, 255, 0.3), 0 0 40px rgba(138, 43, 226, 0.2)",
                "0 0 30px rgba(0, 191, 255, 0.5), 0 0 60px rgba(138, 43, 226, 0.3)",
                "0 0 20px rgba(0, 191, 255, 0.3), 0 0 40px rgba(138, 43, 226, 0.2)",
              ]
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            className="glass-strong flex items-center gap-4 rounded-full px-6 py-4 shadow-2xl"
          >
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="输入消息..."
              disabled={isLoading}
              className="flex-1 bg-transparent text-sm text-white placeholder-white/40 focus:outline-none disabled:opacity-50"
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
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 text-white shadow-lg shadow-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/70 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
