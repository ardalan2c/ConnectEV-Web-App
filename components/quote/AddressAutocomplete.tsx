"use client";
import * as React from "react";
import { currentProvider } from "@/lib/address";

type Props = {
  value?: string;
  onSelect: (place: { description: string; placeId?: string }) => void;
  className?: string;
};

export function AddressAutocomplete({ value, onSelect, className }: Props) {
  const [inputValue, setInputValue] = React.useState(value || "");
  const provider = currentProvider();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onSelect({ description: newValue });
  };

  return (
    <div className={["space-y-2", className].filter(Boolean).join(" ")}> 
      <label className="text-sm font-medium">Address</label>
      <input
        type="text"
        inputMode="text"
        placeholder="Street, City, ON  •  Postal code (optional)"
        value={inputValue}
        onChange={handleChange}
        className="w-full rounded-xl border px-3 py-2 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
        aria-describedby="addr-help"
      />
      <p id="addr-help" className="text-xs text-slate-500">
        Type your full address; we&apos;ll confirm during the virtual check.
      </p>
      {provider !== 'none' ? (
        <p className="text-[11px] text-slate-400">Autocomplete is off in Launch Mode.</p>
      ) : null}
    </div>
  );
}
