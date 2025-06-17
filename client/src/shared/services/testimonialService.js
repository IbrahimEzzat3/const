import api from "./api";

export const testimonialService = {
  // Get all testimonials
  getAllTestimonials: async () => {
    const response = await api.get("/testimonials");
    return response.data;
  },

  // Get single testimonial
  getTestimonial: async (id) => {
    const response = await api.get(`/testimonials/${id}`);
    return response.data;
  },

  // Create a new testimonial
  createTestimonial: async (testimonialData) => {
    const response = await api.post("/testimonials", testimonialData);
    return response.data;
  },

  // Update a testimonial
  updateTestimonial: async (id, testimonialData) => {
    const response = await api.put(`/testimonials/${id}`, testimonialData);
    return response.data;
  },

  // Delete a testimonial
  deleteTestimonial: async (id) => {
    const response = await api.delete(`/testimonials/${id}`);
    return response.data;
  },
};
