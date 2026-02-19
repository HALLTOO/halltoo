"use client"

import { motion } from "framer-motion"
import { Bot, Zap, Shield, Users, Command, Terminal } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: <Bot className="w-8 h-8 text-primary" />,
    title: "Multi-Model Aggregation",
    description: "Access GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, and DeepSeek V3 in a single chat interface. Switch context instantly.",
  },
  {
    icon: <Zap className="w-8 h-8 text-yellow-500" />,
    title: "Lightning Fast",
    description: "Optimized for speed. Streaming responses with zero latency overhead. Keyboard-first navigation for power users.",
  },
  {
    icon: <Shield className="w-8 h-8 text-green-500" />,
    title: "Enterprise Security",
    description: "Your data is encrypted at rest and in transit. API keys are stored securely on the server side. No training on your data.",
  },
  {
    icon: <Users className="w-8 h-8 text-blue-500" />,
    title: "Team Collaboration",
    description: "Share chat sessions, collaborate on prompts, and manage team access with granular permissions.",
  },
  {
    icon: <Command className="w-8 h-8 text-purple-500" />,
    title: "Prompt Management",
    description: "Save, organize, and version your best prompts. Use variables and templates to standardize workflows.",
  },
  {
    icon: <Terminal className="w-8 h-8 text-orange-500" />,
    title: "API Access",
    description: "Integrate halltoo capabilities directly into your internal tools with our robust and documented API.",
  },
]

export function Features() {
  return (
    <section className="py-24 bg-secondary/5">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Everything you need to <span className="text-primary">supercharge</span> your AI workflow.
          </h2>
          <p className="text-lg text-muted-foreground">
            Built for developers, researchers, and teams who demand the best from their LLMs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-background/50 backdrop-blur-sm border-border/40 hover:border-primary/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <CardHeader>
                  <div className="mb-4 p-3 bg-secondary/50 w-fit rounded-xl border border-border/50">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
