import type { NextConfig } from "next";
import { UNSPLASH_QUERY } from "./data/images";

const nextConfig: NextConfig = {
  // Self-contained server in .next/standalone, so the cPanel host never has
  // to run `npm install` or `next build` (see DEPLOYMENT.md, cPanel section).
  output: "standalone",
  // lib/db.ts reads the schema from disk at runtime; make sure it is traced.
  outputFileTracingIncludes: {
    "/*": ["./lib/schema.sql"],
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
