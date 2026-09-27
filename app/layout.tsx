import type { Metadata } from "next";
import { Cinzel, Rozha_One, Plus_Jakarta_Sans, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({ variable: "--font-cinzel", subsets: ["latin"], weight: ["400", "600", "700"] });
const rozhaOne = Rozha_One({ variable: "--font-rozha", subsets: ["latin"], weight: "400" });
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });
const notoDevanagari = Noto_Sans_Devanagari({ variable: "--font-devanagari", subsets: ["devanagari"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://yogagurudrmohit.com"),
  title: {
    default: "Dr. Mohit Tawar | Yoga Guru — Ph.D., Guinness World Record Holder",
    template: "%s | Dr. Mohit Tawar",
  },
  description:
    "Official platform of Dr. Mohit Tawar — Ph.D. in Yoga, BHMS, Guinness World Record holder, and clinical yoga therapist in Bhopal. Therapeutic protocols for uterine prolapse, prostate health, and Kukkutasana mastery. Book an in-person or online consultation.",
  keywords: [
    "Dr Mohit Tawar",
    "Yoga Guru Bhopal",
    "yoga therapy uterine prolapse",
    "prostate yoga treatment",
    "Kukkutasana Guinness World Record",
    "yoga consultation India",
  ],
  openGraph: {
    title: "Dr. Mohit Tawar | Yoga Guru — Ph.D., Guinness World Record Holder",
    description:
      "Clinical yoga therapeutics from Dr. Mohit Tawar (Ph.D. in Yoga, BHMS). Guinness World Record holder based in Bhopal, India. Book a consultation.",
    url: "https://yogagurudrmohit.com",
    siteName: "Dr. Mohit Tawar",
    locale: "en_IN",
    alternateLocale: "hi_IN",
    images: ["/images/hero-meditation.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Mohit Tawar | Yoga Guru",
    description: "Ph.D. in Yoga • Guinness World Record Holder • Clinical yoga therapeutics in Bhopal, India.",
    images: ["/images/hero-meditation.png"],
  },
  alternates: {
    languages: { "en-IN": "https://yogagurudrmohit.com", "hi-IN": "https://yogagurudrmohit.com" },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Physician",
  name: "Dr. Mohit Tawar",
  alternateName: "Yoga Guru Dr Mohit",
  description:
    "Ph.D. in Yoga, BHMS, Associate Professor in Yoga, and Guinness World Record holder offering clinical yoga therapeutics in Bhopal, India.",
  medicalSpecialty: "https://schema.org/Physiotherapy",
  areaServed: "IN",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bhopal",
    addressRegion: "Madhya Pradesh",
    addressCountry: "IN",
  },
  telephone: "+91-87701-72634",
  email: "dr.mohittawar@gmail.com",
  sameAs: ["https://instagram.com/yogagurudrmohit", "https://youtube.com/@yogagurudrmohit"],
  url: "https://yogagurudrmohit.com",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="hi"
      className={`${cinzel.variable} ${rozhaOne.variable} ${jakarta.variable} ${notoDevanagari.variable} h-full antialiased`}
    >
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
