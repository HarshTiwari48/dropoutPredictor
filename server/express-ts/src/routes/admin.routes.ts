import { Router } from "express";
import multer from "multer";
import { uploadStudentCsv, getAllStudents } from "../controllers/admin.controller";
import { verifyJWT } from "../middlewares/auth.middlewares";
import { requireRole } from "../middlewares/role.middlewares";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/upload-students",
  verifyJWT,
  requireRole("ADMIN"),
  upload.single("file"),
  uploadStudentCsv
);

router.get(
  "/students",
  verifyJWT,
  requireRole("ADMIN"),
  getAllStudents
);

export default router;
