import { describe, it, expect } from 'vitest';
import { LeadSchema, PresignSchema } from '@/lib/validation';

describe('validation schemas', () => {
  it('validates lead payload', () => {
    const v = LeadSchema.safeParse({
      address: '123 Main St',
      runLengthMeters: 10,
      firstName: 'A',
      lastName: 'B',
      email: 'a@b.com',
      phone: '+14165551234',
      caslConsent: true,
    });
    expect(v.success).toBe(true);
  });

  it('rejects bad presign type', () => {
    const v = PresignSchema.safeParse({ contentType: 'text/plain' as any });
    expect(v.success).toBe(false);
  });
});

