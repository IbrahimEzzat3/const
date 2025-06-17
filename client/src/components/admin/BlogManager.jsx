import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { blogService } from "../../shared/services/blogService";
import CustomAlert from "../../shared/components/CustomAlert";
import { Button } from "../ui";

const BlogManager = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [imageLoadStates, setImageLoadStates] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [alertConfig, setAlertConfig] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
    showCancelButton: false,
    onConfirm: null,
  });
  const itemsPerPage = 10;

  // Enhanced image URL function
  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      return null;
    }

    // If the path already includes the base URL, return as is
    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    let finalUrl;
    // Ensure proper URL construction
    if (imagePath.startsWith("/uploads/")) {
      finalUrl = `http://localhost:5000${imagePath}`;
    } else if (imagePath.startsWith("uploads/")) {
      finalUrl = `http://localhost:5000/${imagePath}`;
    } else {
      finalUrl = `http://localhost:5000/uploads/${imagePath}`;
    }

    return finalUrl;
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  useEffect(() => {
    fetchBlogs();
  }, [selectedCategory, currentPage]); // Add currentPage to dependencies

  const fetchBlogs = async () => {
    setIsLoading(true);
    setImageLoadStates({});

    try {
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        ...(selectedCategory && { category: selectedCategory }),
      };
      const response = await blogService.getAllBlogs(params);

      // Update pagination data from response
      setTotalPages(response.pages);
      setTotalBlogs(response.total);

      setBlogs(response.data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Failed to load blogs");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

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
          await blogService.deleteBlog(id);
          setBlogs((prev) => prev.filter((blog) => blog._id !== id));
          showAlert({
            type: "success",
            title: "Deleted!",
            message: "The blog has been deleted.",
            showCancelButton: false,
            confirmButtonText: "OK",
          });
        } catch (err) {
          showAlert({
            type: "error",
            title: "Cannot Delete!",
            message: "The blog Can't be delete",
            showCancelButton: false,
            confirmButtonText: "OK",
          });
        } finally {
          setIsDeleting(false);
        }
      },
    });
  };

  // Component to handle individual image rendering
  const BlogImage = ({ blog }) => {
    const imageUrl = getImageUrl(blog.coverImage);
    const loadState = imageLoadStates[blog._id];

    if (loadState === "loading") {
      return (
        <div className="h-16 w-24 bg-gray-100 rounded-md flex items-center justify-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
        </div>
      );
    }

    return blog.coverImage ? (
      <img
        src={imageUrl}
        alt={blog.title}
        className="h-16 w-24 object-cover rounded-md"
        loading="lazy"
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
    ) : (
      <div className="h-16 w-24 bg-gray-200 rounded-md flex items-center justify-center">
        <span className="text-gray-400 text-xs">No image</span>
      </div>
    );
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

  if (isLoading) {
    return (
      <main className="flex justify-center items-center min-h-[400px]">
        <div
          className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"
          role="status"
          aria-label="Loading blogs"
        >
          <span className="sr-only">Loading blogs...</span>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="text-center py-12">
        <p className="text-red-500 mb-4" role="alert">
          {error}
        </p>
        <button
          onClick={fetchBlogs}
          className="text-indigo-600 hover:text-indigo-500"
          aria-label="Retry loading blogs"
        >
          Try Again
        </button>
      </main>
    );
  }

  return (
    <main className="space-y-4 md:space-y-6 px-2 md:px-0">
      <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0">
        <h1 className="text-xl md:text-2xl font-semibold">Manage Blogs</h1>
        <Button
          variant="primary"
          onClick={() => navigate("/admin/blogs/new")}
          className="w-full md:w-auto"
          aria-label="Create new blog post"
        >
          Create New Blog
        </Button>
      </header>

      <nav aria-label="Blog filters">
        <form
          className="flex flex-col md:flex-row gap-3 md:gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="w-full md:w-64">
            <label
              htmlFor="category-filter"
              className="block text-sm font-medium text-gray-700 mb-1 md:mb-0 md:sr-only"
            >
              Filter by category
            </label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
              aria-label="Filter blogs by category"
            >
              <option value="">All Categories</option>
              <option value="construction">Construction</option>
              <option value="architecture">Architecture</option>
              <option value="interior-design">Interior Design</option>
              <option value="renovation">Renovation</option>
              <option value="sustainability">Sustainability</option>
              <option value="industry-news">Industry News</option>
            </select>
          </div>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory("")}
              className="w-full md:w-auto px-4 py-2 text-gray-600 hover:text-gray-800 text-sm md:text-base border border-gray-300 rounded-md hover:bg-gray-50"
              aria-label="Clear category filter"
            >
              Clear Filter
            </button>
          )}
        </form>
      </nav>

      <section aria-label="Blog posts list" className="overflow-x-auto">
        {blogs.length === 0 ? (
          <article className="text-center py-8">
            <p className="text-gray-500 text-sm md:text-base">No blogs found</p>
          </article>
        ) : (
          <div className="min-w-full divide-y divide-gray-200">
            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <BlogImage blog={blog} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {blog.title}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                        {blog.excerpt}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="px-2 py-1 text-xs font-medium text-gray-800 bg-gray-100 rounded-full">
                          {blog.category}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            blog.isPublished
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {blog.isPublished ? "Published" : "Draft"}
                        </span>
                      </div>
                      <div className="mt-3 flex gap-3">
                        <button
                          onClick={() =>
                            navigate(`/admin/blogs/${blog._id}/edit`)
                          }
                          className="text-indigo-600 hover:text-indigo-900 text-sm"
                          aria-label={`Edit blog post: ${blog.title}`}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="text-red-600 hover:text-red-900 text-sm"
                          disabled={isDeleting}
                          aria-label={`Delete blog post: ${blog.title}`}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <table className="hidden md:table min-w-full">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogs.map((blog) => (
                  <tr key={blog._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <BlogImage blog={blog} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {blog.title}
                      </div>
                      <div className="text-sm text-gray-500 line-clamp-2">
                        {blog.excerpt}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium text-gray-800 bg-gray-100 rounded-full">
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          blog.isPublished
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {blog.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() =>
                          navigate(`/admin/blogs/${blog._id}/edit`)
                        }
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                        aria-label={`Edit blog post: ${blog.title}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="text-red-600 hover:text-red-900"
                        disabled={isDeleting}
                        aria-label={`Delete blog post: ${blog.title}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {totalPages > 1 && (
        <nav
          aria-label="Blog pagination"
          className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-2"
        >
          <Button
            variant="outline"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="w-full md:w-24"
            aria-label="Previous page"
          >
            Previous
          </Button>
          <span className="px-3 py-2 text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="w-full md:w-24"
            aria-label="Next page"
          >
            Next
          </Button>
        </nav>
      )}

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
    </main>
  );
};

export default BlogManager;
