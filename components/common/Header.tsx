"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Phone, MessageCircle } from "lucide-react";
import Image from "next/image";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/process", label: "Process" },
  { href: "/faq", label: "FAQ" },
  { href: "/service-areas", label: "Service Areas" },
];

export function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/90 bg-white border-b border-black/10">
      {/* Skip to content link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-emerald-600 text-white px-4 py-2 rounded-lg z-[100] focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        Skip to content
      </a>
      
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg">
          <Image 
            src="/logo/logo.svg" 
            alt="ConnectEV Inc. Logo" 
            width={32} 
            height={32}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          ConnectEV Inc.
        </Link>
        
        <nav className="hidden md:flex items-center gap-1 text-sm" role="navigation" aria-label="Main navigation">
          {nav.map((n) => (
            <Link 
              key={n.href} 
              href={n.href} 
              className={cn(
                "px-3 py-2 rounded-xl hover:bg-black/[0.04] transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500", 
                pathname === n.href && "text-slate-900 font-medium bg-black/[0.04]"
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        
        <div className="ml-auto flex items-center gap-3">
          {/* Desktop: Show all contact options */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <a 
                href="tel:+16476072739" 
                rel="nofollow" 
                aria-label="Call ConnectEV at 647-607-2739"
                className="flex items-center gap-2 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <Phone className="h-4 w-4" />
                Call
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a 
                href="sms:+16476072739" 
                rel="nofollow" 
                aria-label="Text ConnectEV at 647-607-2739"
                className="flex items-center gap-2 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <MessageCircle className="h-4 w-4" />
                Text
              </a>
            </Button>
          </div>
          
          {/* Mobile: Show one contact button */}
          <div className="md:hidden">
            <Button variant="outline" size="sm" asChild>
              <a 
                href="tel:+16476072739" 
                rel="nofollow" 
                aria-label="Call ConnectEV"
                className="flex items-center gap-2 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <Phone className="h-4 w-4" />
                Call
              </a>
            </Button>
          </div>
          
          <Button asChild className="bg-emerald-600 hover:bg-emerald-700 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-emerald-500">
            <Link href="/quote">Book Now</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}