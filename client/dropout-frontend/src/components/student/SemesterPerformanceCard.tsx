"use client";

import {
  IconBook,
  IconCheck,
  IconChartLine,
} from "@tabler/icons-react";

interface SemesterPerformanceCardProps {
  sem1Grade?: number | null;
  sem2Grade?: number | null;

  enrolledUnitsSem1?: number;
  approvedUnitsSem1?: number;

  enrolledUnitsSem2?: number;
  approvedUnitsSem2?: number;
}

export const SemesterPerformanceCard = ({
  sem1Grade,
  sem2Grade,
  enrolledUnitsSem1,
  approvedUnitsSem1,
  enrolledUnitsSem2,
  approvedUnitsSem2,
}: SemesterPerformanceCardProps) => {
  return (
    <div className="rounded-2xl border bg-white/80 backdrop-blur p-6 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <IconChartLine className="text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">
          Academic Performance
        </h3>
      </div>

      {/* Semesters Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Semester 1 */}
        <div className="rounded-xl border p-4">
          <p className="mb-2 text-sm font-medium text-gray-600">
            Semester 1
          </p>

          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <IconBook size={16} />
              <span>
                Grade:{" "}
                <strong>{sem1Grade ?? "—"}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <IconCheck size={16} />
              <span>
                Approved / Enrolled:{" "}
                <strong>
                  {approvedUnitsSem1 ?? "—"} /{" "}
                  {enrolledUnitsSem1 ?? "—"}
                </strong>
              </span>
            </div>
          </div>
        </div>

        {/* Semester 2 */}
        <div className="rounded-xl border p-4">
          <p className="mb-2 text-sm font-medium text-gray-600">
            Semester 2
          </p>

          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <IconBook size={16} />
              <span>
                Grade:{" "}
                <strong>{sem2Grade ?? "—"}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <IconCheck size={16} />
              <span>
                Approved / Enrolled:{" "}
                <strong>
                  {approvedUnitsSem2 ?? "—"} /{" "}
                  {enrolledUnitsSem2 ?? "—"}
                </strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Supportive note */}
      <p className="mt-4 text-sm text-gray-600">
        Tracking semester-wise progress helps identify strengths and
        areas where extra support can help 📘
      </p>
    </div>
  );
};
