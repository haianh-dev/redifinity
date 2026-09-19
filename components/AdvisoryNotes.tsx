/**
 * AdvisoryNotes — Lưu ý không bắt buộc (advisoryNotes[]) từ Cultural Knowledge Layer.
 * Phân biệt với CulturalCautionBox: đây là gợi ý tốt, không phải đại kỵ.
 * Viền gold, hiển thị nếu có dữ liệu.
 */

type AdvisoryNotesProps = {
  notes: string[];
};

export function AdvisoryNotes({ notes }: AdvisoryNotesProps) {
  if (notes.length === 0) return null;

  return (
    <section aria-label="Lưu ý thêm" className="border-l-2 border-gold pl-5">
      <div className="flex items-center gap-2 mb-3">
        {/* Icon gợi ý — SVG inline */}
        <svg
          viewBox="0 0 24 24"
          width={16}
          height={16}
          className="text-gold flex-shrink-0"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path
            d="M12 16v-4M12 8h.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <h3 className="font-body text-sm font-medium text-gold">Lưu ý thêm</h3>
      </div>

      <ul className="space-y-2">
        {notes.map((note, i) => (
          <li key={i} className="font-body text-sm text-ink/75 leading-relaxed">
            {note}
          </li>
        ))}
      </ul>
    </section>
  );
}
