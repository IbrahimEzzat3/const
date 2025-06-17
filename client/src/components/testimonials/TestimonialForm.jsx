import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { testimonialService } from "../../shared/services/testimonialService";
import CustomAlert from "../../shared/components/CustomAlert";

const TestimonialForm = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const { testimonialId } = useParams();
  const [formData, setFormData] = useState({
    content: "",
    rating: 5,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [alertConfig, setAlertConfig] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
    showCancelButton: false,
    onConfirm: null,
  });

  useEffect(() => {
    if (isEdit && testimonialId) {
      const fetchTestimonial = async () => {
        try {
          const response = await testimonialService.getTestimonial(
            testimonialId
          );
          setFormData({
            content: response.data.content,
            rating: response.data.rating,
          });
        } catch (err) {
          setError("Failed to load testimonial");
        }
      };
      fetchTestimonial();
    }
  }, [isEdit, testimonialId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showAlert = (config) => {
    setAlertConfig({
      isOpen: true,
      ...config,
    });
  };

  const handleCloseAlert = () => {
    setAlertConfig((prev) => ({ ...prev, isOpen: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (isEdit) {
        await testimonialService.updateTestimonial(testimonialId, formData);
        showAlert({
          type: "success",
          title: "Success!",
          message: "Testimonial updated successfully.",
          showCancelButton: false,
          confirmButtonText: "OK",
          onConfirm: () => navigate("/"),
        });
      } else {
        await testimonialService.createTestimonial(formData);
        showAlert({
          type: "success",
          title: "Thank You!",
          message: "Your testimonial has been submitted successfully.",
          showCancelButton: false,
          confirmButtonText: "OK",
          onConfirm: () => navigate("/"),
        });
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to save testimonial";
      setError(errorMessage);
      showAlert({
        type: "error",
        title: "Error",
        message: errorMessage,
        showCancelButton: false,
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 flex-shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-primary-900 mb-2"
          >
            Your Testimonial
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            minLength={10}
            maxLength={500}
            placeholder="Share your experience with us (10-500 characters)"
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 resize-none"
          />
          <div className="mt-2 flex justify-between items-center">
            <p className="text-sm text-secondary-500">
              {formData.content.length}/500 characters
            </p>
            {formData.content.length < 10 && (
              <p className="text-sm text-red-500">
                Minimum {10 - formData.content.length} more characters required
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-primary-900 mb-2"
          >
            Your Rating
          </label>
          <div className="flex items-center gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, rating: star }))
                }
                className="focus:outline-none transform hover:scale-110 transition-transform duration-200"
                aria-label={`Rate ${star} stars`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`h-8 w-8 ${
                    star <= formData.rating
                      ? "text-yellow-400"
                      : "text-gray-200"
                  } transition-colors duration-200`}
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.292-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            ))}
            <span className="ml-2 text-sm text-secondary-600">
              {formData.rating} {formData.rating === 1 ? "star" : "stars"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="px-6 py-3 text-secondary-700 bg-secondary-50 rounded-lg hover:bg-secondary-100 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading || formData.content.length < 10}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Saving...
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              {isEdit ? "Update Testimonial" : "Submit Testimonial"}
            </>
          )}
        </button>
      </div>

      <CustomAlert
        isOpen={alertConfig.isOpen}
        onClose={handleCloseAlert}
        type={alertConfig.type}
        title={alertConfig.title}
        message={alertConfig.message}
        showCancelButton={alertConfig.showCancelButton}
        confirmButtonText={alertConfig.confirmButtonText}
        cancelButtonText={alertConfig.cancelButtonText}
        onConfirm={alertConfig.onConfirm}
      />
    </form>
  );
};

export default TestimonialForm;
