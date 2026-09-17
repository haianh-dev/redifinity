import { RemixInput } from "./schemas";
import { CulturalCostumeRecord } from "@/lib/cultural/types";

export async function generateRemix(input: RemixInput, costume: CulturalCostumeRecord) {
  const systemInstruction = `Bạn là stylist AI chuyên về Việt phục (trang phục truyền thống Việt Nam).
QUY TẮC BẮT BUỘC:
- Chỉ được dùng dữ kiện văn hóa trong phần "Dữ liệu văn hóa" được cung cấp, KHÔNG được tự bịa thêm chi tiết lịch sử không có trong đó.
- Nếu không chắc chắn về tính chính xác, hãy đặt "confidence" là "thấp" thay vì khẳng định chắc chắn.
- Luôn tôn trọng các "culturalCautions" (đại kỵ văn hóa) đã cho, phản ánh chúng vào "relevantCautions" nếu liên quan đến gợi ý.
- CHỈ trả lời bằng một object JSON DUY NHẤT đúng theo cấu trúc yêu cầu, không thêm text giải thích nào khác, không thêm markdown code fence.`;

  const prompt = `
Dữ liệu văn hóa của trang phục được chọn:
${JSON.stringify(costume, null, 2)}

Yêu cầu remix của người dùng:
${JSON.stringify(input, null, 2)}

Hãy trả về JSON đúng theo cấu trúc sau (không thêm trường nào khác):
{
  "outfit": { "base": string, "top"?: string, "bottom"?: string, "accessories": string[], "colorPalette": string[] },
  "occasion": string,
  "explanation": string,
  "culturalAssessment": {
    "appropriatenessScore": "phù_hợp" | "cần_lưu_ý" | "không_phù_hợp",
    "relevantCautions": string[],
    "note": string
  },
  "confidence": "cao" | "trung_bình" | "thấp"
}
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${process.env.GEMINI_API_KEY}` ,
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

  if (!text) {
    throw new Error("Gemini không trả về nội dung hợp lệ");
  }

  return JSON.parse(text);
}