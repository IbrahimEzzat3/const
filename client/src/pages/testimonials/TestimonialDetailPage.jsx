import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { testimonialService } from "../../shared/services/testimonialService";
import { useAuth } from "../../shared/context/AuthContext";
import usePageTitle from "../../shared/hooks/usePageTitle";
import { Helmet } from "react-helmet-async";
import CustomAlert from "../../shared/components/CustomAlert";

// Custom SVG Icons
const StarIcon = ({ className = "w-8" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);
const EditIcon = ({ className = "w-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TrashIcon = ({ className = "w-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 6H5H21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 11V17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 11V17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CalendarIcon = ({ className = "w-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 2V6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 2V6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 10H21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TestimonialDetailPage = () => {
  const { testimonialId } = useParams();
  const navigate = useNavigate();
  const [testimonial, setTestimonial] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const { user, isAdmin } = useAuth();
  const [alertConfig, setAlertConfig] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
    showCancelButton: false,
    onConfirm: null,
  });

  usePageTitle("feedback");

  const showAlert = (config) => {
    setAlertConfig({
      isOpen: true,
      ...config,
    });
  };

  const handleCloseAlert = () => {
    setAlertConfig((prev) => ({ ...prev, isOpen: false }));
  };

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const data = await testimonialService.getTestimonial(testimonialId);
        setTestimonial(data.data);
      } catch (err) {
        setError("Failed to load testimonial");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonial();
  }, [testimonialId]);

  const handleDelete = async () => {
    showAlert({
      type: "warning",
      title: "Are you sure?",
      message: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      onConfirm: async () => {
        setIsDeleting(true);
        try {
          await testimonialService.deleteTestimonial(testimonialId);
          showAlert({
            type: "success",
            title: "Deleted!",
            message: "Your testimonial has been deleted.",
            showCancelButton: false,
            confirmButtonText: "OK",
            onConfirm: () => navigate("/"),
          });
        } catch (err) {
          setError("Failed to delete testimonial");
          setIsDeleting(false);
        }
      },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="text-secondary-600">Loading testimonial...</p>
        </div>
      </div>
    );
  }

  if (error || !testimonial) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center text-center px-4">
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg mb-6">
          {error || "Testimonial not found"}
        </div>
        <button
          onClick={() => navigate("/testimonials")}
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors duration-200"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5" />
            <path d="M12 19L5 12L12 5" />
          </svg>
          Back to Testimonials
        </button>
      </div>
    );
  }

  const isOwner = user && testimonial && testimonial.user._id === user.id;
  const canModify = isOwner || isAdmin;

  return (
    <>
      <Helmet>
        <title>
          {testimonial
            ? `Testimonial by ${testimonial.user.name}`
            : "Testimonial Not Found"}{" "}
          | Shad
        </title>
        <meta
          name="description"
          content={
            testimonial
              ? testimonial.content?.slice(0, 150)
              : "Testimonial not found."
          }
        />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                      <img
                        className="h-12 w-12 rounded-full ring-2 ring-primary-100"
                        src={
                          testimonial?.user?.avatar &&
                          testimonial.user.avatar !==
                            "public/images/default.png"
                            ? `http://localhost:5000/${testimonial.user.avatar}`
                            : `http://localhost:5000/public/images/default.png`
                        }
                        alt={testimonial.user.name}
                        loading="lazy"
                        crossOrigin="anonymous"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-primary-900">
                        {testimonial.user.name}
                      </h1>
                      <div className="flex items-center gap-2 text-sm text-secondary-500">
                        <CalendarIcon />
                        <span>
                          {new Date(testimonial.createdAt).toLocaleDateString(
                            undefined,
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {canModify && (
                  <div className="flex gap-3">
                    <Link
                      to={`/testimonials/${testimonialId}/edit`}
                      className="inline-flex items-center gap-2 px-4 py-2 text-secondary-700 bg-secondary-50 rounded-lg hover:bg-secondary-100 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 transition-colors duration-200"
                    >
                      <EditIcon />
                      Edit
                    </Link>
                    <button
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="inline-flex items-center gap-2 px-4 py-2 text-red-700 bg-red-50 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      <TrashIcon />
                      {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-8 space-y-6">
                {/* Rating */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        filled={i < testimonial.rating}
                        className={`w-6 h-6 ${
                          i < testimonial.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300 fill-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-secondary-600">
                    {testimonial.rating}{" "}
                    {testimonial.rating === 1 ? "star" : "stars"}
                  </span>
                </div>

                {/* Testimonial Text */}
                <div className="prose prose-lg max-w-none">
                  <p className="text-secondary-700 whitespace-pre-line leading-relaxed">
                    {testimonial.content}
                  </p>
                </div>
              </div>
            </div>
          </div>
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
      </div>
    </>
  );
};

export default TestimonialDetailPage;
