import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { blogService } from "../../shared/services/blogService";
import { useAuth } from "../../shared/context/AuthContext";
import FeedbackForm from "../ui/FeedbackForm";
import StarRating from "../ui/StarRating";
import { useLanguage } from "../../shared/context/LanguageContext";
import { Button } from "../ui";
import CustomAlert from "../../shared/components/CustomAlert";

const BlogDetail = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [isDeletingFeedback, setIsDeletingFeedback] = useState(false);
  const { t } = useLanguage();
  const [deleteAlert, setDeleteAlert] = useState({
    isOpen: false,
    feedbackId: null,
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await blogService.getBlog(blogId);
        const fetchedBlog = data.data;

        // Function to recursively process and flatten tags
        const normalizeTags = (tagsData) => {
          if (tagsData === null || tagsData === undefined) {
            return [];
          }

          let resultTags = [];

          if (Array.isArray(tagsData)) {
            tagsData.forEach((item) => {
              resultTags.push(...normalizeTags(item)); // Recursively process array elements
            });
          } else if (typeof tagsData === "string") {
            try {
              const parsed = JSON.parse(tagsData); // Attempt to parse as JSON
              resultTags.push(...normalizeTags(parsed)); // Recursively process parsed result
            } catch (e) {
              // If direct JSON.parse fails, it might be a string with escaped quotes
              const unescapedString = tagsData.replace(/\\"/g, '"'); // Unescape backslashed double quotes

              try {
                const furtherParsed = JSON.parse(unescapedString); // Try parsing again after unescaping
                resultTags.push(...normalizeTags(furtherParsed)); // Recursively process if successful
              } catch (innerE) {
                // If all parsing/unescaping attempts fail, treat it as a literal tag
                resultTags.push(unescapedString.replace(/\\/g, "")); // Remove any remaining backslashes
              }
            }
          } else {
            resultTags.push(String(tagsData)); // Convert other types to string
          }
          return resultTags;
        };

        fetchedBlog.tags = normalizeTags(fetchedBlog.tags);
        setBlog(fetchedBlog);
      } catch (err) {
        setError(t("blogDetail.loadError"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [blogId, t]);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith("http")) return imagePath;
    if (imagePath.startsWith("/uploads")) {
      return `${"https://const-production.up.railway.app"}${imagePath}`;
    }
    return `${"https://const-production.up.railway.app"}/uploads/${imagePath}`;
  };

  const imageUrl = getImageUrl(blog?.coverImage);

  const handleFeedbackSubmit = async (feedbackData) => {
    setIsSubmittingFeedback(true);
    try {
      await blogService.addFeedback(blogId, feedbackData);
      // Refresh blog data to show new feedback
      const data = await blogService.getBlog(blogId);
      setBlog(data.data);
    } catch (err) {
      setError(t("blogDetail.feedbackError"));
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
      await blogService.deleteFeedback(blogId, deleteAlert.feedbackId);
      const data = await blogService.getBlog(blogId);
      setBlog(data.data);
    } catch (err) {
      setError(t("blogDetail.deleteFeedbackError"));
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

  if (error || !blog) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 bg-red-50 p-4 rounded-lg inline-block mb-4">
          {error || t("blogDetail.notFound")}
        </p>
        <button
          onClick={() => navigate("/blogs")}
          className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
        >
          {t("blogDetail.backToBlogs")}
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-4xl mx-auto">
        {/* Blog Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-900 mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Meta Information */}
          <div className="flex items-center justify-center flex-wrap gap-4 text-sm text-secondary-600 mb-6">
            {blog.category && (
              <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full font-medium">
                {blog.category
                  .replace("-", " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </span>
            )}

            {blog.publishedAt && (
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 text-primary-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                </svg>
                <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          {/* Author Information */}
          <div className="flex items-center justify-center gap-4 bg-white p-4 rounded-lg shadow-sm ">
            {blog.author?.avatar ? (
              <img
                className="h-12 w-12 rounded-full mr-2"
                src={
                  blog.author?.avatar &&
                  blog.author.avatar !== "public/images/default.png"
                    ? `https://const-production.up.railway.app/${blog.author.avatar}`
                    : `https://const-production.up.railway.app/public/images/default.png`
                }
                alt={blog.author.name || t("blogDetail.unknownAuthor")}
                loading="lazy"
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12 text-primary-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
            <div className="text-left">
              <span className="block font-semibold text-lg text-primary-900">
                {blog.author?.name || t("blogDetail.unknownAuthor")}
              </span>
              {blog.author?.role && (
                <span className="text-sm text-secondary-600">
                  {blog.author.role}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="relative  overflow-hidden">
          {blog.coverImage ? (
            <img
              src={imageUrl}
              alt={blog.title}
              className=" object-cover rounded-md"
              loading="lazy"
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
            />
          ) : (
            ""
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-secondary-50 text-secondary-700 rounded-full text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-3 h-3 text-secondary-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.521 9.521c.422.422 1.05.659 1.692.659.642 0 1.27-.237 1.692-.659l4.318-4.318a2.25 2.25 0 00.659-1.692V9.568a2.25 2.25 0 00-.659-1.692l-9.521-9.521A2.25 2.25 0 009.568 3z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6h.008v.008H6V6z"
                  />
                </svg>
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none">
          <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
            {/* Render HTML content if your API returns it in a rich format, otherwise display as plain text */}
            <div className="text-secondary-600 leading-relaxed space-y-4">
              {blog.content.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Share and Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate("/blogs")}
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200 flex items-center gap-2"
            >
              ← {t("blogDetail.backToBlogs")}
            </button>
            {blog.category && (
              <span className="text-sm text-secondary-500">
                {t("blogDetail.category")}:{" "}
                {blog.category
                  .replace("-", " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </span>
            )}
          </div>
        </div>

        {/* Feedback Section */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">
              {t("blogDetail.feedbackAndRatings")}
            </h2>

            {/* Average Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                <StarRating rating={blog.averageRating} readonly />
                <span className="ml-2 text-lg font-medium text-gray-700">
                  {t("blogDetail.ratingOutOfFive", {
                    rating: blog.averageRating,
                  })}
                </span>
              </div>
              <span className="text-gray-500">
                {t("blogDetail.reviews", { count: blog.feedback?.length || 0 })}
              </span>
            </div>

            {/* Feedback Form */}
            <div className="mb-8 p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-primary-900 mb-4">
                {t("blogDetail.writeAReview")}
              </h3>
              <FeedbackForm
                onSubmit={handleFeedbackSubmit}
                isLoading={isSubmittingFeedback}
              />
            </div>

            {/* Feedback List */}
            {blog.feedback && blog.feedback.length > 0 ? (
              <div className="space-y-6">
                {blog.feedback.map((item, index) => (
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
                {t("blogDetail.noFeedback")}
              </p>
            )}
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

export default BlogDetail;
