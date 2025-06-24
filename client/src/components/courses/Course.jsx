import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../shared/context/LanguageContext";

const Course = ({ course }) => {
  const { t, direction } = useLanguage();
  const [videoError, setVideoError] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);
  const videoRef = useRef(null);

  // Construct video URL
  const videoUrl = course.video
    ? `https://const-production.up.railway.app/uploads/${course.video}`
    : null;

  useEffect(() => {
    if (videoRef.current && videoUrl) {
      // Reset states when video URL changes
      setVideoError(false);
      setVideoLoading(true);

      // Force reload the video
      videoRef.current.load();
    }
  }, [videoUrl]);

  const handleVideoError = (e) => {
    console.error("Video failed to load:", e);
    console.error("Attempted URL:", videoUrl);
    console.error("Error code:", e.target.error?.code);
    console.error("Error message:", e.target.error?.message);
    setVideoError(true);
    setVideoLoading(false);
  };

  const handleVideoLoad = () => {
    console.log("Video loaded successfully");
    setVideoLoading(false);
    setVideoError(false);
  };

  const handleCanPlay = () => {
    console.log("Video can start playing");
    setVideoLoading(false);
  };

  const handleLoadStart = () => {
    console.log("Video started loading");
    setVideoLoading(true);
    setVideoError(false);
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden ${direction}`}
    >
      {/* Course Video */}
      <div className="relative h-48 bg-gray-200">
        {course.video ? (
          <>
            {videoError ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-red-50">
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
              <>
                {videoLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                    <div className="text-gray-500">Loading video...</div>
                  </div>
                )}

                <video
                  ref={videoRef}
                  controls
                  className="h-full w-full object-cover rounded-md"
                  preload="metadata"
                  onError={handleVideoError}
                  onLoadedData={handleVideoLoad}
                  onCanPlay={handleCanPlay}
                  onLoadStart={handleLoadStart}
                  playsInline
                  muted={false}
                  style={{ backgroundColor: "#f3f4f6" }}
                >
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-indigo-100">
            <span className="text-indigo-500 text-lg font-medium">
              {t("courseDetail.noVideo")}
            </span>
          </div>
        )}

        {course.isActive && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium z-20">
            {t("courseDetail.status")}
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {course.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description.length > 50
            ? `${course.description.substring(0, 50)}...`
            : course.description}
        </p>

        {/* Course Meta */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <svg
              className={`h-4 w-4 ${direction === "rtl" ? "ml-1" : "mr-1"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {t("courseDetail.hoursOfContent", { count: course.duration })}
          </div>
          <div className="flex items-center">
            <svg
              className={`h-4 w-4 ${direction === "rtl" ? "ml-1" : "mr-1"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {t("courseDetail.studentsEnrolled", {
              count: course.enrolledUsers.length || 0,
            })}
          </div>
        </div>

        {/* Course Actions */}
        <div className="flex items-center justify-between">
          <Link
            to={`/courses/${course._id}`}
            className="text-indigo-600 hover:text-indigo-500 font-medium text-sm"
          >
            {t("readMore")}
          </Link>
          {course.price ? (
            <span className="text-gray-900 font-semibold">
              ${course.price.toFixed(2)}
            </span>
          ) : (
            <span className="text-blue-600 font-semibold">
              {t("courseDetail.free")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Course;
