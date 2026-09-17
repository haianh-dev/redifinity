/**
 * lib/ai/schemas.ts
 *
 * Zod schemas + TypeScript types describing the contract between the
 * Next.js API route (/api/remix), the Cultural Knowledge Layer, and
 * the Gemini API. RemixOutput is what Gemini's structured response
 * must conform to; it is validated with `RemixOutputSchema` before
 * ever reaching the client.
 */

import { z } from "zod";

/* -------------------------------------------------------------------- */
/*  Input: what the user submits on the /remix page                     */
/* -------------------------------------------------------------------- */

export const RemixInputSchema = z.object({
  /** id of the base costume the user selected, matches CulturalCostumeRecord.id */
  costumeId: z.string().min(1),
  /** Occasion / context the user wants to dress for */
  occasion: z.enum([
    "Lễ nghi / Nghi thức trang trọng",
    "Tết / Lễ hội truyền thống",
    "Cưới hỏi",
    "Chụp ảnh / Trình diễn nghệ thuật",
    "Đi chơi / Dạo phố",
    "Sự kiện học đường",
    "Du lịch / Giới thiệu văn hóa quốc tế",
  ]),
  /** Free-text style preferences from the user, e.g. "tối giản, tông pastel" */
  stylePreferences: z.string().max(300).optional(),
  /** Preferred color(s), free text or hex-ish description */
  preferredColors: z.array(z.string()).max(5).optional(),
  /** Accessories the user already owns or wants included */
  desiredAccessories: z.array(z.string()).max(10).optional(),
  /** Optional target age range / audience, used to keep tone youth-appropriate */
  audience: z.enum(["teen", "young-adult", "general"]).default("general"),
});

export type RemixInput = z.infer<typeof RemixInputSchema>;

/* -------------------------------------------------------------------- */
/*  Output: the structured object Gemini must return                    */
/* -------------------------------------------------------------------- */

export const SuggestedOutfitSchema = z.object({
  base: z.string().describe("Trang phục nền được chọn/đề xuất, vd 'Áo Dài'"),
  top: z.string().optional(),
  bottom: z.string().optional(),
  accessories: z.array(z.string()).default([]),
  colorPalette: z.array(z.string()).default([]),
});

export const CulturalAssessmentSchema = z.object({
  /** Overall fit score against the Cultural Knowledge Layer's rules */
  appropriatenessScore: z.enum(["phù_hợp", "cần_lưu_ý", "không_phù_hợp"]),
  /** Which cultural cautions (from the KB) are relevant to this remix */
  relevantCautions: z.array(z.string()).default([]),
  /** Plain-language note explaining the assessment to the user */
  note: z.string(),
});

export const RemixOutputSchema = z.object({
  outfit: SuggestedOutfitSchema,
  occasion: z.string(),
  /** Why this combination was suggested (styling rationale) */
  explanation: z.string(),
  culturalAssessment: CulturalAssessmentSchema,
  /** Model's own confidence in the historical/cultural accuracy of claims made */
  confidence: z.enum(["cao", "trung_bình", "thấp"]),
});

export type SuggestedOutfit = z.infer<typeof SuggestedOutfitSchema>;
export type CulturalAssessment = z.infer<typeof CulturalAssessmentSchema>;
export type RemixOutput = z.infer<typeof RemixOutputSchema>;

/* -------------------------------------------------------------------- */
/*  API envelope types (route.ts response shape)                        */
/* -------------------------------------------------------------------- */

export const RemixApiResponseSchema = z.object({
  success: z.boolean(),
  data: RemixOutputSchema.optional(),
  error: z
    .object({
      code: z.enum([
        "INVALID_INPUT",
        "GEMINI_FAILURE",
        "TIMEOUT",
        "INVALID_AI_OUTPUT",
        "CULTURAL_VALIDATION_FAILED",
      ]),
      message: z.string(),
    })
    .optional(),
});

export type RemixApiResponse = z.infer<typeof RemixApiResponseSchema>;
