import { create } from "zustand";
import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
} from "@/lib/api/auth.api";

export type UserRole = "STUDENT" | "ADMIN";

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;

  register: (data: {
    email: string;
    password: string;
    role?: UserRole;
  }) => Promise<void>;

  login: (data: {
    email: string;
    password: string;
  }) => Promise<void>;

  logout: () => Promise<void>;

  fetchMe: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,

  // REGISTER
  register: async (data) => {
    set({ loading: true });
    try {
      const res = await registerUser(data);

      const { token, ...userData } = res.data;

      localStorage.setItem("token", token);

      set({
        user: userData,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  // LOGIN
  login: async (data) => {
    set({ loading: true });
    try {
      const res = await loginUser(data);

      const { token, ...userData } = res.data;

      localStorage.setItem("token", token);

      set({
        user: userData,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  // LOGOUT
  logout: async () => {
    set({ loading: true });
    try {
      await logoutUser();

      localStorage.removeItem("token");

      set({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  // FETCH CURRENT USER
  fetchMe: async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
      return;
    }

    set({ loading: true });

    try {
      const res = await getCurrentUser();

      set({
        user: res.data,
        isAuthenticated: true,
        loading: false,
      });
    } catch {
      localStorage.removeItem("token");

      set({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
    }
  },
}));
