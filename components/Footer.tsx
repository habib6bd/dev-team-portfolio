import Link from "next/link";
import { contactDetails, services } from "@/data/siteData";

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-ink-300">
      <div aria-hidden="true" className="absolute inset-0 bg-grid-dark opacity-40" />
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-brand-600/20 blur-3xl"
      />

      <div className="container-page relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-sm font-black text-white">
                DT
              </span>
              <span className="text-lg font-bold text-white">
                DevTeam <span className="font-medium text-ink-400">Studio</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-ink-400">
              A small, senior team building fast websites, ranking them on Google, and handling
              the day-to-day admin that keeps them earning.
            </p>

            <Link
              href="/hire-us"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink-900 transition-colors hover:bg-brand-400 hover:text-white"
            >
              Start a project
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-white">Company</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-ink-400 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-white">Services</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services#${service.slug}`}
                    className="text-ink-400 transition-colors hover:text-white"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-white">Get in touch</h2>
            <ul className="mt-5 space-y-3 text-sm text-ink-400">
              <li>
                <a href={`mailto:${contactDetails.email}`} className="transition-colors hover:text-white">
                  {contactDetails.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contactDetails.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-white"
                >
                  {contactDetails.phone}
                </a>
              </li>
              <li>{contactDetails.location}</li>
              <li className="text-ink-500">{contactDetails.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} DevTeam Studio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/hire-us" className="transition-colors hover:text-white">
              Hire us
            </Link>
            <Link href="/dashboard" className="transition-colors hover:text-white">
              Team dashboard
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
