import React from "react";
import { useParams } from "react-router-dom";
import CourseForm from "../../components/admin/CourseForm";

const EditCoursePage = () => {
  const { courseId } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-accent-teal">Edit Course</h1>
        <p className="mt-2 text-accent-teal">Update the course details below</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <CourseForm isEdit={true} courseId={courseId} />
      </div>
    </div>
  );
};

export default EditCoursePage;
