"use client";

import { useChat } from "ai/react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Send, LogOut, Sparkles } from "lucide-react";
import { ChatMessage } from "@/components/chat-message";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ChatPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setMounted(true);
    }
  }, [router]);

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
    router.push("/login");
  };

  if (!mounted) return null;

  return (
    <div className="relative flex h-screen">
      {/* Glassmorphic Header */}
      <header className="glass-strong fixed top-0 left-0 right-0 z-50 border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 shadow-lg shadow-purple-500/50 animate-breathe">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-semibold tracking-tight text-white text-glow">
              Halltoo
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
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
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-white/70 transition-all hover:bg-white/10 hover:text-white active:scale-95"
            >
              <LogOut className="h-4 w-4" />
              <span>退出</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <div className="relative z-10 flex-1 overflow-hidden pt-20 pb-32">
        <ScrollArea className="h-full">
          <div ref={scrollRef} className="h-full">
            {messages.length === 0 ? (
              <div className="flex h-full items-center justify-center px-4">
                <div className="text-center space-y-6 animate-[float_6s_ease-in-out_infinite]">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-purple-600 shadow-2xl shadow-purple-500/50 animate-breathe">
                    <Sparkles className="h-12 w-12 text-white" />
                  </div>
                  <h2 className="text-4xl font-bold tracking-tight text-white text-glow">
                    欢迎使用 Halltoo
                  </h2>
                  <p className="text-cyan-200/70 leading-relaxed max-w-md mx-auto">
                    开始对话，体验未来智能 AI 助手
                  </p>
                </div>
              </div>
            ) : (
              <div className="mx-auto max-w-3xl space-y-8 px-4 py-8">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {isLoading && (
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 shadow-lg shadow-purple-500/30">
                      <Sparkles className="h-5 w-5 text-white animate-pulse" />
                    </div>
                    <div className="flex-1 space-y-2 pt-2">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" style={{ animationDelay: "0ms" }}></div>
                        <div className="h-2 w-2 animate-bounce rounded-full bg-purple-400" style={{ animationDelay: "150ms" }}></div>
                        <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" style={{ animationDelay: "300ms" }}></div>
                        <span className="ml-2 text-sm text-cyan-200/70">正在思考...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Floating Input Capsule with Glow */}
      <div className="fixed bottom-8 left-0 right-0 z-40 px-4">
        <form onSubmit={onSubmit} className="mx-auto max-w-3xl">
          <div className={`glass-strong flex items-center gap-4 rounded-full px-6 py-4 shadow-2xl ${isLoading ? 'animate-glow-pulse' : ''}`}>
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
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 text-white shadow-lg shadow-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/70 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
