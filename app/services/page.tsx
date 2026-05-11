import SectionTitle from "@/components/SectionTitle";
import { services } from "@/data/siteData";

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16">
      <SectionTitle
        label="Services"
        title="Services built for client needs"
        description="We provide practical digital services for businesses that need clean execution and reliable support."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <div key={service.title} className="rounded-3xl border p-6 shadow-sm">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-700 text-lg font-bold text-white">
              {service.title.charAt(0)}
            </div>
            <h2 className="text-xl font-bold">{service.title}</h2>
            <p className="mt-3 leading-7 text-slate-600">{service.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}