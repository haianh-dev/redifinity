import { NextRequest, NextResponse } from "next/server";
import { CulturalCheckInputSchema, CulturalCheckOutputSchema } from "@/lib/ai/schemas";
import { runCulturalCheck } from "@/lib/cultural/cultural-check";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const parsedInput = CulturalCheckInputSchema.safeParse(body);
  if (!parsedInput.success) {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_INPUT", message: "Dữ liệu đầu vào không hợp lệ" } },
      { status: 400 }
    );
  }

  const result = runCulturalCheck(parsedInput.data);

  const parsedOutput = CulturalCheckOutputSchema.safeParse(result);
  if (!parsedOutput.success) {
    console.error(parsedOutput.error);
    return NextResponse.json(
      { success: false, error: { code: "INVALID_AI_OUTPUT", message: "Kết quả kiểm tra sai định dạng" } },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, data: parsedOutput.data });
}
