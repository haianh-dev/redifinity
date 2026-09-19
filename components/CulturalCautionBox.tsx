/**
 * CulturalCautionBox — Hiển thị "Đại kỵ văn hóa cần biết".
 *
 * ⚠ YÊU CẦU ĐẠO ĐỨC: Component này KHÔNG ĐƯỢC ẩn, thu gọn, hay làm
 * nhạt đi khi có triggeredCautions. Đây là nội dung quan trọng nhất
 * trong sản phẩm — người dùng phải đọc được ngay lập tức.
 *
 * Hiển thị với viền lacquer (đỏ son), nền lacquer nhạt, icon cảnh báo rõ.
 */

type CulturalCautionBoxProps = {
  cautions: string[];
};

export function CulturalCautionBox({ cautions }: CulturalCautionBoxProps) {
  if (cautions.length === 0) return null;

  return (
    <section
      aria-label="Đại kỵ văn hóa cần biết"
      className="border-2 border-lacquer bg-lacquer/5 p-5"
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        {/* Icon cảnh báo — SVG inline, không dùng icon lib */}
        <svg
          viewBox="0 0 24 24"
          width={22}
          height={22}
          className="text-lacquer flex-shrink-0 mt-0.5"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 9v4M12 17h.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div>
          <h3 className="font-display text-base text-lacquer leading-snug">
            Đại kỵ văn hóa cần biết
          </h3>
          <p className="font-body text-xs text-lacquer/70 mt-0.5">
            Những điều này cần được tôn trọng nghiêm túc khi phối đồ.
          </p>
        </div>
      </div>

      {/* Danh sách đại kỵ */}
      <ul className="space-y-3">
        {cautions.map((caution, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-5 h-5 border border-lacquer/40 text-lacquer font-body text-xs flex items-center justify-center mt-0.5">
              {i + 1}
            </span>
            <p className="font-body text-sm text-ink/85 leading-relaxed">{caution}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
