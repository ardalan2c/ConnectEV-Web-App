// lib/maps/geocode.ts - DEPRECATED: Use @/lib/address instead
// This file is kept for backward compatibility but should not be used in ADDRESS_PROVIDER=none mode

export async function geocodePlaceId(placeId: string) {
  const key = process.env.GOOGLE_MAPS_API_KEY_SERVER;
  if (!key) {
    console.warn("geocodePlaceId called but GOOGLE_MAPS_API_KEY_SERVER not set. Use @/lib/address instead.");
    return { lat: null, lng: null, address: null };
  }
  
  // Only import Google Maps client if we have the key
  if (process.env.ADDRESS_PROVIDER === 'google') {
    try {
      const { Client } = await import("@googlemaps/google-maps-services-js");
      const client = new Client({});
      const res = await client.placeDetails({ params: { place_id: placeId, key }});
      const r = res.data.result;
      
      return {
        lat: r.geometry?.location?.lat ?? null,
        lng: r.geometry?.location?.lng ?? null,
        address: r.formatted_address ?? null,
      };
    } catch (error) {
      console.warn("Google Maps geocoding failed:", error);
      return { lat: null, lng: null, address: null };
    }
  }
  
  console.warn("geocodePlaceId called but ADDRESS_PROVIDER is not google. Use @/lib/address instead.");
  return { lat: null, lng: null, address: null };
}