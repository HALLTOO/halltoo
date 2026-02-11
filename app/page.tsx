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

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [router]);

  const [selectedModel, setSelectedModel] = useState("deepseek-chat");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    body: {
      model: selectedModel,
    },
    onError: (error) => {
      console.error("Chat error:", error);
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

  return (
    <div className="flex h-screen flex-col">
      {/* Glassmorphic Header */}
      <header className="glass fixed top-0 left-0 right-0 z-50 shadow-float">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold tracking-tight text-gray-900">Halltoo</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-[180px] glass border-white/20 shadow-float">
                <SelectValue placeholder="选择模型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="deepseek-chat">DeepSeek</SelectItem>
                <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                <SelectItem value="claude-3-5-sonnet">Claude 3.5</SelectItem>
              </SelectContent>
            </Select>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-gray-100/50 active:scale-95"
            >
              <LogOut className="h-4 w-4" />
              <span>退出</span>
            </button>
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden pt-20 pb-32">
        <ScrollArea className="h-full">
          <div ref={scrollRef} className="h-full">
            {messages.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-float-lg animate-float">
                    <Sparkles className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                    欢迎使用 Halltoo
                  </h2>
                  <p className="text-gray-500 leading-relaxed">
                    开始对话，体验智能 AI 助手
                  </p>
                </div>
              </div>
            ) : (
              <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {isLoading && (
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                      <Sparkles className="h-5 w-5 text-white animate-pulse" />
                    </div>
                    <div className="flex-1 space-y-2 pt-2">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "0ms" }}></div>
                        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "150ms" }}></div>
                        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "300ms" }}></div>
                        <span className="ml-2 text-sm text-gray-500">正在思考...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Floating Input Capsule */}
      <div className="fixed bottom-8 left-0 right-0 z-40 px-4">
        <form onSubmit={onSubmit} className="mx-auto max-w-2xl">
          <div className="glass flex items-center gap-3 rounded-full px-6 py-4 shadow-float-lg">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="输入消息..."
              disabled={isLoading}
              className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none disabled:opacity-50"
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
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg transition-all hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
