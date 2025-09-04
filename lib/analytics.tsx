"use client";
import { Analytics } from "@vercel/analytics/react";
import posthog from "posthog-js";
import { useEffect } from "react";

export function AnalyticsProvider() {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
    if (key && typeof window !== "undefined") {
      posthog.init(key, { api_host: host, persistence: "memory" });
    }
  }, []);
  return <Analytics />;
}
