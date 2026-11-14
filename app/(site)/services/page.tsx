import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import { faqs, process, services } from "@/data/siteData";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web development, SEO, admin support, ERP, custom software, pharmacy and super shop management software — what each service includes and what you get at the end.",
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

      <section className="container-page py-24">
        <div className="grid gap-8">
          {services.map((service) => (
            <article
              key={service.id}
              id={service.id}
              data-anim="fade-up"
              className="group grid scroll-mt-28 gap-8 rounded-3xl border border-ink-100 bg-white p-6 shadow-soft sm:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 lg:p-10"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-ink-100 lg:aspect-auto lg:min-h-80">
                <Image
                  src={service.image.src}
                  alt={service.image.alt}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1280px) 480px, (min-width: 1024px) 40vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
                  {service.title}
                </h2>
                <p className="mt-4 text-base leading-8 text-ink-600">{service.overview}</p>

                <h3 className="mt-8 text-sm font-bold uppercase tracking-widest text-ink-500">
                  What you get
                </h3>
                <ul className="mt-5 grid gap-4 sm:grid-cols-2">
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
                  Get a quote
                  <span className="sr-only"> for {service.title}</span>
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
                <h3 className="text-lg font-bold text-ink-900">{item.title}</h3>
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
