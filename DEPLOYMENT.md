# Kodenvia — Setup & Deployment Guide

Everything needed to take this project from the repo to a live site on your own
domain, and to run it afterwards.

**Read this order:**
1. [Before you deploy](#1-before-you-deploy) — content you must change
2. [Environment variables](#2-environment-variables) — the four secrets
3. [The database](#3-the-database) — what it stores and where to host it
4. [Deploying to Vercel](#4-deploying-to-vercel-do-this-first) — quickest path to live
5. [Deploying to your own server](#5-deploying-to-your-own-server) — the month-later move
   - [Deploying to cPanel shared hosting](#5a-deploying-to-cpanel-shared-hosting) — build locally, upload a zip
6. [Moving from Vercel to your server](#6-moving-from-vercel-to-your-own-server) — without losing data
7. [Go-live checklist](#7-go-live-checklist)
8. [Running it day to day](#8-running-it-day-to-day)
9. [Troubleshooting](#9-troubleshooting)

---

## 1. Before you deploy

### 1.1 Replace the placeholder content

Almost all site content lives in one file: **`data/siteData.ts`**. Change it
there and every page updates.

| What | Where | Currently says |
|---|---|---|
| Team members (names, roles, bios, skills, stats, links) | `team` array | Two of the three names are invented — **Tanvir Ahmed** and **Nusrat Jahan** |
| Contact email | `contactDetails.email` | `kodenviatech@gmail.com` |
| Phones | `contactDetails.phones` | `+880 1850-128324`, `+880 1613-511976` |
| Location & office hours | `contactDetails.location`, `.hours` | Dhaka, Bangladesh |
| Services, prices, deliverables | `services` array | `From $900`, `From $350/mo`, `From $250/mo` |
| Projects and results | `projects` array | Example projects |
| Client reviews | `reviews` array | Example reviews |
| Headline stats | `stats` array | 48 projects, 26 clients, etc. |
| Client logos strip | `companies` array | TechNova, BrightSoft, … |
| FAQs | `faqs` array | Generic answers |

> The contact email is referenced from `contactDetails` everywhere — the hire
> form, error messages, the footer. Changing that one line updates all of them.

### 1.2 Update the site identity

In **`app/layout.tsx`**, change the `metadata` block: `title`, `description`,
`keywords`, `openGraph.siteName`. This is what Google and social previews show.

Replace **`app/favicon.ico`** with your own icon.

### 1.3 Decide your real numbers

The stats (`48+ projects`, `2.4x traffic lift`, `95+ Lighthouse`) are
placeholders. Publishing invented numbers as fact is a real risk — a client can
ask you to back them up. Use your actual figures or delete the ones you can't
support.

---

## 2. Environment variables

Four variables. The app will not run correctly without them.

| Variable | Required | What it does |
|---|---|---|
| `DATABASE_URL` | Yes | Postgres connection string |
| `DASHBOARD_PASSWORD` | Yes | The password for `/dashboard` |
| `SESSION_SECRET` | Yes | Signs the login cookie and salts IP hashes. **32+ characters** |
| `NEXT_PUBLIC_SITE_URL` | Yes in production | Your real URL, e.g. `https://kodenvia.com`. Used for canonical URLs, Open Graph tags and the sitemap |

### Generate the secrets

```bash
# SESSION_SECRET — run this, copy the output
openssl rand -base64 32

# DASHBOARD_PASSWORD — a long random one is fine, you only paste it once
openssl rand -base64 24
```

### Local development

```bash
cp .env.example .env.local
# then edit .env.local and fill in the four values
```

`.env.local` is gitignored. **Never commit real secrets.** If you ever paste one
into a commit, rotate it — treat it as public from that moment.

### Rules that matter

- `NEXT_PUBLIC_` variables are **embedded into the build**. Never put a secret
  behind that prefix. `NEXT_PUBLIC_SITE_URL` is safe because a URL is public.
- **The three secrets are read at runtime.** Change `DATABASE_URL`,
  `DASHBOARD_PASSWORD` or `SESSION_SECRET` and a restart is enough — no rebuild.
- **`NEXT_PUBLIC_SITE_URL` is baked in at build time.** The home page, sitemap
  and Open Graph tags are prerendered with whatever value was set when you ran
  `npm run build`. Changing it means **rebuild, then restart** — a restart alone
  leaves the old URL in your sitemap. (On Vercel a redeploy does both.)
- Changing `SESSION_SECRET` logs everyone out immediately. That is the fastest
  way to kill all dashboard sessions if a password leaks.

---

## 3. The database

### 3.1 What it stores

Three tables, defined in **`lib/schema.sql`**:

| Table | Holds | Grows by |
|---|---|---|
| `leads` | Hire-form submissions: name, email, company, phone, service, budget, timeline, message, status, your internal notes | One row per enquiry |
| `visits` | One row per page view: path, referrer, UTM tags, device, browser, OS, country, screen width | One row per page view |
| `submission_log` | Rate-limiting ledger (hashed IPs only) | One row per submission, auto-pruned after 7 days |

Personal data lives in `leads` — real names, emails and phone numbers of people
who contacted you. Treat that table as confidential: it is why `/dashboard` has
a password.

`visits` never stores a raw IP address. IPs are salted and hashed, and visitors
are counted using a random id in a first-party cookie.

### 3.2 The schema applies itself

You do **not** run migrations by hand. The first database query creates the
tables if they don't exist. Every statement is `IF NOT EXISTS`, so it is safe to
run repeatedly and safe on an existing database.

To apply it deliberately — in a deploy pipeline, or to check the connection works:

```bash
npm run db:setup
```

Expected output:

```
✓ Schema applied. Tables: leads, visits, submission_log
```

### 3.3 Where to host it

The app talks to plain Postgres over a connection string, so **any Postgres
works and the code never changes** — only `DATABASE_URL`.

| Option | Good for | Notes |
|---|---|---|
| **Neon** (free tier) | Vercel now, and later too | Serverless Postgres, generous free tier, works from anywhere. Easiest start. |
| **Supabase** (free tier) | Same | Also gives you a table browser in the UI |
| **Vercel Postgres** | Vercel only | Convenient, but ties you to Vercel — avoid given you're moving in a month |
| **Postgres on your own server** | After you move | Full control, no monthly fee, but backups are your job |

**Recommendation for you:** start with **Neon**. When you move to your own
server, you can either keep pointing at Neon (zero migration) or move the data
onto your box — both are covered in [section 6](#6-moving-from-vercel-to-your-own-server).

### 3.4 Connection string format

```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

Real examples:

```bash
# Neon / Supabase / any hosted provider — TLS required
DATABASE_URL=postgresql://user:pass@ep-cool-name.eu-central-1.aws.neon.tech/devteam?sslmode=require

# Postgres on the same server as the app
DATABASE_URL=postgresql://devteam:yourpassword@localhost:5432/devteam
```

The app handles TLS automatically: **on** for remote hosts, **off** for
`localhost`. You only add `?sslmode=require` if your provider asks for it.

If your password contains `@`, `:`, `/` or `#`, URL-encode it (`@` → `%40`).

---

## 4. Deploying to Vercel (do this first)

### 4.1 Push to GitHub

```bash
git add -A
git commit -m "Site with team section, hire form and dashboard"
git push origin main
```

### 4.2 Create the database

1. Sign up at [neon.tech](https://neon.tech), create a project.
2. Copy the connection string it shows you.

### 4.3 Import the project

1. [vercel.com/new](https://vercel.com/new) → import your GitHub repo.
2. Framework preset: **Next.js** (auto-detected). Leave build settings alone.
3. Before clicking Deploy, add the environment variables:

| Name | Value |
|---|---|
| `DATABASE_URL` | your Neon string |
| `DASHBOARD_PASSWORD` | your chosen password |
| `SESSION_SECRET` | `openssl rand -base64 32` output |
| `NEXT_PUBLIC_SITE_URL` | `https://your-project.vercel.app` for now |

4. Deploy.

### 4.4 Connect your domain

Vercel → Project → **Settings → Domains** → add `kodenvia.com` and
`www.kodenvia.com`. Vercel shows the exact DNS records to create at your
registrar — usually:

| Type | Name | Value |
|---|---|---|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

DNS takes anywhere from a few minutes to a few hours. HTTPS is issued
automatically once it resolves.

**Then update `NEXT_PUBLIC_SITE_URL` to `https://kodenvia.com` and
redeploy** — otherwise your sitemap and social previews keep pointing at the
`.vercel.app` URL.

### 4.5 Check it works

- Visit `/hire-us`, submit a test enquiry.
- Log in at `/login`, confirm the enquiry appears in `/dashboard/leads`.
- Delete the test enquiry.

---

## 5. Deploying to your own server

For a VPS (Hostinger, DigitalOcean, Contabo, Ubuntu 22.04/24.04).

### 5.1 Server requirements

- **Node.js 20.9 or newer** (Next.js 16 will not run on Node 18)
- nginx
- Postgres 14+ *(only if hosting the database on the same box)*

```bash
sudo apt update && sudo apt upgrade -y

# Node.js 22 LTS
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs nginx git

node -v    # must print v20.9.0 or higher
```

### 5.2 Postgres on the same server (optional)

Skip this if you're staying on Neon.

```bash
sudo apt install -y postgresql postgresql-contrib

sudo -u postgres psql <<'SQL'
CREATE USER devteam WITH PASSWORD 'a-long-random-password';
CREATE DATABASE devteam OWNER devteam;
GRANT ALL PRIVILEGES ON DATABASE devteam TO devteam;
SQL
```

Your connection string is then:

```
DATABASE_URL=postgresql://devteam:a-long-random-password@localhost:5432/devteam
```

Leave Postgres listening on localhost only (the default). Do **not** expose port
5432 to the internet.

### 5.3 Get the code and build

```bash
sudo mkdir -p /var/www && sudo chown $USER:$USER /var/www
cd /var/www
git clone https://github.com/YOUR-USERNAME/dev-team-portfolio.git
cd dev-team-portfolio

npm ci                  # exact versions from package-lock.json
nano .env.local         # add the four variables
npm run db:setup        # verify the DB connection and create tables
npm run build
```

### 5.4 Keep it running with systemd

`npm start` dies when you close the terminal. Use a service:

```bash
sudo nano /etc/systemd/system/devteam.service
```

```ini
[Unit]
Description=Kodenvia (Next.js)
After=network.target postgresql.service

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/dev-team-portfolio
Environment=NODE_ENV=production
Environment=PORT=3000
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

```bash
sudo chown -R www-data:www-data /var/www/dev-team-portfolio
sudo systemctl daemon-reload
sudo systemctl enable --now devteam
sudo systemctl status devteam
```

The app now runs on `127.0.0.1:3000` and restarts on crash and on reboot.

> `.env.local` is read from the working directory, so it must sit in
> `/var/www/dev-team-portfolio/` and be readable by `www-data`.
> `sudo chmod 600 .env.local && sudo chown www-data:www-data .env.local`

### 5.5 nginx reverse proxy

```bash
sudo nano /etc/nginx/sites-available/devteam
```

```nginx
server {
    listen 80;
    server_name kodenvia.com www.kodenvia.com;

    # Real visitor IP — the app needs this for rate limiting.
    # Without it every visitor looks like the same person.
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    client_max_body_size 10M;
}
```

```bash
sudo ln -s /etc/nginx/sites-available/devteam /etc/nginx/sites-enabled/
sudo nginx -t          # must say "syntax is ok"
sudo systemctl reload nginx
```

**The `X-Forwarded-For` header is not optional.** The hire-form rate limiter
identifies people by IP; without it, one spammer's submissions would lock out
every other visitor.

### 5.6 DNS

At your domain registrar:

| Type | Name | Value |
|---|---|---|
| A | `@` | your server's IP |
| A | `www` | your server's IP |

Check it resolved: `dig +short kodenvia.com`

### 5.7 HTTPS

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d kodenvia.com -d www.kodenvia.com
```

Certbot edits your nginx config and sets up auto-renewal. Verify:

```bash
sudo certbot renew --dry-run
```

### 5.8 Firewall

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

Ports 3000 and 5432 must **not** be open — nginx reaches the app over localhost.

### 5.9 Set the final URL

In `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://kodenvia.com
```

This one is compiled into the pages, so it needs a **rebuild**, not just a
restart:

```bash
npm run build
sudo systemctl restart devteam
```

Confirm it took effect — the URLs here must be your real domain, not localhost:

```bash
curl -s https://kodenvia.com/sitemap.xml | head -20
```

---

## 5A. Deploying to cPanel shared hosting

For cPanel hosting with **Setup Node.js App** (CloudLinux + Passenger). This is
a different routine from the VPS in section 5, for one reason: shared hosting
caps how many processes your account may run, and `npm install` / `next build`
blow straight through that cap.

> **The rule: never run `npm install`, "Run NPM Install" or `next build` on the
> server.** You build on your own computer and upload a finished bundle. The
> server only ever runs it.

### 5A.1 What you need

- **Node.js 20.9 or newer** in the cPanel Node version list (22 is ideal).
  Next.js 16 will not start on Node 18.
- PostgreSQL in cPanel (**PostgreSQL Databases**).
- A Linux or WSL machine to build on. The bundle contains a compiled image
  library for Linux x64, which is what the server runs.

### 5A.2 Create the database

cPanel → **PostgreSQL Databases**:

1. Create a database, e.g. `kodenvia`. cPanel prefixes it with your account
   name: `cpuser_kodenvia`.
2. Create a user with a long random password, e.g. `cpuser_kodenvia`.
3. **Add User to Database** — pick both, submit.

Your connection string, with the prefixed names:

```
DATABASE_URL=postgresql://cpuser_kodenvia:PASSWORD@localhost:5432/cpuser_kodenvia
```

It must say `localhost` — the app then skips TLS, which cPanel's local Postgres
does not offer. URL-encode special characters in the password (`@` → `%40`).

You do not create tables. The app creates them on its first query.

### 5A.3 Build the bundle (on your computer)

```bash
NEXT_PUBLIC_SITE_URL=https://kodenvia.com npm run package
```

This builds the site and writes **`kodenvia-deploy.zip`** (about 20 MB, 58 MB
unpacked) in the project folder. It contains the server, its dependencies, the
static files and `public/` — everything, already installed. It contains no
secrets.

`NEXT_PUBLIC_SITE_URL` is baked in here, at build time. Setting it in cPanel
later does nothing.

### 5A.4 Create the app (first time only)

cPanel → **Setup Node.js App** → **Create Application**:

| Field | Value |
|---|---|
| Node.js version | 20.9+ (22 if offered) |
| Application mode | Production |
| Application root | `kodenvia` (a folder in your home directory, **not** inside `public_html`) |
| Application URL | `kodenvia.com` |
| Application startup file | `server.js` |

Then add the environment variables on the same screen:

| Name | Value |
|---|---|
| `DATABASE_URL` | the string from 5A.2 |
| `DASHBOARD_PASSWORD` | your dashboard password |
| `SESSION_SECRET` | `openssl rand -base64 32` output |

Do not set `PORT` — Passenger handles the port itself. Save, then **Stop** the
app before uploading.

### 5A.5 Upload

cPanel → **File Manager** → open the application root (`kodenvia/`):

1. Turn on **Settings → Show Hidden Files** (the `.next` folder is hidden
   otherwise).
2. Delete whatever cPanel put there (a sample `server.js`, a `node_modules`
   link if one exists).
3. Upload `kodenvia-deploy.zip`, select it, **Extract**, then delete the zip.

You should now see `server.js`, `package.json`, `.next/`, `node_modules/`,
`public/` and `lib/` directly inside `kodenvia/` — not inside a subfolder.

Back in **Setup Node.js App**, press **Start**. Ignore the "Run NPM Install"
button, permanently.

### 5A.6 Check it works

- `https://kodenvia.com` loads with styling and images.
- Submit a test enquiry at `/hire-us`, log in at `/login`, confirm it appears in
  `/dashboard/leads`, delete it. That proves the database connection.

Turn on HTTPS under cPanel → **SSL/TLS Status** (AutoSSL) if it is not already.

### 5A.7 Updating the site

Every update is the same four steps:

1. Locally: `NEXT_PUBLIC_SITE_URL=https://kodenvia.com npm run package`
2. cPanel → Setup Node.js App → **Stop**.
3. File Manager → in `kodenvia/`, delete `.next`, `node_modules`, `public`,
   `lib`, `server.js` and `package.json`, then upload and extract the new zip.
4. **Start**.

Deleting first matters: every build names its files differently, so extracting
over the old copy leaves dead files piling up against your disk quota.

The database is untouched by updates. Environment variables stay in cPanel.

### 5A.8 If something goes wrong

| Symptom | Cause and fix |
|---|---|
| 503, or "Resource limit reached" | The process limit. Something ran `npm install` or a build on the server, or old processes are stuck. Stop the app, wait a minute, Start. |
| App will not start | Check the Node version is 20.9+, the startup file is `server.js`, and that `server.js` sits directly in the application root. The error is in `stderr.log` in the application root. |
| cPanel complains that `node_modules` must not be a folder | That check only guards its own "Run NPM Install". Do not run it; the bundle's `node_modules` is complete. |
| Page loads without styling | `.next/static` is missing — hidden files were not shown during upload, or the zip was extracted into a subfolder. |
| Site works but photos are broken | The image optimizer cannot run on this host. In `next.config.ts` add `unoptimized: true` inside `images`, then repackage and upload. |
| Hire form or dashboard errors | `DATABASE_URL` is wrong. Recheck the prefixed database and user names, and that the user was added to the database. |
| "too many connections" from Postgres | The app holds at most 3 connections. Other sites on the account are using the rest. |

---

## 6. Moving from Vercel to your own server

Two options. Pick one.

### Option A — keep the database where it is (easiest)

Leave the data on Neon. On your server, use the **same `DATABASE_URL`**. Nothing
to migrate, no downtime, no risk of losing an enquiry. Your server just talks to
Neon over the internet instead of Vercel doing it.

Do this unless you specifically want the database on your own box.

### Option B — move the data onto your server

```bash
# 1. On your server: dump the hosted database
pg_dump "postgresql://user:pass@ep-xxx.neon.tech/devteam?sslmode=require" \
  --no-owner --no-privileges -f devteam-backup.sql

# 2. Create the local database (see 5.2), then restore
psql "postgresql://devteam:yourpassword@localhost:5432/devteam" -f devteam-backup.sql

# 3. Verify the data arrived
psql "postgresql://devteam:yourpassword@localhost:5432/devteam" \
  -c "SELECT count(*) FROM leads; SELECT count(*) FROM visits;"

# 4. Point the app at the local database
nano .env.local     # DATABASE_URL=postgresql://devteam:...@localhost:5432/devteam
sudo systemctl restart devteam
```

Keep the Neon database for a week before deleting it, in case something was
missed.

### What changes when you self-host

| Feature | Vercel | Your server |
|---|---|---|
| Page views, visitors, sources, devices, browsers | Works | Works |
| Enquiries, dashboard, login | Works | Works |
| **Country breakdown** | Works | **Goes quiet** |

Country data comes from a header Vercel adds at its edge (`x-vercel-ip-country`).
A plain nginx box doesn't set it, so those charts show "Unknown". Everything
else is identical. If you want countries back, put Cloudflare in front and read
`cf-ipcountry` in `lib/request.ts`.

---

## 7. Go-live checklist

**Content**
- [ ] Real team names, roles and bios in `data/siteData.ts`
- [ ] Real email, phone, location in `contactDetails`
- [ ] Real or removed stats — nothing invented left in
- [ ] Real services and prices
- [ ] Real projects and reviews
- [ ] `metadata` in `app/layout.tsx` updated
- [ ] `app/favicon.ico` replaced

**Configuration**
- [ ] All four environment variables set on the server
- [ ] `NEXT_PUBLIC_SITE_URL` is the real `https://` domain
- [ ] `SESSION_SECRET` is 32+ random characters, not a guessable phrase
- [ ] `DASHBOARD_PASSWORD` is long and stored in your password manager
- [ ] `.env.local` is **not** in git (`git status` shows nothing)

**Infrastructure**
- [ ] `npm run build` succeeds
- [ ] `npm run db:setup` succeeds
- [ ] HTTPS works, `http://` redirects to `https://`
- [ ] `www` and non-`www` both resolve
- [ ] Firewall on, ports 3000 and 5432 closed

**Function**
- [ ] Submit a real test enquiry through `/hire-us`
- [ ] It appears in `/dashboard/leads`
- [ ] Login rejects a wrong password
- [ ] `/dashboard` redirects to `/login` in a private window
- [ ] Delete the test enquiry
- [ ] `https://kodenvia.com/sitemap.xml` lists your pages
- [ ] Test the site on a real phone

**After launch**
- [ ] Submit the sitemap in Google Search Console
- [ ] Set up database backups (below)

---

## 8. Running it day to day

### Deploying an update

**Vercel:** `git push` — it builds and deploys automatically.

**Your server:**

```bash
cd /var/www/dev-team-portfolio
git pull
npm ci
npm run build
sudo systemctl restart devteam
```

### Database backups

Nothing backs up your enquiries automatically on a self-hosted box. Set this up
on day one:

```bash
sudo nano /usr/local/bin/backup-devteam.sh
```

```bash
#!/bin/bash
BACKUP_DIR=/var/backups/devteam
mkdir -p "$BACKUP_DIR"
pg_dump "postgresql://devteam:yourpassword@localhost:5432/devteam" \
  --no-owner -f "$BACKUP_DIR/devteam-$(date +%F).sql"
# Keep 30 days
find "$BACKUP_DIR" -name "devteam-*.sql" -mtime +30 -delete
```

```bash
sudo chmod +x /usr/local/bin/backup-devteam.sh
sudo crontab -e
# Add — runs 03:00 daily:
0 3 * * * /usr/local/bin/backup-devteam.sh
```

Copy those backups somewhere off the server too. A backup that only exists on
the machine that dies is not a backup.

Neon and Supabase take automatic backups on their paid tiers; check what your
plan actually includes rather than assuming.

### Reading logs

```bash
sudo journalctl -u devteam -f          # live app logs
sudo tail -f /var/log/nginx/error.log  # nginx errors
```

### Exporting your enquiries

```bash
psql "$DATABASE_URL" -c "\copy (SELECT name,email,company,phone,service,budget,message,status,created_at FROM leads ORDER BY created_at DESC) TO 'leads.csv' WITH CSV HEADER"
```

### Housekeeping

`visits` grows by one row per page view — roughly 100k rows a year at 300
views/day, which Postgres handles without complaint. If you ever want to trim it:

```sql
DELETE FROM visits WHERE created_at < now() - interval '1 year';
```

Never delete from `leads` on a schedule. Those are your clients.

---

## 9. Troubleshooting

**Dashboard says "The database isn't connected yet"**
`DATABASE_URL` is missing or wrong. Run `npm run db:setup` — it prints the real
error. Check for an unencoded `@` in the password.

**"SESSION_SECRET is missing or too short"**
It must be 32+ characters. Regenerate with `openssl rand -base64 32`.

**Login says the password is wrong when it isn't**
`DASHBOARD_PASSWORD` didn't reach the running process. On the server,
`sudo systemctl restart devteam` after editing `.env.local`. On Vercel, redeploy
after changing an environment variable — existing deployments keep the old values.

**Everyone gets rate-limited after one spammer**
nginx isn't passing `X-Forwarded-For`. See [5.5](#55-nginx-reverse-proxy).

**Country charts are empty**
Expected when self-hosted. See [section 6](#what-changes-when-you-self-host).

**Visitor numbers look low**
Only real browsers with JavaScript are counted, and obvious bots are filtered
out deliberately. Your own `/dashboard` visits are never counted.

**Build fails with a Node version error**
Next.js 16 needs Node 20.9+. Check with `node -v`.

**502 Bad Gateway**
The app isn't running. `sudo systemctl status devteam` and
`sudo journalctl -u devteam -n 50`.

**Changes don't show after deploying**
You edited files but didn't rebuild. `npm run build && sudo systemctl restart devteam`.

**Sitemap or social previews still show the old / localhost URL**
`NEXT_PUBLIC_SITE_URL` is compiled into the pages. Editing `.env.local` and
restarting is not enough — run `npm run build` first, then restart. On Vercel,
redeploy after changing the variable.

---

## Reference

| Path | What it is |
|---|---|
| `data/siteData.ts` | All site content — edit here first |
| `app/layout.tsx` | Site metadata, fonts, SEO tags |
| `lib/schema.sql` | Database schema |
| `lib/db.ts` | Connection pool and auto-migration |
| `lib/auth.ts` | Dashboard login and sessions |
| `app/actions/leads.ts` | Hire-form handler |
| `app/api/track/route.ts` | Visit tracking |
| `.env.example` | Template for `.env.local` |

| Command | Does |
|---|---|
| `npm run dev` | Development server on :3000 |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run db:setup` | Apply the schema / test the DB connection |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
