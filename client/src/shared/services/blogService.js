import api from "./api";

export const blogService = {
  // Public routes
  getBlogs: async (params) => {
    const response = await api.get("/blog", { params });
    return response.data;
  },

  getPopularBlogs: async () => {
    const response = await api.get("/blog/popular");
    return response.data;
  },

  getBlogsByCategory: async (category) => {
    const response = await api.get(`/blog/category/${category}`);
    return response.data;
  },

  searchBlogs: async (query) => {
    const response = await api.get("/blog/search", { params: { query } });
    return response.data;
  },

  getBlog: async (id) => {
    const response = await api.get(`/blog/${id}`);
    return response.data;
  },

  // Admin routes
  getAllBlogs: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = `/blog/admin/all${queryString ? `?${queryString}` : ""}`;
    const response = await api.get(url);
    return response.data;
  },

  createBlog: async (blogData) => {
    // Check if blogData is already FormData (from your BlogForm component)
    if (blogData instanceof FormData) {
      const response = await api.post("/blog", blogData, {
        headers: {
          "Content-Type": undefined, // Let the browser set multipart/form-data
        },
        timeout: 30000, // 30 second timeout
      });
      return response.data;
    }

    // If not FormData, create it
    const formData = new FormData();

    Object.keys(blogData).forEach((key) => {
      if (blogData[key] !== null && blogData[key] !== undefined) {
        if (key === "coverImage" && blogData[key] instanceof File) {
          formData.append("coverImage", blogData[key]);
        } else if (key === "tags" && Array.isArray(blogData[key])) {
          // Handle tags array properly
          formData.append("tags", JSON.stringify(blogData[key]));
        } else if (typeof blogData[key] === "object") {
          formData.append(key, JSON.stringify(blogData[key]));
        } else {
          formData.append(key, String(blogData[key]));
        }
      }
    });

    const response = await api.post("/blog", formData, {
      headers: {
        "Content-Type": undefined, // Let the browser set multipart/form-data
      },
      timeout: 30000, // 30 second timeout
    });
    return response.data;
  },

  updateBlog: async (id, blogData) => {
    // Check if blogData is already FormData
    if (blogData instanceof FormData) {
      const response = await api.put(`/blog/${id}`, blogData, {
        headers: {
          "Content-Type": undefined, // Let the browser set multipart/form-data
        },
        timeout: 30000, // 30 second timeout
      });
      return response.data;
    }

    // If not FormData, handle it as a regular object (though unlikely for update with file)
    const response = await api.put(`/blog/${id}`, blogData);
    return response.data;
  },

  deleteBlog: async (id) => {
    const response = await api.delete(`/blog/${id}`);
    return response.data;
  },

  addFeedback: async (blogId, feedbackData) => {
    try {
      const response = await api.post(`/blog/${blogId}/feedback`, feedbackData);
      return response.data;
    } catch (error) {
      console.error("Error in addFeedback:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  getFeedback: async (blogId) => {
    try {
      const response = await api.get(`/blog/${blogId}/feedback`);
      return response.data;
    } catch (error) {
      console.error("Error in getFeedback:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  deleteFeedback: async (blogId, feedbackId) => {
    try {
      const response = await api.delete(
        `/blog/${blogId}/feedback/${feedbackId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error in deleteFeedback:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },
};
