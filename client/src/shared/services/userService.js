import api from "./api";

export const userService = {
  // Get all users
  getAllUsers: async () => {
    try {
      const response = await api.get("/users");
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Delete a user
  deleteUser: async (userId) => {
    try {
      const response = await api.delete(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Block a user
  blockUser: async (userId, { reason, durationInHours }) => {
    try {
      const response = await api.post(`/users/${userId}/block`, {
        reason,
        durationInHours:
          durationInHours === "permanent" ? null : parseInt(durationInHours),
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Unblock a user
  unblockUser: async (userId) => {
    try {
      const response = await api.post(`/users/${userId}/unblock`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get user block history
  getBlockHistory: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}/block-history`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Update user level
  updateUserLevel: async (userId, level) => {
    try {
      const response = await api.put(`/users/${userId}/level`, { level });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};
