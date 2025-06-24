import api from "./api";

export const sliderService = {
  getSliders: async (lang = "ar") => {
    const response = await api.get("/sliders", { params: { lang } });
    return response.data;
  },
  createSlider: async (data) => {
    const response = await api.post("/sliders", data);
    return response.data;
  },
  updateSlider: async (id, data) => {
    const response = await api.put(`/sliders/${id}`, data);
    return response.data;
  },
  deleteSlider: async (id) => {
    const response = await api.delete(`/sliders/${id}`);
    return response.data;
  },
};
