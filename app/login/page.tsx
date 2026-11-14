import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import LoginForm from "@/components/dashboard/LoginForm";
import { isAuthenticated } from "@/lib/auth";
import { site } from "@/data/siteData";

export const metadata: Metadata = {
  title: "Team sign in",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  if (await isAuthenticated()) redirect("/dashboard");

  return (
    <main className="relative flex min-h-[calc(100vh-8rem)] items-center overflow-hidden bg-ink-50/50 py-20">
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-50" />

      <div className="container-page relative">
        <div className="mx-auto max-w-md">
          <div className="rounded-3xl border border-ink-100 bg-white p-9 shadow-lift">
            <Image src={site.logo} alt={site.name} width={386} height={283} className="h-12 w-auto" />

            <h1 className="mt-6 text-2xl font-bold tracking-tight text-ink-900">Team sign in</h1>
            <p className="mt-2 text-sm leading-6 text-ink-600">
              The dashboard holds client contact details, so it is password protected.
            </p>

            <LoginForm />
          </div>

          <p className="mt-6 text-center text-sm text-ink-500">
            <Link href="/" className="font-semibold text-brand-700 underline underline-offset-4">
              Back to the site
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
