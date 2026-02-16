import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares";
import { requireRole } from "../middlewares/role.middlewares";
import { getMyStudentData } from "../controllers/student.controller";

const router = Router();

router.get(
  "/me/data",
  verifyJWT,
  requireRole("STUDENT"),
  getMyStudentData
);

export default router;
