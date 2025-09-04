export type AddressSuggestion = { label: string; placeId?: string };
export type ResolvedAddress = { formatted: string; lat?: number; lng?: number; postalCode?: string };

const PROVIDER = (process.env.ADDRESS_PROVIDER || 'none').toLowerCase();

export async function suggest(query: string): Promise<AddressSuggestion[]> {
  if (PROVIDER === 'google') {
    const { suggest: s } = await import('./providers/google');
    return s(query);
  }
  if (PROVIDER === 'mapbox') {
    const { suggest: s } = await import('./providers/mapbox');
    return s(query);
  }
  const { suggest: s } = await import('./providers/none');
  return s(query);
}

export async function resolve(input: string): Promise<ResolvedAddress> {
  if (PROVIDER === 'google') {
    const { resolve: r } = await import('./providers/google');
    return r(input);
  }
  if (PROVIDER === 'mapbox') {
    const { resolve: r } = await import('./providers/mapbox');
    return r(input);
  }
  const { resolve: r } = await import('./providers/none');
  return r(input);
}

export function currentProvider(): 'none' | 'mapbox' | 'google' { 
  if (PROVIDER === 'google' || PROVIDER === 'mapbox') return PROVIDER as any;
  return 'none'; 
}
