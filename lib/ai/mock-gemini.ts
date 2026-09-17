import { RemixInput, RemixOutput } from "./schemas";

export async function mockGenerateRemix(input: RemixInput): Promise<RemixOutput> {
  return {
    outfit: {
      base: input.costumeId,
      accessories: input.desiredAccessories ?? [],
      colorPalette: input.preferredColors ?? [],
    },
    occasion: input.occasion,
    explanation: "Đây là gợi ý giả lập (mock) dùng để test luồng, chưa phải Gemini thật.",
    culturalAssessment: {
      appropriatenessScore: "phù_hợp",
      relevantCautions: [],
      note: "Đây là note giả lập.",
    },
    confidence: "cao",
  };
}