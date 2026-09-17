import { getAllCostumes } from "@/lib/cultural/get-costumes";
import { validateCombination } from "@/lib/cultural/validate";

export default function Home() {
  const costumes = getAllCostumes();
  const test = validateCombination("ao-nhat-binh", "Đi chơi / Dạo phố");

  return (
    <div style={{ padding: 40 }}>
      <h1>Kiểm tra dữ liệu</h1>
      <p>Tổng số trang phục: {costumes.length}</p>

      <h2>Test validate: Áo Nhật Bình + "Đi chơi"</h2>
      <pre>{JSON.stringify(test, null, 2)}</pre>
    </div>
  );
}