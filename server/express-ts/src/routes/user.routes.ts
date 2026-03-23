import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../controllers/user.controllers";
import { verifyJWT } from "../middlewares/auth.middlewares";
import { requestAdminAccess } from "../controllers/user.controllers";

const router = Router();

// auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
//request
router.post("/request-admin", requestAdminAccess);

//protected route
router.get("/me", verifyJWT, getCurrentUser);

export default router;
