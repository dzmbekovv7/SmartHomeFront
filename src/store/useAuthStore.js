import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  isResetting: false,
  isRequestingReset: false,
  resetCode: "",

  setEmail: (email) => set({ email }),
  setResetCodeInStore: (resetCode) => set({ resetCode }),

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/check/");
      set({ authUser: res.data });
      // Removed socket connection
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  requestPasswordReset: async ({ email }) => {
    set({ isRequestingReset: true });
    try {
      const res = await axiosInstance.post("/forgot-password/", { email });
      toast.success("Reset code sent to your email");
      set({ email });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to request reset");
    } finally {
      set({ isRequestingReset: false });
    }
  },

  verifyResetCode: async ({ reset_code }) => {
    try {
      await axiosInstance.post("/verify-email/", { reset_code });
      toast.success("Success");
      set({ resetCode: reset_code });
      console.log("Verified reset code:", reset_code);
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid code");
      return false;
    }
  },

  resetPassword: async ({ new_password, confirm_password }) => {
    const { resetCode } = useAuthStore.getState();
    console.log("Reset code being sent:", resetCode);
    set({ isResetting: true });
    try {
      await axiosInstance.post("/reset-password/", {
        reset_code: resetCode,
        new_password,
        confirm_password,
      });
    } catch (error) {
      console.error("Reset password failed:", error.response?.data || error.message);
      throw error;
    } finally {
      set({ isResetting: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/register/", data);
      toast.success("Account created successfully. Please confirm.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/login/", data);
      const { tokens } = res.data;
      console.log(data)
      // Save tokens to localStorage or cookies as needed
      localStorage.setItem("access_token", tokens.access);
      localStorage.setItem("refresh_token", tokens.refresh);
  
      set({ authUser: res.data });
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },  
  logout: async () => {
    try {
      const refresh = localStorage.getItem("refresh_token");
  
      await axiosInstance.post("/logout/", { refresh });
  
      // Удаляем токены
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
  
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response?.data?.error || "Logout failed");
    }
  },
  
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("profile/update/", data);
      set((state) => ({
        authUser: {
          ...state.authUser, // ← сохранить имя и email
          ...res.data         // ← обновить avatar
        }
      }));
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  

  // This now always returns false since there's no online user data
  checkPostOwnership: (postAuthorId) => {
    const { authUser } = get();
    return authUser && postAuthorId === authUser._id;
  },
}));
