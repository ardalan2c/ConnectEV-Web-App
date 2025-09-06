"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Phone, MessageCircle } from "lucide-react";
import Image from "next/image";

const navigation = [
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "Process", href: "/process" },
  { name: "FAQ", href: "/faq" },
  { name: "Service Areas", href: "/service-areas" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      {/* Skip to content link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-emerald-600 text-white px-4 py-2 rounded-lg z-[100] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        Skip to content
      </a>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-lg">
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
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            {navigation.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                className="text-gray-700 hover:text-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-3 py-2"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <a 
                href="tel:+16476072739" 
                className="flex items-center gap-2 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                <Phone className="h-4 w-4" />
                Call
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a 
                href="sms:+16476072739" 
                className="flex items-center gap-2 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                <MessageCircle className="h-4 w-4" />
                Text
              </a>
            </Button>
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
              <Link href="/quote">Book Now</Link>
            </Button>
          </div>
          
          {/* Mobile CTA */}
          <div className="md:hidden">
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
              <Link href="/quote">Book Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}