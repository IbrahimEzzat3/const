import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { courseService } from "../../shared/services/courseService";
import { useAuth } from "../../shared/context/AuthContext";
import { Button } from "../ui";
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

const UsersIcon = ({ className = "h-5 w-5", direction }) => (
  <svg
    className={`${className} ${direction === "rtl" ? "ml-2" : "mr-2"}`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
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
    if (!course || !user) {
      navigate("/login");
      return;
    }

    setIsEnrolling(true);
    try {
      if (isEnrolled) {
        await courseService.unenrollFromCourse(courseId);
      } else {
        await courseService.enrollInCourse(courseId);
      }
      // Fetch fresh course data after enrollment/unenrollment
      await fetchCourseData();
    } catch (err) {
      const errorMessage =
        err?.response?.data?.error || t("courseDetail.enrollError");
      setError(errorMessage);
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
              <div className="space-y-6">
                {course.modules && course.modules.length > 0 ? (
                  course.modules.map((module, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-primary-900">
                          {module.title}
                        </h3>
                        {module.duration && (
                          <span className="text-sm text-secondary-500 bg-secondary-50 px-3 py-1 rounded-full">
                            {t("courseDetail.minutes", {
                              count: module.duration,
                            })}
                          </span>
                        )}
                      </div>
                      {module.description && (
                        <p className="text-secondary-600 mb-4">
                          {module.description}
                        </p>
                      )}
                      {module.videoUrl && (
                        <a target="_blank" href={module.videoUrl}>
                          {t("courseDetail.videoLink")}
                        </a>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-secondary-500 text-center py-8 bg-white rounded-lg shadow-sm">
                    {t("courseDetail.noCurriculum")}
                  </p>
                )}
              </div>
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
                        course.instructor?.avatar &&
                        course.instructor?.avatar !==
                          "public/images/default.png"
                          ? `https://const-production.up.railway.app/${course.instructor?.avatar}`
                          : `https://const-production.up.railway.app/public/images/default.png`
                      }
                      alt={course.instructor?.name}
                      className="w-24 h-24 rounded-full object-cover ring-4 ring-primary-50"
                      loading="lazy"
                      crossOrigin="anonymous"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary-900 mb-2">
                      {course.instructor?.name ||
                        t("courseDetail.unknownInstructor")}
                    </h3>
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
                          src={`https://const-production.up.railway.app/public/images/default.png`}
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
      ? `https://const-production.up.railway.app/uploads/${video}`
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
        <div className="relative h-80 sm:h-96 rounded-lg overflow-hidden mb-8">
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
                  {t("courseDetail.hoursOfContent", { count: course.duration })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <UsersIcon className="h-4 w-4 text-primary-400" />
                <span>
                  {t("courseDetail.studentsEnrolled", {
                    count: course.enrolledUsers?.length || 0,
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
                    : !course.isActive
                    ? t("courseDetail.notAvailableButton")
                    : !user
                    ? t("courseDetail.loginToEnrollButton")
                    : t("courseDetail.enrollNowButton")}
                </Button>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <ClockIcon className="h-5 w-5 text-primary-600" />
                    <span className="text-secondary-600">
                      {t("courseDetail.hoursOfContent", {
                        count: course.duration,
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <BookIcon className="h-5 w-5 text-primary-600" />
                    <span className="text-secondary-600">
                      {t("courseDetail.modulesCount", {
                        count: course.modules?.length || 0,
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
    </>
  );
};

export default CourseDetail;
