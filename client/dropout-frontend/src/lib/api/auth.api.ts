import api from "../axios";

// types
export interface AuthResponse {
  id: string;
  email: string;
  role: "STUDENT" | "ADMIN";
}

// REGISTER
export const registerUser = async (data: {
  email: string;
  password: string;
  role?: "STUDENT" | "ADMIN";
}) => {
  const res = await api.post("/users/register", data);
  return res.data;
};

// LOGIN
export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const res = await api.post("/users/login", data);
  return res.data;
};

// LOGOUT
export const logoutUser = async () => {
  const res = await api.post("/users/logout");
  return res.data;
};

// GET CURRENT USER
export const getCurrentUser = async () => {
  const res = await api.get("/users/me");
  return res.data;
};

// REQUEST ADMIN ACCESS
export const requestAdminAccess = async (data: {
  name: string;
  email: string;
  reason: string;
}) => {
  const res = await api.post("/users/request-admin", data);
  return res.data;
};
