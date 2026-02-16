"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useContactStudent } from "@/hooks/useContactStudent";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentEmail: string;
};

export default function ContactStudentDialog({
  open,
  onOpenChange,
  studentEmail,
}: Props) {
  const [message, setMessage] = useState("");
  const { sendMessage, loading, error, success, reset } =
    useContactStudent();

  const handleSend = async () => {
    await sendMessage(studentEmail, message);
  };

  useEffect(() => {
    if (success) {
      const t = setTimeout(() => {
        onOpenChange(false);
      }, 1200);
      return () => clearTimeout(t);
    }
  }, [success, onOpenChange]);

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          setMessage("");
          reset();
        }
        onOpenChange(value);
      }}
    >
      <DialogContent className="sm:max-w-md">
        {/* Accessibility */}
        <VisuallyHidden>
          <DialogTitle>Contact Student</DialogTitle>
        </VisuallyHidden>

        {/* Header */}
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-slate-800">
            Contact Student
          </h3>
          <p className="text-sm text-slate-500">
            Send a supportive message to this student.
          </p>
          <p className="text-xs text-slate-400">
            To: {studentEmail}
          </p>
        </div>

        {/* Body */}
        <Textarea
          placeholder="Write a supportive message…"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading || success}
        />

        {error && (
          <p className="text-sm text-red-500 text-center">{error}</p>
        )}

        {success && (
          <p className="text-sm text-green-600 text-center">
            Message sent successfully
          </p>
        )}

        {/* Footer */}
        <DialogFooter className="flex justify-between">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSend}
            disabled={loading || !message.trim()}
          >
            {loading ? "Sending…" : "Send Message"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
