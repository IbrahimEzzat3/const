import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../shared/context/LanguageContext";

const Course = ({ course }) => {
  const { t, direction } = useLanguage();

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden ${direction}`}
    >
      {/* Course Image */}
      <div className="relative h-48 bg-gray-200">
        {course.coverImage ? (
          <img
            src={`https://const-production.up.railway.app/uploads/${course.coverImage}`}
            alt={course.title}
            className="h-full w-full object-cover rounded-md"
            loading="lazy"
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-indigo-100">
            <span className="text-indigo-500 text-lg font-medium">
              {t("courseDetail.noImage")}
            </span>
          </div>
        )}
        {course.isActive && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            {t("status")}
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {course.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description.length > 50
            ? `${course.description.substring(0, 50)}...`
            : course.description}
        </p>

        {/* Course Meta */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <svg
              className={`h-4 w-4 ${direction === "rtl" ? "ml-1" : "mr-1"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {t("courseDetail.hoursOfContent", { count: course.duration })}
          </div>
          <div className="flex items-center">
            <svg
              className={`h-4 w-4 ${direction === "rtl" ? "ml-1" : "mr-1"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {t("courseDetail.studentsEnrolled", {
              count: course.enrolledUsers.length || 0,
            })}
          </div>
        </div>

        {/* Course Actions */}
        <div className="flex items-center justify-between">
          <Link
            to={`/courses/${course._id}`}
            className="text-indigo-600 hover:text-indigo-500 font-medium text-sm"
          >
            {t("readMore")}
          </Link>
          {course.price ? (
            <span className="text-gray-900 font-semibold">
              ${course.price.toFixed(2)}
            </span>
          ) : (
            <span className="text-blue-600 font-semibold">
              {t("courseDetail.free")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Course;
