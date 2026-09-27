"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Mail, MessageCircle, Send, Sparkle, X } from "lucide-react";
import { CONTACT, Content, Lang } from "./content";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledProtocol: string;
  lang: Lang;
  t: Content;
}

export default function BookingModal({ isOpen, onClose, prefilledProtocol, lang, t }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    topic: prefilledProtocol || t.protocols.items[0].title,
    mode: t.booking.modes[0],
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const buildMessage = () => {
    const lines = [
      lang === "hi" ? "नमस्ते डॉ. मोहित तवर, मैं परामर्श हेतु सम्पर्क कर रहा/रही हूँ।" : "Namaste Dr. Mohit Tawar, I would like to request a consultation.",
      `${t.booking.fullName}: ${formData.name}`,
      `${t.booking.phone}: ${formData.phone}`,
      `${t.booking.city}: ${formData.city}`,
      `${t.booking.topic}: ${formData.topic}`,
      `${t.booking.mode}: ${formData.mode}`,
    ];
    if (formData.notes) lines.push(`${t.booking.notes}: ${formData.notes}`);
    return lines.join("\n");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = encodeURIComponent(buildMessage());
    window.open(`https://wa.me/${CONTACT.phoneIntl}?text=${message}`, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  const mailHref = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
    lang === "hi" ? "परामर्श अनुरोध" : "Consultation Request"
  )}&body=${encodeURIComponent(buildMessage())}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-[#FAF8F5] p-6 sm:p-8 shadow-2xl border border-amber-900/10 my-8"
      >
        <button onClick={onClose} className="absolute top-5 right-5 rounded-full p-2 text-stone-400 hover:bg-stone-200 hover:text-stone-700 transition" aria-label="Close">
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h4 className="font-serif text-2xl text-stone-900 font-medium">{t.booking.successTitle}</h4>
            <p className="text-sm text-stone-600 max-w-md mx-auto">{t.booking.successDesc}</p>
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-xl bg-stone-900 text-white px-5 py-2.5 text-sm font-semibold hover:bg-stone-800 transition"
            >
              {lang === "hi" ? "बंद करें" : "Close"}
            </button>
          </div>
        ) : (
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-900 mb-2">
              <Sparkle className="h-3 w-3 text-amber-700" />
              {t.booking.modalBadge}
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-stone-900">{t.booking.modalTitle}</h3>
            <p className="text-xs text-stone-500 mt-1">{t.booking.modalSub}</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">{t.booking.fullName}</label>
                <input
                  type="text"
                  required
                  placeholder={lang === "hi" ? "उदा. श्रीमती वंदना शर्मा" : "e.g. Smt. Vandana Sharma"}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">{t.booking.phone}</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98260 12345"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">{t.booking.city}</label>
                  <input
                    type="text"
                    required
                    placeholder={lang === "hi" ? "भोपाल / इंदौर / दिल्ली" : "Bhopal / London / New Delhi"}
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">{t.booking.mode}</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {t.booking.modes.map((mode) => (
                    <button
                      type="button"
                      key={mode}
                      onClick={() => setFormData({ ...formData, mode })}
                      className={`rounded-xl border px-4 py-2.5 text-xs font-semibold text-left transition ${
                        formData.mode === mode ? "border-amber-600 bg-amber-50 text-amber-900" : "border-stone-300 bg-white text-stone-600 hover:border-amber-400"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">{t.booking.topic}</label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-800 focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
                >
                  {t.protocols.items.map((p) => (
                    <option key={p.id} value={p.title}>
                      {p.title}
                    </option>
                  ))}
                  <option value="General Spine/Joint & Astrological Vastu">
                    {lang === "hi" ? "रीढ़ की हड्डी, जोड़ों का दर्द एवं वास्तु परामर्श" : "Spine, Sciatica, Joints & Medical Vastu"}
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">{t.booking.notes}</label>
                <textarea
                  rows={3}
                  placeholder={lang === "hi" ? "रोग का समय, पूर्व जांच अथवा वर्तमान स्थिति का उल्लेख करें..." : "Mention diagnosed stage, duration of pain, or primary goals..."}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm text-stone-800 placeholder-stone-400 focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] px-6 py-3.5 font-semibold text-white shadow-lg transition hover:brightness-110 active:scale-[0.99]"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>{t.booking.submitBtn}</span>
                </button>
                <a
                  href={mailHref}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-3.5 text-sm font-semibold text-stone-700 hover:bg-stone-50 transition"
                >
                  <Mail className="h-4 w-4" />
                  <span>{t.booking.submitEmailBtn}</span>
                </a>
              </div>

              <p className="text-[11px] text-stone-500 pt-1 flex items-start gap-1.5">
                <Send className="h-3 w-3 mt-0.5 shrink-0" />
                {t.booking.disclaimer}
              </p>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
}
