"use client";
import * as React from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Input } from "@/components/ui/input";
import { env } from "@/lib/env";

type Props = {
  value?: string;
  onSelect: (place: { description: string; placeId?: string }) => void;
};

export function AddressAutocomplete({ value, onSelect }: Props) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    let ac: google.maps.places.Autocomplete | undefined;
    let loader: Loader | undefined;
    (async () => {
      if (!inputRef.current || !env.publicMapsKey) return;
      loader = new Loader({ apiKey: env.publicMapsKey, version: "weekly", libraries: ["places"] });
      await loader.load();
      ac = new google.maps.places.Autocomplete(inputRef.current!, { fields: ["place_id", "formatted_address"], componentRestrictions: { country: ["ca"] } });
      ac.addListener("place_changed", () => {
        const place = ac!.getPlace();
        onSelect({ description: place.formatted_address || inputRef.current!.value, placeId: place.place_id });
      });
    })();
    return () => {
      ac?.unbindAll();
    };
  }, [onSelect]);
  return <Input ref={inputRef} defaultValue={value} placeholder="Address" aria-label="Address" />;
}

