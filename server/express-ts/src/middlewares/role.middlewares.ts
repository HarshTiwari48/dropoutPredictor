import { Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { AuthRequest } from "./auth.middlewares";

export const requireRole = (...allowedRoles: string[]) => {
  return (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized request");
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new ApiError(403, "Access denied");
    }

    next();
  };
};
