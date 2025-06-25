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
      icon: <AwardIcon />,
      title: t("sections.whyChooseUs.localExperience.title"),
      description: t("sections.whyChooseUs.localExperience.description"),
    },
    {
      icon: <VRCardboardIcon />,
      title: t("sections.whyChooseUs.vrTech.title"),
      description: t("sections.whyChooseUs.vrTech.description"),
    },
    {
      icon: <HeadsetIcon />,
      title: t("sections.whyChooseUs.support.title"),
      description: t("sections.whyChooseUs.support.description"),
    },
    {
      icon: <PencilRulerIcon />,
      title: t("sections.whyChooseUs.customDesign.title"),
      description: t("sections.whyChooseUs.customDesign.description"),
    },
  ];

  return (
    <section className="bg-primary-50 mt-16 relative py-16 rounded-3xl text-accent-teal  overflow-hidden animate-fadein-up">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 grid-rows-2 gap-8 min-h-[60vh]">
          {/* Top Left: Image Placeholder */}
          <div className="row-start-1 col-start-1 flex items-start justify-start">
            {/* TODO: Replace with your image */}
            <div className="w-full h-full bg-accent-green rounded-2xl flex items-center justify-center">
              <img
                src="/images/projects/main/feature2.webp"
                alt="Why Choose Us"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* Top Right: Main Content */}
          <div className="row-start-1 col-start-2 flex flex-col items-end justify-start text-right">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-accent-teal">
              {t("sections.whyChooseUs.title")}
            </h2>
            <div className="w-24 h-1 bg-accent-gold mb-6 ml-auto"></div>
            <div className="space-y-6 w-full max-w-md">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="bg-accent-gold/20 p-3 rounded-full">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-accent-gold mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-accent-teal text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Left: Secondary Content (Summary/CTA) */}
          <div className="row-start-2 col-start-1 flex flex-col items-start justify-end text-left">
            <div className="bg-accent-gold/10 p-6 rounded-2xl w-full max-w-md">
              <h3 className="text-xl font-bold text-accent-gold mb-2">
                {t("sections.whyChooseUs.summaryTitle")}
              </h3>
              <p className="text-accent-teal text-base">
                {t("sections.whyChooseUs.summaryText")}
              </p>
            </div>
          </div>

          {/* Bottom Right: Image Placeholder */}
          <div className="row-start-2 col-start-2 flex items-end justify-end">
            {/* TODO: Replace with your image */}
            <div className="w-full h-full bg-accent-teal rounded-2xl flex items-center justify-center">
              <img
                src="/images/projects/main/feature2.webp"
                alt="Why Choose Us"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
