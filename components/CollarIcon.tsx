import { ReactElement } from "react";
export function CollarIcon({ costumeId }: { costumeId: string }) {
  const paths: Record<string, ReactElement> = {
    "ao-giao-linh": (
      <path
        d="M20 8 L50 45 L80 8"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
    ),
    "ao-vien-linh": (
      <circle cx="50" cy="25" r="18" stroke="currentColor" strokeWidth="2.5" fill="none" />
    ),
    "ao-ngu-than": (
      <path
        d="M40 5 L40 45 M60 5 L60 45"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
    ),
    "ao-nhat-binh": (
      <rect x="25" y="8" width="50" height="30" stroke="currentColor" strokeWidth="2.5" fill="none" />
    ),
    "ao-dai": (
      <path
        d="M30 10 Q50 0 70 10 L60 45 L40 45 Z"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        strokeLinejoin="round"
      />
    ),
  };

  return (
    <svg viewBox="0 0 100 50" className="w-16 h-8 text-ink/70">
      {paths[costumeId] ?? (
        <circle cx="50" cy="25" r="18" stroke="currentColor" strokeWidth="2" fill="none" />
      )}
    </svg>
  );
}