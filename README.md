# Dr. Mohit Tawar — Official Web Platform

Bilingual (Hindi/English) marketing + consultation-booking site for Dr. Mohit Tawar (Ph.D. in Yoga, BHMS, Guinness World Record holder), built from [PRD.md](PRD.md).

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion (parallax hero, transitions)
- Web Audio API (136.1 Hz Bhramari bio-pacer tone)
- lucide-react icons

## Structure

```
app/                 Root layout, home page, metadata, sitemap/robots, favicon
components/          All UI sections + bilingual content (content.ts) + audio engine
public/images/       Real photos of Dr. Mohit Tawar (hero, Kukkutasana record, teaching, group class)
public/videos/       Breathing-guide and meditation animation clips
PRD.md               Product requirements this build implements
```

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Notable implementation choices

- **Consultation booking** has no backend — submitting the form opens a prefilled WhatsApp chat (`wa.me/918770172634`) and offers a `mailto:` fallback to `dr.mohittawar@gmail.com`. This was chosen over a server API since no email/WhatsApp Business API credentials were available; wiring a real backend later just means replacing the `handleSubmit` in `components/BookingModal.tsx`.
- **Social follower/subscriber counts** are hardcoded content in `components/content.ts` (`credentials.stats`), not live-fetched — refresh manually as the numbers change, or wire the Instagram/YouTube APIs if that becomes a priority.
- **Single-page IA** (anchor-scroll sections: Hero, Bio-Pacer, Protocols, Credentials, Gallery) rather than separate routes per PRD's original sketch — matches how this kind of personal-practice/consultation site is normally structured and keeps the booking CTA always one scroll away.

## Before going live

- Swap placeholder metadata `metadataBase` URL in `app/layout.tsx` if the final domain differs from `yogagurudrmohit.com`.
- Re-verify follower/view-count stats in `components/content.ts` against current Instagram/YouTube numbers.
- Confirm image usage rights for any additional media added to `public/images/`.
- Set up a real booking backend (WhatsApp Business API and/or transactional email) if the `wa.me` deep-link flow isn't sufficient at scale.

## Deploy

Any Next.js host (Vercel, Cloudflare Pages) works out of the box:

```bash
npm run build
npm run start
```
