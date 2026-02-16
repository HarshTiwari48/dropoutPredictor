import { Request, Response } from "express";
import { uploadCsvToML, getPredictionResults } from "../services/ml.services";
import { mapMLRowToStudentData } from "../mapper/mlToStudentData.mapper";
import { upsertStudentData } from "../services/studentData.services";
import { asyncHandler } from "../utils/AsyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { StudentData } from "../models/studentData.model";

export const uploadStudentCsv = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.file) {
      throw new ApiError(400, "CSV file required");
    }

    // 1️ Upload CSV to ML
    const uploadResponse = await uploadCsvToML(req.file.path);

    const fileName = uploadResponse.file_name;
    if (!fileName) {
      throw new ApiError(500, "ML did not return file name");
    }

    await new Promise((resolve) => setTimeout(resolve, 500));


    // 2 Fetch results USING filename
    const resultsResponse = await getPredictionResults(fileName);

    const students = resultsResponse.students;

    if (!Array.isArray(students) || students.length === 0) {
      throw new ApiError(500, "ML returned no student predictions");
    }

    // 3️ Map + save
    for (const row of students) {
      const mappedData = mapMLRowToStudentData(row);
      await upsertStudentData(mappedData);
    }

    // 4️ Respond
    return res.status(200).json(
      new ApiResponse(
        200,
        { totalStudents: students.length },
        "CSV processed and student data saved successfully"
      )
    );
  }
);


// GET ALL STUDENTS (ADMIN)
export const getAllStudents = asyncHandler(
  async (_req: Request, res: Response) => {
    const students = await StudentData.find().sort({
      createdAt: -1,
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        students,
        "All student data fetched successfully"
      )
    );
  }
);

