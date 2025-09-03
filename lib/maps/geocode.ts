// lib/maps/geocode.ts
import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client({});

export async function geocodePlaceId(placeId: string) {
  const key = process.env.GOOGLE_MAPS_API_KEY_SERVER!;
  if (!key) throw new Error("Missing GOOGLE_MAPS_API_KEY_SERVER");
  
  const res = await client.placeDetails({ params: { place_id: placeId, key }});
  const r = res.data.result;
  
  return {
    lat: r.geometry?.location?.lat ?? null,
    lng: r.geometry?.location?.lng ?? null,
    address: r.formatted_address ?? null,
  };
}