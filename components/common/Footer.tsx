import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-black/10 mt-16">
      <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-slate-700 space-y-6">
        <div className="font-medium">ConnectEV Inc. • GTA • +1 647-607-2739</div>

        <nav className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Footer">
          <Link href="/quote" className="underline">Quote</Link>
          <Link href="/services" className="underline">Services</Link>
          <Link href="/pricing" className="underline">Pricing</Link>
          <Link href="/process" className="underline">Process</Link>
          <Link href="/faq" className="underline">FAQ</Link>
          <Link href="/service-areas" className="underline">Service Areas</Link>
          <Link href="/privacy" className="underline">Privacy</Link>
          <Link href="/terms" className="underline">Terms</Link>
        </nav>

        <div className="text-xs text-slate-500">© {new Date().getFullYear()} ConnectEV Inc.</div>
      </div>
    </footer>
  );
}
