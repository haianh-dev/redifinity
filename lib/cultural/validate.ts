import { CulturalValidationResult } from "./types";
import { getCostumeById } from "./get-costumes";

export function validateCombination(
  costumeId: string,
  occasion: string
): CulturalValidationResult {
  const costume = getCostumeById(costumeId);

  if (!costume) {
    return {
      isValid: false,
      triggeredCautions: ["Không tìm thấy trang phục với id này"],
      advisoryNotes: [],
    };
  }

  const isContextAppropriate = costume.appropriateContexts.some((c) =>
    c.toLowerCase().includes(occasion.toLowerCase())
  );

  return {
    isValid: isContextAppropriate,
    triggeredCautions: costume.culturalCautions,
    advisoryNotes: isContextAppropriate
      ? []
      : [`${costume.name} thường không dùng trong bối cảnh "${occasion}", cân nhắc lại`],
  };
}