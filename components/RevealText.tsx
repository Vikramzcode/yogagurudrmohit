"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

// Splits by Unicode grapheme cluster (via Intl.Segmenter when available) rather
// than raw JS characters, so Devanagari matras/conjuncts stay attached to their
// base consonant instead of animating in as detached, broken glyphs.
function graphemes(text: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    return Array.from(segmenter.segment(text), (s) => s.segment);
  }
  return [text];
}

const charVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

interface RevealTextProps {
  text: string;
  start: boolean;
  as?: "span";
  className?: string;
  delayStart?: number;
  staggerMs?: number;
}

export default function RevealText({ text, start, className, delayStart = 0, staggerMs = 0.018 }: RevealTextProps) {
  const parts = useMemo(() => graphemes(text), [text]);

  return (
    <span className={className} aria-label={text}>
      {parts.map((ch, i) => (
        <motion.span
          key={`${text}-${i}`}
          aria-hidden="true"
          variants={charVariants}
          initial="hidden"
          animate={start ? "visible" : "hidden"}
          transition={{ duration: 0.5, delay: delayStart + i * staggerMs, ease: "easeOut" }}
          style={{ display: "inline-block" }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </span>
  );
}
