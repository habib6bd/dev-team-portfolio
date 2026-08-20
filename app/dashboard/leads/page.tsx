import Link from "next/link";
import { Suspense } from "react";
import LeadFilters from "@/components/dashboard/LeadFilters";
import SetupNotice from "@/components/dashboard/SetupNotice";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { requireAuth } from "@/lib/auth";
import { isDatabaseConfigured } from "@/lib/db";
import { attempt } from "@/lib/attempt";
import { listLeads } from "@/lib/leads";
import type { LeadStatus } from "@/lib/validation";

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  await requireAuth();

  const { status = "all", q = "" } = await searchParams;

  if (!isDatabaseConfigured()) return <SetupNotice />;

  // Fetch once, unfiltered, so the tab counts stay accurate while a filter
  // is applied — then narrow in memory.
  const result = await attempt("dashboard/leads", () => listLeads());
  if (!result.ok) return <SetupNotice error={result.error} />;

  const all = result.data;

  const counts: Record<string, number> = { all: all.length };
    for (const lead of all) counts[lead.status] = (counts[lead.status] ?? 0) + 1;

    const term = q.trim().toLowerCase();
    const leads = all.filter((lead) => {
      if (status !== "all" && lead.status !== status) return false;
      if (!term) return true;
      return [lead.name, lead.email, lead.company, lead.message]
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(term));
    });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ink-900">Clients & enquiries</h1>
        <p className="mt-1 text-sm text-ink-500">
          Everything submitted through the hire form, newest first.
        </p>
      </div>

      <Suspense fallback={null}>
        <LeadFilters status={status} search={q} counts={counts} />
      </Suspense>

      {leads.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink-200 bg-white p-14 text-center">
          <p className="text-sm font-semibold text-ink-800">
            {all.length === 0 ? "No enquiries yet" : "Nothing matches this filter"}
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-500">
            {all.length === 0 ? (
              <>
                Submissions from the{" "}
                <Link href="/hire-us" className="font-semibold text-brand-700 underline underline-offset-4">
                  hire form
                </Link>{" "}
                land here instantly.
              </>
            ) : (
              "Try a different status or search term."
            )}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[52rem] text-left text-sm">
              <caption className="sr-only">
                Client enquiries, newest first. Select a row to open the full enquiry.
              </caption>
              <thead>
                <tr className="border-b border-ink-100 bg-ink-50/60 text-xs uppercase tracking-wider text-ink-500">
                  <th scope="col" className="px-5 py-3 font-semibold">Client</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Service</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Budget</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Status</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Received</th>
                  <th scope="col" className="px-5 py-3 font-semibold"><span className="sr-only">Open</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {leads.map((lead) => (
                  <tr key={lead.id} className="transition-colors hover:bg-ink-50/70">
                    <td className="px-5 py-4">
                      <span className="block font-semibold text-ink-900">{lead.name}</span>
                      <span className="block text-xs text-ink-500">{lead.email}</span>
                      {lead.company && (
                        <span className="block text-xs text-ink-400">{lead.company}</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-ink-700">{lead.service}</td>
                    <td className="px-5 py-4 text-ink-600">{lead.budget ?? "—"}</td>
                    <td className="px-5 py-4">
                      <StatusBadge status={lead.status as LeadStatus} />
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-ink-500">
                      {new Date(lead.created_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/dashboard/leads/${lead.id}`}
                        className="font-semibold text-brand-700 underline underline-offset-4"
                      >
                        Open
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
