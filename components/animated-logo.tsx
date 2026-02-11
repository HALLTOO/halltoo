"use client";

import { motion } from "framer-motion";

export function AnimatedLogo({ size = 48 }: { size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Outer glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-60 blur-2xl"
        style={{
          background: "radial-gradient(circle, rgba(34, 211, 238, 0.4) 0%, rgba(168, 85, 247, 0.4) 100%)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main logo SVG */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="relative z-10"
        style={{ filter: "drop-shadow(0 0 8px rgba(34, 211, 238, 0.5))" }}
      >
        <defs>
          {/* Main gradient - cyan to purple */}
          <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="50%" stopColor="#818CF8" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Hexagon with fluid blobs */}
        <motion.g
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ transformOrigin: "50px 50px" }}
        >
          {/* 6 fluid blobs forming hexagon shape */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const radian = (angle * Math.PI) / 180;
            const radius = 28;
            const x = 50 + radius * Math.cos(radian);
            const y = 50 + radius * Math.sin(radian);

            return (
              <motion.g key={i}>
                {/* Blob shape */}
                <motion.ellipse
                  cx={x}
                  cy={y}
                  rx="12"
                  ry="16"
                  fill="url(#mainGradient)"
                  filter="url(#glow)"
                  animate={{
                    rx: [12, 14, 12],
                    ry: [16, 18, 16],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                  style={{
                    transformOrigin: `${x}px ${y}px`,
                  }}
                />
              </motion.g>
            );
          })}
        </motion.g>

        {/* Center flowing shape */}
        <motion.g
          animate={{
            rotate: [0, -360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ transformOrigin: "50px 50px" }}
        >
          {/* Three curved flowing lines */}
          {[0, 120, 240].map((angle, i) => (
            <motion.path
              key={i}
              d={`M 50 50 Q ${50 + 15 * Math.cos((angle * Math.PI) / 180)} ${
                50 + 15 * Math.sin((angle * Math.PI) / 180)
              } ${50 + 25 * Math.cos(((angle + 30) * Math.PI) / 180)} ${
                50 + 25 * Math.sin(((angle + 30) * Math.PI) / 180)
              }`}
              stroke="url(#mainGradient)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              filter="url(#glow)"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
            />
          ))}
        </motion.g>

        {/* Center core */}
        <motion.circle
          cx="50"
          cy="50"
          r="8"
          fill="url(#mainGradient)"
          filter="url(#glow)"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "50px 50px" }}
        />
      </svg>
    </div>
  );
}
