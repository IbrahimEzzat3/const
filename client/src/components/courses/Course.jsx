import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../shared/context/LanguageContext";

const Course = ({ course }) => {
  const { direction } = useLanguage();

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden ${direction}`}
    >
      {/* Course Image */}
      <div className="relative h-48 bg-gray-200 flex items-center justify-center">
        <img
          src={
            course.photo
              ? `https://const-production.up.railway.app/uploads/${course.photo}`
              : "/default-course.jpg"
          }
          alt={course.title}
          className="h-full w-full object-cover rounded-t-lg"
          loading="lazy"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        {course.isActive && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium z-20">
            Active
          </div>
        )}
        {!course.isActive && (
          <div className="absolute top-2 right-2 bg-gray-400 text-white px-2 py-1 rounded-full text-xs font-medium z-20">
            Inactive
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {course.title}
        </h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {course.shortDescription
            ? course.shortDescription.slice(0, 80) +
              (course.shortDescription.length > 80 ? "..." : "")
            : ""}
        </p>
        <div className="flex items-center text-xs text-gray-500 mb-2">
          <span>
            Created: {new Date(course.createdAt).toLocaleDateString()}
          </span>
        </div>
        {/* Course Actions */}
        <div className="flex items-center justify-between mt-2">
          <Link
            to={`/courses/${course._id}`}
            className="text-indigo-600 hover:text-indigo-500 font-medium text-sm"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Course;
