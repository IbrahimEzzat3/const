import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useLanguage } from "../../shared/context/LanguageContext";
import usePageTitle from "../../shared/hooks/usePageTitle";
import { Helmet } from "react-helmet-async";

const translations = {
  ar: {
    projects: {
      furniture: {
        title: "مشروع أثاث",
        description: "وصف لمشروع الأثاث هنا.",
        images: [
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
        ],
      },
      hospitality: {
        title: "مشروع ضيافة",
        description: "وصف لمشروع الضيافة هنا.",
        images: [
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
        ],
      },
      residential: {
        title: "مشروع سكني",
        description: "وصف لمشروع سكني هنا.",
        images: [
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
        ],
      },
      landscape: {
        title: "مشروع لاندسكيب",
        description: "وصف لمشروع لاندسكيب هنا.",
        images: [
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
        ],
      },
      "villa-riyadh": {
        title: "فيلا فاخرة - الرياض",
        description:
          "تفاصيل تصميم وتنفيذ فيلا فاخرة بمساحة 850 م² في الرياض، مع تشطيبات لوكس وأنظمة ذكية متكاملة.",
        images: [
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
        ],
      },
      "residential-compound-jeddah": {
        title: "مجمع سكني - جدة",
        description:
          "تفاصيل تصميم وتنفيذ مجمع سكني مكون من 12 فيلا بتصاميم متنوعة وحدائق مشتركة في جدة.",
        images: [
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
        ],
      },
      commercial: {
        title: "مشروع تجاري",
        description: "وصف لمشروع تجاري هنا.",
        images: [
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
        ],
      },
      "administrative-offices": {
        title: "مشروع مكاتب إدارية",
        description: "وصف لمشروع مكاتب إدارية هنا.",
        images: [
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
        ],
      },
    },
    backToHome: "العودة للرئيسية",
  },
  en: {
    projects: {
      furniture: {
        title: "Furniture Project",
        description: "Description for the furniture project goes here.",
        images: [
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
        ],
      },
      hospitality: {
        title: "Hospitality Project",
        description: "Description for the hospitality project goes here.",
        images: [
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
        ],
      },
      residential: {
        title: "Residential Project",
        description: "Description for the residential project goes here.",
        images: [
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
        ],
      },
      landscape: {
        title: "Landscape Project",
        description: "Description for the landscape project goes here.",
        images: [
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
        ],
      },
      "villa-riyadh": {
        title: "Luxury Villa - Riyadh",
        description:
          "Details of the design and execution of a luxury villa of 850 m² in Riyadh, with deluxe finishes and integrated smart systems.",
        images: [
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
        ],
      },
      "residential-compound-jeddah": {
        title: "Residential Compound - Jeddah",
        description:
          "Details of the design and execution of a residential compound consisting of 12 villas with various designs and shared gardens in Jeddah.",
        images: [
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
        ],
      },
      commercial: {
        title: "Commercial Project",
        description: "Description for the commercial project goes here.",
        images: [
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
        ],
      },
      "administrative-offices": {
        title: "Administrative Offices Project",
        description:
          "Description for the administrative offices project goes here.",
        images: [
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
          "https://const-ars6.vercel.app/public/images/projects/main/feature2.webp",
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

  // Set the page title based on the project or notFound if project doesn't exist
  usePageTitle(
    translations[language].projects[projectSlug] ? projectSlug : "notFound"
  );

  const projectData = translations[language].projects[projectSlug];

  if (!projectData) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Project Not Found</h1>
        <p className="text-gray-600 mt-4">
          The project you are looking for does not exist.
        </p>
      </div>
    );
  }

  const openImageModal = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <Helmet>
        <title>
          {projectData ? projectData.title : "Project Not Found"} | Shad
        </title>
        <meta
          name="description"
          content={projectData ? projectData.description : "Project not found."}
        />
        <meta
          property="og:title"
          content={projectData ? projectData.title : "Project Not Found"}
        />
        <meta
          property="og:description"
          content={projectData ? projectData.description : "Project not found."}
        />
      </Helmet>
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
          {projectData.title}
        </h1>
        <p className="text-lg text-gray-700 mb-10 text-center max-w-2xl mx-auto">
          {projectData.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {projectData.images.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105"
              onClick={() => openImageModal(image)}
            >
              <img
                src={image}
                alt={`${projectData.title} Image ${index + 1}`}
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
            onClick={closeImageModal}
          >
            <div
              className="relative max-w-screen-lg max-h-full overflow-auto bg-white rounded-lg shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeImageModal}
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
