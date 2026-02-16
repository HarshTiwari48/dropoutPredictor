import api from "@/lib/axios";

type ScheduleAppointmentPayload = {
  studentEmail: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  note?: string;
};

/**
 * Admin schedules a counselling appointment
 */
export const scheduleAppointment = async (
  payload: ScheduleAppointmentPayload
) => {
  const res = await api.post(
    "/appointments/schedule",
    payload
  );

  return res.data;
};
