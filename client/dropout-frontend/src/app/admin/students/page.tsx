"use client";

import { useStudents } from "@/hooks/useStudents";
import { StudentRiskCard } from "@/components/admin/StudentRiskCard";
import { StudentDetailsOverlay } from "@/components/admin/StudentDetailsOverlay";
import { RiskLegend } from "@/components/admin/RiskLegend";
import { SortToggle } from "@/components/admin/SortToggle";
import { EmptyState } from "@/components/admin/EmptyState";

export default function AdminStudentsPage() {
  const {
    students,
    loading,
    error,

    selectedStudent,
    setSelectedStudent,

    sortMode,
    setSortMode,
  } = useStudents();

  // Loading optimise if possible
  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-white/60">
        Loading student data…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-red-400">
        {error}
      </div>
    );
  }

  // Empty
  if (students.length === 0) {
    return (
      <EmptyState
        title="No student data available"
        description="Upload a CSV file to generate dropout predictions."
      />
    );
  }

  return (
    <>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">
          Student Risk Overview
        </h1>

        <div className="flex items-center gap-3">
          <SortToggle value={sortMode} onChange={setSortMode} />
          <RiskLegend />
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {students.map((student) => (
          <StudentRiskCard
            key={student._id}
            name={student.name}
            dropoutProbability={student.dropoutProbability}
            riskLevel={student.riskLevel}
            onClick={() => setSelectedStudent(student)}
          />
        ))}
      </div>

      {/* Overlay this aint a new page  */}
      {selectedStudent && (
        <StudentDetailsOverlay
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </>
  );
}
