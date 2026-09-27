"use client";

import { ExternalLink, Star } from "lucide-react";
import { CONTACT, Content } from "./content";

interface ReviewsProps {
  t: Content;
}

function Stars() {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
      ))}
    </div>
  );
}

export default function Reviews({ t }: ReviewsProps) {
  return (
    <section id="reviews" className="py-24 bg-[#FAF8F5] border-t border-amber-900/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-600/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-amber-900">
            {t.reviews.tag}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E1B18] font-normal tracking-tight">{t.reviews.title}</h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">{t.reviews.subtitle}</p>

          <div className="flex items-center justify-center gap-3 pt-2">
            <span className="font-serif text-3xl font-bold text-stone-900">{t.reviews.ratingValue}</span>
            <div className="flex flex-col items-start">
              <Stars />
              <span className="text-xs text-stone-500 font-medium">{t.reviews.ratingCount}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.reviews.items.map((review, i) => (
            <div key={i} className="flex flex-col rounded-3xl border border-amber-900/10 bg-white p-6 shadow-sm">
              <Stars />
              <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-700">&ldquo;{review.text}&rdquo;</p>
              {review.ownerReply && (
                <div className="mt-3 rounded-xl bg-amber-50 border border-amber-600/15 px-3 py-2 text-xs text-amber-900">
                  <span className="font-bold">{t.reviews.ownerReplyLabel} </span>
                  &ldquo;{review.ownerReply}&rdquo;
                </div>
              )}
              <div className="mt-4 pt-4 border-t border-stone-100">
                <p className="text-sm font-semibold text-stone-900">{review.name}</p>
                <p className="text-xs text-stone-500">
                  {review.meta} · {review.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={CONTACT.googleReviewsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-amber-900/15 bg-white px-5 py-2.5 text-sm font-semibold text-stone-800 shadow-sm hover:border-amber-500 transition"
          >
            {t.reviews.viewAllBtn}
            <ExternalLink className="h-3.5 w-3.5 text-stone-400" />
          </a>
        </div>
      </div>
    </section>
  );
}
