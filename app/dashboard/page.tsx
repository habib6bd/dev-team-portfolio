import Link from "next/link";
import { Suspense } from "react";
import BarList from "@/components/dashboard/BarList";
import RangePicker from "@/components/dashboard/RangePicker";
import SetupNotice from "@/components/dashboard/SetupNotice";
import StatTile from "@/components/dashboard/StatTile";
import TrendChart from "@/components/dashboard/TrendChart";
import {
  getCountries,
  getDevices,
  getLeadsByService,
  getOverview,
  getSources,
  getTimeSeries,
  getTopPages,
} from "@/lib/analytics";
import { requireAuth } from "@/lib/auth";
import { isDatabaseConfigured } from "@/lib/db";
import { attempt } from "@/lib/attempt";
import { formatDate } from "@/lib/datetime";
import { listLeads } from "@/lib/leads";
import { countryName } from "@/lib/request";

const ALLOWED_RANGES = [7, 30, 90];

function Card({
  title,
  description,
  children,
  className = "",
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-2xl border border-ink-100 bg-white p-6 shadow-soft ${className}`}>
      <h2 className="text-sm font-bold text-ink-900">{title}</h2>
      {description && <p className="mt-1 text-xs text-ink-500">{description}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ days?: string }>;
}) {
  await requireAuth();

  const { days: daysParam } = await searchParams;
  const requested = Number(daysParam);
  const days = ALLOWED_RANGES.includes(requested) ? requested : 30;

  if (!isDatabaseConfigured()) {
    return <SetupNotice />;
  }

  const result = await attempt("dashboard", () =>
    Promise.all([
      getOverview(days),
      getTimeSeries(days),
      getTopPages(days),
      getSources(days),
      getDevices(days),
      getCountries(days),
      getLeadsByService(days),
      listLeads(),
    ]),
  );

  if (!result.ok) return <SetupNotice error={result.error} />;

  const [overview, series, topPages, sources, devices, countries, byService, recentLeads] =
    result.data;

  const conversion = overview.visitors > 0 ? (overview.leads / overview.visitors) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink-900">Overview</h1>
          <p className="mt-1 text-sm text-ink-500">
            Traffic and enquiries for the last {days} days.
          </p>
        </div>
        <Suspense fallback={null}>
          <RangePicker current={days} />
        </Suspense>
      </div>

      {/* Headline numbers — a KPI row, not a grouped bar chart. */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          label="Page views"
          value={overview.views}
          previous={overview.viewsPrev}
          spark={series.map((point) => point.views)}
        />
        <StatTile
          label="Unique visitors"
          value={overview.visitors}
          previous={overview.visitorsPrev}
          spark={series.map((point) => point.visitors)}
        />
        <StatTile
          label="Enquiries"
          value={overview.leads}
          previous={overview.leadsPrev}
          spark={series.map((point) => point.leads)}
        />
        <StatTile
          label="Visitor → enquiry"
          value={conversion}
          format={(value) => `${value.toFixed(1)}%`}
          hint={`${overview.newLeads} ${overview.newLeads === 1 ? "enquiry" : "enquiries"} still marked new`}
        />
      </div>

      <Card
        title="Traffic and enquiries over time"
        description="Both series share one axis, so the relationship between traffic and enquiries stays honest."
      >
        <TrendChart data={series} />
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Most visited pages" description={`Page views, last ${days} days`}>
          <BarList data={topPages} formatLabel={(path) => (path === "/" ? "/ (home)" : path)} />
        </Card>

        <Card title="Where visitors come from" description="Campaign source, then referring site">
          <BarList data={sources} />
        </Card>

        <Card title="Devices" description="Share of page views">
          <BarList data={devices} />
        </Card>

        <Card title="Enquiries by service" description={`Last ${days} days`}>
          <BarList data={byService} emptyLabel="No enquiries in this range yet." />
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-sm font-bold text-ink-900">Latest enquiries</h2>
            <Link
              href="/dashboard/leads"
              className="text-xs font-semibold text-brand-700 underline underline-offset-4"
            >
              See all
            </Link>
          </div>

          {recentLeads.length === 0 ? (
            <p className="py-10 text-center text-sm text-ink-500">
              No enquiries yet. They will appear here the moment someone submits the hire form.
            </p>
          ) : (
            <ul className="mt-5 divide-y divide-ink-100">
              {recentLeads.slice(0, 6).map((lead) => (
                <li key={lead.id}>
                  <Link
                    href={`/dashboard/leads/${lead.id}`}
                    className="flex items-center justify-between gap-4 py-3.5 transition-colors hover:bg-ink-50"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-ink-900">
                        {lead.name}
                      </span>
                      <span className="block truncate text-xs text-ink-500">
                        {lead.service} · {lead.email}
                      </span>
                    </span>
                    <span className="shrink-0 text-xs text-ink-400">
                      {formatDate(lead.created_at, {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <Card title="Top countries" description="Estimated from each visitor's IP address">
          <BarList
            data={countries}
            emptyLabel="No country data recorded yet."
            formatLabel={countryName}
          />
        </Card>
      </div>
    </div>
  );
}
