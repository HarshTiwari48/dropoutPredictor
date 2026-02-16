import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { ApiError } from "../utils/ApiError";
import { env } from "../constants";

// extend Request type to include user (learn this better)
export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
    email: string;
  };
}

export const verifyJWT = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decoded = jwt.verify(token, env.jwt.secret) as JwtPayload;

    req.user = {
      id: decoded.userId,
      role: decoded.role,
      email: decoded.email,
    };

    next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired token");
  }
};
