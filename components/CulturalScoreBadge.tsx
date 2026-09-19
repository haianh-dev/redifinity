/**
 * CulturalScoreBadge — hiển thị appropriatenessScore + confidence
 * từ kết quả /api/remix.
 */

type Score = "phù_hợp" | "cần_lưu_ý" | "không_phù_hợp";
type Confidence = "cao" | "trung_bình" | "thấp";

const SCORE_CONFIG: Record<Score, { label: string; colorClass: string; dotClass: string }> = {
  phù_hợp: {
    label: "Phù hợp văn hóa",
    colorClass: "text-ink border-ink/30",
    dotClass: "bg-green-700",
  },
  cần_lưu_ý: {
    label: "Cần lưu ý",
    colorClass: "text-gold border-gold/40",
    dotClass: "bg-gold",
  },
  không_phù_hợp: {
    label: "Không phù hợp",
    colorClass: "text-lacquer border-lacquer/40",
    dotClass: "bg-lacquer",
  },
};

const CONFIDENCE_LABEL: Record<Confidence, string> = {
  cao: "Độ tin cậy: cao",
  trung_bình: "Độ tin cậy: trung bình",
  thấp: "Độ tin cậy: thấp",
};

type CulturalScoreBadgeProps = {
  score: Score;
  confidence: Confidence;
};

export function CulturalScoreBadge({ score, confidence }: CulturalScoreBadgeProps) {
  const config = SCORE_CONFIG[score];
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Score badge */}
      <span
        className={[
          "inline-flex items-center gap-2 font-body text-sm px-3 py-1.5 border",
          config.colorClass,
        ].join(" ")}
      >
        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${config.dotClass}`} />
        {config.label}
      </span>

      {/* Confidence */}
      <span className="font-body text-xs text-ink/45">
        {CONFIDENCE_LABEL[confidence]}
      </span>
    </div>
  );
}
