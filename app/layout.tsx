import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { AnalyticsProvider } from "@/lib/analytics";
import Script from "next/script";
import { assertProdEnv } from "@/lib/env";

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
  // Fail fast in production if critical envs are missing
  try { assertProdEnv(); } catch (e) { console.error(String(e)); }
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <AnalyticsProvider />
        {/* Lazy-load Crisp chat after first interaction or window load */}
        {process.env.NEXT_PUBLIC_CRISP_ID ? (
          <Script id="chat-loader" strategy="lazyOnload">
            {`
            (function(){
              var CRISP_ID = ${JSON.stringify(process.env.NEXT_PUBLIC_CRISP_ID)};
              if(!CRISP_ID) return;
              if (window.CRISP_WEBSITE_ID) return; // already loaded
              window.$crisp = [];
              window.CRISP_WEBSITE_ID = CRISP_ID;
              var loaded = false;
              function loadChat(){
                if(loaded) return; loaded = true;
                var d=document; var s=d.createElement('script'); s.src='https://client.crisp.chat/l.js'; s.async=1; d.getElementsByTagName('head')[0].appendChild(s);
              }
              ['click','scroll','keydown','touchstart'].forEach(function(ev){ window.addEventListener(ev, loadChat, { once: true, passive: true }); });
              window.addEventListener('load', loadChat, { once: true });
            })();
            `}
          </Script>
        ) : null}
      </body>
    </html>
  );
}
