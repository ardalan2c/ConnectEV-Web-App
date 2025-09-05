import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

const quickLinks = [
  { name: 'Quote', href: '/quote' },
  { name: 'Services', href: '/services' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
];

const serviceAreas = [
  'Toronto', 'Mississauga', 'Brampton', 'Vaughan', 'Markham',
  'Richmond Hill', 'Oakville', 'Burlington', 'Pickering', 'Ajax'
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">EV</span>
              </div>
              <span className="font-sora font-bold text-xl">ConnectEV Inc.</span>
            </div>
            <p className="text-gray-300 text-sm">
              Licensed EV charger installation across the Greater Toronto Area.
              ECRA/ESA #7010248
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:+16476072739" className="hover:text-primary transition-colors focus-ring rounded">
                  +1 (647) 607-2739
                </a>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:hello@connectev.ca" className="hover:text-primary transition-colors focus-ring rounded">
                  hello@connectev.ca
                </a>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Greater Toronto Area</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-sora font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors text-sm focus-ring rounded"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="font-sora font-semibold text-lg mb-4">Service Areas</h3>
            <div className="flex flex-wrap gap-2">
              {serviceAreas.map((area) => (
                <span
                  key={area}
                  className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Credentials */}
          <div>
            <h3 className="font-sora font-semibold text-lg mb-4">Credentials</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>✓ ECRA/ESA Licensed #7010248</li>
              <li>✓ WSIB Insured</li>
              <li>✓ 1-Year Workmanship Warranty</li>
              <li>✓ Tesla Certified Installer</li>
              <li>✓ ChargePoint Partner</li>
              <li>✓ FLO Authorized Dealer</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} ConnectEV Inc. All rights reserved. 
              ECRA/ESA Licensed Contractor — #7010248
            </div>
            <div className="flex space-x-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-primary transition-colors focus-ring rounded"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}