import React, { useState, useEffect } from "react";
import { testimonialService } from "../../shared/services/testimonialService";
import CustomAlert from "../../shared/components/CustomAlert";

const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
    showCancelButton: false,
    onConfirm: null,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const data = await testimonialService.getAllTestimonials();
      const testimonialsData = Array.isArray(data?.data) ? data.data : [];
      setTestimonials(testimonialsData);
      setFilteredTestimonials(testimonialsData);
    } catch (err) {
      setError("Failed to load testimonials");
      setTestimonials([]);
      setFilteredTestimonials([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    if (!searchValue.trim()) {
      setFilteredTestimonials(testimonials);
      return;
    }

    const filtered = testimonials.filter(
      (testimonial) =>
        testimonial.user?.name?.toLowerCase().includes(searchValue) ||
        testimonial.content?.toLowerCase().includes(searchValue) ||
        testimonial.rating?.toString().includes(searchValue)
    );

    setFilteredTestimonials(filtered);
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

  const handleDelete = async (id) => {
    showAlert({
      type: "warning",
      title: "Are you sure?",
      message: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      onConfirm: async () => {
        setIsDeleting(true);
        try {
          await testimonialService.deleteTestimonial(id);
          setTestimonials((prev) =>
            prev.filter((testimonial) => testimonial._id !== id)
          );
          setFilteredTestimonials((prev) =>
            prev.filter((testimonial) => testimonial._id !== id)
          );
          showAlert({
            type: "success",
            title: "Deleted!",
            message: "The testimonial has been deleted.",
            showCancelButton: false,
            confirmButtonText: "OK",
          });
        } catch (err) {
          const errorMessage =
            err?.response?.data?.error || "Failed to delete testimonial";
          showAlert({
            type: "error",
            title: "Error",
            message: errorMessage,
            showCancelButton: false,
            confirmButtonText: "OK",
          });
        } finally {
          setIsDeleting(false);
        }
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={fetchTestimonials}
          className="text-indigo-600 hover:text-indigo-500"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 px-2 md:px-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0">
        <h2 className="text-xl md:text-2xl font-semibold">
          Manage Testimonials
        </h2>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search testimonials..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-3 md:px-4 py-2 pl-3 md:pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
        />
        <div className="absolute inset-y-0 right-0 pr-3 md:right-auto md:left-0 md:pl-3 flex items-center pointer-events-none">
          <svg
            className="h-4 w-4 md:h-5 md:w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Testimonials List */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-gray-200">
          {filteredTestimonials.map((testimonial) => (
            <div key={testimonial._id} className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {testimonial.user?.name || "Anonymous"}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(testimonial.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-900 line-clamp-3">
                    {testimonial.content}
                  </p>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`h-4 w-4 md:h-5 md:w-5 ${
                        index < testimonial.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => handleDelete(testimonial._id)}
                    disabled={isDeleting}
                    className="text-red-600 hover:text-red-900 text-sm disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <table className="hidden md:table min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Content
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTestimonials.map((testimonial) => (
              <tr key={testimonial._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {testimonial.user?.name || "Anonymous"}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-md line-clamp-2">
                    {testimonial.content}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className={`h-5 w-5 ${
                          index < testimonial.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {new Date(testimonial.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleDelete(testimonial._id)}
                    disabled={isDeleting}
                    className="text-red-600 hover:text-red-900 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredTestimonials.length === 0 && (
          <div className="text-center py-8 md:py-12">
            <div className="text-gray-500">
              <svg
                className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              <p className="text-base md:text-lg font-medium">
                No testimonials found
              </p>
              <p className="text-sm mt-1">
                {searchTerm
                  ? "No testimonials match your search criteria."
                  : "No testimonials have been submitted yet."}
              </p>
            </div>
          </div>
        )}
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
  );
};

export default TestimonialsManager;
