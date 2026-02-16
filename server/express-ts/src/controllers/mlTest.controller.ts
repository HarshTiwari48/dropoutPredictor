import { Request, Response } from "express";
import {
  uploadCsvToML,
  getPredictionResults,
} from "../services/ml.services";

export const testMLFlow = async (req: Request, res: Response) => {
  try {
    console.log("FILE:", req.file);

    const uploadResponse = await uploadCsvToML(req.file!.path);
    console.log("UPLOAD RESPONSE:", uploadResponse);

    const fileName = uploadResponse.file_name;
    console.log("FILE NAME:", fileName);

    const results = await getPredictionResults(fileName);
    console.log("RESULT COUNT:", results.length);



    return res.json({
      success: true,
      fileName,
      totalStudents: results.length,
    });
  } catch (error: any) {
  console.error(
    "ML TEST ERROR FULL:",
    error?.response?.data || error?.response || error
  );

  return res.status(500).json({
    message: "ML test failed",
    mlError: error?.response?.data || "Unknown ML error",
  });
}

};
