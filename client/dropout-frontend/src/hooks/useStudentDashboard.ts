"use client";

import { useEffect, useState } from "react";
import { getMyStudentData } from "@/lib/api/student.api";


export interface StudentDashboardData {
  _id: string;
  name: string;
  email: string;

  dropoutProbability: number;
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  academicTrend: "IMPROVING" | "DECLINING" | "STABLE";

  sem1Grade: number | null;
  sem2Grade: number | null;

  enrolledUnitsSem1: number;
  approvedUnitsSem1: number;

  enrolledUnitsSem2: number;
  approvedUnitsSem2: number;

  age?: number;
  gender?: string;

  lastEvaluatedAt: string;
}

export const useStudentDashboard = () => {
  const [student, setStudent] = useState<StudentDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        const response = await getMyStudentData();

        /**
         * ApiResponse shape:
         * {
         *   statusCode,
         *   data,
         *   message
         * }
         */ //from ml api response [hritviz]
        setStudent(response.data);
      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
            "Failed to load student dashboard data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  return {
    student,
    loading,
    error,
  };
};