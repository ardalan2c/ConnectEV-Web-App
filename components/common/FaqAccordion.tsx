import { AccordionItem } from "@/components/ui/accordion";

export function FaqAccordion() {
  return (
    <div className="space-y-3">
      <AccordionItem title="Do I need a permit?">
        Yes—ESA permit is included.
      </AccordionItem>
      <AccordionItem title="Can you install in condos?">
        Yes—board approval required; we help with paperwork.
      </AccordionItem>
    </div>
  );
}

