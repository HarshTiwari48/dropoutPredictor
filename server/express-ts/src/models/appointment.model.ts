import { Schema, model, Document } from "mongoose";

export interface AppointmentDocument extends Document {
  studentEmail: string;
  scheduledBy: string; // admin email
  date: string;        // YYYY-MM-DD
  time: string;        // HH:mm
  note?: string;
  status: "SCHEDULED" | "CANCELLED" | "COMPLETED";
  createdAt: Date;
  updatedAt: Date;
}

const appointmentSchema = new Schema<AppointmentDocument>(
  {
    studentEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    scheduledBy: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["SCHEDULED", "CANCELLED", "COMPLETED"],
      default: "SCHEDULED",
    },
  },
  {
    timestamps: true,
  }
);

export const Appointment = model<AppointmentDocument>(
  "Appointment",
  appointmentSchema
);
