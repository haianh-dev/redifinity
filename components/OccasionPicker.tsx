"use client";

type OccasionPickerProps = {
  occasions: string[];
  selected: string;
  onChange: (occasion: string) => void;
  recommendedCostumeIds?: string[];
};

/**
 * OccasionPicker — 7 bối cảnh dạng pill/tag.
 * Active = nền chàm + chữ trắng.
 * Không ALL CAPS. Không rounded-full — dùng border vuông gợi kiến trúc truyền thống.
 */
export function OccasionPicker({ occasions, selected, onChange }: OccasionPickerProps) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Chọn bối cảnh sử dụng">
      {occasions.map((o) => {
        const isActive = o === selected;
        return (
          <button
            key={o}
            onClick={() => onChange(o)}
            aria-pressed={isActive}
            className={[
              "font-body text-sm px-4 py-2 border transition-all duration-150",
              "focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-0",
              isActive
                ? "bg-indigo text-paper border-indigo"
                : "bg-transparent text-ink border-ink/20 hover:border-ink/50 hover:bg-paper-dim",
            ].join(" ")}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}
