"use client";

import { motion } from "framer-motion";

export function AnimatedLogo({ size = 48 }: { size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 opacity-30 blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main logo container */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="relative z-10"
      >
        {/* Center core */}
        <motion.circle
          cx="50"
          cy="50"
          r="15"
          fill="url(#gradient1)"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Orbiting blobs */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <motion.g key={i}>
            <motion.ellipse
              cx="50"
              cy="50"
              rx="8"
              ry="12"
              fill="url(#gradient2)"
              filter="url(#glow)"
              animate={{
                rotate: [angle, angle + 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                },
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                },
              }}
              style={{
                transformOrigin: "50px 50px",
              }}
            />
            <motion.circle
              cx="50"
              cy="20"
              r="6"
              fill="url(#gradient3)"
              filter="url(#glow)"
              animate={{
                rotate: [angle, angle + 360],
                scale: [1, 1.3, 1],
              }}
              transition={{
                rotate: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                },
                scale: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.15,
                },
              }}
              style={{
                transformOrigin: "50px 50px",
              }}
            />
          </motion.g>
        ))}

        {/* Gradients */}
        <defs>
          <radialGradient id="gradient1">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#A78BFA" />
          </radialGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
}
