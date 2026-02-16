"use client";

import {
  IconAlertTriangle,
  IconEye,
  IconCircleCheck,
} from "@tabler/icons-react";

export const RiskLegend = () => {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
      {/* High Risk */}
      <div className="flex items-center gap-2">
        <IconAlertTriangle size={16} className="text-red-400" />
        <span>
          <span className="text-red-400 font-medium">
            Needs Immediate Attention
          </span>{" "}
          (&gt; 60%)
        </span>
      </div>

      {/* Medium Risk */}
      <div className="flex items-center gap-2">
        <IconEye size={16} className="text-yellow-400" />
        <span>
          <span className="text-yellow-400 font-medium">
            Monitor Closely
          </span>{" "}
          (30–60%)
        </span>
      </div>

      {/* Low Risk */}
      <div className="flex items-center gap-2">
        <IconCircleCheck size={16} className="text-green-400" />
        <span>
          <span className="text-green-400 font-medium">
            Stable
          </span>{" "}
          (&lt; 30%)
        </span>
      </div>
    </div>
  );
};
