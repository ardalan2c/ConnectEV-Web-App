import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    const number = cleaned.slice(1);
    return `+1 (${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6)}`;
  }
  return phone;
}

export function generateEstimate(formData: any): { min: number; max: number; disclaimer: string } {
  let baseMin = 1200;
  let baseMax = 2500;

  // Property type adjustments
  if (formData.propertyType === 'condo') {
    baseMin += 300;
    baseMax += 800;
  } else if (formData.propertyType === 'commercial') {
    baseMin += 1000;
    baseMax += 3000;
  }

  // Distance adjustments
  if (formData.distance === '10-20m') {
    baseMin += 400;
    baseMax += 800;
  } else if (formData.distance === '20-30m') {
    baseMin += 800;
    baseMax += 1200;
  } else if (formData.distance === '>30m') {
    baseMin += 1200;
    baseMax += 2000;
  }

  // Electrical service adjustments
  if (formData.electricalService === '60A') {
    baseMin += 800;
    baseMax += 1500;
  }

  // Mounting type adjustments
  if (formData.mountingType?.includes('trenching')) {
    baseMin += 600;
    baseMax += 1200;
  }

  return {
    min: baseMin,
    max: baseMax,
    disclaimer: "Estimate based on typical installations. Final pricing subject to site assessment and permit requirements."
  };
}