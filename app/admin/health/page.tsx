import { prisma } from "@/lib/prisma";
import { supabaseAdmin } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminHealthPage() {
  let dbOk = false;
  const t0 = Date.now();
  try {
    await prisma.$queryRaw`SELECT 1`;
    dbOk = true;
  } catch {}
  const ms = Date.now() - t0;

  // Storage health check
  let storageOk = false;
  const t1 = Date.now();
  try {
    const admin = supabaseAdmin();
    await admin.storage.from("lead-photos").list("", { limit: 1 });
    storageOk = true;
  } catch {}
  const storageMs = Date.now() - t1;

  const Tile = ({ label, ok, detail }: { label: string; ok: boolean; detail?: string }) => (
    <div className={`rounded-2xl border p-6 ${ok ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"}`}>
      <div className="text-sm text-slate-600">{label}</div>
      <div className={`text-xl font-semibold ${ok ? "text-green-700" : "text-red-700"}`}>{ok ? "✅" : "❌"}</div>
      {detail && <div className="text-xs text-slate-500 mt-2">{detail}</div>}
    </div>
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-6">
      <h1 className="text-2xl font-bold">System Health</h1>
      <div className="grid sm:grid-cols-3 gap-4">
        <Tile label="Prisma Database" ok={dbOk} detail={`${ms} ms`} />
        <Tile label="Supabase Storage" ok={storageOk} detail={`lead-photos bucket • ${storageMs} ms`} />
        <div className="rounded-2xl border p-6">
          <div className="text-sm text-slate-600">Environment</div>
          <div className="text-xl font-semibold">{process.env.NODE_ENV}</div>
          <div className="text-xs text-slate-500 mt-2">{new Date().toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}

