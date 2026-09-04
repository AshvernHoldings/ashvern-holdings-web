"use client";

import { MotionConfig } from "framer-motion";

/** Global reduced-motion handling: drops transform/layout animation and
 * jumps to end state for prefers-reduced-motion users, keeps opacity. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
