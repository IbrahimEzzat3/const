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
    <section className="why-choose-us-section relative py-16 rounded-3xl text-white mb-28 overflow-hidden animate-fadein-up">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0 animate-gradient-move bg-gradient-to-tr from-blue-900 via-purple-800 to-blue-600 opacity-90"></div>
      {/* Floating Blob */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-purple-400 via-blue-400 to-blue-600 opacity-30 rounded-full blur-3xl animate-blob-float z-0"></div>
      <div className="absolute -bottom-32 right-0 w-80 h-80 bg-gradient-to-tr from-blue-400 via-purple-300 to-blue-600 opacity-20 rounded-full blur-2xl animate-blob-float2 z-0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <header
          className="text-center mb-12 animate-fadein-up"
          style={{ animationDelay: "0.1s" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-300 via-purple-300 to-blue-100 bg-clip-text text-transparent">
            {t("sections.whyChooseUs.title")}
          </h2>
          <div className="w-24 h-1 bg-blue-400 mx-auto"></div>
        </header>

        {/* Timeline */}
        <div className="relative flex flex-col items-center">
          {/* Vertical timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-blue-400 via-purple-400 to-blue-600 opacity-60 z-0 transform -translate-x-1/2"></div>
          <div className="w-full flex flex-col gap-16">
            {features.map((feature, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`why-timeline-step group relative flex flex-col md:flex-row items-center md:justify-between animate-fadein-up ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  style={{ animationDelay: `${0.2 + index * 0.15}s` }}
                >
                  {/* Content */}
                  <div
                    className={`w-full md:w-5/12 p-6 rounded-2xl bg-white/10 backdrop-blur-md shadow-xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl cursor-pointer z-10 ${
                      isLeft
                        ? "md:mr-auto md:text-right"
                        : "md:ml-auto md:text-left"
                    }`}
                  >
                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-200 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-blue-100 group-hover:text-white transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                  {/* Timeline Icon */}
                  <div className="flex flex-col items-center z-20">
                    <span className="icon-gradient group-hover:animate-icon-glow group-hover:shadow-blue-400/50 group-hover:shadow-lg transition-all duration-500 rounded-full p-2 border-4 border-white/30">
                      {feature.icon}
                    </span>
                    {/* Connector line for mobile */}
                    {index < features.length - 1 && (
                      <span className="block md:hidden w-1 h-12 bg-gradient-to-b from-blue-400 via-purple-400 to-blue-600 opacity-60"></span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Custom Animations */}
      <style>{`
        @keyframes fadein-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadein-up {
          animation: fadein-up 1s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        @keyframes gradient-move {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-move {
          background-size: 200% 200%;
          animation: gradient-move 8s ease-in-out infinite;
        }
        @keyframes blob-float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.1); }
        }
        .animate-blob-float {
          animation: blob-float 7s ease-in-out infinite;
        }
        @keyframes blob-float2 {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(30px) scale(1.08); }
        }
        .animate-blob-float2 {
          animation: blob-float2 9s ease-in-out infinite;
        }
        .why-timeline-step {
          opacity: 0;
          animation: fadein-up 1s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .why-timeline-step[style*="animation-delay"] {
          animation-delay: var(--delay, 0s);
        }
        .icon-gradient svg {
          background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
          border-radius: 9999px;
          box-shadow: 0 0 0 0 rgba(96,165,250,0.5);
          transition: box-shadow 0.4s;
        }
        .group:hover .icon-gradient svg {
          box-shadow: 0 0 24px 8px #60a5fa88, 0 0 40px 16px #a78bfa55;
        }
        .icon-gradient {
          display: inline-block;
          background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
          padding: 0.5rem;
          border-radius: 9999px;
        }
        .group:hover .icon-gradient {
          filter: brightness(1.2) saturate(1.3);
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUsSection;
