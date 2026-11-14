import type { MetadataRoute } from "next";
import { site } from "@/data/siteData";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Internal tooling — never worth crawling, and it holds client data.
      disallow: ["/dashboard", "/login", "/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
