import React from "react";
import CourseDetail from "../../components/courses/CourseDetail";
import usePageTitle from "../../shared/hooks/usePageTitle";
const CourseDetailPage = () => {
  usePageTitle("course");
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <CourseDetail />
        </div>
      </div>
    </section>
  );
};

export default CourseDetailPage;
