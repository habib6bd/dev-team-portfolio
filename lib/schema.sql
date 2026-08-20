-- Schema for the DevTeam Studio site.
-- Applied automatically on first query (see lib/db.ts) and by `npm run db:setup`.
-- Every statement is idempotent, so re-running it is always safe.

CREATE TABLE IF NOT EXISTS leads (
  id            BIGSERIAL PRIMARY KEY,
  name          TEXT        NOT NULL,
  email         TEXT        NOT NULL,
  company       TEXT,
  phone         TEXT,
  service       TEXT        NOT NULL,
  budget        TEXT,
  timeline      TEXT,
  message       TEXT        NOT NULL,
  status        TEXT        NOT NULL DEFAULT 'new',
  notes         TEXT,
  source_path   TEXT,
  referrer      TEXT,
  country       TEXT,
  user_agent    TEXT,
  ip_hash       TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_status_idx     ON leads (status);

-- One row per page view. `visitor_id` is a random id kept in a first-party
-- cookie; `ip_hash` is a salted hash, so no raw IP is ever stored.
CREATE TABLE IF NOT EXISTS visits (
  id            BIGSERIAL PRIMARY KEY,
  visitor_id    TEXT        NOT NULL,
  session_id    TEXT        NOT NULL,
  path          TEXT        NOT NULL,
  referrer      TEXT,
  referrer_host TEXT,
  utm_source    TEXT,
  utm_medium    TEXT,
  utm_campaign  TEXT,
  device        TEXT,
  browser       TEXT,
  os            TEXT,
  country       TEXT,
  screen_width  INTEGER,
  ip_hash       TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS visits_created_at_idx ON visits (created_at DESC);
CREATE INDEX IF NOT EXISTS visits_visitor_idx    ON visits (visitor_id);
CREATE INDEX IF NOT EXISTS visits_path_idx       ON visits (path);

-- Rate-limit ledger, keyed by hashed IP. Kept in the database so the limit
-- survives serverless cold starts and applies across instances.
CREATE TABLE IF NOT EXISTS submission_log (
  id          BIGSERIAL PRIMARY KEY,
  ip_hash     TEXT        NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS submission_log_idx ON submission_log (ip_hash, created_at DESC);
