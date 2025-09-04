import type { AddressSuggestion, ResolvedAddress } from '../index';

export async function suggest(query: string): Promise<AddressSuggestion[]> {
  if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
    console.warn('Mapbox token missing; returning []');
    return [];
  }
  
  // TODO: Implement Mapbox Search API
  // This would use Mapbox Search API to fetch suggestions
  console.warn('Mapbox provider not implemented yet; returning []');
  return [];
}

export async function resolve(input: string): Promise<ResolvedAddress> {
  if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
    console.warn('Mapbox token missing; returning basic resolution');
    return { formatted: input };
  }
  
  // TODO: Implement Mapbox Geocoding API
  // This would use Mapbox Geocoding API to resolve addresses
  console.warn('Mapbox provider not implemented yet; returning basic resolution');
  return { formatted: input };
}