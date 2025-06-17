import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../../shared/services/auth";
import { useAuth } from "../../shared/context/AuthContext";
import { Button, Card } from "../ui";
import LoadingSpinner from "../common/LoadingSpinner";
import { useLanguage } from "../../shared/context/LanguageContext";
import { format } from "date-fns";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [imageLoading, setImageLoading] = useState(true);
  const { logout } = useAuth();
  const { t, direction } = useLanguage();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await authService.getMe();
        setUserData(data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load profile data");
        if (err.message === "Unauthorized") {
          navigate("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate, t]);

  const handleClick = () => {
    navigate("/consultations");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Check for success message from navigation state
  useEffect(() => {
    const state = navigate.location?.state;
    if (state?.message) {
      setMessage(state.message);
      // Clear the message after 5 seconds
      const timer = setTimeout(() => {
        setMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
      setError("Failed to logout");
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = (e) => {
    setImageLoading(false);
    e.target.src = "/public/images/default.png";
  };

  const formatJoinDate = (dateString) => {
    if (!dateString) return "Unknown";
    try {
      return new Date(dateString).toLocaleDateString(
        direction === "ar" ? "ar-SA" : "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      );
    } catch (err) {
      return "Unknown";
    }
  };

  if (isLoading) {
    return <LoadingSpinner size="lg" variant="primary" />;
  }

  if (error && !userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
        <Card className="max-w-md w-full p-8 text-center shadow-soft-xl">
          <div className="mb-4">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-error-100">
              <svg
                className="h-6 w-6 text-error-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {t("sections.profile.errorTitle")}
          </h3>
          <p className="text-error-700 mb-6">{error}</p>
          <div className="space-y-3">
            <Button variant="primary" onClick={() => window.location.reload()}>
              {t("common.tryAgain")}
            </Button>
            <Button variant="secondary" onClick={() => navigate("/login")}>
              {t("sections.profile.returnToLogin")}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12 px-4 sm:px-6 lg:px-8 mt-10 ${
        direction === "rtl" ? "rtl" : "ltr"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Success Message */}
        {message && (
          <div className="mb-6 p-4 bg-success-50 border border-success-200 text-success-700 rounded-lg shadow-sm">
            <div className="flex items-center">
              <svg
                className={`h-5 w-5 text-success-400 ${
                  direction === "ar" ? "ml-2" : "mr-2"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {message}
            </div>
          </div>
        )}

        <Card className="overflow-hidden shadow-soft-xl">
          {/* Enhanced Profile Header */}
          <div className="relative px-6 py-8 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-black bg-opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              ></div>
            </div>

            <div
              className={`relative flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 ${
                direction === "ar" ? "sm:space-x-reverse" : "sm:space-x-6"
              }`}
            >
              {/* Avatar with loading state */}
              <div className="relative">
                <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
                  {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  {userData?.avatar && (
                    <img
                      className="h-full w-full object-cover"
                      src={`https://const-production.up.railway.app/${userData.avatar}`}
                      alt={t("sections.profile.userAvatar")}
                      onLoad={handleImageLoad}
                      onError={handleImageError}
                      style={{ opacity: imageLoading ? 0 : 1 }}
                      loading="lazy"
                      crossOrigin="anonymous"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  {!userData?.avatar && (
                    <div className="h-full w-full flex items-center justify-center bg-gray-100">
                      <svg
                        className="h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Online indicator */}
                <div className="absolute bottom-1 right-1 h-6 w-6 bg-green-400 border-2 border-white rounded-full flex items-center justify-center">
                  <div className="h-2 w-2 bg-green-600 rounded-full"></div>
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center sm:text-left text-white">
                <h1
                  className={` ${direction} text-3xl  sm:text-4xl font-display font-bold mb-2`}
                >
                  {userData?.name || t("sections.profile.defaultUser")}
                </h1>

                <div
                  className={`flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 ${
                    direction === "ar" ? "sm:space-x-reverse" : "sm:space-x-4"
                  } mb-4`}
                >
                  {userData?.createdAt && (
                    <div
                      className={`flex items-center text-sm text-white/80 ${
                        direction === "ar" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <svg
                        className={`h-4 w-4 ${
                          direction === "ar" ? "ml-1" : "mr-1"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {t("sections.profile.joined")}{" "}
                      {formatJoinDate(userData.createdAt)}
                    </div>
                  )}

                  {userData?.lastLoginAt && (
                    <div className="p-4 rounded-lg border border-secondary-200 bg-secondary-50">
                      <label className="block text-sm font-medium text-secondary-700 mb-1">
                        {t("sections.profile.lastLogin")}
                      </label>
                      <div className="text-secondary-900 font-medium">
                        {formatJoinDate(userData.lastLoginAt)}
                      </div>
                    </div>
                  )}
                </div>

                <p className="text-white/90 text-sm sm:text-base max-w-md">
                  {t("sections.profile.welcomeMessage")}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6 sm:p-8">
            {/* Contact Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <h3
                  className={`text-lg font-semibold text-secondary-900 mb-4 flex items-center ${
                    direction === "ar" ? "flex-row-reverse justify-end" : ""
                  }`}
                >
                  <svg
                    className={`h-5 w-5 ${
                      direction === "ar" ? "ml-2" : "mr-2"
                    } text-primary-600`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  {t("sections.profile.contactInfo.title")}
                </h3>

                <div className="space-y-4">
                  <div className="group p-4 rounded-lg border border-secondary-200 hover:border-primary-300 transition-colors">
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      {t("sections.profile.contactInfo.email")}
                    </label>
                    <div
                      className={`flex items-center ${
                        direction === "ar" ? "flex-row-reverse justify-end" : ""
                      }`}
                    >
                      <svg
                        className={`h-4 w-4 ${
                          direction === "ar" ? "ml-2" : "mr-2"
                        } text-secondary-400`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-secondary-900 font-medium">
                        {userData?.email || t("common.notProvided")}
                      </span>
                    </div>
                  </div>

                  <div className="group p-4 rounded-lg border border-secondary-200 hover:border-primary-300 transition-colors">
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      {t("sections.profile.contactInfo.phone")}
                    </label>
                    <div
                      className={`flex items-center ${
                        direction === "ar" ? "flex-row-reverse justify-end" : ""
                      }`}
                    >
                      <svg
                        className={`h-4 w-4 ${
                          direction === "ar" ? "ml-2" : "mr-2"
                        } text-secondary-400`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span className="text-secondary-900 font-medium">
                        {userData?.phone || t("common.notProvided")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Statistics */}
              <div className="space-y-4">
                <h3
                  className={`text-lg font-semibold text-secondary-900 mb-4 flex items-center ${
                    direction === "ar" ? "flex-row-reverse justify-end" : ""
                  }`}
                >
                  <svg
                    className={`h-5 w-5 ${
                      direction === "ar" ? "ml-2" : "mr-2"
                    } text-primary-600`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  {t("sections.profile.accountOverview.title")}
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                    <div className="text-2xl font-bold text-blue-700">
                      {t("common.active")}
                    </div>
                  </div>

                  {/* User Level */}
                  {userData?.level && (
                    <div className="p-4 rounded-lg border border-secondary-200 bg-secondary-50">
                      <label className="block text-sm font-medium text-secondary-700 mb-1">
                        {t("sections.profile.accountOverview.level")}
                      </label>
                      <div className="text-secondary-900 font-medium capitalize">
                        {t(`userLevels.${userData.level}`)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Block History Section */}
            <div className="mt-8">
              <h3
                className={`text-lg font-semibold text-secondary-900 mb-4 flex items-center ${
                  direction === "ar" ? "flex-row-reverse justify-end" : ""
                }`}
              >
                <svg
                  className={`h-5 w-5 ${
                    direction === "ar" ? "ml-2" : "mr-2"
                  } text-primary-600`}
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
                {t("sections.profile.blockHistory.title")}
              </h3>

              {isLoading ? (
                <LoadingSpinner size="sm" />
              ) : error ? (
                <div className="p-4 bg-error-50 text-error-700 rounded-lg text-sm">
                  {error}
                </div>
              ) : userData?.blockHistory?.length > 0 ? (
                <div className="space-y-4">
                  {userData.blockHistory.map((block, index) => (
                    <div
                      key={index}
                      className="p-4 border border-secondary-200 rounded-lg shadow-sm bg-secondary-50"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center">
                          <strong className="text-secondary-700 w-24">
                            {t("sections.profile.blockHistory.blockedAt")}:
                          </strong>
                          <span className="text-secondary-900">
                            {format(
                              new Date(block.blockedAt),
                              "MMM dd, yyyy HH:mm"
                            )}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <strong className="text-secondary-700 w-24">
                            {t("sections.profile.blockHistory.blockedBy")}:
                          </strong>
                          <span className="text-secondary-900">
                            {block.blockedBy?.name || t("common.unknown")}
                          </span>
                        </div>
                        <div className="flex items-start col-span-full">
                          <strong className="text-secondary-700 w-24">
                            {t("sections.profile.blockHistory.reason")}:
                          </strong>
                          <span className="text-secondary-900 flex-1">
                            {block.reason || t("common.notProvided")}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <strong className="text-secondary-700 w-24">
                            {t("sections.profile.blockHistory.expiresAt")}:
                          </strong>
                          <span className="text-secondary-900">
                            {block.expiresAt
                              ? format(
                                  new Date(block.expiresAt),
                                  "MMM dd, yyyy HH:mm"
                                )
                              : t("loginPage.permanentBlock")}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <strong className="text-secondary-700 w-24">
                            {t("sections.profile.blockHistory.unblockedAt")}:
                          </strong>
                          <span className="text-secondary-900">
                            {block.unblockedAt
                              ? format(
                                  new Date(block.unblockedAt),
                                  "MMM dd, yyyy HH:mm"
                                )
                              : t("common.notApplicable")}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-info-50 text-info-700 rounded-lg text-sm text-center">
                  {t("sections.profile.blockHistory.noHistory")}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="border-t border-secondary-200 pt-6">
              <h3
                className={`text-lg font-semibold text-secondary-900 mb-4 ${
                  direction === "ar" ? "text-right" : "text-left"
                }`}
              >
                {t("sections.profile.quickActions.title")}
              </h3>
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${
                  direction === "ar" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <Button
                  variant="primary"
                  onClick={handleClick}
                  className={`flex items-center justify-center space-x-2 py-3 ${
                    direction === "ar" ? "flex-row-reverse space-x-reverse" : ""
                  }`}
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>
                    {t("sections.profile.quickActions.myConsultations")}
                  </span>
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => navigate("/update-details")}
                  className={`flex items-center justify-center space-x-2 py-3 ${
                    direction === "ar" ? "flex-row-reverse space-x-reverse" : ""
                  }`}
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  <span>
                    {t("sections.profile.quickActions.updateProfile")}
                  </span>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => navigate("/update-password")}
                  className={`flex items-center justify-center space-x-2 py-3 ${
                    direction === "ar" ? "flex-row-reverse space-x-reverse" : ""
                  }`}
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span>
                    {t("sections.profile.quickActions.changePassword")}
                  </span>
                </Button>

                <Button
                  variant="ghost"
                  className={`text-error-600 hover:text-error-700 hover:bg-error-50 flex items-center justify-center space-x-2 py-3 ${
                    direction === "ar" ? "flex-row-reverse space-x-reverse" : ""
                  }`}
                  onClick={handleLogout}
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>{t("logout")}</span>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
