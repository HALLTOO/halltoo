"use client";

import { DynamicLogo } from "./ui/dynamic-logo";

interface AnimatedLogoProps {
  size?: number;
  state?: "idle" | "thinking" | "streaming";
}

export function AnimatedLogo({ size = 48, state = "idle" }: AnimatedLogoProps) {
  return <DynamicLogo size={size} state={state} />;
}
