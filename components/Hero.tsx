"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Award, BookOpen, HeartPulse, Star, Wind } from "lucide-react";
import Image from "next/image";
import RevealText from "./RevealText";
import { Content, Lang } from "./content";

interface HeroProps {
  lang: Lang;
  t: Content;
  introComplete: boolean;
  onOpenBooking: () => void;
  onStartBreathing: () => void;
}

export default function Hero({ t, introComplete, onOpenBooking, onStartBreathing }: HeroProps) {
  const [reducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  return (
    <section className="relative min-h-[85vh] md:min-h-screen w-full overflow-hidden">
      {reducedMotion ? (
        <Image
          src="/images/hero-meditation.png"
          alt="Dr. Mohit Tawar meditating, saffron mist swirling around him"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_18%]"
        />
      ) : (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/hero-meditation.png"
          aria-label="Dr. Mohit Tawar meditating, saffron mist swirling around him"
          className="absolute inset-0 h-full w-full object-cover object-[center_18%]"
        >
          <source src="/videos/hero-loop.mp4" type="video/mp4" />
        </video>
      )}

      {/* Scrims for text legibility over the photo */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/10 to-transparent" />

      {/* Credential badges, top right */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: introComplete ? 1 : 0, y: introComplete ? 0 : -12 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="absolute top-24 sm:top-28 right-4 sm:right-8 z-10 flex flex-col items-end gap-3"
      >
        <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-black/40 backdrop-blur-md px-4 py-3 shadow-xl">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-white">
            <Award className="h-4 w-4" />
          </div>
          <div className="text-left pr-1">
            <p className="text-[10px] uppercase font-bold tracking-wider text-amber-300">{t.hero.record1Title}</p>
            <p className="text-xs font-serif font-semibold text-white">{t.hero.record1Sub}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-black/40 backdrop-blur-md px-4 py-3 shadow-xl">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15 text-amber-200">
            <BookOpen className="h-4 w-4" />
          </div>
          <div className="text-left pr-1">
            <p className="text-[10px] uppercase font-bold tracking-wider text-stone-300">{t.hero.record2Title}</p>
            <p className="text-xs font-serif font-semibold text-white">{t.hero.record2Sub}</p>
          </div>
        </div>
      </motion.div>

      {/* Credential badges, bottom right (hidden on small screens to avoid crowding the text) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: introComplete ? 1 : 0, y: introComplete ? 0 : 12 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="absolute bottom-44 right-4 sm:right-8 z-10 hidden sm:flex flex-col items-end gap-3"
      >
        <div className="flex items-center gap-2.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md px-4 py-2 shadow-xl">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span className="text-xs font-medium text-white">{t.hero.record3Sub}</span>
        </div>
        <div className="flex items-center gap-2.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md px-4 py-2 shadow-xl">
          <HeartPulse className="h-4 w-4 text-rose-400 animate-pulse" />
          <span className="text-xs font-medium text-white">{t.hero.rhythmLabel}</span>
        </div>
      </motion.div>

      {/* Text content, bottom left */}
      <div className="relative z-10 flex min-h-[85vh] md:min-h-screen w-full items-end">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 pb-16 sm:pb-20 md:pb-24">
          <div className="max-w-xl space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: introComplete ? 1 : 0, y: introComplete ? 0 : 18 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 backdrop-blur-md px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-200"
            >
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
              <span>{t.hero.badge}</span>
            </motion.div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-light tracking-tight leading-[1.15]">
              <RevealText text={t.hero.titleMain} start={introComplete} delayStart={0.1} />
              <br />
              <RevealText
                text={t.hero.titleAccent}
                start={introComplete}
                delayStart={0.1 + t.hero.titleMain.length * 0.018 + 0.15}
                className="font-normal italic text-amber-300"
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: introComplete ? 1 : 0, y: introComplete ? 0 : 22 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="text-stone-200 text-sm sm:text-base leading-relaxed max-w-lg"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: introComplete ? 1 : 0, y: introComplete ? 0 : 22 }}
              transition={{ duration: 0.7, delay: 1.05 }}
              className="flex flex-wrap items-center gap-3.5 pt-2"
            >
              <button
                onClick={onOpenBooking}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#D97706] to-[#B45309] px-7 py-3.5 text-sm font-semibold tracking-wide text-white shadow-xl shadow-amber-900/30 transition-all duration-300 hover:shadow-2xl hover:brightness-110 active:scale-95"
              >
                <span>{t.hero.ctaPrimary}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onStartBreathing}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-5 py-3.5 text-sm font-medium text-white transition hover:bg-white/20"
              >
                <Wind className="h-4 w-4 text-amber-300" />
                <span>{t.hero.ctaSecondary}</span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
