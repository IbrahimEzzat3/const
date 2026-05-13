import React from "react";
import { Button } from "../ui";
import { useLanguage } from "../../shared/context/LanguageContext";

const VRDemoSection = () => {
  const { t, direction } = useLanguage();

  const handleContactClick = () => {
    setTimeout(() => {
      const contactSection = document.getElementById("cta");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <section
      id="vr-demo"
      className={`py-12 bg-accent-teal text-white mt-16 ${direction} w-full relative px-4 grid sm:grid-cols-1 lg:grid-cols-2 gap-8 items-center lg:h-[600px]`}
    >
      <div className={direction === "rtl" ? "text-right" : "text-left"}>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          {t("sections.vrDemo.title")}
        </h2>
        <p className="text-base mb-6 text-gray-200">
          {t("sections.vrDemo.subtitle")}
        </p>
        <ul className="space-y-3 mb-6 text-sm">
          {t("sections.vrDemo.features", { returnObjects: true }).map(
            (feature, index) => (
              <li key={index} className="flex items-center gap-2 justify-start">
                <div
                  className={`w-2 h-2 bg-accent-gold rounded-full ${
                    direction === "rtl" ? "ml-2" : "mr-2"
                  }`}
                ></div>
                <span>{feature}</span>
              </li>
            )
          )}
        </ul>
        <Button
          variant="primary"
          onClick={handleContactClick}
          className="rounded-full"
          rightIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  direction === "rtl"
                    ? "M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    : "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                }
              />
            </svg>
          }
        >
          {t("sections.vrDemo.bookNow")}
        </Button>
      </div>
      <div
        className="
      bg-[#CF9F57]
      overflow-hidden
      w-[100%] sm:w-[100%] lg:w-[600px]
      h-[400px] sm:h-[400px] lg:h-full
      relative sm:relative lg:absolute
      lg:left-0
      flex items-center justify-center
    "
      >
        <img
          className="w-full h-full object-cover"
          src="/images/vr.png"
          alt="VR Demo"
        />
      </div>
    </section>
  );
};

export default VRDemoSection;
