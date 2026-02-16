"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";

import { useScheduleAppointment } from "@/hooks/useScheduleAppointment";

export default function ScheduleAppointmentPage() {
  const router = useRouter();

  const [studentEmail, setStudentEmail] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");

  const { schedule, loading, error, success, reset } =
    useScheduleAppointment();

  const handleSubmit = async () => {
    if (!studentEmail || !date || !time) return;

    await schedule({
      studentEmail,
      date: format(date, "yyyy-MM-dd"),
      time,
      note: note.trim() || undefined,
    });
  };

  // Redirect after success just like before
  useEffect(() => {
    if (success) {
      const t = setTimeout(() => {
        reset();
        router.push("/admin");
      }, 1500);

      return () => clearTimeout(t);
    }
  }, [success, reset, router]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">
          Schedule Counselling Appointment
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Arrange a one-on-one counselling session with a student.
        </p>
      </div>

      {/* Form chalu yaha se */}
      <Card className="bg-amber-100">
        <CardHeader>
          <CardTitle className="text-black">Appointment Details</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* student email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Student Email
            </label>
            <Input
            className="text-black"
              type="email"
              placeholder="student@example.com"
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
              disabled={loading || success}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
  {/* Date */}
  <div className="space-y-2">
    <label className="text-sm font-medium text-slate-700">
      Select Date
    </label>
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-lg border text-black"
    />
  </div>

  {/* Time */}
  <div className="space-y-2">
    <label className="text-sm font-medium text-slate-700">
      Time
    </label>
    <Input
    className="text-black"
      type="time"
      value={time}
      onChange={(e) => setTime(e.target.value)}
      disabled={loading || success}
    />
  </div>
</div>


          {/* Note */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Note (optional)
            </label>
            <Textarea
              placeholder="Reason for appointment or any instructions..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              disabled={loading || success}
              className="text-black"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500 text-center">
              {error}
            </p>
          )}

          {/* Success */}
          {success && (
            <p className="text-sm text-green-600 text-center">
              Appointment scheduled successfully
            </p>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="ghost"
              onClick={() => router.push("/admin")}
              disabled={loading}
              className="text-black"
            >
              Cancel
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={loading || !studentEmail || !date || !time}
            >
              {loading ? "Scheduling…" : "Schedule Appointment"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
