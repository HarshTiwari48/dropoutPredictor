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

  // actions
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

  //  REGISTER 
  register: async (data) => {
    set({ loading: true });
    try {
      const res = await registerUser(data);

      set({
        user: res.data,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  //  LOGIN 
  login: async (data) => {
    set({ loading: true });
    try {
      const res = await loginUser(data);

      set({
        user: res.data,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  //  LOGOUT 
  logout: async () => {
    set({ loading: true });
    try {
      await logoutUser();

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

  //  FETCH CURRENT USER 
  fetchMe: async () => {
    set({ loading: true });
    try {
      const res = await getCurrentUser();

      set({
        user: res.data,
        isAuthenticated: true,
        loading: false,
      });
    } catch {
      // not logged in
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
    }
  },
}));
