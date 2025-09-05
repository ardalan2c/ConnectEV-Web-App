import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCTA } from "@/components/layout/MobileCTA";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const sora = Sora({ 
  subsets: ["latin"],
  variable: "--font-sora",
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "ConnectEV Inc. - Fast EV Charger Installation Across the GTA",
    template: "%s | ConnectEV Inc."
  },
  description: "Licensed EV charger installation across the Greater Toronto Area. Same-week service, ECRA/ESA certified, 1-year warranty. Tesla, ChargePoint, FLO installations.",
  keywords: ["EV charger installation", "Toronto", "GTA", "Tesla charger", "ChargePoint", "FLO", "electrical contractor", "ECRA", "ESA"],
  authors: [{ name: "ConnectEV Inc." }],
  creator: "ConnectEV Inc.",
  publisher: "ConnectEV Inc.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://connectev.ca'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: '/',
    title: 'ConnectEV Inc. - Fast EV Charger Installation Across the GTA',
    description: 'Licensed EV charger installation across the Greater Toronto Area. Same-week service, ECRA/ESA certified, 1-year warranty.',
    siteName: 'ConnectEV Inc.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ConnectEV Inc. - Fast EV Charger Installation Across the GTA',
    description: 'Licensed EV charger installation across the Greater Toronto Area. Same-week service, ECRA/ESA certified, 1-year warranty.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "ConnectEV Inc.",
              "image": "/logo.png",
              "@id": "https://connectev.ca",
              "url": "https://connectev.ca",
              "telephone": "+16476072739",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Toronto",
                "addressRegion": "ON",
                "addressCountry": "CA"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 43.6532,
                "longitude": -79.3832
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday", 
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "08:00",
                "closes": "18:00"
              },
              "sameAs": []
            })
          }}
        />
      </head>
      <body className="antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <MobileCTA />
      </body>
    </html>
  );
}