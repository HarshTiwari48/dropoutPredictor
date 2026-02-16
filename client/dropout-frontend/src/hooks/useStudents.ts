"use client";

import { useEffect, useMemo, useState } from "react";
import { getAllStudents } from "@/lib/api/admin.api";

export type RiskLevel = "HIGH" | "MEDIUM" | "LOW";
export type AcademicTrend = "IMPROVING" | "DECLINING" | "STABLE";

export interface StudentData {
  _id: string;

  name: string;
  email: string;

  age?: number | null;
  gender?: "Male" | "Female" | "Other";

  dropoutProbability: number;
  riskLevel: RiskLevel;
  academicTrend: AcademicTrend;

  sem1Grade?: number | null;
  sem2Grade?: number | null;

  enrolledUnits1?: number;
  approvedUnits1?: number;

  enrolledUnits2?: number;
  approvedUnits2?: number;
}

type SortMode = "HIGH_FIRST" | "LOW_FIRST";

export const useStudents = () => {
  const [students, setStudents] = useState<StudentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedStudent, setSelectedStudent] =
    useState<StudentData | null>(null);

  const [sortMode, setSortMode] = useState<SortMode>("HIGH_FIRST");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);

        const data = await getAllStudents();

        // 🔹 NORMALIZATION LAYER (IMPORTANT) because cannot use direct ml names they are just for training and not perfect
        const normalized: StudentData[] = (data.data || []).map(
          (s: any) => ({
            _id: s._id,
            name: s.name,
            email: s.email,

            age: s.age ?? null,
            gender: s.gender,

            dropoutProbability: s.dropoutProbability,
            riskLevel: s.riskLevel,
            academicTrend: s.academicTrend,

            sem1Grade: s.sem1Grade ?? null,
            sem2Grade: s.sem2Grade ?? null,

            enrolledUnits1: s.enrolledUnitsSem1,
            approvedUnits1: s.approvedUnitsSem1,

            enrolledUnits2: s.enrolledUnitsSem2,
            approvedUnits2: s.approvedUnitsSem2,
          })
        );

        setStudents(normalized);
      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
            "Failed to fetch student data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const sortedStudents = useMemo(() => {
    const sorted = [...students];

    sorted.sort((a, b) => {
      if (sortMode === "HIGH_FIRST") {
        return b.dropoutProbability - a.dropoutProbability;
      }
      return a.dropoutProbability - b.dropoutProbability;
    });

    return sorted;
  }, [students, sortMode]);

  return {
    students: sortedStudents,
    loading,
    error,

    selectedStudent,
    setSelectedStudent,

    sortMode,
    setSortMode,
  };
};
