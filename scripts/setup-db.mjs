#!/usr/bin/env node
/**
 * Applies lib/schema.sql to the database in DATABASE_URL.
 *
 * The app also does this automatically on its first query — this script is for
 * running it deliberately, e.g. as part of a deploy step.
 *
 * Usage: npm run db:setup
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import pg from "pg";

// Load .env.local / .env without adding a dependency.
for (const file of [".env.local", ".env"]) {
  try {
    const contents = await readFile(path.join(process.cwd(), file), "utf8");
    for (const line of contents.split("\n")) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (match && !process.env[match[1]]) {
        process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
      }
    }
  } catch {
    // File is optional.
  }
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL is not set. Copy .env.example to .env.local and add your connection string.");
  process.exit(1);
}

const isLocal = /@(localhost|127\.0\.0\.1)/.test(connectionString);
const client = new pg.Client({
  connectionString,
  ssl: isLocal || connectionString.includes("sslmode=") ? undefined : { rejectUnauthorized: false },
});

try {
  await client.connect();
  const sql = await readFile(path.join(process.cwd(), "lib", "schema.sql"), "utf8");
  await client.query(sql);
  console.log("✓ Schema applied. Tables: leads, visits, submission_log");
} catch (error) {
  console.error("✗ Could not apply the schema:", error.message);
  process.exitCode = 1;
} finally {
  await client.end().catch(() => {});
}
