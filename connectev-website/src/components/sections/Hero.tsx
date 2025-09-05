"use client"

import { Button } from '@/components/ui/button';
import { Shield, Award, Clock, CheckCircle } from 'lucide-react';

const trustBadges = [
  {
    icon: Shield,
    text: 'ECRA/ESA #7010248',
    subtext: 'Licensed'
  },
  {
    icon: Award,
    text: 'WSIB Insured',
    subtext: 'Protected'
  },
  {
    icon: Clock,
    text: 'Same-Week Install',
    subtext: 'Fast Service'
  },
  {
    icon: CheckCircle,
    text: '1-Year Warranty',
    subtext: 'Guaranteed'
  }
];

export function Hero() {
  const scrollToQuote = () => {
    const quoteSection = document.getElementById('instant-quote');
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h1 className="font-sora font-bold text-4xl sm:text-5xl lg:text-6xl text-gray-900 leading-tight">
                Fast EV Charger Installs
                <span className="text-primary block">Across the GTA</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                Licensed electrical contractors providing same-week EV charger installation 
                with permits, inspections, and 1-year warranty included.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {trustBadges.map((badge, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100"
                >
                  <badge.icon className="w-6 h-6 text-primary mb-2" />
                  <div className="text-sm font-semibold text-gray-900">{badge.text}</div>
                  <div className="text-xs text-gray-500">{badge.subtext}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={scrollToQuote}
                size="xl"
                className="focus-ring min-h-[56px]"
              >
                Get Instant Quote
              </Button>
              <Button
                variant="outline"
                size="xl"
                asChild
                className="focus-ring min-h-[56px]"
              >
                <a href="tel:+16476072739">
                  Call (647) 607-2739
                </a>
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 bg-gradient-to-br from-blue-400 to-green-400 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <span>500+ Happy Customers</span>
              </div>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-4 h-4 bg-yellow-400 rounded-full" />
                ))}
                <span className="ml-2">5.0 Rating</span>
              </div>
            </div>
          </div>

          {/* Hero Image/Video Placeholder */}
          <div className="relative animate-slide-up">
            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white font-bold text-xl">EV</span>
                  </div>
                  <div className="text-gray-600">
                    <div className="font-semibold">Professional Installation</div>
                    <div className="text-sm">Tesla • ChargePoint • FLO</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-4 -right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-100">
              <div className="text-sm font-semibold text-gray-900">Same Week</div>
              <div className="text-xs text-gray-500">Installation</div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg border border-gray-100">
              <div className="text-sm font-semibold text-gray-900">$1,200 - $3,500</div>
              <div className="text-xs text-gray-500">Typical Range</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}