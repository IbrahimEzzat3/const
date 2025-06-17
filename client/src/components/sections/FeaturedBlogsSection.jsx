import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { blogService } from "../../shared/services/blogService";
import { Card } from "../ui";
import { useLanguage } from "../../shared/context/LanguageContext";

const FeaturedBlogsSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t, direction } = useLanguage();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await blogService.getPopularBlogs();
        setBlogs(data.data.slice(0, 4));
        setLoading(false);
      } catch (err) {
        setError(t("featuredBlogs.fetchError"));
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [t]);

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith("http")) return imagePath;
    if (imagePath.startsWith("/uploads")) {
      return `${"http://localhost:5000"}${imagePath}`;
    }
    return `${"http://localhost:5000"}/uploads/${imagePath}`;
  };

  if (loading) {
    return (
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mt-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto mt-4"></div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="mt-4 h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="mt-2 h-4 bg-gray-200 rounded w-full"></div>
                    <div className="mt-6 flex items-center">
                      <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                      <div className="ml-3">
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg">
            <svg
              className="h-6 w-6 mx-auto mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {error}
          </div>
        </div>
      </section>
    );
  }

  if (blogs.length === 0) {
    return null; // Don't render the section if there are no blogs
  }

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-primary-600 tracking-wide uppercase">
            {t("featuredBlogs.latestArticles")}
          </h2>
          <p className="mt-2 text-3xl font-display font-bold text-primary-900 sm:text-4xl">
            {t("featuredBlogs.fromOurBlog")}
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-secondary-600">
            {t("featuredBlogs.tagline")}
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {blogs.map((blog) => {
            const imageUrl = getImageUrl(blog.coverImage);
            return (
              <Card
                key={blog.id}
                className="group relative flex flex-col overflow-hidden bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-w-16 aspect-h-9">
                  <img
                    src={imageUrl}
                    alt={blog.title}
                    className="object-cover rounded-md"
                    loading="lazy"
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="flex-1 p-6">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                      {blog.category
                        .replace("-", " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                  </div>
                  <Link to={`/blogs/${blog._id}`} className="block mt-4">
                    <h3 className="text-xl font-semibold text-primary-900 group-hover:text-primary-600 transition-colors duration-300">
                      {blog.title}
                    </h3>
                    <p className="mt-3 text-base text-secondary-600 line-clamp-2">
                      {blog.excerpt}
                    </p>
                  </Link>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={
                          blog.author?.avatar &&
                          blog.author?.avatar !== "public/images/default.png"
                            ? `http://localhost:5000/${blog.author.avatar}`
                            : `http://localhost:5000/public/images/default.png`
                        }
                        alt={blog.author?.name || t("blogDetail.unknownAuthor")}
                        loading="lazy"
                        crossOrigin="anonymous"
                        referrerPolicy="no-referrer"
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-primary-900">
                          {blog.author?.name || t("blogDetail.unknownAuthor")}
                        </p>
                      </div>
                    </div>
                    <Link
                      to={`/blogs/${blog._id}`}
                      className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
                      onClick={handleClick}
                    >
                      <span className="sr-only">
                        {t("featuredBlogs.readMoreSrText", {
                          blogId: blog._id,
                        })}
                      </span>
                      <span
                        aria-hidden="true"
                        className="inline-flex items-center"
                      >
                        {t("featuredBlogs.readMore")}
                      </span>
                      <svg
                        className={`${
                          direction === "rtl" ? "mr-1 rotate-180" : "ml-1"
                        } -mr-1 h-5 w-5`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/blogs"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-300"
          >
            {t("featuredBlogs.viewAllArticles")}
            <svg
              className={`${
                direction === "rtl" ? "mr-2 rotate-180" : "ml-2"
              } -mr-1 h-5 w-5`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogsSection;
