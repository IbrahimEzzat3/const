import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import TestimonialsList from "../../components/testimonials/TestimonialsList";
import { useLanguage } from "../../shared/context/LanguageContext";
import usePageTitle from "../../shared/hooks/usePageTitle";

const TestimonialsListPage = () => {
  const { t, direction } = useLanguage();

  usePageTitle("testimonials");

  return (
    <>
      <Helmet>
        <title>{t("testimonials.title", "Testimonials")} | Shad</title>
        <meta
          name="description"
          content={
            direction === "rtl"
              ? "اقرأ آراء عملائنا وطلابنا الراضين. اكتشف ما يقوله الناس عن تجاربهم مع خدماتنا ودوراتنا."
              : "Read testimonials from our satisfied clients and students. Discover what people are saying about their experiences with our services and courses."
          }
        />
        <meta
          name="keywords"
          content={
            direction === "rtl"
              ? "آراء العملاء, مراجعات, تعليقات العملاء, تعليقات الطلاب, رضا العملاء"
              : "testimonials, reviews, client feedback, student feedback, customer satisfaction"
          }
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t("testimonials.title", "Testimonials")}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {t(
                "testimonials.description",
                "Hear from our community of learners about their experiences and success stories."
              )}
            </p>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/testimonials/new"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                {t("testimonials.shareYourStory", "Share Your Story")}
              </Link>

              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <svg
                  className={`w-5 h-5 mr-2`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                {t("backToHome", "Back to Home")}
              </Link>
            </div>
          </div>

          {/* Testimonials List */}
          <TestimonialsList />
        </div>
      </div>
    </>
  );
};

export default TestimonialsListPage;
