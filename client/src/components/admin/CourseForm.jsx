import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { courseService } from "../../shared/services/courseService";
import Swal from "sweetalert2";

const CourseForm = ({ isEdit = false, courseId = null }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [backendErrors, setBackendErrors] = useState({});
  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    shortDescription: "",
    price: "",
    duration: "",
    level: "",
    category: "",
    requirements: [],
    objectives: [],
    modules: [],
    video: null,
    isActive: true,
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string()
      .required("Description is required")
      .min(50, "Description must be at least 50 characters long"),
    shortDescription: Yup.string()
      .required("Short description is required")
      .max(200, "Short description must not exceed 200 characters"),
    price: Yup.number()
      .min(0, "Price must be positive")
      .required("Price is required"),
    duration: Yup.number()
      .min(1, "Duration must be at least 1 hour")
      .required("Duration is required"),
    level: Yup.string().required("Level is required"),
    category: Yup.string().required("Category is required"),
    requirements: Yup.array().of(Yup.string()),
    objectives: Yup.array().of(Yup.string()),
    modules: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required("Module title is required"),
        description: Yup.string().nullable(),
        duration: Yup.number().min(0, "Duration must be positive").nullable(),
        videoUrl: Yup.string().url("Must be a valid URL").nullable(),
      })
    ),
    video: Yup.mixed()
      .nullable()
      .test(
        "fileType",
        "Only video files are allowed",
        (value) =>
          !value || (value && value.type && value.type.startsWith("video/"))
      ),
    isActive: Yup.boolean(),
  });

  useEffect(() => {
    if (isEdit && courseId) {
      fetchCourse();
    }
  }, [isEdit, courseId]);

  const fetchCourse = async () => {
    try {
      const response = await courseService.getCourse(courseId);
      const course = response.data;
      setInitialValues({
        title: course.title,
        description: course.description,
        shortDescription: course.shortDescription,
        price: course.price,
        duration: course.duration,
        level: course.level,
        category: course.category,
        requirements: course.requirements || [],
        objectives: course.objectives || [],
        modules: course.modules || [],
        video: null,
        isActive: course.isActive ?? true,
      });
    } catch (error) {
      navigate("/admin/courses");
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        setBackendErrors({});

        const formData = new FormData();

        // Append basic fields
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("shortDescription", values.shortDescription);
        formData.append("price", Number(values.price));
        formData.append("duration", Number(values.duration));
        formData.append("level", values.level);
        formData.append("category", values.category);
        formData.append("isActive", values.isActive);

        // Handle arrays - ensure they're properly stringified
        formData.append(
          "requirements",
          JSON.stringify(values.requirements || [])
        );
        formData.append("objectives", JSON.stringify(values.objectives || []));

        // Handle modules with explicit structure validation
        const processedModules = (values.modules || []).map((module) => {
          const processedModule = {
            title: module.title || "",
            description: module.description || null,
            duration: module.duration ? Number(module.duration) : null,
            videoUrl: module.videoUrl || null,
          };
          return processedModule;
        });

        formData.append("modules", JSON.stringify(processedModules));

        // Handle video
        if (values.video instanceof File) {
          formData.append("video", values.video);
        }

        if (isEdit) {
          await courseService.updateCourse(courseId, formData);
        } else {
          await courseService.createCourse(formData);
        }

        // Show success message with SweetAlert2
        await Swal.fire({
          icon: "success",
          title: isEdit ? "Course Updated!" : "Course Created!",
          text: isEdit
            ? "The course has been updated successfully."
            : "The course has been created successfully.",
          confirmButtonText: "Go to Courses",
          showCancelButton: true,
          cancelButtonText: "Stay Here",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/admin/courses");
          }
        });
      } catch (error) {
        console.error("Full error object:", error);
        console.error("Error response:", error.response);
        console.error("Error response data:", error.response?.data);

        if (error.response?.data?.errors) {
          // Handle validation errors from backend
          const errors = error.response.data.errors;
          const formattedErrors = {};
          errors.forEach((err) => {
            formattedErrors[err.path] = err.msg;
          });
          setBackendErrors(formattedErrors);
        } else {
          const errorMessage =
            error.response?.data?.message ||
            error.response?.data?.error ||
            error.message ||
            "An error occurred";
          console.error(errorMessage);

          // Show error alert
          await Swal.fire({
            icon: "error",
            title: "Error!",
            text: errorMessage,
            confirmButtonText: "OK",
          });
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        setIsLoading(true);
        await courseService.deleteCourse(courseId);
        await Swal.fire("Deleted!", "The course has been deleted.", "success");
        navigate("/admin/courses");
      } catch (error) {
        console.error(error.response?.data?.error || "Failed to delete course");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleVideoChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        // 50MB limit for video
        Swal.fire({
          icon: "error",
          title: "File too large",
          text: "Please select a video smaller than 50MB",
        });
        return;
      }
      if (!file.type.startsWith("video/")) {
        Swal.fire({
          icon: "error",
          title: "Invalid file type",
          text: "Please select a valid video file",
        });
        return;
      }
      formik.setFieldValue("video", file);
    }
  };

  const addArrayItem = async (field) => {
    const { value: newItem } = await Swal.fire({
      title: `Add ${field.slice(0, -1)}`,
      input: "text",
      inputLabel: `Enter new ${field.slice(0, -1)}`,
      inputPlaceholder: `Type your ${field.slice(0, -1)} here`,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "This field is required!";
        }
      },
    });

    if (newItem) {
      formik.setFieldValue(field, [...formik.values[field], newItem]);
    }
  };

  const removeArrayItem = async (field, index) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    });

    if (result.isConfirmed) {
      const newArray = [...formik.values[field]];
      newArray.splice(index, 1);
      formik.setFieldValue(field, newArray);
    }
  };

  const addModule = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Add New Module",
      html:
        '<input id="swal-title" class="swal2-input" placeholder="Module Title">' +
        '<textarea id="swal-description" class="swal2-textarea" placeholder="Module Description (optional)"></textarea>' +
        '<input id="swal-duration" class="swal2-input" type="number" placeholder="Duration in minutes (optional)">' +
        '<input id="swal-videoUrl" class="swal2-input" placeholder="Video URL (optional)">',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Add Module",
      cancelButtonText: "Cancel",
      width: "600px",
      preConfirm: () => {
        const title = document.getElementById("swal-title").value;
        const description = document.getElementById("swal-description").value;
        const duration = parseInt(
          document.getElementById("swal-duration").value
        );
        const videoUrl = document.getElementById("swal-videoUrl").value;

        if (!title) {
          Swal.showValidationMessage("Module title is required");
          return false;
        }

        if (
          videoUrl &&
          !videoUrl.startsWith("http://") &&
          !videoUrl.startsWith("https://")
        ) {
          Swal.showValidationMessage(
            "Video URL must start with http:// or https://"
          );
          return false;
        }

        return {
          title,
          description: description || null,
          duration: isNaN(duration) ? null : duration,
          videoUrl: videoUrl || null,
        };
      },
    });

    if (formValues) {
      formik.setFieldValue("modules", [...formik.values.modules, formValues]);
    }
  };

  const editModule = async (moduleIndex) => {
    const moduleToEdit = formik.values.modules[moduleIndex];

    const { value: formValues } = await Swal.fire({
      title: "Edit Module",
      html:
        `<input id="swal-title" class="swal2-input" placeholder="Module Title" value="${moduleToEdit.title}">` +
        `<textarea id="swal-description" class="swal2-textarea" placeholder="Module Description (optional)">${
          moduleToEdit.description || ""
        }</textarea>` +
        `<input id="swal-duration" class="swal2-input" type="number" placeholder="Duration in minutes (optional)" value="${
          moduleToEdit.duration || ""
        }">` +
        `<input id="swal-videoUrl" class="swal2-input" placeholder="Video URL (optional)" value="${
          moduleToEdit.videoUrl || ""
        }">`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Save Changes",
      cancelButtonText: "Cancel",
      width: "600px",
      preConfirm: () => {
        const title = document.getElementById("swal-title").value;
        const description = document.getElementById("swal-description").value;
        const duration = parseInt(
          document.getElementById("swal-duration").value
        );
        const videoUrl = document.getElementById("swal-videoUrl").value;

        if (!title) {
          Swal.showValidationMessage("Module title is required");
          return false;
        }

        if (
          videoUrl &&
          !videoUrl.startsWith("http://") &&
          !videoUrl.startsWith("https://")
        ) {
          Swal.showValidationMessage(
            "Video URL must start with http:// or https://"
          );
          return false;
        }

        return {
          title,
          description: description || null,
          duration: isNaN(duration) ? null : duration,
          videoUrl: videoUrl || null,
        };
      },
    });

    if (formValues) {
      const updatedModules = [...formik.values.modules];
      updatedModules[moduleIndex] = formValues;
      formik.setFieldValue("modules", updatedModules);
    }
  };

  const getFieldError = (fieldName) => {
    return (
      formik.touched[fieldName] &&
      (formik.errors[fieldName] || backendErrors[fieldName])
    );
  };

  const getErrorMessage = (fieldName) => {
    return (
      formik.touched[fieldName] &&
      (formik.errors[fieldName] || backendErrors[fieldName])
    );
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-4 md:space-y-6 px-2 md:px-0"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            {...formik.getFieldProps("title")}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm md:text-base ${
              getFieldError("title") ? "border-red-300" : "border-gray-300"
            }`}
          />
          {getFieldError("title") && (
            <div className="text-red-500 text-xs md:text-sm mt-1">
              {getErrorMessage("title")}
            </div>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            {...formik.getFieldProps("price")}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm md:text-base ${
              getFieldError("price") ? "border-red-300" : "border-gray-300"
            }`}
          />
          {getFieldError("price") && (
            <div className="text-red-500 text-xs md:text-sm mt-1">
              {getErrorMessage("price")}
            </div>
          )}
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Duration
          </label>
          <input
            type="text"
            name="duration"
            {...formik.getFieldProps("duration")}
            placeholder="e.g., 100 hours"
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm md:text-base ${
              getFieldError("duration") ? "border-red-300" : "border-gray-300"
            }`}
          />
          {getFieldError("duration") && (
            <div className="text-red-500 text-xs md:text-sm mt-1">
              {getErrorMessage("duration")}
            </div>
          )}
        </div>

        {/* Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Level
          </label>
          <select
            name="level"
            {...formik.getFieldProps("level")}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm md:text-base ${
              getFieldError("level") ? "border-red-300" : "border-gray-300"
            }`}
          >
            <option value="">Select Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          {getFieldError("level") && (
            <div className="text-red-500 text-xs md:text-sm mt-1">
              {getErrorMessage("level")}
            </div>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            {...formik.getFieldProps("category")}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm md:text-base ${
              getFieldError("category") ? "border-red-300" : "border-gray-300"
            }`}
          >
            <option value="">Select Category</option>
            <option value="construction-basics">construction-basics</option>
            <option value="project-management">project-management</option>
            <option value="safety-training">safety-training</option>
            <option value="technical-skills">technical-skills</option>
            <option value="certification">certification</option>
          </select>
          {getFieldError("category") && (
            <div className="text-red-500 text-xs md:text-sm mt-1">
              {getErrorMessage("category")}
            </div>
          )}
        </div>

        {/* Video */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Course Video
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            className={`mt-1 block w-full ${
              backendErrors.video ? "border-red-300" : ""
            }`}
          />
          {backendErrors.video && (
            <div className="text-red-500 text-xs md:text-sm mt-1">
              {backendErrors.video}
            </div>
          )}
        </div>

        {/* Status Toggle */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between p-3 md:p-4 bg-gray-50 rounded-lg space-y-2 md:space-y-0">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Course Status
              </label>
              <p className="text-xs md:text-sm text-gray-500">
                {formik.values.isActive
                  ? "Active courses are visible to students"
                  : "Inactive courses are hidden from students"}
              </p>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() =>
                  formik.setFieldValue("isActive", !formik.values.isActive)
                }
                className={`${
                  formik.values.isActive ? "bg-indigo-600" : "bg-gray-200"
                } relative inline-flex h-5 w-10 md:h-6 md:w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
              >
                <span
                  className={`${
                    formik.values.isActive
                      ? "translate-x-5 md:translate-x-6"
                      : "translate-x-1"
                  } inline-block h-3 w-3 md:h-4 md:w-4 transform rounded-full bg-white transition-transform`}
                />
              </button>
              <span className="ml-2 md:ml-3 text-xs md:text-sm font-medium text-gray-900">
                {formik.values.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Short Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Short Description
        </label>
        <textarea
          name="shortDescription"
          {...formik.getFieldProps("shortDescription")}
          rows="2"
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm md:text-base ${
            getFieldError("shortDescription")
              ? "border-red-300"
              : "border-gray-300"
          }`}
        />
        {getFieldError("shortDescription") && (
          <div className="text-red-500 text-xs md:text-sm mt-1">
            {getErrorMessage("shortDescription")}
          </div>
        )}
      </div>

      {/* Full Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Full Description
        </label>
        <textarea
          name="description"
          {...formik.getFieldProps("description")}
          rows="4"
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm md:text-base ${
            getFieldError("description") ? "border-red-300" : "border-gray-300"
          }`}
        />
        {getFieldError("description") && (
          <div className="text-red-500 text-xs md:text-sm mt-1">
            {getErrorMessage("description")}
          </div>
        )}
      </div>

      {/* Requirements */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Requirements
        </label>
        <div className="mt-2 space-y-2">
          {formik.values.requirements.map((req, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-gray-50 p-2 rounded-md"
            >
              <span className="flex-1 text-sm">{req}</span>
              <button
                type="button"
                onClick={() => removeArrayItem("requirements", index)}
                className="text-red-500 hover:text-red-700 text-xs md:text-sm px-2 py-1"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("requirements")}
            className="text-indigo-600 hover:text-indigo-500 text-sm md:text-base flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 md:h-5 md:w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add Requirement
          </button>
          {backendErrors.requirements && (
            <div className="text-red-500 text-xs md:text-sm mt-1">
              {backendErrors.requirements}
            </div>
          )}
        </div>
      </div>

      {/* Objectives */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Learning Objectives
        </label>
        <div className="mt-2 space-y-2">
          {formik.values.objectives.map((obj, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-gray-50 p-2 rounded-md"
            >
              <span className="flex-1 text-sm">{obj}</span>
              <button
                type="button"
                onClick={() => removeArrayItem("objectives", index)}
                className="text-red-500 hover:text-red-700 text-xs md:text-sm px-2 py-1"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("objectives")}
            className="text-indigo-600 hover:text-indigo-500 text-sm md:text-base flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 md:h-5 md:w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add Objective
          </button>
          {backendErrors.objectives && (
            <div className="text-red-500 text-xs md:text-sm mt-1">
              {backendErrors.objectives}
            </div>
          )}
        </div>
      </div>

      {/* Modules */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Modules
        </label>
        <div className="mt-2 space-y-3 md:space-y-4">
          {formik.values.modules.map((module, index) => (
            <div
              key={index}
              className="border p-3 md:p-4 rounded-md bg-gray-50"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0 mb-2">
                <h4 className="font-semibold text-gray-800 text-sm md:text-base">
                  {module.title}
                </h4>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => editModule(index)}
                    className="text-indigo-600 hover:text-indigo-500 text-xs md:text-sm px-2 py-1 bg-white rounded-md border border-indigo-200"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => removeArrayItem("modules", index)}
                    className="text-red-500 hover:text-red-700 text-xs md:text-sm px-2 py-1 bg-white rounded-md border border-red-200"
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Module Details */}
              <div className="space-y-2 text-sm text-gray-600">
                {module.description && (
                  <p className="text-secondary-600 mb-4">
                    {module.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-4 text-xs">
                  {module.duration && (
                    <div className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{module.duration} minutes</span>
                    </div>
                  )}

                  {module.videoUrl && (
                    <div className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      <a
                        href={module.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-500 hover:underline"
                      >
                        Watch Video
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addModule()}
            className="text-indigo-600 hover:text-indigo-500 flex items-center gap-1 text-sm md:text-base"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 md:h-5 md:w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add Module
          </button>
          {backendErrors.modules && (
            <div className="text-red-500 text-xs md:text-sm mt-1">
              {getErrorMessage("modules")}
            </div>
          )}
        </div>
      </div>

      {/* Submit and Delete Buttons */}
      <div className="flex flex-col md:flex-row md:justify-between gap-3 md:gap-4 pt-4">
        <div className="flex flex-col md:flex-row gap-3 md:gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full md:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 text-sm md:text-base"
          >
            {isLoading
              ? "Saving..."
              : isEdit
              ? "Update Course"
              : "Create Course"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/courses")}
            className="w-full md:w-auto px-4 py-2 border border-gray-300 text-white rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm md:text-base bg-indigo-600"
          >
            Cancel
          </button>
        </div>
        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={isLoading}
            className="w-full md:w-auto px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 text-sm md:text-base"
          >
            Delete Course
          </button>
        )}
      </div>
    </form>
  );
};

export default CourseForm;
