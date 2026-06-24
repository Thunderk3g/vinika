import { ReactNode } from "react";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";

/** Standard chrome for every non-home page: nav + navy/grid background + footer. */
export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="page-bg">
      <SiteNav />
      {children}
      <SiteFooter />
    </div>
  );
}
