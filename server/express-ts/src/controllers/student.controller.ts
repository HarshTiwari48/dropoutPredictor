import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middlewares";
import { StudentData } from "../models/studentData.model";
import { asyncHandler } from "../utils/AsyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";

export const getMyStudentData = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const email = req.user?.email;

    if (!email) {
      throw new ApiError(401, "Unauthorized");
    }

    const studentData = await StudentData.findOne({ email });

    if (!studentData) {
      throw new ApiError(
        404,
        "Student data not found. Please contact admin."
      );
    }

    return res
      .status(200)
      .json(new ApiResponse(200, studentData, "Student data fetched"));
  }
);
