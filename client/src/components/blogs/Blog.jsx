import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../shared/context/LanguageContext";

const Blog = ({ blog }) => {
  const { t, direction } = useLanguage();

  // Function to get the full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith("http")) return imagePath;
    if (imagePath.startsWith("/uploads")) {
      return `${"https://const-production.up.railway.app"}${imagePath}`;
    }
    return `${"https://const-production.up.railway.app"}/uploads/${imagePath}`;
  };

  const imageUrl = getImageUrl(blog.coverImage);

  // Format date based on language
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(direction === "rtl" ? "ar-SA" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Link to={`/blogs/${blog._id}`} className="block group">
      <article
        className={`bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col ${direction}`}
      >
        {/* Cover Image */}
        <div className="relative h-48 sm:h-56 overflow-hidden">
          {blog.coverImage ? (
            <img
              src={imageUrl}
              alt={blog.title}
              className="object-cover rounded-md"
              loading="lazy"
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-indigo-100">
              <span className="text-indigo-500 text-lg font-medium">
                {t("blogDetail.noImage")}
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-6 flex-grow flex flex-col">
          {/* Category and Tags */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {blog.category && (
              <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full font-medium">
                {t(`blogCategory.${blog.category}`)}
              </span>
            )}
            {blog.tags &&
              blog.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-secondary-50 text-secondary-700 text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
            {blog.tags && blog.tags.length > 2 && (
              <span className="text-xs text-secondary-500">
                +{blog.tags.length - 2} {t("more")}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-primary-900 mb-3 line-clamp-2 group-hover:text-primary-700 transition-colors duration-200">
            {blog.title}
          </h3>

          {/* Excerpt */}
          <p className="text-secondary-600 line-clamp-3 mb-4 flex-grow">
            {blog.excerpt ||
              (blog.content
                ? blog.content.substring(0, 150) + "..."
                : t("noPreview"))}
          </p>

          {/* Meta Information */}
          <div className="flex items-center justify-between text-sm text-secondary-500 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-4">
              {blog.author?.name && (
                <div className="flex items-center gap-2">
                  <img
                    className="h-8 w-8 object-cover rounded-full"
                    src={`https://const-production.up.railway.app/${blog.author?.avatar}`}
                    alt={t("blogDetail.unknownAuthor")}
                    loading="lazy"
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                  />
                  <span>
                    {blog.author.name || t("blogDetail.unknownAuthor")}
                  </span>
                </div>
              )}
            </div>
            {blog.publishedAt && (
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-4 h-4 text-primary-500 ${
                    direction === "rtl" ? "ml-2" : "mr-2"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                </svg>
                <span>{formatDate(blog.publishedAt)}</span>
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default Blog;
