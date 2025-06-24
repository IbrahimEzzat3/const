import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../../shared/hooks/usePageTitle";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "../../shared/context/LanguageContext";

const CostCalculator = () => {
  const [estimatedCost, setEstimatedCost] = useState(null);
  const [areaPerFloor, setAreaPerFloor] = useState("");
  const [numFloors, setNumFloors] = useState("");
  const [areaAnnex, setAreaAnnex] = useState("");
  const navigate = useNavigate();
  const { t, direction } = useLanguage();
  usePageTitle("costCalculator");

  const calculateCost = () => {
    const areaPerFloorNum = parseFloat(areaPerFloor);
    const numFloorsNum = parseFloat(numFloors);
    const areaAnnexNum = parseFloat(areaAnnex);
    if ((!areaPerFloorNum && areaPerFloor !== "0") || areaPerFloorNum < 0) {
      alert(t("sections.services.costCalculator.invalidArea"));
      return;
    }
    if ((!numFloorsNum && numFloors !== "0") || numFloorsNum < 0) {
      alert(t("sections.services.costCalculator.invalidArea"));
      return;
    }
    if ((!areaAnnexNum && areaAnnex !== "0") || areaAnnexNum < 0) {
      alert(t("sections.services.costCalculator.invalidArea"));
      return;
    }
    const cost = 1800 * (areaPerFloorNum * numFloorsNum + areaAnnexNum);
    setEstimatedCost(cost);
  };

  const handleContactClick = () => {
    navigate("/");
    setTimeout(() => {
      const contactSection = document.getElementById("cta");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };
  return (
    <>
      <Helmet>
        <title>{t("pageTitle.costCalculator")} | Shad</title>
        <meta
          name="description"
          content={t("sections.services.costCalculator.description")}
        />
      </Helmet>
      <main className={`container mx-auto px-4 py-16 ${direction}`}>
        <section className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">
            {t("sections.services.costCalculator.title")}
          </h1>

          <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">
              {t("sections.services.costCalculator.title")}
            </h2>
            <p className="text-gray-600 mb-6">
              {t("sections.services.costCalculator.description")}
            </p>

            <section className="bg-gray-50 p-6 rounded-lg mb-8">
              <div className="mb-6">
                <label className="block text-blue-900 font-semibold mb-2">
                  {t("sections.services.costCalculator.areaPerFloor")}
                </label>
                <input
                  type="number"
                  value={areaPerFloor}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || parseFloat(value) >= 0) {
                      setAreaPerFloor(value);
                    }
                  }}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder={t(
                    "sections.services.costCalculator.enterAreaPerFloorPlaceholder"
                  )}
                  min="0"
                  dir={direction}
                />
              </div>
              <div className="mb-6">
                <label className="block text-blue-900 font-semibold mb-2">
                  {t("sections.services.costCalculator.numFloors")}
                </label>
                <input
                  type="number"
                  value={numFloors}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || parseFloat(value) >= 0) {
                      setNumFloors(value);
                    }
                  }}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder={t(
                    "sections.services.costCalculator.enterNumFloorsPlaceholder"
                  )}
                  min="0"
                  dir={direction}
                />
              </div>
              <div className="mb-6">
                <label className="block text-blue-900 font-semibold mb-2">
                  {t("sections.services.costCalculator.areaAnnex")}
                </label>
                <input
                  type="number"
                  value={areaAnnex}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || parseFloat(value) >= 0) {
                      setAreaAnnex(value);
                    }
                  }}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder={t(
                    "sections.services.costCalculator.enterAreaAnnexPlaceholder"
                  )}
                  min="0"
                  dir={direction}
                />
              </div>

              <button
                onClick={calculateCost}
                className="w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                {t("sections.services.costCalculator.calculateButton")}
              </button>
            </section>

            {estimatedCost !== null && (
              <article
                className={`bg-yellow-50 p-6 rounded-lg text-center ${
                  direction === "rtl" ? "text-right" : "text-left"
                }`}
              >
                <h3 className="text-xl font-semibold text-blue-900 mb-3">
                  {t("sections.services.costCalculator.estimatedCostTitle")}
                </h3>
                <p className="text-2xl font-bold text-blue-900">
                  {estimatedCost.toLocaleString()}{" "}
                  {t("sections.smartHomePackages.currency")}
                </p>
                <p className="text-gray-600 mt-2">
                  {t("sections.services.costCalculator.disclaimer")}
                </p>
                <p className="text-red-600 mt-2 font-semibold">
                  {t("sections.services.costCalculator.noteEstimationOnly")}
                </p>
              </article>
            )}
          </section>

          <div className="text-center">
            <button
              onClick={handleContactClick}
              className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
            >
              {t("sections.services.costCalculator.calculateButton")}
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default CostCalculator;
