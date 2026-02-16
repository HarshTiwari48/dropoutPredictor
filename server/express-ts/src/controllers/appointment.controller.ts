import { Response } from "express";
import { asyncHandler } from "../utils/AsyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { createAppointment } from "../services/appointment.services";
import { AuthRequest } from "../middlewares/auth.middlewares";

export const scheduleAppointment = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { studentEmail, date, time, note } = req.body;

    if (!studentEmail || !date || !time) {
      throw new ApiError(400, "studentEmail, date and time are required");
    }

    const adminEmail = req.user?.email;
    if (!adminEmail) {
      throw new ApiError(401, "Unauthorized");
    }

    const appointment = await createAppointment({
      studentEmail,
      scheduledBy: adminEmail,
      date,
      time,
      note,
    });

    return res.status(201).json(
      new ApiResponse(
        201,
        appointment,
        "Appointment scheduled successfully"
      )
    );
  }
);
