import { CulturalCostumeRecord } from "@/lib/cultural/types";
import { RecommendInput } from "./schemas";

/**
 * Gemini ở đây CHỈ viết lý do bằng lời cho các trang phục đã được chọn sẵn
 * bằng luật (xem lib/cultural/recommend.ts). Gemini không được quyền tự
 * chọn hay loại bỏ trang phục nào — tránh việc AI tự quyết định thứ vốn
 * cần chắc chắn về mặt văn hóa.
 */
export async function generateRecommendationReasons(
  input: RecommendInput,
  candidates: CulturalCostumeRecord[]
) {
  const systemInstruction = `Bạn là stylist AI chuyên Việt phục. Nhiệm vụ DUY NHẤT: với mỗi trang phục trong danh sách ứng viên đã cho, viết 1-2 câu lý do vì sao nó phù hợp với yêu cầu người dùng. CHỈ dùng dữ kiện trong danh sách ứng viên, không bịa thêm chi tiết lịch sử. KHÔNG được thêm, bớt hay đổi thứ tự trang phục trong danh sách. Trả lời DUY NHẤT một object JSON đúng cấu trúc yêu cầu, không thêm text hay markdown nào khác.`;

  const prompt = `
Danh sách trang phục ứng viên (đã được chọn sẵn theo luật, không được thay đổi):
${JSON.stringify(
  candidates.map((c) => ({
    id: c.id,
    name: c.name,
    visualFeatures: c.visualFeatures,
    appropriateContexts: c.appropriateContexts,
  })),
  null,
  2
)}

Yêu cầu người dùng:
${JSON.stringify(input, null, 2)}

Trả về JSON đúng cấu trúc:
{ "recommendations": [ { "costumeId": string, "name": string, "reason": string } ] }
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstruction }] },
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" },
      }),
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API lỗi: ${response.status} - ${errText}`);
  }

  const json = await response.json();
  const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Gemini không trả về nội dung hợp lệ");
  return JSON.parse(text);
}
