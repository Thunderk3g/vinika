import VinikaSite from "@/components/VinikaSite";
import { getHomeContent } from "@/lib/db/queries";

// Always reflect the latest content edited from the admin CRM.
export const dynamic = "force-dynamic";

export default async function Page() {
  const content = await getHomeContent().catch(() => undefined);
  return <VinikaSite content={content} />;
}
