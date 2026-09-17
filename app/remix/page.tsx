"use client";

import { useState } from "react";
import costumes from "@/data/vietnamese-costumes/costumes.json";

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

      if (!json.success) {
        setError(json.error?.message ?? "Có lỗi xảy ra");
      } else {
        setResult(json);
      }
    } catch (e) {
      setError("Không kết nối được tới server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 24, fontFamily: "sans-serif" }}>
      <h1>Redifinity — Việt Phục Remix</h1>

      <label style={{ display: "block", marginTop: 20 }}>Chọn trang phục nền:</label>
      <select
        value={costumeId}
        onChange={(e) => setCostumeId(e.target.value)}
        style={{ width: "100%", padding: 8, marginTop: 4 }}
      >
        {costumes.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <label style={{ display: "block", marginTop: 20 }}>Chọn bối cảnh sử dụng:</label>
      <select
        value={occasion}
        onChange={(e) => setOccasion(e.target.value)}
        style={{ width: "100%", padding: 8, marginTop: 4 }}
      >
        {OCCASIONS.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          marginTop: 24,
          padding: "10px 20px",
          background: "black",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        {loading ? "Đang xử lý..." : "Remix ngay"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: 20 }}>{error}</p>
      )}

      {result && (
        <div style={{ marginTop: 24, padding: 16, background: "#f5f5f5", borderRadius: 8 }}>
          <h3>Kết quả gợi ý</h3>
          <p><strong>Giải thích:</strong> {result.data.explanation}</p>
          <p><strong>Đánh giá văn hóa:</strong> {result.data.culturalAssessment.appropriatenessScore}</p>
          <p><strong>Ghi chú:</strong> {result.data.culturalAssessment.note}</p>

          {result.validation.advisoryNotes.length > 0 && (
            <div style={{ marginTop: 12, padding: 12, background: "#fff3cd", borderRadius: 6 }}>
              <strong>Lưu ý:</strong>
              <ul>
                {result.validation.advisoryNotes.map((n: string, i: number) => (
                  <li key={i}>{n}</li>
                ))}
              </ul>
            </div>
          )}

          {result.validation.triggeredCautions.length > 0 && (
            <div style={{ marginTop: 12, padding: 12, background: "#fde2e2", borderRadius: 6 }}>
              <strong>Đại kỵ văn hóa cần biết:</strong>
              <ul>
                {result.validation.triggeredCautions.map((c: string, i: number) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}