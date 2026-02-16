import mongoose, { Schema, Document } from "mongoose";

export interface StudentDataDocument extends Document {
  email: string;
  name: string;

  age?: number | null;
  gender?: "Male" | "Female" | "Other";


  dropoutProbability: number; // 0–100
  riskLevel: "LOW" | "MEDIUM" | "HIGH";

  sem1Grade: number | null;
  sem2Grade: number | null;

  enrolledUnitsSem1: number;
  approvedUnitsSem1: number;

  enrolledUnitsSem2: number;
  approvedUnitsSem2: number;

  academicTrend: "IMPROVING" | "DECLINING" | "STABLE";

  lastEvaluatedAt: Date;
}

const StudentDataSchema = new Schema<StudentDataDocument>(
  {
    email: {
      type: String,
      required: true,
      index: true,
      unique: true, // one active record per student()
    },

    name: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      default: null,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Other",
    },
 


    dropoutProbability: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    riskLevel: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      required: true,
    },

    sem1Grade: {
      type: Number,
      default: null,
    },

    sem2Grade: {
      type: Number,
      default: null,
    },

    enrolledUnitsSem1: {
      type: Number,
      default: 0,
    },

    approvedUnitsSem1: {
      type: Number,
      default: 0,
    },

    enrolledUnitsSem2: {
      type: Number,
      default: 0,
    },

    approvedUnitsSem2: {
      type: Number,
      default: 0,
    },

    academicTrend: {
      type: String,
      enum: ["IMPROVING", "DECLINING", "STABLE"],
      default: "STABLE",
    },

    lastEvaluatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const StudentData = mongoose.model<StudentDataDocument>(
  "StudentData",
  StudentDataSchema
);
