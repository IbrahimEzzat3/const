import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../shared/context/LanguageContext";

// Custom SVG Icons
const PaintRollerIcon = ({ className = "w-10" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 8V6C20 4.89543 19.1046 4 18 4H4C2.89543 4 2 4.89543 2 6V8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 8H2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 8V18C20 19.1046 19.1046 20 18 20H4C2.89543 20 2 19.1046 2 18V8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 12H10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 16H10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BuildingIcon = ({ className = "w-10" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 21H21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 21V7L13 3V21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 21V11L13 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 9H9.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 13H9.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 17H9.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TreeIcon = ({ className = "w-10" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 22V16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 16C15.866 16 19 12.866 19 9C19 5.13401 15.866 2 12 2C8.13401 2 5 5.13401 5 9C5 12.866 8.13401 16 12 16Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 22H16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 16V22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const RobotIcon = ({ className = "w-10" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2H14C15.1046 2 16 2.89543 16 4V6C16 7.10457 15.1046 8 14 8H10C8.89543 8 8 7.10457 8 6V4C8 2.89543 8.89543 2 10 2H12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 8V12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 12H16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 16H16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 20H16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 12H4C2.89543 12 2 12.8954 2 14V18C2 19.1046 2.89543 20 4 20H6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18 12H20C21.1046 12 22 12.8954 22 14V18C22 19.1046 21.1046 20 20 20H18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const GraduationCapIcon = ({ className = "w-10" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22 10V6L12 2L2 6L12 10L22 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 12V17C6 17 9.586 19 12 19C14.414 19 18 17 18 17V12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 22V19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CalculatorIcon = ({ className = "w-10" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 8H16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 12H8.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 12H12.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 12H16.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 16H8.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 16H12.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 16H16.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ServicesSection = () => {
  const { t } = useLanguage();
  const handleServiceClick = () => {
    window.scrollTo(0, 0);
  };

  const services = [
    {
      id: "interior-design",
      icon: <PaintRollerIcon />,
      title: t("sections.services.interiorDesign.title"),
      description: t("sections.services.interiorDesign.description"),
      path: "/services/interior-design",
    },
    {
      id: "exterior-design",
      icon: <BuildingIcon />,
      title: t("sections.services.exteriorDesign.title"),
      description: t("sections.services.exteriorDesign.description"),
      path: "/services/exterior-design",
    },
    {
      id: "garden-design",
      icon: <TreeIcon />,
      title: t("sections.services.gardenDesign.title"),
      description: t("sections.services.gardenDesign.description"),
      path: "/services/garden-design",
    },
    {
      id: "smart-automation",
      icon: <RobotIcon />,
      title: t("sections.services.smartAutomation.title"),
      description: t("sections.services.smartAutomation.description"),
      path: "/services/smart-automation",
    },
    {
      id: "training-courses",
      icon: <GraduationCapIcon />,
      title: t("sections.services.trainingCourses.title"),
      description: t("sections.services.trainingCourses.description"),
      path: "/courses",
    },
    {
      id: "cost-calculator",
      icon: <CalculatorIcon />,
      title: t("sections.services.costCalculator.title"),
      description: t("sections.services.costCalculator.description"),
      path: "/services/cost-calculator",
      isCalculator: true,
    },
  ];

  return (
    <section id="services" className="py-16 bg-gray-100 rounded-3xl mb-6">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            {t("sections.services.title")}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service) => (
            <div
              key={service.id}
              id={service.id}
              className="service-card bg-white p-6 rounded-lg shadow-md transition duration-300 hover:shadow-lg"
            >
              <div className="text-blue-900 text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              {service.isCalculator ? (
                <Link
                  to={service.path}
                  onClick={handleServiceClick}
                  className="block w-full bg-blue-600 hover:bg-blue-800 hover:text-black text-white font-bold py-2 px-4 rounded text-center"
                >
                  {t("sections.services.costCalculator.calculateButton")}
                </Link>
              ) : (
                <Link
                  to={service.path}
                  onClick={handleServiceClick}
                  className="text-blue-600 font-medium flex items-center hover:text-blue-800"
                >
                  {t("sections.services.moreDetails")}
                  <i className="fas fa-arrow-left mr-2"></i>
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
