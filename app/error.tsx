"use client";
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="text-slate-600 mt-2">Please try again. If the issue persists, contact support.</p>
      <button className="mt-6 rounded-2xl bg-accent text-slate-950 px-6 py-3" onClick={() => reset()}>Retry</button>
    </div>
  );
}

