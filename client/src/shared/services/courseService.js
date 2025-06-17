import api from "./api";

export const courseService = {
  // Get all courses
  getAllCourses: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = `/courses${queryString ? `?${queryString}` : ""}`;
    const response = await api.get(url);
    return response.data;
  },

  // Search courses
  searchCourses: async (query) => {
    const response = await api.get(
      `/courses/search?q=${encodeURIComponent(query)}`
    );
    return response.data;
  },

  // Get single course
  getCourse: async (id) => {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },

  // Create course (admin only)
  createCourse: async (courseData) => {
    try {
      const response = await api.post("/courses", courseData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error("CourseService: Error creating course:", error);
      console.error("CourseService: Error response:", error.response?.data);
      throw error;
    }
  },

  // Update course (admin only)
  updateCourse: async (id, courseData) => {
    const response = await api.put(`/courses/${id}`, courseData);
    return response.data;
  },

  // Delete course (admin only)
  deleteCourse: async (id) => {
    const response = await api.delete(`/courses/${id}`);
    return response.data;
  },

  // Enroll in course
  enrollInCourse: async (id) => {
    const response = await api.post(`/courses/${id}/enroll`);
    return response.data;
  },

  // Get enrolled users (admin only)
  getEnrolledUsers: async (id) => {
    const response = await api.get(`/courses/${id}/enrolled-users`);
    return response.data;
  },

  // Unenroll from course
  unenrollFromCourse: async (id) => {
    const response = await api.delete(`/courses/${id}/unenroll`);
    return response.data;
  },

  addFeedback: async (courseId, feedbackData) => {
    try {
      const response = await api.post(
        `/courses/${courseId}/feedback`,
        feedbackData
      );
      return response.data;
    } catch (error) {
      console.error("Error in addFeedback (courseService):", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  getFeedback: async (courseId) => {
    try {
      const response = await api.get(`/courses/${courseId}/feedback`);
      return response.data;
    } catch (error) {
      console.error("Error in getFeedback (courseService):", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  deleteFeedback: async (courseId, feedbackId) => {
    try {
      const response = await api.delete(
        `/courses/${courseId}/feedback/${feedbackId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error in deleteFeedback (courseService):", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },
};
