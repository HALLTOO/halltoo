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
      {/* Header - Glass effect */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-200/50"
      >
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <AnimatedLogo size={28} />
            <h1 className="text-base font-semibold text-gray-900 tracking-tight">
              Halltoo
            </h1>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2"
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-[130px] h-9 border-gray-300/50 bg-white/50 text-sm backdrop-blur-sm hover:bg-white/80 transition-all duration-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass-strong border-gray-200/50">
                <SelectItem value="deepseek-chat">DeepSeek</SelectItem>
                <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                <SelectItem value="claude-3-5-sonnet">Claude 3.5</SelectItem>
              </SelectContent>
            </Select>
            
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-white/60 btn-press"
            >
              <LogOut className="h-4 w-4" />
            </motion.button>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Chat Area - Centered, OpenAI style */}
      <div className="relative z-10 flex-1 overflow-hidden pt-14 pb-32">
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
                      <AnimatedLogo size={64} />
                    </motion.div>
                    <motion.h2 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="text-2xl font-semibold text-gray-900 tracking-tight"
                    >
                      欢迎使用 Halltoo
                    </motion.h2>
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      className="text-gray-600 leading-relaxed"
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
                  className="mx-auto max-w-3xl px-4 py-8 space-y-6"
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
                      className="flex items-start gap-4"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                        <AnimatedLogo size={28} state="thinking" />
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="flex items-center gap-1.5">
                          <motion.div 
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                            className="h-2 w-2 rounded-full bg-gray-400"
                          />
                          <motion.div 
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                            className="h-2 w-2 rounded-full bg-gray-400"
                          />
                          <motion.div 
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                            className="h-2 w-2 rounded-full bg-gray-400"
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

      {/* Floating Input Bar - OpenAI Capsule Style */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-6 pt-4 pointer-events-none"
      >
        <div className="mx-auto max-w-3xl pointer-events-auto">
          <form onSubmit={onSubmit}>
            <div className="relative flex items-end gap-2 rounded-[28px] glass-input shadow-lg ring-1 ring-black/5 transition-all duration-200 focus-within:glass-input-focus px-4 py-3">
              <textarea
                value={input}
                onChange={(e) => handleInputChange(e as any)}
                placeholder="给 Halltoo 发送消息"
                disabled={isLoading}
                rows={1}
                className="flex-1 resize-none bg-transparent text-base text-gray-900 placeholder-gray-500 focus:outline-none disabled:opacity-50 max-h-[200px] tracking-tight"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    onSubmit(e as any);
                  }
                }}
                style={{
                  minHeight: '24px',
                  height: 'auto',
                }}
              />
              <motion.button
                type="submit"
                disabled={!input.trim() || isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white transition-all hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm btn-press"
              >
                <Send className="h-4 w-4" />
              </motion.button>
            </div>
          </form>
          <p className="mt-2 text-center text-xs text-gray-500 tracking-tight">
            Halltoo 可能会犯错。请核查重要信息。
          </p>
        </div>
      </motion.div>
    </div>
  );
}
