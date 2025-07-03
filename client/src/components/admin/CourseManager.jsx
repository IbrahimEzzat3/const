import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { courseService } from "../../shared/services/courseService";
import debounce from "lodash/debounce";
import CustomAlert from "../../shared/components/CustomAlert";

const CourseManager = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
  const [alertConfig, setAlertConfig] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
    showCancelButton: false,
    onConfirm: null,
  });
  const itemsPerPage = 10;

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (term) => {
      if (!term.trim()) {
        await fetchCourses();
        return;
      }

      setIsSearching(true);
      try {
        const response = await courseService.searchCourses(term);
        setCourses(response.data);
        setCurrentPage(1);
        setTotalPages(1);
        setTotalCourses(response.data.length);
      } catch (err) {
        setError("Failed to search courses");
      } finally {
        setIsSearching(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    fetchCourses();
  }, [currentPage]);

  // Effect to trigger search when searchTerm changes
  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => debouncedSearch.cancel();
  }, [searchTerm, debouncedSearch]);

  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: itemsPerPage,
      };
      const response = await courseService.getAllCourses(params);

      if (response.success) {
        // Update pagination data from response
        setTotalPages(response.pages || 1);
        setTotalCourses(response.total || 0);
        setCourses(response.data || []);
      } else {
        setError("Failed to load courses");
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Failed to load courses");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
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
          await courseService.deleteCourse(id);
          setCourses((prev) => prev.filter((course) => course._id !== id));
          showAlert({
            type: "success",
            title: "Deleted!",
            message: "The course has been deleted.",
            showCancelButton: false,
            confirmButtonText: "OK",
          });
        } catch (err) {
          showAlert({
            type: "error",
            title: "Cannot Deleted!",
            message: "Failed to Delete This Course",
            showCancelButton: false,
            confirmButtonText: "OK",
          });
        } finally {
          setIsDeleting(false);
        }
      },
    });
  };

  // Add pagination handlers
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // VideoPreview component for per-video state
  const VideoPreview = ({ video }) => {
    const [videoError, setVideoError] = React.useState(false);
    const [videoLoading, setVideoLoading] = React.useState(true);
    const videoUrl = video
      ? `/uploads/${video}`
      : null;
    const handleVideoError = () => {
      setVideoError(true);
      setVideoLoading(false);
    };
    const handleVideoLoad = () => {
      setVideoLoading(false);
      setVideoError(false);
    };
    if (!video) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-indigo-100">
          <span className="text-indigo-500 text-lg font-medium">
            No Video
          </span>
        </div>
      );
    }
    return (
      <div className="relative h-16 w-24">
        {videoLoading && !videoError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
            <div className="text-gray-500">Loading video...</div>
          </div>
        )}
        {videoError ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-red-50 z-10">
            <span className="text-red-500 text-sm font-medium mb-2">
              Failed to load video
            </span>
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-gold text-xs underline"
            >
              Try direct link
            </a>
          </div>
        ) : (
          <video
            src={videoUrl}
            controls
            className="h-full w-full object-cover rounded-md"
            preload="metadata"
            onError={handleVideoError}
            onLoadedData={handleVideoLoad}
            onLoadStart={() => setVideoLoading(true)}
            crossOrigin="anonymous"
          >
            <source src={videoUrl} type="video/mp4" />
            <source src={videoUrl} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-gold"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={fetchCourses}
          className="text-accent-gold hover:text-accent-gold/90"
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
        <h2 className="text-xl md:text-2xl font-semibold text-accent-teal">Manage Courses</h2>
        <button
          onClick={() => navigate("/admin/courses/new")}
            className="w-full md:w-auto px-4 py-2 bg-accent-gold text-accent-teal rounded-md hover:bg-accent-gold/90 focus:outline-none focus:ring-2 focus:ring-accent-gold focus:ring-offset-2 text-sm md:text-base"
        >
          Create New Course
        </button>
      </div>

    

      {/* Search */}
      <div className="flex flex-col md:flex-row gap-3 md:gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-3 md:px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent text-sm md:text-base"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg
              className="h-4 w-4 md:h-5 md:w-5 text-black"
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
        {isSearching && (
          <div className="flex items-center justify-center md:px-4">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-accent-gold"></div>
          </div>
        )}
        {searchTerm && !isSearching && (
          <button
            onClick={() => {
              setSearchTerm("");
              fetchCourses();
            }}
            className="w-full md:w-auto px-4 py-2 text-accent-teal hover:text-accent-teal/90 text-sm md:text-base border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Clear
          </button>
        )}
      </div>

      {/* Courses List */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-gray-200">
          {courses.map((course) => {
            return (
              <div key={course._id} className="p-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <VideoPreview video={course.video} />
                  </div>
                  <div className="flex-shrink-0 h-16 w-24">
                    <img src={course.instructor.avatar} alt={course.instructor.name} className="h-full w-full object-cover rounded-md" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {course.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {course.instructor.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {course.shortDescription}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="text-xs text-gray-500">
                        {course.enrolledUsers?.length || 0} students
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(course.createdAt).toLocaleDateString()}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          course.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {course.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <div className="mt-3 flex gap-3">
                      <button
                        onClick={() =>
                          navigate(`/admin/courses/${course._id}/edit`)
                        }
                        className="text-accent-gold hover:text-accent-gold/90 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(course._id)}
                        disabled={isDeleting}
                        className="text-accent-gold hover:text-accent-gold/90 text-sm disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Table View */}
        <table className="hidden md:table min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Short Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Enrolled Students
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map((course) => {
              return (
                <tr key={course._id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-16 w-24">
                        <VideoPreview video={course.video} />
                      </div>
                      <div className="flex-shrink-0 h-16 w-24">
                        <img src={course.instructor.avatar} alt={course.instructor.name} className="h-full w-full object-cover rounded-md" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {course.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {course.instructor.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-md line-clamp-2">
                      {course.shortDescription.slice(0, 30)}...
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {course.enrolledUsers?.length || 0} students
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(course.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        course.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {course.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() =>
                        navigate(`/admin/courses/${course._id}/edit`)
                      }
                      className="text-accent-gold hover:text-accent-gold/90 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course._id)}
                      disabled={isDeleting}
                      className="text-accent-gold hover:text-accent-gold/90 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination */}
        {courses.length > 0 && (
          <div className="px-4 md:px-6 py-4 border-t border-gray-200">
            {/* Mobile Pagination */}
            <div className="flex flex-col md:hidden gap-3">
              <div className="text-sm text-gray-700 text-center">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="flex-1 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="flex-1 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>

            {/* Desktop Pagination */}
            <div className="hidden md:flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">
                    {(currentPage - 1) * itemsPerPage + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(currentPage * itemsPerPage, totalCourses)}
                  </span>{" "}
                  of <span className="font-medium">{totalCourses}</span> results
                </p>
              </div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === index + 1
                        ? "z-10 bg-accent-gold border-accent-gold text-accent-teal"
                        : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        )}

        {courses.length === 0 && (
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-base md:text-lg font-medium">
                No courses found
              </p>
              <p className="text-sm mt-1">
                Get started by creating your first course.
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

export default CourseManager;
