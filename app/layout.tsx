import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import VisitTracker from "@/components/analytics/VisitTracker";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DevTeam Studio — Web Development, SEO & Admin Support",
    template: "%s | DevTeam Studio",
  },
  description:
    "A three-person team building fast websites, ranking them on Google, and handling the admin work that keeps them running.",
  keywords: ["web development", "Next.js developer", "SEO agency", "admin support", "Bangladesh"],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "DevTeam Studio",
    title: "DevTeam Studio — Web Development, SEO & Admin Support",
    description:
      "A three-person team building fast websites, ranking them on Google, and handling the admin work that keeps them running.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevTeam Studio",
    description: "Web development, SEO and admin support for growing businesses.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the inline script below adds a class to
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
      </head>
      <body className="bg-white text-ink-900 antialiased">
        {children}
        <VisitTracker />
      </body>
    </html>
  );
}
