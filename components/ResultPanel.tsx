import type { RemixOutput } from "@/lib/ai/schemas";
import type { CulturalValidationResult } from "@/lib/cultural/types";
import { CulturalScoreBadge } from "@/components/CulturalScoreBadge";
import { CulturalCautionBox } from "@/components/CulturalCautionBox";
import { AdvisoryNotes } from "@/components/AdvisoryNotes";

type ResultPanelProps = {
  data: RemixOutput;
  validation: CulturalValidationResult;
};

/**
 * OutfitDetail — hiển thị các mục trong SuggestedOutfit.
 */
function OutfitDetail({ outfit }: { outfit: RemixOutput["outfit"] }) {
  const items: { label: string; value: string | string[] | undefined }[] = [
    { label: "Trang phục nền", value: outfit.base },
    { label: "Áo trên", value: outfit.top },
    { label: "Trang phục dưới", value: outfit.bottom },
    { label: "Phụ kiện", value: outfit.accessories },
    { label: "Gam màu", value: outfit.colorPalette },
  ].filter((item) => {
    if (!item.value) return false;
    if (Array.isArray(item.value) && item.value.length === 0) return false;
    return true;
  });

  if (items.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
      {items.map(({ label, value }) => (
        <div key={label} className="border-t border-ink/10 pt-3">
          <p className="font-body text-xs text-ink/45 mb-1">{label}</p>
          {Array.isArray(value) ? (
            <ul className="space-y-0.5">
              {value.map((v, i) => (
                <li key={i} className="font-body text-sm text-ink/85 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                  {v}
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-body text-sm text-ink/85">{value}</p>
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * ResultPanel — hiển thị toàn bộ kết quả remix.
 * Thứ tự: explanation → score → outfitDetail → assessmentNote → advisoryNotes → CulturalCautionBox
 */
export function ResultPanel({ data, validation }: ResultPanelProps) {
  return (
    <section
      aria-label="Kết quả gợi ý phối đồ"
      className="border border-ink/15"
    >
      {/* Dải gradient header */}
      <div
        className="h-1"
        style={{
          background: "linear-gradient(to right, var(--color-lacquer), var(--color-gold), var(--color-indigo))",
        }}
      />

      <div className="p-6 sm:p-8 space-y-8">
        {/* Phần 1: Explanation */}
        <div>
          <p className="font-body text-xs text-gold tracking-widest mb-3">
            Gợi ý phối đồ
          </p>
          <p className="font-display text-xl sm:text-2xl leading-relaxed text-ink">
            {data.explanation}
          </p>
        </div>

        {/* Phần 2: Cultural score */}
        <CulturalScoreBadge
          score={data.culturalAssessment.appropriatenessScore}
          confidence={data.confidence}
        />

        {/* Phần 3: Outfit chi tiết */}
        <OutfitDetail outfit={data.outfit} />

        {/* Phần 4: Cultural assessment note */}
        {data.culturalAssessment.note && (
          <div className="border-t border-ink/10 pt-6">
            <p className="font-body text-sm text-ink/70 leading-relaxed">
              {data.culturalAssessment.note}
            </p>
          </div>
        )}

        {/* Phần 5: Advisory notes — gold, không bắt buộc */}
        {validation.advisoryNotes.length > 0 && (
          <AdvisoryNotes notes={validation.advisoryNotes} />
        )}

        {/* Phần 6: Cultural cautions — LUÔN HIỂN THỊ NẾU CÓ, không ẩn */}
        {validation.triggeredCautions.length > 0 && (
          <CulturalCautionBox cautions={validation.triggeredCautions} />
        )}
      </div>
    </section>
  );
}
