"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-500/10 blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-500/10 blur-[120px] animate-pulse-slow delay-1000" />
      </div>

      <div className="container relative z-10 px-4 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-secondary mb-8 backdrop-blur-sm"
        >
          <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Now with DeepSeek V3 Support
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent"
        >
          Your unified workspace for <br className="hidden md:block" />
          <span className="text-primary">Multiple Intelligence</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Stop juggling between tabs. Access OpenAI, Claude, Gemini, and DeepSeek in one powerful, unified interface designed for teams and power users.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/signup">
            <Button size="lg" className="rounded-full px-8 h-12 text-base shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-1">
              Start for free <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Link href="/features">
            <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base hover:bg-secondary/50 backdrop-blur-sm transition-all hover:-translate-y-1">
              Explore Features
            </Button>
          </Link>
        </motion.div>

        {/* Demo Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 relative mx-auto max-w-6xl group"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 h-full w-full pointer-events-none" />
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-xl border border-border/40 bg-background/50 backdrop-blur-xl shadow-2xl overflow-hidden aspect-[16/10] md:aspect-[21/9] relative"
          >
            {/* CSS-only Mock Interface */}
            <div className="absolute inset-0 flex">
              {/* Sidebar */}
              <div className="w-1/4 h-full border-r border-border/30 bg-muted/20 hidden md:flex flex-col p-4 gap-3">
                <div className="h-8 w-24 bg-muted/40 rounded-lg mb-4" />
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-6 w-full bg-muted/30 rounded-md" />
                ))}
              </div>
              {/* Main Content */}
              <div className="flex-1 p-6 flex flex-col gap-4">
                 {/* Header */}
                 <div className="flex justify-between items-center mb-4">
                    <div className="h-8 w-32 bg-muted/40 rounded-lg" />
                    <div className="h-8 w-8 rounded-full bg-muted/40" />
                 </div>
                 {/* Messages */}
                 <div className="flex-1 space-y-4">
                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/20" />
                      <div className="space-y-2 flex-1">
                        <div className="h-4 w-3/4 bg-muted/30 rounded" />
                        <div className="h-4 w-1/2 bg-muted/30 rounded" />
                      </div>
                    </div>
                    <div className="flex gap-3 flex-row-reverse">
                      <div className="h-8 w-8 rounded-full bg-secondary/40" />
                      <div className="space-y-2 flex-1 items-end flex flex-col">
                        <div className="h-4 w-2/3 bg-primary/10 rounded" />
                      </div>
                    </div>
                 </div>
                 {/* Input */}
                 <div className="h-12 w-full bg-muted/20 rounded-xl border border-border/30 mt-auto mx-auto" />
              </div>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
