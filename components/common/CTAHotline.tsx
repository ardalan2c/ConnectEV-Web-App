import Link from "next/link";

export function CTAHotline() {
  const phone = "+16476072739";
  return (
    <div className="md:hidden fixed bottom-3 inset-x-3 z-40">
      <nav className="bg-white/95 backdrop-blur rounded-2xl shadow-lg border border-black/10 p-2 flex items-center gap-2" aria-label="Quick actions">
        <Link
          href="/#quote"
          className="flex-1 inline-flex items-center justify-center h-12 rounded-xl bg-emerald-600 text-white text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          Get Instant Quote
        </Link>
        <a
          href={`tel:${phone}`}
          className="w-12 inline-flex items-center justify-center h-12 rounded-xl border border-black/10 bg-white text-slate-900 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          aria-label="Call"
        >
          Call
        </a>
        <a
          href={`sms:${phone}`}
          className="w-12 inline-flex items-center justify-center h-12 rounded-xl border border-black/10 bg-white text-slate-900 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          aria-label="Text"
        >
          Text
        </a>
      </nav>
    </div>
  );
}
