"use client";

import { CollarIcon } from "@/components/CollarIcon";
import type { CulturalCostumeRecord } from "@/lib/cultural/types";

type CostumeCardProps = {
  costume: CulturalCostumeRecord;
  isActive: boolean;
  isRecommended?: boolean;
  recommendReason?: string;
  onClick: () => void;
};

export function CostumeCard({
  costume,
  isActive,
  isRecommended,
  recommendReason,
  onClick,
}: CostumeCardProps) {
  return (
    <button
      onClick={onClick}
      aria-pressed={isActive}
      className={[
        "group relative text-left p-5 border transition-all duration-200",
        "focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-0",
        isActive
          ? "border-indigo bg-indigo text-paper"
          : "border-ink/15 bg-paper hover:border-ink/40 hover:bg-paper-dim",
      ].join(" ")}
    >
      {/* Nhãn gợi ý từ AI */}
      {isRecommended && !isActive && (
        <span className="absolute top-2 right-2 text-[10px] font-body font-medium tracking-wide text-gold border border-gold/50 px-1.5 py-0.5 leading-none">
          Gợi ý
        </span>
      )}

      {/* Icon cổ áo */}
      <div className={isActive ? "text-paper/90" : "text-ink/70"}>
        <CollarIcon costumeId={costume.id} size={72} />
      </div>

      {/* Tên trang phục */}
      <p
        className={[
          "font-display text-lg leading-snug mt-3",
          isActive ? "text-paper" : "text-ink",
        ].join(" ")}
      >
        {costume.name}
      </p>

      {/* Vùng miền */}
      <p
        className={[
          "font-body text-xs mt-1 leading-snug",
          isActive ? "text-paper/65" : "text-ink/45",
        ].join(" ")}
      >
        {costume.period.split(",")[0].trim()}
      </p>

      {/* Lý do gợi ý — hiển thị khi active và có reason */}
      {isRecommended && isActive && recommendReason && (
        <p className="font-body text-xs mt-2 text-paper/70 leading-snug italic">
          {recommendReason}
        </p>
      )}

      {/* Đường viền vàng nhũ bottom khi active */}
      {isActive && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />
      )}
    </button>
  );
}
