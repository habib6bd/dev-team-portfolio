import type { NextConfig } from "next";
import { UNSPLASH_QUERY } from "./data/images";
import { site } from "./data/siteData";

const nextConfig: NextConfig = {
  // Self-contained server in .next/standalone, so the cPanel host never has
  // to run `npm install` or `next build` (see DEPLOYMENT.md, cPanel section).
  output: "standalone",
  // lib/db.ts reads the schema from disk at runtime; make sure it is traced.
  outputFileTracingIncludes: {
    "/*": ["./lib/schema.sql"],
  },
  // One address for the site. Without this, www and non-www both answer and
  // search engines see two copies of every page.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: `www.${site.domain}` }],
        destination: `${site.url}/:path*`,
        permanent: true,
      },
    ];
  },
  images: {
    // Placeholder photography (see data/images.ts). Locked to Unsplash's
    // photo path and the one query string we request, so the optimizer can't
    // be used to resize arbitrary images.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-*",
        search: UNSPLASH_QUERY,
      },
    ],
  },
};

export default nextConfig;
