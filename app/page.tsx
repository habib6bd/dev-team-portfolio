import Link from "next/link";
import ReviewSlider from "@/components/ReviewSlider";
import { companies, projects, services } from "@/data/siteData";

export default function HomePage() {
  return (
    <main>
      <section className="bg-gradient-to-br from-blue-50 via-white to-slate-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-800">
              Web Development • SEO • Admin Support
            </p>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              We build clean digital solutions for growing businesses.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              A professional developer team helping clients launch responsive websites,
              improve online visibility, and manage digital operations.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/hire-us" className="rounded-xl bg-blue-700 px-6 py-3 text-center font-semibold text-white">
                Hire our team
              </Link>
              <Link href="/projects" className="rounded-xl border px-6 py-3 text-center font-semibold">
                View projects
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-xl">
            <div className="rounded-2xl bg-blue-700 p-6 text-white">
              <p className="text-sm text-blue-100">What we focus on</p>
              <h2 className="mt-3 text-3xl font-bold">
                Reliable design, simple management, and measurable results.
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="mb-8 text-3xl font-bold">Who works with us</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {companies.map((company) => (
            <div key={company} className="flex h-24 items-center justify-center rounded-2xl border bg-white font-bold shadow-sm">
              {company}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-3xl font-bold">Featured Projects</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((project) => (
              <div key={project.title} className="rounded-3xl border bg-white p-6 shadow-sm">
                <div className="mb-5 h-36 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-700" />
                <p className="text-sm font-semibold text-blue-700">{project.category}</p>
                <h3 className="mt-2 text-xl font-bold">{project.title}</h3>
                <p className="mt-3 text-slate-600">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="mb-8 text-3xl font-bold">Our Services</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="rounded-3xl border p-6">
              <h3 className="text-xl font-bold text-blue-700">{service.title}</h3>
              <p className="mt-3 text-slate-600">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-8 text-3xl font-bold">Happy Clients</h2>
          <ReviewSlider />
        </div>
      </section>
    </main>
  );
}