"use client"

import { motion } from "framer-motion"
import { Shield, Lock, EyeOff, Check, Server } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function Security() {
  const features = [
    "End-to-end encryption for all messages",
    "Zero data training policy",
    "SOC 2 Type II compliant infrastructure",
    "Single Sign-On (SSO) enforcement",
    "Automated data retention policies",
    "Role-based access control (RBAC)"
  ]

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Enterprise-grade <span className="text-primary">security</span> by default.
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We understand that your data is your most valuable asset. That&apos;s why we&apos;ve built halltoo with security as a first-class citizen, not an afterthought.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 bg-green-500/10 p-1 rounded-full">
                    <Check className="w-4 h-4 text-green-500" />
                  </div>
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 blur-[80px] rounded-full opacity-50" />
            <Card className="relative bg-background/50 backdrop-blur-xl border-border/40 overflow-hidden">
              <CardContent className="p-8">
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-secondary/30 p-4 rounded-xl border border-border/50 flex flex-col items-center text-center gap-3">
                    <Shield className="w-8 h-8 text-primary" />
                    <div className="text-sm font-semibold">Encryption</div>
                    <div className="text-xs text-muted-foreground">AES-256 at rest</div>
                  </div>
                  <div className="bg-secondary/30 p-4 rounded-xl border border-border/50 flex flex-col items-center text-center gap-3">
                    <Lock className="w-8 h-8 text-blue-500" />
                    <div className="text-sm font-semibold">Privacy</div>
                    <div className="text-xs text-muted-foreground">GDPR Ready</div>
                  </div>
                  <div className="bg-secondary/30 p-4 rounded-xl border border-border/50 flex flex-col items-center text-center gap-3">
                    <EyeOff className="w-8 h-8 text-purple-500" />
                    <div className="text-sm font-semibold">No Training</div>
                    <div className="text-xs text-muted-foreground">Your IP is yours</div>
                  </div>
                  <div className="bg-secondary/30 p-4 rounded-xl border border-border/50 flex flex-col items-center text-center gap-3">
                    <Server className="w-8 h-8 text-orange-500" />
                    <div className="text-sm font-semibold">Residency</div>
                    <div className="text-xs text-muted-foreground">US & EU Regions</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-2 w-3/4 bg-secondary/50 rounded-full" />
                  <div className="h-2 w-full bg-secondary/30 rounded-full" />
                  <div className="h-2 w-5/6 bg-secondary/40 rounded-full" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
