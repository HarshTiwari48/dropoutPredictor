import { Response } from "express";
import { asyncHandler } from "../utils/AsyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { sendMail } from "../services/mail.services";
import { AuthRequest } from "../middlewares/auth.middlewares";

export const contactStudent = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { studentEmail, message } = req.body;

    if (!studentEmail || !message) {
      throw new ApiError(400, "studentEmail and message are required");
    }

    await sendMail({
      to: studentEmail,
      subject: "Academic Support from Counselling Team",
      html: `
        <p>Hello,</p>
        <p>${message}</p>
        <br />
        <p>
          This message is sent to support you in your academic journey.
          Please feel free to reach out if you need assistance.
        </p>
        <p>— College Counselling Team</p>
      `,
    });

    return res.status(200).json(
      new ApiResponse(200, null, "Email sent to student successfully")
    );
  }
);
