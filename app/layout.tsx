import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import VisitTracker from "@/components/analytics/VisitTracker";
import { site } from "@/data/siteData";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — Web Development, SEO & Business Software`,
    template: `%s | ${site.name}`,
  },
  description:
    "A fully remote team building fast websites, ranking them on Google, and creating ERP, pharmacy and super shop software for growing businesses.",
  keywords: [
    "web development",
    "Next.js developer",
    "SEO agency",
    "admin support",
    "ERP software",
    "custom software development",
    "pharmacy management software",
    "super shop POS software",
    "Bangladesh",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} — Web Development, SEO & Business Software`,
    description:
      "A fully remote team building fast websites, ranking them on Google, and creating ERP, pharmacy and super shop software for growing businesses.",
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: "Web development, SEO and admin support for growing businesses.",
  },
  icons: { icon: site.logo, apple: site.logo },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the inline script below adds classes to
    // <html> before React hydrates, which is an intentional mismatch.
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Marks the document as JS-capable before first paint, so elements
          waiting on GSAP can start hidden without ever hiding content from
          a visitor whose JavaScript never loads.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js-anim')`,
          }}
        />
        {/*
          Applies the visitor's saved theme before first paint, so a dark-mode
          visitor never sees a flash of the light page. Light is the default;
          the key is written by components/ThemeToggle.tsx.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}`,
          }}
        />
      </head>
      <body className="bg-white text-ink-900 antialiased">
        {children}
        <VisitTracker />
      </body>
    </html>
  );
}
