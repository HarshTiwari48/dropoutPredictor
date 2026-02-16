import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // If it's our custom Apierror
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      data: err.data,
      message: err.message,
      success: false,
      errors: err.errors,
    });
  }

  // Unknown / unhandled errors
  console.error("❌ Unhandled Error:", err);

  return res.status(500).json({
    statusCode: 500,
    data: null,
    message: "Internal Server Error",
    success: false,
    errors: [],
  });
};
