"use client";


import { RiskBadge } from "@/components/admin/RiskBadge";

interface StudentRiskOverviewCardProps {
  name: string;
  dropoutProbability: number;
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
}

export const StudentRiskOverviewCard = ({
  name,
  dropoutProbability,
  riskLevel,
}: StudentRiskOverviewCardProps) => {
  
  return (
    <div className="rounded-2xl border bg-white/80 backdrop-blur p-6 shadow-sm">
      {/* Header */}
      <div className="mb-4">
        <p className="text-sm text-gray-500">Your Dropout Risk</p>
        <h2 className="text-2xl font-semibold text-gray-900">
          Hi, {name}
        </h2>
      </div>

      {/* Risk % */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-5xl font-bold text-gray-900">
            {dropoutProbability}%
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Based on your academic data
          </p>
        </div>

        <RiskBadge riskLevel={riskLevel} />
      </div>

      {/* Divider */}
      <div className="my-5 h-px bg-gray-200" />

      

      {/* Reassurance */}
      <p className="mt-4 text-sm text-gray-600">
        This score helps us understand how to support you better —
        it’s not a judgment, just guidance 💙
      </p>
    </div>
  );
};
