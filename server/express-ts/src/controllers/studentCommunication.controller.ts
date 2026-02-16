import { Response } from "express";
import { asyncHandler } from "../utils/AsyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { sendMail } from "../services/mail.services";
import { AuthRequest } from "../middlewares/auth.middlewares";

export const contactCounsellor = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { message } = req.body;

    if (!message) {
      throw new ApiError(400, "Message is required");
    }

    const studentEmail = req.user?.email;
    if (!studentEmail) {
      throw new ApiError(401, "Unauthorized");
    }

    await sendMail({
      to: process.env.MAIL_USER as string, // counsellor inbox
      subject: "New Counselling Request from Student",
      html: `
        <h3>New Counselling Request</h3>
        <p><strong>Student Email:</strong> ${studentEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <br />
        <p>— AI Dropout Predictor System</p>
      `,
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Your request has been sent to the counsellor"
      )
    );
  }
);
