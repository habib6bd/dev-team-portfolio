import SectionTitle from "@/components/SectionTitle";
import { team } from "@/data/siteData";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16">
      <SectionTitle
        label="About us"
        title="A focused team for practical business websites."
        description="We help businesses build professional websites, improve online presence, and manage digital tasks with a reliable workflow."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((member) => (
          <div key={member.name} className="rounded-3xl border p-6 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-700">
              {member.name.charAt(0)}
            </div>
            <h3 className="font-bold">{member.name}</h3>
            <p className="mt-1 text-sm text-slate-600">{member.role}</p>
          </div>
        ))}
      </div>
    </main>
  );
}