export const metadata = { title: "Condos & Apartments" };

export default function CondoPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold">What we install</h1>
      <div className="rounded-2xl border border-black/10 p-4">Condos & Apartments</div>
      <h2 className="text-2xl font-semibold">How it works</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-black/10 p-4">1) Instant Quote</div>
        <div className="rounded-2xl border border-black/10 p-4">2) Virtual Check</div>
        <div className="rounded-2xl border border-black/10 p-4">3) ESA Permit</div>
        <div className="rounded-2xl border border-black/10 p-4">4) Install Day</div>
      </div>
    </div>
  );
}

