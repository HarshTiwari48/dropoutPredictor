import { Appointment } from "../models/appointment.model";
import { sendMail } from "./mail.services";
import { ApiError } from "../utils/ApiError";

interface CreateAppointmentInput {
  studentEmail: string;
  scheduledBy: string; // admin email
  date: string;        // YYYY-MM-DD
  time: string;        // HH:mm
  note?: string;
}

export const createAppointment = async ({
  studentEmail,
  scheduledBy,
  date,
  time,
  note,
}: CreateAppointmentInput) => {
  if (!studentEmail || !scheduledBy || !date || !time) {
    throw new ApiError(400, "Missing required appointment details");
  }

  // 1️ Create appointment in DB
  const appointment = await Appointment.create({
    studentEmail,
    scheduledBy,
    date,
    time,
    note,
  });

  // 2️ Send notification email to student
  await sendMail({
    to: studentEmail,
    subject: "Counselling Appointment Scheduled",
    html: `
      <h2>Your Counselling Appointment is Scheduled</h2>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      ${
        note
          ? `<p><strong>Note:</strong> ${note}</p>`
          : ""
      }
      <p>
        If you are unable to attend, please contact the counselling team.
      </p>
      <br />
      <p>— College Counselling Team</p>
    `,
  });

  return appointment;
};
