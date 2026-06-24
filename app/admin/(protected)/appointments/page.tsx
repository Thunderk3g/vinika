import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { appointments } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

function fmtDate(d: Date) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function truncate(s: string | null, n = 80) {
  if (!s) return "—";
  return s.length > n ? s.slice(0, n).trimEnd() + "…" : s;
}

export default async function AppointmentsPage() {
  const rows = await db.select().from(appointments).orderBy(desc(appointments.createdAt));

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 4px", color: "var(--cream)" }}>
          Appointments
        </h1>
        <p style={{ color: "var(--muted)", margin: 0 }}>
          Booking requests from the site assistant.
        </p>
      </div>

      <div className="adm-card" style={{ padding: 0, overflow: "hidden" }}>
        {rows.length === 0 ? (
          <div style={{ padding: 28, color: "var(--muted)" }}>No appointment requests yet.</div>
        ) : (
          <div className="adm-tablewrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Goal</th>
                <th>Preferred time</th>
                <th>Source</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((a) => {
                const amber = a.status === "new" || a.status === "scheduled";
                return (
                  <tr key={a.id}>
                    <td>
                      <div style={{ color: "var(--cream)", fontWeight: 600 }}>{a.name}</div>
                      <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
                        {a.email}
                      </div>
                    </td>
                    <td style={{ color: "var(--muted)" }}>{truncate(a.goal)}</td>
                    <td style={{ color: "var(--muted)" }}>{a.preferredTime ?? "—"}</td>
                    <td style={{ color: "var(--muted)" }}>{a.source}</td>
                    <td>
                      <span className={`adm-pill${amber ? " published" : ""}`}>{a.status}</span>
                    </td>
                    <td style={{ color: "var(--muted)" }}>{fmtDate(a.createdAt)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        )}
      </div>
    </div>
  );
}
