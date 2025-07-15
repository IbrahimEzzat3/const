import api from "./api";

export const whyImageService = {
  getWhyImage: async () => {
    const response = await api.get("/whyImage");
    return response.data;
  },
  createWhyImage: async (data) => {
    let formData = new FormData();
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
    const response = await api.post("/whyImage", formData);
    return response.data;
  },
  updateWhyImage: async (id, data) => {
    let formData = new FormData();
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
    const response = await api.put(`/whyImage/${id}`, formData);
    return response.data;
  },
  deleteWhyImage: async (id) => {
    const response = await api.delete(`/whyImage/${id}`);
    return response.data;
  },
};
