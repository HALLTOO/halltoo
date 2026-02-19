"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function LogoWall() {
  const logos = [
    { name: "Acme Corp", icon: "Triangle" },
    { name: "Nebula", icon: "Circle" },
    { name: "Vertex", icon: "Square" },
    { name: "Horizon", icon: "Hexagon" },
    { name: "Spherule", icon: "Octagon" },
    { name: "GlobalBank", icon: "Globe" }
  ]

  return (
    <section className="py-12 bg-background border-b border-border/40">
      <div className="container px-4 mx-auto text-center">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-8">
          Trusted by innovative teams worldwide
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {logos.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center gap-2 group cursor-default"
            >
              {/* Abstract Logo Icon */}
              <div className="w-6 h-6 bg-foreground rounded-sm group-hover:bg-primary transition-colors" />
              <span className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                {logo.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
