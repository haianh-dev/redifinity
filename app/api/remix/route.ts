import { NextRequest, NextResponse } from "next/server";
import { RemixInputSchema, RemixOutputSchema } from "@/lib/ai/schemas";
import { validateCombination } from "@/lib/cultural/validate";
import { getCostumeById } from "@/lib/cultural/get-costumes";
import { generateRemix } from "@/lib/ai/gemini-client";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const parsedInput = RemixInputSchema.safeParse(body);
  if (!parsedInput.success) {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_INPUT", message: "Dữ liệu đầu vào không hợp lệ" } },
      { status: 400 }
    );
  }

  const costume = getCostumeById(parsedInput.data.costumeId);
  if (!costume) {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_INPUT", message: "Không tìm thấy trang phục" } },
      { status: 400 }
    );
  }

  const validation = validateCombination(parsedInput.data.costumeId, parsedInput.data.occasion);

  let rawOutput;
  try {
    rawOutput = await generateRemix(parsedInput.data, costume);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { success: false, error: { code: "GEMINI_FAILURE", message: "Không gọi được Gemini API" } },
      { status: 502 }
    );
  }

  const parsedOutput = RemixOutputSchema.safeParse(rawOutput);
  if (!parsedOutput.success) {
    console.error(parsedOutput.error);
    return NextResponse.json(
      { success: false, error: { code: "INVALID_AI_OUTPUT", message: "AI trả về sai định dạng" } },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true, data: parsedOutput.data, validation });
}