import { Request, Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";

import User from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/AsyncHandler";
import { env } from "../constants";
import { AuthRequest } from "../middlewares/auth.middlewares";

// helper
const generateToken = (userId: string, role: string, email: string) => {
  const options: SignOptions = {
    expiresIn: env.jwt.expiresIn,
  };

  return jwt.sign(
    { userId, role, email },
    env.jwt.secret,
    options
  );
};



//  REGISTER 
export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const user = await User.create({ email, password, role });

  const token = generateToken(
    user._id.toString(),
    user.role,
    user.email
  );

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        id: user._id,
        email: user.email,
        role: user.role,
        token, // 🔥 returning token instead of cookie
      },
      "User registered successfully"
    )
  );
});


//  LOGIN 
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = generateToken(
    user._id.toString(),
    user.role,
    user.email
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        id: user._id,
        email: user.email,
        role: user.role,
        token, // 🔥 returning token instead of cookie
      },
      "Login successful"
    )
  );
});


//  LOGOUT 
// Logout is now frontend-only (just delete token from localStorage)
export const logoutUser = asyncHandler(async (_req: Request, res: Response) => {
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Logout successful"));
});


//  GetCurrent User  
export const getCurrentUser = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const user = req.user;

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          id: user?.id,
          email: user?.email,
          role: user?.role,
        },
        "Current user fetched successfully"
      )
    );
  }
);
