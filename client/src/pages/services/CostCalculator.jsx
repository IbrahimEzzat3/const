import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../../shared/hooks/usePageTitle";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "../../shared/context/LanguageContext";

const CostCalculator = () => {
  const [area, setArea] = useState("");
  const [finishType, setFinishType] = useState("normal");
  const [estimatedCost, setEstimatedCost] = useState(null);
  const navigate = useNavigate();
  const { t, direction } = useLanguage();
  usePageTitle("costCalculator");

  const calculateCost = () => {
    const areaNum = parseFloat(area);
    if (!areaNum || areaNum <= 0) {
      alert(t("sections.services.costCalculator.invalidArea"));
      return;
    }

    const rates = {
      normal: 1200, // ريال للمتر المربع
      luxury: 1800, // ريال للمتر المربع
      premium: 2500, // ريال للمتر المربع
    };

    const cost = areaNum * rates[finishType];
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
                  {t("sections.services.costCalculator.area")}
                </label>
                <input
                  type="number"
                  value={area}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow empty string or non-negative numbers
                    if (value === "" || parseFloat(value) >= 0) {
                      setArea(value);
                    }
                  }}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder={t(
                    "sections.services.costCalculator.enterAreaPlaceholder"
                  )}
                  min="0"
                  dir={direction}
                />
              </div>

              <div className="mb-6">
                <label className="block text-blue-900 font-semibold mb-2">
                  {t("sections.services.costCalculator.finishType.title")}
                </label>
                <select
                  value={finishType}
                  onChange={(e) => setFinishType(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  dir={direction}
                >
                  <option value="normal">
                    {t("sections.services.costCalculator.finishType.normal")}
                  </option>
                  <option value="luxury">
                    {t("sections.services.costCalculator.finishType.luxury")}
                  </option>
                  <option value="premium">
                    {t("sections.services.costCalculator.finishType.premium")}
                  </option>
                </select>
              </div>

              <button
                onClick={calculateCost}
                className="w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                {t("sections.services.costCalculator.calculateButton")}
              </button>
            </section>

            {estimatedCost && (
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
              </article>
            )}

            <section className="mt-8 bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-900 mb-3">
                {t("sections.services.costCalculator.importantNotesTitle")}
              </h3>
              <ul
                className={`list-disc list-inside text-gray-600 space-y-2 ${
                  direction === "rtl" ? "list-disc-rtl" : ""
                }`}
              >
                <li>{t("sections.services.costCalculator.note1")}</li>
                <li>{t("sections.services.costCalculator.note2")}</li>
                <li>{t("sections.services.costCalculator.note3")}</li>
                <li>{t("sections.services.costCalculator.note4")}</li>
              </ul>
            </section>
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
