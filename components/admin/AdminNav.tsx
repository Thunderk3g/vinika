"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS: [string, string][] = [
  ["/admin", "Dashboard"],
  ["/admin/content", "Site Content"],
  ["/admin/blog", "Blog"],
  ["/admin/appointments", "Appointments"],
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <nav style={{ display: "contents" }}>
      {LINKS.map(([href, label]) => {
        const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
        return (
          <Link key={href} href={href} className={"adm-sidelink" + (active ? " active" : "")}>
            {label}
          </Link>
        );
      })}
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="adm-sidelink"
        style={{ marginTop: "auto" }}
      >
        View site ↗
      </a>
    </nav>
  );
}
