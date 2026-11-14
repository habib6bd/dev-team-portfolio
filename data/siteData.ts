import { projectImages, serviceImages, type SiteImage } from "./images";

/** Brand identity, used by the header, footer, metadata and docs. */
export const site = {
  name: "Kodenvia",
  domain: "kodenvia.com",
  url: "https://kodenvia.com",
  /** Tight crop of kodenvia_final_logo.webp (the original has wide white margins). */
  logo: "/kodenvia-logo.webp",
};

export interface Service {
  /** Stable id — also the anchor on /services (`/services#<id>`). */
  id: string;
  title: string;
  /** One or two lines, shown on the service cards. */
  description: string;
  /** The longer pitch on the services page. */
  overview: string;
  image: SiteImage;
  /** Where the card's "Learn more" link goes. */
  link: string;
  deliverables: string[];
}

/** Clients we work with — logos live in /public/images/companywework. */
export const companies: { name: string; logo: string }[] = [
  { name: "Netbazar", logo: "/images/companywework/netbazar-logo.jpeg" },
  { name: "ASVAB Tutoring", logo: "/images/companywework/asvab-tutoring-logo.webp" },
  { name: "Quality School", logo: "/images/companywework/qualityschool-logo.webp" },
  { name: "NewsStream", logo: "/images/companywework/newsstream.jpg" },
];

export const stats = [
  { value: 3, suffix: "+ yrs", label: "Serving clients" },
  { value: 4, suffix: "", label: "Clients served" },
  { value: 7, suffix: "", label: "Services offered" },
  { value: 24, suffix: "h", label: "Average reply time" },
];

export const services: Service[] = [
  {
    id: "web-development",
    title: "Web Development",
    description:
      "Fast, responsive marketing sites, landing pages and dashboards built on Next.js.",
    overview:
      "Responsive marketing sites, landing pages and custom dashboards built on Next.js — fast, accessible and easy for your team to maintain.",
    image: serviceImages.webDevelopment,
    link: "/services#web-development",
    deliverables: [
      "Responsive marketing site or web app",
      "CMS or admin panel for your content",
      "Performance & accessibility pass",
      "Deployment and handover docs",
    ],
  },
  {
    id: "seo",
    title: "SEO",
    description:
      "Technical audits, on-page structure and Core Web Vitals work that lifts your rankings.",
    overview:
      "Technical audits, on-page structure, metadata and Core Web Vitals work that moves a site up the results page and keeps it there.",
    image: serviceImages.seo,
    link: "/services#seo",
    deliverables: [
      "Full technical SEO audit",
      "On-page & metadata implementation",
      "Schema markup and sitemap setup",
      "Monthly ranking and traffic report",
    ],
  },
  {
    id: "admin-support",
    title: "Admin Support",
    description:
      "Content updates, data entry and reporting handled, so your team can stay on the business.",
    overview:
      "The ongoing operational work — content updates, data entry, product uploads and reporting — handled so your team can stay on the business.",
    image: serviceImages.adminSupport,
    link: "/services#admin-support",
    deliverables: [
      "Content and product updates",
      "Data entry and clean-up",
      "Inbox and CRM maintenance",
      "Weekly progress reporting",
    ],
  },
  {
    id: "erp-software",
    title: "ERP Software Solution",
    description:
      "End-to-end business management: accounts, inventory, HR, sales and reporting in one system.",
    overview:
      "One system for the whole business — accounts, inventory, HR, sales and reporting — so every department works from the same live numbers instead of a pile of spreadsheets.",
    image: serviceImages.erp,
    link: "/services#erp-software",
    deliverables: [
      "Accounts, inventory, HR and sales modules",
      "Role-based access for each department",
      "Real-time dashboards and exportable reports",
      "Data migration, training and support",
    ],
  },
  {
    id: "custom-software",
    title: "Custom Software Development",
    description:
      "Tailored software built around the way your team already works, not the other way round.",
    overview:
      "When off-the-shelf tools don't fit, we build software around your actual workflow — from internal tools and portals to integrations with the systems you already use.",
    image: serviceImages.customSoftware,
    link: "/services#custom-software",
    deliverables: [
      "Workflow discovery and written specification",
      "Web-based app built in weekly releases",
      "Integrations with your existing tools",
      "Source code, documentation and handover",
    ],
  },
  {
    id: "pharmacy-software",
    title: "Pharmacy Management Software",
    description:
      "Medicine inventory, expiry tracking, billing, prescriptions and supplier management.",
    overview:
      "Built for the pharmacy counter — track every medicine by batch and expiry, bill quickly, record prescriptions and keep supplier orders and dues under control.",
    image: serviceImages.pharmacy,
    link: "/services#pharmacy-software",
    deliverables: [
      "Medicine inventory with batch and expiry alerts",
      "Fast billing and prescription records",
      "Supplier, purchase and due management",
      "Daily sales and stock reports",
    ],
  },
  {
    id: "super-shop-software",
    title: "Super Shop Management Software",
    description:
      "POS with barcode billing, stock control and multi-branch sales reports.",
    overview:
      "A point-of-sale system for supermarkets and retail chains — barcode billing at the till, live stock control and sales reports across every branch.",
    image: serviceImages.superShop,
    link: "/services#super-shop-software",
    deliverables: [
      "POS with barcode scanning and receipt printing",
      "Stock control with low-stock alerts",
      "Multi-branch sales and profit reports",
      "Staff roles, shifts and cash reconciliation",
    ],
  },
];

export const process = [
  {
    step: "01",
    title: "Discovery call",
    description:
      "A 30-minute call to understand the goal, the audience and the deadline. You leave with a clear scope, not a sales pitch.",
  },
  {
    step: "02",
    title: "Proposal & plan",
    description:
      "A fixed scope, timeline and price in writing within two working days. No open-ended hourly surprises.",
  },
  {
    step: "03",
    title: "Build & review",
    description:
      "We build in weekly slices on a live staging link, so you see progress and can steer it before anything is final.",
  },
  {
    step: "04",
    title: "Launch & support",
    description:
      "We deploy, hand over the documentation, and stay available for updates, SEO work and ongoing admin support.",
  },
];

export const projects = [
  {
    slug: "asvab-tutoring-website",
    title: "ASVAB Tutoring Website",
    category: "Web Development",
    image: projectImages.asvabTutoring,
    description:
      "A test-prep website for a US military entrance exam tutoring company, covering ASVAB, ASTB, OAR, AFOQT and SIFT. Visitors can browse courses, take free practice tests and request a tutor straight from the homepage.",
    result: "Tutor request form on the first screen",
    tags: ["Course pages", "Free practice tests", "Lead form", "Responsive"],
  },
  {
    slug: "netbazar-erp",
    title: "NetBazar Shop Management ERP",
    category: "ERP Software",
    image: projectImages.netbazarErp,
    description:
      "A shop management system for a retail business: sales and purchases, stock, customers, suppliers and expenses in one place. It also tracks serial and IMEI numbers, warranty claims and faulty items sent back to suppliers.",
    result: "Sales, profit and low stock on one dashboard",
    tags: ["Sales & invoicing", "Inventory", "Warranty tracking", "Reports"],
  },
  {
    slug: "seo-growth-setup",
    title: "SEO Growth Setup",
    category: "SEO",
    image: projectImages.seoGrowthSetup,
    description:
      "Our SEO setup for a business website: a technical audit, cleaner page titles and descriptions, better internal linking and faster page loads, followed by a monthly report on rankings and traffic.",
    result: "Monthly report on rankings and traffic",
    tags: ["Technical SEO", "Schema", "Core Web Vitals"],
  },
];

/**
 * Client feedback. The people and companies are real; the wording is a
 * PLACEHOLDER draft — replace each `text` with the client's own words (or get
 * their sign-off on this wording) before the site goes live.
 */
export const reviews = [
  {
    name: "Deb Das",
    role: "Founder & President",
    company: "ASVAB Tutoring",
    logo: "/images/companywework/asvab-tutoring-logo.webp",
    text: "We worked with Kodenvia for about a year to build our full platform, from the public website to the course and practice test areas. They were patient with every change we asked for, kept us updated at each stage, and delivered a site our students find easy to use. I would gladly work with them again.",
  },
  {
    name: "Ataur Rahman",
    role: "Owner",
    company: "NetBazar",
    logo: "/images/companywework/netbazar-logo.jpeg",
    text: "Kodenvia built the shop management software we now run our business on. Sales, stock, dues and warranty claims are all in one place, and I can see how the shop stands the moment I open the dashboard. They listened to how we actually work and built the system around it.",
  },
  {
    name: "Jewel Syed",
    role: "Reporter",
    company: "NewsStream",
    logo: "/images/companywework/newsstream.jpg",
    text: "Working with the Kodenvia team has been smooth from the start. They are quick to respond, clear about what they will deliver and when, and they follow through. Whenever we need an update or a fix, it gets done without any back and forth.",
  },
];

export const faqs = [
  {
    question: "How long does a typical project take?",
    answer:
      "A marketing site or landing page usually takes two to four weeks. Larger dashboards and web apps run six to ten weeks. You get a firm timeline in the proposal before any work starts.",
  },
  {
    question: "How do you handle pricing?",
    answer:
      "Fixed price per scope for build projects, and a flat monthly retainer for SEO and admin support. You approve the number before we begin, and it does not move unless the scope does.",
  },
  {
    question: "Do you work with clients in other time zones?",
    answer:
      "Yes. We are a fully remote team based in Dhaka, Bangladesh, working with clients across Europe, North America and Australia. We hold a fixed overlap window each day and reply to messages within one working day.",
  },
  {
    question: "What happens after launch?",
    answer:
      "You get the code, the documentation and full ownership. Most clients continue with a support retainer for updates, SEO and admin work, but there is no lock-in.",
  },
];

/** Turns a display number like "+880 1850-128324" into a tel: href. */
export const telHref = (phone: string) => `tel:${phone.replace(/[\s-]/g, "")}`;

export const contactDetails = {
  email: "kodenviatech@gmail.com",
  /** Both numbers are also on WhatsApp. */
  phones: ["+880 1850-128324", "+880 1613-511976"],
  location: "Dhaka, Bangladesh",
  remote: "A fully remote team, working with clients worldwide.",
  hours: "Sun–Thu, 10:00–19:00 (GMT+6)",
};
