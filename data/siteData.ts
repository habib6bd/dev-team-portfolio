import { projectImages, serviceImages, type SiteImage } from "./images";

/** Brand identity, used by the header, footer, metadata and docs. */
export const site = {
  name: "Kodenvia",
  domain: "kodenvia.com",
  url: "https://kodenvia.com",
  /** Tight crop of kodenvia_final_logo.webp (the original has wide white margins). */
  logo: "/kodenvia-logo.webp",
  /** One-line description, reused by metadata, structured data and llms.txt. */
  description:
    "Kodenvia is a remote software and web development team based in Dhaka, Bangladesh. We build fast websites, do technical SEO, and create ERP, pharmacy and super shop management software for growing businesses.",
  /**
   * Public profiles (Facebook page, LinkedIn company page, Clutch, Google
   * Business Profile…). Listed as `sameAs` in structured data so search
   * engines can connect them to this site. Add full URLs as they are created.
   */
  profiles: [] as string[],
};

export interface Faq {
  question: string;
  answer: string;
}

export interface Service {
  /** Stable id — the URL slug (`/services/<id>`) and the anchor on /services. */
  id: string;
  title: string;
  /** One or two lines, shown on the service cards. */
  description: string;
  /** The longer pitch on the services page. */
  overview: string;
  image: SiteImage;
  /** The service's own page. */
  link: string;
  deliverables: string[];

  // ---- The service's own page (app/(site)/services/[slug]) ----
  /** Who the page is written for; decides the area named in structured data. */
  market: "bangladesh" | "global";
  /** Browser/search title. "| Kodenvia" is appended, so keep it under ~50 characters. */
  seoTitle: string;
  /** Search result snippet, roughly 150–160 characters. */
  seoDescription: string;
  /** The page's <h1>. */
  heading: string;
  /**
   * A direct answer to "what is this and who is it for", in two or three
   * sentences. Search and AI engines quote this, so keep it factual.
   */
  summary: string;
  audience: string[];
  features: { title: string; description: string }[];
  faqs: Faq[];
  /** A project and client review that back the service up, if we have them. */
  proof?: { projectSlug: string; reviewCompany?: string };
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
    link: "/services/web-development",
    deliverables: [
      "Responsive marketing site or web app",
      "CMS or admin panel for your content",
      "Performance & accessibility pass",
      "Deployment and handover docs",
    ],
    market: "global",
    seoTitle: "Next.js Web Development Services",
    seoDescription:
      "Kodenvia builds fast, responsive business websites, landing pages and dashboards on Next.js. Fixed scope and price, weekly progress on a live link, full code ownership.",
    heading: "Web development for fast, easy-to-maintain business websites",
    summary:
      "Kodenvia designs and builds business websites, landing pages and web dashboards on Next.js and React. We are a remote team based in Dhaka, Bangladesh, working with clients worldwide. Every project has a fixed scope, timeline and price agreed in writing before work starts, and you own the code at the end.",
    audience: [
      "Businesses that need a new marketing website or a rebuild of a slow, dated one",
      "Companies that need a customer portal, booking flow or internal dashboard",
      "Teams that want to update their own content without calling a developer",
    ],
    features: [
      {
        title: "Built for speed",
        description:
          "Pages are pre-rendered and images are optimised, so the site loads quickly on phones and slow connections.",
      },
      {
        title: "Works on every screen",
        description:
          "Layouts are designed for mobile first, then tablet and desktop, and tested on each.",
      },
      {
        title: "Content you can edit",
        description:
          "A CMS or admin panel lets your team change text, images and listings without touching code.",
      },
      {
        title: "Search-ready from day one",
        description:
          "Clean page titles, descriptions, structured data and a sitemap are part of the build, not an extra.",
      },
      {
        title: "Accessible by default",
        description:
          "Proper headings, labels, colour contrast and keyboard support, so everyone can use the site.",
      },
      {
        title: "Yours to keep",
        description:
          "You receive the source code, hosting access and written handover documentation.",
      },
    ],
    faqs: [
      {
        question: "How long does it take to build a business website?",
        answer:
          "A marketing site or landing page usually takes two to four weeks. Larger dashboards and web apps run six to ten weeks. You get a firm timeline in the proposal before any work starts.",
      },
      {
        question: "How much does a website cost?",
        answer:
          "It depends on the number of pages and the features you need. After a 30-minute discovery call we send a fixed price in writing within two working days, and it does not change unless the scope does.",
      },
      {
        question: "Why do you build with Next.js?",
        answer:
          "Next.js produces fast, pre-rendered pages that search engines can read easily, and it scales from a five-page site to a full web app. It is widely used, so any competent React developer can maintain the site after us.",
      },
      {
        question: "Will I be able to update the website myself?",
        answer:
          "Yes. We set up a CMS or admin panel for the content you expect to change, and show your team how to use it during handover.",
      },
      {
        question: "Do you work with clients outside Bangladesh?",
        answer:
          "Yes. We are fully remote and work with clients across Europe, North America and Australia, with a fixed daily overlap window and replies within one working day.",
      },
    ],
    proof: { projectSlug: "asvab-tutoring-website", reviewCompany: "ASVAB Tutoring" },
  },
  {
    id: "seo",
    title: "SEO",
    description:
      "Technical audits, on-page structure and Core Web Vitals work that lifts your rankings.",
    overview:
      "Technical audits, on-page structure, metadata and Core Web Vitals work that moves a site up the results page and keeps it there.",
    image: serviceImages.seo,
    link: "/services/seo",
    deliverables: [
      "Full technical SEO audit",
      "On-page & metadata implementation",
      "Schema markup and sitemap setup",
      "Monthly ranking and traffic report",
    ],
    market: "global",
    seoTitle: "Technical SEO Services for Business Websites",
    seoDescription:
      "Technical SEO from Kodenvia: site audit, on-page and metadata fixes, schema markup, Core Web Vitals work and a monthly ranking and traffic report, on a flat monthly retainer.",
    heading: "Technical SEO services that make your website easier to find",
    summary:
      "Kodenvia's SEO service finds and fixes what stops a website from ranking: technical errors, weak page structure, missing metadata and slow pages. Because we are developers, we implement the fixes ourselves instead of handing you a list. The work runs on a flat monthly retainer with a ranking and traffic report every month.",
    audience: [
      "Businesses whose website gets little or no traffic from Google",
      "Companies that have had an SEO audit but nobody to implement it",
      "New websites that need the technical foundations set up correctly",
    ],
    features: [
      {
        title: "Technical audit",
        description:
          "A full crawl of the site to find indexing problems, broken links, duplicate pages and missing tags.",
      },
      {
        title: "On-page structure",
        description:
          "Page titles, descriptions, headings and internal links rewritten around what your customers search for.",
      },
      {
        title: "Schema markup",
        description:
          "Structured data that tells search engines and AI assistants exactly what your business is and offers.",
      },
      {
        title: "Core Web Vitals",
        description:
          "Speed and stability fixes in the code itself, so pages pass Google's page experience checks.",
      },
      {
        title: "Sitemap and indexing",
        description:
          "Sitemap, robots rules and Search Console set up so new pages are found and indexed.",
      },
      {
        title: "Monthly reporting",
        description:
          "A plain report each month showing rankings, traffic and what was done.",
      },
    ],
    faqs: [
      {
        question: "How long does SEO take to show results?",
        answer:
          "Technical fixes are usually picked up by Google within a few weeks. Meaningful ranking and traffic changes typically take three to six months, and longer for competitive search terms or a brand-new domain.",
      },
      {
        question: "Can you guarantee a first-page ranking?",
        answer:
          "No, and nobody honestly can. Rankings depend on your competitors and on Google's own systems. What we commit to is the work: a defined list of fixes and improvements each month, and a report showing what changed.",
      },
      {
        question: "What is technical SEO?",
        answer:
          "Technical SEO is the work that helps search engines crawl, understand and index a website: site speed, mobile layout, page structure, metadata, structured data, sitemaps and fixing errors. It is the foundation that content and links build on.",
      },
      {
        question: "How is SEO priced?",
        answer:
          "As a flat monthly retainer agreed in advance. You know what the work covers each month and there are no hourly surprises.",
      },
      {
        question: "Do you work on websites you did not build?",
        answer:
          "Yes. We start with an audit of the existing site and tell you plainly what can be fixed in place and what, if anything, would need rebuilding.",
      },
    ],
    proof: { projectSlug: "seo-growth-setup" },
  },
  {
    id: "admin-support",
    title: "Admin Support",
    description:
      "Content updates, data entry and reporting handled, so your team can stay on the business.",
    overview:
      "The ongoing operational work — content updates, data entry, product uploads and reporting — handled so your team can stay on the business.",
    image: serviceImages.adminSupport,
    link: "/services/admin-support",
    deliverables: [
      "Content and product updates",
      "Data entry and clean-up",
      "Inbox and CRM maintenance",
      "Weekly progress reporting",
    ],
    market: "global",
    seoTitle: "Website Admin Support & Data Entry Services",
    seoDescription:
      "Remote admin support from Kodenvia: website content and product updates, data entry and clean-up, inbox and CRM maintenance, with a weekly progress report on a flat monthly retainer.",
    heading: "Remote admin support for your website and back office",
    summary:
      "Kodenvia's admin support service takes over the routine work that keeps a website and back office current: content and product updates, data entry, inbox and CRM upkeep and reporting. It is run by a remote team in Dhaka, Bangladesh, on a flat monthly retainer, with a progress report every week.",
    audience: [
      "Online shops that need products, prices and stock kept up to date",
      "Small teams whose staff lose hours each week to data entry",
      "Businesses that want their website content refreshed regularly",
    ],
    features: [
      {
        title: "Content and product updates",
        description:
          "New pages, posts, products, prices and images published to your website as you send them.",
      },
      {
        title: "Data entry and clean-up",
        description:
          "Records typed in, de-duplicated and corrected, so your lists and spreadsheets can be trusted.",
      },
      {
        title: "Inbox and CRM maintenance",
        description:
          "Enquiries sorted and logged, and customer records kept current in the system you already use.",
      },
      {
        title: "Weekly reporting",
        description:
          "A short report each week listing what was completed and what is queued next.",
      },
    ],
    faqs: [
      {
        question: "What tasks does admin support cover?",
        answer:
          "Website content and product updates, data entry and clean-up, inbox and CRM maintenance, and regular reporting. If you have a recurring task that follows clear steps, we can usually take it on.",
      },
      {
        question: "How is admin support priced?",
        answer:
          "As a flat monthly retainer based on the volume of work, agreed before we start.",
      },
      {
        question: "How do we send you work?",
        answer:
          "By email or the shared channel we agree at the start. We reply within one working day and report progress every week.",
      },
      {
        question: "Which hours do you work?",
        answer:
          "Sunday to Thursday, 10:00 to 19:00 Bangladesh time (GMT+6), with a fixed daily overlap window for clients in other time zones.",
      },
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
    link: "/services/erp-software",
    deliverables: [
      "Accounts, inventory, HR and sales modules",
      "Role-based access for each department",
      "Real-time dashboards and exportable reports",
      "Data migration, training and support",
    ],
    market: "bangladesh",
    seoTitle: "ERP Software in Bangladesh",
    seoDescription:
      "ERP software for businesses in Bangladesh from Kodenvia: accounts, inventory, HR, sales and reporting in one system, with role-based access, data migration, training and support.",
    heading: "ERP software for businesses in Bangladesh",
    summary:
      "Kodenvia builds ERP software for businesses in Bangladesh that brings accounts, inventory, HR, sales and reporting into one system. Each department gets its own access, and owners see live numbers on a dashboard instead of waiting for spreadsheets. We migrate your existing data, train your staff and stay on for support.",
    audience: [
      "Trading, retail and distribution businesses that have outgrown spreadsheets",
      "Companies with several departments or branches working from different records",
      "Owners who want to see sales, stock and dues without asking for a report",
    ],
    features: [
      {
        title: "Accounts",
        description:
          "Income, expenses, customer and supplier dues recorded in one ledger.",
      },
      {
        title: "Inventory",
        description:
          "Stock levels updated with every purchase and sale, with low-stock visibility.",
      },
      {
        title: "Sales and purchases",
        description:
          "Invoices, purchase orders, customers and suppliers managed in the same place.",
      },
      {
        title: "HR",
        description: "Staff records kept alongside the rest of the business data.",
      },
      {
        title: "Role-based access",
        description:
          "Each department and staff member sees and changes only what their role allows.",
      },
      {
        title: "Dashboards and reports",
        description:
          "Live dashboards for owners and reports that export for your accountant.",
      },
    ],
    faqs: [
      {
        question: "What is ERP software?",
        answer:
          "ERP (enterprise resource planning) software is one system that runs the core of a business: accounts, inventory, sales, purchases, HR and reporting. Every department works from the same data, so the numbers always agree.",
      },
      {
        question: "How much does ERP software cost in Bangladesh?",
        answer:
          "The price depends on which modules you need, how many users and branches you have, and how much existing data has to be moved. After a discovery call we send a fixed price in writing within two working days.",
      },
      {
        question: "Can the ERP be customised for my business?",
        answer:
          "Yes. We start by mapping how your business actually works, then set up the modules, roles and reports around that rather than forcing you into a fixed template.",
      },
      {
        question: "Can you move our existing data into the new system?",
        answer:
          "Yes. Data migration is part of the service: products, customers, suppliers and opening balances are imported from your current spreadsheets or software before go-live.",
      },
      {
        question: "Do you train our staff?",
        answer:
          "Yes. Training and ongoing support are included, so each department knows how to use its part of the system.",
      },
    ],
    proof: { projectSlug: "netbazar-erp", reviewCompany: "NetBazar" },
  },
  {
    id: "custom-software",
    title: "Custom Software Development",
    description:
      "Tailored software built around the way your team already works, not the other way round.",
    overview:
      "When off-the-shelf tools don't fit, we build software around your actual workflow — from internal tools and portals to integrations with the systems you already use.",
    image: serviceImages.customSoftware,
    link: "/services/custom-software",
    deliverables: [
      "Workflow discovery and written specification",
      "Web-based app built in weekly releases",
      "Integrations with your existing tools",
      "Source code, documentation and handover",
    ],
    market: "global",
    seoTitle: "Custom Software Development Services",
    seoDescription:
      "Custom software development from Kodenvia: internal tools, portals and integrations built around your workflow, released weekly, with full source code and documentation handed over.",
    heading: "Custom software development built around how your team works",
    summary:
      "Kodenvia builds custom web-based software for businesses whose work does not fit off-the-shelf tools: internal systems, customer portals and integrations between the tools you already use. We write a specification first, build in weekly releases you can test, and hand over the full source code and documentation.",
    audience: [
      "Businesses running a key process on spreadsheets, paper or messaging apps",
      "Companies paying for several tools that do not talk to each other",
      "Teams whose off-the-shelf software forces awkward workarounds",
    ],
    features: [
      {
        title: "Workflow discovery",
        description:
          "We map how the work is done today and agree a written specification before building.",
      },
      {
        title: "Weekly releases",
        description:
          "A working version on a live link every week, so you can test and steer as it grows.",
      },
      {
        title: "Integrations",
        description:
          "Connections to the systems you already use, so data is entered once.",
      },
      {
        title: "Web-based",
        description:
          "Runs in the browser on desktop and mobile, with nothing to install.",
      },
      {
        title: "Full ownership",
        description:
          "Source code, documentation and access are handed over. There is no lock-in.",
      },
    ],
    faqs: [
      {
        question: "When does custom software make more sense than an off-the-shelf product?",
        answer:
          "When your process is specific to your business, when you are paying for several tools that still leave gaps, or when staff spend hours copying data between systems. If a standard product already fits, we will tell you.",
      },
      {
        question: "How long does custom software take to build?",
        answer:
          "Most web apps and internal tools take six to ten weeks. The proposal gives a firm timeline, and you see a working release every week.",
      },
      {
        question: "How much does custom software cost?",
        answer:
          "It depends on the scope. After discovery we send a fixed price for a written specification, and the price does not change unless the scope does.",
      },
      {
        question: "Who owns the software when it is finished?",
        answer:
          "You do. You receive the source code, documentation and full ownership, and you are free to host and maintain it however you choose.",
      },
      {
        question: "Do you provide support after launch?",
        answer:
          "Yes. Most clients continue with a support retainer for updates and new features, but it is optional.",
      },
    ],
    proof: { projectSlug: "netbazar-erp", reviewCompany: "NetBazar" },
  },
  {
    id: "pharmacy-software",
    title: "Pharmacy Management Software",
    description:
      "Medicine inventory, expiry tracking, billing, prescriptions and supplier management.",
    overview:
      "Built for the pharmacy counter — track every medicine by batch and expiry, bill quickly, record prescriptions and keep supplier orders and dues under control.",
    image: serviceImages.pharmacy,
    link: "/services/pharmacy-software",
    deliverables: [
      "Medicine inventory with batch and expiry alerts",
      "Fast billing and prescription records",
      "Supplier, purchase and due management",
      "Daily sales and stock reports",
    ],
    market: "bangladesh",
    seoTitle: "Pharmacy Management Software in Bangladesh",
    seoDescription:
      "Pharmacy management software in Bangladesh from Kodenvia: medicine inventory with batch and expiry alerts, fast billing, prescription records, supplier dues and daily sales reports.",
    heading: "Pharmacy management software for pharmacies in Bangladesh",
    summary:
      "Kodenvia's pharmacy management software helps pharmacies in Bangladesh track every medicine by batch and expiry date, bill customers quickly, keep prescription records and manage supplier purchases and dues. Owners get daily sales and stock reports, so expired stock and missing money are caught early.",
    audience: [
      "Retail pharmacies and medicine shops still using paper ledgers or spreadsheets",
      "Pharmacy owners who lose money to expired or untracked stock",
      "Pharmacies that want faster billing at the counter",
    ],
    features: [
      {
        title: "Medicine inventory",
        description:
          "Every medicine recorded by batch, with stock updated on each purchase and sale.",
      },
      {
        title: "Expiry alerts",
        description:
          "Warnings before a batch expires, so it can be sold or returned in time.",
      },
      {
        title: "Fast billing",
        description:
          "Quick invoices at the counter, so customers are not kept waiting.",
      },
      {
        title: "Prescription records",
        description: "Prescriptions kept against sales for later reference.",
      },
      {
        title: "Suppliers and dues",
        description:
          "Purchases, supplier payments and outstanding dues tracked in one place.",
      },
      {
        title: "Daily reports",
        description:
          "Sales and stock reports each day, so you know where the shop stands.",
      },
    ],
    faqs: [
      {
        question: "What is pharmacy management software?",
        answer:
          "Pharmacy management software is a system for running a pharmacy: it records medicine stock by batch and expiry, produces bills, keeps prescription records, tracks supplier purchases and dues, and reports on sales and stock.",
      },
      {
        question: "How much does pharmacy management software cost in Bangladesh?",
        answer:
          "The price depends on the size of the pharmacy, the number of users and counters, and the features you need. After a short call we send a fixed price in writing within two working days.",
      },
      {
        question: "How does the software handle expired medicine?",
        answer:
          "Each medicine is stored with its batch and expiry date. The system alerts you before a batch expires, so you can sell it first or return it to the supplier.",
      },
      {
        question: "Can it manage supplier dues?",
        answer:
          "Yes. Purchases, payments and outstanding dues are recorded for each supplier, so you always know what you owe.",
      },
      {
        question: "Do you set it up and train our staff?",
        answer:
          "Yes. We set up the system with your medicines and suppliers, show your staff how to use it and stay available for support.",
      },
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
    link: "/services/super-shop-software",
    deliverables: [
      "POS with barcode scanning and receipt printing",
      "Stock control with low-stock alerts",
      "Multi-branch sales and profit reports",
      "Staff roles, shifts and cash reconciliation",
    ],
    market: "bangladesh",
    seoTitle: "Super Shop Management Software & POS in Bangladesh",
    seoDescription:
      "Super shop management and POS software in Bangladesh from Kodenvia: barcode billing, receipt printing, stock control with low-stock alerts, multi-branch reports and cash reconciliation.",
    heading: "Super shop management and POS software in Bangladesh",
    summary:
      "Kodenvia's super shop management software is a point-of-sale (POS) system for supermarkets, grocery shops and retail chains in Bangladesh. Cashiers bill by barcode and print receipts, stock updates with every sale, and owners see sales and profit for each branch. Staff roles, shifts and cash reconciliation are built in.",
    audience: [
      "Super shops, grocery stores and departmental stores",
      "Retail businesses with more than one branch",
      "Shop owners who want to stop stock loss and cash mismatches at the till",
    ],
    features: [
      {
        title: "Barcode billing",
        description:
          "Scan products at the till and print a receipt in seconds.",
      },
      {
        title: "Stock control",
        description:
          "Stock falls with every sale, with alerts when a product runs low.",
      },
      {
        title: "Multi-branch reports",
        description:
          "Sales and profit for each branch and for the whole business.",
      },
      {
        title: "Staff roles and shifts",
        description:
          "Each cashier and manager has their own login, role and shift.",
      },
      {
        title: "Cash reconciliation",
        description:
          "Cash in the drawer is checked against recorded sales at the end of each shift.",
      },
    ],
    faqs: [
      {
        question: "What is super shop management software?",
        answer:
          "It is a point-of-sale and stock system for supermarkets and retail shops. It handles barcode billing at the till, keeps stock up to date, and reports on sales, profit and cash for each branch.",
      },
      {
        question: "How much does super shop POS software cost in Bangladesh?",
        answer:
          "The price depends on the number of branches, tills and users, and the features you need. After a short call we send a fixed price in writing within two working days.",
      },
      {
        question: "Does it work with barcode scanners and receipt printers?",
        answer:
          "Yes. The POS is built for barcode scanning and receipt printing at the till.",
      },
      {
        question: "Can it manage more than one branch?",
        answer:
          "Yes. Each branch has its own sales and stock, and the owner sees combined and per-branch sales and profit reports.",
      },
      {
        question: "Do you provide setup, training and support?",
        answer:
          "Yes. We set up the system with your products, train your cashiers and managers, and stay available for support.",
      },
    ],
    proof: { projectSlug: "netbazar-erp", reviewCompany: "NetBazar" },
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

/** Client feedback, in the clients' own approved words. */
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

export const faqs: Faq[] = [
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
