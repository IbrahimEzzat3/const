import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../shared/context/LanguageContext";

// Service icons
const ServiceIcon = ({ iconPath, alt, className = "w-40 h-40 mx-auto" }) => (
  <img src={iconPath} alt={alt} className={className} />
);

const ServicesSection = () => {
  const { t } = useLanguage();
  const handleServiceClick = () => {
    window.scrollTo(0, 0);
  };

  // Define icon paths for the service icons from the image
  const iconPaths = {
    engineeringDesigns: "/images/services/icon1.png",
    interiorDesign: "/images/services/icon2.png",
    pimModeling: "/images/services/icon3.png",
    landscapeDesigns: "/images/services/icon4.png",
    smartHomes: "/images/services/icon5.png",
    aquacultureProjects: "/images/services/icon6.png",
    trainingCourses: "/images/services/icon7.png",
    costCalculator: "/images/services/icon8.png",
  };

  const services = [
    {
      id: "engineering-designs",
      iconPath: iconPaths.engineeringDesigns,
      title: t("sections.services.engineeringDesigns.title"),
      description: t("sections.services.engineeringDesigns.description"),
      path: "/services/engineering-designs",
    },
    {
      id: "interior-design",
      iconPath: iconPaths.interiorDesign,
      title: t("sections.services.interiorDesign.title"),
      description: t("sections.services.interiorDesign.description"),
      path: "/services/interior-design",
    },
    {
      id: "pim-modeling",
      iconPath: iconPaths.pimModeling,
      title: t("sections.services.pimModeling.title"),
      description: t("sections.services.pimModeling.description"),
      path: "/services/pim-modeling",
    },
    {
      id: "landscape-designs",
      iconPath: iconPaths.landscapeDesigns,
      title: t("sections.services.landscapeDesigns.title"),
      description: t("sections.services.landscapeDesigns.description"),
      path: "/services/landscape-designs",
    },
    {
      id: "smart-homes",
      iconPath: iconPaths.smartHomes,
      title: t("sections.services.smartHomes.title"),
      description: t("sections.services.smartHomes.description"),
      path: "/services/smart-homes",
    },
    {
      id: "aquaculture-projects",
      iconPath: iconPaths.aquacultureProjects,
      title: t("sections.services.aquacultureProjects.title"),
      description: t("sections.services.aquacultureProjects.description"),
      path: "/services/aquaculture-projects",
    },
    {
      id: "training-courses",
      iconPath: iconPaths.trainingCourses,
      title: t("sections.services.trainingCourses.title"),
      description: t("sections.services.trainingCourses.description"),
      path: "/courses",
      isCourses: true,
    },
    {
      id: "cost-calculator",
      iconPath: iconPaths.costCalculator,
      title: t("sections.services.costCalculator.title"),
      description: t("sections.services.costCalculator.description"),
      path: "/services/cost-calculator",
      isCalculator: true,
    },
  ];

  return (
    <section id="services" className="py-16 bg-[#F5EFE6] mt-16 mb-6 w-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-accent-teal mb-4">
            {t("sections.services.title")}
          </h2>
          <div className="w-24 h-1 bg-accent-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {services.map((service) => (
            <div
              key={service.id}
              id={service.id}
              className="service-card  p-6 rounded-lg shadow-md transition duration-300 hover:shadow-lg flex flex-col items-center text-center"
            >
              <div className="mb-4 flex justify-center">
                <ServiceIcon iconPath={service.iconPath} alt={service.title} />
              </div>
              <h3 className="text-xl font-bold text-accent-gold mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              {service.isCalculator && (
                <Link
                  to={service.path}
                  onClick={handleServiceClick}
                  className="block w-full bg-accent-gold hover:bg-accent-gold/90 hover:text-black text-white font-bold py-2 px-4 rounded text-center mt-auto"
                >
                  {t("sections.services.costCalculator.calculateButton")}
                </Link>
              )}
              {service.isCourses && (
                <Link
                  to={service.path}
                  onClick={handleServiceClick}
                  className="block w-full bg-accent-gold hover:bg-accent-gold/90 hover:text-black text-white font-bold py-2 px-4 rounded text-center mt-auto"
                >
                  {t("sections.services.costCalculator.courseButton")}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
