import { AccordionItem } from "@/components/ui/accordion";

export function FaqAccordion() {
  const faqs = [
    {
      question: "Do I need a permit for EV charger installation?",
      answer: "Yes—ESA permit is included in all our installations. We handle all permit filing and inspections before work begins."
    },
    {
      question: "Can you install EV chargers in condos?",
      answer: "Yes—board approval is required and we help with all necessary paperwork and documentation for condo installations."
    },
    {
      question: "How long does installation take?",
      answer: "Most installations take 2-4 hours. The full process from quote to completion is typically 1-2 weeks including permit approval."
    },
    {
      question: "What's included in the installation price?",
      answer: "All materials, labor, ESA permit, conduit runs up to 50 feet, mounting hardware, and 2-year workmanship warranty."
    },
    {
      question: "Do you work in all weather conditions?",
      answer: "We install year-round but may reschedule for extreme weather conditions for safety reasons. Indoor installations are not affected by weather."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept cash, cheque, credit card, and e-transfer. Payment is due upon completion of installation."
    },
    {
      question: "What should I prepare before installation day?",
      answer: "Ensure clear access to your electrical panel and parking area. We'll provide specific preparation instructions after booking."
    },
    {
      question: "Do you offer emergency service?",
      answer: "We provide priority service for urgent repairs. For new installations, we typically schedule within 1-2 weeks."
    }
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <details className="group">
            <summary className="flex items-center justify-between p-6 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
              <div className="flex-shrink-0 text-emerald-600 group-open:rotate-45 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </summary>
            <div className="px-6 pb-6">
              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          </details>
        </div>
      ))}
    </div>
  );
}