"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SparklesText } from "@/components/ui/sparkles-text";
import { useContactCounsellor } from "@/hooks/useContactCounsellor";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ContactCounsellorDialog({
  open,
  onOpenChange,
}: Props) {
  const [message, setMessage] = useState("");
  const { sendMessage, loading, error, success, reset } =
    useContactCounsellor();

  const handleSend = async () => {
    await sendMessage(message);
  };

  // Auto-close dialog on success
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        onOpenChange(false);
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [success, onOpenChange]);

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        // Reset state ONLY when dialog closes
        if (!value) {
          setMessage("");
          reset();
        }
        onOpenChange(value);
      }}
    >
      <DialogContent className="sm:max-w-md bg-linear-to-b from-orange-50 to-white">
        {/* Header */}
        <div className="space-y-1 text-center">
          <SparklesText
            sparklesCount={6}
            colors={{ first: "#FDBA74", second: "#FDE68A" }}
            className="text-xl font-semibold text-orange-600"
          >
            Contact a Counsellor
          </SparklesText>

          <p className="text-sm text-gray-600">
            A counsellor can help you with academic or personal concerns.
          </p>
        </div>

        {/* Body */}
        <div className="space-y-2">
          <Textarea
            placeholder="Tell us what you’re feeling or what kind of help you’d like…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading || success}
            rows={5}
          />

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          {success && (
            <p className="text-sm text-green-600 text-center">
              Your request has been sent ❤️
            </p>
          )}
        </div>

        {/* Footer */}
        <DialogFooter className="flex gap-2 sm:justify-between">
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
            className="bg-orange-500 hover:bg-orange-600"
          >
            {loading ? "Sending…" : "Send Request"}
          </Button>
        </DialogFooter>

        {/* Privacy note */}
        <p className="text-xs text-gray-400 text-center">
          This message is private and will be seen only by the counselling team.
        </p>
      </DialogContent>
    </Dialog>
  );
}
