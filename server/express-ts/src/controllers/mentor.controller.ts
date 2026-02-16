import { Request, Response } from "express";
import { asyncHandler } from "../utils/AsyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { generateMentorReply } from "../services/gemini.services";
import { AuthRequest } from "../middlewares/auth.middlewares";

export const chatWithMentor = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { message } = req.body;

    if (!message) {
      throw new ApiError(400, "Message is required");
    }

    const reply = await generateMentorReply(message);

    return res.status(200).json(
      new ApiResponse(200, { reply }, "Mentor reply generated")
    );
  }
);
