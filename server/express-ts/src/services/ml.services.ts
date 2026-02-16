import axios from "axios";
import FormData from "form-data";
import fs from "fs";

const ML_BASE_URL = process.env.ML_BASE_URL as string;

if (!ML_BASE_URL) {
  throw new Error("ML_BASE_URL is not defined in environment variables");
}

/**
 * Axios instance for ML service (axios study remaining)
 */
const mlClient = axios.create({
  baseURL: ML_BASE_URL,
  timeout: Number(process.env.ML_TIMEOUT) || 30000,
});



/**
 * Upload CSV to ML model
 * @param filePath - local path of CSV file (this too)
 */
export const uploadCsvToML = async (filePath: string) => {
  const formData = new FormData();
  formData.append(
  "file",
  fs.createReadStream(filePath),
  {
    filename: "students.csv", 
    contentType: "text/csv",
  }
);


  const response = await mlClient.post("/predict-csv", formData, {
    headers: {
      ...formData.getHeaders(),
    },
  });

  return response.data;
};

/**
 * Get prediction results from ML
 * @param fileName - filename returned by ML after upload
 */
export const getPredictionResults = async (fileName: string) => {
  const response = await mlClient.get(`/get-results/${fileName}`);
  return response.data;
};
