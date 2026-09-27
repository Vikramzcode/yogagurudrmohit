"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { CONTACT, Content, Lang } from "./content";

interface FooterProps {
  lang: Lang;
  t: Content;
  scrollToSection: (id: string) => void;
  onOpenBooking: () => void;
}

export default function Footer({ lang, t, scrollToSection, onOpenBooking }: FooterProps) {
  return (
    <footer className="border-t border-amber-900/15 bg-[#1A1714] text-stone-400 py-16 px-4 sm:px-6 text-xs">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 pb-10 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border-2 border-amber-500/50">
              <Image src="/images/kukkutasana-record.jpg" alt="Dr. Mohit Tawar" fill sizes="40px" className="object-cover" />
            </div>
            <div className="text-left">
              <p className="font-serif text-lg font-bold text-white">{lang === "hi" ? "डॉ. मोहित तवर" : "Dr. Mohit Tawar"}</p>
              <p className="text-[11px] text-amber-200/80">{t.footer.tagline}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2 text-stone-300">
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-amber-500 shrink-0" />
              <span>{t.footer.addressLabel}: {CONTACT.city}</span>
            </div>
            <a href={`tel:+${CONTACT.phoneIntl}`} className="flex items-center gap-2 hover:text-amber-400">
              <Phone className="h-3.5 w-3.5 text-amber-500 shrink-0" />
              <span>{t.footer.phoneLabel}: {CONTACT.phoneDisplay}</span>
            </a>
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 hover:text-amber-400 sm:col-span-2">
              <Mail className="h-3.5 w-3.5 text-amber-500 shrink-0" />
              <span>{t.footer.emailLabel}: {CONTACT.email}</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8">
          <div className="flex flex-wrap justify-center gap-6 text-stone-300">
            <button onClick={() => scrollToSection("protocols")} className="hover:text-amber-400">
              {t.nav.protocols}
            </button>
            <button onClick={() => scrollToSection("bio-pacer")} className="hover:text-amber-400">
              {t.nav.pacer}
            </button>
            <button onClick={() => scrollToSection("credentials")} className="hover:text-amber-400">
              {t.nav.credentials}
            </button>
            <button onClick={() => scrollToSection("gallery")} className="hover:text-amber-400">
              {t.nav.gallery}
            </button>
            <button onClick={() => scrollToSection("pricing")} className="hover:text-amber-400">
              {t.nav.pricing}
            </button>
            <button onClick={onOpenBooking} className="hover:text-amber-400 font-semibold text-amber-300">
              {t.nav.consultation}
            </button>
          </div>

          <p className="text-stone-500 text-center md:text-right">
            &copy; {new Date().getFullYear()} {lang === "hi" ? "डॉ. मोहित तवर" : "Dr. Mohit Tawar"}. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
