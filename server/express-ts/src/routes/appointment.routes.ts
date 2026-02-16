import { Router } from "express";
import { scheduleAppointment } from "../controllers/appointment.controller";
import { verifyJWT } from "../middlewares/auth.middlewares";
import { requireRole } from "../middlewares/role.middlewares";

const router = Router();

// ADMIN then schedule counselling appointment
router.post(
  "/schedule",
  verifyJWT,
  requireRole("ADMIN"),
  scheduleAppointment
);

export default router;
