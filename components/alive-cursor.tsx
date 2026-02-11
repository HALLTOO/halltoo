"use client";

import { motion } from "framer-motion";

export function AliveCursor() {
  return (
    <motion.span
      className="inline-block"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.span
        className="inline-block h-2 w-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg shadow-cyan-400/50"
        animate={{
          scale: [1, 1.3, 0.8, 1],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.3, 0.6, 1],
        }}
        style={{
          boxShadow: "0 0 8px rgba(34, 211, 238, 0.6), 0 0 16px rgba(34, 211, 238, 0.3)",
        }}
      />
    </motion.span>
  );
}
