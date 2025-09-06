import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — ConnectEV Inc.",
  description: "Terms of service for ConnectEV Inc. EV charger installation services.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
      
      <div className="prose prose-gray max-w-none">
        <div className="bg-white rounded-lg border border-gray-200 p-8 space-y-6">
          <p className="text-gray-700 leading-relaxed">
            Estimates are non-binding and subject to confirmation after a virtual check and, if needed, a site visit. 
            ESA permits are filed before work begins. All installations are completed by Licensed Electrical Contractors.
          </p>
          <p className="text-gray-700 leading-relaxed">
            If a refundable deposit is collected, it is applied to the final invoice or returned if the project does 
            not proceed. Cancellations and rescheduling should be requested at least 24 hours in advance.
          </p>
          <p className="text-gray-700 leading-relaxed">
            All work comes with a 2-year workmanship warranty. Licensed Electrical Contractors perform all installations with proper ESA permits and inspections.
          </p>
        </div>
      </div>
    </main>
  );
}