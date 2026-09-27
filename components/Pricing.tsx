"use client";

import { MessageCircle } from "lucide-react";
import { CONTACT, Content, Lang } from "./content";

interface PricingProps {
  lang: Lang;
  t: Content;
}

export default function Pricing({ lang, t }: PricingProps) {
  const orderLink = (planTitle: string, price: string) => {
    const message =
      lang === "hi"
        ? `नमस्ते, मुझे "${planTitle}" (${price}) ऑर्डर करना है। कृपया जानकारी दें।`
        : `Hi, I'd like to order "${planTitle}" (${price}). Please share the details.`;
    return `https://wa.me/${CONTACT.phoneIntl}?text=${encodeURIComponent(message)}`;
  };

  const closingMessage =
    lang === "hi"
      ? "नमस्ते, मुझे योग क्लास के बारे में जानकारी चाहिए।"
      : "Hi, I'd like to know more about your yoga classes.";
  const closingLink = `https://wa.me/${CONTACT.phoneIntl}?text=${encodeURIComponent(closingMessage)}`;

  return (
    <section id="pricing" className="py-24 bg-white border-t border-amber-900/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-600/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-amber-900">
            {t.pricing.tag}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E1B18] font-normal tracking-tight">{t.pricing.title}</h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">{t.pricing.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.pricing.plans.map((plan) => (
            <div
              key={plan.id}
              className="relative flex flex-col rounded-3xl border border-amber-900/10 bg-[#FAF8F5] p-6 shadow-sm transition hover:shadow-lg"
            >
              {plan.badge && (
                <span className="absolute -top-3 right-6 rounded-full bg-gradient-to-r from-[#D97706] to-[#B45309] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-md">
                  {plan.badge}
                </span>
              )}
              <h3 className="font-serif text-lg font-semibold text-stone-900">{plan.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{plan.desc}</p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-amber-700">{plan.price}</span>
                {plan.originalPrice && <span className="text-sm text-stone-400 line-through">{plan.originalPrice}</span>}
              </div>
              <a
                href={orderLink(plan.title, plan.price)}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:brightness-110 active:scale-[0.99]"
              >
                <MessageCircle className="h-4 w-4" />
                {t.pricing.orderBtn}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-14 space-y-4 text-center">
          <p className="text-sm text-stone-600 sm:text-base">{t.pricing.closingCta}</p>
          <a
            href={closingLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-600/30 bg-emerald-50 px-5 py-2.5 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100"
          >
            <MessageCircle className="h-4 w-4" />
            {t.pricing.closingBtn}
          </a>
        </div>
      </div>
    </section>
  );
}
