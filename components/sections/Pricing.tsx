"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false)

  const plans = [
    {
      name: "Free",
      price: { monthly: 0, yearly: 0 },
      description: "For individuals exploring multi-model chat.",
      features: ["Access to GPT-3.5 & Claude Haiku", "50 messages per day", "Standard speed", "Community support"],
      cta: "Start for free",
      popular: false,
    },
    {
      name: "Pro",
      price: { monthly: 20, yearly: 16 },
      description: "For power users who need the best models.",
      features: ["Access to GPT-4o, Claude 3.5 Sonnet", "Unlimited messages", "Priority speed", "Advanced prompt management", "Early access to new features"],
      cta: "Get Pro",
      popular: true,
    },
    {
      name: "Team",
      price: { monthly: 50, yearly: 40 },
      description: "For teams collaborating on AI workflows.",
      features: ["Everything in Pro", "Centralized billing", "Team prompt library", "SSO & Audit logs", "Dedicated support"],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-30 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      
      <div className="container px-4 mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Simple, transparent <span className="text-primary">pricing</span>.
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Start for free, upgrade when you need more power.
          </p>

          <div className="flex items-center justify-center gap-4 mb-8">
            <Label htmlFor="billing-toggle" className={cn("text-sm font-medium transition-colors", !isYearly ? "text-foreground" : "text-muted-foreground")}>
              Monthly
            </Label>
            <Switch
              id="billing-toggle"
              checked={isYearly}
              onCheckedChange={setIsYearly}
            />
            <Label htmlFor="billing-toggle" className={cn("text-sm font-medium transition-colors", isYearly ? "text-foreground" : "text-muted-foreground")}>
              Yearly <span className="text-xs text-primary ml-1 font-bold bg-primary/10 px-2 py-0.5 rounded-full">-20%</span>
            </Label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "relative rounded-2xl p-8 border backdrop-blur-sm transition-all duration-300",
                plan.popular 
                  ? "bg-primary/5 border-primary shadow-2xl shadow-primary/10 scale-105 z-10" 
                  : "bg-background/50 border-border hover:border-border/80 hover:shadow-lg"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-6 h-10">{plan.description}</p>
              
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold tracking-tight">
                  $
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={isYearly ? "yearly" : "monthly"}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="inline-block w-[1.5ch] text-center"
                    >
                      {isYearly ? plan.price.yearly : plan.price.monthly}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="text-muted-foreground">/mo</span>
              </div>

              <Button 
                className={cn("w-full mb-8 rounded-xl h-12 text-base font-semibold", plan.popular ? "bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20" : "bg-secondary hover:bg-secondary/80 text-secondary-foreground")}
                variant={plan.popular ? "default" : "secondary"}
              >
                {plan.cta}
              </Button>

              <ul className="space-y-3 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-muted-foreground">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
