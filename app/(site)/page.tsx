import Image from "next/image";
import Link from "next/link";
import Counter from "@/components/animations/Counter";
import HeroHeadline from "@/components/animations/HeroHeadline";
import MagneticButton from "@/components/animations/MagneticButton";
import ReviewSlider from "@/components/ReviewSlider";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import JsonLd from "@/components/JsonLd";
import { companies, contactDetails, process, projects, services, site, stats } from "@/data/siteData";
import { pageMetadata } from "@/lib/seo";
import { websiteSchema } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: `${site.name} | Software & Web Development Company in Bangladesh`,
  description:
    "Kodenvia builds fast websites, does technical SEO, and creates ERP, pharmacy and super shop management software. A remote team in Dhaka, Bangladesh, working with clients worldwide.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteSchema()} />

      {/* ---------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden border-b border-ink-100">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-60" />
        <div
          aria-hidden="true"
          className="absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-brand-200/40 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-56 -left-40 h-[28rem] w-[28rem] rounded-full bg-brand-100/60 blur-3xl"
        />

        <div className="container-page relative grid items-center gap-14 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-brand-700 shadow-soft backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-600" />
              </span>
              Available for new projects
            </span>

            <HeroHeadline className="mt-7 text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.2rem]">
              We build clean digital solutions for growing businesses.
            </HeroHeadline>

            <p
              data-anim="fade-up"
              data-anim-delay="0.45"
              className="mt-7 max-w-xl text-pretty text-lg leading-8 text-ink-600"
            >
              Websites, SEO and admin support — plus ERP, pharmacy and retail software built
              around how your business actually runs. One remote team that has been serving
              clients for over three years, from the first call to long after launch.
            </p>

            <div
              data-anim="fade-up"
              data-anim-delay="0.6"
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <MagneticButton
                href="/hire-us"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-7 py-4 text-base font-semibold text-white shadow-lift transition-colors duration-300 hover:bg-brand-600"
              >
                Hire our team
                <span aria-hidden="true">→</span>
              </MagneticButton>

              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-full border border-ink-200 bg-white px-7 py-4 text-base font-semibold text-ink-800 transition-all duration-300 hover:border-ink-300 hover:bg-ink-50"
              >
                View our work
              </Link>
            </div>

            <dl
              data-anim="fade-up"
              data-anim-delay="0.75"
              data-anim-stagger="0.08"
              className="mt-14 grid max-w-xl grid-cols-2 gap-6 border-t border-ink-100 pt-8 sm:grid-cols-4"
            >
              {stats.map((stat) => (
                <div key={stat.label} data-anim-child>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <Counter
                      value={stat.value}
                      suffix={stat.suffix}
                      className="block text-3xl font-bold tracking-tight text-ink-900"
                    />
                    <span className="mt-1 block text-xs font-medium uppercase tracking-wider text-ink-500">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Decorative "project status" panel — hints at how we work. */}
          <div data-anim="fade-left" data-anim-delay="0.5" className="relative">
            <div className="rounded-[2rem] border border-ink-100 bg-white/70 p-3 shadow-lift backdrop-blur">
              <div className="rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-ink-900 p-8 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-200">
                  How we work
                </p>
                <p className="mt-4 text-2xl font-bold leading-snug">
                  Reliable design, simple management, and results you can measure.
                </p>

                <ul className="mt-8 space-y-4 text-sm">
                  {[
                    "Fixed scope and price before we start",
                    "A live staging link from week one",
                    "One point of contact, not a ticket queue",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/15 text-[11px] font-bold"
                      >
                        ✓
                      </span>
                      <span className="text-brand-50">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-4 px-6 py-5">
                <span
                  aria-hidden="true"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-50 text-xl"
                >
                  🌍
                </span>
                <p className="text-sm font-medium text-ink-600">
                  <span className="block font-semibold text-ink-900">Fully remote team</span>
                  {contactDetails.location} · clients worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- Client marquee */}
      <section className="border-b border-ink-100 bg-white py-12">
        <div className="container-page">
          <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-ink-500">
            Trusted by us
          </p>
        </div>

        <div className="marquee-wrap relative mt-8 overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent"
          />

          <ul className="animate-marquee flex w-max items-center gap-14 pr-14">
            {/* Repeated so the track is wide enough to loop seamlessly with only
                a few logos; the copies are hidden from assistive tech. */}
            {[...companies, ...companies, ...companies].map((company, index) => (
              <li
                key={`${company.name}-${index}`}
                aria-hidden={index >= companies.length ? "true" : undefined}
                className="flex items-center gap-3 whitespace-nowrap grayscale transition-all duration-300 hover:grayscale-0"
              >
                <Image
                  src={company.logo}
                  alt={index >= companies.length ? "" : `${company.name} logo`}
                  width={56}
                  height={56}
                  className="h-12 w-12 rounded-xl object-contain"
                />
                <span className="text-lg font-bold tracking-tight text-ink-500">{company.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------ Services */}
      <section id="services" className="scroll-mt-20 border-b border-ink-100 bg-ink-50/60 py-24">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle
              label="What we do"
              title="From your website to the software that runs your business."
              description="Build it, get it found, keep it running — and when spreadsheets stop scaling, we build the ERP, pharmacy or retail system to replace them."
            />
            <Link
              data-anim="fade-up"
              href="/services"
              className="rounded-full border border-ink-200 bg-white px-6 py-3 text-sm font-semibold text-ink-800 transition-colors hover:border-ink-300 hover:bg-ink-50"
            >
              All services
            </Link>
          </div>

          <ul
            data-anim="fade-up"
            data-anim-stagger="0.08"
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {services.map((service) => (
              <li key={service.id} className="flex">
                <ServiceCard service={service} />
              </li>
            ))}

            {/* Fills the last slot of the grid with a route for everything else. */}
            <li className="flex">
              <div
                data-anim-child
                className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-ink-900 p-7 text-white shadow-soft"
              >
                <div aria-hidden="true" className="absolute inset-0 bg-grid-dark opacity-30" />
                <div className="relative">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-200">
                    Something else?
                  </p>
                  <h3 className="mt-4 text-xl font-bold leading-snug">
                    Tell us what you need — we&apos;ll tell you honestly if we&apos;re the right fit.
                  </h3>
                </div>
                <Link
                  href="/hire-us"
                  className="relative mt-8 inline-flex items-center justify-center gap-2 self-start rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink-900 transition-colors hover:bg-brand-400 hover:text-white"
                >
                  Get a quote
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------- Process */}
      <section className="container-page py-24">
        <SectionTitle
          label="Process"
          title="Four steps, no mystery."
          description="You always know what stage the project is at and what happens next."
        />

        <ol data-anim="fade-up" data-anim-stagger="0.1" className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {process.map((item) => (
            <li
              key={item.step}
              data-anim-child
              className="relative rounded-3xl border border-ink-100 bg-white p-7 transition-shadow duration-500 hover:shadow-soft"
            >
              <h3 className="text-lg font-bold text-ink-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-ink-600">{item.description}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ------------------------------------------------------ Projects */}
      <section className="border-y border-ink-100 bg-ink-50/60 py-24">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle
              label="Selected work"
              title="Recent work for our clients."
              description="A sample of what we've shipped across web development, business software and SEO."
            />
            <Link
              data-anim="fade-up"
              href="/projects"
              className="rounded-full border border-ink-200 bg-white px-6 py-3 text-sm font-semibold text-ink-800 transition-colors hover:border-ink-300 hover:bg-ink-50"
            >
              All projects
            </Link>
          </div>

          <div data-anim="fade-up" data-anim-stagger="0.1" className="mt-14 grid gap-6 md:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.slug}
                data-anim-child
                className="group flex flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
              >
                <div className="theme-fixed relative aspect-[16/10] overflow-hidden bg-ink-100">
                  <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    fill
                    loading="lazy"
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink-950/70 to-transparent"
                  />
                  <span className="absolute bottom-4 left-5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                    {project.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-lg font-bold text-ink-900">{project.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-ink-600">{project.description}</p>

                  <p className="mt-5 rounded-xl bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-800">
                    {project.result}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Reviews */}
      <section className="container-page py-24">
        <SectionTitle
          label="Client feedback"
          title="What it's like to work with us."
          align="center"
        />

        <div data-anim="fade-up" className="mx-auto mt-14 max-w-3xl">
          <ReviewSlider />
        </div>

        <p className="mt-8 text-center text-sm text-ink-500">
          Over three years of web development, SEO, admin support and business software for
          our clients.
        </p>
      </section>

      {/* ----------------------------------------------------------- CTA */}
      <section className="relative overflow-hidden bg-ink-950 py-24">
        <div aria-hidden="true" className="absolute inset-0 bg-grid-dark opacity-40" />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 h-72 w-[45rem] -translate-x-1/2 rounded-full bg-brand-600/25 blur-3xl"
        />

        <div className="container-page relative text-center">
          <SectionTitle
            label="Start a project"
            title="Tell us what you're building."
            description="Send the details and you'll have a reply — with a real opinion, not a template — within one working day."
            align="center"
            tone="dark"
          />

          <div data-anim="fade-up" data-anim-delay="0.15" className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <MagneticButton
              href="/hire-us"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-ink-900 transition-colors duration-300 hover:bg-brand-400 hover:text-white"
            >
              Hire our team
              <span aria-hidden="true">→</span>
            </MagneticButton>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 text-base font-semibold text-white transition-colors duration-300 hover:bg-white/10"
            >
              Just ask a question
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
