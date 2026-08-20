import type { Metadata } from "next";
import Link from "next/link";
import Counter from "@/components/animations/Counter";
import SectionTitle from "@/components/SectionTitle";
import TeamGrid from "@/components/TeamGrid";
import { process, stats, team } from "@/data/siteData";

export const metadata: Metadata = {
  title: "About the team",
  description:
    "Meet the three specialists behind DevTeam Studio — development, SEO and admin support, working as one team.",
};

const values = [
  {
    title: "Fixed scope, fixed price",
    description:
      "You approve a number and a date before anything starts. If the scope changes we tell you what it costs before we build it.",
  },
  {
    title: "Show, don't report",
    description:
      "Progress lives on a staging link you can open any time — not in a status email that says 70% complete.",
  },
  {
    title: "You own everything",
    description:
      "Code, accounts, domains and documentation are yours from day one. No lock-in, no hostage hosting.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-100 bg-ink-50/50">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-50" />
        <div className="container-page relative py-20 lg:py-24">
          <SectionTitle
            as="h1"
            label="About us"
            title="A focused team for practical business websites."
            description="We help businesses build professional websites, improve their visibility, and handle the digital tasks that pile up — with a workflow that stays predictable from the first call to the last invoice."
          />
        </div>
      </section>

      <section className="container-page py-20">
        <dl data-anim="fade-up" data-anim-stagger="0.08" className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} data-anim-child className="border-l-2 border-brand-500 pl-5">
              <dt className="text-sm font-medium text-ink-500">{stat.label}</dt>
              <dd>
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  className="mt-2 block text-4xl font-bold tracking-tight text-ink-900"
                />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-y border-ink-100 bg-ink-50/60 py-24">
        <div className="container-page">
          <SectionTitle
            label="The team"
            title="Three people, three specialisms."
            description="Everyone here does the work themselves. There is no layer of account managers between you and the person writing the code."
          />

          <div className="mt-14">
            <TeamGrid members={team} />
          </div>
        </div>
      </section>

      <section className="container-page py-24">
        <SectionTitle
          label="How we operate"
          title="The rules we don't bend."
        />

        <div data-anim="fade-up" data-anim-stagger="0.1" className="mt-14 grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <article
              key={value.title}
              data-anim-child
              className="rounded-3xl border border-ink-100 bg-white p-8 transition-shadow duration-500 hover:shadow-soft"
            >
              <h3 className="text-lg font-bold text-ink-900">{value.title}</h3>
              <p className="mt-4 text-sm leading-7 text-ink-600">{value.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-ink-100 bg-ink-50/60 py-24">
        <div className="container-page">
          <SectionTitle label="Process" title="What working with us looks like." />

          <ol data-anim="fade-up" data-anim-stagger="0.1" className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {process.map((item) => (
              <li key={item.step} data-anim-child className="rounded-3xl border border-ink-100 bg-white p-7">
                <span className="font-mono text-sm font-bold text-brand-600">{item.step}</span>
                <h3 className="mt-4 text-lg font-bold text-ink-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-ink-600">{item.description}</p>
              </li>
            ))}
          </ol>

          <div data-anim="fade-up" className="mt-14 text-center">
            <Link
              href="/hire-us"
              className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-brand-600"
            >
              Start a project
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
