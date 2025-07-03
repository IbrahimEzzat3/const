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
      className={`py-16 bg-[#F5EFE6] min-h-screen mt-16 ${direction}`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 rounded-3xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-accent-teal mb-8">
            {t("sections.about.title")}
          </h1>

          <div className="space-y-2 text-accent-teal">
            <p className="text-lg">{t("sections.about.subtitle")}</p>
            <p className="text-sm">{t("sections.about.description")}</p>
          </div>
          <div className="w-36 h-1 bg-accent-gold mx-auto mt-4"></div>
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
                <div className="absolute inset-0 bg-gradient-to-t from-accent-teal/70 via-accent-teal/20 to-transparent z-10"></div>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Hover Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-accent-teal/80 to-accent-teal/80 z-20 flex items-center justify-center transition-opacity duration-300 ${
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
                <h2 className="text-lg font-semibold text-accent-teal mb-2 group-hover:text-accent-gold transition-colors duration-300">
                  {project.title}
                </h2>
                <p className="text-sm text-accent-teal leading-relaxed">
                  {project.description}
                </p>

                {/* Category Badge */}
                <div className="mt-4">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-gradient-to-r from-accent-gold to-accent-gold text-[#F5EFE6] rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-accent-gold to-accent-gold rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 w-12 h-1 bg-gradient-to-r from-accent-gold to-accent-gold rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-accent-gold to-accent-gold rounded-full">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-accent-green rounded-full animate-pulse"></div>
              <div
                className="w-3 h-3 bg-accent-green rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-3 h-3 bg-accent-green rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
            <p className="text-[#F5EFE6] font-medium">
              {t("sections.about.bottomText")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
