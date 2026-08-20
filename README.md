# DevTeam Studio

Marketing site and client dashboard for a three-person web/SEO/admin team.
Built with Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS v4,
GSAP and Postgres.

## What's in here

| Area | Route | Notes |
|---|---|---|
| Marketing site | `/`, `/about`, `/services`, `/projects`, `/contact` | Statically prerendered |
| Hire form | `/hire-us` | Saves to Postgres via a Server Action |
| Team sign-in | `/login` | Password + signed session cookie |
| Dashboard | `/dashboard` | Traffic, enquiries, charts |
| Enquiries | `/dashboard/leads` | Filter, search, status, notes |
| Visitors | `/dashboard/visitors` | Sources, devices, pages, recent visitors |

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open http://localhost:3000. The dashboard is at `/dashboard`.

### Environment variables

| Variable | Required | What it does |
|---|---|---|
| `DATABASE_URL` | yes | Postgres connection string |
| `DASHBOARD_PASSWORD` | yes | Password for `/dashboard` |
| `SESSION_SECRET` | yes | Signs the session cookie and salts IP hashes. 32+ chars — `openssl rand -base64 32` |
| `NEXT_PUBLIC_SITE_URL` | yes in prod | Canonical URLs, Open Graph tags, sitemap |

Without `DATABASE_URL` the site still runs: the dashboard shows setup
instructions and the hire form asks visitors to email instead.

### Database

Tables are created automatically on the first query, so there is no migration
step to remember. To apply the schema deliberately (in a deploy pipeline, say):

```bash
npm run db:setup
```

The schema lives in [`lib/schema.sql`](lib/schema.sql) — three tables: `leads`,
`visits`, `submission_log`.

## Hosting

> **Full step-by-step guide: [DEPLOYMENT.md](DEPLOYMENT.md)** — domain setup,
> nginx, HTTPS, systemd, database hosting, backups and troubleshooting.

The database is plain Postgres reached over a connection string, so **the same
code runs on Vercel and on your own server** — only `DATABASE_URL` changes.
Nothing needs rewriting when you move.

**Now, on Vercel:** create a free Postgres database (Neon, Supabase, or Vercel
Postgres), then add `DATABASE_URL`, `DASHBOARD_PASSWORD`, `SESSION_SECRET` and
`NEXT_PUBLIC_SITE_URL` under Project → Settings → Environment Variables. Deploy.
Vercel also supplies visitor country headers, so the country charts fill in.

**Later, on your own domain and server:** run `npm run build && npm start`
behind nginx or a Node process manager, with the same four variables in the
environment. Two choices for the database:

- *Keep the hosted one.* Point `DATABASE_URL` at the same Neon/Supabase
  database and your existing data moves with you — nothing to migrate.
- *Move it onto your server.* Install Postgres, `pg_dump` the old database and
  restore it, then point `DATABASE_URL` at `localhost`. The code needs no
  change: TLS is enabled automatically for remote hosts and skipped for
  localhost.

Country data comes from a Vercel-specific header, so those charts go quiet on a
self-hosted box unless your proxy sets a geo header. Everything else — page
views, visitors, sources, devices, enquiries — works identically.

## Analytics and privacy

Visits are recorded first-party by [`app/api/track/route.ts`](app/api/track/route.ts):
no third-party analytics, no cross-site tracking. Visitors are identified by a
random id in an HttpOnly cookie, IP addresses are stored only as a salted hash
(used for rate limiting), obvious bots are filtered out, and `/dashboard`
traffic is never counted.

## Scripts

| Command | Does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run db:setup` | Apply `lib/schema.sql` |

## Notes for future work

- Content lives in [`data/siteData.ts`](data/siteData.ts) — team, services,
  projects, reviews, FAQs. Editing that file updates every page that uses it.
- Scroll reveals are opt-in per element: add `data-anim="fade-up"` to anything
  inside the site layout. No `"use client"` needed. See
  [`components/animations/AnimationProvider.tsx`](components/animations/AnimationProvider.tsx).
- All motion is skipped when the visitor has `prefers-reduced-motion` set.
