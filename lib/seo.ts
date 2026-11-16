import type { Metadata } from "next";
import { site } from "@/data/siteData";

type PageMetadataInput = {
  /** Page title. The root layout appends "| Kodenvia" unless `absoluteTitle` is set. */
  title: string;
  description: string;
  /** Path from the site root, e.g. "/services/seo". Use "/" for the home page. */
  path: string;
  /** Use the title exactly as given, without the site-name suffix. */
  absoluteTitle?: boolean;
};

/**
 * The share image has to be named here: a page that sets its own `openGraph`
 * replaces the parent's whole object, including the image that
 * app/opengraph-image.png would otherwise supply.
 */
const shareImage = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: `${site.name}: web development, SEO and business software`,
};

/**
 * Metadata every public page needs: a canonical URL, plus Open Graph and
 * Twitter tags that describe this page rather than repeating the home page's.
 * URLs are relative; `metadataBase` in app/layout.tsx makes them absolute.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const socialTitle = absoluteTitle ? title : `${title} | ${site.name}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_US",
      url: path,
      title: socialTitle,
      description,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [shareImage],
    },
  };
}
