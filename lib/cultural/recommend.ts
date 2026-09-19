import { getAllCostumes } from "./get-costumes";
import { CulturalCostumeRecord } from "./types";

/**
 * Chọn các trang phục phù hợp với bối cảnh sử dụng, dựa hoàn toàn vào
 * `appropriateContexts` đã được con người xác thực trong Cultural Knowledge
 * Layer — không dùng AI để đoán, vì đây là dữ kiện văn hóa cần chắc chắn.
 */
export function getSuitableCostumes(
  occasion: string,
  limit = 3
): CulturalCostumeRecord[] {
  const matches = getAllCostumes().filter((c) =>
    c.appropriateContexts.some((ctx) =>
      ctx.toLowerCase().includes(occasion.toLowerCase())
    )
  );
  return matches.slice(0, limit);
}
