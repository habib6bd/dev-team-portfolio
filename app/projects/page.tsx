import SectionTitle from "@/components/SectionTitle";
import { projects } from "@/data/siteData";

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16">
      <SectionTitle
        label="Projects"
        title="Recent work examples"
        description="Here are some example projects. You can replace these with your real portfolio items later."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {projects.map((project) => (
          <article key={project.title} className="rounded-3xl border bg-white p-6 shadow-sm">
            <div className="mb-5 h-40 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-700" />
            <p className="text-sm font-semibold text-blue-700">{project.category}</p>
            <h2 className="mt-2 text-xl font-bold">{project.title}</h2>
            <p className="mt-3 leading-7 text-slate-600">{project.description}</p>
          </article>
        ))}
      </div>
    </main>
  );
}