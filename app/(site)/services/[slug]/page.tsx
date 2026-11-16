import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import MagneticButton from "@/components/animations/MagneticButton";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import { process, projects, reviews, services } from "@/data/siteData";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/structured-data";

type Props = { params: Promise<{ slug: string }> };

// One static page per service; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.id === slug);
  if (!service) return {};

  return pageMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: service.link,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((item) => item.id === slug);
  if (!service) notFound();

  const project = projects.find((item) => item.slug === service.proof?.projectSlug);
  const review = reviews.find((item) => item.company === service.proof?.reviewCompany);
  const otherServices = services.filter((item) => item.id !== service.id).slice(0, 3);
  const quoteHref = `/hire-us?service=${encodeURIComponent(service.title)}`;

  const trail = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.title, path: service.link },
  ];

  return (
    <>
      <JsonLd data={[serviceSchema(service), breadcrumbSchema(trail), faqSchema(service.faqs)]} />

      {/* ---------------------------------------------------------- Intro */}
      <section className="relative overflow-hidden border-b border-ink-100 bg-ink-50/50">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-50" />
        <div className="container-page relative grid items-center gap-12 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
          <div>
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-ink-500">
                {trail.map((item, index) => (
                  <li key={item.path} className="flex items-center gap-2">
                    {index > 0 && <span aria-hidden="true">/</span>}
                    {index === trail.length - 1 ? (
                      <span aria-current="page" className="font-semibold text-ink-800">
                        {item.name}
                      </span>
                    ) : (
                      <Link href={item.path} className="transition-colors hover:text-brand-700">
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>

            <h1 className="mt-6 text-balance text-4xl font-bold leading-tight tracking-tight text-ink-900 sm:text-5xl">
              {service.heading}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-ink-600">
              {service.summary}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <MagneticButton
                href={quoteHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-7 py-4 text-base font-semibold text-white shadow-lift transition-colors duration-300 hover:bg-brand-600"
              >
                Get a quote
                <span aria-hidden="true">→</span>
              </MagneticButton>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-ink-200 bg-white px-7 py-4 text-base font-semibold text-ink-800 transition-all duration-300 hover:border-ink-300 hover:bg-ink-50"
              >
                Ask a question
              </Link>
            </div>
          </div>

          <div className="relative aspect-[16/11] overflow-hidden rounded-3xl bg-ink-100 shadow-lift">
            <Image
              src={service.image.src}
              alt={service.image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Features */}
      <section className="container-page py-24">
        <SectionTitle
          label="What it does"
          title={`What our ${service.title.toLowerCase()} service covers.`}
        />

        <ul
          data-anim="fade-up"
          data-anim-stagger="0.08"
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {service.features.map((feature) => (
            <li
              key={feature.title}
              data-anim-child
              className="rounded-3xl border border-ink-100 bg-white p-7 shadow-soft"
            >
              <h3 className="text-lg font-bold text-ink-900">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-ink-600">{feature.description}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ------------------------------------- Audience and deliverables */}
      <section className="border-y border-ink-100 bg-ink-50/60 py-24">
        <div className="container-page grid gap-8 lg:grid-cols-2">
          <div data-anim="fade-up" className="rounded-3xl border border-ink-100 bg-white p-8 shadow-soft">
            <h2 className="text-2xl font-bold tracking-tight text-ink-900">Who it is for</h2>
            <ul className="mt-6 space-y-4">
              {service.audience.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base leading-7 text-ink-700">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div data-anim="fade-up" data-anim-delay="0.1" className="rounded-3xl border border-ink-100 bg-white p-8 shadow-soft">
            <h2 className="text-2xl font-bold tracking-tight text-ink-900">What you get</h2>
            <ul className="mt-6 space-y-4">
              {service.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base leading-7 text-ink-700">
                  <span
                    aria-hidden="true"
                    className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-600 text-[11px] font-bold text-white"
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- Process */}
      <section className="container-page py-24">
        <SectionTitle label="Process" title="How the work runs, start to finish." />

        <ol data-anim="fade-up" data-anim-stagger="0.1" className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {process.map((item) => (
            <li key={item.step} data-anim-child className="rounded-3xl border border-ink-100 bg-white p-7">
              <h3 className="text-lg font-bold text-ink-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-ink-600">{item.description}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------------------------------------------------------- Proof */}
      {(project || review) && (
        <section className="border-y border-ink-100 bg-ink-50/60 py-24">
          <div className="container-page">
            <SectionTitle label="Our work" title="A project behind this service." />

            <div className="mt-14 grid gap-8 lg:grid-cols-2">
              {project && (
                <article data-anim="fade-up" className="overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-soft">
                  <div className="relative aspect-[16/10] bg-ink-100">
                    <Image
                      src={project.image.src}
                      alt={project.image.alt}
                      fill
                      loading="lazy"
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-7">
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-700">
                      {project.category}
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-ink-900">{project.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-ink-600">{project.description}</p>
                    <Link
                      href="/projects"
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-600"
                    >
                      See all projects
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              )}

              {review && (
                <figure data-anim="fade-up" data-anim-delay="0.1" className="flex flex-col justify-center rounded-3xl border border-ink-100 bg-white p-8 shadow-soft">
                  <blockquote className="text-lg leading-8 text-ink-700">“{review.text}”</blockquote>
                  <figcaption className="mt-6 text-sm text-ink-500">
                    <span className="block font-semibold text-ink-900">{review.name}</span>
                    {review.role}, {review.company}
                  </figcaption>
                </figure>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------ FAQ */}
      <section className="container-page py-24">
        <SectionTitle
          label="FAQ"
          title={`Common questions about ${service.title.toLowerCase()}.`}
        />
        <FaqList faqs={service.faqs} />
      </section>

      {/* ------------------------------------------------- Other services */}
      <section className="border-t border-ink-100 bg-ink-50/60 py-24">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle label="More services" title="Other things we can help with." />
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-600"
            >
              All services
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div data-anim="fade-up" data-anim-stagger="0.1" className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((item) => (
              <ServiceCard key={item.id} service={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ CTA */}
      <section className="relative overflow-hidden bg-ink-950 py-24">
        <div aria-hidden="true" className="absolute inset-0 bg-grid-dark opacity-40" />
        <div className="container-page relative text-center">
          <SectionTitle
            label="Get a quote"
            title={`Need ${service.title.toLowerCase()}?`}
            description="Send the details and you will have a reply with scope, timeline and price within one working day."
            align="center"
            tone="dark"
          />

          <div data-anim="fade-up" data-anim-delay="0.15" className="mt-10 flex justify-center">
            <MagneticButton
              href={quoteHref}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-ink-900 transition-colors duration-300 hover:bg-brand-400 hover:text-white"
            >
              Get a quote
              <span aria-hidden="true">→</span>
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
