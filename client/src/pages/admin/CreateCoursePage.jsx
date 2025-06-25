import React from "react";
import CourseForm from "../../components/admin/CourseForm";

const CreateCoursePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-accent-teal">Create New Course</h1>
        <p className="mt-2 text-accent-teal">
          Fill in the details below to create a new course
        </p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <CourseForm />
      </div>
    </div>
  );
};

export default CreateCoursePage;
