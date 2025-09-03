import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { AnalyticsProvider } from "@/lib/analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.connectev.example"),
  title: {
    default: "ConnectEV Inc. — Charge ahead.",
    template: "%s — ConnectEV Inc.",
  },
  description: "Fast, code-compliant EV-charger installs across the GTA.",
  openGraph: {
    title: "ConnectEV Inc.",
    description: "Fast, code-compliant EV-charger installs across the GTA.",
    images: [
      { url: "/og.png", width: 1200, height: 630, alt: "ConnectEV" }
    ]
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <AnalyticsProvider />
      </body>
    </html>
  );
}

