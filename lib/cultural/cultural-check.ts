import { getCostumeById } from "./get-costumes";
import { validateCombination } from "./validate";
import { CulturalValidationResult } from "./types";

export interface CulturalCheckInput {
  costumeId: string;
  occasion: string;
  colors?: string[];
  accessories?: string[];
}

/**
 * Kiểm tra văn hóa mở rộng: chạy lại rule cơ bản (trang phục có hợp bối
 * cảnh không), sau đó đối chiếu thêm màu sắc/phụ kiện người dùng chọn với
 * nội dung culturalCautions — nếu trùng từ khóa, cảnh báo người dùng đọc kỹ.
 * Đây là kiểm tra dựa trên luật/từ khóa, KHÔNG dùng AI, để đảm bảo kết quả
 * luôn nhất quán và có thể giải thích được.
 */
export function runCulturalCheck(
  input: CulturalCheckInput
): CulturalValidationResult {
  const base = validateCombination(input.costumeId, input.occasion);
  const costume = getCostumeById(input.costumeId);
  if (!costume) return base;

  const cautionText = costume.culturalCautions.join(" ").toLowerCase();
  const extraFlags: string[] = [];

  input.colors?.forEach((color) => {
    if (cautionText.includes(color.toLowerCase())) {
      extraFlags.push(
        `Màu "${color}" được nhắc tới trong lưu ý văn hóa của ${costume.name} — hãy đọc kỹ phần đại kỵ liên quan.`
      );
    }
  });

  input.accessories?.forEach((acc) => {
    if (cautionText.includes(acc.toLowerCase())) {
      extraFlags.push(
        `Phụ kiện "${acc}" được nhắc tới trong lưu ý văn hóa của ${costume.name} — hãy đọc kỹ phần đại kỵ liên quan.`
      );
    }
  });

  return {
    ...base,
    advisoryNotes: [...base.advisoryNotes, ...extraFlags],
  };
}
