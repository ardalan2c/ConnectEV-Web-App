"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Phone, MessageCircle } from "lucide-react";

const nav = [
  { href: "/residential", label: "Services" },
  { href: "/rebates-and-permits", label: "Process" },
  { href: "/faq", label: "FAQ" },
  { href: "/service-areas/toronto", label: "Service Areas" },
];

export function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/80 border-b border-black/5">
      {/* Skip to content link */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-emerald-600 text-white px-4 py-2 rounded-lg z-[100]">
        Skip to content
      </a>
      
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-6">
        <Link href="/" className="font-semibold tracking-tight">ConnectEV Inc.</Link>
        
        <nav className="hidden md:flex items-center gap-4 text-sm">
          {nav.map((n) => (
            <Link 
              key={n.href} 
              href={n.href as any} 
              className={cn("px-2 py-1 rounded-xl hover:bg-black/[0.04] transition-colors", 
                pathname === n.href && "text-slate-900 font-medium")}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        
        <div className="ml-auto flex items-center gap-3">
          {/* Desktop: Show all buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <a 
                href="tel:+14165551234" 
                rel="nofollow" 
                aria-label="Call ConnectEV at 416-555-1234"
                className="flex items-center gap-2"
              >
                <Phone className="h-4 w-4" />
                Call 416-555-1234
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a 
                href="sms:+14165551234" 
                rel="nofollow" 
                aria-label="Text ConnectEV at 416-555-1234"
                className="flex items-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                Text 416-555-1234
              </a>
            </Button>
          </div>
          
          {/* Mobile: Show one contact button */}
          <div className="sm:hidden">
            <Button variant="outline" size="sm" asChild>
              <a 
                href="tel:+14165551234" 
                rel="nofollow" 
                aria-label="Call ConnectEV"
                className="flex items-center gap-2"
              >
                <Phone className="h-4 w-4" />
                Call
              </a>
            </Button>
          </div>
          
          <Button asChild>
            <Link href="/quote">Get Instant Quote</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

