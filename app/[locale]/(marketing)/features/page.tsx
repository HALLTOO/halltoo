"use client"

import { motion } from "framer-motion"
import { GitBranch, MessageSquare, Users, Book, Activity, Settings, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const features = [
  {
    category: "Core Intelligence",
    title: "Multi-Model Router",
    description: "Automatically route prompts to the most cost-effective model based on complexity. Use GPT-4o for reasoning and Haiku for simple tasks without switching tabs.",
    audience: "For engineering teams optimizing token costs.",
    icon: <GitBranch className="w-6 h-6" />,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    category: "Collaboration",
    title: "Team Workspaces",
    description: "Share chat sessions, collaborate on prompts, and manage team access with granular permissions. Real-time multiplayer editing for prompt engineering.",
    audience: "For product teams and research groups.",
    icon: <Users className="w-6 h-6" />,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    category: "Knowledge Management",
    title: "Prompt Library",
    description: "Version-controlled prompt templates with variable interpolation. Standardize your team's output quality with approved system prompts.",
    audience: "For prompt engineers and operations.",
    icon: <Book className="w-6 h-6" />,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    category: "Memory",
    title: "Conversation Memory",
    description: "Long-term vector memory allows the AI to recall details from previous sessions. Create project-specific memory silos to keep context relevant.",
    audience: "For power users managing multiple projects.",
    icon: <MessageSquare className="w-6 h-6" />,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    category: "Compliance",
    title: "Audit Logs",
    description: "Complete visibility into who asked what. Export logs for compliance reviews. Track token usage by user, team, or project.",
    audience: "For enterprise admins and security teams.",
    icon: <Activity className="w-6 h-6" />,
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    category: "Administration",
    title: "Admin Controls",
    description: "Enforce model allowlists, set spending limits per user, and configure SSO enforcement. Centralized billing and seat management.",
    audience: "For IT administrators.",
    icon: <Settings className="w-6 h-6" />,
    color: "text-gray-500",
    bg: "bg-gray-500/10",
  },
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-24">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">
            Built for the AI-native workflow.
          </h1>
          <p className="text-xl text-muted-foreground">
            halltoo provides the infrastructure layer for teams building with LLMs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="group relative overflow-hidden rounded-3xl border border-border/40 bg-secondary/5 hover:bg-secondary/10 transition-colors"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
                <div className="order-2 md:order-1 space-y-6">
                  <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-3 text-muted-foreground">{feature.category}</Badge>
                    <h2 className="text-3xl font-bold mb-4">{feature.title}</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                      {feature.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground/80 bg-background/50 w-fit px-3 py-1.5 rounded-full border border-border/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature.audience}
                    </div>
                  </div>
                </div>
                
                {/* Visual Placeholder for Feature */}
                <div className="order-1 md:order-2 relative aspect-video md:aspect-square lg:aspect-[4/3] rounded-2xl bg-background border border-border/40 overflow-hidden shadow-2xl group-hover:shadow-primary/5 transition-all">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 font-mono text-sm">
                    [Feature Visualization: {feature.title}]
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute top-4 left-4 right-4 h-2 bg-border/20 rounded-full" />
                  <div className="absolute top-8 left-4 w-1/3 h-2 bg-border/20 rounded-full" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <Link href="/signup">
            <Button size="lg" className="rounded-full px-8 h-12 text-base shadow-xl shadow-primary/20">
              Start using halltoo today <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
