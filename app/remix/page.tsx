"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import costumesData from "@/data/vietnamese-costumes/costumes.json";
import { CostumeCard } from "@/components/CostumeCard";
import { OccasionPicker } from "@/components/OccasionPicker";
import { ResultPanel } from "@/components/ResultPanel";
import type { RemixOutput } from "@/lib/ai/schemas";
import type { CulturalValidationResult, CulturalCostumeRecord } from "@/lib/cultural/types";

const costumes = costumesData as CulturalCostumeRecord[];

const OCCASIONS = [
  "Lễ nghi / Nghi thức trang trọng",
  "Tết / Lễ hội truyền thống",
  "Cưới hỏi",
  "Chụp ảnh / Trình diễn nghệ thuật",
  "Đi chơi / Dạo phố",
  "Sự kiện học đường",
  "Du lịch / Giới thiệu văn hóa quốc tế",
] as const;

type Occasion = (typeof OCCASIONS)[number];

type RecommendedItem = {
  costumeId: string;
  name: string;
  reason: string;
};

type ApiResult = {
  data: RemixOutput;
  validation: CulturalValidationResult;
};

/** Skeleton loading state cho ResultPanel */
function ResultSkeleton() {
  return (
    <div className="border border-ink/15 animate-pulse">
      <div className="h-1 bg-paper-dim" />
      <div className="p-6 sm:p-8 space-y-5">
        <div className="h-3 bg-ink/10 w-20 rounded" />
        <div className="space-y-2">
          <div className="h-5 bg-ink/10 rounded w-full" />
          <div className="h-5 bg-ink/10 rounded w-4/5" />
          <div className="h-5 bg-ink/10 rounded w-3/5" />
        </div>
        <div className="h-8 bg-ink/8 rounded w-40" />
      </div>
    </div>
  );
}

/** Badge trạng thái recommend — hiện trong step 1 khi có gợi ý */
function RecommendHint({ items }: { items: RecommendedItem[] }) {
  if (items.length === 0) return null;
  return (
    <div className="mt-4 flex items-start gap-2 border border-gold/30 bg-gold/5 px-4 py-3">
      <svg viewBox="0 0 20 20" width={16} height={16} className="text-gold flex-shrink-0 mt-0.5" fill="none" aria-hidden="true">
        <path d="M10 2l2.4 5 5.6.8-4 3.9.9 5.5-4.9-2.6L5 17.2l.9-5.5L2 7.8 7.6 7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
      <p className="font-body text-xs text-ink/60 leading-relaxed">
        Cho bối cảnh đã chọn, AI gợi ý:{" "}
        <span className="text-ink font-medium">
          {items.map((i) => i.name).join(", ")}
        </span>
        . Bạn vẫn có thể chọn trang phục khác.
      </p>
    </div>
  );
}

export default function RemixPage() {
  // ─── State ───────────────────────────────────────────────────
  const [costumeId, setCostumeId] = useState(costumes[0].id);
  const [occasion, setOccasion] = useState<Occasion>(OCCASIONS[0]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Recommend state
  const [recommendations, setRecommendations] = useState<RecommendedItem[]>([]);
  const [recommendLoading, setRecommendLoading] = useState(false);

  // Ref để scroll đến result
  const resultRef = useRef<HTMLDivElement>(null);

  // ─── Gọi /api/recommend khi occasion thay đổi ────────────────
  useEffect(() => {
    let cancelled = false;
    setRecommendLoading(true);
    setRecommendations([]);

    fetch("/api/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ occasion }),
    })
      .then((r) => r.json())
      .then((json) => {
        if (cancelled) return;
        if (json.data?.recommendations) {
          setRecommendations(json.data.recommendations);
          // Nếu trang phục hiện tại không nằm trong gợi ý, gợi ý trang phục đầu tiên
          const firstRec = json.data.recommendations[0];
          if (firstRec && !json.data.recommendations.find((r: RecommendedItem) => r.costumeId === costumeId)) {
            setCostumeId(firstRec.costumeId);
          }
        }
      })
      .catch(() => {
        // Recommend thất bại không làm hỏng UX chính
      })
      .finally(() => {
        if (!cancelled) setRecommendLoading(false);
      });

    return () => {
      cancelled = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [occasion]);

  // ─── Scroll đến kết quả ─────────────────────────────────────
  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  // ─── Submit /api/remix ───────────────────────────────────────
  async function handleSubmit() {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/remix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ costumeId, occasion }),
      });
      const json = await res.json();
      if (!json.success) {
        setError(json.error?.message ?? "Có lỗi xảy ra");
      } else {
        setResult({ data: json.data, validation: json.validation });
      }
    } catch {
      setError("Không kết nối được tới server");
    } finally {
      setLoading(false);
    }
  }

  // ─── Helpers ────────────────────────────────────────────────
  const recommendedIds = new Set(recommendations.map((r) => r.costumeId));
  const getRecommendReason = (id: string) =>
    recommendations.find((r) => r.costumeId === id)?.reason;

  // ─── Render ─────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* ── Page header ── */}
      <header className="border-b border-ink/10 bg-paper">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="font-display text-lg text-ink hover:text-indigo transition-colors focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
          >
            Redifinity
          </Link>
          <span className="font-body text-xs text-ink/35 tracking-wide">Việt Phục Remix</span>
        </div>
      </header>

      {/* ── Page intro ── */}
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-8">
        <p className="font-body text-xs text-gold tracking-[0.16em] mb-4">
          Remix
        </p>
        <h1 className="font-display text-3xl sm:text-4xl text-ink leading-tight">
          Phối Việt phục của bạn
        </h1>
        <div className="w-12 h-px bg-gold mt-5 mb-5" />
        <p className="font-body text-sm text-ink/55 max-w-md leading-relaxed">
          Chọn trang phục và bối cảnh sử dụng — AI sẽ gợi ý phối đồ và kiểm
          tra độ phù hợp văn hóa.
        </p>
      </div>

      <main className="max-w-5xl mx-auto px-6 pb-24 space-y-14">
        {/* ── Bước 2: Chọn bối cảnh (đặt trước để trigger recommend trước) ── */}
        <section>
          <div className="flex items-baseline gap-3 mb-5">
            <span
              className="font-body text-xs text-gold border border-gold/40 w-5 h-5 flex items-center justify-center flex-shrink-0"
              aria-hidden="true"
            >
              1
            </span>
            <h2 className="font-body text-sm font-medium text-ink/55">
              Chọn bối cảnh sử dụng
            </h2>
          </div>
          <OccasionPicker
            occasions={[...OCCASIONS]}
            selected={occasion}
            onChange={(o) => setOccasion(o as Occasion)}
          />
        </section>

        {/* ── Bước 1: Chọn trang phục ── */}
        <section>
          <div className="flex items-baseline gap-3 mb-5">
            <span
              className="font-body text-xs text-gold border border-gold/40 w-5 h-5 flex items-center justify-center flex-shrink-0"
              aria-hidden="true"
            >
              2
            </span>
            <h2 className="font-body text-sm font-medium text-ink/55">
              Chọn trang phục nền
            </h2>
            {recommendLoading && (
              <span className="font-body text-xs text-ink/30 italic">Đang gợi ý…</span>
            )}
          </div>

          {/* Hint gợi ý trang phục */}
          <RecommendHint items={recommendations} />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-4">
            {costumes.map((c) => (
              <CostumeCard
                key={c.id}
                costume={c}
                isActive={c.id === costumeId}
                isRecommended={recommendedIds.has(c.id)}
                recommendReason={getRecommendReason(c.id)}
                onClick={() => setCostumeId(c.id)}
              />
            ))}
          </div>
        </section>

        {/* ── Nút Remix ── */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <button
            id="btn-remix"
            onClick={handleSubmit}
            disabled={loading}
            className="font-body font-medium text-paper bg-indigo px-8 py-3.5 transition-colors duration-200 hover:bg-ink disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2 flex items-center gap-3"
          >
            {loading ? (
              <>
                <svg viewBox="0 0 20 20" width={18} height={18} className="animate-spin text-paper/60" fill="none" aria-hidden="true">
                  <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" strokeDasharray="25 50" />
                </svg>
                Đang phối đồ…
              </>
            ) : (
              <>
                Remix ngay
                <svg viewBox="0 0 20 20" width={18} height={18} fill="none" aria-hidden="true">
                  <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            )}
          </button>

          {error && (
            <p className="font-body text-sm text-lacquer flex items-center gap-2">
              <svg viewBox="0 0 16 16" width={14} height={14} fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.6" />
                <path d="M8 5v4M8 11h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              {error}
            </p>
          )}
        </div>

        {/* ── Loading skeleton ── */}
        {loading && <ResultSkeleton />}

        {/* ── Kết quả ── */}
        {result && !loading && (
          <div ref={resultRef}>
            <ResultPanel data={result.data} validation={result.validation} />
          </div>
        )}
      </main>
    </div>
  );
}