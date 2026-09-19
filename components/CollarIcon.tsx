import { ReactElement } from "react";

/**
 * CollarIcon — SVG đặc trưng cổ áo từng loại Việt phục.
 * Mỗi path dựa sát mô tả visualFeatures.collar trong costumes.json.
 * Phong cách: nét bút lông, stroke dày–mỏng tự nhiên, không fill.
 */

type CollarIconProps = {
  costumeId: string;
  /** Kích thước SVG tính theo px — mặc định 80 */
  size?: number;
  className?: string;
};

/**
 * Áo Giao Lĩnh — "Cổ chéo hình chữ V, hai vạt trước giao nhau,
 * vạt trái đè lên vạt phải (tả nhiệm)"
 * → Hình chữ V sâu, hai vạt chéo rõ ràng, nét đè nhau ở điểm giao.
 */
const GiaoLinhPath = () => (
  <g>
    {/* Thân áo gợi ý */}
    <path
      d="M20 6 L20 56 Q20 60 24 60 L76 60 Q80 60 80 56 L80 6"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.25"
    />
    {/* Vạt phải (nền) */}
    <path
      d="M50 12 L18 42"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      opacity="0.55"
    />
    {/* Vạt trái đè lên (nét chính) — tả nhiệm */}
    <path
      d="M50 12 L82 42"
      stroke="currentColor"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
    {/* Điểm giao — chữ V nổi bật */}
    <path
      d="M32 28 L50 12 L68 28"
      stroke="currentColor"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </g>
);

/**
 * Áo Viên Lĩnh — "Cổ tròn khép kín, cài khuy hoặc dải gút lệch về vai phải"
 * → Vòng tròn đầy đặn, khuy nhỏ lệch phải.
 */
const VienLinhPath = () => (
  <g>
    {/* Thân áo */}
    <path
      d="M20 30 L20 56 Q20 60 24 60 L76 60 Q80 60 80 56 L80 30"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      opacity="0.25"
    />
    {/* Cổ tròn khép kín */}
    <circle
      cx="50"
      cy="26"
      r="17"
      stroke="currentColor"
      strokeWidth="3"
      fill="none"
    />
    {/* Dải gút lệch phải */}
    <path
      d="M62 18 L68 14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Khuy nhỏ */}
    <circle cx="65" cy="16" r="2.5" fill="currentColor" opacity="0.7" />
  </g>
);

/**
 * Áo Ngũ Thân — "Cổ đứng (lập lĩnh); cổ áo nam cao và vuông tượng trưng sự chính trực"
 * → Hai đường song song thẳng đứng thành cổ đứng, 5 khuy dọc, đuôi tà cong lên.
 */
const NguThanPath = () => (
  <g>
    {/* Thân áo gợi ý với đuôi tà cong */}
    <path
      d="M20 14 L20 54 Q30 62 50 60 Q70 62 80 54 L80 14"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      opacity="0.25"
    />
    {/* Cổ đứng — hai vách song song */}
    <rect
      x="41"
      y="6"
      width="18"
      height="22"
      rx="1"
      stroke="currentColor"
      strokeWidth="2.5"
      fill="none"
    />
    {/* Vạt áo — đường giữa dọc */}
    <path
      d="M50 28 L50 58"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.5"
    />
    {/* 5 khuy cài */}
    {[33, 39, 45, 51, 57].map((y) => (
      <circle key={y} cx="50" cy={y} r="2" fill="currentColor" opacity="0.65" />
    ))}
  </g>
);

/**
 * Áo Nhật Bình — "Cổ đối khâm, khi buộc dây tạo thành hình chữ nhật to bản trước ngực"
 * → Hình chữ nhật ngang to bản đặc trưng, thêu hoa tiết xung quanh gợi ý.
 */
const NhatBinhPath = () => (
  <g>
    {/* Thân áo rộng */}
    <path
      d="M14 30 L14 58 Q14 62 18 62 L82 62 Q86 62 86 58 L86 30"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      opacity="0.25"
    />
    {/* Hình chữ nhật đặc trưng Nhật Bình */}
    <rect
      x="24"
      y="10"
      width="52"
      height="26"
      stroke="currentColor"
      strokeWidth="3"
      fill="none"
    />
    {/* Dây buộc hai bên — tạo hình chữ nhật */}
    <path
      d="M24 10 L14 4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.6"
    />
    <path
      d="M76 10 L86 4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.6"
    />
    {/* Họa tiết tròn khép kín gợi ý (phượng ổ) */}
    <circle cx="50" cy="23" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
    <path d="M46 23 Q50 18 54 23 Q50 28 46 23" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
  </g>
);

/**
 * Áo Dài — "Cổ đứng truyền thống kế thừa từ ngũ thân; hai tà xẻ dài từ eo"
 * → Cổ đứng thanh mảnh, thân ôm, hai tà xẻ dài thướt tha.
 */
const AoDaiPath = () => (
  <g>
    {/* Tà phải */}
    <path
      d="M50 32 Q64 40 66 62"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      opacity="0.6"
    />
    {/* Tà trái */}
    <path
      d="M50 32 Q36 40 34 62"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      opacity="0.6"
    />
    {/* Thân áo */}
    <path
      d="M34 14 Q28 20 34 62"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      opacity="0.3"
    />
    <path
      d="M66 14 Q72 20 66 62"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      opacity="0.3"
    />
    {/* Cổ đứng thanh — đặc trưng Áo Dài */}
    <path
      d="M43 6 L43 26 Q43 30 50 30 Q57 30 57 26 L57 6"
      stroke="currentColor"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Đỉnh cổ cong nhẹ */}
    <path
      d="M43 6 Q50 2 57 6"
      stroke="currentColor"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
  </g>
);

const ICON_MAP: Record<string, ReactElement> = {
  "ao-giao-linh": <GiaoLinhPath />,
  "ao-vien-linh": <VienLinhPath />,
  "ao-ngu-than": <NguThanPath />,
  "ao-nhat-binh": <NhatBinhPath />,
  "ao-dai": <AoDaiPath />,
};

export function CollarIcon({ costumeId, size = 80, className = "" }: CollarIconProps) {
  return (
    <svg
      viewBox="0 0 100 66"
      width={size}
      height={size * (66 / 100)}
      className={`text-ink/80 ${className}`}
      aria-hidden="true"
    >
      {ICON_MAP[costumeId] ?? (
        <circle cx="50" cy="33" r="20" stroke="currentColor" strokeWidth="2" fill="none" />
      )}
    </svg>
  );
}