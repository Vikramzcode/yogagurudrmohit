"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Globe2, Menu, X } from "lucide-react";
import Image from "next/image";
import { Content, Lang } from "./content";

interface NavbarProps {
  lang: Lang;
  t: Content;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
  toggleLanguage: () => void;
  scrollToSection: (id: string) => void;
  onOpenBooking: () => void;
}

export default function Navbar({
  lang,
  t,
  mobileMenuOpen,
  setMobileMenuOpen,
  toggleLanguage,
  scrollToSection,
  onOpenBooking,
}: NavbarProps) {
  return (
    <>
      <div className="bg-[#1A1714] text-amber-200/90 py-2 px-4 text-center text-xs tracking-wider uppercase font-medium flex items-center justify-center gap-3 border-b border-amber-900/30">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
        <span>{t.topBanner.left}</span>
        <span className="hidden md:inline text-stone-500">|</span>
        <span className="hidden md:inline text-amber-300/80">{t.topBanner.right}</span>
      </div>

      <nav className="sticky top-0 z-40 border-b border-amber-900/10 bg-[#FAF8F5]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3.5">
          <button
            type="button"
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border-2 border-amber-500/50 shadow-md">
              <Image src="/images/kukkutasana-record.jpg" alt="Dr. Mohit Tawar" fill sizes="44px" className="object-cover" />
            </div>
            <div className="text-left">
              <span className="block font-serif text-lg sm:text-xl font-bold tracking-tight text-[#1E1B18]">
                {lang === "hi" ? "डॉ. मोहित तवर" : "Dr. Mohit Tawar"}
              </span>
              <span className="block text-[10px] uppercase font-semibold tracking-wider text-amber-800">
                {t.nav.brandSub}
              </span>
            </div>
          </button>

          <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-700">
            <button onClick={() => scrollToSection("protocols")} className="transition hover:text-amber-800">
              {t.nav.protocols}
            </button>
            <button onClick={() => scrollToSection("bio-pacer")} className="transition hover:text-amber-800">
              {t.nav.pacer}
            </button>
            <button onClick={() => scrollToSection("credentials")} className="transition hover:text-amber-800">
              {t.nav.credentials}
            </button>
            <button onClick={() => scrollToSection("gallery")} className="transition hover:text-amber-800">
              {t.nav.gallery}
            </button>
            <button onClick={() => scrollToSection("pricing")} className="transition hover:text-amber-800">
              {t.nav.pricing}
            </button>
            <button onClick={() => scrollToSection("reviews")} className="transition hover:text-amber-800">
              {t.nav.reviews}
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-2 rounded-full border border-amber-900/15 bg-white px-3.5 py-1.5 text-xs font-semibold text-stone-800 shadow-sm transition hover:border-amber-500 hover:bg-amber-50/50"
              title="Toggle Natural Hindi / English"
            >
              <Globe2 className="h-3.5 w-3.5 text-amber-700" />
              <span>{t.nav.langSwitch}</span>
            </button>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D97706] to-[#B45309] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:brightness-110 active:scale-95"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>{t.nav.bookBtn}</span>
            </button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleLanguage}
              className="rounded-full border border-amber-900/15 bg-white px-3 py-1.5 text-xs font-bold text-stone-800 shadow-sm"
            >
              {lang === "hi" ? "EN" : "हिन्दी"}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-stone-700 hover:bg-stone-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-stone-200 bg-[#FAF8F5] px-6 py-5 space-y-4 text-left shadow-lg overflow-hidden"
            >
              <button onClick={() => scrollToSection("protocols")} className="block w-full text-left text-sm font-medium text-stone-800">
                {t.nav.protocols}
              </button>
              <button onClick={() => scrollToSection("bio-pacer")} className="block w-full text-left text-sm font-medium text-stone-800">
                {t.nav.pacer}
              </button>
              <button onClick={() => scrollToSection("credentials")} className="block w-full text-left text-sm font-medium text-stone-800">
                {t.nav.credentials}
              </button>
              <button onClick={() => scrollToSection("gallery")} className="block w-full text-left text-sm font-medium text-stone-800">
                {t.nav.gallery}
              </button>
              <button onClick={() => scrollToSection("pricing")} className="block w-full text-left text-sm font-medium text-stone-800">
                {t.nav.pricing}
              </button>
              <button onClick={() => scrollToSection("reviews")} className="block w-full text-left text-sm font-medium text-stone-800">
                {t.nav.reviews}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full text-center rounded-xl bg-gradient-to-r from-[#D97706] to-[#B45309] py-3 text-xs uppercase font-bold text-white tracking-wider shadow-md"
              >
                {t.nav.bookBtn}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
