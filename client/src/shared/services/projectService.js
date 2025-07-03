import api from "./api";

// Get all projects
export const getProjects = async () => {
  const res = await api.get("/projects");
  return res.data.data;
};

// Get single project
export const getProject = async (projectSlug) => {
  const res = await api.get(`/projects/${projectSlug}`);
  return res.data.data;
};

// Create project ({ images, slug })
export const createProject = async ({ images, slug }) => {
  const formData = new FormData();
  images.forEach((img) => formData.append("images", img));
  if (slug) formData.append("slug", slug);
  const res = await api.post("/projects", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

// Update project (projectSlug, { images, slug })
export const updateProject = async (projectSlug, { images, slug }) => {
  const formData = new FormData();
  images.forEach((img) => formData.append("images", img));
  if (slug) formData.append("slug", slug);
  const res = await api.put(`/projects/${projectSlug}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

// Delete project
export const deleteProject = async (projectSlug) => {
  const res = await api.delete(`/projects/${projectSlug}`);
  return res.data.data;
};
