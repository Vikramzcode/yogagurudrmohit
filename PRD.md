# Product Requirements Document
## Dr. Mohit Tawar — Official Web Platform (yogagurudrmohit.com)

| | |
|---|---|
| **Owner** | Dr. Mohit Kumar Tawar (Yoga Guru Dr Mohit) |
| **Contact (Phone / WhatsApp)** | +91 87701 72634 |
| **Contact (Email)** | dr.mohittawar@gmail.com |
| **Location / Base of Operations** | Bhopal, Madhya Pradesh, India |
| **Document status** | Draft v1.0 |
| **Last updated** | 2026-09-26 |

---

## 1. Overview

Dr. Mohit Tawar is a Ph.D.-qualified yoga therapist, Guinness World Record holder, and clinical yoga educator with a large verified social following (480K+ Instagram, 51K+ YouTube subscribers, multiple videos exceeding 1M views). His current online presence is fragmented across Instagram, YouTube, and third-party listing sites (Justdial), with no owned platform that consolidates his credentials, therapeutic protocols, and consultation booking flow.

This PRD defines the requirements for **yogagurudrmohit.com** — a single, authoritative, bilingual (Hindi/English) web platform that:

1. Establishes clinical and academic credibility (degrees, records, media proof).
2. Presents his signature therapeutic yoga protocols in an interactive, educational format.
3. Converts visitors into booked tele-health or in-person OPD consultations.

---

## 2. Goals & Success Metrics

| Goal | Metric | Target |
|---|---|---|
| Establish authority/credibility | Time on "Clinical Protocols" pages | > 90 seconds avg. |
| Drive consultation bookings | Booking form submissions/month | Baseline + track from launch |
| Reduce reliance on third-party listings | % of bookings originating from site vs. Justdial/DM | Increase site share over 3 months |
| Bilingual reach | Hindi vs. English page-view split | Both segments actively used (not <20% either) |
| Mobile performance | Core Web Vitals (mobile) | LCP < 2.5s, CLS < 0.1 |

**Non-goals (out of scope for v1):**
- E-commerce / product sales (books, courses for purchase) — may be phase 2.
- User accounts / patient portal with login.
- Full EHR-grade medical record storage (only file upload for intake, not a compliance-grade vault).

---

## 3. Target Users / Personas

1. **Prospective patient (India, Hindi-first)** — searching for non-surgical relief for a specific condition (uterine prolapse, prostate issues, back pain), wants to see proof it works and book a slot in Hindi.
2. **Prospective patient (NRI / global, English-first)** — found Dr. Mohit via YouTube/Instagram, wants credentials verified and prefers online video consultation.
3. **Existing follower / student** — wants deeper protocol breakdowns, mudra guidance, and the bio-pacer breathing tool.
4. **Media / institutional contact** — journalists, NCISM, event organizers verifying credentials and record claims.

---

## 4. Information Architecture

```
Home (Cinematic entry + parallax hero)
├── About / Credentials (Academic lineage, world records, social proof)
├── Clinical Protocols
│   ├── Uterine Prolapse Protocol
│   ├── Prostate & Lower Urinary Tract Protocol
│   ├── Kukkutasana / World Record Biomechanics
│   └── Hasta Mudra Vigyan (Mudra guide)
├── Bio-Pacer (136.1 Hz interactive breathing tool)
├── Hall of Recognition (lineage, media, certificates)
├── Consultation / Booking (Tele-health + OPD)
├── Media (YouTube embeds, Instagram feed, press)
└── Contact
```

Language toggle (HI/EN) persists across all routes; content is authored natively in both languages, not machine-translated.

---

## 5. Functional Requirements

### 5.1 Cinematic Entry & Hero (Phase 1)
- One-time (session-scoped) intro animation: full-screen veil → animated ॐ glyph draw-on → radial reveal transition.
- Skippable/dismissible for repeat visitors and for accessibility (respect `prefers-reduced-motion`).
- 2.5D parallax hero with layered background/midground/foreground/UI elements, responding to mouse move (desktop) and device-orientation/gyroscope (mobile), with a graceful static fallback when motion/orientation APIs are unavailable or permission is denied.
- Bilingual staggered headline reveal (Hindi + English).

### 5.2 Bilingual Content System (Phase 2)
- Every content entity (protocol description, hero copy, UI labels) has first-class Hindi and English authored versions — no runtime auto-translate.
- Language selector in the primary nav; selection persisted (e.g., localStorage) across sessions.
- Devanagari typography rendered correctly on all target devices/browsers (font-loading fallback tested).

### 5.3 Bio-Pacer / Breathing Tool (Phase 3)
- Visual breathing pacer with three phases: 4s inhale (expanding ring), 4s hold (glow/particle effect), 6s exhale (contracting ring).
- Web Audio API oscillator generating a continuous tone (target 136.1 Hz) during the exhale phase, with a user-controlled volume slider and mute/play-pause control.
- Preset breathing patterns selectable by use case (e.g., Stress Relief, BP Balance, Sleep Reset) — each preset maps to a documented phase-duration profile.
- Must start only on explicit user interaction (autoplay-audio restrictions in browsers; no audio before a user gesture).

### 5.4 Clinical Protocol Modules (Phase 4)
For each protocol (Uterine Prolapse, Prostate/LUT, Kukkutasana, Hasta Mudra):
- Structured content block: condition/technique overview, step-by-step asana or mudra sequence, supporting media (image/diagram or embedded video), and any cited view-count/social-proof stat.
- Clear, non-diagnostic framing: educational/therapeutic guidance, not a medical diagnosis — include a visible disclaimer that this is not a substitute for medical care and that patients should consult before starting if they have a diagnosed condition.

### 5.5 Hall of Recognition (Phase 5)
- Media gallery: photos/videos with named public figures (e.g., Swami Ramdev), NCISM recognition, awards/certificates, world record citations.
- Only content the platform owner has rights to publish (owned photos, licensed press images, or explicit permission) may be used — no scraped/unlicensed third-party images of other public figures.

### 5.6 Consultation / Booking Desk (Phase 6)
- Two consultation types: **Online (video call)** and **In-Person OPD (Bhopal)**.
- Intake form fields: full name, phone number (WhatsApp-enabled), consultation category (dropdown: e.g., Uterine Prolapse, Prostate Health, Advanced Hatha Yoga, Anxiety/Insomnia, Other), optional medical report/file upload.
- On submission: confirmation message to the patient + notification routed to the practice's contact channel.
  - **Primary contact for booking notifications:** WhatsApp/phone `+91 87701 72634`, email `dr.mohittawar@gmail.com`.
- File uploads: validate file type/size client- and server-side; store securely (not publicly listed/indexable); this is a basic intake attachment, not a compliance-grade medical records vault (see Non-Goals).
- Clear consent checkbox for data collection/contact, referencing a privacy policy (see §7).

### 5.7 Social Proof / Live Stats
- Display follower/subscriber counts and top video view-counts. Since these change over time, treat them as **manually updatable content fields** (CMS/config value) rather than a live-scraped counter, unless a specific YouTube/Instagram API integration is scoped and approved (rate limits, API keys, ToS compliance).

---

## 6. Visual & Content Design System

**Palette**
| Token | Hex | Use |
|---|---|---|
| Sacred Ochre | `#D97706` | Primary accent |
| Vedic Gold | `#F59E0B` | Secondary accent / highlights |
| Sandstone Parchment | `#FAF7F2` | Base background |
| Deep Bodhi Charcoal | `#181513` | Dark mode base / text |
| Temple Saffron | `#C2410C` | CTA / emphasis |

**Typography**
- Headings: Cinzel Decorative / Rozha One (Latin), Yatra One / Rozha One-compatible Devanagari pairing for Hindi headings.
- Body: Plus Jakarta Sans (Latin), Noto Sans Devanagari (Hindi) — chosen for clinical readability.

**Motion language:** subtle continuous ambient motion (breathing-scale animation, drifting particles), spring-based UI response, no motion that fails `prefers-reduced-motion` accessibility checks.

---

## 7. Non-Functional Requirements

- **Accessibility:** WCAG 2.1 AA where feasible; respect reduced-motion; sufficient color contrast against the ochre/parchment palette (verify accent-on-background contrast ratios explicitly, since saffron-on-parchment can fail AA).
- **Performance:** mobile-first; lazy-load video/gallery assets; target Core Web Vitals thresholds in §2.
- **Privacy/Compliance:** publish a privacy policy covering intake-form data and any file uploads; since health-related categories are collected (e.g., "Prostate Health," medical report uploads), treat this as sensitive personal data — restrict access, avoid third-party analytics scripts capturing form contents, and get explicit consent before storage/transmission.
- **SEO:** bilingual hreflang tags, structured data for a `Physician`/`LocalBusiness`-type entity (name, credentials, location, service catalog) to support local + credential search visibility.
- **Internationalization:** Hindi content is authored, not translated; date/number formatting appropriate per locale.

---

## 8. Technical Architecture (proposed)

| Layer | Choice |
|---|---|
| Frontend | Next.js (App Router) + React |
| Styling | Tailwind CSS with the custom ochre/saffron design tokens above |
| Animation | Framer Motion (parallax, staggered text reveal, spring transitions) |
| Audio | Web Audio API (oscillator + gain node for the bio-pacer tone) |
| Icons/Fonts | Lucide React; Google Fonts (Cinzel, Plus Jakarta Sans, Rozha One, Noto Sans Devanagari) |
| Booking notification | WhatsApp Business API / Cloud API, or a transactional-email fallback (avoid `wa.me` deep links alone for anything requiring guaranteed delivery/confirmation) |
| Hosting | Vercel or Cloudflare Pages, edge SSR + static asset caching |

---

## 9. Verified Content Inputs (source data for copywriting/CMS)

| Field | Value |
|---|---|
| Full name | Dr. Mohit Kumar Tawar |
| Academic credentials | Ph.D. in Yoga; M.Sc. in Human Consciousness & Yogic Science; BHMS, PG, N.A.H.I. (Nagpur); PG Diploma in Vastu & Jyotish |
| Records | Guinness World Record (Yoga); India Book of Records (Kukkutasana endurance) |
| Instagram | 482K+ followers, 5,462+ posts — `@yogagurudrmohit` |
| YouTube | 51.8K+ subscribers, 2,000+ clinical videos — youtube.com/@yogagurudrmohit |
| Notable video performance | Uterine Prolapse Protocol: 1.7M+ views; Prostate Asana: 853K+ views; Shorts: 35.1M+ cumulative impressions |
| Other listing | Justdial profile: jsdl.in/DT-17TQXCYHTUS |
| Base location | Bhopal, Madhya Pradesh, India |
| Booking contact | Phone/WhatsApp: +91 87701 72634 · Email: dr.mohittawar@gmail.com |

> Note: follower/view-count figures should be re-verified at launch time and refreshed periodically — treat the numbers above as the source snapshot at PRD authoring time, not a live guarantee.

---

## 10. Milestones (indicative — from source sprint plan)

| Sprint | Duration | Deliverables |
|---|---|---|
| 1 | Days 1–3 | Visual asset prep, image layering, color token setup |
| 2 | Days 4–7 | Intro animation, parallax hero, typography system |
| 3 | Days 8–11 | Bio-pacer audio tool, clinical protocol pages |
| 4 | Days 12–14 | Bilingual content matrix, booking flow, WhatsApp/notification integration |

---

## 11. Open Questions / Decisions Needed

1. **Live social counters** — manual/CMS-updated field, or approved API integration with refresh schedule?
2. **Booking notification channel** — WhatsApp Business API (requires business verification) vs. simpler email/SMS fallback for launch?
3. **Medical report uploads** — what retention period and storage policy? Who has access?
4. **CMS** — will content (protocols, stats, media gallery) be hardcoded at build time, or does Dr. Tawar's team need a no-code way to update it post-launch?
5. **Third-party media rights** — confirm usage rights for any photos/video featuring other public figures (e.g., Swami Ramdev) before publishing in the Hall of Recognition.

---

## 12. Disclaimers to Include on Site

- Educational/therapeutic content is not a substitute for professional medical diagnosis or treatment; users with diagnosed conditions should consult a physician before beginning any protocol.
- Consultation booking does not constitute an emergency medical service; emergencies should be directed to appropriate emergency care.
