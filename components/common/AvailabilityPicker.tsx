"use client";
import { Button } from "@/components/ui/button";

export function AvailabilityPicker() {
  const useCalendly = (process.env.NEXT_PUBLIC_FEATURE_USE_CALENDLY || "false").toLowerCase() === "true";
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "";
  if (useCalendly && calendlyUrl) {
    return (
      <Button asChild>
        <a href={calendlyUrl} target="_blank" rel="noreferrer">Book virtual consult</a>
      </Button>
    );
  }
  // Naive in-app stub
  return (
    <div className="rounded-2xl border border-black/10 p-4 grid grid-cols-2 gap-2 text-sm">
      {["Tue 10:00", "Tue 14:00", "Wed 09:30", "Thu 16:00"].map((slot) => (
        <button key={slot} className="rounded-xl border border-black/10 px-3 py-2 hover:bg-black/[0.04]">{slot}</button>
      ))}
    </div>
  );
}
