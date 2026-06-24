import "server-only";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

/**
 * Runtime database client (server-only).
 *
 * Connects through the Supabase transaction pooler (:6543), so `prepare: false`
 * is mandatory — pgbouncer transaction-pool mode does not support prepared
 * statements. Never import this from a client component; the connection string
 * carries the DB password.
 */
const connectionString =
  process.env.POOL_DATABASE_URL ?? process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "Missing POOL_DATABASE_URL (or DATABASE_URL) — set it in .env.local",
  );
}

// Reuse the client across hot reloads / serverless invocations.
const globalForDb = globalThis as unknown as {
  __vinikaPg?: ReturnType<typeof postgres>;
};

const client =
  globalForDb.__vinikaPg ??
  postgres(connectionString, { prepare: false, max: 5 });

if (process.env.NODE_ENV !== "production") globalForDb.__vinikaPg = client;

export const db = drizzle(client, { schema });
export { schema };
