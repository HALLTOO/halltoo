"use client";

import { motion } from "framer-motion";

interface DynamicLogoProps {
  state?: "idle" | "thinking" | "streaming";
  size?: number;
}

export function DynamicLogo({ state = "idle", size = 48 }: DynamicLogoProps) {
  const isThinking = state === "thinking";
  const isStreaming = state === "streaming";
  const isActive = isThinking || isStreaming;

  // Animation variants based on state
  const glowVariants = {
    idle: {
      opacity: 0.3,
      scale: 1,
    },
    thinking: {
      opacity: [0.5, 1, 0.5],
      scale: [1, 1.3, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
    streaming: {
      opacity: [0.4, 0.8, 0.4],
      scale: [1, 1.2, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  const rotationVariants = {
    idle: {
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear" as const,
      },
    },
    thinking: {
      rotate: 360,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear" as const,
      },
    },
    streaming: {
      rotate: 360,
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear" as const,
      },
    },
  };

  const breatheVariants = {
    idle: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
    thinking: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
    streaming: {
      scale: [1, 1.08, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  // Color gradients based on state
  const gradientColors = {
    idle: {
      start: "#22D3EE", // Cyan
      mid: "#818CF8", // Blue
      end: "#A855F7", // Purple
    },
    thinking: {
      start: "#F59E0B", // Amber
      mid: "#EF4444", // Red
      end: "#EC4899", // Pink
    },
    streaming: {
      start: "#10B981", // Green
      mid: "#06B6D4", // Cyan
      end: "#8B5CF6", // Purple
    },
  };

  const colors = gradientColors[state];

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Outer glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full blur-2xl"
        style={{
          background: `radial-gradient(circle, ${colors.start}40 0%, ${colors.end}40 100%)`,
        }}
        variants={glowVariants}
        animate={state}
      />

      {/* Main SVG Logo */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="relative z-10"
        style={{
          filter: `drop-shadow(0 0 ${isActive ? "12px" : "6px"} ${colors.start}80)`,
        }}
      >
        <defs>
          {/* Dynamic gradient */}
          <motion.linearGradient
            id={`dynamicGradient-${state}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={colors.start} />
            <stop offset="50%" stopColor={colors.mid} />
            <stop offset="100%" stopColor={colors.end} />
          </motion.linearGradient>

          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={isActive ? "4" : "2"} result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Rotating outer ring with nodes */}
        <motion.g
          variants={rotationVariants}
          animate={state}
          style={{ transformOrigin: "50px 50px" }}
        >
          {/* 4 Neural nodes */}
          {[0, 90, 180, 270].map((angle, i) => {
            const radian = (angle * Math.PI) / 180;
            const radius = 32;
            const x = 50 + radius * Math.cos(radian);
            const y = 50 + radius * Math.sin(radian);

            return (
              <motion.g key={i}>
                {/* Connection line to center */}
                <motion.line
                  x1="50"
                  y1="50"
                  x2={x}
                  y2={y}
                  stroke={`url(#dynamicGradient-${state})`}
                  strokeWidth={isActive ? "2" : "1.5"}
                  opacity={isActive ? 0.6 : 0.3}
                  filter="url(#glow)"
                  animate={{
                    opacity: isActive ? [0.3, 0.8, 0.3] : 0.3,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />

                {/* Node circle */}
                <motion.circle
                  cx={x}
                  cy={y}
                  r={isActive ? "8" : "6"}
                  fill={`url(#dynamicGradient-${state})`}
                  filter="url(#glow)"
                  animate={{
                    r: isActive ? [6, 10, 6] : 6,
                    opacity: isActive ? [0.8, 1, 0.8] : 1,
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                />
              </motion.g>
            );
          })}
        </motion.g>

        {/* Center core with breathing animation */}
        <motion.g variants={breatheVariants} animate={state} style={{ transformOrigin: "50px 50px" }}>
          {/* Outer ring */}
          <motion.circle
            cx="50"
            cy="50"
            r="18"
            fill="none"
            stroke={`url(#dynamicGradient-${state})`}
            strokeWidth={isActive ? "3" : "2"}
            opacity={isActive ? 0.6 : 0.4}
            filter="url(#glow)"
            animate={{
              r: isActive ? [16, 20, 16] : 18,
              opacity: isActive ? [0.4, 0.8, 0.4] : 0.4,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />

          {/* Inner core */}
          <motion.circle
            cx="50"
            cy="50"
            r="12"
            fill={`url(#dynamicGradient-${state})`}
            filter="url(#glow)"
            animate={{
              scale: isActive ? [1, 1.15, 1] : [1, 1.05, 1],
            }}
            transition={{
              duration: isActive ? 1 : 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "50px 50px" }}
          />

          {/* Center dot */}
          <motion.circle
            cx="50"
            cy="50"
            r="4"
            fill="white"
            opacity={isActive ? 1 : 0.8}
            animate={{
              scale: isActive ? [1, 1.5, 1] : 1,
              opacity: isActive ? [0.8, 1, 0.8] : 0.8,
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
            style={{ transformOrigin: "50px 50px" }}
          />
        </motion.g>

        {/* Orbiting particles (only when active) */}
        {isActive && (
          <motion.g
            animate={{ rotate: -360 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ transformOrigin: "50px 50px" }}
          >
            {[0, 120, 240].map((angle, i) => {
              const radian = (angle * Math.PI) / 180;
              const radius = 24;
              const x = 50 + radius * Math.cos(radian);
              const y = 50 + radius * Math.sin(radian);

              return (
                <motion.circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="2"
                  fill={colors.start}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                  style={{ transformOrigin: `${x}px ${y}px` }}
                />
              );
            })}
          </motion.g>
        )}
      </svg>
    </div>
  );
}
