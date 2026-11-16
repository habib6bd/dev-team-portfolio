import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

// Internal tooling: never worth crawling, and it holds client data.
const PRIVATE = ["/dashboard", "/login", "/api/"];

/**
 * AI search and assistant crawlers, named explicitly so there is no doubt
 * they may read the public pages (that is how the site gets cited in AI
 * answers). They follow the same private-path rules as everyone else.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: PRIVATE },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
