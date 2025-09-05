"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Phone, MessageCircle } from "lucide-react";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/process", label: "Process" },
  { href: "/faq", label: "FAQ" },
  { href: "/service-areas", label: "Service Areas" },
] as const;

export function Header() {
  const pathname = usePathname();
  const phone = "+16476072739";
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/80 border-b border-black/5">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-emerald-600 text-white px-4 py-2 rounded-lg z-[100]">
        Skip to content
      </a>
      
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2" aria-label="ConnectEV Inc. home">
          <Image 
            src="/logo/logo.svg" 
            alt="ConnectEV Inc." 
            width={120} 
            height={28} 
            className="h-7 w-auto"
            onError={(e) => { (e.currentTarget as any).style.display = 'none'; }}
          />
        </Link>
        
        <nav className="hidden md:flex items-center gap-1 text-sm">
          {nav.map((n) => (
            <Link 
              key={n.href} 
              href={n.href} 
              className={cn(
                "px-3 py-2 rounded-xl hover:bg-black/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors",
                pathname === n.href && "text-slate-900 font-medium"
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        
        <div className="ml-auto flex items-center gap-3">
          {/* md+: show Call and Text */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <a 
                href={`tel:${phone}`}
                rel="nofollow" 
                aria-label="Call ConnectEV at +1 647-607-2739"
                className="flex items-center gap-2"
              >
                <Phone className="h-4 w-4" />
                Call
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a 
                href={`sms:${phone}`}
                rel="nofollow" 
                aria-label="Text ConnectEV at +1 647-607-2739"
                className="flex items-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                Text
              </a>
            </Button>
          </div>
          
          <Button asChild className="bg-emerald-600 hover:bg-emerald-700 focus-visible:ring-2 focus-visible:ring-emerald-500">
            <Link href="/quote">Book Now</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
