import type { Metadata } from "next";
import HireForm from "@/components/HireForm";
import SectionTitle from "@/components/SectionTitle";
import { contactDetails, process, telHref } from "@/data/siteData";
import { SERVICE_OPTIONS } from "@/lib/validation";

export const metadata: Metadata = {
  title: "Hire us",
  description:
    "Tell us about your project. Send the details and get a reply with scope, timeline and price within one working day.",
};

export default async function HireUsPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;

  // Only trust the query string if it names a service we actually offer.
  const defaultService = SERVICE_OPTIONS.find((option) => option === service);

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-100 bg-ink-50/50">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-50" />
        <div className="container-page relative py-20 lg:py-24">
          <SectionTitle
            as="h1"
            label="Hire us"
            title="Tell us about your project."
            description="Fill this in and we'll come back with scope, timeline and price — usually the same day, always within one working day."
          />
        </div>
      </section>

      <section className="container-page py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr]">
          <div data-anim="fade-up">
            <HireForm defaultService={defaultService} />
          </div>

          <aside data-anim="fade-left" data-anim-delay="0.15" className="space-y-6">
            <div className="rounded-3xl border border-ink-100 bg-white p-7 shadow-soft">
              <h2 className="text-lg font-bold text-ink-900">What happens next</h2>
              <ol className="mt-6 space-y-6">
                {process.map((item) => (
                  <li key={item.step} className="flex gap-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-50 font-mono text-xs font-bold text-brand-700">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-ink-900">{item.title}</h3>
                      <p className="mt-1.5 text-sm leading-6 text-ink-600">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-3xl bg-ink-950 p-7 text-white">
              <h2 className="text-lg font-bold">Rather just talk?</h2>
              <p className="mt-3 text-sm leading-7 text-ink-400">
                Email or call directly — we&apos;re around {contactDetails.hours}.
              </p>
              <div className="mt-5 space-y-2 text-sm font-semibold">
                <a href={`mailto:${contactDetails.email}`} className="block transition-colors hover:text-brand-300">
                  {contactDetails.email}
                </a>
                {contactDetails.phones.map((phone) => (
                  <a key={phone} href={telHref(phone)} className="block transition-colors hover:text-brand-300">
                    {phone}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
