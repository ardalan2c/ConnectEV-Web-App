import { z } from "zod";

export const LeadSchema = z.object({
  address: z.string().min(4),
  placeId: z.string().optional().default(""),
  runLengthMeters: z.coerce.number().int().min(0).max(200),
  chargerType: z.string().default("Level-2"),
  extrasJson: z.string().default("{}"),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  caslConsent: z.coerce.boolean(),
});

export const PresignSchema = z.object({
  contentType: z.enum(["image/jpeg", "image/png", "image/heic", "image/heif"]),
  contentLength: z.number().int().positive().max(5 * 1024 * 1024).optional(),
});

