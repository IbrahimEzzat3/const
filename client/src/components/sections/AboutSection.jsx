import React, { useState } from "react";
import { useLanguage } from "../../shared/context/LanguageContext";

const AboutSection = () => {
  const { t, direction } = useLanguage();
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleCardClick = (pdfUrl) => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = pdfUrl.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const projects = t("sections.about.projects", { returnObjects: true });

  return (
    <section
      id="about"
      className={`py-16 bg-gray-100 min-h-screen rounded-3xl mb-6 ${direction}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8rounded-3xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-8">
            {t("sections.about.title")}
          </h1>

          <div className="space-y-2 text-gray-600">
            <p className="text-lg">{t("sections.about.subtitle")}</p>
            <p className="text-sm">{t("sections.about.description")}</p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="cursor-pointer group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
              onMouseEnter={() => setHoveredCard(project.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCardClick(project.pdf)}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Hover Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-blue-600/80 to-purple-600/80 z-20 flex items-center justify-center transition-opacity duration-300 ${
                    hoveredCard === project.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="text-center text-white p-6">
                    <h2 className="text-xl font-bold mb-2">{project.title}</h2>
                    <p className="text-sm opacity-90">{project.description}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {project.title}
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {project.description}
                </p>

                {/* Category Badge */}
                <div className="mt-4">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <div
                className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
            <p className="text-gray-600 font-medium">
              {t("sections.about.bottomText")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
