import { FaqAccordion } from "@/components/common/FaqAccordion";

export const metadata = { title: "Frequently asked" };

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold">Frequently asked</h1>
      <FaqAccordion />
    </div>
  );
}

