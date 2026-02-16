import { useState } from "react";
import { contactCounsellor } from "@/lib/api/studentCommunication.api";

export const useContactCounsellor = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await contactCounsellor(message);
      setSuccess(true);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Failed to send message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    sendMessage,
    loading,
    error,
    success,
    reset,
  };
};
