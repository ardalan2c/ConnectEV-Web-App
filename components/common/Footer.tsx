import Link from "next/link";

const quickLinks = [
  { href: "/quote", label: "Quote" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/process", label: "Process" },
  { href: "/faq", label: "FAQ" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function Footer() {
  return (
    <footer className="border-t border-black/10 mt-16 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="font-semibold text-lg">ConnectEV Inc.</div>
            <div className="text-sm text-slate-600 space-y-1">
              <div>Greater Toronto Area</div>
              <div>
                <a 
                  href="tel:+16476072739" 
                  className="hover:text-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
                >
                  +1 647-607-2739
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <div className="font-medium">Quick Links</div>
            <nav className="grid grid-cols-2 gap-2 text-sm" aria-label="Footer navigation">
              {quickLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  className="text-slate-600 hover:text-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal & Compliance */}
          <div className="space-y-4">
            <div className="font-medium">Licensed & Insured</div>
            <div className="text-sm text-slate-600 space-y-2">
              <div>ESA Permit Included</div>
              <div>WSIB Covered</div>
              <div>Licensed Electrical Contractors</div>
              <div>2-Year Workmanship Warranty</div>
            </div>
          </div>
        </div>

        <div className="border-t border-black/10 mt-8 pt-8 text-center text-sm text-slate-600">
          <p className="mb-2">
            All installations by Licensed Electrical Contractors. ESA permit filed before work begins.
          </p>
          <p>© {new Date().getFullYear()} ConnectEV Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}