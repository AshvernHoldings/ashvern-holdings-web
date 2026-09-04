"use client";

import { motion, type Variants } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/**
 * Wraps a section's direct children in a quiet stagger-in-on-scroll.
 * Runs once, on first view. Reduced motion is handled globally by the
 * <MotionConfig reducedMotion="user"> in app/layout.tsx, which drops the
 * y-transform and jumps to the end state for users who prefer it — no
 * per-component branching, so server and client render the same markup.
 */
export function Reveal({
  children,
  className,
  as: Tag = "div",
  immediate = false,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section";
  immediate?: boolean;
  id?: string;
  "aria-labelledby"?: string;
  "aria-label"?: string;
}) {
  const MotionTag = motion[Tag];

  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      {...(immediate
        ? { animate: "show" }
        : { whileInView: "show", viewport: { once: true, amount: 0.15 } })}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}
