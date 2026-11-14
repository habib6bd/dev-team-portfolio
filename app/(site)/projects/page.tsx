import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import { projects } from "@/data/siteData";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Recent web development, ERP software and SEO work from the Kodenvia team.",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-100 bg-ink-50/50">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-50" />
        <div className="container-page relative py-20 lg:py-24">
          <SectionTitle
            as="h1"
            label="Projects"
            title="Work we've shipped for our clients."
            description="A selection from more than three years of web development, SEO, admin support and business software work."
          />
        </div>
      </section>

      <section className="container-page py-20">
        <div data-anim="fade-up" data-anim-stagger="0.1" className="grid gap-8">
          {projects.map((project) => (
            <article
              key={project.slug}
              data-anim-child
              className="group grid gap-8 overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-soft transition-shadow duration-500 hover:shadow-lift lg:grid-cols-[1fr_1.2fr]"
            >
              <div className="theme-fixed relative aspect-[16/10] overflow-hidden bg-ink-100 lg:aspect-auto lg:min-h-72">
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-950/70 to-transparent"
                />
                <span className="absolute bottom-5 left-6 rounded-full bg-white/20 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur">
                  {project.category}
                </span>
              </div>

              <div className="p-8 lg:py-10 lg:pr-10">
                <h2 className="text-2xl font-bold tracking-tight text-ink-900">{project.title}</h2>
                <p className="mt-4 text-base leading-8 text-ink-600">{project.description}</p>

                <p className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-800">
                  <span aria-hidden="true">↗</span>
                  {project.result}
                </p>

                <ul className="mt-7 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-ink-100 bg-ink-50 px-3 py-1 text-xs font-medium text-ink-600"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div data-anim="fade-up" className="mt-16 rounded-3xl border border-dashed border-ink-200 bg-ink-50/60 p-10 text-center">
          <h2 className="text-xl font-bold text-ink-900">Have something similar in mind?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-ink-600">
            Send us the details and we&apos;ll tell you honestly whether it&apos;s a two-week job or a
            two-month one — before you commit to anything.
          </p>
          <Link
            href="/hire-us"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink-900 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
          >
            Start a project
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
