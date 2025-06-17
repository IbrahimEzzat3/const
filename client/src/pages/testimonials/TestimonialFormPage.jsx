import React from "react";
import { useParams } from "react-router-dom";
import TestimonialForm from "../../components/testimonials/TestimonialForm";
import usePageTitle from "../../shared/hooks/usePageTitle";
const TestimonialFormPage = () => {
  const { testimonialId } = useParams();
  const isEdit = Boolean(testimonialId);
  usePageTitle("testimonial");
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {isEdit ? "Edit Testimonial" : "Write a Testimonial"}
      </h1>
      <TestimonialForm isEdit={isEdit} />
    </div>
  );
};

export default TestimonialFormPage;
