"use client";

import { IconDatabaseOff } from "@tabler/icons-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState = ({
  title = "No student data found",
  description = "Upload a CSV file to see student predictions here.",
  actionLabel,
  onAction,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-[#0B1220] p-10 text-center">
      <div className="mb-4 rounded-full bg-white/5 p-4">
        <IconDatabaseOff size={32} className="text-white/60" />
      </div>

      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-white/60">
        {description}
      </p>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-6 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

