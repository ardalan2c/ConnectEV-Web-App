import { gtaCities } from "@/config/cities";
import { notFound } from "next/navigation";

export default function CityPage({ params }: { params: { city: string } }) {
  const cityParam = decodeURIComponent(params.city).replace(/-/g, " ");
  const match = gtaCities.find((c) => c.toLowerCase().replace(/\s+/g, " ") === cityParam.toLowerCase().replace(/\s+/g, " "));
  if (!match) return notFound();
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold">Serving the Greater Toronto Area</h1>
      <div className="rounded-2xl border border-black/10 p-4">{match}</div>
    </div>
  );
}

