import api from "@/lib/axios";


export const contactCounsellor = async (message: string) => {
  const res = await api.post(
    "/students/contact-counsellor",
    { message }
  );

  return res.data;
};
