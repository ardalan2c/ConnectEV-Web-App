"use client";
import { Analytics } from "@vercel/analytics/react";
import posthog from "posthog-js";
import { useEffect } from "react";
import { env } from "./env";

export function AnalyticsProvider() {
  useEffect(() => {
    if (env.posthogKey && typeof window !== "undefined") {
      posthog.init(env.posthogKey, { api_host: env.posthogHost, persistence: "memory" });
    }
  }, []);
  return <Analytics />;
}

