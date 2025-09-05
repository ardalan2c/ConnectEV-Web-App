import { Button } from "@/components/ui/button";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface DiagnosticData {
  ok: boolean;
  reason?: string;
  hasNextPublicUrl: boolean;
  hasNextPublicAnon: boolean;
  hasServerUrl: boolean;
  hasServerAnon: boolean;
  chosenUrl: string | null;
  chosenUrlType: "https" | "postgres" | "invalid" | "missing";
  maskedAnon: string | null;
  hint?: string;
}

export default async function DebugSupabasePage() {
  let data: DiagnosticData;
  
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/supabase/diagnose`, {
      cache: 'no-store'
    });
    data = await res.json();
  } catch {
    data = {
      ok: false,
      reason: "Failed to fetch diagnostics",
      hasNextPublicUrl: false,
      hasNextPublicAnon: false,
      hasServerUrl: false,
      hasServerAnon: false,
      chosenUrl: null,
      chosenUrlType: "missing",
      maskedAnon: null,
      hint: "Check server connectivity"
    };
  }

  const StatusIcon = ({ ok }: { ok: boolean }) => (
    <span className={`text-lg ${ok ? 'text-green-600' : 'text-red-600'}`}>
      {ok ? '✅' : '❌'}
    </span>
  );

  const StatusRow = ({ label, ok, detail }: { label: string; ok: boolean; detail?: string }) => (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
      <div>
        <span className="font-medium">{label}</span>
        {detail && <div className="text-sm text-gray-500">{detail}</div>}
      </div>
      <StatusIcon ok={ok} />
    </div>
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Supabase Diagnostics</h1>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
        <div className={`p-4 rounded-lg ${data.ok ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <div className="flex items-center space-x-2">
            <StatusIcon ok={data.ok} />
            <span className={`font-semibold ${data.ok ? 'text-green-800' : 'text-red-800'}`}>
              {data.ok ? 'Supabase Configuration OK' : 'Supabase Configuration Issues'}
            </span>
          </div>
          {!data.ok && data.reason && (
            <div className="mt-2 text-sm text-red-700">{data.reason}</div>
          )}
          {data.hint && (
            <div className="mt-2 text-sm text-red-600 font-medium">{data.hint}</div>
          )}
        </div>

        <div className="space-y-1">
          <StatusRow 
            label="Project URL (https://...supabase.co)" 
            ok={data.chosenUrlType === "https"}
            detail={data.chosenUrl || "Not set"}
          />
          
          <StatusRow 
            label="Anon key present" 
            ok={!!data.maskedAnon}
            detail={data.maskedAnon || "Not set"}
          />
          
          <StatusRow 
            label="URL Type" 
            ok={data.chosenUrlType === "https"}
            detail={data.chosenUrlType}
          />

          <StatusRow 
            label="NEXT_PUBLIC_SUPABASE_URL" 
            ok={data.hasNextPublicUrl}
          />
          
          <StatusRow 
            label="NEXT_PUBLIC_SUPABASE_ANON_KEY" 
            ok={data.hasNextPublicAnon}
          />
          
          <StatusRow 
            label="SUPABASE_URL (server fallback)" 
            ok={data.hasServerUrl}
          />
          
          <StatusRow 
            label="SUPABASE_ANON_KEY (server fallback)" 
            ok={data.hasServerAnon}
          />
        </div>

        <div className="pt-4 space-y-2">
          <div className="text-sm text-gray-600 mb-2">API Endpoints:</div>
          <div className="flex space-x-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/api/supabase/public" target="_blank">
                /api/supabase/public
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/api/supabase/diagnose" target="_blank">
                /api/supabase/diagnose
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}