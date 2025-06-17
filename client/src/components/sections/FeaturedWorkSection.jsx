import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../shared/context/LanguageContext";
import { FEATURE2_IMAGE } from "../../constants/images";

const FeaturedWorkSection = () => {
  const { t, direction } = useLanguage();
  const projects = [
    {
      image: FEATURE2_IMAGE,
      title: t("sections.featuredWork.projects.villa.title"),
      description: t("sections.featuredWork.projects.villa.description"),
      slug: "villa-riyadh",
    },
    {
      image: FEATURE2_IMAGE,
      title: t("sections.featuredWork.projects.compound.title"),
      description: t("sections.featuredWork.projects.compound.description"),
      slug: "residential-compound-jeddah",
    },
  ];

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <section id="featured-work" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            {t("sections.featuredWork.title")}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {projects.map((project, index) => (
            <article
              key={index}
              className="relative group overflow-hidden rounded-lg shadow-xl"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-96 object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition duration-300">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-blue-200 mb-4">{project.description}</p>
                <Link
                  to={`/projects/${project.slug}`}
                  className="text-blue-400 font-medium flex items-center"
                  onClick={handleClick}
                >
                  {t("sections.featuredWork.viewDetails")}
                  <svg
                    className={`${
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
      </div>
    </section>
  );
};

export default FeaturedWorkSection;
