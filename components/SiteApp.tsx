"use client";

import { useCallback, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import IntroCurtain from "./IntroCurtain";
import BioPacer from "./BioPacer";
import Protocols from "./Protocols";
import Credentials from "./Credentials";
import Gallery from "./Gallery";
import Footer from "./Footer";
import BookingModal from "./BookingModal";
import { BILINGUAL_CONTENT, Lang } from "./content";

export default function SiteApp() {
  const [lang, setLang] = useState<Lang>("hi");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedProtocolForBooking, setSelectedProtocolForBooking] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  const t = BILINGUAL_CONTENT[lang];
  const handleIntroDone = useCallback(() => setIntroComplete(true), []);

  // Keep the document's lang attribute (set to "hi" by default in the root
  // layout) in sync once the user actually toggles it client-side.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const handleOpenBooking = (protocolName = "") => {
    setSelectedProtocolForBooking(protocolName);
    setIsBookingOpen(true);
  };

  const toggleLanguage = () => setLang((prev) => (prev === "hi" ? "en" : "hi"));

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E1B18] font-sans antialiased selection:bg-amber-400/30 selection:text-amber-950">
      <IntroCurtain onDone={handleIntroDone} />

      <Navbar
        lang={lang}
        t={t}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        toggleLanguage={toggleLanguage}
        scrollToSection={scrollToSection}
        onOpenBooking={() => handleOpenBooking("")}
      />

      <Hero
        lang={lang}
        t={t}
        introComplete={introComplete}
        onOpenBooking={() => handleOpenBooking("")}
        onStartBreathing={() => scrollToSection("bio-pacer")}
      />

      <BioPacer t={t} />

      <Protocols lang={lang} t={t} onSelectProtocol={(title) => handleOpenBooking(title)} />

      <Credentials lang={lang} t={t} />

      <Gallery t={t} />

      <Footer lang={lang} t={t} scrollToSection={scrollToSection} onOpenBooking={() => handleOpenBooking("")} />

      <BookingModal
        key={`${selectedProtocolForBooking}-${isBookingOpen}`}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        prefilledProtocol={selectedProtocolForBooking}
        lang={lang}
        t={t}
      />
    </div>
  );
}
