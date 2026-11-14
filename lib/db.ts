import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";
import { Pool, type QueryResultRow } from "pg";

/**
 * A single pooled Postgres client, shared across requests.
 *
 * In dev, Next.js reloads modules on every edit, so the pool is parked on
 * globalThis to avoid leaking a new pool per reload. In production each
 * serverless instance keeps one small pool.
 */
declare global {
  var __devteamPool: Pool | undefined;
  var __devteamMigration: Promise<void> | undefined;
}

export class DatabaseNotConfiguredError extends Error {
  constructor() {
    super("DATABASE_URL is not set. Copy .env.example to .env.local and add a Postgres connection string.");
    this.name = "DatabaseNotConfiguredError";
  }
}

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

function createPool(): Pool {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new DatabaseNotConfiguredError();

  // Hosted Postgres (Neon, Supabase, Vercel) requires TLS; a local server
  // usually has none. `sslmode=` in the URL wins if you set it explicitly.
  const isLocal = /@(localhost|127\.0\.0\.1)/.test(connectionString);
  const hasExplicitSsl = connectionString.includes("sslmode=");

  return new Pool({
    connectionString,
    ssl: isLocal || hasExplicitSsl ? undefined : { rejectUnauthorized: false },
    // Serverless instances handle one request at a time, so a large pool
    // only burns connection slots on the database. Elsewhere stay small too:
    // shared (cPanel) Postgres allows only a handful of connections per user.
    max: process.env.VERCEL ? 1 : 3,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
  });
}

function getPool(): Pool {
  if (!globalThis.__devteamPool) {
    globalThis.__devteamPool = createPool();
    globalThis.__devteamPool.on("error", (error) => {
      console.error("[db] idle client error", error);
    });
  }
  return globalThis.__devteamPool;
}

/** Applies lib/schema.sql. Idempotent, and runs at most once per process. */
export function ensureSchema(): Promise<void> {
  if (!globalThis.__devteamMigration) {
    globalThis.__devteamMigration = (async () => {
      const sql = await readFile(path.join(process.cwd(), "lib", "schema.sql"), "utf8");
      await getPool().query(sql);
    })().catch((error) => {
      // Let the next call retry rather than caching a failed migration.
      globalThis.__devteamMigration = undefined;
      throw error;
    });
  }
  return globalThis.__devteamMigration;
}

/** Runs a parameterised query, applying the schema first if needed. */
export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params: unknown[] = [],
): Promise<T[]> {
  if (!isDatabaseConfigured()) throw new DatabaseNotConfiguredError();
  await ensureSchema();
  const result = await getPool().query<T>(text, params);
  return result.rows;
}

/** Same as `query`, for statements that return exactly one row. */
export async function queryOne<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params: unknown[] = [],
): Promise<T | null> {
  const rows = await query<T>(text, params);
  return rows[0] ?? null;
}
