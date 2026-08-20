import type { Metadata } from "next";
import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import { faqs, process, services } from "@/data/siteData";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web development, SEO and admin support — what each service includes, what it costs, and what you get at the end.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-100 bg-ink-50/50">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-50" />
        <div className="container-page relative py-20 lg:py-24">
          <SectionTitle
            as="h1"
            label="Services"
            title="Services built around what clients actually ask for."
            description="No packages you have to decode. Each service lists exactly what is included and what it starts at."
          />
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid gap-8">
          {services.map((service, index) => (
            <article
              key={service.slug}
              id={service.slug}
              data-anim="fade-up"
              className="grid scroll-mt-28 gap-8 rounded-3xl border border-ink-100 bg-white p-8 shadow-soft lg:grid-cols-[1fr_1.1fr] lg:p-10"
            >
              <div>
                <span className="font-mono text-sm font-bold text-brand-600">
                  0{index + 1}
                </span>
                <h2 className="mt-4 text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
                  {service.title}
                </h2>
                <p className="mt-5 text-base leading-8 text-ink-600">{service.description}</p>

                <p className="mt-7 inline-flex rounded-full bg-brand-50 px-4 py-2 text-sm font-bold text-brand-800">
                  {service.startingAt}
                </p>
              </div>

              <div className="rounded-2xl bg-ink-50/80 p-7">
                <h3 className="text-sm font-bold uppercase tracking-widest text-ink-500">
                  What you get
                </h3>
                <ul className="mt-5 space-y-4">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-ink-700">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-600 text-[11px] font-bold text-white"
                      >
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/hire-us?service=${encodeURIComponent(service.title)}`}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
                >
                  Request {service.title.toLowerCase()}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-ink-100 bg-ink-50/60 py-24">
        <div className="container-page">
          <SectionTitle label="Process" title="How a project runs, start to finish." />

          <ol data-anim="fade-up" data-anim-stagger="0.1" className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {process.map((item) => (
              <li key={item.step} data-anim-child className="rounded-3xl border border-ink-100 bg-white p-7">
                <span className="font-mono text-sm font-bold text-brand-600">{item.step}</span>
                <h3 className="mt-4 text-lg font-bold text-ink-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-ink-600">{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-page py-24">
        <SectionTitle label="FAQ" title="Questions we get asked first." />

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
      </section>
    </>
  );
}
