import costumes from "@/data/vietnamese-costumes/costumes.json";
import { CulturalCostumeRecord } from "./types";

export function getAllCostumes(): CulturalCostumeRecord[] {
  return costumes as CulturalCostumeRecord[];
}

export function getCostumeById(id: string): CulturalCostumeRecord | undefined {
  return getAllCostumes().find((c) => c.id === id);
}