import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLanguage } from "../../shared/context/LanguageContext";
import usePageTitle from "../../shared/hooks/usePageTitle";
import { Helmet } from "react-helmet-async";
import { getProject } from "../../shared/services/projectService";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import {
  inside1_1,
  inside2_1,
  inside3_1,
  inside4_1,
  inside5_1,
  inside6_1,
  inside1_2,
  inside2_2,
  inside3_2,
  inside4_2,
  inside5_2,
  inside6_2,
  inside7_2,
  inside8_2,
  inside1_3,
  inside2_3,
  inside3_3,
  inside4_3,
  inside5_3,
  inside6_3,
  inside7_3,
  inside8_3,
  inside9_3,
  inside10_3,
  inside11_3,
  inside12_3,
  inside13_3,
} from "../../constants/images";

const translations = {
  ar: {
    projects: {
      project1: {
        title: "فيلا فاخرة - الرياض",
        description:
          "تفاصيل تصميم وتنفيذ فيلا فاخرة بمساحة 850 م² في الرياض، مع تشطيبات لوكس وأنظمة ذكية متكاملة.",
        images: [
          inside1_1,
          inside2_1,
          inside3_1,
          inside4_1,
          inside5_1,
          inside6_1,
        ],
      },
      project2: {
        title: "مجمع سكني - جدة",
        description:
          "تفاصيل تصميم وتنفيذ مجمع سكني مكون من 12 فيلا بتصاميم متنوعة وحدائق مشتركة في جدة.",
        images: [
          inside1_2,
          inside2_2,
          inside3_2,
          inside4_2,
          inside5_2,
          inside6_2,
          inside7_2,
          inside8_2,
        ],
      },
      project3: {
        title: "مجمع سكني - جدة",
        description:
          "تفاصيل تصميم وتنفيذ مجمع سكني مكون من 12 فيلا بتصاميم متنوعة وحدائق مشتركة في جدة.",
        images: [
          inside1_3,
          inside2_3,
          inside3_3,
          inside4_3,
          inside5_3,
          inside6_3,
          inside7_3,
          inside8_3,
          inside9_3,
          inside10_3,
          inside11_3,
          inside12_3,
          inside13_3,
        ],
      },
    },
    backToHome: "العودة للرئيسية",
  },
  en: {
    projects: {
      project1: {
        title: "Luxury Villa - Riyadh",
        description:
          "Details of the design and execution of a luxury villa of 850 m² in Riyadh, with deluxe finishes and integrated smart systems.",
        images: [
          inside1_1,
          inside2_1,
          inside3_1,
          inside4_1,
          inside5_1,
          inside6_1,
        ],
      },
      project2: {
        title: "Residential Compound - Jeddah",
        description:
          "Details of the design and execution of a residential compound consisting of 12 villas with various designs and shared gardens in Jeddah.",
        images: [
          inside1_2,
          inside2_2,
          inside3_2,
          inside4_2,
          inside5_2,
          inside6_2,
          inside7_2,
          inside8_2,
        ],
      },
      project3: {
        title: "مجمع سكني - جدة",
        description:
          "تفاصيل تصميم وتنفيذ مجمع سكني مكون من 12 فيلا بتصاميم متنوعة وحدائق مشتركة في جدة.",
        images: [
          inside1_3,
          inside2_3,
          inside3_3,
          inside4_3,
          inside5_3,
          inside6_3,
          inside7_3,
          inside8_3,
          inside9_3,
          inside10_3,
          inside11_3,
          inside12_3,
          inside13_3,
        ],
      },
    },
    backToHome: "Back to Home",
  },
};

const ProjectDetailPage = () => {
  const { language } = useLanguage();
  const { projectSlug } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [backendProject, setBackendProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  // Check if static project exists
  const staticProject = translations[language].projects[projectSlug];

  useEffect(() => {
    if (!staticProject) {
      setLoading(true);
      getProject(projectSlug)
        .then((data) => {
          setBackendProject(data);
          setNotFound(!data);
        })
        .catch(() => setNotFound(true))
        .finally(() => setLoading(false));
      console.log(projectSlug);
    }
    // eslint-disable-next-line
  }, [projectSlug, language]);

  // Set the page title
  usePageTitle(
    staticProject
      ? staticProject.title
      : backendProject
      ? backendProject.slug
      : notFound
      ? "notFound"
      : "..."
  );

  if (staticProject) {
    // Static project logic (unchanged)
    return (
      <>
        <Helmet>
          <title>{staticProject.title} | Shad</title>
          <meta name="description" content={staticProject.description} />
          <meta property="og:title" content={staticProject.title} />
          <meta property="og:description" content={staticProject.description} />
        </Helmet>
        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {staticProject.images.map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image}
                  alt={`${staticProject.title} Image ${index + 1}`}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-sm font-semibold">
                    Click to enlarge
                  </span>
                </div>
              </div>
            ))}
          </div>

          {selectedImage && (
            <div
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedImage(null)}
            >
              <div
                className="relative max-w-screen-lg max-h-full overflow-auto bg-white rounded-lg shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-3 right-3 text-white bg-gray-800 rounded-full p-2 hover:bg-gray-700 z-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <img
                  src={selectedImage}
                  alt="Enlarged Project Image"
                  className="w-full h-auto max-h-[80vh] object-contain mx-auto my-auto"
                />
              </div>
            </div>
          )}
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <LoadingSpinner size="lg" variant="primary" />
      </div>
    );
  }

  if (notFound || !backendProject) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Project Not Found</h1>
        <p className="text-gray-600 mt-4">
          The project you are looking for does not exist.
        </p>
      </div>
    );
  }

  // Backend project logic
  return (
    <>
      <Helmet>
        <title>{backendProject.slug} | Shad</title>
        <meta name="description" content={backendProject.slug} />
        <meta property="og:title" content={backendProject.slug} />
        <meta property="og:description" content={backendProject.slug} />
      </Helmet>
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {backendProject.images && backendProject.images.length > 0 ? (
            backendProject.images.map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image}
                  alt={`${backendProject.slug} Image ${index + 1}`}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-sm font-semibold">
                    Click to enlarge
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No images found for this project.
            </div>
          )}
        </div>

        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-screen-lg max-h-full overflow-auto bg-white rounded-lg shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 text-white bg-gray-800 rounded-full p-2 hover:bg-gray-700 z-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <img
                src={selectedImage}
                alt="Enlarged Project Image"
                className="w-full h-auto max-h-[80vh] object-contain mx-auto my-auto"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectDetailPage;
