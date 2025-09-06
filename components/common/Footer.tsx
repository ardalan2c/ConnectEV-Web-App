import Link from "next/link";

const quickLinks = [
  { name: "Quote", href: "/quote" },
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "Process", href: "/process" },
  { name: "FAQ", href: "/faq" },
  { name: "Service Areas", href: "/service-areas" },
  { name: "Privacy", href: "/privacy" },
  { name: "Terms", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* NAP Line */}
        <div className="text-center mb-8">
          <div className="text-lg font-semibold text-gray-900 mb-2">
            ConnectEV Inc. • GTA • 
            <a 
              href="tel:+16476072739" 
              className="text-emerald-600 hover:text-emerald-700 ml-1 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded"
            >
              +1 647-607-2739
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <nav className="flex flex-wrap justify-center gap-6 mb-8" aria-label="Footer navigation">
          {quickLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href}
              className="text-gray-600 hover:text-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded px-2 py-1"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} ConnectEV Inc.
        </div>
      </div>
    </footer>
  );
}