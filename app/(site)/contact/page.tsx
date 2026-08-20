import type { Metadata } from "next";
import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import { contactDetails, faqs } from "@/data/siteData";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with DevTeam Studio about web development, SEO setup, admin support or ongoing maintenance.",
};

const channels = [
  {
    label: "Email",
    value: contactDetails.email,
    href: `mailto:${contactDetails.email}`,
    hint: "Best for project details and documents",
  },
  {
    label: "Phone / WhatsApp",
    value: contactDetails.phone,
    href: `tel:${contactDetails.phone.replace(/\s/g, "")}`,
    hint: "Fastest for quick questions",
  },
  {
    label: "Location",
    value: contactDetails.location,
    hint: contactDetails.hours,
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-100 bg-ink-50/50">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-50" />
        <div className="container-page relative py-20 lg:py-24">
          <SectionTitle
            as="h1"
            label="Contact"
            title="Let's discuss your project."
            description="Reach us however suits you. Whichever route you take, you'll get a reply from one of the three of us — not an automated queue."
          />
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div data-anim="fade-up" data-anim-stagger="0.08" className="grid gap-4 sm:grid-cols-1">
            {channels.map((channel) => (
              <div
                key={channel.label}
                data-anim-child
                className="rounded-3xl border border-ink-100 bg-white p-7 shadow-soft"
              >
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-400">
                  {channel.label}
                </p>
                {channel.href ? (
                  <a
                    href={channel.href}
                    className="mt-3 block text-xl font-bold text-ink-900 transition-colors hover:text-brand-600"
                  >
                    {channel.value}
                  </a>
                ) : (
                  <p className="mt-3 text-xl font-bold text-ink-900">{channel.value}</p>
                )}
                <p className="mt-2 text-sm text-ink-500">{channel.hint}</p>
              </div>
            ))}
          </div>

          <aside
            data-anim="fade-left"
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-ink-950 p-9 text-white"
          >
            <div aria-hidden="true" className="absolute inset-0 bg-grid-dark opacity-30" />

            <div className="relative">
              <h2 className="text-2xl font-bold">Need a project quote?</h2>
              <p className="mt-4 text-brand-100">
                The hire form takes about two minutes and gives us everything we need to come back
                with a real number instead of &ldquo;it depends&rdquo;.
              </p>

              <ul className="mt-8 space-y-3 text-sm text-brand-50">
                {[
                  "Scope, timeline and price in writing",
                  "A reply within one working day",
                  "No obligation, no sales sequence",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/15 text-[11px] font-bold"
                    >
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/hire-us"
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink-900 transition-colors hover:bg-brand-400 hover:text-white"
              >
                Open the hire form
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-ink-100 bg-ink-50/60 py-24">
        <div className="container-page">
          <SectionTitle label="FAQ" title="Before you write to us." />

          <div data-anim="fade-up" className="mt-12 max-w-3xl divide-y divide-ink-100 border-y border-ink-100">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-base font-semibold text-ink-900">
                  {faq.question}
                  <span
                    aria-hidden="true"
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-ink-200 text-ink-500 transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-ink-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
