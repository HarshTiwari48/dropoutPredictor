import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";



const app = express();

app.set("trust proxy", 1);


// CORS
app.use(
  cors({
    origin: "https://elewareprime.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options("*", cors());



//cookie
app.use(cookieParser())

// Common middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

//remove later
app.use((req, _res, next) => {
  console.log("➡️ INCOMING REQUEST:", req.method, req.url);
  next();
});


// Health check route
app.get("/health", (_req, res) => {
  console.log("logging");
  res.status(200).json({
    status: "OK",
    message: "Express + TypeScript API running",
  });
});



//imports of routes
import userRouter from "./routes/user.routes";
import studentRouter from "./routes/student.routes";
import mlTestRoutes from "./routes/mlTest.routes";
import adminRoutes from "./routes/admin.routes";
import mentorRoutes from "./routes/mentor.routes";
import appointmentRoutes from "./routes/appointment.routes";
import adminCommunicationRoutes from "./routes/adminCommunication.routes";
import studentCommunictionRoutes from "./routes/studentCommunication.routes";

//test routes



// user routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/ml", mlTestRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/mentor", mentorRoutes);
app.use("/api/v1/appointments", appointmentRoutes);
app.use("/api/v1/admin", adminCommunicationRoutes);
app.use("/api/v1/students", studentCommunictionRoutes);

//test route




//import middlewares
import { errorHandler } from "./middlewares/error.middleware";
import { ApiError } from "./utils/ApiError";

//error handler
app.use((_req, _res, next) => {
  next(new ApiError(404, "Route not found my guy"));
});
app.use(errorHandler);


export default app;
