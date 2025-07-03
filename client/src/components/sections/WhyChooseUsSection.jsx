import React from "react";
import { useLanguage } from "../../shared/context/LanguageContext";

// Custom SVG Icons
const AwardIcon = ({ className = "w-10" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const VRCardboardIcon = ({ className = "w-10" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14"
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
      d="M15 9H15.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HeadsetIcon = ({ className = "w-10" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 18V12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12V18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H18C17.4696 21 16.9609 20.7893 16.5858 20.4142C16.2107 20.0391 16 19.5304 16 19V16C16 15.4696 16.2107 14.9609 16.5858 14.5858C16.9609 14.2107 17.4696 14 18 14H21V19ZM3 19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H6C6.53043 21 7.03914 20.7893 7.41421 20.4142C7.78929 20.0391 8 19.5304 8 19V16C8 15.4696 7.78929 14.9609 7.41421 14.5858C7.03914 14.2107 6.53043 14 6 14H3V19Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PencilRulerIcon = ({ className = "w-10" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 6L18 9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11 10L14 13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 14L10 17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 18L6 21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 3L18 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 7L14 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13 11L10 14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 15L6 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const WhyChooseUsSection = () => {
  const { t } = useLanguage();
  const features = [
    {
      icon: <AwardIcon className="w-12 h-12" />,
      title: t("sections.whyChooseUs.localExperience.title"),
      description: t("sections.whyChooseUs.localExperience.description"),
    },
    {
      icon: <VRCardboardIcon className="w-12 h-12" />,
      title: t("sections.whyChooseUs.vrTech.title"),
      description: t("sections.whyChooseUs.vrTech.description"),
    },
    {
      icon: <HeadsetIcon className="w-12 h-12" />,
      title: t("sections.whyChooseUs.support.title"),
      description: t("sections.whyChooseUs.support.description"),
    },
    {
      icon: <PencilRulerIcon className="w-12 h-12" />,
      title: t("sections.whyChooseUs.customDesign.title"),
      description: t("sections.whyChooseUs.customDesign.description"),
    },
  ];

  return (
    <section className="bg-primary-50 mt-16 relative py-20 text-accent-teal overflow-hidden animate-fadein-up">
      {/* Decorative gold accent behind title */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-accent-gold/10 rounded-full blur-2xl z-0" />
      <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-12">
        {/* Left: Main Image */}
        <div className="flex-1 flex justify-center items-center w-full max-w-lg">
          <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-accent-gold/30">
            <img
              src="/images/projects/main/feature2.webp"
              alt="Why Choose Us"
              className="w-full h-full object-cover object-center scale-105 hover:scale-110 transition-transform duration-700"
              loading="lazy"
              decoding="async"
            />
            {/* Decorative overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-accent-teal/30 to-transparent" />
          </div>
        </div>
        {/* Right: Content */}
        <div className="flex-1 flex flex-col items-end w-full max-w-2xl">
          <div className="w-full flex flex-col items-end text-right mb-8">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-2 text-accent-teal relative z-10">
              {t("sections.whyChooseUs.title")}
            </h2>
            <div className="w-32 h-2 bg-accent-gold rounded-full mb-6 ml-auto" />
          </div>
          {/* Features as glassy cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group bg-white/60 backdrop-blur-lg border border-accent-gold/20 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-white/80"
              >
                <div className="mb-3 text-accent-gold group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-accent-gold mb-1">
                  {feature.title}
                </h3>
                <p className="text-accent-teal text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          {/* Summary/CTA */}
          <div className="bg-accent-gold/10 p-8 rounded-2xl w-full mt-10 shadow-md">
            <h3 className="text-2xl font-bold text-accent-gold mb-2">
              {t("sections.whyChooseUs.summaryTitle")}
            </h3>
            <p className="text-accent-teal text-base">
              {t("sections.whyChooseUs.summaryText")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
