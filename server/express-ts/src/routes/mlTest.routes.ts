import { Router } from "express";
import multer from "multer";
import { testMLFlow } from "../controllers/mlTest.controller";

console.log("✅ ML ROUTES FILE LOADED");


const router = Router();
const upload = multer({ dest: "uploads/" });

router.post("/test-ml", upload.single("file"), testMLFlow);

export default router;
