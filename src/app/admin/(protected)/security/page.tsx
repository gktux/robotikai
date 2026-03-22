import { fetchSecurityLogs } from "./actions";
import { SecurityDashboard } from "./SecurityDashboard";

export const dynamic = "force-dynamic";

export default async function SecurityPage() {
  const logs = await fetchSecurityLogs();

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-4 md:p-8">
      <SecurityDashboard initialLogs={logs} />
    </div>
  );
}
