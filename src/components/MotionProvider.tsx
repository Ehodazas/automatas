"use client";

import { MotionConfig } from "motion/react";

/** Gerbia vartotojo „mažiau judesio“ nustatymą visoms Motion animacijoms. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
