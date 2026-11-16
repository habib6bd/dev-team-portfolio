import type { MetadataRoute } from "next";
import { services } from "@/data/siteData";
import { siteUrl } from "@/lib/site-url";

/**
 * When the public content last changed in a meaningful way. Bump this when
 * you edit page content; a date that changes on every build teaches search
 * engines to ignore it.
 */
const LAST_UPDATED = new Date("2026-11-17");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    ...services.map((service) => ({
      path: service.link,
      priority: 0.9,
      changeFrequency: "monthly" as const,
    })),
    { path: "/hire-us", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/projects", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.6, changeFrequency: "monthly" as const },
  ];

  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    lastModified: LAST_UPDATED,
    changeFrequency,
    priority,
  }));
}
