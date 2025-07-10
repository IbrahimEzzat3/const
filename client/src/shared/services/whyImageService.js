import api from "./api";

export const whyImageService = {
  getWhyImage: async () => {
    const response = await api.get("/whyImage");
    return response.data;
  },
  createWhyImage: async (data) => {
    const response = await api.post("/whyImage", data);
    return response.data;
  },
  updateWhyImage: async (id, data) => {
    const response = await api.put(`/whyImage/${id}`, data);
    return response.data;
  },
  deleteWhyImage: async (id) => {
    const response = await api.delete(`/whyImage/${id}`);
    return response.data;
  },
};
