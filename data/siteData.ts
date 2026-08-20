export type Service = {
  slug: string;
  title: string;
  description: string;
  deliverables: string[];
  startingAt: string;
};

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  focus: string;
  bio: string;
  initials: string;
  skills: string[];
  stats: { label: string; value: string }[];
  links: { label: string; href: string }[];
};

export const companies = [
  "TechNova",
  "BrightSoft",
  "BluePeak",
  "DataHive",
  "CloudNest",
  "Northwind",
];

export const stats = [
  { value: 48, suffix: "+", label: "Projects delivered" },
  { value: 26, suffix: "", label: "Happy clients" },
  { value: 6, suffix: " yrs", label: "Combined experience" },
  { value: 24, suffix: "h", label: "Average reply time" },
];

/* The three people a client actually works with. */
export const team: TeamMember[] = [
  {
    slug: "mahabubur-rahman",
    name: "Mahabubur Rahman",
    role: "Project Manager & Full-Stack Developer",
    focus: "Strategy, architecture, delivery",
    bio: "Runs every engagement end to end — scoping, architecture and the weekly build. Writes the backend, keeps the timeline honest, and is the person you talk to when something needs a decision.",
    initials: "MR",
    skills: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Project delivery"],
    stats: [
      { label: "Projects led", value: "30+" },
      { label: "Experience", value: "5 yrs" },
    ],
    links: [
      { label: "Email", href: "mailto:hello@devteamstudio.com" },
      { label: "LinkedIn", href: "https://www.linkedin.com" },
    ],
  },
  {
    slug: "frontend-lead",
    name: "Tanvir Ahmed",
    role: "Frontend Developer",
    focus: "Interface, motion, accessibility",
    bio: "Turns designs into fast, responsive interfaces that hold up on a mid-range phone. Obsessive about layout details, Core Web Vitals and making animation feel intentional rather than decorative.",
    initials: "TA",
    skills: ["React", "Tailwind CSS", "GSAP", "UI systems", "Accessibility"],
    stats: [
      { label: "Interfaces shipped", value: "40+" },
      { label: "Avg. Lighthouse", value: "95+" },
    ],
    links: [
      { label: "Email", href: "mailto:hello@devteamstudio.com" },
      { label: "GitHub", href: "https://github.com" },
    ],
  },
  {
    slug: "seo-specialist",
    name: "Nusrat Jahan",
    role: "SEO Specialist & Admin Support",
    focus: "Visibility, content ops, reporting",
    bio: "Handles the work that keeps a site earning after launch — technical SEO, on-page structure, content updates and the monthly report that tells you what actually changed.",
    initials: "NJ",
    skills: ["Technical SEO", "Keyword research", "Analytics", "Content ops", "Reporting"],
    stats: [
      { label: "Sites optimised", value: "35+" },
      { label: "Avg. traffic lift", value: "2.4x" },
    ],
    links: [
      { label: "Email", href: "mailto:hello@devteamstudio.com" },
      { label: "LinkedIn", href: "https://www.linkedin.com" },
    ],
  },
];

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    description:
      "Responsive marketing sites, landing pages and custom dashboards built on Next.js — fast, accessible and easy for your team to maintain.",
    deliverables: [
      "Responsive marketing site or web app",
      "CMS or admin panel for your content",
      "Performance & accessibility pass",
      "Deployment and handover docs",
    ],
    startingAt: "From $900",
  },
  {
    slug: "seo",
    title: "SEO",
    description:
      "Technical audits, on-page structure, metadata and Core Web Vitals work that moves a site up the results page and keeps it there.",
    deliverables: [
      "Full technical SEO audit",
      "On-page & metadata implementation",
      "Schema markup and sitemap setup",
      "Monthly ranking and traffic report",
    ],
    startingAt: "From $350/mo",
  },
  {
    slug: "admin-support",
    title: "Admin Support",
    description:
      "The ongoing operational work — content updates, data entry, product uploads and reporting — handled so your team can stay on the business.",
    deliverables: [
      "Content and product updates",
      "Data entry and clean-up",
      "Inbox and CRM maintenance",
      "Weekly progress reporting",
    ],
    startingAt: "From $250/mo",
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
    slug: "business-landing-website",
    title: "Business Landing Website",
    category: "Web Development",
    description:
      "A responsive lead-generation site for a B2B services firm, rebuilt for speed and clarity.",
    result: "3.1x more enquiries in the first quarter",
    tags: ["Next.js", "Tailwind CSS", "Vercel"],
  },
  {
    slug: "admin-dashboard",
    title: "Operations Dashboard",
    category: "Admin Support",
    description:
      "An internal dashboard for managing users, reports and daily business data in one place.",
    result: "Cut weekly reporting time from 6 hours to 40 minutes",
    tags: ["React", "PostgreSQL", "Charts"],
  },
  {
    slug: "seo-growth-setup",
    title: "SEO Growth Setup",
    category: "SEO",
    description:
      "Technical SEO, metadata, internal structure and performance work for an e-commerce catalogue.",
    result: "Organic sessions up 240% over six months",
    tags: ["Technical SEO", "Schema", "Core Web Vitals"],
  },
];

export const reviews = [
  {
    name: "Sarah Mitchell",
    role: "Marketing Director",
    company: "BrightSoft Agency",
    text: "The team delivered a clean, professional website ahead of schedule. The weekly staging links meant there were no surprises at the end — we knew exactly what we were getting.",
  },
  {
    name: "David Brown",
    role: "Founder",
    company: "BluePeak Solutions",
    text: "They understood our requirements clearly and built a responsive site that finally works properly on mobile. Enquiries through the site have roughly tripled since launch.",
  },
  {
    name: "Nadia Karim",
    role: "Operations Lead",
    company: "CloudNest Digital",
    text: "Excellent ongoing support with site updates, SEO and admin tasks. Having one team handle all three has saved us a lot of coordination time.",
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
      "Yes. We are based in Dhaka and work with clients across Europe, North America and Australia. We hold a fixed overlap window each day and reply to messages within one working day.",
  },
  {
    question: "What happens after launch?",
    answer:
      "You get the code, the documentation and full ownership. Most clients continue with a support retainer for updates, SEO and admin work, but there is no lock-in.",
  },
];

export const contactDetails = {
  email: "hello@devteamstudio.com",
  phone: "+880 1700-000000",
  location: "Dhaka, Bangladesh",
  hours: "Sun–Thu, 10:00–19:00 (GMT+6)",
};
