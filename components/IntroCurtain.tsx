"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const SESSION_KEY = "yg_intro_shown";

interface IntroCurtainProps {
  onDone: () => void;
}

export default function IntroCurtain({ onDone }: IntroCurtainProps) {
  const [phase, setPhase] = useState<"drawing" | "reveal" | "done">("drawing");
  const [skip, setSkip] = useState<boolean | null>(null);
  // React StrictMode double-invokes effects in dev (mount -> cleanup -> mount
  // again). Reading + writing sessionStorage on every invocation would make
  // the second invocation see the first invocation's own write and wrongly
  // conclude "already shown". Caching the decision in a ref (which survives
  // the double-invoke, unlike a plain closure variable) keeps it stable.
  const decisionRef = useRef<{ skip: boolean } | null>(null);

  useEffect(() => {
    // `skip` starts `null` so server and first client render agree (no overlay
    // markup either way) — this effect is the earliest point matchMedia/
    // sessionStorage exist, so setting real state here (rather than via a lazy
    // useState initializer) is required to avoid a hydration mismatch.
    if (!decisionRef.current) {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const alreadyShown = sessionStorage.getItem(SESSION_KEY) === "1";
      const shouldSkip = reduced || alreadyShown;
      decisionRef.current = { skip: shouldSkip };
      if (!shouldSkip) sessionStorage.setItem(SESSION_KEY, "1");
    }

    const { skip: shouldSkip } = decisionRef.current;
    setSkip(shouldSkip);
    if (shouldSkip) {
      onDone();
      return;
    }
    const toReveal = setTimeout(() => setPhase("reveal"), 1900);
    return () => clearTimeout(toReveal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (skip !== false || phase === "done") return null;

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#12100D]"
      initial={{ clipPath: "circle(150% at 50% 50%)" }}
      animate={{ clipPath: phase === "reveal" ? "circle(0% at 50% 50%)" : "circle(150% at 50% 50%)" }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (phase === "reveal") {
          setPhase("done");
          onDone();
        }
      }}
    >
      <motion.div
        className="flex flex-col items-center justify-center gap-4"
        animate={{ opacity: phase === "reveal" ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative flex h-32 w-32 sm:h-44 sm:w-44 items-center justify-center">
          <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full -rotate-90">
            <motion.circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0.9 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
            />
          </svg>
          <motion.span
            className="font-serif text-6xl sm:text-7xl text-amber-400 select-none"
            initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
          >
            ॐ
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
}
