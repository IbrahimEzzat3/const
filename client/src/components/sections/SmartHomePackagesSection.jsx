import React from "react";
import { useLanguage } from "../../shared/context/LanguageContext";

const SmartHomePackagesSection = () => {
  const { t } = useLanguage();
  const packages = [
    {
      title: t("sections.smartHomePackages.basic.title"),
      features: t("sections.smartHomePackages.basic.features", {
        returnObjects: true,
      }),
      isPopular: false,
      buttonClass: "bg-blue-100 hover:bg-blue-200",
    },
    {
      title: t("sections.smartHomePackages.advanced.title"),
      features: t("sections.smartHomePackages.advanced.features", {
        returnObjects: true,
      }),
      isPopular: true,
      buttonClass: "bg-accent-gold hover:bg-accent-gold/90",
    },
    {
      title: t("sections.smartHomePackages.vip.title"),
      features: t("sections.smartHomePackages.vip.features", {
        returnObjects: true,
      }),
      isPopular: false,
      buttonClass: "bg-blue-100 hover:bg-blue-200",
    },
    {
      title: t("sections.smartHomePackages.basicSuperVision.title"),
      features: t("sections.smartHomePackages.basicSuperVision.features", {
        returnObjects: true,
      }),
      notInclude: t("sections.smartHomePackages.basicSuperVision.notInclude", {
        returnObjects: true,
      }),
      isPopular: false,
      buttonClass: "bg-blue-100 hover:bg-blue-200",
    },
    {
      title: t("sections.smartHomePackages.fullSuperVision.title"),
      features: t("sections.smartHomePackages.fullSuperVision.features", {
        returnObjects: true,
      }),
      notInclude: t("sections.smartHomePackages.fullSuperVision.notInclude", {
        returnObjects: true,
      }),
      isPopular: true,
      buttonClass: "bg-accent-gold hover:bg-accent-gold/90",
    },
    {
      title: t("sections.smartHomePackages.turnkeyProjectPackage.title"),
      features: t("sections.smartHomePackages.turnkeyProjectPackage.features", {
        returnObjects: true,
      }),
      isPopular: false,
      buttonClass: "bg-blue-100 hover:bg-blue-200",
    },
  ];

  return (
    <section id="packages" className="py-16 mt-16 bg-[#F5EFE6] ">
      <div className="w-full px-4">
        <header className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-accent-teal mb-4">
            {t("sections.smartHomePackages.title")}
          </h2>
          <div className="w-24 h-1 bg-accent-gold mx-auto"></div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-5xl mx-auto">
          {packages.map((pkg, index) => (
            <article
              key={index}
              className={` ${
                pkg.isPopular
                  ? "bg-accent-teal rounded-3xl text-white"
                  : "bg-white rounded-3xl"
              } p-8 rounded-lg shadow-md text-center transform ${
                pkg.isPopular ? "scale-105" : ""
              } transition duration-300 relative flex flex-col`}
            >
              {pkg.isPopular && (
                <div className="absolute top-0 right-4 bg-accent-gold text-white font-bold px-3 py-1 rounded-b-lg">
                  {t("sections.smartHomePackages.advanced.popular")}
                </div>
              )}
              <h3
                className={`text-2xl font-bold ${
                  pkg.isPopular ? "" : "text-accent-teal"
                } mb-4`}
              >
                {pkg.title}
              </h3>
              <ul
                className={`${
                  pkg.isPopular ? "" : "text-gray-600"
                } mb-8 space-y-3 flex-grow`}
              >
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center justify-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className={`w-5 h-5 ${
                        pkg.isPopular ? "text-accent-gold" : "text-accent-gold"
                      }`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    <span className="mr-2">{feature}</span>
                  </li>
                ))}
                {pkg?.notInclude?.map((notInclude, idx) => (
                  <li key={idx} className="flex items-center justify-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-orange-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <span className="mr-2 text-orange-600">{notInclude}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <button
                  className={`w-full ${pkg.buttonClass} ${
                    pkg.isPopular ? "text-white" : "text-accent-teal"
                  } font-bold py-3 px-4 rounded-full transition duration-300 h-12`}
                  onClick={() => {
                    window.open(
                      "https://wa.me/966558813386?text=I%20want%20to%20choose%20the%20package%20%23" +
                        pkg.title,
                      "_blank"
                    );
                  }}
                >
                  {t("sections.smartHomePackages.choosePackage")}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SmartHomePackagesSection;
