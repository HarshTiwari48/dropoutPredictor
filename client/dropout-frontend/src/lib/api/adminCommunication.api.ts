import api from "@/lib/axios";

export const contactStudent = async (
  studentEmail: string,
  message: string
) => {
  const res = await api.post("/admin/contact-student", {
    studentEmail,
    message,
  });

  return res.data;
};
