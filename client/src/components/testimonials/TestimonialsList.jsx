import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { testimonialService } from "../../shared/services/testimonialService";
import { useLanguage } from "../../shared/context/LanguageContext";
import LoadingSpinner from "../common/LoadingSpinner";

// Star rating component
const StarRating = ({ rating, size = "w-5 h-5" }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`${size} ${
            index < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

// Individual testimonial card
const TestimonialCard = ({ testimonial }) => {
  const { t, direction } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        {/* User info and rating */}
        <div
          className={`flex items-start justify-between mb-4 ${
            direction === "rtl" ? "flex-row-reverse" : ""
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              {testimonial.user?.avatar ? (
                <img
                  src={testimonial.user.avatar}
                  alt={testimonial.user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <span className="text-primary-600 font-semibold text-lg">
                  {testimonial.user?.name?.charAt(0) || "A"}
                </span>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {testimonial.user?.name ||
                  t("testimonials.anonymous", "Anonymous")}
              </h3>
              <p className="text-sm text-gray-500">
                {new Date(testimonial.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <StarRating rating={testimonial.rating} />
        </div>

        {/* Testimonial content */}
        <div className="mb-4">
          <p className="text-gray-700 leading-relaxed line-clamp-4">
            {testimonial.content}
          </p>
        </div>

        {/* Read more link */}
        <div
          className={`flex ${
            direction === "rtl" ? "justify-start" : "justify-end"
          }`}
        >
          <Link
            to={`/testimonials/${testimonial._id}`}
            className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors duration-200"
          >
            {direction === "rtl"
              ? `← ${t("testimonials.readFullStory", "Read Full Story")}`
              : `${t("testimonials.readFullStory", "Read Full Story")} →`}
          </Link>
        </div>
      </div>
    </div>
  );
};

const TestimonialsList = () => {
  const { t, direction } = useLanguage();

  const [testimonials, setTestimonials] = useState([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    filterTestimonials();
  }, [testimonials, searchTerm, ratingFilter]);

  const fetchTestimonials = async () => {
    try {
      const data = await testimonialService.getAllTestimonials();
      const testimonialsData = Array.isArray(data?.data) ? data.data : [];
      setTestimonials(testimonialsData);
    } catch (err) {
      setError(t("testimonials.error", "Failed to load testimonials"));
      setTestimonials([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filterTestimonials = () => {
    let filtered = [...testimonials];

    // Search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (testimonial) =>
          testimonial.user?.name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          testimonial.content?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Rating filter
    if (ratingFilter !== "all") {
      const rating = parseInt(ratingFilter);
      filtered = filtered.filter(
        (testimonial) => testimonial.rating === rating
      );
    }

    setFilteredTestimonials(filtered);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <svg
            className="w-16 h-16 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <p className="text-gray-600">{error}</p>
        <button
          onClick={fetchTestimonials}
          className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
        >
          {t("common.tryAgain", "Try Again")}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div>
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t("search", "Search")} {t("testimonials.title", "Testimonials")}
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t(
                "testimonials.searchPlaceholder",
                "Search by name or content..."
              )}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              dir={direction}
            />
          </div>

          {/* Rating Filter */}
          <div>
            <label
              htmlFor="rating-filter"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t("testimonials.filterByRating", "Filter by Rating")}
            </label>
            <select
              id="rating-filter"
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              dir={direction}
            >
              <option value="all">
                {t("testimonials.allRatings", "All Ratings")}
              </option>
              <option value="5">
                {direction === "rtl" ? "5 نجوم" : "5 Stars"}
              </option>
              <option value="4">
                {direction === "rtl" ? "4 نجوم" : "4 Stars"}
              </option>
              <option value="3">
                {direction === "rtl" ? "3 نجوم" : "3 Stars"}
              </option>
              <option value="2">
                {direction === "rtl" ? "2 نجوم" : "2 Stars"}
              </option>
              <option value="1">
                {direction === "rtl" ? "1 نجمة" : "1 Star"}
              </option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 text-sm text-gray-600">
          {t(
            "testimonials.showingResults",
            "Showing {{count}} of {{total}} testimonials",
            {
              count: filteredTestimonials.length,
              total: testimonials.length,
            }
          )}
        </div>
      </div>

      {/* Testimonials Grid */}
      {filteredTestimonials.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <p className="text-gray-600 mb-4">
            {searchTerm || ratingFilter !== "all"
              ? t(
                  "testimonials.noResultsFound",
                  "No testimonials match your search criteria."
                )
              : t(
                  "testimonials.noTestimonials",
                  "No testimonials available yet."
                )}
          </p>
          {(searchTerm || ratingFilter !== "all") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setRatingFilter("all");
              }}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              {t("testimonials.clearFilters", "Clear Filters")}
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial._id} testimonial={testimonial} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialsList;
