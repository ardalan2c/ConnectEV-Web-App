"use client"

import { Button } from '@/components/ui/button';
import { Phone, MessageSquare } from 'lucide-react';

export function MobileCTA() {
  const scrollToQuote = () => {
    const quoteSection = document.getElementById('instant-quote');
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-gray-200 p-4">
      <div className="flex space-x-3">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="flex-1 focus-ring min-h-[44px]"
        >
          <a href="tel:+16476072739" className="flex items-center justify-center space-x-2">
            <Phone className="w-4 h-4" />
            <span>Call</span>
          </a>
        </Button>
        <Button
          variant="outline"
          size="sm"
          asChild
          className="flex-1 focus-ring min-h-[44px]"
        >
          <a href="sms:+16476072739" className="flex items-center justify-center space-x-2">
            <MessageSquare className="w-4 h-4" />
            <span>Text</span>
          </a>
        </Button>
        <Button
          onClick={scrollToQuote}
          size="sm"
          className="flex-2 focus-ring min-h-[44px]"
        >
          Get Quote
        </Button>
      </div>
    </div>
  );
}