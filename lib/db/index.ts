import "server-only";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

/**
 * Runtime database client (server-only).
 *
 * Connects through the Supabase transaction pooler (:6543), so `prepare: false`
 * is mandatory. The client is created LAZILY — the connection string is only
 * required when the first query runs, never at module load. This matters
 * because `next build` loads route modules (to collect page data) without the
 * runtime env present; an eager client would throw during the build.
 */
type Db = ReturnType<typeof drizzle<typeof schema>>;

const globalForDb = globalThis as unknown as {
  __vinikaPg?: ReturnType<typeof postgres>;
  __vinikaDb?: Db;
};

function resolveDb(): Db {
  if (globalForDb.__vinikaDb) return globalForDb.__vinikaDb;

  const connectionString =
    process.env.POOL_DATABASE_URL ?? process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "Missing POOL_DATABASE_URL (or DATABASE_URL) — set it in your environment.",
    );
  }

  const client =
    globalForDb.__vinikaPg ?? postgres(connectionString, { prepare: false, max: 5 });
  const instance = drizzle(client, { schema });

  if (process.env.NODE_ENV !== "production") {
    globalForDb.__vinikaPg = client;
    globalForDb.__vinikaDb = instance;
  }
  return instance;
}

/**
 * Lazy proxy: resolves the real Drizzle client on first property access, so
 * importing `db` never requires the connection string — only *using* it does.
 */
export const db = new Proxy({} as Db, {
  get(_target, prop, receiver) {
    const real = resolveDb();
    const value = Reflect.get(real as object, prop, receiver);
    return typeof value === "function" ? value.bind(real) : value;
  },
});

export { schema };
