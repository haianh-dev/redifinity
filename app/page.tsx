import Link from "next/link";
import { CollarIcon } from "@/components/CollarIcon";
import { getAllCostumes } from "@/lib/cultural/get-costumes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Redifinity — Việt Phục Remix",
  description:
    "Khám phá và phối Việt phục theo phong cách của bạn — đúng gốc gác, đúng bối cảnh, đúng thế hệ.",
};

/** Vì sao section — 3 cột, icon SVG tùy chỉnh */
const WHY_ITEMS = [
  {
    id: "history",
    title: "Đúng lịch sử",
    desc: "Dữ liệu từ nguồn nghiên cứu cổ phục Việt Nam — không suy diễn tự do.",
    icon: (
      <svg viewBox="0 0 40 40" width={36} height={36} fill="none" aria-hidden="true">
        {/* Cuộn giấy */}
        <rect x="8" y="10" width="24" height="22" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 14 Q4 14 4 18 Q4 22 8 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M13 17 L27 17M13 21 L24 21M13 25 L20 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "context",
    title: "Phù hợp bối cảnh",
    desc: "Gợi ý phối đồ dựa trên 7 bối cảnh thực tế — từ Tết đến đi chơi phố.",
    icon: (
      <svg viewBox="0 0 40 40" width={36} height={36} fill="none" aria-hidden="true">
        {/* Bản đồ / địa điểm */}
        <path d="M20 6 C13 6 8 11 8 18 C8 26 20 36 20 36 C20 36 32 26 32 18 C32 11 27 6 20 6Z" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="20" cy="18" r="4" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    id: "respect",
    title: "Tôn trọng văn hóa",
    desc: "Mỗi gợi ý đều qua lớp kiểm tra đại kỵ — bảo vệ ý nghĩa gốc của từng loại áo.",
    icon: (
      <svg viewBox="0 0 40 40" width={36} height={36} fill="none" aria-hidden="true">
        {/* Hình khiên bảo vệ */}
        <path
          d="M20 4 L32 9 L32 20 C32 28 26 34 20 37 C14 34 8 28 8 20 L8 9 Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M15 20 L19 24 L25 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function HomePage() {
  const costumes = getAllCostumes();

  return (
    <div className="min-h-screen flex flex-col">
      {/* ─── Hero ──────────────────────────────────────────── */}
      <main className="flex-1">
        <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 sm:pt-28 sm:pb-20">
          {/* Eyebrow */}
          <p className="font-body text-xs tracking-[0.18em] text-gold mb-6">
            Redifinity &nbsp;·&nbsp; Việt Phục Remix
          </p>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.12] text-ink max-w-2xl">
            Việt phục,{" "}
            <em className="not-italic text-indigo">phối theo cách của bạn.</em>
          </h1>

          {/* Đường kẻ vàng nhũ */}
          <div className="w-16 h-px bg-gold mt-8 mb-8" />

          {/* Sub */}
          <p className="font-body text-base sm:text-lg text-ink/65 max-w-md leading-relaxed">
            Chọn một dáng áo truyền thống, chọn bối cảnh — nhận gợi ý phối đồ
            vừa hợp gu cá nhân, vừa tôn trọng đúng gốc gác văn hóa Việt.
          </p>

          {/* CTA */}
          <Link
            href="/remix"
            id="cta-start-remix"
            className="inline-flex items-center gap-3 mt-10 font-body font-medium text-paper bg-indigo px-7 py-3.5 transition-colors duration-200 hover:bg-ink focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
          >
            Bắt đầu Remix
            <svg viewBox="0 0 20 20" width={18} height={18} fill="none" aria-hidden="true">
              <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </section>

        {/* ─── Dải 5 trang phục ───────────────────────────── */}
        <section className="bg-paper-dim border-y border-ink/10 py-12" aria-label="5 loại Việt phục">
          <div className="max-w-5xl mx-auto px-6">
            <p className="font-body text-xs text-ink/40 tracking-widest mb-8">
              5 loại Việt phục
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-ink/10">
              {costumes.map((c) => (
                <Link
                  key={c.id}
                  href="/remix"
                  className="group bg-paper-dim p-6 flex flex-col items-start gap-3 hover:bg-paper transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-0"
                  aria-label={`Khám phá ${c.name}`}
                >
                  <div className="text-ink/60 group-hover:text-indigo transition-colors duration-200">
                    <CollarIcon costumeId={c.id} size={64} />
                  </div>
                  <div>
                    <p className="font-display text-base text-ink leading-snug">
                      {c.name}
                    </p>
                    <p className="font-body text-xs text-ink/40 mt-0.5">
                      {c.region.split("—")[0].trim()}
                    </p>
                  </div>
                  {/* Hover accent */}
                  <span className="block w-6 h-px bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Vì sao Redifinity ──────────────────────────── */}
        <section className="max-w-5xl mx-auto px-6 py-16 sm:py-20" aria-label="Tại sao chọn Redifinity">
          <h2 className="font-display text-2xl sm:text-3xl text-ink mb-12">
            Tại sao Redifinity?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
            {WHY_ITEMS.map((item) => (
              <div key={item.id} className="flex flex-col gap-4">
                <div className="text-indigo">{item.icon}</div>
                <div>
                  <p className="font-display text-lg text-ink mb-2">{item.title}</p>
                  <p className="font-body text-sm text-ink/60 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA phụ */}
          <div className="mt-16 pt-12 border-t border-ink/10 flex flex-col sm:flex-row sm:items-center gap-6">
            <p className="font-display text-xl text-ink max-w-sm">
              Sẵn sàng khám phá Việt phục của bạn?
            </p>
            <Link
              href="/remix"
              id="cta-start-remix-2"
              className="inline-flex items-center gap-2 font-body text-sm font-medium text-indigo border border-indigo px-5 py-2.5 hover:bg-indigo hover:text-paper transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-0"
            >
              Thử ngay
              <svg viewBox="0 0 16 16" width={14} height={14} fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      {/* ─── Footer ─────────────────────────────────────── */}
      <footer className="bg-indigo text-paper/70 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="font-display text-base text-paper">Redifinity</p>
          <p className="font-body text-xs">
            Dữ liệu Việt phục từ nguồn nghiên cứu cổ phục &mdash; chỉ phục vụ mục đích văn hóa, giáo dục.
          </p>
        </div>
      </footer>
    </div>
  );
}