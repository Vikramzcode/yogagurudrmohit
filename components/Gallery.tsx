"use client";

import Image from "next/image";
import { AtSign, ExternalLink, PlaySquare } from "lucide-react";
import { CONTACT, Content } from "./content";

interface GalleryProps {
  t: Content;
}

export default function Gallery({ t }: GalleryProps) {
  return (
    <section id="gallery" className="py-24 bg-[#FAF8F5] border-t border-amber-900/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-600/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-amber-900">
            {t.gallery.tag}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E1B18] font-normal tracking-tight">{t.gallery.title}</h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">{t.gallery.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {t.gallery.items.map((item, i) => (
            <div key={i} className="group relative overflow-hidden rounded-3xl border border-amber-900/10 shadow-lg bg-white">
              <div className="relative h-72 w-full">
                <Image
                  src={item.image}
                  alt={item.caption}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              </div>
              <p className="absolute bottom-3 inset-x-3 text-xs sm:text-sm font-medium text-white leading-snug">{item.caption}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
          <span className="text-stone-600 font-medium">{t.gallery.socialCta}</span>
          <div className="flex items-center gap-3">
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-amber-900/15 bg-white px-4 py-2 text-xs font-semibold text-stone-800 shadow-sm hover:border-amber-500 transition"
            >
              <AtSign className="h-4 w-4 text-amber-700" />
              Instagram
              <ExternalLink className="h-3 w-3 text-stone-400" />
            </a>
            <a
              href={CONTACT.youtube}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-amber-900/15 bg-white px-4 py-2 text-xs font-semibold text-stone-800 shadow-sm hover:border-amber-500 transition"
            >
              <PlaySquare className="h-4 w-4 text-amber-700" />
              YouTube
              <ExternalLink className="h-3 w-3 text-stone-400" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
