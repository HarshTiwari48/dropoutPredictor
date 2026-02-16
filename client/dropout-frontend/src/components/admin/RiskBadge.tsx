"use client";

import { RiskLevel } from "@/hooks/useStudents";

interface RiskBadgeProps {
  riskLevel: RiskLevel;
}

const riskStyles = {
  HIGH: {
    label: "Needs Immediate Attention",
    className: "bg-red-500/20 text-red-400",
  },
  MEDIUM: {
    label: "Monitor Closely",
    className: "bg-yellow-500/20 text-yellow-400",
  },
  LOW: {
    label: "Stable",
    className: "bg-green-500/20 text-green-400",
  },
};

export const RiskBadge = ({ riskLevel }: RiskBadgeProps) => {
  const config = riskStyles[riskLevel];

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
};
