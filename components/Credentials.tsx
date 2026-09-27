"use client";

import { Award, ShieldCheck } from "lucide-react";
import { Content, Lang } from "./content";

interface CredentialsProps {
  lang: Lang;
  t: Content;
}

export default function Credentials({ lang, t }: CredentialsProps) {
  return (
    <section id="credentials" className="py-24 bg-white border-t border-amber-900/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-amber-900/15 bg-[#FAF8F5] p-8 shadow-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#854D0E]">{t.credentials.qualTitle}</span>
              <h3 className="mt-2 font-serif text-3xl text-stone-900 font-normal">
                {lang === "hi" ? "डॉ. मोहित कुमार तवर" : "Dr. Mohit Kumar Tawar"}
              </h3>
              <p className="text-xs text-stone-500 mt-1">{t.credentials.cityTag}</p>

              <div className="mt-6 space-y-4">
                {t.credentials.list.map((item, index) => (
                  <div key={index} className="flex gap-3.5">
                    <ShieldCheck className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-stone-900">{item.degree}</p>
                      <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-600/20 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-amber-900">
              <Award className="h-3.5 w-3.5 text-amber-700" />
              {t.credentials.tag}
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl text-[#1E1B18] font-normal leading-tight">{t.credentials.title}</h2>

            <p className="text-stone-700 leading-relaxed text-sm sm:text-base">{t.credentials.desc}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {t.credentials.records.map((rec, i) => (
                <div key={i} className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-5">
                  <div className="flex items-center gap-2 text-amber-800 font-bold text-sm mb-1">
                    <Award className="h-4 w-4" />
                    <span>{rec.title}</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">{rec.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {t.credentials.stats.map((st, i) => (
                <div key={i} className="border-l-2 border-amber-600/40 pl-3">
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">{st.num}</p>
                  <p className="text-xs text-stone-500 font-medium">{st.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
