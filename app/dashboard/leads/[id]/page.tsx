import Link from "next/link";
import { notFound } from "next/navigation";
import { removeLead, setLeadNotes, setLeadStatus } from "@/app/actions/dashboard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { requireAuth } from "@/lib/auth";
import { getLead } from "@/lib/leads";
import { LEAD_STATUSES, type LeadStatus } from "@/lib/validation";

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-ink-100 py-3.5 first:border-t-0 first:pt-0">
      <dt className="text-xs font-semibold uppercase tracking-wider text-ink-400">{label}</dt>
      <dd className="mt-1.5 text-sm text-ink-800">{children}</dd>
    </div>
  );
}

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAuth();

  const { id } = await params;
  if (!/^\d+$/.test(id)) notFound();

  const lead = await getLead(id);
  if (!lead) notFound();

  const received = new Date(lead.created_at).toLocaleString("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
  });

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard/leads"
        className="inline-flex items-center gap-2 text-sm font-semibold text-ink-500 transition-colors hover:text-ink-800"
      >
        <span aria-hidden="true">←</span> Back to enquiries
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink-900">{lead.name}</h1>
          <p className="mt-1 text-sm text-ink-500">Received {received}</p>
        </div>
        <StatusBadge status={lead.status as LeadStatus} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
            <h2 className="text-sm font-bold text-ink-900">Project details</h2>
            <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-ink-700">{lead.message}</p>
          </section>

          <section className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
            <h2 className="text-sm font-bold text-ink-900">Internal notes</h2>
            <p className="mt-1 text-xs text-ink-500">Only your team sees this.</p>

            <form action={setLeadNotes} className="mt-4">
              <input type="hidden" name="id" value={lead.id} />
              <label htmlFor="notes" className="sr-only">
                Internal notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={5}
                defaultValue={lead.notes ?? ""}
                placeholder="Call summary, quoted price, next step…"
                className="w-full rounded-xl border border-ink-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
              />
              <button
                type="submit"
                className="mt-3 rounded-xl bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
              >
                Save notes
              </button>
            </form>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
            <h2 className="text-sm font-bold text-ink-900">Contact</h2>
            <dl className="mt-4">
              <Detail label="Email">
                <a
                  href={`mailto:${lead.email}?subject=${encodeURIComponent(`Re: your ${lead.service} enquiry`)}`}
                  className="font-semibold text-brand-700 underline underline-offset-4"
                >
                  {lead.email}
                </a>
              </Detail>
              {lead.phone && (
                <Detail label="Phone">
                  <a href={`tel:${lead.phone.replace(/\s/g, "")}`} className="font-semibold text-brand-700 underline underline-offset-4">
                    {lead.phone}
                  </a>
                </Detail>
              )}
              {lead.company && <Detail label="Company">{lead.company}</Detail>}
              <Detail label="Service">{lead.service}</Detail>
              <Detail label="Budget">{lead.budget ?? "Not specified"}</Detail>
              <Detail label="Timeline">{lead.timeline ?? "Not specified"}</Detail>
            </dl>
          </section>

          <section className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
            <h2 className="text-sm font-bold text-ink-900">Status</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {LEAD_STATUSES.map((status) => (
                <form key={status} action={setLeadStatus}>
                  <input type="hidden" name="id" value={lead.id} />
                  <input type="hidden" name="status" value={status} />
                  <button
                    type="submit"
                    disabled={lead.status === status}
                    className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold capitalize transition-colors ${
                      lead.status === status
                        ? "cursor-default border-ink-900 bg-ink-900 text-white"
                        : "border-ink-200 text-ink-600 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
                    }`}
                  >
                    {status}
                  </button>
                </form>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
            <h2 className="text-sm font-bold text-ink-900">Where this came from</h2>
            <dl className="mt-4">
              <Detail label="Page">{lead.source_path ?? "Unknown"}</Detail>
              <Detail label="Referrer">{lead.referrer ?? "Direct"}</Detail>
              <Detail label="Country">{lead.country ?? "Unknown"}</Detail>
            </dl>
          </section>

          <form action={removeLead} className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <h2 className="text-sm font-bold text-red-900">Delete this enquiry</h2>
            <p className="mt-1.5 text-xs leading-6 text-red-700">
              Permanent, and it removes the client&apos;s message and contact details. Archive it
              instead if you only want it out of the way.
            </p>
            <input type="hidden" name="id" value={lead.id} />
            <button
              type="submit"
              className="mt-4 rounded-xl border border-red-300 bg-white px-5 py-2.5 text-sm font-semibold text-red-700 transition-colors hover:bg-red-100"
            >
              Delete permanently
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
