import { SignOptions } from "jsonwebtoken";

export const DB_NAME = "dropoutAuth"

export const env = {
    jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: process.env.JWT_EXPIRES_IN! as SignOptions["expiresIn"],
  },
};
