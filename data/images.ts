/**
 * Every placeholder image on the site, in one place.
 *
 * These are royalty-free Unsplash photos (https://unsplash.com/license) used
 * until real screenshots and photography are ready. To swap one, change its
 * `src` — either to another URL or to a local file under /public, e.g.
 * "/images/services/erp.jpg". Remote hosts must be allowed in next.config.ts.
 */
export type SiteImage = {
  src: string;
  /** Describes the picture for screen readers; keep it specific. */
  alt: string;
};

/**
 * Unsplash's CDN resizes on its side; asking for a capped width keeps the
 * originals (often 5MB+) out of the Next.js image optimizer. This exact query
 * string is allow-listed in next.config.ts.
 */
export const UNSPLASH_QUERY = "?auto=format&fit=crop&w=1200&q=80";

const unsplash = (photoId: string) =>
  `https://images.unsplash.com/photo-${photoId}${UNSPLASH_QUERY}`;

export const serviceImages = {
  webDevelopment: {
    src: unsplash("1498050108023-c5249f4df085"),
    alt: "Laptop on a desk showing website code in an editor",
  },
  seo: {
    src: unsplash("1460925895917-afdab827c52f"),
    alt: "Laptop displaying a website analytics dashboard with traffic charts",
  },
  adminSupport: {
    src: unsplash("1454165804606-c3d57bc86b40"),
    alt: "Person reviewing paperwork beside an open laptop",
  },
  erp: {
    src: unsplash("1551288049-bebda4e38f71"),
    alt: "Business reporting dashboard with sales and performance charts",
  },
  customSoftware: {
    src: unsplash("1555066931-4365d14bab8c"),
    alt: "Close-up of application source code on a laptop screen",
  },
  pharmacy: {
    src: unsplash("1631549916768-4119b2e5f926"),
    alt: "Assorted blister packs of tablets and capsules",
  },
  superShop: {
    src: unsplash("1604719312566-8912e9227c6a"),
    alt: "Supermarket aisle with fully stocked shelves on both sides",
  },
} satisfies Record<string, SiteImage>;

/**
 * Project images, stored in /public/images/projects. The first two are real
 * screenshots; the SEO one is a royalty-free Unsplash photo standing in until
 * there is a real SEO report to show.
 */
export const projectImages = {
  asvabTutoring: {
    src: "/images/projects/asvab-tutoring-site.webp",
    alt: "ASVAB Tutoring homepage with its welcome banner and tutor request form",
  },
  netbazarErp: {
    src: "/images/projects/netbazar-dashboard.webp",
    alt: "NetBazar shop dashboard showing sales, revenue, profit and low-stock panels",
  },
  seoGrowthSetup: {
    src: "/images/projects/seo-analytics-demo.jpg",
    alt: "Laptop showing a website analytics report with traffic and audience charts",
  },
} satisfies Record<string, SiteImage>;
