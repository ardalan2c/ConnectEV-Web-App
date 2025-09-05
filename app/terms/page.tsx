export const metadata = { title: "Terms", description: "Estimate policy, scheduling, deposits, and cancellations." };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold">Terms</h1>
      <div className="rounded-2xl border border-black/10 p-4 space-y-3 text-sm text-slate-700">
        <p>Estimates are non‑binding and subject to confirmation after a virtual check and, if needed, a site visit. ESA permits are filed before work begins. All installations are completed by Licensed Electrical Contractors.</p>
        <p>If a refundable deposit is collected, it is applied to the final invoice or returned if the project does not proceed. Cancellations and rescheduling should be requested at least 24 hours in advance.</p>
      </div>
    </div>
  );
}
