import React, { useState, useEffect } from "react";
import { testimonialService } from "../../shared/services/testimonialService";
import { Link } from "react-router-dom";
import { Card } from "../ui";
import { useLanguage } from "../../shared/context/LanguageContext";

const TestimonialsSection = () => {
  const { t, direction } = useLanguage();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await testimonialService.getAllTestimonials();
        setTestimonials(data.data);
        setLoading(false);
      } catch (err) {
        setError(t("sections.testimonials.error"));
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [t]);

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  const formatDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString(
      direction === "rtl" ? "ar-SA" : "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
    return t("sections.testimonials.dateFormat", { date: formattedDate });
  };

  if (loading) {
    return (
      <section
        className={`bg-gradient-to-b from-white to-gray-50 py-16 sm:py-24 ${direction}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mt-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto mt-4"></div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-lg overflow-hidden p-6"
                >
                  <div className="flex items-center">
                    <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                    <div className={direction === "rtl" ? "mr-4" : "ml-4"}>
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                      <div className="h-3 bg-gray-200 rounded w-32 mt-2"></div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="h-4 bg-gray-200 rounded w-full mt-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mt-2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        className={`bg-gradient-to-b from-white to-gray-50 py-16 sm:py-24 ${direction}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg">
            <svg
              className="h-6 w-6 mx-auto mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`bg-gradient-to-b from-white to-gray-50 py-16 sm:py-24 ${direction}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-primary-600 tracking-wide uppercase">
            {t("sections.testimonials.title")}
          </h2>
          <p className="mt-2 text-3xl font-display font-bold text-primary-900 sm:text-4xl">
            {t("sections.testimonials.subtitle")}
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-secondary-600">
            {t("sections.testimonials.description")}
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 4)
            .map((testimonial) => (
              <Card
                key={testimonial._id}
                className="group relative flex flex-col overflow-hidden bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className="flex-1 p-6">
                  <div className="flex items-center">
                    <img
                      className="h-12 w-12 rounded-full ring-2 ring-primary-100"
                      src={
                        testimonial?.user?.avatar &&
                        testimonial.user.avatar !== "public/images/default.png"
                          ? `http://localhost:5000/${testimonial.user.avatar}`
                          : `http://localhost:5000/public/images/default.png`
                      }
                      alt={testimonial.user.name}
                      loading="lazy"
                      crossOrigin="anonymous"
                      referrerPolicy="no-referrer"
                    />
                    <div className={direction === "rtl" ? "mr-4" : "ml-4"}>
                      <h3 className="text-lg font-medium text-primary-900">
                        {testimonial.user.name}
                      </h3>
                      <div className="flex items-center mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg
                            key={i}
                            className="h-5 w-5 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-base text-secondary-600 line-clamp-3">
                      {testimonial.content}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-sm text-secondary-500">
                      {formatDate(testimonial.createdAt)}
                    </span>
                    <Link
                      to={`/testimonials/${testimonial._id}`}
                      className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
                      onClick={handleClick}
                    >
                      {t("sections.testimonials.readFullStory")}
                      <svg
                        className={`${
                          direction === "rtl" ? "mr-2 rotate-180" : "ml-2"
                        } h-4 w-4`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/testimonials/new"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-300"
            onClick={handleClick}
          >
            {t("sections.testimonials.shareYourStory")}
            <svg
              className={`${
                direction === "rtl" ? "mr-2 rotate-180" : "ml-2"
              } -mr-1 h-5 w-5`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
