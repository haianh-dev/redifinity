import { NextRequest, NextResponse } from "next/server";
import { RecommendInputSchema, RecommendOutputSchema } from "@/lib/ai/schemas";
import { getSuitableCostumes } from "@/lib/cultural/recommend";
import { generateRecommendationReasons } from "@/lib/ai/recommend-gemini";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const parsedInput = RecommendInputSchema.safeParse(body);
  if (!parsedInput.success) {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_INPUT", message: "Dữ liệu đầu vào không hợp lệ" } },
      { status: 400 }
    );
  }

  const candidates = getSuitableCostumes(parsedInput.data.occasion);

  if (candidates.length === 0) {
    return NextResponse.json({
      success: true,
      data: { recommendations: [] },
      note: "Không có trang phục nào trong dữ liệu phù hợp trực tiếp với bối cảnh này.",
    });
  }

  let rawOutput;
  try {
    rawOutput = await generateRecommendationReasons(parsedInput.data, candidates);
  } catch (e) {
    console.error(e);
    // Gemini lỗi/timeout: vẫn trả kết quả đúng (chọn bằng luật), chỉ thiếu văn phong AI
    rawOutput = {
      recommendations: candidates.map((c) => ({
        costumeId: c.id,
        name: c.name,
        reason: `${c.name} phù hợp với bối cảnh bạn chọn theo dữ liệu văn hóa đã ghi nhận.`,
      })),
    };
  }

  const parsedOutput = RecommendOutputSchema.safeParse(rawOutput);
  if (!parsedOutput.success) {
    console.error(parsedOutput.error);
    return NextResponse.json(
      { success: false, error: { code: "INVALID_AI_OUTPUT", message: "AI trả về sai định dạng" } },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true, data: parsedOutput.data });
}
