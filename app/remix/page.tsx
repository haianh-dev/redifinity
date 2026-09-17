"use client";

import { useState } from "react";
import costumes from "@/data/vietnamese-costumes/costumes.json";
import { CollarIcon } from "@/components/CollarIcon";

const OCCASIONS = [
  "Lễ nghi / Nghi thức trang trọng",
  "Tết / Lễ hội truyền thống",
  "Cưới hỏi",
  "Chụp ảnh / Trình diễn nghệ thuật",
  "Đi chơi / Dạo phố",
  "Sự kiện học đường",
  "Du lịch / Giới thiệu văn hóa quốc tế",
];

export default function RemixPage() {
  const [costumeId, setCostumeId] = useState(costumes[0].id);
  const [occasion, setOccasion] = useState(OCCASIONS[0]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

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
      if (!json.success) setError(json.error?.message ?? "Có lỗi xảy ra");
      else setResult(json);
    } catch {
      setError("Không kết nối được tới server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Hero */}
      <header className="max-w-3xl mx-auto px-6 pt-16 pb-10">
        <p className="font-body text-xs tracking-widest text-gold uppercase mb-3">
          Redifinity
        </p>
        <h1 className="font-display text-4xl sm:text-5xl leading-tight mb-4">
          Việt phục, phối theo cách của bạn.
        </h1>
        <p className="font-body text-ink/70 max-w-md leading-relaxed">
          Chọn một dáng áo, chọn một bối cảnh — nhận gợi ý phối đồ vừa hợp
          gu cá nhân, vừa tôn trọng đúng gốc gác văn hóa.
        </p>
      </header>

      <main className="max-w-3xl mx-auto px-6 pb-24">
        {/* Costume gallery */}
        <section>
          <h2 className="font-body text-sm font-medium text-ink/60 mb-4">
            1. Chọn trang phục nền
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {costumes.map((c) => {
              const active = c.id === costumeId;
              return (
                <button
                  key={c.id}
                  onClick={() => setCostumeId(c.id)}
                  className={`text-left p-4 border transition-colors ${
                    active
                      ? "border-lacquer bg-lacquer/5"
                      : "border-ink/15 hover:border-ink/40"
                  }`}
                >
                  <CollarIcon costumeId={c.id} />
                  <p className="font-display text-lg mt-2 leading-snug">
                    {c.name}
                  </p>
                  <p className="font-body text-xs text-ink/50 mt-1">
                    {c.region}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Occasion pills */}
        <section className="mt-10">
          <h2 className="font-body text-sm font-medium text-ink/60 mb-4">
            2. Chọn bối cảnh sử dụng
          </h2>
          <div className="flex flex-wrap gap-2">
            {OCCASIONS.map((o) => {
              const active = o === occasion;
              return (
                <button
                  key={o}
                  onClick={() => setOccasion(o)}
                  className={`font-body text-sm px-4 py-2 rounded-full border transition-colors ${
                    active
                      ? "bg-indigo text-paper border-indigo"
                      : "border-ink/20 hover:border-ink/50"
                  }`}
                >
                  {o}
                </button>
              );
            })}
          </div>
        </section>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-10 font-body font-medium bg-ink text-paper px-6 py-3 hover:bg-indigo transition-colors disabled:opacity-50"
        >
          {loading ? "Đang phối đồ..." : "Remix ngay"}
        </button>

        {error && (
          <p className="mt-6 font-body text-sm text-lacquer">{error}</p>
        )}

        {/* Result card */}
        {result && (
          <section className="mt-12 border border-ink/15">
            <div className="h-1 bg-gradient-to-r from-lacquer via-gold to-indigo" />
            <div className="p-6 sm:p-8">
              <p className="font-body text-xs tracking-widest text-gold uppercase mb-3">
                Gợi ý phối đồ
              </p>
              <p className="font-display text-xl leading-relaxed mb-6">
                {result.data.explanation}
              </p>

              <div className="flex items-center gap-3 font-body text-sm mb-6">
                <span className="px-3 py-1 border border-ink/20 rounded-full">
                  {result.data.culturalAssessment.appropriatenessScore}
                </span>
                <span className="text-ink/50">
                  Độ tin cậy: {result.data.confidence}
                </span>
              </div>

              <p className="font-body text-sm text-ink/70 leading-relaxed">
                {result.data.culturalAssessment.note}
              </p>

              {result.validation.advisoryNotes.length > 0 && (
                <div className="mt-6 border-l-2 border-gold pl-4">
                  <p className="font-body text-xs uppercase tracking-wide text-gold mb-2">
                    Lưu ý
                  </p>
                  <ul className="font-body text-sm space-y-1 text-ink/80">
                    {result.validation.advisoryNotes.map((n: string, i: number) => (
                      <li key={i}>{n}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result.validation.triggeredCautions.length > 0 && (
                <div className="mt-6 border-l-2 border-lacquer pl-4">
                  <p className="font-body text-xs uppercase tracking-wide text-lacquer mb-2">
                    Đại kỵ văn hóa cần biết
                  </p>
                  <ul className="font-body text-sm space-y-1 text-ink/80">
                    {result.validation.triggeredCautions.map((c: string, i: number) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}