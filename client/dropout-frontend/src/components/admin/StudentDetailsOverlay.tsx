"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconX,
  IconMail,
  IconTrendingUp,
  IconTrendingDown,
  IconMinus,
} from "@tabler/icons-react";
import { StudentData } from "@/hooks/useStudents";
import { RiskBadge } from "./RiskBadge";
import ContactStudentDialog from "./ContactStudentDialog";

interface StudentDetailsOverlayProps {
  student: StudentData;
  onClose: () => void;
}

export const StudentDetailsOverlay = ({
  student,
  onClose,
}: StudentDetailsOverlayProps) => {
  // 🔹 ESC key support
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);
  const [openContactDialog, setOpenContactDialog] = useState(false);


  const trendIcon =
    student.academicTrend === "IMPROVING" ? (
      <IconTrendingUp className="text-green-400" />
    ) : student.academicTrend === "DECLINING" ? (
      <IconTrendingDown className="text-red-400" />
    ) : (
      <IconMinus className="text-yellow-400" />
    );

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Modal */}
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-[#0B1220] border border-white/10 p-6"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition"
          >
            <IconX />
          </button>

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white">
              {student.name}
            </h2>
            <p className="text-sm text-white/60">{student.email}</p>

            <div className="mt-3 flex items-center gap-3">
              <RiskBadge riskLevel={student.riskLevel} />
              <span className="text-lg font-bold text-white">
                {student.dropoutProbability}%
              </span>
            </div>
          </div>

          {/* Basic Info */}
          <div className="mb-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-white/50">Age</p>
              <p className="text-white">{student.age ?? "—"}</p>
            </div>

            <div>
              <p className="text-white/50">Gender</p>
              <p className="text-white">{student.gender ?? "—"}</p>
            </div>
          </div>

          {/* Academic Summary */}
          <div className="mb-6">
            <h3 className="mb-3 text-lg font-medium text-white">
              Academic Summary
            </h3>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-white/50">Sem 1 Grade</p>
                <p className="text-white">{student.sem1Grade ?? "—"}</p>
              </div>

              <div>
                <p className="text-white/50">Sem 2 Grade</p>
                <p className="text-white">{student.sem2Grade ?? "—"}</p>
              </div>

              <div>
                <p className="text-white/50">Sem 1 Approved / Enrolled</p>
                <p className="text-white">
                  {student.approvedUnits1}/{student.enrolledUnits1}
                </p>
              </div>

              <div>
                <p className="text-white/50">Sem 2 Approved / Enrolled</p>
                <p className="text-white">
                  {student.approvedUnits2}/{student.enrolledUnits2}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm">
              {trendIcon}
              <span className="text-white">
                Academic Trend: {student.academicTrend}
              </span>
            </div>
          </div>

          {/* Footer */}
               <div className="mt-8 border-t border-white/10 pt-4">
          <button
          onClick={() => setOpenContactDialog(true)}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition"
           >
           <IconMail size={18} />
            Contact Student
         </button>
</div>

        <ContactStudentDialog
  open={openContactDialog}
  onOpenChange={setOpenContactDialog}
  studentEmail={student.email}
/>


        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
