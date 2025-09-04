import type { AddressSuggestion, ResolvedAddress } from '../index';

export async function suggest(_: string): Promise<AddressSuggestion[]> {
  return []; // no autocomplete
}

export async function resolve(input: string): Promise<ResolvedAddress> {
  // Minimal normalization; grab postal code if present (Canadian pattern)
  const postalMatch = input.toUpperCase().match(/[A-Z]\d[A-Z]\s?\d[A-Z]\d/);
  return { 
    formatted: input.trim(), 
    postalCode: postalMatch?.[0]?.replace(/\s+/g, '') 
  };
}