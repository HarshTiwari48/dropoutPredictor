import api from "@/lib/axios";

export const sendMentorMessage = async (message: string) => {
  const res = await api.post("/mentor/chat", {
    message,
  });

  return res.data.data.reply as string;
};
