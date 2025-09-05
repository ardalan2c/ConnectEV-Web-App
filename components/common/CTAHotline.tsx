import Link from "next/link";

export function CTAHotline() {
  const phone = "+16476072739";
  return (
    <div className="md:hidden fixed bottom-3 inset-x-3 z-40">
      <nav 
        className="bg-white/95 backdrop-blur rounded-2xl shadow-lg border border-black/10 p-2 flex items-center gap-2" 
        aria-label="Quick actions"
      >
        <Link
          href="/quote"
          className="flex-1 inline-flex items-center justify-center min-h-[44px] rounded-xl bg-emerald-600 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 hover:bg-emerald-700 transition-colors"
        >
          Get Quote
        </Link>
        <a
          href={`tel:${phone}`}
          className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-xl border border-black/10 bg-white text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 hover:bg-black/[0.02] transition-colors"
          aria-label="Call ConnectEV"
        >
          Call
        </a>
        <a
          href={`sms:${phone}`}
          className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-xl border border-black/10 bg-white text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 hover:bg-black/[0.02] transition-colors"
          aria-label="Text ConnectEV"
        >
          Text
        </a>
      </nav>
    </div>
  );
}