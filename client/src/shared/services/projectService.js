import api from "./api";

// Get all projects
export const getProjects = async () => {
  const res = await api.get("/projects");
  return res.data.data;
};

// Get single project
export const getProject = async (slug) => {
  const res = await api.get(`/projects/${slug}`);
  return res.data.data;
};

// Create project (images: array of File)
export const createProject = async (images) => {
  const formData = new FormData();
  images.forEach((img) => formData.append("images", img));
  const res = await api.post("/projects", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

// Update project (replace images)
export const updateProject = async (slug, images) => {
  const formData = new FormData();
  images.forEach((img) => formData.append("images", img));
  const res = await api.put(`/projects/${slug}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

// Delete project
export const deleteProject = async (slug) => {
  const res = await api.delete(`/projects/${slug}`);
  return res.data.data;
};
