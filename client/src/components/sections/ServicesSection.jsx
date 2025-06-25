import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../shared/context/LanguageContext";

const GraduationCapIcon = ({ className = "w-10" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22 10l-10-6L2 10l10 6 10-6z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 12v5c0 1 4 2 6 2s6-1 6-2v-5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 12v6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="20" cy="20" r="2" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M19 20h2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
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
    <rect
      x="3"
      y="5"
      width="10"
      height="14"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M6 8h4M6 10h1M8 10h1M10 10h1M6 12h1M8 12h1M10 12h1M6 14h4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M15 4l4 4v12h-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 10v2M17 14v2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <rect x="16" y="18" width="2" height="1" fill="currentColor" />
  </svg>
);

// Add new icons for more expressive service representation
const EngineeringIcon = ({ className = "w-10" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="3"
      y="3"
      width="18"
      height="14"
      rx="1"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M7 7h10M7 11h6M7 15h8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="19" cy="19" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M17.5 19h3M19 17.5v3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M6 20l2-2 2 2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const InteriorIcon = ({ className = "w-10" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 20h16M4 20v-8h16v8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="8"
      y="14"
      width="3"
      height="4"
      rx="0.5"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <rect
      x="13"
      y="14"
      width="3"
      height="4"
      rx="0.5"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M6 12V8a2 2 0 012-2h8a2 2 0 012 2v4"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle cx="18" cy="8" r="1" fill="currentColor" />
    <path
      d="M10 4h4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
const PIMIcon = ({ className = "w-10" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="3"
      y="4"
      width="18"
      height="12"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M7 8h10M7 12h6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <rect
      x="15"
      y="10"
      width="4"
      height="4"
      rx="1"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path d="M9 18v2m6-2v2" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M6 20h12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
const LandscapeIcon = ({ className = "w-10" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3 18h18v2H3v-2z" fill="currentColor" />
    <path
      d="M5 16c0-2 1-3 2-3s2 1 2 3"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M11 16c0-3 1.5-4 3-4s3 1 3 4"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <circle
      cx="19"
      cy="8"
      r="2"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M6 12l2-2 2 2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="7" cy="6" r="1" fill="currentColor" />
  </svg>
);
const SmartHomeIcon = ({ className = "w-10" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 12l9-9 9 9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="16" r="1" fill="currentColor" />
    <path
      d="M9 16h6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M12 13v6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="16" cy="6" r="1" fill="currentColor" />
  </svg>
);
const AquacultureIcon = ({ className = "w-10" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse
      cx="12"
      cy="12"
      rx="10"
      ry="6"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M8 12c0 0 2-1 4-1s4 1 4 1"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <ellipse cx="10" cy="10" rx="2" ry="1" fill="currentColor" />
    <ellipse cx="14" cy="14" rx="2" ry="1" fill="currentColor" />
    <path
      d="M6 6c1 1 2 2 2 2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M16 6c1 1 2 2 2 2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="12" cy="18" r="1" fill="currentColor" />
  </svg>
);

const ServicesSection = () => {
  const { t } = useLanguage();
  const handleServiceClick = () => {
    window.scrollTo(0, 0);
  };

  const services = [
    {
      id: "engineering-designs",
      icon: <EngineeringIcon />,
      title: t("sections.services.engineeringDesigns.title"),
      description: t("sections.services.engineeringDesigns.description"),
      path: "/services/engineering-designs",
    },
    {
      id: "interior-design",
      icon: <InteriorIcon />,
      title: t("sections.services.interiorDesign.title"),
      description: t("sections.services.interiorDesign.description"),
      path: "/services/interior-design",
    },
    {
      id: "pim-modeling",
      icon: <PIMIcon />,
      title: t("sections.services.pimModeling.title"),
      description: t("sections.services.pimModeling.description"),
      path: "/services/pim-modeling",
    },
    {
      id: "landscape-designs",
      icon: <LandscapeIcon />,
      title: t("sections.services.landscapeDesigns.title"),
      description: t("sections.services.landscapeDesigns.description"),
      path: "/services/landscape-designs",
    },
    {
      id: "smart-homes",
      icon: <SmartHomeIcon />,
      title: t("sections.services.smartHomes.title"),
      description: t("sections.services.smartHomes.description"),
      path: "/services/smart-homes",
    },
    {
      id: "aquaculture-projects",
      icon: <AquacultureIcon />,
      title: t("sections.services.aquacultureProjects.title"),
      description: t("sections.services.aquacultureProjects.description"),
      path: "/services/aquaculture-projects",
    },
    {
      id: "training-courses",
      icon: <GraduationCapIcon />,
      title: t("sections.services.trainingCourses.title"),
      description: t("sections.services.trainingCourses.description"),
      path: "/courses",
      isCourses: true,
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
    <section id="services" className="py-16 bg-[#F5EFE6] mt-16 rounded-3xl mb-6">
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
              className="service-card bg-white p-6 rounded-lg shadow-md transition duration-300 hover:shadow-lg"
            >
              <div className="text-accent-teal text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-accent-gold mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              {service.isCalculator && (
                <Link
                  to={service.path}
                  onClick={handleServiceClick}
                  className="block w-full bg-accent-gold hover:bg-accent-gold/90 hover:text-black text-white font-bold py-2 px-4 rounded text-center"
                >
                  {t("sections.services.costCalculator.calculateButton")}
                </Link>
              )}
              {service.isCourses && (
                <Link
                  to={service.path}
                  onClick={handleServiceClick}
                  className="block w-full bg-accent-gold hover:bg-accent-gold/90 hover:text-black text-white font-bold py-2 px-4 rounded text-center"
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
