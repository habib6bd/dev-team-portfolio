import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { logout } from "@/app/actions/auth";
import DashboardNav from "@/components/dashboard/DashboardNav";
import { requireAuth } from "@/lib/auth";
import { site } from "@/data/siteData";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

// Client data must never be served from a cache.
export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await requireAuth();

  return (
    // theme-fixed: the dashboard stays light even when the visitor picked dark
    // mode on the public site — its charts use fixed light-theme colours.
    <div className="theme-fixed min-h-screen bg-white text-ink-900">
      <div className="min-h-screen bg-ink-50/60">
      <div className="border-b border-ink-100 bg-white">
        <div className="container-page flex flex-wrap items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-3">
            <Image src={site.logo} alt={site.name} width={386} height={283} className="h-10 w-auto" />
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
    </div>
  );
}
