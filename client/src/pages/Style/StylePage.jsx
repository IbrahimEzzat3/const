import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styleData from "../../data/styleData";
import usePageTitle from "../../shared/hooks/usePageTitle";
import { Helmet } from "react-helmet-async";

const StylePage = () => {
  const { category } = useParams();
  const [isArabic, setIsArabic] = useState(true);
  const [currentStyle, setCurrentStyle] = useState(null);
  usePageTitle(category);
  useEffect(() => {
    if (styleData[category]) {
      setCurrentStyle(styleData[category]);
    } else {
      // Handle case where category is not found, e.g., redirect to 404 or show error
      setCurrentStyle(null); // Or set a default/error state
    }
  }, [category]);

  const toggleLanguage = () => {
    setIsArabic(!isArabic);
  };

  if (!currentStyle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-2xl font-bold text-gray-700">
          Style not found or loading...
        </h1>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          {currentStyle
            ? isArabic
              ? currentStyle.titleAr
              : currentStyle.titleEn
            : "Style Not Found"}{" "}
          | Shad
        </title>
        <meta
          name="description"
          content={
            currentStyle
              ? isArabic
                ? currentStyle.descriptionAr
                : currentStyle.descriptionEn
              : "Style not found or loading..."
          }
        />
      </Helmet>
      <section
        className={`py-16 bg-gradient-to-br from-gray-50 to-white min-h-screen ${
          isArabic ? "rtl" : "ltr"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-4 mb-4">
              <button
                onClick={toggleLanguage}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {isArabic ? "English" : "العربية"}
              </button>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-4">
              {isArabic ? currentStyle.titleAr : currentStyle.titleEn}
            </h1>
          </div>

          {/* Main Image */}
          <div className="mb-12 rounded-lg overflow-hidden shadow-xl">
            <img
              src={currentStyle.mainImage}
              alt={isArabic ? currentStyle.titleAr : currentStyle.titleEn}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {currentStyle.sections.map((section, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                  {isArabic ? section.headingAr : section.headingEn}
                </h2>
                {section.paragraphsAr && (
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    {isArabic
                      ? section.paragraphsAr.map((p, pIndex) => (
                          <p key={pIndex}>{p}</p>
                        ))
                      : section.paragraphsEn.map((p, pIndex) => (
                          <p key={pIndex}>{p}</p>
                        ))}
                  </div>
                )}
                {section.listItemsAr && (
                  <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4">
                    {isArabic
                      ? section.listItemsAr.map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))
                      : section.listItemsEn.map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default StylePage;
