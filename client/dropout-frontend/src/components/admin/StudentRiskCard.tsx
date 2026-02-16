"use client";

import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { RiskLevel } from "@/hooks/useStudents";

interface StudentRiskCardProps {
  name: string;
  dropoutProbability: number;
  riskLevel: RiskLevel;
  onClick: () => void;
}

const riskConfig = {
  HIGH: {
    label: "Needs Immediate Attention",
    neonColors: {
        firstColor: "#ff4d4d",
        secondColor: "#ff0080",
}

  },
  MEDIUM: {
    label: "Monitor Closely",
    neonColors: {
        firstColor: "#facc15", 
        secondColor: "#ff0080"
    },
  },
  LOW: {
    label: "Stable",
    neonColors: {
        firstColor: "#FFFFFF", 
        secondColor: "#32CD32"
    },
  },
};

export const StudentRiskCard = ({
  name,
  dropoutProbability,
  riskLevel,
  onClick,
}: StudentRiskCardProps) => {
  const config = riskConfig[riskLevel];

  return (
    <NeonGradientCard
      className="cursor-pointer transition-transform hover:scale-[1.02]"
      neonColors={config.neonColors}
      onClick={onClick}
    >
      <div className="flex flex-col gap-2">
        {/* Name */}
        <h3 className="text-lg font-semibold text-blue-700">
          {name}
        </h3>

        {/* Dropout % */}
        <p className="text-3xl font-bold text-red-500">
          {dropoutProbability}%
        </p>

        {/* Risk label */}
        <span className="text-sm font-medium text-black">
          {config.label}
        </span>
      </div>
    </NeonGradientCard>
  );
};
