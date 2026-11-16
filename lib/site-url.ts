import { site } from "@/data/siteData";

/**
 * The canonical origin, no trailing slash. NEXT_PUBLIC_ values are baked in
 * at build time, so this is fixed for a given deploy bundle.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? site.url).replace(/\/$/, "");
