"use client";

import { IconArrowDown, IconArrowUp } from "@tabler/icons-react";

type SortMode = "HIGH_FIRST" | "LOW_FIRST";

interface SortToggleProps {
  value: SortMode;
  onChange: (value: SortMode) => void;
}

export const SortToggle = ({ value, onChange }: SortToggleProps) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange("HIGH_FIRST")}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm transition
          ${
            value === "HIGH_FIRST"
              ? "bg-white/10 text-white"
              : "text-white/60 hover:text-white"
          }`}
      >
        <IconArrowDown size={16} />
        High Risk First
      </button>

      <button
        onClick={() => onChange("LOW_FIRST")}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm transition
          ${
            value === "LOW_FIRST"
              ? "bg-white/10 text-white"
              : "text-white/60 hover:text-white"
          }`}
      >
        <IconArrowUp size={16} />
        Low Risk First
      </button>
    </div>
  );
};
