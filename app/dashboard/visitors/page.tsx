import { Suspense } from "react";
import BarList from "@/components/dashboard/BarList";
import RangePicker from "@/components/dashboard/RangePicker";
import SetupNotice from "@/components/dashboard/SetupNotice";
import StatTile from "@/components/dashboard/StatTile";
import {
  getBrowsers,
  getCountries,
  getDevices,
  getOverview,
  getRecentVisitors,
  getSources,
  getTimeSeries,
  getTopPages,
} from "@/lib/analytics";
import { attempt } from "@/lib/attempt";
import { requireAuth } from "@/lib/auth";
import { isDatabaseConfigured } from "@/lib/db";

const ALLOWED_RANGES = [7, 30, 90];

function Card({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
      <h2 className="text-sm font-bold text-ink-900">{title}</h2>
      {description && <p className="mt-1 text-xs text-ink-500">{description}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

function relativeTime(date: Date): string {
  const seconds = Math.round((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export default async function VisitorsPage({
  searchParams,
}: {
  searchParams: Promise<{ days?: string }>;
}) {
  await requireAuth();

  const { days: daysParam } = await searchParams;
  const requested = Number(daysParam);
  const days = ALLOWED_RANGES.includes(requested) ? requested : 30;

  if (!isDatabaseConfigured()) return <SetupNotice />;

  const result = await attempt("dashboard/visitors", () =>
    Promise.all([
      getOverview(days),
      getTimeSeries(days),
      getRecentVisitors(days),
      getTopPages(days, 10),
      getSources(days),
      getDevices(days),
      getBrowsers(days),
      getCountries(days),
    ]),
  );

  if (!result.ok) return <SetupNotice error={result.error} />;

  const [overview, series, visitors, pages, sources, devices, browsers, countries] = result.data;

  const perVisitor = overview.visitors > 0 ? overview.views / overview.visitors : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink-900">Visitors</h1>
          <p className="mt-1 text-sm text-ink-500">
            Who is on the site, what they read, and where they came from.
          </p>
        </div>
        <Suspense fallback={null}>
          <RangePicker current={days} />
        </Suspense>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          label="Unique visitors"
          value={overview.visitors}
          previous={overview.visitorsPrev}
          spark={series.map((point) => point.visitors)}
        />
        <StatTile
          label="Page views"
          value={overview.views}
          previous={overview.viewsPrev}
          spark={series.map((point) => point.views)}
        />
        <StatTile label="Sessions" value={overview.sessions} hint="A session ends after 30 idle minutes" />
        <StatTile
          label="Pages per visitor"
          value={perVisitor}
          format={(value) => value.toFixed(1)}
          hint="Higher usually means the content is landing"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Most visited pages" description={`Page views, last ${days} days`}>
          <BarList data={pages} formatLabel={(path) => (path === "/" ? "/ (home)" : path)} />
        </Card>

        <Card title="Traffic sources" description="Campaign source, then referring site">
          <BarList data={sources} />
        </Card>

        <Card title="Devices" description="Share of page views">
          <BarList data={devices} />
        </Card>

        <Card title="Browsers" description="Share of page views">
          <BarList data={browsers} />
        </Card>
      </div>

      <Card title="Countries" description="Recorded when the site runs behind Vercel's edge network">
        <BarList data={countries} emptyLabel="No country data recorded yet." />
      </Card>

      <section className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-soft">
        <div className="border-b border-ink-100 p-6">
          <h2 className="text-sm font-bold text-ink-900">Recent visitors</h2>
          <p className="mt-1 text-xs text-ink-500">
            One row per visitor, most recently active first. Identified by a first-party cookie —
            no IP addresses are stored.
          </p>
        </div>

        {visitors.length === 0 ? (
          <p className="p-14 text-center text-sm text-ink-500">
            No visits recorded yet. Open the site in another browser and this table fills in.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[54rem] text-left text-sm">
              <caption className="sr-only">Recent visitors and the pages they viewed</caption>
              <thead>
                <tr className="border-b border-ink-100 bg-ink-50/60 text-xs uppercase tracking-wider text-ink-500">
                  <th scope="col" className="px-5 py-3 font-semibold">Visitor</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Views</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Landed on</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Last page</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Source</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Device</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Last seen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {visitors.map((visitor) => (
                  <tr key={visitor.visitor_id} className="transition-colors hover:bg-ink-50/70">
                    <td className="px-5 py-3.5 font-mono text-xs text-ink-500">
                      {visitor.visitor_id.slice(0, 8)}
                    </td>
                    <td className="px-5 py-3.5 tabular-nums font-semibold text-ink-900">
                      {visitor.page_views}
                    </td>
                    <td className="px-5 py-3.5 text-ink-700">{visitor.entry_page}</td>
                    <td className="px-5 py-3.5 text-ink-700">{visitor.last_page}</td>
                    <td className="px-5 py-3.5 text-ink-600">{visitor.source}</td>
                    <td className="px-5 py-3.5 text-ink-600">
                      {visitor.device} · {visitor.browser}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap text-ink-500">
                      {relativeTime(visitor.last_seen)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
