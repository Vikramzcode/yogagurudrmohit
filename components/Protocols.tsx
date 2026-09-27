"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, HeartPulse, Info } from "lucide-react";
import { Content, Lang } from "./content";

interface ProtocolsProps {
  lang: Lang;
  t: Content;
  onSelectProtocol: (title: string) => void;
}

export default function Protocols({ lang, t, onSelectProtocol }: ProtocolsProps) {
  const [activeTab, setActiveTab] = useState(t.protocols.items[0].id);

  const current = useMemo(
    () => t.protocols.items.find((p) => p.id === activeTab) ?? t.protocols.items[0],
    [t, activeTab]
  );

  return (
    <section id="protocols" className="py-24 bg-[#FAF8F5]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-600/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-amber-900">
            <HeartPulse className="h-3.5 w-3.5 text-amber-700" />
            {t.protocols.tag}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E1B18] font-normal tracking-tight">{t.protocols.title}</h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">{t.protocols.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {t.protocols.items.map((protocol) => (
            <button
              key={protocol.id}
              onClick={() => setActiveTab(protocol.id)}
              className={`rounded-2xl p-4 text-left transition-all duration-300 border ${
                activeTab === protocol.id
                  ? "bg-white border-amber-600/40 shadow-xl ring-2 ring-amber-500/20"
                  : "bg-stone-100/70 border-stone-200 text-stone-600 hover:bg-white"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800">{protocol.views}</span>
                {activeTab === protocol.id && <CheckCircle2 className="h-4 w-4 text-amber-600" />}
              </div>
              <h4 className="font-serif text-xs sm:text-sm font-semibold text-stone-900 line-clamp-1">{protocol.tabTitle}</h4>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${current.id}-${lang}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl border border-amber-900/10 bg-white p-8 sm:p-12 shadow-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5 text-left">
                <div className="inline-block rounded-full bg-amber-100 px-3.5 py-1 text-xs font-bold text-amber-900">{current.subtitle}</div>
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-stone-900 font-normal">{current.title}</h3>
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed">{current.summary}</p>

                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3">
                    {lang === "hi" ? "चिकित्सीय अभ्यास एवं वैज्ञानिक क्रियाएं" : "Key Clinical Interventions"}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {current.points.map((point, index) => (
                      <div key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-800">
                        <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => onSelectProtocol(current.title)}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D97706] to-[#B45309] px-6 py-3.5 text-xs sm:text-sm font-semibold text-white shadow-md transition hover:brightness-110 active:scale-95"
                  >
                    <span>{t.protocols.exploreBtn}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <span className="text-xs text-stone-500 font-medium">
                    {lang === "hi" ? "भोपाल क्लिनिक अथवा ऑनलाइन वीडियो परामर्श" : "Bhopal In-Person or Worldwide HD Video"}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-[#FAF8F5] via-amber-50/60 to-white p-7 border border-amber-200/50 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-600 text-white font-serif font-bold text-xl shadow-md">ॐ</div>
                    <div>
                      <h4 className="font-serif font-bold text-stone-900 text-base">{t.protocols.shastraHeader}</h4>
                      <p className="text-xs text-amber-900 font-medium">{current.quoteRef}</p>
                    </div>
                  </div>

                  <blockquote className="border-l-2 border-amber-600 pl-4 py-1 text-xs sm:text-sm italic text-stone-700 leading-relaxed">
                    &ldquo;{current.quote}&rdquo;
                  </blockquote>
                </div>

                <div className="mt-8 pt-4 border-t border-amber-200/40 flex items-center justify-between text-xs text-stone-600">
                  <span>{lang === "hi" ? "सघन निगरानी बैच" : "Personal Mentorship"}</span>
                  <span className="font-bold text-amber-800">{t.protocols.mentorshipBadge}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex items-start gap-2.5 rounded-2xl border border-amber-900/10 bg-amber-50/50 px-5 py-4 text-xs text-stone-600 max-w-4xl mx-auto">
          <Info className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
          <span>{t.protocols.disclaimer}</span>
        </div>
      </div>
    </section>
  );
}
