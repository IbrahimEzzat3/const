import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../../shared/context/LanguageContext";
import {
  Main1_Project,
  Main2_Project,
  Main3_Project,
} from "../../constants/images";
import CustomAlert from "../../shared/components/CustomAlert";
import LoadingSpinner from "../common/LoadingSpinner";
import { getProjects } from "../../shared/services/projectService";

function Projects() {
  const { t, direction } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [backendProjects, setBackendProjects] = useState([]);
  const [alert, setAlert] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
    onConfirm: null,
    showCancelButton: false,
  });
  const navigate = useNavigate();
  // Project data with main images
  const staticProjects = [
    {
      id: "project1",
      image: Main1_Project,
      title: t("sections.featuredWork.projects.villa.title"),
      description: t("sections.featuredWork.projects.villa.description"),
      slug: "project1",
      isStatic: true,
    },
    {
      id: "project2",
      image: Main2_Project,
      title: t("sections.featuredWork.projects.compound.title"),
      description: t("sections.featuredWork.projects.compound.description"),
      slug: "project2",
      isStatic: true,
    },
    {
      id: "project3",
      image: Main3_Project,
      title:
        t("sections.featuredWork.projects.modern.title") ||
        "Modern Interior Design",
      description:
        t("sections.featuredWork.projects.modern.description") ||
        "A sleek and contemporary interior design project showcasing modern aesthetics.",
      slug: "project3",
      isStatic: true,
    },
  ];

  useEffect(() => {
    let isMounted = true;
    getProjects()
      .then((data) => {
        if (isMounted) setBackendProjects(data);
      })
      .catch(() => {
        if (isMounted) setBackendProjects([]);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleProjectClick = (project) => {
    navigate(`/projects/${project.slug}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <LoadingSpinner size="lg" variant="primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-accent-teal mb-4">
          {t("projects") || "Our Projects"}
        </h1>
        <div className="w-24 h-1 bg-accent-gold mx-auto mb-6"></div>
      </header>

      {/* Static Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {staticProjects.map((project) => (
          <article
            key={project.id}
            className="relative group overflow-hidden rounded-lg shadow-xl h-80 cursor-pointer"
            onClick={() => handleProjectClick(project)}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition duration-300">
              <Link
                to={`/projects/${project.slug}`}
                className="text-accent-gold font-medium flex items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  handleProjectClick(project);
                }}
              >
                {t("sections.featuredWork.viewDetails") || "View Details"}
                <svg
                  className={`$${
                    direction === "rtl" ? "mr-2 rotate-360" : "ml-2 rotate-180"
                  } -mr-1 h-5 w-5`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Backend Projects */}
      {backendProjects.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {backendProjects.map((project) => (
              <article
                key={project._id}
                className="relative group overflow-hidden rounded-lg shadow-xl h-80 cursor-pointer"
                onClick={() => handleProjectClick(project)}
              >
                {project.images && project.images.length > 0 && (
                  <img
                    src={project.images[0]}
                    alt={project._id}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition duration-300">
                  <Link
                    to={`/projects/${project._id}`}
                    className="text-accent-gold font-medium flex items-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProjectClick(project);
                    }}
                  >
                    {t("sections.featuredWork.viewDetails") || "View Details"}
                    <svg
                      className={`$${
                        direction === "rtl"
                          ? "mr-2 rotate-360"
                          : "ml-2 rotate-180"
                      } -mr-1 h-5 w-5`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </>
      )}

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
}

export default Projects;
