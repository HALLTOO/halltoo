import { useState } from "react"
import { motion } from "framer-motion"
import { Bot, User, Copy, Check, Trash2, Edit2, RotateCcw, MoreHorizontal, ExternalLink } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { cn } from "@/lib/utils"
import { Message } from "@/lib/types/chat"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import copy from "clipboard-copy"

interface MessageBubbleProps {
  message: {
    id: string
    role: "user" | "assistant" | "system"
    content: string
    createdAt: number | string
  }
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = (text: string) => {
    copy(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(
        "flex gap-4 group relative",
        message.role === "user" ? "flex-row-reverse" : "flex-row"
      )}
    >
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm",
        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
      )}>
        {message.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
      </div>
      
      <div className={cn(
        "flex flex-col gap-1 max-w-[85%]",
        message.role === "user" ? "items-end" : "items-start"
      )}>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold opacity-70">
            {message.role === "user" ? "You" : "halltoo AI"}
          </span>
          <span className="text-[10px] text-muted-foreground">
            {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        
        <div className={cn(
          "rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm relative",
          message.role === "user" 
            ? "bg-primary text-primary-foreground rounded-tr-none" 
            : "bg-secondary/50 text-foreground border border-border/40 rounded-tl-none backdrop-blur-sm"
        )}>
          {message.role === "assistant" ? (
            <div className="prose prose-neutral dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:p-0 prose-pre:bg-transparent prose-code:bg-muted/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
              <ReactMarkdown
                components={{
                  a({ node, className, children, ...props }) {
                    return (
                      <a 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={cn("inline-flex items-center gap-0.5 font-medium", className)} 
                        {...props}
                      >
                        {children}
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </a>
                    )
                  },
                  code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || "")
                    const codeString = String(children).replace(/\n$/, "")
                    
                    return !inline && match ? (
                      <div className="relative group/code my-4 rounded-lg overflow-hidden border border-border/50 bg-[#282c34]">
                        <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                          <span className="text-xs text-muted-foreground font-mono">{match[1]}</span>
                          <button
                            onClick={() => handleCopy(codeString)}
                            className="text-xs flex items-center gap-1 text-muted-foreground hover:text-white transition-colors"
                          >
                            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            {copied ? "Copied!" : "Copy"}
                          </button>
                        </div>
                        <SyntaxHighlighter
                          style={oneDark}
                          language={match[1]}
                          PreTag="div"
                          customStyle={{ margin: 0, padding: '1rem', background: 'transparent' }}
                          {...props}
                        >
                          {codeString}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <code className={cn("bg-muted px-1 py-0.5 rounded font-mono text-xs", className)} {...props}>
                        {children}
                      </code>
                    )
                  }
                }}
              >
                {message.content}
              </ReactMarkdown>
              {/* Typing cursor effect for last message if needed - usually handled by parent state */}
            </div>
          ) : (
            <div className="whitespace-pre-wrap">{message.content}</div>
          )}
        </div>

        {/* Action Menu */}
        <div className={cn(
          "flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity absolute top-2",
          message.role === "user" ? "-left-12" : "-right-12"
        )}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={message.role === "user" ? "end" : "start"}>
              <DropdownMenuItem onClick={() => handleCopy(message.content)}>
                <Copy className="w-4 h-4 mr-2" /> Copy
              </DropdownMenuItem>
              {message.role === "assistant" && (
                <DropdownMenuItem>
                  <RotateCcw className="w-4 h-4 mr-2" /> Regenerate
                </DropdownMenuItem>
              )}
              {message.role === "user" && (
                <DropdownMenuItem>
                  <Edit2 className="w-4 h-4 mr-2" /> Edit
                </DropdownMenuItem>
              )}
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <Trash2 className="w-4 h-4 mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.div>
  )
}
