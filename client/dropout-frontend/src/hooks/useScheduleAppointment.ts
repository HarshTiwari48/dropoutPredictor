import { useState } from "react";
import { scheduleAppointment } from "@/lib/api/appointment.api";

type ScheduleAppointmentInput = {
  studentEmail: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  note?: string;
};

export const useScheduleAppointment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const schedule = async (data: ScheduleAppointmentInput) => {
    const { studentEmail, date, time } = data;

    if (!studentEmail || !date || !time) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await scheduleAppointment(data);
      setSuccess(true);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Failed to schedule appointment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    schedule,
    loading,
    error,
    success,
    reset,
  };
};
