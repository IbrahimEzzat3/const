import axios from "axios";

const API_URL = "/api/auth";

// Create axios instance with auth header
const api = axios.create({
  baseURL: API_URL,
  // Remove default Content-Type header to allow FormData to work
  headers: {
    Accept: "application/json",
  },
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Don't set Content-Type for FormData
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
  // Register user
  register: async (userData) => {
    try {
      const response = await api.post("/register", userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Login user
  login: async (email, password) => {
    try {
      const response = await api.post("/login", { email, password });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get current user
  getMe: async () => {
    try {
      const response = await api.get("/me");
      return response.data.user;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Logout user
  logout: async () => {
    try {
      const response = await api.post("/logout");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Request password reset
  forgotPassword: async (email) => {
    try {
      const response = await api.post("/forgotpassword", { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Reset password with token
  resetPassword: async (token, password) => {
    try {
      const response = await api.put(`/resetpassword/${token}`, { password });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },



  // Update user details
  updateDetails: async (userData) => {
    try {
      // Don't set Content-Type header - let the browser set it with the boundary for FormData
      const response = await api.put("/updatedetails", userData, {
        headers: {
          // Remove Content-Type to let the browser set it automatically for FormData
          Accept: "application/json",
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update password
  updatePassword: async (currentPassword, newPassword) => {
    try {
      const response = await api.put("/updatepassword", {
        currentPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
