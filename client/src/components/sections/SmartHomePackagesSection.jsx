import React from "react";
import { useLanguage } from "../../shared/context/LanguageContext";

const SmartHomePackagesSection = () => {
  const { t } = useLanguage();
  const packages = [
    {
      title: t("sections.smartHomePackages.basic.title"),
      price: "25,000",
      features: t("sections.smartHomePackages.basic.features", {
        returnObjects: true,
      }),
      isPopular: false,
      buttonClass: "bg-blue-100 hover:bg-blue-200",
    },
    {
      title: t("sections.smartHomePackages.advanced.title"),
      price: "45,000",
      features: t("sections.smartHomePackages.advanced.features", {
        returnObjects: true,
      }),
      isPopular: true,
      buttonClass: "bg-blue-600 hover:bg-blue-800",
    },
    {
      title: t("sections.smartHomePackages.vip.title"),
      price: "75,000",
      features: t("sections.smartHomePackages.vip.features", {
        returnObjects: true,
      }),
      isPopular: false,
      buttonClass: "bg-blue-100 hover:bg-blue-200",
    },
  ];

  return (
    <section id="packages" className="py-16 bg-gray-100 rounded-3xl">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            {t("sections.smartHomePackages.title")}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, index) => (
            <article
              key={index}
              className={` ${
                pkg.isPopular
                  ? "bg-blue-900 rounded-3xl text-white"
                  : "bg-white rounded-3xl"
              } p-8 rounded-lg shadow-md text-center transform ${
                pkg.isPopular ? "scale-105" : ""
              } transition duration-300 relative`}
            >
              {pkg.isPopular && (
                <div className="absolute top-0 right-4 bg-blue-600 text-white font-bold px-3 py-1 rounded-b-lg">
                  {t("sections.smartHomePackages.advanced.popular")}
                </div>
              )}
              <h3
                className={`text-2xl font-bold ${
                  pkg.isPopular ? "" : "text-blue-900"
                } mb-4`}
              >
                {pkg.title}
              </h3>
              <div
                className={`${
                  pkg.isPopular ? "text-white" : "text-blue-600"
                } text-4xl font-bold mb-6`}
              >
                {pkg.price}{" "}
                <span className="text-lg">
                  {t("sections.smartHomePackages.currency")}
                </span>
              </div>
              <ul
                className={`${
                  pkg.isPopular ? "" : "text-gray-600"
                } mb-8 space-y-3`}
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
                        pkg.isPopular ? "text-blue-600" : "text-blue-600"
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
              </ul>
              <button
                className={`w-full ${pkg.buttonClass} ${
                  pkg.isPopular ? "text-white" : "text-blue-900"
                } font-bold py-3 px-4 rounded-full transition duration-300`}
              >
                {t("sections.smartHomePackages.choosePackage")}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SmartHomePackagesSection;
