import { Router } from "express";
import { chatWithMentor } from "../controllers/mentor.controller";
import { verifyJWT } from "../middlewares/auth.middlewares";
import { requireRole } from "../middlewares/role.middlewares";

const router = Router();

router.post(
  "/chat",
  verifyJWT,
  requireRole("STUDENT"),
  chatWithMentor
);

export default router;
