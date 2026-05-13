import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { courseService } from "../../shared/services/courseService";
import { useAuth } from "../../shared/context/AuthContext";
import FeedbackForm from "../ui/FeedbackForm";
import StarRating from "../ui/StarRating";
import { useLanguage } from "../../shared/context/LanguageContext";
import CustomAlert from "../../shared/components/CustomAlert";

// Custom SVG Icons
const ClockIcon = ({ className = "h-5 w-5", direction }) => (
  <svg
    className={`${className} ${direction === "rtl" ? "ml-2" : "mr-2"}`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 6V12L16 14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BookIcon = ({ className = "h-5 w-5", direction }) => (
  <svg
    className={`${className} ${direction === "rtl" ? "ml-2" : "mr-2"}`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 19.5V4.5C4 3.67157 4.67157 3 5.5 3H18.5C19.3284 3 20 3.67157 20 4.5V19.5C20 20.3284 19.3284 21 18.5 21H5.5C4.67157 21 4 20.3284 4 19.5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 16H20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 3V21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ListIcon = ({ className = "h-5 w-5", direction }) => (
  <svg
    className={`${className} ${direction === "rtl" ? "ml-2" : "mr-2"}`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 6H21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 12H21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 18H21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 6H3.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 12H3.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 18H3.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BullseyeIcon = ({ className = "h-5 w-5", direction }) => (
  <svg
    className={`${className} ${direction === "rtl" ? "ml-2" : "mr-2"}`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [isDeletingFeedback, setIsDeletingFeedback] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState({
    isOpen: false,
    feedbackId: null,
  });
  const { t } = useLanguage();
  const [showEnrollForm, setShowEnrollForm] = useState(false);
  const [enrollFields, setEnrollFields] = useState({
    startDate: "",
    courseLanguage: "",
    package: "",
    // Personal Info
    fullNameAr: user?.name || "",
    fullNameEn: "",
    birthDate: "",
    email: user?.email || "",
    phone: user?.phone || "",
    nationality: "",
    city: "",
    // Academic Qualifications
    degree: "",
    major: "",
    university: "",
    // Work Experience
    currentJob: "",
    company: "",
    yearsExperience: "",
    // Scholarship
    wantScholarship: "",
    scholarshipReason: "",
    // Payment
    paymentMethod: "",
    // Agreement
    agree: false,
  });
  const [enrollFieldErrors, setEnrollFieldErrors] = useState({});
  const enrollFormRef = useRef(null);
  const [enrollSuccess, setEnrollSuccess] = useState(false);
  const [enrollError, setEnrollError] = useState("");

  const fetchCourseData = useCallback(async () => {
    try {
      const data = await courseService.getCourse(courseId);

      setCourse(data.data);
      // Update enrollment status based on fresh data
      if (user && data.data.enrolledUsers) {
        const isUserEnrolled = data.data.enrolledUsers.some(
          (enrollment) => enrollment.user === user.id
        );
        setIsEnrolled(isUserEnrolled);
      } else {
        // If no user or no enrolledUsers data, assume not enrolled
        setIsEnrolled(false);
      }
    } catch (err) {
      setError(t("courseDetail.loadError"));
    } finally {
      setIsLoading(false);
    }
  }, [courseId, user, t]);

  // Initial fetch of course data
  useEffect(() => {
    fetchCourseData();
  }, [fetchCourseData]);

  // Poll for course updates every 30 seconds
  useEffect(() => {
    const pollInterval = setInterval(() => {
      fetchCourseData();
    }, 30000); // 30 seconds

    return () => clearInterval(pollInterval);
  }, [fetchCourseData]);

  const handleEnroll = async () => {
    if (!course) {
      navigate("/");
      return;
    }
    if (!isEnrolled) {
      setShowEnrollForm(true);
      return;
    }
    setIsEnrolling(true);
    try {
      await courseService.unenrollFroCourse(courseId);
      await fetchCourseData();
    } catch (err) {
      const errorMessage =
        err?.response?.data?.error || t("courseDetail.enrollError");
      setError(errorMessage);
    } finally {
      setIsEnrolling(false);
    }
  };

  const handleEnrollFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEnrollFields((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEnrollFormSubmit = async (e) => {
    e.preventDefault();
    // Manual validation
    const errors = {};
    if (!enrollFields.startDate) errors.startDate = t("common.required");
    if (!enrollFields.courseLanguage)
      errors.courseLanguage = t("common.required");
    if (!enrollFields.package) errors.package = t("common.required");
    if (!enrollFields.fullNameAr) errors.fullNameAr = t("common.required");
    if (!enrollFields.fullNameEn) errors.fullNameEn = t("common.required");
    if (!enrollFields.birthDate) errors.birthDate = t("common.required");
    if (!enrollFields.email) errors.email = t("common.required");
    if (!enrollFields.phone) errors.phone = t("common.required");
    if (!enrollFields.nationality) errors.nationality = t("common.required");
    if (!enrollFields.city) errors.city = t("common.required");
    if (!enrollFields.degree) errors.degree = t("common.required");
    if (!enrollFields.major) errors.major = t("common.required");
    if (!enrollFields.university) errors.university = t("common.required");
    if (!enrollFields.currentJob) errors.currentJob = t("common.required");
    if (!enrollFields.company) errors.company = t("common.required");
    if (!enrollFields.yearsExperience)
      errors.yearsExperience = t("common.required");
    if (!enrollFields.wantScholarship)
      errors.wantScholarship = t("common.required");
    if (
      enrollFields.wantScholarship === "yes" &&
      !enrollFields.scholarshipReason
    )
      errors.scholarshipReason = t("common.required");
    if (!enrollFields.paymentMethod)
      errors.paymentMethod = t("common.required");
    if (!enrollFields.agree) errors.agree = t("common.required");
    setEnrollFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      // Scroll to form and focus first error field
      if (enrollFormRef.current) {
        enrollFormRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        const firstErrorField = Object.keys(errors)[0];
        const errorInput = enrollFormRef.current.querySelector(
          `[name="${firstErrorField}"]`
        );
        if (errorInput) errorInput.focus();
      }
      return;
    }
    setIsEnrolling(true);
    setEnrollSuccess(false);
    setEnrollError("");
    try {
      await courseService.enrollInCourse(courseId, enrollFields);

      setShowEnrollForm(false);
      setEnrollSuccess(true);
      setEnrollFields({
        startDate: "",
        courseLanguage: "",
        package: "",
        fullNameAr: user?.name || "",
        fullNameEn: "",
        birthDate: "",
        email: user?.email || "",
        phone: "",
        nationality: "",
        city: "",
        degree: "",
        major: "",
        university: "",
        currentJob: "",
        company: "",
        yearsExperience: "",
        wantScholarship: "",
        scholarshipReason: "",
        paymentMethod: "",
        agree: false,
      });
      await fetchCourseData();
    } catch (err) {
      const errorMessage =
        err?.response?.data?.error || t("courseDetail.enrollError");
      setEnrollError(errorMessage);
      if (enrollFormRef.current) {
        enrollFormRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    } finally {
      setIsEnrolling(false);
    }
  };

  const handleFeedbackSubmit = async (feedbackData) => {
    setIsSubmittingFeedback(true);
    try {
      await courseService.addFeedback(courseId, feedbackData);
      // Refresh course data to show new feedback
      const data = await courseService.getCourse(courseId);
      setCourse(data.data);
    } catch (err) {
      setError(t("courseDetail.feedbackError"));
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  const handleDeleteFeedback = (feedbackId) => {
    setDeleteAlert({
      isOpen: true,
      feedbackId,
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteAlert.feedbackId) return;

    setIsDeletingFeedback(true);
    try {
      await courseService.deleteFeedback(courseId, deleteAlert.feedbackId);
      const data = await courseService.getCourse(courseId);
      setCourse(data.data);
    } catch (err) {
      setError(t("courseDetail.deleteFeedbackError"));
    } finally {
      setIsDeletingFeedback(false);
      setDeleteAlert({ isOpen: false, feedbackId: null });
    }
  };

  const Button = ({
    type,
    variant,
    isLoading,
    disabled,
    onClick,
    children,
  }) => {
    const baseClasses =
      "px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
      primary:
        "bg-accent-teal text-white hover:from-blue-700 hover:to-purple-700",
      secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
    };

    return (
      <button
        type={type}
        disabled={disabled || isLoading}
        onClick={onClick}
        className={`${baseClasses} ${variants[variant]}`}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Loading...
          </div>
        ) : (
          children
        )}
      </button>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 bg-red-50 p-4 rounded-lg inline-block mb-4">
          {error || t("courseDetail.notFound")}
        </p>
        <button
          onClick={() => navigate("/courses")}
          className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
        >
          {t("courseDetail.backToCourses")}
        </button>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-primary-900 mb-3">
                {t("courseDetail.description")}
              </h3>
              <p className="text-secondary-600 whitespace-pre-line leading-relaxed">
                {course.description}
              </p>
            </div>

            {course.objectives && course.objectives.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-4">
                  {t("courseDetail.whatYoullLearn")}
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.objectives.map((objective, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm"
                    >
                      <BullseyeIcon className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <span className="text-secondary-600">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {course.requirements && course.requirements.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-4">
                  {t("courseDetail.requirements")}
                </h3>
                <ul className="space-y-3">
                  {course.requirements.map((requirement, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm"
                    >
                      <ListIcon className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <span className="text-secondary-600">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Curriculum Section (moved from curriculum tab) */}
            <div>
              <h3 className="text-xl font-semibold text-primary-900 mb-4">
                {t("courseDetail.tab.curriculum")}
              </h3>
              {course.modules && course.modules.length > 0 && (
                <div>
                  <ul className="grid grid-cols-1">
                    {course.modules.map((module, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm"
                      >
                        <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start ">
                            <h4 className="text-lg font-semibold text-secondary-600">
                              {module.title}
                            </h4>
                            {module.duration && (
                              <span className="text-sm text-secondary-500 bg-secondary-50 px-2 py-1 rounded-full ml-2">
                                {t("courseDetail.minutes", {
                                  count: module.duration,
                                })}
                              </span>
                            )}
                          </div>
                          {module.description && (
                            <p className="text-secondary-600 mb-2 text-sm">
                              {module.description}
                            </p>
                          )}
                          {module.videoUrl && (
                            <a
                              target="_blank"
                              href={module.videoUrl}
                              className="text-primary-600 hover:text-primary-700 text-sm underline"
                            >
                              {t("courseDetail.videoLink")}
                            </a>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Instructor Section (moved from instructor tab) */}
            <div>
              <h3 className="text-xl font-semibold text-primary-900 mb-4">
                {t("courseDetail.tab.instructor")}
              </h3>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={
                        course?.avatar
                          ? `https://ecosus-production.up.railway.app/uploads/${course.avatar}`
                          : `https://ecosus-production.up.railway.app/public/images/defaultCourse.png`
                      }
                      alt={course.instructor?.name}
                      className="w-24 h-24 rounded-full object-cover ring-4 ring-primary-50"
                      loading="lazy"
                      crossOrigin="anonymous"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.target.src =
                          "https://ecosus-production.up.railway.app/public/images/defaultCourse.png";
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary-900 mb-2">
                      {course.instructor?.name ||
                        t("courseDetail.unknownInstructor")}
                    </h3>
                    <p className="text-secondary-600">
                      {" "}
                      {course.instructor?.dis}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "feedback":
        return (
          <div className="space-y-8">
            {/* Average Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                <StarRating rating={course.averageRating} readonly />
                <span className="ml-2 text-lg font-medium text-gray-700">
                  {t("courseDetail.ratingOutOfFive", {
                    rating: course.averageRating,
                  })}
                </span>
              </div>
              <span className="text-gray-500">
                {t("courseDetail.reviews", {
                  count: course.feedback?.length || 0,
                })}
              </span>
            </div>

            {/* Feedback Form */}
            <div className="mb-8 p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-primary-900 mb-4">
                {t("courseDetail.writeAReview")}
              </h3>
              <FeedbackForm
                onSubmit={handleFeedbackSubmit}
                isLoading={isSubmittingFeedback}
              />
            </div>

            {/* Feedback List */}
            {course.feedback && course.feedback.length > 0 ? (
              <div className="space-y-6">
                {course.feedback.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-sm"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={`https://ecosus-production.up.railway.app/public/images/default.png`}
                          alt={t("common.visitor")}
                          className="w-10 h-10 rounded-full"
                          loading="lazy"
                          crossOrigin="anonymous"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="font-medium text-primary-900">
                            {t("common.visitor")}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <StarRating rating={item.rating} readonly />
                        {user?.role === "admin" && (
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeleteFeedback(item._id)}
                            disabled={isDeletingFeedback}
                            isLoading={isDeletingFeedback}
                          >
                            {t("common.delete")}
                          </Button>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600">{item.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">
                {t("courseDetail.noFeedback")}
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const VideoPreview = ({ video }) => {
    const [videoError, setVideoError] = React.useState(false);
    const [videoLoading, setVideoLoading] = React.useState(true);
    const videoUrl = video
      ? `https://ecosus-production.up.railway.app/uploads/${video}`
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
          <span className="text-indigo-500 text-lg font-medium">No Video</span>
        </div>
      );
    }
    return (
      <div className="relative h-full w-full">
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
              className="text-blue-500 text-xs underline"
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

  return (
    <>
      <div className="max-w-7xl mx-auto">
        {/* Course Header */}
        <div className="relative h-80 sm:h-[42rem] rounded-lg overflow-hidden mb-8">
          {course.video ? (
            <VideoPreview video={course.video} />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-indigo-100">
              <span className="text-indigo-500 text-lg font-medium">
                No Video
              </span>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white pointer-events-none">
            <div className="flex flex-wrap items-center gap-2 mb-3 pointer-events-auto">
              <span className="px-3 py-1 bg-primary-600 rounded-full text-sm font-medium">
                {course.category}
              </span>
              <span className="px-3 py-1 bg-secondary-600 rounded-full text-sm font-medium">
                {course.level}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 pointer-events-auto">
              {course.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm pointer-events-auto">
              <div className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4 text-primary-400" />
                <span>
                  {t("courseDetail.hoursOfContent", {
                    count: course.duration,
                    endCount: course.duration + 5,
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-8">
              <nav className="flex gap-10 space-x-8">
                {["overview", "feedback"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 border-b-2  transition-colors duration-200 ${
                      activeTab === tab
                        ? "border-primary-500 text-primary-600"
                        : "border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300"
                    }`}
                  >
                    {t(`courseDetail.tab.${tab}`)}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className={`bg-white rounded-lg shadow-sm p-6`}>
              {renderTabContent()}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
                <Button
                  variant={isEnrolled ? "danger" : "primary"}
                  onClick={handleEnroll}
                  disabled={isEnrolling || !course.isActive}
                  isLoading={isEnrolling}
                  fullWidth
                >
                  {isEnrolled
                    ? t("courseDetail.unenrollButton")
                    : t("courseDetail.enrollNowButton")}
                </Button>
                {showEnrollForm && !isEnrolled && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
                      <button
                        className="absolute top-[-15px] right-[-10px] text-gray-500 hover:text-red-500 text-2xl w-22 h-22 bg-transparent font-bold"
                        onClick={() => setShowEnrollForm(false)}
                        type="button"
                      >
                        ×
                      </button>
                      <form
                        ref={enrollFormRef}
                        className="space-y-6 max-h-[80vh] overflow-y-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20"
                        onSubmit={handleEnrollFormSubmit}
                      >
                        {enrollError && (
                          <div className="text-red-600 bg-red-50 border border-red-200 p-4 rounded-lg mb-4 text-center shadow-sm">
                            {enrollError}
                          </div>
                        )}

                        {/* Course Selection Section */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            Course Selection
                          </h2>
                          <div className="grid md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t("common.startDate")}
                              </label>
                              <select
                                name="startDate"
                                value={enrollFields.startDate}
                                onChange={handleEnrollFormChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 ltr bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                              >
                                <option value="">
                                  {t("common.pleaseSelect")}
                                </option>
                                <option value="June,1st">
                                  {t("common.June")}
                                </option>
                                <option value="October,1st">
                                  {t("common.Oct")}
                                </option>
                                <option value="February,1st">
                                  {t("common.Feb")}
                                </option>
                              </select>
                              {enrollFieldErrors.startDate && (
                                <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                  <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                                  {enrollFieldErrors.startDate}
                                </div>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t("common.courseLanguage")}
                              </label>
                              <select
                                name="courseLanguage"
                                value={enrollFields.courseLanguage}
                                onChange={handleEnrollFormChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 ltr bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                              >
                                <option value="">
                                  {t("common.pleaseSelect")}
                                </option>
                                <option value="arabic">{t("common.ar")}</option>
                                <option value="english">
                                  {t("common.en")}
                                </option>
                              </select>
                              {enrollFieldErrors.courseLanguage && (
                                <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                  <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                                  {enrollFieldErrors.courseLanguage}
                                </div>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t("common.package")}
                              </label>
                              <select
                                name="package"
                                value={enrollFields.package}
                                onChange={handleEnrollFormChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 ltr bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                              >
                                <option value="">
                                  {t("common.pleaseSelect")}
                                </option>
                                <option value="basic">
                                  {t("common.basic")}
                                </option>
                                <option value="advanced">
                                  {t("common.advanced")}
                                </option>
                                <option value="premium">
                                  {t("common.premium")}
                                </option>
                              </select>
                              {enrollFieldErrors.package && (
                                <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                  <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                                  {enrollFieldErrors.package}
                                </div>
                              )}
                            </div>
                          </div>

                          <a
                            href="https://drive.google.com/file/d/1CysQ-QJZIRpaslFggV-mIgYmHSBefBxV/view"
                            target="_blank"
                            className="inline-block mt-4 text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium underline decoration-2 underline-offset-2"
                          >
                            {t("common.details")}
                          </a>
                        </div>

                        {/* Personal Info */}
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
                          <h3 className="font-bold text-xl mb-4 text-gray-800 flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            {t("common.personalInfo")}
                          </h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t("common.fullNameAr")}
                              </label>
                              <input
                                name="fullNameAr"
                                value={enrollFields.fullNameAr}
                                onChange={handleEnrollFormChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                              />
                              {enrollFieldErrors.fullNameAr && (
                                <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                  <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                                  {enrollFieldErrors.fullNameAr}
                                </div>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t("common.fullNameEn")}
                              </label>
                              <input
                                name="fullNameEn"
                                value={enrollFields.fullNameEn}
                                onChange={handleEnrollFormChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                              />
                              {enrollFieldErrors.fullNameEn && (
                                <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                  <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                                  {enrollFieldErrors.fullNameEn}
                                </div>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t("common.birthDate")}
                              </label>
                              <input
                                name="birthDate"
                                type="date"
                                value={enrollFields.birthDate}
                                onChange={handleEnrollFormChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                              />
                              {enrollFieldErrors.birthDate && (
                                <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                  <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                                  {enrollFieldErrors.birthDate}
                                </div>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t("common.email")}
                              </label>
                              <input
                                name="email"
                                type="email"
                                value={enrollFields.email}
                                onChange={handleEnrollFormChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                              />
                              {enrollFieldErrors.email && (
                                <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                  <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                                  {enrollFieldErrors.email}
                                </div>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t("common.phone")}
                              </label>
                              <input
                                name="phone"
                                value={enrollFields.phone}
                                onChange={handleEnrollFormChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                              />
                              {enrollFieldErrors.phone && (
                                <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                  <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                                  {enrollFieldErrors.phone}
                                </div>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t("common.nationality")}
                              </label>
                              <input
                                name="nationality"
                                value={enrollFields.nationality}
                                onChange={handleEnrollFormChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                              />
                              {enrollFieldErrors.nationality && (
                                <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                  <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                                  {enrollFieldErrors.nationality}
                                </div>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t("common.city")}
                              </label>
                              <input
                                name="city"
                                value={enrollFields.city}
                                onChange={handleEnrollFormChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                              />
                              {enrollFieldErrors.city && (
                                <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                  <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                                  {enrollFieldErrors.city}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Academic Qualifications */}
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                          <h3 className="font-bold text-xl mb-4 text-gray-800 flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            {t("common.academicQualifications")}
                          </h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t("common.degree")}
                              </label>
                              <input
                                name="degree"
                                value={enrollFields.degree}
                                onChange={handleEnrollFormChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                              />
                              {enrollFieldErrors.degree && (
                                <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                  <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                                  {enrollFieldErrors.degree}
                                </div>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t("common.major")}
                              </label>
                              <input
                                name="major"
                                value={enrollFields.major}
                                onChange={handleEnrollFormChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                              />
                              {enrollFieldErrors.major && (
                                <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                  <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                                  {enrollFieldErrors.major}
                                </div>
                              )}
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t("common.university")}
                              </label>
                              <input
                                name="university"
                                value={enrollFields.university}
                                onChange={handleEnrollFormChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                              />
                              {enrollFieldErrors.university && (
                                <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                  <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                                  {enrollFieldErrors.university}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Work Experience */}
                        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
                          <h3 className="font-bold text-xl mb-4 text-gray-800 flex items-center gap-2">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            {t("common.workExperience")}
                          </h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t("common.currentJob")}
                              </label>
                              <input
                                name="currentJob"
                                value={enrollFields.currentJob}
                                onChange={handleEnrollFormChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                              />
                              {enrollFieldErrors.currentJob && (
                                <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                  <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                                  {enrollFieldErrors.currentJob}
                                </div>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t("common.company")}
                              </label>
                              <input
                                name="company"
                                value={enrollFields.company}
                                onChange={handleEnrollFormChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                              />
                              {enrollFieldErrors.company && (
                                <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                  <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                                  {enrollFieldErrors.company}
                                </div>
                              )}
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t("common.yearsExperience")}
                              </label>
                              <input
                                name="yearsExperience"
                                value={enrollFields.yearsExperience}
                                onChange={handleEnrollFormChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                              />
                              {enrollFieldErrors.yearsExperience && (
                                <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                  <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                                  {enrollFieldErrors.yearsExperience}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Scholarship */}
                        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-100">
                          <h3 className="font-bold text-xl mb-4 text-gray-800 flex items-center gap-2">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                            {t("common.scholarship")}
                          </h3>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {t("common.wantScholarship")}
                            </label>
                            <select
                              name="wantScholarship"
                              value={enrollFields.wantScholarship}
                              onChange={handleEnrollFormChange}
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 ltr bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                            >
                              <option value="">
                                {t("common.pleaseSelect")}
                              </option>
                              <option value="yes">{t("common.yes")}</option>
                              <option value="no">{t("common.no")}</option>
                            </select>
                            {enrollFieldErrors.wantScholarship && (
                              <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                                {enrollFieldErrors.wantScholarship}
                              </div>
                            )}
                          </div>
                          {enrollFields.wantScholarship === "yes" && (
                            <div className="mt-4">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t("common.scholarshipReason")}
                              </label>
                              <textarea
                                name="scholarshipReason"
                                value={enrollFields.scholarshipReason}
                                onChange={handleEnrollFormChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm resize-none"
                                rows="4"
                              />
                              {enrollFieldErrors.scholarshipReason && (
                                <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                  <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                                  {enrollFieldErrors.scholarshipReason}
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Payment */}
                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
                          <h3 className="font-bold text-xl mb-4 text-gray-800 flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            {t("common.payment")}
                          </h3>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {t("common.paymentMethod")}
                            </label>
                            <select
                              name="paymentMethod"
                              value={enrollFields.paymentMethod}
                              onChange={handleEnrollFormChange}
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 ltr bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                            >
                              <option value="">
                                {t("common.pleaseSelect")}
                              </option>
                              <option value="bankTransfer">
                                {t("common.bankTransfer")}
                              </option>
                              <option value="installment">
                                {t("common.installment")}
                              </option>
                              <option value="companyDelivery">
                                {t("common.companyDelivery")}
                              </option>
                            </select>
                            {enrollFieldErrors.paymentMethod && (
                              <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                                {enrollFieldErrors.paymentMethod}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Agreement */}
                        <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-6 border border-gray-200">
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              name="agree"
                              checked={enrollFields.agree}
                              onChange={handleEnrollFormChange}
                              className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                            />
                            <label className="text-sm font-medium text-gray-700">
                              {t("common.agreeTerms")}
                            </label>
                          </div>
                          {enrollFieldErrors.agree && (
                            <div className="text-red-500 text-sm mt-2 flex items-center gap-1">
                              <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                              {enrollFieldErrors.agree}
                            </div>
                          )}
                        </div>

                        <div className="flex gap-4 mt-8 justify-center">
                          <Button
                            type="submit"
                            variant="primary"
                            isLoading={isEnrolling}
                            disabled={isEnrolling}
                          >
                            {t("courseDetail.enrollNowButton")}
                          </Button>
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setShowEnrollForm(false)}
                            disabled={isEnrolling}
                          >
                            {t("common.cancel")}
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <ClockIcon className="h-5 w-5 text-primary-600" />
                    <span className="text-secondary-600">
                      {t("courseDetail.hoursOfContent", {
                        count: course.duration,
                        endCount: course.duration + 5,
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <BookIcon className="h-5 w-5 text-primary-600" />
                    <span className="text-secondary-600">
                      {t("courseDetail.modulesCount", {
                        count: course.modules?.length + 7 || 0,
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomAlert
        isOpen={deleteAlert.isOpen}
        onClose={() => setDeleteAlert({ isOpen: false, feedbackId: null })}
        message={"Are you sure you want to delete this feedback"}
        type="warning"
        showCancelButton={true}
        confirmButtonText={t("common.delete")}
        cancelButtonText={t("common.cancel")}
        onConfirm={handleConfirmDelete}
      />

      {enrollSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-green-700">
              تم تسجيلكم بنجاح !
            </h2>
            <Button onClick={() => setEnrollSuccess(false)} variant="primary">
              OK
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseDetail;
