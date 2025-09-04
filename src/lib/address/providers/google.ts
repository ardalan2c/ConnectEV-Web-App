import type { AddressSuggestion, ResolvedAddress } from '../index';

export async function suggest(query: string): Promise<AddressSuggestion[]> {
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    console.warn('Google Maps API key missing; returning []');
    return [];
  }
  
  // TODO: Implement Google Places Autocomplete
  // This would use Google Places API to fetch suggestions
  console.warn('Google provider not implemented yet; returning []');
  return [];
}

export async function resolve(input: string): Promise<ResolvedAddress> {
  if (!process.env.GOOGLE_MAPS_API_KEY_SERVER) {
    console.warn('Google Maps server API key missing; returning basic resolution');
    return { formatted: input };
  }
  
  // TODO: Implement Google Geocoding API
  // This would use Google Geocoding API to resolve addresses
  console.warn('Google provider not implemented yet; returning basic resolution');
  return { formatted: input };
}