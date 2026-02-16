import { Router } from "express";
import { contactCounsellor } from "../controllers/studentCommunication.controller";
import { verifyJWT } from "../middlewares/auth.middlewares";
import { requireRole } from "../middlewares/role.middlewares";

const router = Router();

router.post(
  "/contact-counsellor",
  verifyJWT,
  requireRole("STUDENT"),
  contactCounsellor
);

export default router;
