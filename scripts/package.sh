#!/usr/bin/env bash
# Builds the site and zips a ready-to-run bundle for cPanel "Setup Node.js App".
#
# The zip holds exactly: the contents of .next/standalone, plus .next/static
# and public. Unzip it into the application root on the server, then Stop and
# Start the app. Nothing is installed or built on the server.
#
# Usage: npm run package
set -euo pipefail

cd "$(dirname "$0")/.."

OUT="kodenvia-deploy.zip"
STAGE=".next/standalone"

if [ -z "${NEXT_PUBLIC_SITE_URL:-}" ] && ! grep -qs '^NEXT_PUBLIC_SITE_URL=' .env.production.local .env.local .env.production .env; then
  echo "✗ NEXT_PUBLIC_SITE_URL is not set. It is baked in at build time —" >&2
  echo "  run: NEXT_PUBLIC_SITE_URL=https://kodenvia.com npm run package" >&2
  exit 1
fi

# Only the previous bundle is cleared; .next/dev belongs to a running `next dev`.
rm -rf .next/standalone "$OUT"
npx next build

cp -r public "$STAGE/public"
mkdir -p "$STAGE/.next"
cp -r .next/static "$STAGE/.next/static"

# Secrets are set in the cPanel UI, never shipped in the bundle.
find "$STAGE" -maxdepth 1 -name '.env*' -delete

(cd "$STAGE" && zip -qr "../../$OUT" .)

echo "✓ $OUT ($(du -h "$OUT" | cut -f1) zipped, $(du -sh "$STAGE" | cut -f1) unpacked)"
