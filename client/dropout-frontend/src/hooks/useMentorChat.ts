import { useState } from "react";
import { sendMentorMessage } from "@/lib/api/mentor.api";

type ChatMessage = {
  role: "student" | "mentor";
  text: string;
};

export const useMentorChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { role: "student", text }]);
    setLoading(true);
    setError(null);

    try {
      const reply = await sendMentorMessage(text);

      setMessages((prev) => [
        ...prev,
        { role: "mentor", text: reply },
      ]);
    } catch {
      setError("AI mentor is currently unavailable.");
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    sendMessage,
    loading,
    error,
  };
};
