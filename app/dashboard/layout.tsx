import type { Metadata } from "next";
import Link from "next/link";
import { logout } from "@/app/actions/auth";
import DashboardNav from "@/components/dashboard/DashboardNav";
import { requireAuth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

// Client data must never be served from a cache.
export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await requireAuth();

  return (
    <div className="min-h-screen bg-ink-50/60">
      <div className="border-b border-ink-100 bg-white">
        <div className="container-page flex flex-wrap items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-black text-white">
              DT
            </span>
            <div>
              <p className="text-sm font-bold text-ink-900">Team dashboard</p>
              <p className="text-xs text-ink-500">Clients, enquiries and site traffic</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-full border border-ink-200 px-4 py-2 text-sm font-semibold text-ink-700 transition-colors hover:bg-ink-50"
            >
              View site
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>

        <div className="container-page">
          <DashboardNav />
        </div>
      </div>

      <main className="container-page py-8">{children}</main>
    </div>
  );
}
