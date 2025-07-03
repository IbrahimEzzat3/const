import React, { useState, useEffect } from "react";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../shared/services/projectService";
import CustomAlert from "../../shared/components/CustomAlert";
import LoadingSpinner from "../common/LoadingSpinner";

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
    showCancelButton: false,
    onConfirm: null,
  });
  const [slug, setSlug] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      setError("Failed to load projects");
    }
    setLoading(false);
  };

  const handleImageChange = (e) => {
    setSelectedImages(Array.from(e.target.files));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!selectedImages.length || !slug) return;
    try {
      await createProject({ images: selectedImages, slug });
      setSelectedImages([]);
      setSlug("");
      fetchProjects();
      setAlert({
        isOpen: true,
        type: "success",
        title: "Created!",
        message: "Project created successfully.",
      });
    } catch {
      setAlert({
        isOpen: true,
        type: "error",
        title: "Error",
        message: "Failed to create project.",
      });
    }
  };

  const handleEdit = (slug) => {
    setEditId(slug);
    const project = projects.find((p) => p.slug === slug);
    setSlug(project?.slug || "");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedImages.length || !editId || !slug) return;
    try {
      await updateProject(editId, { images: selectedImages, slug });
      setEditId(null);
      setSelectedImages([]);
      setSlug("");
      fetchProjects();
      setAlert({
        isOpen: true,
        type: "success",
        title: "Updated!",
        message: "Project updated successfully.",
      });
    } catch {
      setAlert({
        isOpen: true,
        type: "error",
        title: "Error",
        message: "Failed to update project.",
      });
    }
  };

  const handleDelete = (slug) => {
    setAlert({
      isOpen: true,
      type: "warning",
      title: "Are you sure?",
      message: "This will permanently delete the project.",
      showCancelButton: true,
      onConfirm: async () => {
        try {
          await deleteProject(slug);
          fetchProjects();
          setAlert({
            isOpen: true,
            type: "success",
            title: "Deleted!",
            message: "Project deleted successfully.",
          });
        } catch {
          setAlert({
            isOpen: true,
            type: "error",
            title: "Error",
            message: "Failed to delete project.",
          });
        }
      },
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <LoadingSpinner size="lg" variant="primary" />
      </div>
    );
  }
  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-accent-teal">
        Project Manager
      </h2>
      <form
        onSubmit={editId ? handleUpdate : handleCreate}
        className="mb-8 flex flex-col md:flex-row gap-4 items-center"
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
        <input
          type="text"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="input input-bordered"
          required
        />
        <button type="submit" className="btn btn-primary">
          {editId ? "Update Project" : "Add Project"}
        </button>
        {editId && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setEditId(null);
              setSelectedImages([]);
              setSlug("");
            }}
          >
            Cancel
          </button>
        )}
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <article
            key={project._id}
            className="relative group overflow-hidden rounded-lg shadow-xl"
          >
            {project.images && project.images.length > 0 && (
              <img
                src={project.images[0]}
                alt="Project"
                className="w-full h-80 object-cover transition duration-500 group-hover:scale-110"
              />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition duration-300">
              <div className="flex gap-2 mt-2">
                <button
                  className="btn btn-warning"
                  onClick={() => handleEdit(project.slug)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(project.slug)}
                >
                  Delete
                </button>
              </div>
            </div>
            {project.images && project.images.length > 1 && (
              <div className="flex gap-1 mt-2">
                {project.images.slice(1).map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="Project"
                    className="w-16 h-16 object-cover rounded"
                  />
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
      <CustomAlert
        isOpen={alert.isOpen}
        onClose={() => setAlert((a) => ({ ...a, isOpen: false }))}
        title={alert.title}
        message={alert.message}
        type={alert.type}
        onConfirm={alert.onConfirm}
        showCancelButton={alert.showCancelButton}
      />
    </div>
  );
};

export default ProjectManager;
