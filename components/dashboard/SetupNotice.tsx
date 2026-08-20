/**
 * Shown in place of dashboard data when DATABASE_URL is missing, so the
 * dashboard explains what to do instead of throwing a connection error.
 */
export default function SetupNotice({ error }: { error?: string }) {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8">
      <h2 className="text-lg font-bold text-amber-900">The database isn&apos;t connected yet</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-amber-800">
        Enquiries and visitor stats are stored in Postgres. Add a connection string and this
        dashboard fills in automatically — the tables are created on the first request.
      </p>

      <ol className="mt-6 max-w-2xl space-y-3 text-sm text-amber-900">
        <li>
          <strong>1.</strong> Create a free Postgres database (Neon, Supabase or Vercel Postgres).
        </li>
        <li>
          <strong>2.</strong> Copy <code className="rounded bg-amber-100 px-1.5 py-0.5 font-mono text-xs">.env.example</code>{" "}
          to <code className="rounded bg-amber-100 px-1.5 py-0.5 font-mono text-xs">.env.local</code>.
        </li>
        <li>
          <strong>3.</strong> Paste the connection string as{" "}
          <code className="rounded bg-amber-100 px-1.5 py-0.5 font-mono text-xs">DATABASE_URL</code> and restart the dev server.
        </li>
      </ol>

      {error && (
        <pre className="mt-6 overflow-x-auto rounded-xl bg-amber-100 p-4 font-mono text-xs text-amber-900">
          {error}
        </pre>
      )}
    </div>
  );
}
