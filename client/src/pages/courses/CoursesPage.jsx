import React from "react";
import CoursesList from "../../components/courses/CoursesList";
import usePageTitle from "../../shared/hooks/usePageTitle";
import { useLanguage } from "../../shared/context/LanguageContext";

const CoursesPage = () => {
  const { t, direction } = useLanguage();

  usePageTitle("courses");

  return (
    <section
      className={`bg-gradient-to-b from-white to-gray-50 min-h-screen ${direction}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div
          className={`mb-8 text-center sm:text-left ${
            direction === "rtl" ? "rtl" : "ltr"
          }`}
        >
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-primary-900">
            {t("coursesList.allCourses")}
          </h1>
          <p className="mt-2 text-lg text-secondary-600 max-w-2xl">
            {t("sections.services.trainingCourses.description")}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <CoursesList />
        </div>
      </div>
    </section>
  );
};

export default CoursesPage;
