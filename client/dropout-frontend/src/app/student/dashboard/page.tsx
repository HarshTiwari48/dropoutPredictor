"use client";

import { StudentRiskOverviewCard } from "@/components/student/StudentRiskOverviewCard";
import { SemesterPerformanceCard } from "@/components/student/SemesterPerformanceCard";
import { StudentActionCard } from "@/components/student/StudentActionCard";
import { AcademicTrendBanner } from "@/components/student/AcademicTrendBanner";
import { useStudentDashboard } from "@/hooks/useStudentDashboard";
import ShimmerBackButton from "@/components/common/ShimmerActionButton";

export default function StudentDataPage() {
  const { student, loading, error } = useStudentDashboard();

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center text-white/60">
        Loading your academic insights…
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center text-red-400">
        Unable to load student data
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-r from-yellow-100 via-lime-100 to-green-100">
      <ShimmerBackButton className=" ml-10" fallbackHref="/student" />
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-6 ">
      <StudentRiskOverviewCard
        name={student.name}
        riskLevel={student.riskLevel}
        dropoutProbability={student.dropoutProbability}
      />

      <SemesterPerformanceCard
         sem1Grade={student.sem1Grade}
         sem2Grade={student.sem2Grade}
         enrolledUnitsSem1={student.enrolledUnitsSem1}
         approvedUnitsSem1={student.approvedUnitsSem1}
         enrolledUnitsSem2={student.enrolledUnitsSem2}
         approvedUnitsSem2={student.approvedUnitsSem2}
/>

      <AcademicTrendBanner
        academicTrend={student.academicTrend}
      />

      <StudentActionCard />
    </div>
  </div>
  );
}
