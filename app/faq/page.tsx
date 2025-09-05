import { FaqAccordion } from "@/components/common/FaqAccordion";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently asked",
  description: "Answers about permits, timelines, condos, pricing, and what to expect on install day.",
};

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold">Frequently asked</h1>
      <FaqAccordion />
    </div>
  );
}
