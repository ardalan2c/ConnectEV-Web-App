"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-6">
        <Link href="/" className="font-semibold tracking-tight">ConnectEV Inc.</Link>
        <nav className="hidden md:flex items-center gap-4 text-sm">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className={cn("px-2 py-1 rounded-xl hover:bg-black/[0.04]", pathname === n.href && "text-slate-900 font-medium")}>{n.label}</Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <Button asChild>
            <Link href="/quote">Get Instant Quote</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

