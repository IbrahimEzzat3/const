import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { blogService } from "../../shared/services/blogService";
import CustomAlert from "../../shared/components/CustomAlert";

const BlogForm = ({ isEdit = false, blogId = null }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [backendErrors, setBackendErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [alertConfig, setAlertConfig] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
    showCancelButton: false,
    onConfirm: null,
  });
  const [initialValues, setInitialValues] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    tags: [],
    coverImage: null,
    isPublished: true,
  });
  const [tagInput, setTagInput] = useState("");

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .min(5, "Title must be at least 5 characters")
      .max(100, "Title cannot be more than 100 characters"),
    content: Yup.string()
      .required("Content is required")
      .min(50, "Content must be at least 50 characters"),
    excerpt: Yup.string().max(200, "Excerpt must not exceed 200 characters"),
    category: Yup.string().required("Category is required"),
    tags: Yup.array().of(Yup.string()),
    isPublished: Yup.boolean(),
  });

  useEffect(() => {
    if (isEdit && blogId) {
      fetchBlog();
    }
    // Cleanup preview URL when component unmounts
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [isEdit, blogId]);

  const fetchBlog = async () => {
    try {
      const response = await blogService.getBlog(blogId);
      const blog = response.data;
      setInitialValues({
        title: blog.title,
        content: blog.content,
        excerpt: blog.excerpt || "",
        category: blog.category,
        tags: blog.tags || [],
        coverImage: null,
        isPublished: blog.isPublished,
      });
      // Set image preview if blog has a cover image
      if (blog.coverImage) {
        setImagePreview(blog.coverImage);
      }
    } catch (error) {
      navigate("/admin/blogs");
    }
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

  const handleDelete = async () => {
    showAlert({
      type: "warning",
      title: "Are you sure?",
      message: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      onConfirm: async () => {
        try {
          setIsLoading(true);
          await blogService.deleteBlog(blogId);
          navigate("/admin/blogs");
        } catch (error) {
          showAlert({
            type: "error",
            title: "Can't Delete",
            message: "You Can't Delete This Blog!",
            showCancelButton: false,
            confirmButtonText: "Ok!",
          });
        } finally {
          setIsLoading(false);
        }
      },
    });
  };

  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        event.target.value = "";
        return;
      }
      if (!file.type.startsWith("image/")) {
        event.target.value = "";
        return;
      }
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      formik.setFieldValue("coverImage", file);
    }
  };

  const addTag = () => {
    const newTag = tagInput.trim().toLowerCase();

    formik.setFieldValue(
      "tags",
      [...formik.values.tags, newTag].filter(
        (tag, index, self) => self.indexOf(tag) === index
      )
    );
    setTagInput(""); // Clear input after adding
  };

  const handleTagKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const removeTag = (tagToRemove) => {
    formik.setFieldValue(
      "tags",
      formik.values.tags.filter((tag) => tag !== tagToRemove)
    );
  };

  const getErrorMessage = (fieldName) =>
    formik.touched[fieldName] && (
      <p className="text-red-500 text-sm mt-1">{formik.errors[fieldName]}</p>
    );

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        setBackendErrors({});

        const formData = new FormData();

        // Append all form fields to FormData
        Object.keys(values).forEach((key) => {
          if (key === "tags") {
            // Always stringify tags array
            formData.append(key, JSON.stringify(values[key] || []));
          } else if (key === "coverImage" && values[key]) {
            formData.append(key, values[key]);
          } else if (
            values[key] !== null &&
            values[key] !== undefined &&
            key !== "coverImage"
          ) {
            formData.append(key, String(values[key]));
          }
        });

        if (isEdit) {
          await blogService.updateBlog(blogId, formData);
        } else {
          await blogService.createBlog(formData);
        }

        showAlert({
          type: "success",
          title: isEdit ? "Blog Updated!" : "Blog Created!",
          message: isEdit
            ? "The blog has been updated successfully."
            : "The blog has been created successfully.",
          showCancelButton: true,
          confirmButtonText: "Go to Blogs",
          cancelButtonText: "Stay Here",
          onConfirm: () => navigate("/admin/blogs"),
        });
      } catch (error) {
        console.error("Error submitting form:", error);
        if (error.response?.data?.errors) {
          const errors = error.response.data.errors;
          const formattedErrors = {};
          errors.forEach((err) => {
            formattedErrors[err.path] = err.msg;
          });
          setBackendErrors(formattedErrors);
        } else if (error.response?.data?.error) {
          console.error(error.response.data.error);
        } else {
          console.error("An error occurred while saving the blog");
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-primary-800 mb-6">
        {isEdit ? "Edit Blog Post" : "Create New Blog Post"}
      </h1>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-primary-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            {...formik.getFieldProps("title")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            aria-describedby="title-error"
          />
          {getErrorMessage("title")}
        </div>

        {/* Excerpt */}
        <div>
          <label
            htmlFor="excerpt"
            className="block text-sm font-medium text-primary-700"
          >
            Excerpt (Optional)
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            {...formik.getFieldProps("excerpt")}
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          ></textarea>
          {getErrorMessage("excerpt")}
        </div>

        {/* Content */}
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-primary-700"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            {...formik.getFieldProps("content")}
            rows="10"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            aria-describedby="content-error"
          ></textarea>
          {getErrorMessage("content")}
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-primary-700"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            {...formik.getFieldProps("category")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="">Select a category</option>
            <option value="interior-design">Interior Design</option>
            <option value="construction">Construction</option>
            <option value="sustainability">Sustainability</option>
            <option value="architecture">Architecture</option>
            <option value="renovation">Renovation</option>
            <option value="industry-news">Industry News</option>
          </select>
          {getErrorMessage("category")}
        </div>

        {/* Tags */}
        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-primary-700 mb-2"
          >
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formik.values.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-primary-100 px-3 py-0.5 text-sm font-medium text-primary-800"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="bg-transparent "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              id="tags"
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleTagKeyPress}
              placeholder="Enter tag name"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
            <button
              type="button"
              onClick={addTag}
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Add
            </button>
          </div>
        </div>

        {/* Cover Image */}
        <div>
          <label
            htmlFor="coverImage"
            className="block text-sm font-medium text-primary-700"
          >
            Cover Image
          </label>
          <div className="mt-1 flex items-center space-x-4">
            {imagePreview ? (
              <div className="relative h-24 w-24 rounded-md overflow-hidden">
                <img
                  src={
                    imagePreview.startsWith("http") ||
                    imagePreview.startsWith("/uploads")
                      ? `http://localhost:5000${imagePreview}`
                      : URL.createObjectURL(formik.values.coverImage)
                  }
                  alt="Cover Preview"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  crossOrigin="anonymous"
                  referrerPolicy="no-referrer"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    formik.setFieldValue("coverImage", null);
                    // Clear the input field to allow re-uploading the same file if needed
                    document.getElementById("coverImage").value = "";
                  }}
                  className="absolute top-1 right-1 rounded-full bg-black bg-opacity-50 p-1 text-white hover:bg-opacity-75"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l1.5 1.5 6-6m2.25 2.25l2.25 2.25m-4.5-4.5l5.25-5.25M12 18V4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            )}
            <input
              type="file"
              id="coverImage"
              name="coverImage"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
            />
          </div>
        </div>

        {/* Is Published Checkbox */}
        <div className="flex items-center">
          <input
            id="isPublished"
            name="isPublished"
            type="checkbox"
            {...formik.getFieldProps("isPublished")}
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <label
            htmlFor="isPublished"
            className="ml-2 block text-sm text-primary-900"
          >
            Published
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          {isEdit && (
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              disabled={isLoading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.927a2.25 2.25 0 01-2.244-2.077L4.78 6.75m14.453 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.679-.114 1.022-.165m-1.022.165L4.78 6.75m14.453 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.679-.114 1.022-.165M12 2.25a.75.75 0 01.75.75v.75H11.25V3a.75.75 0 01.75-.75z"
                />
              </svg>
              Delete
            </button>
          )}
          <button
            type="submit"
            className="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {isEdit ? "Update Blog" : "Create Blog"}
              </>
            )}
          </button>
        </div>
      </form>

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

export default React.memo(BlogForm);
