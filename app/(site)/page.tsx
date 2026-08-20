import Link from "next/link";
import Counter from "@/components/animations/Counter";
import HeroHeadline from "@/components/animations/HeroHeadline";
import MagneticButton from "@/components/animations/MagneticButton";
import ReviewSlider from "@/components/ReviewSlider";
import SectionTitle from "@/components/SectionTitle";
import TeamGrid from "@/components/TeamGrid";
import { companies, process, projects, reviews, services, stats, team } from "@/data/siteData";

export default function HomePage() {
  return (
    <>
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
              Three specialists — development, SEO and admin support — working as one team.
              We ship responsive websites, get them found on Google, and keep them running
              long after launch.
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
                    <span className="mt-1 block text-xs font-medium uppercase tracking-wider text-ink-400">
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

              <div className="flex items-center justify-between gap-4 px-6 py-5">
                <div className="flex -space-x-3">
                  {team.map((member) => (
                    <span
                      key={member.slug}
                      title={member.name}
                      className="grid h-11 w-11 place-items-center rounded-full border-2 border-white bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-bold text-white"
                    >
                      {member.initials}
                    </span>
                  ))}
                </div>
                <p className="text-sm font-medium text-ink-500">
                  The three people
                  <br />
                  you&apos;ll work with
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- Client marquee */}
      <section className="border-b border-ink-100 bg-white py-12">
        <div className="container-page">
          <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-ink-400">
            Trusted by teams at
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
            {/* Duplicated once so the loop is seamless; the copy is hidden
                from assistive tech. */}
            {[...companies, ...companies].map((company, index) => (
              <li
                key={`${company}-${index}`}
                aria-hidden={index >= companies.length ? "true" : undefined}
                className="whitespace-nowrap text-2xl font-bold tracking-tight text-ink-300 transition-colors duration-300 hover:text-ink-500"
              >
                {company}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------ Services */}
      <section className="container-page py-24">
        <SectionTitle
          label="What we do"
          title="Three services that cover the whole lifecycle."
          description="Build it, get it found, keep it running. You can take one or all three — most clients start with a build and stay on for support."
        />

        <div data-anim="fade-up" data-anim-stagger="0.1" className="mt-14 grid gap-6 lg:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.slug}
              data-anim-child
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-lift"
            >
              <span
                aria-hidden="true"
                className="absolute right-7 top-7 font-mono text-5xl font-bold text-ink-100 transition-colors duration-500 group-hover:text-brand-100"
              >
                0{index + 1}
              </span>

              <h3 className="text-xl font-bold text-ink-900">{service.title}</h3>
              <p className="mt-4 text-base leading-7 text-ink-600">{service.description}</p>

              <ul className="mt-7 flex-1 space-y-3 border-t border-ink-100 pt-6 text-sm text-ink-600">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-7 text-sm font-bold text-brand-700">{service.startingAt}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- Team */}
      <section id="team" className="border-y border-ink-100 bg-ink-50/60 py-24">
        <div className="container-page">
          <SectionTitle
            label="The team"
            title="Small team. No account managers in between."
            description="You work directly with the three people doing the work — the same faces from the first call through to launch and beyond."
          />

          <div className="mt-14">
            <TeamGrid members={team} />
          </div>

          <p data-anim="fade-up" className="mt-10 text-sm text-ink-500">
            Need a specialist we don&apos;t cover?{" "}
            <Link href="/contact" className="font-semibold text-brand-700 underline underline-offset-4">
              Tell us what you need
            </Link>{" "}
            — we bring in trusted partners rather than pretending.
          </p>
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
              <span className="font-mono text-sm font-bold text-brand-600">{item.step}</span>
              <h3 className="mt-4 text-lg font-bold text-ink-900">{item.title}</h3>
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
              title="Recent projects and what they changed."
              description="A sample of what we've shipped. Each one links to the outcome the client actually cared about."
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
                <div className="relative h-44 overflow-hidden bg-gradient-to-br from-brand-400 via-brand-600 to-ink-900">
                  <div aria-hidden="true" className="absolute inset-0 bg-grid-dark opacity-30" />
                  <span className="absolute bottom-4 left-5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
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
          {reviews.length} of {reviews.length} clients would work with us again.
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
