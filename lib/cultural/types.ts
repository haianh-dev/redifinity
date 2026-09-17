/**
 * lib/cultural/types.ts
 *
 * Type definitions for the Cultural Knowledge Layer.
 * These types describe the structure of the grounded, human-curated
 * cultural data stored under `data/vietnamese-costumes/`. Gemini is
 * NEVER the source of truth for these facts — this layer is.
 */

/** Region of Vietnam a costume/style is historically associated with. */
export type CostumeRegion =
  | "Bắc Bộ"
  | "Trung Bộ"
  | "Nam Bộ"
  | "Toàn quốc";

/** A recommended context in which a costume is appropriate to wear/style. */
export type UsageContext =
  | "Lễ nghi / Nghi thức trang trọng"
  | "Tết / Lễ hội truyền thống"
  | "Cưới hỏi"
  | "Chụp ảnh / Trình diễn nghệ thuật"
  | "Đi chơi / Dạo phố"
  | "Sự kiện học đường"
  | "Du lịch / Giới thiệu văn hóa quốc tế";

/** Structured visual description of a costume, kept close to source research. */
export interface VisualFeatures {
  collar: string;
  sleeves: string;
  silhouette: string;
  closure?: string;
  colors?: string;
  decoration?: string;
}

/**
 * A single, human-verified cultural costume record.
 * This is the canonical shape of every entry in
 * `data/vietnamese-costumes/costumes.json`.
 */
export interface CulturalCostumeRecord {
  /** Stable slug identifier, e.g. "ao-dai" */
  id: string;
  /** Primary Vietnamese name, e.g. "Áo Dài" */
  name: string;
  /** Alternate historical names, if any */
  otherNames?: string[];
  /** Dynasty / historical period the costume belongs to */
  period: string;
  /** Region(s) or social context the costume is associated with */
  region: string;
  /** Detailed, structured visual description */
  visualFeatures: VisualFeatures;
  /** Contexts in which wearing/remixing this costume is appropriate */
  appropriateContexts: string[];
  /** Standard accompanying accessories */
  accessories: string[];
  /**
   * Important cultural cautions / taboos ("đại kỵ") that any AI-generated
   * remix suggestion MUST respect. This is the primary guardrail data
   * consumed by the cultural validation step before/after calling Gemini.
   */
  culturalCautions: string[];
}

/** In-memory / on-disk shape of the full dataset file. */
export type CulturalCostumeDataset = CulturalCostumeRecord[];

/**
 * Result of running a candidate outfit/remix against the
 * Cultural Knowledge Layer's rule checks, prior to (or after)
 * calling Gemini. Used by lib/cultural validation utilities.
 */
export interface CulturalValidationResult {
  /** Whether the combination passes all hard cultural rules */
  isValid: boolean;
  /** Human-readable cautions relevant to this specific combination */
  triggeredCautions: string[];
  /** Non-blocking suggestions to improve cultural accuracy or respect */
  advisoryNotes: string[];
}
