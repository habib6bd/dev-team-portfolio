import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import VisitTracker from "@/components/analytics/VisitTracker";
import { site } from "@/data/siteData";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // Pages set their own title, description, canonical and social tags through
  // pageMetadata() in lib/seo.ts; these are the fallbacks.
  title: {
    default: `${site.name} | Software & Web Development Company in Bangladesh`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  openGraph: { type: "website", siteName: site.name, locale: "en_US" },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
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
      {/* suppressHydrationWarning: browser extensions (ColorZilla, Grammarly…)
          add their own attributes to <body> before React hydrates. */}
      <body className="bg-white text-ink-900 antialiased" suppressHydrationWarning>
        {children}
        <VisitTracker />
      </body>
    </html>
  );
}
