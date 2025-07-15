import api from "./api";

export const sliderService = {
  getSliders: async (lang = "ar") => {
    const response = await api.get("/sliders", { params: { lang } });
    return response.data;
  },
  createSlider: async (data) => {
    let formData = new FormData();
    formData.append("text", data.text);
    formData.append("lang", data.lang);
    formData.append("order", data.order);
    // If image is a File, append directly; if base64, convert to Blob
    if (data.image instanceof File) {
      formData.append("image", data.image);
    } else if (
      typeof data.image === "string" &&
      data.image.startsWith("data:")
    ) {
      // Convert base64 to Blob
      const arr = data.image.split(",");
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      formData.append("image", new Blob([u8arr], { type: mime }), "image.png");
    }
    const response = await api.post("/sliders", formData);
    return response.data;
  },
  updateSlider: async (id, data) => {
    let formData = new FormData();
    formData.append("text", data.text);
    formData.append("lang", data.lang);
    formData.append("order", data.order);
    if (data.image instanceof File) {
      formData.append("image", data.image);
    } else if (
      typeof data.image === "string" &&
      data.image.startsWith("data:")
    ) {
      const arr = data.image.split(",");
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      formData.append("image", new Blob([u8arr], { type: mime }), "image.png");
    }
    const response = await api.put(`/sliders/${id}`, formData);
    return response.data;
  },
  deleteSlider: async (id) => {
    const response = await api.delete(`/sliders/${id}`);
    return response.data;
  },
};
