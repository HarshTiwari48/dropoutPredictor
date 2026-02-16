import { Router } from "express";
import { contactStudent } from "../controllers/adminCommunication.controller";
import { verifyJWT } from "../middlewares/auth.middlewares";
import { requireRole } from "../middlewares/role.middlewares";

const router = Router();

router.post(
  "/contact-student",
  verifyJWT,
  requireRole("ADMIN"),
  contactStudent
);

export default router;
