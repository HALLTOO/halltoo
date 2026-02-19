"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Senior Developer",
    avatar: "/avatars/alex.jpg",
    content: "halltoo has completely transformed how I use LLMs. The ability to switch context instantly between GPT-4o and Claude is a game changer for my workflow.",
  },
  {
    name: "Sarah Chen",
    role: "Product Manager",
    avatar: "/avatars/sarah.jpg",
    content: "Finally, a chat interface that feels designed for professionals. The prompt management features alone save me hours every week.",
  },
  {
    name: "Michael Torres",
    role: "AI Researcher",
    avatar: "/avatars/michael.jpg",
    content: "The latency is incredible. It feels faster than the native interfaces, and having everything in one place makes comparing model outputs effortless.",
  },
]

export function Testimonials() {
  return (
    <section className="py-24 bg-secondary/5 border-t border-border/40">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Loved by <span className="text-primary">builders</span>.
          </h2>
          <p className="text-lg text-muted-foreground">
            See what our early adopters are saying about halltoo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-background/50 backdrop-blur-sm border-border/40 hover:border-primary/20 hover:shadow-lg transition-all duration-300">
                <CardHeader className="flex flex-row items-center gap-4 pb-4">
                  <Avatar className="h-12 w-12 border border-border/50">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Quote className="w-8 h-8 text-primary/20 mb-2 -mt-2" />
                  <p className="text-muted-foreground leading-relaxed italic">
                    &quot;{testimonial.content}&quot;
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
